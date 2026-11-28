import { M } from '../components/M';
import { Def, Quiz, Story, Task, Warn } from '../components/ui';
import {
  ArcsinArccosWidget,
  ArctanAreaPiWidget,
  ArctanArcsecWidget,
  CompleteSquarePipelineDiagram,
  InvTrigDerivativeWidget,
  RightTriangleTrigWidget,
  ThreeIntegralsCompareDiagram,
  ViewingAngleMaxWidget,
} from '../components/Widgets77';
import type { Page } from './s1_1';

export const S7_7: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Tartományszűkítés, arcsin x és arccos x',
    body: (
      <>
        <Story>
          <p>
            A trigonometrikus függvények periodikusak, ezért <strong>egyikük sem injektív</strong> a teljes értelmezési tartományán — minden vízszintes egyenes végtelen sokszor metszi a grafikonjukat! Hogyan képezzük mégis az inverzüket? A 7.1-ben megismert <strong>tartományszűkítéssel</strong>: mindegyikből kivágunk egy szigorúan monoton „főágat”!
          </p>
        </Story>

        <Def title="Az arkuszszinusz (arcsin x) és arkuszkoszinusz (arccos x)">
          <ul>
            <li>
              <strong><M t="y = \arcsin x = \sin^{-1} x" />:</strong> a <M t="[-\pi/2;\,\pi/2]" /> intervallum azon egyetlen <M t="y" /> szöge, amelyre <M t="\sin y = x" /> (<M t="D = [-1;\,1],\; R = [-\pi/2;\,\pi/2]" />). Páratlan: <M t="\arcsin(-x) = -\arcsin x" />.
            </li>
            <li>
              <strong><M t="y = \arccos x = \cos^{-1} x" />:</strong> a <M t="[0;\,\pi]" /> intervallum azon egyetlen <M t="y" /> szöge, amelyre <M t="\cos y = x" /> (<M t="D = [-1;\,1],\; R = [0;\,\pi]" />). Kiegészítő szimmetria: <M t="\arccos(-x) = \pi - \arccos x" />.
            </li>
            <li>
              <strong>Pótszög-azonosság (minden <M t="x \in [-1;\,1]" />-re):</strong>
              <M block t="\arcsin x + \arccos x \;=\; \frac{\pi}{2}." />
            </li>
          </ul>
        </Def>

        <p>
          <em>Honnan jön az „arkusz” elnevezés?</em> Az egységsugarú körön a radiánban mért szög pontosan egyenlő a hozzá tartozó körív (latinul <em>arcus</em>) hosszával! <strong>Fontos:</strong> <M t="\sin^{-1} x" /> az inverz függvény, <em>nem</em> a reciprok (<M t="1/\sin x = \csc x" />)!
        </p>

        <ArcsinArccosWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Add meg pontosan (radiánban): (a) <M t="\arcsin\!\left(-\frac{1}{2}\right)" />, (b) <M t="\arccos\!\left(-\frac{1}{2}\right)" />, (c) <M t="\arcsin\!\left(\frac{\sqrt{3}}{2}\right)" />!
            </>
          }
        >
          <p>
            (a) <M t="\mathbf{-\frac{\pi}{6}}" /> (IV. síknegyed); (b) <M t="\mathbf{\frac{2\pi}{3}}" /> (II. síknegyed); (c) <M t="\mathbf{\frac{\pi}{3}}" /> (I. síknegyed).
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Mennyi <M t="\arcsin\!\bigl(\sin\frac{5\pi}{6}\bigr)" />? <em>(Vigyázz a tartományra!)</em>
            </>
          }
        >
          <p>
            Mivel <M t="\sin\frac{5\pi}{6} = \frac{1}{2}" />, és <M t="\arcsin" /> értéke a <M t="[-\pi/2;\,\pi/2]" /> intervallumba esik, ezért <M t="\arcsin\!\left(\frac{1}{2}\right) = \mathbf{\dfrac{\pi}{6}}" /> (NEM <M t="\frac{5\pi}{6}" />!).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Az arctg x, arcctg x, arcsec x és arccsc x függvények',
    body: (
      <>
        <Story>
          <p>
            Az arkusztangens (<M t="\operatorname{arctg} x" />) az egész valós számegyenesen értelmezett, sima, korlátos görbe — két vízszintes aszimptota (<M t="y = \pm\pi/2" />) közé szorítva! A másik három arkuszfüggvény pedig könnyedén visszavezethető az első háromra!
          </p>
        </Story>

        <Def title="Az arctg, arcctg, arcsec és arccsc definíciója">
          <ul>
            <li><strong><M t="y = \operatorname{arctg} x" />:</strong> <M t="D = (-\infty;\,\infty),\; R = (-\pi/2;\,\pi/2)" />, páratlan, <M t="\lim_{x\to\pm\infty}\operatorname{arctg} x = \pm\frac{\pi}{2}" />.</li>
            <li><strong><M t="y = \operatorname{arcctg} x" />:</strong> <M t="D = (-\infty;\,\infty),\; R = (0;\,\pi)" />, és <M t="\operatorname{arctg} x + \operatorname{arcctg} x = \dfrac{\pi}{2}" />.</li>
            <li><strong><M t="y = \operatorname{arcsec} x" />:</strong> <M t="D = (-\infty;\,-1]\cup[1;\,\infty),\; R = [0;\,\pi/2)\cup(\pi/2;\,\pi]" />, és <M t="\operatorname{arcsec} x = \arccos(1/x)" /> (mindkét ágon szigorúan növekvő!).</li>
            <li><strong><M t="y = \operatorname{arccsc} x" />:</strong> <M t="\operatorname{arcsec} x + \operatorname{arccsc} x = \dfrac{\pi}{2}" />.</li>
          </ul>
        </Def>

        <ArctanArcsecWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Add meg pontosan: (a) <M t="\operatorname{arctg}(-1)" />, (b) <M t="\operatorname{arctg}\sqrt{3}" />, (c) <M t="\operatorname{arcsec}(-2)" />!
            </>
          }
        >
          <p>
            (a) <M t="\mathbf{-\frac{\pi}{4}}" />; (b) <M t="\mathbf{\frac{\pi}{3}}" />; (c) <M t="\operatorname{arcsec}(-2) = \arccos(-1/2) = \mathbf{\frac{2\pi}{3}}" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Számítsd ki a határértéket: <M t="\displaystyle\lim_{x\to\infty}\operatorname{arctg}(e^x)" /> és <M t="\displaystyle\lim_{x\to -\infty}\operatorname{arctg}(e^x)" />!
            </>
          }
        >
          <p>
            Ha <M t="x\to\infty" />, akkor <M t="e^x\to\infty \implies \operatorname{arctg}(e^x)\to\mathbf{\frac{\pi}{2}}" />. Ha <M t="x\to -\infty" />, akkor <M t="e^x\to 0 \implies \operatorname{arctg}(e^x)\to\operatorname{arctg}(0) = \mathbf{0}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A derékszögű háromszög-trükk',
    body: (
      <>
        <Story>
          <p>
            Hogyan egyszerűsítsd algebrai alakra a <M t="\cos(\arcsin x)" /> vagy a <M t="\sec(\operatorname{arctg} x)" /> kifejezést? <strong>Ne számolj szögeket!</strong> Nevezd el az arkuszt <M t="\alpha" />-nak, rajzolj egy derékszögű háromszöget, írd be a két ismert oldalt, a harmadikat pedig számold ki Pitagorasszal!
          </p>
        </Story>

        <RightTriangleTrigWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Határozd meg <M t="\cos\alpha" /> és <M t="\operatorname{tg}\alpha" /> pontos értékét, ha <M t="\alpha = \arcsin\!\left(\frac{2}{3}\right)" /> (Thomas 4. példa)!
            </>
          }
        >
          <p>
            <M t="\sin\alpha = 2/3" /> ⇒ szemközti befogó <M t="2" />, átfogó <M t="3" />, szomszédos befogó <M t="\sqrt{3^2 - 2^2} = \sqrt{5}" />. Tehát <M t="\cos\alpha = \mathbf{\frac{\sqrt{5}}{3}}" /> és <M t="\operatorname{tg}\alpha = \mathbf{\frac{2}{\sqrt{5}}}" />!
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Írd fel algebrai kifejezésként: <M t="\sin(\operatorname{arctg} x)" />!
            </>
          }
        >
          <p>
            <M t="\alpha = \operatorname{arctg} x \implies \operatorname{tg}\alpha = x/1" />, átfogó <M t="\sqrt{1 + x^2}" />. Tehát <M t="\sin(\operatorname{arctg} x) = \mathbf{\dfrac{x}{\sqrt{1 + x^2}}}" /> (és az előjel negatív <M t="x" />-re is stimmel!).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Az inverz trigonometrikus függvények deriváltjai',
    body: (
      <>
        <Story>
          <p>
            Készülj fel egy csodára: bár maguk az arkuszfüggvények transzcendensek, a <strong>deriváltjaik tiszta, gyönyörű algebrai kifejezések</strong> — egyetlen <M t="\sin" /> vagy <M t="\cos" /> sem marad bennük!
          </p>
        </Story>

        <Def title="A 6 inverz trigonometrikus függvény deriváltja (7.3. táblázat)">
          <ul>
            <li><M t="\dfrac{d}{dx}(\arcsin u) = \dfrac{u'}{\sqrt{1 - u^2}}" /> (<M t="|u| < 1" />) · <M t="\dfrac{d}{dx}(\arccos u) = -\dfrac{u'}{\sqrt{1 - u^2}}" /></li>
            <li><M t="\dfrac{d}{dx}(\operatorname{arctg} u) = \dfrac{u'}{1 + u^2}" /> (<M t="\forall u" />) · <M t="\dfrac{d}{dx}(\operatorname{arcctg} u) = -\dfrac{u'}{1 + u^2}" /></li>
            <li><M t="\dfrac{d}{dx}(\operatorname{arcsec} u) = \dfrac{u'}{|u|\sqrt{u^2 - 1}}" /> (<M t="|u| > 1" />) · <M t="\dfrac{d}{dx}(\operatorname{arccsc} u) = -\dfrac{u'}{|u|\sqrt{u^2 - 1}}" /></li>
          </ul>
        </Def>

        <p>
          <strong>Miért olyan egyszerű a levezetés?</strong> Például <M t="y = \operatorname{arctg} x \iff \operatorname{tg} y = x" />. Mindkét oldalt deriválva: <M t="(\sec^2 y)y' = 1 \implies y' = \dfrac{1}{\sec^2 y} = \dfrac{1}{1 + \operatorname{tg}^2 y} = \dfrac{1}{1 + x^2}" />! A három „co”-függvény (<M t="\arccos, \operatorname{arcctg}, \operatorname{arccsc}" />) pedig egyszerűen <M t="\frac{\pi}{2} - \text{párja}" />, ezért a deriváltjuk mindig pontosan a <strong>mínusz egyszerese</strong>!
        </p>

        <InvTrigDerivativeWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Deriváld: (a) <M t="y = \arcsin(x^2)" />, (b) <M t="y = \operatorname{arcsec}(5x^4)" /> (<M t="x > 0" />, Thomas 7. és 9. példa)!
            </>
          }
        >
          <p>
            (a) <M t="y' = \mathbf{\dfrac{2x}{\sqrt{1 - x^4}}}" />.
          </p>
          <p>
            (b) <M t="y' = \dfrac{20x^3}{|5x^4|\sqrt{(5x^4)^2 - 1}} = \mathbf{\dfrac{4}{x\sqrt{25x^8 - 1}}}" />.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Egy részecske helyzete <M t="x(t) = \operatorname{arctg}\sqrt{t}" /> (<M t="t > 0" />). Mekkora a sebessége a <M t="t = 16" /> pillanatban (Thomas 8. példa)?
            </>
          }
        >
          <p>
            <M t="v(t) = \dfrac{1}{1 + (\sqrt{t})^2}\cdot\dfrac{1}{2\sqrt{t}} = \dfrac{1}{2\sqrt{t}(1+t)}" />. Behelyettesítve <M t="t=16" />-ot: <M t="v(16) = \dfrac{1}{2\cdot 4\cdot 17} = \mathbf{\dfrac{1}{136}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'A 3 arany integrálképlet (a paraméterrel)',
    body: (
      <>
        <Story>
          <p>
            A deriváltképleteket visszafelé olvasva három elképesztően fontos integrálképletet kapunk — ezek nélkül lehetetlen lenne racionális és négyzetgyökös törteket integrálni! Figyeld meg, hogyan bukkan fel a <M t="\pi" /> szám egy egyszerű törtfüggvény alatti területből!
          </p>
        </Story>

        <ThreeIntegralsCompareDiagram />

        <p>
          <strong>Miért NINCS <M t="1/a" /> az <M t="\arcsin" />-nál, míg az <M t="\operatorname{arctg}" />-nél VAN?</strong> Az <M t="u = aw,\; du = a\,dw" /> helyettesítéssel:
        </p>
        <M block t="\int\frac{a\,dw}{\sqrt{a^2(1-w^2)}} = \int\frac{\cancel{a}\,dw}{\cancel{a}\sqrt{1-w^2}} = \arcsin\!\left(\frac{u}{a}\right)+C, \qquad \int\frac{a\,dw}{a^2(1+w^2)} = \frac{1}{a}\int\frac{dw}{1+w^2} = \frac{1}{a}\operatorname{arctg}\!\left(\frac{u}{a}\right)+C!" />

        <ArctanAreaPiWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Számítsd ki: (a) <M t="\displaystyle\int \frac{dx}{\sqrt{9 - x^2}}" />, (b) <M t="\displaystyle\int \frac{dx}{\sqrt{3 - 4x^2}}" /> (Thomas 12. példa)!
            </>
          }
        >
          <p>
            (a) <M t="a = 3 \implies \mathbf{\arcsin\!\left(\frac{x}{3}\right) + C}" />.
          </p>
          <p>
            (b) <M t="a = \sqrt{3},\; u = 2x,\; dx = \frac{du}{2} \implies \mathbf{\frac{1}{2}\arcsin\!\left(\frac{2x}{\sqrt{3}}\right) + C}" />.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{3} \frac{dx}{9 + x^2}" />!
            </>
          }
        >
          <p>
            <M t="a = 3" />: <M t="\left[\dfrac{1}{3}\operatorname{arctg}\!\left(\dfrac{x}{3}\right)\right]_{0}^{3} = \dfrac{1}{3}(\operatorname{arctg} 1 - 0) = \dfrac{1}{3}\cdot\dfrac{\pi}{4} = \mathbf{\dfrac{\pi}{12}}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Teljes négyzetté alakítás és trükkös helyettesítések',
    body: (
      <>
        <Story>
          <p>
            A gyakorlatban a nevező ritkán tálalja magát szép <M t="a^2 + u^2" /> vagy <M t="\sqrt{a^2 - u^2}" /> alakban — gyakran egy teljes másodfokú kifejezés (<M t="x^2 + 2x + 5" /> vagy <M t="4x - x^2" />) rejtőzik benne! A kulcs: <strong>teljes négyzetté alakítás!</strong>
          </p>
        </Story>

        <CompleteSquarePipelineDiagram />

        <p>
          <strong>Másik fontos minta — számláló szétbontása:</strong> Ha a számlálóban <M t="x" /> ÉS konstans is van (pl. <M t="\int \frac{2x + 5}{x^2 + 4}\,dx" />), bontsd két törtre! Az <M t="x" />-es tagból <strong>logaritmus</strong> lesz (<M t="\ln(x^2+4)" />), a konstans tagból pedig <strong>arkusztangens</strong> (<M t="\frac{5}{2}\operatorname{arctg}(x/2)" />)!
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{dx}{4x^2 + 4x + 2}" /> (Thomas 14. példa)!
            </>
          }
        >
          <p>
            <M t="4x^2 + 4x + 2 = (2x + 1)^2 + 1" />. Legyen <M t="u = 2x + 1 \implies dx = \frac{du}{2}" />:
            <M block t="\frac{1}{2}\int\frac{du}{u^2 + 1} = \mathbf{\frac{1}{2}\operatorname{arctg}(2x + 1) + C}." />
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{e^x}{1 + e^{2x}}\,dx" />!
            </>
          }
        >
          <p>
            Legyen <M t="u = e^x \implies du = e^x\,dx" /> (és <M t="e^{2x} = u^2" />):
            <M block t="\int\frac{du}{1 + u^2} = \operatorname{arctg}(u) + C = \mathbf{\operatorname{arctg}(e^x) + C}!" />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Alkalmazás: a legnagyobb látószög (mozivászon-probléma)',
    body: (
      <>
        <Story>
          <p>
            Egy moziban vagy múzeumban <strong>milyen távolságra ülj a faltól</strong>, hogy a szemmagasságod felett <M t="a" /> és <M t="b" /> magasság között elhelyezkedő vásznat a lehető <em>legnagyobb látószög</em> alatt lásd? Ha túl közel mész, csak felfelé bámulsz (kis szög); ha túl messze, eltörpül a kép — az optimális pontot pontosan az <M t="\operatorname{arctg}" /> deriváltja adja meg!
          </p>
        </Story>

        <p>
          A látószög <M t="x" /> távolságból: <M t="\theta(x) = \operatorname{arctg}\!\left(\dfrac{b}{x}\right) - \operatorname{arctg}\!\left(\dfrac{a}{x}\right)" />. Deriváljuk <M t="x" /> szerint:
        </p>
        <M block t="\theta'(x) = \frac{-b/x^2}{1 + b^2/x^2} - \frac{-a/x^2}{1 + a^2/x^2} = \frac{-b}{x^2 + b^2} + \frac{a}{x^2 + a^2} = \frac{(a - b)(x^2 - ab)}{(x^2 + a^2)(x^2 + b^2)} = 0 \;\implies\; \mathbf{x = \sqrt{ab}}!" />
        <p>
          Az optimális távolság tehát pontosan a két magasság <strong>mértani közepe</strong>!
        </p>

        <ViewingAngleMaxWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Egy fali festmény alsó éle <M t="2\text{ m}" />-rel, felső éle <M t="8\text{ m}" />-rel van a szemmagasságod felett. Hány méterre állj a faltól a legnagyobb látószöghöz?
            </>
          }
        >
          <p>
            <M t="x_{\text{opt}} = \sqrt{a\cdot b} = \sqrt{2\cdot 8} = \sqrt{16} = \mathbf{4\text{ m}}" />!
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Igazold a derivált segítségével, hogy az <M t="f(x) = \arcsin x + \arccos x" /> függvény állandó a <M t="[-1;\,1]" /> intervallumon, és határozd meg az értékét!
            </>
          }
        >
          <p>
            <M t="(-1;\,1)" />-en <M t="f'(x) = \dfrac{1}{\sqrt{1-x^2}} - \dfrac{1}{\sqrt{1-x^2}} = 0" />, tehát <M t="f(x)" /> konstans! Behelyettesítve <M t="x = 0" />-t: <M t="f(0) = \arcsin 0 + \arccos 0 = 0 + \frac{\pi}{2} = \mathbf{\frac{\pi}{2}}" /> ✓
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 8
  {
    title: 'Összefoglalás, buktatók és lépcsőzetes gyakorlófeladatok',
    body: (
      <>
        <Def title="7.7 Puskakártya">
          <ul>
            <li><strong>Értékkészletek:</strong> <M t="\arcsin x \in [-\frac{\pi}{2};\,\frac{\pi}{2}]" />, <M t="\arccos x \in [0;\,\pi]" />, <M t="\operatorname{arctg} x \in (-\frac{\pi}{2};\,\frac{\pi}{2})" />.</li>
            <li><strong>Alapderiváltak:</strong> <M t="(\arcsin u)' = \frac{u'}{\sqrt{1-u^2}}" />, <M t="(\operatorname{arctg} u)' = \frac{u'}{1+u^2}" />, <M t="(\operatorname{arcsec} u)' = \frac{u'}{|u|\sqrt{u^2-1}}" /> (a co-párjaik mínusszal!).</li>
            <li><strong>3 arany integrál (<M t="a>0" />):</strong> <M t="\int\frac{du}{\sqrt{a^2-u^2}} = \arcsin\frac{u}{a}" /> · <M t="\int\frac{du}{a^2+u^2} = \frac{1}{a}\operatorname{arctg}\frac{u}{a}" /> · <M t="\int\frac{du}{u\sqrt{u^2-a^2}} = \frac{1}{a}\operatorname{arcsec}\left|\frac{u}{a}\right|" />.</li>
            <li><strong>Teljes négyzet + számláló szétbontása:</strong> másodfokú nevezőknél mindig hozd <M t="u^2 \pm a^2" /> alakra!</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>5 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li><strong><M t="\sin^{-1} x = \arcsin x \ne \frac{1}{\sin x}" />!</strong></li>
            <li><strong><M t="\arcsin(\sin x) = x" /> CSAK <M t="x \in [-\pi/2;\,\pi/2]" />-re igaz!</strong> (Pl. <M t="\arcsin(\sin \pi) = 0 \ne \pi" />!)</li>
            <li><strong>Az <M t="1/a" /> szorzó:</strong> <M t="\arcsin(u/a)" /> előtt <em>nincs</em> <M t="1/a" />, de <M t="\operatorname{arctg}(u/a)" /> és <M t="\operatorname{arcsec}|u/a|" /> előtt <em>van</em> <M t="1/a" />!</li>
            <li><strong>Logaritmus vs. arkusztangens:</strong> <M t="\int \frac{x}{1+x^2}\,dx = \frac{1}{2}\ln(1+x^2)" />, míg <M t="\int \frac{1}{1+x^2}\,dx = \operatorname{arctg} x" />!</li>
            <li><strong>Abszolútérték <M t="\operatorname{arcsec}" />-nél:</strong> <M t="(\operatorname{arcsec} x)' = \frac{1}{|x|\sqrt{x^2-1}}" /> mindig pozitív!</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={
            <>
              Add meg pontosan: (a) <M t="\arccos\!\left(-\frac{\sqrt{2}}{2}\right)" />, (b) <M t="\operatorname{arctg}(-1/\sqrt{3})" />, (c) <M t="\arcsin(\cos 0)" />!
            </>
          }
        >
          <p>
            (a) <M t="\mathbf{\frac{3\pi}{4}}" />; (b) <M t="\mathbf{-\frac{\pi}{6}}" />; (c) <M t="\arcsin(1) = \mathbf{\frac{\pi}{2}}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Deriváld: (a) <M t="y = \operatorname{arctg}(3x)" />, (b) <M t="y = \arccos(2x - 1)" />!
            </>
          }
        >
          <p>
            (a) <M t="y' = \mathbf{\dfrac{3}{1 + 9x^2}}" />; (b) <M t="y' = \mathbf{-\dfrac{2}{\sqrt{1 - (2x-1)^2}}}" />.
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{1} \frac{dx}{\sqrt{4 - x^2}}" />!
            </>
          }
        >
          <p>
            <M t="a = 2" />: <M t="\left[\arcsin\!\left(\frac{x}{2}\right)\right]_{0}^{1} = \arcsin\frac{1}{2} - 0 = \mathbf{\dfrac{\pi}{6}}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={
            <>
              Írd fel algebrai kifejezésként: <M t="\operatorname{tg}(\arccos x)" /> (<M t="0 < x \le 1" />)!
            </>
          }
        >
          <p>
            <M t="\alpha = \arccos x \implies \cos\alpha = x/1" />, szemközti befogó <M t="\sqrt{1 - x^2}" />. Tehát <M t="\operatorname{tg}(\arccos x) = \mathbf{\dfrac{\sqrt{1 - x^2}}{x}}" />.
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{dx}{x^2 + 6x + 13}" />!
            </>
          }
        >
          <p>
            Teljes négyzet: <M t="x^2 + 6x + 13 = (x + 3)^2 + 4 = (x+3)^2 + 2^2" /> (<M t="a = 2,\; u = x+3" />):
            <M block t="\int\frac{dx}{(x+3)^2 + 2^2} = \mathbf{\frac{1}{2}\operatorname{arctg}\!\left(\frac{x + 3}{2}\right) + C}." />
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{3x + 2}{x^2 + 1}\,dx" />!
            </>
          }
        >
          <p>
            Bontsuk két törtre:
            <M block t="\frac{3}{2}\int\frac{2x}{x^2+1}\,dx + 2\int\frac{dx}{x^2+1} = \mathbf{\frac{3}{2}\ln(x^2 + 1) + 2\operatorname{arctg} x + C}." />
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={
            <>
              <em>Exponenciális + arkuszszinusz:</em> Számítsd ki <M t="\displaystyle\int \frac{e^x}{\sqrt{1 - e^{2x}}}\,dx" /> értékét!
            </>
          }
        >
          <p>
            Legyen <M t="u = e^x \implies du = e^x\,dx" /> (<M t="e^{2x} = u^2" />):
            <M block t="\int\frac{du}{\sqrt{1 - u^2}} = \arcsin(u) + C = \mathbf{\arcsin(e^x) + C}." />
          </p>
        </Task>
        <Task
          n={22}
          q={
            <>
              <em>Rejtett arcsec integrál (Thomas 15. példa):</em> Számítsd ki <M t="\displaystyle\int \frac{dx}{\sqrt{e^{2x} - 6}}" /> értékét!
            </>
          }
        >
          <p>
            Legyen <M t="u = e^x \implies du = e^x\,dx \implies dx = \dfrac{du}{u}" />, és <M t="a = \sqrt{6}" />:
            <M block t="\int\frac{du}{u\sqrt{u^2 - (\sqrt{6})^2}} = \frac{1}{\sqrt{6}}\operatorname{arcsec}\!\left(\frac{u}{\sqrt{6}}\right) + C = \mathbf{\frac{1}{\sqrt{6}}\operatorname{arcsec}\!\left(\frac{e^x}{\sqrt{6}}\right) + C}." />
          </p>
        </Task>
        <Task
          n={23}
          q={
            <>
              <em>Gyönyörű azonosság deriválással:</em> Igazold, hogy <M t="f(x) = \operatorname{arctg} x + \operatorname{arctg}\!\left(\dfrac{1}{x}\right)" /> értéke minden <M t="x > 0" />-ra pontosan <M t="\dfrac{\pi}{2}" /> (és mennyi <M t="x < 0" />-ra?)!
            </>
          }
        >
          <p>
            Deriváljuk <M t="x \ne 0" />-ra:
            <M block t="f'(x) = \frac{1}{1+x^2} + \frac{1}{1 + 1/x^2}\cdot\left(-\frac{1}{x^2}\right) = \frac{1}{1+x^2} - \frac{1}{x^2+1} = 0!" />
            Tehát <M t="f(x)" /> konstans a <M t="(0;\,\infty)" /> ágon ÉS külön konstans a <M t="(-\infty;\,0)" /> ágon! Behelyettesítve <M t="x=1" />-et: <M t="\frac{\pi}{4}+\frac{\pi}{4} = \mathbf{\frac{\pi}{2}}" /> (<M t="x>0" />); behelyettesítve <M t="x=-1" />-et: <M t="-\frac{\pi}{4}-\frac{\pi}{4} = \mathbf{-\frac{\pi}{2}}" /> (<M t="x<0" />)!
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Mi az <M t="\displaystyle\int \frac{dx}{\sqrt{4 - x^2}}" /> határozatlan integrál?
            </>
          }
          options={[
            { label: <M t="\arcsin\!\left(\dfrac{x}{2}\right) + C" />, ok: true },
            { label: <M t="\dfrac{1}{2}\arcsin\!\left(\dfrac{x}{2}\right) + C" /> },
            { label: <M t="\operatorname{arctg}\!\left(\dfrac{x}{2}\right) + C" /> },
            { label: <M t="2\arcsin x + C" /> },
          ]}
          explain={
            <>
              <M t="\displaystyle\int \frac{du}{\sqrt{a^2 - u^2}} = \arcsin\!\left(\frac{u}{a}\right) + C" /> (<M t="a = 2" />, itt nincs <M t="1/a" /> szorzó elöl!).
            </>
          }
        />
      </>
    ),
  },
];
