/**
 * Google callback
 */
function onOpen() {
	const UI = SpreadsheetApp.getUi();
	UI.createMenu('Peppy console')
		.addSubMenu(
			UI.createMenu('osu!API Management')
				.addItem('Set API key', 'showKeyStoringPrompt')
				.addItem('Remove API key', 'removeKeyStoringPrompt')
		)
    .addSubMenu(
      UI.createMenu('Cache')
        .addItem('Expiry time', 'setCacheExpiryTime')
    )
		.addToUi();
}

/**
 * Prompt & check & save api key from storage
 */
function showKeyStoringPrompt() {
	const UI = SpreadsheetApp.getUi();
	const doc = PropertiesService.getDocumentProperties();

	if (doc.getProperty('APIv1 key') !== null)
		if (
			UI.alert(
				'An API key already exists, do you want to overwrite it?',
				UI.ButtonSet.YES_NO
			) === UI.Button.NO
		)
			return;

	// Prompt for api key
	const res = UI.prompt(
		"Please enter your osu! APIv1 key (create one using http://osu.ppy.sh/p/api if you don't have it)",
		'Please enter your API key:',
		UI.ButtonSet.OK_CANCEL
	);

	// If cancelled return
	if (res.getSelectedButton() !== UI.Button.OK) return;
	const apiKey = res.getResponseText();

	if (checkApiKey(apiKey)) {
		doc.setProperty('APIv1 key', apiKey);
		UI.alert(
			'Your API key is working correctly and has been stored for use in this spreadsheet.'
		);
	} else {
		UI.alert(
			'Your API key did not work, plase check that it is correct and try again.'
		);
	}
}

/**
 * Prompt & removing api key from storage
 */
function removeKeyStoringPrompt() {
	const UI = SpreadsheetApp.getUi();
	const doc = PropertiesService.getDocumentProperties();

	if (
		UI.alert(
			'Are you sure you want to remove the stored API key?',
			UI.ButtonSet.YES_NO
		) === UI.Button.NO
	)
		return;

	doc.deleteProperty(APIKEYPROPNAME);
	UI.alert('The key has been removed successfully.');
}

/**
 * Prompt & removing api key from storage
 */
function setCacheExpiryTime() {
	const UI = SpreadsheetApp.getUi();
	const doc = PropertiesService.getDocumentProperties();

	const res = UI.prompt(
		`Expiration time deafault ${DEFAULT_CACHE_TIME}`,
		'Expiration time in seconds:',
		UI.ButtonSet.OK_CANCEL
	);

  // If cancelled return
	if (res.getSelectedButton() !== UI.Button.OK) return;
	const expiry = res.getResponseText();

  doc.setProperty(STORE_CACHE, expiry)
}
