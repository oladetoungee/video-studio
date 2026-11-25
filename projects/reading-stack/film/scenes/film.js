/* Reading Stack film: entry point. The studio runtime calls buildFilm() once after loading the scripts in film.json.
 * Scenes live in scenes1-3.js (one buildScenesN() each). See studio/README.md for the scene API. */
'use strict';
function buildFilm() {
  buildScenes1();
  buildScenes2();
  buildScenes3();
}
