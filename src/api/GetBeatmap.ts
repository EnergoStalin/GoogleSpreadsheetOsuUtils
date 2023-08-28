interface BeatmapData {
	bmid: string;
	bmsid: string;
	cacheKey: string;
}

/**
 * Fetch beatmap (caching applied forever)
 * @param identifier can be url or bmid
 * @returns js object patched with some custom properties
 */
function getBeatmap(identifier: any) {
	const lock = LockService.getDocumentLock()!;

	const data = _resolveBeatmapIdentifier(identifier);

	try {
		lock.waitLock(300000);
		return Config.enableCaching ? _getBeatmapCached(data) : _getBeatmap(data);
	} finally {
		lock.releaseLock();
	}
}

function _resolveBeatmapIdentifier(identifier: any) {
	let data: BeatmapData = {
		bmid: identifier,
		bmsid: '',
		cacheKey: `b/${identifier}`,
	};

	if (identifier instanceof String) {
		const parsed = _parseBeatmapUrl(identifier);
		if (parsed) data = parsed;
	}

	return data;
}

function _parseBeatmapUrl(url: any): BeatmapData | undefined {
	const marr = url.match(/(\d+)/g);
	if (marr === null || marr?.length < 2) return;

	return {
		bmsid: marr[0],
		bmid: marr[1],
		cacheKey: `b/${marr[1]}`,
	};
}

function _getBeatmapCached(data: BeatmapData) {
	const cache = CacheService.getDocumentCache()!;

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

function _getBeatmap(data: BeatmapData) {
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
	] = `https://assets.ppy.sh/beatmaps/${beatmap.beatmapset_id}/covers/cover.jpg`;
	beatmap['thumb_url'] = `https://b.ppy.sh/thumb/${beatmap.beatmapset_id}l.jpg`;

	Logger.log(`Fetched from api: ${data.cacheKey}`);

	return beatmap;
}
