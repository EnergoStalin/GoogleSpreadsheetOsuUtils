/**
 * Shorthand for GetOsuUserProperty(name, 'cover_url')
 * @param name
 * @returns avatar url
 */
function GetOsuUserProfileImage(name: string) {
	return GetOsuUserProperty(name, 'cover_url');
}

/**
 * Shorthand for GetOsuUserProperty(name, 'pp_rank')
 * @param name
 * @returns avatar url
 */
function GetOsuUserPpRank(name: string) {
	return GetOsuUserProperty(name, 'pp_rank');
}

/**
 * Shorthand for GetOsuUserProperty(name, 'pp_country_rank')
 * @param name
 * @returns avatar url
 */
function GetOsuUserPpCountryRank(name: string) {
	return GetOsuUserProperty(name, 'pp_country_rank');
}

/**
 * Shorthand for GetOsuUserProperty(name, 'country')
 * @param name
 * @returns avatar url
 */
function GetOsuUserCountry(name: string) {
	return GetOsuUserProperty(name, 'country');
}

/**
 * Get user from api
 * @param name user to Get
 * @param property property to return
 * @returns user[property]
 */
function GetOsuUserProperty(name: string, property: string) {
	return getUser(name)[property];
}

/**
 * Shorthand for GetOsuUserProperty(name, 'pp_raw')
 * @param name user to Get
 * @param property property to return
 * @returns user[property]
 */
function GetOsuUserPP(name: string) {
	return GetOsuUserProperty(name, 'pp_raw');
}

/**
 * Shorthand for GetOsuBeatmapProperty(identifier, 'cover_url')
 * @param  {string} identifier
 */
function GetOsuBeatmapCover(identifier: string) {
	return GetOsuBeatmapProperty(identifier, 'cover_url');
}

/**
 * Shorthand for GetOsuBeatmapProperty(identifier, 'thumb_url')
 * @param  {string} identifier
 */
function GetOsuBeatmapThumb(identifier: string) {
	return GetOsuBeatmapProperty(identifier, 'thumb_url');
}

/**
 * Get beatmap from api and return single property from it
 * @param  {string} identifier can be url or bmid
 * @param  {string} property
 * @returns {string} property from api object
 */
function GetOsuBeatmapProperty(identifier: string, property: string) {
	return getBeatmap(identifier)[property];
}

/**
 * Apply call on key and obtains properties from it returning it's array
 * @param  {string} key
 * @param  {string} properties list of props comma separated
 * @returns {(a: string) => SSO} call prop getter
 */
function GetOsuObjectProperties(
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
 * Shorthand for GetOsuObjectProperties(identifier, properties, getBeatmap)
 * @param  {string} identifier can be url or bmid
 * @param  {string} properties
 * @returns {string} properties from api object
 */
function GetOsuBeatmapProperties(identifier: string, properties: string) {
	return GetOsuObjectProperties(identifier, properties, getBeatmap);
}

/**
 * Shorthand for GetOsuObjectProperties(name, properties, getUser)
 * @param  {string} name
 * @param  {string} properties
 * @returns {string} properties from api object
 */
function GetOsuUserProperties(name: string, properties: string) {
	return GetOsuObjectProperties(name, properties, getUser);
}
