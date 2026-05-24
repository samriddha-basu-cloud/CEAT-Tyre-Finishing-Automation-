// ── Dashboard page ──────────────────────────────────────────
function renderDashboard() {
  const el = document.getElementById('page-dashboard');
  el.innerHTML = `
<div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:10px;">
  <div>
    <h1>Operator Dashboard</h1>
    <p>Enter a GT Code and tyre count. All specifications and cut requirements auto-populate.</p>
  </div>
</div>

<!-- Input Parameters -->
<div class="card">
  <div class="card-header">
    <div class="card-title">Input Parameters</div>
    <button class="btn btn-orange btn-sm" onclick="dashCalc()">Calculate</button>
  </div>
  <div class="card-body">
    <div class="form-grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr));">
      <div class="form-group">
        <label class="form-label">GT Code</label>
        <select id="dash-gtcode" onchange="dashCalc()" style="width:100%;">
          <option value="">-- Select GT Code --</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">No. of Tyres</label>
        <input type="number" id="dash-tyres" value="100" min="1" step="1" onchange="dashCalc()" style="width:100%;">
      </div>
    </div>
  </div>
</div>

<!-- Status Bar -->
<div id="dash-status-bar" style="display:none;margin-bottom:14px;"></div>

<!-- Technical Specifications — professional spec grid (not tiles) -->
<div class="card" id="dash-spec-card" style="display:none;">
  <div class="card-header"><div class="card-title">Technical Specifications</div></div>
  <div class="card-body" style="padding:0;">
    <div class="spec-grid" id="dash-spec-grid" style="border:none;border-radius:0 0 var(--radius-lg) var(--radius-lg);">

      <!-- Row 1: drum / angle / trig -->
      <div class="spec-cell">
        <div class="spec-label">Drum Diameter</div>
        <div class="spec-value" id="kpi-drumdia">--</div>
        <div class="spec-unit">mm</div>
      </div>
      <div class="spec-cell">
        <div class="spec-label">Drum Diameter</div>
        <div class="spec-value" id="kpi-druminch">--</div>
        <div class="spec-unit">inches</div>
      </div>
      <div class="spec-cell">
        <div class="spec-label">Perimeter</div>
        <div class="spec-value" id="kpi-peri">--</div>
        <div class="spec-unit">mm</div>
      </div>
      <div class="spec-cell">
        <div class="spec-label">NTB Angle</div>
        <div class="spec-value" id="kpi-angle">--</div>
        <div class="spec-unit">degrees</div>
      </div>
      <div class="spec-cell">
        <div class="spec-label">SIN (radians)</div>
        <div class="spec-value" id="kpi-sin" style="font-size:14px;">--</div>
        <div class="spec-unit">&nbsp;</div>
      </div>

      <!-- Row 2: recipe -->
      <div class="spec-cell accent">
        <div class="spec-label">CONST Recipe</div>
        <div class="spec-value" id="kpi-const" style="font-size:20px;">--</div>
        <div class="spec-unit">construction</div>
      </div>
      <div class="spec-cell accent">
        <div class="spec-label">Body Plies</div>
        <div class="spec-value" id="kpi-plies">--</div>
        <div class="spec-unit">active ply count</div>
      </div>
      <div class="spec-cell accent">
        <div class="spec-label">Breakers</div>
        <div class="spec-value" id="kpi-breakers">--</div>
        <div class="spec-unit">&nbsp;</div>
      </div>

      <!-- Row 3: cuts — spans -->
      <div class="spec-cell" style="grid-column:span 2;">
        <div class="spec-label">Total Cuts Required — Exact</div>
        <div class="spec-value" id="kpi-totalcuts" style="font-size:22px;color:var(--blue);">--</div>
        <div class="spec-unit">calculated value (4 decimal places)</div>
      </div>
      <div class="spec-cell orange" style="grid-column:span 2;">
        <div class="spec-label">Total Cuts Required — CEIL</div>
        <div class="spec-value" id="kpi-totalcuts-ceil" style="font-size:28px;">--</div>
        <div class="spec-unit">rounded up to produce</div>
      </div>

    </div>
  </div>
</div>

<!-- Ply-wise Plan Inventory -->
<div class="card" id="dash-ply-card" style="display:none;">
  <div class="card-header"><div class="card-title">Plan Wise Inventory — Cuts Required per Ply</div></div>
  <div class="card-body" style="padding:0;">
    <div class="table-scroll">
      <table class="data-table" id="dash-ply-table">
        <thead><tr id="dash-ply-head"></tr></thead>
        <tbody>
          <tr id="dash-ply-cuts"></tr>
          <tr id="dash-ply-cuts-ceil"></tr>
          <tr id="dash-ply-rolls"></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- In-Servicer Input -->
<div class="card" id="dash-svc-card" style="display:none;">
  <div class="card-header"><div class="card-title">In-Servicer Input — Cuts Filled per Ply</div></div>
  <div class="card-body">
    <div style="margin-bottom:18px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;flex-wrap:wrap;">
        <span class="svc-badge svc-badge-a">SERVICER A</span>
        <span style="font-size:11px;color:var(--grey-400);">
          Slots 1–6 &nbsp;|&nbsp; Subtotal:
          <strong id="dash-svc-a-total" style="color:var(--blue);">0.0000</strong> cuts
        </span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px;" id="dash-svc-a-inputs" class="svc-grid-mobile"></div>
    </div>
    <hr class="divider">
    <div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;flex-wrap:wrap;">
        <span class="svc-badge svc-badge-b">SERVICER B</span>
        <span style="font-size:11px;color:var(--grey-400);">
          Slots 7–12 &nbsp;|&nbsp; Subtotal:
          <strong id="dash-svc-b-total" style="color:var(--orange);">0.0000</strong> cuts
        </span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px;" id="dash-svc-b-inputs" class="svc-grid-mobile"></div>
    </div>
  </div>
</div>

<!-- Inventory Input -->
<div class="card" id="dash-inv-card" style="display:none;">
  <div class="card-header"><div class="card-title">Inventory — Available Cuts by Category</div></div>
  <div class="card-body">
    <div class="form-grid">
      <div class="form-group">
        <label class="form-label">Buildup Roll (1 Cut Roll)</label>
        <input type="number" id="dash-inv-buildup" value="0" min="0" step="0.0001" onchange="dashOutput()">
      </div>
      <div class="form-group">
        <label class="form-label">Servicer 1 &amp; 2 — Total Cuts</label>
        <input type="text" id="dash-inv-svc" value="0.0000" readonly
          style="background:var(--blue-xlight);color:var(--blue);font-weight:700;border-color:var(--blue-light);">
        <span class="form-hint">Auto-sum of Servicer A + B above</span>
      </div>
      <div class="form-group">
        <label class="form-label">Let Off (Cuts qty)</label>
        <input type="number" id="dash-inv-letoff" value="0" min="0" step="0.0001" onchange="dashOutput()">
      </div>
      <div class="form-group">
        <label class="form-label">Rolls on Floor (NTB cuts)</label>
        <input type="number" id="dash-inv-floor" value="0" min="0" step="0.0001" onchange="dashOutput()">
      </div>
      <div class="form-group">
        <label class="form-label">Bias Cutter Inventory</label>
        <input type="number" id="dash-inv-bias" value="0" min="0" step="0.0001" onchange="dashOutput()">
      </div>
    </div>
  </div>
</div>

<!-- Output KPIs -->
<div class="card" id="dash-out-card" style="display:none;">
  <div class="card-header"><div class="card-title">Output — Production Status &amp; Cut Requirements</div></div>
  <div class="card-body">
    <div class="kpi-strip">
      <div class="kpi primary"><div class="kpi-label">Cuts Required (exact)</div><div class="kpi-value" id="out-cuts-req">--</div><div class="kpi-unit">4 decimal places</div></div>
      <div class="kpi accent"><div class="kpi-label">Cuts Required (CEIL)</div><div class="kpi-value" id="out-cuts-req-ceil">--</div><div class="kpi-unit">to produce</div></div>
      <div class="kpi primary"><div class="kpi-label">Total Inventory</div><div class="kpi-value" id="out-inventory">--</div><div class="kpi-unit">available cuts</div></div>
      <div class="kpi primary"><div class="kpi-label">Plan Pending</div><div class="kpi-value" id="out-pending">--</div><div class="kpi-unit">yet to stage</div></div>
      <div class="kpi primary"><div class="kpi-label">Rolls Needed (Lo @25)</div><div class="kpi-value" id="out-rolls-lo">--</div><div class="kpi-unit">rolls</div></div>
      <div class="kpi primary"><div class="kpi-label">Rolls Needed (Hi @22)</div><div class="kpi-value" id="out-rolls-hi">--</div><div class="kpi-unit">rolls</div></div>
      <div class="kpi" id="out-more-card">
        <div class="kpi-label">More Cuts Needed</div>
        <div class="kpi-value" id="out-more-cuts">--</div>
        <div class="kpi-unit" id="out-more-label">&nbsp;</div>
      </div>
    </div>
  </div>
</div>

<!-- Detailed Summary -->
<div class="card" id="dash-summary-card" style="display:none;">
  <div class="card-header">
    <div class="card-title">Detailed Production Summary</div>
    <span style="font-size:11px;color:var(--grey-400);">4 decimal places &nbsp;|&nbsp; Cuts Required = CEIL</span>
  </div>
  <div class="table-scroll">
    <table class="data-table" id="dash-summary-table" style="font-size:11.5px;">
      <thead>
        <tr>
          <th>Ply</th>
          <th>Compound</th>
          <th class="num">Thick (mm)</th>
          <th class="num">Cum Thick</th>
          <th class="num">Eff Dia (mm)</th>
          <th class="num">Eff Peri (mm)</th>
          <th class="num">Cuts/Tyre</th>
          <th class="num">Cuts × Tyres</th>
          <th class="num" style="background:var(--orange);">Cuts (CEIL)</th>
          <th class="num">Rolls Lo</th>
          <th class="num">Rolls Hi</th>
          <th class="num" style="background:#3d4fad;">Svc A</th>
          <th class="num" style="background:#c23000;">Svc B</th>
        </tr>
      </thead>
      <tbody id="dash-summary-tbody"></tbody>
      <tfoot id="dash-summary-tfoot"></tfoot>
    </table>
  </div>
</div>

<!-- Inventory Breakdown -->
<div class="card" id="dash-inv-summary-card" style="display:none;">
  <div class="card-header"><div class="card-title">Inventory Breakdown &amp; Status</div></div>
  <div class="table-scroll">
    <table class="data-table" style="font-size:12.5px;" id="dash-inv-summary-table">
      <thead>
        <tr>
          <th>Category</th>
          <th class="num">Cuts (4dp)</th>
          <th class="num">Cuts (CEIL)</th>
          <th class="num">% of Total Required</th>
        </tr>
      </thead>
      <tbody id="dash-inv-summary-tbody"></tbody>
      <tfoot id="dash-inv-summary-tfoot"></tfoot>
    </table>
  </div>
</div>

<style>
@media (max-width: 640px) {
  .svc-grid-mobile { grid-template-columns: repeat(3, 1fr) !important; }
  .spec-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .spec-cell[style*="span 2"] { grid-column: span 2 !important; }
  .spec-cell.orange { grid-column: span 2 !important; }
}
</style>`;

  // GT Code dropdown
  const data = window._ceatData;
  const sel  = document.getElementById('dash-gtcode');
  data.constConfig.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.gtCode; opt.textContent = r.gtCode;
    sel.appendChild(opt);
  });

  _buildSvcGrid('dash-svc-a-inputs', 1, 6);
  _buildSvcGrid('dash-svc-b-inputs', 7, 12);
  dashCalc();
}

