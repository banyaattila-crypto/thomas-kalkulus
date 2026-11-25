import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  ContinuityRepairWidget,
  EpsilonDeltaDiskWidget,
  Limit2DDecisionTreeDiagram,
  LimitPaths2DVs1DDiagram,
  ParabolaTrapWidget,
  PolarLimitWidget,
  Sphere3DLimitDiagram,
  TwoPathTestWidget,
} from '../components/Widgets142';
import type { Page } from './s1_1';

export const S14_2: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Határérték két változóban: minden út ugyanoda vezet?',
    body: (
      <>
        <Story>
          <p>
            Egyváltozós függvénynél csak két oldalról közelíthettünk <M t="x_0" />-hoz: balról és jobbról. A síkban
            viszont egy <M t="(x_0, y_0)" /> pontba <strong>végtelen sok irányból és végtelen sokféle görbén</strong>{' '}
            érkezhetünk! A határérték csak akkor létezik, ha <em>minden egyes</em> lehetséges úton ugyanazt az{' '}
            <M t="L" /> számot kapjuk.
          </p>
        </Story>

        <Def title="A kétváltozós határérték ε–δ definíciója">
          <p>
            Az <M t="\lim_{(x,y)\to(x_0,y_0)} f(x, y) = L" /> azt jelenti, hogy minden <M t="\varepsilon > 0" />-hoz
            létezik olyan <M t="\delta > 0" />, amelyre az értelmezési tartomány minden <M t="(x, y)" /> pontjában:
          </p>
          <M block t="0 < \sqrt{(x-x_0)^2 + (y-y_0)^2} < \delta \;\Longrightarrow\; |f(x, y) - L| < \varepsilon." />
        </Def>

        <LimitPaths2DVs1DDiagram />

        <p>
          A jó hír: az összeg-, szorzat-, hányados- és hatványszabályok (Thomas 1. tétel) két változóban is
          pontosan ugyanúgy érvényesek! Ezért polinomoknál és racionális függvényeknél — ha a nevező nem 0 — a
          határérték egyszerűen a <strong>behelyettesítési érték</strong> (Thomas 1. példa):
        </p>
        <M block t="\lim_{(x,y)\to(0,1)} \frac{x - xy + 3}{x^2 y + 5xy - y^3} = \frac{0 - 0 + 3}{0 + 0 - 1} = -3." />

        <Quiz
          q={<>Mennyi az <M t="\lim_{(x,y)\to(3,-4)} \sqrt{x^2 + y^2}" /> határérték?</>}
          options={[
            { label: <><M t="1" /></> },
            { label: <><M t="5" /></>, ok: true },
            { label: <><M t="7" /></> },
            { label: <>Nem létezik</> },
          ]}
          explain={
            <>
              Mivel <M t="x^2+y^2 = 9+16 = 25 > 0" />, közvetlenül behelyettesíthetünk: <M t="\sqrt{25} = \mathbf{5}" />!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={<>Számítsd ki: <M t="\lim_{(x,y)\to(0,0)} \frac{3x^2 - y^2 + 5}{x^2 + y^2 + 2}" />!</>}
        >
          <p>
            A nevező <M t="2 \neq 0" />, így sima behelyettesítéssel: <M t="\mathbf{\frac{5}{2}}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={<>Számítsd ki: <M t="\lim_{(x,y)\to(0,\pi/4)} \frac{\operatorname{tg} y}{\cos x}" />!</>}
        >
          <p>
            <M t="\frac{\operatorname{tg}(\pi/4)}{\cos 0} = \frac{1}{1} = \mathbf{1}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Algebrai trükkök és a szendvicstétel (0/0 esetek)',
    body: (
      <>
        <p>
          Ha a nevező nullához tart, a közvetlen behelyettesítés csődöt mond — pontosan úgy, mint 1D-ben! Két fő
          fegyverünk van ilyenkor: az <strong>algebrai átalakítás</strong> (kiemelés, konjugálttal szorzás) és a{' '}
          <strong>kétváltozós szendvicstétel</strong>.
        </p>

        <Steps
          title="Thomas 2. példa — Gyöktelenítés két változóban"
          problem={<>Számítsuk ki a <M t="\lim_{(x,y)\to(0,0)} \frac{x^2 - xy}{\sqrt{x} - \sqrt{y}}" /> határértéket (<M t="x\neq y" />)!</>}
          steps={[
            {
              title: 'Szorzás a nevező konjugáltjával',
              body: (
                <>
                  Szorozzuk meg a számlálót és a nevezőt <M t="(\sqrt{x}+\sqrt{y})" />-nal:{' '}
                  <M t="\frac{x(x-y)(\sqrt{x}+\sqrt{y})}{x - y}" />.
                </>
              ),
            },
            {
              title: 'Egyszerűsítés (x − y ≠ 0)',
              body: (
                <>
                  Az <M t="(x-y)" /> kiesik, marad <M t="x(\sqrt{x}+\sqrt{y})" />.
                </>
              ),
            },
            {
              title: 'Behelyettesítés',
              body: (
                <>
                  <M t="\lim_{(x,y)\to(0,0)} x(\sqrt{x}+\sqrt{y}) = 0\cdot(0+0) = \mathbf{0}" />!
                </>
              ),
            },
          ]}
        />

        <EpsilonDeltaDiskWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={<>Számítsd ki átalakítással: <M t="\lim_{(x,y)\to(1,1),\, x\neq y} \frac{x^2 - y^2}{x - y}" />!</>}
        >
          <p>
            <M t="\frac{(x-y)(x+y)}{x-y} = x + y \to 1 + 1 = \mathbf{2}" />.
          </p>
        </Task>
        <Task
          n={4}
          q={<>A szendvicstétellel igazold, hogy <M t="\lim_{(x,y)\to(0,0)} y\sin\!\left(\frac{1}{x}\right) = 0" /> (Thomas 47. feladat)!</>}
        >
          <p>
            Mivel <M t="\left|\sin\frac{1}{x}\right| \le 1" />, teljesül <M t="-|y| \le y\sin\frac{1}{x} \le |y|" />.
            Mivel mindkét korlát <M t="0" />-hoz tart, a határérték <M t="\mathbf{0}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'A kétutas próba: amikor a határérték NEM létezik',
    body: (
      <>
        <Def title="Kétutas próba (a nemlétezés bizonyítására)">
          <p>
            Ha az <M t="f(x, y)" /> függvény két különböző, az <M t="(x_0, y_0)" /> pontba vezető görbe mentén{' '}
            <strong>különböző</strong> határértékhez tart, akkor <M t="\lim_{(x,y)\to(x_0,y_0)} f(x, y)" />{' '}
            <strong>NEM LÉTEZIK</strong>!
          </p>
        </Def>

        <p>
          <strong>Thomas 4. példa:</strong> Vizsgáljuk az <M t="f(x, y) = \frac{2xy}{x^2 + y^2}" /> függvényt az
          origóban! Ha az <M t="y = mx" /> egyenes mentén tartunk <M t="(0,0)" />-ba (<M t="x\neq 0" />):
        </p>
        <M block t="f(x, mx) = \frac{2x(mx)}{x^2 + m^2 x^2} = \frac{2m}{1 + m^2} = \sin(2\theta)." />
        <p>
          Az eredmény függ az <M t="m" /> meredekségtől (pl. <M t="m=0 \Rightarrow 0" />, <M t="m=1 \Rightarrow 1" />),
          így a határérték nem létezik!
        </p>

        <TwoPathTestWidget />

        <Quiz
          q={<>Ha egy függvényről belátjuk, hogy az <M t="x" />-tengely, az <M t="y" />-tengely és az <M t="y = x" /> egyenes mentén is <M t="0" />-hoz tart, akkor biztosan <M t="0" /> a határértéke?</>}
          options={[
            { label: <>Igen, 3 különböző út már elég</> },
            { label: <>Nem! Más egyenesen vagy görbe úton még adhat más értéket!</>, ok: true },
          ]}
          explain={
            <>
              A kétutas próba <strong>csak a nemlétezést</strong> tudja bizonyítani! A létezéshez az összes
              lehetséges út együttes kontrollja kell (algebra, polárkoordináta vagy szendvicstétel).
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={<>Mutasd meg a kétutas próbával, hogy <M t="\lim_{(x,y)\to(0,0)} \frac{x - y}{x + y}" /> nem létezik!</>}
        >
          <p>
            Az <M t="y = 0" /> tengelyen <M t="\frac{x}{x} = 1" />; az <M t="x = 0" /> tengelyen{' '}
            <M t="\frac{-y}{y} = -1 \neq 1" /> ⇒ <strong>nem létezik</strong>!
          </p>
        </Task>
        <Task
          n={6}
          q={<>Mutasd meg, hogy <M t="\lim_{(x,y)\to(0,0)} \frac{x^2 - y^2}{x^2 + y^2}" /> nem létezik!</>}
        >
          <p>
            <M t="y=0" /> mentén <M t="+1" />, <M t="x=0" /> mentén <M t="-1" /> ⇒ <strong>nem létezik</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A parabola-csapda: amikor az összes egyenes hazudik',
    body: (
      <>
        <Warn>
          Ne állj meg az egyeneseknél! Léteznek olyan alattomos függvények, amelyek <strong>minden egyes{' '}
          <M t="y = mx" /> egyenesen</strong> nullához tartanak, mégis szakadnak egy görbe út (pl. parabola) mentén!
        </Warn>

        <p>
          <strong>Klasszikus példa:</strong> <M t="f(x, y) = \frac{x^2 y}{x^4 + y^2}" />! Miért pont a parabolára
          gyanakszunk? Nézd meg a nevezőt: <M t="x^4 + y^2" /> — a két tag pontosan akkor azonos rendű, ha{' '}
          <M t="y \sim x^2" />! Próbáljuk ki az <M t="y = kx^2" /> parabolát:
        </p>
        <M block t="f(x, kx^2) = \frac{x^2(kx^2)}{x^4 + k^2 x^4} = \frac{k}{1 + k^2} \quad (\text{függ } k\text{-tól!})." />

        <ParabolaTrapWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={<>Milyen görbe úttal tudod lebuktatni az <M t="f(x, y) = \frac{x^4 - y^2}{x^4 + y^2}" /> függvényt az origóban (Thomas 37. feladat)?</>}
        >
          <p>
            Az <M t="y = 0" /> egyenesen <M t="+1" />, míg az <M t="y = x^2" /> parabolán <M t="0" /> (vagy az{' '}
            <M t="x = 0" /> egyenesen <M t="-1" />) ⇒ <strong>nem létezik</strong>!
          </p>
        </Task>
        <Task
          n={8}
          q={<>Milyen <M t="y = x^k" /> hatványgörbét válassz a <M t="g(x, y) = \frac{x^3 y}{x^6 + y^2}" /> függvényhez?</>}
        >
          <p>
            A nevezőben <M t="x^6" /> és <M t="y^2" /> azonos rendű, ha <M t="y = x^3" />! Ezen az úton{' '}
            <M t="g(x, x^3) = \frac{x^6}{2x^6} = \frac{1}{2} \neq 0" /> (míg a tengelyeken <M t="0" />) ⇒ nem létezik!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Polárkoordinátás határérték-módszer',
    body: (
      <>
        <p>
          Ha <M t="x^2 + y^2" /> szerepel a kifejezésben, a <strong>polárkoordináták</strong> (<M t="x = r\cos\theta,\; y = r\sin\theta" />)
          varázsütésre leegyszerűsítik a feladatot! Ha sikerül az <M t="|f(r\cos\theta, r\sin\theta) - L| \le g(r)" />{' '}
          becslés egy <strong><M t="\theta" />-tól független</strong> <M t="g(r) \to 0" /> függvénnyel, akkor a
          határérték <strong>bizonyítottan <M t="L" /></strong>!
        </p>

        <PolarLimitWidget />

        <Steps
          title="Polárkoordinátás bizonyítás"
          problem={<>Igazoljuk, hogy <M t="\lim_{(x,y)\to(0,0)} \frac{x^3 + y^3}{x^2 + y^2} = 0" />!</>}
          steps={[
            {
              title: 'Áttérés polárkoordinátákra',
              body: (
                <>
                  <M t="\frac{r^3\cos^3\theta + r^3\sin^3\theta}{r^2} = r(\cos^3\theta + \sin^3\theta)" />.
                </>
              ),
            },
            {
              title: 'θ-tól független felső becslés',
              body: (
                <>
                  Mivel <M t="|\cos\theta|\le 1" /> és <M t="|\sin\theta|\le 1" />, teljesül:{' '}
                  <M t="0 \le \left|\frac{x^3+y^3}{x^2+y^2}\right| \le r(1 + 1) = 2r" />.
                </>
              ),
            },
            {
              title: 'Határérték r → 0⁺-ra',
              body: (
                <>
                  Mivel <M t="2r \to 0" />, a szendvicstétel szerint a határérték <strong>pontosan 0</strong>!
                </>
              ),
            },
          ]}
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={<>Polárkoordinátákkal számítsd ki: <M t="\lim_{(x,y)\to(0,0)} (x^2 + y^2)\ln(x^2 + y^2)" />!</>}
        >
          <p>
            <M t="\lim_{r\to 0^+} r^2\ln(r^2) = \lim_{u\to 0^+} u\ln u = \mathbf{0}" /> (L’Hospital-szabállyal!).
          </p>
        </Task>
        <Task
          n={10}
          q={<>Polárkoordinátákkal számítsd ki: <M t="\lim_{(x,y)\to(0,0)} \frac{1 - \cos(x^2 + y^2)}{x^2 + y^2}" />!</>}
        >
          <p>
            <M t="\lim_{r\to 0^+} \frac{1 - \cos(r^2)}{r^2} = \lim_{u\to 0^+} \frac{1-\cos u}{u} = \mathbf{0}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Folytonosság magasabb dimenzióban',
    body: (
      <>
        <Def title="Folytonosság egy pontban">
          <p>
            Az <M t="f(x, y)" /> függvény <strong>folytonos</strong> az <M t="(x_0, y_0)" /> pontban, ha:
          </p>
          <ol style={{ margin: '4px 0 0 18px' }}>
            <li><M t="f(x_0, y_0)" /> létezik (a pont benne van <M t="D" />-ben),</li>
            <li><M t="\lim_{(x,y)\to(x_0,y_0)} f(x, y)" /> létezik, és</li>
            <li><M t="\lim_{(x,y)\to(x_0,y_0)} f(x, y) = f(x_0, y_0)" />.</li>
          </ol>
        </Def>

        <p>
          A gyakorlatban minden polinom, exponenciális, szinusz és koszinusz mindenhol folytonos; hányadosuk ott
          folytonos, ahol a nevező nem 0; és folytonos függvények <strong>összetétele is folytonos</strong>!
        </p>

        <ContinuityRepairWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={<>Hol folytonos az <M t="f(x, y) = \frac{x + y}{x^2 - y}" /> függvény?</>}
        >
          <p>
            Mindenhol, kivéve az <M t="y = x^2" /> parabola pontjait (ahol a nevező nulla)!
          </p>
        </Task>
        <Task
          n={12}
          q={<>Milyen <M t="c" /> értéket válasszunk az origóba, hogy az <M t="f(x, y) = \frac{x^3 + y^3}{x^2 + y^2}" /> (<M t="(x,y)\neq(0,0)" />), <M t="f(0,0) = c" /> függvény mindenhol folytonos legyen?</>}
        >
          <p>
            Az 5. oldalon beláttuk, hogy a határérték <M t="0" />, ezért <M t="\mathbf{c = 0}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Háromváltozós határértékek és folytonosság',
    body: (
      <>
        <p>
          Három (vagy <M t="n" />) változóban minden definíció és tétel szó szerint ugyanaz — csak a síkbeli{' '}
          <M t="\delta" />-körlapot a térbeli <strong><M t="\delta" />-gömb</strong> váltja fel!
        </p>

        <Sphere3DLimitDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={<>Számítsd ki: <M t="\lim_{(x,y,z)\to(1,-1,-1)} \frac{2xy + yz}{x^2 + z^2}" /> (Thomas 22. feladat)!</>}
        >
          <p>
            Közvetlen behelyettesítéssel: <M t="\frac{2(1)(-1) + (-1)(-1)}{1^2 + (-1)^2} = \frac{-2 + 1}{2} = \mathbf{-\frac{1}{2}}" />.
          </p>
        </Task>
        <Task
          n={14}
          q={<>Hol folytonos a <M t="h(x, y, z) = \frac{1}{x^2 + z^2 - 1}" /> háromváltozós függvény (Thomas 33b. feladat)?</>}
        >
          <p>
            Az egész <M t="\mathbb{R}^3" /> térben, kivéve az <M t="x^2 + z^2 = 1" /> (az <M t="y" />-tengely körüli
            egységsugarú) <strong>körhenger</strong> felületét!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok',
    body: (
      <>
        <Limit2DDecisionTreeDiagram />

        <Def title="14.2 Puskakártya — Minden módszer egy helyen">
          <ul>
            <li>
              <strong>Létezés bizonyítása:</strong> közvetlen behelyettesítés, algebrai egyszerűsítés, szendvicstétel
              (<M t="|f-L| \le g(r) \to 0" />), vagy polárkoordináta (<M t="\theta" />-tól független korláttal!).
            </li>
            <li>
              <strong>Nemlétezés bizonyítása:</strong> kétutas próba — találj 2 olyan utat (tengelyek, <M t="y=mx" />,
              <M t="y=kx^2" />), amelyeken <em>eltérő</em> határérték jön ki!
            </li>
            <li>
              <strong>Folytonosság:</strong> <M t="\lim_{(x,y)\to(x_0,y_0)} f(x, y) = f(x_0, y_0)" />.
            </li>
          </ul>
        </Def>

        <Warn>
          <strong>5 tipikus buktató a 14.2-ben:</strong>
          <ol style={{ margin: '6px 0 0 18px' }}>
            <li>Azt hinni, hogy ha 2-3 egyenesen ugyanaz jön ki, akkor a határérték létezik (parabola-csapda!).</li>
            <li>Polárkoordinátás alaknál csak rögzített <M t="\theta" />-ra venni <M t="r\to 0^+" />-t: ha a <M t="\theta" />-függő szorzó nem korlátos, téves eredményt adhat!</li>
            <li>Az <M t="\lim_{(x,y)\to(0,0)}" /> helyett külön-külön elvégezni az <M t="\lim_{x\to 0}(\lim_{y\to 0})" /> iterált határértéket (ezek nem mindig egyeznek meg a 2D határértékkel!).</li>
            <li>Elfelejteni, hogy a folytonossághoz <M t="f(x_0, y_0)" />-nak is <strong>léteznie</strong> kell!</li>
            <li>Elfelejteni a <M t="2|xy| \le x^2 + y^2" /> aranyegyenlőtlenséget (pedig a legtöbb szendvicstételes feladathoz ez a kulcs!).</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={<>Számítsd ki: <M t="\lim_{(x,y)\to(0,\ln 2)} e^{x - y}" />!</>}
        >
          <p>
            <M t="e^{0 - \ln 2} = e^{-\ln 2} = \mathbf{\frac{1}{2}}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={<>Számítsd ki: <M t="\lim_{(x,y)\to(0,0)} \frac{e^y\sin x}{x}" />!</>}
        >
          <p>
            Szorzatként: <M t="\left(\lim_{y\to 0} e^y\right)\cdot\left(\lim_{x\to 0}\frac{\sin x}{x}\right) = 1\cdot 1 = \mathbf{1}" />.
          </p>
        </Task>
        <Task
          n={17}
          q={<>Hol folytonos a <M t="g(x, y) = \frac{x + y}{2 + \cos x}" /> függvény?</>}
        >
          <p>
            Mivel <M t="2 + \cos x \ge 1 > 0" /> mindenhol, a függvény a <strong>teljes <M t="\mathbb{R}^2" /> síkon</strong>{' '}
            folytonos!
          </p>
        </Task>

        <h3>Közepes gyakorlófeladatok</h3>
        <Task
          n={18}
          q={<>Számítsd ki átalakítással: <M t="\lim_{(x,y)\to(2,2),\, x+y\neq 4} \frac{x + y - 4}{\sqrt{x+y} - 2}" /> (Thomas 18. feladat)!</>}
        >
          <p>
            <M t="x+y-4 = (\sqrt{x+y}-2)(\sqrt{x+y}+2)" />, így egyszerűsítés után{' '}
            <M t="\sqrt{x+y} + 2 \to \sqrt{4} + 2 = \mathbf{4}" />!
          </p>
        </Task>
        <Task
          n={19}
          q={<>Döntsd el, létezik-e: <M t="\lim_{(x,y)\to(0,0)} \frac{x^2 y^2}{x^2 + y^2}" />!</>}
        >
          <p>
            <strong>Létezik, és 0!</strong> Polárkoordinátákkal <M t="r^2\cos^2\theta\sin^2\theta \le r^2 \to 0" />!
          </p>
        </Task>
        <Task
          n={20}
          q={<>Döntsd el, létezik-e: <M t="\lim_{(x,y)\to(0,0)} \frac{xy}{|xy|}" /> (Thomas 38. feladat)!</>}
        >
          <p>
            <strong>Nem létezik:</strong> az I. síknegyedben (<M t="y=x" />) értéke <M t="+1" />, a II. síknegyedben
            (<M t="y=-x" />) pedig <M t="-1" />!
          </p>
        </Task>

        <h3>Haladó gyakorlófeladatok</h3>
        <Task
          n={21}
          q={<>Igazold a szendvicstétellel, hogy <M t="\lim_{(x,y)\to(0,0)} \frac{x^2 y}{x^2 + y^2} = 0" />!</>}
        >
          <p>
            Mivel <M t="0 \le \frac{x^2}{x^2+y^2} \le 1" />, kapjuk: <M t="0 \le \left|\frac{x^2 y}{x^2+y^2}\right| \le |y| \to 0" />!
          </p>
        </Task>
        <Task
          n={22}
          q={<>Döntsd el, létezik-e: <M t="\lim_{(x,y)\to(0,0)} \frac{x^2 + y}{y}" /> (Thomas 41. feladat)!</>}
        >
          <p>
            <strong>Nem létezik!</strong> Az <M t="x=0" /> egyenesen <M t="\frac{y}{y} = 1" />, míg az <M t="y = x^2" />{' '}
            parabolán <M t="\frac{2x^2}{x^2} = 2 \neq 1" />!
          </p>
        </Task>
        <Task
          n={23}
          q={<>Számítsd ki a <M t="\lim_{(x,y)\to(0,0)} \frac{\operatorname{arctg}(xy)}{xy}" /> határértéket (a <M t="u = xy \to 0" /> helyettesítéssel)!</>}
        >
          <p>
            Mivel <M t="u = xy \to 0" />, L’Hospital-szabállyal{' '}
            <M t="\lim_{u\to 0}\frac{\operatorname{arctg} u}{u} = \lim_{u\to 0}\frac{1/(1+u^2)}{1} = \mathbf{1}" />!
          </p>
        </Task>
      </>
    ),
  },
];
