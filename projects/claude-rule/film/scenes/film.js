/* claude-rule film ("The Thread"): entry point. The studio runtime calls buildFilm() once after loading the scripts in
 * film.json (thread.js = the visual system, scenes1/2.js = the screens in timeline order). */
'use strict';
function buildFilm() {
  buildP1();
  buildP2();
}
