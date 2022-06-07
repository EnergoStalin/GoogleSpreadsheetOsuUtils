/**
 * Fetch beatmap (caching applied forever)
 * @param link beatmap link to fetch
 * @returns js object patched with some custom properties
 */
function getBeatmap(url: string) {
	const marr = url.match(/(\d+)/g);
	if (marr === null || marr?.length < 2)
		throw 'Not valid url';

	const bmsid = marr[0],
		bmid = marr[1],
		cacheKey = `b/${bmid}`;

	const json = CacheService.getDocumentCache()!.get(cacheKey);
	if (json !== null) {
		const obj = JSON.parse(json);
		if(obj !== undefined) {
			return obj;
		}
	}

	CacheService.getDocumentCache()!.remove(cacheKey)

	const beatmap = jSONArrayRequestGetFirst(
		applyOpts(
			BASEURL + '/get_beatmaps',
			addApiKey({
				b: bmid,
				m: 0,
				limit: 1
			})
		)
	);
	if(!beatmap) return;

	beatmap['cover_url'] = `https://assets.ppy.sh/beatmaps/${bmsid}/covers/cover.jpg`;
	beatmap['thumb_url'] = `https://b.ppy.sh/thumb/${bmsid}l.jpg`;
	CacheService.getDocumentCache()!.put(
		cacheKey,
		JSON.stringify(beatmap)
	);

	return beatmap;
}
