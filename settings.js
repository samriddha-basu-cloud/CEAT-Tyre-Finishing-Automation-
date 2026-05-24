// ── Settings & Export page ───────────────────────────────────
function renderSettings() {
  const el = document.getElementById('page-settings');
  el.innerHTML = `
<div class="page-header">
  <h1>Settings &amp; Export</h1>
  <p>Manage application data — backup, restore, export and reset.</p>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">

  <!-- Backup & Restore -->
  <div class="card">
    <div class="card-header"><div class="card-title">Backup &amp; Restore</div></div>
    <div class="card-body" style="display:flex;flex-direction:column;gap:14px;">
      <p style="font-size:13px;color:var(--grey-700);line-height:1.6;">Export all application data (Master Data, CONST Config, Tyre Finishing rows) as a JSON backup file. Restore from a previously exported file.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="settingsExportJSON()">Export Backup (JSON)</button>
        <button class="btn btn-outline" onclick="settingsImportJSON()">Restore from Backup</button>
        <input type="file" id="settings-file-input" accept=".json" style="display:none;" onchange="settingsHandleImport(event)">
      </div>
      <div class="alert alert-info" style="margin:0;">Backup includes all GT Codes, compounds, NTB angles, CONST configs, and Tyre Finishing production rows.</div>
    </div>
  </div>

  <!-- Export CSV -->
  <div class="card">
    <div class="card-header"><div class="card-title">Export to CSV</div></div>
    <div class="card-body" style="display:flex;flex-direction:column;gap:14px;">
      <p style="font-size:13px;color:var(--grey-700);line-height:1.6;">Export individual sheets as CSV for use in Excel or other tools.</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <button class="btn btn-outline" onclick="settingsExportCSV('constConfig')">Export CONST Config (CSV)</button>
        <button class="btn btn-outline" onclick="settingsExportCSV('compounds')">Export Compound Table (CSV)</button>
        <button class="btn btn-outline" onclick="settingsExportCSV('ntbAngles')">Export NTB Angle Table (CSV)</button>
        <button class="btn btn-outline" onclick="settingsExportCSV('tyreFinishing')">Export Tyre Finishing Rows (CSV)</button>
      </div>
    </div>
  </div>

  <!-- App Info -->
  <div class="card">
    <div class="card-header"><div class="card-title">Application Information</div></div>
    <div class="card-body">
      <table class="data-table">
        <tbody>
          <tr><td style="font-weight:600;width:180px;">Application</td><td>Tyre Finishing Pro</td></tr>
          <tr><td style="font-weight:600;">Version</td><td>3.0</td></tr>
          <tr><td style="font-weight:600;">Plant</td><td>CEAT Tyres — Nashik</td></tr>
          <tr><td style="font-weight:600;">Last Updated</td><td>23 May 2026</td></tr>
          <tr><td style="font-weight:600;">GT Codes Loaded</td><td id="info-gt-count">—</td></tr>
          <tr><td style="font-weight:600;">Compounds Loaded</td><td id="info-cmpd-count">—</td></tr>
          <tr><td style="font-weight:600;">NTB Angles Loaded</td><td id="info-angle-count">—</td></tr>
          <tr><td style="font-weight:600;">Storage</td><td>Browser localStorage (persistent)</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Reset -->
  <div class="card">
    <div class="card-header"><div class="card-title">Data Reset</div></div>
    <div class="card-body" style="display:flex;flex-direction:column;gap:14px;">
      <div class="alert alert-danger" style="margin:0;">
        <strong>Warning:</strong> Resetting will erase all locally saved changes and restore factory defaults. This cannot be undone. Export a backup first.
      </div>
      <button class="btn btn-danger" onclick="settingsReset()">Reset to Factory Defaults</button>
    </div>
  </div>

</div>`;

  // Update info counters
  const data = window._ceatData;
  const si = id => { const e = document.getElementById(id); if(e) e.textContent = '...'; };
  setTimeout(() => {
    const d = window._ceatData;
    const s = id => { const e = document.getElementById(id); if(e) e.textContent = d[id.replace('info-','').replace('-count','')] ? '' : '—'; };
    document.getElementById('info-gt-count') && (document.getElementById('info-gt-count').textContent = d.constConfig.length);
    document.getElementById('info-cmpd-count') && (document.getElementById('info-cmpd-count').textContent = d.compounds.length);
    document.getElementById('info-angle-count') && (document.getElementById('info-angle-count').textContent = d.ntbAngles.length);
  }, 50);
}

