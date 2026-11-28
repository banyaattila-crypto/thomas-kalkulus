import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  GreenAreaPlanimeterWidget,
  GreenGridCancellationWidget,
  GreenHoleBridgeWidget,
  GreenMasterMapDiagram,
  GreenProofTypeIWidget,
  GreenShortcutDemoWidget,
  GreenTwoFormsCompareWidget,
  PaddlewheelDivCurlWidget,
} from '../components/Widgets164';
import type { Page } from './s1_1';

export const S16_4: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: '2D divergencia és 2D rotáció: a helyi forrás és örvényesség',
    body: (
      <>
        <Story>
          <p>
            Képzelj el egy tavat, amelyben egy zárt bójákból álló kötél kerít el egy <M t="R" /> területet. Honnan
            tudhatjuk meg, mennyi víz áramlik ki a kötél alatt (<em>fluxus</em>), vagy mennyire forog a víz a kötél
            mentén (<em>cirkuláció</em>)? George Green zseniális felismerése szerint elég összeadni a belsejében lévő
            apró forrásokat (<strong>divergencia</strong>) vagy apró örvényeket (<strong>rotáció</strong>)!
          </p>
        </Story>

        <Def title="2D divergencia és 2D skaláris rotáció">
          <p>Egy differenciálható <M t="\mathbf{F}(x, y) = \langle M(x, y),\; N(x, y) \rangle" /> síkbeli vektormezőre:</p>
          <ul>
            <li>
              <strong>Divergencia (fluxussűrűség):</strong> <M t="\operatorname{div}\mathbf{F} = \dfrac{\partial M}{\partial x} + \dfrac{\partial N}{\partial y}" />{' '}
              (pozitív = helyi forrás, negatív = nyelő).
            </li>
            <li>
              <strong>2D skaláris rotáció (cirkulációsűrűség):</strong>{' '}
              <M t="(\operatorname{rot}\mathbf{F})\cdot\mathbf{k} = \dfrac{\partial N}{\partial x} - \dfrac{\partial M}{\partial y}" />{' '}
              (pozitív = óramutatóval ellentétes forgás).
            </li>
          </ul>
        </Def>

        <PaddlewheelDivCurlWidget />

        <Task n={1} q={<>Számítsd ki az <M t="\mathbf{F}(x, y) = \langle x^2 y,\; xy^2 \rangle" /> mező divergenciáját és 2D rotációját!</>}>
          <p>
            <M t="\operatorname{div}\mathbf{F} = 2xy + 2xy = 4xy" />;{' '}
            <M t="\frac{\partial N}{\partial x} - \frac{\partial M}{\partial y} = y^2 - x^2" />.
          </p>
        </Task>

        <Task n={2} q={<>Miért nulla minden konzervatív síkbeli vektormező 2D rotációja?</>}>
          <p>
            Mert <M t="M = f_x,\; N = f_y" />, így Clairaut tétele alapján{' '}
            <M t="N_x - M_y = f_{yx} - f_{xy} = 0" /> — egy konzervatív mező sehol sem örvénylik!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Green-tétel cirkulációs (tangenciális) alakja',
    body: (
      <>
        <p>
          Most jön a többváltozós analízis első nagy „perem–belseje” tétele, amely egy zárt görbe menti{' '}
          <strong>vonalintegrált</strong> egyetlen <strong>kettős integrállá</strong> alakít!
        </p>

        <Def title="Green-tétel (cirkulációs / tangenciális alak)">
          <p>
            Legyen <M t="C" /> egyszerű, zárt, szakaszonként sima, <strong>pozitív irányítású (CCW)</strong> görbe a
            síkban, amely a zárt <M t="R" /> tartományt határolja. Ha <M t="M, N" /> folytonosan differenciálhatók egy{' '}
            <M t="R" />-t tartalmazó nyílt halmazon, akkor:
          </p>
          <M block t="\oint_C \mathbf{F}\cdot d\mathbf{r} = \oint_C (M\,dx + N\,dy) = \iint_R \left(\frac{\partial N}{\partial x} - \frac{\partial M}{\partial y}\right) dA." />
        </Def>

        <GreenGridCancellationWidget />

        <Quiz
          q={<>Ha <M t="C" /> a pozitív (CCW) irányítású egységkör, mennyi az <M t="\oint_C (-y\,dx + 2x\,dy)" /> integrál Green-tétellel?</>}
          options={[
            { label: <M t="\pi" /> },
            { label: <M t="2\pi" /> },
            { label: <M t="3\pi" />, ok: true },
            { label: <M t="-3\pi" /> },
          ]}
          explain={
            <>
              <M t="N_x - M_y = 2 - (-1) = 3" />, így <M t="\iint_{x^2+y^2\le 1} 3\,dA = 3 \cdot \pi = 3\pi" />!
            </>
          }
        />

        <Task n={3} q={<>Számítsd ki Green-tétellel az <M t="\oint_C (y^2\,dx + 3xy\,dy)" /> integrált a <M t="[0, 1]\times[0, 1]" /> egységnégyzet CCW kerületén!</>}>
          <p>
            <M t="N_x - M_y = 3y - 2y = y" />. Így <M t="\int_0^1 \int_0^1 y\,dy\,dx = \frac{1}{2}" /> (4 szakasz
            helyett egyetlen sor!).
          </p>
        </Task>

        <Task n={4} q={<>Értékeld ki Green-tétellel: <M t="\oint_C (xy\,dx + x^2\,dy)" />, ahol <M t="C" /> a <M t="(0;0), (1;0), (1;2)" /> csúcsú háromszög CCW kerülete!</>}>
          <p>
            <M t="N_x - M_y = 2x - x = x" />. A háromszög <M t="0 \le x \le 1,\; 0 \le y \le 2x" />:{' '}
            <M t="\int_0^1 \int_0^{2x} x\,dy\,dx = \int_0^1 2x^2\,dx = \frac{2}{3}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Green-tétel fluxus- (normális) alakja',
    body: (
      <>
        <p>
          Green tételének van egy ikertestvére is, amely a zárt <M t="C" /> görbén kifelé irányuló{' '}
          <strong>fluxust</strong> köti össze a tartományon belüli <strong>divergencia</strong> kettős integráljával!
        </p>

        <Def title="Green-tétel (fluxus- / divergencia-alak)">
          <M block t="\oint_C \mathbf{F}\cdot\mathbf{n}\,ds = \oint_C (M\,dy - N\,dx) = \iint_R \left(\frac{\partial M}{\partial x} + \frac{\partial N}{\partial y}\right) dA." />
          <p>
            <strong>Előretekintés:</strong> a cirkulációs alak 3D általánosítása a <strong>Stokes-tétel (16.7)</strong>,
            a fluxus-alak 3D általánosítása pedig a <strong>Gauss–Osztrogradszkij-tétel (16.8)</strong>!
          </p>
        </Def>

        <GreenTwoFormsCompareWidget />

        <Task n={5} q={<>Számítsd ki az <M t="\mathbf{F}(x, y) = \langle x^3,\; y^3 \rangle" /> mező kifelé irányuló fluxusát az egységkörön át Green-tétellel!</>}>
          <p>
            <M t="\operatorname{div}\mathbf{F} = 3x^2 + 3y^2 = 3r^2" />. Polárkoordinátákban:{' '}
            <M t="\int_0^{2\pi}\!d\theta \int_0^1 3r^2\cdot r\,dr = 2\pi \cdot \frac{3}{4} = \frac{3\pi}{2}" />!
          </p>
        </Task>

        <Task n={6} q={<>Mennyi az <M t="\mathbf{F}(x, y) = \langle y^2 + e^y,\; x^3 - \cos x \rangle" /> mező fluxusa bármely zárt síkgörbén át?</>}>
          <p>
            <M t="M_x + N_y = 0 + 0 = 0" /> mindenhol (forrásmentes / összenyomhatatlan áramlás!), tehát a fluxus
            bármely zárt görbén pontosan <M t="0" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Green-tétel szuperereje: ijesztő tagok eltüntetése',
    body: (
      <>
        <p>
          Ha egy zárt vonalintegrálban a <M t="dx" /> mellett szerepel egy csak <M t="x" />-től függő szörnyeteg (pl.{' '}
          <M t="e^{x^2}" />), a <M t="dy" /> mellett pedig egy csak <M t="y" />-tól függő szörnyeteg (pl.{' '}
          <M t="\sin(y^3)" />), Green-tétel egyetlen csapással elpusztítja mindkettőt!
        </p>

        <GreenShortcutDemoWidget />

        <Steps
          title="Ijesztő zárt vonalintegrál 5 másodperces megoldása"
          problem={
            <>
              Számítsd ki az <M t="\oint_C \big[(e^{x^2} + 3y)\,dx + (5x + \sin(y^3))\,dy\big]" /> integrált a pozitív
              irányítású <M t="x^2 + y^2 = 4" /> kör mentén!
            </>
          }
          steps={[
            {
              title: 'Azonosítsuk M-et és N-et',
              body: (
                <>
                  <M t="M(x, y) = e^{x^2} + 3y" />, <M t="N(x, y) = 5x + \sin(y^3)" />.
                </>
              ),
            },
            {
              title: 'Számítsuk ki N_x − M_y-t',
              body: (
                <>
                  <M t="\frac{\partial N}{\partial x} = 5" />, <M t="\frac{\partial M}{\partial y} = 3 \;\Rightarrow\; N_x - M_y = 2" />.
                </>
              ),
            },
            {
              title: 'Alkalmazzuk Green tételét',
              body: (
                <>
                  <M t="\iint_{x^2+y^2\le 4} 2\,dA = 2 \cdot \operatorname{Ter}(\text{kör}) = 2 \cdot (4\pi) = 8\pi" />!
                </>
              ),
            },
          ]}
        />

        <Task n={7} q={<>Számítsd ki: <M t="\oint_C \big[(\sin(x^3) - y)\,dx + (2x + e^{y^2})\,dy\big]" />, ahol <M t="C" /> egy 6 területű háromszög CCW kerülete!</>}>
          <p>
            <M t="N_x - M_y = 2 - (-1) = 3" /> → <M t="3 \cdot 6 = 18" />!
          </p>
        </Task>

        <Task n={8} q={<>Mennyi a 7. feladat integrálja, ha a háromszöget az <em>óramutató járásával megegyezően</em> (CW) járjuk be?</>}>
          <p>
            Negatív irányításnál előjelet vált: <M t="-18" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Területszámítás vonalintegrállal (a planiméter titka)',
    body: (
      <>
        <p>
          Fordítsuk meg Green tételét! Ha olyan <M t="M, N" /> függvényeket választunk, amelyekre{' '}
          <M t="N_x - M_y = 1" />, akkor a jobb oldal pontosan <M t="\iint_R 1\,dA = \operatorname{Ter}(R)" /> lesz —
          vagyis egy síkidom <strong>területét megmérhetjük pusztán a kerületén végigsétálva</strong>! (Így működik a
          mérnöki <em>planiméter</em> műszer is!)
        </p>

        <Def title="Green-féle területképletek">
          <M block t="\operatorname{Ter}(R) = \oint_C x\,dy = -\oint_C y\,dx = \frac{1}{2}\oint_C (x\,dy - y\,dx)." />
        </Def>

        <GreenAreaPlanimeterWidget />

        <Quiz
          q={<>Melyik vonalintegrál adja meg egy pozitív (CCW) irányítású egyszerű zárt <M t="C" /> görbe által bezárt <M t="R" /> tartomány területét?</>}
          options={[
            { label: <M t="\oint_C (x\,dx + y\,dy)" /> },
            { label: <M t="\frac{1}{2}\oint_C (x\,dy - y\,dx)" />, ok: true },
            { label: <M t="\oint_C (x\,dy + y\,dx)" /> },
            { label: <M t="\oint_C y\,dx" /> },
          ]}
          explain={
            <>
              <M t="M = -\frac{y}{2},\; N = \frac{x}{2} \Rightarrow N_x - M_y = \frac{1}{2} - \big(-\frac{1}{2}\big) = 1" />,
              tehát <M t="\frac{1}{2}\oint_C (x\,dy - y\,dx) = \operatorname{Ter}(R)" />!
            </>
          }
        />

        <Task n={9} q={<>Számítsd ki az <M t="x = a\cos t,\; y = b\sin t" /> (<M t="0 \le t \le 2\pi" />) ellipszis területét Green területképletével!</>}>
          <p>
            <M t="\frac{1}{2}\int_0^{2\pi} (a\cos t \cdot b\cos t - b\sin t \cdot (-a\sin t))\,dt = \frac{1}{2}\int_0^{2\pi} ab\,dt = \pi ab" />!
          </p>
        </Task>

        <Task n={10} q={<>Határozd meg az <M t="x = a\cos^3 t,\; y = a\sin^3 t" /> (<M t="0 \le t \le 2\pi" />) asztroid területét!</>}>
          <p>
            <M t="x\,dy - y\,dx = 3a^2\sin^2 t\cos^2 t\,dt = \frac{3}{4}a^2\sin^2(2t)\,dt" />. Így{' '}
            <M t="\operatorname{Ter} = \frac{1}{2}\cdot\frac{3}{4}a^2 \int_0^{2\pi}\sin^2(2t)\,dt = \frac{3}{8}\pi a^2" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Lyukas tartományok és a deformációs elv',
    body: (
      <>
        <p>
          Green tétele lyukas (többszörösen összefüggő) tartományokra is kiterjeszthető: a külső peremet{' '}
          <strong>CCW</strong>, a belső lyuk peremét pedig <strong>CW</strong> irányban kell bejárni, hogy a tartomány
          végig a bal kezünk felől maradjon!
        </p>

        <GreenHoleBridgeWidget />

        <Warn>
          <strong>Deformációs elv:</strong> ha <M t="N_x - M_y = 0" /> mindenhol a két görbe közötti gyűrűben, akkor
          a külső <M t="C_1" /> görbén vett integrál <strong>pontosan egyenlő</strong> a belső <M t="C_2" /> körön
          vett integrállal (mindkettő CCW)! Ezért lehet egy bonyolult görbét egy kényelmes körre lecserélni!
        </Warn>

        <Task n={11} q={<>Számítsd ki az <M t="\oint_C \frac{-y\,dx + x\,dy}{x^2 + y^2}" /> integrált a <M t="4x^2 + 9y^2 = 36" /> ellipszisen (CCW)!</>}>
          <p>
            Az ellipszis körülveszi az origót, és azon kívül <M t="N_x - M_y = 0" />. A deformációs elvvel lecseréljük az
            egységkörre: az eredmény pontosan <M t="2\pi" />!
          </p>
        </Task>

        <Task n={12} q={<>Mennyi ugyanez az <M t="\oint_C \frac{-y\,dx + x\,dy}{x^2 + y^2}" /> integrál az <M t="(x - 5)^2 + y^2 = 1" /> körön?</>}>
          <p>
            Ez a kör <em>nem</em> tartalmazza az origót! A belsejében <M t="N_x - M_y = 0" /> sima, így Green tételével
            az integrál pontosan <M t="0" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Green-tétel bizonyítási ötlete és 3D távlatok',
    body: (
      <>
        <p>
          Egy egyszerre I. és II. típusú egyszerű tartományon Green tétele két független feléből áll össze: az{' '}
          <M t="\oint M\,dx = -\iint M_y\,dA" /> és az <M t="\oint N\,dy = +\iint N_x\,dA" /> egyenlőségből, amelyek
          mindegyike egyetlen soros Newton–Leibniz-tétel!
        </p>

        <GreenProofTypeIWidget />

        <Quiz
          q={<>Ha a <M t="C" /> kört az <em>óramutató járásával megegyezően</em> (CW) járjuk be, hogyan módosul Green tétele?</>}
          options={[
            { label: <>Nem változik meg</> },
            { label: <>Előjelet vált: <M t="\oint_{C_{\text{CW}}} (M\,dx + N\,dy) = -\iint_R (N_x - M_y)\,dA" /></>, ok: true },
            { label: <>Mindig 0 lesz</> },
            { label: <>Csak a <M t="M_y" /> előjele változik</> },
          ]}
          explain={
            <>
              A <M t="C_{\text{CW}} = -C_{\text{CCW}}" /> irányfordítás egyetlen mínusz előjelet tesz az integrál elé!
            </>
          }
        />

        <Task n={13} q={<>Számítsd ki az <M t="\oint_C (2y\,dx - 3x\,dy)" /> integrált az <em>óramutató járásával megegyező</em> (CW) egységkörön!</>}>
          <p>
            CCW irányban <M t="N_x - M_y = -3 - 2 = -5 \Rightarrow -5\pi" />. Mivel az irány CW, előjelet váltunk:{' '}
            <M t="+5\pi" />!
          </p>
        </Task>

        <Task n={14} q={<>Ellenőrizd Green tételének mindkét oldalát az <M t="\mathbf{F} = \langle 0,\; x \rangle" /> mezőre a <M t="[0, 2]\times[0, 3]" /> téglalapon!</>}>
          <p>
            Bal oldal (csak a jobb függőleges él ad járulékot, ahol <M t="x = 2" />): <M t="\int_0^3 2\,dy = 6" />.
            Jobb oldal: <M t="\iint_R (1 - 0)\,dA = 2\cdot 3 = 6" /> — tökéletes egyezés!
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
        <GreenMasterMapDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Számítsd ki az <M t="\mathbf{F} = \langle 3x + y,\; 2x - 5y \rangle" /> mező divergenciáját és 2D rotációját!</>}>
          <p>
            <M t="\operatorname{div}\mathbf{F} = 3 - 5 = -2" />, <M t="N_x - M_y = 2 - 1 = 1" />.
          </p>
        </Task>

        <Task n={16} q={<>Értékeld ki Green-tétellel: <M t="\oint_C (4y\,dx + 7x\,dy)" /> a 2 sugarú CCW körön!</>}>
          <p>
            <M t="N_x - M_y = 7 - 4 = 3 \Rightarrow 3 \cdot (4\pi) = 12\pi" />.
          </p>
        </Task>

        <Task n={17} q={<>Számítsd ki az <M t="\mathbf{F} = \langle 5x,\; 2y \rangle" /> mező fluxusát a <M t="[0, 2]\times[0, 3]" /> téglalapon át!</>}>
          <p>
            <M t="\operatorname{div}\mathbf{F} = 7 \Rightarrow 7 \cdot 6 = 42" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Számítsd ki Green-tétellel: <M t="\oint_C \big[(y - x^2)\,dx + (x^3 + y^2)\,dy\big]" /> a <M t="[0, 1]\times[0, 2]" /> téglalap CCW kerületén!</>}>
          <p>
            <M t="N_x - M_y = 3x^2 - 1" />. Így{' '}
            <M t="\int_0^2 dy \int_0^1 (3x^2 - 1)\,dx = 2\cdot [x^3 - x]_0^1 = 0" />!
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki: <M t="\oint_C (-y^3\,dx + x^3\,dy)" /> az <M t="x^2 + y^2 = 4" /> CCW körön!</>}>
          <p>
            <M t="N_x - M_y = 3x^2 + 3y^2 = 3r^2" />. Polárban:{' '}
            <M t="2\pi \int_0^2 3r^3\,dr = 2\pi \cdot 3\cdot 4 = 24\pi" />.
          </p>
        </Task>

        <Task n={20} q={<>Számítsd ki az <M t="(0;0), (4;0), (1;3)" /> csúcsú háromszög területét a Green-féle cipőfűző-képlettel!</>}>
          <p>
            <M t="\frac{1}{2}\big|(0\cdot 0 - 4\cdot 0) + (4\cdot 3 - 1\cdot 0) + (1\cdot 0 - 0\cdot 3)\big| = \frac{12}{2} = 6" />.
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Számítsd ki az <M t="\oint_C (y^2\,dx + 3xy\,dy)" /> integrált az <M t="1 \le x^2 + y^2 \le 4,\; y \ge 0" /> felső félkörgyűrű CCW kerületén!</>}>
          <p>
            <M t="N_x - M_y = 3y - 2y = y = r\sin\theta" />. Polárban:{' '}
            <M t="\int_0^\pi \sin\theta\,d\theta \int_1^2 r^2\,dr = 2 \cdot \frac{8 - 1}{3} = \frac{14}{3}" />!
          </p>
        </Task>

        <Task n={22} q={<>Egy harmonikus függvényre <M t="u_{xx} + u_{yy} = 0" /> (Laplace-egyenlet). Igazold Green fluxus-alakjával, hogy <M t="\oint_C \nabla u \cdot \mathbf{n}\,ds = 0" /> bármely zárt görbén!</>}>
          <p>
            Legyen <M t="\mathbf{F} = \nabla u = \langle u_x, u_y \rangle" />. Ekkor{' '}
            <M t="\operatorname{div}\mathbf{F} = u_{xx} + u_{yy} = 0" />, így Green fluxus-alakja alapján{' '}
            <M t="\oint_C \nabla u\cdot\mathbf{n}\,ds = \iint_R 0\,dA = 0" />!
          </p>
        </Task>

        <Task n={23} q={<>Számítsd ki az <M t="\int_C \big[(2xy + e^x)\,dx + (x^2 + 3x)\,dy\big]" /> integrált a <strong>nyitott</strong> felső félköríven <M t="(2; 0)" />-ból <M t="(-2; 0)" />-ba úgy, hogy lezárod az <M t="x" />-tengellyel és Green-tételt használsz!</>}>
          <p>
            Zárjuk le az <M t="L: (-2;0) \to (2;0)" /> szakasszal (<M t="y=0, dy=0" />):{' '}
            <M t="\int_L e^x\,dx = e^2 - e^{-2}" />. A zárt félkörön Green-tétellel <M t="N_x - M_y = (2x+3) - 2x = 3" />,
            így <M t="\oint = 3 \cdot \frac{4\pi}{2} = 6\pi" />. Tehát a felső félkörív integrálja:{' '}
            <M t="6\pi - (e^2 - e^{-2})" />!
          </p>
        </Task>
      </>
    ),
  },
];
