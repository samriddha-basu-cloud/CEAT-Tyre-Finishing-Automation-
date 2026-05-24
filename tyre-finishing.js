// ── Tyre Finishing Tracker page ─────────────────────────────
// Starts empty — rows added on demand (same pattern as Cut Calculator)

function renderTyreFinishing() {
  const el = document.getElementById('page-tyre-finishing');
  el.innerHTML = `
<div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:10px;">
  <div>
    <h1>Tyre Finishing Tracker</h1>
    <p>Add rows for each GT Code being planned. GT Code selection auto-populates all calculated fields.</p>
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;">
    <button class="btn btn-outline btn-sm" onclick="tfAddRow()">+ Add Row</button>
    <button class="btn btn-primary btn-sm" onclick="tfSaveAll()">Save</button>
    <button class="btn btn-danger btn-sm" onclick="tfClearAll()">Clear All</button>
  </div>
</div>

<!-- Summary KPIs -->
<div class="kpi-strip" id="tf-kpi-strip" style="display:none;">
  <div class="kpi accent"><div class="kpi-label">Active Rows</div><div class="kpi-value" id="tf-active-rows">0</div></div>
  <div class="kpi primary"><div class="kpi-label">Total Tyres</div><div class="kpi-value" id="tf-total-tyres">0</div></div>
  <div class="kpi primary"><div class="kpi-label">Total Cuts (exact)</div><div class="kpi-value" id="tf-total-cuts">0.0000</div></div>
  <div class="kpi primary"><div class="kpi-label">Total Cuts (CEIL)</div><div class="kpi-value" id="tf-total-cuts-ceil">0</div></div>
  <div class="kpi danger"><div class="kpi-label">Total More Needed</div><div class="kpi-value" id="tf-total-more">0</div></div>
</div>

<!-- Empty state -->
<div class="card" id="tf-empty-state">
  <div class="card-body" style="text-align:center;padding:48px 24px;">
    <div style="font-size:40px;margin-bottom:12px;opacity:.25;">&#9776;</div>
    <div style="font-size:15px;font-weight:600;color:var(--grey-700);margin-bottom:6px;">No rows added yet</div>
    <div style="font-size:12.5px;color:var(--grey-400);margin-bottom:20px;">Click "Add Row" to begin planning a GT Code size.</div>
    <button class="btn btn-orange" onclick="tfAddRow()">+ Add First Row</button>
  </div>
</div>

<!-- Table (shown when rows exist) -->
<div class="card" id="tf-table-card" style="display:none;">
  <div class="card-header">
    <div class="card-title">Production Planning Sheet</div>
    <span style="font-size:11px;color:var(--grey-400);">Grey = auto-calculated &nbsp;|&nbsp; White = input</span>
  </div>
  <div class="table-scroll">
    <table class="data-table" id="tf-table" style="font-size:11.5px;min-width:1300px;">
      <thead>
        <tr>
          <th style="width:32px;">#</th>
          <th style="min-width:130px;">GT Code</th>
          <th class="num">Peri (mm)</th>
          <th class="num">Angle</th>
          <th style="width:72px;">Tyres</th>
          <th class="num" style="background:var(--orange);">Cuts (CEIL)</th>
          <th class="num">Drum In</th>
          <th class="num">Plies</th>
          <th>CONST</th>
          <th class="num">Svc P1</th>
          <th class="num">Svc P2</th>
          <th class="num">Svc P3</th>
          <th class="num">Svc P4</th>
          <th class="num">Svc P5</th>
          <th class="num">Svc P6</th>
          <th class="num">Buildup</th>
          <th class="num">Rolls Lo</th>
          <th class="num">Rolls Hi</th>
          <th class="num">Pending</th>
          <th class="num">Inv P1</th>
          <th class="num">Inv P2</th>
          <th class="num">Inv P3</th>
          <th class="num">Inv P4</th>
          <th class="num">Inv P5</th>
          <th class="num">Inv P6</th>
          <th class="num">Inv Svc</th>
          <th class="num">LetOff</th>
          <th class="num">Floor</th>
          <th class="num">Bias</th>
          <th class="num">Total Inv</th>
          <th class="num" style="background:var(--orange);">More Needed</th>
          <th style="width:32px;"></th>
        </tr>
      </thead>
      <tbody id="tf-tbody"></tbody>
      <tfoot id="tf-tfoot"></tfoot>
    </table>
  </div>
</div>`;

  // Init rows from saved data (filter out blank ones from old 100-row format)
  if (!window._tfRows) {
    const saved = window._ceatData.tyreFinishingRows || [];
    window._tfRows = saved.filter(r => r.gtCode && r.gtCode.trim() !== '');
  }
  tfRenderRows();
}

