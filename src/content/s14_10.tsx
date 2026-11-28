import type { Page } from './s1_1';
import { M } from '../components/M';
import { Def, Story, Task, Warn, Quiz, Steps } from '../components/ui';
import {
  Taylor1DTo2DSegmentWidget,
  QuadraticApprox3DWidget,
  PascalDerivativeTriangleWidget,
  TaylorProductShortcutWidget,
  TaylorProofOfHessianWidget,
  ErrorOrder2DWidget,
  NewtonVsGradientDescentWidget,
  Chapter14GrandSynthesisDiagram,
} from '../components/Widgets1410';

export const S14_10: Page[] = [
  /* ── 1. OLDAL ── */
  {
    title: '1. Az 1D Taylor-formulától a 2D-ig: a szakasz-trükk',
    body: (
      <>
        <Story>
          A 14.6-ban a sima felületeket egy lapos <strong>érintősíkkal</strong> (<M t="L(x,y)" />) közelítettük.
          De mi van, ha a felület erősen hajlik — domború, homorú vagy nyereg alakú? Pontosan úgy, ahogy 1D-ben az
          érintőegyenes után jött a közelítő parabola, köbös görbe és a teljes Taylor-polinom (11.9), most két
          változóban is felépítjük a <strong>tetszőleges fokú közelítő felületeket</strong>!
        </Story>

        <Def title="A 1D-visszavezetés trükkje: g(t) = f(a + th, b + tk)">
          <p>
            Kössük össze az <M t="(a,b)" /> középpontot az <M t="(a+h, b+k)" /> célponttal egy egyenes szakasszal:
            <M t="x(t) = a + th, \; y(t) = b + tk" /> (<M t="t \in [0, 1]" />), és definiáljuk az egyváltozós
            <M t="g(t) = f(a + th, b + tk)" /> függvényt!
          </p>
          <p>
            A 14.4-es láncszabállyal sorra deriválva (és felhasználva a Clairaut-tételt, <M t="f_{xy} = f_{yx}" />):
          </p>
          <M block t="g'(t) = h f_x + k f_y, \qquad g''(t) = h^2 f_{xx} + 2hk f_{xy} + k^2 f_{yy}." />
          <p>
            Mivel <M t="g(0) = f(a,b)" /> és <M t="g(1) = f(a+h, b+k)" />, az 1D Taylor-formula <M t="t = 1" />-re
            azonnal megadja a kétváltozós Taylor-formulát!
          </p>
        </Def>

        <Taylor1DTo2DSegmentWidget />

        <Task n={1} q={<>Számítsd ki <M t="g'(0)" /> és <M t="g''(0)" /> értékét, ha <M t="f(x,y) = e^x \cos y" />, <M t="(a,b) = (0,0)" /> és <M t="g(t) = f(th, tk)" />!</>}>
          <p>
            A <M t="(0,0)" /> pontban: <M t="f=1, \; f_x = 1, \; f_y = 0, \; f_{xx} = 1, \; f_{xy} = 0, \; f_{yy} = -1" />.
            Így:
            <M block t="g'(0) = h\cdot 1 + k\cdot 0 = h, \qquad g''(0) = h^2\cdot 1 + 2hk\cdot 0 + k^2(-1) = h^2 - k^2." />
            Ebből a másodfokú közelítés: <M t="f(h,k) \approx 1 + h + \frac{1}{2}(h^2 - k^2)" />!
          </p>
        </Task>

        <Task n={2} q={<>Miért van szükség a Clairaut-tételre (<M t="f_{xy} = f_{yx}" />) a <M t="g''(t)" /> levezetésében?</>}>
          <p>
            A láncszabály közvetlenül <M t="g''(t) = h^2 f_{xx} + hk f_{xy} + kh f_{yx} + k^2 f_{yy}" /> kifejezést ad.
            A két középső tag pontosan a másodrendű deriváltak folytonossága (<M t="f_{xy} = f_{yx}" />) miatt vonható
            össze <M t="2hk f_{xy}" />-ná!
          </p>
        </Task>
      </>
    ),
  },

  /* ── 2. OLDAL ── */
  {
    title: '2. A másodfokú (kvadratikus) közelítés és a Hesse-mátrix',
    body: (
      <>
        <Story>
          A fizikában, mérnöki modellezésben és gépi tanulásban a <strong>másodfokú (kvadratikus) Taylor-polinom</strong>
          a legnagyobb sztár: már elég görbült ahhoz, hogy megkülönböztesse a dombot, a völgyet és a nyerget, ugyanakkor
          még olyan egyszerű, hogy egyetlen mátrixszal (<M t="H" />) leírható!
        </Story>

        <Def title="Másodfokú Taylor-polinom Q(x, y) — két ekvivalens alakban">
          <p>Az <M t="(a,b)" /> pont körül (<M t="h = x - a, \; k = y - b" />):</p>
          <M block t="Q(x,y) = \underbrace{f(a,b) + f_x(a,b)\,h + f_y(a,b)\,k}_{\text{1. fokú érintősík } L(x,y)} + \frac{1}{2}\bigl(f_{xx}(a,b)\,h^2 + 2f_{xy}(a,b)\,hk + f_{yy}(a,b)\,k^2\bigr)." />
          <p><strong>Kompakt vektor–mátrix alak</strong> (<M t="\Delta\mathbf{x} = (h, k)^T" />, <M t="H" /> a Hesse-mátrix):</p>
          <M block t="Q(\mathbf{a} + \Delta\mathbf{x}) = f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot\Delta\mathbf{x} + \frac{1}{2}\,\Delta\mathbf{x}^T H(\mathbf{a})\,\Delta\mathbf{x}." />
        </Def>

        <QuadraticApprox3DWidget />

        <Quiz
          q={<>Ha az <M t="f(x,y)" /> függvény másodfokú Taylor-polinomja az origó körül <M t="Q(x,y) = 3 - 2x + 5y + 4x^2 - 6xy + y^2" />, mennyi <M t="f_{xy}(0,0)" /> és <M t="f_{xx}(0,0)" />?</>}
          options={[
            { label: 'f_xx = 4, f_xy = −6' },
            { label: 'f_xx = 8, f_xy = −6', ok: true },
            { label: 'f_xx = 8, f_xy = −12' },
          ]}
          explain={<>Vigyázat, csapda! A képletben ½·f_xx·x² és ½·(2 f_xy)·xy = f_xy·xy szerepel! Ezért ½·f_xx = 4 ⇒ f_xx = 8, míg f_xy közvetlenül −6 (mert a 2-es és a ½ kiejti egymást)!</>}
        />

        <Task n={3} q={<>Határozd meg az <M t="f(x,y) = \ln(1 + x + 2y)" /> másodfokú Taylor-polinomját az origó körül!</>}>
          <p>
            <M t="f(0,0) = 0" />, <M t="f_x = \frac{1}{1+x+2y} \implies f_x(0,0) = 1" />, <M t="f_y = \frac{2}{1+x+2y} \implies f_y(0,0) = 2" />.
            Második deriváltak <M t="(0,0)" />-ban: <M t="f_{xx} = -1, \; f_{xy} = -2, \; f_{yy} = -4" />.
            Így:
            <M block t="Q(x,y) = x + 2y - \frac{1}{2}x^2 - 2xy - 2y^2." />
            (Ellenőrzés 1D-vel: <M t="\ln(1+u) \approx u - \frac{1}{2}u^2" />, ahol <M t="u = x + 2y" /> ⇒ pontosan ugyanez!)
          </p>
        </Task>

        <Task n={4} q={<>Írd fel az <M t="f(x,y) = x e^y" /> függvény másodfokú közelítését a <M t="(1, 0)" /> pont körül!</>}>
          <p>
            <M t="h = x - 1, \; k = y" />. A <M t="(1,0)" /> pontban: <M t="f = 1, \; f_x = 1, \; f_y = 1, \; f_{xx} = 0, \; f_{xy} = 1, \; f_{yy} = 1" />.
            <M block t="Q(x,y) = 1 + (x-1) + y + (x-1)y + \frac{1}{2}y^2." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 3. OLDAL ── */
  {
    title: '3. Az n-edfokú kétváltozós Taylor-formula és a maradéktag',
    body: (
      <>
        <Story>
          Ha tovább deriváljuk a <M t="g(t) = f(a+th, b+tk)" /> függvényt, a binomiális tételhez kísértetiesen hasonló
          mintázat rajzolódik ki: a <M t="h\frac{\partial}{\partial x} + k\frac{\partial}{\partial y}" /> differenciáloperátor
          hatványai!
        </Story>

        <Def title="13. tétel — Kétváltozós Taylor-formula Lagrange-maradéktaggal">
          <p>
            Ha <M t="f(x,y)" /> és minden <M t="(n+1)" />-edrendű parciális deriváltja folytonos egy <M t="(a,b)" /> és
            <M t="(a+h, b+k)" /> pontokat tartalmazó konvex nyílt tartományon, akkor létezik <M t="c \in (0, 1)" />, hogy:
          </p>
          <M block t="f(a+h, b+k) = f(a,b) + \sum_{m=1}^{n} \frac{1}{m!}\left(h\frac{\partial}{\partial x} + k\frac{\partial}{\partial y}\right)^m f(a,b) + R_n(h,k)," />
          <p>ahol a Lagrange-féle maradéktag:</p>
          <M block t="R_n(h,k) = \frac{1}{(n+1)!}\left(h\frac{\partial}{\partial x} + k\frac{\partial}{\partial y}\right)^{n+1} f(a + ch, b + ck)." />
        </Def>

        <PascalDerivativeTriangleWidget />

        <Task n={5} q={<>Határozd meg az <M t="f(x,y) = \sin(x + 2y)" /> harmadfokú Taylor-polinomját az origó körül!</>}>
          <p>
            Közvetlenül az 1D <M t="\sin u \approx u - \frac{u^3}{6}" /> képlettel (<M t="u = x + 2y" />):
            <M block t="P_3(x,y) = (x + 2y) - \frac{1}{6}(x + 2y)^3 = x + 2y - \frac{1}{6}x^3 - x^2 y - 2xy^2 - \frac{4}{3}y^3." />
            (Az összes 2. rendű derivált <M t="0" /> az origóban, mert <M t="\sin" /> páratlan!)
          </p>
        </Task>

        <Task n={6} q={<>Írd fel az <M t="f(x,y) = e^x \ln(1 + y)" /> harmadfokú Taylor-polinomját az origó körül!</>}>
          <p>
            1D sorok: <M t="e^x = 1 + x + \frac{x^2}{2} + \dots" /> és <M t="\ln(1+y) = y - \frac{y^2}{2} + \frac{y^3}{3} - \dots" />.
            Összeszorozva és csak az <M t="i + j \le 3" /> tagokat megtartva:
            <M block t="P_3(x,y) = y + xy - \frac{1}{2}y^2 + \frac{1}{2}x^2 y - \frac{1}{2}xy^2 + \frac{1}{3}y^3." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 4. OLDAL ── */
  {
    title: '4. Profi vizsgatrükk: 1D sorok szorzása és behelyettesítése',
    body: (
      <>
        <Story>
          A 3. fokú kétváltozós Taylor-polinomban már <strong>10 különböző parciális derivált</strong> van — ha mindet
          kézzel számolnád ki, könnyű elrontani egy előjelet. A szakemberek trükkje: <strong>bontsd fel a függvényt
          ismert 1D Maclaurin-sorokra</strong> (<M t="e^u, \sin u, \cos u, \frac{1}{1-u}, \ln(1+u)" />), szorozd össze
          őket, és dobd el a küszöbnél magasabb összfokszámú (<M t="i + j > N" />) tagokat!
        </Story>

        <Steps
          title="Thomas 1. példa villámgyorsan: f(x, y) = 1 / (1 − x − y + xy)"
          problem={<>Határozd meg az <M t="f(x,y) = \frac{1}{1 - x - y + xy}" /> függvény 2. és 3. fokú Taylor-polinomját az origó körül!</>}
          steps={[
            {
              title: '1. Nevező szorzattá alakítása',
              body: (
                <>
                  Vegyük észre: <M t="1 - x - y + xy = (1 - x)(1 - y)" />! Tehát <M t="f(x,y) = \frac{1}{1-x}\cdot\frac{1}{1-y}" />.
                </>
              ),
            },
            {
              title: '2. Két mértani sor szorzata (|x| < 1, |y| < 1)',
              body: (
                <>
                  <M block t="f(x,y) = (1 + x + x^2 + x^3 + \dots)(1 + y + y^2 + y^3 + \dots)." />
                </>
              ),
            },
            {
              title: '3. Tagok szűrése összfokszám szerint',
              body: (
                <>
                  • <strong>2. fokú (<M t="i+j \le 2" />):</strong> <M t="Q(x,y) = 1 + x + y + x^2 + xy + y^2" />.
                  <br />• <strong>3. fokú (<M t="i+j \le 3" />):</strong> <M t="P_3(x,y) = 1 + x + y + x^2 + xy + y^2 + x^3 + x^2y + xy^2 + y^3" />.
                </>
              ),
            },
          ]}
        />

        <TaylorProductShortcutWidget />

        <Task n={7} q={<>Határozd meg az <M t="f(x,y) = e^{xy} \cos(x - y)" /> másodfokú Taylor-polinomját az origó körül 1D sorokkal!</>}>
          <p>
            <M t="e^{xy} = 1 + xy + O(4)" /> és <M t="\cos(x-y) = 1 - \frac{1}{2}(x-y)^2 + O(4)" />.
            Szorzatuk 2. fokig:
            <M block t="Q(x,y) = (1 + xy)\left(1 - \frac{x^2}{2} + xy - \frac{y^2}{2}\right) \approx 1 - \frac{1}{2}x^2 + 2xy - \frac{1}{2}y^2." />
          </p>
        </Task>

        <Task n={8} q={<>Keresd meg az <M t="f(x,y) = \frac{1}{1 - x - y}" /> másodfokú közelítését az origó körül, és hasonlítsd össze a Thomas 1. példával!</>}>
          <p>
            Legyen <M t="u = x + y" />: <M t="\frac{1}{1-u} = 1 + u + u^2 + \dots" />.
            Így <M t="Q(x,y) = 1 + x + y + (x+y)^2 = 1 + x + y + x^2 + 2xy + y^2" />.
            (Figyeld meg: itt <M t="2xy" /> van, míg <M t="\frac{1}{(1-x)(1-y)}" /> esetén csak <M t="1\cdot xy" />!)
          </p>
        </Task>
      </>
    ),
  },

  /* ── 5. OLDAL ── */
  {
    title: '5. A 14.7-es Hesse-próba szigorú bizonyítása',
    body: (
      <>
        <Story>
          Emlékszel a 14.7-re, amikor megígértük, hogy a második derivált próbája (<M t="D = f_{xx}f_{yy} - f_{xy}^2" />)
          mögött mélyebb igazság rejlik? Most a <strong>kétváltozós Taylor-formula</strong> segítségével 4 sorban
          lezárjuk az egész elméleti kört!
        </Story>

        <Def title="Miért garantál lokális szélsőértéket D > 0? (Bizonyítás vázlata)">
          <p>
            Legyen <M t="(a,b)" /> kritikus pont (<M t="f_x(a,b) = f_y(a,b) = 0" />), és legyenek a 2. rendű deriváltak
            folytonosak. Az <M t="n = 1" /> Taylor-formula Lagrange-maradéktaggal:
          </p>
          <M block t="f(a+h, b+k) - f(a,b) = \frac{1}{2}\Bigl[f_{xx}(P_c)\,h^2 + 2f_{xy}(P_c)\,hk + f_{yy}(P_c)\,k^2\Bigr]," />
          <p>
            ahol <M t="P_c = (a + ch, b + ck)" />. Ha <M t="D(a,b) > 0" /> és <M t="f_{xx}(a,b) > 0" />, akkor a
            folytonosság miatt létezik olyan <M t="\delta > 0" /> sugarú körlap, amelyen mindenütt
            <M t="D(P_c) > 0" /> és <M t="f_{xx}(P_c) > 0" />. Teljes négyzetté alakítva a szögletes zárójel
            <em>minden</em> <M t="(h,k) \ne (0,0)" /> lépésre szigorúan pozitív — tehát <M t="f(a+h,b+k) > f(a,b)" />,
            vagyis <strong>szigorú lokális minimum</strong>!
          </p>
        </Def>

        <TaylorProofOfHessianWidget />

        <Quiz
          q={<>Ha egy kritikus pontban <M t="f_{xx} = f_{xy} = f_{yy} = 0" />, miért mond csődöt a 2. rendű Taylor-közelítés?</>}
          options={[
            { label: 'Mert a függvény nem differenciálható' },
            { label: 'Mert a 2. rendű tag azonosan 0, így a 3. és magasabb rendű tagok döntik el az előjelet!', ok: true },
            { label: 'Mert a függvény biztosan konstans' },
          ]}
          explain={<>Ha a teljes kvadratikus tag eltűnik, a Δf előjelét a köbös vagy negyedrendű tagok (pl. x³ + y³ vagy x⁴ + y⁴) uralják!</>}
        />

        <Task n={9} q={<>Az <M t="f(x,y) = x^2 + y^2 - x^3" /> függvénynek lokális minimuma van az origóban. Mekkora sugarú <M t="(0,0)" /> középpontú körlapon garantált, hogy <M t="f(x,y) > 0" />?</>}>
          <p>
            Polárkoordinátákkal <M t="f = r^2(1 - r\cos^3\theta)" />. Mivel <M t="|\cos^3\theta| \le 1" />, minden
            <M t="0 < r < 1" /> esetén <M t="1 - r\cos^3\theta > 0" />, így az egész <M t="r < 1" /> egységkörlapon
            <M t="f(x,y) > 0" /> (az <M t="(1,0)" /> pontban válik először nullává)!
          </p>
        </Task>

        <Task n={10} q={<>Miért nem garantálja a Taylor-formula, hogy egy <M t="D > 0, \; f_{xx} > 0" /> kritikus pont <em>globális</em> minimum?</>}>
          <p>
            Mert a 2. rendű deriváltak folytonossága csak egy <em>elég kicsi</em> <M t="\delta" /> sugarú környezetben
            biztosítja, hogy <M t="D(P_c) > 0" /> marad. Messzebb (pl. <M t="x^2+y^2-x^3" /> esetén <M t="x > 1" />-nél)
            a magasabb fokú tagok átvehetik az uralmat és negatívba vihetik a függvényt!
          </p>
        </Task>
      </>
    ),
  },

  /* ── 6. OLDAL ── */
  {
    title: '6. Hibabecslés két változóban: O(r²) vs. O(r³)',
    body: (
      <>
        <Story>
          A mérnöki számításokban soha nem elég egy közelítő képlet — mindig tudni kell, <strong>legfeljebb mekkorát
          tévedhetünk</strong>! A Lagrange-maradéktagból azonnal leolvasható egy kényelmes, biztonságos felső korlát
          bármely <M t="n" /> fokszámra.
        </Story>

        <Def title="2D Taylor-hibabecslés téglalapon">
          <p>
            Ha az <M t="|x - a| \le \delta_1, \; |y - b| \le \delta_2" /> zárt téglalapon az <M t="f" /> összes
            <M t="(n+1)" />-edrendű parciális deriváltjának abszolút értéke legfeljebb <M t="M" />, akkor:
          </p>
          <M block t="|R_n(h, k)| \le \frac{M}{(n+1)!}\bigl(|h| + |k|\bigr)^{n+1}." />
          <ul>
            <li><strong>Lineáris közelítés (<M t="n=1" />):</strong> <M t="|R_1| \le \frac{M_2}{2}(|h|+|k|)^2" /> (ez pontosan a 14.6-os képlet!).</li>
            <li><strong>Kvadratikus közelítés (<M t="n=2" />):</strong> <M t="|R_2| \le \frac{M_3}{6}(|h|+|k|)^3" /> — ha a lépésköz <M t="0{,}1" />, a hiba ezerszeresére zsugorodik!</li>
          </ul>
        </Def>

        <ErrorOrder2DWidget />

        <Task n={11} q={<>Becsüld meg az <M t="f(x,y) = e^{x+y}" /> másodfokú közelítésének maximális hibáját az <M t="|x| \le 0{,}1, \; |y| \le 0{,}1" /> négyzeten!</>}>
          <p>
            Minden 3. rendű parciális derivált megegyezik <M t="e^{x+y}" />-nal. A négyzeten <M t="x+y \le 0{,}2" />, így
            <M t="M_3 = e^{0{,}2} \approx 1{,}2214 < 1{,}23" />.
            Mivel <M t="|h| + |k| \le 0{,}2" />:
            <M block t="|R_2| \le \frac{1{,}23}{6}(0{,}2)^3 = 0{,}205 \cdot 0{,}008 = 0{,}00164." />
            (A kvadratikus közelítés tehát garantáltan 2 ezreléken belül pontos az egész négyzeten!)
          </p>
        </Task>

        <Task n={12} q={<>Ha egy másodfokú Taylor-közelítés lépésközét felére csökkentjük (<M t="h \to h/2, \; k \to k/2" />), hányad részére esik a hibakorlát?</>}>
          <p>
            Mivel a másodfokú közelítés hibája <M t="(|h|+|k|)^3" />-nel arányos, a lépésköz felezésekor a hibakorlát
            <M t="\left(\frac{1}{2}\right)^3 = \frac{1}{8}" /> részére (nyolcadára!) csökken!
          </p>
        </Task>
      </>
    ),
  },

  /* ── 7. OLDAL ── */
  {
    title: '7. Modern alkalmazás: 2D Newton-módszer optimalizálásra',
    body: (
      <>
        <Story>
          A 14.5-ben láttuk a <strong>gradiens ereszkedést</strong>, amely egy elnyújtott völgyben ide-oda cikk-cakkozva,
          lassan araszol a minimum felé. Hogyan gyorsítják fel ezt a modern optimalizáló algoritmusok (pl. robotikában,
          mérnöki szimulációban)? A <strong>másodfokú Taylor-paraboloiddal</strong>!
        </Story>

        <Def title="A többváltozós Newton-módszer (másodrendű optimalizálás)">
          <p>
            Az aktuális <M t="\mathbf{x}_k" /> pontban közelítsük <M t="f" />-et a másodfokú Taylor-polinommal:
            <M t="Q(\mathbf{x}_k + \Delta\mathbf{x}) = f(\mathbf{x}_k) + \nabla f(\mathbf{x}_k)\cdot\Delta\mathbf{x} + \frac{1}{2}\Delta\mathbf{x}^T H(\mathbf{x}_k)\Delta\mathbf{x}" />.
            Ennek a paraboloidnak a minimuma ott van, ahol <M t="\nabla Q = \mathbf{0}" />, azaz:
          </p>
          <M block t="\nabla f(\mathbf{x}_k) + H(\mathbf{x}_k)\,\Delta\mathbf{x} = \mathbf{0} \implies \mathbf{x}_{k+1} = \mathbf{x}_k - H(\mathbf{x}_k)^{-1}\nabla f(\mathbf{x}_k)." />
          <p>
            Egy tiszta kvadratikus függvény (paraboloid) esetén a Newton-módszer <strong>egyetlen lépésben</strong>
            telitalálattal a pontos minimumba ugrik!
          </p>
        </Def>

        <NewtonVsGradientDescentWidget />

        <Quiz
          q={<>Mi a Newton-módszer legnagyobb hátránya hatalmas (pl. millió paraméteres) neurális hálózatoknál?</>}
          options={[
            { label: 'Lassabban konvergál, mint a gradiens ereszkedés' },
            { label: 'Az n×n-es Hesse-mátrix tárolása és invertálása túl drága (O(n²) memória, O(n³) művelet)!', ok: true },
            { label: 'Csak egyváltozós függvényekre létezik' },
          ]}
          explain={<>Míg a gradiens csak n szám, addig a Hesse-mátrix n² elemű! Millió paraméternél ez 10¹² szám lenne — ezért használnak az AI-ban gradiens-alapú (Adam) vagy kvázi-Newton (L-BFGS) közelítéseket!</>}
        />

        <Task n={13} q={<>Alkalmazz egyetlen 2D Newton-lépést az <M t="f(x,y) = x^2 + 8y^2" /> függvényre az <M t="(1{,}8;\; 0{,}75)" /> kezdőpontból!</>}>
          <p>
            <M t="\nabla f = (2x, 16y)^T = (3{,}6;\; 12)^T" />, és a Hesse-mátrix <M t="H = \begin{pmatrix} 2 & 0 \\ 0 & 16 \end{pmatrix}" />.
            Inverze <M t="H^{-1} = \begin{pmatrix} 1/2 & 0 \\ 0 & 1/16 \end{pmatrix}" />.
            Így <M t="\Delta\mathbf{x} = -H^{-1}\nabla f = (-1{,}8;\; -0{,}75)^T" />, tehát
            <M t="\mathbf{x}_1 = (1{,}8;\; 0{,}75) + (-1{,}8;\; -0{,}75) = (0, 0)" /> — <strong>1 lépésben pontosan a minimum!</strong>
          </p>
        </Task>

        <Task n={14} q={<>Mikor ugrik a Newton-módszer <em>rossz</em> irányba (pl. maximum vagy nyeregpont felé)?</>}>
          <p>
            A Newton-lépés minden kritikus pontot (<M t="\nabla f = \mathbf{0}" />) egyformán vonz: ha a kezdőpontban
            a Hesse-mátrix nem pozitív definit (<M t="D < 0" /> vagy <M t="f_{xx} < 0" />), a paraboloid csúcsa
            nyeregpont vagy maximum, így a Newton-lépés felfelé vagy a nyereg felé ugorhat!
          </p>
        </Task>
      </>
    ),
  },

  /* ── 8. OLDAL ── */
  {
    title: '8. A 14. fejezet fináléja: összefoglalás, buktatók és 9 gyakorlófeladat',
    body: (
      <>
        <Chapter14GrandSynthesisDiagram />

        <Def title="Puskakártya — 14.10 Kétváltozós Taylor-formula">
          <ul>
            <li><strong>1. fokú (érintősík):</strong> <M t="L = f + f_x h + f_y k" />.</li>
            <li><strong>2. fokú (kvadratikus):</strong> <M t="Q = L + \frac{1}{2}(f_{xx} h^2 + 2 f_{xy} hk + f_{yy} k^2)" />.</li>
            <li><strong>Általános <M t="m" />-edrendű tag:</strong> <M t="\frac{1}{m!}(h\partial_x + k\partial_y)^m f(a,b)" />.</li>
            <li><strong>Hibakorlát:</strong> <M t="|R_n| \le \frac{M_{n+1}}{(n+1)!}(|h|+|k|)^{n+1}" />.</li>
            <li><strong>Gyorsítás:</strong> használd az 1D Maclaurin-sorok szorzatát és összetételét, és vágd le <M t="i + j > N" /> felett!</li>
          </ul>
        </Def>

        <Warn>
          <strong>5 klasszikus vizsgabuktató:</strong>
          <ol>
            <li><strong>Elfelejtett 2-es szorzó az <M t="f_{xy}" /> előtt:</strong> A másodrendű tagban <M t="\frac{1}{2}(f_{xx}h^2 + \mathbf{2}f_{xy}hk + f_{yy}k^2)" /> szerepel, így a <M t="hk" /> együtthatója egyszerűen <M t="f_{xy}" /> (nem <M t="\frac{1}{2}f_{xy}" />)!</li>
            <li><strong><M t="x, y" /> helyett <M t="(x-a), (y-b)" /> elfelejtése:</strong> Ha nem az origó körül fejtesz, minden hatványban <M t="h = x - a" /> és <M t="k = y - b" /> áll!</li>
            <li><strong>Összfokszám elszámolása:</strong> Az <M t="x^2 y" /> tag <em>harmadfokú</em> (<M t="2 + 1 = 3" />), tehát a 2. fokú (kvadratikus) közelítésből már el kell hagyni!</li>
            <li><strong>Nem polinom behelyettesítésnél elveszett tag:</strong> Pl. <M t="e^{x+y^2}" /> másodfokú közelítésénél az <M t="y^2" /> már az első hatványban megjelenik (<M t="1 + x + y^2 + \frac{1}{2}x^2" />).</li>
            <li><strong>Faktoriális elfelejtése a maradéktagban:</strong> <M t="R_1" />-nél <M t="\frac{1}{2!}" />, <M t="R_2" />-nél <M t="\frac{1}{3!} = \frac{1}{6}" /> a szorzó!</li>
          </ol>
        </Warn>

        <h3>Könnyebb feladatok (15–17.)</h3>

        <Task n={15} q={<>Írd fel az <M t="f(x,y) = e^x \sin y" /> másodfokú Taylor-polinomját az origó körül!</>}>
          <p>
            1D sorokkal: <M t="(1 + x + \frac{x^2}{2} + \dots)(y - \frac{y^3}{6} + \dots)" />.
            2. fokig (<M t="i + j \le 2" />):
            <M block t="Q(x,y) = y + xy." />
          </p>
        </Task>

        <Task n={16} q={<>Határozd meg az <M t="f(x,y) = \cos x \cos y" /> másodfokú közelítését az origó körül!</>}>
          <p>
            <M t="(1 - \frac{x^2}{2} + \dots)(1 - \frac{y^2}{2} + \dots) \implies Q(x,y) = 1 - \frac{1}{2}x^2 - \frac{1}{2}y^2" />.
          </p>
        </Task>

        <Task n={17} q={<>Számítsd ki az <M t="f(x,y) = \sqrt{1 + x + y}" /> másodfokú Taylor-polinomját az origó körül!</>}>
          <p>
            Az 1D binomiális sor <M t="(1+u)^{1/2} = 1 + \frac{1}{2}u - \frac{1}{8}u^2 + \dots" /> (<M t="u = x + y" />):
            <M block t="Q(x,y) = 1 + \frac{1}{2}(x+y) - \frac{1}{8}(x^2 + 2xy + y^2) = 1 + \frac{1}{2}x + \frac{1}{2}y - \frac{1}{8}x^2 - \frac{1}{4}xy - \frac{1}{8}y^2." />
          </p>
        </Task>

        <h3>Közepes feladatok (18–20.)</h3>

        <Task n={18} q={<>Határozd meg az <M t="f(x,y) = x^2 y + 3y - 2" /> pontos 2. és 3. fokú Taylor-polinomját az <M t="(1, 2)" /> pont körül!</>}>
          <p>
            <M t="h = x - 1, \; k = y - 2" />. Mivel <M t="f" /> harmadfokú polinom, <M t="P_3" /> pontosan maga <M t="f" />!
            Értékek <M t="(1,2)" />-ben: <M t="f = 6, \; f_x = 4, \; f_y = 4, \; f_{xx} = 4, \; f_{xy} = 2, \; f_{yy} = 0" />,
            és az egyetlen nem nulla 3. derivált <M t="f_{xxy} = 2" />.
            <M block t="Q(x,y) = 6 + 4h + 4k + 2h^2 + 2hk, \qquad P_3(x,y) = 6 + 4h + 4k + 2h^2 + 2hk + h^2 k." />
          </p>
        </Task>

        <Task n={19} q={<>Keresd meg az <M t="f(x,y) = \sin(x^2 + y^2)" /> negyedfokú Taylor-polinomját az origó körül!</>}>
          <p>
            Mivel <M t="\sin u = u - \frac{u^3}{6} + \dots" /> és <M t="u = x^2 + y^2" /> már másodfokú, <M t="u^3" /> már
            hatodfokú! Ezért a 4. (sőt az 5.!) fokú Taylor-polinom egyszerűen:
            <M block t="P_4(x,y) = x^2 + y^2." />
          </p>
        </Task>

        <Task n={20} q={<>Becsüld meg az <M t="f(x,y) = \sin(x + y)" /> lineáris (<M t="L = x + y" />) és másodfokú (<M t="Q = x + y" />) közelítésének hibáját az <M t="|x| \le 0{,}1, \; |y| \le 0{,}1" /> négyzeten!</>}>
          <p>
            Mivel a 2. rendű deriváltak mind nullák <M t="(0,0)" />-ban, <M t="L = Q = x + y" />, tehát a másodfokú
            hibaképletet használhatjuk! Minden 3. rendű derivált <M t="-\cos(x+y)" />, amelynek abszolút értéke
            <M t="\le 1" /> (<M t="M_3 = 1" />). Így:
            <M block t="|R_2| \le \frac{1}{6}(0{,}1 + 0{,}1)^3 = \frac{0{,}008}{6} \approx 0{,}00133." />
          </p>
        </Task>

        <h3>Haladó feladatok (21–23.)</h3>

        <Task n={21} q={<>Határozd meg az <M t="f(x,y) = \operatorname{arctg}(x + y)" /> harmadfokú Taylor-polinomját az origó körül!</>}>
          <p>
            Az 1D <M t="\operatorname{arctg} u = u - \frac{u^3}{3} + \dots" /> sorba <M t="u = x + y" />-t írva:
            <M block t="P_3(x,y) = x + y - \frac{1}{3}(x+y)^3 = x + y - \frac{1}{3}x^3 - x^2 y - xy^2 - \frac{1}{3}y^3." />
          </p>
        </Task>

        <Task n={22} q={<>Bizonyítsd be a 2D Taylor-formula segítségével, hogy a <M t="\lim_{(x,y)\to(0,0)} \frac{e^{x+y} - 1 - x - y}{x^2 + y^2}" /> határérték <strong>nem létezik</strong>!</>}>
          <p>
            Az <M t="e^{x+y} = 1 + (x+y) + \frac{1}{2}(x+y)^2 + O(r^3)" /> kibontásból:
            <M block t="\frac{e^{x+y} - 1 - x - y}{x^2 + y^2} = \frac{\frac{1}{2}(x^2 + 2xy + y^2) + O(r^3)}{x^2 + y^2} = \frac{1}{2} + \frac{xy}{x^2 + y^2} + O(r)." />
            Az <M t="y = 0" /> tengely mentén a határérték <M t="\frac{1}{2}" />, míg az <M t="y = x" /> egyenes mentén
            <M t="\frac{1}{2} + \frac{1}{2} = 1" /> — a kétutas próba (14.2) szerint tehát a határérték nem létezik!
          </p>
        </Task>

        <Task n={23} q={<>Írd fel a <M t="z(x,y)" /> implicit függvény másodfokú Taylor-polinomját a <M t="(0, 0)" /> pont körül, ha <M t="z^3 + z = x + 2y + xy" /> és <M t="z(0,0) = 0" />!</>}>
          <p>
            Írjuk fel <M t="z = ax + by + cx^2 + dxy + ey^2 + O(3)" /> alakban! Mivel <M t="z(0,0) = 0" />, <M t="z^3 = O(3)" />
            (a harmadik hatvány már legalább harmadfokú!). Ezért 2. fokig az egyenlet egyszerűen:
            <M block t="z + O(3) = x + 2y + xy \implies Q(x,y) = x + 2y + xy!" />
            (Csodálatos példa arra, mennyire leegyszerűsíti a Taylor-sor az implicit függvények helyi viselkedését!)
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={<>Mi az <M t="f(x, y) = \sin x \sin y" /> függvény másodrendű Taylor-polinomja az origóban?</>}
          options={[
            { label: <><M t="xy" /></>, ok: true },
            { label: <><M t="x + y" /></> },
            { label: <><M t="x^2 + y^2" /></> },
            { label: <><M t="1 - xy" /></> },
          ]}
          explain={
            <>
              Mivel <M t="\sin x \approx x" /> és <M t="\sin y \approx y" />, szorzatuk másodrendű közelítése pontosan{' '}
              <M t="xy" /> (<M t="f_{xy}(0, 0) = 1" />, a többi másodrendű derivált nulla).
            </>
          }
        />
      </>
    ),
  },
];
