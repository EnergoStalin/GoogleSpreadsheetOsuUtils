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
		url += `${!url.includes('?') ? '?' : '&'}${k}=${encodeURIComponent(opts[k])}`;
	}
	return url;
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
		const text = res.getContentText('UTF8');
		const json = JSON.parse(text)[0];
		if (json) return json;

		throw `${url} ${text} ${json}`;
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
		k: Config.apiKey,
	};
}
