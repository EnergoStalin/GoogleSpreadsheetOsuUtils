# OsuUtils
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp) ![lint.yml](https://github.com/EnergoStalin/GoogleSpreadsheetOsuUtils/actions/workflows/lint.yml/badge.svg)

Adding some osu api functionality to your google spreadsheets.

### :exclamation: Before using any api functionality set apiKey in Peppy console tab
### :warning: Untested on large amount of data but in theory should perform well

### :flushed: Advantages
- Support of most common user and beatmap queries needed
  > If something not present you still can get it by using functions with Property or Properties suffix which extra argument is needed raw json property
- Configurable caching on document side
- Configurable refresh trigger through checkbox [see](https://github.com/EnergoStalin/GoogleSpreadsheetOsuUtils/blob/master/src/utils/refresh.ts)
  > Using like this *=if(RefreshToggle!$A$1=true, FetchOsuUserPP(cell),)*. Then just add custom trigger to refreshToggle function in script trigger section and it should recalculate all formulas writed as mentioned above

### :pencil: Functions 
- FetchOsuUserProperty
- FetchOsuUserProfileImage
- FetchOsuUserPP
- FetchOsuBeatmapCover
- FetchOsuBeatmapThumb
- FetchOsuBeatmapProperty
- FetchOsuBeatmapProperties
- FetchOsuUserProperties

> Details [here](https://github.com/EnergoStalin/GoogleSpreadsheetOsuUtils/blob/master/src/Bindings.ts)