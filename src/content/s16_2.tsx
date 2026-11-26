import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  CirculationVortexWidget,
  CircVsFluxDualWidget,
  FluxAcrossCircleWidget,
  PathDependenceWorkWidget,
  VectorFieldGalleryWidget,
  VectorFieldMasterMapDiagram,
  Work3DHelixWidget,
  WorkAlongCurveWidget,
} from '../components/Widgets162';
import type { Page } from './s1_1';

export const S16_2: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Vektormezők: erőterek, áramlások és gradiensmezők',
    body: (
      <>
        <Story>
          <p>
            Az időjárás-térképen minden városhoz tartozik egy szélsebesség-nyíl; a Naprendszer minden pontjában hat egy
            gravitációs erővektor; egy folyó minden pontjában van egy áramlási vektor. Mindezek{' '}
            <strong>vektormezők</strong> — a fizika és a mérnöki tudományok alapnyelve!
          </p>
        </Story>

        <Def title="Vektormező és gradiensmező">
          <p>
            Egy 3D <strong>vektormező</strong> a tér minden <M t="(x, y, z)" /> pontjához egy vektort rendel:
          </p>
          <M block t="\mathbf{F}(x, y, z) = M(x, y, z)\,\mathbf{i} + N(x, y, z)\,\mathbf{j} + P(x, y, z)\,\mathbf{k}." />
          <p>
            Kiemelt szerepű a <strong>gradiensmező</strong>: bármely differenciálható <M t="f(x, y, z)" />{' '}
            skalárfüggvény gradiense (<M t="\mathbf{F} = \nabla f = \langle f_x, f_y, f_z \rangle" />) egy vektormezőt
            definiál (amely mindig a leggyorsabb emelkedés irányába mutat!).
          </p>
        </Def>

        <VectorFieldGalleryWidget />

        <Task n={1} q={<>Határozd meg az <M t="f(x, y, z) = x^2 y - yz^3" /> függvény <M t="\nabla f" /> gradiensmezőjét!</>}>
          <p>
            <M t="\nabla f(x, y, z) = \langle 2xy,\; x^2 - z^3,\; -3yz^2 \rangle" />.
          </p>
        </Task>

        <Task n={2} q={<>Mutasd meg, hogy az <M t="\mathbf{F}(x, y) = \langle -y,\; x \rangle" /> örvénymező minden pontban merőleges a helyvektorra, és nagysága <M t="r = \sqrt{x^2+y^2}" />!</>}>
          <p>
            <M t="\mathbf{F}\cdot\mathbf{r} = (-y)x + x(y) = 0" />, tehát merőleges a sugárra (érintőirányú,
            óramutatóval ellentétes!). Hossza: <M t="\sqrt{(-y)^2 + x^2} = r" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Változó erő munkája görbe mentén (W = ∫ F · dr)',
    body: (
      <>
        <p>
          A 12.3 fejezetben állandó erő munkája <M t="W = \mathbf{F}\cdot\mathbf{D}" /> volt. Ha az{' '}
          <M t="\mathbf{F}" /> erő pontról pontra változik, és a test egy <M t="C" /> görbe mentén mozog, akkor
          minden kis <M t="ds" /> ívdarabon csak az érintőirányú <M t="\mathbf{F}\cdot\mathbf{T}" /> komponens végez
          munkát!
        </p>

        <Def title="Vektoros vonalintegrál (munka)">
          <M block t="W = \int_C \mathbf{F}\cdot\mathbf{T}\,ds = \int_C \mathbf{F}\cdot d\mathbf{r} = \int_a^b \mathbf{F}\big(\mathbf{r}(t)\big)\cdot \mathbf{r}'(t)\,dt." />
          <p>
            <strong>Csodás egyszerűsítés:</strong> mivel <M t="\mathbf{T}\,ds = \frac{\mathbf{r}'(t)}{|\mathbf{r}'(t)|}\,|\mathbf{r}'(t)|\,dt = \mathbf{r}'(t)\,dt" />,
            a munka-integrálban <strong>nincs négyzetgyök</strong>!
          </p>
        </Def>

        <WorkAlongCurveWidget />

        <Quiz
          q={<>Ha a <M t="C" /> görbét megfordítjuk (<M t="-C" />), hogyan változik a <M t="W = \int_C \mathbf{F}\cdot d\mathbf{r}" /> munka?</>}
          options={[
            { label: <>Változatlan marad</> },
            { label: <>Előjelet vált: <M t="\int_{-C}\mathbf{F}\cdot d\mathbf{r} = -\int_C \mathbf{F}\cdot d\mathbf{r}" /></>, ok: true },
            { label: <>Mindig nullává válik</> },
            { label: <>Megduplázódik</> },
          ]}
          explain={
            <>
              Fordított irányban <M t="\mathbf{T}" /> helyére <M t="-\mathbf{T}" /> lép, így a munka előjele
              megfordul (hátszélből szembeszél lesz)!
            </>
          }
        />

        <Task n={3} q={<>Számítsd ki az <M t="\mathbf{F}(x, y) = \langle y,\; x \rangle" /> erőtér munkáját az <M t="\mathbf{r}(t) = \langle t,\; t^2 \rangle" /> (<M t="0 \le t \le 1" />) parabolaíven!</>}>
          <p>
            <M t="\mathbf{F}(\mathbf{r}(t)) = \langle t^2, t \rangle" />,{' '}
            <M t="\mathbf{r}'(t) = \langle 1, 2t \rangle" />. Skalárszorzatuk <M t="t^2 + 2t^2 = 3t^2" />. Így{' '}
            <M t="W = \int_0^1 3t^2\,dt = 1" />.
          </p>
        </Task>

        <Task n={4} q={<>Mekkora munkát végez az <M t="\mathbf{F}(x, y) = \langle -y,\; x \rangle" /> örvénymező az egységkörön (<M t="\mathbf{r}(t) = \langle \cos t, \sin t \rangle,\; 0 \le t \le 2\pi" />)?</>}>
          <p>
            <M t="\mathbf{F} = \langle -\sin t, \cos t \rangle" />, <M t="\mathbf{r}' = \langle -\sin t, \cos t \rangle" />,
            skalárszorzatuk <M t="\sin^2 t + \cos^2 t = 1" />. Így <M t="W = \int_0^{2\pi} 1\,dt = 2\pi" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Differenciálforma (∫ M dx + N dy + P dz) és útfüggés',
    body: (
      <>
        <p>
          Mivel <M t="d\mathbf{r} = \langle dx, dy, dz \rangle" />, a vektoros vonalintegrált gyakran{' '}
          <strong>differenciálformaként</strong> írjuk:
        </p>
        <M block t="\int_C \mathbf{F}\cdot d\mathbf{r} = \int_C M\,dx + N\,dy + P\,dz." />

        <PathDependenceWorkWidget />

        <Steps
          title="Útfüggés igazolása két különböző útvonalon"
          problem={
            <>
              Számítsd ki az <M t="\int_C (y\,dx + 2x\,dy)" /> integrált <M t="(0; 0)" />-ból <M t="(1; 1)" />-be
              (a) az <M t="y = x" /> egyenes, (b) az <M t="y = x^2" /> parabola mentén!
            </>
          }
          steps={[
            {
              title: '(a) Egyenes út: x = t, y = t (0 ≤ t ≤ 1)',
              body: (
                <>
                  <M t="dx = dt,\; dy = dt" />. Behelyettesítve:{' '}
                  <M t="\int_0^1 (t + 2t)\,dt = \int_0^1 3t\,dt = \frac{3}{2} = 1{,}5" />.
                </>
              ),
            },
            {
              title: '(b) Parabola út: x = t, y = t² (0 ≤ t ≤ 1)',
              body: (
                <>
                  <M t="dx = dt,\; dy = 2t\,dt" />. Behelyettesítve:{' '}
                  <M t="\int_0^1 (t^2 + 2t\cdot 2t)\,dt = \int_0^1 5t^2\,dt = \frac{5}{3} \approx 1{,}67" />.
                </>
              ),
            },
            {
              title: 'Következtetés',
              body: (
                <>
                  Mivel <M t="\frac{3}{2} \neq \frac{5}{3}" />, az <M t="\mathbf{F} = \langle y, 2x \rangle" /> mező{' '}
                  <strong>nem útfüggetlen</strong> (nem konzervatív — erre térünk rá a 16.3 fejezetben!).
                </>
              ),
            },
          ]}
        />

        <Task n={5} q={<>Számítsd ki az <M t="\int_C (x\,dx + y\,dy + z\,dz)" /> integrált a <M t="(0;0;0) \to (1;2;2)" /> egyenes szakaszon!</>}>
          <p>
            <M t="\mathbf{r}(t) = \langle t, 2t, 2t \rangle" /> (<M t="0\le t\le 1" />):{' '}
            <M t="\int_0^1 (t + 4t + 4t)\,dt = \int_0^1 9t\,dt = \frac{9}{2}" />.
          </p>
        </Task>

        <Task n={6} q={<>Mennyi a 3. feladat munkája (<M t="W = 1" />), ha ugyanazt a parabolaívet <M t="(1;1)" />-ből <M t="(0;0)" /> felé járjuk be?</>}>
          <p>
            Előjelet vált: <M t="W_{-C} = -1" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Cirkuláció (keringés) zárt görbe mentén',
    body: (
      <>
        <p>
          Ha <M t="\mathbf{F}" /> egy folyadék sebességmezője, és <M t="C" /> egy egyszerű, zárt, pozitív irányítású
          (óramutatóval ellentétes) hurok, akkor a zárt görbe menti érintőleges vonalintegrált{' '}
          <strong>cirkulációnak (keringésnek)</strong> nevezzük! Azt méri, mennyire „örvénylik” az áramlás a hurok
          mentén.
        </p>

        <Def title="Cirkuláció zárt görbe mentén">
          <M block t="\text{Cirkuláció} = \oint_C \mathbf{F}\cdot\mathbf{T}\,ds = \oint_C \mathbf{F}\cdot d\mathbf{r} = \oint_C M\,dx + N\,dy." />
        </Def>

        <CirculationVortexWidget />

        <Task n={7} q={<>Számítsd ki az <M t="\mathbf{F}(x, y) = \langle x,\; y \rangle" /> radiális mező cirkulációját az <M t="x^2 + y^2 = R^2" /> körön!</>}>
          <p>
            <M t="\mathbf{r}(t) = \langle R\cos t, R\sin t \rangle" />,{' '}
            <M t="\mathbf{F}\cdot\mathbf{r}' = -R^2\cos t\sin t + R^2\sin t\cos t = 0" />. Tehát a cirkuláció{' '}
            <M t="0" />!
          </p>
        </Task>

        <Task n={8} q={<>Mennyi az <M t="\mathbf{F}(x, y) = \langle y,\; 0 \rangle" /> nyíró áramlás cirkulációja az egységkörön (CCW)?</>}>
          <p>
            <M t="\oint y\,dx = \int_0^{2\pi} (\sin t)(-\sin t)\,dt = -\int_0^{2\pi}\sin^2 t\,dt = -\pi" /> (a negatív
            előjel azt jelzi, hogy a nyíró áramlás az óramutató járásával megegyező forgást kelt!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Áramlás (fluxus) zárt síkgörbén keresztül',
    body: (
      <>
        <p>
          Most tegyünk fel egy másik fizikai kérdést: mennyi folyadék <em>lép ki</em> időegység alatt a zárt{' '}
          <M t="C" /> görbén <strong>keresztül</strong>? Ehhez nem az érintővel (<M t="\mathbf{T}" />), hanem a{' '}
          <strong>kifelé mutató egységnormálissal</strong> (<M t="\mathbf{n} = \mathbf{T}\times\mathbf{k}" />)
          skalárszorozzuk <M t="\mathbf{F}" />-et!
        </p>

        <Def title="Síkbeli fluxus (kiáramlás) zárt görbén át">
          <p>
            Pozitív (CCW) irányítású zárt <M t="C" /> síkgörbén <M t="\mathbf{n}\,ds = \langle dy,\; -dx \rangle" />,
            így a kifelé irányuló <strong>fluxus</strong>:
          </p>
          <M block t="\text{Fluxus} = \oint_C \mathbf{F}\cdot\mathbf{n}\,ds = \oint_C M\,dy - N\,dx." />
        </Def>

        <FluxAcrossCircleWidget />

        <Quiz
          q={<>Melyik differenciálforma adja meg az <M t="\mathbf{F} = \langle M, N \rangle" /> mező kifelé irányuló <em>fluxusát</em> egy CCW zárt <M t="C" /> síkgörbén át?</>}
          options={[
            { label: <M t="\oint_C (M\,dx + N\,dy)" /> },
            { label: <M t="\oint_C (M\,dy - N\,dx)" />, ok: true },
            { label: <M t="\oint_C (M\,dx - N\,dy)" /> },
            { label: <M t="\oint_C (N\,dy + M\,dx)" /> },
          ]}
          explain={
            <>
              <M t="\mathbf{n}\,ds = \langle dy, -dx \rangle" />, így{' '}
              <M t="\mathbf{F}\cdot\mathbf{n}\,ds = M\,dy - N\,dx" />! (A <M t="M\,dx + N\,dy" /> a cirkuláció!)
            </>
          }
        />

        <Task n={9} q={<>Számítsd ki az <M t="\mathbf{F} = \langle x,\; y \rangle" /> forrásmező fluxusát az <M t="x^2 + y^2 = R^2" /> körön át!</>}>
          <p>
            <M t="\oint (x\,dy - y\,dx) = \int_0^{2\pi} (R^2\cos^2 t + R^2\sin^2 t)\,dt = 2\pi R^2" />.
          </p>
        </Task>

        <Task n={10} q={<>Mennyi az <M t="\mathbf{F} = \langle x^2,\; y \rangle" /> mező fluxusa az egységkörön keresztül?</>}>
          <p>
            <M t="\int_0^{2\pi} (\cos^3 t + \sin^2 t)\,dt = 0 + \pi = \pi" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Cirkuláció vs. Fluxus: két arc, egyetlen áramlás',
    body: (
      <>
        <p>
          Egy valós áramlásban (pl. egy lefolyó örvényében) egyszerre van jelen befelé/kifelé áramlás (fluxus) és
          körbeforgás (cirkuláció). A 16.4 fejezet <strong>Green-tétele</strong> ezt a két mennyiséget fogja
          kettős integrálra visszavezetni!
        </p>

        <CircVsFluxDualWidget />

        <Task n={11} q={<>Számítsd ki az <M t="\mathbf{F} = \langle x - y,\; x + y \rangle" /> mező cirkulációját ÉS fluxusát is az egységkörön!</>}>
          <p>
            Mivel <M t="\mathbf{F} = 1\cdot\langle x, y \rangle + 1\cdot\langle -y, x \rangle" />, linearitással
            azonnal: <strong>Cirkuláció <M t="= 2\pi" /></strong> és <strong>Fluxus <M t="= 2\pi" /></strong>!
          </p>
        </Task>

        <Task n={12} q={<>Mekkora az <M t="\mathbf{F} = \langle 2,\; 0 \rangle" /> állandó áramlás fluxusa a <M t="[0, 1]\times[0, 1]" /> egységnégyzet kerületén át?</>}>
          <p>
            A bal oldalon <M t="2" /> lép be (<M t="-2" />), a jobb oldalon <M t="2" /> lép ki (<M t="+2" />), alul és
            felül párhuzamos a fallal (<M t="0" />). Összesen: <M t="-2 + 2 = 0" /> (ami befolyik, ki is folyik!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Háromdimenziós munka-integrálok',
    body: (
      <>
        <p>
          Három dimenzióban a munka kiszámítása pontosan ugyanolyan egyszerű: paraméterezzük a térgörbét{' '}
          <M t="\mathbf{r}(t) = \langle x(t), y(t), z(t) \rangle" />-vel, és integráljuk a{' '}
          <M t="\mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}'(t)" /> skalárszorzatot!
        </p>

        <Work3DHelixWidget />

        <Quiz
          q={<>Mekkora munkát végez az állandó <M t="\mathbf{F} = \langle 1,\; 2,\; 3 \rangle" /> erő, miközben egy testet <M t="(0;0;0)" />-ból <M t="(2;1;4)" />-be mozgat bármely görbe mentén?</>}
          options={[
            { label: <M t="12" /> },
            { label: <M t="14" /> },
            { label: <M t="16" />, ok: true },
            { label: <>Nem dönthető el a görbe ismerete nélkül</> },
          ]}
          explain={
            <>
              Állandó erőnél <M t="W = \mathbf{F}\cdot(\mathbf{r}_B - \mathbf{r}_A) = 1\cdot 2 + 2\cdot 1 + 3\cdot 4 = 16" />{' '}
              — független a görbétől!
            </>
          }
        />

        <Task n={13} q={<>Számítsd ki az <M t="\mathbf{F} = \langle z,\; x,\; y \rangle" /> erőtér munkáját az <M t="\mathbf{r}(t) = \langle t,\; t^2,\; t^3 \rangle" /> (<M t="0 \le t \le 1" />) térgörbén!</>}>
          <p>
            <M t="\mathbf{F}\cdot\mathbf{r}' = t^3(1) + t(2t) + t^2(3t^2) = 2t^2 + t^3 + 3t^4" />. Integrálva:{' '}
            <M t="\frac{2}{3} + \frac{1}{4} + \frac{3}{5} = \frac{91}{60}" />.
          </p>
        </Task>

        <Task n={14} q={<>Miért végez mindig pontosan 0 munkát a mágneses Lorentz-erő (<M t="\mathbf{F} = q\,\mathbf{v}\times\mathbf{B}" />) egy mozgó töltött részecskén?</>}>
          <p>
            Mert <M t="\mathbf{v}\times\mathbf{B}" /> minden pillanatban <strong>merőleges</strong>{' '}
            <M t="\mathbf{v}" />-re, így <M t="\mathbf{F}\cdot\mathbf{v} = 0 \Rightarrow W = \int \mathbf{F}\cdot\mathbf{v}\,dt = 0" />!
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
        <VectorFieldMasterMapDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Add meg az <M t="f(x, y) = e^x\sin y" /> függvény <M t="\nabla f" /> gradiensmezőjét!</>}>
          <p>
            <M t="\nabla f = \langle e^x\sin y,\; e^x\cos y \rangle" />.
          </p>
        </Task>

        <Task n={16} q={<>Számítsd ki az <M t="\int_C (2\,dx + 3\,dy)" /> integrált <M t="(0;0)" />-ból <M t="(4;5)" />-be az egyenes szakaszon!</>}>
          <p>
            <M t="\langle 2, 3 \rangle \cdot \langle 4, 5 \rangle = 8 + 15 = 23" />.
          </p>
        </Task>

        <Task n={17} q={<>Mennyi az <M t="\mathbf{F} = \langle -2y,\; 2x \rangle" /> mező cirkulációja és fluxusa a 3 sugarú körön?</>}>
          <p>
            Cirkuláció: <M t="2 \cdot 2\pi(9) = 36\pi" />. Fluxus: <M t="0" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Számítsd ki az <M t="\int_C (xy\,dx + y^2\,dy)" /> integrált az <M t="\mathbf{r}(t) = \langle t,\; 2t \rangle" /> (<M t="0 \le t \le 1" />) szakaszon!</>}>
          <p>
            <M t="xy\,dx + y^2\,dy = (2t^2)(dt) + (4t^2)(2\,dt) = 10t^2\,dt \Rightarrow \int_0^1 10t^2\,dt = \frac{10}{3}" />.
          </p>
        </Task>

        <Task n={19} q={<>Határozd meg az <M t="\mathbf{F} = \langle 3x,\; y \rangle" /> mező fluxusát a 2 sugarú körön át!</>}>
          <p>
            <M t="\int_0^{2\pi} (3\cdot 2\cos t \cdot 2\cos t - 2\sin t \cdot (-2\sin t))\,dt = \int_0^{2\pi} (12\cos^2 t + 4\sin^2 t)\,dt = 12\pi + 4\pi = 16\pi" />.
          </p>
        </Task>

        <Task n={20} q={<>Számítsd ki az <M t="\mathbf{F} = \langle y,\; z,\; x \rangle" /> erőtér munkáját az <M t="\mathbf{r}(t) = \langle \cos t,\; \sin t,\; t \rangle" /> (<M t="0 \le t \le 2\pi" />) csavarvonalon!</>}>
          <p>
            <M t="\mathbf{F}\cdot\mathbf{r}' = -\sin^2 t + t\cos t + \cos t" />. Integrálva <M t="[0, 2\pi]" />-n:{' '}
            <M t="-\pi + 0 + 0 = -\pi" />! (Mivel <M t="\int_0^{2\pi} t\cos t\,dt = [t\sin t + \cos t]_0^{2\pi} = 0" />.)
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Számítsd ki az <M t="\mathbf{F}(x, y) = \Big\langle \frac{-y}{x^2+y^2},\; \frac{x}{x^2+y^2} \Big\rangle" /> mező cirkulációját az origó körüli <M t="R" /> sugarú körön! Függ-e az <M t="R" /> sugártól?</>}>
          <p>
            <M t="\mathbf{r}(t) = \langle R\cos t, R\sin t \rangle" />: <M t="\frac{R^2\sin^2 t + R^2\cos^2 t}{R^2} = 1" />.
            Így a cirkuláció <M t="\int_0^{2\pi} 1\,dt = 2\pi" /> — <strong>teljesen független <M t="R" />-től</strong>!
            (Híres pontszerű örvény: a 16.3–16.4 fejezet kulcspéldája!)
          </p>
        </Task>

        <Task n={22} q={<>Számítsd ki az <M t="\mathbf{F}(x, y) = \Big\langle \frac{x}{x^2+y^2},\; \frac{y}{x^2+y^2} \Big\rangle" /> pontforrás fluxusát bármely origó körüli <M t="R" /> sugarú körön át!</>}>
          <p>
            <M t="M\,dy - N\,dx = \frac{R^2\cos^2 t + R^2\sin^2 t}{R^2}\,dt = dt \Rightarrow \text{Fluxus} = 2\pi" />{' '}
            — független <M t="R" />-től (2D Gauss-törvény előképe!).
          </p>
        </Task>

        <Task n={23} q={<>Igazold, hogy ha <M t="C" /> egy zárt síkgörbe, akkor az <M t="\mathbf{F}(x, y) = \langle -y,\; x \rangle" /> mező cirkulációjának fele (<M t="\frac{1}{2}\oint_C (x\,dy - y\,dx)" />) az egységkörön pontosan a kör területét (<M t="\pi" />) adja!</>}>
          <p>
            A 4. feladatból <M t="\oint (-y\,dx + x\,dy) = 2\pi" />, ennek fele pontosan <M t="\pi" />! (A 16.4
            fejezetben Green tételével belátjuk, hogy ez <em>minden</em> egyszerű zárt síkgörbére igaz!)
          </p>
        </Task>
      </>
    ),
  },
];
