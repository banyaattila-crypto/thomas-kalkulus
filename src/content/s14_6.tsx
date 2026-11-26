import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  DeltaZvsDzDiagram,
  ErrorPropagation3DWidget,
  ExplicitVsImplicitPlaneDiagram,
  LinearizationError2DWidget,
  SensitivityCylinderWidget,
  SurfaceIntersectionTangentWidget,
  TangentDiffSummaryDiagram,
  TangentPlane3DWidget,
} from '../components/Widgets146';
import type { Page } from './s1_1';

export const S14_6: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Szintfelület érintősíkja és normálegyenese',
    body: (
      <>
        <Story>
          <p>
            A 14.5. szakaszban láttuk, hogy a háromváltozós <M t="\nabla f(P_0)" /> gradiens vektor{' '}
            <strong>merőleges</strong> az <M t="f(x, y, z) = c" /> szintfelületre. Márpedig a 12.5-ből tudjuk,
            hogy egy pont és egy normálvektor <em>egyetlen egyenlettel</em> meghatároz egy síkot és egy rá merőleges
            egyenest! Így kapjuk meg a felületek <strong>érintősíkját</strong> és <strong>normálegyenesét</strong>.
          </p>
        </Story>

        <Def title="Érintősík és normálegyenes az f(x, y, z) = c felülethez">
          <p>Ha <M t="f" /> differenciálható <M t="P_0(x_0, y_0, z_0)" />-ban és <M t="\nabla f(P_0) \neq \mathbf{0}" />:</p>
          <M block t="\text{Érintősík:}\quad f_x(P_0)(x - x_0) + f_y(P_0)(y - y_0) + f_z(P_0)(z - z_0) = 0" />
          <M block t="\text{Normálegyenes:}\quad x = x_0 + f_x(P_0)t, \quad y = y_0 + f_y(P_0)t, \quad z = z_0 + f_z(P_0)t." />
        </Def>

        <TangentPlane3DWidget />

        <Quiz
          q={<>Mi az <M t="x^2 + y^2 + z^2 = 14" /> gömb érintősíkjának normálvektora a <M t="P_0(1, 2, 3)" /> pontban?</>}
          options={[
            { label: <><M t="\langle 1, 2, 3\rangle" /> (vagy <M t="\langle 2, 4, 6\rangle" />)</>, ok: true },
            { label: <><M t="\langle 1, 4, 9\rangle" /></> },
            { label: <><M t="\langle 2, 2, 2\rangle" /></> },
          ]}
          explain={
            <>
              <M t="\nabla(x^2+y^2+z^2) = \langle 2x, 2y, 2z\rangle \Rightarrow \langle 2, 4, 6\rangle \parallel \langle 1, 2, 3\rangle" />!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={<>Írd fel az <M t="x^2 + y^2 + z - 9 = 0" /> paraboloid érintősíkját és normálegyenesét a <M t="(1, 2, 4)" /> pontban (Thomas 1. példa)!</>}
        >
          <p>
            <M t="\nabla F(1,2,4) = \langle 2x, 2y, 1\rangle = \langle 2, 4, 1\rangle" />. Érintősík:{' '}
            <M t="2(x-1) + 4(y-2) + 1(z-4) = 0 \iff \mathbf{2x + 4y + z = 14}" />. Normálegyenes:{' '}
            <M t="x=1+2t,\; y=2+4t,\; z=4+t" />.
          </p>
        </Task>
        <Task
          n={2}
          q={<>Írd fel az <M t="x^2 + 2y^2 + 3z^2 = 6" /> ellipszoid érintősíkját az <M t="(1, 1, 1)" /> pontban!</>}
        >
          <p>
            <M t="\nabla F(1,1,1) = \langle 2, 4, 6\rangle" /> ⇒ <M t="2(x-1) + 4(y-1) + 6(z-1) = 0 \iff \mathbf{x + 2y + 3z = 6}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'A z = f(x, y) felület érintősíkja (explicit képlet)',
    body: (
      <>
        <p>
          Ha a felület explicit <M t="z = f(x, y)" /> alakban van megadva, egyszerűen átírjuk{' '}
          <M t="F(x, y, z) = f(x, y) - z = 0" /> szintfelületté! Ekkor <M t="\nabla F = \langle f_x, f_y, -1\rangle" />,
          amiből azonnal megkapjuk a klasszikus érintősík-egyenletet:
        </p>
        <M block t="z - z_0 = f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - y_0)." />

        <ExplicitVsImplicitPlaneDiagram />

        <p>
          <strong>Thomas 2. példa:</strong> A <M t="z = x\cos y - y e^x" /> felület érintősíkja a <M t="(0, 0, 0)" />{' '}
          pontban: <M t="f_x(0,0) = 1,\; f_y(0,0) = -1 \implies z = 1(x-0) - 1(y-0) \iff \mathbf{x - y - z = 0}" />!
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={<>Írd fel a <M t="z = x^2 + y^2" /> paraboloid érintősíkját a <M t="(1, -2, 5)" /> pontban!</>}
        >
          <p>
            <M t="f_x(1,-2) = 2,\; f_y(1,-2) = -4 \implies z - 5 = 2(x-1) - 4(y+2) \iff \mathbf{z = 2x - 4y - 5}" />.
          </p>
        </Task>
        <Task
          n={4}
          q={<>Hol van <strong>vízszintes érintősíkja</strong> a <M t="z = x^2 + y^2 - 4x + 6y + 10" /> felületnek?</>}
        >
          <p>
            Ahol <M t="f_x = 0" /> és <M t="f_y = 0" />: <M t="2x-4=0 \Rightarrow x=2" />,{' '}
            <M t="2y+6=0 \Rightarrow y=-3" />. A pont <M t="\mathbf{(2, -3, -3)}" />, az érintősík <M t="z = -3" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Két felület metszésvonalának érintőegyenese',
    body: (
      <>
        <p>
          Ha két sima felület (<M t="f(x, y, z) = 0" /> és <M t="g(x, y, z) = 0" />) egy térgörbében metszi egymást,
          a metszésvonal érintőegyenese <em>mindkét</em> érintősíkban benne fekszik — vagyis egyszerre merőleges{' '}
          <M t="\nabla f" />-re és <M t="\nabla g" />-re! Így az irányvektora egyszerűen a keresztszorzatuk:{' '}
          <M t="\mathbf{v} = \nabla f(P_0) \times \nabla g(P_0)" />!
        </p>

        <SurfaceIntersectionTangentWidget />

        <Steps
          title="Thomas 3. példa — Henger és sík metszetellipszise"
          problem={<>Adjuk meg az <M t="x^2 + y^2 - 2 = 0" /> henger és az <M t="x + z - 4 = 0" /> sík metszésvonalának érintőegyenesét <M t="P_0(1, 1, 3)" />-ban!</>}
          steps={[
            {
              title: 'Mindkét gradiens kiszámítása P₀(1, 1, 3)-ban',
              body: (
                <>
                  <M t="\nabla f(1,1,3) = \langle 2, 2, 0\rangle" />, <M t="\nabla g(1,1,3) = \langle 1, 0, 1\rangle" />.
                </>
              ),
            },
            {
              title: 'Keresztszorzat (irányvektor)',
              body: (
                <>
                  <M t="\mathbf{v} = \langle 2, 2, 0\rangle \times \langle 1, 0, 1\rangle = \mathbf{\langle 2, -2, -2\rangle}" />.
                </>
              ),
            },
            {
              title: 'Az érintőegyenes paraméteres egyenlete',
              body: (
                <>
                  <M t="x = 1 + 2t,\quad y = 1 - 2t,\quad z = 3 - 2t" />!
                </>
              ),
            },
          ]}
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={<>Határozd meg az <M t="x^2 + y^2 + z^2 = 3" /> gömb és a <M t="z = 1" /> sík metszéskörének érintőegyenesét az <M t="(1, 1, 1)" /> pontban!</>}
        >
          <p>
            <M t="\nabla f = \langle 2, 2, 2\rangle,\; \nabla g = \langle 0, 0, 1\rangle \implies \mathbf{v} = \langle 2, -2, 0\rangle \parallel \langle 1, -1, 0\rangle" />.
            Egyenes: <M t="x = 1+t,\; y = 1-t,\; z = 1" />.
          </p>
        </Task>
        <Task
          n={6}
          q={<>Mit jelent geometriailag, ha két felület metszéspontjában <M t="\nabla f(P_0) \times \nabla g(P_0) = \mathbf{0}" />?</>}
        >
          <p>
            A két normálvektor párhuzamos, tehát a két felület <strong>érinti egymást</strong> <M t="P_0" />-ban
            (közös az érintősíkjuk)!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Linearizáció: a felület helyettesítése az érintősíkjával',
    body: (
      <>
        <Def title="Kétváltozós linearizáció">
          <p>
            Az <M t="f(x, y)" /> differenciálható függvény <strong>linearizációja</strong> az <M t="(x_0, y_0)" />
            pontban (pontosan az érintősíkja!):
          </p>
          <M block t="L(x, y) = f(x_0, y_0) + f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - y_0)." />
          <p>
            Kis <M t="ds" /> elmozdulásnál <M t="\mathbf{u}" /> egységvektor irányában a változás becslése:{' '}
            <M t="df = (\nabla f(P_0)\cdot\mathbf{u})\,ds" />.
          </p>
        </Def>

        <LinearizationError2DWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={<>Becsüld meg <M t="\sqrt{(3{,}02)^2 + (3{,}97)^2}" /> értékét az <M t="f(x, y) = \sqrt{x^2 + y^2}" /> függvény <M t="(3, 4)" /> pontbeli linearizációjával!</>}
        >
          <p>
            <M t="f(3,4) = 5,\; f_x(3,4) = \frac{3}{5} = 0{,}6,\; f_y(3,4) = \frac{4}{5} = 0{,}8" />.{' '}
            <M t="L(3{,}02,\; 3{,}97) = 5 + 0{,}6(0{,}02) + 0{,}8(-0{,}03) = 5 + 0{,}012 - 0{,}024 = \mathbf{4{,}988}" />{' '}
            (pontos érték <M t="\approx 4{,}9881" />!).
          </p>
        </Task>
        <Task
          n={8}
          q={<>Becsüld meg <M t="f(x, y, z) = y\sin x + 2yz" /> változását, ha <M t="P_0(0,1,0)" />-ból <M t="P_1(2,2,-2)" /> irányába <M t="ds = 0{,}1" /> egységet lépünk (Thomas 4. példa)!</>}
        >
          <p>
            <M t="\nabla f(0,1,0) = \langle 1, 0, 2\rangle" />, <M t="\mathbf{u} = \langle \frac{2}{3}, \frac{1}{3}, -\frac{2}{3}\rangle" />.{' '}
            <M t="df = (\nabla f\cdot\mathbf{u})\,ds = \left(-\frac{2}{3}\right)(0{,}1) \approx \mathbf{-0{,}067}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'A teljes differenciál és a hibakorlát',
    body: (
      <>
        <Def title="Teljes differenciál (df)">
          <M block t="df = f_x(x_0, y_0)\,dx + f_y(x_0, y_0)\,dy" />
          <p>
            Ha <M t="f" /> másodrendű parciális deriváltjai folytonosak egy <M t="(x_0, y_0)" /> középpontú téglalapon,
            és ott <M t="|f_{xx}|, |f_{xy}|, |f_{yy}| \le M" />, akkor a közelítés hibája:
          </p>
          <M block t="|E(x, y)| = |f(x, y) - L(x, y)| \le \frac{1}{2}M\big(|x - x_0| + |y - y_0|\big)^2." />
        </Def>

        <DeltaZvsDzDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={<>Írd fel a teljes differenciált (<M t="dz" />): <M t="z = x^2 y + e^{2y}" />!</>}
        >
          <p>
            <M t="dz = (2xy)\,dx + (x^2 + 2e^{2y})\,dy" />.
          </p>
        </Task>
        <Task
          n={10}
          q={<>A 4. oldalon szereplő <M t="f(x, y) = x^2 - xy + \frac{1}{2}y^2 + 3" /> függvénynél mekkora az <M t="M" /> korlát és a hibakorlát a <M t="|x-3|\le 0{,}1,\; |y-2|\le 0{,}1" /> négyzeten?</>}
        >
          <p>
            <M t="f_{xx}=2,\; f_{xy}=-1,\; f_{yy}=1 \implies M = 2" />. Így{' '}
            <M t="|E| \le \frac{1}{2}(2)(0{,}1 + 0{,}1)^2 = \mathbf{0{,}04}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Mérnöki érzékenység és relatív hibaszázalék',
    body: (
      <>
        <p>
          A teljes differenciál egyik legfontosabb mérnöki alkalmazása az <strong>érzékenység-elemzés</strong> és a{' '}
          <strong>mérési hibák terjedése</strong> (Thomas 8–9. példa): egy rendszer mindig arra a bemeneti változóra
          a legérzékenyebb, amelynek a parciális deriváltja a legnagyobb abszolút értékű!
        </p>

        <SensitivityCylinderWidget />

        <Quiz
          q={<>Egy <M t="V = \pi r^2 h" /> henger sugarát legfeljebb <M t="1\%" />, magasságát legfeljebb <M t="3\%" /> hibával mérjük. Legfeljebb mekkora lehet a térfogat hibaszázaléka?</>}
          options={[
            { label: <><M t="4\%" /></> },
            { label: <><M t="5\%" /></>, ok: true },
            { label: <><M t="3\%" /></> },
            { label: <><M t="6\%" /></> },
          ]}
          explain={
            <>
              Mivel <M t="\frac{dV}{V} = 2\frac{dr}{r} + \frac{dh}{h}" />, a max. hiba{' '}
              <M t="2(1\%) + 3\% = \mathbf{5\%}" />! (A sugár hibája kétszeres súllyal számít a négyzet miatt!)
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={<>Az ideális gáz nyomása <M t="P = \frac{nRT}{V}" />. Ha <M t="T" /> mérési hibája legfeljebb <M t="1\%" />, <M t="V" />-é legfeljebb <M t="2\%" />, mekkora lehet <M t="P" /> legnagyobb hibaszázaléka?</>}
        >
          <p>
            <M t="\frac{dP}{P} = \frac{dT}{T} - \frac{dV}{V} \implies \left|\frac{dP}{P}\right| \le 1\% + 2\% = \mathbf{3\%}" />!
          </p>
        </Task>
        <Task
          n={12}
          q={<>Egy <M t="V = \frac{4}{3}\pi r^3" /> gömb sugarát 1% hibával mérjük. Hány százalékos lehet a térfogat hibája?</>}
        >
          <p>
            <M t="\frac{dV}{V} = 3\frac{dr}{r} \implies \mathbf{3\%}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Háromváltozós linearizáció és 3D hibabecslés',
    body: (
      <>
        <p>
          <strong>Thomas 10. példa:</strong> Az <M t="f(x, y, z) = x^2 - xy + 3\sin z" /> függvény linearizációja a{' '}
          <M t="(2, 1, 0)" /> pontban: <M t="f(2,1,0)=2,\; f_x=3,\; f_y=-2,\; f_z=3" />, tehát
        </p>
        <M block t="L(x, y, z) = 2 + 3(x-2) - 2(y-1) + 3z = 3x - 2y + 3z - 2." />
        <p>
          A másodrendű parciális deriváltak korlátja <M t="M = 3" /> (<M t="|f_{zz}| = |-3\sin z| \le 3" />), így a{' '}
          <M t="|x-2|\le 0{,}01,\; |y-1|\le 0{,}02,\; |z|\le 0{,}01" /> téglatesten{' '}
          <M t="|E| \le \frac{1}{2}(3)(0{,}04)^2 = \mathbf{0{,}0024}" />!
        </p>

        <ErrorPropagation3DWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={<>Add meg az <M t="f(x, y, z) = \sqrt{x^2 + y^2 + z^2}" /> linearizációját az <M t="(1, 2, 2)" /> pontban!</>}
        >
          <p>
            <M t="f(1,2,2)=3" />, <M t="\nabla f(1,2,2) = \langle \frac{1}{3}, \frac{2}{3}, \frac{2}{3}\rangle" />.{' '}
            <M t="L(x,y,z) = 3 + \frac{1}{3}(x-1) + \frac{2}{3}(y-2) + \frac{2}{3}(z-2) = \mathbf{\frac{1}{3}x + \frac{2}{3}y + \frac{2}{3}z}" />!
          </p>
        </Task>
        <Task
          n={14}
          q={<>Írd fel a teljes differenciált (<M t="dw" />): <M t="w = x y \ln z" />!</>}
        >
          <p>
            <M t="dw = (y\ln z)\,dx + (x\ln z)\,dy + \frac{xy}{z}\,dz" />.
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
        <TangentDiffSummaryDiagram />

        <Def title="14.6 Puskakártya — Minden képlet egy helyen">
          <ul>
            <li><strong>Szintfelület érintősíkja:</strong> <M t="F_x(P_0)(x-x_0) + F_y(P_0)(y-y_0) + F_z(P_0)(z-z_0) = 0" />.</li>
            <li><strong>Grafikon érintősíkja (<M t="z=f(x,y)" />):</strong> <M t="z - z_0 = f_x(x_0,y_0)(x-x_0) + f_y(x_0,y_0)(y-y_0)" />.</li>
            <li><strong>Metszésvonal érintője:</strong> <M t="\mathbf{v} = \nabla f(P_0) \times \nabla g(P_0)" />.</li>
            <li><strong>Teljes differenciál:</strong> <M t="df = f_x\,dx + f_y\,dy + f_z\,dz" />, hibakorlát: <M t="\frac{1}{2}M(|\Delta x|+|\Delta y|)^2" />.</li>
          </ul>
        </Def>

        <Warn>
          <strong>5 tipikus buktató a 14.6-ban:</strong>
          <ol style={{ margin: '6px 0 0 18px' }}>
            <li>Az érintősík egyenletében a parciális deriváltakba <strong>elfelejteni behelyettesíteni <M t="P_0" />-t</strong> (sík egyenletében a szorzók számok, nem függvények!).</li>
            <li>A <M t="z = f(x, y)" /> felületnél elfelejteni a <M t="-(z-z_0)" /> tagot (a normális <M t="\langle f_x, f_y, -1\rangle" />!).</li>
            <li>Relatív hibabecslésnél negatív előjelű tagot kivonni: a maximális hibához mindig <strong>abszolút értékek összegét</strong> kell venni (háromszög-egyenlőtlenség!).</li>
            <li>A <M t="df = (\nabla f \cdot \mathbf{u})\,ds" /> képletben nem egységvektort használni <M t="\mathbf{u}" />-nak.</li>
            <li>A hibakorlátban a <M t="\frac{1}{2}" /> tényezőt vagy a négyzetet elfelejteni.</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={<>Írd fel a <M t="z = 3x^2 - y^2" /> felület érintősíkját a <M t="(1, 2, -1)" /> pontban!</>}
        >
          <p>
            <M t="f_x(1,2)=6,\; f_y(1,2)=-4 \implies z + 1 = 6(x-1) - 4(y-2) \iff \mathbf{z = 6x - 4y + 1}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={<>Írd fel az <M t="x^2 + y^2 + z^2 = 9" /> gömb érintősíkját és normálegyenesét a <M t="(2, -1, 2)" /> pontban!</>}
        >
          <p>
            <M t="\nabla F = \langle 4, -2, 4\rangle \parallel \langle 2, -1, 2\rangle" />. Érintősík:{' '}
            <M t="\mathbf{2x - y + 2z = 9}" />. Normálegyenes: <M t="x=2+2t,\; y=-1-t,\; z=2+2t" />.
          </p>
        </Task>
        <Task
          n={17}
          q={<>Írd fel a <M t="z = \ln(x + 2y)" /> teljes differenciálját (<M t="dz" />)!</>}
        >
          <p>
            <M t="dz = \frac{1}{x+2y}\,dx + \frac{2}{x+2y}\,dy" />.
          </p>
        </Task>

        <h3>Közepes gyakorlófeladatok</h3>
        <Task
          n={18}
          q={<>Becsüld meg <M t="(1{,}02)^3 \cdot (1{,}97)^2" /> értékét az <M t="f(x, y) = x^3 y^2" /> linearizációjával az <M t="(1, 2)" /> pontban!</>}
        >
          <p>
            <M t="f(1,2)=4,\; f_x(1,2)=12,\; f_y(1,2)=4" />.{' '}
            <M t="L(1{,}02,\; 1{,}97) = 4 + 12(0{,}02) + 4(-0{,}03) = 4 + 0{,}24 - 0{,}12 = \mathbf{4{,}12}" />{' '}
            (pontos: <M t="\approx 4{,}118" />!).
          </p>
        </Task>
        <Task
          n={19}
          q={<>Két ellenállás párhuzamosan kötve: <M t="\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2}" />. Ha <M t="R_1 = 30\;\Omega \pm 0{,}3\;\Omega" /> és <M t="R_2 = 60\;\Omega \pm 0{,}6\;\Omega" />, becsüld meg <M t="R" /> maximális hibáját!</>}
        >
          <p>
            <M t="R = 20\;\Omega" />. Differenciálva <M t="-\frac{dR}{R^2} = -\frac{dR_1}{R_1^2} - \frac{dR_2}{R_2^2} \implies |dR| \le 400\left(\frac{0{,}3}{900} + \frac{0{,}6}{3600}\right) = \mathbf{0{,}2\;\Omega}" />{' '}
            (pontosan 1%!).
          </p>
        </Task>
        <Task
          n={20}
          q={<>Határozd meg az <M t="z = x^2 + y^2" /> paraboloid és a <M t="z = 2x + 4y - 4" /> sík metszésvonalának érintőegyenesét a <M t="(1, 1, 2)" /> pontban!</>}
        >
          <p>
            <M t="\nabla(x^2+y^2-z) = \langle 2, 2, -1\rangle" />, <M t="\nabla(2x+4y-z) = \langle 2, 4, -1\rangle" />.
            Keresztszorzat: <M t="\mathbf{v} = \langle 2, 0, 4\rangle \parallel \langle 1, 0, 2\rangle" />. Egyenes:{' '}
            <M t="x=1+t,\; y=1,\; z=2+2t" />.
          </p>
        </Task>

        <h3>Haladó gyakorlófeladatok</h3>
        <Task
          n={21}
          q={<>Mutasd meg, hogy az <M t="xyz = 1" /> felület bármely <M t="(a, b, c)" /> pontjában az érintősík által a koordinátasíkokkal bezárt tetraéder térfogata <strong>állandó</strong> (<M t="\frac{9}{2}" />)!</>}
        >
          <p>
            <M t="\nabla(xyz) = \langle bc, ac, ab\rangle" />. Az érintősík <M t="bc(x-a) + ac(y-b) + ab(z-c) = 0 \iff \frac{x}{3a} + \frac{y}{3b} + \frac{z}{3c} = 1" />.
            Tengelymetszetek <M t="3a, 3b, 3c" />, a tetraéder térfogata <M t="\frac{1}{6}(3a)(3b)(3c) = \frac{27}{6}abc = \mathbf{\frac{9}{2}}" />!
          </p>
        </Task>
        <Task
          n={22}
          q={<>Mely pontokban párhuzamos a <M t="z = x^2 + 2y^2" /> paraboloid érintősíkja a <M t="2x - 8y - z = 5" /> síkkal?</>}
        >
          <p>
            A normálvektorok egyenlősége: <M t="\langle 2x, 4y, -1\rangle = \langle 2, -8, -1\rangle \implies x = 1,\; y = -2" />.
            A pont: <M t="\mathbf{(1, -2, 9)}" />!
          </p>
        </Task>
        <Task
          n={23}
          q={<>Egy inga lengésideje <M t="T = 2\pi\sqrt{L/g}" />. Ha <M t="L" />-et 0,5%-kal túl nagyra, <M t="g" />-t pedig 0,3%-kal túl kicsire mérjük, hány százalékkal tér el a számolt <M t="T" />?</>}
        >
          <p>
            <M t="\frac{dT}{T} = \frac{1}{2}\frac{dL}{L} - \frac{1}{2}\frac{dg}{g} = \frac{1}{2}(+0{,}5\%) - \frac{1}{2}(-0{,}3\%) = \mathbf{+0{,}4\%}" />!
          </p>
        </Task>
      </>
    ),
  },
];