function tfRenderRows() {
  const data    = window._ceatData;
  const rows    = window._tfRows;
  const tbody   = document.getElementById('tf-tbody');
  const empty   = document.getElementById('tf-empty-state');
  const tableCard = document.getElementById('tf-table-card');
  const kpiStrip  = document.getElementById('tf-kpi-strip');
  if (!tbody) return;

  const hasRows = rows.length > 0;
  empty.style.display     = hasRows ? 'none'  : 'block';
  tableCard.style.display = hasRows ? 'block' : 'none';
  kpiStrip.style.display  = hasRows ? 'flex'  : 'none';

  const gtOptions = data.constConfig.map(r => `<option value="${r.gtCode}">${r.gtCode}</option>`).join('');
  tbody.innerHTML = '';

  rows.forEach((row, idx) => {
    const tr = document.createElement('tr');
    tr.id = 'tf-row-' + idx;

    // Input style helpers
    const inp  = (id, val, extra) =>
      `<input type="number" id="${id}" value="${val || ''}" min="0" step="0.0001"
        style="width:100%;text-align:right;font-size:11px;" ${extra || ''}>`;
    const calc = (id, val) =>
      `<input type="text" class="calc" id="${id}" value="${val || ''}" readonly
        style="width:100%;text-align:right;font-size:11px;min-width:62px;">`;

    tr.innerHTML = `
      <td style="color:var(--grey-400);font-size:11px;text-align:center;">${idx + 1}</td>
      <td>
        <select style="width:120px;font-size:11px;" onchange="tfRowUpdate(${idx},'gtCode',this.value)">
          <option value="">--</option>${gtOptions}
        </select>
      </td>
      <td>${calc(`tf-${idx}-peri`,'')}</td>
      <td>${calc(`tf-${idx}-angle`,'')}</td>
      <td>${inp(`tf-${idx}-tyres`, row.noOfTyres, `onchange="tfRowUpdate(${idx},'noOfTyres',this.value)"`)}</td>
      <td style="background:var(--orange-light);">${calc(`tf-${idx}-totalcuts`,'')}</td>
      <td>${calc(`tf-${idx}-druminch`,'')}</td>
      <td>${calc(`tf-${idx}-plies`,'')}</td>
      <td>${calc(`tf-${idx}-const`,'')}</td>
      ${[0,1,2,3,4,5].map(p => `<td>${inp(`tf-${idx}-svc-${p}`, row.servicer?.[p] || '', `onchange="tfRowUpdate(${idx},'servicer${p}',this.value)"`)}</td>`).join('')}
      <td>${inp(`tf-${idx}-buildup`, row.buildup, `onchange="tfRowUpdate(${idx},'buildup',this.value)"`)}</td>
      <td>${calc(`tf-${idx}-rolls-lo`,'')}</td>
      <td>${calc(`tf-${idx}-rolls-hi`,'')}</td>
      <td>${calc(`tf-${idx}-pending`,'')}</td>
      ${[0,1,2,3,4,5].map(p => `<td>${calc(`tf-${idx}-inv-${p}`,'')}</td>`).join('')}
      <td>${inp(`tf-${idx}-inv-svc`, row.inventoryServicer, `onchange="tfRowUpdate(${idx},'inventoryServicer',this.value)"`)}</td>
      <td>${inp(`tf-${idx}-inv-letoff`, row.inventoryLetoff, `onchange="tfRowUpdate(${idx},'inventoryLetoff',this.value)"`)}</td>
      <td>${inp(`tf-${idx}-inv-floor`, row.inventoryFloor, `onchange="tfRowUpdate(${idx},'inventoryFloor',this.value)"`)}</td>
      <td>${inp(`tf-${idx}-inv-bias`, row.inventoryBias, `onchange="tfRowUpdate(${idx},'inventoryBias',this.value)"`)}</td>
      <td>${calc(`tf-${idx}-total-inv`,'')}</td>
      <td style="background:var(--orange-light);">${calc(`tf-${idx}-more`,'')}</td>
      <td style="text-align:center;">
        <button class="btn btn-danger btn-sm" style="padding:3px 7px;font-size:10px;" onclick="tfRemoveRow(${idx})">X</button>
      </td>`;

    tbody.appendChild(tr);

    // Set GT Code select
    const sel = tr.querySelector('select');
    if (row.gtCode) sel.value = row.gtCode;

    tfComputeRow(idx);
  });

  // Grand totals footer
  tfRenderTotals();
}

