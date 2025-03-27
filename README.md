# GoogleSpreadsheetOsuUtils
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp) ![lint.yml](https://github.com/EnergoStalin/GoogleSpreadsheetOsuUtils/actions/workflows/lint.yml/badge.svg)

Adding some osu api functionality to your google spreadsheets.

## Installing

Install nodejs preferrably using [volta](https://docs.volta.sh/guide/getting-started) and [pnpm](https://pnpm.io/installation).

Run this in terminal after replacing values in <>
```
git clone --depth 1 https://github.com/EnergoStalin/GoogleSpreadsheetOsuUtils.git && cd GoogleSpreadsheetOsuUtils
pnpm i
pnpm exec clasp login
pnpm run add <your spreadsheetId>
pnpm run push
```

Reload page and inside extensions navbar should appear GoogleSpreadsheetOsuUtils.

Next set api v1 key in here and we're ready to use functions.

> Ps. maybe i need publish this as google workspace app but look at how crazy their approval [flow](https://developers.google.com/static/workspace/marketplace/images/publish-flow-diagram.png). So maybe sometime but definetely not now.

## :flushed: Features
- Support of most common user and beatmap queries needed
  > If something not present you still can get it by using functions with Property or Properties suffix which extra argument is needed raw json property
- Configurable caching on document side
- Configurable refresh trigger through checkbox [see](https://github.com/EnergoStalin/GoogleSpreadsheetOsuUtils/blob/master/src/utils/refresh.ts)
  > Using like this *=if(RefreshToggle!$A$1=true, FetchOsuUserPP(cell),)*. Then just add custom trigger to refreshToggle function in script trigger section and it should recalculate all formulas writed as mentioned above
- Global mode setting i.e.(0 - STD, 1 - Taiko, 2 - CtB, 3 - Mania)

## :pencil: [Functions](https://github.com/EnergoStalin/GoogleSpreadsheetOsuUtils/blob/master/src/Bindings.ts)
## [Example spreadsheet](https://docs.google.com/spreadsheets/d/1HpWxFAGKEV67z1sOfvvDEXcgD4Yxz4XinJBFm4Qa6fQ/edit?usp=sharing)
> **Warning**
> Untested on large amount of data but in theory should perform well.
