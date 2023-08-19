# OsuUtils
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

Adding some osu api functionality to your google spreadsheets.

### :warning: Before using set apiKey in Peppy console tab

### Advantages
- Request caching with configurable expiry time

### Limitations
- Supports only osu!standard api side
- Sometimes hit rate limit error when refreshing many functions at once (cant be fixed due to spreadsheet and current architercture limitations)

### Functions 
- FetchOsuUserProperty
- FetchOsuUserImage
- FetchOsuUserProfileImage
- FetchOsuUserPP
- FetchOsuBeatmapCover
- FetchOsuBeatmapThumb
- FetchOsuBeatmapProperty
- FetchOsuObjectProperties
- FetchOsuBeatmapProperties
- FetchOsuUserProperties

> Details [here](https://github.com/EnergoStalin/GoogleSpreadsheetOsuUtils/blob/main/src/Bindings.ts)