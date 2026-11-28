import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  DerivRulesDiagram,
  HelixCurve3DWidget,
  SphereMotion3DWidget,
  SurfaceIntersection3DWidget,
  VectorCalcMapDiagram,
  VectorIntegralIVPWidget,
  VectorLimitWidget,
  VelocityAccel3DWidget,
} from '../components/Widgets131';
import type { Page } from './s1_1';

export const S13_1: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Térgörbék és vektorfüggvények',
    body: (
      <>
        <Story>
          <p>
            Képzelj el egy drónt, amely egy csigalépcső mentén emelkedik felfelé! Minden <M t="t" /> időpillanatban
            három koordinátája van: <M t="(x(t);\, y(t);\, z(t))" />. Ha ezt a három számot egyetlen{' '}
            <strong>helyvektorba</strong> fogjuk össze, megkapjuk a 13. fejezet főszereplőjét: a{' '}
            <strong>vektor értékű függvényt</strong> (röviden <em>vektorfüggvényt</em>).
          </p>
        </Story>

        <Def title="Vektorfüggvény és térgörbe">
          <p>
            Egy <strong>vektorfüggvény</strong> minden <M t="t \in D \subseteq \mathbb{R}" /> valós számhoz egy
            háromdimenziós (vagy síkbeli) vektort rendel:
          </p>
          <M block t="\mathbf{r}(t) = f(t)\,\mathbf{i} + g(t)\,\mathbf{j} + h(t)\,\mathbf{k} = \langle f(t),\, g(t),\, h(t) \rangle." />
          <p>
            Az <M t="f, g, h" /> skalárfüggvények a <strong>komponensfüggvények</strong>. A vektorfüggvény{' '}
            <strong>értelmezési tartománya</strong> a komponensek értelmezési tartományainak <em>metszete</em>:{' '}
            <M t="D_{\mathbf{r}} = D_f \cap D_g \cap D_h" />. Ahogy <M t="t" /> végigfut <M t="D" />-n, az origóból
            indított <M t="\mathbf{r}(t)" /> helyvektor végpontja kirajzol egy <strong>térgörbét</strong>.
          </p>
        </Def>

        <HelixCurve3DWidget />

        <Task n={1} q={<>Határozd meg az <M t="\mathbf{r}(t) = \langle \ln(t+1),\; \sqrt{4 - t^2},\; \frac{1}{t} \rangle" /> vektorfüggvény értelmezési tartományát!</>}>
          <p>
            Komponensenként: <M t="t+1 > 0 \Rightarrow t > -1" />; <M t="4 - t^2 \ge 0 \Rightarrow -2 \le t \le 2" />;{' '}
            <M t="t \neq 0" />. A három feltétel metszete: <M t="D_{\mathbf{r}} = (-1;\, 0) \cup (0;\, 2]" />.
          </p>
        </Task>

        <Task n={2} q={<>Milyen térgörbét ír le az <M t="\mathbf{r}(t) = (3\cos t)\,\mathbf{i} + (3\sin t)\,\mathbf{j} + 2t\,\mathbf{k}" /> vektorfüggvény?</>}>
          <p>
            Mivel <M t="x^2 + y^2 = 9\cos^2 t + 9\sin^2 t = 9" />, a görbe végig a 3 sugarú{' '}
            <M t="x^2 + y^2 = 9" /> körhenger palástján fut, miközben <M t="z = 2t" /> egyenletesen emelkedik: ez egy{' '}
            <strong>körhengeres csavarvonal (helix)</strong>.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Határérték és folytonosság',
    body: (
      <>
        <p>
          Az analízis nagy ajándéka, hogy a vektorfüggvények határértéke, folytonossága, deriváltja és integrálja is{' '}
          <strong>egyszerűen komponensenként</strong> működik! Ha egy vektor tart egy <M t="\mathbf{L}" /> vektorhoz,
          az pontosan azt jelenti, hogy a három koordinátája külön-külön tart <M t="\mathbf{L}" /> koordinátáihoz.
        </p>

        <Def title="Vektorfüggvény határértéke és folytonossága">
          <p>
            Ha <M t="\mathbf{r}(t) = \langle f(t), g(t), h(t) \rangle" />, akkor
          </p>
          <M block t="\lim_{t \to t_0} \mathbf{r}(t) = \Big\langle \lim_{t \to t_0} f(t),\; \lim_{t \to t_0} g(t),\; \lim_{t \to t_0} h(t) \Big\rangle," />
          <p>
            feltéve, hogy mindhárom komponens-határérték végesen létezik. Az <M t="\mathbf{r}" /> függvény{' '}
            <strong>folytonos</strong> a <M t="t_0" /> pontban, ha <M t="\lim_{t\to t_0}\mathbf{r}(t) = \mathbf{r}(t_0)" />{' '}
            (azaz mindhárom komponense folytonos <M t="t_0" />-ban).
          </p>
        </Def>

        <VectorLimitWidget />

        <Quiz
          q={<>Mennyi a <M t="\lim_{t \to 0} \Big\langle e^t,\; \frac{\sin(3t)}{t},\; \frac{t^2 - 1}{t + 1} \Big\rangle" /> határérték?</>}
          options={[
            { label: <M t="\langle 1,\; 1,\; -1 \rangle" /> },
            { label: <M t="\langle 1,\; 3,\; -1 \rangle" />, ok: true },
            { label: <M t="\langle 0,\; 3,\; 1 \rangle" /> },
            { label: <>Nem létezik a <M t="0/0" /> miatt</> },
          ]}
          explain={
            <>
              Komponensenként: <M t="e^0 = 1" />, <M t="\lim_{t\to 0}\frac{\sin(3t)}{t} = 3" />, és{' '}
              <M t="\frac{0 - 1}{0 + 1} = -1" />. Tehát <M t="\langle 1, 3, -1 \rangle" />.
            </>
          }
        />

        <Task n={3} q={<>Számítsd ki: <M t="\lim_{t \to 1} \Big\langle \frac{t^2 - 1}{t - 1},\; \sqrt{t + 3},\; \ln t \Big\rangle" />!</>}>
          <p>
            Az első komponensben <M t="\frac{(t-1)(t+1)}{t-1} = t + 1 \to 2" />, a másodikban{' '}
            <M t="\sqrt{4} = 2" />, a harmadikban <M t="\ln 1 = 0" />. Az eredmény:{' '}
            <M t="\langle 2,\; 2,\; 0 \rangle" />.
          </p>
        </Task>

        <Task n={4} q={<>Hol folytonos az <M t="\mathbf{r}(t) = \langle \tan t,\; t^2,\; \sqrt{t} \rangle" /> vektorfüggvény?</>}>
          <p>
            A <M t="\sqrt{t}" /> miatt <M t="t \ge 0" />, a <M t="\tan t" /> miatt pedig{' '}
            <M t="t \neq \frac{\pi}{2} + k\pi" /> (<M t="k \in \mathbb{N}" />). Minden más{' '}
            <M t="t \ge 0" /> pontban folytonos.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Deriválás, sebességvektor és érintőegyenes',
    body: (
      <>
        <p>
          Ha egy részecske <M t="\mathbf{r}(t)" /> pályán mozog, akkor <M t="t" /> és <M t="t+\Delta t" /> között az
          elmozdulásvektora <M t="\Delta\mathbf{r} = \mathbf{r}(t+\Delta t) - \mathbf{r}(t)" /> (ez a görbe egy
          húrvektora). Elosztva <M t="\Delta t" />-vel és határátmenetet végezve a húr az <strong>érintőbe</strong>{' '}
          fordul, és megkapjuk a <strong>sebességvektort</strong>!
        </p>

        <Def title="Derivált, sebesség, gyorsulás és sima görbe">
          <M block t="\mathbf{v}(t) = \mathbf{r}'(t) = \lim_{\Delta t \to 0} \frac{\mathbf{r}(t+\Delta t)-\mathbf{r}(t)}{\Delta t} = f'(t)\,\mathbf{i} + g'(t)\,\mathbf{j} + h'(t)\,\mathbf{k}." />
          <ul>
            <li><strong>Sebességvektor:</strong> <M t="\mathbf{v}(t) = \mathbf{r}'(t)" /> (érintő irányú).</li>
            <li><strong>Sebességnagyság (skalár):</strong> <M t="|\mathbf{v}(t)| = \sqrt{(f')^2 + (g')^2 + (h')^2}" />.</li>
            <li><strong>Mozgásirány (egységvektor):</strong> <M t="\mathbf{v}(t) / |\mathbf{v}(t)|" /> (ha <M t="\mathbf{v}\neq\mathbf{0}" />).</li>
            <li><strong>Gyorsulásvektor:</strong> <M t="\mathbf{a}(t) = \mathbf{v}'(t) = \mathbf{r}''(t)" />.</li>
            <li><strong>Érintőegyenes <M t="t_0" />-ban:</strong> <M t="\mathbf{L}(s) = \mathbf{r}(t_0) + s\,\mathbf{r}'(t_0)" />.</li>
          </ul>
        </Def>

        <VelocityAccel3DWidget />

        <Task n={5} q={<>Egy részecske helyvektora <M t="\mathbf{r}(t) = \langle t^2,\; 2t,\; t^3 \rangle" />. Add meg a sebességét, sebességnagyságát és gyorsulását <M t="t = 1" />-nél!</>}>
          <p>
            <M t="\mathbf{v}(t) = \langle 2t,\; 2,\; 3t^2 \rangle" />, tehát{' '}
            <M t="\mathbf{v}(1) = \langle 2,\; 2,\; 3 \rangle" />. A sebességnagyság:{' '}
            <M t="|\mathbf{v}(1)| = \sqrt{4 + 4 + 9} = \sqrt{17}" />. A gyorsulás:{' '}
            <M t="\mathbf{a}(t) = \langle 2,\; 0,\; 6t \rangle \Rightarrow \mathbf{a}(1) = \langle 2,\; 0,\; 6 \rangle" />.
          </p>
        </Task>

        <Task n={6} q={<>Írd fel az <M t="\mathbf{r}(t) = \langle \cos t,\; \sin t,\; t \rangle" /> csavarvonal érintőegyenesének paraméteres egyenletét a <M t="t_0 = \frac{\pi}{2}" /> pontban!</>}>
          <p>
            Pont: <M t="\mathbf{r}(\pi/2) = \langle 0,\; 1,\; \pi/2 \rangle" />. Irányvektor:{' '}
            <M t="\mathbf{r}'(t) = \langle -\sin t,\; \cos t,\; 1 \rangle \Rightarrow \mathbf{r}'(\pi/2) = \langle -1,\; 0,\; 1 \rangle" />.
            Az érintőegyenes: <M t="x = -s,\; y = 1,\; z = \frac{\pi}{2} + s" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Deriválási szabályok vektorfüggvényekre',
    body: (
      <>
        <p>
          Az egyváltozós kalkulus szorzat- és láncszabálya szinte szó szerint átöröklődik vektorfüggvényekre is — egy
          fontos figyelmeztetéssel: a <strong>vektoriális szorzat antikommutatív</strong>, ezért a tényezők sorrendjét
          soha nem szabad felcserélni!
        </p>

        <DerivRulesDiagram />

        <Warn>
          A vektoriális szorzat deriválásakor <strong>szigorúan tartsd meg a sorrendet</strong>:{' '}
          <M t="(\mathbf{u} \times \mathbf{v})' = \mathbf{u}' \times \mathbf{v} + \mathbf{u} \times \mathbf{v}'" />.
          Ha az első tagban felcserélnéd (<M t="\mathbf{v} \times \mathbf{u}'" />), az előjele ellentétes lenne!
        </Warn>

        <Quiz
          q={<>Melyik képlet helyes az <M t="(\mathbf{u}(t) \times \mathbf{v}(t))'" /> deriváltra?</>}
          options={[
            { label: <M t="\mathbf{u}'(t) \times \mathbf{v}'(t)" /> },
            { label: <M t="\mathbf{u}'(t) \times \mathbf{v}(t) + \mathbf{u}(t) \times \mathbf{v}'(t)" />, ok: true },
            { label: <M t="\mathbf{v}(t) \times \mathbf{u}'(t) + \mathbf{u}(t) \times \mathbf{v}'(t)" /> },
            { label: <M t="\mathbf{u}'(t) \cdot \mathbf{v}(t) + \mathbf{u}(t) \cdot \mathbf{v}'(t)" /> },
          ]}
          explain={
            <>
              A szorzatszabály ugyanúgy két tagból áll, és a keresztszorzat nem kommutativitása miatt mindkét tagban{' '}
              <M t="\mathbf{u}" /> marad elöl, <M t="\mathbf{v}" /> hátul.
            </>
          }
        />

        <Task n={7} q={<>Legyen <M t="\mathbf{u}(t) = \langle t,\; t^2,\; 1 \rangle" /> és <M t="\mathbf{v}(t) = \langle 0,\; 1,\; t \rangle" />. Számítsd ki <M t="\frac{d}{dt}(\mathbf{u}(t)\cdot\mathbf{v}(t))" /> értékét a szorzatszabállyal!</>}>
          <p>
            <M t="\mathbf{u}'(t) = \langle 1, 2t, 0 \rangle" />, <M t="\mathbf{v}'(t) = \langle 0, 0, 1 \rangle" />.
            Így <M t="\mathbf{u}'\cdot\mathbf{v} + \mathbf{u}\cdot\mathbf{v}' = (0 + 2t + 0) + (0 + 0 + 1) = 2t + 1" />.
            (Ellenőrzés: <M t="\mathbf{u}\cdot\mathbf{v} = t^2 + t" />, deriváltja valóban <M t="2t + 1" />!)
          </p>
        </Task>

        <Task n={8} q={<>Ha <M t="\mathbf{r}(t) = \langle \sin t,\; \cos t,\; t \rangle" /> és <M t="g(t) = t^2" />, számítsd ki <M t="\frac{d}{dt}[\mathbf{r}(g(t))]" /> értékét a láncszabállyal!</>}>
          <p>
            <M t="\mathbf{r}'(u) = \langle \cos u,\; -\sin u,\; 1 \rangle" /> és <M t="g'(t) = 2t" />, tehát{' '}
            <M t="(\mathbf{r}(t^2))' = 2t\,\langle \cos(t^2),\; -\sin(t^2),\; 1 \rangle = \langle 2t\cos(t^2),\; -2t\sin(t^2),\; 2t \rangle" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Állandó hosszúságú vektorfüggvények',
    body: (
      <>
        <Story>
          <p>
            Egy műhold körpályán kering a Föld körül, vagy egy hangya mászik egy gömb felszínén. A középponttól mért
            távolsága állandó: <M t="|\mathbf{r}(t)| = R" />. Mit mond ez a sebességvektor irányáról? Azt, hogy a
            részecske nem távolodhat és nem közeledhet a középpont felé — tehát a sebességének{' '}
            <strong>minden pillanatban merőlegesnek kell lennie a helyvektorra</strong>!
          </p>
        </Story>

        <Def title="Állandó hosszúság tétele">
          <p>
            Ha egy differenciálható <M t="\mathbf{r}(t)" /> vektorfüggvény hossza állandó (<M t="|\mathbf{r}(t)| = c" />),
            akkor minden <M t="t" />-re:
          </p>
          <M block t="\mathbf{r}(t) \cdot \mathbf{r}'(t) = 0 \qquad \text{(azaz } \mathbf{r}(t) \perp \mathbf{r}'(t)\text{)}." />
          <p>
            <strong>Bizonyítás két sorban:</strong> <M t="\mathbf{r}(t)\cdot\mathbf{r}(t) = |\mathbf{r}(t)|^2 = c^2" />.
            Deriváljuk mindkét oldalt a skalárszorzat szorzatszabályával:{' '}
            <M t="\mathbf{r}'\cdot\mathbf{r} + \mathbf{r}\cdot\mathbf{r}' = 2\,\mathbf{r}\cdot\mathbf{r}' = 0 \Rightarrow \mathbf{r}\cdot\mathbf{r}' = 0" />.
          </p>
        </Def>

        <SphereMotion3DWidget />

        <Task n={9} q={<>Ellenőrizd, hogy az <M t="\mathbf{r}(t) = \langle \sin t,\; \cos t \cos(2t),\; \cos t \sin(2t) \rangle" /> vektorfüggvény hossza állandó, így <M t="\mathbf{r}(t)\perp\mathbf{r}'(t)" />!</>}>
          <p>
            <M t="|\mathbf{r}(t)|^2 = \sin^2 t + \cos^2 t(\cos^2 2t + \sin^2 2t) = \sin^2 t + \cos^2 t = 1" />, tehát{' '}
            <M t="|\mathbf{r}(t)| = 1" /> minden <M t="t" />-re. A tétel alapján deriválás nélkül is biztosan tudjuk,
            hogy <M t="\mathbf{r}(t)\cdot\mathbf{r}'(t) = 0" />!
          </p>
        </Task>

        <Task n={10} q={<>Egy részecske állandó sebességnagysággal mozog (<M t="|\mathbf{v}(t)| = v_0" />). Mit állíthatunk a sebesség- és a gyorsulásvektor szögéről?</>}>
          <p>
            Alkalmazzuk a tételt a <M t="\mathbf{v}(t)" /> vektorfüggvényre! Mivel <M t="|\mathbf{v}(t)| = v_0" />{' '}
            állandó, <M t="\mathbf{v}(t) \cdot \mathbf{v}'(t) = \mathbf{v}(t)\cdot\mathbf{a}(t) = 0" />, tehát a
            gyorsulás mindig <strong>merőleges a sebességre</strong> (csak az irányt fordítja, a tempót nem változtatja!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Vektorfüggvények integrálása és kezdetiérték-problémák',
    body: (
      <>
        <p>
          Ha ismerjük egy űrszonda <M t="\mathbf{a}(t)" /> gyorsulását, hogyan találjuk meg a sebességét és a pályáját?
          Ugyanúgy visszafelé lépünk, mint egyváltozós kalkulusban: <strong>komponensenként integrálunk</strong>!
        </p>

        <Def title="Határozatlan és határozott vektorintegrál">
          <M block t="\int \mathbf{r}(t)\,dt = \Big(\int f(t)\,dt\Big)\mathbf{i} + \Big(\int g(t)\,dt\Big)\mathbf{j} + \Big(\int h(t)\,dt\Big)\mathbf{k} + \mathbf{C}," />
          <M block t="\int_a^b \mathbf{r}(t)\,dt = \Big\langle \int_a^b f(t)\,dt,\; \int_a^b g(t)\,dt,\; \int_a^b h(t)\,dt \Big\rangle." />
          <p>
            Fontos: a határozatlan integrálban szereplő <M t="\mathbf{C} = \langle C_1, C_2, C_3 \rangle" /> egy{' '}
            <strong>állandó vektor</strong> (három skalár állandóval), amelyet a kezdeti feltételek rögzítenek.
          </p>
        </Def>

        <VectorIntegralIVPWidget />

        <Steps
          title="Kezdetiérték-probléma megoldása gyorsulásból"
          problem={
            <>
              Határozd meg a részecske <M t="\mathbf{r}(t)" /> helyvektorát, ha{' '}
              <M t="\mathbf{a}(t) = \langle 0,\; 2,\; 6t \rangle" />, <M t="\mathbf{v}(0) = \langle 1,\; 0,\; -2 \rangle" /> és{' '}
              <M t="\mathbf{r}(0) = \langle 0,\; 3,\; 1 \rangle" />!
            </>
          }
          steps={[
            {
              title: 'Integráljuk a(t)-t a sebességhez',
              body: (
                <>
                  <M t="\mathbf{v}(t) = \int \langle 0, 2, 6t \rangle\,dt = \langle 0,\; 2t,\; 3t^2 \rangle + \mathbf{C}_1" />.
                </>
              ),
            },
            {
              title: 'Határozzuk meg C₁-et v(0)-ból',
              body: (
                <>
                  <M t="\mathbf{v}(0) = \langle 0, 0, 0 \rangle + \mathbf{C}_1 = \langle 1, 0, -2 \rangle" />, tehát{' '}
                  <M t="\mathbf{v}(t) = \langle 1,\; 2t,\; 3t^2 - 2 \rangle" />.
                </>
              ),
            },
            {
              title: 'Integráljuk v(t)-t a helyvektorhoz',
              body: (
                <>
                  <M t="\mathbf{r}(t) = \int \langle 1, 2t, 3t^2 - 2 \rangle\,dt = \langle t,\; t^2,\; t^3 - 2t \rangle + \mathbf{C}_2" />.
                </>
              ),
            },
            {
              title: 'Határozzuk meg C₂-t r(0)-ból',
              body: (
                <>
                  <M t="\mathbf{r}(0) = \mathbf{C}_2 = \langle 0, 3, 1 \rangle" />, így a végeredmény:{' '}
                  <M t="\mathbf{r}(t) = \langle t,\; t^2 + 3,\; t^3 - 2t + 1 \rangle" />.
                </>
              ),
            },
          ]}
        />

        <Task n={11} q={<>Számítsd ki a <M t="\int_0^1 \langle 3t^2,\; e^t,\; \frac{1}{1+t^2} \rangle\,dt" /> határozott vektorintegrált!</>}>
          <p>
            Komponensenként: <M t="[t^3]_0^1 = 1" />, <M t="[e^t]_0^1 = e - 1" />,{' '}
            <M t="[\arctan t]_0^1 = \frac{\pi}{4}" />. Eredmény:{' '}
            <M t="\langle 1,\; e - 1,\; \frac{\pi}{4} \rangle" />.
          </p>
        </Task>

        <Task n={12} q={<>Találd meg <M t="\mathbf{r}(t)" />-t, ha <M t="\mathbf{r}'(t) = \langle \cos t,\; -\sin t,\; 2t \rangle" /> és <M t="\mathbf{r}(0) = \langle 0,\; 2,\; 5 \rangle" />!</>}>
          <p>
            Integrálva: <M t="\mathbf{r}(t) = \langle \sin t,\; \cos t,\; t^2 \rangle + \mathbf{C}" />.{' '}
            <M t="t = 0" />-nál <M t="\langle 0, 1, 0 \rangle + \mathbf{C} = \langle 0, 2, 5 \rangle \Rightarrow \mathbf{C} = \langle 0, 1, 5 \rangle" />.
            Így <M t="\mathbf{r}(t) = \langle \sin t,\; \cos t + 1,\; t^2 + 5 \rangle" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Felületek metszésgörbéi és a simaság feltétele',
    body: (
      <>
        <p>
          A 12.6 fejezetben megismertük a hengereket és a másodrendű felületeket. Amikor két térbeli felület metszi
          egymást, a közös pontjaik egy <strong>térgörbét</strong> alkotnak — amelyet legkényelmesebben
          vektorfüggvénnyel írhatunk le!
        </p>

        <SurfaceIntersection3DWidget />

        <Def title="Sima és szakaszonként sima görbék">
          <p>
            Az <M t="\mathbf{r}(t)" /> görbe <strong>sima</strong> egy intervallumon, ha <M t="\mathbf{r}'(t)" />{' '}
            folytonos és <strong>sehol sem a nullvektor</strong> (<M t="\mathbf{r}'(t) \neq \mathbf{0}" />). Ha egy{' '}
            <M t="t_0" /> pontban <M t="\mathbf{r}'(t_0) = \mathbf{0}" />, ott a mozgó pont pillanatnyilag megáll, és
            éles <em>csúcspont</em> (töréspont) alakulhat ki (például <M t="\mathbf{r}(t) = \langle t^2, t^3 \rangle" />{' '}
            a <M t="t = 0" /> pontban).
          </p>
        </Def>

        <Quiz
          q={<>Ha <M t="\mathbf{r}(t)" /> hossza állandó (<M t="|\mathbf{r}(t)| = 5" />), akkor mennyi <M t="\mathbf{r}(t) \cdot \mathbf{r}'(t)" />?</>}
          options={[
            { label: <M t="25" /> },
            { label: <M t="5" /> },
            { label: <M t="0" />, ok: true },
            { label: <M t="-5" /> },
          ]}
          explain={
            <>
              Az <M t="|\mathbf{r}(t)|^2 = \mathbf{r}\cdot\mathbf{r} = 25" /> egyenletet deriválva{' '}
              <M t="2\,\mathbf{r}\cdot\mathbf{r}' = 0 \Rightarrow \mathbf{r}\cdot\mathbf{r}' = 0" />.
            </>
          }
        />

        <Task n={13} q={<>Paraméterezd az <M t="x^2 + y^2 = 4" /> henger és az <M t="x + y + z = 6" /> sík metszésgörbéjét!</>}>
          <p>
            A hengeren <M t="x = 2\cos t,\; y = 2\sin t" /> (<M t="0 \le t \le 2\pi" />). A sík egyenletéből{' '}
            <M t="z = 6 - x - y = 6 - 2\cos t - 2\sin t" />. Tehát:{' '}
            <M t="\mathbf{r}(t) = \langle 2\cos t,\; 2\sin t,\; 6 - 2\cos t - 2\sin t \rangle" />.
          </p>
        </Task>

        <Task n={14} q={<>Sima-e az <M t="\mathbf{r}(t) = \langle t^3 - 3t,\; t^2 - 2t,\; 4 \rangle" /> görbe minden <M t="t \in \mathbb{R}" />-re?</>}>
          <p>
            <M t="\mathbf{r}'(t) = \langle 3t^2 - 3,\; 2t - 2,\; 0 \rangle" />. A nullvektorhoz egyszerre kell{' '}
            <M t="3(t^2-1) = 0" /> és <M t="2(t-1) = 0" />, ami <M t="t = 1" />-nél teljesül! Tehát{' '}
            <M t="t = 1" />-nél <strong>nem sima</strong> (ott <M t="\mathbf{r}'(1) = \mathbf{0}" />).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Összefoglaló térkép és gyakorlófeladatok',
    body: (
      <>
        <VectorCalcMapDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Add meg az <M t="\mathbf{r}(t) = \langle \sqrt{t - 2},\; \frac{1}{t - 5},\; e^t \rangle" /> vektorfüggvény értelmezési tartományát!</>}>
          <p>
            <M t="t \ge 2" /> és <M t="t \neq 5" />, azaz <M t="[2;\, 5) \cup (5;\, \infty)" />.
          </p>
        </Task>

        <Task n={16} q={<>Számítsd ki <M t="\mathbf{r}'(t)" /> és <M t="\mathbf{r}''(t)" /> képletét, ha <M t="\mathbf{r}(t) = \langle e^{2t},\; \ln t,\; 4t^3 \rangle" />!</>}>
          <p>
            <M t="\mathbf{r}'(t) = \langle 2e^{2t},\; \frac{1}{t},\; 12t^2 \rangle" />,{' '}
            <M t="\mathbf{r}''(t) = \langle 4e^{2t},\; -\frac{1}{t^2},\; 24t \rangle" />.
          </p>
        </Task>

        <Task n={17} q={<>Számítsd ki a <M t="\int_0^{\pi/2} \langle \cos t,\; \sin t,\; 2 \rangle\,dt" /> integrált!</>}>
          <p>
            <M t="\langle [\sin t]_0^{\pi/2},\; [-\cos t]_0^{\pi/2},\; [2t]_0^{\pi/2} \rangle = \langle 1,\; 1,\; \pi \rangle" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Melyik pontban metszi az <M t="\mathbf{r}(t) = \langle t,\; t^2,\; t^3 \rangle" /> görbe érintőegyenese a <M t="t_0 = 1" /> pontban az <M t="xy" />-síkot (<M t="z = 0" />)?</>}>
          <p>
            <M t="\mathbf{r}(1) = \langle 1, 1, 1 \rangle" />, <M t="\mathbf{r}'(1) = \langle 1, 2, 3 \rangle" />.
            Érintőegyenes: <M t="\langle 1+s,\; 1+2s,\; 1+3s \rangle" />. <M t="z = 0 \Rightarrow s = -\frac{1}{3}" />,
            így a döféspont <M t="\big(\frac{2}{3};\; \frac{1}{3};\; 0\big)" />.
          </p>
        </Task>

        <Task n={19} q={<>Két görbe <M t="\mathbf{r}_1(t) = \langle t,\; t^2,\; t^3 \rangle" /> és <M t="\mathbf{r}_2(s) = \langle \sin s,\; \sin(2s),\; s \rangle" /> metszi egymást az origóban. Mekkora a hajlásszögük?</>}>
          <p>
            Az origó <M t="t = 0" /> és <M t="s = 0" />-nál van. Érintővektorok:{' '}
            <M t="\mathbf{r}_1'(0) = \langle 1, 0, 0 \rangle" />,{' '}
            <M t="\mathbf{r}_2'(0) = \langle 1, 2, 1 \rangle" />. Így{' '}
            <M t="\cos\theta = \frac{1}{1 \cdot \sqrt{6}} = \frac{1}{\sqrt{6}} \Rightarrow \theta = \arccos\!\left(\frac{1}{\sqrt{6}}\right) \approx 65{,}9^\circ" />.
          </p>
        </Task>

        <Task n={20} q={<>Oldd meg a kezdetiérték-problémát: <M t="\mathbf{a}(t) = \langle -\cos t,\; -\sin t,\; 0 \rangle" />, <M t="\mathbf{v}(0) = \langle 0,\; 1,\; 2 \rangle" />, <M t="\mathbf{r}(0) = \langle 1,\; 0,\; 0 \rangle" />!</>}>
          <p>
            <M t="\mathbf{v}(t) = \langle -\sin t,\; \cos t,\; 0 \rangle + \mathbf{C}_1" />; <M t="\mathbf{v}(0)" />-ból{' '}
            <M t="\mathbf{C}_1 = \langle 0, 0, 2 \rangle" />, tehát{' '}
            <M t="\mathbf{v}(t) = \langle -\sin t,\; \cos t,\; 2 \rangle" />. Újra integrálva:{' '}
            <M t="\mathbf{r}(t) = \langle \cos t,\; \sin t,\; 2t \rangle + \mathbf{C}_2" />; <M t="\mathbf{r}(0)" />-ból{' '}
            <M t="\mathbf{C}_2 = \mathbf{0}" />, azaz <M t="\mathbf{r}(t) = \langle \cos t,\; \sin t,\; 2t \rangle" /> (egy
            csavarvonal!).
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Paraméterezd a <M t="z = x^2 + y^2" /> paraboloid és a <M t="z = 2y" /> sík metszésgörbéjét!</>}>
          <p>
            Egyenlővé téve: <M t="x^2 + y^2 = 2y \Rightarrow x^2 + (y - 1)^2 = 1" />. Ez egy 1 sugarú kör a{' '}
            <M t="(0;\, 1)" /> középpont körül: <M t="x = \cos t,\; y = 1 + \sin t" />, és{' '}
            <M t="z = 2y = 2 + 2\sin t" />. Tehát{' '}
            <M t="\mathbf{r}(t) = \langle \cos t,\; 1 + \sin t,\; 2 + 2\sin t \rangle" /> (<M t="0 \le t \le 2\pi" />).
          </p>
        </Task>

        <Task n={22} q={<>Bizonyítsd be, hogy ha egy részecske impulzusmomentuma <M t="\mathbf{L}(t) = \mathbf{r}(t) \times m\mathbf{v}(t)" />, akkor <M t="\mathbf{L}'(t) = \mathbf{r}(t) \times m\mathbf{a}(t)" /> (a forgatónyomaték)!</>}>
          <p>
            A vektoriális szorzat deriválási szabályával:{' '}
            <M t="\mathbf{L}'(t) = \mathbf{r}'(t) \times m\mathbf{v}(t) + \mathbf{r}(t) \times m\mathbf{v}'(t) = m(\mathbf{v}\times\mathbf{v}) + \mathbf{r}\times m\mathbf{a}" />.
            Mivel bármely vektor önmagával vett vektoriális szorzata <M t="\mathbf{v}\times\mathbf{v} = \mathbf{0}" />,
            marad <M t="\mathbf{L}'(t) = \mathbf{r}(t) \times m\mathbf{a}(t)" />! (Ha az erő centrális, azaz{' '}
            <M t="\mathbf{a} \parallel \mathbf{r}" />, akkor <M t="\mathbf{L}" /> állandó — ez a 13.6 fejezet Kepler-törvényének
            kulcsa!)
          </p>
        </Task>

        <Task n={23} q={<>Egy <M t="\mathbf{r}(t)" /> görbére teljesül, hogy <M t="\mathbf{r}(t) \cdot \mathbf{r}'(t) = 0" /> minden <M t="t" />-re, és <M t="\mathbf{r}(0) = \langle 2,\; -1,\; 2 \rangle" />. Milyen felületen fekszik a teljes görbe?</>}>
          <p>
            Mivel <M t="\frac{d}{dt}|\mathbf{r}(t)|^2 = 2\,\mathbf{r}(t)\cdot\mathbf{r}'(t) = 0" />, a{' '}
            <M t="|\mathbf{r}(t)|^2" /> állandó! Értékét <M t="t = 0" />-nál kapjuk:{' '}
            <M t="|\mathbf{r}(0)|^2 = 2^2 + (-1)^2 + 2^2 = 9" />. Tehát a teljes görbe az origó középpontú,{' '}
            <strong>3 sugarú gömbön</strong> (<M t="x^2 + y^2 + z^2 = 9" />) fekszik!
          </p>
        </Task>

        <h3>Kiegészítő mintapélda</h3>
        <Steps
          title="Sebességnagyság és v · a kiszámítása térgörbén"
          source="Analízis-labor"
          problem={
            <>
              Egy részecske pályája <M t="\mathbf{r}(t) = (2\cos t)\,\mathbf{i} + (2\sin t)\,\mathbf{j} + t^2\,\mathbf{k}" />.
              Határozzuk meg a sebessége nagyságát és a <M t="\mathbf{v}\cdot\mathbf{a}" /> skalárszorzat értékét{' '}
              <M t="t = 1" />-nél!
            </>
          }
          steps={[
            {
              title: 'Deriválás (sebesség és gyorsulás)',
              body: (
                <p>
                  <M t="\mathbf{v}(t) = \langle -2\sin t,\; 2\cos t,\; 2t \rangle" />,{' '}
                  <M t="\mathbf{a}(t) = \langle -2\cos t,\; -2\sin t,\; 2 \rangle" />.
                </p>
              ),
            },
            {
              title: 'Sebességnagyság kiszámítása',
              body: (
                <p>
                  <M t="|\mathbf{v}(t)| = \sqrt{4\sin^2 t + 4\cos^2 t + 4t^2} = 2\sqrt{1 + t^2}" />, így{' '}
                  <M t="|\mathbf{v}(1)| = \mathbf{2\sqrt{2}}" />.
                </p>
              ),
            },
            {
              title: 'Skalárszorzat kiszámítása',
              body: (
                <p>
                  <M t="\mathbf{v}\cdot\mathbf{a} = 4\sin t\cos t - 4\cos t\sin t + 4t = 4t" />, tehát{' '}
                  <M t="t = 1" />-nél <M t="\mathbf{v}(1)\cdot\mathbf{a}(1) = \mathbf{4}" />.
                </p>
              ),
            },
          ]}
        />
      </>
    ),
  },
];
