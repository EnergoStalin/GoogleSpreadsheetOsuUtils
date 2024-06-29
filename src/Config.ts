class Config {
	private static readonly properties = PropertiesService.getDocumentProperties();
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

	static get enableCaching(): boolean {
		return (Config.properties.getProperty('enableCaching') ?? '0') === '1';
	}
	static set enableCaching(value: boolean) {
		Config.setPropertyOrDeleteIfNull('enableCaching', value ? '1' : '0');
	}

	static get ignoreCached(): boolean {
		return (Config.properties.getProperty('ignoreCached') ?? '0') === '1';
	}
	static set ignoreCached(value: boolean) {
		Config.setPropertyOrDeleteIfNull('ignoreCached', value ? '1' : '0');
	}

	private static setPropertyOrDeleteIfNull(key: string, val: string) {
		if (val) {
			Config.properties.setProperty(key, val);
		} else {
			Config.properties.deleteProperty(key);
		}
	}
}
