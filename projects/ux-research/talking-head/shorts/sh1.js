/* SH1 UI vs UX (raw 1:01.5-1:47.0). Film inserts ~50 %: the research wall's UI / UX boards. */
'use strict';
function buildMoment() {
  const k = PS({ heard: "you've probably heard people say", two: 'but ui and ux are two different things', ui: 'ui stands for user interface', btn: 'the button the colours the layout the icons the screen',
    ux: 'ux on the other hand stands for user experience', q4: 'did the user come back to use it', beau: 'so you can have a beautiful app', gui: 'but terrible ux', part: 'so your ui is kind of part of your ux', big: 'much bigger than what is on the screen' });
  TH.talk({ from: k.heard, to: k.two }, { frame: 'mid' });
  TH.cutaway({ from: k.ui, to: k.btn }, { film: {} });
  TH.talk(k.ux, { frame: 'close' });
  TH.half({ from: k.ux, to: k.q4 }, { film: {} });
  TH.talk({ from: k.beau, to: k.gui }, { frame: 'mid' });
  TH.cutaway({ from: k.part, to: k.big }, { film: {} });
}
