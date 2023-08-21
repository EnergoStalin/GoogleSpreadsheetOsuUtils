function refreshToggle() {
	const ss = SpreadsheetApp.getActiveSpreadsheet();
	const range = ss.getSheetByName('RefreshToggle')!.getRange('A1:A1');

	range.setValue(false);
	SpreadsheetApp.flush();
	range.setValue(true);
}
