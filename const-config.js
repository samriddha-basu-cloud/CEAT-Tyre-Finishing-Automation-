// ── CONST Config editable page ──────────────────────────────
function renderConstConfig() {
  const el = document.getElementById('page-const-config');
  const data = window._ceatData;
  const compoundCodes = data.compounds.map(c => c.code);

  el.innerHTML = `
<div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:10px;">
  <div>
    <h1>CONST Configuration</h1>
    <p>GT Code master table. Edit drum diameter, CONST recipe, ply count, breakers, angle and compound assignments per ply. Thickness auto-derives from Master Data.</p>
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;">
    <button class="btn btn-outline btn-sm" onclick="ccfgAdd()">+ Add GT Code</button>
    <button class="btn btn-orange btn-sm" onclick="ccfgSave()">Save Changes</button>
  </div>
</div>

<div class="alert alert-info">
  Thickness columns (P1-P6) are read-only — auto-derived by VLOOKUP from Master Data compound table when you save. Any compound not found in Master Data returns 0.00.
</div>

<div class="card">
  <div class="card-header" style="justify-content:space-between;">
    <div class="card-title">GT Code Master — ${data.constConfig.length} Records</div>
    <div style="display:flex;gap:8px;align-items:center;">
      <input type="text" id="ccfg-search" placeholder="Search GT Code..." style="width:180px;" oninput="ccfgFilter()">
    </div>
  </div>
  <div class="table-scroll">
    <table class="data-table" style="font-size:11.5px;min-width:1600px;" id="ccfg-table">
      <thead>
        <tr>
          <th>Sl.</th>
          <th style="min-width:140px;">GT Code</th>
          <th class="num">Drum Dia (mm)</th>
          <th class="num">Drum Inch</th>
          <th>CONST</th>
          <th class="num">Plies</th>
          <th class="num">Breakers</th>
          <th class="num">Angle</th>
          <th>Cmpd P1</th>
          <th>Cmpd P2</th>
          <th>Cmpd P3</th>
          <th>Cmpd P4</th>
          <th>Cmpd P5</th>
          <th>Cmpd P6</th>
          <th class="num" style="background:#c4d4e8;color:var(--blue);">Thick P1</th>
          <th class="num" style="background:#c4d4e8;color:var(--blue);">Thick P2</th>
          <th class="num" style="background:#c4d4e8;color:var(--blue);">Thick P3</th>
          <th class="num" style="background:#c4d4e8;color:var(--blue);">Thick P4</th>
          <th class="num" style="background:#c4d4e8;color:var(--blue);">Thick P5</th>
          <th class="num" style="background:#c4d4e8;color:var(--blue);">Thick P6</th>
          <th style="width:36px;"></th>
        </tr>
      </thead>
      <tbody id="ccfg-tbody"></tbody>
    </table>
  </div>
</div>`;

  ccfgRenderRows();
}

function ccfgGetOptions(data) {
  return ['', ...data.compounds.map(c => c.code)]
    .map(c => `<option value="${c}">${c || '—'}</option>`).join('');
}

