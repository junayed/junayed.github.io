# Fit Like? source and asset record

This is a new local game assembled in the ScotRick folder on 27 October 2026. It is distinct from the supplied DhakaRick project. No reference project was edited by this task.

## New project work

The menu/HUD/settings/newspaper interface, fictional layout, gameplay rules, collision/pathfinding module, rider and crowd models/animation, combat/chase implementation, weather integration, local server and tests were written for this project. The camera, arcade structure, slapstick hit reactions and newspaper outcome deliberately use DhakaRick as a behavioural and visual reference; they are not claimed as invented concepts.

## Supplied city project

Source root: `/Users/mdjunayedhasan/Desktop/Image Sec 3D model/Aberdeen/aberdeen-web/`.

- `src/college.js` is adapted from the helpers and Marischal architectural model in its `src/architecture.js`. Unused world dependencies and other landmarks were removed. The college is translated/rotated into a fictional arena.
- `src/city-materials.js` is copied from its `src/materials.js`.
- `src/city-source-data.js` contains selected landmark data and 90 candidate residential building records from `detail-data.js` and `map-data.js`. The prototype instantiates a smaller set of those homes, reassembled into a fictional street arrangement. Source IDs are retained in the building records.
- The running detailed-city revision uses `src/dense-city-data.js`: 3,457 building records plus selected streets, pavement polygons, shop placements, lamps, trees, water and coast geometry from the same source map. It preserves spatial relationships and applies one shared game-coordinate transform. The earlier reassembled-home blockout is superseded. Source IDs remain in the selected building records.
- `src/city-geometry.js` adapts the supplied renderer's polygon/merge/ribbon/roof helper functions. `src/college.js` also includes the supplied Town House architectural interpretation. This source code is reused/adapted, distinct from the newly written gameplay modules.
- Geometry derived from OpenStreetMap remains **© OpenStreetMap contributors**, under **ODbL**. See [OpenStreetMap copyright and licence information](https://www.openstreetmap.org/copyright). Fictional arrangement and renamed signs do not remove attribution or applicable derived-database responsibilities.
- This first build uses a flat authored ground. It does not import the full city's elevation grid, aerial imagery, actual traffic data or entire city mesh. Those are separate future integration choices.

## Engine

The locally vendored Three.js r180 modules were copied from the supplied city project's vendor directory. Three.js is MIT-licensed. Its copyright notices and `vendor/THREE-LICENSE.txt` are retained. No remote CDN is used.

## Dhaka reference audio and font

The 14 MP3s in `assets/audio/temporary-bangla/` and `assets/fonts/mono.woff2` were copied from the local DhakaRick package. The exact clips and hashes are in `planning/audio-manifest.json`. These remain development placeholders; their presence on disk is not a grant of recording rights or a claim of new authorship.

DhakaRick's own provenance records its origin as a modified local copy of the deployed **Baper Rasta** game by **Omar Faruqe Riyad**, packaged from an earlier `gametest/local-build`. This project does not contain a copy of that game's minified game bundle. The new gameplay modules are separate implementations. The supplied Share Tech Mono font's provenance should be retained/confirmed for distribution, or replaced with a cleared local/system alternative.

## Branding and references

`assets/branding/fit-like-logo.png` is the user's supplied logo attachment, copied unchanged, including its existing transparency. `fit-like-logo-700.png` and `fit-like-logo-1300.png` are resized 256-colour web copies of it; the original stays in the source folder and is not shipped in the release. `assets/ui/loading-city-wide.webp` and `loading-city-tall.webp` (a centre crop for portrait screens) are compressed copies of the game's own `loading-city.png` render. The yellow/plum/pink interface palette was chosen to complement it. The screenshots in `references/` are reference-project screenshots, not final Fit Like? marketing art. Screenshot and map-study files in `planning/` retain their documented origin.

## Runtime behaviour

All JavaScript, geometry, branding, fonts and audio are local. Runtime fetches load only the local audio manifest and local clips. There is no analytics, account, hosted leaderboard or external asset service. The development server binds to `127.0.0.1`. Exporting a front page creates a local browser download; no image is uploaded.

## Expanded city revision, 28 October 2026

`coastal-landmarks.js`, `coast-data.js` and `festive-city.js` are adapted from the supplied city’s editable coast and seasonal source modules. Player-facing venue names are fictional. The ballroom model and collider are relocated together for the compact game loop. The map-derived data retains its OSM/ODbL origin; the revised venue arrangement is a game interpretation. Café height fallbacks, slate roofs, road hazards, interactive roles, traffic/pursuit and pickup systems are local game adaptations. See `docs/10-EXPANDED-CITY.md`.

Super Chips, Open Sans, Comic Neue Bold and the replacement official Share Tech Mono TTF are locally bundled; their exact sources and available licences are in `assets/fonts/FONT-SOURCES.md`. Nirakolu is not distributed. The original reference mono WOFF2 is unused and excluded from the release. Historical ticker sources are listed in the current release notes. The RAW-style paper label is a requested illustrative collectible, with no claimed brand affiliation.

- Editorial masthead: original fictional Granite Blether title rendered with UnifrakturCook Bold (SIL OFL; font and license under assets/fonts). P&J / DC Thomson supplied visual inspiration only: https://www.dcthomson.co.uk/brands/the-press-journal/ . No publisher logo or trademark artwork copied.
- Additional café carts, furniture, planting, activity anchors, road shaders and night pools are original procedural geometry / code in src/neighbourhood-life.js and related game modules.

- Character refresh: original procedural geometry and instanced animation, using the user’s supplied images solely as style references. No game models, textures or screenshots from those references are bundled. MoneyPot banners are original procedural text assets; no advertising service is integrated.

- Animated charging-bay paint is original procedural geometry and shader code, inspired by the road-marking style in the user’s reference image. No pixels from the reference are bundled. Runtime diagnostics remain local to the browser; no analytics or advertising service is used.

The street population controller, reactive scaffolding and seagull hazard logic,
Highland cow and bagpiper/police model additions, neon interface treatment, and
`assets/ui/loading-town.svg` are original project code/artwork. User-provided
screenshots guide their appearance; no screenshot pixels are incorporated.

`assets/ui/loading-city.png` is a native browser capture of the project’s own Three.js city render, using the same supplied city geometry and project characters as the game. The loading screen and home screen share the same responsive logo layout.
