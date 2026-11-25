/* LAYOUT LAB (engine test, not her edit): one segment per new face + graphic layout (L14-L19), 2026-10-26.
 * The graphic side is a flat card with her own words (no real screenshots captured yet). */
function buildMoment() {
  const k = PS({
    bugs: 'these are huge loopholes that people have already tried to exploit',
    before: 'the thing about php two shell and why it\'s really so crazy is that it happens before your code even runs',
    reads: 'so php reads the incoming request first and this loop all is in that reading part',
    login: 'so your login, your middleware, your authentication, nobody stands a chance against this stuff',
    amazon: 'even amazon has reported that someone tried to use it',
    trap: 'which is basically a trap server set up to catch attackers just for this before it was even announced',
    gov: 'and there are government websites in europe that literally went off while they patched because of all of this drama',
  });
  TH.split(k.bugs, { card: { kicker: 'PHP2Shell · October 2026', lines: ['Huge loopholes', 'people already', 'tried to *exploit*'], at: 'huge' } });
  TH.tile(k.before, { card: { kicker: 'Why it is so bad', lines: ['It happens', 'before your code', '*even runs*'], at: 'it happens' } });
  TH.page(k.reads, { kicker: 'How PHP2Shell works', title: ['PHP reads the incoming', 'request first'], titleAt: 'php reads', below: 'The loophole is in that reading part.' });
  TH.presenter(k.login, { card: { kicker: 'Nobody stands a chance', lines: ['Your login.', 'Your middleware.', 'Your *authentication*.'], at: 'your login' } });
  TH.room({ from: k.amazon, to: k.trap }, { at: 'a trap server', card: { kicker: 'Amazon reported it', lines: ['A trap server', 'set up to', '*catch attackers*'], at: 'a trap server' } });
  TH.ots(k.gov, { card: { kicker: 'Europe', lines: ['Government', 'websites', '*went off*'], at: 'government' } });
}
