import type { Page } from './s1_1';
import { M } from '../components/M';
import { Def, Story, Task, Warn, Quiz, Steps } from '../components/ui';
import {
  AreaAsUnitHeightWidget,
  VariableDensityPlateWidget,
  CenterOfMassBalanceWidget,
  SymmetryCentroidWidget,
  MomentOfInertiaWidget,
  RadiusOfGyrationWidget,
  ProbabilityCentroidBridgeWidget,
  MomentsMasterTableDiagram,
} from '../components/Widgets152';

export const S15_2: Page[] = [
  /* ── 1. OLDAL ── */
  {
    title: '1. Síkidomok területe kettős integrállal',
    body: (
      <>
        <Story>
          A 15.1-ben a kettős integrál térfogatot adott meg a <M t="z = f(x,y)" /> felület alatt. Mi történik, ha a
          magasság mindenütt egyszerűen <M t="f(x,y) \equiv 1" />? Egy <M t="1" /> egység magas hasáb térfogata
          számértékileg pontosan egyenlő az alaplapjának <strong>területével</strong>!
        </Story>

        <Def title="Síktartomány területe kettős integrállal">
          <p>Egy zárt, korlátos <M t="R \subset \mathbb{R}^2" /> síktartomány területe:</p>
          <M block t="\operatorname{Ter}(R) = \iint_R 1\,dA = \iint_R dA." />
          <p>
            I. típusú tartományon ez automatikusan visszaadja az 1D területképletet:
            <M t="\int_a^b \int_{g_1(x)}^{g_2(x)} 1\,dy\,dx = \int_a^b \bigl(g_2(x) - g_1(x)\bigr)\,dx" />!
          </p>
        </Def>

        <AreaAsUnitHeightWidget />

        <Task n={1} q={<>Számítsd ki kettős integrállal az <M t="y = x^2" /> és <M t="y = 2x" /> görbék közötti tartomány területét!</>}>
          <p>
            Metszéspontok: <M t="x^2 = 2x \implies x = 0, \; 2" />.
            <M block t="\operatorname{Ter}(R) = \int_0^2 \int_{x^2}^{2x} 1\,dy\,dx = \int_0^2 (2x - x^2)\,dx = \left[x^2 - \frac{x^3}{3}\right]_0^2 = 4 - \frac{8}{3} = \frac{4}{3}." />
          </p>
        </Task>

        <Task n={2} q={<>Határozd meg az <M t="x = y^2" /> és <M t="x = 4 - y^2" /> parabolák által közbezárt tartomány területét!</>}>
          <p>
            Metszéspontok: <M t="y^2 = 4 - y^2 \implies y = \pm\sqrt{2}" />. II. típusúként (<M t="dx\,dy" />):
            <M block t="\operatorname{Ter}(R) = \int_{-\sqrt{2}}^{\sqrt{2}} \int_{y^2}^{4-y^2} 1\,dx\,dy = 2\int_0^{\sqrt{2}} (4 - 2y^2)\,dy = 2\left[4y - \frac{2}{3}y^3\right]_0^{\sqrt{2}} = \frac{16\sqrt{2}}{3}." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 2. OLDAL ── */
  {
    title: '2. Változó sűrűségű vékony lemezek tömege',
    body: (
      <>
        <Story>
          A 6. fejezetben csak homogén (állandó sűrűségű) lemezekkel számoltunk. A valóságban azonban egy ötvözet,
          egy repülőgépszárny vagy egy hőmérséklet-eloszlás sűrűsége <strong>pontról pontra változik</strong>!
          Ha egy apró <M t="\Delta A" /> darabka sűrűsége <M t="\delta(x,y)" />, akkor tömege
          <M t="\Delta m \approx \delta(x,y)\,\Delta A" /> — ezeket összegezve azonnal kettős integrált kapunk!
        </Story>

        <Def title="Vékony lemez (lamina) tömege">
          <p>
            Ha egy <M t="R" /> alakú vékony lemez felületi tömegsűrűsége a folytonos <M t="\delta(x,y) \ge 0" /> függvény
            (egysége pl. <M t="\text{kg/m}^2" />), akkor az össztömeg:
          </p>
          <M block t="M = \iint_R \delta(x,y)\,dA." />
        </Def>

        <VariableDensityPlateWidget />

        <Quiz
          q={<>Ha egy <M t="R = [0, 2] \times [0, 2]" /> négyzetlemez sűrűsége <M t="\delta(x,y) = 1 + x" />, merre mozdul el a tömegközéppontja az <M t="(1, 1)" /> geometriai középponttól?</>}
          options={[
            { label: 'Balra (x̄ < 1, ȳ = 1)' },
            { label: 'Jobbra (x̄ > 1, ȳ = 1)', ok: true },
            { label: 'Felfelé (x̄ = 1, ȳ > 1)' },
          ]}
          explain={<>Mivel δ = 1 + x jobbra növekszik és y-tól nem függ, a lemez jobb oldala nehezebb ⇒ x̄ &gt; 1 (pontosan 7/6), míg szimmetriából ȳ = 1 marad!</>}
        />

        <Task n={3} q={<>Számítsd ki az <M t="R = [0, 1] \times [0, 2]" /> téglalaplemez tömegét, ha sűrűsége <M t="\delta(x,y) = 2x + 3y" />!</>}>
          <p>
            <M block t="M = \int_0^1 \int_0^2 (2x + 3y)\,dy\,dx = \int_0^1 \left[2xy + \frac{3}{2}y^2\right]_0^2 dx = \int_0^1 (4x + 6)\,dx = \bigl[2x^2 + 6x\bigr]_0^1 = 8." />
          </p>
        </Task>

        <Task n={4} q={<>Egy háromszöglemez csúcsai <M t="(0,0), (1,0), (0,1)" />, sűrűsége <M t="\delta(x,y) = 6x + 6y + 6" />. Mennyi a lemez tömege?</>}>
          <p>
            A tartomány <M t="0 \le x \le 1, \; 0 \le y \le 1 - x" />:
            <M block t="M = \int_0^1 \int_0^{1-x} 6(x + y + 1)\,dy\,dx = 6\int_0^1 \left[(x+1)(1-x) + \frac{(1-x)^2}{2}\right] dx = 6\int_0^1 \left(\frac{3}{2} - x - \frac{x^2}{2}\right)dx = 6\left(\frac{3}{2} - \frac{1}{2} - \frac{1}{6}\right) = 5." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 3. OLDAL ── */
  {
    title: '3. Elsőrendű nyomatékok és a tömegközéppont',
    body: (
      <>
        <Story>
          Hol kell alátámasztani egy szabálytalan, változó sűrűségű lemezt egyetlen tűhegyen ahhoz, hogy vízszintesen
          egyensúlyban maradjon? Pontosan a <strong>tömegközéppontjában</strong> (<M t="\bar{x}, \bar{y}" />)!
          Ehhez az <M t="x" />- és <M t="y" />-tengelyre vett forgatónyomatékokat kell kiegyensúlyoznunk.
        </Story>

        <Def title="Elsőrendű nyomatékok (M_x, M_y) és tömegközéppont">
          <M block t="M_x = \iint_R y\,\delta(x,y)\,dA \quad (\text{az }x\text{-tengelyre}), \qquad M_y = \iint_R x\,\delta(x,y)\,dA \quad (\text{az }y\text{-tengelyre})." />
          <M block t="\bar{x} = \frac{M_y}{M}, \qquad \bar{y} = \frac{M_x}{M}." />
          <p>
            <strong>Figyelj a keresztezett indexekre!</strong> Az <M t="x" />-tengelytől való kar az <M t="y" /> koordináta
            (<M t="M_x \leftrightarrow y" />), az <M t="y" />-tengelytől való kar az <M t="x" /> koordináta
            (<M t="M_y \leftrightarrow x" />)!
          </p>
        </Def>

        <Steps
          title="Thomas 3. példa mintájára: háromszöglemez tömegközéppontja"
          problem={<>Határozd meg a <M t="(0,0), (2,0), (0,2)" /> csúcsú háromszöglemez tömegközéppontját, ha <M t="\delta(x,y) = 1 + x" />!</>}
          steps={[
            {
              title: '1. Tömeg M kiszámítása',
              body: (
                <>
                  <M block t="M = \int_0^2 \int_0^{2-x} (1 + x)\,dy\,dx = \int_0^2 (1+x)(2-x)\,dx = \int_0^2 (2 + x - x^2)\,dx = \left[2x + \frac{x^2}{2} - \frac{x^3}{3}\right]_0^2 = \frac{10}{3}." />
                </>
              ),
            },
            {
              title: '2. Nyomatékok M_y és M_x',
              body: (
                <>
                  <M block t="M_y = \int_0^2 \int_0^{2-x} x(1+x)\,dy\,dx = \int_0^2 (2x + x^2 - x^3)\,dx = \left[x^2 + \frac{x^3}{3} - \frac{x^4}{4}\right]_0^2 = \frac{8}{3}." />
                  <M block t="M_x = \int_0^2 \int_0^{2-x} y(1+x)\,dy\,dx = \frac{1}{2}\int_0^2 (1+x)(2-x)^2\,dx = \frac{1}{2}\int_0^2 (4 - 3x^2 + x^3)\,dx = 2." />
                </>
              ),
            },
            {
              title: '3. Tömegközéppont koordinátái',
              body: (
                <>
                  <M block t="\bar{x} = \frac{M_y}{M} = \frac{8/3}{10/3} = \frac{4}{5} = 0{,}8, \qquad \bar{y} = \frac{M_x}{M} = \frac{2}{10/3} = \frac{3}{5} = 0{,}6." />
                </>
              ),
            },
          ]}
        />

        <CenterOfMassBalanceWidget />

        <Task n={5} q={<>Határozd meg az <M t="R = [0, 2] \times [0, 1]" /> téglalaplemez tömegközéppontját, ha <M t="\delta(x,y) = x" />!</>}>
          <p>
            Szorzatfüggvény téglalapon!
            <M t="M = \left(\int_0^2 x\,dx\right)\left(\int_0^1 1\,dy\right) = 2\cdot 1 = 2" />,
            <M t="M_y = \left(\int_0^2 x^2\,dx\right)\cdot 1 = \frac{8}{3}" />,
            szimmetriából <M t="\bar{y} = \frac{1}{2}" />.
            Így <M t="\bar{x} = \frac{8/3}{2} = \frac{4}{3}" />, a tömegközéppont <M t="\left(\frac{4}{3}, \frac{1}{2}\right)" />.
          </p>
        </Task>

        <Task n={6} q={<>Miért esik ki a konstans <M t="\delta = \delta_0" /> sűrűség a homogén lemezek tömegközéppontjából?</>}>
          <p>
            Mert <M t="\bar{x} = \frac{\iint x\,\delta_0\,dA}{\iint \delta_0\,dA} = \frac{\delta_0 \iint x\,dA}{\delta_0 \operatorname{Ter}(R)} = \frac{1}{\operatorname{Ter}(R)}\iint_R x\,dA" /> —
            homogén testnél a tömegközéppont kizárólag a geometriától függ (ezért hívjuk <strong>geometriai súlypontnak / centroidnak</strong>)!
          </p>
        </Task>
      </>
    ),
  },

  /* ── 4. OLDAL ── */
  {
    title: '4. Súlypont és szimmetria — okos rövidítések',
    body: (
      <>
        <Story>
          Mielőtt három kettős integrált is kiszámolnál (<M t="M, M_x, M_y" />), mindig nézz rá az ábrára!
          Ha a tartomány <em>és</em> a sűrűségfüggvény is szimmetrikus egy egyenesre, akkor a tömegközéppont
          <strong>garantáltan rajta fekszik azon az egyenesen</strong> — ezzel gyakran azonnal megvan <M t="\bar{x}" />
          vagy <M t="\bar{y}" /> egyetlen integrál nélkül!
        </Story>

        <SymmetryCentroidWidget />

        <Task n={7} q={<>Határozd meg az <M t="y = 1 - x^2" /> parabola és az <M t="x" />-tengely közötti homogén lemez súlypontját!</>}>
          <p>
            Szimmetriából azonnal <M t="\bar{x} = 0" />! Terület (<M t="\delta = 1" />):
            <M block t="A = \int_{-1}^1 (1 - x^2)\,dx = 2\left(1 - \frac{1}{3}\right) = \frac{4}{3}." />
            Elsőrendű nyomaték:
            <M block t="M_x = \int_{-1}^1 \int_0^{1-x^2} y\,dy\,dx = \frac{1}{2}\int_{-1}^1 (1 - x^2)^2\,dx = \int_0^1 (1 - 2x^2 + x^4)\,dx = 1 - \frac{2}{3} + \frac{1}{5} = \frac{8}{15}." />
            Így <M t="\bar{y} = \frac{8/15}{4/3} = \frac{2}{5} = 0{,}4" />, a súlypont <M t="\left(0, \frac{2}{5}\right)" />.
          </p>
        </Task>

        <Task n={8} q={<>Egy homogén lemez az <M t="y = x^2" /> és <M t="x = y^2" /> görbék közötti lencse (<M t="x, y \ge 0" />). Használd ki az <M t="y = x" /> szimmetriát a súlypont meghatározásához!</>}>
          <p>
            A tartomány szimmetrikus az <M t="y = x" /> egyenesre ⇒ <M t="\bar{x} = \bar{y}" />, elég csak <M t="\bar{x}" />-et kiszámolni!
            <M t="A = \int_0^1 (\sqrt{x} - x^2)\,dx = \frac{2}{3} - \frac{1}{3} = \frac{1}{3}" />.
            <M t="M_y = \int_0^1 x(\sqrt{x} - x^2)\,dx = \frac{2}{5} - \frac{1}{4} = \frac{3}{20}" />.
            Így <M t="\bar{x} = \bar{y} = \frac{3/20}{1/3} = \frac{9}{20} = 0{,}45" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ── 5. OLDAL ── */
  {
    title: '5. Tehetetlenségi nyomatékok (I_x, I_y, I_0)',
    body: (
      <>
        <Story>
          A tömeg azt méri, mennyire nehéz egy testet <em>egyenes vonalban</em> elmozdítani. A <strong>tehetetlenségi
          nyomaték</strong> pedig azt méri, mennyire nehéz egy tengely körül <em>megforgatni</em>! Egy <M t="m" />
          tömegű pontnak egy tengelytől <M t="r" /> távolságra <M t="mr^2" /> a tehetetlenségi nyomatéka — a teljes
          lemezé pedig ennek a kettős integrálja!
        </Story>

        <Def title="Másodrendű (tehetetlenségi) nyomatékok">
          <M block t="I_x = \iint_R y^2\,\delta(x,y)\,dA, \qquad I_y = \iint_R x^2\,\delta(x,y)\,dA," />
          <M block t="I_0 = I_x + I_y = \iint_R (x^2 + y^2)\,\delta(x,y)\,dA \qquad (\text{poláris tehetetlenségi nyomaték})." />
          <p>
            A forgási mozgási energia <M t="\omega" /> szögsebességnél: <M t="E_{\text{rot}} = \frac{1}{2} I \omega^2" />.
          </p>
        </Def>

        <MomentOfInertiaWidget />

        <Quiz
          q={<>Ha egy homogén téglalaplemez (<M t="-a/2 \le x \le a/2, \; -b/2 \le y \le b/2" />) tömege <M t="M" />, mennyi a középpontján átmenő <M t="z" />-tengelyre vett poláris tehetetlenségi nyomatéka (<M t="I_0" />)?</>}
          options={[
            { label: 'M(a² + b²) / 3' },
            { label: 'M(a² + b²) / 12', ok: true },
            { label: 'M·a·b / 12' },
          ]}
          explain={<>Mivel I_x = Mb²/12 és I_y = Ma²/12, a merőleges tengelyek tétele szerint I₀ = I_x + I_y = M(a² + b²)/12!</>}
        />

        <Task n={9} q={<>Számítsd ki az <M t="R = [0, a] \times [0, b]" /> homogén (<M t="\delta = 1" />) téglalaplemez <M t="I_x, I_y, I_0" /> tehetetlenségi nyomatékait a koordinátatengelyekre!</>}>
          <p>
            <M block t="I_x = \int_0^a \int_0^b y^2\,dy\,dx = a\cdot\frac{b^3}{3} = \frac{ab^3}{3} = \frac{Mb^2}{3}, \qquad I_y = \frac{a^3 b}{3} = \frac{Ma^2}{3}, \qquad I_0 = \frac{M(a^2 + b^2)}{3}." />
          </p>
        </Task>

        <Task n={10} q={<>Határozd meg a <M t="(0,0), (1,0), (0,1)" /> csúcsú homogén (<M t="\delta = 1" />) háromszöglemez <M t="I_x" /> tehetetlenségi nyomatékát!</>}>
          <p>
            <M block t="I_x = \int_0^1 \int_0^{1-x} y^2\,dy\,dx = \frac{1}{3}\int_0^1 (1-x)^3\,dx = \frac{1}{3}\left[-\frac{(1-x)^4}{4}\right]_0^1 = \frac{1}{12}." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 6. OLDAL ── */
  {
    title: '6. Inerciálissugár és a Steiner-tétel',
    body: (
      <>
        <Story>
          A mérnökök szeretik egyetlen hosszúsággal jellemezni egy keresztmetszet vagy lendkerék tehetetlenségét:
          ez az <strong>inerciálissugár (forgatási sugár)</strong>. Emellett nem kell minden eltolt tengelyre
          újraintegrálni — erre szolgál a zseniális <strong>Steiner-tétel</strong>!
        </Story>

        <Def title="Inerciálissugár és Steiner-tétel (párhuzamos tengelyek tétele)">
          <ul>
            <li><strong>Inerciálissugár:</strong> <M t="R_x = \sqrt{\frac{I_x}{M}}" />, <M t="R_y = \sqrt{\frac{I_y}{M}}" />, <M t="R_0 = \sqrt{\frac{I_0}{M}}" />.</li>
            <li>
              <strong>Steiner-tétel:</strong> Ha <M t="L" /> egy tengely, amely <M t="d" /> távolságra van a
              tömegközépponton átmenő, vele párhuzamos tengelytől, akkor:
              <M block t="I_L = I_{\text{cm}} + M d^2." />
            </li>
          </ul>
          <p>
            <strong>3 soros bizonyítás:</strong> legyen a súlypont az origóban (<M t="\iint x\,\delta\,dA = 0" />), és
            <M t="L" /> az <M t="x = d" /> egyenes:
            <M block t="I_L = \iint_R (x - d)^2\delta\,dA = \underbrace{\iint x^2\delta\,dA}_{I_{\text{cm}}} - 2d\underbrace{\iint x\delta\,dA}_{=\,0} + d^2\underbrace{\iint \delta\,dA}_{M} = I_{\text{cm}} + Md^2." />
          </p>
        </Def>

        <RadiusOfGyrationWidget />

        <Task n={11} q={<>Számítsd ki a 9. feladatbeli <M t="[0, a] \times [0, b]" /> téglalaplemez <M t="R_x" /> inerciálissugarát az <M t="x" />-tengelyre!</>}>
          <p>
            Mivel <M t="I_x = \frac{Mb^2}{3}" />, az inerciálissugár:
            <M block t="R_x = \sqrt{\frac{I_x}{M}} = \sqrt{\frac{b^2}{3}} = \frac{b}{\sqrt{3}} \approx 0{,}577\,b." />
            (Figyeld meg: a tömegközéppont <M t="0{,}5\,b" /> magasan van, az inerciálissugár ennél nagyobb, mert a távolabbi részek négyzetével számítanak!)
          </p>
        </Task>

        <Task n={12} q={<>Ellenőrizd a Steiner-tételt az <M t="[0, a] \times [0, b]" /> téglalapon az <M t="x" />-tengelyre!</>}>
          <p>
            A súlyponton átmenő vízszintes tengelyre <M t="I_{\text{cm}} = \frac{Mb^2}{12}" />, a tengely távolsága az
            <M t="x" />-tengelytől <M t="d = \frac{b}{2}" />. A Steiner-tétel szerint:
            <M block t="I_x = \frac{Mb^2}{12} + M\left(\frac{b}{2}\right)^2 = \left(\frac{1}{12} + \frac{1}{4}\right)Mb^2 = \frac{Mb^2}{3}." />
            Pontos egyezés a 9. feladattal!
          </p>
        </Task>
      </>
    ),
  },

  /* ── 7. OLDAL ── */
  {
    title: '7. Pappus-tétel és 2D valószínűségszámítás (modern híd)',
    body: (
      <>
        <Story>
          A 15.2 képletei messze túlmutatnak a fémlemezeken! A geometriában a <strong>Pappus-tétel</strong> egyetlen
          szorzásra egyszerűsíti bonyolult forgástestek térfogatát, az adattudományban és valószínűségszámításban pedig
          ugyanezek a kettős integrálok adják meg a <strong>várható értéket és a szórást</strong>!
        </Story>

        <Def title="Pappus-tétel és 2D együttes sűrűségfüggvény">
          <ul>
            <li>
              <strong>Pappus-tétel (térfogatra):</strong> ha egy <M t="R" /> síkidomot megforgatunk egy őt nem metsző
              tengely körül, a keletkező test térfogata a terület és a súlypont által bejárt kör kerületének szorzata:
              <M block t="V = 2\pi \bar{r}\cdot \operatorname{Ter}(R)." />
            </li>
            <li>
              <strong>2D valószínűségi eloszlás:</strong> ha <M t="p(x,y) \ge 0" /> és <M t="\iint_{\mathbb{R}^2} p(x,y)\,dA = 1" />, akkor:
              <M block t="E[X] = \iint x\,p(x,y)\,dA, \qquad E[Y] = \iint y\,p(x,y)\,dA." />
            </li>
          </ul>
        </Def>

        <ProbabilityCentroidBridgeWidget />

        <Quiz
          q={<>Ha egy <M t="r = 2" /> sugarú kört megforgatunk egy olyan tengely körül, amelynek távolsága a kör középpontjától <M t="R = 5" />, mennyi a keletkező tórusz térfogata Pappus tételével?</>}
          options={[
            { label: '20π²' },
            { label: '40π² (mert V = 2π·5 · (π·2²) = 40π²!)', ok: true },
            { label: '100π²' },
          ]}
          explain={<>A kör területe πr² = 4π, súlypontja 2πR = 10π utat tesz meg ⇒ V = 10π · 4π = 40π² — egyetlen sorban!</>}
        />

        <Task n={13} q={<>Egy <M t="(X, Y)" /> valószínűségi vektor együttes sűrűsége <M t="p(x,y) = c(x + y)" /> az <M t="[0, 1] \times [0, 1]" /> négyzeten (és 0 kívül). Határozd meg <M t="c" />-t és <M t="E[X]" />-et!</>}>
          <p>
            <M t="\int_0^1 \int_0^1 c(x+y)\,dy\,dx = c\int_0^1 \left(x + \frac{1}{2}\right)dx = c\cdot 1 = 1 \implies c = 1" />.
            Várható érték (= tömegközéppont <M t="\bar{x}" />):
            <M block t="E[X] = \int_0^1 \int_0^1 x(x+y)\,dy\,dx = \int_0^1 \left(x^2 + \frac{x}{2}\right)dx = \frac{1}{3} + \frac{1}{4} = \frac{7}{12}." />
          </p>
        </Task>

        <Task n={14} q={<>Számítsd ki az <M t="a" /> sugarú gömb térfogatát Pappus tételével, felhasználva a félkör súlypontját (<M t="\bar{y} = \frac{4a}{3\pi}" />)!</>}>
          <p>
            A félkör területe <M t="A = \frac{1}{2}\pi a^2" />, átmérője körül megforgatva gömböt ad, súlypontja
            <M t="2\pi\bar{y} = 2\pi\frac{4a}{3\pi} = \frac{8a}{3}" /> utat jár be.
            Így <M t="V = \frac{8a}{3}\cdot\frac{1}{2}\pi a^2 = \frac{4}{3}\pi a^3" />!
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
        <MomentsMasterTableDiagram />

        <Def title="Puskakártya — 15.2 Terület, nyomaték, tömegközéppont">
          <ul>
            <li><strong>Terület:</strong> <M t="\operatorname{Ter}(R) = \iint_R 1\,dA" /> · <strong>Tömeg:</strong> <M t="M = \iint_R \delta(x,y)\,dA" />.</li>
            <li><strong>Tömegközéppont:</strong> <M t="\bar{x} = \frac{1}{M}\iint_R x\,\delta\,dA" />, <M t="\bar{y} = \frac{1}{M}\iint_R y\,\delta\,dA" />.</li>
            <li><strong>Tehetetlenségi nyomatékok:</strong> <M t="I_x = \iint y^2\delta\,dA" />, <M t="I_y = \iint x^2\delta\,dA" />, <M t="I_0 = I_x + I_y" />.</li>
            <li><strong>Inerciálissugár & Steiner:</strong> <M t="R_x = \sqrt{I_x/M}" />, <M t="I_L = I_{\text{cm}} + Md^2" />.</li>
          </ul>
        </Def>

        <Warn>
          <strong>5 klasszikus vizsgabuktató:</strong>
          <ol>
            <li><strong>Felcserélt <M t="M_x" /> és <M t="M_y" />:</strong> <M t="M_x" />-ben <strong><M t="y" /></strong> áll (az <M t="x" />-tengelytől való távolság!), <M t="M_y" />-ban <strong><M t="x" /></strong> áll — ezért <M t="\bar{x} = M_y / M" /> és <M t="\bar{y} = M_x / M" />!</li>
            <li><strong>Felcserélt <M t="I_x" /> és <M t="I_y" />:</strong> Ugyanez a szabály: <M t="I_x = \iint y^2\delta\,dA" />, <M t="I_y = \iint x^2\delta\,dA" />!</li>
            <li><strong>Elfelejtett osztás <M t="M" />-mel:</strong> A <M t="M_y" /> még nyomaték, nem koordináta — a tömegközéppontnál <em>mindig</em> ossz el <M t="M" />-mel, és ellenőrizd, hogy <M t="(\bar{x}, \bar{y})" /> a tartományon belül van-e (konvex tartománynál mindig belül kell lennie)!</li>
            <li><strong>Szimmetria csak a tartományra:</strong> Ha <M t="R" /> szimmetrikus az <M t="y" />-tengelyre, de a sűrűség <M t="\delta(x,y) = 2 + x" /> <em>nem</em> szimmetrikus, akkor <M t="\bar{x} \ne 0" />!</li>
            <li><strong><M t="\delta = 1" /> elfelejtése homogén feladatnál:</strong> Ha a feladat „állandó sűrűségű” vagy „homogén” lemezt mond és nem ad meg számot, választhatsz <M t="\delta = 1" />-et a súlyponthoz (de az <M t="I_x" />-hez tartsd meg <M t="\delta" />-t vagy fejezd ki <M t="M" />-mel!).</li>
          </ol>
        </Warn>

        <h3>Könnyebb feladatok (15–17.)</h3>

        <Task n={15} q={<>Számítsd ki kettős integrállal az <M t="y = 4 - x^2" /> és <M t="y = 0" /> közötti tartomány területét!</>}>
          <p>
            <M block t="\operatorname{Ter}(R) = \int_{-2}^2 \int_0^{4-x^2} 1\,dy\,dx = 2\int_0^2 (4 - x^2)\,dx = 2\left(8 - \frac{8}{3}\right) = \frac{32}{3}." />
          </p>
        </Task>

        <Task n={16} q={<>Egy <M t="R = [0, 3] \times [0, 2]" /> téglalaplemez sűrűsége <M t="\delta(x,y) = 4xy" />. Mennyi a tömege?</>}>
          <p>
            Szorzatfüggvény téglalapon:
            <M block t="M = 4\left(\int_0^3 x\,dx\right)\left(\int_0^2 y\,dy\right) = 4 \cdot \frac{9}{2} \cdot 2 = 36." />
          </p>
        </Task>

        <Task n={17} q={<>Határozd meg a 16. feladatbeli téglalaplemez tömegközéppontját!</>}>
          <p>
            <M t="M_y = 4\left(\int_0^3 x^2\,dx\right)\left(\int_0^2 y\,dy\right) = 4 \cdot 9 \cdot 2 = 72 \implies \bar{x} = \frac{72}{36} = 2" />.
            <M t="M_x = 4\left(\int_0^3 x\,dx\right)\left(\int_0^2 y^2\,dy\right) = 4 \cdot \frac{9}{2} \cdot \frac{8}{3} = 48 \implies \bar{y} = \frac{48}{36} = \frac{4}{3}" />.
          </p>
        </Task>

        <h3>Közepes feladatok (18–20.)</h3>

        <Task n={18} q={<>Határozd meg az <M t="y = \sin x" /> (<M t="0 \le x \le \pi" />) és az <M t="x" />-tengely közötti homogén lemez súlypontját!</>}>
          <p>
            Szimmetriából <M t="\bar{x} = \frac{\pi}{2}" />! Terület: <M t="A = \int_0^\pi \sin x\,dx = 2" />.
            <M block t="M_x = \int_0^\pi \int_0^{\sin x} y\,dy\,dx = \frac{1}{2}\int_0^\pi \sin^2 x\,dx = \frac{1}{2}\cdot\frac{\pi}{2} = \frac{\pi}{4}." />
            Így <M t="\bar{y} = \frac{\pi/4}{2} = \frac{\pi}{8} \approx 0{,}393" />, a súlypont <M t="\left(\frac{\pi}{2}, \frac{\pi}{8}\right)" />.
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki az <M t="y = x^2" /> és <M t="y = 1" /> közötti homogén (<M t="\delta = 1" />) lemez <M t="I_y" /> tehetetlenségi nyomatékát és <M t="R_y" /> inerciálissugarát!</>}>
          <p>
            Tömeg: <M t="M = \int_{-1}^1 (1 - x^2)\,dx = \frac{4}{3}" />.
            <M block t="I_y = \int_{-1}^1 \int_{x^2}^1 x^2\,dy\,dx = 2\int_0^1 x^2(1 - x^2)\,dx = 2\left(\frac{1}{3} - \frac{1}{5}\right) = \frac{4}{15}." />
            Inerciálissugár: <M t="R_y = \sqrt{\frac{4/15}{4/3}} = \frac{1}{\sqrt{5}} \approx 0{,}447" />.
          </p>
        </Task>

        <Task n={20} q={<>Egy <M t="(0,0), (2,0), (2,2)" /> csúcsú háromszöglemez sűrűsége <M t="\delta(x,y) = y" />. Számítsd ki a tömegét és az <M t="I_x" /> tehetetlenségi nyomatékát!</>}>
          <p>
            A tartomány <M t="0 \le x \le 2, \; 0 \le y \le x" />:
            <br />• <M t="M = \int_0^2 \int_0^x y\,dy\,dx = \frac{1}{2}\int_0^2 x^2\,dx = \frac{4}{3}" />.
            <br />• <M t="I_x = \int_0^2 \int_0^x y^3\,dy\,dx = \frac{1}{4}\int_0^2 x^4\,dx = \frac{1}{4}\cdot\frac{32}{5} = \frac{8}{5}" />.
          </p>
        </Task>

        <h3>Haladó feladatok (21–23.)</h3>

        <Task n={21} q={<>Egy <M t="R" /> homogén lemez az <M t="y = x" /> egyenes és az <M t="y = x^2" /> parabola közötti tartomány. Számítsd ki a poláris tehetetlenségi nyomatékát (<M t="I_0" />) az origóra!</>}>
          <p>
            <M t="I_y = \int_0^1 x^2(x - x^2)\,dx = \frac{1}{4} - \frac{1}{5} = \frac{1}{20}" />.
            <M t="I_x = \int_0^1 \frac{1}{3}(x^3 - x^6)\,dx = \frac{1}{3}\left(\frac{1}{4} - \frac{1}{7}\right) = \frac{1}{28}" />.
            Így <M t="I_0 = I_x + I_y = \frac{1}{20} + \frac{1}{28} = \frac{7 + 5}{140} = \frac{3}{35}" />.
          </p>
        </Task>

        <Task n={22} q={<>Egy <M t="(0,0), (a,0), (0,a)" /> csúcsú homogén derékszögű háromszöglemezt megforgatunk az <M t="x = -a" /> egyenes körül. Számítsd ki a keletkező test térfogatát Pappus tételével!</>}>
          <p>
            A háromszög területe <M t="A = \frac{a^2}{2}" />, súlypontja <M t="\left(\frac{a}{3}, \frac{a}{3}\right)" />.
            A súlypont távolsága az <M t="x = -a" /> tengelytől: <M t="\bar{r} = \frac{a}{3} - (-a) = \frac{4a}{3}" />.
            Pappus tételével: <M t="V = 2\pi \cdot \frac{4a}{3} \cdot \frac{a^2}{2} = \frac{4}{3}\pi a^3" />!
          </p>
        </Task>

        <Task n={23} q={<>Bizonyítsd be, hogy egy <M t="R" /> lemez poláris tehetetlenségi nyomatéka egy tetszőleges <M t="P(x_0, y_0)" /> pontra <M t="I_P = I_{\text{cm}} + M\bigl[(x_0 - \bar{x})^2 + (y_0 - \bar{y})^2\bigr]" />, tehát a poláris tehetetlenségi nyomaték pontosan a tömegközéppontban minimális!</>}>
          <p>
            Írjuk fel <M t="I_P = \iint_R \bigl[(x-x_0)^2 + (y-y_0)^2\bigr]\delta\,dA" />. Bontsuk szét <M t="x - x_0 = (x - \bar{x}) + (\bar{x} - x_0)" />
            és hasonlóan <M t="y" />-ra! A kereszttagok eltűnnek, mert <M t="\iint (x-\bar{x})\delta\,dA = M_y - \bar{x}M = 0" /> és
            <M t="\iint (y-\bar{y})\delta\,dA = 0" />. Marad pontosan <M t="I_{\text{cm}} + M\bigl[(x_0-\bar{x})^2 + (y_0-\bar{y})^2\bigr]" />,
            amelynek egyértelmű globális minimuma <M t="(x_0, y_0) = (\bar{x}, \bar{y})" />!
          </p>
        </Task>
      </>
    ),
  },
];
