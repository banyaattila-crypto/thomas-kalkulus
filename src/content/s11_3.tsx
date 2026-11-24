import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  HarmonicSlowGrowthWidget,
  IntegralTestChecklistDiagram,
  IntegralTestProofWidget,
  LogSeriesComparisonWidget,
  NonnegativeSeriesWidget,
  PSeriesExplorerWidget,
  RemainderEstimateWidget,
  SumVsIntegralTrapDiagram,
} from '../components/Widgets113';
import type { Page } from './s1_1';

export const S11_3: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Nemnegatív tagú sorok: vagy konvergens, vagy +∞',
    body: (
      <>
        <Story>
          <p>
            A legtöbb végtelen sor (mint a <M t="\sum \tfrac{1}{n^2}" /> vagy a <M t="\sum \tfrac{1}{n^2+1}" />) nem
            mértani és nem teleszkopikus, így a pontos összegét nem tudjuk egyszerűen kiszámolni. A gyakorlatban azonban
            sokszor már az is hatalmas győzelem, ha el tudjuk dönteni: <strong>konvergens-e vagy divergens?</strong>{' '}
            Elsőként a <strong>nemnegatív tagú sorokat</strong> vizsgáljuk!
          </p>
        </Story>

        <Def title="Nemnegatív tagú sorok konvergenciája">
          <p>
            Ha <M t="a_n \ge 0" /> minden <M t="n \ge 1" />-re, akkor az <M t="s_n = a_1 + \cdots + a_n" />{' '}
            részletösszegek <strong>monoton növekvők</strong> (<M t="s_1 \le s_2 \le \cdots" />). Weierstrass tétele
            szerint ezért a <M t="\sum_{n=1}^\infty a_n" /> sor pontosan akkor <strong>konvergens</strong>, ha
            részletösszegei <strong>felülről korlátosak</strong>; különben <M t="+\infty" />-be tart!
          </p>
        </Def>

        <NonnegativeSeriesWidget />

        <Quiz
          q={<>Lehetséges-e, hogy egy csupa pozitív tagú sor (<M t="a_n > 0" />) részletösszegei oszcillálnak két szám között?</>}
          options={[
            { label: 'Igen, ha a tagok lassan tartanak 0-hoz.' },
            { label: 'Nem, mert a részletösszegek szigorúan növekednek: vagy véges korláthoz tartanak, vagy +∞-be.', ok: true },
            { label: 'Csak akkor, ha a sor harmonikus.' },
            { label: 'Igen, ha a tagok racionális számok.' },
          ]}
          explain={
            <>
              Mivel <M t="s_{n+1} = s_n + a_{n+1} > s_n" />, a részletösszeg-sorozat sosem csökkenhet és nem
              oszcillálhat — csak konvergálhat vagy <M t="+\infty" />-be divergens!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={1} q={<>Miért elég a <M t="\sum_{n=1}^\infty \dfrac{1}{n^2}" /> konvergenciájához belátni, hogy minden <M t="s_n < 2" />?</>}>
          <p>
            Mert a sor tagjai pozitívak, így <M t="\{s_n\}" /> monoton nő. A <M t="2" /> felső korlát Weierstrass tétele
            miatt garantálja, hogy létezik véges határértéke (Euler 1735-ben bizonyította, hogy pontosan{' '}
            <M t="\dfrac{\pi^2}{6} \approx 1{,}6449" />!).
          </p>
        </Task>
        <Task n={2} q={<>Ha egy nemnegatív sor részletösszegei kielégítik az <M t="s_n \le 5 - \dfrac{1}{n}" /> egyenlőtlenséget, mit mondhatunk a sor összegéről?</>}>
          <p>
            A sor biztosan <strong>konvergens</strong>, és összege <M t="S \le 5" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Az integrálkritérium (9. tétel)',
    body: (
      <>
        <p>
          Az 8.8-as szakaszban megtanultuk kiszámítani az <M t="\int_1^\infty f(x)\,dx" /> improprius integrálokat. Az{' '}
          <strong>integrálkritérium</strong> hidat ver a diszkrét összegek és a folytonos integrálok közé!
        </p>

        <Def title="Az integrálkritérium (9. tétel)">
          <p>
            Legyen <M t="\{a_n\}" /> pozitív tagú sorozat, és tegyük fel, hogy <M t="a_n = f(n)" />, ahol <M t="f" /> egy{' '}
            <M t="x \ge N" /> félegyenesen <strong>pozitív</strong>, <strong>folytonos</strong> és{' '}
            <strong>csökkenő</strong> függvény (<M t="N \in \mathbb{Z}^+" />). Ekkor a
          </p>
          <M block t="\sum_{n=N}^\infty a_n \qquad \text{sor és az} \qquad \int_N^\infty f(x)\,dx \qquad \text{improprius integrál}" />
          <p>
            <strong>egyszerre konvergens vagy egyszerre divergens</strong>!
          </p>
        </Def>

        <IntegralTestProofWidget />

        <p>
          A bizonyítás lelke a kétoldali téglalap-becslés:
        </p>
        <M block t="\int_1^{n+1} f(x)\,dx \le a_1 + a_2 + \cdots + a_n \le a_1 + \int_1^n f(x)\,dx." />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={3} q={<>Döntsd el az integrálkritériummal, hogy a <M t="\sum_{n=1}^\infty \dfrac{1}{n^2 + 1}" /> sor konvergens-e!</>}>
          <p>
            Az <M t="f(x) = \dfrac{1}{x^2 + 1}" /> függvény <M t="x \ge 1" />-re pozitív, folytonos és csökkenő. Az
            integrálja:
            <M block t="\int_1^\infty \frac{dx}{x^2 + 1} = \Big[\arctan x\Big]_1^\infty = \frac{\pi}{2} - \frac{\pi}{4} = \frac{\pi}{4} < \infty." />
            Az integrál konvergens, tehát a sor is <strong>konvergens</strong>!
          </p>
        </Task>
        <Task n={4} q={<>Döntsd el az integrálkritériummal: <M t="\sum_{n=1}^\infty \dfrac{1}{2n + 1}" />!</>}>
          <p>
            <M t="f(x) = \dfrac{1}{2x+1}" /> pozitív, folytonos, csökkenő <M t="x \ge 1" />-re. Integrálja:{' '}
            <M t="\int_1^\infty \dfrac{dx}{2x+1} = \left[\dfrac{1}{2}\ln(2x+1)\right]_1^\infty = +\infty" />, tehát a
            sor <strong>divergens</strong>.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'A p-sorok kritériuma és a harmonikus sor lassú növekedése',
    body: (
      <>
        <p>
          Az integrálkritérium legfontosabb következménye a <strong><M t="p" />-sorok</strong> teljes osztályozása — ez
          lesz a 11.4-es összehasonlító kritériumok fő hivatkozási alapja!
        </p>

        <Def title="p-sorok kritériuma">
          <p>
            A <M t="\sum_{n=1}^\infty \dfrac{1}{n^p} = 1 + \dfrac{1}{2^p} + \dfrac{1}{3^p} + \cdots" /> sor:
          </p>
          <ul>
            <li><strong>konvergens</strong>, ha <M t="p > 1" />;</li>
            <li><strong>divergens</strong>, ha <M t="p \le 1" />.</li>
          </ul>
        </Def>

        <p>
          <em>Bizonyítás:</em> ha <M t="p \le 0" />, a tagok nem tartanak 0-hoz (divergenciateszt). Ha <M t="p > 0" />,
          az <M t="f(x) = x^{-p}" /> pozitív, folytonos és csökkenő <M t="[1;\,\infty)" />-n, és a 8.8-as szakaszból
          tudjuk, hogy <M t="\int_1^\infty x^{-p}\,dx" /> pontosan <M t="p > 1" /> esetén véges (értéke{' '}
          <M t="\dfrac{1}{p-1}" />), míg <M t="p = 1" />-nél <M t="\int_1^\infty \tfrac{dx}{x} = \ln x\big|_1^\infty = \infty" />!
        </p>

        <PSeriesExplorerWidget />

        <HarmonicSlowGrowthWidget />

        <Quiz
          q={<>Melyik sor <strong>konvergens</strong> az alábbiak közül?</>}
          options={[
            { label: <M t="\sum_{n=1}^\infty \dfrac{1}{\sqrt{n}}" /> },
            { label: <M t="\sum_{n=1}^\infty \dfrac{1}{n^{0{,}99}}" /> },
            { label: <M t="\sum_{n=1}^\infty \dfrac{1}{n\sqrt{n}}" />, ok: true },
            { label: <M t="\sum_{n=1}^\infty \dfrac{1}{\sqrt[3]{n^2}}" /> },
          ]}
          explain={
            <>
              <M t="\dfrac{1}{n\sqrt{n}} = \dfrac{1}{n^{3/2}}" />, itt <M t="p = \dfrac{3}{2} > 1" />, tehát{' '}
              <strong>konvergens</strong>! A többinél <M t="p = 0{,}5;\ 0{,}99;\ \tfrac{2}{3}" /> mind <M t="\le 1" />.
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={5} q={<>Konvergens-e a <M t="\sum_{n=1}^\infty n^{-\pi/3}" /> sor?</>}>
          <p>
            Mivel <M t="\pi \approx 3{,}1416 > 3" />, ezért <M t="p = \dfrac{\pi}{3} \approx 1{,}047 > 1" />, tehát{' '}
            <strong>konvergens</strong>!
          </p>
        </Task>
        <Task n={6} q={<>A <M t="H_n \approx \ln n + 0{,}58" /> közelítéssel becsüld meg, nagyjából hány tag kell ahhoz, hogy a harmonikus sor meghaladja a 10-et!</>}>
          <p>
            <M t="\ln n \approx 10 - 0{,}58 = 9{,}42 \Longrightarrow n \approx e^{9{,}42} \approx 12\,300" /> tag!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Integrálkritérium helyettesítéssel és logaritmikus sorok',
    body: (
      <>
        <p>
          Az integrálkritérium igazi ereje ott mutatkozik meg, ahol a tagok <M t="\ln n" /> vagy <M t="e^{-n^2}" />{' '}
          kifejezéseket tartalmaznak — ezeket egyetlen <M t="u" />-helyettesítéssel elintézi!
        </p>

        <LogSeriesComparisonWidget />

        <Steps
          title="Logaritmikus sor vizsgálata integrálkritériummal"
          problem={
            <>
              Döntsük el, konvergens-e a <M t="\sum_{n=2}^\infty \dfrac{1}{n\ln n}" /> és a{' '}
              <M t="\sum_{n=2}^\infty \dfrac{1}{n(\ln n)^2}" /> sor!
            </>
          }
          steps={[
            {
              title: '1. Feltételek ellenőrzése (x ≥ 2)',
              body: (
                <>
                  Mivel <M t="x \ge 2" />-re <M t="x > 0" /> és <M t="\ln x \ge \ln 2 > 0" /> szigorúan növekvők,
                  szorzatuk reciproka pozitív, folytonos és csökkenő! (Azért indul <M t="n=2" />-től, mert{' '}
                  <M t="\ln 1 = 0" />.)
                </>
              ),
            },
            {
              title: '2. Az első integrál: u = ln x, du = dx / x',
              body: (
                <>
                  <M block t="\int_2^\infty \frac{dx}{x\ln x} = \int_{\ln 2}^\infty \frac{du}{u} = \Big[\ln u\Big]_{\ln 2}^\infty = +\infty." />
                  Tehát <M t="\sum_{n=2}^\infty \dfrac{1}{n\ln n}" /> <strong>divergens</strong> (még lassabban, mint a
                  harmonikus sor!).
                </>
              ),
            },
            {
              title: '3. A második integrál: ugyanez a helyettesítés',
              body: (
                <>
                  <M block t="\int_2^\infty \frac{dx}{x(\ln x)^2} = \int_{\ln 2}^\infty \frac{du}{u^2} = \left[-\frac{1}{u}\right]_{\ln 2}^\infty = \frac{1}{\ln 2} < \infty." />
                  Tehát <M t="\sum_{n=2}^\infty \dfrac{1}{n(\ln n)^2}" /> <strong>konvergens</strong>!
                </>
              ),
            },
          ]}
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={7} q={<>Döntsd el integrálkritériummal: <M t="\sum_{n=1}^\infty n e^{-n^2}" />!</>}>
          <p>
            <M t="f(x) = x e^{-x^2}" /> pozitív, folytonos, és <M t="f'(x) = (1 - 2x^2)e^{-x^2} < 0" /> minden{' '}
            <M t="x \ge 1" />-re (csökkenő!). Az <M t="u = x^2" /> helyettesítéssel:
            <M block t="\int_1^\infty x e^{-x^2}\,dx = \left[-\frac{1}{2}e^{-x^2}\right]_1^\infty = \frac{1}{2e} < \infty \ \Longrightarrow\ \textbf{konvergens}!" />
          </p>
        </Task>
        <Task n={8} q={<>Konvergens-e a <M t="\sum_{n=1}^\infty \dfrac{n}{n^2 + 1}" /> sor?</>}>
          <p>
            <M t="f(x) = \dfrac{x}{x^2+1}" /> csökkenő <M t="x \ge 1" />-re (<M t="f'(x) = \tfrac{1-x^2}{(x^2+1)^2} \le 0" />).
            Integrálja: <M t="\int_1^\infty \dfrac{x\,dx}{x^2+1} = \left[\tfrac{1}{2}\ln(x^2+1)\right]_1^\infty = +\infty" />{' '}
            <M t="\Longrightarrow" /> <strong>divergens</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Maradéktag-becslés: mennyire pontos az sₙ közelítés?',
    body: (
      <>
        <p>
          Ha egy pozitív tagú sor konvergens, az első <M t="n" /> tag összege (<M t="s_n" />) közelíti a pontos{' '}
          <M t="S" /> összeget. A hibát a <strong>maradéktag</strong> adja: <M t="R_n = S - s_n = \sum_{k=n+1}^\infty a_k" />.
          Az integrálkritérium téglalap-becslése rögtön kétoldali korlátot ad <M t="R_n" />-re!
        </p>

        <Def title="Integrálkritériumos maradéktag-becslés">
          <p>Ha <M t="f" /> pozitív, folytonos és csökkenő <M t="[n;\,\infty)" />-n, és <M t="\sum a_k = S" /> konvergens, akkor:</p>
          <M block t="\int_{n+1}^\infty f(x)\,dx \le R_n \le \int_n^\infty f(x)\,dx," />
          <p>vagyis a pontos <M t="S" /> összeg biztosan ebben a keskeny intervallumban fekszik:</p>
          <M block t="s_n + \int_{n+1}^\infty f(x)\,dx \le S \le s_n + \int_n^\infty f(x)\,dx." />
        </Def>

        <RemainderEstimateWidget />

        <Quiz
          q={<>A <M t="\sum_{n=1}^\infty \dfrac{1}{n^3}" /> sornál mennyi a felső becslés a maradéktagra (<M t="R_n" />) az <M t="n" />-edik részletösszeg után?</>}
          options={[
            { label: <M t="R_n \le \dfrac{1}{n^2}" /> },
            { label: <M t="R_n \le \dfrac{1}{2n^2}" />, ok: true },
            { label: <M t="R_n \le \dfrac{1}{3n^3}" /> },
            { label: <M t="R_n \le \dfrac{1}{n^3}" /> },
          ]}
          explain={
            <>
              <M t="R_n \le \int_n^\infty \dfrac{dx}{x^3} = \left[-\dfrac{1}{2x^2}\right]_n^\infty = \dfrac{1}{2n^2}" />!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={9} q={<>Legalább hány tagot kell összeadni a <M t="\sum_{n=1}^\infty \dfrac{1}{n^3}" /> sorból, hogy a hiba biztosan <M t="0{,}005" /> alatt legyen?</>}>
          <p>
            <M t="R_n \le \dfrac{1}{2n^2} < 0{,}005 = \dfrac{1}{200} \Longleftrightarrow n^2 > 100 \Longleftrightarrow n \ge 11" />!
            (Csupán 11 tag elég!)
          </p>
        </Task>
        <Task n={10} q={<>Becsüld meg a <M t="\sum_{n=1}^\infty \dfrac{1}{n^4}" /> sor maradéktagját <M t="n = 10" /> esetén!</>}>
          <p>
            <M t="R_{10} \le \int_{10}^\infty x^{-4}\,dx = \dfrac{1}{3\cdot 10^3} = \dfrac{1}{3000} \approx 0{,}00033" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Két finomság: összeg ≠ integrál, és csökkenés csak N-től',
    body: (
      <>
        <SumVsIntegralTrapDiagram />

        <p>
          A második fontos finomság: a függvénynek <strong>nem kell <M t="x = 1" />-től csökkenőnek lennie</strong>,
          elég, ha valamely <M t="N" /> helytől kezdve csökkenő! (Mert véges sok kezdőtag nem befolyásolja a
          konvergenciát.)
        </p>

        <h3>Kidolgozott példa — A ∑ (ln n) / n² sor</h3>
        <p>
          Az <M t="f(x) = \dfrac{\ln x}{x^2}" /> függvény deriváltja:
        </p>
        <M block t="f'(x) = \frac{\tfrac{1}{x}\cdot x^2 - (\ln x)\cdot 2x}{x^4} = \frac{1 - 2\ln x}{x^3}." />
        <p>
          Ez akkor negatív, ha <M t="\ln x > \tfrac{1}{2} \Longleftrightarrow x > \sqrt{e} \approx 1{,}65" />. Tehát{' '}
          <M t="x \ge 2" />-re <M t="f" /> már pozitív, folytonos és csökkenő! Parciális integrálással (
          <M t="u = \ln x,\ dv = x^{-2}\,dx" />):
        </p>
        <M block t="\int_2^\infty \frac{\ln x}{x^2}\,dx = \left[-\frac{\ln x + 1}{x}\right]_2^\infty = \frac{\ln 2 + 1}{2} < \infty \ \Longrightarrow\ \textbf{konvergens}!" />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={11} q={<>Honnantól csökkenő az <M t="f(x) = \dfrac{x}{e^x}" /> függvény, és konvergens-e a <M t="\sum_{n=1}^\infty n e^{-n}" /> sor?</>}>
          <p>
            <M t="f'(x) = (1 - x)e^{-x} \le 0" /> minden <M t="x \ge 1" />-re! Parciális integrálással{' '}
            <M t="\int_1^\infty x e^{-x}\,dx = \left[-(x+1)e^{-x}\right]_1^\infty = \dfrac{2}{e} < \infty" />, tehát{' '}
            <strong>konvergens</strong>.
          </p>
        </Task>
        <Task n={12} q={<>Miért nem alkalmazható az integrálkritérium a <M t="\sum_{n=1}^\infty \dfrac{\sin^2 n}{n}" /> sorra?</>}>
          <p>
            Mert az <M t="f(x) = \dfrac{\sin^2 x}{x}" /> függvény <strong>nem csökkenő</strong> (folyamatosan 0 és{' '}
            <M t="1/x" /> között hullámzik), így a tétel 3. feltétele nem teljesül!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló és tipikus hibák',
    body: (
      <>
        <IntegralTestChecklistDiagram />

        <h3>Összefoglaló táblázat</h3>
        <table className="tbl">
          <thead>
            <tr><th>Sorcsalád</th><th>Konvergencia feltétele</th><th>Megjegyzés</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><M t="p" />-sor</strong> <M t="\sum 1/n^p" /></td>
              <td><M t="p > 1" /></td>
              <td><M t="p=1" />: harmonikus sor (divergens)</td>
            </tr>
            <tr>
              <td><strong>Logaritmikus sor</strong> <M t="\sum \tfrac{1}{n(\ln n)^p}" /></td>
              <td><M t="p > 1" /></td>
              <td><M t="u = \ln x" /> helyettesítéssel</td>
            </tr>
            <tr>
              <td><strong>Maradéktag</strong> <M t="R_n" /></td>
              <td><M t="\int_{n+1}^\infty f \le R_n \le \int_n^\infty f" /></td>
              <td>Pontos hibakorlát közelítéshez</td>
            </tr>
          </tbody>
        </table>

        <h3>Négy tipikus hiba, amit érdemes elkerülni</h3>
        <Warn>
          <strong>1. A sor összegének azonosítása az integrállal:</strong> ha <M t="\int_1^\infty f(x)\,dx = L" />, a
          sor összege <em>nem</em> <M t="L" />, hanem <M t="L \le S \le a_1 + L" />!
        </Warn>
        <Warn>
          <strong>2. A csökkenés feltételének kihagyása:</strong> ha <M t="f(x)" /> nem csökkenő (pl.{' '}
          <M t="\cos^2(\pi x)" />), az integrálkritérium <em>nem használható</em>!
        </Warn>
        <Warn>
          <strong>3. Elfelejtett alsó határ (<M t="N = 2" />):</strong> a <M t="\sum_{n=2}^\infty \tfrac{1}{n\ln n}" />{' '}
          sornál <M t="x=1" />-nél a nevező 0, ezért az integrált is <M t="2" />-től (nem <M t="1" />-től!) kell
          indítani.
        </Warn>
        <Warn>
          <strong>4. Nem pozitív tagok:</strong> váltakozó előjelű sorokra (pl. <M t="\sum \tfrac{(-1)^n}{n}" />) az
          integrálkritérium nem alkalmazható — azokra a 11.6-os Leibniz-kritérium való!
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={13} q={<>Ha <M t="a_n = f(n)" /> kielégíti az integrálkritériumot, <M t="a_1 = 1" /> és <M t="\int_1^\infty f(x)\,dx = 3" />, milyen intervallumban van biztosan a sor <M t="S" /> összege?</>}>
          <p>
            Az <M t="\int_1^\infty f \le S \le a_1 + \int_1^\infty f" /> egyenlőtlenségből{' '}
            <M t="3 \le S \le 4" />!
          </p>
        </Task>
        <Task n={14} q={<>Miért nem mond ellent az integrálkritériumnak, hogy <M t="\sum_{n=1}^\infty \cos^2(\pi n) = \sum 1 = \infty" />, miközben <M t="f(x) = \cos^2(\pi x)" /> nem csökkenő?</>}>
          <p>
            Mert a tétel csak csökkenő függvényre szól! Még drámaibb példa: <M t="\sum \sin^2(\pi n) = \sum 0 = 0" />{' '}
            konvergens, miközben <M t="\int_1^\infty \sin^2(\pi x)\,dx = +\infty" /> — pontosan azért, mert{' '}
            <M t="\sin^2(\pi x)" /> nem csökkenő!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Gyakorló feladatok',
    body: (
      <>
        <p>Próbáld meg előbb önállóan megoldani, a megoldást csak utána nyisd ki.</p>

        <h3>Könnyű</h3>

        <Task n={15} q={<>Döntsd el a <M t="p" />-sorok kritériumával: (a) <M t="\sum \dfrac{5}{n^{4/3}}" />, (b) <M t="\sum \dfrac{1}{\sqrt[4]{n^3}}" />, (c) <M t="\sum \dfrac{1}{n\sqrt[3]{n}}" />!</>}>
          <ul>
            <li>(a) <M t="p = \tfrac{4}{3} > 1 \Rightarrow" /> <strong>konvergens</strong>.</li>
            <li>(b) <M t="p = \tfrac{3}{4} \le 1 \Rightarrow" /> <strong>divergens</strong>.</li>
            <li>(c) <M t="p = \tfrac{4}{3} > 1 \Rightarrow" /> <strong>konvergens</strong>.</li>
          </ul>
        </Task>

        <Task n={16} q={<>Döntsd el integrálkritériummal: <M t="\sum_{n=1}^\infty \dfrac{1}{(3n + 1)^2}" />!</>}>
          <p>
            <M t="\int_1^\infty (3x+1)^{-2}\,dx = \left[-\dfrac{1}{3(3x+1)}\right]_1^\infty = \dfrac{1}{12} < \infty \Rightarrow" />{' '}
            <strong>konvergens</strong>.
          </p>
        </Task>

        <Task n={17} q={<>Döntsd el integrálkritériummal: <M t="\sum_{n=1}^\infty \dfrac{1}{\sqrt{n + 4}}" />!</>}>
          <p>
            <M t="\int_1^\infty (x+4)^{-1/2}\,dx = \Big[2\sqrt{x+4}\Big]_1^\infty = +\infty \Rightarrow" />{' '}
            <strong>divergens</strong>.
          </p>
        </Task>

        <h3>Közepes</h3>

        <Task n={18} q={<>Döntsd el integrálkritériummal: <M t="\sum_{n=1}^\infty \dfrac{\arctan n}{n^2 + 1}" />!</>}>
          <p>
            Az <M t="u = \arctan x,\ du = \tfrac{dx}{x^2+1}" /> helyettesítéssel:
            <M block t="\int_1^\infty \frac{\arctan x}{x^2+1}\,dx = \left[\frac{(\arctan x)^2}{2}\right]_1^\infty = \frac{\pi^2}{8} - \frac{\pi^2}{32} = \frac{3\pi^2}{32} < \infty." />
            (<M t="f(x)" /> csökkenő <M t="x \ge 1" />-re, mert <M t="\tfrac{1}{x^2+1} \le 2x\arctan x" /> <M t="x \ge 1" />-re.)
            Tehát <strong>konvergens</strong>!
          </p>
        </Task>

        <Task n={19} q={<>Döntsd el: <M t="\sum_{n=3}^\infty \dfrac{1}{n\ln n\cdot \ln(\ln n)}" />!</>}>
          <p>
            Az <M t="u = \ln(\ln x)" />, <M t="du = \dfrac{dx}{x\ln x}" /> helyettesítéssel:
            <M block t="\int_3^\infty \frac{dx}{x\ln x\cdot\ln(\ln x)} = \Big[\ln(\ln(\ln x))\Big]_3^\infty = +\infty \ \Longrightarrow\ \textbf{divergens}!" />
          </p>
        </Task>

        <Task n={20} q={<>Legalább hány tagot kell összeadni a <M t="\sum_{n=1}^\infty \dfrac{1}{n^4}" /> sorból ahhoz, hogy az <M t="s_n" /> közelítés hibája <M t="10^{-4}" /> alatt legyen?</>}>
          <p>
            <M t="R_n \le \int_n^\infty x^{-4}\,dx = \dfrac{1}{3n^3} < 10^{-4} \Longleftrightarrow n^3 > \dfrac{10\,000}{3} \approx 3333{,}3" />.
            Mivel <M t="14^3 = 2744" /> és <M t="15^3 = 3375" />, elég <M t="n = 15" /> tag!
          </p>
        </Task>

        <h3>Nehéz</h3>

        <Task
          n={21}
          q={
            <>
              Milyen <M t="p" /> valós számokra konvergens a <M t="\sum_{n=2}^\infty \dfrac{\ln n}{n^p}" /> sor?
            </>
          }
        >
          <p>
            Ha <M t="p \le 1" />, akkor <M t="\dfrac{\ln n}{n^p} \ge \dfrac{\ln 2}{n}" />, tehát divergens. Ha{' '}
            <M t="p > 1" />, integrálkritériummal (parciálisan <M t="u = \ln x,\ dv = x^{-p}\,dx" />):
            <M block t="\int_2^\infty x^{-p}\ln x\,dx = \left[\frac{x^{1-p}}{1-p}\left(\ln x - \frac{1}{1-p}\right)\right]_2^\infty < \infty," />
            mert <M t="1 - p < 0" /> miatt <M t="x^{1-p}\ln x \to 0" />! Tehát pontosan <M t="p > 1" /> esetén{' '}
            <strong>konvergens</strong>!
          </p>
        </Task>

        <Task
          n={22}
          q={
            <>
              Igazold, hogy a <M t="\gamma_n = 1 + \dfrac{1}{2} + \cdots + \dfrac{1}{n} - \ln n" /> sorozat konvergens
              (határértéke az Euler–Mascheroni-féle <M t="\gamma \approx 0{,}5772" /> állandó)!
            </>
          }
        >
          <p>
            <strong>Alulról korlátos:</strong> <M t="1 + \tfrac{1}{2} + \cdots + \tfrac{1}{n} > \int_1^{n+1}\tfrac{dx}{x} = \ln(n+1) > \ln n" />,
            tehát <M t="\gamma_n > 0" />.
          </p>
          <p>
            <strong>Monoton csökkenő:</strong>{' '}
            <M t="\gamma_n - \gamma_{n+1} = \ln\left(\tfrac{n+1}{n}\right) - \tfrac{1}{n+1} = \int_n^{n+1}\left(\tfrac{1}{x} - \tfrac{1}{n+1}\right)dx > 0" />,
            mert <M t="x < n+1 \Rightarrow \tfrac{1}{x} > \tfrac{1}{n+1}" />! Weierstrass tétele szerint tehát{' '}
            <M t="\{\gamma_n\}" /> konvergens!
          </p>
        </Task>

        <Task
          n={23}
          q={
            <>
              Számítsd ki a <M t="\sum_{n=1}^\infty \dfrac{1}{n^2}" /> sor 4. részletösszegét (<M t="s_4" />), és adj a
              maradéktag-becsléssel kétoldali korlátot <M t="\pi^2/6" />-ra!
            </>
          }
        >
          <p>
            <M t="s_4 = 1 + \dfrac{1}{4} + \dfrac{1}{9} + \dfrac{1}{16} = \dfrac{205}{144} \approx 1{,}4236" />. A
            maradéktag-becsléssel <M t="\dfrac{1}{5} \le R_4 \le \dfrac{1}{4}" />, így:
            <M block t="1{,}4236 + 0{,}2000 = 1{,}6236 \le \frac{\pi^2}{6} \le 1{,}4236 + 0{,}2500 = 1{,}6736." />
            (A valódi érték <M t="1{,}6449" />, gyönyörűen középen van!)
          </p>
        </Task>
      </>
    ),
  },
];
