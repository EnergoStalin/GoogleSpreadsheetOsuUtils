/**
 * Fetch user (caching for 7 days applied)
 * @param name user to fetch
 * @returns js object patched with some custom properties
 */
function getUser(name: string) {
	const lock = LockService.getDocumentLock()!;

	try {
		lock.tryLock(30000);
		return Config.enableCaching ? _getUserCached(name) : _getUser(name);
	} finally {
		lock.releaseLock();
	}
}

function _getUserCached(name: string) {
	const cache = CacheService.getDocumentCache()!;
	const cacheKey = `u/${name}`;

	const json = cache.get(cacheKey);
	if (json) {
		const obj = JSON.parse(json);
		if (obj) {
			return obj;
		}
	}

	const user = _getUser(name);
	cache.put(cacheKey, JSON.stringify(user));

	return user;
}

function _getUser(name: string) {
	const user = jSONArrayRequestGetFirst(
		applyOpts(
			Config.baseUrl + '/get_user',
			addApiKey({
				u: name,
				m: '0',
			})
		)
	);

	user['cover_url'] = `http://s.ppy.sh/a/${user['user_id']}`;

	return user;
}