function tfRowUpdate(idx, field, value) {
  const row = window._tfRows[idx];
  if (!row) return;
  if (field === 'gtCode')             row.gtCode = value;
  else if (field === 'noOfTyres')     row.noOfTyres = value;
  else if (field === 'buildup')       row.buildup = value;
  else if (field === 'inventoryServicer') row.inventoryServicer = value;
  else if (field === 'inventoryLetoff')   row.inventoryLetoff = value;
  else if (field === 'inventoryFloor')    row.inventoryFloor = value;
  else if (field === 'inventoryBias')     row.inventoryBias = value;
  else if (field.startsWith('servicer')) {
    if (!row.servicer) row.servicer = ['','','','','',''];
    row.servicer[parseInt(field.replace('servicer', ''))] = value;
  }
  tfComputeRow(idx);
  tfRenderTotals();
}

function tfComputeRow(idx) {
  const data = window._ceatData;
  const row  = window._tfRows[idx];
  const set  = (id, val) => { const e = document.getElementById(id); if (e) e.value = val; };

  if (!row || !row.gtCode) {
    ['peri','angle','totalcuts','druminch','plies','const','rolls-lo','rolls-hi','pending','total-inv','more'].forEach(f => set(`tf-${idx}-${f}`, ''));
    [0,1,2,3,4,5].forEach(p => set(`tf-${idx}-inv-${p}`, ''));
    return;
  }

  const cfg  = getConstConfig(data, row.gtCode);
  if (!cfg) return;
  const thick = computeThicknesses(data, cfg);
  const tyres = parseFloat(row.noOfTyres) || 0;
  const plies = cfg.plies;
  const angle = cfg.angle;
  const drum  = cfg.drumDia;

  set(`tf-${idx}-peri`,     (drum * Math.PI).toFixed(4));
  set(`tf-${idx}-angle`,    angle != null ? angle : '');
  set(`tf-${idx}-druminch`, (drum / 25.4).toFixed(4));
  set(`tf-${idx}-plies`,    plies);
  set(`tf-${idx}-const`,    cfg.const_);

  // Disable inactive servicer inputs
  [0,1,2,3,4,5].forEach(p => {
    const sEl = document.getElementById(`tf-${idx}-svc-${p}`);
    if (sEl) {
      const active = p < plies;
      sEl.readOnly = !active;
      sEl.style.background = active ? 'var(--white)' : 'var(--grey-50)';
      sEl.style.color      = active ? 'var(--grey-900)' : 'var(--grey-300)';
    }
  });

  let totalExact = 0, plyCuts = Array(6).fill(null);
  if (angle != null && tyres > 0) {
    plyCuts    = calcPlyCuts(drum, angle, plies, thick, tyres);
    totalExact = plyCuts.filter(v => v !== null).reduce((a, b) => a + b, 0);
  }

  const totalCeil = totalExact > 0 ? Math.ceil(totalExact) : '';
  set(`tf-${idx}-totalcuts`, totalCeil !== '' ? totalCeil : '');
  set(`tf-${idx}-rolls-lo`,  totalCeil !== '' ? Math.ceil(totalCeil / 25) : '');
  set(`tf-${idx}-rolls-hi`,  totalCeil !== '' ? Math.ceil(totalCeil / 22) : '');

  [0,1,2,3,4,5].forEach(p => {
    set(`tf-${idx}-inv-${p}`, plyCuts[p] !== null ? plyCuts[p].toFixed(4) : '');
  });

  const svcSum   = [0,1,2,3,4,5].reduce((a, p) => a + (parseFloat(document.getElementById(`tf-${idx}-svc-${p}`)?.value) || 0), 0);
  const buildup  = parseFloat(row.buildup)            || 0;
  const invSvc   = parseFloat(row.inventoryServicer)  || 0;
  const invLetoff= parseFloat(row.inventoryLetoff)    || 0;
  const invFloor = parseFloat(row.inventoryFloor)     || 0;
  const invBias  = parseFloat(row.inventoryBias)      || 0;

  const tc       = typeof totalCeil === 'number' ? totalCeil : 0;
  const pending  = Math.max(0, tc - svcSum - buildup);
  const totalInv = svcSum + buildup + invSvc + invLetoff + invFloor + invBias;
  const more     = Math.max(0, tc - totalInv);

  set(`tf-${idx}-pending`,   tc > 0 ? pending.toFixed(4) : '');
  set(`tf-${idx}-total-inv`, tc > 0 ? totalInv.toFixed(4) : '');

  const moreEl = document.getElementById(`tf-${idx}-more`);
  if (moreEl) {
    moreEl.value = tc > 0 ? more.toFixed(4) : '';
    moreEl.style.color = more > 0 ? 'var(--red)' : 'var(--green)';
    moreEl.style.fontWeight = more > 0 ? '700' : '400';
  }
}

