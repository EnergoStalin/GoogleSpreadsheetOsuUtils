class Config {
	private static readonly properties =
		PropertiesService.getDocumentProperties();
	static readonly baseUrl: string = 'https://osu.ppy.sh/api';

	static get apiKey() {
		return Config.properties.getProperty('APIv1 key') ?? '';
	}
	static set apiKey(value: string) {
		Config.setPropertyOrDeleteIfNull('APIv1 key', value);
	}

	static get cacheTime() {
		return Config.properties.getProperty('cacheTime') ?? '1800';
	}
	static set cacheTime(value: string) {
		Config.setPropertyOrDeleteIfNull('cacheTime', value);
	}

	private static setPropertyOrDeleteIfNull(key: string, val: string) {
		if (val) {
			Config.properties.setProperty(key, val);
		} else {
			Config.properties.deleteProperty(key);
		}
	}
}