function ccfgRenderRows(filter) {
  const data = window._ceatData;
  const tbody = document.getElementById('ccfg-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  const opts = ccfgGetOptions(data);

  const rows = filter
    ? data.constConfig.filter(r => r.gtCode.toUpperCase().includes(filter.toUpperCase()))
    : data.constConfig;

  rows.forEach((row, i) => {
    const idx = data.constConfig.indexOf(row);
    const thicknesses = computeThicknesses(data, row);
    const tr = document.createElement('tr');
    tr.id = 'ccfg-row-' + idx;

    const cmpdCells = row.cmpd.map((c, p) => `
      <td>
        <select style="width:78px;font-size:11px;" onchange="ccfgUpdate(${idx},'cmpd${p}',this.value)">
          ${opts}
        </select>
      </td>`).join('');

    const thickCells = thicknesses.map(t => `
      <td class="num" style="background:#f0f5fb;font-size:11px;color:var(--blue);">${t.toFixed(2)}</td>`).join('');

    tr.innerHTML = `
      <td style="color:var(--grey-400);font-size:11px;">${row.sl}</td>
      <td><input type="text" style="width:130px;font-size:11px;font-weight:600;" value="${row.gtCode}" onchange="ccfgUpdate(${idx},'gtCode',this.value)"></td>
      <td class="num"><input type="number" step="0.1" style="width:72px;font-size:11px;" value="${row.drumDia}" onchange="ccfgUpdate(${idx},'drumDia',this.value)"></td>
      <td class="num" style="color:var(--grey-400);font-size:11px;">${(row.drumDia / 25.4).toFixed(4)}</td>
      <td><input type="text" style="width:68px;font-size:11px;" value="${row.const_}" onchange="ccfgUpdate(${idx},'const_',this.value)"></td>
      <td class="num"><input type="number" min="0" max="6" style="width:40px;font-size:11px;" value="${row.plies}" onchange="ccfgUpdate(${idx},'plies',this.value)"></td>
      <td class="num"><input type="number" min="0" max="4" style="width:40px;font-size:11px;" value="${row.breakers}" onchange="ccfgUpdate(${idx},'breakers',this.value)"></td>
      <td class="num"><input type="number" step="0.1" style="width:48px;font-size:11px;" value="${row.angle != null ? row.angle : ''}" placeholder="—" onchange="ccfgUpdate(${idx},'angle',this.value)"></td>
      ${cmpdCells}
      ${thickCells}
      <td><button class="btn btn-danger btn-sm" style="padding:2px 6px;font-size:10px;" onclick="ccfgRemove(${idx})">X</button></td>
    `;
    tbody.appendChild(tr);

    // Set compound selects
    row.cmpd.forEach((c, p) => {
      const selects = tr.querySelectorAll('select');
      if (selects[p]) selects[p].value = c || '';
    });
  });
}

function ccfgUpdate(idx, field, value) {
  const data = window._ceatData;
  const row = data.constConfig[idx];
  if (field.startsWith('cmpd')) {
    const p = parseInt(field.replace('cmpd', ''));
    row.cmpd[p] = value;
  } else if (field === 'drumDia') {
    row.drumDia = parseFloat(value) || 0;
    // Update drum inch display
    const tr = document.getElementById('ccfg-row-' + idx);
    if (tr) { const cells = tr.querySelectorAll('td'); if (cells[3]) cells[3].textContent = (row.drumDia / 25.4).toFixed(4); }
  } else if (field === 'plies' || field === 'breakers') {
    row[field] = parseInt(value) || 0;
  } else if (field === 'angle') {
    row.angle = value !== '' ? parseFloat(value) : null;
  } else {
    row[field] = value;
  }
}

function ccfgAdd() {
  const data = window._ceatData;
  const newSl = data.constConfig.length + 1;
  data.constConfig.push({ sl: newSl, gtCode: '', drumDia: 0, const_: '', plies: 4, breakers: 0, angle: null, cmpd: ['','','','','',''] });
  ccfgRenderRows();
  // Scroll to bottom
  const tbody = document.getElementById('ccfg-tbody');
  if (tbody) tbody.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
}

function ccfgRemove(idx) {
  if (!confirm('Remove this GT Code entry?')) return;
  window._ceatData.constConfig.splice(idx, 1);
  // Re-number sl
  window._ceatData.constConfig.forEach((r, i) => r.sl = i + 1);
  ccfgRenderRows();
}

function ccfgFilter() {
  const q = document.getElementById('ccfg-search')?.value;
  ccfgRenderRows(q);
}

function ccfgSave() {
  saveData(window._ceatData);
  // Re-render to refresh thickness auto-calc
  ccfgRenderRows();
  showToast('CONST Config saved. Thickness auto-updated from Master Data.', 'success');
}
