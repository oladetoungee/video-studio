/* Ghana / Marrify film (Blink look): entry point. The studio runtime calls buildFilm() once after loading the scripts in
 * film.json (blink.js = the shared visual kit, bfilm.js = film helpers, bscenes1/2.js = the scenes, in timeline order). */
'use strict';
function buildFilm() {
  buildB1();
  buildB2();
}
