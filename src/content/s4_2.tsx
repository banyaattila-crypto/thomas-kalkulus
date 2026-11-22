import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  LagrangeSecantWidget,
  ParallelCurvesWidget,
  RolleWidget,
  SpeedTrapWidget,
  UniqueRootDiagram,
} from '../components/Widgets42';
import type { Page } from './s1_1';

export const S4_2: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Rolle tétele: ha ugyanoda érsz vissza, valahol megfordultál',
    body: (
      <>
        <Story>
          <p>
            Feldobsz egy labdát a kezedből, és 2 másodperc múlva ugyanabban a magasságban elkapod. Nem kell mérőműszer ahhoz, hogy biztosan tudd: volt egy pillanat útközben, amikor a labda függőleges sebessége <strong>pontosan nulla</strong> volt (a pályája tetején)! Ennek a mindennapi megfigyelésnek a matematikai formája <strong>Rolle tétele</strong>.
          </p>
        </Story>
        <Def title="Rolle tétele">
          <p>
            Ha az <M t="f" /> függvény:
          </p>
          <ol>
            <li><strong>folytonos</strong> a zárt <M t="[a;\,b]" /> intervallumon,</li>
            <li><strong>differenciálható</strong> a nyílt <M t="(a;\,b)" /> intervallumon, és</li>
            <li><M t="f(a) = f(b)" />,</li>
          </ol>
          <p>
            akkor létezik legalább egy <M t="c \in (a;\,b)" /> belső pont, amelyre:
          </p>
          <M block t="f'(c) = 0." />
        </Def>
        <p>
          Geometriailag: ha egy sima görbe két azonos magasságú pontot köt össze, akkor köztük legalább egyszer <strong>vízszintes az érintője</strong>! Mindhárom feltétel elengedhetetlen — nézd meg az ellenpéldákat:
        </p>
        <RolleWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Ellenőrizd Rolle tétele feltételeit az <M t="f(x)=x^2-4x+3" /> függvényre a <M t="[1;\,3]" /> intervallumon, és keresd meg a <M t="c" /> pontot!
            </>
          }
        >
          <p>
            Polinom, tehát mindenütt folytonos és differenciálható; <M t="f(1)=0" /> és <M t="f(3)=0" />, így <M t="f(1)=f(3)" /> teljesül!
          </p>
          <p>
            <M t="f'(c)=2c-4=0 \Rightarrow c=2 \in (1;\,3)" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Miért nem alkalmazható Rolle tétele az <M t="f(x)=|x|" /> függvényre a <M t="[-2;\,2]" /> intervallumon, pedig <M t="f(-2)=f(2)=2" />?
            </>
          }
        >
          <p>
            Mert <M t="f(x)=|x|" /> az <M t="x=0 \in (-2;\,2)" /> belső pontban <strong>nem differenciálható</strong> (töréspont)! És valóban: sehol nincs <M t="f'(c)=0" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Rolle tétele akcióban: egyenletek gyökeinek száma',
    body: (
      <>
        <p>
          Rolle tétele meglepően erős fegyver algebrai egyenletek vizsgálatában! A <strong>Bolzano-tétellel</strong> (2.6) összefogva pontosan meg tudjuk mondani, hány valós gyöke van egy bonyolult egyenletnek — anélkül, hogy megoldanánk!
        </p>
        <ul>
          <li>
            <strong>Bolzano-tétel:</strong> ha <M t="f(a)" /> és <M t="f(b)" /> ellentétes előjelű, akkor van <em>legalább 1</em> gyök <M t="(a;\,b)" />-ben.
          </li>
          <li>
            <strong>Rolle tétele (indirekt):</strong> ha lenne <em>2 különböző gyök</em> (<M t="f(r_1)=f(r_2)=0" />), akkor köztük biztosan lenne olyan <M t="c" />, ahol <M t="f'(c)=0" />. Ha tehát <M t="f'(x)" /> sehol nem nulla, akkor <strong>legfeljebb 1</strong> gyök lehet!
          </li>
        </ul>
        <UniqueRootDiagram />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Bizonyítsd be, hogy az <M t="x^3 + 3x + 1 = 0" /> egyenletnek <strong>pontosan egy</strong> valós gyöke van!
            </>
          }
        >
          <p>
            Legyen <M t="f(x)=x^3+3x+1" />. 1) Folytonos, <M t="f(-1)=-3 < 0" /> és <M t="f(0)=1 > 0" />, tehát Bolzano tétele miatt van legalább egy gyök <M t="(-1;\,0)" />-ban.
          </p>
          <p>
            2) <M t="f'(x)=3x^2+3 \ge 3 > 0" /> minden <M t="x" />-re, tehát sosem nulla! Ha lenne két gyök, Rolle tétele szerint köztük lenne <M t="f'(c)=0" /> — ellentmondás! Így pontosan 1 valós gyök van.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Mutasd meg, hogy az <M t="x^5 + 2x - 1 = 0" /> egyenletnek pontosan egy valós gyöke van a <M t="[0;\,1]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="f(0)=-1 < 0" /> és <M t="f(1)=2 > 0" /> → Bolzano miatt van legalább 1 gyök.
          </p>
          <p>
            <M t="f'(x)=5x^4+2 \ge 2 > 0" /> mindenütt → Rolle tétele miatt nem lehet 2 gyök! Tehát pontosan 1 gyök van.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A Lagrange-féle középértéktétel (MVT)',
    body: (
      <>
        <p>
          Mi történik, ha <em>megdöntjük</em> Rolle tételének ábráját, vagyis elengedjük az <M t="f(a)=f(b)" /> feltételt? Ekkor a két végpontot összekötő <strong>szelő</strong> már nem vízszintes, hanem <M t="\dfrac{f(b)-f(a)}{b-a}" /> meredekségű — és a görbén biztosan van legalább egy pont, ahol az érintő <strong>párhuzamos a szelővel</strong>!
        </p>
        <Def title="Lagrange-féle középértéktétel (Mean Value Theorem)">
          <p>
            Ha az <M t="f" /> függvény <strong>folytonos</strong> a zárt <M t="[a;\,b]" /> intervallumon és <strong>differenciálható</strong> a nyílt <M t="(a;\,b)" /> intervallumon, akkor létezik legalább egy <M t="c \in (a;\,b)" />, amelyre:
          </p>
          <M block t="f'(c) = \frac{f(b) - f(a)}{b - a} \qquad \Longleftrightarrow \qquad f(b) - f(a) = f'(c)(b - a)." />
        </Def>
        <p>
          <strong>A bizonyítás gyönyörű ötlete:</strong> vonjuk ki <M t="f(x)" />-ből az <M t="AB" /> szelő egyenesének egyenletét! Az így kapott függőleges eltérés <M t="h(x) = f(x) - f(a) - \frac{f(b)-f(a)}{b-a}(x-a)" /> a két végpontban nulla (<M t="h(a)=h(b)=0" />), így <strong>Rolle tétele</strong> szerint van olyan <M t="c" />, ahol <M t="h'(c)=0 \iff f'(c) = \frac{f(b)-f(a)}{b-a}" />!
        </p>
        <LagrangeSecantWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Keresd meg a Lagrange-féle középértéktétel által garantált <M t="c" /> pontot az <M t="f(x)=x^2+2x-1" /> függvényre a <M t="[0;\,2]" /> intervallumon!
            </>
          }
        >
          <p>
            Szelő meredeksége: <M t="\dfrac{f(2)-f(0)}{2-0}=\dfrac{7-(-1)}{2}=4" />.
          </p>
          <p>
            Derivált: <M t="f'(c)=2c+2=4 \Rightarrow c=1 \in (0;\,2)" />. (Érdekesség: másodfokú függvénynél <M t="c" /> mindig pontosan az intervallum felezőpontja!)
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Határozd meg a <M t="c" /> pontot az <M t="f(x)=\sqrt{x}" /> függvényre a <M t="[0;\,4]" /> intervallumon!
            </>
          }
        >
          <p>
            Figyeld meg: <M t="x=0" />-nál nem differenciálható, de a tételhez elég a <em>nyílt</em> <M t="(0;\,4)" /> intervallumon való differenciálhatóság és a <em>zárt</em> <M t="[0;\,4]" />-en való folytonosság!
          </p>
          <p>
            <M t="\dfrac{\sqrt{4}-\sqrt{0}}{4-0}=\dfrac{1}{2}" />. <M t="f'(c)=\dfrac{1}{2\sqrt{c}}=\dfrac{1}{2} \Rightarrow \sqrt{c}=1 \Rightarrow c=1 \in (0;\,4)" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Fizikai jelentés: az átlagsebesség-mérő kapu',
    body: (
      <>
        <p>
          A Lagrange-tételnek van egy közismert, mindennapi alkalmazása: a <strong>szekciókontroll</strong> (átlagsebesség-mérés az autópályán). Ha <M t="s(t)" /> az autó által megtett út, akkor:
        </p>
        <M block t="\underbrace{s'(c)}_{\text{pillanatnyi sebesség}} = \underbrace{\frac{s(b)-s(a)}{b-a}}_{\text{átlagsebesség}}." />
        <p>
          Vagyis ha egy 10 km-es, 130 km/h-s korlátozású szakaszt 4 perc alatt teszel meg (átlagosan 150 km/h-val), hiába lassítasz le mindkét kapu előtt 120-ra: a középértéktétel <strong>matematikai bizonyíték</strong> arra, hogy útközben legalább egyszer pontosan 150 km/h-val mentél!
        </p>
        <SpeedTrapWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Egy futó 2 óra alatt pontosan 30 km-t fut le, rajtból (<M t="v=0" />) indulva. Garantálja-e a Lagrange-tétel, hogy volt olyan pillanat, amikor a pillanatnyi sebessége pontosan <M t="15" /> km/h volt?
            </>
          }
        >
          <p>
            <strong>Igen!</strong> Az átlagsebessége <M t="\dfrac{30}{2}=15" /> km/h, és a megtett út sima függvénye az időnek, ezért biztosan létezett olyan <M t="c \in (0;\,2)" /> pillanat, amikor <M t="v(c)=s'(c)=15" /> km/h!
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Ha egy autóról tudjuk, hogy 12:00-kor állt (<M t="s(0)=0" />) és végig legfeljebb <M t="90" /> km/h sebességgel haladt (<M t="s'(t)\le 90" />), legfeljebb mekkora utat tehetett meg 12:40-ig (<M t="t=\frac{2}{3}" /> óra)?
            </>
          }
        >
          <p>
            A Lagrange-tétel szerint <M t="s(2/3)-s(0) = s'(c)\cdot\dfrac{2}{3} \le 90\cdot\dfrac{2}{3} = 60" /> km! (A középértéktétel tehát felső becslésre is kiváló!)
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'A középértéktétel 3 aranyat érő következménye',
    body: (
      <>
        <p>
          A Lagrange-tétel nem csupán egy szép geometriai állítás — ez a <strong>híd</strong> a deriválás és az integrálás (valamint a görbevizsgálat) között! Íme a három legfontosabb következménye:
        </p>
        <Def title="1. és 2. következmény (egy I intervallumon)">
          <ul>
            <li>
              <strong>1. Nulla derivált ⇒ konstans függvény:</strong> ha <M t="f'(x)=0" /> minden <M t="x \in I" />-re, akkor <M t="f(x)=C" /> (állandó) az <M t="I" /> intervallumon! <em>(Bizonyítás: bármely <M t="x_1 < x_2" /> pontra <M t="f(x_2)-f(x_1)=f'(c)(x_2-x_1)=0" />.)</em>
            </li>
            <li>
              <strong>2. Azonos derivált ⇒ konstans eltérés:</strong> ha <M t="f'(x)=g'(x)" /> minden <M t="x \in I" />-re, akkor <M t="f(x) = g(x) + C" /> valamely <M t="C" /> állandóval!
            </li>
          </ul>
        </Def>
        <p>
          <strong>3. Alkalmazás — függvény visszakeresése deriváltból (kezdetiérték-feladat):</strong> ha tudjuk, hogy <M t="f'(x)=2x" /> és <M t="f(1)=5" />, akkor a 2. következmény garantálja, hogy <em>minden</em> megoldás <M t="f(x)=x^2+C" /> alakú, és <M t="f(1)=1+C=5 \Rightarrow C=4" />, tehát egyetlen megoldás létezik: <M t="f(x)=x^2+4" />!
        </p>
        <ParallelCurvesWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Határozd meg azt az <M t="f(x)" /> függvényt, amelyre <M t="f'(x)=3x^2 - 4x + 1" /> és <M t="f(2)=5" />!
            </>
          }
        >
          <p>
            A 2. következmény szerint <M t="f(x) = x^3 - 2x^2 + x + C" />.
          </p>
          <p>
            Behelyettesítve: <M t="f(2) = 8 - 8 + 2 + C = 5 \Rightarrow C = 3" />, tehát <M t="f(x) = x^3 - 2x^2 + x + 3" />!
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Igazold a Lagrange-tétellel a híres <M t="|\sin b - \sin a| \le |b - a|" /> egyenlőtlenséget minden <M t="a, b \in \mathbb{R}" /> esetén!
            </>
          }
        >
          <p>
            Ha <M t="a=b" />, az egyenlőség teljesül (<M t="0\le 0" />). Ha <M t="a\ne b" />, a <M t="\sin x" /> függvényre alkalmazva a középértéktételt létezik olyan <M t="c" />, amelyre <M t="\sin b - \sin a = (\cos c)(b - a)" />.
          </p>
          <p>
            Abszolút értéket véve és használva, hogy <M t="|\cos c| \le 1" />: <M t="|\sin b - \sin a| = |\cos c|\cdot|b-a| \le |b-a|" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás és a 4 legnagyobb buktató',
    body: (
      <>
        <table className="tbl">
          <thead>
            <tr>
              <th>tétel / következmény</th>
              <th>feltétel</th>
              <th>állítás</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rolle tétele</td>
              <td>folyt. <M t="[a;\,b]" />, diff. <M t="(a;\,b)" />, <M t="f(a)=f(b)" /></td>
              <td><M t="\exists\, c \in (a;\,b):\; f'(c)=0" /></td>
            </tr>
            <tr>
              <td>Lagrange-tétel (MVT)</td>
              <td>folyt. <M t="[a;\,b]" />, diff. <M t="(a;\,b)" /></td>
              <td><M t="\exists\, c \in (a;\,b):\; f'(c)=\dfrac{f(b)-f(a)}{b-a}" /></td>
            </tr>
            <tr>
              <td>1. következmény</td>
              <td><M t="f'(x)=0" /> egy <M t="I" /> intervallumon</td>
              <td><M t="f(x)=C" /> állandó <M t="I" />-n</td>
            </tr>
            <tr>
              <td>2. következmény</td>
              <td><M t="f'(x)=g'(x)" /> egy <M t="I" /> intervallumon</td>
              <td><M t="f(x)=g(x)+C" /></td>
            </tr>
          </tbody>
        </table>
        <h3>Négy klasszikus hiba</h3>
        <Warn>
          <p>
            <strong>1. Feltételek ellenőrzésének kihagyása:</strong> például <M t="f(x)=1/x^2" /> a <M t="[-1;\,1]" /> intervallumon — bár <M t="f(-1)=f(1)=1" />, <M t="x=0" />-nál szakadása van, így sem Rolle, sem Lagrange tétele nem alkalmazható!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. Az 1. következmény NEM összefüggő tartományon:</strong> az <M t="f(x)=\dfrac{x}{|x|}" /> függvény deriváltja <M t="0" /> a <M t="(-\infty;\,0)\cup(0;\,\infty)" /> halmazon, mégsem egyetlen konstans (<M t="-1" /> és <M t="+1" />)! A következmény <em>egyetlen intervallumon</em> érvényes!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Végponton kívüli <M t="c" /> elfogadása:</strong> ha <M t="f'(c)=\frac{f(b)-f(a)}{b-a}" /> több megoldást ad (pl. <M t="c=\pm 1" />), csak az <M t="(a;\,b)" /> <strong>nyílt intervallumba eső</strong> <M t="c" /> a tétel szerinti pont!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. A végponti differenciálhatóság túlkövetelése:</strong> a tétel <em>csak</em> a nyílt <M t="(a;\,b)" />-n követel differenciálhatóságot! A végpontokban elég a folytonosság (mint <M t="\sqrt{x}" /> esetén <M t="[0;\,4]" />-en).
          </p>
        </Warn>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Lépcsőzetes gyakorlófeladatok (könnyűtől a haladóig)',
    body: (
      <>
        <p>
          Oldd meg az alábbi 9 feladatot növekvő nehézségi sorrendben!
        </p>

        <h3>Könnyebb (alapozó) feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Keresd meg a Lagrange-tétel szerinti <M t="c" /> pontot az <M t="f(x)=x^2-3x+2" /> függvényre az <M t="[1;\,4]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="\dfrac{f(4)-f(1)}{4-1}=\dfrac{6-0}{3}=2" />. <M t="f'(c)=2c-3=2 \Rightarrow c=\dfrac{5}{2}=2{,}5 \in (1;\,4)" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Teljesülnek-e a Lagrange-tétel feltételei az <M t="f(x)=x^{2/3}" /> függvényre a <M t="[-1;\,1]" /> intervallumon?
            </>
          }
        >
          <p>
            <strong>Nem!</strong> Bár folytonos <M t="[-1;\,1]" />-en, az <M t="x=0 \in (-1;\,1)" /> belső pontban <M t="f'(x)=\frac{2}{3}x^{-1/3}" /> nem létezik (tüske).
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Határozd meg azt az <M t="f(x)" /> függvényt, amelyre <M t="f'(x)=\cos x" /> és <M t="f(0)=3" />!
            </>
          }
        >
          <p>
            <M t="f(x)=\sin x + C" />. Mivel <M t="f(0)=0+C=3 \Rightarrow C=3" />, tehát <M t="f(x)=\sin x + 3" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Keresd meg a Lagrange-tétel szerinti <M t="c" /> pontot az <M t="f(x)=x^3-x" /> függvényre a <M t="[0;\,2]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="\dfrac{f(2)-f(0)}{2-0}=\dfrac{6-0}{2}=3" />. <M t="f'(c)=3c^2-1=3 \Rightarrow c^2=\dfrac{4}{3} \Rightarrow c=\dfrac{2}{\sqrt{3}}\approx 1{,}155 \in (0;\,2)" /> (a negatív gyök kívül esik!).
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Keresd meg a <M t="c" /> pontot az <M t="f(x)=\dfrac{1}{x}" /> függvényre az <M t="[1;\,4]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="\dfrac{f(4)-f(1)}{4-1}=\dfrac{\frac{1}{4}-1}{3}=-\dfrac{1}{4}" />. <M t="f'(c)=-\dfrac{1}{c^2}=-\dfrac{1}{4} \Rightarrow c^2=4 \Rightarrow c=2 \in (1;\,4)" />.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Egy függvényről tudjuk, hogy <M t="f(1)=4" /> és <M t="f'(x) \ge 2" /> minden <M t="x \in [1;\,5]" /> esetén. Legalább mennyi <M t="f(5)" />?
            </>
          }
        >
          <p>
            Lagrange-tételből: <M t="f(5)-f(1) = f'(c)(5-1) = 4f'(c) \ge 4\cdot 2 = 8 \Rightarrow f(5) \ge 4 + 8 = 12" />!
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              Bizonyítsd be, hogy az <M t="2x + \cos x = 0" /> egyenletnek <strong>pontosan egy</strong> valós gyöke van!
            </>
          }
        >
          <p>
            Legyen <M t="f(x)=2x+\cos x" />. 1) <M t="f(-\pi)=-2\pi-1 < 0" /> és <M t="f(0)=1 > 0" /> → Bolzano miatt van legalább 1 gyök.
          </p>
          <p>
            2) <M t="f'(x)=2-\sin x \ge 2 - 1 = 1 > 0" /> minden <M t="x" />-re → sosem nulla! Rolle tétele szerint tehát legfeljebb 1 gyök lehet.
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Egy részecske gyorsulása <M t="a(t)=6t" /> (<M t="\text{m/s}^2" />), kezdeti sebessége <M t="v(0)=2" /> m/s, kezdeti helyzete <M t="s(0)=5" /> m. Határozd meg a <M t="v(t)" /> és <M t="s(t)" /> függvényeket!
            </>
          }
        >
          <p>
            1) <M t="v'(t)=6t \Rightarrow v(t)=3t^2+C_1" />. <M t="v(0)=2 \Rightarrow C_1=2" />, tehát <M t="v(t)=3t^2+2" />.
          </p>
          <p>
            2) <M t="s'(t)=3t^2+2 \Rightarrow s(t)=t^3+2t+C_2" />. <M t="s(0)=5 \Rightarrow C_2=5" />, tehát <M t="s(t)=t^3+2t+5" />!
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Igazold a 2. következménnyel, hogy <M t="\sin^2 x + \cos^2 x = 1" /> minden valós <M t="x" />-re, kizárólag deriválással és egyetlen pont behelyettesítésével!
            </>
          }
        >
          <p>
            Legyen <M t="f(x)=\sin^2 x + \cos^2 x" />. Deriválva (láncszabállyal):
          </p>
          <M block t="f'(x) = 2\sin x\cos x + 2\cos x(-\sin x) = 0 \qquad (\text{minden } x \in \mathbb{R})." />
          <p>
            Az 1. következmény szerint <M t="f(x)=C" /> állandó a teljes <M t="\mathbb{R}" />-en! Behelyettesítve <M t="x=0" />-t: <M t="C = f(0) = 0^2 + 1^2 = 1" />, tehát <M t="\sin^2 x + \cos^2 x \equiv 1" />!
          </p>
        </Task>
      </>
    ),
  },
];
