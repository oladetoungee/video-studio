# 02 ---------------------------------------------------------------- hook through the phone (paper, her)
PL, PT, PWd, PHt = 860, 210, 230, 450     # phone box (not rotated)
SX = PL + 52                               # hook shank x (it enters the phone near its top-left corner)
hook = (f'M{SX} {PT-70} L{SX} {PT+90} Q{SX} {PT+170} {SX-62} {PT+170} Q{SX-120} {PT+170} {SX-120} {PT+100} L{SX-120} {PT+50}')
barb = f'M{SX-120} {PT+50} L{SX-98} {PT+78}'
D.append(('02-hook', dict(
  direction='Paper white. A phone caught like bait: a big fishing hook goes into its top edge and curves out of its side. Her calm black-and-white cut-out with a red outline, bottom left under the words.',
  thumbnail_text='Designed to hook you',
  titles=['Phone Addiction Isn\'t an Accident: The 5 Features Behind It', 'Why Am I Addicted to My Phone? 5 Design Tricks to Blame', 'Why Your Phone Is So Hard to Put Down, Explained'],
  text={'words': 'Designed<br>to <span class="acc">hook</span> you'}, images={'photo': CUT + FACE}),
  '.t{--ground:#F2EFE9;--fg:#0C0D10}.w{left:64px;top:70px;font-size:118px;width:760px}'
  '.hk path{fill:none;stroke:#3E4046;stroke-width:16;stroke-linecap:round;stroke-linejoin:round}',
  f'''<div class="hd w" data-k="words"></div>
<svg class="abs z3" width="1280" height="720" style="left:0;top:0" data-move="line"><path d="M{SX} -10 L{SX} {PT-86}" stroke="#0C0D10" stroke-width="4" fill="none"/>
 <circle cx="{SX}" cy="{PT-78}" r="11" fill="none" stroke="#3E4046" stroke-width="7"/></svg>
{lphone(PL, PT, PWd, PHt, 0, lfeed(2, .72, 52), z=2)}
<svg class="abs z3 hk" data-move="hook" width="1280" height="720" style="left:0;top:0"><defs><clipPath id="front">
 <path clip-rule="evenodd" d="M0 0 H1280 V720 H0 Z M{PL} {PT+26} H{PL+PWd} V{PT+PHt} H{PL} Z"/></clipPath></defs>
 <g clip-path="url(#front)"><path d="{hook}"/><path d="{barb}"/></g></svg>
{me(FACE, 40, 330, 390)}'''))

