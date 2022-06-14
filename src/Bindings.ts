/**
 * Shorthand for FetchOsuUserProperty(name, 'avatar_url')
 * @param name
 * @returns avatar url
 */
function FetchOsuUserProfileImage(name: string) {
	return FetchOsuUserProperty(name, 'avatar_url');
}

/**
 * Fetch user from api and cache it
 * @param name user to fetch
 * @param property property to return
 * @returns user[property]
 */
function FetchOsuUserProperty(name: string, property: string) {
	return getUser(name)[property];
}

/**
 * Shorthand for FetchOsuBeatmapProperty(url, 'cover_url')
 * @param  {string} url
 */
function FetchOsuBeatmapCover(url: string) {
	return FetchOsuBeatmapProperty(url, 'cover_url');
}

/**
 * Shorthand for FetchOsuBeatmapProperty(url, 'thumb_url')
 * @param  {string} url
 */
function FetchOsuBeatmapThumb(url: string) {
	return FetchOsuBeatmapProperty(url, 'thumb_url');
}

/**
 * Fetch beatmap from api and cache it
 * @param  {string} url
 * @param  {string} property
 * @returns {string} property from api object
 */
function FetchOsuBeatmapProperty(url: string, property: string) {
	return getBeatmap(url)[property];
}

/**
 * Apply call on string and obtains object then return array with specified properties
 * @param  {string} key
 * @param  {string} properties list of props comma separated
 * @returns {(a: string) => SSO} call prop getter
 */
function FetchOsuObjectProperties(
	key: string,
	properties: string,
	call: (a: string) => SSO
) {
	const bm = call(key);
	const props = properties.split(',');

	const data: string[] = [];
	for (const k in props) {
		data.push(bm[props[k]] || '');
	}

	return [data];
}

/**
 * Fetch beatmap from api and cache it
 * @param  {string} url
 * @param  {string} property
 * @returns {string} property from api object
 */
function FetchOsuBeatmapProperties(url: string, properties: string) {
	return FetchOsuObjectProperties(url, properties, getBeatmap);
}

/**
 * Fetch beatmap from api and cache it
 * @param  {string} url
 * @param  {string} property
 * @returns {string} property from api object
 */
function FetchOsuUserProperties(url: string, properties: string) {
	return FetchOsuObjectProperties(url, properties, getUser);
}
