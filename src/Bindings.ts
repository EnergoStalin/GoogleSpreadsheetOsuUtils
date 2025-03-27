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
 * @returns global pp rank
 */
function GetOsuUserPpRank(name: string) {
  return GetOsuUserProperty(name, 'pp_rank');
}

/**
 * Shorthand for GetOsuUserProperty(name, 'pp_country_rank')
 * @param name
 * @returns pp rank in user country
 */
function GetOsuUserPpCountryRank(name: string) {
  return GetOsuUserProperty(name, 'pp_country_rank');
}

/**
 * Shorthand for GetOsuUserProperty(name, 'country')
 * @returns country code
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
 */
function GetOsuBeatmapCover(identifier: string) {
  return GetOsuBeatmapProperty(identifier, 'cover_url');
}

/**
 * Shorthand for GetOsuBeatmapProperty(identifier, 'thumb_url')
 */
function GetOsuBeatmapThumb(identifier: string) {
  return GetOsuBeatmapProperty(identifier, 'thumb_url');
}

/**
 * Get beatmap from api and return single property from it
 * @param identifier can be url or bmid
 * @returns property from api object
 */
function GetOsuBeatmapProperty(identifier: string, property: string): string {
  return getBeatmap(identifier)[property];
}

/**
 * Apply call on key and obtains properties from it returning it's array
 * @param  properties list of props comma separated
 * @returns call prop getter
 */
function GetOsuObjectProperties(
  key: string,
  properties: string,
  call: (a: string) => SSO,
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
 * @param identifier can be url or bmid
 * @returns properties from api object
 */
function GetOsuBeatmapProperties(identifier: string, properties: string) {
  return GetOsuObjectProperties(identifier, properties, getBeatmap);
}

/**
 * Shorthand for GetOsuObjectProperties(name, properties, getUser)
 * @returns properties from api object
 */
function GetOsuUserProperties(name: string, properties: string) {
  return GetOsuObjectProperties(name, properties, getUser);
}
