function applyOpts(url: string, opts: any) {
	for (const k in opts) {
		url += `${!url.includes('?') ? '?' : '&'}${k}=${encodeURIComponent(
			opts[k]
		)}`;
	}
	return url;
}

function addApiKey(opts: any) {
	opts['k'] = PropertiesService.getScriptProperties().getProperty('apiKey');
	return opts;
}
