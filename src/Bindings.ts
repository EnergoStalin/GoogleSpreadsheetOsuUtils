function FetchOsuUserProfileImage(name: string) {
  return getUser(name)["avatar_url"];
}

function FetchOsuUserProperty(name: string, property: string) {
  return getUser(name)[property];
}