function settingsExportJSON() {
  const data = window._ceatData;
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'ceat_tyre_finishing_backup_' + new Date().toISOString().slice(0,10) + '.json';
  a.click();
  showToast('Backup exported.', 'success');
}

function settingsImportJSON() {
  document.getElementById('settings-file-input').click();
}

function settingsHandleImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!imported.constConfig || !imported.compounds) throw new Error('Invalid file format.');
      window._ceatData = imported;
      saveData(imported);
      // Re-render all pages
      renderDashboard();
      renderTyreFinishing();
      renderCutCalculator();
      renderMasterData();
      renderConstConfig();
      renderSettings();
      showToast('Data restored from backup.', 'success');
    } catch(err) {
      showToast('Import failed: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function settingsExportCSV(type) {
  const data = window._ceatData;
  let csv = '';
  let filename = '';

  if (type === 'constConfig') {
    filename = 'ceat_const_config.csv';
    csv = 'Sl,GT Code,Drum Dia (mm),Drum Inch,CONST,Plies,Breakers,Angle,Cmpd P1,Cmpd P2,Cmpd P3,Cmpd P4,Cmpd P5,Cmpd P6,Thick P1,Thick P2,Thick P3,Thick P4,Thick P5,Thick P6\n';
    data.constConfig.forEach(r => {
      const t = computeThicknesses(data, r);
      csv += [r.sl, r.gtCode, r.drumDia, (r.drumDia/25.4).toFixed(4), r.const_, r.plies, r.breakers, r.angle != null ? r.angle : '',
              ...r.cmpd, ...t.map(x => x.toFixed(2))].map(v => `"${v}"`).join(',') + '\n';
    });
  } else if (type === 'compounds') {
    filename = 'ceat_compounds.csv';
    csv = 'Code,Gauge,Thickness (mm)\n';
    data.compounds.forEach(r => { csv += `"${r.code}","${r.gauge}","${r.thickness}"\n`; });
  } else if (type === 'ntbAngles') {
    filename = 'ceat_ntb_angles.csv';
    csv = 'GT Code,NTB Angle (deg)\n';
    data.ntbAngles.forEach(r => { csv += `"${r.gtCode}","${r.angle != null ? r.angle : ''}"\n`; });
  } else if (type === 'tyreFinishing') {
    filename = 'ceat_tyre_finishing.csv';
    csv = 'Sl,GT Code,No. of Tyres,Svc P1,Svc P2,Svc P3,Svc P4,Svc P5,Svc P6,Buildup,Inv Servicer,Inv LetOff,Inv Floor,Inv Bias\n';
    data.tyreFinishingRows.filter(r => r.gtCode).forEach(r => {
      csv += [r.sl, r.gtCode, r.noOfTyres, ...r.servicer, r.buildup, r.inventoryServicer, r.inventoryLetoff, r.inventoryFloor, r.inventoryBias].map(v => `"${v || ''}"`).join(',') + '\n';
    });
  }

  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  showToast('CSV exported: ' + filename, 'success');
}

function settingsReset() {
  if (!confirm('This will erase all saved data and restore factory defaults.\n\nAre you absolutely sure?')) return;
  localStorage.removeItem('ceat_data');
  window._ceatData = loadData();
  renderDashboard();
  renderTyreFinishing();
  renderCutCalculator();
  renderMasterData();
  renderConstConfig();
  renderSettings();
  showToast('Reset to factory defaults.', '');
}
