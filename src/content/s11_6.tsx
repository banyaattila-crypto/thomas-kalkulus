import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  AbsoluteConvergenceWidget,
  AllSeriesTestsMasterDiagram,
  AlternatingPSeriesWidget,
  AlternatingZigZagWidget,
  ExtendedRatioRootDiagram,
  LeibnizErrorBoundWidget,
  MonotoneConditionCounterexampleWidget,
  RiemannRearrangementWidget,
} from '../components/Widgets116';
import type { Page } from './s1_1';

export const S11_6: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Alternáló sorok és a Leibniz-tétel (14. tétel)',
    body: (
      <>
        <Story>
          <p>
            Eddig csak nemnegatív tagú sorokat vizsgáltunk (11.3–11.5). Mi történik, ha a tagok <strong>előjele
            váltakozik</strong> (<M t="+, -, +, -, \ldots" />)? A részleges kioltás csodákra képes: még a divergens
            harmonikus sorból is konvergens sor lesz (<M t="1 - \tfrac{1}{2} + \tfrac{1}{3} - \tfrac{1}{4} + \cdots = \ln 2" />)!
          </p>
        </Story>

        <Def title="Leibniz-tétel alternáló sorokra (14. tétel)">
          <p>
            Az <M t="\sum_{n=1}^\infty (-1)^{n+1} u_n = u_1 - u_2 + u_3 - u_4 + \cdots" /> alternáló sor{' '}
            <strong>konvergens</strong>, ha teljesül mindhárom feltétel:
          </p>
          <ol>
            <li><M t="u_n > 0" /> minden <M t="n" />-re;</li>
            <li><M t="u_n \ge u_{n+1}" /> (monoton csökkenő valamely <M t="N" /> indextől kezdve);</li>
            <li><M t="\lim_{n\to\infty} u_n = 0" />.</li>
          </ol>
        </Def>

        <AlternatingZigZagWidget />

        <Quiz
          q={<>Melyik alternáló sor <strong>divergens</strong>?</>}
          options={[
            { label: <M t="\sum_{n=1}^\infty \dfrac{(-1)^n}{\sqrt{n}}" /> },
            { label: <M t="\sum_{n=2}^\infty \dfrac{(-1)^n}{\ln n}" /> },
            { label: <M t="\sum_{n=1}^\infty (-1)^n \dfrac{n}{2n + 1}" />, ok: true },
            { label: <M t="\sum_{n=1}^\infty \dfrac{(-1)^n}{n^2 + 1}" /> },
          ]}
          explain={
            <>
              A harmadik sorban <M t="u_n = \dfrac{n}{2n+1} \longrightarrow \dfrac{1}{2} \neq 0" />, tehát már az{' '}
              <M t="n" />-edik tag teszt alapján <strong>divergens</strong>! A másik három teljesíti a Leibniz-tételt.
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={1} q={<>Igazold a Leibniz-tétellel, hogy a <M t="\sum_{n=1}^\infty \dfrac{(-1)^{n+1}}{2n - 1} = 1 - \dfrac{1}{3} + \dfrac{1}{5} - \cdots" /> (Leibniz-féle <M t="\pi/4" /> sor) konvergens!</>}>
          <p>
            <M t="u_n = \dfrac{1}{2n-1} > 0" />, szigorúan csökken (<M t="2n-1 < 2n+1" />), és <M t="u_n \to 0" />.
            Mindhárom feltétel teljesül <M t="\Longrightarrow" /> <strong>konvergens</strong>!
          </p>
        </Task>
        <Task n={2} q={<>Igazold, hogy <M t="\sum_{n=1}^\infty \dfrac{(-1)^n n}{n^2 + 4}" /> konvergens!</>}>
          <p>
            <M t="f(x) = \dfrac{x}{x^2+4}" /> deriváltja <M t="f'(x) = \dfrac{4 - x^2}{(x^2+4)^2} \le 0" /> minden{' '}
            <M t="x \ge 2" />-re (tehát <M t="N = 2" />-től csökkenő!), <M t="u_n > 0" /> és <M t="u_n \to 0" />{' '}
            <M t="\Longrightarrow" /> <strong>konvergens</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'A Leibniz-féle hibabecslés (15. tétel)',
    body: (
      <>
        <p>
          A Leibniz-sorok egyik legnagyobb ajándéka, hogy a csonkítási hiba becsléséhez még integrálni sem kell: az{' '}
          <M t="S" /> összeg mindig az egymást követő részletösszegek között van!
        </p>

        <Def title="Alternáló sor hibabecslése (15. tétel)">
          <p>
            Ha a <M t="\sum_{n=1}^\infty (-1)^{n+1} u_n" /> sor kielégíti a Leibniz-tétel feltételeit, akkor az{' '}
            <M t="s_n" /> részletösszeg hibája (<M t="R_n = S - s_n" />) abszolút értékben <strong>nem haladja meg
            az első elhagyott tagot</strong>, és előjele megegyezik vele:
          </p>
          <M block t="|S - s_n| \le u_{n+1}." />
        </Def>

        <LeibnizErrorBoundWidget />

        <h3>Kidolgozott példa — 1/e kiszámítása 0,001 pontossággal</h3>
        <p>
          A <M t="\dfrac{1}{e} = \sum_{n=0}^\infty \dfrac{(-1)^n}{n!} = 1 - 1 + \dfrac{1}{2!} - \dfrac{1}{3!} + \cdots" />{' '}
          Leibniz-sornál keressük az első olyan <M t="n" />-et, amelyre <M t="u_{n+1} = \dfrac{1}{(n+1)!} < 0{,}001" />!
          Mivel <M t="6! = 720" /> és <M t="7! = 5040 > 1000" />, elég <M t="n = 6" />:
        </p>
        <M block t="s_6 = \frac{1}{2} - \frac{1}{6} + \frac{1}{24} - \frac{1}{120} + \frac{1}{720} = \frac{265}{720} \approx 0{,}36806 \qquad \left(\text{valódi } 1/e \approx 0{,}36788\right)!" />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={3} q={<>Legalább hány tag kell a <M t="\sum_{n=1}^\infty \dfrac{(-1)^{n+1}}{n^2}" /> sorból, hogy a hiba <M t="0{,}01" /> alatt maradjon?</>}>
          <p>
            <M t="u_{n+1} = \dfrac{1}{(n+1)^2} < 0{,}01 \Longleftrightarrow (n+1)^2 > 100 \Longleftrightarrow n + 1 \ge 11 \Longleftrightarrow n \ge 10" />.
          </p>
        </Task>
        <Task n={4} q={<>A <M t="\ln 2 = 1 - \tfrac{1}{2} + \tfrac{1}{3} - \tfrac{1}{4} + \cdots" /> sornál <M t="s_5" /> felülről vagy alulról közelíti <M t="\ln 2" />-t?</>}>
          <p>
            Az első elhagyott tag <M t="-\tfrac{1}{6} < 0" />, így <M t="S - s_5 < 0 \Rightarrow S < s_5" />: vagyis{' '}
            <M t="s_5" /> <strong>felülről</strong> közelíti <M t="\ln 2" />-t!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Abszolút és feltételes konvergencia',
    body: (
      <>
        <p>
          Az alternáló harmonikus sor (<M t="\sum \tfrac{(-1)^{n+1}}{n}" />) konvergens, de ha eltüntetjük a
          mínuszjeleket (<M t="\sum \tfrac{1}{n}" />), divergens lesz! Ezzel szemben a{' '}
          <M t="\sum \tfrac{(-1)^{n+1}}{n^2}" /> sor a mínuszjelek nélkül is konvergens. Ez a különbség alapvető:
        </p>

        <Def title="Abszolút és feltételes konvergencia">
          <ul>
            <li>
              A <M t="\sum a_n" /> sor <strong>abszolút konvergens</strong>, ha az abszolút értékekből képzett{' '}
              <M t="\sum |a_n|" /> sor konvergens.
            </li>
            <li>
              A <M t="\sum a_n" /> sor <strong>feltételesen konvergens</strong>, ha <M t="\sum a_n" /> konvergens, de{' '}
              <M t="\sum |a_n|" /> <em>divergens</em>!
            </li>
          </ul>
        </Def>

        <AlternatingPSeriesWidget />

        <Quiz
          q={<>Hogyan osztályozandó a <M t="\sum_{n=1}^\infty \dfrac{(-1)^n}{\sqrt{n}}" /> sor?</>}
          options={[
            { label: 'Abszolút konvergens' },
            { label: 'Feltételesen konvergens', ok: true },
            { label: 'Divergens' },
            { label: 'Mértani sor' },
          ]}
          explain={
            <>
              Önmagában a Leibniz-tétel miatt konvergens (<M t="1/\sqrt{n} \downarrow 0" />), de abszolút értékben{' '}
              <M t="\sum \tfrac{1}{\sqrt{n}}" /> divergens (<M t="p = \tfrac{1}{2} \le 1" />), tehát{' '}
              <strong>feltételesen konvergens</strong>!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={5} q={<>Abszolút konvergens, feltételesen konvergens vagy divergens: (a) <M t="\sum \dfrac{(-1)^n}{n^{3/2}}" />, (b) <M t="\sum \dfrac{(-1)^n}{3n + 1}" />?</>}>
          <ul>
            <li>(a) <M t="\sum \tfrac{1}{n^{3/2}}" /> konv. (<M t="p = 1{,}5 > 1" />) <M t="\Rightarrow" /> <strong>abszolút konvergens</strong>.</li>
            <li>(b) Leibniz szerint konv., de <M t="\sum \tfrac{1}{3n+1}" /> div. <M t="\Rightarrow" /> <strong>feltételesen konvergens</strong>.</li>
          </ul>
        </Task>
        <Task n={6} q={<>Lehet-e egy csupa pozitív tagú sor feltételesen konvergens?</>}>
          <p>
            <strong>Nem!</strong> Pozitív tagoknál <M t="|a_n| = a_n" />, így a sor vagy abszolút konvergens, vagy
            divergens.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Az abszolút konvergencia tétele (16. tétel)',
    body: (
      <>
        <Def title="Abszolút konvergencia tétele (16. tétel)">
          <p>
            Ha <M t="\sum |a_n|" /> konvergens, akkor <M t="\sum a_n" /> is <strong>konvergens</strong> (minden
            abszolút konvergens sor konvergens!).
          </p>
        </Def>

        <p>
          <em>Elegáns 2 soros bizonyítás:</em> minden <M t="n" />-re <M t="0 \le a_n + |a_n| \le 2|a_n|" />. A
          majoránskritérium miatt <M t="\sum (a_n + |a_n|)" /> konvergens, így két konvergens sor különbségeként{' '}
          <M t="\sum a_n = \sum (a_n + |a_n|) - \sum |a_n|" /> is konvergens!
        </p>

        <AbsoluteConvergenceWidget />

        <Steps
          title="Teljes osztályozás: abszolút konvergens, feltételes vagy divergens?"
          problem={
            <>
              Osztályozzuk a <M t="\sum_{n=1}^\infty (-1)^n \dfrac{n}{n^2 + 1}" /> sort!
            </>
          }
          steps={[
            {
              title: '1. Először vizsgáljuk ∑ |aₙ|-t (abszolút konvergencia)',
              body: (
                <>
                  <M t="|a_n| = \dfrac{n}{n^2 + 1}" />. Limeszesen összehasonlítva <M t="b_n = \dfrac{1}{n}" />-nel:{' '}
                  <M t="\lim \dfrac{n^2}{n^2+1} = 1 > 0" />, tehát <M t="\sum |a_n|" /> <strong>divergens</strong> (nem
                  abszolút konvergens!).
                </>
              ),
            },
            {
              title: '2. Ezután vizsgáljuk magát ∑ aₙ-t (Leibniz-tétel)',
              body: (
                <>
                  <M t="u_n = \dfrac{n}{n^2+1} > 0" />, <M t="\lim u_n = 0" />, és{' '}
                  <M t="f'(x) = \dfrac{1 - x^2}{(x^2+1)^2} \le 0" /> minden <M t="x \ge 1" />-re (csökkenő!).
                  Tehát a Leibniz-tétel szerint <M t="\sum a_n" /> <strong>konvergens</strong>!
                </>
              ),
            },
            {
              title: '3. Végső ítélet',
              body: (
                <>
                  Mivel <M t="\sum a_n" /> konvergens, de <M t="\sum |a_n|" /> divergens, a sor{' '}
                  <strong>feltételesen konvergens</strong>!
                </>
              ),
            },
          ]}
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={7} q={<>Igazold a 16. tétellel, hogy <M t="\sum_{n=1}^\infty \dfrac{\cos(n^2)}{n\sqrt{n}}" /> konvergens!</>}>
          <p>
            <M t="\left|\dfrac{\cos(n^2)}{n^{3/2}}\right| \le \dfrac{1}{n^{3/2}}" />, és <M t="\sum \tfrac{1}{n^{3/2}}" />{' '}
            konvergens <M t="\Longrightarrow" /> <strong>abszolút konvergens</strong>, tehát konvergens!
          </p>
        </Task>
        <Task n={8} q={<>Osztályozd: <M t="\sum_{n=2}^\infty \dfrac{(-1)^n}{n\ln n}" />!</>}>
          <p>
            <M t="\sum \tfrac{1}{n\ln n}" /> divergens (11.3, integrálkritérium), de <M t="\tfrac{1}{n\ln n} \downarrow 0" />,
            így Leibniz szerint konvergens <M t="\Longrightarrow" /> <strong>feltételesen konvergens</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Átrendezési tétel (17. tétel) és a Riemann-paradoxon',
    body: (
      <>
        <p>
          Véges összegeknél az összeadás kommutatív: <M t="a + b = b + a" />. Végtelen soroknál azonban elképesztő dolog
          történik — a tagok sorrendjének felcserélése <em>megváltoztathatja az összeget</em>, ha a sor csak feltételesen
          konvergens!
        </p>

        <Def title="Átrendezési tétel (17. tétel) és Riemann tétele">
          <ul>
            <li>
              <strong>Abszolút konvergens sor:</strong> bármilyen sorrendbe rendezzük is át a tagjait, az átrendezett
              sor mindig konvergens marad, és <strong>pontosan ugyanaz az összege</strong>!
            </li>
            <li>
              <strong>Feltételesen konvergens sor (Riemann):</strong> tetszőleges előre megadott <M t="C \in \mathbb{R}" />{' '}
              számhoz (sőt <M t="\pm\infty" />-hez is!) létezik olyan átrendezése a tagoknak, amelynek összege pontosan{' '}
              <M t="C" />!
            </li>
          </ul>
        </Def>

        <RiemannRearrangementWidget />

        <Quiz
          q={<>Ha a <M t="\sum_{n=1}^\infty \dfrac{(-1)^{n+1}}{n^2}" /> sor tagjait tetszőlegesen átrendezzük, megváltozhat-e az összege?</>}
          options={[
            { label: 'Igen, mert váltakozó előjelű.' },
            { label: 'Nem, mert abszolút konvergens (17. tétel)!', ok: true },
            { label: 'Csak ha páros tagokat teszünk előre.' },
            { label: 'Divergens lesz.' },
          ]}
          explain={
            <>
              Mivel <M t="\sum \tfrac{1}{n^2} < \infty" />, a sor <strong>abszolút konvergens</strong>, így minden
              átrendezése ugyanarra az összegre (<M t="\tfrac{\pi^2}{12}" />) konvergál!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={9} q={<>Miért lehetséges, hogy az alternáló harmonikus sorból tetszőleges <M t="C" /> számot össze tudunk rakni átrendezéssel?</>}>
          <p>
            Mert a pozitív tagok összege (<M t="1 + \tfrac{1}{3} + \tfrac{1}{5} + \cdots = +\infty" />) és a negatív
            tagok összege (<M t="-\tfrac{1}{2} - \tfrac{1}{4} - \cdots = -\infty" />) <em>külön-külön is végtelen</em>!
            Így mindig addig adogatunk pozitívakat, amíg át nem lépjük <M t="C" />-t, majd negatívakat, amíg alá nem
            esünk — és mivel a tagok 0-hoz tartanak, a részletösszeg <M t="C" />-hez tart!
          </p>
        </Task>
        <Task n={10} q={<>Miért ad pontosan <M t="\tfrac{1}{2}\ln 2" />-t az <M t="(1 - \tfrac{1}{2} - \tfrac{1}{4}) + (\tfrac{1}{3} - \tfrac{1}{6} - \tfrac{1}{8}) + \cdots" /> átrendezés?</>}>
          <p>
            Minden hármasban vonjuk össze az első kettőt: <M t="\left(\tfrac{1}{2k-1} - \tfrac{1}{2(2k-1)}\right) - \tfrac{1}{4k} = \dfrac{1}{2}\left(\dfrac{1}{2k-1} - \dfrac{1}{2k}\right)" />,
            ami pontosan az eredeti sor <strong>fele</strong> (<M t="\tfrac{1}{2}\ln 2" />)!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'A csökkenés szerepe és az abszolút hányados-/gyökkritérium',
    body: (
      <>
        <p>
          A Leibniz-tétel 2. feltétele (<M t="u_n \ge u_{n+1}" />) nem puszta formalitás — ha a tagok nem csökkennek
          monoton, egy alternáló, <M t="0" />-hoz tartó sor is lehet divergens!
        </p>

        <MonotoneConditionCounterexampleWidget />

        <p>
          A 16. tétel (abszolút konvergencia) segítségével a 11.5-ben tanult hányados- és gyökkritériumot már{' '}
          <strong>tetszőleges előjelű</strong> sorokra is alkalmazhatjuk — ez lesz a 11.7-es hatványsorok fő motorja!
        </p>

        <ExtendedRatioRootDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={11} q={<>Vizsgáld az abszolút hányadoskritériummal: <M t="\sum_{n=1}^\infty \dfrac{(-3)^n}{n!}" />!</>}>
          <p>
            <M t="\lim \left|\dfrac{a_{n+1}}{a_n}\right| = \lim \dfrac{3}{n+1} = 0 < 1 \Longrightarrow" />{' '}
            <strong>abszolút konvergens</strong> (értéke <M t="e^{-3} - 1" />)!
          </p>
        </Task>
        <Task n={12} q={<>Vizsgáld az abszolút gyökkritériummal: <M t="\sum_{n=1}^\infty \left(-\dfrac{2n}{3n + 1}\right)^n" />!</>}>
          <p>
            <M t="\lim \sqrt[n]{|a_n|} = \lim \dfrac{2n}{3n+1} = \dfrac{2}{3} < 1 \Longrightarrow" />{' '}
            <strong>abszolút konvergens</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Nagy konvergencia-összefoglaló (11.2–11.6) és tipikus hibák',
    body: (
      <>
        <AllSeriesTestsMasterDiagram />

        <h3>Négy tipikus hiba az alternáló soroknál</h3>
        <Warn>
          <strong>1. A Leibniz-tétel használata divergencia bizonyítására:</strong> ha <M t="u_n" /> <em>nem</em>{' '}
          csökken, attól a sor még lehet konvergens — a Leibniz-tétel csak <em>konvergenciát</em> igazol! (Divergenciát
          az <M t="n" />-edik tag teszt ad, ha <M t="u_n \not\to 0" />.)
        </Warn>
        <Warn>
          <strong>2. „Feltételesen divergens” nem létezik!</strong> Csak 3 kategória van: <strong>abszolút
          konvergens</strong>, <strong>feltételesen konvergens</strong> és <strong>divergens</strong>.
        </Warn>
        <Warn>
          <strong>3. Elfelejtett abszolútérték a hányadoskritériumban:</strong> a <M t="\sum \tfrac{(-2)^n}{n}" />{' '}
          sornál <M t="\tfrac{a_{n+1}}{a_n} \to -2" />, ami kisebb 1-nél, mégis <em>divergens</em>! Mindig{' '}
          <M t="\left|\dfrac{a_{n+1}}{a_n}\right| \to 2 > 1" />-et kell nézni!
        </Warn>
        <Warn>
          <strong>4. Leibniz-hibabecslés nem csökkenő vagy nem alternáló sorra:</strong> az <M t="|R_n| \le u_{n+1}" />{' '}
          korlát kizárólag a Leibniz-tétel mindhárom feltételét teljesítő alternáló sorokra érvényes!
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={13} q={<>Mi a hiba: „a <M t="\sum (-2)^n" /> sorra <M t="\tfrac{a_{n+1}}{a_n} = -2 < 1" />, tehát konvergens”?</>}>
          <p>
            Az abszolútérték hiányzik! A kiterjesztett hányadoskritérium <M t="\lim |a_{n+1}/a_n| = |-2| = 2 > 1" />-et
            ad, tehát a sor <strong>divergens</strong>!
          </p>
        </Task>
        <Task n={14} q={<>Ha <M t="\sum |a_n|" /> divergens, következik-e belőle, hogy <M t="\sum a_n" /> is divergens?</>}>
          <p>
            <strong>Nem!</strong> Lehet feltételesen konvergens is (pl. <M t="\sum \tfrac{(-1)^{n+1}}{n}" />)!
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

        <Task n={15} q={<>Osztályozd (abszolút konvergens, feltételesen konvergens vagy divergens): (a) <M t="\sum \dfrac{(-1)^n}{n^3}" />, (b) <M t="\sum \dfrac{(-1)^n}{n + 5}" />, (c) <M t="\sum (-1)^n \dfrac{3n}{n + 2}" />!</>}>
          <ul>
            <li>(a) <strong>Abszolút konvergens</strong> (<M t="p = 3 > 1" />).</li>
            <li>(b) <strong>Feltételesen konvergens</strong> (Leibniz: konv., de <M t="\sum \tfrac{1}{n+5}" /> div.).</li>
            <li>(c) <strong>Divergens</strong> (<M t="u_n \to 3 \neq 0" />).</li>
          </ul>
        </Task>

        <Task n={16} q={<>Osztályozd: <M t="\sum_{n=1}^\infty \dfrac{(-2)^n}{3^n}" />!</>}>
          <p>
            Mértani sor <M t="|r| = \tfrac{2}{3} < 1" /> <M t="\Longrightarrow" /> <strong>abszolút konvergens</strong>{' '}
            (összege <M t="-\tfrac{2}{5}" />).
          </p>
        </Task>

        <Task n={17} q={<>Becsüld meg a <M t="\sum_{n=1}^\infty \dfrac{(-1)^{n+1}}{n^4}" /> sor 3. részletösszegének (<M t="s_3" />) maximális hibáját!</>}>
          <p>
            <M t="|R_3| \le u_4 = \dfrac{1}{4^4} = \dfrac{1}{256} \approx 0{,}0039" />.
          </p>
        </Task>

        <h3>Közepes</h3>

        <Task n={18} q={<>Osztályozd: <M t="\sum_{n=1}^\infty (-1)^n \dfrac{\sqrt{n}}{n + 3}" />!</>}>
          <p>
            Abszolút értékben <M t="b_n = \dfrac{1}{\sqrt{n}}" /> (<M t="\lim \tfrac{|a_n|}{b_n} = 1" />, div.).
            Viszont <M t="f(x) = \dfrac{\sqrt{x}}{x+3}" /> deriváltja <M t="\dfrac{3 - x}{2\sqrt{x}(x+3)^2} \le 0" />{' '}
            minden <M t="x \ge 3" />-ra (csökkenő!), és <M t="u_n \to 0" />. Tehát <strong>feltételesen konvergens</strong>!
          </p>
        </Task>

        <Task n={19} q={<>Osztályozd: <M t="\sum_{n=1}^\infty \dfrac{(-1)^n n^2}{2^n}" />!</>}>
          <p>
            Abszolút hányadoskritériummal: <M t="\lim \dfrac{(n+1)^2 / 2^{n+1}}{n^2 / 2^n} = \dfrac{1}{2} < 1 \Longrightarrow" />{' '}
            <strong>abszolút konvergens</strong>!
          </p>
        </Task>

        <Task n={20} q={<>Legalább hány tag kell a <M t="\sum_{n=0}^\infty \dfrac{(-1)^n}{(2n + 1)!}" /> (<M t="= \sin 1" />) sorból, hogy a hiba <M t="10^{-5}" /> alatt legyen?</>}>
          <p>
            <M t="u_{n+1} = \dfrac{1}{(2n+3)!} < 10^{-5} \Longleftrightarrow (2n+3)! > 100\,000" />. Mivel{' '}
            <M t="7! = 5040" /> és <M t="9! = 362\,880 > 100\,000" />, <M t="2n + 3 = 9 \Rightarrow n = 3" />!
            (Mindössze 4 tag: <M t="n = 0, 1, 2, 3" /> elég 5 tizedesjegy pontossághoz!)
          </p>
        </Task>

        <h3>Nehéz</h3>

        <Task
          n={21}
          q={
            <>
              Osztályozd: <M t="\sum_{n=2}^\infty \dfrac{(-1)^n \ln n}{n}" />!
            </>
          }
        >
          <p>
            Abszolút értékben <M t="\dfrac{\ln n}{n} \ge \dfrac{\ln 2}{n}" /> <M t="\Rightarrow \sum |a_n|" /> divergens.
            Viszont <M t="f(x) = \dfrac{\ln x}{x}" /> csökkenő <M t="x \ge 3 > e" />-re (<M t="f'(x) = \tfrac{1-\ln x}{x^2} < 0" />),
            és <M t="\lim \tfrac{\ln n}{n} = 0" />. Leibniz szerint tehát <strong>feltételesen konvergens</strong>!
          </p>
        </Task>

        <Task
          n={22}
          q={
            <>
              Igazold, hogy a <M t="\sum_{n=1}^\infty (-1)^n \left(\sqrt{n+1} - \sqrt{n}\right)" /> sor feltételesen
              konvergens!
            </>
          }
        >
          <p>
            Bővítsük konjugálttal: <M t="u_n = \sqrt{n+1} - \sqrt{n} = \dfrac{1}{\sqrt{n+1} + \sqrt{n}}" />!
            Innen azonnal látszik, hogy <M t="u_n > 0" />, szigorúan csökken és <M t="u_n \to 0" />, tehát Leibniz
            szerint konvergens! Viszont <M t="u_n \sim \dfrac{1}{2\sqrt{n}}" /> (<M t="p = \tfrac{1}{2} \le 1" />), így{' '}
            <M t="\sum u_n" /> divergens <M t="\Longrightarrow" /> <strong>feltételesen konvergens</strong>!
          </p>
        </Task>

        <Task
          n={23}
          q={
            <>
              Milyen <M t="x \in \mathbb{R}" /> értékekre abszolút konvergens, illetve feltételesen konvergens a{' '}
              <M t="\sum_{n=1}^\infty \dfrac{x^n}{n}" /> sor?
            </>
          }
        >
          <p>
            Abszolút hányadoskritérium: <M t="\rho = |x|" />. Így <M t="|x| < 1" /> esetén <strong>abszolút konvergens</strong>,{' '}
            <M t="|x| > 1" /> esetén <strong>divergens</strong>. A két végpont:
          </p>
          <ul>
            <li><M t="x = 1" />: <M t="\sum \tfrac{1}{n}" /> <strong>divergens</strong>.</li>
            <li><M t="x = -1" />: <M t="\sum \tfrac{(-1)^n}{n}" /> <strong>feltételesen konvergens</strong>!</li>
          </ul>
          <p>
            Konvergenciatartomány: <M t="[-1;\,1)" /> — ez már közvetlenül megnyitja a 11.7-es <strong>hatványsorok</strong>{' '}
            világát!
          </p>
        </Task>
      </>
    ),
  },
];
