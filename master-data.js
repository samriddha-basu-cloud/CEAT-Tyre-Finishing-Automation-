// ── Master Data (Data I) editable page ──────────────────────
function renderMasterData() {
  const el = document.getElementById('page-master-data');
  el.innerHTML = `
<div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:10px;">
  <div>
    <h1>Master Data — Data I</h1>
    <p>Static reference tables. All edits cascade automatically to CONST Config and calculation sheets.</p>
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;">
    <button class="btn btn-orange btn-sm" onclick="mdSave()">Save Changes</button>
  </div>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">

  <!-- NTB Angles -->
  <div class="card">
    <div class="card-header" style="justify-content:space-between;">
      <div class="card-title">NTB Angle Table</div>
      <button class="btn btn-outline btn-sm" onclick="mdAddAngle()">+ Add</button>
    </div>
    <div style="max-height:480px;overflow-y:auto;">
      <table class="data-table" id="md-angle-table">
        <thead><tr><th>GT Code</th><th class="num">Angle (deg)</th><th style="width:36px;"></th></tr></thead>
        <tbody id="md-angle-tbody"></tbody>
      </table>
    </div>
  </div>

  <!-- Compound Gauge / Thickness -->
  <div class="card">
    <div class="card-header" style="justify-content:space-between;">
      <div class="card-title">Compound Gauge &amp; Thickness</div>
      <button class="btn btn-outline btn-sm" onclick="mdAddCompound()">+ Add</button>
    </div>
    <div style="max-height:480px;overflow-y:auto;">
      <table class="data-table" id="md-compound-table">
        <thead><tr><th>Compound Code</th><th>Gauge</th><th class="num">Thickness (mm)</th><th style="width:36px;"></th></tr></thead>
        <tbody id="md-compound-tbody"></tbody>
      </table>
    </div>
  </div>
</div>`;

  mdRenderAngles();
  mdRenderCompounds();
}

function mdRenderAngles() {
  const data = window._ceatData;
  const tbody = document.getElementById('md-angle-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  data.ntbAngles.forEach((row, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" style="width:100%;font-size:12px;" value="${row.gtCode}" onchange="mdUpdateAngle(${idx},'gtCode',this.value)"></td>
      <td class="num"><input type="number" step="0.1" style="width:70px;font-size:12px;" value="${row.angle != null ? row.angle : ''}" onchange="mdUpdateAngle(${idx},'angle',this.value)"></td>
      <td><button class="btn btn-danger btn-sm" style="padding:2px 6px;font-size:10px;" onclick="mdRemoveAngle(${idx})">X</button></td>`;
    tbody.appendChild(tr);
  });
}

function mdUpdateAngle(idx, field, value) {
  const data = window._ceatData;
  if (field === 'gtCode') data.ntbAngles[idx].gtCode = value;
  else data.ntbAngles[idx].angle = value !== '' ? parseFloat(value) : null;
}

function mdAddAngle() {
  window._ceatData.ntbAngles.push({ gtCode: '', angle: null });
  mdRenderAngles();
}

function mdRemoveAngle(idx) {
  if (!confirm('Remove this angle entry?')) return;
  window._ceatData.ntbAngles.splice(idx, 1);
  mdRenderAngles();
}

function mdRenderCompounds() {
  const data = window._ceatData;
  const tbody = document.getElementById('md-compound-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  data.compounds.forEach((row, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" style="width:90px;font-size:12px;font-weight:600;" value="${row.code}" onchange="mdUpdateCmpd(${idx},'code',this.value)"></td>
      <td><input type="text" style="width:60px;font-size:12px;" value="${row.gauge}" onchange="mdUpdateCmpd(${idx},'gauge',this.value)"></td>
      <td class="num"><input type="number" step="0.01" style="width:80px;font-size:12px;" value="${row.thickness}" onchange="mdUpdateCmpd(${idx},'thickness',this.value)"></td>
      <td><button class="btn btn-danger btn-sm" style="padding:2px 6px;font-size:10px;" onclick="mdRemoveCmpd(${idx})">X</button></td>`;
    tbody.appendChild(tr);
  });
}

function mdUpdateCmpd(idx, field, value) {
  const data = window._ceatData;
  if (field === 'thickness') data.compounds[idx][field] = parseFloat(value) || 0;
  else data.compounds[idx][field] = value;
}

function mdAddCompound() {
  window._ceatData.compounds.push({ code: '', gauge: '', thickness: 0 });
  mdRenderCompounds();
}

function mdRemoveCmpd(idx) {
  if (!confirm('Remove this compound entry?')) return;
  window._ceatData.compounds.splice(idx, 1);
  mdRenderCompounds();
}

function mdSave() {
  saveData(window._ceatData);
  // Re-render CONST Config since thickness lookups may have changed
  renderConstConfig();
  showToast('Master Data saved. Cascaded to CONST Config.', 'success');
}
