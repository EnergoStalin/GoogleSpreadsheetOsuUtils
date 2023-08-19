/**
 * Object consisting from string properties and string values
 */
interface SSO {
	[key: string]: string;
}

/**
 * Transpose opts to url query
 * @param url baseUrl
 * @param opts opts to transpose
 * @returns result url
 */
function applyOpts(url: string, opts: SSO) {
	for (const k in opts) {
		url += `${!url.includes('?') ? '?' : '&'}${k}=${encodeURIComponent(
			opts[k]
		)}`;
	}
	return url;
}

/**
 * Get api key from document store
 * @returns {string?} apiKey form store or null
 */
function getApiKey() {
	return Config.apiKey;
}

/**
 * Store apiKey to document store
 * @param {string} val key to store
 */
function setApiKey(val: string) {
	Config.apiKey = val;
}

/**
 * Perform json request to url, parse and returns first object in array.
 * Also logging api errors
 * @param {string} url
 * @return {SSO} json object
 */
function jSONArrayRequestGetFirst(url: string) {
	try {
		const res = UrlFetchApp.fetch(url);
		if (res.getResponseCode() !== 200)
			throw `Peppy responded with code ${res.getResponseCode()} you baka. Responce body: ${res.getContentText()}`;
		return JSON.parse(res.getContentText('UTF8'))[0];
	} catch (e) {
		Logger.log(`Api error: ${e}`);
	}
}

/**
 * @param  {string} key apiKey to check
 * @returns {boolean} valid or not
 */
function checkApiKey(key: string) {
	try {
		jSONArrayRequestGetFirst(
			applyOpts(Config.baseUrl + '/get_user', {
				k: key,
				type: 'id',
				u: '2',
			})
		);

		return true;
	} catch {
		return false;
	}
}

/**
 * Patch opts with api key
 * @param {SSO} opts for query
 * @returns {SSO} opts patched with api key
 */
function addApiKey(opts: SSO) {
	return {
		...opts,
		k: getApiKey() as string,
	};
}
