namespace Config {
  const properties = PropertiesService.getDocumentProperties();
  export const baseUrl = 'https://osu.ppy.sh/api';

  export function getApiKey(): string {
    return properties.getProperty('APIv1 key') ?? '';
  }
  export function setApiKey(value: string): void {
    setPropertyOrDeleteIfNull('APIv1 key', value);
  }

  export function getGameMode(): string {
    return properties.getProperty('gameMode') ?? '0';
  }
  /**
   * @param {string} value (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
   */
  export function setGameMode(value: string): void {
    setPropertyOrDeleteIfNull('gameMode', value);
  }

  export function getCacheTime(): string {
    return properties.getProperty('cacheTime') ?? '1800';
  }
  export function setCacheTime(value: string): void {
    setPropertyOrDeleteIfNull('cacheTime', value);
  }

  export function isCachingEnabled(): boolean {
    return (properties.getProperty('enableCaching') ?? '0') === '1';
  }
  export function setCachingEnabled(value: boolean): void {
    setPropertyOrDeleteIfNull('enableCaching', value ? '1' : '0');
  }

  export function shouldIgnoreCached(): boolean {
    return (properties.getProperty('ignoreCached') ?? '0') === '1';
  }
  export function setIgnoreCached(value: boolean): void {
    setPropertyOrDeleteIfNull('ignoreCached', value ? '1' : '0');
  }

  function setPropertyOrDeleteIfNull(key: string, val: string): void {
    if (val) {
      properties.setProperty(key, val);
    } else {
      properties.deleteProperty(key);
    }
  }
}
