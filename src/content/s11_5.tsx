import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  ExponentialVsFactorialRaceWidget,
  FactorialCancellationWidget,
  InconclusiveOneTrapDiagram,
  RatioGeometricProofDiagram,
  RatioRootSummaryDiagram,
  RatioTestVisualizerWidget,
  RatioVsRootSelectorWidget,
  RootTestVisualizerWidget,
} from '../components/Widgets115';
import type { Page } from './s1_1';

export const S11_5: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'A hányadoskritérium (D’Alembert-kritérium)',
    body: (
      <>
        <Story>
          <p>
            Az összehasonlító kritériumoknál nekünk kellett kitalálni egy <M t="b_n" /> referenciasort. A{' '}
            <strong>hányados- és a gyökkritérium</strong> ennél is kényelmesebb: <em>belső</em> vizsgálatok, amelyek
            automatikusan egy mértani sorhoz mérik a vizsgált sort! Faktoriálisok és exponenciálisok esetén verhetetlenek.
          </p>
        </Story>

        <Def title="Hányadoskritérium (12. tétel)">
          <p>
            Legyen <M t="\sum a_n" /> pozitív tagú sor (<M t="a_n > 0" />), és tegyük fel, hogy létezik a
          </p>
          <M block t="\rho = \lim_{n\to\infty} \frac{a_{n+1}}{a_n}" />
          <p>határérték (véges vagy <M t="+\infty" />). Ekkor:</p>
          <ul>
            <li>ha <M t="\rho < 1" />, a sor <strong>konvergens</strong>;</li>
            <li>ha <M t="\rho > 1" /> (vagy <M t="\rho = \infty" />), a sor <strong>divergens</strong>;</li>
            <li>ha <M t="\rho = 1" />, a kritérium <strong>nem dönt</strong> (más módszer kell!).</li>
          </ul>
        </Def>

        <RatioTestVisualizerWidget />

        <Quiz
          q={<>Mennyi a hányadoskritérium <M t="\rho" /> értéke a <M t="\sum_{n=1}^\infty \dfrac{3^n}{n!}" /> sorra, és mit jelent ez?</>}
          options={[
            { label: <><M t="\rho = 3 > 1" /> <M t="\Rightarrow" /> divergens</> },
            { label: <><M t="\rho = 0 < 1" /> <M t="\Rightarrow" /> konvergens</>, ok: true },
            { label: <><M t="\rho = 1" /> <M t="\Rightarrow" /> nem dönt</> },
            { label: <><M t="\rho = \tfrac{1}{3} < 1" /> <M t="\Rightarrow" /> konvergens</> },
          ]}
          explain={
            <>
              <M t="\dfrac{a_{n+1}}{a_n} = \dfrac{3^{n+1}/(n+1)!}{3^n/n!} = \dfrac{3}{n+1} \longrightarrow 0 < 1" />,
              tehát a sor <strong>konvergens</strong>!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={1} q={<>Döntsd el hányadoskritériummal: <M t="\sum_{n=1}^\infty \dfrac{n^2}{3^n}" />!</>}>
          <p>
            <M t="\dfrac{a_{n+1}}{a_n} = \dfrac{(n+1)^2}{3^{n+1}}\cdot\dfrac{3^n}{n^2} = \dfrac{1}{3}\left(\dfrac{n+1}{n}\right)^2 \longrightarrow \dfrac{1}{3} < 1 \Longrightarrow" />{' '}
            <strong>konvergens</strong>!
          </p>
        </Task>
        <Task n={2} q={<>Döntsd el hányadoskritériummal: <M t="\sum_{n=1}^\infty \dfrac{n!}{10^n}" />!</>}>
          <p>
            <M t="\dfrac{a_{n+1}}{a_n} = \dfrac{n+1}{10} \longrightarrow +\infty > 1 \Longrightarrow" />{' '}
            <strong>divergens</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Faktoriálisok egyszerűsítése és a bizonyítás lényege',
    body: (
      <>
        <RatioGeometricProofDiagram />

        <FactorialCancellationWidget />

        <Steps
          title="Hányadoskritérium n! / nⁿ-re (e jelenik meg!)"
          problem={
            <>
              Döntsük el hányadoskritériummal, hogy konvergens-e a <M t="\sum_{n=1}^\infty \dfrac{n!}{n^n}" /> sor!
            </>
          }
          steps={[
            {
              title: '1. Az aₙ₊₁ / aₙ hányados felírása',
              body: (
                <>
                  <M block t="\frac{a_{n+1}}{a_n} = \frac{(n+1)!}{(n+1)^{n+1}} \cdot \frac{n^n}{n!} = \frac{n+1}{(n+1)^{n+1}}\cdot n^n = \frac{n^n}{(n+1)^n}." />
                </>
              ),
            },
            {
              title: '2. Átírás az Euler-féle határértékre',
              body: (
                <>
                  <M block t="\frac{n^n}{(n+1)^n} = \frac{1}{\left(\dfrac{n+1}{n}\right)^n} = \frac{1}{\left(1 + \dfrac{1}{n}\right)^n}." />
                </>
              ),
            },
            {
              title: '3. Határérték és döntés',
              body: (
                <>
                  Mivel <M t="\left(1 + \tfrac{1}{n}\right)^n \to e" />, kapjuk, hogy{' '}
                  <M t="\rho = \dfrac{1}{e} \approx 0{,}368 < 1" />. Tehát a <M t="\sum \dfrac{n!}{n^n}" /> sor{' '}
                  <strong>konvergens</strong>!
                </>
              ),
            },
          ]}
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={3} q={<>Döntsd el hányadoskritériummal: <M t="\sum_{n=1}^\infty \dfrac{4^n (n!)^2}{(2n)!}" />!</>}>
          <p>
            <M t="\dfrac{a_{n+1}}{a_n} = \dfrac{4\cdot (n+1)^2}{(2n+2)(2n+1)} = \dfrac{4n^2 + 8n + 4}{4n^2 + 6n + 2} \longrightarrow 1" />!
            Vigyázz: a hányadoskritérium itt <strong>nem dönt</strong>! (Valójában minden tényező{' '}
            <M t="\dfrac{4(n+1)^2}{(2n+2)(2n+1)} = \dfrac{2n+2}{2n+1} > 1" />, így <M t="a_n" /> nő, nem tart 0-hoz{' '}
            <M t="\Rightarrow" /> <strong>divergens</strong>!)
          </p>
        </Task>
        <Task n={4} q={<>Döntsd el: <M t="\sum_{n=1}^\infty \dfrac{3^n (n!)^2}{(2n)!}" />!</>}>
          <p>
            <M t="\dfrac{a_{n+1}}{a_n} = \dfrac{3(n+1)^2}{(2n+2)(2n+1)} \longrightarrow \dfrac{3}{4} < 1 \Longrightarrow" />{' '}
            <strong>konvergens</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'A gyökkritérium (Cauchy-kritérium)',
    body: (
      <>
        <p>
          Ha a sor általános tagja egy egész kifejezés <M t="n" />-edik (vagy <M t="n^2" />-edik) hatványa, a
          hányadoskritérium helyett villámgyors a <strong>gyökkritérium</strong>, mert az <M t="n" />-edik gyök azonnal
          „lecsippenti” a külső hatványt!
        </p>

        <Def title="Gyökkritérium (13. tétel)">
          <p>
            Legyen <M t="\sum a_n" /> nemnegatív tagú sor (<M t="a_n \ge 0" />), és tegyük fel, hogy létezik a
          </p>
          <M block t="\rho = \lim_{n\to\infty} \sqrt[n]{a_n} = \lim_{n\to\infty} a_n^{1/n}" />
          <p>határérték. Ekkor:</p>
          <ul>
            <li>ha <M t="\rho < 1" />, a sor <strong>konvergens</strong>;</li>
            <li>ha <M t="\rho > 1" /> (vagy <M t="\rho = \infty" />), a sor <strong>divergens</strong>;</li>
            <li>ha <M t="\rho = 1" />, a kritérium <strong>nem dönt</strong>.</li>
          </ul>
        </Def>

        <RootTestVisualizerWidget />

        <Quiz
          q={<>Döntsd el gyökkritériummal a <M t="\sum_{n=1}^\infty \left(\dfrac{2n + 3}{5n - 1}\right)^n" /> sorról, hogy konvergens-e!</>}
          options={[
            { label: <><M t="\rho = \tfrac{2}{5} < 1" /> <M t="\Rightarrow" /> konvergens</>, ok: true },
            { label: <><M t="\rho = \tfrac{5}{2} > 1" /> <M t="\Rightarrow" /> divergens</> },
            { label: <><M t="\rho = 1" /> <M t="\Rightarrow" /> nem dönt</> },
            { label: <><M t="\rho = 0 < 1" /> <M t="\Rightarrow" /> konvergens</> },
          ]}
          explain={
            <>
              <M t="\sqrt[n]{a_n} = \dfrac{2n + 3}{5n - 1} \longrightarrow \dfrac{2}{5} < 1" />, tehát{' '}
              <strong>konvergens</strong>!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={5} q={<>Döntsd el gyökkritériummal: <M t="\sum_{n=2}^\infty \dfrac{1}{(\ln n)^n}" />!</>}>
          <p>
            <M t="\sqrt[n]{a_n} = \dfrac{1}{\ln n} \longrightarrow 0 < 1 \Longrightarrow" /> <strong>konvergens</strong>!
          </p>
        </Task>
        <Task n={6} q={<>Döntsd el gyökkritériummal: <M t="\sum_{n=1}^\infty \left(\dfrac{n}{n + 1}\right)^{n^2}" />!</>}>
          <p>
            <M t="\sqrt[n]{a_n} = \left(\dfrac{n}{n+1}\right)^n = \dfrac{1}{(1 + 1/n)^n} \longrightarrow \dfrac{1}{e} < 1 \Longrightarrow" />{' '}
            <strong>konvergens</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A ρ = 1 határeset: miért tehetetlen mindkét kritérium a p-sorokon?',
    body: (
      <>
        <InconclusiveOneTrapDiagram />

        <p>
          Általánosan igaz, hogy <strong>bármely</strong> <M t="a_n = \dfrac{P(n)}{Q(n)}" /> racionális (polinomok
          hányadosa) vagy <M t="p" />-sor esetén mind a hányados-, mind a gyökkritérium pontosan <M t="\rho = 1" />-et
          ad! Ezért racionális tagú sorokra <em>soha ne pazarold az időt</em> hányados- vagy gyökkritériummal — azonnal
          nyúlj a <strong>limeszes összehasonlító kritériumhoz</strong> (11.4)!
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={7} q={<>Miért ad <M t="\rho = 1" />-et a gyökkritérium minden <M t="\sum \dfrac{1}{n^p}" /> sorra?</>}>
          <p>
            Mert <M t="\sqrt[n]{1/n^p} = \dfrac{1}{(n^{1/n})^p} \longrightarrow \dfrac{1}{1^p} = 1" /> (a 11.1 nevezetes
            határértéke alapján)!
          </p>
        </Task>
        <Task n={8} q={<>Ha egy sorra <M t="\rho = 1" />, mit tegyél utána? Adj példát egy konvergens és egy divergens sorra, ahol <M t="\rho = 1" />!</>}>
          <p>
            Próbálj más kritériumot (<M t="n" />-edik tag teszt, összehasonlítás, integrálkritérium)! Példa:{' '}
            <M t="\sum \tfrac{1}{n}" /> (div.) és <M t="\sum \tfrac{1}{n^2}" /> (konv.).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Hányados vs. gyök: mikor melyiket válasszuk?',
    body: (
      <>
        <RatioVsRootSelectorWidget />

        <p>
          <em>Elméleti érdekesség:</em> a gyökkritérium elvben <strong>erősebb</strong> a hányadoskritériumnál — ha{' '}
          <M t="\lim \tfrac{a_{n+1}}{a_n} = \rho" /> létezik, akkor <M t="\lim \sqrt[n]{a_n} = \rho" /> is mindig
          létezik és megegyezik vele! Fordítva viszont nem igaz: például az
        </p>
        <M block t="\frac{1}{2} + \frac{1}{3} + \frac{1}{2^2} + \frac{1}{3^2} + \frac{1}{2^3} + \frac{1}{3^3} + \cdots" />
        <p>
          sorban az egymást követő tagok hányadosa hol <M t="\to 0" />, hol <M t="\to \infty" /> (nincs határértéke!),
          miközben <M t="\sqrt[n]{a_n} \le \left(\tfrac{1}{2}\right)^{1/2} < 1" />, így a gyökkritérium simán igazolja
          a konvergenciát!
        </p>

        <Quiz
          q={<>Melyik sorra a <strong>hányadoskritérium</strong> a legpraktikusabb választás?</>}
          options={[
            { label: <M t="\sum_{n=1}^\infty \dfrac{n^3}{n^5 + 2}" /> },
            { label: <M t="\sum_{n=1}^\infty \dfrac{2^n n!}{(n+2)!}" />, ok: true },
            { label: <M t="\sum_{n=1}^\infty \dfrac{1}{n\ln n}" /> },
            { label: <M t="\sum_{n=1}^\infty \left(\dfrac{n}{3n+1}\right)^n" /> },
          ]}
          explain={
            <>
              A második sorban faktoriálisok vannak (<M t="n!" /> és <M t="(n+2)!" />), amelyeket a hányadoskritérium
              azonnal kiejt! (Az elsőre összehasonlítás, a harmadikra integrálkritérium, a negyedikre gyökkritérium a legjobb.)
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={9} q={<>Döntsd el a leggyorsabb módszerrel: <M t="\sum_{n=1}^\infty \dfrac{n^3 + 1}{2^n}" />!</>}>
          <p>
            Hányadoskritériummal: <M t="\dfrac{a_{n+1}}{a_n} = \dfrac{1}{2}\cdot\dfrac{(n+1)^3 + 1}{n^3 + 1} \longrightarrow \dfrac{1}{2} < 1 \Rightarrow" />{' '}
            <strong>konvergens</strong>!
          </p>
        </Task>
        <Task n={10} q={<>Döntsd el a leggyorsabb módszerrel: <M t="\sum_{n=1}^\infty \dfrac{e^n}{n^n}" />!</>}>
          <p>
            Gyökkritériummal: <M t="\sqrt[n]{a_n} = \dfrac{e}{n} \longrightarrow 0 < 1 \Longrightarrow" />{' '}
            <strong>konvergens</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Paraméteres sorok: előzetes a hatványsorokhoz',
    body: (
      <>
        <p>
          A 11.7-es szakaszban hatványsorokat (<M t="\sum c_n x^n" />) fogunk vizsgálni. A hányados- és gyökkritérium
          már most megmutatja, hogyan találjuk meg egy paraméteres sor konvergenciatartományát!
        </p>

        <ExponentialVsFactorialRaceWidget />

        <h3>Kidolgozott példa — Milyen x &gt; 0 értékekre konvergens ∑ n · xⁿ / 3ⁿ?</h3>
        <p>
          Hányadoskritériummal (<M t="x > 0" />):
        </p>
        <M block t="\rho = \lim_{n\to\infty} \frac{(n+1)x^{n+1}/3^{n+1}}{n x^n / 3^n} = \lim_{n\to\infty} \frac{n+1}{n}\cdot\frac{x}{3} = \frac{x}{3}." />
        <p>
          Tehát <M t="0 < x < 3" /> esetén <strong>konvergens</strong>, <M t="x > 3" /> esetén <strong>divergens</strong>!
          A határon (<M t="x = 3" />) a sor <M t="\sum n" />, ami divergens.
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={11} q={<>Milyen <M t="x > 0" /> értékekre konvergens a <M t="\sum_{n=1}^\infty \dfrac{x^n}{n^2}" /> sor?</>}>
          <p>
            <M t="\rho = \lim \dfrac{x^{n+1}/(n+1)^2}{x^n/n^2} = x" />. Tehát <M t="0 < x < 1" />-re konvergens,{' '}
            <M t="x > 1" />-re divergens. A határon (<M t="x = 1" />) <M t="\sum \tfrac{1}{n^2}" />{' '}
            <strong>konvergens</strong>! Így <M t="0 < x \le 1" />.
          </p>
        </Task>
        <Task n={12} q={<>Milyen <M t="x > 0" /> értékekre konvergens a <M t="\sum_{n=1}^\infty n!\,x^n" /> sor?</>}>
          <p>
            <M t="\rho = \lim (n+1)x = +\infty" /> minden <M t="x > 0" />-ra! Tehát <strong>egyetlen <M t="x > 0" />-ra
            sem</strong> konvergens (csak <M t="x = 0" />-ra)!
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
        <RatioRootSummaryDiagram />

        <h3>Gyors összefoglaló táblázat</h3>
        <table className="tbl">
          <thead>
            <tr><th>Kritérium</th><th>Képlet</th><th>Mire ideális?</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Hányadoskritérium</strong></td>
              <td><M t="\rho = \lim \dfrac{a_{n+1}}{a_n}" /></td>
              <td>Faktoriálisok (<M t="n!,\ (2n)!" />), exponenciálisok (<M t="c^n" />)</td>
            </tr>
            <tr>
              <td><strong>Gyökkritérium</strong></td>
              <td><M t="\rho = \lim \sqrt[n]{a_n}" /></td>
              <td>Teljes <M t="n" />-edik hatványok (<M t="(\dots)^n" />), <M t="n^n" /></td>
            </tr>
          </tbody>
        </table>

        <h3>Négy tipikus hiba, amit érdemes elkerülni</h3>
        <Warn>
          <strong>1. A <M t="(2n)!" /> hibás növelése:</strong> <M t="n" /> helyére <M t="n+1" />-et írva{' '}
          <M t="(2(n+1))! = (2n+2)!" /> lesz, <em>nem</em> <M t="(2n+1)!" />!
        </Warn>
        <Warn>
          <strong>2. A <M t="\rho = 1" /> téves értelmezése:</strong> <M t="\rho = 1" /> <em>nem</em> jelenti azt, hogy
          a sor divergens vagy konvergens — egyszerűen másik teszt kell!
        </Warn>
        <Warn>
          <strong>3. Az <M t="a_n / a_{n+1}" /> fordított felírása:</strong> mindig az <strong>új tag osztva a régi
          taggal</strong> (<M t="a_{n+1}/a_n" />)! Ha megfordítod, pontosan az ellenkezőjét kapod a konvergenciára!
        </Warn>
        <Warn>
          <strong>4. Hányadoskritérium használata tiszta polinomtörtekre:</strong> racionális tagoknál{' '}
          <M t="\rho" /> mindig <M t="1" /> lesz — felesleges számolás, használj összehasonlítást!
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={13} q={<>Mi a helyes <M t="(3n)!" /> helyébe lépő kifejezés, ha <M t="n \to n+1" />?</>}>
          <p>
            <M t="(3(n+1))! = (3n+3)! = (3n+3)(3n+2)(3n+1)(3n)!" /> — három új tényező lép be!
          </p>
        </Task>
        <Task n={14} q={<>Miért nem szabad a hányadoskritériumot közvetlenül (abszolútérték nélkül) alkalmazni a <M t="\sum \dfrac{(-2)^n}{n!}" /> sorra?</>}>
          <p>
            A 12. tétel pozitív tagokra szól! A következő (11.6) szakaszban az <em>abszolút konvergenciával</em>{' '}
            (<M t="\lim |a_{n+1}/a_n|" />) terjesztjük ki tetszőleges előjelű sorokra.
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

        <Task n={15} q={<>Döntsd el hányadoskritériummal: (a) <M t="\sum_{n=1}^\infty \dfrac{2^n}{n^3}" />, (b) <M t="\sum_{n=1}^\infty \dfrac{n^3}{2^n}" />!</>}>
          <ul>
            <li>(a) <M t="\rho = 2 > 1 \Rightarrow" /> <strong>divergens</strong>.</li>
            <li>(b) <M t="\rho = \tfrac{1}{2} < 1 \Rightarrow" /> <strong>konvergens</strong>.</li>
          </ul>
        </Task>

        <Task n={16} q={<>Döntsd el gyökkritériummal: <M t="\sum_{n=1}^\infty \left(\dfrac{4n - 1}{3n + 2}\right)^n" />!</>}>
          <p>
            <M t="\rho = \lim \dfrac{4n-1}{3n+2} = \dfrac{4}{3} > 1 \Longrightarrow" /> <strong>divergens</strong>.
          </p>
        </Task>

        <Task n={17} q={<>Döntsd el: <M t="\sum_{n=1}^\infty \dfrac{5^n}{(2n)!}" />!</>}>
          <p>
            Hányadoskritériummal: <M t="\dfrac{a_{n+1}}{a_n} = \dfrac{5}{(2n+2)(2n+1)} \longrightarrow 0 < 1 \Longrightarrow" />{' '}
            <strong>konvergens</strong>.
          </p>
        </Task>

        <h3>Közepes</h3>

        <Task n={18} q={<>Döntsd el: <M t="\sum_{n=1}^\infty \dfrac{n!\,2^n}{n^n}" />!</>}>
          <p>
            Hányadoskritériummal: <M t="\dfrac{a_{n+1}}{a_n} = 2\left(\dfrac{n}{n+1}\right)^n \longrightarrow \dfrac{2}{e} \approx 0{,}736 < 1 \Longrightarrow" />{' '}
            <strong>konvergens</strong>!
          </p>
        </Task>

        <Task n={19} q={<>Döntsd el gyökkritériummal: <M t="\sum_{n=1}^\infty \left(1 + \dfrac{2}{n}\right)^{-n^2}" />!</>}>
          <p>
            <M t="\sqrt[n]{a_n} = \left(1 + \dfrac{2}{n}\right)^{-n} \longrightarrow e^{-2} = \dfrac{1}{e^2} \approx 0{,}135 < 1 \Longrightarrow" />{' '}
            <strong>konvergens</strong>!
          </p>
        </Task>

        <Task n={20} q={<>Döntsd el: <M t="\sum_{n=1}^\infty \dfrac{1\cdot 3\cdot 5\cdots(2n-1)}{n!}" />!</>}>
          <p>
            Hányadoskritériummal: <M t="\dfrac{a_{n+1}}{a_n} = \dfrac{2n + 1}{n + 1} \longrightarrow 2 > 1 \Longrightarrow" />{' '}
            <strong>divergens</strong>!
          </p>
        </Task>

        <h3>Nehéz</h3>

        <Task
          n={21}
          q={
            <>
              Döntsd el: <M t="\sum_{n=1}^\infty \dfrac{n!\,e^n}{n^n}" />! (Vigyázz: itt a hányadoskritérium{' '}
              <M t="\rho = 1" />-et ad!)
            </>
          }
        >
          <p>
            Valóban <M t="\dfrac{a_{n+1}}{a_n} = \dfrac{e}{(1 + 1/n)^n} \to 1" />, tehát a hányadoskritérium nem dönt!
            Viszont tudjuk, hogy <M t="\left(1 + \dfrac{1}{n}\right)^n < e" /> minden <M t="n \ge 1" />-re! Ezért{' '}
            <M t="\dfrac{a_{n+1}}{a_n} = \dfrac{e}{(1+1/n)^n} > 1" />, vagyis <M t="a_1 < a_2 < a_3 < \cdots" />{' '}
            szigorúan <strong>nő</strong> (<M t="a_1 = e > 0" />)! Így <M t="a_n \not\to 0" />, tehát a sor{' '}
            <strong>divergens</strong>!
          </p>
        </Task>

        <Task
          n={22}
          q={
            <>
              Milyen <M t="c > 0" /> konstansokra konvergens a <M t="\sum_{n=1}^\infty \dfrac{c^n (n!)^2}{(2n)!}" /> sor?
            </>
          }
        >
          <p>
            Hányadoskritériummal: <M t="\rho = \lim \dfrac{c(n+1)^2}{(2n+2)(2n+1)} = \dfrac{c}{4}" />. Tehát{' '}
            <M t="0 < c < 4" /> esetén <strong>konvergens</strong>, <M t="c > 4" /> esetén <strong>divergens</strong>.
            A 3. feladatból tudjuk, hogy <M t="c = 4" /> esetén is divergens! Tehát pontosan <M t="0 < c < 4" />.
          </p>
        </Task>

        <Task
          n={23}
          q={
            <>
              Döntsd el gyökkritériummal: <M t="\sum_{n=1}^\infty \dfrac{(\arctan n)^n}{2^n}" />!
            </>
          }
        >
          <p>
            <M t="\sqrt[n]{a_n} = \dfrac{\arctan n}{2} \longrightarrow \dfrac{\pi/2}{2} = \dfrac{\pi}{4} \approx 0{,}785 < 1 \Longrightarrow" />{' '}
            <strong>konvergens</strong>!
          </p>
        </Task>

        <h3>Kiegészítő mintapélda</h3>
        <Steps
          title="Hányadoskritérium polinom × exponenciális / faktoriális sorra"
          source="Analízis-labor"
          problem={
            <>
              Vizsgáljuk a <M t="\sum_{n=1}^\infty \dfrac{n^2 \cdot 3^n}{n!}" /> sor konvergenciáját!
            </>
          }
          steps={[
            {
              title: 'Hányados felírása és egyszerűsítése',
              body: (
                <M block t="\frac{a_{n+1}}{a_n} = \frac{(n+1)^2 \cdot 3^{n+1}}{(n+1)!} \cdot \frac{n!}{n^2 \cdot 3^n} = \frac{3(n+1)^2}{n^2(n+1)} = \frac{3(n+1)}{n^2}." />
              ),
            },
            {
              title: 'Határérték kiszámítása',
              body: (
                <p>
                  <M t="\rho = \lim_{n\to\infty} \dfrac{3(n+1)}{n^2} = 0 < 1" />.
                </p>
              ),
            },
            {
              title: 'Következtetés',
              body: (
                <p>
                  A sor tehát <strong>konvergens</strong> (sőt, a faktoriális miatt villámgyorsan).
                </p>
              ),
            },
          ]}
        />

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Mit mond a hányadoskritérium a <M t="\sum_{n=1}^\infty \dfrac{1}{n^2}" /> sorra?
            </>
          }
          options={[
            { label: <><M t="\rho = 1" />, tehát a hányadoskritérium nem dönt</>, ok: true },
            { label: <><M t="\rho = 0" />, tehát konvergens</> },
            { label: <><M t="\rho = \tfrac{1}{2}" />, tehát konvergens</> },
            { label: <><M t="\rho = 2" />, tehát divergens</> },
          ]}
          explain={
            <>
              <M t="\dfrac{n^2}{(n+1)^2} \to 1" />, ezért minden <M t="p" />-sor esetén a hányados- és a gyökkritérium
              eredménytelen.
            </>
          }
        />
      </>
    ),
  },
];
