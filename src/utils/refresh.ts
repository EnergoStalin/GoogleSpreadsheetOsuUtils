function refreshToggle() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const range = ss.getSheetByName('RefreshToggle');
  if (!range) {
    Logger.log('No sheet with name RefreshToggle found');
    return;
  }

  const cell = range.getRange('A1:A1');

  cell.setValue(false);
  SpreadsheetApp.flush();
  cell.setValue(true);
}
