/**
 * Google callback
 */
function onOpen() {
  const UI = SpreadsheetApp.getUi();
  UI.createAddonMenu()
    .addSubMenu(
      UI.createMenu('osu!API Management')
        .addItem('Set API key', 'showKeyStoringPrompt')
        .addSubMenu(
          renderGameModeMenu(
            'Global Game Mode',
            'Global',
            Config.getGameModeGlobal,
          ),
        )
        .addSubMenu(
          renderGameModeMenu(
            'Selected Sheet Game Mode',
            'Scoped',
            Config.getGameModeScoped,
          ),
        )
        .addItem('Remove API key', 'removeKeyStoringPrompt'),
    )
    .addSubMenu(
      UI.createMenu('Cache')
        .addItem('Expiry time', 'setCacheExpiryTime')
        .addItem('Use cache?', 'setEnableCache')
        .addItem('Ignore cached?', 'setIgnoreCached'),
    )
    .addToUi();
}

function renderGameModeMenu(
  title: string,
  suffix: string,
  getter: () => string | null,
) {
  const UI = SpreadsheetApp.getUi();
  const menu = UI.createMenu(title);
  const modes = ['STD', 'Taiko', 'CTB', 'Mania'];

  const selectedMode = Number.parseInt(getter() ?? '0', 10);

  const len = modes.length;
  for (let i = 0; i < len; i++) {
    let mode = modes[i];
    const handler = `set${mode}Mode${suffix}`;
    if (i === selectedMode) mode = `${mode} *`;

    menu.addItem(mode, handler);
  }

  return menu;
}

function setSTDModeGlobal() {
  Config.setGameModeGlobal('0');
}
function setTaikoModeGlobal() {
  Config.setGameModeGlobal('1');
}
function setCTBModeGlobal() {
  Config.setGameModeGlobal('2');
}
function setManiaModeGlobal() {
  Config.setGameModeGlobal('3');
}

function setSTDModeScoped() {
  Config.setGameModeScoped('0');
}
function setTaikoModeScoped() {
  Config.setGameModeScoped('1');
}
function setCTBModeScoped() {
  Config.setGameModeScoped('2');
}
function setManiaModeScoped() {
  Config.setGameModeScoped('3');
}

/**
 * Prompt & check & save api key from storage
 */
function showKeyStoringPrompt() {
  const UI = SpreadsheetApp.getUi();

  if (Config.getApiKey() !== '')
    if (
      UI.alert(
        'An API key already exists, do you want to overwrite it?',
        UI.ButtonSet.YES_NO,
      ) === UI.Button.NO
    )
      return;

  // Prompt for api key
  const res = UI.prompt(
    "Please enter your osu! APIv1 key (create one using http://osu.ppy.sh/p/api if you don't have it)",
    'Please enter your API key:',
    UI.ButtonSet.OK_CANCEL,
  );

  // If cancelled return
  if (res.getSelectedButton() !== UI.Button.OK) return;
  const apiKey = res.getResponseText();

  if (checkApiKey(apiKey)) {
    Config.setApiKey(apiKey);
    UI.alert(
      'Your API key is working correctly and has been stored for use in this spreadsheet.',
    );
  } else {
    UI.alert(
      'Your API key did not work, plase check that it is correct and try again.',
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
      UI.ButtonSet.YES_NO,
    ) === UI.Button.NO
  )
    return;

  Config.setApiKey('');
  UI.alert('The key has been removed successfully.');
}

function setCacheExpiryTime() {
  const UI = SpreadsheetApp.getUi();
  const res = UI.prompt(
    'Cache expiry time',
    `Expiry time in secpnds. Current value: ${Config.getCacheTime()}`,
    UI.ButtonSet.OK_CANCEL,
  );

  // If cancelled return
  if (res.getSelectedButton() !== UI.Button.OK) return;
  Config.setCacheTime(res.getResponseText());

  Logger.log(`Cache time set to ${Config.getCacheTime()}`);
}

function setEnableCache() {
  Config.setCachingEnabled(
    booleanPrompt(
      'Enable cache? Enable or disable using of cache overall between api and script.',
    ),
  );
  Logger.log(`Cache set to ${Config.isCachingEnabled()}`);
}

function setIgnoreCached() {
  Config.setIgnoreCached(
    booleanPrompt(
      'Ignore cached? Ignores any existing entries overriding with new fetched values.',
    ),
  );
  Logger.log(`Ignore cached set to ${Config.shouldIgnoreCached()}`);
}

function booleanPrompt(text: string) {
  const UI = SpreadsheetApp.getUi();
  const res = UI.alert(text, UI.ButtonSet.YES_NO);

  return res === UI.Button.YES;
}
