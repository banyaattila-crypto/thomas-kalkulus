import type { Page } from './s1_1';
import { M } from '../components/M';
import { Def, Story, Task, Warn, Quiz, Steps } from '../components/ui';
import {
  PolarAreaElementWidget,
  PolarRaySweepWidget,
  CartesianToPolarConverterWidget,
  PolarVolume3DWidget,
  ShiftedCirclePolarWidget,
  GaussianBell3DWidget,
  FlywheelInertiaWidget,
  PolarIntegralSummaryDiagram,
} from '../components/Widgets153';

export const S15_3: Page[] = [
  /* ── 1. OLDAL ── */
  {
    title: '1. Miért dA = r dr dθ? — A poláris területelem',
    body: (
      <>
        <Story>
          Próbáltál már egy <M t="x^2 + y^2 \le 4" /> körlapon derékszögű koordinátákkal integrálni? Azonnal megjelenik
          a <M t="-\sqrt{4-x^2}" /> és <M t="+\sqrt{4-x^2}" /> határ, ami kínszenvedéssé teszi a számolást!
          <strong>Polárkoordinátákban</strong> ugyanez a körlap a világ legegyszerűbb „téglalapja”:
          <M t="0 \le r \le 2, \; 0 \le \theta \le 2\pi" />! Csak egyetlen, életbevágó szabályt kell megjegyezned:
          a területelemben megjelenik egy extra <strong><M t="r" /></strong> tényező!
        </Story>

        <Def title="Kettős integrál polárkoordinátákban">
          <p>
            Az <M t="x = r\cos\theta, \; y = r\sin\theta" /> (<M t="x^2 + y^2 = r^2" />) áttéréssel egy apró poláris
            cella sugárirányú mérete <M t="\Delta r" />, ívirányú hossza pedig <M t="r\,\Delta\theta" />, így területe
            <M t="\Delta A \approx r\,\Delta r\,\Delta\theta" />. Ezért:
          </p>
          <M block t="\iint_R f(x,y)\,dA = \int_\alpha^\beta \int_{g_1(\theta)}^{g_2(\theta)} f(r\cos\theta, r\sin\theta)\,r\,dr\,d\theta." />
          <p>
            Speciálisan, egy <M t="R" /> tartomány területe polárkoordinátákban:
            <M block t="\operatorname{Ter}(R) = \int_\alpha^\beta \int_{g_1(\theta)}^{g_2(\theta)} r\,dr\,d\theta = \frac{1}{2}\int_\alpha^\beta \bigl(g_2(\theta)^2 - g_1(\theta)^2\bigr)\,d\theta." />
          </p>
        </Def>

        <PolarAreaElementWidget />

        <Task n={1} q={<>Számítsd ki az <M t="\iint_D (x^2 + y^2)\,dA" /> integrált az <M t="x^2 + y^2 \le 9" /> körlapon!</>}>
          <p>
            Polárban <M t="0 \le \theta \le 2\pi, \; 0 \le r \le 3" /> és <M t="x^2+y^2 = r^2" />. Ne felejtsd az extra <M t="r" />-et!
            <M block t="\int_0^{2\pi} \int_0^3 r^2 \cdot r\,dr\,d\theta = \left(\int_0^{2\pi} d\theta\right)\left(\int_0^3 r^3\,dr\right) = 2\pi \cdot \frac{81}{4} = \frac{81\pi}{2}." />
          </p>
        </Task>

        <Task n={2} q={<>Számítsd ki az <M t="\iint_R e^{x^2+y^2}\,dA" /> integrált az <M t="1 \le x^2 + y^2 \le 4" /> körgyűrűn!</>}>
          <p>
            A körgyűrű <M t="1 \le r \le 2, \; 0 \le \theta \le 2\pi" />:
            <M block t="\int_0^{2\pi} \int_1^2 e^{r^2} r\,dr\,d\theta = 2\pi \left[\frac{1}{2}e^{r^2}\right]_1^2 = \pi(e^4 - e)." />
            (Észreveheted: az extra <M t="r" /> tényező pontosan az <M t="u = r^2" /> helyettesítéshez kellett!)
          </p>
        </Task>
      </>
    ),
  },

  /* ── 2. OLDAL ── */
  {
    title: '2. Poláris határok felírása: a sugárnyíl-módszer',
    body: (
      <>
        <Story>
          Ahogy a 15.1-ben függőleges vagy vízszintes nyilakat lőttünk át a tartományon, polárkoordinátákban
          <strong>az origóból indított sugarakat</strong> lövünk ki <M t="\theta" /> irányban! Ahol a sugár belép
          <M t="R" />-be, az a belső alsó határ (<M t="r = g_1(\theta)" />), ahol kilép, az a felső határ (<M t="r = g_2(\theta)" />)!
        </Story>

        <PolarRaySweepWidget />

        <Quiz
          q={<>Ha az origó <em>benne van</em> az <M t="R" /> tartomány belsejében (pl. körlap vagy kardioid belseje), mennyi a belső alsó határ <M t="g_1(\theta)" />?</>}
          options={[
            { label: 'r = −1' },
            { label: 'r = 0 (mert a sugár rögtön az origónál a tartományon belül indul!)', ok: true },
            { label: 'r = 1' },
          ]}
          explain={<>Polárkoordinátákban r ≥ 0; ha az origó benne van a tartományban, a sugár r = 0-nál már bent van, és csak kifelé lép ki r = g₂(θ)-nál!</>}
        />

        <Task n={3} q={<>Határozd meg az <M t="r = 1 + \cos\theta" /> kardioidon belüli, de az <M t="r = 1" /> körön kívüli tartomány területét! (Thomas 1. példa)</>}>
          <p>
            Metszéspontok: <M t="1 + \cos\theta = 1 \implies \cos\theta = 0 \implies \theta \in \left[-\frac{\pi}{2}, \frac{\pi}{2}\right]" />.
            Sugárnyíl: <M t="1 \le r \le 1 + \cos\theta" />. Szimmetriából kétszerese a <M t="[0, \pi/2]" /> résznek:
            <M block t="\operatorname{Ter}(R) = 2\int_0^{\pi/2} \int_1^{1+\cos\theta} r\,dr\,d\theta = \int_0^{\pi/2} \bigl[(1+\cos\theta)^2 - 1\bigr]\,d\theta = \int_0^{\pi/2} (2\cos\theta + \cos^2\theta)\,d\theta = 2 + \frac{\pi}{4}." />
          </p>
        </Task>

        <Task n={4} q={<>Számítsd ki az <M t="\iint_R y\,dA" /> integrált az első síknegyedbeli <M t="1 \le x^2 + y^2 \le 4" /> negyed-körgyűrűn!</>}>
          <p>
            <M t="0 \le \theta \le \frac{\pi}{2}, \; 1 \le r \le 2" />, <M t="y = r\sin\theta" />:
            <M block t="\int_0^{\pi/2} \int_1^2 (r\sin\theta)\,r\,dr\,d\theta = \left(\int_0^{\pi/2} \sin\theta\,d\theta\right)\left(\int_1^2 r^2\,dr\right) = 1 \cdot \frac{8 - 1}{3} = \frac{7}{3}." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 3. OLDAL ── */
  {
    title: '3. Derékszögű integrálok átírása polárba',
    body: (
      <>
        <Story>
          A vizsgafeladatok egyik kedvenc típusa, hogy egy ijesztő, négyzetgyökökkel teli derékszögű integrált adnak meg,
          amely polárkoordinátára áttérve két sor alatt megoldódik! A kulcs: <strong>rajzold fel a 2D tartományt a
          derékszögű határokból, és olvasd le polárban!</strong>
        </Story>

        <Steps
          title="Thomas 2. példa: Négyzetgyökös derékszögű integrál átírása polárba"
          problem={<>Számítsd ki az <M t="\int_0^1 \int_0^{\sqrt{1-x^2}} (x^2 + y^2)\,dy\,dx" /> integrált polárkoordinátákra áttérve!</>}
          steps={[
            {
              title: '1. Tartomány azonosítása',
              body: (
                <>
                  <M t="0 \le x \le 1" /> és <M t="0 \le y \le \sqrt{1-x^2}" /> — ez az egységkör első síknegyedbeli
                  <strong>negyedköre</strong>: <M t="0 \le \theta \le \frac{\pi}{2}, \; 0 \le r \le 1" />.
                </>
              ),
            },
            {
              title: '2. Integrandus és területelem átírása',
              body: (
                <>
                  <M t="x^2 + y^2 = r^2" /> és <M t="dy\,dx = r\,dr\,d\theta" /> ⇒ az integrandus <M t="r^2 \cdot r = r^3" />!
                </>
              ),
            },
            {
              title: '3. Kiszámítás',
              body: (
                <>
                  <M block t="\int_0^{\pi/2} \int_0^1 r^3\,dr\,d\theta = \frac{\pi}{2} \cdot \left[\frac{r^4}{4}\right]_0^1 = \frac{\pi}{8}." />
                </>
              ),
            },
          ]}
        />

        <CartesianToPolarConverterWidget />

        <Task n={5} q={<>Számítsd ki polárkoordinátákkal az <M t="\int_{-2}^2 \int_0^{\sqrt{4-x^2}} \sqrt{x^2 + y^2}\,dy\,dx" /> integrált!</>}>
          <p>
            A tartomány a <M t="2" /> sugarú felső félkör (<M t="0 \le \theta \le \pi, \; 0 \le r \le 2" />), az
            integrandus <M t="\sqrt{x^2+y^2} = r" />:
            <M block t="\int_0^\pi \int_0^2 r \cdot r\,dr\,d\theta = \pi \cdot \left[\frac{r^3}{3}\right]_0^2 = \frac{8\pi}{3}." />
          </p>
        </Task>

        <Task n={6} q={<>Írd át polárba és számítsd ki az <M t="\int_0^1 \int_x^{\sqrt{2-x^2}} (x + 2y)\,dy\,dx" /> integrált!</>}>
          <p>
            A <M t="y = x" /> egyenes (<M t="\theta = \frac{\pi}{4}" />) és az <M t="y" />-tengely (<M t="\theta = \frac{\pi}{2}" />)
            közötti <M t="R = \sqrt{2}" /> sugarú körcikk! (<M t="x = 1" /> pontosan a metszéspont: <M t="1^2+1^2=2" />.)
            <M block t="\int_{\pi/4}^{\pi/2} \int_0^{\sqrt{2}} (r\cos\theta + 2r\sin\theta)\,r\,dr\,d\theta = \left[\frac{r^3}{3}\right]_0^{\sqrt{2}} \bigl[\sin\theta - 2\cos\theta\bigr]_{\pi/4}^{\pi/2} = \frac{2\sqrt{2}}{3}\left(1 + \frac{\sqrt{2}}{2}\right) = \frac{2\sqrt{2} + 2}{3}." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 4. OLDAL ── */
  {
    title: '4. Térfogatok polárkoordinátákban: paraboloid, gömb és kifúrt testek',
    body: (
      <>
        <Story>
          A forgásszimmetrikus 3D testek (paraboloidok, kúpok, gömbök, hengerek) térfogatát polárkoordinátákban
          szinte fejben ki lehet számolni! Nézzük meg a legfontosabb klasszikusokat.
        </Story>

        <PolarVolume3DWidget />

        <Task n={7} q={<>Számítsd ki a <M t="z = 4 - x^2 - y^2" /> és <M t="z = x^2 + y^2" /> paraboloidok által közbezárt test térfogatát!</>}>
          <p>
            Metszéskörük: <M t="4 - r^2 = r^2 \implies r^2 = 2 \implies r = \sqrt{2}" />.
            A magasság <M t="(4 - r^2) - r^2 = 4 - 2r^2" />:
            <M block t="V = \int_0^{2\pi} \int_0^{\sqrt{2}} (4 - 2r^2)\,r\,dr\,d\theta = 2\pi\left[2r^2 - \frac{r^4}{2}\right]_0^{\sqrt{2}} = 2\pi(4 - 2) = 4\pi." />
          </p>
        </Task>

        <Task n={8} q={<>Egy <M t="2" /> sugarú gömbből (<M t="x^2 + y^2 + z^2 \le 4" />) középen kifúrunk egy <M t="1" /> sugarú hengert (<M t="x^2 + y^2 \le 1" />). Mekkora a megmaradó „gyűrű” térfogata?</>}>
          <p>
            A megmaradó rész alaplapja az <M t="1 \le r \le 2" /> körgyűrű, a gömb teteje és alja <M t="z = \pm\sqrt{4 - r^2}" />:
            <M block t="V = \int_0^{2\pi} \int_1^2 2\sqrt{4 - r^2}\,r\,dr\,d\theta = 2\pi \left[-\frac{2}{3}(4 - r^2)^{3/2}\right]_1^2 = 2\pi \cdot \frac{2}{3}\cdot 3^{3/2} = 4\pi\sqrt{3}." />
            (Érdekesség: ha <M t="h = 2\sqrt{3}" /> a fúrt lyuk magassága, a térfogat mindig <M t="\frac{1}{6}\pi h^3" />, függetlenül a gömb sugarától!)
          </p>
        </Task>
      </>
    ),
  },

  /* ── 5. OLDAL ── */
  {
    title: '5. Eltolt körök (r = 2a cos θ) és csapdáik',
    body: (
      <>
        <Story>
          A polárkoordinátás integrálás leggyakoribb vizsgacsapdája az <strong>origón átmenő eltolt kör</strong>:
          <M t="(x - a)^2 + y^2 = a^2 \iff x^2 + y^2 = 2ax \iff r = 2a\cos\theta" />! Vigyázat: ezt a kört már egy
          <M t="\pi" /> hosszúságú szögintervallum (<M t="-\frac{\pi}{2} \le \theta \le \frac{\pi}{2}" />) teljesen
          besöpri — aki <M t="0" />-tól <M t="2\pi" />-ig integrál, kétszer számolja!
        </Story>

        <ShiftedCirclePolarWidget />

        <Quiz
          q={<>Melyik <M t="\theta" />-intervallum söpri be pontosan EGYSZER az <M t="x^2 + y^2 = 4y" /> (<M t="r = 4\sin\theta" />) kört?</>}
          options={[
            { label: '−π/2 ≤ θ ≤ π/2' },
            { label: '0 ≤ θ ≤ π (mert itt sin θ ≥ 0!)', ok: true },
            { label: '0 ≤ θ ≤ 2π' },
          ]}
          explain={<>Mivel r = 4 sin θ ≥ 0 pontosan a 0 ≤ θ ≤ π intervallumon, ez söpri be pontosan egyszer a felső félsíkon ülő kört!</>}
        />

        <Task n={9} q={<>Számítsd ki a <M t="z = \sqrt{x^2 + y^2}" /> kúp alatti térfogatot az <M t="x^2 + y^2 \le 2x" /> körlap felett!</>}>
          <p>
            Az eltolt kör <M t="r = 2\cos\theta" />, <M t="-\frac{\pi}{2} \le \theta \le \frac{\pi}{2}" />, a magasság <M t="z = r" />:
            <M block t="V = \int_{-\pi/2}^{\pi/2} \int_0^{2\cos\theta} r \cdot r\,dr\,d\theta = \frac{8}{3}\int_{-\pi/2}^{\pi/2} \cos^3\theta\,d\theta = \frac{16}{3}\int_0^{\pi/2} (1 - \sin^2\theta)\cos\theta\,d\theta = \frac{16}{3}\left(1 - \frac{1}{3}\right) = \frac{32}{9}." />
          </p>
        </Task>

        <Task n={10} q={<>Számítsd ki az <M t="\iint_R x\,dA" /> integrált az <M t="x^2 + y^2 \le 2y" /> (<M t="r \le 2\sin\theta" />) körlapon!</>}>
          <p>
            A körlap szimmetrikus az <M t="y" />-tengelyre, és az integrandus (<M t="x" />) páratlan <M t="x" />-ben ⇒
            szimmetriából azonnal <M t="\iint_R x\,dA = 0" />! (Polárban is <M t="\int_0^\pi \sin^3\theta\cos\theta\,d\theta = 0" />.)
          </p>
        </Task>
      </>
    ),
  },

  /* ── 6. OLDAL ── */
  {
    title: '6. A Gauss-integrál: a kalkulus egyik legnagyobb csodája',
    body: (
      <>
        <Story>
          A valószínűségszámítás haranggörbéje, az <M t="e^{-x^2}" /> függvény <strong>nem rendelkezik elemi primitív
          függvénnyel</strong> — 1D-ben teljesen tehetetlenek voltunk vele! Siméon Denis Poisson viszont 1812 körül
          zseniális ötlettel állt elő: lépjünk ki 2D-be, emeljük négyzetre az integrált, és váltsunk
          <strong>polárkoordinátákra</strong>!
        </Story>

        <Steps
          title="A Gauss-integrál levezetése 4 sorban"
          problem={<>Bizonyítsd be, hogy <M t="\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}" />!</>}
          steps={[
            {
              title: '1. Négyzetre emelés két független változóval',
              body: (
                <>
                  Legyen <M t="I = \int_{-\infty}^{\infty} e^{-x^2}\,dx" />. Akkor:
                  <M block t="I^2 = \left(\int_{-\infty}^{\infty} e^{-x^2}\,dx\right)\left(\int_{-\infty}^{\infty} e^{-y^2}\,dy\right) = \iint_{\mathbb{R}^2} e^{-(x^2+y^2)}\,dx\,dy." />
                </>
              ),
            },
            {
              title: '2. Áttérés polárkoordinátákra (az extra r megment mindent!)',
              body: (
                <>
                  <M block t="I^2 = \lim_{R\to\infty} \int_0^{2\pi} \int_0^R e^{-r^2}\,r\,dr\,d\theta = 2\pi \lim_{R\to\infty}\left[-\frac{1}{2}e^{-r^2}\right]_0^R = \pi \lim_{R\to\infty}(1 - e^{-R^2}) = \pi." />
                </>
              ),
            },
            {
              title: '3. Gyökvonás',
              body: (
                <>
                  Mivel <M t="e^{-x^2} > 0" />, <M t="I > 0" />, így <M t="I = \sqrt{\pi}" />!
                  (Ebből a fél-egyenesen: <M t="\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}" />.)
                </>
              ),
            },
          ]}
        />

        <GaussianBell3DWidget />

        <Task n={11} q={<>Számítsd ki a Gauss-integrál segítségével a normális eloszlás integrálját: <M t="\int_{-\infty}^{\infty} e^{-a x^2}\,dx" /> (<M t="a > 0" />)!</>}>
          <p>
            Helyettesítsünk <M t="u = \sqrt{a}\,x" />, <M t="dx = \frac{du}{\sqrt{a}}" />:
            <M block t="\int_{-\infty}^{\infty} e^{-a x^2}\,dx = \frac{1}{\sqrt{a}}\int_{-\infty}^{\infty} e^{-u^2}\,du = \sqrt{\frac{\pi}{a}}." />
            (Ha <M t="a = \frac{1}{2\sigma^2}" />, ez pontosan <M t="\sigma\sqrt{2\pi}" /> — innen a normális eloszlás <M t="\frac{1}{\sigma\sqrt{2\pi}}" /> normálási állandója!)
          </p>
        </Task>

        <Task n={12} q={<>Számítsd ki az <M t="\int_0^\infty x^2 e^{-x^2}\,dx" /> integrált parciális integrálással és a Gauss-integrállal!</>}>
          <p>
            Válasszuk <M t="u = x" />, <M t="dv = x e^{-x^2}\,dx \implies v = -\frac{1}{2}e^{-x^2}" />:
            <M block t="\int_0^\infty x^2 e^{-x^2}\,dx = \left[-\frac{x}{2}e^{-x^2}\right]_0^\infty + \frac{1}{2}\int_0^\infty e^{-x^2}\,dx = 0 + \frac{\sqrt{\pi}}{4} = \frac{\sqrt{\pi}}{4}." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 7. OLDAL ── */
  {
    title: '7. Tömeg, súlypont és lendkerék-tehetetlenség polárban',
    body: (
      <>
        <Story>
          A 15.2-ben látott fizikai mennyiségek (tömeg, súlypont, tehetetlenségi nyomaték) körlapokon és gyűrűkön
          polárkoordinátákban válnak igazán élvezetessé! Egy lendkerék poláris tehetetlenségi nyomatéka például
          egyetlen sorból kiadódik!
        </Story>

        <FlywheelInertiaWidget />

        <Quiz
          q={<>Ha egy homogén, <M t="M" /> tömegű és <M t="R" /> sugarú tömör körlemez forog a középpontja körül, mennyi a tehetetlenségi nyomatéka (<M t="I_0" />)?</>}
          options={[
            { label: 'M·R²' },
            { label: '½ M·R²', ok: true },
            { label: '¼ M·R²' },
          ]}
          explain={<>I₀ = ∫₀^(2π) ∫₀ᴿ r²·δ·r dr dθ = 2πδ·(R⁴/4) = (πR²δ)·(R²/2) = ½ MR²!</>}
        />

        <Task n={13} q={<>Számítsd ki az <M t="a" /> sugarú homogén felső félkör (<M t="0 \le r \le a, \; 0 \le \theta \le \pi" />) súlypontját polárkoordinátákban!</>}>
          <p>
            Szimmetriából <M t="\bar{x} = 0" />, terület <M t="A = \frac{1}{2}\pi a^2" />.
            <M block t="M_x = \int_0^\pi \int_0^a (r\sin\theta)\,r\,dr\,d\theta = \left(\int_0^\pi \sin\theta\,d\theta\right)\left(\int_0^a r^2\,dr\right) = 2 \cdot \frac{a^3}{3} = \frac{2a^3}{3}." />
            Így <M t="\bar{y} = \frac{2a^3/3}{\pi a^2/2} = \frac{4a}{3\pi}" /> — 3 sorban!
          </p>
        </Task>

        <Task n={14} q={<>Egy <M t="R" /> sugarú körlap sűrűsége az origótól való távolsággal arányos: <M t="\delta(x,y) = k\sqrt{x^2+y^2}" />. Számítsd ki a tömegét!</>}>
          <p>
            Polárban <M t="\delta = kr" />:
            <M block t="M = \int_0^{2\pi} \int_0^R (kr)\,r\,dr\,d\theta = 2\pi k \left[\frac{r^3}{3}\right]_0^R = \frac{2\pi k R^3}{3}." />
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
        <PolarIntegralSummaryDiagram />

        <Def title="Puskakártya — 15.3 Kettős integrálás polárkoordinátákkal">
          <ul>
            <li><strong>Átváltás:</strong> <M t="x = r\cos\theta" />, <M t="y = r\sin\theta" />, <M t="x^2+y^2 = r^2" />, <strong><M t="dA = r\,dr\,d\theta" /></strong>.</li>
            <li><strong>Terület:</strong> <M t="\operatorname{Ter}(R) = \iint_R r\,dr\,d\theta" />.</li>
            <li><strong>Eltolt körök:</strong> <M t="r = 2a\cos\theta \implies \theta \in [-\frac{\pi}{2}, \frac{\pi}{2}]" />; <M t="r = 2a\sin\theta \implies \theta \in [0, \pi]" />.</li>
            <li><strong>Gauss-integrál:</strong> <M t="\int_{-\infty}^\infty e^{-x^2}\,dx = \sqrt{\pi}" />.</li>
          </ul>
        </Def>

        <Warn>
          <strong>5 klasszikus vizsgabuktató:</strong>
          <ol>
            <li><strong>Az extra <M t="r" /> elfelejtése:</strong> A <M t="dA" /> NEM <M t="dr\,d\theta" />, hanem <strong><M t="r\,dr\,d\theta" /></strong>! (Ha elfelejted, a dimenzió is rossz lesz: hossz × szög ≠ terület!)</li>
            <li><strong><M t="0 \le \theta \le 2\pi" /> eltolt körnél:</strong> Az <M t="r = 2a\cos\theta" /> kör <M t="\pi" /> szög alatt körbeér — <M t="[0, 2\pi]" />-n kétszeres eredményt adna!</li>
            <li><strong>Félkör helyett teljes kör:</strong> Ha <M t="y \ge 0" /> (<M t="0 \le y \le \sqrt{a^2-x^2}" />), akkor <M t="\theta \in [0, \pi]" />, NEM <M t="[0, 2\pi]" />!</li>
            <li><strong>Az <M t="x" /> és <M t="y" /> meghagyása polárban:</strong> Mindig írd át az integrandus összes <M t="x" /> és <M t="y" /> változóját <M t="r\cos\theta" />-ra és <M t="r\sin\theta" />-ra!</li>
            <li><strong>Negatív <M t="r" /> határok:</strong> Kettős poláris integrálban <M t="r \ge 0" /> — mindig olyan <M t="\theta" />-intervallumot válassz, ahol a határ görbéje nemnegatív!</li>
          </ol>
        </Warn>

        <h3>Könnyebb feladatok (15–17.)</h3>

        <Task n={15} q={<>Számítsd ki az <M t="\int_0^{2\pi} \int_0^2 r^3\,dr\,d\theta" /> poláris integrált!</>}>
          <p>
            <M block t="2\pi \left[\frac{r^4}{4}\right]_0^2 = 2\pi \cdot 4 = 8\pi." />
          </p>
        </Task>

        <Task n={16} q={<>Számítsd ki az <M t="\iint_D \frac{1}{1 + x^2 + y^2}\,dA" /> integrált az <M t="x^2 + y^2 \le 1" /> egységkörlapon!</>}>
          <p>
            <M block t="\int_0^{2\pi} \int_0^1 \frac{r}{1 + r^2}\,dr\,d\theta = 2\pi \left[\frac{1}{2}\ln(1+r^2)\right]_0^1 = \pi\ln 2." />
          </p>
        </Task>

        <Task n={17} q={<>Írd át polárba és számítsd ki az <M t="\int_0^3 \int_0^{\sqrt{9-x^2}} \sin(x^2 + y^2)\,dy\,dx" /> integrált!</>}>
          <p>
            Negyedkör (<M t="0 \le \theta \le \frac{\pi}{2}, \; 0 \le r \le 3" />):
            <M block t="\int_0^{\pi/2} \int_0^3 \sin(r^2)\,r\,dr\,d\theta = \frac{\pi}{2}\left[-\frac{1}{2}\cos(r^2)\right]_0^3 = \frac{\pi}{4}(1 - \cos 9)." />
          </p>
        </Task>

        <h3>Közepes feladatok (18–20.)</h3>

        <Task n={18} q={<>Határozd meg az <M t="r = 2\sin(2\theta)" /> négylevelű rózsa egyetlen levelének területét kettős poláris integrállal!</>}>
          <p>
            Egy levél az <M t="0 \le \theta \le \frac{\pi}{2}" /> intervallumon rajzolódik ki:
            <M block t="A = \int_0^{\pi/2} \int_0^{2\sin 2\theta} r\,dr\,d\theta = 2\int_0^{\pi/2} \sin^2(2\theta)\,d\theta = \int_0^{\pi/2} (1 - \cos 4\theta)\,d\theta = \frac{\pi}{2}." />
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki a <M t="z = 9 - x^2 - y^2" /> paraboloid és a <M t="z = 5" /> sík közötti sapka térfogatát!</>}>
          <p>
            Metszéskör: <M t="9 - r^2 = 5 \implies r = 2" />. A magasság <M t="(9 - r^2) - 5 = 4 - r^2" />:
            <M block t="V = \int_0^{2\pi} \int_0^2 (4 - r^2)\,r\,dr\,d\theta = 2\pi\left[2r^2 - \frac{r^4}{4}\right]_0^2 = 2\pi(8 - 4) = 8\pi." />
          </p>
        </Task>

        <Task n={20} q={<>Számítsd ki az <M t="\int_0^2 \int_0^{\sqrt{2x-x^2}} \sqrt{x^2 + y^2}\,dy\,dx" /> integrált polárkoordinátákra áttérve!</>}>
          <p>
            Az <M t="y = \sqrt{2x - x^2} \iff x^2 + y^2 = 2x \iff r = 2\cos\theta" /> kör felső fele (<M t="0 \le \theta \le \frac{\pi}{2}" />):
            <M block t="\int_0^{\pi/2} \int_0^{2\cos\theta} r^2\,dr\,d\theta = \frac{8}{3}\int_0^{\pi/2} \cos^3\theta\,d\theta = \frac{8}{3}\cdot\frac{2}{3} = \frac{16}{9}." />
          </p>
        </Task>

        <h3>Haladó feladatok (21–23.)</h3>

        <Task n={21} q={<>Számítsd ki az <M t="\iint_D \frac{1}{(1 + x^2 + y^2)^2}\,dA" /> improprius kettős integrált az egész <M t="\mathbb{R}^2" /> síkon!</>}>
          <p>
            <M block t="\lim_{R\to\infty}\int_0^{2\pi} \int_0^R \frac{r}{(1+r^2)^2}\,dr\,d\theta = 2\pi\lim_{R\to\infty}\left[-\frac{1}{2(1+r^2)}\right]_0^R = 2\pi \cdot \frac{1}{2} = \pi." />
          </p>
        </Task>

        <Task n={22} q={<>Egy <M t="R" /> sugarú, homogén (<M t="\delta = 1" />) körlapnak mennyi a <M t="\left(0, 0\right)" />-tól való átlagos távolsága (vagyis az <M t="f(x,y) = \sqrt{x^2+y^2}" /> átlagértéke a körlapon)?</>}>
          <p>
            <M block t="\bar{r} = \frac{1}{\pi R^2}\int_0^{2\pi} \int_0^R r \cdot r\,dr\,d\theta = \frac{2\pi}{\pi R^2}\cdot\frac{R^3}{3} = \frac{2}{3}R." />
            (Érdekes intuíció: nem <M t="\frac{1}{2}R" />, hanem <M t="\frac{2}{3}R" />, mert a külső gyűrűkön sokkal nagyobb a terület!)
          </p>
        </Task>

        <Task n={23} q={<>Mutasd meg, hogy az <M t="x^2 + y^2 \le 1" /> körlapon az <M t="\iint_D \frac{1}{\sqrt{x^2+y^2}}\,dA" /> improprius integrál konvergens (és számítsd ki!), míg az <M t="\iint_D \frac{1}{x^2+y^2}\,dA" /> divergens!</>}>
          <p>
            • Első (<M t="1/r" />): polárban az extra <M t="r" /> pontosan kiejti a nevezőt!
            <M block t="\lim_{\varepsilon\to 0^+} \int_0^{2\pi} \int_\varepsilon^1 \frac{1}{r}\cdot r\,dr\,d\theta = 2\pi \lim_{\varepsilon\to 0^+}(1 - \varepsilon) = 2\pi \quad (\text{konvergens!})." />
            • Második (<M t="1/r^2" />):
            <M block t="\lim_{\varepsilon\to 0^+} \int_0^{2\pi} \int_\varepsilon^1 \frac{1}{r^2}\cdot r\,dr\,d\theta = 2\pi \lim_{\varepsilon\to 0^+}(-\ln\varepsilon) = +\infty \quad (\text{divergens!})." />
          </p>
        </Task>
      </>
    ),
  },
];
