# Font sources

Downloaded 28 October 2026, unmodified.

- Super Chips by fsuarez913: https://www.dafont.com/super-chips.font . The author note states “Free for personal use & commercial use.” Original download: https://dl.dafont.com/dl/?f=super_chips . The download contains the TTF only; the author’s permission statement is recorded here.
- Open Sans variable, normal, weights 300–800: https://github.com/google/fonts/tree/main/ofl/opensans . SIL Open Font License 1.1 included in OpenSans-OFL.txt.

Both fonts are served locally. Super Chips is used in uppercase for display words; Open Sans for reading and interface text. The supplied Fit Like? logo remains an image.

Dialogue alternative: Comic Neue Bold by the Comic Neue Project Authors, SIL OFL 1.1 (included), https://github.com/google/fonts/tree/main/ofl/comicneue . Nirakolu was considered at the user’s request but its free download is personal-use only; it is not bundled in the published game.

The current interface mono font is an unmodified official Share Tech Mono TTF from Google Fonts, with its SIL OFL included. The previous reference-game WOFF2 is not used or packaged in the web release.

UnifrakturCook Bold — original fictional newspaper masthead; Google Fonts / OFL. Source: https://github.com/google/fonts/tree/main/ofl/unifrakturcook. License: UnifrakturCook-OFL.txt.

## Web delivery

The unmodified TTFs above remain in this folder as sources. The game loads WOFF2 files generated from them by `scripts/build-web-fonts.py` (`npm run fonts`), and the release package leaves the TTFs out:

- Open Sans and Comic Neue (SIL OFL 1.1, no Reserved Font Name) are subset to Latin text plus the symbols the interface uses. Open Sans keeps its 300–800 weight axis at normal width.
- Share Tech Mono and UnifrakturCook (SIL OFL 1.1 with Reserved Font Names) and Super Chips are only re-encoded as WOFF2, without subsetting or other changes.

The OFL licence texts are shipped alongside the fonts.
