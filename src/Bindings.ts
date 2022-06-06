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
