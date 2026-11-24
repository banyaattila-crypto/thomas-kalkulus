import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  AsymptoticEquivalenceDiagram,
  ComparisonDecisionTreeDiagram,
  DirectComparisonWidget,
  DominantTermPickerWidget,
  FactorialVsGeometricWidget,
  LimitComparisonEdgeCasesWidget,
  LimitComparisonWidget,
  WrongDirectionTrapDiagram,
} from '../components/Widgets114';
import type { Page } from './s1_1';

export const S11_4: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Közvetlen összehasonlító kritérium: majoráns és minoráns',
    body: (
      <>
        <Story>
          <p>
            Az integrálkritérium remek, de sok sor (például <M t="\sum \tfrac{1}{n!}" /> vagy{' '}
            <M t="\sum \tfrac{1}{2^n + \sqrt{n}}" />) nehezen vagy sehogyan sem integrálható zárt alakban. Ekkor jön a
            legtermészetesebb ötlet: <strong>hasonlítsuk össze</strong> a vizsgált sort egy olyan egyszerű sorral (egy{' '}
            <M t="p" />-sorral vagy mértani sorral), amelynek már tudjuk a sorsát!
          </p>
        </Story>

        <Def title="Közvetlen összehasonlító kritérium (10. tétel)">
          <p>Legyen <M t="\sum a_n" /> nemnegatív tagú sor (<M t="a_n \ge 0" />). Ha létezik olyan <M t="N" /> index, amelytől kezdve (<M t="n \ge N" />):</p>
          <ul>
            <li><strong>(a) Majoránskritérium:</strong> <M t="0 \le a_n \le c_n" /> és <M t="\sum c_n" /> konvergens <M t="\Longrightarrow" /> <M t="\sum a_n" /> <strong>konvergens</strong>!</li>
            <li><strong>(b) Minoránskritérium:</strong> <M t="0 \le d_n \le a_n" /> és <M t="\sum d_n" /> divergens <M t="\Longrightarrow" /> <M t="\sum a_n" /> <strong>divergens</strong>!</li>
          </ul>
        </Def>

        <DirectComparisonWidget />

        <Quiz
          q={<>Melyik összehasonlítás bizonyítja <strong>helyesen</strong> a <M t="\sum_{n=1}^\infty \dfrac{1}{n^2 + 5n}" /> sor konvergenciáját?</>}
          options={[
            { label: <><M t="\dfrac{1}{n^2+5n} \le \dfrac{1}{n}" /> és <M t="\sum \tfrac{1}{n}" /> divergens</> },
            { label: <><M t="\dfrac{1}{n^2+5n} \le \dfrac{1}{n^2}" /> és <M t="\sum \tfrac{1}{n^2}" /> konvergens</>, ok: true },
            { label: <><M t="\dfrac{1}{n^2+5n} \ge \dfrac{1}{6n^2}" /> és <M t="\sum \tfrac{1}{6n^2}" /> konvergens</> },
            { label: <>Nem hasonlítható <M t="p" />-sorhoz</> },
          ]}
          explain={
            <>
              Mivel a nevező nagyobb (<M t="n^2 + 5n > n^2" />), a tört kisebb: <M t="\dfrac{1}{n^2+5n} \le \dfrac{1}{n^2}" />,
              és a konvergens <M t="\sum \tfrac{1}{n^2}" /> (<M t="p=2>1" />) majorálja!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={1} q={<>Igazold a majoránskritériummal, hogy <M t="\sum_{n=1}^\infty \dfrac{1}{2^n + n}" /> konvergens!</>}>
          <p>
            <M t="0 < \dfrac{1}{2^n + n} < \dfrac{1}{2^n}" />, és <M t="\sum \tfrac{1}{2^n}" /> konvergens mértani sor
            (<M t="r = \tfrac{1}{2} < 1" />), így a sor <strong>konvergens</strong>.
          </p>
        </Task>
        <Task n={2} q={<>Igazold a minoránskritériummal, hogy <M t="\sum_{n=2}^\infty \dfrac{1}{n - 1}" /> és <M t="\sum_{n=1}^\infty \dfrac{5}{5n - 1}" /> divergens!</>}>
          <p>
            <M t="\dfrac{1}{n-1} > \dfrac{1}{n}" /> és <M t="\dfrac{5}{5n-1} = \dfrac{1}{n - 1/5} > \dfrac{1}{n}" />.
            Mindkettő nagyobb a divergens harmonikus sornál, tehát mindkettő <strong>divergens</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Klasszikus becslések és a „rossz irány” csapda',
    body: (
      <>
        <p>
          Az egyik leghíresebb majorálás az <M t="e = \sum_{n=0}^\infty \dfrac{1}{n!}" /> sor konvergenciájának
          bizonyítása: minden <M t="n \ge 1" />-re <M t="n! = 1\cdot 2\cdot 3\cdots n \ge 1\cdot 2\cdot 2\cdots 2 = 2^{n-1}" />,
          tehát <M t="\dfrac{1}{n!} \le \dfrac{1}{2^{n-1}}" />!
        </p>

        <FactorialVsGeometricWidget />

        <WrongDirectionTrapDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={3} q={<>Miért NEM bizonyítja semmit a <M t="\sum_{n=2}^\infty \dfrac{1}{n^2 - 1}" /> sorról az <M t="\dfrac{1}{n^2 - 1} > \dfrac{1}{n^2}" /> egyenlőtlenség? Hogyan javítanád ki?</>}>
          <p>
            Mert egy <em>konvergens</em> sornál nagyobbnak lenni semmit sem jelent! Javítás: <M t="n \ge 2" />-re{' '}
            <M t="n^2 - 1 \ge \tfrac{1}{2}n^2" />, tehát <M t="\dfrac{1}{n^2 - 1} \le \dfrac{2}{n^2}" />, ami már
            konvergens majoráns (vagy használjuk a következő oldalon a limeszes összehasonlítást!).
          </p>
        </Task>
        <Task n={4} q={<>Igazold, hogy <M t="\sum_{n=1}^\infty \dfrac{\cos^2 n}{n^2 + 1}" /> konvergens!</>}>
          <p>
            Mivel <M t="0 \le \cos^2 n \le 1" />, ezért <M t="0 \le \dfrac{\cos^2 n}{n^2 + 1} \le \dfrac{1}{n^2}" />,
            és a majoráns <M t="\sum \tfrac{1}{n^2}" /> konvergens <M t="\Longrightarrow" /> <strong>konvergens</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'A limeszes összehasonlító kritérium (11. tétel)',
    body: (
      <>
        <p>
          Az előző oldalon láttuk, milyen macerás tud lenni egy mínuszjel a nevezőben (pl. <M t="\dfrac{1}{n^2 - 1}" />{' '}
          vagy <M t="\dfrac{3n+1}{2n^3 - n + 5}" />). A <strong>limeszes összehasonlító kritérium</strong> teljesen
          megszabadít az egyenlőtlenségek bűvészkedésétől: elég egyetlen határértéket kiszámolni!
        </p>

        <Def title="Limeszes összehasonlító kritérium (11. tétel, 1. rész)">
          <p>
            Legyen <M t="a_n > 0" /> és <M t="b_n > 0" /> minden <M t="n \ge N" />-re. Ha
          </p>
          <M block t="\lim_{n\to\infty} \frac{a_n}{b_n} = c, \qquad \text{ahol } 0 < c < \infty," />
          <p>
            akkor a <M t="\sum a_n" /> és a <M t="\sum b_n" /> sor <strong>egyszerre konvergens vagy egyszerre
            divergens</strong>!
          </p>
        </Def>

        <p>
          <em>Miért működik?</em> Mert ha <M t="\tfrac{a_n}{b_n} \to c > 0" />, akkor egy elég nagy <M t="N" />-től
          kezdve <M t="\tfrac{c}{2} < \tfrac{a_n}{b_n} < \tfrac{3c}{2}" />, vagyis{' '}
          <M t="\tfrac{c}{2}b_n < a_n < \tfrac{3c}{2}b_n" /> — tehát a két sor kölcsönösen majorálja és minorálja egymást!
        </p>

        <LimitComparisonWidget />

        <Quiz
          q={<>Melyik <M t="b_n" /> sorral érdemes limeszesen összehasonlítani a <M t="\sum_{n=1}^\infty \dfrac{4n + 3}{\sqrt{n^5 + 2n}}" /> sort, és mi az eredmény?</>}
          options={[
            { label: <><M t="b_n = \tfrac{1}{n}" /> <M t="\Rightarrow" /> divergens</> },
            { label: <><M t="b_n = \tfrac{1}{n^{3/2}}" /> <M t="\Rightarrow" /> konvergens</>, ok: true },
            { label: <><M t="b_n = \tfrac{1}{n^2}" /> <M t="\Rightarrow" /> konvergens</> },
            { label: <><M t="b_n = \tfrac{1}{\sqrt{n}}" /> <M t="\Rightarrow" /> divergens</> },
          ]}
          explain={
            <>
              A számláló főtagja <M t="4n" />, a nevezőé <M t="\sqrt{n^5} = n^{5/2}" />, hányadosuk arányos{' '}
              <M t="\dfrac{n}{n^{5/2}} = \dfrac{1}{n^{3/2}}" />-del! Mivel <M t="\lim \tfrac{a_n}{b_n} = 4 > 0" /> és{' '}
              <M t="p = \tfrac{3}{2} > 1" />, a sor <strong>konvergens</strong>!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={5} q={<>Döntsd el limeszes összehasonlítással: <M t="\sum_{n=2}^\infty \dfrac{1}{n^2 - 1}" />!</>}>
          <p>
            Válasszuk <M t="b_n = \dfrac{1}{n^2}" />-et: <M t="\lim_{n\to\infty}\dfrac{n^2}{n^2 - 1} = 1 > 0" />. Mivel{' '}
            <M t="\sum \tfrac{1}{n^2}" /> konvergens, ez is <strong>konvergens</strong>!
          </p>
        </Task>
        <Task n={6} q={<>Döntsd el: <M t="\sum_{n=1}^\infty \dfrac{2n^2 + 1}{3n^3 + 4n + 5}" />!</>}>
          <p>
            <M t="b_n = \dfrac{1}{n}" /> választással <M t="\lim \dfrac{a_n}{b_n} = \dfrac{2}{3} > 0" />. Mivel a
            harmonikus sor divergens, ez a sor is <strong>divergens</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A c = 0 és c = ∞ határesetek',
    body: (
      <>
        <Def title="Limeszes összehasonlító kritérium (11. tétel, 2–3. rész)">
          <p>Legyen <M t="a_n > 0" /> és <M t="b_n > 0" /> minden <M t="n \ge N" />-re:</p>
          <ul>
            <li><strong>2. rész:</strong> ha <M t="\lim_{n\to\infty}\dfrac{a_n}{b_n} = 0" /> és <M t="\sum b_n" /> <strong>konvergens</strong> <M t="\Longrightarrow" /> <M t="\sum a_n" /> <strong>konvergens</strong>!</li>
            <li><strong>3. rész:</strong> ha <M t="\lim_{n\to\infty}\dfrac{a_n}{b_n} = \infty" /> és <M t="\sum b_n" /> <strong>divergens</strong> <M t="\Longrightarrow" /> <M t="\sum a_n" /> <strong>divergens</strong>!</li>
          </ul>
        </Def>

        <LimitComparisonEdgeCasesWidget />

        <p>
          Ezek a határesetek különösen hasznosak olyankor, amikor <M t="\ln n" /> szerepel a számlálóban vagy a
          nevezőben! Például a <M t="\sum_{n=2}^\infty \dfrac{\ln n}{n^{3/2}}" /> sorról elég észrevenni, hogy{' '}
          <M t="b_n = \dfrac{1}{n^{5/4}}" /> konvergens (<M t="p = 1{,}25 > 1" />), és{' '}
          <M t="\dfrac{a_n}{b_n} = \dfrac{\ln n}{n^{1/4}} \to 0" />, tehát a sor <strong>konvergens</strong>!
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={7} q={<>Döntsd el a 2. résszel (<M t="c = 0" />): <M t="\sum_{n=2}^\infty \dfrac{\ln n}{n^2}" />!</>}>
          <p>
            Válasszuk <M t="b_n = \dfrac{1}{n^{3/2}}" /> (<M t="p = 1{,}5 > 1" />, konvergens). Ekkor{' '}
            <M t="\dfrac{a_n}{b_n} = \dfrac{\ln n}{\sqrt{n}} \to 0" /> (L’Hôpital), tehát <strong>konvergens</strong>!
          </p>
        </Task>
        <Task n={8} q={<>Döntsd el a 3. résszel (<M t="c = \infty" />): <M t="\sum_{n=2}^\infty \dfrac{1}{\ln n}" />!</>}>
          <p>
            Válasszuk <M t="b_n = \dfrac{1}{n}" /> (divergens). Ekkor{' '}
            <M t="\dfrac{a_n}{b_n} = \dfrac{n}{\ln n} \to +\infty" />, tehát <strong>divergens</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Hogyan válasszunk gyorsan jó bₙ referenciasort?',
    body: (
      <>
        <p>
          A limeszes összehasonlítás titka a <strong>főtag-szabály</strong>: nagy <M t="n" /> esetén dobd el a lassabban
          növekvő tagokat a számlálóból és a nevezőből is, és a megmaradó főtagok hányadosát válaszd <M t="b_n" />-nek!
        </p>

        <DominantTermPickerWidget />

        <Steps
          title="Limeszes összehasonlítás gyökös soron"
          problem={
            <>
              Döntsük el, konvergens-e a <M t="\sum_{n=1}^\infty \dfrac{2n^2 + 3n}{\sqrt{5 + n^5}}" /> sor!
            </>
          }
          steps={[
            {
              title: '1. Főtagok kiválasztása',
              body: (
                <>
                  A számláló főtagja <M t="2n^2" />, a nevezőé <M t="\sqrt{n^5} = n^{5/2}" />. Hányadosuk arányos{' '}
                  <M t="b_n = \dfrac{n^2}{n^{5/2}} = \dfrac{1}{\sqrt{n}}" />-nel!
                </>
              ),
            },
            {
              title: '2. Az aₙ / bₙ határérték kiszámítása',
              body: (
                <>
                  <M block t="\lim_{n\to\infty} \frac{a_n}{b_n} = \lim_{n\to\infty} \frac{(2n^2 + 3n)\sqrt{n}}{\sqrt{5 + n^5}} = \lim_{n\to\infty} \frac{2n^{5/2} + 3n^{3/2}}{n^{5/2}\sqrt{5/n^5 + 1}} = 2." />
                </>
              ),
            },
            {
              title: '3. Következtetés',
              body: (
                <>
                  Mivel <M t="c = 2 > 0" /> véges és pozitív, és <M t="\sum \dfrac{1}{\sqrt{n}}" /> divergens (
                  <M t="p = \tfrac{1}{2} \le 1" />), a vizsgált sor is <strong>divergens</strong>!
                </>
              ),
            },
          ]}
        />

        <Quiz
          q={<>Konvergens-e a <M t="\sum_{n=1}^\infty \dfrac{3^n + n^4}{4^n - 2^n}" /> sor?</>}
          options={[
            { label: <>Konvergens (főtagja <M t="(3/4)^n" />, mértani sor)</>, ok: true },
            { label: <>Divergens (az <M t="n^4" /> miatt)</> },
            { label: <>Divergens (mert <M t="4^n - 2^n" /> kivonás van alul)</> },
            { label: <>Nem dönthető el összehasonlítással</> },
          ]}
          explain={
            <>
              Az exponenciális legyőzi a polinomot (<M t="n^4 / 3^n \to 0" />), így <M t="b_n = (3/4)^n" /> mellett{' '}
              <M t="\lim \tfrac{a_n}{b_n} = 1 > 0" />. Mivel <M t="r = \tfrac{3}{4} < 1" />, a sor <strong>konvergens</strong>!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={9} q={<>Döntsd el: <M t="\sum_{n=1}^\infty \dfrac{1}{\sqrt[3]{n^4 + 2n + 1}}" />!</>}>
          <p>
            Főtag <M t="b_n = \dfrac{1}{n^{4/3}}" /> (<M t="p = \tfrac{4}{3} > 1" />, konvergens),{' '}
            <M t="\lim \tfrac{a_n}{b_n} = 1 > 0 \Longrightarrow" /> <strong>konvergens</strong>!
          </p>
        </Task>
        <Task n={10} q={<>Döntsd el: <M t="\sum_{n=1}^\infty \dfrac{2^n + 1}{2^n + n}" />!</>}>
          <p>
            Először mindig nézd az <M t="n" />-edik tag tesztet: <M t="\lim a_n = 1 \neq 0 \Longrightarrow" /> azonnal{' '}
            <strong>divergens</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Aszimptotikus ekvivalenciák trigonometrikus és exponenciális soroknál',
    body: (
      <>
        <p>
          Ha a sorban <M t="\sin(1/n)" />, <M t="\tan(1/n^2)" />, <M t="1 - \cos(1/n)" /> vagy <M t="e^{1/n} - 1" />{' '}
          szerepel, a limeszes összehasonlítás a nevezetes határértékekkel (<M t="\lim_{u\to 0}\tfrac{\sin u}{u} = 1" />,{' '}
          <M t="\lim_{u\to 0}\tfrac{1-\cos u}{u^2} = \tfrac{1}{2}" />) egyetlen sorban eldönti a konvergenciát!
        </p>

        <AsymptoticEquivalenceDiagram />

        <h3>Kidolgozott példa — A ∑ (1 − cos(1/n)) sor</h3>
        <p>
          Válasszuk <M t="b_n = \dfrac{1}{n^2}" />-et (konvergens <M t="p" />-sor). Az <M t="u = \tfrac{1}{n} \to 0^+" />{' '}
          jelöléssel:
        </p>
        <M block t="\lim_{n\to\infty}\frac{1 - \cos(1/n)}{1/n^2} = \lim_{u\to 0^+}\frac{1 - \cos u}{u^2} = \frac{1}{2} > 0!" />
        <p>
          Tehát a <M t="\sum_{n=1}^\infty \left(1 - \cos\dfrac{1}{n}\right)" /> sor <strong>konvergens</strong>!
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={11} q={<>Döntsd el: <M t="\sum_{n=1}^\infty \sin\left(\dfrac{1}{n}\right)" /> és <M t="\sum_{n=1}^\infty \sin\left(\dfrac{1}{n^2}\right)" />!</>}>
          <ul>
            <li><M t="\sin(1/n)" /> vs. <M t="1/n" />: <M t="\lim = 1 > 0 \Rightarrow" /> <strong>divergens</strong>!</li>
            <li><M t="\sin(1/n^2)" /> vs. <M t="1/n^2" />: <M t="\lim = 1 > 0 \Rightarrow" /> <strong>konvergens</strong>!</li>
          </ul>
        </Task>
        <Task n={12} q={<>Döntsd el: <M t="\sum_{n=1}^\infty \left(e^{1/n} - 1\right)" />!</>}>
          <p>
            <M t="b_n = \dfrac{1}{n}" /> választással <M t="\lim_{u\to 0^+}\dfrac{e^u - 1}{u} = 1 > 0" />. Mivel a
            harmonikus sor divergens, ez is <strong>divergens</strong>!
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
        <ComparisonDecisionTreeDiagram />

        <h3>Gyors összefoglaló táblázat</h3>
        <table className="tbl">
          <thead>
            <tr><th>Kritérium</th><th>Feltétel (<M t="a_n, b_n > 0" />)</th><th>Következtetés</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Majoráns (10a)</strong></td>
              <td><M t="a_n \le c_n" /> és <M t="\sum c_n" /> konv.</td>
              <td><M t="\sum a_n" /> <strong>konvergens</strong></td>
            </tr>
            <tr>
              <td><strong>Minoráns (10b)</strong></td>
              <td><M t="a_n \ge d_n" /> és <M t="\sum d_n" /> div.</td>
              <td><M t="\sum a_n" /> <strong>divergens</strong></td>
            </tr>
            <tr>
              <td><strong>Limeszes (11.1)</strong></td>
              <td><M t="\lim \tfrac{a_n}{b_n} = c \in (0;\,\infty)" /></td>
              <td>Egyszerre konv. vagy egyszerre div.</td>
            </tr>
            <tr>
              <td><strong>Limeszes (11.2–3)</strong></td>
              <td><M t="c = 0" /> (<M t="\sum b_n" /> konv.) / <M t="c = \infty" /> (<M t="\sum b_n" /> div.)</td>
              <td><M t="\sum a_n" /> konvergens / divergens</td>
            </tr>
          </tbody>
        </table>

        <h3>Négy tipikus hiba, amit érdemes elkerülni</h3>
        <Warn>
          <strong>1. Rossz irányú egyenlőtlenség:</strong> <M t="a_n \le \tfrac{1}{n}" /> (divergensnél kisebb) vagy{' '}
          <M t="a_n \ge \tfrac{1}{n^2}" /> (konvergensnél nagyobb) <em>semmit</em> nem bizonyít!
        </Warn>
        <Warn>
          <strong>2. Előjel-feltétel elfelejtése:</strong> mindkét összehasonlító kritérium csak{' '}
          <strong>nemnegatív / pozitív</strong> tagú sorokra érvényes! Váltakozó előjelű sorokra (pl.{' '}
          <M t="\sum \tfrac{(-1)^n}{n}" />) nem alkalmazható közvetlenül.
        </Warn>
        <Warn>
          <strong>3. A <M t="c = 0" /> eset téves használata divergens <M t="\sum b_n" />-nel:</strong> ha{' '}
          <M t="\lim \tfrac{a_n}{b_n} = 0" /> és <M t="\sum b_n" /> <em>divergens</em>, abból semmi nem következik (pl.{' '}
          <M t="\tfrac{1}{n^2}/\tfrac{1}{n} \to 0" />, mégis konvergens, míg <M t="\tfrac{1}{n\ln n}/\tfrac{1}{n} \to 0" />{' '}
          divergens!).
        </Warn>
        <Warn>
          <strong>4. A kezdőtagok miatti aggódás:</strong> elég, ha az egyenlőtlenség vagy a pozitivitás csak egy{' '}
          <M t="N" /> indextől kezdve teljesül (pl. <M t="n^2 - 10n > 0" /> csak <M t="n \ge 11" />-től — ez tökéletesen elég!).
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={13} q={<>Miért nem dönt semmit az, hogy <M t="\lim_{n\to\infty}\dfrac{1/(n\ln n)}{1/n} = 0" />?</>}>
          <p>
            Mert <M t="\sum \tfrac{1}{n}" /> <strong>divergens</strong>, és a <M t="c = 0" /> határeset csak{' '}
            <em>konvergens</em> <M t="\sum b_n" /> esetén ad választ!
          </p>
        </Task>
        <Task n={14} q={<>Konvergens-e a <M t="\sum_{n=1}^\infty \dfrac{1}{n^2 - 10n + 26}" /> sor?</>}>
          <p>
            <M t="n^2 - 10n + 26 = (n-5)^2 + 1 > 0" /> minden <M t="n" />-re, és <M t="b_n = \tfrac{1}{n^2}" />-tel
            limeszesen összehasonlítva <M t="\lim \tfrac{a_n}{b_n} = 1 > 0 \Longrightarrow" /> <strong>konvergens</strong>!
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

        <Task n={15} q={<>Döntsd el összehasonlítással: (a) <M t="\sum_{n=1}^\infty \dfrac{1}{3^n + 1}" />, (b) <M t="\sum_{n=2}^\infty \dfrac{1}{\sqrt{n} - 1}" />!</>}>
          <ul>
            <li>(a) <M t="\dfrac{1}{3^n + 1} < \dfrac{1}{3^n}" /> (konv. mértani) <M t="\Rightarrow" /> <strong>konvergens</strong>.</li>
            <li>(b) <M t="\dfrac{1}{\sqrt{n} - 1} > \dfrac{1}{\sqrt{n}}" /> (div. <M t="p" />-sor) <M t="\Rightarrow" /> <strong>divergens</strong>.</li>
          </ul>
        </Task>

        <Task n={16} q={<>Döntsd el limeszes összehasonlítással: <M t="\sum_{n=1}^\infty \dfrac{5n - 2}{n^3 + 4n + 1}" />!</>}>
          <p>
            <M t="b_n = \dfrac{1}{n^2}" /> (<M t="p = 2 > 1" />, konv.), <M t="\lim \dfrac{a_n}{b_n} = 5 > 0 \Rightarrow" />{' '}
            <strong>konvergens</strong>.
          </p>
        </Task>

        <Task n={17} q={<>Döntsd el: <M t="\sum_{n=1}^\infty \dfrac{2 + \sin n}{n^2}" />!</>}>
          <p>
            <M t="0 < \dfrac{2 + \sin n}{n^2} \le \dfrac{3}{n^2}" /> (konvergens majoráns) <M t="\Rightarrow" />{' '}
            <strong>konvergens</strong>!
          </p>
        </Task>

        <h3>Közepes</h3>

        <Task n={18} q={<>Döntsd el: <M t="\sum_{n=1}^\infty \dfrac{\sqrt{n + 1}}{n^2 - n + 3}" />!</>}>
          <p>
            Főtag: <M t="b_n = \dfrac{\sqrt{n}}{n^2} = \dfrac{1}{n^{3/2}}" /> (<M t="p = \tfrac{3}{2} > 1" />, konv.).{' '}
            <M t="\lim \dfrac{a_n}{b_n} = 1 > 0 \Longrightarrow" /> <strong>konvergens</strong>!
          </p>
        </Task>

        <Task n={19} q={<>Döntsd el: <M t="\sum_{n=1}^\infty \ln\left(1 + \dfrac{1}{n^2}\right)" />!</>}>
          <p>
            <M t="b_n = \dfrac{1}{n^2}" /> (konv.). Mivel <M t="\lim_{u\to 0^+}\dfrac{\ln(1+u)}{u} = 1 > 0" />, a
            limeszes összehasonlítás szerint <strong>konvergens</strong>!
          </p>
        </Task>

        <Task n={20} q={<>Döntsd el: <M t="\sum_{n=1}^\infty \dfrac{1}{\sqrt{n^2 + 1}}" />!</>}>
          <p>
            <M t="b_n = \dfrac{1}{n}" /> (divergens harmonikus). <M t="\lim_{n\to\infty}\dfrac{n}{\sqrt{n^2+1}} = 1 > 0 \Longrightarrow" />{' '}
            <strong>divergens</strong>!
          </p>
        </Task>

        <h3>Nehéz</h3>

        <Task
          n={21}
          q={
            <>
              Döntsd el: <M t="\sum_{n=1}^\infty \dfrac{1}{n^{1 + 1/n}}" />! (Vigyázz: a kitevő mindig <M t="> 1" />,
              mégis mi történik?)
            </>
          }
        >
          <p>
            Hasonlítsuk limeszesen a <M t="b_n = \dfrac{1}{n}" /> harmonikus sorhoz:
            <M block t="\frac{a_n}{b_n} = \frac{n}{n^{1 + 1/n}} = \frac{1}{n^{1/n}} \longrightarrow \frac{1}{1} = 1 > 0!" />
            Mivel <M t="\sum \tfrac{1}{n}" /> divergens, ez a sor is <strong>divergens</strong> — hiába nagyobb a
            kitevő minden <M t="n" />-re 1-nél!
          </p>
        </Task>

        <Task
          n={22}
          q={
            <>
              Igazold, hogy ha <M t="\sum a_n" /> (<M t="a_n > 0" />) konvergens, akkor <M t="\sum \ln(1 + a_n)" /> és{' '}
              <M t="\sum \dfrac{a_n}{1 + a_n}" /> is konvergens!
            </>
          }
        >
          <p>
            Mivel <M t="\sum a_n" /> konvergens, <M t="a_n \to 0^+" />. Így:
          </p>
          <ul>
            <li><M t="\lim \dfrac{\ln(1+a_n)}{a_n} = 1 > 0 \Longrightarrow \sum \ln(1+a_n)" /> konvergens!</li>
            <li><M t="\dfrac{a_n}{1+a_n} < a_n" /> (vagy <M t="\lim \dfrac{a_n/(1+a_n)}{a_n} = 1" />) <M t="\Longrightarrow \sum \dfrac{a_n}{1+a_n}" /> konvergens!</li>
          </ul>
        </Task>

        <Task
          n={23}
          q={
            <>
              Döntsd el a <M t="\sum_{n=2}^\infty \dfrac{1}{(\ln n)^{\ln n}}" /> sor konvergenciáját!
            </>
          }
        >
          <p>
            Írjuk át: <M t="(\ln n)^{\ln n} = e^{(\ln n)\ln(\ln n)} = n^{\ln(\ln n)}" />! Amint{' '}
            <M t="\ln(\ln n) \ge 2" /> (azaz <M t="n \ge e^{e^2} \approx 1619" />), teljesül, hogy{' '}
            <M t="\dfrac{1}{(\ln n)^{\ln n}} \le \dfrac{1}{n^2}" />. Mivel <M t="\sum \tfrac{1}{n^2}" /> konvergens, a
            majoránskritérium szerint a sor <strong>konvergens</strong>!
          </p>
        </Task>
      </>
    ),
  },
];
