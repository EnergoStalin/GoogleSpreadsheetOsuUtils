/**
 * Fetch user (caching for 7 days applied)
 * @param name user to fetch
 * @returns js object patched with some custom properties
 */
function getUser(name: string) {
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

	return user;
}
