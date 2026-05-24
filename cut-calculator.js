// ── Cut Calculator page ─────────────────────────────────────
function renderCutCalculator() {
  const el = document.getElementById('page-cut-calculator');
  el.innerHTML = `
<div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:10px;">
  <div>
    <h1>Cut Calculator</h1>
    <p>Per-ply breakdown with fabric thickness correction. Select a GT Code and enter tyres for a detailed cut analysis.</p>
  </div>
  <div style="display:flex;gap:8px;">
    <button class="btn btn-outline btn-sm" onclick="ccAddRow()">+ Add Row</button>
    <button class="btn btn-primary btn-sm" onclick="ccSaveAll()">Save</button>
    <button class="btn btn-outline btn-sm" onclick="ccClearAll()">Clear All</button>
  </div>
</div>

<div class="card">
  <div class="card-header">
    <div class="card-title">Per-Ply Cut Breakdown</div>
    <span style="font-size:11px;color:var(--grey-400);">Formula: Cuts(N) = 1400 × SIN(angle) / (Eff.Dia × PI) × Tyres</span>
  </div>
  <div class="table-scroll">
    <table class="data-table" id="cc-table" style="font-size:12px;min-width:900px;">
      <thead>
        <tr>
          <th>Sl.</th>
          <th style="min-width:140px;">GT Code</th>
          <th>CONST</th>
          <th class="num">Plies</th>
          <th class="num">Drum Dia (mm)</th>
          <th class="num">Drum Inch</th>
          <th class="num">Angle (deg)</th>
          <th class="num">SIN (rad)</th>
          <th class="num">No. Tyres</th>
          <th class="num">Ply 1</th>
          <th class="num">Ply 2</th>
          <th class="num">Ply 3</th>
          <th class="num">Ply 4</th>
          <th class="num">Ply 5</th>
          <th class="num">Ply 6</th>
          <th class="num" style="background:var(--orange);">TOTAL</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="cc-tbody"></tbody>
    </table>
  </div>
</div>

<!-- Formula Reference -->
<div class="card">
  <div class="card-header"><div class="card-title">Formula Reference</div></div>
  <div class="card-body">
    <div class="form-grid" style="grid-template-columns:1fr 1fr;">
      <div>
        <div class="form-label" style="margin-bottom:8px;">Effective Diameter per Ply</div>
        <table class="data-table">
          <thead><tr><th>Ply</th><th>Formula</th></tr></thead>
          <tbody>
            <tr><td>Ply 1</td><td>DrumDia (bare drum)</td></tr>
            <tr><td>Ply 2</td><td>DrumDia + 2 × T1</td></tr>
            <tr><td>Ply 3</td><td>DrumDia + 2 × (T1 + T2)</td></tr>
            <tr><td>Ply N</td><td>DrumDia + 2 × &Sigma;T(1 to N-1)</td></tr>
          </tbody>
        </table>
      </div>
      <div>
        <div class="form-label" style="margin-bottom:8px;">Cut Count Formula</div>
        <div class="alert alert-info" style="font-size:13px;font-family:monospace;">
          Cuts(N) = 1400 &times; SIN(angle_rad) / (Eff_Dia_N &times; &pi;) &times; No_Tyres
        </div>
        <div class="alert alert-info" style="margin-top:8px;font-size:12px;">
          <strong>Why 1400?</strong> Each fabric roll is 1400 mm wide. This converts drum circumference and bias angle into the number of cuts from a standard roll to cover one tyre layer.
        </div>
      </div>
    </div>
  </div>
</div>`;

  // Init with one blank row
  if (!window._ccRows) window._ccRows = [{ gtCode: '', noOfTyres: '' }];
  ccRenderRows();
}