function _buildSvcGrid(containerId, startPly, endPly) {
  const div = document.getElementById(containerId);
  if (!div) return;
  div.innerHTML = '';
  for (let i = startPly; i <= endPly; i++) {
    const localPly = i <= 6 ? i : i - 6;
    const wrap = document.createElement('div');
    wrap.className = 'form-group';
    wrap.innerHTML = `
      <label class="form-label" id="dash-svc-p${i}-lbl" style="color:var(--grey-300);">Ply ${localPly}</label>
      <input type="number" id="dash-svc-p${i}" value="0" min="0" step="0.0001"
        style="width:100%;text-align:right;" onchange="dashSvcInputChange()">`;
    div.appendChild(wrap);
  }
}

function _updateSvcLabels(plies) {
  const cfg = window._dashCfg;
  for (let i = 1; i <= 12; i++) {
    const lbl = document.getElementById(`dash-svc-p${i}-lbl`);
    if (!lbl) continue;
    const active   = i <= plies;
    const localPly = i <= 6 ? i : i - 6;
    const cmpdName = active && cfg && cfg.cmpd[i - 1] ? cfg.cmpd[i - 1] : '';
    lbl.textContent  = cmpdName ? `P${localPly} [${cmpdName}]` : `Ply ${localPly}`;
    lbl.style.color  = active ? 'var(--grey-700)' : 'var(--grey-300)';
    lbl.style.fontWeight = active ? '700' : '400';
  }
}

