/**
 * Transpose opts to url query
 * @param url baseUrl
 * @param opts opts to transpose
 * @returns result url
 */
function applyOpts(url: string, opts: any) {
	for (const k in opts) {
		url += `${!url.includes('?') ? '?' : '&'}${k}=${encodeURIComponent(
			opts[k]
		)}`;
	}
	return url;
}

/**
 * Get api key from document store
 * @returns {string | null} apiKey form store or null
 */
function getApiKey() {
	return PropertiesService.getDocumentProperties().getProperty(APIKEYPROPNAME);
}

/**
 * Store apiKey to document store
 * @param {string} val key to store
 */
function setApiKey(val: string) {
	PropertiesService.getDocumentProperties().setProperty(APIKEYPROPNAME, val);
}

/**
 * Perform json request to url, parse and returns first object in array
 * @param {string} url
 * @return {any} json object
 */
function jSONArrayRequestGetFirst(url: string) {
	return JSON.parse(UrlFetchApp.fetch(url).getContentText('UTF8'))[0];
}

/**
 * @param  {string} key apiKey to check
 * @returns {boolean} valid or not
 */
function checkApiKey(key: string) {
	try {
		jSONArrayRequestGetFirst(
			applyOpts(BASEURL + '/get_user', {
				k: key,
				type: 'id',
				u: 2,
			})
		);

		return true;
	} catch {
		return false;
	}
}

/**
 * Patch opts with api key
 * @param {any} opts for query
 * @returns {any} opts patched with api key
 */
function addApiKey(opts: any) {
	return {
		...opts,
		k: getApiKey(),
	};
}
