import type { Page } from './s1_1';
import { M } from '../components/M';
import { Def, Story, Task, Warn, Quiz, Steps } from '../components/ui';
import {
  LagrangeTangencyWidget,
  CircleConstraintWidget,
  EllipsoidBox3DWidget,
  TwoConstraints3DWidget,
  ShadowPriceWidget,
  InteriorVsBoundaryWidget,
  CuspFailureWidget,
  LagrangeMasterSummaryDiagram,
} from '../components/Widgets148';

export const S14_8: Page[] = [
  /* ── 1. OLDAL ── */
  {
    title: '1. A feltételes szélsőérték geometriája: párhuzamos gradiensek',
    body: (
      <>
        <Story>
          Képzeld el, hogy egy hegyi túraösvényen (<M t="g(x,y) = 0" />) sétálsz egy szintvonalas térképen
          (<M t="f(x,y) = c" />). Amíg az ösvény <em>keresztezi</em> a szintvonalakat, az egyik irányba lépve még
          feljebb, a másikba még lejjebb juthatsz. Hol lehet tehát az ösvény legmagasabb vagy legalacsonyabb pontja?
          Pontosan ott, ahol az ösvény <strong>érinti</strong> az egyik szintvonalat — vagyis a két görbe normálisa,
          <M t="\nabla f" /> és <M t="\nabla g" />, <strong>egymással párhuzamos</strong>!
        </Story>

        <Def title="12. tétel — Az ortogonális gradiens tétel és a Lagrange-módszer">
          <p>
            Legyen <M t="f" /> és <M t="g" /> folytonosan differenciálható a <M t="g(x,y)=0" /> görbe egy nyílt
            környezetében, és tegyük fel, hogy <M t="\nabla g \ne \mathbf{0}" />. Ha <M t="f" />-nek a
            <M t="g(x,y)=0" /> mellékfeltétel mellett lokális szélsőértéke van egy <M t="P_0" /> pontban, akkor létezik
            olyan <M t="\lambda \in \mathbb{R}" /> valós szám (a <strong>Lagrange-multiplikátor</strong>), amelyre:
          </p>
          <M block t="\nabla f(P_0) = \lambda\,\nabla g(P_0) \qquad \text{és} \qquad g(P_0) = 0." />
          <p>
            Komponensenként két változóban ez 3 egyenlet a 3 ismeretlenre (<M t="x, y, \lambda" />):
            <M block t="f_x(x,y) = \lambda g_x(x,y), \qquad f_y(x,y) = \lambda g_y(x,y), \qquad g(x,y) = 0." />
          </p>
        </Def>

        <LagrangeTangencyWidget />

        <Task n={1} q={<>Keresd meg az <M t="f(x,y) = xy" /> maximumát az <M t="x + y = 10" /> mellékfeltétel mellett Lagrange-multiplikátorral!</>}>
          <p>
            Legyen <M t="g(x,y) = x + y - 10 = 0" />. Ekkor <M t="\nabla f = (y, x)" /> és <M t="\nabla g = (1, 1)" />.
            A Lagrange-egyenletek:
            <M block t="y = \lambda, \qquad x = \lambda, \qquad x + y = 10." />
            Innen <M t="x = y = \lambda" />, így <M t="2\lambda = 10 \implies \lambda = 5" />, tehát <M t="x = 5, \; y = 5" />.
            A maximális szorzat <M t="f(5,5) = 25" />.
          </p>
        </Task>

        <Task n={2} q={<>Határozd meg az <M t="\frac{x^2}{8} + \frac{y^2}{2} = 1" /> ellipszisbe írható, tengelypárhuzamos oldalú legnagyobb területű téglalap méreteit! (Thomas 2. példa)</>}>
          <p>
            Az első síknegyedbeli sarokpont <M t="(x,y)" /> (<M t="x,y>0" />), a téglalap területe <M t="A(x,y) = 4xy" />.
            Mellékfeltétel: <M t="g(x,y) = \frac{x^2}{8} + \frac{y^2}{2} - 1 = 0" />.
            <M block t="4y = \lambda \frac{x}{4}, \qquad 4x = \lambda y." />
            Az elsőből <M t="\lambda = \frac{16y}{x}" />, behelyettesítve a másodikba: <M t="4x = \frac{16y^2}{x} \implies x^2 = 4y^2" />.
            Ezt a feltételbe írva: <M t="\frac{4y^2}{8} + \frac{y^2}{2} = y^2 = 1 \implies y = 1, \; x = 2" />.
            A téglalap oldalai <M t="2x = 4" /> és <M t="2y = 2" />, maximális területe <M t="A_{\max} = 8" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ── 2. OLDAL ── */
  {
    title: '2. Algebrai recept és az esetszétválasztás művészete 2D-ben',
    body: (
      <>
        <Story>
          A Lagrange-egyenletrendszer felírása általában 10 másodperc — az igazi feladat a <strong>nemlineáris
          egyenletrendszer hibátlan megoldása</strong>. A leggyakoribb trükk az, hogy nem próbálod rögtön kiszámítani
          <M t="\lambda" />-t, hanem kiküszöbölöd, vagy faktorizálással szétválasztod a nulla és nem nulla eseteket!
        </Story>

        <Steps
          title="Klasszikus esetszétválasztás: f(x,y) = x² + 2y² az x² + y² = 1 körön"
          problem={<>Keresd meg az <M t="f(x,y) = x^2 + 2y^2" /> abszolút maximumát és minimumát az <M t="x^2 + y^2 = 1" /> egységkörön!</>}
          steps={[
            {
              title: '1. A Lagrange-egyenletrendszer felírása',
              body: (
                <>
                  <M block t="2x = 2\lambda x, \qquad 4y = 2\lambda y, \qquad x^2 + y^2 = 1." />
                </>
              ),
            },
            {
              title: '2. Faktorizálás (SOHA ne ossz x-szel vagy y-nal!)',
              body: (
                <>
                  Az első egyenlet: <M t="2x(1 - \lambda) = 0" />, így <strong>vagy</strong> <M t="x = 0" />,
                  <strong>vagy</strong> <M t="\lambda = 1" />.
                </>
              ),
            },
            {
              title: '3. Mindkét ág végigvitele',
              body: (
                <>
                  <ul>
                    <li><strong>1. ág (<M t="x = 0" />):</strong> a körből <M t="y = \pm 1" /> (és a második egyenletből <M t="\lambda = 2" />). Jelöltek: <M t="(0, 1)" /> és <M t="(0, -1)" />.</li>
                    <li><strong>2. ág (<M t="\lambda = 1" />):</strong> a második egyenlet <M t="4y = 2y \implies y = 0" />, a körből <M t="x = \pm 1" />. Jelöltek: <M t="(1, 0)" /> és <M t="(-1, 0)" />.</li>
                  </ul>
                </>
              ),
            },
            {
              title: '4. Függvényértékek összehasonlítása',
              body: (
                <>
                  <M t="f(0, \pm 1) = 2" /> (<strong>abszolút maximum</strong>) és <M t="f(\pm 1, 0) = 1" /> (<strong>abszolút minimum</strong>).
                </>
              ),
            },
          ]}
        />

        <CircleConstraintWidget />

        <Quiz
          q={<>Ha a Lagrange-egyenlet <M t="2x = 2\lambda x" />, miért súlyos hiba rögtön elosztani <M t="2x" />-szel?</>}
          options={[
            { label: 'Mert λ negatív is lehet' },
            { label: 'Mert ezzel elveszítjük az x = 0 esetet, amely pont a szélsőértéket adhatja!', ok: true },
            { label: 'Mert 2x nem szerepelhet mindkét oldalon' },
          ]}
          explain={<>A fenti példában éppen az x = 0 ág adta meg a (0, ±1) abszolút maximumot! Mindig egy oldalra rendezve emelj ki: 2x(1 − λ) = 0.</>}
        />

        <Task n={3} q={<>Határozd meg az <M t="f(x,y) = 3x + 4y" /> abszolút szélsőértékeit az <M t="x^2 + y^2 = 25" /> körön!</>}>
          <p>
            <M t="3 = 2\lambda x" />, <M t="4 = 2\lambda y" /> ⇒ <M t="x = \frac{3}{2\lambda}" />, <M t="y = \frac{4}{2\lambda}" />
            (itt <M t="\lambda \ne 0" />). Beírva a körbe:
            <M block t="\frac{9 + 16}{4\lambda^2} = 25 \implies 4\lambda^2 = 1 \implies \lambda = \pm\frac{1}{2}." />
            Így <M t="(3, 4)" />-ben abszolút maximum <M t="f(3,4) = 25" />, és <M t="(-3, -4)" />-ben abszolút minimum <M t="f(-3,-4) = -25" />.
          </p>
        </Task>

        <Task n={4} q={<>Keresd meg az <M t="f(x,y) = x^2 - y^2" /> szélsőértékeit az <M t="x^2 + y^2 = 1" /> körön!</>}>
          <p>
            <M t="2x = 2\lambda x \implies x(1-\lambda)=0" /> és <M t="-2y = 2\lambda y \implies y(1+\lambda)=0" />.
            • Ha <M t="x = 0" />, akkor <M t="y = \pm 1" /> (<M t="\lambda = -1" />): <M t="f(0, \pm 1) = -1" /> (abszolút min).
            • Ha <M t="\lambda = 1" />, akkor <M t="y = 0, \; x = \pm 1" />: <M t="f(\pm 1, 0) = 1" /> (abszolút max).
          </p>
        </Task>
      </>
    ),
  },

  /* ── 3. OLDAL ── */
  {
    title: '3. Háromváltozós Lagrange-módszer egy mellékfeltétellel',
    body: (
      <>
        <Story>
          A térben a mellékfeltétel (<M t="g(x,y,z) = c" />) egy 3D felület — például egy gömb, egy ellipszoid vagy
          egy sík —, és ezen a felületen keressük az <M t="f(x,y,z)" /> legnagyobb vagy legkisebb értékét. A geometria
          ugyanaz marad: az optimális pontban <M t="f" /> szintfelülete <strong>érinti</strong> a <M t="g = c" />
          felületet, így a két felület normálvektora párhuzamos!
        </Story>

        <Def title="3D Lagrange-rendszer (4 egyenlet, 4 ismeretlen)">
          <M block t="f_x = \lambda g_x, \qquad f_y = \lambda g_y, \qquad f_z = \lambda g_z, \qquad g(x,y,z) = c." />
          <p>
            <strong>Szimmetria-trükk:</strong> ha <M t="f" /> és <M t="g" /> szimmetrikus vagy skálázható a változókra
            nézve, szorozd meg az első egyenletet <M t="x" />-szel, a másodikat <M t="y" />-nal, a harmadikat <M t="z" />-vel —
            gyakran egyetlen sorban kiadja <M t="\lambda" />-t!
          </p>
        </Def>

        <EllipsoidBox3DWidget />

        <Task n={5} q={<>Határozd meg az <M t="\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1" /> ellipszoidba írható legnagyobb térfogatú, tengelypárhuzamos téglatest térfogatát!</>}>
          <p>
            Maximalizáljuk a <M t="V(x,y,z) = 8xyz" /> térfogatot (<M t="x,y,z > 0" />). A Lagrange-egyenletek:
            <M block t="8yz = \lambda \frac{2x}{a^2}, \qquad 8xz = \lambda \frac{2y}{b^2}, \qquad 8xy = \lambda \frac{2z}{c^2}." />
            Szorozzuk meg sorban <M t="x, y, z" />-vel:
            <M block t="8xyz = 2\lambda \frac{x^2}{a^2} = 2\lambda \frac{y^2}{b^2} = 2\lambda \frac{z^2}{c^2}." />
            Mivel <M t="x,y,z>0" />, innen <M t="\frac{x^2}{a^2} = \frac{y^2}{b^2} = \frac{z^2}{c^2}" />. A feltételből
            mindegyik <M t="\frac{1}{3}" />, tehát <M t="x = \frac{a}{\sqrt{3}}, \; y = \frac{b}{\sqrt{3}}, \; z = \frac{c}{\sqrt{3}}" />,
            és <M t="V_{\max} = \frac{8abc}{3\sqrt{3}}" />.
          </p>
        </Task>

        <Task n={6} q={<>Találd meg a <M t="2x - 2y + z = 9" /> sík origóhoz legközelebbi pontját Lagrange-multiplikátorral!</>}>
          <p>
            Minimalizáljuk <M t="f(x,y,z) = x^2 + y^2 + z^2" />-et a <M t="g(x,y,z) = 2x - 2y + z - 9 = 0" /> feltétellel:
            <M block t="2x = 2\lambda \implies x = \lambda, \qquad 2y = -2\lambda \implies y = -\lambda, \qquad 2z = \lambda \implies z = \frac{\lambda}{2}." />
            Beírva a síkba: <M t="2\lambda + 2\lambda + \frac{\lambda}{2} = \frac{9}{2}\lambda = 9 \implies \lambda = 2" />.
            A legközelebbi pont a <M t="(2, -2, 1)" />, távolsága <M t="\sqrt{4+4+1} = 3" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ── 4. OLDAL ── */
  {
    title: '4. Két mellékfeltétel 3D-ben (metszésgörbe menti optimalizálás)',
    body: (
      <>
        <Story>
          Mi történik, ha 3D-ben egyszerre <strong>két</strong> korlátozó egyenletünk van — például egy henger és egy
          ferde sík metszésgörbéjén (egy térbeli ellipszisen) mozgunk? A metszésgörbe érintővektora merőleges
          <M t="\nabla g_1" />-re is és <M t="\nabla g_2" />-re is. Szélsőértékben <M t="\nabla f" />-nek is merőlegesnek
          kell lennie az érintőre — tehát <M t="\nabla f" /> benne fekszik a <M t="\nabla g_1" /> és <M t="\nabla g_2" />
          által kifeszített síkban!
        </Story>

        <Def title="Két mellékfeltételes Lagrange-elv (5 egyenlet, 5 ismeretlen)">
          <p>
            Ha <M t="f(x,y,z)" /> szélsőértéket vesz fel a <M t="g_1(x,y,z) = c_1" /> és <M t="g_2(x,y,z) = c_2" />
            felületek metszésgörbéjén (ahol <M t="\nabla g_1 \times \nabla g_2 \ne \mathbf{0}" />), akkor léteznek
            <M t="\lambda, \mu \in \mathbb{R}" /> multiplikátorok, hogy:
          </p>
          <M block t="\nabla f = \lambda\,\nabla g_1 + \mu\,\nabla g_2, \qquad g_1(x,y,z) = c_1, \qquad g_2(x,y,z) = c_2." />
        </Def>

        <Steps
          title="Thomas 4. példa: Sík és henger metszésellipszise"
          problem={<>Keresd meg az <M t="x + y + z = 1" /> sík és az <M t="x^2 + y^2 = 1" /> henger metszésellipszisének az origóhoz legközelebbi és legtávolabbi pontjait!</>}
          steps={[
            {
              title: '1. Célfüggvény és két mellékfeltétel',
              body: (
                <>
                  <M t="f(x,y,z) = x^2 + y^2 + z^2" />, <M t="g_1 = x + y + z - 1 = 0" />, <M t="g_2 = x^2 + y^2 - 1 = 0" />.
                </>
              ),
            },
            {
              title: '2. Az 5 egyenlet felírása',
              body: (
                <>
                  <M block t="2x = \lambda + 2\mu x, \qquad 2y = \lambda + 2\mu y, \qquad 2z = \lambda." />
                </>
              ),
            },
            {
              title: '3. Az első két egyenlet kivonása',
              body: (
                <>
                  <M t="2(x - y) = 2\mu(x - y) \implies (x - y)(1 - \mu) = 0" />. Két eset adódik:
                  <br />• <strong>1. eset (<M t="x = y" />):</strong> a hengerből <M t="2x^2 = 1 \implies x = y = \pm\frac{\sqrt{2}}{2}" />, a síkból <M t="z = 1 \mp \sqrt{2}" />.
                  <br />• <strong>2. eset (<M t="\mu = 1" />):</strong> ekkor az első egyenletből <M t="2x = \lambda + 2x \implies \lambda = 0 \implies z = 0" />, a síkból <M t="x + y = 1" />, a hengerből <M t="(1, 0, 0)" /> és <M t="(0, 1, 0)" />.
                </>
              ),
            },
            {
              title: '4. Távolságok összehasonlítása',
              body: (
                <>
                  • <M t="(1,0,0)" /> és <M t="(0,1,0)" />: <M t="d = 1" /> (<strong>legközelebbi</strong>).
                  <br />• <M t="(-\frac{\sqrt{2}}{2}, -\frac{\sqrt{2}}{2}, 1+\sqrt{2})" />: <M t="d = \sqrt{4 + 2\sqrt{2}} \approx 2{,}61" /> (<strong>legtávolabbi</strong>).
                </>
              ),
            },
          ]}
        />

        <TwoConstraints3DWidget />

        <Task n={7} q={<>Határozd meg az <M t="f(x,y,z) = x + 2y + 3z" /> maximumát és minimumát az <M t="x - y + z = 1" /> sík és az <M t="x^2 + y^2 = 1" /> henger metszésgörbéjén!</>}>
          <p>
            <M t="1 = \lambda + 2\mu x" />, <M t="2 = -\lambda + 2\mu y" />, <M t="3 = \lambda" />.
            Azonnal <M t="\lambda = 3" />, innen <M t="2\mu x = -2 \implies \mu x = -1" /> és <M t="2\mu y = 5 \implies \mu y = \frac{5}{2}" />.
            Négyzetre emelve és összeadva: <M t="\mu^2(x^2 + y^2) = \mu^2 = 1 + \frac{25}{4} = \frac{29}{4} \implies \mu = \pm\frac{\sqrt{29}}{2}" />.
            Így <M t="(x, y) = \pm\bigl(-\frac{2}{\sqrt{29}}, \frac{5}{\sqrt{29}}\bigr)" />, <M t="z = 1 - x + y" />,
            a szélsőértékek <M t="3 \pm \sqrt{29}" />.
          </p>
        </Task>

        <Task n={8} q={<>Mi a geometriai oka annak, hogy két mellékfeltételnél megköveteljük a <M t="\nabla g_1 \times \nabla g_2 \ne \mathbf{0}" /> feltételt?</>}>
          <p>
            Ha <M t="\nabla g_1 \times \nabla g_2 = \mathbf{0}" />, akkor a két gradiens párhuzamos (vagy valamelyik nulla),
            tehát nem feszítenek ki 2D normálsíkot — a két felület ott érintkezik egymással, nem sima metszésgörbében
            találkoznak, így a <M t="\lambda \nabla g_1 + \mu \nabla g_2" /> lineáris kombináció nem fedi le az összes normális irányt.
          </p>
        </Task>
      </>
    ),
  },

  /* ── 5. OLDAL ── */
  {
    title: '5. Mit jelent valójában λ? — Az árnyékár és az érzékenység-tétel',
    body: (
      <>
        <Story>
          A legtöbb hallgató úgy kezeli <M t="\lambda" />-t, mint egy eldobható segédváltozót, amitől gyorsan meg kell
          szabadulni. Pedig a közgazdaságtanban, a fizikában és az optimalizálásban <strong><M t="\lambda" /> a
          legértékesebb szám az egész megoldásban</strong>! Megmondja, mennyit ér a korlát lazítása egyetlen egységgel.
        </Story>

        <Def title="Az árnyékár (érzékenység) tétele">
          <p>
            Tekintsük az <M t="f(x,y) \to \max/\min" /> feladatot a <M t="g(x,y) = c" /> mellékfeltétellel, és jelölje
            <M t="f^*(c) = f(x^*(c), y^*(c))" /> az optimális értéket a <M t="c" /> korlát függvényében! A láncszabály szerint:
          </p>
          <M block t="\frac{df^*}{dc} = f_x \frac{dx^*}{dc} + f_y \frac{dy^*}{dc} = \lambda\Bigl(g_x \frac{dx^*}{dc} + g_y \frac{dy^*}{dc}\Bigr) = \lambda\,\frac{d}{dc}\bigl(g(x^*(c),y^*(c))\bigr) = \lambda \cdot 1 = \lambda!" />
          <p>
            <strong>Jelentése:</strong> ha a korlátot <M t="c" />-ről <M t="c + \Delta c" />-re változtatjuk, az optimális
            célfüggvény-érték közelítőleg <M t="\Delta f^* \approx \lambda\,\Delta c" />-vel változik!
          </p>
        </Def>

        <ShadowPriceWidget />

        <Quiz
          q={<>Egy gyár profitját maximalizáltuk költségvetési korlát (<M t="B" /> millió Ft) mellett, és <M t="\lambda = 1{,}4" /> jött ki. Mit jelent ez?</>}
          options={[
            { label: 'A maximális profit 1,4 millió Ft' },
            { label: 'Ha a költségvetést 1 millió Ft-tal növeljük, az optimális profit kb. 1,4 millió Ft-tal nő!', ok: true },
            { label: 'A költségvetés 1,4-szerese a nyereségnek' },
          ]}
          explain={<>Mivel dP*/dB = λ = 1,4, minden plusz 1 millió Ft befektetés kb. 1,4 millió Ft extra profitot hoz az optimum közelében — ezért hívják λ-t árnyékárnak (shadow price)!</>}
        />

        <Task n={9} q={<>Az <M t="f(x,y) = xy" />, <M t="x + y = c" /> feladatban ellenőrizd közvetlenül, hogy <M t="\frac{df^*}{dc} = \lambda" />!</>}>
          <p>
            Az 1. feladat mintájára <M t="x^* = y^* = \frac{c}{2}" />, és <M t="\lambda = x^* = \frac{c}{2}" />.
            Az optimális érték <M t="f^*(c) = \frac{c^2}{4}" />. Deriválva <M t="c" /> szerint:
            <M block t="\frac{df^*}{dc} = \frac{2c}{4} = \frac{c}{2} = \lambda." />
            Tökéletes egyezés!
          </p>
        </Task>

        <Task n={10} q={<>A Cobb–Douglas-modellben <M t="P(L,K) = 100 L^{3/4} K^{1/4}" /> a termelés, a költségkorlát <M t="150L + 250K = 50\,000" />. Milyen <M t="L, K" /> mellett maximális a termelés?</>}>
          <p>
            <M t="75 L^{-1/4} K^{1/4} = 150\lambda" /> és <M t="25 L^{3/4} K^{-3/4} = 250\lambda" />.
            Elosztva egymással a két egyenletet:
            <M block t="\frac{75}{25}\cdot\frac{K}{L} = \frac{150}{250} \implies 3\frac{K}{L} = \frac{3}{5} \implies L = 5K." />
            A korlátba írva: <M t="150(5K) + 250K = 1000K = 50\,000 \implies K = 50, \; L = 250" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ── 6. OLDAL ── */
  {
    title: '6. A 14.7 és 14.8 egyesítése: zárt tartományok görbe határral',
    body: (
      <>
        <Story>
          A 14.7-ben láttuk, hogyan keressük egy folytonos függvény abszolút szélsőértékeit zárt, korlátos tartományon:
          előbb a belsejét, aztán a határát vizsgáljuk. Ha a határ egy sima görbe — például kör (<M t="x^2+y^2=R^2" />)
          vagy ellipszis —, akkor a határ paraméterezése helyett sokkal gyorsabb és tisztább <strong>Lagrange-multiplikátort</strong>
          használni!
        </Story>

        <Def title="Kétlépcsős szuperstratégia g(x, y) ≤ c tartományokra">
          <ol>
            <li><strong>Belső pontok (<M t="g(x,y) < c" />):</strong> oldd meg a 14.7-es <M t="\nabla f = \mathbf{0}" /> rendszert, és tartsd meg azokat, amelyek szigorúan belül vannak!</li>
            <li><strong>Határ (<M t="g(x,y) = c" />):</strong> oldd meg a 14.8-as <M t="\nabla f = \lambda \nabla g, \; g = c" /> rendszert!</li>
            <li><strong>Döntő:</strong> az összes összegyűjtött pontban számítsd ki <M t="f(x,y)" />-t — a legnagyobb az abszolút maximum, a legkisebb az abszolút minimum!</li>
          </ol>
        </Def>

        <InteriorVsBoundaryWidget />

        <Task n={11} q={<>Határozd meg az <M t="f(x,y) = x^2 + 2y^2 - x" /> abszolút szélsőértékeit az <M t="x^2 + y^2 \le 1" /> zárt körlapon!</>}>
          <p>
            <strong>1. Belső (<M t="x^2+y^2 < 1" />):</strong> <M t="f_x = 2x - 1 = 0 \implies x = \frac{1}{2}" />, <M t="f_y = 4y = 0 \implies y = 0" />.
            Benne van a körben, <M t="f(\frac{1}{2}, 0) = -\frac{1}{4}" />.
          </p>
          <p>
            <strong>2. Határ (<M t="x^2+y^2 = 1" />):</strong> <M t="2x - 1 = 2\lambda x" /> és <M t="4y = 2\lambda y \implies y(2-\lambda) = 0" />.
            • Ha <M t="y = 0" />: <M t="x = \pm 1" />, ekkor <M t="f(1,0) = 0" />, <M t="f(-1,0) = 2" />.
            • Ha <M t="\lambda = 2" />: <M t="2x - 1 = 4x \implies x = -\frac{1}{2}" />, ekkor <M t="y = \pm\frac{\sqrt{3}}{2}" /> és <M t="f(-\frac{1}{2}, \pm\frac{\sqrt{3}}{2}) = \frac{1}{4} + \frac{3}{2} + \frac{1}{2} = \frac{9}{4}" />.
          </p>
          <p>
            <strong>Eredmény:</strong> Abszolút min <M t="-\frac{1}{4}" /> a <M t="(\frac{1}{2}, 0)" /> belső pontban; abszolút max <M t="\frac{9}{4}" /> a <M t="(-\frac{1}{2}, \pm\frac{\sqrt{3}}{2})" /> határpontokban.
          </p>
        </Task>

        <Task n={12} q={<>Keresd meg a <M t="T(x,y) = x^2 + y^2 - 2x" /> hőmérséklet abszolút maximumát és minimumát az <M t="x^2 + 4y^2 \le 4" /> ellipszislapon!</>}>
          <p>
            <strong>1. Belső:</strong> <M t="T_x = 2x - 2 = 0, \; T_y = 2y = 0 \implies (1, 0)" /> (benne van, <M t="1^2+0 < 4" />), <M t="T(1,0) = -1" />.
            <br />
            <strong>2. Határ (<M t="x^2 + 4y^2 = 4" />):</strong> <M t="2x - 2 = 2\lambda x" />, <M t="2y = 8\lambda y \implies y(1 - 4\lambda) = 0" />.
            • Ha <M t="y = 0" />: <M t="x = \pm 2" />, <M t="T(2,0) = 0" />, <M t="T(-2,0) = 8" />.
            • Ha <M t="\lambda = \frac{1}{4}" />: <M t="2x - 2 = \frac{1}{2}x \implies x = \frac{4}{3}" />, <M t="y = \pm\frac{\sqrt{5}}{3}" />, <M t="T = \frac{16}{9} + \frac{5}{9} - \frac{8}{3} = -\frac{1}{3}" />.
            <br />
            <strong>Válasz:</strong> Abszolút minimum <M t="-1" /> az <M t="(1,0)" />-ban; abszolút maximum <M t="8" /> a <M t="(-2,0)" />-ban.
          </p>
        </Task>
      </>
    ),
  },

  /* ── 7. OLDAL ── */
  {
    title: '7. Mikor vall kudarcot a Lagrange-módszer? (Szinguláris pontok)',
    body: (
      <>
        <Story>
          Minden matematikai tételnek vannak „apró betűs” feltételei — és a Lagrange-tételé különösen tanulságos!
          Mi történik, ha a feltételgörbének éles csúcsa van, ahol <M t="\nabla g(P_0) = \mathbf{0}" />? Ilyenkor a
          görbének nincs egyértelmű normálisa, ezért a <M t="\nabla f = \lambda \nabla g" /> egyenlet egyszerűen
          <strong>átugorhatja</strong> a valódi szélsőértéket!
        </Story>

        <Def title="A szinguláris pontok szabálya (∇g = 0)">
          <p>
            A <M t="g(x,y) = 0" /> feltétel mellett az <M t="f" /> függvény feltételes szélsőértékei az alábbi két
            ponthalmaz valamelyikéből kerülhetnek ki:
          </p>
          <ol>
            <li><strong>Reguláris Lagrange-pontok:</strong> ahol <M t="\nabla f = \lambda \nabla g" /> és <M t="g = 0" />.</li>
            <li><strong>Szinguláris pontok:</strong> ahol <M t="\nabla g = \mathbf{0}" /> és <M t="g = 0" /> (valamint a görbe esetleges végpontjai, ha a feltétel nincs lezárva).</li>
          </ol>
        </Def>

        <CuspFailureWidget />

        <Quiz
          q={<>Ha az <M t="f(x,y) = x" /> függvényt minimalizáljuk a <M t="g(x,y) = y^2 - x^3 = 0" /> görbén, mit ad a <M t="\nabla f = \lambda \nabla g" /> rendszer?</>}
          options={[
            { label: 'Megadja az (0, 0) minimumot λ = 0 értékkel' },
            { label: 'Ellentmondást (1 = 0) ad, nincs megoldása — a (0,0) szinguláris pontként (∇g = 0) bukkan fel!', ok: true },
            { label: 'Végtelen sok megoldást ad' },
          ]}
          explain={<>∇f = (1, 0), ∇g = (−3x², 2y). A 0 = 2λy egyenletből vagy λ = 0 (ekkor 1 = 0, ellentmondás!), vagy y = 0 ⇒ x = 0 ⇒ 1 = 0 (ellentmondás!). A valódi (0, 0) minimumot kizárólag a ∇g = 0 vizsgálat találja meg!</>}
        />

        <Task n={13} q={<>Van-e abszolút maximuma az <M t="f(x,y) = x + y" /> függvénynek az <M t="xy = 1" /> hiperbolán? Mit ad a Lagrange-módszer?</>}>
          <p>
            Lagrange: <M t="1 = \lambda y" />, <M t="1 = \lambda x \implies x = y" />, a hiperbolából <M t="(1,1)" /> és <M t="(-1,-1)" />.
            Azonban az <M t="xy = 1" /> hiperbola <strong>nem korlátos</strong>! Az I. síknegyedben <M t="x \to \infty \implies f \to +\infty" />,
            a III.-ban <M t="x \to -\infty \implies f \to -\infty" />. Tehát <M t="(1,1)" /> csak <em>lokális</em> minimum
            (<M t="f=2" />), <M t="(-1,-1)" /> csak <em>lokális</em> maximum (<M t="f=-2" />), abszolút szélsőérték nincs!
          </p>
        </Task>

        <Task n={14} q={<>Vizsgáld meg az <M t="f(x,y) = x^2 + y^2" /> minimumát a <M t="(x-1)^3 - y^2 = 0" /> görbén!</>}>
          <p>
            A görbe <M t="x \ge 1" /> tartományban halad, csúcspontja az <M t="(1,0)" />, ahol <M t="\nabla g = (3(x-1)^2, -2y) = (0,0)" />.
            Mivel <M t="x \ge 1" />, minden pontban <M t="x^2 + y^2 \ge 1^2 + 0 = 1" />, tehát az <M t="(1,0)" /> szinguláris
            pont a valódi abszolút minimum — még ha a reguláris Lagrange-egyenletek <M t="(1,0)" />-ban ellentmondást is adnak (<M t="2 = 0" />)!
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
        <LagrangeMasterSummaryDiagram />

        <Def title="Puskakártya — 14.8 Lagrange-multiplikátorok">
          <ul>
            <li><strong>1 mellékfeltétel:</strong> <M t="\nabla f = \lambda \nabla g" />, <M t="g = c" />.</li>
            <li><strong>2 mellékfeltétel:</strong> <M t="\nabla f = \lambda \nabla g_1 + \mu \nabla g_2" />, <M t="g_1 = c_1" />, <M t="g_2 = c_2" />.</li>
            <li><strong>Árnyékár:</strong> <M t="\frac{df^*}{dc} = \lambda" />.</li>
            <li><strong>Zárt tartomány <M t="g \le c" />:</strong> belső (<M t="\nabla f = \mathbf{0}" />) + határ (<M t="\nabla f = \lambda \nabla g" />).</li>
          </ul>
        </Def>

        <Warn>
          <strong>5 klasszikus vizsgabuktató:</strong>
          <ol>
            <li><strong>Osztás változóval:</strong> <M t="2x = 2\lambda x" /> esetén soha ne ossz <M t="x" />-szel — emeld ki: <M t="2x(1-\lambda)=0" />!</li>
            <li><strong>Nem korlátos feltételhalmaz:</strong> Pl. <M t="xy = 1" /> vagy <M t="x+y=10" /> esetén a Lagrange-pont lehet csak lokális szélsőérték — mindig ellenőrizd a tartomány végtelenbe nyúlását!</li>
            <li><strong><M t="\nabla g = \mathbf{0}" /> elfelejtése:</strong> Csúcspontos feltételgörbéken a szinguláris pontok is lehetnek szélsőértékek.</li>
            <li><strong>Lagrange-pont = biztos szélsőérték?</strong> Nem! A <M t="\nabla f = \lambda \nabla g" /> csak <em>szükséges</em> feltétel (lehet nyeregpont vagy lokális max/min is).</li>
            <li><strong>Elfelejtett belső pontok <M t="g(x,y) \le c" /> esetén:</strong> A Lagrange-módszer <em>csak</em> az egyenlőségi határon (<M t="g = c" />) keres, a belső pontokat külön kell (<M t="\nabla f = \mathbf{0}" />)!</li>
          </ol>
        </Warn>

        <h3>Könnyebb feladatok (15–17.)</h3>

        <Task n={15} q={<>Határozd meg az <M t="f(x,y) = x^2 + y^2" /> minimumát a <M t="3x + 4y = 25" /> egyenesen!</>}>
          <p>
            <M t="2x = 3\lambda, \; 2y = 4\lambda \implies x = \frac{3}{2}\lambda, \; y = 2\lambda" />.
            Beírva az egyenesbe: <M t="\frac{9}{2}\lambda + 8\lambda = \frac{25}{2}\lambda = 25 \implies \lambda = 2" />.
            A pont <M t="(3, 4)" />, a minimum <M t="f(3,4) = 25" /> (távolság: <M t="5" />).
          </p>
        </Task>

        <Task n={16} q={<>Keresd meg az <M t="f(x,y) = 2x + 3y" /> maximumát és minimumát az <M t="x^2 + y^2 = 13" /> körön!</>}>
          <p>
            <M t="2 = 2\lambda x \implies x = \frac{1}{\lambda}" />, <M t="3 = 2\lambda y \implies y = \frac{3}{2\lambda}" />.
            A körből: <M t="\frac{1}{\lambda^2}\bigl(1 + \frac{9}{4}\bigr) = 13 \implies \frac{13}{4\lambda^2} = 13 \implies \lambda = \pm\frac{1}{2}" />.
            Max: <M t="f(2, 3) = 13" />, Min: <M t="f(-2, -3) = -13" />.
          </p>
        </Task>

        <Task n={17} q={<>Határozd meg az <M t="f(x,y,z) = x + y + z" /> maximumát az <M t="x^2 + y^2 + z^2 = 12" /> gömbön!</>}>
          <p>
            <M t="1 = 2\lambda x = 2\lambda y = 2\lambda z \implies x = y = z" />.
            A gömbből <M t="3x^2 = 12 \implies x = \pm 2" />.
            Abszolút maximum <M t="f(2,2,2) = 6" />, abszolút minimum <M t="f(-2,-2,-2) = -6" />.
          </p>
        </Task>

        <h3>Közepes feladatok (18–20.)</h3>

        <Task n={18} q={<>Keresd meg az <M t="f(x,y,z) = x^2 y^2 z^2" /> maximumát az <M t="x^2 + y^2 + z^2 = R^2" /> gömbön!</>}>
          <p>
            Ha bármelyik koordináta <M t="0" />, akkor <M t="f = 0" /> (minimum). Ha <M t="x, y, z \ne 0" />:
            <M block t="2xy^2z^2 = 2\lambda x \implies y^2z^2 = \lambda, \qquad x^2z^2 = \lambda, \qquad x^2y^2 = \lambda." />
            Innen <M t="x^2 = y^2 = z^2 = \frac{R^2}{3}" />, így a maximum <M t="f_{\max} = \frac{R^6}{27}" /> (8 szimmetrikus pontban).
          </p>
        </Task>

        <Task n={19} q={<>Egy zárt henger térfogata <M t="V = 16\pi" />. Milyen <M t="r" /> sugár és <M t="h" /> magasság mellett minimális a felszíne (<M t="A = 2\pi r^2 + 2\pi rh" />)? (Lagrange-módszerrel!)</>}>
          <p>
            Feltétel: <M t="\pi r^2 h = 16\pi \implies r^2 h = 16" />. Célfüggvény (a <M t="2\pi" /> elhagyható): <M t="f(r,h) = r^2 + rh" />.
            <M block t="2r + h = 2\lambda rh, \qquad r = \lambda r^2 \implies \lambda = \frac{1}{r}." />
            Beírva az elsőbe: <M t="2r + h = 2h \implies h = 2r" /> (a magasság egyenlő az átmérővel!).
            A térfogatból <M t="2r^3 = 16 \implies r = 2, \; h = 4" />.
          </p>
        </Task>

        <Task n={20} q={<>Határozd meg az <M t="f(x,y) = xy^2" /> abszolút maximumát és minimumát az <M t="x^2 + y^2 \le 3" /> zárt körlapon!</>}>
          <p>
            <strong>Belső:</strong> <M t="f_x = y^2 = 0, \; f_y = 2xy = 0 \implies y = 0" />, minden <M t="(x,0)" /> pontban <M t="f = 0" />.
            <br />
            <strong>Határ (<M t="x^2+y^2=3" />):</strong> <M t="y^2 = 2\lambda x" />, <M t="2xy = 2\lambda y \implies y(x - \lambda) = 0" />.
            • Ha <M t="y = 0" />: <M t="f(\pm\sqrt{3}, 0) = 0" />.
            • Ha <M t="\lambda = x" />: <M t="y^2 = 2x^2" />, a körből <M t="3x^2 = 3 \implies x = \pm 1, \; y = \pm\sqrt{2}" />.
            Ekkor <M t="f(1, \pm\sqrt{2}) = 2" /> (<strong>abszolút max</strong>), <M t="f(-1, \pm\sqrt{2}) = -2" /> (<strong>abszolút min</strong>).
          </p>
        </Task>

        <h3>Haladó feladatok (21–23.)</h3>

        <Task n={21} q={<>Bizonyítsd be a 3 változós számtani–mértani közép egyenlőtlenségét (<M t="\sqrt[3]{xyz} \le \frac{x+y+z}{3}" />, <M t="x,y,z > 0" />) Lagrange-multiplikátorral!</>}>
          <p>
            Rögzítsük a <M t="g(x,y,z) = x + y + z = S" /> (<M t="S > 0" />) összeget, és maximalizáljuk <M t="f(x,y,z) = xyz" />-t
            a zárt szimplexen (<M t="x,y,z \ge 0" />). A határon (<M t="x=0" /> vagy <M t="y=0" /> vagy <M t="z=0" />)
            <M t="f = 0" />, így a maximum a belső tartományban van, ahol:
            <M block t="yz = \lambda, \quad xz = \lambda, \quad xy = \lambda \implies x = y = z = \frac{S}{3}." />
            Tehát minden <M t="x,y,z > 0" /> számra <M t="xyz \le \left(\frac{x+y+z}{3}\right)^3" />, amiből köbgyököt vonva adódik az egyenlőtlenség!
          </p>
        </Task>

        <Task n={22} q={<>Keresd meg a <M t="z = 4 - x - y" /> sík és az <M t="x^2 + y^2 + z^2 = 16" /> gömb metszéskörének legmagasabb és legalacsonyabb (<M t="z" />-koordinátájú) pontját két mellékfeltétellel!</>}>
          <p>
            <M t="f(x,y,z) = z" />, <M t="g_1 = x + y + z - 4 = 0" />, <M t="g_2 = x^2 + y^2 + z^2 - 16 = 0" />.
            Lagrange: <M t="0 = \lambda + 2\mu x" />, <M t="0 = \lambda + 2\mu y" />, <M t="1 = \lambda + 2\mu z" />.
            Az első kettőből <M t="2\mu(x-y) = 0" />. Ha <M t="\mu = 0" />, akkor <M t="\lambda = 0" /> és <M t="1 = 0" /> (ellentmondás),
            tehát <M t="x = y" />! Ekkor <M t="z = 4 - 2x" />, a gömbből <M t="2x^2 + (4-2x)^2 = 16 \implies 6x^2 - 16x = 0 \implies x \in \{0, \frac{8}{3}\}" />.
            Legmagasabb pont: <M t="(0, 0, 4)" />; legalacsonyabb pont: <M t="\bigl(\frac{8}{3}, \frac{8}{3}, -\frac{4}{3}\bigr)" />.
          </p>
        </Task>

        <Task n={23} q={<>Keresd meg az <M t="f(x,y) = x^2 + 6xy + y^2" /> abszolút maximumát és minimumát az <M t="x^2 + y^2 = 1" /> körön, és mutasd meg, hogy a <M t="\lambda" /> értékek pontosan a szimmetrikus mátrix sajátértékei!</>}>
          <p>
            <M t="2x + 6y = 2\lambda x \implies (1-\lambda)x + 3y = 0" /> és <M t="6x + 2y = 2\lambda y \implies 3x + (1-\lambda)y = 0" />.
            Ez pontosan a <M t="\begin{pmatrix}1 & 3 \\ 3 & 1\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix} = \lambda\begin{pmatrix}x\\y\end{pmatrix}" />
            sajátérték-egyenlet! Determináns: <M t="(1-\lambda)^2 - 9 = 0 \implies \lambda_1 = 4, \; \lambda_2 = -2" />.
            • <M t="\lambda_1 = 4" />: <M t="x = y = \pm\frac{\sqrt{2}}{2}" />, <strong>abszolút maximum <M t="f = 4" /></strong>.
            • <M t="\lambda_2 = -2" />: <M t="x = -y = \pm\frac{\sqrt{2}}{2}" />, <strong>abszolút minimum <M t="f = -2" /></strong>.
            (Ez a Rayleigh-hányados elve: egy kvadratikus alak egységgömbön vett szélsőértékei éppen a sajátértékei!)
          </p>
        </Task>
      </>
    ),
  },
];
