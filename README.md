# OsuUtils
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp) ![lint.yml](https://github.com/EnergoStalin/GoogleSpreadsheetOsuUtils/actions/workflows/lint.yml/badge.svg)

Adding some osu api functionality to your google spreadsheets.

## Installing

Install [nodejs](https://github.com/nvm-sh/nvm) and [pnpm](https://pnpm.io/installation).

Run this in terminal after replacing values in <>
```
git clone --depth 1 https://github.com/EnergoStalin/GoogleSpreadsheetOsuUtils.git && cd GoogleSpreadsheetOsuUtils
pnpm i
pnpm exec clasp login
pnpm run add <your spreadsheetId>
pnpm run push
```

Reload page and see Peppy console appears in the spreadsheet navbar.

Next set api v1 key in Peppy console tab and we're ready to use functions.

> Ps. maybe i need publish this as google workspace app but look at how crazy their approval [flow](https://developers.google.com/static/workspace/marketplace/images/publish-flow-diagram.png). So maybe sometime but definetely not now.

## :flushed: Features
- Support of most common user and beatmap queries needed
  > If something not present you still can get it by using functions with Property or Properties suffix which extra argument is needed raw json property
- Configurable caching on document side
- Configurable refresh trigger through checkbox [see](https://github.com/EnergoStalin/GoogleSpreadsheetOsuUtils/blob/master/src/utils/refresh.ts)
  > Using like this *=if(RefreshToggle!$A$1=true, FetchOsuUserPP(cell),)*. Then just add custom trigger to refreshToggle function in script trigger section and it should recalculate all formulas writed as mentioned above

## :pencil: [Functions](https://github.com/EnergoStalin/GoogleSpreadsheetOsuUtils/blob/master/src/Bindings.ts)

> **Warning**
> Untested on large amount of data but in theory should perform well