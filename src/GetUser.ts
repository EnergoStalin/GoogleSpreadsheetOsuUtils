function getUser(name: string) {
	const doc = CacheService.getDocumentCache()!;
	if (doc.get(name) !== null) {
		try {
			const rt = JSON.parse(doc.get(name)!);
			rt['timestamp'] = new Date(rt['timestamp']);
			const date: Date = rt['timestamp'];

			// Store cache 7 days
			if (new Date().getTime() - date.getTime() < new Date().getTime() + 604800)
				return rt;
		} catch {
			doc.remove(name);
		}
	}

	const url = applyOpts(
		baseUrl + '/get_user',
		addApiKey({
			u: name,
			m: 0,
		})
	);

	const user = JSON.parse(UrlFetchApp.fetch(url).getContentText())[0];
	user['avatar_url'] = `http://s.ppy.sh/a/${user['user_id']}`;
	user['timestamp'] = new Date();
	user['blank'] = '';

	doc.put(user['username'], JSON.stringify(user));

	return user;
}
