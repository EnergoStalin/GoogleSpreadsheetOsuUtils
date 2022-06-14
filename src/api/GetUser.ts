/**
 * Fetch user (caching for 7 days applied)
 * @param name user to fetch
 * @returns js object patched with some custom properties
 */
function getUser(name: string) {
	const cacheKey = `u/${name}`;
	const json = CacheService.getDocumentCache()!.get(cacheKey);
	if (json !== null) {
		const obj = JSON.parse(json);
		if (obj !== undefined) {
			return obj;
		}
	}

	const user = jSONArrayRequestGetFirst(
		applyOpts(
			BASEURL + '/get_user',
			addApiKey({
				u: name,
				m: '0',
			})
		)
	);

	user['cover_url'] = `http://s.ppy.sh/a/${user['user_id']}`;
	CacheService.getDocumentCache()!.put(cacheKey, JSON.stringify(user), 604800);

	return user;
}