function ccRenderRows() {
  const data = window._ceatData;
  const tbody = document.getElementById('cc-tbody');
  if (!tbody) return;
  const gtOptions = data.constConfig.map(r => `<option value="${r.gtCode}">${r.gtCode}</option>`).join('');
  tbody.innerHTML = '';

  window._ccRows.forEach((row, idx) => {
    const tr = document.createElement('tr');
    tr.id = 'cc-row-' + idx;
    tr.innerHTML = `
      <td style="color:var(--grey-400);font-size:11px;">${idx + 1}</td>
      <td><select style="width:130px;font-size:12px;" onchange="ccRowUpdate(${idx},'gtCode',this.value)">
        <option value="">--</option>${gtOptions}
      </select></td>
      <td><input type="text" class="calc" style="width:68px;" id="cc-${idx}-const" readonly></td>
      <td class="num"><input type="text" class="calc" style="width:40px;" id="cc-${idx}-plies" readonly></td>
      <td class="num"><input type="text" class="calc" style="width:80px;" id="cc-${idx}-drumdia" readonly></td>
      <td class="num"><input type="text" class="calc" style="width:70px;" id="cc-${idx}-druminch" readonly></td>
      <td class="num"><input type="text" class="calc" style="width:52px;" id="cc-${idx}-angle" readonly></td>
      <td class="num"><input type="text" class="calc" style="width:80px;" id="cc-${idx}-sin" readonly></td>
      <td class="num"><input type="number" style="width:68px;font-size:12px;" id="cc-${idx}-tyres" min="0" value="${row.noOfTyres || ''}" onchange="ccRowUpdate(${idx},'noOfTyres',this.value)"></td>
      ${[0,1,2,3,4,5].map(p => `<td class="num"><input type="text" class="calc" style="width:58px;" id="cc-${idx}-ply-${p}" readonly></td>`).join('')}
      <td class="num"><input type="text" class="calc" style="width:68px;font-weight:700;color:var(--orange);" id="cc-${idx}-total" readonly></td>
      <td><button class="btn btn-danger btn-sm" style="padding:3px 7px;font-size:10px;" onclick="ccRemoveRow(${idx})">X</button></td>
    `;
    tbody.appendChild(tr);
    if (row.gtCode) { tr.querySelector('select').value = row.gtCode; }
    ccComputeRow(idx);
  });
}

function ccRowUpdate(idx, field, value) {
  window._ccRows[idx][field] = value;
  ccComputeRow(idx);
}

function ccComputeRow(idx) {
  const data = window._ceatData;
  const row = window._ccRows[idx];
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };

  if (!row.gtCode) {
    ['const','plies','drumdia','druminch','angle','sin','total'].forEach(f => set(`cc-${idx}-${f}`, ''));
    [0,1,2,3,4,5].forEach(p => set(`cc-${idx}-ply-${p}`, ''));
    return;
  }

  const cfg = getConstConfig(data, row.gtCode);
  if (!cfg) return;
  const thicknesses = computeThicknesses(data, cfg);
  const noOfTyres = parseFloat(row.noOfTyres) || 0;
  const angle = cfg.angle;
  const drumDia = cfg.drumDia;
  const plies = cfg.plies;

  set(`cc-${idx}-const`,    cfg.const_);
  set(`cc-${idx}-plies`,    plies);
  set(`cc-${idx}-drumdia`,  drumDia.toFixed(3));
  set(`cc-${idx}-druminch`, (drumDia / 25.4).toFixed(4));
  set(`cc-${idx}-angle`,    angle != null ? angle : 'N/A');

  if (angle != null) {
    const rad = angle * Math.PI / 180;
    const sinA = Math.sin(rad);
    set(`cc-${idx}-sin`, sinA.toFixed(8));

    if (noOfTyres > 0) {
      const plyCuts = calcPlyCuts(drumDia, angle, plies, thicknesses, noOfTyres);
      let total = 0;
      [0,1,2,3,4,5].forEach(p => {
        if (plyCuts[p] !== null) {
          set(`cc-${idx}-ply-${p}`, plyCuts[p].toFixed(2));
          total += plyCuts[p];
        } else {
          set(`cc-${idx}-ply-${p}`, '—');
        }
      });
      set(`cc-${idx}-total`, total.toFixed(2));
    } else {
      [0,1,2,3,4,5].forEach(p => set(`cc-${idx}-ply-${p}`, ''));
      set(`cc-${idx}-total`, '');
    }
  } else {
    set(`cc-${idx}-sin`, 'N/A');
    [0,1,2,3,4,5].forEach(p => set(`cc-${idx}-ply-${p}`, ''));
    set(`cc-${idx}-total`, '');
  }
}

function ccAddRow() {
  window._ccRows.push({ gtCode: '', noOfTyres: '' });
  ccRenderRows();
}

function ccRemoveRow(idx) {
  window._ccRows.splice(idx, 1);
  if (window._ccRows.length === 0) window._ccRows.push({ gtCode: '', noOfTyres: '' });
  ccRenderRows();
}

function ccSaveAll() { showToast('Cut Calculator view saved.', 'success'); }
function ccClearAll() {
  if (!confirm('Clear all Cut Calculator rows?')) return;
  window._ccRows = [{ gtCode: '', noOfTyres: '' }];
  ccRenderRows();
}
