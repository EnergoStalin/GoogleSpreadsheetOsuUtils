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
				.addItem('Use cache?', 'setEnableCache')
				.addItem('Ignore cached?', 'setIgnoreCached')
		)
		.addToUi();
}

/**
 * Prompt & check & save api key from storage
 */
function showKeyStoringPrompt() {
	const UI = SpreadsheetApp.getUi();

	if (Config.apiKey !== '')
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
		Config.apiKey = apiKey;
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

	if (
		UI.alert(
			'Are you sure you want to remove the stored API key?',
			UI.ButtonSet.YES_NO
		) === UI.Button.NO
	)
		return;

	Config.apiKey = '';
	UI.alert('The key has been removed successfully.');
}

function setCacheExpiryTime() {
	const UI = SpreadsheetApp.getUi();
	const res = UI.prompt(
		'Cache expiry time',
		`Expiry time in secpnds. Current value: ${Config.cacheTime}`,
		UI.ButtonSet.OK_CANCEL
	);

	// If cancelled return
	if (res.getSelectedButton() !== UI.Button.OK) return;
	Config.cacheTime = res.getResponseText();

	Logger.log(`Cache time set to ${Config.cacheTime}`);
}

function setEnableCache() {
	Config.enableCaching = booleanPrompt(
		'Enable cache? Enable or disable using of cache overall between api and script.'
	);
	Logger.log(`Cache set to ${Config.enableCaching}`);
}

function setIgnoreCached() {
	Config.ignoreCached = booleanPrompt(
		'Ignore cached? Ignores any existing entries overriding with new fetched values.'
	);
	Logger.log(`Ignore cached set to ${Config.ignoreCached}`);
}

function booleanPrompt(text: string) {
	const UI = SpreadsheetApp.getUi();
	const res = UI.alert(text, UI.ButtonSet.YES_NO);

	return res === UI.Button.YES;
}
