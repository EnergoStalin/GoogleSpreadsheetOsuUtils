/**
 * Fetch user (caching for 7 days applied)
 * @param name user to fetch
 * @returns js object patched with some custom properties
 */
function getUser(name: string) {
	let user = tryGetUserFromCache(name);
	if (user !== null) return user;

	user = jSONArrayRequestGetFirst(
		applyOpts(
			BASEURL + '/get_user',
			addApiKey({
				u: name,
				m: 0,
			})
		)
	);

	user['avatar_url'] = `http://s.ppy.sh/a/${user['user_id']}`;
	user['timestamp'] = new Date();
	user['blank'] = '';

	CacheService.getDocumentCache()!.put(user['username'], JSON.stringify(user));

	return user;
}

/**
 *
 * @param name
 */
function tryGetUserFromCache(name: string): any | null {
	const doc = CacheService.getDocumentCache()!;
	const json = doc.get(name);
	if (json === null) return null;

	try {
		const usr = JSON.parse(json);
		if (!is7daysPassed(new Date(usr['timestamp']))) return usr;
	} catch {
		doc.remove(name);
	}

	return null;
}

/**
 *
 * @param date
 * @returns
 */
function is7daysPassed(date: Date) {
	return new Date().getTime() - date.getTime() < new Date().getTime() + 604800;
}
