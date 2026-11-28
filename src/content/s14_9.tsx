import type { Page } from './s1_1';
import { M } from '../components/M';
import { Def, Story, Task, Warn, Quiz, Steps } from '../components/ui';
import {
  ConstrainedSlice3DWidget,
  IndependentDependentSwitchWidget,
  DifferentialEliminationWidget,
  TwoConstraintsSystemWidget,
  PolarParadoxWidget,
  CyclicRuleThermodynamicsWidget,
  IsochoricVsIsobaricWidget,
  ConstrainedDiffSummaryDiagram,
} from '../components/Widgets149';

export const S14_9: Page[] = [
  /* ── 1. OLDAL ── */
  {
    title: '1. Miért félrevezető önmagában a ∂w/∂x jelölés?',
    body: (
      <>
        <Story>
          A fizikában, kémiában és közgazdaságtanban a változók ritkán függetlenek egymástól. Egy gáz nyomása (<M t="P" />),
          térfogata (<M t="V" />) és hőmérséklete (<M t="T" />) között például fennáll a <M t="PV = nRT" /> állapotegyenlet.
          Ha megkérdezik, milyen gyorsan változik a gáz energiája <M t="T" /> növelésekor, a válasz <strong>attól függ,
          hogy közben a térfogatot vagy a nyomást tartjuk-e állandónak</strong>!
        </Story>

        <Def title="A feltételes parciális derivált jelölése">
          <p>
            Ha <M t="w = f(x, y, z)" />, és a változókat egy <M t="g(x, y, z) = 0" /> mellékfeltétel köti össze, akkor
            két változó független, a harmadik pedig függő. A rögzítve tartott független változót <strong>alsó indexben</strong>
            tüntetjük fel:
          </p>
          <M block t="\left(\frac{\partial w}{\partial x}\right)_y \quad\text{(}x, y\text{ független, }y\text{ állandó, }z\text{ függő)}" />
          <M block t="\left(\frac{\partial w}{\partial x}\right)_z \quad\text{(}x, z\text{ független, }z\text{ állandó, }y\text{ függő)}" />
          <p>
            Általában <M t="\left(\frac{\partial w}{\partial x}\right)_y \ne \left(\frac{\partial w}{\partial x}\right)_z" />!
          </p>
        </Def>

        <ConstrainedSlice3DWidget />

        <Task n={1} q={<>Legyen <M t="w = x^2 + y^2 + z^2" />, ahol <M t="z = x^2 + y^2" />. Számítsd ki <M t="\left(\frac{\partial w}{\partial x}\right)_y" /> és <M t="\left(\frac{\partial w}{\partial x}\right)_z" /> értékét a <M t="(1, 1, 2)" /> pontban!</>}>
          <p>
            • <strong>Ha <M t="y" /> rögzített (<M t="x, y" /> független):</strong> behelyettesítjük <M t="z = x^2+y^2" />-et:
            <M t="w = (x^2+y^2) + (x^2+y^2)^2" />, így <M t="\left(\frac{\partial w}{\partial x}\right)_y = 2x + 4x(x^2+y^2)" />.
            A <M t="(1,1,2)" /> pontban ez <M t="2 + 4\cdot 2 = 10" />.
            <br />
            • <strong>Ha <M t="z" /> rögzített (<M t="x, z" /> független):</strong> <M t="x^2 + y^2 = z" />, így <M t="w = z + z^2" />
            (nem is szerepel benne <M t="x" />!). Ezért <M t="\left(\frac{\partial w}{\partial x}\right)_z = 0" /> mindenütt!
          </p>
        </Task>

        <Task n={2} q={<>Legyen <M t="w = x + 2y + 3z" />, ahol <M t="z = x - y" />. Mennyi <M t="\left(\frac{\partial w}{\partial x}\right)_y" /> és mennyi <M t="\left(\frac{\partial w}{\partial x}\right)_z" />?</>}>
          <p>
            • <M t="y" /> rögzítve (<M t="z = x - y" />): <M t="w = x + 2y + 3(x-y) = 4x - y \implies \left(\frac{\partial w}{\partial x}\right)_y = 4" />.
            <br />
            • <M t="z" /> rögzítve (<M t="y = x - z" />): <M t="w = x + 2(x-z) + 3z = 3x + z \implies \left(\frac{\partial w}{\partial x}\right)_z = 3" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ── 2. OLDAL ── */
  {
    title: '2. A behelyettesítéses módszer (3 biztos lépés)',
    body: (
      <>
        <Story>
          Ha a mellékfeltétel elég egyszerű ahhoz, hogy a függő változót algebrailag kifejezzük belőle, a feladat
          visszavezethető a már jól ismert 14.3-as parciális deriválásra. Az egyetlen titok: <strong>először mindig
          tisztázd, melyik változók a függetlenek és melyik a függő!</strong>
        </Story>

        <Steps
          title="A behelyettesítéses recept: w = x² + y² + z², x + y + z = 1"
          problem={<>Határozd meg <M t="\left(\frac{\partial w}{\partial x}\right)_y" /> és <M t="\left(\frac{\partial w}{\partial x}\right)_z" /> értékét az <M t="x + y + z = 1" /> síkon!</>}
          steps={[
            {
              title: '1. Változók szereposztása',
              body: (
                <>
                  • <M t="\left(\frac{\partial w}{\partial x}\right)_y" /> esetén a függetlenek <M t="(x, y)" />, a függő <M t="z" />.
                  <br />• <M t="\left(\frac{\partial w}{\partial x}\right)_z" /> esetén a függetlenek <M t="(x, z)" />, a függő <M t="y" />.
                </>
              ),
            },
            {
              title: '2. A függő változó kiküszöbölése',
              body: (
                <>
                  • <M t="z = 1 - x - y \implies w(x,y) = x^2 + y^2 + (1-x-y)^2" />.
                  <br />• <M t="y = 1 - x - z \implies w(x,z) = x^2 + (1-x-z)^2 + z^2" />.
                </>
              ),
            },
            {
              title: '3. Szokásos parciális deriválás',
              body: (
                <>
                  <M block t="\left(\frac{\partial w}{\partial x}\right)_y = 2x - 2(1-x-y) = 4x + 2y - 2, \qquad \left(\frac{\partial w}{\partial x}\right)_z = 4x + 2z - 2." />
                </>
              ),
            },
          ]}
        />

        <IndependentDependentSwitchWidget />

        <Quiz
          q={<>Ha <M t="w = xyz" /> és <M t="x + y + z = 6" />, melyik változót kell kiküszöbölni <M t="\left(\frac{\partial w}{\partial y}\right)_z" /> kiszámításához?</>}
          options={[
            { label: 'z-t' },
            { label: 'y-t' },
            { label: 'x-et (mert y és z a két független változó!)', ok: true },
          ]}
          explain={<>A jelölésben y szerint deriválunk és z az alsó index (rögzített) — tehát (y, z) a független pár, és x = 6 − y − z a függő változó!</>}
        />

        <Task n={3} q={<>Számítsd ki <M t="\left(\frac{\partial w}{\partial y}\right)_z" /> értékét a <M t="w = xyz" />, <M t="x + y + z = 6" /> feladatban a <M t="(1, 2, 3)" /> pontban!</>}>
          <p>
            Függő változó: <M t="x = 6 - y - z" />. Behelyettesítve: <M t="w(y,z) = (6 - y - z)yz = 6yz - y^2 z - yz^2" />.
            Deriválva <M t="y" /> szerint (<M t="z" /> állandó):
            <M block t="\left(\frac{\partial w}{\partial y}\right)_z = 6z - 2yz - z^2." />
            A <M t="(1,2,3)" /> pontban: <M t="18 - 12 - 9 = -3" />.
          </p>
        </Task>

        <Task n={4} q={<>Egy derékszögű henger térfogata <M t="V = \pi r^2 h" />, felszíne <M t="A = 2\pi r^2 + 2\pi rh" />. Határozd meg <M t="\left(\frac{\partial V}{\partial r}\right)_A" /> értékét!</>}>
          <p>
            Az <M t="A" /> rögzített, <M t="h" /> függő: <M t="2\pi rh = A - 2\pi r^2 \implies h = \frac{A}{2\pi r} - r" />.
            Beírva a térfogatba: <M t="V(r, A) = \pi r^2\left(\frac{A}{2\pi r} - r\right) = \frac{1}{2}Ar - \pi r^3" />.
            Deriválva <M t="r" /> szerint (<M t="A" /> állandó):
            <M block t="\left(\frac{\partial V}{\partial r}\right)_A = \frac{1}{2}A - 3\pi r^2 = \pi rh - 2\pi r^2." />
            (Észreveheted: ez pont akkor <M t="0" />, amikor <M t="h = 2r" /> — a 14.8-as optimális henger!)
          </p>
        </Task>
      </>
    ),
  },

  /* ── 3. OLDAL ── */
  {
    title: '3. A totális differenciálok (implicit) módszere',
    body: (
      <>
        <Story>
          Mi történik, ha a mellékfeltétel olyan, mint <M t="z^3 - xy + yz + y^3 = 2" />? Innen senki sem fogja zárt
          képlettel kifejezni <M t="z" />-t! A 14.6-ban megismert <strong>totális differenciál</strong> viszont ilyenkor
          is pillanatok alatt, tiszta lineáris algebrával célba ér!
        </Story>

        <Def title="A differenciálos módszer 4 lépése">
          <ol>
            <li>Írd fel mindkét egyenlet totális differenciálját: <M t="dw = w_x dx + w_y dy + w_z dz" /> és <M t="dg = g_x dx + g_y dy + g_z dz = 0" />.</li>
            <li>Ha adott pontban számolsz, <strong>már itt helyettesítsd be a számokat</strong> — sokkal egyszerűbb lesz!</li>
            <li>Tedd nullává a rögzített változó differenciálját (pl. <M t="y" /> rögzített ⇒ <M t="dy = 0" />).</li>
            <li>A <M t="dg = 0" /> egyenletből fejezd ki a függő változó differenciálját (pl. <M t="dz" />), írd be <M t="dw" />-be, és olvasd le <M t="dx" /> együtthatóját!</li>
          </ol>
        </Def>

        <DifferentialEliminationWidget />

        <Task n={5} q={<>Számítsd ki <M t="\left(\frac{\partial w}{\partial x}\right)_y" /> értékét a <M t="(1, 1, 1)" /> pontban, ha <M t="w = x^2 + y^2 + z^2" /> és <M t="x^3 + yz + z^3 = 3" />!</>}>
          <p>
            Totális differenciálok: <M t="dw = 2x\,dx + 2y\,dy + 2z\,dz" /> és <M t="3x^2\,dx + z\,dy + (y + 3z^2)\,dz = 0" />.
            A <M t="(1,1,1)" /> pontban: <M t="dw = 2\,dx + 2\,dy + 2\,dz" /> és <M t="3\,dx + dy + 4\,dz = 0" />.
            Mivel <M t="y" /> rögzített (<M t="dy = 0" />): <M t="3\,dx + 4\,dz = 0 \implies dz = -\frac{3}{4}\,dx" />.
            Beírva: <M t="dw = 2\,dx + 2\left(-\frac{3}{4}\,dx\right) = \frac{1}{2}\,dx" /> ⇒ <M t="\left(\frac{\partial w}{\partial x}\right)_y = \frac{1}{2}" />.
          </p>
        </Task>

        <Task n={6} q={<>Határozd meg <M t="\left(\frac{\partial w}{\partial y}\right)_x" /> értékét az előző feladat <M t="(1, 1, 1)" /> pontjában!</>}>
          <p>
            Most <M t="x" /> rögzített (<M t="dx = 0" />): a <M t="3\,dx + dy + 4\,dz = 0" /> egyenletből <M t="dy + 4\,dz = 0 \implies dz = -\frac{1}{4}\,dy" />.
            Így <M t="dw = 2\,dy + 2\left(-\frac{1}{4}\,dy\right) = \frac{3}{2}\,dy \implies \left(\frac{\partial w}{\partial y}\right)_x = \frac{3}{2}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ── 4. OLDAL ── */
  {
    title: '4. Több mellékfeltétel: 4 változó, 2 egyenlet',
    body: (
      <>
        <Story>
          A differenciálos módszer igazi ereje akkor látszik, amikor <strong>több mellékfeltétel</strong> van egyszerre.
          Ha 4 változót (<M t="x, y, z, u" />) két egyenlet köt össze, akkor <M t="4 - 2 = 2" /> független változó marad,
          a másik kettő differenciálját pedig egy egyszerű <M t="2\times 2" />-es lineáris egyenletrendszerből kapjuk meg!
        </Story>

        <TwoConstraintsSystemWidget />

        <Steps
          title="Thomas 3. példa mintájára: két mellékfeltétel kezelése"
          problem={<>Legyen <M t="w = x^2 + y^2 + z^2" />, ahol <M t="x + y + z = 3" /> és <M t="x - y + 2z = 2" />. Számítsd ki <M t="\left(\frac{\partial w}{\partial x}\right)" /> értékét a <M t="(1, 1, 1)" /> pontban! (Itt 3 változó − 2 feltétel = 1 szabadsági fok!)</>}
          steps={[
            {
              title: '1. Differenciálok felírása (1, 1, 1)-ben',
              body: (
                <>
                  <M block t="dw = 2\,dx + 2\,dy + 2\,dz" />
                  <M block t="dx + dy + dz = 0, \qquad dx - dy + 2\,dz = 0." />
                </>
              ),
            },
            {
              title: '2. A két függő differenciál (dy, dz) kifejezése dx-szel',
              body: (
                <>
                  Adjuk össze a két feltételt: <M t="2\,dx + 3\,dz = 0 \implies dz = -\frac{2}{3}\,dx" />.
                  Az elsőből: <M t="dy = -dx - dz = -dx + \frac{2}{3}\,dx = -\frac{1}{3}\,dx" />.
                </>
              ),
            },
            {
              title: '3. Behelyettesítés dw-be',
              body: (
                <>
                  <M block t="dw = 2\,dx + 2\left(-\frac{1}{3}\,dx\right) + 2\left(-\frac{2}{3}\,dx\right) = \left(2 - \frac{2}{3} - \frac{4}{3}\right)dx = 0 \implies \frac{dw}{dx} = 0." />
                  (Megjegyzés: mivel csak 1 független változó maradt, ez már közönséges derivált!)
                </>
              ),
            },
          ]}
        />

        <Task n={7} q={<>Adott 4 változó (<M t="x, y, z, u" />) és 2 feltétel: <M t="u = x^2 + y^2 + z^2" /> és <M t="x + y + z = v" /> (rögzített <M t="v" /> paraméterrel). Számítsd ki <M t="\left(\frac{\partial u}{\partial x}\right)_{y,v}" /> értékét!</>}>
          <p>
            Mivel <M t="y" /> és <M t="v" /> rögzített (<M t="dy = 0, \; dv = 0" />), a második feltétel differenciálja:
            <M t="dx + dz = 0 \implies dz = -dx" />.
            Az elsőből: <M t="du = 2x\,dx + 2z\,dz = (2x - 2z)\,dx" />.
            Így <M t="\left(\frac{\partial u}{\partial x}\right)_{y,v} = 2(x - z)" />.
          </p>
        </Task>

        <Task n={8} q={<>Ha <M t="x = u + v" /> és <M t="y = u - v" />, fejezd ki <M t="\left(\frac{\partial u}{\partial x}\right)_y" /> és <M t="\left(\frac{\partial u}{\partial x}\right)_v" /> értékét! Miért különböző a kettő?</>}>
          <p>
            • <M t="y" /> rögzítve: a két egyenletet összeadva <M t="2u = x + y \implies u = \frac{x+y}{2}" />, így <M t="\left(\frac{\partial u}{\partial x}\right)_y = \frac{1}{2}" />.
            <br />
            • <M t="v" /> rögzítve: az elsőből <M t="u = x - v" />, így <M t="\left(\frac{\partial u}{\partial x}\right)_v = 1" />!
            Ugyanannak a függvénynek kétszerese a deriváltja attól függően, hogy <M t="y" />-t vagy <M t="v" />-t tartjuk fixen!
          </p>
        </Task>
      </>
    ),
  },

  /* ── 5. OLDAL ── */
  {
    title: '5. A polár-paradoxon és a reciprok-szabály',
    body: (
      <>
        <Story>
          Egyváltozós kalkulusban hozzászoktunk, hogy <M t="\frac{dx}{dr} = \frac{1}{dr/dx}" />. Több változóban
          viszont ez az egyik <strong>legveszélyesebb tévhit</strong>! Nézzük meg a polárkoordinátákat:
          <M t="x = r\cos\theta" />, <M t="y = r\sin\theta" /> — itt <M t="\left(\frac{\partial x}{\partial r}\right)_\theta" />
          és <M t="\left(\frac{\partial r}{\partial x}\right)_y" /> <em>nem</em> egymás reciproka, hanem <strong>egyenlők</strong>!
        </Story>

        <Def title="A helyes reciprok-szabály több változóban">
          <p>
            A reciprok-szabály <strong>kizárólag akkor</strong> igaz, ha a számláló és nevező felcserélése közben
            <strong>ugyanazt a változót tartjuk rögzítve</strong>:
          </p>
          <M block t="\left(\frac{\partial x}{\partial r}\right)_\theta = \frac{1}{\left(\frac{\partial r}{\partial x}\right)_\theta} \qquad\text{(IGAZ!)}" />
          <p>
            Ezzel szemben különböző rögzített változókkal:
          </p>
          <M block t="\left(\frac{\partial x}{\partial r}\right)_\theta = \cos\theta, \qquad \left(\frac{\partial r}{\partial x}\right)_y = \frac{x}{\sqrt{x^2+y^2}} = \cos\theta \ne \frac{1}{\cos\theta}!" />
        </Def>

        <PolarParadoxWidget />

        <Quiz
          q={<>Polárkoordinátákban (<M t="x = r\cos\theta, \; y = r\sin\theta" />) mennyi <M t="\left(\frac{\partial r}{\partial x}\right)_\theta" />?</>}
          options={[
            { label: 'cos θ' },
            { label: '1 / cos θ = sec θ', ok: true },
            { label: 'sin θ' },
          ]}
          explain={<>Mivel θ van rögzítve, az x = r·cos θ egyenletből r = x / cos θ, tehát (∂r/∂x)_θ = 1 / cos θ — itt tényleg teljesül a reciprok-szabály!</>}
        />

        <Task n={9} q={<>Számítsd ki polárkoordinátákban <M t="\left(\frac{\partial y}{\partial \theta}\right)_r" /> és <M t="\left(\frac{\partial \theta}{\partial y}\right)_x" /> értékét, és hasonlítsd össze őket!</>}>
          <p>
            • <M t="y = r\sin\theta \implies \left(\frac{\partial y}{\partial \theta}\right)_r = r\cos\theta" />.
            <br />
            • <M t="\theta = \operatorname{arctg}(y/x)" /> (<M t="x > 0" /> esetén) ⇒
            <M t="\left(\frac{\partial \theta}{\partial y}\right)_x = \frac{1/x}{1 + y^2/x^2} = \frac{x}{x^2+y^2} = \frac{r\cos\theta}{r^2} = \frac{\cos\theta}{r}" />.
            Itt sem egymás reciproka a kettő! (A szorzatuk <M t="\cos^2\theta" />, nem <M t="1" />!)
          </p>
        </Task>

        <Task n={10} q={<>Ellenőrizd, hogy <M t="\left(\frac{\partial x}{\partial r}\right)_y = \frac{1}{\left(\frac{\partial r}{\partial x}\right)_y}" /> viszont tényleg igaz polárkoordinátákban!</>}>
          <p>
            Ha <M t="y" /> rögzített, akkor <M t="x = \sqrt{r^2 - y^2}" /> (<M t="x > 0" />). Deriválva <M t="r" /> szerint:
            <M block t="\left(\frac{\partial x}{\partial r}\right)_y = \frac{r}{\sqrt{r^2 - y^2}} = \frac{r}{x} = \frac{1}{\cos\theta} = \frac{1}{\left(\frac{\partial r}{\partial x}\right)_y}." />
            Azonos rögzített változóval (<M t="y" />) tökéletesen működik a reciprok-szabály!
          </p>
        </Task>
      </>
    ),
  },

  /* ── 6. OLDAL ── */
  {
    title: '6. A ciklikus szabály (hármas szorzat-azonosság = −1)',
    body: (
      <>
        <Story>
          Íme a többváltozós kalkulus egyik legmeglepőbb azonossága: ha három változót egyetlen egyenlet
          (<M t="F(x, y, z) = 0" />) köt össze, és összeszorozzuk a három ciklikus parciális deriváltat, az eredmény
          nem <M t="+1" />, hanem mindig <strong><M t="-1" /></strong>!
        </Story>

        <Def title="A ciklikus szabály (Euler-féle láncszabály)">
          <p>
            Ha <M t="F(x, y, z) = 0" /> simán definiálja mindhárom változót a másik kettő függvényeként
            (<M t="F_x, F_y, F_z \ne 0" />), akkor a 14.4-es implicit deriválási képletből:
          </p>
          <M block t="\left(\frac{\partial x}{\partial y}\right)_z \left(\frac{\partial y}{\partial z}\right)_x \left(\frac{\partial z}{\partial x}\right)_y = \left(-\frac{F_y}{F_x}\right)\left(-\frac{F_z}{F_y}\right)\left(-\frac{F_x}{F_z}\right) = -1." />
          <p>
            Gyakran használatos átrendezett alakja:
            <M block t="\left(\frac{\partial z}{\partial x}\right)_y = -\left(\frac{\partial z}{\partial y}\right)_x \left(\frac{\partial y}{\partial x}\right)_z." />
          </p>
        </Def>

        <CyclicRuleThermodynamicsWidget />

        <Task n={11} q={<>Ellenőrizd a ciklikus szabályt az <M t="x^2 + y^2 + z^2 = 9" /> gömb egyenletére (az első oktánsban)!</>}>
          <p>
            <M t="\left(\frac{\partial x}{\partial y}\right)_z = -\frac{y}{x}" />,
            <M t="\left(\frac{\partial y}{\partial z}\right)_x = -\frac{z}{y}" />,
            <M t="\left(\frac{\partial z}{\partial x}\right)_y = -\frac{x}{z}" />.
            Szorzatuk: <M t="\left(-\frac{y}{x}\right)\left(-\frac{z}{y}\right)\left(-\frac{x}{z}\right) = -1" />!
          </p>
        </Task>

        <Task n={12} q={<>Egy anyag izoterm kompresszibilitása <M t="\kappa_T = -\frac{1}{V}\left(\frac{\partial V}{\partial P}\right)_T" />, hőtágulási együtthatója <M t="\alpha = \frac{1}{V}\left(\frac{\partial V}{\partial T}\right)_P" />. Fejezd ki a ciklikus szabállyal <M t="\left(\frac{\partial P}{\partial T}\right)_V" />-t <M t="\alpha" /> és <M t="\kappa_T" /> segítségével!</>}>
          <p>
            A ciklikus szabály szerint:
            <M block t="\left(\frac{\partial P}{\partial T}\right)_V = -\frac{\left(\frac{\partial V}{\partial T}\right)_P}{\left(\frac{\partial V}{\partial P}\right)_T} = -\frac{\alpha V}{-\kappa_T V} = \frac{\alpha}{\kappa_T}." />
            Ez a fizika egyik legfontosabb képlete: megmondja, mekkora feszültség (nyomásnövekedés) ébred egy befogott
            fémrúdban vagy folyadékban, ha felmelegítjük!
          </p>
        </Task>
      </>
    ),
  },

  /* ── 7. OLDAL ── */
  {
    title: '7. Termodinamika a gyakorlatban: miért nagyobb C_P, mint C_V?',
    body: (
      <>
        <Story>
          A termodinamika a feltételes parciális deriváltak „őshazája”. Képzelj el két egyforma gázpalackot: az egyik
          dugattyúja le van csavarozva (<strong>állandó térfogat</strong>), a másiké szabadon mozog (<strong>állandó
          nyomás</strong>). Ha mindkettőt <M t="+1\text{ K}" />-nel felmelegítjük, melyikhez kell több hő? A szabad
          dugattyúshoz — mert az a melegítés közben tágul és emeli a dugattyút!
        </Story>

        <Def title="Hőkapacitások és a Mayer-reláció levezetése">
          <p>
            Ideális gáz belső energiája csak a hőmérséklettől függ: <M t="U = U(T)" />, az entalpia pedig
            <M t="H = U + PV = U(T) + nRT" />.
          </p>
          <M block t="C_V = \left(\frac{\partial U}{\partial T}\right)_V = U'(T), \qquad C_P = \left(\frac{\partial H}{\partial T}\right)_P = U'(T) + nR." />
          <p>
            Kivonva egymásból azonnal adódik a híres <strong>Mayer-reláció</strong>:
          </p>
          <M block t="C_P - C_V = nR." />
        </Def>

        <IsochoricVsIsobaricWidget />

        <Quiz
          q={<>Ha egy gáz belső energiáját <M t="U(T, V)" /> alakban adjuk meg, melyik láncszabály-formula adja meg <M t="\left(\frac{\partial U}{\partial T}\right)_P" />-t?</>}
          options={[
            { label: '(∂U/∂T)_V', },
            { label: '(∂U/∂T)_V + (∂U/∂V)_T · (∂V/∂T)_P', ok: true },
            { label: '(∂U/∂V)_T · (∂T/∂V)_P' },
          ]}
          explain={<>A totális differenciál dU = (∂U/∂T)_V dT + (∂U/∂V)_T dV. Ha P rögzített és elosztunk dT-vel, pontosan (∂U/∂T)_P = (∂U/∂T)_V + (∂U/∂V)_T · (∂V/∂T)_P adódik!</>}
        />

        <Task n={13} q={<>Egy valódi gáz belső energiájára <M t="dU = C_V\,dT + \left(\frac{\partial U}{\partial V}\right)_T dV" />. Fejezd ki <M t="\left(\frac{\partial U}{\partial P}\right)_T" />-t <M t="\left(\frac{\partial U}{\partial V}\right)_T" /> segítségével!</>}>
          <p>
            Rögzített hőmérsékleten (<M t="dT = 0" />) a fenti egyenlet: <M t="dU = \left(\frac{\partial U}{\partial V}\right)_T dV" />.
            Elosztva <M t="dP" />-vel (továbbra is <M t="T" /> rögzítése mellett):
            <M block t="\left(\frac{\partial U}{\partial P}\right)_T = \left(\frac{\partial U}{\partial V}\right)_T \left(\frac{\partial V}{\partial P}\right)_T." />
          </p>
        </Task>

        <Task n={14} q={<>Ideális gáznál (<M t="PV = nRT" />) mennyi az izoterm kompresszibilitás <M t="\kappa_T = -\frac{1}{V}\left(\frac{\partial V}{\partial P}\right)_T" /> és a hőtágulási együttható <M t="\alpha = \frac{1}{V}\left(\frac{\partial V}{\partial T}\right)_P" />?</>}>
          <p>
            <M t="V = \frac{nRT}{P}" /> alapján:
            <br />• <M t="\left(\frac{\partial V}{\partial P}\right)_T = -\frac{nRT}{P^2} = -\frac{V}{P} \implies \kappa_T = \frac{1}{P}" />.
            <br />• <M t="\left(\frac{\partial V}{\partial T}\right)_P = \frac{nR}{P} = \frac{V}{T} \implies \alpha = \frac{1}{T}" />.
            (És ellenőrzésképp: <M t="\frac{\alpha}{\kappa_T} = \frac{P}{T} = \frac{nR}{V} = \left(\frac{\partial P}{\partial T}\right)_V" />!)
          </p>
        </Task>
      </>
    ),
  },

  /* ── 8. OLDAL ── */
  {
    title: '8. Összefoglalás, buktatók és 9 lépcsőzetes gyakorlófeladat',
    body: (
      <>
        <ConstrainedDiffSummaryDiagram />

        <Def title="Puskakártya — 14.9 Feltételes parciális deriváltak">
          <ul>
            <li><strong>Jelölés:</strong> <M t="\left(\frac{\partial w}{\partial x}\right)_y" /> = deriválás <M t="x" /> szerint, <M t="y" /> rögzítve, a többi változó a feltételekből alkalmazkodik.</li>
            <li><strong>Behelyettesítés:</strong> fejezd ki a függő változót a függetlenekkel, majd deriválj!</li>
            <li><strong>Differenciálos módszer:</strong> írd fel <M t="dw" />-t és <M t="dg = 0" />-t, állítsd a rögzített differenciált <M t="0" />-ra, küszöböld ki a függő differenciált!</li>
            <li><strong>Reciprok-szabály:</strong> <M t="\left(\frac{\partial x}{\partial y}\right)_z = 1 \big/ \left(\frac{\partial y}{\partial x}\right)_z" /> (azonos alsó index!).</li>
            <li><strong>Ciklikus szabály:</strong> <M t="\left(\frac{\partial x}{\partial y}\right)_z \left(\frac{\partial y}{\partial z}\right)_x \left(\frac{\partial z}{\partial x}\right)_y = -1" />.</li>
          </ul>
        </Def>

        <Warn>
          <strong>5 klasszikus vizsgabuktató:</strong>
          <ol>
            <li><strong>A „csupasz” <M t="\frac{\partial w}{\partial x}" /> leírása:</strong> Mellékfeltétel mellett mindig írd ki az alsó indexet, különben nem egyértelmű!</li>
            <li><strong>Téves „egyszerűsítés” a ciklikus szabályban:</strong> A hármas szorzat eredménye <strong><M t="-1" /></strong>, NEM <M t="+1" />!</li>
            <li><strong>Téves reciprok különböző rögzített változóval:</strong> <M t="\left(\frac{\partial x}{\partial r}\right)_\theta \ne 1 / \left(\frac{\partial r}{\partial x}\right)_y" />!</li>
            <li><strong>Rossz változó kiküszöbölése:</strong> <M t="\left(\frac{\partial w}{\partial x}\right)_y" /> esetén <M t="z" />-t (a nem említett változót) kell kiküszöbölni, nem <M t="y" />-t!</li>
            <li><strong>Elfelejtett <M t="g_z = 0" /> szingularitás:</strong> Ha a függő változó differenciáljának együtthatója <M t="0" /> a vizsgált pontban, a feltételes derivált ott nem létezhet.</li>
          </ol>
        </Warn>

        <h3>Könnyebb feladatok (15–17.)</h3>

        <Task n={15} q={<>Legyen <M t="w = x^2 + y^2 - z^2" /> és <M t="z = x + y" />. Számítsd ki <M t="\left(\frac{\partial w}{\partial x}\right)_y" /> és <M t="\left(\frac{\partial w}{\partial x}\right)_z" /> kifejezését!</>}>
          <p>
            • <M t="y" /> rögzítve (<M t="z = x + y" />): <M t="w = x^2 + y^2 - (x+y)^2 = -2xy \implies \left(\frac{\partial w}{\partial x}\right)_y = -2y" />.
            <br />
            • <M t="z" /> rögzítve (<M t="y = z - x" />): <M t="w = x^2 + (z-x)^2 - z^2 = 2x^2 - 2xz \implies \left(\frac{\partial w}{\partial x}\right)_z = 4x - 2z" />.
          </p>
        </Task>

        <Task n={16} q={<>Ha <M t="w = x + y + z" /> és <M t="xyz = 8" />, mennyi <M t="\left(\frac{\partial w}{\partial x}\right)_y" /> a <M t="(2, 2, 2)" /> pontban?</>}>
          <p>
            <M t="z = \frac{8}{xy} \implies w = x + y + \frac{8}{xy}" />. Deriválva <M t="x" /> szerint (<M t="y" /> fix):
            <M t="\left(\frac{\partial w}{\partial x}\right)_y = 1 - \frac{8}{x^2 y}" />. A <M t="(2,2,2)" /> pontban: <M t="1 - \frac{8}{8} = 0" />.
          </p>
        </Task>

        <Task n={17} q={<>Ellenőrizd a ciklikus szabályt az <M t="x^2 y + y^2 z + z^2 x = 3" /> egyenletre a <M t="(1, 1, 1)" /> pontban!</>}>
          <p>
            <M t="F_x = 2xy + z^2 = 3" />, <M t="F_y = x^2 + 2yz = 3" />, <M t="F_z = y^2 + 2zx = 3" />.
            Így mindhárom ciklikus derivált <M t="-\frac{3}{3} = -1" />, szorzatuk <M t="(-1)(-1)(-1) = -1" />!
          </p>
        </Task>

        <h3>Közepes feladatok (18–20.)</h3>

        <Task n={18} q={<>Számítsd ki <M t="\left(\frac{\partial w}{\partial y}\right)_z" /> értékét a <M t="(1, 1, 1)" /> pontban a differenciálos módszerrel, ha <M t="w = x^2 + 2xy + z^2" /> és <M t="x^3 + y^2 z + xz^2 = 3" />!</>}>
          <p>
            <M t="(1,1,1)" />-ben: <M t="dw = (2x+2y)dx + 2x\,dy + 2z\,dz = 4\,dx + 2\,dy + 2\,dz" />.
            A feltétel differenciálja <M t="(1,1,1)" />-ben: <M t="(3x^2+z^2)dx + 2yz\,dy + (y^2+2xz)dz = 4\,dx + 2\,dy + 3\,dz = 0" />.
            Mivel <M t="z" /> rögzített (<M t="dz = 0" />): <M t="4\,dx + 2\,dy = 0 \implies dx = -\frac{1}{2}\,dy" />.
            Beírva: <M t="dw = 4\left(-\frac{1}{2}\,dy\right) + 2\,dy = 0 \implies \left(\frac{\partial w}{\partial y}\right)_z = 0" />.
          </p>
        </Task>

        <Task n={19} q={<>Adott <M t="u = x^2 + y^2" /> és <M t="v = x^2 - y^2" /> (<M t="x, y > 0" />). Számítsd ki <M t="\left(\frac{\partial x}{\partial u}\right)_v" /> és <M t="\left(\frac{\partial x}{\partial u}\right)_y" /> értékét!</>}>
          <p>
            • <M t="v" /> rögzítve: <M t="u + v = 2x^2 \implies x = \sqrt{\frac{u+v}{2}}" />, így <M t="\left(\frac{\partial x}{\partial u}\right)_v = \frac{1}{4x}" />.
            <br />
            • <M t="y" /> rögzítve: <M t="x = \sqrt{u - y^2}" />, így <M t="\left(\frac{\partial x}{\partial u}\right)_y = \frac{1}{2x}" /> (kétszer akkora!).
          </p>
        </Task>

        <Task n={20} q={<>Két mellékfeltétel: <M t="x + y + z = 2" /> és <M t="x^2 + y^2 - z^2 = 1" />. Számítsd ki <M t="\frac{dw}{dx}" /> értékét a <M t="(1, 1, 0)" /> pontban, ha <M t="w = xyz" />!</>}>
          <p>
            <M t="(1,1,0)" />-ban: <M t="dw = yz\,dx + xz\,dy + xy\,dz = 0 + 0 + 1\cdot dz = dz" />.
            Feltételek differenciáljai <M t="(1,1,0)" />-ban:
            <M t="dx + dy + dz = 0" /> és <M t="2\,dx + 2\,dy - 0\cdot dz = 0 \implies dx + dy = 0" />.
            Beírva az elsőbe: <M t="dz = 0" />, így <M t="dw = 0 \implies \frac{dw}{dx} = 0" />!
          </p>
        </Task>

        <h3>Haladó feladatok (21–23.)</h3>

        <Task n={21} q={<>A van der Waals-féle valódi gáz egyenlete <M t="\left(P + \frac{a}{V^2}\right)(V - b) = RT" />. Számítsd ki <M t="\left(\frac{\partial V}{\partial T}\right)_P" /> értékét implicit differenciálással!</>}>
          <p>
            Rögzített <M t="P" /> mellett (<M t="dP = 0" />) differenciáljuk mindkét oldalt:
            <M block t="\left[-\frac{2a}{V^3}(V - b) + \left(P + \frac{a}{V^2}\right)\right] dV = R\,dT." />
            Így:
            <M block t="\left(\frac{\partial V}{\partial T}\right)_P = \frac{R}{P + \frac{a}{V^2} - \frac{2a(V-b)}{V^3}} = \frac{R V^3}{P V^3 - aV + 2ab}." />
            (Megjegyzés: a nevező pontosan a kritikus pontban válik nullává!)
          </p>
        </Task>

        <Task n={22} q={<>Bizonyítsd be a kétváltozós láncszabállyal, hogy ha <M t="x, y" /> az <M t="(u, v)" /> koordináták függvényei, akkor <M t="\left(\frac{\partial x}{\partial u}\right)_v \left(\frac{\partial u}{\partial x}\right)_y + \left(\frac{\partial x}{\partial v}\right)_u \left(\frac{\partial v}{\partial x}\right)_y = 1" />!</>}>
          <p>
            Tekintsük az <M t="x(u(x,y), v(x,y)) \equiv x" /> azonosságot, és deriváljuk mindkét oldalt <M t="x" /> szerint
            rögzített <M t="y" /> mellett a kétváltozós láncszabállyal:
            <M block t="\frac{\partial x}{\partial x}\Big|_y = 1 = \left(\frac{\partial x}{\partial u}\right)_v \left(\frac{\partial u}{\partial x}\right)_y + \left(\frac{\partial x}{\partial v}\right)_u \left(\frac{\partial v}{\partial x}\right)_y." />
            (Ez pontosan a Jacobi-mátrix és inverze szorzatának <M t="(1,1)" />-es eleme!)
          </p>
        </Task>

        <Task n={23} q={<>Egy háromváltozós <M t="w(x,y,z)" /> függvénynél <M t="x, y, z" /> között fennáll a <M t="g(x,y,z) = 0" /> kapcsolat. Bizonyítsd be a „híd-formulát”: fejezd ki <M t="\left(\frac{\partial w}{\partial x}\right)_z" />-t <M t="\left(\frac{\partial w}{\partial x}\right)_y" /> és <M t="\left(\frac{\partial w}{\partial y}\right)_x" /> segítségével!</>}>
          <p>
            Írjuk fel <M t="w" />-t a <M t="(x, y)" /> független változók függvényeként:
            <M block t="dw = \left(\frac{\partial w}{\partial x}\right)_y dx + \left(\frac{\partial w}{\partial y}\right)_x dy." />
            Most osszuk el mindkét oldalt <M t="dx" />-szel <strong>rögzített <M t="z" /></strong> mellett! Ekkor:
            <M block t="\left(\frac{\partial w}{\partial x}\right)_z = \left(\frac{\partial w}{\partial x}\right)_y + \left(\frac{\partial w}{\partial y}\right)_x \left(\frac{\partial y}{\partial x}\right)_z." />
            Ez a „híd-formula” közvetlenül megmutatja, mekkora a különbség a kétféle rögzítés között!
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={<>Ha <M t="PV = nRT" /> (<M t="n, R" /> állandó), mennyi a <M t="\left(\frac{\partial P}{\partial V}\right)_T" /> izotermikus parciális derivált?</>}
          options={[
            { label: <><M t="-\frac{nRT}{V^2}" /></>, ok: true },
            { label: <><M t="\frac{nR}{V}" /></> },
            { label: <><M t="0" /></> },
            { label: <><M t="\frac{nRT}{V}" /></> },
          ]}
          explain={
            <>
              A <M t="P = nRT \cdot V^{-1}" /> kifejezést állandó <M t="T" /> mellett <M t="V" /> szerint deriválva{' '}
              <M t="-\frac{nRT}{V^2}" /> adódik.
            </>
          }
        />
      </>
    ),
  },
];
