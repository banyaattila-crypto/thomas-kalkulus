import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  CurtainLineIntegral3DWidget,
  CurveSymmetryShortcutWidget,
  HelixLineIntegral3DWidget,
  LineIntegralMasterMapDiagram,
  LineIntegralStepWidget,
  PiecewisePathWidget,
  ScalarVsVectorPreviewWidget,
  WireCentroidWidget,
} from '../components/Widgets161';
import type { Page } from './s1_1';

export const S16_1: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'A vonalintegrál: integrálás egy görbe mentén',
    body: (
      <>
        <Story>
          <p>
            Elérkeztünk a teljes háromkötetes tananyag fináléjához, a <strong>16. fejezethez</strong>! Eddig
            intervallumokon (1D), síktartományokon (2D) és térfogatokon (3D) integráltunk. Most egy vékony, görbe
            drótra vagy űrhajó pályájára szorítkozunk: egy <M t="C" /> térgörbe mentén összegezzük egy{' '}
            <M t="f(x, y, z)" /> függvény értékeit! Ha <M t="f(x, y) \ge 0" /> síkgörbe fölött áll, ez pontosan a{' '}
            <strong>görbe fölötti „függöny” (kerítés) területe</strong>.
          </p>
        </Story>

        <Def title="Skalárfüggvény vonalintegrálja (ívhossz szerint)">
          <p>
            Egy sima <M t="C" /> görbe mentén az <M t="f" /> függvény <strong>vonalintegrálja</strong> a Riemann-összegek
            határértéke (<M t="\Delta s_k" /> az egyes kis ívdarabok hossza):
          </p>
          <M block t="\int_C f(x, y, z)\,ds = \lim_{\max\Delta s_k \to 0} \sum_{k=1}^n f(x_k, y_k, z_k)\,\Delta s_k." />
          <p>
            Különleges eset: ha <M t="f \equiv 1" />, akkor <M t="\int_C 1\,ds = L" /> pontosan a görbe{' '}
            <strong>ívhossza</strong>!
          </p>
        </Def>

        <CurtainLineIntegral3DWidget />

        <Task n={1} q={<>Mit jelent geometriailag az <M t="\int_C 5\,ds" /> vonalintegrál, ha <M t="C" /> egy <M t="L = 12" /> hosszúságú térgörbe?</>}>
          <p>
            <M t="5 \int_C 1\,ds = 5L = 60" /> — egy 12 hosszú, állandó 5 magasságú görbe kerítés területe (vagy egy
            állandó 5 sűrűségű drót tömege).
          </p>
        </Task>

        <Task n={2} q={<>Számítsd ki az <M t="\int_C (x + y)\,ds" /> integrált a <M t="(0; 0)" /> és <M t="(3; 4)" /> pontokat összekötő egyenes szakaszon!</>}>
          <p>
            Paraméterezés: <M t="\mathbf{r}(t) = \langle 3t, 4t \rangle" /> (<M t="0 \le t \le 1" />),{' '}
            <M t="ds = \sqrt{3^2 + 4^2}\,dt = 5\,dt" />. Így{' '}
            <M t="\int_0^1 (7t)\cdot 5\,dt = 35\big[\frac{t^2}{2}\big]_0^1 = \frac{35}{2}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'A 3 lépéses számítási recept',
    body: (
      <>
        <p>
          A 13.3 fejezetből tudjuk, hogy egy sima <M t="\mathbf{r}(t) = \langle x(t), y(t), z(t) \rangle" />{' '}
          paraméterezés íveleme <M t="ds = |\mathbf{v}(t)|\,dt" />. Ezzel minden vonalintegrál közönséges 1D határozott
          integrállá alakul!
        </p>

        <Def title="Vonalintegrál kiszámítása paraméterezéssel">
          <M block t="\int_C f(x, y, z)\,ds = \int_a^b f\big(x(t),\, y(t),\, z(t)\big)\,\sqrt{[x'(t)]^2 + [y'(t)]^2 + [z'(t)]^2}\,dt." />
        </Def>

        <LineIntegralStepWidget />

        <Quiz
          q={<>Mi a leggyakoribb hiba a skalár vonalintegrál (<M t="\int_C f\,ds" />) kiszámításakor?</>}
          options={[
            { label: <>A határok felcserélése a paraméterben</> },
            { label: <>Az ívelem <M t="|\mathbf{v}(t)| = \sqrt{(x')^2 + (y')^2 + (z')^2}" /> tényezőjének lehagyása</>, ok: true },
            { label: <>Az, hogy a függvénybe behelyettesítjük <M t="x(t), y(t)" />-t</> },
            { label: <>A körív poláris paraméterezése</> },
          ]}
          explain={
            <>
              <M t="ds" /> <strong>nem</strong> egyenlő <M t="dt" />-vel, hanem <M t="ds = |\mathbf{v}(t)|\,dt" />!
            </>
          }
        />

        <Task n={3} q={<>Számítsd ki az <M t="\int_C (x - 3y^2 + z)\,ds" /> integrált a <M t="\mathbf{r}(t) = \langle t,\; t,\; t \rangle" /> (<M t="0 \le t \le 1" />) szakaszon!</>}>
          <p>
            <M t="|\mathbf{v}(t)| = \sqrt{1+1+1} = \sqrt{3}" />. Így{' '}
            <M t="\sqrt{3}\int_0^1 (2t - 3t^2)\,dt = \sqrt{3}\big[t^2 - t^3\big]_0^1 = 0" />!
          </p>
        </Task>

        <Task n={4} q={<>Értékeld ki az <M t="\int_C xy\,ds" /> integrált a 2 sugarú kör I. síknegyedbeli ívén (<M t="x = 2\cos t,\; y = 2\sin t,\; 0 \le t \le \frac{\pi}{2}" />)!</>}>
          <p>
            <M t="|\mathbf{v}(t)| = 2" />. Így{' '}
            <M t="\int_0^{\pi/2} (4\cos t\sin t)\cdot 2\,dt = 8\big[\frac{\sin^2 t}{2}\big]_0^{\pi/2} = 4" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Szakaszonként sima görbék és additivitás',
    body: (
      <>
        <p>
          Ha a görbe töréspontokat tartalmaz (például egy háromszög vagy téglalap kerülete), egyszerűen felbontjuk
          sima darabokra (<M t="C = C_1 \cup C_2 \cup \dots \cup C_m" />), és összeadjuk az egyes darabok integráljait!
        </p>

        <PiecewisePathWidget />

        <Steps
          title="Vonalintegrál két szakaszból álló törtvonalon"
          problem={
            <>
              Számítsd ki az <M t="\int_C (x + 2y)\,ds" /> integrált a <M t="C_1: (0;0) \to (1;0)" /> és{' '}
              <M t="C_2: (1;0) \to (1;2)" /> szakaszok egyesítésén!
            </>
          }
          steps={[
            {
              title: 'Integráljunk C₁-en: (0; 0) → (1; 0)',
              body: (
                <>
                  <M t="\mathbf{r}_1(t) = \langle t, 0 \rangle" /> (<M t="0\le t\le 1" />), <M t="ds = 1\,dt" />:{' '}
                  <M t="\int_{C_1} (x+2y)\,ds = \int_0^1 t\,dt = \frac{1}{2}" />.
                </>
              ),
            },
            {
              title: 'Integráljunk C₂-n: (1; 0) → (1; 2)',
              body: (
                <>
                  <M t="\mathbf{r}_2(t) = \langle 1, t \rangle" /> (<M t="0\le t\le 2" />), <M t="ds = 1\,dt" />:{' '}
                  <M t="\int_{C_2} (x+2y)\,ds = \int_0^2 (1 + 2t)\,dt = [t + t^2]_0^2 = 6" />.
                </>
              ),
            },
            {
              title: 'Adjuk össze a két részintegrált',
              body: (
                <>
                  <M t="\int_C (x + 2y)\,ds = \frac{1}{2} + 6 = \frac{13}{2} = 6{,}5" />!
                </>
              ),
            },
          ]}
        />

        <Task n={5} q={<>Számítsd ki az <M t="\int_C x\,ds" /> integrált a <M t="(0;0) \to (1;0) \to (1;1) \to (0;0)" /> zárt háromszög kerületén!</>}>
          <p>
            <M t="C_1: \int_0^1 t\,dt = \frac{1}{2}" />; <M t="C_2: \int_0^1 1\,dt = 1" />;{' '}
            <M t="C_3" /> (átló <M t="\langle t, t \rangle" />, <M t="ds = \sqrt{2}\,dt" />):{' '}
            <M t="\sqrt{2}\int_0^1 t\,dt = \frac{\sqrt{2}}{2}" />. Összesen: <M t="\frac{3 + \sqrt{2}}{2}" />.
          </p>
        </Task>

        <Task n={6} q={<>Miért kaptunk a fenti ábrán eltérő eredményt (<M t="8" /> vs. <M t="4\sqrt{2}" />) ugyanarra a <M t="(0;0)\to(2;2)" /> végpontpárra?</>}>
          <p>
            Mert a hosszabb törtvonalon a görbe tovább időzik nagyobb <M t="x+y" /> értékű tartományokban (és maga az út
            is hosszabb: <M t="4" /> szemben <M t="2\sqrt{2}" />-vel). A skalár vonalintegrál mindig függ az úttól!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Térbeli vonalintegrálok (3D görbék)',
    body: (
      <>
        <p>
          Három dimenzióban a képlet egyetlen betűvel bővül (<M t="z(t)" />), és különösen szépen működik csavarvonalon,
          ahol <M t="|\mathbf{v}(t)| = \sqrt{a^2 + b^2}" /> állandó!
        </p>

        <HelixLineIntegral3DWidget />

        <Task n={7} q={<>Számítsd ki az <M t="\int_C (x^2 + y^2 + z)\,ds" /> integrált az <M t="\mathbf{r}(t) = \langle \cos t,\; \sin t,\; t \rangle" /> (<M t="0 \le t \le 2\pi" />) csavarvonalon!</>}>
          <p>
            <M t="x^2 + y^2 = 1" />, <M t="|\mathbf{v}(t)| = \sqrt{2}" />. Így{' '}
            <M t="\sqrt{2}\int_0^{2\pi} (1 + t)\,dt = \sqrt{2}\big[t + \frac{t^2}{2}\big]_0^{2\pi} = 2\sqrt{2}\pi(1 + \pi)" />.
          </p>
        </Task>

        <Task n={8} q={<>Értékeld ki az <M t="\int_C xz\,ds" /> integrált a <M t="(0;0;0)" /> és <M t="(2;1;2)" /> pontokat összekötő egyenes szakaszon!</>}>
          <p>
            <M t="\mathbf{r}(t) = \langle 2t, t, 2t \rangle" /> (<M t="0\le t\le 1" />),{' '}
            <M t="|\mathbf{v}| = \sqrt{4+1+4} = 3" />. Így{' '}
            <M t="\int_0^1 (2t)(2t)\cdot 3\,dt = 12\big[\frac{t^3}{3}\big]_0^1 = 4" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Vékony drótok tömege, súlypontja és tehetetlenségi nyomatéka',
    body: (
      <>
        <p>
          Ha egy térgörbe alakú vékony drót egységnyi hosszra jutó tömege (lineáris sűrűsége){' '}
          <M t="\delta(x, y, z)" />, akkor a 15.2 és 15.5 fejezet fizikai képletei 1D vonalintegrálként élnek tovább!
        </p>

        <Def title="Drót tömege, tömegközéppontja és tehetetlenségi nyomatéka">
          <M block t="M = \int_C \delta\,ds, \qquad \bar{x} = \frac{1}{M}\int_C x\delta\,ds, \quad \bar{y} = \frac{1}{M}\int_C y\delta\,ds, \quad \bar{z} = \frac{1}{M}\int_C z\delta\,ds," />
          <M block t="I_z = \int_C (x^2 + y^2)\,\delta\,ds \qquad \text{(általánosan } I_L = \int_C r_L^2\,\delta\,ds\text{)}." />
        </Def>

        <WireCentroidWidget />

        <Quiz
          q={<>Hol helyezkedik el egy homogén, <M t="R" /> sugarú felső félkör alakú vékony drót <M t="\bar{y}" /> tömegközéppontja?</>}
          options={[
            { label: <M t="\frac{R}{2}" /> },
            { label: <M t="\frac{4R}{3\pi}" /> },
            { label: <M t="\frac{2R}{\pi}" />, ok: true },
            { label: <M t="\frac{\pi R}{4}" /> },
          ]}
          explain={
            <>
              <M t="M = \pi R" />, <M t="M_x = \int_0^\pi (R\sin t)\,R\,dt = 2R^2" />, tehát{' '}
              <M t="\bar{y} = \frac{2R^2}{\pi R} = \frac{2R}{\pi} \approx 0{,}637R" />! (A <M t="\frac{4R}{3\pi}" />{' '}
              a <em>tömör félkörlemez</em> súlypontja!)
            </>
          }
        />

        <Task n={9} q={<>Mekkora a <M t="z" />-tengelyre vett <M t="I_z" /> tehetetlenségi nyomatéka egy <M t="M" /> tömegű, homogén, <M t="a" /> sugarú csavarrugónak (<M t="x^2 + y^2 = a^2" />)?</>}>
          <p>
            Mivel a rugó minden pontja pontosan <M t="a" /> távolságra van a <M t="z" />-tengelytől,{' '}
            <M t="I_z = \int_C a^2 \delta\,ds = a^2 \int_C \delta\,ds = Ma^2" />!
          </p>
        </Task>

        <Task n={10} q={<>Határozd meg az <M t="x = \cos t,\; y = \sin t" /> (<M t="0\le t\le \pi" />) félkördrót tömegét, ha lineáris sűrűsége <M t="\delta(x, y) = 1 + y" />!</>}>
          <p>
            <M t="ds = 1\,dt" />, így <M t="M = \int_0^\pi (1 + \sin t)\,dt = [t - \cos t]_0^\pi = \pi + 2" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Átlagérték görbe mentén és szimmetria-trükkök',
    body: (
      <>
        <p>
          Egy függvény átlagértéke a <M t="C" /> görbe mentén: <M t="f_{\text{átl}} = \dfrac{1}{L}\int_C f\,ds" />.
          Szimmetrikus zárt görbéken (pl. körökön) sokszor integrálás nélkül is leolvashatjuk a végeredményt!
        </p>

        <CurveSymmetryShortcutWidget />

        <Task n={11} q={<>Számítsd ki integrálás nélkül, szimmetriával: <M t="\oint_{x^2+y^2=4} (3x^2 + 3y^2 - 5x + 2)\,ds" />!</>}>
          <p>
            A körön <M t="3(x^2+y^2) = 12" />, <M t="\oint (-5x)\,ds = 0" /> (páratlan), a kerület pedig{' '}
            <M t="L = 4\pi" />. Így az eredmény <M t="(12 + 2)\cdot 4\pi = 56\pi" />!
          </p>
        </Task>

        <Task n={12} q={<>Mennyi az <M t="f(x, y) = y" /> függvény átlagértéke az <M t="R" /> sugarú felső félkörív mentén?</>}>
          <p>
            <M t="f_{\text{átl}} = \frac{1}{\pi R}\int_0^\pi (R\sin t)\,R\,dt = \frac{2R^2}{\pi R} = \frac{2R}{\pi}" />{' '}
            — ami pontosan megegyezik a homogén félkördrót <M t="\bar{y}" /> súlypontjával!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Paraméterezés-függetlenség és előretekintés a 16.2-be',
    body: (
      <>
        <p>
          Egy fontos kérdés: ha két különböző paraméterezéssel írjuk le ugyanazt a görbét (pl. kétszer olyan gyorsan
          futunk végig rajta, vagy megfordítjuk a bejárás irányát), változik-e <M t="\int_C f\,ds" />? A válasz:{' '}
          <strong>NEM!</strong> A skalár vonalintegrál csak magától a geometriai görbétől és az <M t="f" /> függvénytől
          függ.
        </p>

        <ScalarVsVectorPreviewWidget />

        <Warn>
          Jegyezd meg élesen a különbséget a 16.2 fejezet előtt: a <strong>skalár vonalintegrál</strong> (
          <M t="\int_C f\,ds" />) <em>irányfüggetlen</em>, míg a következő szakaszban érkező{' '}
          <strong>vektoros vonalintegrál / munka</strong> (<M t="\int_C \mathbf{F}\cdot d\mathbf{r}" />){' '}
          <em>irányfüggő</em> (megfordított görbén előjelet vált)!
        </Warn>

        <Quiz
          q={<>Mennyi az <M t="\oint_{x^2+y^2=9} x^2\,ds" /> vonalintegrál értéke a szimmetria-trükkel?</>}
          options={[
            { label: <M t="0" /> },
            { label: <M t="9\pi" /> },
            { label: <M t="27\pi" />, ok: true },
            { label: <M t="54\pi" /> },
          ]}
          explain={
            <>
              <M t="R = 3" />: <M t="\oint (x^2+y^2)\,ds = R^2 \cdot 2\pi R = 54\pi" />, ennek fele{' '}
              <M t="\oint x^2\,ds = 27\pi" />!
            </>
          }
        />

        <Task n={13} q={<>Ellenőrizd, hogy <M t="\int_C x\,ds" /> ugyanazt adja <M t="\mathbf{r}_1(t) = \langle t, t \rangle" /> (<M t="0\le t\le 2" />) és <M t="\mathbf{r}_2(u) = \langle 2u, 2u \rangle" /> (<M t="0\le u\le 1" />) paraméterezéssel is!</>}>
          <p>
            Elsővel: <M t="\int_0^2 t\sqrt{2}\,dt = 2\sqrt{2}" />. Másodikkal:{' '}
            <M t="\int_0^1 (2u)\cdot 2\sqrt{2}\,du = 4\sqrt{2}\cdot\frac{1}{2} = 2\sqrt{2}" /> — pontosan azonos!
          </p>
        </Task>

        <Task n={14} q={<>Mekkora a területe a <M t="z = x" /> magasságú függönynek az <M t="y = x^2" /> (<M t="0 \le x \le 1" />) parabolaív fölött?</>}>
          <p>
            <M t="ds = \sqrt{1 + 4x^2}\,dx" />. Az <M t="u = 1 + 4x^2,\; du = 8x\,dx" /> helyettesítéssel:{' '}
            <M t="\int_0^1 x\sqrt{1+4x^2}\,dx = \frac{1}{8}\big[\frac{2}{3}u^{3/2}\big]_1^5 = \frac{5\sqrt{5} - 1}{12}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Összefoglaló mester-képlettár és gyakorlófeladatok',
    body: (
      <>
        <LineIntegralMasterMapDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Számítsd ki az <M t="\int_C 4\,ds" /> integrált a 3 sugarú teljes kör kerületén!</>}>
          <p>
            <M t="4 \cdot 2\pi(3) = 24\pi" />.
          </p>
        </Task>

        <Task n={16} q={<>Értékeld ki az <M t="\int_C (2x - y)\,ds" /> integrált a <M t="\mathbf{r}(t) = \langle t,\; 2t \rangle" /> (<M t="0 \le t \le 3" />) szakaszon!</>}>
          <p>
            A görbén <M t="2x - y = 2t - 2t = 0" />, így az integrál pontosan <M t="0" />!
          </p>
        </Task>

        <Task n={17} q={<>Számítsd ki az <M t="\int_C z\,ds" /> integrált a <M t="(0;0;0) \to (0;0;5)" /> függőleges szakaszon!</>}>
          <p>
            <M t="\int_0^5 t\,dt = \frac{25}{2} = 12{,}5" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Értékeld ki az <M t="\int_C y\,ds" /> integrált az <M t="x = t^2,\; y = 2t" /> (<M t="0 \le t \le 2" />) görbén!</>}>
          <p>
            <M t="|\mathbf{v}(t)| = \sqrt{4t^2 + 4} = 2\sqrt{t^2+1}" />. Így{' '}
            <M t="\int_0^2 (2t)\cdot 2\sqrt{t^2+1}\,dt = 2\big[\frac{2}{3}(t^2+1)^{3/2}\big]_0^2 = \frac{4}{3}(5\sqrt{5} - 1)" />.
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki az <M t="\int_C (x^2 + y^2)\,ds" /> integrált az <M t="\mathbf{r}(t) = \langle 3\cos t,\; 3\sin t,\; 4t \rangle" /> (<M t="0 \le t \le \pi" />) csavarvonalon!</>}>
          <p>
            <M t="x^2 + y^2 = 9" />, <M t="|\mathbf{v}| = 5" />. Így <M t="\int_0^\pi 9 \cdot 5\,dt = 45\pi" />.
          </p>
        </Task>

        <Task n={20} q={<>Számítsd ki szimmetriával: <M t="\oint_{x^2+y^2=1} (x^2 + 4y^2 - 7xy + 3)\,ds" />!</>}>
          <p>
            <M t="\oint x^2\,ds = \oint y^2\,ds = \pi" />, <M t="\oint xy\,ds = 0" />, <M t="\oint 3\,ds = 6\pi" />.
            Összesen: <M t="\pi + 4\pi - 0 + 6\pi = 11\pi" />!
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Határozd meg a <M t="\mathbf{r}(t) = \langle t,\; t^2,\; \frac{2}{3}t^3 \rangle" /> (<M t="0 \le t \le 1" />) drót tömegét, ha sűrűsége <M t="\delta(x, y, z) = x" />!</>}>
          <p>
            <M t="|\mathbf{v}(t)| = \sqrt{1 + 4t^2 + 4t^4} = 1 + 2t^2" /> (teljes négyzet!). Így{' '}
            <M t="M = \int_0^1 t(1 + 2t^2)\,dt = \big[\frac{t^2}{2} + \frac{t^4}{2}\big]_0^1 = 1" />!
          </p>
        </Task>

        <Task n={22} q={<>Egy <M t="R" /> sugarú, homogén teljes körgyűrű (<M t="M" /> tömeg) <M t="I_x" /> tehetetlenségi nyomatékát határozd meg az <M t="x" />-tengelyre!</>}>
          <p>
            <M t="I_x = \delta \oint y^2\,ds = \delta \cdot \pi R^3 = \frac{M}{2\pi R}\cdot \pi R^3 = \frac{1}{2}MR^2" />!
            (Míg a merőleges <M t="z" />-tengelyre <M t="I_z = MR^2" />, tehát <M t="I_z = I_x + I_y" />!)
          </p>
        </Task>

        <Task n={23} q={<>Számítsd ki az <M t="\int_C \frac{1}{x^2+y^2+1}\,ds" /> integrált a <M t="\mathbf{r}(t) = \langle \cos t,\; \sin t,\; t \rangle" /> (<M t="0 \le t \le \pi" />) csavarvonalon, majd az <M t="\int_C \frac{1}{z^2+1}\,ds" /> integrált is!</>}>
          <p>
            Mindkettőnél <M t="ds = \sqrt{2}\,dt" />. Az elsőben <M t="x^2+y^2+1 = 2" />, így{' '}
            <M t="\frac{\sqrt{2}}{2}\pi" />. A másodikban{' '}
            <M t="\sqrt{2}\int_0^\pi \frac{dt}{t^2+1} = \sqrt{2}\arctan(\pi)" />!
          </p>
        </Task>
      </>
    ),
  },
];
