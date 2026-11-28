import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  BrachistochroneRaceWidget,
  CycloidCalculusWidget,
  CycloidRollingWidget,
  ParametricConicsSummaryDiagram,
  ParametricEllipseWidget,
  ParametricHyperbolaWidget,
  ParametricParabolaWidget,
  TautochroneDropWidget,
} from '../components/Widgets104';
import type { Page } from './s1_1';

export const S10_4: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Kúpszeletek mozgásként: körök és ellipszisek paraméterezése',
    body: (
      <>
        <Story>
          <p>
            A Descartes-egyenlet (mint <M t="\tfrac{x^2}{9} + \tfrac{y^2}{4} = 1" />) csak egy „fényképet” ad a
            görbéről: megmondja, hol vannak a pontjai, de nem árulja el, <em>merre</em> és <em>milyen gyorsan</em>{' '}
            mozog rajta egy részecske. A <strong>paraméteres egyenletrendszer</strong> (<M t="x = f(t),\,y = g(t)" />)
            viszont „filmet” készít belőle — a 3.5-ös szakaszban megismert eszközzel most a kúpszeleteket és a
            mechanika egyik leghíresebb görbéjét, a <strong>cikloist</strong> vizsgáljuk!
          </p>
        </Story>

        <Def title="Kör és ellipszis szabványos paraméterezése">
          <p>
            A <M t="(h;\,k)" /> középpontú, <M t="a, b > 0" /> féltengelyű{' '}
            <M t="\dfrac{(x-h)^2}{a^2} + \dfrac{(y-k)^2}{b^2} = 1" /> ellipszis egy teljes, óramutatóval ellentétes
            (pozitív) irányú bejárása:
          </p>
          <M block t="x = h + a\cos t, \qquad y = k + b\sin t, \qquad 0 \le t \le 2\pi." />
          <p>
            A <M t="\cos^2 t + \sin^2 t = 1" /> azonosság azonnal visszaadja a Descartes-egyenletet. Ha{' '}
            <M t="y = k - b\sin t" />-t írunk (vagy felcseréljük <M t="\cos t" />-t és <M t="\sin t" />-t), az ellipszist
            az óramutató járásával megegyező irányban járjuk be.
          </p>
        </Def>

        <ParametricEllipseWidget />

        <Quiz
          q={<>Milyen görbét és milyen bejárási irányt ír le az <M t="x = 1 + 4\sin t,\ y = -2 + 4\cos t\ (0 \le t \le 2\pi)" /> paraméterezés?</>}
          options={[
            { label: <>Kör <M t="(1;\,-2)" /> középponttal, pozitív (CCW) irányban</> },
            { label: <>Kör <M t="(1;\,-2)" /> középponttal, óramutató járásával megegyező irányban</>, ok: true },
            { label: <>Ellipszis <M t="(1;\,-2)" /> középponttal</> },
            { label: <>Félkör az <M t="x" />-tengely felett</> },
          ]}
          explain={
            <>
              <M t="(x-1)^2 + (y+2)^2 = 16(\sin^2 t + \cos^2 t) = 16" />, tehát 4 sugarú kör. A <M t="t = 0" />-nál a
              pont <M t="(1;\,2)" /> (fent), <M t="t = \tfrac{\pi}{2}" />-nél <M t="(5;\,-2)" /> (jobbra), tehát az
              óramutató járásával megegyező irányban forog!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={1} q={<>Paraméterezd az <M t="\dfrac{(x+3)^2}{16} + \dfrac{(y-1)^2}{9} = 1" /> ellipszis <em>felső felét</em> jobbról balra haladva!</>}>
          <p>
            <M t="x = -3 + 4\cos t" />, <M t="y = 1 + 3\sin t" />, ahol <M t="0 \le t \le \pi" />. Ekkor{' '}
            <M t="t = 0" />-nál <M t="(1;\,1)" />-ből indul, <M t="t = \tfrac{\pi}{2}" />-nél a csúcson{' '}
            <M t="(-3;\,4)" /> halad át, <M t="t = \pi" />-nél pedig <M t="(-7;\,1)" />-be érkezik.
          </p>
        </Task>
        <Task n={2} q={<>Ugyanaz-e a görbéje az <M t="x = \cos(2t),\,y = \sin(2t)" /> és az <M t="x = \cos t,\,y = \sin t" /> (<M t="0 \le t \le 2\pi" />) paraméterezésnek? Mi a különbség?</>}>
          <p>
            A pályagörbe mindkettőnél az <M t="x^2 + y^2 = 1" /> egységkör, de az első <strong>kétszeres sebességgel</strong>{' '}
            halad, és a <M t="[0;\,2\pi]" /> idő alatt <strong>kétszer</strong> kerüli meg a kört!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Parabola és ferde hajítás paraméteres alakja',
    body: (
      <>
        <p>
          Bármely <M t="y = f(x)" /> függvény grafikonja triviálisan paraméterezhető az <M t="x = t,\,y = f(t)" />{' '}
          választással. Így az <M t="y = x^2" /> teljes parabola paraméterezése egyszerűen:
        </p>
        <M block t="x = t, \qquad y = t^2, \qquad -\infty < t < \infty." />
        <p>
          A mechanikában a paraméter általában az <strong>idő</strong> (<M t="t" />): ha egy testet a kezdőpontból{' '}
          <M t="v_0" /> sebességgel, a vízszinteshez képest <M t="\alpha" /> szögben hajítunk el (légellenállás nélkül),
          akkor a vízszintes mozgás egyenletes, a függőleges pedig egyenletesen lassuló/gyorsuló:
        </p>
        <M block t="x(t) = (v_0\cos\alpha)\,t, \qquad y(t) = (v_0\sin\alpha)\,t - \frac{1}{2}gt^2." />

        <ParametricParabolaWidget />

        <p>
          Ha viszont például <M t="x = t^2,\,y = t^4" />-et választunk (<M t="t \in \mathbb{R}" />), akkor bár továbbra
          is <M t="y = x^2" />, mivel <M t="x = t^2 \ge 0" />, a részecske <strong>csak a jobb oldali ágat</strong> járja
          be (lefelé jön az origóig, ott megfordul, és visszamegy rajta)! Ezért a paraméterezésnél mindig figyelni kell
          az <strong>értékkészletre</strong> is.
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={3} q={<>Küszöböld ki a <M t="t" /> paramétert az <M t="x = 2t - 1,\ y = 4t^2 - 4t + 3" /> (<M t="t \in \mathbb{R}" />) egyenletrendszerből!</>}>
          <p>
            Vegyük észre, hogy <M t="x^2 = (2t-1)^2 = 4t^2 - 4t + 1" />, tehát <M t="y = x^2 + 2" />! Mivel{' '}
            <M t="x = 2t - 1" /> minden valós számot felvesz, a teljes <M t="y = x^2 + 2" /> parabolát kapjuk.
          </p>
        </Task>
        <Task n={4} q={<>Milyen görbét ír le az <M t="x = \sin t,\ y = \cos(2t)" /> (<M t="t \in \mathbb{R}" />) paraméterezés? Vigyázz az értékkészletre!</>}>
          <p>
            A <M t="\cos(2t) = 1 - 2\sin^2 t" /> azonossággal <M t="y = 1 - 2x^2" />. Mivel azonban{' '}
            <M t="-1 \le \sin t \le 1" />, a görbe csak az <M t="y = 1 - 2x^2" /> parabola <M t="x \in [-1;\,1]" />{' '}
            <strong>parabolaíve</strong> (a pont ezen oda-vissza ingázik)!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'A hiperbola két paraméterezése',
    body: (
      <>
        <p>
          Az <M t="\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1" /> hiperbolának két híres, különbség-azonosságra épülő
          paraméterezése van:
        </p>

        <Def title="Trigonometrikus és hiperbolikus paraméterezés">
          <ol>
            <li>
              <strong>Trigonometrikus</strong> (<M t="\dfrac{1}{\cos^2 t} - \tan^2 t = 1" /> alapján):
              <M block t="x = \frac{a}{\cos t}, \qquad y = b\tan t." />
              A <M t="-\tfrac{\pi}{2} < t < \tfrac{\pi}{2}" /> intervallumon a <strong>jobb ágat</strong> (lentről
              felfelé), a <M t="\tfrac{\pi}{2} < t < \tfrac{3\pi}{2}" /> intervallumon pedig a <strong>bal ágat</strong>{' '}
              járja be.
            </li>
            <li>
              <strong>Hiperbolikus</strong> (<M t="\cosh^2 t - \sinh^2 t = 1" /> alapján):
              <M block t="x = a\cosh t, \qquad y = b\sinh t, \qquad -\infty < t < \infty." />
              Mivel <M t="\cosh t \ge 1" />, ez minden valós <M t="t" />-re szakadásmentesen a <strong>jobb ágat</strong>{' '}
              adja (a bal ág: <M t="x = -a\cosh t,\,y = b\sinh t" />).
            </li>
          </ol>
        </Def>

        <ParametricHyperbolaWidget />

        <Quiz
          q={<>Melyik ágat járja be az <M t="x = -3\cosh t,\ y = 2\sinh t\ (t \in \mathbb{R})" /> paraméterezés?</>}
          options={[
            { label: <>Az <M t="\tfrac{x^2}{9} - \tfrac{y^2}{4} = 1" /> hiperbola jobb ágát</> },
            { label: <>Az <M t="\tfrac{x^2}{9} - \tfrac{y^2}{4} = 1" /> hiperbola bal ágát</>, ok: true },
            { label: <>Az <M t="\tfrac{y^2}{4} - \tfrac{x^2}{9} = 1" /> hiperbola felső ágát</> },
            { label: <>Az <M t="\tfrac{x^2}{9} + \tfrac{y^2}{4} = 1" /> ellipszist</> },
          ]}
          explain={
            <>
              <M t="\dfrac{x^2}{9} - \dfrac{y^2}{4} = \cosh^2 t - \sinh^2 t = 1" />, és mivel <M t="\cosh t \ge 1" />,
              ezért <M t="x = -3\cosh t \le -3" /> — ez pontosan a <strong>bal oldali ág</strong>!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={5} q={<>Paraméterezd az <M t="y^2 - 4x^2 = 4" /> hiperbola felső ágát hiperbolikus függvényekkel!</>}>
          <p>
            4-gyel osztva <M t="\dfrac{y^2}{4} - \dfrac{x^2}{1} = 1" />, tehát a felső ág (<M t="y \ge 2" />):{' '}
            <M t="x = \sinh t,\ y = 2\cosh t\ (t \in \mathbb{R})" />.
          </p>
        </Task>
        <Task n={6} q={<>Melyik Descartes-görbét írja le az <M t="x = e^t + e^{-t},\ y = e^t - e^{-t}" /> (<M t="t \in \mathbb{R}" />) paraméterezés?</>}>
          <p>
            Mivel <M t="x = 2\cosh t" /> és <M t="y = 2\sinh t" />, ezért <M t="x^2 - y^2 = 4(\cosh^2 t - \sinh^2 t) = 4" />.
            Mivel <M t="x \ge 2" />, az <M t="x^2 - y^2 = 4" /> hiperbola <strong>jobb oldali ágát</strong> kapjuk!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A ciklois: a guruló kerék pontjának pályája',
    body: (
      <>
        <p>
          Képzeljünk el egy <M t="a" /> sugarú biciklikereket, amely csúszásmentesen gurul az <M t="x" />-tengelyen
          jobbra, és a szelep (<M t="P" /> pont) kezdetben pontosan az origóban érinti a talajt. Milyen pályát rajzol ki{' '}
          <M t="P" /> a levegőben? Ezt a boltívekből álló görbét nevezzük <strong>cikloisnak</strong>!
        </p>

        <Def title="A ciklois paraméteres egyenlete">
          <p>
            Ha a kerék <M t="t" /> radián szöggel fordult el az óramutató járásával megegyező irányban, akkor a{' '}
            <M t="P(x;\,y)" /> perempont koordinátái:
          </p>
          <M block t="x = a(t - \sin t), \qquad y = a(1 - \cos t), \qquad t \in \mathbb{R}." />
        </Def>

        <p>
          <em>Levezetés:</em> Csúszásmentes gördülésnél a kerék középpontja pontosan annyit halad jobbra, mint amekkora
          ív gördült le a talajon — vagyis <M t="at" /> távolságot. Így a középpont <M t="C(at;\,a)" />. A{' '}
          <M t="C" />-ből <M t="P" />-be mutató sugár kezdetben függőlegesen lefelé nézett (<M t="\tfrac{3\pi}{2}" />{' '}
          irányban), és <M t="t" /> szöggel elfordult az óramutató irányába, tehát a szöge{' '}
          <M t="\theta = \tfrac{3\pi}{2} - t" />. Mivel <M t="\cos\left(\tfrac{3\pi}{2} - t\right) = -\sin t" /> és{' '}
          <M t="\sin\left(\tfrac{3\pi}{2} - t\right) = -\cos t" />:
        </p>
        <M block t="x = at + a\cos\theta = a(t - \sin t), \qquad y = a + a\sin\theta = a(1 - \cos t)." />

        <CycloidRollingWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={7} q={<>Hol van az <M t="a = 2" /> sugarú ciklois első ívének legmagasabb pontja, és mekkora az ív alapjának szélessége?</>}>
          <p>
            A legnagyobb magasság <M t="t = \pi" />-nél van: <M t="x = 2\pi" />, <M t="y = 2(1 - (-1)) = 4" />, vagyis{' '}
            <M t="(2\pi;\,4)" />. Egy teljes ív <M t="t = 0" />-tól <M t="t = 2\pi" />-ig tart, így az alap szélessége{' '}
            <M t="2\pi a = 4\pi \approx 12{,}57" />.
          </p>
        </Task>
        <Task n={8} q={<>Mekkora a kerék perempontjának pillanatnyi sebessége a talajérintés (<M t="t = 0" />) és a legfelső pont (<M t="t = \pi" />) pillanatában, ha <M t="a = 1" /> és <M t="t" /> az idő?</>}>
          <p>
            <M t="x'(t) = 1 - \cos t" />, <M t="y'(t) = \sin t" />. A talajon (<M t="t = 0" />):{' '}
            <M t="(x', y') = (0;\,0)" /> — a kerék alja egy pillanatra <strong>mozdulatlan</strong>! A tetején (
            <M t="t = \pi" />): <M t="(x', y') = (2;\,0)" /> — <strong>kétszer olyan gyorsan</strong> halad előre, mint
            maga a kerék középpontja!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'A ciklois analízise: érintő, ívhossz (8a) és terület (3πa²)',
    body: (
      <>
        <p>
          Bár a cikloisból <M t="t" />-t nem lehet egyszerű, zárt <M t="y = f(x)" /> alakba kiküszöbölni, a paraméteres
          kalkulus képleteivel a ciklois érintője, ívhossza és területe meglepően elegánsan kiszámítható!
        </p>
        <ul>
          <li>
            <strong>Érintő meredeksége</strong> (<M t="t \neq 2k\pi" />):
            <M block t="\frac{dy}{dx} = \frac{dy/dt}{dx/dt} = \frac{a\sin t}{a(1 - \cos t)} = \frac{2\sin(t/2)\cos(t/2)}{2\sin^2(t/2)} = \cot\left(\frac{t}{2}\right)." />
            A csúcsokban (<M t="t = \pi" />) <M t="\cot(\pi/2) = 0" /> (vízszintes érintő), a talajon (<M t="t \to 0^+" />)
            pedig <M t="\cot(t/2) \to +\infty" /> (függőleges érintő, csúcspont!).
          </li>
          <li>
            <strong>Egy ív alatti terület:</strong>
            <M block t="T = \int_0^{2\pi} y\,x'(t)\,dt = a^2\int_0^{2\pi}(1-\cos t)^2\,dt = a^2\int_0^{2\pi}\left(1 - 2\cos t + \frac{1+\cos 2t}{2}\right)dt = 3\pi a^2." />
          </li>
        </ul>

        <CycloidCalculusWidget />

        <Steps
          title="Egy cikloisív pontos ívhossza (L = 8a)"
          problem={
            <>
              Számítsuk ki az <M t="x = a(t - \sin t),\ y = a(1 - \cos t)" /> ciklois egy teljes ívének (
              <M t="0 \le t \le 2\pi" />) ívhosszát!
            </>
          }
          steps={[
            {
              title: 'Deriváltak négyzetösszege',
              body: (
                <>
                  <M t="x'(t) = a(1 - \cos t)" />, <M t="y'(t) = a\sin t" />. Így:
                  <M block t="(x')^2 + (y')^2 = a^2\big((1-\cos t)^2 + \sin^2 t\big) = a^2(2 - 2\cos t)." />
                </>
              ),
            },
            {
              title: 'Félszög-azonosság alkalmazása',
              body: (
                <>
                  Mivel <M t="1 - \cos t = 2\sin^2(t/2)" />, ezért <M t="2 - 2\cos t = 4\sin^2(t/2)" />. A{' '}
                  <M t="[0;\,2\pi]" /> intervallumon <M t="0 \le t/2 \le \pi" />, így <M t="\sin(t/2) \ge 0" />, tehát:
                  <M block t="\sqrt{(x')^2 + (y')^2} = 2a\sin\left(\frac{t}{2}\right)." />
                </>
              ),
            },
            {
              title: 'Integrálás 0-tól 2π-ig',
              body: (
                <>
                  <M block t="L = \int_0^{2\pi} 2a\sin\left(\frac{t}{2}\right)dt = \Big[-4a\cos\left(\frac{t}{2}\right)\Big]_0^{2\pi} = (-4a)(-1) - (-4a)(1) = 8a." />
                </>
              ),
            },
          ]}
        />

        <Quiz
          q={<>Ha a guruló kerék sugara <M t="a = 3\text{ cm}" />, mekkora a ciklois egy teljes ívének hossza és az alatta lévő terület?</>}
          options={[
            { label: <><M t="L = 24\text{ cm}" />, <M t="T = 27\pi\text{ cm}^2" /></>, ok: true },
            { label: <><M t="L = 6\pi\text{ cm}" />, <M t="T = 9\pi\text{ cm}^2" /></> },
            { label: <><M t="L = 24\pi\text{ cm}" />, <M t="T = 27\pi\text{ cm}^2" /></> },
            { label: <><M t="L = 12\text{ cm}" />, <M t="T = 18\pi\text{ cm}^2" /></> },
          ]}
          explain={
            <>
              <M t="L = 8a = 8\cdot 3 = 24\text{ cm}" /> (nincs benne <M t="\pi" />!), a terület pedig{' '}
              <M t="T = 3\pi a^2 = 3\pi\cdot 9 = 27\pi\text{ cm}^2" />.
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={9} q={<>Írd fel az <M t="x = t - \sin t,\ y = 1 - \cos t" /> ciklois érintőjének egyenletét a <M t="t = \tfrac{\pi}{2}" /> pontban!</>}>
          <p>
            A pont: <M t="x = \tfrac{\pi}{2} - 1" />, <M t="y = 1" />. A meredekség:{' '}
            <M t="m = \cot\left(\tfrac{\pi}{4}\right) = 1" />. Az érintő egyenlete:{' '}
            <M t="y - 1 = 1\cdot\left(x - \tfrac{\pi}{2} + 1\right) \Longrightarrow y = x + 2 - \tfrac{\pi}{2}" />.
          </p>
        </Task>
        <Task n={10} q={<>Milyen <M t="t \in (0;\,2\pi)" /> értéknél zár be a ciklois érintője <M t="45^\circ" />-os, illetve <M t="135^\circ" />-os szöget az <M t="x" />-tengellyel?</>}>
          <p>
            <M t="m = \cot(t/2) = 1 \Rightarrow t/2 = \tfrac{\pi}{4} \Rightarrow t = \tfrac{\pi}{2}" /> (<M t="45^\circ" />),
            illetve <M t="\cot(t/2) = -1 \Rightarrow t/2 = \tfrac{3\pi}{4} \Rightarrow t = \tfrac{3\pi}{2}" /> (<M t="135^\circ" />).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Brachisztochron és tautochron: a ciklois két fizikai csodája',
    body: (
      <>
        <p>
          Ha fejjel lefelé fordítjuk a cikloist (az <M t="y" />-tengely mutasson lefelé), a matematika és a fizika
          történetének két leghíresebb csodájával találkozunk.
        </p>

        <Def title="Brachisztochron („legrövidebb idő”) és tautochron („azonos idő”)">
          <ul>
            <li>
              <strong>Brachisztochron (Johann Bernoulli, 1696):</strong> Két, nem egymás alatt lévő <M t="O" /> és{' '}
              <M t="B" /> pontot összekötő összes súrlódásmentes drótpálya közül az <strong>invertált ciklois</strong>{' '}
              mentén csúszik le a leggyorsabban egy golyó a gravitáció hatására! (A feladatot Newton egyetlen éjszaka
              alatt oldotta meg, és névtelenül küldte vissza — Bernoulli mégis felismerte: <em>„oroszlánt a karmáról”</em>.)
            </li>
            <li>
              <strong>Tautochron (Christiaan Huygens, 1673):</strong> Az invertált ciklois bármely pontjáról indítunk
              el egy golyót, mindig pontosan ugyanannyi <M t="T = \pi\sqrt{a/g}" /> idő alatt ér a legmélyebb pontba.
              Huygens erre alapozta a pontos <em>ciklois-ingaórát</em>, amelynek lengésideje független az amplitúdótól!
            </li>
          </ul>
        </Def>

        <BrachistochroneRaceWidget />

        <p>
          Az energiamegmaradásból (<M t="\tfrac{1}{2}mv^2 = mgy" />) a sebesség <M t="v = \sqrt{2gy}" />, így a teljes
          lecsúszási idő:
        </p>
        <M block t="T = \int_O^B \frac{ds}{v} = \int_0^{\pi} \frac{2a\sin(t/2)}{\sqrt{2ga(1-\cos t)}}\,dt = \int_0^{\pi} \frac{2a\sin(t/2)}{2\sqrt{ga}\sin(t/2)}\,dt = \pi\sqrt{\frac{a}{g}}!" />
        <p>
          Látod a csodát? A számlálóban és a nevezőben lévő <M t="\sin(t/2)" /> tényező pontosan kiejti egymást, ezért a
          <M t="t" /> paraméter <em>egyenletes sebességgel</em> nő a lecsúszás során!
        </p>

        <TautochroneDropWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={11} q={<>Ha egy invertált ciklois generáló sugarát <M t="a = 0{,}98\text{ m}" />-re választjuk (<M t="g = 9{,}8\text{ m/s}^2" />), hány másodperc alatt csúszik le rajta egy golyó a legmélyebb pontba?</>}>
          <p>
            <M t="T = \pi\sqrt{\dfrac{a}{g}} = \pi\sqrt{\dfrac{0{,}98}{9{,}8}} = \dfrac{\pi}{\sqrt{10}} \approx 0{,}993\text{ s}" />{' '}
            — közel 1 másodperc, függetlenül attól, milyen magasról engedjük el!
          </p>
        </Task>
        <Task n={12} q={<>Miért nem az egyenes a leggyorsabb lecsúszási pálya <M t="O(0;\,0)" /> és <M t="B(\pi;\,2)" /> között?</>}>
          <p>
            Az egyenes valóban a legrövidebb (<M t="\sqrt{\pi^2 + 4} \approx 3{,}72" /> szemben a ciklois félívének{' '}
            <M t="4" /> hosszával), de a meredeksége végig kicsi, így a golyó lassan gyorsul fel. A ciklois az elején
            függőlegesen indul, ezért hamar nagy sebességet ér el, ami bőven kompenzálja a hosszabb utat.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló és tipikus hibák',
    body: (
      <>
        <ParametricConicsSummaryDiagram />

        <h3>Paraméteres görbék összefoglaló táblázata</h3>
        <table className="tbl">
          <thead>
            <tr><th>Görbe</th><th>Paraméteres alak</th><th>Fő tulajdonság / azonosság</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Ellipszis</strong></td>
              <td><M t="x = h + a\cos t,\ y = k + b\sin t" /></td>
              <td><M t="\cos^2 t + \sin^2 t = 1" />, <M t="0 \le t \le 2\pi" /></td>
            </tr>
            <tr>
              <td><strong>Parabola</strong></td>
              <td><M t="x = t,\ y = t^2" /> (vagy hajítás)</td>
              <td><M t="t \in \mathbb{R}" /> a teljes parabolát adja</td>
            </tr>
            <tr>
              <td><strong>Hiperbola (trig.)</strong></td>
              <td><M t="x = a/\cos t,\ y = b\tan t" /></td>
              <td><M t="\tfrac{1}{\cos^2 t} - \tan^2 t = 1" />, két tartomány = két ág</td>
            </tr>
            <tr>
              <td><strong>Hiperbola (hip.)</strong></td>
              <td><M t="x = \pm a\cosh t,\ y = b\sinh t" /></td>
              <td><M t="\cosh^2 t - \sinh^2 t = 1" />, egy tartomány = egy ág</td>
            </tr>
            <tr>
              <td><strong>Ciklois</strong></td>
              <td><M t="x = a(t-\sin t),\ y = a(1-\cos t)" /></td>
              <td><M t="\tfrac{dy}{dx} = \cot(t/2)" />, <M t="L = 8a" />, <M t="T = 3\pi a^2" /></td>
            </tr>
          </tbody>
        </table>

        <h3>Négy tipikus hiba, amit érdemes elkerülni</h3>
        <Warn>
          <strong>1. Értékkészlet figyelmen kívül hagyása kiküszöböléskor:</strong> az <M t="x = \cos^2 t,\ y = \sin^2 t" />{' '}
          paraméterezés kielégíti az <M t="x + y = 1" /> egyenest, de mivel <M t="0 \le x, y \le 1" />, csak az{' '}
          <M t="(1;\,0)" /> és <M t="(0;\,1)" /> közötti <em>szakaszt</em> adja!
        </Warn>
        <Warn>
          <strong>2. Hiperbola második ágának elvesztése:</strong> az <M t="x = a\cosh t,\ y = b\sinh t" /> képlet csak
          a jobb ágat (<M t="x \ge a" />) adja. A bal ághoz <M t="x = -a\cosh t" /> kell!
        </Warn>
        <Warn>
          <strong>3. Előjelhiba az ívhossz gyökvonásánál:</strong> a <M t="\sqrt{4\sin^2(t/2)} = 2|\sin(t/2)|" />{' '}
          kifejezésben csak a <M t="[0;\,2\pi]" /> tartományon hagyható el az abszolútérték! Ha pl.{' '}
          <M t="[0;\,4\pi]" />-re (két ívre) integrálnál abszolútérték nélkül, nullát kapnál <M t="16a" /> helyett!
        </Warn>
        <Warn>
          <strong>4. A <M t="t" /> paraméter és a polárszög összekeverése ellipszisen:</strong> az{' '}
          <M t="x = a\cos t,\ y = b\sin t" /> paraméterezésben <M t="t" /> <em>nem</em> az origóból a pontba mutató
          vektor hajlásszöge (kivéve ha <M t="a = b" />, azaz kör)!
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={13} q={<>Miért adna <M t="\int_0^{4\pi} 2a\sin(t/2)\,dt" /> hamis 0 eredményt két cikloisív hosszára?</>}>
          <p>
            Mert a <M t="[2\pi;\,4\pi]" /> intervallumon <M t="t/2 \in [\pi;\,2\pi]" />, ahol <M t="\sin(t/2) \le 0" />!
            Az ívhossz integrandusa <M t="2a|\sin(t/2)|" />, amelynek integrálja <M t="[0;\,4\pi]" />-n{' '}
            <M t="8a + 8a = 16a" />.
          </p>
        </Task>
        <Task n={14} q={<>Melyik pontját adja az <M t="x = 4\cos t,\ y = 2\sin t" /> ellipszisnek a <M t="t = 45^\circ" /> paraméter, és mekkora ennek a pontnak az origóból mért valódi <M t="\varphi" /> irányszöge?</>}>
          <p>
            A pont <M t="(2\sqrt{2};\,\sqrt{2})" />. Irányszöge: <M t="\tan\varphi = \dfrac{\sqrt{2}}{2\sqrt{2}} = \dfrac{1}{2} \Rightarrow \varphi \approx 26{,}6^\circ \neq 45^\circ" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Gyakorló feladatok',
    body: (
      <>
        <p>Próbáld meg előbb önállóan megoldani, a megoldást csak utána nyisd ki.</p>

        <h3>Könnyű</h3>

        <Task n={15} q={<>Küszöböld ki a paramétert, és azonosítsd a görbét: <M t="x = 2 + 5\cos t,\ y = -1 + 3\sin t\ (0 \le t \le 2\pi)" />!</>}>
          <p>
            <M t="\cos t = \dfrac{x-2}{5}" />, <M t="\sin t = \dfrac{y+1}{3}" />. Négyzetösszegük 1:{' '}
            <M t="\dfrac{(x-2)^2}{25} + \dfrac{(y+1)^2}{9} = 1" /> — ez egy <M t="(2;\,-1)" /> középpontú ellipszis,{' '}
            <M t="a = 5, b = 3" />.
          </p>
        </Task>

        <Task n={16} q={<>Küszöböld ki a paramétert: <M t="x = \dfrac{3}{\cos t},\ y = 2\tan t\ \left(-\tfrac{\pi}{2} < t < \tfrac{\pi}{2}\right)" />! Melyik részét kapjuk a görbének?</>}>
          <p>
            <M t="\dfrac{x^2}{9} - \dfrac{y^2}{4} = \dfrac{1}{\cos^2 t} - \tan^2 t = 1" />. Mivel{' '}
            <M t="\cos t > 0" /> az adott tartományon, <M t="x \ge 3" />, tehát a hiperbola <strong>jobb oldali ágát</strong>{' '}
            kapjuk.
          </p>
        </Task>

        <Task n={17} q={<>Add meg az <M t="x = 4(t - \sin t),\ y = 4(1 - \cos t)" /> ciklois egy ívének ívhosszát és alatta lévő területét!</>}>
          <p>
            Itt <M t="a = 4" />, így <M t="L = 8a = 32" /> és <M t="T = 3\pi a^2 = 48\pi" />.
          </p>
        </Task>

        <h3>Közepes</h3>

        <Task n={18} q={<>Írd fel az <M t="x = 2(t - \sin t),\ y = 2(1 - \cos t)" /> ciklois érintőjének és normálisának egyenletét a <M t="t = \dfrac{\pi}{3}" /> pontban!</>}>
          <p>
            A pont: <M t="x_0 = 2\left(\tfrac{\pi}{3} - \tfrac{\sqrt{3}}{2}\right) = \tfrac{2\pi}{3} - \sqrt{3}" />,{' '}
            <M t="y_0 = 2\left(1 - \tfrac{1}{2}\right) = 1" />.
          </p>
          <p>
            Érintő meredeksége: <M t="m = \cot\left(\tfrac{\pi}{6}\right) = \sqrt{3}" />. Érintő:{' '}
            <M t="y - 1 = \sqrt{3}(x - x_0)" />. Normális meredeksége <M t="-\tfrac{1}{\sqrt{3}}" />, egyenlete:{' '}
            <M t="y - 1 = -\tfrac{1}{\sqrt{3}}(x - x_0)" />.
          </p>
        </Task>

        <Task n={19} q={<>Egy részecske pályája <M t="x = t^2 - 1,\ y = t^3 - t" /> (<M t="t \in \mathbb{R}" />). Határozd meg, hol metszi saját magát a görbe, és milyen meredekségű a két érintő ebben a pontban!</>}>
          <p>
            Ha <M t="t_1 \neq t_2" /> ugyanazt a pontot adja, akkor <M t="t_1^2 - 1 = t_2^2 - 1 \Rightarrow t_2 = -t_1" />.
            Az <M t="y" />-koordinátából <M t="t_1^3 - t_1 = -t_1^3 + t_1 \Rightarrow 2t_1(t_1^2 - 1) = 0" />. Mivel{' '}
            <M t="t_1 \neq 0" />, <M t="t = \pm 1" />, a közös pont <M t="(0;\,0)" />!
          </p>
          <p>
            Meredekség: <M t="\dfrac{dy}{dx} = \dfrac{3t^2 - 1}{2t}" />. Így <M t="t = 1" />-nél <M t="m_1 = 1" />,{' '}
            <M t="t = -1" />-nél <M t="m_2 = -1" /> — a görbe derékszögben metszi önmagát az origóban!
          </p>
        </Task>

        <Task n={20} q={<>Számítsd ki az <strong>asztroid</strong> (<M t="x = a\cos^3 t,\ y = a\sin^3 t,\ 0 \le t \le 2\pi" />) teljes ívhosszát!</>}>
          <p>
            Szimmetria miatt elég az első negyedet (<M t="0 \le t \le \tfrac{\pi}{2}" />) 4-szer venni.{' '}
            <M t="x' = -3a\cos^2 t\sin t" />, <M t="y' = 3a\sin^2 t\cos t" />.
          </p>
          <p>
            <M t="\sqrt{(x')^2 + (y')^2} = 3a\sin t\cos t\sqrt{\cos^2 t + \sin^2 t} = 3a\sin t\cos t" />. Így:
            <M block t="L = 4\int_0^{\pi/2} 3a\sin t\cos t\,dt = 12a\left[\frac{\sin^2 t}{2}\right]_0^{\pi/2} = 6a." />
          </p>
        </Task>

        <h3>Nehéz</h3>

        <Task
          n={21}
          q={
            <>
              Mutasd meg, hogy a ciklois tetszőleges <M t="P(t)" /> pontjában húzott <strong>normális</strong> mindig
              átmegy a guruló kerék talajjal való <M t="T(at;\,0)" /> érintkezési pontján!
            </>
          }
        >
          <p>
            Az érintő meredeksége <M t="m_e = \cot(t/2)" />, ezért a normális meredeksége{' '}
            <M t="m_n = -\tan(t/2)" />. Nézzük meg a <M t="T(at;\,0)" /> és <M t="P(a(t-\sin t);\,a(1-\cos t))" />{' '}
            pontokat összekötő egyenes meredekségét:
            <M block t="\frac{a(1-\cos t) - 0}{a(t - \sin t) - at} = \frac{1 - \cos t}{-\sin t} = \frac{2\sin^2(t/2)}{-2\sin(t/2)\cos(t/2)} = -\tan\left(\frac{t}{2}\right) = m_n!" />
            Mivel mindkét egyenes átmegy <M t="P" />-n és azonos a meredekségük, egybeesnek — és a normális így a
            pillanatnyi forgásközépponton (<M t="T" />) halad át!
          </p>
        </Task>

        <Task
          n={22}
          q={
            <>
              Számítsd ki az <M t="x = a(t - \sin t),\ y = a(1 - \cos t)" /> ciklois egy ívének az <M t="x" />-tengely
              körüli megforgatásából keletkező forgástest felszínét!
            </>
          }
        >
          <p>
            A felszínképlet <M t="A = \int_0^{2\pi} 2\pi y\,ds" />, ahol <M t="y = 2a\sin^2(t/2)" /> és{' '}
            <M t="ds = 2a\sin(t/2)\,dt" />:
            <M block t="A = 2\pi\int_0^{2\pi} 4a^2\sin^3\left(\frac{t}{2}\right)dt." />
            Az <M t="u = t/2" /> (<M t="dt = 2\,du" />) helyettesítéssel:
            <M block t="A = 16\pi a^2\int_0^{\pi} (1 - \cos^2 u)\sin u\,du = 16\pi a^2\left[-\cos u + \frac{\cos^3 u}{3}\right]_0^{\pi} = 16\pi a^2\cdot\frac{4}{3} = \frac{64}{3}\pi a^2." />
          </p>
        </Task>

        <Task
          n={23}
          q={
            <>
              Igazold, hogy ha a cikloist az <M t="x" />-tengely körül forgatjuk meg, egy ív forgástestének térfogata{' '}
              <M t="V = 5\pi^2 a^3" />!
            </>
          }
        >
          <p>
            <M t="V = \pi\int_0^{2\pi} y^2\,x'(t)\,dt = \pi a^3\int_0^{2\pi}(1-\cos t)^3\,dt" />. Kifejtve:
            <M block t="(1 - \cos t)^3 = 1 - 3\cos t + 3\cos^2 t - \cos^3 t." />
            A <M t="[0;\,2\pi]" /> perióduson <M t="\int \cos t\,dt = 0" />, <M t="\int \cos^3 t\,dt = 0" />,{' '}
            <M t="\int_0^{2\pi} 1\,dt = 2\pi" /> és <M t="\int_0^{2\pi} \cos^2 t\,dt = \pi" />. Tehát:
            <M block t="V = \pi a^3(2\pi + 3\pi) = 5\pi^2 a^3." />
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Mi a felfordított ciklois <strong>tautochron</strong> tulajdonságának lényege?
            </>
          }
          options={[
            { label: 'Bármely magasságból indítva súrlódásmentesen, a golyó pontosan ugyanannyi idő alatt ér a legmélyebb pontra', ok: true },
            { label: 'A ciklois ívhossza egyenlő a kerék kerületével' },
            { label: 'Az érintő minden pontban vízszintes' },
            { label: 'A sebesség állandó marad a lecsúszás során' },
          ]}
          explain={
            <>
              Huygens 1673-ban ezt használta ki: a cikloisív mentén lengő inga periódusideje független az amplitúdótól.
            </>
          }
        />
      </>
    ),
  },
];
