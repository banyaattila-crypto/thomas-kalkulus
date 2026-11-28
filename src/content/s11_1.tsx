import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  EpsilonNWidget,
  FamousLimitsWidget,
  GrowthHierarchyWidget,
  MonotoneBoundedWidget,
  RecursiveSequenceWidget,
  SequencePlotterWidget,
  SequenceToolsSummaryDiagram,
  SqueezeSequenceWidget,
} from '../components/Widgets111';
import type { Page } from './s1_1';

export const S11_1: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Üdv a 11. fejezetben! Mi a számsorozat?',
    body: (
      <>
        <Story>
          <p>
            Elérkeztünk a kalkulus egyik legizgalmasabb világához: a <strong>végtelen sorozatok és sorok</strong>{' '}
            elméletéhez! Itt választ kapunk arra, hogyan adhatunk össze végtelen sok számot, miért véges az{' '}
            <M t="\tfrac{1}{2}+\tfrac{1}{4}+\tfrac{1}{8}+\cdots = 1" /> összeg, és hogyan közelítik a számítógépek a{' '}
            <M t="\sin x" /> vagy <M t="e^x" /> függvényt hatványsorokkal. Mindennek az alapköve a{' '}
            <strong>számsorozat</strong>.
          </p>
        </Story>

        <Def title="Számsorozat (végtelen sorozat)">
          <p>
            A <strong>számsorozat</strong> a pozitív egész számok halmazán (vagy valamely <M t="n_0" /> kezdőindextől
            felfelé) értelmezett valós értékű függvény. Jelölése:
          </p>
          <M block t="\{a_n\}_{n=1}^\infty = (a_1,\,a_2,\,a_3,\,\ldots,\,a_n,\,\ldots)." />
          <p>
            Az <M t="a_n" /> szám a sorozat <strong><M t="n" />-edik (általános) tagja</strong>, <M t="n" /> pedig az{' '}
            <strong>index</strong>. A sorrend számít: az <M t="(1, 2, 3, \ldots)" /> és a <M t="(2, 1, 3, \ldots)" />{' '}
            két különböző sorozat!
          </p>
        </Def>

        <SequencePlotterWidget />

        <Quiz
          q={<>Melyik általános tag adja a <M t="\tfrac{1}{2},\,-\tfrac{2}{3},\,\tfrac{3}{4},\,-\tfrac{4}{5},\,\ldots" /> (<M t="n = 1, 2, 3, \ldots" />) sorozatot?</>}
          options={[
            { label: <M t="a_n = (-1)^n \dfrac{n}{n+1}" /> },
            { label: <M t="a_n = (-1)^{n+1} \dfrac{n}{n+1}" />, ok: true },
            { label: <M t="a_n = (-1)^{n+1} \dfrac{n-1}{n}" /> },
            { label: <M t="a_n = -\dfrac{n}{n+1}" /> },
          ]}
          explain={
            <>
              Az <M t="n=1" /> tag pozitív (<M t="(-1)^{1+1} = +1" />), számlálója <M t="n" />, nevezője{' '}
              <M t="n+1" />, tehát <M t="a_n = (-1)^{n+1}\dfrac{n}{n+1}" />.
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={1} q={<>Írd fel az első 5 tagját az <M t="a_n = \dfrac{2^n}{n!}" /> (<M t="n \ge 1" />) sorozatnak!</>}>
          <p>
            <M t="a_1 = 2" />, <M t="a_2 = \tfrac{4}{2} = 2" />, <M t="a_3 = \tfrac{8}{6} = \tfrac{4}{3}" />,{' '}
            <M t="a_4 = \tfrac{16}{24} = \tfrac{2}{3}" />, <M t="a_5 = \tfrac{32}{120} = \tfrac{4}{15}" />.
          </p>
        </Task>
        <Task n={2} q={<>Add meg az <M t="1,\,3,\,5,\,7,\,9,\,\ldots" /> és a <M t="1,\,-1,\,1,\,-1,\,\ldots" /> (<M t="n \ge 1" />) sorozat általános tagját!</>}>
          <p>
            Az első <M t="a_n = 2n - 1" />, a második <M t="b_n = (-1)^{n+1}" /> (vagy <M t="(-1)^{n-1}" />).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Konvergencia, ε–N definíció és határérték-szabályok',
    body: (
      <>
        <Def title="Sorozat határértéke (ε–N definíció)">
          <p>
            Az <M t="\{a_n\}" /> sorozat <strong>konvergens</strong>, és határértéke a véges <M t="L" /> szám (
            <M t="\lim_{n\to\infty} a_n = L" />), ha minden <M t="\varepsilon > 0" /> számhoz létezik olyan{' '}
            <M t="N" /> küszöbindex, amelyre:
          </p>
          <M block t="n \ge N \ \Longrightarrow\ |a_n - L| < \varepsilon." />
          <p>
            Ha nem létezik ilyen véges <M t="L" />, a sorozat <strong>divergens</strong> (akár mert{' '}
            <M t="\pm\infty" />-be tart, akár mert oszcillál, mint a <M t="(-1)^n" />).
          </p>
        </Def>

        <EpsilonNWidget />

        <Def title="Határérték-szabályok sorozatokra">
          <p>Ha <M t="\lim_{n\to\infty} a_n = A" /> és <M t="\lim_{n\to\infty} b_n = B" /> (végesek), akkor:</p>
          <ul>
            <li><M t="\lim (a_n \pm b_n) = A \pm B" />, <M t="\lim (k \cdot a_n) = k A" />;</li>
            <li><M t="\lim (a_n b_n) = AB" />, és ha <M t="B \neq 0" />, akkor <M t="\lim \dfrac{a_n}{b_n} = \dfrac{A}{B}" />.</li>
          </ul>
        </Def>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={3} q={<>Számítsd ki: <M t="\lim_{n\to\infty} \dfrac{4n^2 - 3n + 1}{2n^2 + 5}" />!</>}>
          <p>
            A számlálót és nevezőt <M t="n^2" />-tel osztva:{' '}
            <M t="\lim_{n\to\infty}\dfrac{4 - 3/n + 1/n^2}{2 + 5/n^2} = \dfrac{4}{2} = 2" />.
          </p>
        </Task>
        <Task n={4} q={<>Az <M t="a_n = \dfrac{1}{n}" /> sorozatnál mekkora <M t="N" /> küszöbindex kell ahhoz, hogy <M t="n \ge N" /> esetén <M t="|a_n - 0| < 0{,}001" /> legyen?</>}>
          <p>
            <M t="\dfrac{1}{n} < \dfrac{1}{1000} \Longleftrightarrow n > 1000" />, tehát <M t="N = 1001" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Szendvicstétel, folytonos függvények és L’Hôpital-szabály',
    body: (
      <>
        <p>
          Sok sorozatnál az alapvető algebrai szabályok nem elegendők (pl. <M t="\tfrac{\cos n}{n}" />,{' '}
          <M t="\sin(\pi/n)" /> vagy <M t="\tfrac{\ln n}{n}" />). Három erős tétel segít ilyenkor:
        </p>

        <Def title="Három kulcstétel sorozatok határértékéhez">
          <ol>
            <li>
              <strong>Szendvicstétel:</strong> ha valamely <M t="N" />-től kezdve <M t="a_n \le b_n \le c_n" />, és{' '}
              <M t="\lim a_n = \lim c_n = L" />, akkor <M t="\lim b_n = L" />. (Speciálisan:{' '}
              <M t="\lim |a_n| = 0 \Rightarrow \lim a_n = 0" />!)
            </li>
            <li>
              <strong>Folytonos függvény tétele:</strong> ha <M t="\lim a_n = L" /> és <M t="f" /> folytonos{' '}
              <M t="L" />-ben, akkor <M t="\lim f(a_n) = f(L)" />.
            </li>
            <li>
              <strong>Függvényre való áttérés (és L’Hôpital-szabály):</strong> ha létezik olyan <M t="f(x)" /> valós
              függvény, amelyre <M t="f(n) = a_n" /> minden <M t="n \ge N" /> egészre, és{' '}
              <M t="\lim_{x\to\infty} f(x) = L" />, akkor <M t="\lim_{n\to\infty} a_n = L" />.
            </li>
          </ol>
        </Def>

        <SqueezeSequenceWidget />

        <Quiz
          q={<>Mennyi a <M t="\lim_{n\to\infty} \cos\left(\dfrac{\pi n}{2n + 1}\right)" /> határérték?</>}
          options={[
            { label: <M t="1" /> },
            { label: <M t="0" />, ok: true },
            { label: <M t="-1" /> },
            { label: 'Nem létezik (oszcillál)' },
          ]}
          explain={
            <>
              A belső sorozat határértéke <M t="\lim_{n\to\infty}\dfrac{\pi n}{2n+1} = \dfrac{\pi}{2}" />. Mivel a
              koszinusz folytonos, <M t="\cos\left(\tfrac{\pi}{2}\right) = 0" />!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={5} q={<>Számítsd ki a L’Hôpital-szabállyal: <M t="\lim_{n\to\infty} \dfrac{\ln n}{n}" />!</>}>
          <p>
            Áttérünk <M t="f(x) = \dfrac{\ln x}{x}" /> függvényre (<M t="\tfrac{\infty}{\infty}" /> alak):{' '}
            <M t="\lim_{x\to\infty}\dfrac{1/x}{1} = 0" />, tehát <M t="\lim_{n\to\infty}\dfrac{\ln n}{n} = 0" />.
          </p>
        </Task>
        <Task n={6} q={<>Számítsd ki a szendvicstétellel: <M t="\lim_{n\to\infty} \dfrac{(-1)^n}{n^2 + 1}" />!</>}>
          <p>
            <M t="-\dfrac{1}{n^2+1} \le \dfrac{(-1)^n}{n^2+1} \le \dfrac{1}{n^2+1}" />, és mindkét szélső sorozat{' '}
            <M t="0" />-hoz tart, így a határérték <M t="0" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Hat nevezetes határérték és a növekedési hierarchia',
    body: (
      <>
        <p>
          Az alábbi hat sorozat-határérték annyira gyakran fordul elő a 11. fejezetben (különösen a végtelen sorok
          konvergenciavizsgálatánál!), hogy érdemes őket fejből tudni:
        </p>

        <Def title="Hat nevezetes sorozat-határérték (5. tétel)">
          <ol>
            <li><M t="\lim_{n\to\infty} \dfrac{\ln n}{n} = 0" /></li>
            <li><M t="\lim_{n\to\infty} \sqrt[n]{n} = \lim_{n\to\infty} n^{1/n} = 1" /></li>
            <li><M t="\lim_{n\to\infty} x^{1/n} = 1" /> (minden <M t="x > 0" /> esetén)</li>
            <li><M t="\lim_{n\to\infty} x^n = 0" /> (minden <M t="|x| < 1" /> esetén)</li>
            <li><M t="\lim_{n\to\infty} \left(1 + \dfrac{x}{n}\right)^n = e^x" /> (minden <M t="x \in \mathbb{R}" /> esetén)</li>
            <li><M t="\lim_{n\to\infty} \dfrac{x^n}{n!} = 0" /> (minden <M t="x \in \mathbb{R}" /> esetén)</li>
          </ol>
        </Def>

        <FamousLimitsWidget />

        <p>
          <em>Miért igaz a 6. képlet?</em> Bármilyen nagy is <M t="|x|" />, válasszunk egy <M t="M > |x|" /> egészt.
          Amikor <M t="n > M" />, a tört minden újabb lépésben legalább <M t="\dfrac{|x|}{M} < 1" /> arányban zsugorodik:
        </p>
        <M block t="0 \le \frac{|x|^n}{n!} \le \frac{|x|^M}{M!}\cdot\left(\frac{|x|}{M}\right)^{n-M} \longrightarrow 0!" />

        <GrowthHierarchyWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={7} q={<>Számítsd ki: <M t="\lim_{n\to\infty} \left(1 - \dfrac{3}{n}\right)^n" /> és <M t="\lim_{n\to\infty} \sqrt[n]{5n}" />!</>}>
          <ul>
            <li><M t="\left(1 + \dfrac{-3}{n}\right)^n \longrightarrow e^{-3} = \dfrac{1}{e^3}" />.</li>
            <li><M t="\sqrt[n]{5n} = 5^{1/n}\cdot n^{1/n} \longrightarrow 1\cdot 1 = 1" />!</li>
          </ul>
        </Task>
        <Task n={8} q={<>Számítsd ki: <M t="\lim_{n\to\infty} \dfrac{100^n}{n!}" />!</>}>
          <p>
            A 6. nevezetes határérték <M t="x = 100" />-ra: bár az első 100 tag hatalmasra nő, a faktoriális végül
            legyőzi a <M t="100^n" /> exponenciálist, és a határérték pontosan <M t="0" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Rekurzív sorozatok és a fixpont-módszer',
    body: (
      <>
        <p>
          Gyakran nem zárt képlettel, hanem <strong>rekurzióval</strong> adjuk meg a sorozatot: megadjuk a kezdőtagot
          (pl. <M t="a_1" />) és egy szabályt, amely az <M t="a_n" />-ből kiszámítja a következő <M t="a_{n+1}" />{' '}
          tagot. Ilyen a Fibonacci-sorozat (<M t="F_1=1, F_2=1, F_{n+1}=F_n+F_{n-1}" />) és a számítógépes gyökvonó
          Newton/Hérón-iteráció is!
        </p>

        <RecursiveSequenceWidget />

        <Steps
          title="Rekurzív sorozat határértéke (Weierstrass + fixpont)"
          problem={
            <>
              Legyen <M t="a_1 = \sqrt{2}" /> és <M t="a_{n+1} = \sqrt{2 + a_n}" /> (<M t="n \ge 1" />). Igazoljuk,
              hogy a sorozat konvergens, és határozzuk meg a határértékét!
            </>
          }
          steps={[
            {
              title: '1. Felülről korlátos (aₙ < 2) teljes indukcióval',
              body: (
                <>
                  <M t="a_1 = \sqrt{2} < 2" /> igaz. Ha <M t="a_n < 2" />, akkor{' '}
                  <M t="a_{n+1} = \sqrt{2 + a_n} < \sqrt{2 + 2} = 2" />. Tehát minden tagra <M t="a_n < 2" />!
                </>
              ),
            },
            {
              title: '2. Szigorúan monoton növekvő (aₙ₊₁ > aₙ)',
              body: (
                <>
                  Mivel <M t="0 < a_n < 2" />, ezért <M t="a_{n+1}^2 - a_n^2 = 2 + a_n - a_n^2 = (2 - a_n)(1 + a_n) > 0" />,
                  amiből <M t="a_{n+1} > a_n" />!
                </>
              ),
            },
            {
              title: '3. Konvergencia és fixpont-egyenlet',
              body: (
                <>
                  Mivel monoton növekvő és felülről korlátos, Weierstrass tétele szerint létezik véges{' '}
                  <M t="L = \lim a_n > 0" />. Határértéket véve a rekurzió mindkét oldalán:
                  <M block t="L = \sqrt{2 + L} \ \Longrightarrow\ L^2 - L - 2 = 0 \ \Longrightarrow\ (L - 2)(L + 1) = 0." />
                  Mivel <M t="L > 0" />, a határérték pontosan <M t="L = 2" />!
                </>
              ),
            },
          ]}
        />

        <Quiz
          q={<>Ha tudjuk, hogy az <M t="a_{n+1} = \dfrac{1}{2}(a_n + 6)" /> (<M t="a_1 = 2" />) sorozat konvergens, mennyi a határértéke?</>}
          options={[
            { label: <M t="L = 3" /> },
            { label: <M t="L = 4" /> },
            { label: <M t="L = 6" />, ok: true },
            { label: <M t="L = 8" /> },
          ]}
          explain={
            <>
              Határértéket véve mindkét oldalon: <M t="L = \tfrac{1}{2}(L + 6) \Rightarrow 2L = L + 6 \Rightarrow L = 6" />!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={9} q={<>Mekkora a határértéke a Hérón-iterációnak: <M t="a_1 = 3,\ a_{n+1} = \dfrac{1}{2}\left(a_n + \dfrac{5}{a_n}\right)" /> (feltéve, hogy konvergens és pozitív)?</>}>
          <p>
            <M t="L = \dfrac{1}{2}\left(L + \dfrac{5}{L}\right) \Rightarrow 2L^2 = L^2 + 5 \Rightarrow L^2 = 5 \Rightarrow L = \sqrt{5}" />!
          </p>
        </Task>
        <Task n={10} q={<>Miért nem szabad csak a fixpont-egyenletet megoldani az <M t="a_1 = 2,\ a_{n+1} = 2a_n - 1" /> sorozatra?</>}>
          <p>
            Az <M t="L = 2L - 1" /> egyenlet <M t="L = 1" />-et adna, pedig a sorozat <M t="2, 3, 5, 9, 17, \ldots \to +\infty" />,
            vagyis <strong>divergens</strong>! A fixpont-egyenlet csak akkor érvényes, ha már tudjuk, hogy a sorozat
            konvergens!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Monoton és korlátos sorozatok — Weierstrass tétele',
    body: (
      <>
        <p>
          Honnan tudjuk egy sorozatról, hogy <em>létezik</em> véges határértéke, még akkor is, ha nem látjuk előre az{' '}
          <M t="L" /> számot? Erre ad választ a valós számok teljességéből (1.1) következő <strong>Weierstrass-tétel</strong>!
        </p>

        <Def title="Monotonitás, korlátosság és Weierstrass tétele">
          <ul>
            <li><strong>Monoton növekvő:</strong> <M t="a_1 \le a_2 \le a_3 \le \cdots" /> (csökkenő: <M t="a_1 \ge a_2 \ge \cdots" />).</li>
            <li><strong>Felülről korlátos:</strong> létezik <M t="M" />, hogy <M t="a_n \le M" /> minden <M t="n" />-re. A legkisebb ilyen <M t="M" /> a <strong>legkisebb felső korlát (szuprémum)</strong>.</li>
            <li>
              <strong>Weierstrass tétele (Monoton sorozatok tétele):</strong> minden <em>monoton növekvő és felülről
              korlátos</em> (illetve <em>monoton csökkenő és alulról korlátos</em>) sorozat <strong>konvergens</strong>,
              határértéke pedig a szuprémuma (ill. infimuma)!
            </li>
          </ul>
        </Def>

        <MonotoneBoundedWidget />

        <p>
          <em>Hogyan ellenőrizzük a monotonitást a gyakorlatban?</em> Három bevált módszer van:
        </p>
        <ol>
          <li><strong>Különbség vizsgálata:</strong> <M t="a_{n+1} - a_n \ge 0" /> (növekvő) vagy <M t="\le 0" /> (csökkenő).</li>
          <li><strong>Hányados vizsgálata</strong> (pozitív tagoknál): <M t="\dfrac{a_{n+1}}{a_n} \ge 1" /> vagy <M t="\le 1" />.</li>
          <li><strong>Derivált vizsgálata:</strong> ha <M t="a_n = f(n)" /> és <M t="f'(x) \ge 0" /> (<M t="x \ge N" />), akkor a sorozat növekvő!</li>
        </ol>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={11} q={<>Igazold a hányados-módszerrel, hogy az <M t="a_n = \dfrac{2^n}{n!}" /> sorozat <M t="n \ge 2" />-től monoton csökkenő és konvergens!</>}>
          <p>
            <M t="\dfrac{a_{n+1}}{a_n} = \dfrac{2^{n+1}/(n+1)!}{2^n/n!} = \dfrac{2}{n+1} < 1" /> minden <M t="n \ge 2" />-re,
            tehát csökkenő! Mivel <M t="a_n > 0" /> (alulról korlátos 0-val), Weierstrass tétele szerint konvergens.
          </p>
        </Task>
        <Task n={12} q={<>Igaz-e, hogy minden korlátos sorozat konvergens? És igaz-e, hogy minden konvergens sorozat korlátos?</>}>
          <p>
            Az első <strong>hamis</strong> (ellenpélda: <M t="a_n = (-1)^n" /> korlátos, de divergens). A második{' '}
            <strong>igaz</strong>: minden konvergens sorozat szükségszerűen korlátos!
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
        <SequenceToolsSummaryDiagram />

        <h3>A 11.1 szakasz kulcsösszefüggései</h3>
        <table className="tbl">
          <thead>
            <tr><th>Téma / Tétel</th><th>Állítás</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Konvergencia</strong></td>
              <td><M t="\forall\varepsilon > 0\ \exists N:\ n\ge N \Rightarrow |a_n - L| < \varepsilon" /></td>
            </tr>
            <tr>
              <td><strong>Növekedési sorrend</strong></td>
              <td><M t="\ln n \ll n^p \ll a^n \ll n! \ll n^n" /> (<M t="p > 0,\ a > 1" />)</td>
            </tr>
            <tr>
              <td><strong>Euler-féle határérték</strong></td>
              <td><M t="\lim_{n\to\infty}\left(1 + \dfrac{x}{n}\right)^n = e^x" /></td>
            </tr>
            <tr>
              <td><strong>Weierstrass tétele</strong></td>
              <td>Monoton + korlátos <M t="\Longrightarrow" /> konvergens</td>
            </tr>
          </tbody>
        </table>

        <h3>Négy tipikus hiba, amit érdemes elkerülni</h3>
        <Warn>
          <strong>1. L’Hôpital alkalmazása diszkrét <M t="n" />-re közvetlenül (pl. <M t="n!" />-ra):</strong> a
          L’Hôpital-szabály csak differenciálható valós <M t="f(x)" /> függvényre érvényes! Az <M t="n!" />-t nem
          szabad „deriválni” — arra a szendvicstétel vagy a hányados-becslés való.
        </Warn>
        <Warn>
          <strong>2. Az <M t="1^\infty" /> határozatlan alak félreértése:</strong> a <M t="\lim (1 + \tfrac{2}{n})^n" />{' '}
          értéke <em>nem</em> <M t="1^\infty = 1" />, hanem <M t="e^2" />! Az alap 1-hez tart, miközben a kitevő{' '}
          <M t="\infty" />-be, a kettő „versenye” adja az exponenciális határértéket.
        </Warn>
        <Warn>
          <strong>3. Fixpont-egyenlet konvergencia igazolása nélkül:</strong> mielőtt <M t="L = g(L)" />-et írsz fel egy
          rekurzív sorozatra, mindig győződj meg róla, hogy a sorozat egyáltalán konvergens!
        </Warn>
        <Warn>
          <strong>4. Korlátosság = konvergencia tévedés:</strong> a korlátosság önmagában nem elég (pl.{' '}
          <M t="\sin n" /> vagy <M t="(-1)^n" />), a Weierstrass-tételhez a <strong>monotonitás</strong> is kell!
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={13} q={<>Mi a hiba az alábbi érvelésben: „<M t="\lim \left(1 + \tfrac{1}{n}\right)^n = 1^\infty = 1" />”?</>}>
          <p>
            Az <M t="1^\infty" /> <strong>határozatlan alak</strong>! Nem szabad külön határértéket venni az alapban és
            a kitevőben: a valódi határérték <M t="e \approx 2{,}71828" />.
          </p>
        </Task>
        <Task n={14} q={<>Igaz-e, hogy ha egy sorozat első 1000 tagját megváltoztatjuk, a határértéke megváltozik?</>}>
          <p>
            <strong>Nem!</strong> A konvergencia és a határérték kizárólag a sorozat „farkától” (<M t="n \ge N" />) függ;
            véges sok tag megváltoztatása soha nem befolyásolja a határértéket.
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

        <Task n={15} q={<>Számítsd ki: (a) <M t="\lim_{n\to\infty}\dfrac{3n^3 - 2n}{5n^3 + 7n^2}" />, (b) <M t="\lim_{n\to\infty}\dfrac{n^2 + 1}{n^3 - 4}" />!</>}>
          <ul>
            <li>(a) <M t="n^3" />-nel osztva: <M t="\dfrac{3}{5}" />.</li>
            <li>(b) <M t="n^3" />-nel osztva: <M t="\dfrac{1/n + 1/n^3}{1 - 4/n^3} \longrightarrow 0" />.</li>
          </ul>
        </Task>

        <Task n={16} q={<>Döntsd el, konvergens-e, és ha igen, add meg a határértékét: (a) <M t="a_n = \left(-\dfrac{3}{4}\right)^n" />, (b) <M t="b_n = \arctan(n)" />!</>}>
          <ul>
            <li>(a) <M t="|-3/4| < 1 \Rightarrow \lim a_n = 0" /> (konvergens).</li>
            <li>(b) <M t="\lim_{n\to\infty}\arctan(n) = \dfrac{\pi}{2}" /> (konvergens).</li>
          </ul>
        </Task>

        <Task n={17} q={<>Számítsd ki: <M t="\lim_{n\to\infty}\left(\sqrt{n^2 + 4n} - n\right)" />!</>}>
          <p>
            Konjugálttal bővítve:
            <M block t="\frac{(n^2 + 4n) - n^2}{\sqrt{n^2 + 4n} + n} = \frac{4n}{n\sqrt{1 + 4/n} + n} = \frac{4}{\sqrt{1 + 4/n} + 1} \longrightarrow \frac{4}{2} = 2." />
          </p>
        </Task>

        <h3>Közepes</h3>

        <Task n={18} q={<>Számítsd ki: <M t="\lim_{n\to\infty}\left(\dfrac{n + 3}{n - 1}\right)^n" />!</>}>
          <p>
            Átírjuk: <M t="\dfrac{n+3}{n-1} = 1 + \dfrac{4}{n-1}" />. Így:
            <M block t="\left(1 + \frac{4}{n-1}\right)^n = \left(1 + \frac{4}{n-1}\right)^{n-1}\cdot\left(1 + \frac{4}{n-1}\right) \longrightarrow e^4 \cdot 1 = e^4!" />
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki: <M t="\lim_{n\to\infty} \dfrac{\ln(n^2 + 1)}{\ln(n^3 + 2)}" />!</>}>
          <p>
            L’Hôpital-szabállyal (vagy kiemelve <M t="\ln(n^2) = 2\ln n" />-et):
            <M block t="\frac{2\ln n + \ln(1 + 1/n^2)}{3\ln n + \ln(1 + 2/n^3)} = \frac{2 + \tfrac{\ln(1+1/n^2)}{\ln n}}{3 + \tfrac{\ln(1+2/n^3)}{\ln n}} \longrightarrow \frac{2}{3}." />
          </p>
        </Task>

        <Task n={20} q={<>Számítsd ki a szendvicstétellel: <M t="\lim_{n\to\infty} \sqrt[n]{3^n + 5^n}" />!</>}>
          <p>
            Mivel <M t="5^n < 3^n + 5^n < 2\cdot 5^n" />, <M t="n" />-edik gyököt vonva:
            <M block t="5 < \sqrt[n]{3^n + 5^n} < 2^{1/n}\cdot 5." />
            Mivel <M t="2^{1/n} \to 1" />, mindkét szélső sorozat <M t="5" />-höz tart, tehát a határérték <M t="5" />!
          </p>
        </Task>

        <h3>Nehéz</h3>

        <Task
          n={21}
          q={
            <>
              Igazold, hogy az <M t="a_n = \dfrac{n!}{n^n}" /> sorozat <M t="0" />-hoz tart!
            </>
          }
        >
          <p>
            Írjuk ki a tényezőket:
            <M block t="0 < \frac{n!}{n^n} = \frac{1}{n}\cdot\frac{2}{n}\cdot\frac{3}{n}\cdots\frac{n}{n} \le \frac{1}{n}\cdot 1 \cdot 1 \cdots 1 = \frac{1}{n}." />
            A szendvicstétel szerint <M t="\lim_{n\to\infty}\dfrac{n!}{n^n} = 0" />!
          </p>
        </Task>

        <Task
          n={22}
          q={
            <>
              Legyen <M t="a_1 = 1" /> és <M t="a_{n+1} = 3 - \dfrac{1}{a_n}" /> (<M t="n \ge 1" />). Igazold
              Weierstrass tételével, hogy konvergens, és határozd meg a pontos határértékét!
            </>
          }
        >
          <p>
            Indukcióval <M t="1 \le a_n < 3" />: <M t="a_1 = 1" />, és ha <M t="a_n \ge 1" />, akkor{' '}
            <M t="a_{n+1} = 3 - \tfrac{1}{a_n} \in [2;\,3)" />.
          </p>
          <p>
            Monotonitás: <M t="a_2 = 2 > 1 = a_1" />. Ha <M t="a_n > a_{n-1}" />, akkor{' '}
            <M t="\tfrac{1}{a_n} < \tfrac{1}{a_{n-1}} \Rightarrow 3 - \tfrac{1}{a_n} > 3 - \tfrac{1}{a_{n-1}} \Rightarrow a_{n+1} > a_n" />!
            Tehát monoton növekvő és felülről korlátos <M t="\Rightarrow" /> konvergens.
          </p>
          <p>
            Fixpont: <M t="L = 3 - \dfrac{1}{L} \Rightarrow L^2 - 3L + 1 = 0 \Rightarrow L = \dfrac{3 \pm \sqrt{5}}{2}" />.
            Mivel <M t="a_n \ge 2" /> (<M t="n \ge 2" />-re), csak a nagyobb gyök lehet:{' '}
            <M t="L = \dfrac{3 + \sqrt{5}}{2} \approx 2{,}618" />!
          </p>
        </Task>

        <Task
          n={23}
          q={
            <>
              Számítsd ki: <M t="\lim_{n\to\infty} n\sin\left(\dfrac{1}{n}\right)" /> és{' '}
              <M t="\lim_{n\to\infty} \left(n^2\left(1 - \cos\dfrac{1}{n}\right)\right)" />!
            </>
          }
        >
          <p>
            Az <M t="u = \tfrac{1}{n} \to 0^+" /> helyettesítéssel:
          </p>
          <ul>
            <li><M t="\lim_{u\to 0^+}\dfrac{\sin u}{u} = 1" />.</li>
            <li><M t="\lim_{u\to 0^+}\dfrac{1 - \cos u}{u^2} = \lim_{u\to 0^+}\dfrac{2\sin^2(u/2)}{u^2} = \dfrac{1}{2}" />!</li>
          </ul>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Mi az <M t="a_n = \dfrac{\sin n}{n}" /> sorozat határértéke <M t="n \to \infty" /> esetén?
            </>
          }
          options={[
            { label: <><M t="0" /> (szendvicstétel alapján)</>, ok: true },
            { label: <M t="1" /> },
            { label: 'Oszcillál, nincs határértéke' },
            { label: <M t="\infty" /> },
          ]}
          explain={
            <>
              Mivel <M t="-\dfrac{1}{n} \le \dfrac{\sin n}{n} \le \dfrac{1}{n}" />, és mindkét szélső sorozat{' '}
              <M t="0" />-hoz tart, a szendvicstétel szerint <M t="a_n \to 0" />.
            </>
          }
        />
      </>
    ),
  },
];
