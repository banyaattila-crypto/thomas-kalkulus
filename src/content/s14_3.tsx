import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  ClairautOrderDiagram,
  CrossDiscontinuityWidget,
  DifferentiabilityChainDiagram,
  HoldConstantVisualizerWidget,
  IdealGasPartialWidget,
  PartialDerivativesCheatDiagram,
  PartialSliceTangent3DWidget,
  WaveEquationSliceWidget,
} from '../components/Widgets143';
import type { Page } from './s1_1';

export const S14_3: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Parciális deriváltak: a felület szeletelése',
    body: (
      <>
        <Story>
          <p>
            Ha egy hegyoldalon állsz, a meredekség attól függ, <em>melyik irányba</em> indulsz el! A{' '}
            <strong>parciális deriváltak</strong> zseniálisan egyszerű ötlete: először csak a két fő
            koordináta-irányba nézünk (kelet felé: <M t="x" /> változik, <M t="y" /> rögzített; észak felé:{' '}
            <M t="y" /> változik, <M t="x" /> rögzített) — így minden visszavezethető a már jól ismert
            egyváltozós deriválásra!
          </p>
        </Story>

        <Def title="Az x és y szerinti parciális derivált definíciója">
          <M block t="\frac{\partial f}{\partial x}(x_0, y_0) = f_x(x_0, y_0) = \lim_{h\to 0}\frac{f(x_0 + h,\, y_0) - f(x_0,\, y_0)}{h}" />
          <M block t="\frac{\partial f}{\partial y}(x_0, y_0) = f_y(x_0, y_0) = \lim_{h\to 0}\frac{f(x_0,\, y_0 + h) - f(x_0,\, y_0)}{h}" />
          <p>
            A görbe <M t="\partial" /> („kerek d”) szimbólum jelzi, hogy több változó van, és egyszerre csak az
            egyik szerint deriválunk.
          </p>
        </Def>

        <PartialSliceTangent3DWidget />

        <Quiz
          q={<>A <M t="z = 3{,}5 - 0{,}5x^2 - 0{,}8y^2" /> felületen az <M t="(1;\,0{,}5)" /> pontban melyik irányba lejt meredekebben a felület?</>}
          options={[
            { label: <>Az <M t="x" /> irányba (<M t="f_x = -1{,}0" />)</>, ok: true },
            { label: <>Az <M t="y" /> irányba (<M t="f_y = -0{,}8" />)</> },
            { label: <>Mindkét irányban pontosan ugyanannyira</> },
          ]}
          explain={
            <>
              <M t="f_x(1;\,0{,}5) = -1{,}0" />, míg <M t="f_y(1;\,0{,}5) = -1{,}6\cdot 0{,}5 = -0{,}8" />. Mivel{' '}
              <M t="|-1{,}0| > |-0{,}8|" />, az <M t="x" /> irányú metszet meredekebben lejt!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={<>Számítsd ki <M t="f_x(1, 2)" /> és <M t="f_y(1, 2)" /> értékét, ha <M t="f(x, y) = 4 - x^2 - 2y^2" />!</>}
        >
          <p>
            <M t="f_x = -2x \Rightarrow f_x(1, 2) = \mathbf{-2}" />;{' '}
            <M t="f_y = -4y \Rightarrow f_y(1, 2) = \mathbf{-8}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={<>Mit jelent geometriailag, ha egy pontban <M t="f_x(x_0, y_0) = 0" /> és <M t="f_y(x_0, y_0) = 0" /> egyszerre?</>}
        >
          <p>
            Mindkét koordináta-irányú érintőegyenes <strong>vízszintes</strong> — vagyis a pont hegytető (maximum),
            völgyalj (minimum), vagy nyeregpont lehet (14.7. szakasz)!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Parciális deriválás számítása: a „befagyasztás” művészete',
    body: (
      <>
        <p>
          A parciális deriválás a gyakorlatban elképesztően gyors: egyszerűen alkalmazod az összes 3. fejezetbeli
          deriválási szabályt, miközben minden másik változót <strong>konstans számként</strong> kezelsz!
        </p>

        <HoldConstantVisualizerWidget />

        <p>
          Három (vagy több) változónál ugyanígy járunk el: <M t="w = x\sin(y + 3z)" /> esetén
        </p>
        <M block t="w_x = \sin(y+3z), \qquad w_y = x\cos(y+3z), \qquad w_z = 3x\cos(y+3z)." />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={<>Számítsd ki <M t="f_x" />-et és <M t="f_y" />-t, ha <M t="f(x, y) = x^2\ln(xy)" /> (<M t="x, y > 0" />)!</>}
        >
          <p>
            <M t="f_x = 2x\ln(xy) + x^2\cdot\frac{1}{x} = \mathbf{2x\ln(xy) + x}" /> (szorzatszabály!);{' '}
            <M t="f_y = x^2\cdot\frac{x}{xy} = \mathbf{\frac{x^2}{y}}" />!
          </p>
        </Task>
        <Task
          n={4}
          q={<>Számítsd ki <M t="f_x, f_y, f_z" />-t, ha <M t="f(x, y, z) = \sqrt{x^2 + y^2 + z^2}" />!</>}
        >
          <p>
            <M t="f_x = \frac{x}{\sqrt{x^2+y^2+z^2}},\quad f_y = \frac{y}{\sqrt{x^2+y^2+z^2}},\quad f_z = \frac{z}{\sqrt{x^2+y^2+z^2}}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Implicit parciális deriválás és fizikai változási ütemek',
    body: (
      <>
        <p>
          Gyakran a <M t="z(x, y)" /> függvény nincs kifejezve, hanem egy <M t="F(x, y, z) = 0" /> egyenlet köti
          össze a változókat. Ilyenkor mindkét oldalt parciálisan deriváljuk (pl. <M t="x" /> szerint, miközben{' '}
          <M t="y" /> konstans, <M t="z" /> viszont függ <M t="x" />-től!).
        </p>

        <Steps
          title="Thomas 5. példa — Implicit parciális deriválás"
          problem={<>Keressük meg <M t="\frac{\partial z}{\partial x}" /> értékét a <M t="yz - \ln z = x + y" /> egyenletből!</>}
          steps={[
            {
              title: 'Mindkét oldal deriválása x szerint (y konstans!)',
              body: (
                <>
                  <M t="y\frac{\partial z}{\partial x} - \frac{1}{z}\frac{\partial z}{\partial x} = 1 + 0" />.
                </>
              ),
            },
            {
              title: '∂z/∂x kiemelése',
              body: (
                <>
                  <M t="\left(y - \frac{1}{z}\right)\frac{\partial z}{\partial x} = 1 \iff \frac{yz - 1}{z}\frac{\partial z}{\partial x} = 1" />.
                </>
              ),
            },
            {
              title: 'Kifejezés',
              body: (
                <>
                  <M t="\mathbf{\frac{\partial z}{\partial x} = \frac{z}{yz - 1}}" /> (<M t="yz \neq 1" />)!
                </>
              ),
            },
          ]}
        />

        <IdealGasPartialWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={<>A fenti <M t="yz - \ln z = x + y" /> egyenletből számítsd ki <M t="\frac{\partial z}{\partial y}" />-t is!</>}
        >
          <p>
            <M t="y" /> szerint deriválva (szorzatszabály <M t="yz" />-n!):{' '}
            <M t="z + y\frac{\partial z}{\partial y} - \frac{1}{z}\frac{\partial z}{\partial y} = 1 \implies \mathbf{\frac{\partial z}{\partial y} = \frac{z(1 - z)}{yz - 1}}" />.
          </p>
        </Task>
        <Task
          n={6}
          q={<>Az <M t="x^2 + y^2 + z^2 = 9" /> gömbfelületen számítsd ki <M t="\frac{\partial z}{\partial x}" />-et és <M t="\frac{\partial z}{\partial y}" />-t (<M t="z\neq 0" />)!</>}
        >
          <p>
            <M t="2x + 2z\frac{\partial z}{\partial x} = 0 \implies \mathbf{\frac{\partial z}{\partial x} = -\frac{x}{z}}" />,
            hasonlóan <M t="\mathbf{\frac{\partial z}{\partial y} = -\frac{y}{z}}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Másodrendű parciális deriváltak és Clairaut tétele',
    body: (
      <>
        <p>
          Egy kétváltozós függvénynek <strong>négy másodrendű parciális deriváltja</strong> van: <M t="f_{xx}" />,{' '}
          <M t="f_{yy}" />, valamint a két <strong>vegyes parciális derivált</strong>, <M t="f_{xy}" /> és{' '}
          <M t="f_{yx}" />. Figyelj a sorrendre:
        </p>
        <M block t="f_{xy} = (f_x)_y = \frac{\partial}{\partial y}\!\left(\frac{\partial f}{\partial x}\right) = \frac{\partial^2 f}{\partial y\partial x}, \qquad f_{yx} = (f_y)_x = \frac{\partial^2 f}{\partial x\partial y}." />

        <Def title="Clairaut (Young) tétele — A vegyes deriváltak felcserélhetősége">
          <p>
            Ha <M t="f, f_x, f_y, f_{xy}, f_{yx}" /> léteznek az <M t="(a, b)" /> pont egy nyílt környezetében, és
            folytonosak <M t="(a, b)" />-ben, akkor a deriválás sorrendje <strong>közömbös</strong>:
          </p>
          <M block t="f_{xy}(a, b) = f_{yx}(a, b)." />
        </Def>

        <ClairautOrderDiagram />

        <Quiz
          q={<>Mennyi az <M t="f(x, y) = \cos(x^3 + 7x) + 5xy^2 + \ln(y^4 + 1)" /> függvény <M t="f_{xy}" /> vegyes deriváltja?</>}
          options={[
            { label: <><M t="5y^2" /></> },
            { label: <><M t="10y" /></>, ok: true },
            { label: <><M t="10xy" /></> },
            { label: <><M t="0" /></> },
          ]}
          explain={
            <>
              A tisztán <M t="x" />-es és tisztán <M t="y" />-os tagok vegyes deriváltja mindig 0! Csak az{' '}
              <M t="5xy^2" /> marad: először <M t="x" /> szerint <M t="5y^2" />, majd <M t="y" /> szerint{' '}
              <M t="\mathbf{10y}" />!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={<>Számítsd ki mind a négy másodrendű parciális deriváltat: <M t="f(x, y) = x\cos y + y e^x" /> (Thomas 9. példa)!</>}
        >
          <p>
            <M t="f_x = \cos y + y e^x,\; f_y = -x\sin y + e^x" />. Innen: <M t="f_{xx} = y e^x" />,{' '}
            <M t="f_{yy} = -x\cos y" />, és <M t="f_{xy} = f_{yx} = \mathbf{-\sin y + e^x}" />!
          </p>
        </Task>
        <Task
          n={8}
          q={<>Válaszd a gyorsabb sorrendet: számítsd ki <M t="\frac{\partial^2 w}{\partial x\partial y}" />-t, ha <M t="w = y\sin(xy) + \operatorname{arctg}(y^3)" />!</>}
        >
          <p>
            Clairaut tétele miatt számoljuk inkább <M t="w_{xy}" />-t (először <M t="x" /> szerint, így az{' '}
            <M t="\operatorname{arctg}(y^3)" /> azonnal 0!): <M t="w_x = y^2\cos(xy)" />, majd <M t="y" /> szerint:{' '}
            <M t="\mathbf{2y\cos(xy) - xy^2\sin(xy)}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Parciális differenciálegyenletek (PDE): a fizika nyelve',
    body: (
      <>
        <p>
          A fizika és mérnöki tudományok három leghíresebb egyenlete másodrendű parciális deriváltakból épül fel:
        </p>
        <Def title="A három klasszikus PDE">
          <ul>
            <li>
              <strong>Laplace-egyenlet (harmonikus függvények):</strong> <M t="u_{xx} + u_{yy} = 0" /> (stacionárius
              hőmérséklet, elektromos potenciál, ideális áramlás).
            </li>
            <li>
              <strong>Hővezetési egyenlet:</strong> <M t="u_t = k\,u_{xx}" /> (a hőmérséklet ott emelkedik, ahol a
              görbe konvex!).
            </li>
            <li>
              <strong>Hullámegyenlet:</strong> <M t="u_{tt} = c^2\,u_{xx}" /> (rezgő húr, hanghullám, fény).
            </li>
          </ul>
        </Def>

        <WaveEquationSliceWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={<>Igazold, hogy <M t="u(x, y) = e^x \cos y" /> megoldása a 2D Laplace-egyenletnek (<M t="u_{xx} + u_{yy} = 0" />)!</>}
        >
          <p>
            <M t="u_{xx} = e^x\cos y" /> és <M t="u_{yy} = -e^x\cos y" />, összegük pontosan <M t="0" /> ✓!
          </p>
        </Task>
        <Task
          n={10}
          q={<>Igazold, hogy <M t="u(x, t) = e^{-k t}\sin x" /> megoldása az <M t="u_t = k\,u_{xx}" /> hővezetési egyenletnek!</>}
        >
          <p>
            <M t="u_t = -k e^{-kt}\sin x" /> és <M t="u_{xx} = -e^{-kt}\sin x" />, így <M t="u_t = k\,u_{xx}" /> ✓!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'A nagy figyelmeztetés: fₓ és fᵧ létezése NEM elég!',
    body: (
      <>
        <Warn>
          Egy változóban a deriválhatóságból azonnal következett a folytonosság. Két változóban viszont{' '}
          <strong>létezhet mindkét parciális derivált egy olyan pontban is, ahol a függvény NEM folytonos</strong>!
        </Warn>

        <p>
          <strong>Thomas 8. példa:</strong> Legyen <M t="f(x, y) = 1" />, ha <M t="xy = 0" /> (a két koordinátatengelyen),
          és <M t="f(x, y) = 0" />, ha <M t="xy \neq 0" />. Mivel a két tengelyen <M t="f" /> konstans <M t="1" />,
          mindkét parciális derivált létezik és <M t="0" /> az origóban — az <M t="y = x" /> átlón haladva mégis
          ugrással szakad!
        </p>

        <CrossDiscontinuityWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={<>Az <M t="f(x, y) = \frac{2xy}{x^2+y^2}" /> (<M t="(x,y)\neq(0,0)" />), <M t="f(0,0)=0" /> függvénynek létezik-e <M t="f_x(0,0)" /> és <M t="f_y(0,0)" />? Folytonos-e az origóban?</>}
        >
          <p>
            Mivel <M t="f(h, 0) = 0" /> és <M t="f(0, h) = 0" />, kapjuk <M t="f_x(0,0) = 0" /> és{' '}
            <M t="f_y(0,0) = 0" /> (<strong>léteznek!</strong>), de a 14.2-ből tudjuk, hogy <strong>nem folytonos</strong>!
          </p>
        </Task>
        <Task
          n={12}
          q={<>Miért nem látja meg <M t="f_x" /> és <M t="f_y" /> az origóban az <M t="y = x" /> irányú szakadást?</>}
        >
          <p>
            Mert definíciójuk szerint <M t="f_x(0,0)" /> csak az <M t="(h, 0)" />, <M t="f_y(0,0)" /> pedig csak a{' '}
            <M t="(0, h)" /> pontokat vizsgálja — a négy síknegyed belsejéről semmilyen információjuk nincs!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Differenciálhatóság két változóban',
    body: (
      <>
        <p>
          Hogyan definiáljuk akkor a valódi, „minden irányban sima” <strong>differenciálhatóságot</strong> két
          változóban? Úgy, hogy a <M t="\Delta z = f(x_0+\Delta x, y_0+\Delta y) - f(x_0, y_0)" /> változást jól
          közelítse az érintősík lineáris része:
        </p>
        <M block t="\Delta z = f_x(x_0, y_0)\Delta x + f_y(x_0, y_0)\Delta y + \varepsilon_1\Delta x + \varepsilon_2\Delta y," />
        <p>
          ahol <M t="\varepsilon_1, \varepsilon_2 \to 0" />, ha <M t="(\Delta x, \Delta y) \to (0, 0)" />. A gyakorlatban
          ritkán kell ezt közvetlenül igazolni, mert Thomas 3. tétele egy szuperkönnyű elégséges feltételt ad:
        </p>

        <DifferentiabilityChainDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={<>Igazold a 3. tétellel, hogy <M t="f(x, y) = x^2 y + \sin(xy)" /> mindenhol differenciálható <M t="\mathbb{R}^2" />-n!</>}
        >
          <p>
            <M t="f_x = 2xy + y\cos(xy)" /> és <M t="f_y = x^2 + x\cos(xy)" /> mindkettő mindenhol folytonos ⇒{' '}
            <M t="f" /> mindenhol <strong>differenciálható</strong> (és így folytonos is)!
          </p>
        </Task>
        <Task
          n={14}
          q={<>Differenciálható-e az origóban a <M t="z = \sqrt{x^2 + y^2}" /> kúp? Folytonos-e ott?</>}
        >
          <p>
            <strong>Folytonos</strong>, de <strong>nem differenciálható</strong> (csúcsa van, <M t="f_x(0,0)" /> sem
            létezik: <M t="\lim_{h\to 0} |h|/h" /> nem létezik)!
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
        <PartialDerivativesCheatDiagram />

        <Def title="14.3 Puskakártya — Kulcselvek egy pillantásra">
          <ul>
            <li>
              <strong>Számítás:</strong> <M t="f_x" />-nél minden más változó konstans; <M t="f_y" />-nál <M t="x" />{' '}
              konstans.
            </li>
            <li>
              <strong>Clairaut-tétel:</strong> folytonos vegyes deriváltaknál <M t="f_{xy} = f_{yx}" /> (válaszd a
              könnyebb sorrendet!).
            </li>
            <li>
              <strong>Implicit deriválás:</strong> deriváld mindkét oldalt, a nem aktív független változó 0 deriváltú,
              <M t="z" /> viszont láncszabállyal <M t="\partial z/\partial x" />-et kap!
            </li>
            <li>
              <strong>Folytonossági lánc:</strong> <M t="f_x, f_y" /> folytonos <M t="\Rightarrow" /> differenciálható{' '}
              <M t="\Rightarrow" /> folytonos.
            </li>
          </ul>
        </Def>

        <Warn>
          <strong>5 tipikus buktató a 14.3-ban:</strong>
          <ol style={{ margin: '6px 0 0 18px' }}>
            <li>Az <M t="x^y" /> deriválásának összekeverése (<M t="\partial_x(x^y) = y x^{y-1}" />, míg <M t="\partial_y(x^y) = x^y \ln x" />!).</li>
            <li>Az <M t="f_{xy}" /> és <M t="\frac{\partial^2 f}{\partial x\partial y}" /> sorrendjének felcserélése (ha nem folytonosak, eltérhetnek!).</li>
            <li>Implicit deriváláskor elfelejteni, hogy <M t="z" /> függ <M t="x" />-től (szorzatszabály pl. <M t="xz" />-nél!).</li>
            <li>Azt hinni, hogy ha <M t="f_x" /> és <M t="f_y" /> létezik egy pontban, akkor <M t="f" /> biztosan folytonos (Thomas 8. példa!).</li>
            <li>Konstansként kezelt változók hozzáadott tagját bent hagyni (pl. <M t="\frac{\partial}{\partial x}(x^2 + y^3) = 2x" />, a <M t="y^3" /> deriváltja 0!).</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={<>Számítsd ki <M t="f_x" />-et és <M t="f_y" />-t: <M t="f(x, y) = 3x^4 y^2 - 5x + 7y^3 - 2" />!</>}
        >
          <p>
            <M t="f_x = 12x^3 y^2 - 5" />, <M t="f_y = 6x^4 y + 21y^2" />.
          </p>
        </Task>
        <Task
          n={16}
          q={<>Számítsd ki <M t="f_x" />-et és <M t="f_y" />-t: <M t="f(x, y) = e^{2x}\sin(3y)" />!</>}
        >
          <p>
            <M t="f_x = 2e^{2x}\sin(3y)" />, <M t="f_y = 3e^{2x}\cos(3y)" />.
          </p>
        </Task>
        <Task
          n={17}
          q={<>Számítsd ki <M t="w_x, w_y, w_z" />-t: <M t="w = x^2 y z^3" />!</>}
        >
          <p>
            <M t="w_x = 2xyz^3,\quad w_y = x^2 z^3,\quad w_z = 3x^2 y z^2" />.
          </p>
        </Task>

        <h3>Közepes gyakorlófeladatok</h3>
        <Task
          n={18}
          q={<>Számítsd ki mind a 4 másodrendű deriváltat: <M t="f(x, y) = \ln(x^2 + y^2)" />!</>}
        >
          <p>
            <M t="f_x = \frac{2x}{x^2+y^2},\; f_y = \frac{2y}{x^2+y^2}" />. Tovább deriválva:{' '}
            <M t="f_{xx} = \frac{2(y^2-x^2)}{(x^2+y^2)^2}" />, <M t="f_{yy} = \frac{2(x^2-y^2)}{(x^2+y^2)^2}" />{' '}
            (vegyük észre: <M t="f_{xx}+f_{yy}=0" />, harmonikus!), és <M t="f_{xy} = f_{yx} = \frac{-4xy}{(x^2+y^2)^2}" />!
          </p>
        </Task>
        <Task
          n={19}
          q={<>Számítsd ki <M t="f_x" />-et és <M t="f_y" />-t: <M t="f(x, y) = \operatorname{arctg}\!\left(\frac{y}{x}\right)" /> (<M t="x\neq 0" />)!</>}
        >
          <p>
            <M t="f_x = \frac{1}{1+(y/x)^2}\left(-\frac{y}{x^2}\right) = \mathbf{-\frac{y}{x^2+y^2}}" />,{' '}
            <M t="f_y = \frac{1}{1+(y/x)^2}\left(\frac{1}{x}\right) = \mathbf{\frac{x}{x^2+y^2}}" />!
          </p>
        </Task>
        <Task
          n={20}
          q={<>Implicit deriválással határozd meg <M t="\frac{\partial z}{\partial x}" />-et az <M t="x^2 z + y z^3 = 4" /> egyenletből!</>}
        >
          <p>
            <M t="2xz + x^2\frac{\partial z}{\partial x} + 3yz^2\frac{\partial z}{\partial x} = 0 \implies \mathbf{\frac{\partial z}{\partial x} = -\frac{2xz}{x^2 + 3yz^2}}" />.
          </p>
        </Task>

        <h3>Haladó gyakorlófeladatok</h3>
        <Task
          n={21}
          q={<>Igazold, hogy <M t="u(x, y, z) = \frac{1}{\sqrt{x^2 + y^2 + z^2}}" /> (a 3D gravitációs/elektrosztatikus potenciál!) kielégíti a 3D Laplace-egyenletet: <M t="u_{xx} + u_{yy} + u_{zz} = 0" />!</>}
        >
          <p>
            Legyen <M t="r = \sqrt{x^2+y^2+z^2}" />. <M t="u_x = -x r^{-3}" />, majd{' '}
            <M t="u_{xx} = -r^{-3} + 3x^2 r^{-5} = \frac{3x^2 - r^2}{r^5}" />. Szimmetriából összeadva:{' '}
            <M t="u_{xx}+u_{yy}+u_{zz} = \frac{3(x^2+y^2+z^2) - 3r^2}{r^5} = \mathbf{0}" />!
          </p>
        </Task>
        <Task
          n={22}
          q={<>Számítsd ki okos sorrenddel <M t="\frac{\partial^3 f}{\partial x\partial y\partial z}" />-t, ha <M t="f(x, y, z) = e^{xyz} + x^5\sin(y) + z^7\ln(y^2+1)" />!</>}
        >
          <p>
            Az utolsó két tagból hiányzik egy-egy változó, így mindkettő harmadrendű vegyes deriváltja 0! Marad{' '}
            <M t="e^{xyz}" />: <M t="\partial_x \to yze^{xyz}" />, <M t="\partial_y \to z(1+xyz)e^{xyz}" />,{' '}
            <M t="\partial_z \to \mathbf{(1 + 3xyz + x^2 y^2 z^2)e^{xyz}}" />!
          </p>
        </Task>
        <Task
          n={23}
          q={<>Igazold, hogy bármely kétszer differenciálható <M t="g" /> függvényre <M t="u(x, t) = g(x - ct)" /> (egy <M t="c" /> sebességgel jobbra haladó hullám!) kielégíti az <M t="u_{tt} = c^2 u_{xx}" /> hullámegyenletet!</>}
        >
          <p>
            Láncszabállyal <M t="u_x = g'(x-ct) \Rightarrow u_{xx} = g''(x-ct)" />, míg{' '}
            <M t="u_t = -c\,g'(x-ct) \Rightarrow u_{tt} = c^2 g''(x-ct) = \mathbf{c^2 u_{xx}}" /> ✓!
          </p>
        </Task>
      </>
    ),
  },
];
