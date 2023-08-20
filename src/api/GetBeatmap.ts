/**
 * Fetch beatmap (caching applied forever)
 * @param link beatmap link to fetch
 * @returns js object patched with some custom properties
 */
function getBeatmap(url: string) {
	const lock = LockService.getDocumentLock()!;

	try {
		lock.waitLock(300000);
		return Config.enableCaching
			? _getBeatmapCached(url)
			: _getBeatmap(_parseBeatmapUrl(url));
	} finally {
		lock.releaseLock();
	}
}

function _parseBeatmapUrl(url: string) {
	const marr = url.match(/(\d+)/g);
	if (marr === null || marr?.length < 2) throw 'Not valid url';

	return {
		bmsid: marr[0],
		bmid: marr[1],
		cacheKey: `b/${marr[1]}`,
	};
}

function _getBeatmapCached(url: string) {
	const cache = CacheService.getDocumentCache()!;

	const data = _parseBeatmapUrl(url);

	let json = cache.get(data.cacheKey);
	if (json) {
		const obj = JSON.parse(json);
		if (obj) {
			Logger.log(`Got cached result: ${data.cacheKey}`);
			return obj;
		}
	}

	cache.remove(data.cacheKey);
	const beatmap = _getBeatmap(data);
	json = JSON.stringify(beatmap);
	cache.put(data.cacheKey, json);

	return beatmap;
}

function _getBeatmap(data: {bmid: string; bmsid: string, cacheKey: string}) {
	const beatmap = jSONArrayRequestGetFirst(
		applyOpts(
			Config.baseUrl + '/get_beatmaps',
			addApiKey({
				b: data.bmid,
				m: '0',
				limit: '1',
			})
		)
	);
	if (!beatmap) return;

	beatmap[
		'cover_url'
	] = `https://assets.ppy.sh/beatmaps/${data.bmsid}/covers/cover.jpg`;
	beatmap['thumb_url'] = `https://b.ppy.sh/thumb/${data.bmsid}l.jpg`;

	Logger.log(`Fetched from api: ${data.cacheKey}`);

	return beatmap;
}