function _showCards(show) {
  ['dash-spec-card','dash-ply-card','dash-svc-card','dash-inv-card','dash-out-card'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = show ? 'block' : 'none';
  });
  ['dash-summary-card','dash-inv-summary-card'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

function dashCalc() {
  const data      = window._ceatData;
  const gtCode    = document.getElementById('dash-gtcode').value;
  const noOfTyres = parseFloat(document.getElementById('dash-tyres').value) || 0;

  if (!gtCode) { resetDashOutput(); return; }

  const cfg = getConstConfig(data, gtCode);
  if (!cfg) return;
  window._dashCfg = cfg;

  _showCards(true);

  const thicknesses = computeThicknesses(data, cfg);
  const angle       = cfg.angle;
  const drumDia     = cfg.drumDia;
  const plies       = cfg.plies;

  // Spec cells
  document.getElementById('kpi-drumdia').textContent  = drumDia.toFixed(4);
  document.getElementById('kpi-druminch').textContent = (drumDia / 25.4).toFixed(4);
  document.getElementById('kpi-peri').textContent     = (drumDia * Math.PI).toFixed(4);
  document.getElementById('kpi-angle').textContent    = angle != null ? angle : 'N/A';
  document.getElementById('kpi-const').textContent    = cfg.const_;
  document.getElementById('kpi-plies').textContent    = plies;
  document.getElementById('kpi-breakers').textContent = cfg.breakers;

  let plyCuts = Array(6).fill(null);
  if (angle != null && noOfTyres > 0) {
    const sinA = Math.sin(angle * Math.PI / 180);
    document.getElementById('kpi-sin').textContent = sinA.toFixed(8);
    plyCuts = calcPlyCuts(drumDia, angle, plies, thicknesses, noOfTyres);
  } else {
    document.getElementById('kpi-sin').textContent = angle != null ? Math.sin(angle * Math.PI / 180).toFixed(8) : 'N/A';
  }

  const totalExact = plyCuts.filter(v => v !== null).reduce((a, b) => a + b, 0);
  const totalCeil  = Math.ceil(totalExact);

  document.getElementById('kpi-totalcuts').textContent      = totalExact.toFixed(4);
  document.getElementById('kpi-totalcuts-ceil').textContent = totalCeil;

  // Ply table
  const head     = document.getElementById('dash-ply-head');
  const cutsRow  = document.getElementById('dash-ply-cuts');
  const ceilRow  = document.getElementById('dash-ply-cuts-ceil');
  const rollsRow = document.getElementById('dash-ply-rolls');

  head.innerHTML     = '<th style="min-width:100px;white-space:nowrap;">Row</th>';
  cutsRow.innerHTML  = '<td style="font-weight:600;font-size:11px;color:var(--grey-600);white-space:nowrap;">Cuts — Exact (4dp)</td>';
  ceilRow.innerHTML  = '<td style="font-weight:600;font-size:11px;color:var(--orange);white-space:nowrap;">Cuts — CEIL</td>';
  rollsRow.innerHTML = '<td style="font-weight:600;font-size:11px;color:var(--grey-600);white-space:nowrap;">Rolls Lo / Hi</td>';

  for (let i = 0; i < 6; i++) {
    const cmpd   = cfg.cmpd[i] || '';
    const thick  = thicknesses[i] || 0;
    const active = i < plies && plyCuts[i] !== null;

    const th = document.createElement('th');
    th.innerHTML = active
      ? `PLY ${i+1}<br><span style="font-weight:400;font-size:9.5px;opacity:.8;">${cmpd || '—'} &nbsp;${thick.toFixed(4)}mm</span>`
      : `PLY ${i+1}`;
    th.style.background = active ? 'var(--blue)' : 'var(--blue-dark)';
    th.style.opacity    = active ? '1' : '0.4';
    head.appendChild(th);

    const td1 = document.createElement('td');
    td1.className   = 'num';
    td1.textContent = active ? plyCuts[i].toFixed(4) : '—';
    td1.style.color = active ? 'var(--grey-900)' : 'var(--grey-400)';
    cutsRow.appendChild(td1);

    const td2 = document.createElement('td');
    td2.className        = 'num';
    td2.textContent      = active ? Math.ceil(plyCuts[i]) : '—';
    td2.style.color      = active ? 'var(--orange)' : 'var(--grey-400)';
    td2.style.fontWeight = active ? '700' : '400';
    ceilRow.appendChild(td2);

    const td3 = document.createElement('td');
    td3.className = 'num';
    if (active) {
      const c = Math.ceil(plyCuts[i]);
      td3.textContent = `${Math.ceil(c / 25)} / ${Math.ceil(c / 22)}`;
    } else { td3.textContent = '—'; td3.style.color = 'var(--grey-400)'; }
    rollsRow.appendChild(td3);
  }

  _updateSvcLabels(plies);

  window._dashState = { totalExact, totalCeil, plyCuts, plies, thicknesses, noOfTyres, cfg, drumDia, angle };

  dashSvcInputChange();

  // Status bar
  const sb = document.getElementById('dash-status-bar');
  sb.style.display = 'block';
  sb.className = 'alert alert-info';
  sb.innerHTML = `<strong>${gtCode}</strong> &nbsp;|&nbsp; Tyres: <strong>${noOfTyres}</strong> &nbsp;|&nbsp; CONST: <strong>${cfg.const_}</strong> &nbsp;|&nbsp; Plies: <strong>${plies}</strong> &nbsp;|&nbsp; Both Servicers Active`;
}

function dashSvcInputChange() {
  let totalA = 0, totalB = 0;
  for (let i = 1;  i <= 6;  i++) { const e = document.getElementById(`dash-svc-p${i}`);  if (e) totalA += parseFloat(e.value) || 0; }
  for (let i = 7;  i <= 12; i++) { const e = document.getElementById(`dash-svc-p${i}`);  if (e) totalB += parseFloat(e.value) || 0; }
  const totalSvc = totalA + totalB;
  const aEl = document.getElementById('dash-svc-a-total'); if (aEl) aEl.textContent = totalA.toFixed(4);
  const bEl = document.getElementById('dash-svc-b-total'); if (bEl) bEl.textContent = totalB.toFixed(4);
  const inv = document.getElementById('dash-inv-svc');     if (inv) inv.value = totalSvc.toFixed(4);
  dashOutput();
}

function dashOutput() {
  const state = window._dashState;
  if (!state) return;
  const { totalExact, totalCeil, plyCuts, plies, thicknesses, noOfTyres, cfg, drumDia, angle } = state;

  const svcInv  = parseFloat(document.getElementById('dash-inv-svc')?.value)     || 0;
  const buildup = parseFloat(document.getElementById('dash-inv-buildup')?.value)  || 0;
  const letoff  = parseFloat(document.getElementById('dash-inv-letoff')?.value)   || 0;
  const floor   = parseFloat(document.getElementById('dash-inv-floor')?.value)    || 0;
  const bias    = parseFloat(document.getElementById('dash-inv-bias')?.value)     || 0;

  const totalInv  = svcInv + buildup + letoff + floor + bias;
  const pending   = Math.max(0, totalCeil - svcInv - buildup);
  const rollsLo   = Math.ceil(totalCeil / 25);
  const rollsHi   = Math.ceil(totalCeil / 22);
  const moreCuts  = Math.max(0, totalCeil - totalInv);

  document.getElementById('out-cuts-req').textContent      = totalExact.toFixed(4);
  document.getElementById('out-cuts-req-ceil').textContent = totalCeil;
  document.getElementById('out-inventory').textContent     = totalInv.toFixed(4);
  document.getElementById('out-pending').textContent       = pending.toFixed(4);
  document.getElementById('out-rolls-lo').textContent      = rollsLo;
  document.getElementById('out-rolls-hi').textContent      = rollsHi;
  document.getElementById('out-more-cuts').textContent     = moreCuts.toFixed(4);

  const card = document.getElementById('out-more-card');
  const lbl  = document.getElementById('out-more-label');
  if (moreCuts > 0) {
    card.className = 'kpi danger';
    lbl.innerHTML  = '<span class="status-warn">ADDITIONAL CUTS REQUIRED</span>';
  } else {
    card.className = 'kpi success';
    lbl.innerHTML  = '<span class="status-ok">READY TO RUN</span>';
  }

  _renderDetailedSummary(state, svcInv, buildup, letoff, floor, bias, totalInv, totalExact, totalCeil, pending, rollsLo, rollsHi, moreCuts);
}

function _renderDetailedSummary(state, svcInv, buildup, letoff, floor, bias, totalInv, totalExact, totalCeil, pending, rollsLo, rollsHi, moreCuts) {
  const { plyCuts, plies, thicknesses, cfg, drumDia, angle, noOfTyres } = state;

  const sc = document.getElementById('dash-summary-card');
  const ic = document.getElementById('dash-inv-summary-card');
  if (!sc || !ic) return;
  if (!cfg || !angle || noOfTyres === 0) { sc.style.display = ic.style.display = 'none'; return; }
  sc.style.display = ic.style.display = 'block';

  const svcA = {}, svcB = {};
  for (let i = 1;  i <= 6;  i++) { const e = document.getElementById(`dash-svc-p${i}`);  svcA[i] = parseFloat(e?.value) || 0; }
  for (let i = 7;  i <= 12; i++) { const e = document.getElementById(`dash-svc-p${i}`);  svcB[i] = parseFloat(e?.value) || 0; }

  const tbody = document.getElementById('dash-summary-tbody');
  tbody.innerHTML = '';
  let cumThick = 0;

  for (let i = 0; i < 6; i++) {
    const active  = i < plies;
    const cmpd    = cfg.cmpd[i] || '—';
    const thick   = thicknesses[i] || 0;
    const effDia  = active ? drumDia + 2 * cumThick : null;
    const effPeri = effDia ? effDia * Math.PI : null;
    const sinA    = angle ? Math.sin(angle * Math.PI / 180) : 0;
    const cutsPer = (effDia && sinA) ? (1400 * sinA) / (effDia * Math.PI) : null;
    const cutsEx  = active && plyCuts[i] !== null ? plyCuts[i] : null;
    const cutsCl  = cutsEx !== null ? Math.ceil(cutsEx) : null;
    const lo      = cutsCl ? Math.ceil(cutsCl / 25) : null;
    const hi      = cutsCl ? Math.ceil(cutsCl / 22) : null;
    const aVal    = active ? (svcA[i + 1] || 0) : 0;
    const bVal    = active ? (svcB[i + 7] || 0) : 0;

    const tr = document.createElement('tr');
    tr.style.opacity = active ? '1' : '0.45';
    tr.innerHTML = `
      <td style="font-weight:${active ? 700 : 400};">PLY ${i + 1}</td>
      <td>${active ? cmpd : '—'}</td>
      <td class="num">${active ? thick.toFixed(4) : '—'}</td>
      <td class="num">${active ? cumThick.toFixed(4) : '—'}</td>
      <td class="num">${effDia  ? effDia.toFixed(4)  : '—'}</td>
      <td class="num">${effPeri ? effPeri.toFixed(4) : '—'}</td>
      <td class="num">${cutsPer ? cutsPer.toFixed(4) : '—'}</td>
      <td class="num">${cutsEx  ? cutsEx.toFixed(4)  : '—'}</td>
      <td class="num" style="font-weight:700;color:${active ? 'var(--orange)' : 'var(--grey-400)'};">${cutsCl !== null ? cutsCl : '—'}</td>
      <td class="num">${lo !== null ? lo : '—'}</td>
      <td class="num">${hi !== null ? hi : '—'}</td>
      <td class="num" style="color:var(--blue);font-weight:600;">${active ? aVal.toFixed(4) : '—'}</td>
      <td class="num" style="color:var(--orange);font-weight:600;">${active ? bVal.toFixed(4) : '—'}</td>
    `;
    tbody.appendChild(tr);
    if (active) cumThick += thick;
  }

  const tfoot = document.getElementById('dash-summary-tfoot');
  tfoot.innerHTML = '';
  const totalA_sum = Object.values(svcA).reduce((a, b) => a + b, 0);
  const totalB_sum = Object.values(svcB).reduce((a, b) => a + b, 0);
  const tfr = document.createElement('tr');
  tfr.style.cssText = 'background:var(--blue);color:var(--white);font-weight:700;';
  tfr.innerHTML = `
    <td colspan="7" style="padding:9px 10px;">TOTALS</td>
    <td class="num">${totalExact.toFixed(4)}</td>
    <td class="num" style="background:var(--orange);">${totalCeil}</td>
    <td class="num">${rollsLo}</td>
    <td class="num">${rollsHi}</td>
    <td class="num" style="color:#b8d0ff;">${totalA_sum.toFixed(4)}</td>
    <td class="num" style="color:#ffd8c0;">${totalB_sum.toFixed(4)}</td>
  `;
  tfoot.appendChild(tfr);

  // Inventory breakdown
  const pct = v => totalCeil > 0 ? ((v / totalCeil) * 100).toFixed(2) + '%' : '—';
  const invRows = [
    { label: 'Servicer A — Entered Cuts',  val: totalA_sum, bold: false, color: 'var(--blue)' },
    { label: 'Servicer B — Entered Cuts',  val: totalB_sum, bold: false, color: 'var(--orange)' },
    { label: 'Servicer 1 & 2 Total',        val: svcInv,     bold: true },
    { label: 'Buildup Roll (1 Cut Roll)',    val: buildup },
    { label: 'Let Off Cuts',               val: letoff },
    { label: 'Rolls on Floor (NTB)',        val: floor },
    { label: 'Bias Cutter Inventory',      val: bias },
  ];
  const invTbody = document.getElementById('dash-inv-summary-tbody');
  invTbody.innerHTML = '';
  invRows.forEach(r => {
    const tr = document.createElement('tr');
    if (r.bold) tr.style.cssText = 'background:var(--blue-xlight);font-weight:700;';
    tr.innerHTML = `
      <td style="color:${r.color || 'inherit'};">${r.label}</td>
      <td class="num">${r.val.toFixed(4)}</td>
      <td class="num">${Math.ceil(r.val)}</td>
      <td class="num">${pct(r.val)}</td>
    `;
    invTbody.appendChild(tr);
  });

  const invTfoot = document.getElementById('dash-inv-summary-tfoot');
  invTfoot.innerHTML = '';
  const sr = document.createElement('tr');
  sr.style.cssText = 'background:var(--blue);color:var(--white);font-weight:700;';
  sr.innerHTML = `<td>TOTAL INVENTORY</td><td class="num">${totalInv.toFixed(4)}</td><td class="num">${Math.ceil(totalInv)}</td><td class="num">—</td>`;
  invTfoot.appendChild(sr);

  const statRow = document.createElement('tr');
  const ok = moreCuts <= 0;
  statRow.style.cssText = `background:${ok ? 'var(--green-light)' : 'var(--red-light)'};color:${ok ? 'var(--green)' : 'var(--red)'};font-weight:700;`;
  statRow.innerHTML = `<td colspan="4" style="padding:10px 14px;">
    ${ok
      ? `READY TO RUN — ${totalCeil} cuts accounted for. Pending to stage: ${pending.toFixed(4)}`
      : `ADDITIONAL CUTS REQUIRED: ${moreCuts.toFixed(4)} (CEIL: ${Math.ceil(moreCuts)}) | Pending to stage: ${pending.toFixed(4)}`}
  </td>`;
  invTfoot.appendChild(statRow);
}

function resetDashOutput() {
  _showCards(false);
  const ids = ['kpi-drumdia','kpi-druminch','kpi-peri','kpi-angle','kpi-sin','kpi-const',
               'kpi-plies','kpi-breakers','kpi-totalcuts','kpi-totalcuts-ceil',
               'out-cuts-req','out-cuts-req-ceil','out-inventory','out-pending',
               'out-rolls-lo','out-rolls-hi','out-more-cuts'];
  ids.forEach(id => { const el = document.getElementById(id); if (el) el.textContent = '--'; });
  const sb = document.getElementById('dash-status-bar');
  if (sb) sb.style.display = 'none';
  window._dashState = null;
  window._dashCfg   = null;
}