function tfRenderTotals() {
  let activeRows = 0, totalTyres = 0, totalCuts = 0, totalMore = 0;
  (window._tfRows || []).forEach((row, idx) => {
    if (!row.gtCode) return;
    activeRows++;
    totalTyres += parseFloat(row.noOfTyres) || 0;
    totalCuts  += parseFloat(document.getElementById(`tf-${idx}-totalcuts`)?.value) || 0;
    totalMore  += parseFloat(document.getElementById(`tf-${idx}-more`)?.value)      || 0;
  });

  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  set('tf-active-rows',       activeRows);
  set('tf-total-tyres',       totalTyres);
  set('tf-total-cuts',        totalCuts.toFixed(4));
  set('tf-total-cuts-ceil',   Math.ceil(totalCuts));
  set('tf-total-more',        Math.ceil(totalMore));

  // Grand totals footer row
  const tfoot = document.getElementById('tf-tfoot');
  if (!tfoot) return;
  tfoot.innerHTML = '';
  if (activeRows === 0) return;

  const fr = document.createElement('tr');
  fr.style.cssText = 'background:var(--blue);color:var(--white);font-weight:700;font-size:11.5px;';
  fr.innerHTML = `
    <td colspan="4" style="padding:8px 10px;color:var(--white);">GRAND TOTALS (${activeRows} rows)</td>
    <td class="num">${totalTyres}</td>
    <td class="num" style="color:#ffd;">${Math.ceil(totalCuts)}</td>
    <td colspan="3"></td>
    <td colspan="7"></td>
    <td></td>
    <td class="num">${totalCuts > 0 ? Math.ceil(totalCuts / 25) : ''}</td>
    <td class="num">${totalCuts > 0 ? Math.ceil(totalCuts / 22) : ''}</td>
    <td colspan="9"></td>
    <td class="num" style="color:#ffd;">${Math.ceil(totalMore)}</td>
    <td></td>`;
  tfoot.appendChild(fr);
}

function tfAddRow() {
  if (!window._tfRows) window._tfRows = [];
  window._tfRows.push({
    gtCode: '', noOfTyres: '',
    servicer: ['','','','','',''],
    buildup: '', inventoryServicer: '', inventoryLetoff: '', inventoryFloor: '', inventoryBias: ''
  });
  tfRenderRows();
  // Scroll to bottom of table
  setTimeout(() => {
    const last = document.getElementById('tf-row-' + (window._tfRows.length - 1));
    if (last) last.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 50);
}

function tfRemoveRow(idx) {
  window._tfRows.splice(idx, 1);
  tfRenderRows();
}

function tfSaveAll() {
  // Sync back to ceatData for export consistency
  window._ceatData.tyreFinishingRows = window._tfRows;
  saveData(window._ceatData);
  showToast('Tyre Finishing data saved.', 'success');
}

function tfClearAll() {
  if (!confirm('Clear all Tyre Finishing rows?')) return;
  window._tfRows = [];
  tfRenderRows();
  showToast('All rows cleared.', '');
}
