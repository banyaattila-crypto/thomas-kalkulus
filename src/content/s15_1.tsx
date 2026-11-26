import type { Page } from './s1_1';
import { M } from '../components/M';
import { Def, Story, Task, Warn, Quiz, Steps } from '../components/ui';
import {
  RiemannSum3DWidget,
  FubiniSlicing3DWidget,
  Type1VsType2DomainWidget,
  ArrowSweepBoundsWidget,
  OrderSwapMagicWidget,
  AverageValueTankWidget,
  SplitVsSingleOrderWidget,
  DoubleIntegralSummaryDiagram,
} from '../components/Widgets151';

export const S15_1: Page[] = [
  /* ── 1. OLDAL ── */
  {
    title: '1. Riemann-összeg téglalapon: térfogat a felület alatt',
    body: (
      <>
        <Story>
          Elérkeztünk a 15. fejezethez — a többváltozós <strong>integrálszámítás</strong> világába! Egy változóban a
          határozott integrál a görbe alatti területet adta meg vékony téglalapok összegeként. Két változóban egy
          <M t="z = f(x,y) \ge 0" /> felület alatti <strong>térfogatot</strong> számoljuk ki úgy, hogy az alaplapként
          szolgáló <M t="R" /> téglalapot apró cellákra bontjuk, és minden cella fölé egy <M t="f(x_k, y_k)" />
          magasságú hasábot állítunk!
        </Story>

        <Def title="Kettős integrál téglalapon">
          <p>
            Legyen <M t="f(x,y)" /> korlátos függvény az <M t="R = [a, b] \times [c, d]" /> zárt téglalapon. Bontsuk
            <M t="R" />-et <M t="n" /> darab <M t="\Delta A_k = \Delta x_k \Delta y_k" /> területű rész-téglalapra,
            és válasszunk minden cellában egy <M t="(x_k, y_k)" /> mintapontot! A Riemann-összeg:
          </p>
          <M block t="S_n = \sum_{k=1}^n f(x_k, y_k)\,\Delta A_k." />
          <p>
            Ha a legnagyobb cellaátmérő (<M t="\|P\|" />) nullához tartva <M t="S_n" /> egy véges határértékhez tart
            (függetlenül a mintapontok választásától), akkor <M t="f" /> integrálható <M t="R" />-en, és:
          </p>
          <M block t="\iint_R f(x,y)\,dA = \lim_{\|P\|\to 0} \sum_{k=1}^n f(x_k, y_k)\,\Delta A_k." />
          <p>
            Ha <M t="f(x,y) \ge 0" />, ez a felület alatti térfogat; ha <M t="f" /> negatív értékeket is felvesz, akkor
            <strong>előjeles térfogat</strong> (az <M t="xy" />-sík feletti rész pozitív, az alatti negatív).
          </p>
        </Def>

        <RiemannSum3DWidget />

        <Task n={1} q={<>Becsüld meg az <M t="f(x,y) = x + 2y" /> kettős integrálját az <M t="R = [0, 2] \times [0, 2]" /> négyzeten <M t="2 \times 2" />-es felosztással és középponti mintapontokkal!</>}>
          <p>
            Minden rész-négyzet területe <M t="\Delta A = 1 \cdot 1 = 1" />. A négy középpont:
            <M t="(0{,}5;\; 0{,}5)" />, <M t="(1{,}5;\; 0{,}5)" />, <M t="(0{,}5;\; 1{,}5)" />, <M t="(1{,}5;\; 1{,}5)" />.
            A függvényértékek rendre: <M t="1{,}5" />, <M t="2{,}5" />, <M t="3{,}5" />, <M t="4{,}5" />.
            Összegük: <M t="S_4 = (1{,}5 + 2{,}5 + 3{,}5 + 4{,}5)\cdot 1 = 12" />. (Mivel <M t="f" /> lineáris, ez pontosan megegyezik a valódi integrállal!)
          </p>
        </Task>

        <Task n={2} q={<>Számítsd ki az <M t="\iint_R 5\,dA" /> integrált geometriai megfontolással, ha <M t="R = [-1, 3] \times [2, 5]" />!</>}>
          <p>
            A konstans <M t="f(x,y) = 5" /> függvény alatti test egy <M t="5" /> magasságú téglatest, amelynek alaplapja
            <M t="(3 - (-1)) \cdot (5 - 2) = 4 \cdot 3 = 12" /> területű. Így <M t="\iint_R 5\,dA = 5 \cdot 12 = 60" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ── 2. OLDAL ── */
  {
    title: '2. Fubini tétele téglalapon: szeletelés és ismételt integrál',
    body: (
      <>
        <Story>
          A kettős integrált természetesen nem Riemann-összegekkel számoljuk ki, hanem visszavezetjük <strong>két
          egymás utáni 1D integrálra</strong>! Képzelj el egy kenyeret: ha ismered minden egyes <M t="x" />-beli
          szeletének <M t="A(x) = \int_c^d f(x,y)\,dy" /> területét, akkor a teljes térfogat egyszerűen a szeletek
          integrálja: <M t="V = \int_a^b A(x)\,dx" />!
        </Story>

        <Def title="1. tétel — Fubini tétele (téglalapon)">
          <p>
            Ha <M t="f(x,y)" /> folytonos az <M t="R = [a, b] \times [c, d]" /> téglalapon, akkor:
          </p>
          <M block t="\iint_R f(x,y)\,dA = \int_a^b \left(\int_c^d f(x,y)\,dy\right) dx = \int_c^d \left(\int_a^b f(x,y)\,dx\right) dy." />
          <p>
            <strong>Szorzat-villámképlet:</strong> ha <M t="f(x,y) = g(x)\,h(y)" /> téglalapon, akkor a két integrál
            teljesen szétválasztható:
            <M block t="\iint_{[a,b]\times[c,d]} g(x)\,h(y)\,dA = \left(\int_a^b g(x)\,dx\right)\left(\int_c^d h(y)\,dy\right)." />
          </p>
        </Def>

        <Steps
          title="Thomas 1. példa: Mindkét integrálási sorrend kipróbálása"
          problem={<>Számítsd ki az <M t="\iint_R (1 - 6x^2 y)\,dA" /> integrált az <M t="R = [0, 2] \times [-1, 1]" /> téglalapon!</>}
          steps={[
            {
              title: '1. Sorrend: előbb y szerint, majd x szerint (dy dx)',
              body: (
                <>
                  Belső (<M t="x" /> állandó!): <M t="\int_{-1}^1 (1 - 6x^2 y)\,dy = \bigl[y - 3x^2 y^2\bigr]_{-1}^1 = (1 - 3x^2) - (-1 - 3x^2) = 2" />.
                  <br />Külső: <M t="\int_0^2 2\,dx = 4" />.
                </>
              ),
            },
            {
              title: '2. Sorrend ellenőrzése: előbb x szerint, majd y szerint (dx dy)',
              body: (
                <>
                  Belső (<M t="y" /> állandó!): <M t="\int_0^2 (1 - 6x^2 y)\,dx = \bigl[x - 2x^3 y\bigr]_0^2 = 2 - 16y" />.
                  <br />Külső: <M t="\int_{-1}^1 (2 - 16y)\,dy = \bigl[2y - 8y^2\bigr]_{-1}^1 = (2 - 8) - (-2 - 8) = 4" />. Tökéletes egyezés!
                </>
              ),
            },
          ]}
        />

        <FubiniSlicing3DWidget />

        <Quiz
          q={<>Mennyi az <M t="\int_0^{\pi/2} \int_0^1 e^x \sin y\,dx\,dy" /> kettős integrál értéke a szorzat-villámképlettel?</>}
          options={[
            { label: 'e' },
            { label: 'e − 1', ok: true },
            { label: 'e + 1' },
          ]}
          explain={<>Szétválasztva: (∫₀¹ eˣ dx)·(∫₀^(π/2) sin y dy) = (e − 1)·[−cos y]₀^(π/2) = (e − 1)·1 = e − 1!</>}
        />

        <Task n={3} q={<>Számítsd ki az <M t="\iint_R y\sin(xy)\,dA" /> integrált az <M t="R = [1, 2] \times [0, \pi]" /> téglalapon! Melyik sorrend sokkal könnyebb?</>}>
          <p>
            Ha <strong>előbb <M t="x" /> szerint</strong> integrálunk (<M t="y" /> állandó!), a <M t="y\sin(xy)" />
            primitív függvénye azonnal <M t="-\cos(xy)" /> (nincs parciális integrálás!):
            <M block t="\int_0^\pi \int_1^2 y\sin(xy)\,dx\,dy = \int_0^\pi \bigl[-\cos(xy)\bigr]_{x=1}^{x=2}\,dy = \int_0^\pi (\cos y - \cos 2y)\,dy = \left[\sin y - \frac{\sin 2y}{2}\right]_0^\pi = 0." />
          </p>
        </Task>

        <Task n={4} q={<>Számítsd ki az <M t="\iint_R \frac{xy^2}{x^2+1}\,dA" /> integrált az <M t="R = [0, 1] \times [-1, 2]" /> téglalapon!</>}>
          <p>
            Szorzatfüggvény téglalapon! Szétválasztva:
            <M block t="\left(\int_0^1 \frac{x}{x^2+1}\,dx\right)\left(\int_{-1}^2 y^2\,dy\right) = \left[\frac{1}{2}\ln(x^2+1)\right]_0^1 \cdot \left[\frac{y^3}{3}\right]_{-1}^2 = \frac{\ln 2}{2} \cdot \frac{8 - (-1)}{3} = \frac{3\ln 2}{2}." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 3. OLDAL ── */
  {
    title: '3. Általános tartományok: I. és II. típusú tartományok',
    body: (
      <>
        <Story>
          A valóságban az alaplap ritkán téglalap — sokkal gyakrabban háromszög, körlap vagy két görbe közötti lencse!
          Fubini tétele ilyenkor is működik, csak a <strong>belső integrál határai függhetnek a külső változótól</strong>!
        </Story>

        <Def title="2. tétel — Fubini tétele általános (I. és II. típusú) tartományon">
          <ul>
            <li>
              <strong>I. típusú (függőlegesen egyszerű) tartomány:</strong> <M t="a \le x \le b" /> és <M t="g_1(x) \le y \le g_2(x)" />:
              <M block t="\iint_R f(x,y)\,dA = \int_a^b \int_{g_1(x)}^{g_2(x)} f(x,y)\,dy\,dx." />
            </li>
            <li>
              <strong>II. típusú (vízszintesen egyszerű) tartomány:</strong> <M t="c \le y \le d" /> és <M t="h_1(y) \le x \le h_2(y)" />:
              <M block t="\iint_R f(x,y)\,dA = \int_c^d \int_{h_1(y)}^{h_2(y)} f(x,y)\,dx\,dy." />
            </li>
          </ul>
          <p>
            <strong>Aranyszabály:</strong> a <em>külső</em> integrál határai <strong>mindig konstans számok</strong>
            (különben a végeredmény nem szám lenne!).
          </p>
        </Def>

        <Type1VsType2DomainWidget />

        <Task n={5} q={<>Számítsd ki az <M t="\iint_R (x + 2y)\,dA" /> integrált az <M t="y = x^2" /> és <M t="y = x" /> görbék közötti tartományon!</>}>
          <p>
            Metszéspontok: <M t="x^2 = x \implies x = 0, \; 1" />. I. típusúként (<M t="0 \le x \le 1, \; x^2 \le y \le x" />):
            <M block t="\int_0^1 \int_{x^2}^x (x + 2y)\,dy\,dx = \int_0^1 \bigl[xy + y^2\bigr]_{x^2}^x\,dx = \int_0^1 (2x^2 - x^3 - x^4)\,dx = \frac{2}{3} - \frac{1}{4} - \frac{1}{5} = \frac{13}{60}." />
          </p>
        </Task>

        <Task n={6} q={<>Határozd meg a <M t="z = 3 - x - y" /> sík alatti és az <M t="x = 0, \; y = 0, \; x + y = 1" /> háromszög feletti prizma térfogatát!</>}>
          <p>
            A háromszög: <M t="0 \le x \le 1, \; 0 \le y \le 1 - x" />.
            <M block t="V = \int_0^1 \int_0^{1-x} (3 - x - y)\,dy\,dx = \int_0^1 \left[(3-x)(1-x) - \frac{(1-x)^2}{2}\right] dx = \int_0^1 \left(\frac{5}{2} - 3x + \frac{x^2}{2}\right)dx = \frac{5}{2} - \frac{3}{2} + \frac{1}{6} = \frac{7}{6}." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 4. OLDAL ── */
  {
    title: '4. A határok biztos felírása: „Rajzold, Lőj, Olvasd le!”',
    body: (
      <>
        <Story>
          Kettős integráloknál a legtöbb hiba már azelőtt megszületik, hogy egyetlen primitív függvényt leírnál:
          a <strong>határok felcserélésénél vagy eltévesztésénél</strong>. Kövesd mindig ezt a három lépést, és
          soha nem fogsz mellélőni!
        </Story>

        <Def title="A 3 lépéses nyíl-módszer">
          <ol>
            <li><strong>Rajzold fel a 2D tartományt (<M t="R" />)!</strong> Keresd meg a határgörbék metszéspontjait!</li>
            <li><strong>Lőj nyilat a tartományon át:</strong> <M t="dy\,dx" /> esetén <em>függőleges</em> nyilat lentről felfelé; <M t="dx\,dy" /> esetén <em>vízszintes</em> nyilat balról jobbra.</li>
            <li><strong>Olvasd le a határokat:</strong> a belső alsó határ, ahol a nyíl <em>belép</em> <M t="R" />-be; a belső felső határ, ahol <em>kilép</em>; a külső határok pedig a tartomány legkisebb és legnagyobb külső koordinátái!</li>
          </ol>
        </Def>

        <ArrowSweepBoundsWidget />

        <Task n={7} q={<>Írd fel és számítsd ki az <M t="\iint_R x\,dA" /> integrált az <M t="y = x" /> és <M t="y = 2 - x^2" /> közötti tartományon!</>}>
          <p>
            Metszéspontok: <M t="x = 2 - x^2 \implies x^2 + x - 2 = (x+2)(x-1) = 0 \implies x \in [-2, 1]" />.
            Alul <M t="y = x" />, felül <M t="y = 2 - x^2" />:
            <M block t="\int_{-2}^1 \int_x^{2-x^2} x\,dy\,dx = \int_{-2}^1 x(2 - x^2 - x)\,dx = \left[x^2 - \frac{x^4}{4} - \frac{x^3}{3}\right]_{-2}^1 = \left(1 - \frac{1}{4} - \frac{1}{3}\right) - \left(4 - 4 + \frac{8}{3}\right) = -\frac{9}{4}." />
          </p>
        </Task>

        <Task n={8} q={<>Írd fel az <M t="\iint_R f(x,y)\,dA" /> integrál határait II. típusúként (<M t="dx\,dy" />), ha <M t="R" />-et az <M t="x = y^2" /> parabola és az <M t="x = y + 2" /> egyenes határolja!</>}>
          <p>
            Metszéspontok: <M t="y^2 = y + 2 \implies (y-2)(y+1) = 0 \implies y \in [-1, 2]" />.
            Vízszintes nyíl balról belép az <M t="x = y^2" /> parabolán, jobbra kilép az <M t="x = y + 2" /> egyenesen:
            <M block t="\int_{-1}^2 \int_{y^2}^{y+2} f(x,y)\,dx\,dy." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 5. OLDAL ── */
  {
    title: '5. Az integrálás sorrendjének felcserélése',
    body: (
      <>
        <Story>
          A kettős integrálok egyik leglátványosabb „varázstrükkje” a <strong>sorrendcsere</strong>! Néha egy ismételt
          integrál belső része (például <M t="\int \frac{\sin y}{y}\,dy" /> vagy <M t="\int e^{x^2}\,dx" />) elemi
          függvényekkel egyáltalán <em>nem</em> integrálható. Ha viszont felrajzoljuk a tartományt és megfordítjuk
          <M t="dy\,dx" />-et <M t="dx\,dy" />-ra, a lehetetlen feladat 2 soros ujjgyakorlattá válik!
        </Story>

        <Steps
          title="Thomas 4. példa: Sorrendcsere a „lehetetlen” sin(y)/y integrálnál"
          problem={<>Számítsd ki az <M t="\int_0^1 \int_x^1 \frac{\sin y}{y}\,dy\,dx" /> integrált!</>}
          steps={[
            {
              title: '1. A tartomány kiolvasása a határokból',
              body: (
                <>
                  <M t="0 \le x \le 1" /> és <M t="x \le y \le 1" /> — ez a <M t="(0,0), (0,1), (1,1)" /> csúcsú háromszög
                  (az <M t="y = x" /> átló feletti fél-négyzet!).
                </>
              ),
            },
            {
              title: '2. Újraírás dx dy sorrendben (vízszintes nyilakkal)',
              body: (
                <>
                  <M t="y" /> fut <M t="0" />-tól <M t="1" />-ig; adott <M t="y" />-hoz a vízszintes nyíl <M t="x = 0" />-nál
                  lép be és <M t="x = y" />-nál lép ki! Tehát <M t="0 \le y \le 1, \; 0 \le x \le y" />.
                </>
              ),
            },
            {
              title: '3. Kiszámítás 2 sorban',
              body: (
                <>
                  <M block t="\int_0^1 \int_0^y \frac{\sin y}{y}\,dx\,dy = \int_0^1 \frac{\sin y}{y}\cdot y\,dy = \int_0^1 \sin y\,dy = \bigl[-\cos y\bigr]_0^1 = 1 - \cos 1." />
                </>
              ),
            },
          ]}
        />

        <OrderSwapMagicWidget />

        <Quiz
          q={<>Ha a tartomány <M t="0 \le y \le 2" /> és <M t="y \le x \le 2" />, hogyan néz ki ugyanez a tartomány <M t="dy\,dx" /> sorrendben?</>}
          options={[
            { label: '0 ≤ x ≤ 2 és x ≤ y ≤ 2' },
            { label: '0 ≤ x ≤ 2 és 0 ≤ y ≤ x', ok: true },
            { label: '0 ≤ x ≤ y és 0 ≤ y ≤ 2' },
          ]}
          explain={<>Az eredeti egyenlőtlenség 0 ≤ y ≤ x ≤ 2 (az y = x átló ALATTI háromszög)! Függőlegesen tehát 0 ≤ x ≤ 2 és y megy 0-tól x-ig!</>}
        />

        <Task n={9} q={<>Számítsd ki sorrendcserével az <M t="\int_0^1 \int_y^1 e^{x^2}\,dx\,dy" /> integrált!</>}>
          <p>
            A tartomány <M t="0 \le y \le x \le 1" />, tehát <M t="dy\,dx" /> sorrendben <M t="0 \le x \le 1, \; 0 \le y \le x" />:
            <M block t="\int_0^1 \int_0^x e^{x^2}\,dy\,dx = \int_0^1 x e^{x^2}\,dx = \left[\frac{1}{2}e^{x^2}\right]_0^1 = \frac{e - 1}{2}." />
          </p>
        </Task>

        <Task n={10} q={<>Számítsd ki sorrendcserével az <M t="\int_0^8 \int_{\sqrt[3]{y}}^2 \frac{1}{x^4 + 1}\,dx\,dy" /> integrált!</>}>
          <p>
            A tartomány <M t="0 \le y \le 8, \; y^{1/3} \le x \le 2" />, azaz <M t="0 \le x \le 2, \; 0 \le y \le x^3" />:
            <M block t="\int_0^2 \int_0^{x^3} \frac{1}{x^4 + 1}\,dy\,dx = \int_0^2 \frac{x^3}{x^4 + 1}\,dx = \left[\frac{1}{4}\ln(x^4 + 1)\right]_0^2 = \frac{\ln 17}{4}." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 6. OLDAL ── */
  {
    title: '6. Térfogat két felület között és 2D átlagérték',
    body: (
      <>
        <Story>
          A kettős integrál nemcsak az <M t="xy" />-sík feletti térfogatot tudja kiszámítani, hanem bármely két felület
          közé bezárt test térfogatát is — sőt, megadja egy síkbeli lemez <strong>átlaghőmérsékletét</strong> vagy egy
          domborzat <strong>átlagmagasságát</strong>!
        </Story>

        <Def title="Két felület közötti térfogat és 2D átlagérték">
          <ul>
            <li>
              <strong>Két felület közötti térfogat:</strong> ha <M t="g(x,y) \le f(x,y)" /> az <M t="R" /> tartományon:
              <M block t="V = \iint_R \bigl(f(x,y) - g(x,y)\bigr)\,dA." />
            </li>
            <li>
              <strong>Kétváltozós átlagérték:</strong> egy folytonos <M t="f(x,y)" /> függvény átlagértéke <M t="R" />-en:
              <M block t="\bar{f} = \frac{1}{\operatorname{Ter}(R)} \iint_R f(x,y)\,dA." />
            </li>
          </ul>
        </Def>

        <AverageValueTankWidget />

        <Task n={11} q={<>Számítsd ki az első oktánsban az <M t="x + 2y + z = 2" /> sík és a három koordinátasík által határolt tetraéder térfogatát!</>}>
          <p>
            A tető <M t="z = 2 - x - 2y" />, a padló <M t="z = 0" />. Az <M t="xy" />-síkbeli alaplap: <M t="x + 2y \le 2, \; x, y \ge 0" />,
            azaz <M t="0 \le x \le 2, \; 0 \le y \le 1 - \frac{x}{2}" />.
            <M block t="V = \int_0^2 \int_0^{1-x/2} (2 - x - 2y)\,dy\,dx = \int_0^2 \left[(2-x)\left(1-\frac{x}{2}\right) - \left(1-\frac{x}{2}\right)^2\right] dx = \int_0^2 \left(1 - \frac{x}{2}\right)^2 dx = \frac{2}{3}." />
            (Ellenőrzés geometriával: <M t="\frac{1}{6}abc = \frac{1}{6}\cdot 2 \cdot 1 \cdot 2 = \frac{2}{3}" />!)
          </p>
        </Task>

        <Task n={12} q={<>Mi az <M t="f(x,y) = x^2 + y^2" /> átlagértéke az <M t="R = [0, 2] \times [0, 2]" /> négyzeten?</>}>
          <p>
            <M t="\operatorname{Ter}(R) = 4" />. Az integrál:
            <M block t="\int_0^2 \int_0^2 (x^2 + y^2)\,dy\,dx = \int_0^2 \left(2x^2 + \frac{8}{3}\right) dx = \frac{16}{3} + \frac{16}{3} = \frac{32}{3}." />
            Így az átlagérték <M t="\bar{f} = \frac{1}{4}\cdot\frac{32}{3} = \frac{8}{3} \approx 2{,}67" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ── 7. OLDAL ── */
  {
    title: '7. Szimmetria és okos sorrendválasztás',
    body: (
      <>
        <Story>
          Mielőtt nekilátnál egy hosszú kettős integrál kiszámításának, mindig állj meg 5 másodpercre és kérdezd meg:
          (1) <strong>Van-e szimmetria</strong>, amely azonnal kinullázza a felét? (2) <strong>Melyik sorrendben</strong>
          úszom meg a tartomány kettévágását?
        </Story>

        <Def title="2D szimmetria-szabályok (időspóroló trükkök)">
          <ul>
            <li>Ha <M t="R" /> szimmetrikus az <M t="y" />-tengelyre (<M t="(-x, y) \in R" />), és <M t="f(-x, y) = -f(x, y)" /> (páratlan <M t="x" />-ben), akkor <M t="\iint_R f\,dA = 0" />!</li>
            <li>Ha <M t="R" /> szimmetrikus az <M t="x" />-tengelyre, és <M t="f(x, -y) = -f(x, y)" /> (páratlan <M t="y" />-ban), akkor <M t="\iint_R f\,dA = 0" />!</li>
          </ul>
        </Def>

        <SplitVsSingleOrderWidget />

        <Quiz
          q={<>Mennyi az <M t="\iint_R \bigl(3 + x^3\cos y - 5y e^{x^2}\bigr)\,dA" /> integrál az <M t="R = [-2, 2] \times [-1, 1]" /> téglalapon?</>}
          options={[
            { label: '0' },
            { label: '24 (mert a két bonyolult tag szimmetriából 0, és 3 · Ter(R) = 3 · 8 = 24!)', ok: true },
            { label: '12' },
          ]}
          explain={<>Az x³ cos y páratlan x-ben, a −5y e^(x²) pedig páratlan y-ban, a téglalap mindkét tengelyre szimmetrikus ⇒ mindkettő integrálja 0! Marad ∬ 3 dA = 3 · (4 · 2) = 24!</>}
        />

        <Task n={13} q={<>Számítsd ki az <M t="\iint_R y\,dA" /> integrált a <M t="(0,0), (2,0), (1,1)" /> csúcsú háromszögön az okosabb (<M t="dx\,dy" />) sorrenddel!</>}>
          <p>
            A <M t="dx\,dy" /> sorrendben egyetlen integrál: <M t="0 \le y \le 1, \; y \le x \le 2 - y" />:
            <M block t="\int_0^1 \int_y^{2-y} y\,dx\,dy = \int_0^1 y(2 - 2y)\,dy = \left[y^2 - \frac{2}{3}y^3\right]_0^1 = 1 - \frac{2}{3} = \frac{1}{3}." />
          </p>
        </Task>

        <Task n={14} q={<>Számítsd ki számolás nélkül az <M t="\iint_D (x^5 y^2 + 4)\,dA" /> integrált, ahol <M t="D" /> az <M t="x^2 + y^2 \le 9" /> körlap!</>}>
          <p>
            A körlap szimmetrikus az <M t="y" />-tengelyre, az <M t="x^5 y^2" /> páratlan <M t="x" />-ben ⇒ integrálja <M t="0" />.
            Marad <M t="\iint_D 4\,dA = 4 \cdot \operatorname{Ter}(D) = 4 \cdot (9\pi) = 36\pi" />.
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
        <DoubleIntegralSummaryDiagram />

        <Def title="Puskakártya — 15.1 Kettős integrál">
          <ul>
            <li><strong>Téglalapon:</strong> <M t="\int_a^b \int_c^d f\,dy\,dx = \int_c^d \int_a^b f\,dx\,dy" />.</li>
            <li><strong>Szorzatfüggvény téglalapon:</strong> <M t="\iint g(x)h(y)\,dA = \left(\int g\,dx\right)\left(\int h\,dy\right)" />.</li>
            <li><strong>Általános tartomány:</strong> Rajzold fel <M t="R" />-et → lőj nyilat (belépő = alsó, kilépő = felső határ) → külső határok konstansok!</li>
            <li><strong>Sorrendcsere:</strong> ha a belső integrál nem elemi (<M t="e^{x^2}, \frac{\sin y}{y}, \cos(x^2)" />), rajzold fel <M t="R" />-et és fordítsd meg!</li>
          </ul>
        </Def>

        <Warn>
          <strong>5 klasszikus vizsgabuktató:</strong>
          <ol>
            <li><strong>Változó a külső határokban:</strong> Ha a külső integrál határában <M t="x" /> vagy <M t="y" /> szerepel, biztosan rossz a felírás — a végeredménynek számnak kell lennie!</li>
            <li><strong>Vak sorrendcsere rajz nélkül:</strong> Nem cserélheted fel egyszerűen a két integráljelet, ha a határok változók! Mindig rajzold fel előbb a 2D tartományt!</li>
            <li><strong>Szorzat-szétválasztás nem-téglalapon:</strong> A <M t="\iint g(x)h(y)\,dA = (\int g)(\int h)" /> szabály <em>kizárólag</em> téglalapon igaz (háromszögön vagy körlapon TILOS!).</li>
            <li><strong>Rossz változó szerinti behelyettesítés:</strong> A belső <M t="\int f\,dy" /> integrálnál a határokat <M t="y" /> helyére írd be, ne <M t="x" /> helyére (érdemes kiírni: <M t="y=x^2" />-től <M t="y=x" />-ig)!</li>
            <li><strong>Felcserélt alsó és felső görbe:</strong> <M t="0 \le x \le 1" /> esetén <M t="x^2 \le x" /> (nem fordítva!), mert pl. <M t="0{,}5^2 = 0{,}25 < 0{,}5" />!</li>
          </ol>
        </Warn>

        <h3>Könnyebb feladatok (15–17.)</h3>

        <Task n={15} q={<>Számítsd ki az <M t="\int_0^2 \int_0^3 (x^2 + 2y)\,dy\,dx" /> ismételt integrált!</>}>
          <p>
            Belső: <M t="\bigl[x^2 y + y^2\bigr]_0^3 = 3x^2 + 9" />.
            Külső: <M t="\int_0^2 (3x^2 + 9)\,dx = \bigl[x^3 + 9x\bigr]_0^2 = 8 + 18 = 26" />.
          </p>
        </Task>

        <Task n={16} q={<>Számítsd ki az <M t="\int_0^1 \int_0^x 6xy\,dy\,dx" /> integrált!</>}>
          <p>
            Belső: <M t="\bigl[3x y^2\bigr]_0^x = 3x^3" />.
            Külső: <M t="\int_0^1 3x^3\,dx = \frac{3}{4}" />.
          </p>
        </Task>

        <Task n={17} q={<>Számítsd ki az <M t="\iint_R e^{x+2y}\,dA" /> integrált az <M t="R = [0, \ln 2] \times [0, \ln 3]" /> téglalapon!</>}>
          <p>
            Mivel <M t="e^{x+2y} = e^x \cdot e^{2y}" />, szétválasztva:
            <M block t="\left(\int_0^{\ln 2} e^x\,dx\right)\left(\int_0^{\ln 3} e^{2y}\,dy\right) = (2 - 1)\cdot\frac{9 - 1}{2} = 4." />
          </p>
        </Task>

        <h3>Közepes feladatok (18–20.)</h3>

        <Task n={18} q={<>Számítsd ki sorrendcserével az <M t="\int_0^2 \int_y^2 \cos(x^2)\,dx\,dy" /> integrált!</>}>
          <p>
            A tartomány <M t="0 \le y \le x \le 2" />, tehát <M t="0 \le x \le 2, \; 0 \le y \le x" />:
            <M block t="\int_0^2 \int_0^x \cos(x^2)\,dy\,dx = \int_0^2 x\cos(x^2)\,dx = \left[\frac{1}{2}\sin(x^2)\right]_0^2 = \frac{\sin 4}{2}." />
          </p>
        </Task>

        <Task n={19} q={<>Határozd meg a <M t="z = 4 - y^2" /> henger alatti és az <M t="y = 2x, \; y = 2, \; x = 0" /> háromszög feletti test térfogatát!</>}>
          <p>
            A háromszög: <M t="0 \le y \le 2, \; 0 \le x \le y/2" /> (<M t="dx\,dy" /> sokkal egyszerűbb!):
            <M block t="V = \int_0^2 \int_0^{y/2} (4 - y^2)\,dx\,dy = \int_0^2 \frac{y}{2}(4 - y^2)\,dy = \left[y^2 - \frac{y^4}{8}\right]_0^2 = 4 - 2 = 2." />
          </p>
        </Task>

        <Task n={20} q={<>Számítsd ki az <M t="\iint_R (x + y)\,dA" /> integrált az <M t="y = \sqrt{x}" /> és <M t="y = x^2" /> görbék közötti tartományon!</>}>
          <p>
            Metszéspontok: <M t="(0,0)" /> és <M t="(1,1)" />, alul <M t="x^2" />, felül <M t="\sqrt{x}" />:
            <M block t="\int_0^1 \int_{x^2}^{\sqrt{x}} (x + y)\,dy\,dx = \int_0^1 \left[x(\sqrt{x} - x^2) + \frac{1}{2}(x - x^4)\right] dx = \frac{2}{5} - \frac{1}{4} + \frac{1}{4} - \frac{1}{10} = \frac{3}{10}." />
          </p>
        </Task>

        <h3>Haladó feladatok (21–23.)</h3>

        <Task n={21} q={<>Számítsd ki sorrendcserével az <M t="\int_0^1 \int_{\sqrt{y}}^1 \sqrt{x^3 + 1}\,dx\,dy" /> integrált!</>}>
          <p>
            A tartomány <M t="0 \le y \le 1, \; \sqrt{y} \le x \le 1" />, ami <M t="0 \le x \le 1, \; 0 \le y \le x^2" />:
            <M block t="\int_0^1 \int_0^{x^2} \sqrt{x^3+1}\,dy\,dx = \int_0^1 x^2\sqrt{x^3+1}\,dx = \left[\frac{2}{9}(x^3+1)^{3/2}\right]_0^1 = \frac{2}{9}\bigl(2\sqrt{2} - 1\bigr)." />
          </p>
        </Task>

        <Task n={22} q={<>Írd fel egyetlen ismételt integrálként az <M t="\int_0^1 \int_0^x f(x,y)\,dy\,dx + \int_1^2 \int_0^{2-x} f(x,y)\,dy\,dx" /> összeget!</>}>
          <p>
            Az első darab a <M t="(0,0)-(1,0)-(1,1)" />, a második az <M t="(1,0)-(2,0)-(1,1)" /> háromszög — együtt
            éppen a <M t="(0,0), (2,0), (1,1)" /> háromszöget alkotják! Vízszintes (<M t="dx\,dy" />) sorrendben egyetlen integrál:
            <M block t="\int_0^1 \int_y^{2-y} f(x,y)\,dx\,dy." />
          </p>
        </Task>

        <Task n={23} q={<>Számítsd ki az <M t="\int_0^1 \int_0^1 \frac{x - y}{(x + y)^3}\,dy\,dx" /> és az <M t="\int_0^1 \int_0^1 \frac{x - y}{(x + y)^3}\,dx\,dy" /> integrálokat! Miért <em>nem</em> egyenlők (miért nem sérti ez Fubini tételét)?</>}>
          <p>
            • Előbb <M t="y" /> szerint: <M t="\frac{x-y}{(x+y)^3} = \frac{\partial}{\partial y}\left(\frac{-y}{(x+y)^2}\right)" /> ⇒ belső integrál <M t="\frac{-1}{(x+1)^2}" />, külső: <M t="\int_0^1 \frac{-1}{(x+1)^2}\,dx = -\frac{1}{2}" />.
            <br />
            • Előbb <M t="x" /> szerint: antiszimmetriából pontosan az ellentettje, <M t="+\frac{1}{2}" />!
            <br />
            <strong>Miért?</strong> Mert a függvény az origóban <M t="(0,0)" /> nem korlátos és nem abszolút integrálható (<M t="\iint |f|\,dA = +\infty" />), így Fubini tétele feltételei nem teljesülnek!
          </p>
        </Task>
      </>
    ),
  },
];
