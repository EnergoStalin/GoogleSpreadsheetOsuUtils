/**
 * Shorthand for FetchOsuUserProperty(name, 'cover_url')
 * @param name
 * @returns avatar url
 */
function FetchOsuUserProfileImage(name: string) {
	return FetchOsuUserProperty(name, 'cover_url');
}

/**
 * Fetch user from api
 * @param name user to fetch
 * @param property property to return
 * @returns user[property]
 */
function FetchOsuUserProperty(name: string, property: string) {
	return getUser(name)[property];
}

/**
 * Shorthand for FetchOsuUserProperty(name, 'pp_raw')
 * @param name user to fetch
 * @param property property to return
 * @returns user[property]
 */
function FetchOsuUserPP(name: string) {
	return FetchOsuUserProperty(name, 'pp_raw');
}

/**
 * Shorthand for FetchOsuBeatmapProperty(identifier, 'cover_url')
 * @param  {string} identifier
 */
function FetchOsuBeatmapCover(identifier: string) {
	return FetchOsuBeatmapProperty(identifier, 'cover_url');
}

/**
 * Shorthand for FetchOsuBeatmapProperty(identifier, 'thumb_url')
 * @param  {string} identifier
 */
function FetchOsuBeatmapThumb(identifier: string) {
	return FetchOsuBeatmapProperty(identifier, 'thumb_url');
}

/**
 * Fetch beatmap from api and return single property from it
 * @param  {string} identifier can be url or bmid
 * @param  {string} property
 * @returns {string} property from api object
 */
function FetchOsuBeatmapProperty(identifier: string, property: string) {
	return getBeatmap(identifier)[property];
}

/**
 * Apply call on key and obtains properties from it returning it's array
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
 * Shorthand for FetchOsuObjectProperties(identifier, properties, getBeatmap)
 * @param  {string} identifier can be url or bmid
 * @param  {string} properties
 * @returns {string} properties from api object
 */
function FetchOsuBeatmapProperties(identifier: string, properties: string) {
	return FetchOsuObjectProperties(identifier, properties, getBeatmap);
}

/**
 * Shorthand for FetchOsuObjectProperties(name, properties, getUser)
 * @param  {string} name
 * @param  {string} properties
 * @returns {string} properties from api object
 */
function FetchOsuUserProperties(name: string, properties: string) {
	return FetchOsuObjectProperties(name, properties, getUser);
}
