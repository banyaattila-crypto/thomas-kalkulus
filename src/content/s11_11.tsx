import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  DirichletMidpointWidget,
  EvenOddFourierWidget,
  FourierSynthWidget,
  OrthogonalityWidget,
  PeriodScalingDiagram,
  SpectrumComparisonWidget,
  SquareWaveGibbsWidget,
  TaylorVsFourierDiagram,
} from '../components/Widgets1111';
import type { Page } from './s1_1';

export const S11_11: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Hullámok összegzése: a Fourier-sor fogalma',
    body: (
      <>
        <Story>
          <p>
            Joseph Fourier 1807-ben, a hővezetés vizsgálatakor egy olyan merész állítással sokkolta a Francia
            Akadémiát, amely alapjaiban rázta meg a matematikát: <em>szinte bármilyen periodikus függvény — még egy
            éles sarkú vagy szakadásos négyszögjel is! — előállítható egyszerű szinusz- és koszinuszhullámok
            összegeként!</em> Ma ezen alapszik az MP3, a JPEG, a Wi-Fi és az MRI is.
          </p>
        </Story>

        <Def title="2π-periodikus függvény Fourier-sora és együtthatói">
          <p>
            Az <M t="f(x)" /> függvény <M t="[0, 2\pi]" /> (vagy <M t="[-\pi, \pi]" />) intervallumon vett{' '}
            <strong>Fourier-sora</strong>:
            <M block t="a_0 + \sum_{n=1}^{\infty} \big(a_n \cos(nx) + b_n \sin(nx)\big)," />
            ahol a <strong>Fourier-együtthatók</strong> (Euler–Fourier-formulák):
            <M block t="a_0 = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x)\,dx, \qquad a_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\cos(nx)\,dx, \qquad b_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\sin(nx)\,dx." />
            (Ugyanezek az integrálok bármely teljes <M t="2\pi" /> hosszúságú szakaszon, pl. <M t="[0, 2\pi]" />-n is
            vehetők!)
          </p>
        </Def>

        <FourierSynthWidget />

        <Task n={1} q={<>Mi a geometriai jelentése az <M t="a_0 = \frac{1}{2\pi}\int_0^{2\pi} f(x)\,dx" /> konstans tagnak?</>}>
          <p>
            Az <M t="a_0" /> pontosan az <M t="f(x)" /> függvény <strong>átlagértéke</strong> egy teljes perióduson
            (elektronikában: a jel egyenáramú, DC-komponense).
          </p>
        </Task>

        <Task n={2} q={<>Számítsd ki az <M t="f(x) = 3 + 2\cos x - 5\sin(4x)" /> függvény Fourier-együtthatóit integrálás nélkül!</>}>
          <p>
            Mivel a függvény már eleve trigonometrikus polinom, a Fourier-sora önmaga! Együtthatói: <M t="a_0 = 3" />,{' '}
            <M t="a_1 = 2" />, <M t="b_4 = -5" />, minden más <M t="a_n = 0" /> és <M t="b_n = 0" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'A titkos fegyver: a trigonometrikus ortogonalitás',
    body: (
      <>
        <p>
          Honnan származnak az Euler–Fourier-integrálképletek? A válasz a trigonometrikus függvények csodálatos{' '}
          <strong>ortogonalitási</strong> (merőlegességi) tulajdonsága: ha két <em>különböző</em> frekvenciájú
          hullámot összeszorzunk és egy teljes perióduson integrálunk, az eredmény mindig <strong>nulla</strong>!
        </p>

        <Def title="Ortogonalitási relációk [−π, π]-n (m, n ∈ ℕ⁺)">
          <ul>
            <li><M t="\displaystyle \int_{-\pi}^{\pi} \cos(mx)\cos(nx)\,dx = \begin{cases} 0, & m \ne n, \\ \pi, & m = n. \end{cases}" /></li>
            <li><M t="\displaystyle \int_{-\pi}^{\pi} \sin(mx)\sin(nx)\,dx = \begin{cases} 0, & m \ne n, \\ \pi, & m = n. \end{cases}" /></li>
            <li><M t="\displaystyle \int_{-\pi}^{\pi} \sin(mx)\cos(nx)\,dx = 0 \quad \text{minden } m, n\text{-re!}" /></li>
          </ul>
        </Def>

        <OrthogonalityWidget />

        <Quiz
          q={<>Ha az <M t="f(x) = a_0 + \sum_{n=1}^\infty (a_n \cos nx + b_n \sin nx)" /> egyenlet mindkét oldalát megszorozzuk <M t="\cos(3x)" />-szel és integráljuk <M t="[-\pi, \pi]" />-n, mi marad meg a jobb oldalon?</>}
          options={[
            { label: <M t="2\pi a_3" /> },
            { label: <M t="\pi a_3" />, ok: true },
            { label: <M t="\pi b_3" /> },
            { label: <M t="0" /> },
          ]}
          explain={
            <>
              Az ortogonalitás miatt minden más tag integrálja 0, csak az <M t="a_3 \int_{-\pi}^\pi \cos^2(3x)\,dx = \pi a_3" />{' '}
              marad meg! Innen osztással kapjuk <M t="a_3 = \frac{1}{\pi}\int_{-\pi}^\pi f(x)\cos(3x)\,dx" />.
            </>
          }
        />

        <Task n={3} q={<>Igazold a szorzattá/összeggé alakító képlettel, hogy <M t="\int_{-\pi}^{\pi} \cos(2x)\cos(5x)\,dx = 0" />!</>}>
          <p>
            <M t="\cos(2x)\cos(5x) = \frac{1}{2}\big(\cos(3x) + \cos(7x)\big)" />. Ennek primitív függvénye{' '}
            <M t="\frac{1}{2}\left(\frac{\sin 3x}{3} + \frac{\sin 7x}{7}\right)" />, amely <M t="-\pi" />-ben és{' '}
            <M t="\pi" />-ben is 0, így az integrál <strong>0</strong>.
          </p>
        </Task>

        <Task n={4} q={<>Számítsd ki a <M t="\int_{-\pi}^{\pi} \sin^2(nx)\,dx" /> integrált (<M t="n \ge 1" /> egész)!</>}>
          <p>
            A félszög-képlettel <M t="\sin^2(nx) = \frac{1 - \cos(2nx)}{2}" />. Integrálva <M t="[-\pi, \pi]" />-n:{' '}
            <M t="\left[\frac{x}{2} - \frac{\sin(2nx)}{4n}\right]_{-\pi}^{\pi} = \frac{\pi}{2} - \left(-\frac{\pi}{2}\right) = \pi" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'A négyszögjel Fourier-sora és a Gibbs-jelenség',
    body: (
      <>
        <p>
          Számítsuk ki lépésről lépésre a matematika és a villamosmérnökség leghíresebb Fourier-sorát: a{' '}
          <M t="2\pi" />-periodikus <strong>négyszögjelét</strong>!
        </p>

        <Steps
          title="A szimmetrikus négyszögjel Fourier-sora"
          problem={<>Határozd meg az <M t="f(x) = \begin{cases} -1, & -\pi < x < 0, \\ 1, & 0 < x < \pi \end{cases}" /> (<M t="2\pi" />-periodikus) függvény Fourier-sorát!</>}
          steps={[
            {
              title: 'Átlagérték (a₀) és aₙ koszinusz-együtthatók',
              body: (
                <p>
                  A függvény páratlan (<M t="f(-x) = -f(x)" />), ezért <M t="a_0 = 0" />, és mivel{' '}
                  <M t="f(x)\cos(nx)" /> páratlan, minden <M t="a_n = 0" />!
                </p>
              ),
            },
            {
              title: 'A bₙ szinusz-együtthatók kiszámítása',
              body: (
                <p>
                  Mivel <M t="f(x)\sin(nx)" /> páros, elég <M t="[0, \pi]" />-n integrálni és megduplázni:
                  <M block t="b_n = \frac{2}{\pi}\int_0^{\pi} 1\cdot\sin(nx)\,dx = \frac{2}{\pi}\left[-\frac{\cos(nx)}{n}\right]_0^{\pi} = \frac{2}{\pi n}\big(1 - (-1)^n\big)." />
                </p>
              ),
            },
            {
              title: 'Páros vs. páratlan n szétválasztása',
              body: (
                <p>
                  Ha <M t="n" /> páros, <M t="1 - (-1)^n = 0 \implies b_n = 0" />. Ha <M t="n = 2k+1" /> páratlan,{' '}
                  <M t="1 - (-1)^n = 2 \implies b_{2k+1} = \frac{4}{\pi(2k+1)}" />!
                </p>
              ),
            },
            {
              title: 'A kész Fourier-sor',
              body: (
                <p>
                  <M block t="f(x) \sim \frac{4}{\pi}\left(\sin x + \frac{\sin 3x}{3} + \frac{\sin 5x}{5} + \frac{\sin 7x}{7} + \cdots\right) = \frac{4}{\pi}\sum_{k=0}^{\infty}\frac{\sin((2k+1)x)}{2k+1}." />
                </p>
              ),
            },
          ]}
        />

        <SquareWaveGibbsWidget />

        <Task n={5} q={<>Helyettesíts <M t="x = \frac{\pi}{2}" />-t a négyszögjel Fourier-sorába! Melyik híres formulát kapod vissza?</>}>
          <p>
            <M t="f(\pi/2) = 1" />, és <M t="\sin((2k+1)\pi/2) = (-1)^k" />. Így:{' '}
            <M t="1 = \frac{4}{\pi}\left(1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \cdots\right) \implies \frac{\pi}{4} = 1 - \frac{1}{3} + \frac{1}{5} - \cdots" />{' '}
            — pontosan a Leibniz-formula!
          </p>
        </Task>

        <Task n={6} q={<>Add meg a <M t="g(x) = \begin{cases} 1, & 0 \le x \le \pi, \\ 2, & \pi < x < 2\pi \end{cases}" /> függvény (Thomas 1. példa) Fourier-sorát a fenti eredményből!</>}>
          <p>
            Vegyük észre, hogy <M t="g(x) = \frac{3}{2} - \frac{1}{2}f(x)" /> (ahol <M t="f" /> a szimmetrikus
            négyszögjel)! Ezért integrálás nélkül is megkapjuk:
            <M block t="g(x) \sim \frac{3}{2} - \frac{2}{\pi}\sum_{k=0}^{\infty}\frac{\sin((2k+1)x)}{2k+1}." />
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Dirichlet konvergenciatétele: mi történik a szakadásoknál?',
    body: (
      <>
        <p>
          Egy szakadásos függvénynek nincs egyértelmű „simaság” tulajdonsága az ugrási pontban — mégis pontosan tudjuk,
          mihez konvergál a Fourier-sora!
        </p>

        <Def title="Dirichlet konvergenciatétele Fourier-sorokra">
          <p>
            Ha az <M t="f" /> egy <M t="2\pi" />-periodikus, szakaszonként sima függvény (vagyis <M t="f" /> és{' '}
            <M t="f'" /> is szakaszonként folytonos, legfeljebb véges sok véges ugrással egy perióduson), akkor a
            Fourier-sora <strong>minden <M t="x \in \mathbb{R}" /> pontban konvergens</strong>, és összege:
          </p>
          <ul>
            <li><M t="f(x)" />, ha <M t="f" /> folytonos az <M t="x" /> pontban;</li>
            <li>
              <M t="\dfrac{f(x^-) + f(x^+)}{2}" /> (a bal és jobb oldali határértékek <strong>számtani közepe</strong>),
              ha <M t="f" />-nek ugrása van az <M t="x" /> pontban!
            </li>
          </ul>
        </Def>

        <DirichletMidpointWidget />

        <Task n={7} q={<>Egy <M t="2\pi" />-periodikus függvény <M t="[0, 2\pi)" />-n így adott: <M t="f(x) = x" /> (<M t="0 \le x < \pi" />), <M t="f(x) = 0" /> (<M t="\pi \le x < 2\pi" />). Mihez konvergál a Fourier-sora <M t="x = \pi" />-ben és <M t="x = 0" />-ban?</>}>
          <p>
            <M t="x = \pi" />-ben: <M t="f(\pi^-) = \pi" />, <M t="f(\pi^+) = 0" />, tehát az összeg{' '}
            <M t="\frac{\pi + 0}{2} = \frac{\pi}{2}" />.
            <br />
            <M t="x = 0" />-ban: a periodicitás miatt <M t="f(0^-) = f(2\pi^-) = 0" /> és <M t="f(0^+) = 0" />, tehát
            itt folytonos és az összeg <strong><M t="0" /></strong>!
          </p>
        </Task>

        <Task n={8} q={<>Mihez konvergál az <M t="f(x) = e^x" /> (<M t="-\pi < x < \pi" />, <M t="2\pi" />-periodikusan kiterjesztve) Fourier-sora az <M t="x = \pi" /> pontban?</>}>
          <p>
            Balról <M t="e^\pi" />, jobbról a periodicitás miatt <M t="e^{-\pi}" /> a határérték. Az összeg tehát{' '}
            <M t="\frac{e^\pi + e^{-\pi}}{2} = \operatorname{ch}\pi" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Páros és páratlan függvények · A Bázel-probléma (π²/6)',
    body: (
      <>
        <p>
          Szimmetrikus <M t="[-\pi, \pi]" /> intervallumon a paritás megfelezi a munkánkat:
        </p>
        <ul>
          <li>
            <strong>Páros függvény</strong> (<M t="f(-x) = f(x)" />): minden <M t="b_n = 0" /> → tiszta{' '}
            <strong>koszinuszsor</strong>!
          </li>
          <li>
            <strong>Páratlan függvény</strong> (<M t="f(-x) = -f(x)" />): <M t="a_0 = 0" /> és minden <M t="a_n = 0" /> →
            tiszta <strong>szinuszsor</strong>!
          </li>
        </ul>

        <EvenOddFourierWidget />

        <Quiz
          q={<>Milyen Fourier-sora van az <M t="f(x) = x^2" /> (<M t="-\pi \le x \le \pi" />) függvénynek?</>}
          options={[
            { label: <>Csak <M t="\sin(nx)" /> tagokat tartalmaz (<M t="a_0 = a_n = 0" />)</> },
            { label: <>Csak <M t="a_0" /> és <M t="\cos(nx)" /> tagokat tartalmaz (minden <M t="b_n = 0" />)</>, ok: true },
            { label: <>Csak páratlan <M t="n" /> indexű tagokat tartalmaz</> },
            { label: <>Nincs Fourier-sora, mert nem periodikus <M t="\mathbb{R}" />-en</> },
          ]}
          explain={
            <>
              Mivel <M t="x^2" /> páros függvény, minden <M t="b_n = 0" />, viszont átlaga pozitív (<M t="a_0 = \pi^2/3" />),
              így <M t="a_0" /> és <M t="\cos(nx)" /> tagokból áll!
            </>
          }
        />

        <Task n={9} q={<>Az <M t="f(x) = x^2" /> (<M t="-\pi \le x \le \pi" />) Fourier-sora: <M t="x^2 = \frac{\pi^2}{3} + 4\sum_{n=1}^\infty \frac{(-1)^n}{n^2}\cos(nx)" />. Vezessük le belőle Euler híres <M t="\sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6}" /> formuláját!</>}>
          <p>
            A <M t="2\pi" />-periodikus kiterjesztés <M t="x = \pi" />-ben is folytonos (<M t="(-\pi)^2 = \pi^2" />)!
            Írjuk be <M t="x = \pi" />-t, használva <M t="\cos(n\pi) = (-1)^n" />:
            <M block t="\pi^2 = \frac{\pi^2}{3} + 4\sum_{n=1}^\infty \frac{(-1)^n (-1)^n}{n^2} = \frac{\pi^2}{3} + 4\sum_{n=1}^\infty \frac{1}{n^2} \implies \sum_{n=1}^\infty \frac{1}{n^2} = \frac{2\pi^2/3}{4} = \frac{\pi^2}{6}!" />
          </p>
        </Task>

        <Task n={10} q={<>A fenti <M t="x^2" /> sorba <M t="x = 0" />-t írva mi adódik a <M t="\sum_{n=1}^\infty \frac{(-1)^{n-1}}{n^2}" /> alternáló sor összegére?</>}>
          <p>
            <M t="0 = \frac{\pi^2}{3} + 4\sum_{n=1}^\infty \frac{(-1)^n}{n^2} \implies \sum_{n=1}^\infty \frac{(-1)^{n-1}}{n^2} = \frac{\pi^2}{12}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Spektrum, simaság és általános 2L periódus',
    body: (
      <>
        <p>
          A jelfeldolgozás egyik legfontosabb ökölszabálya: <strong>minél simább a függvény, annál gyorsabban csengenek
          le a Fourier-együtthatói!</strong> Ha a függvénynek ugrása van (négyszögjel, fűrészfog), az együtthatók csak{' '}
          <M t="1/n" /> ütemben fogynak; ha folytonos, de töréspontja van (háromszöghullám, <M t="|x|" />), már{' '}
          <M t="1/n^2" /> ütemben!
        </p>

        <SpectrumComparisonWidget />

        <p>
          A való életben a jelek periódusa ritkán <M t="2\pi" /> — lehet <M t="2L" /> másodperc vagy méter! Ilyenkor
          egyszerű skálázással (<M t="x \mapsto \frac{\pi x}{L}" />) megkapjuk az általános formulákat:
        </p>

        <PeriodScalingDiagram />

        <Task n={11} q={<>Határozd meg a <M t="2" />-periodikus (<M t="L = 1" />) <M t="f(x) = x" /> (<M t="-1 < x < 1" />) fűrészfogjel Fourier-sorát!</>}>
          <p>
            Páratlan függvény, így <M t="a_0 = a_n = 0" />. Parciális integrálással:
            <M block t="b_n = 2\int_0^1 x\sin(n\pi x)\,dx = 2\left[-\frac{x\cos(n\pi x)}{n\pi}\right]_0^1 + \frac{2}{n\pi}\int_0^1 \cos(n\pi x)\,dx = \frac{2(-1)^{n+1}}{n\pi}." />
            Tehát <M t="f(x) \sim \frac{2}{\pi}\sum_{n=1}^\infty \frac{(-1)^{n+1}}{n}\sin(n\pi x)" />.
          </p>
        </Task>

        <Task n={12} q={<>Egy <M t="f(x)" /> függvény <M t="2\pi" />-periodikus és <M t="C^1" /> (folytonos az értéke és az első deriváltja is, nincs ugrás és nincs töréspont). Milyen ütemben csengenek le várhatóan a Fourier-együtthatói?</>}>
          <p>
            Legalább <M t="1/n^3" /> (vagy még gyorsabb) ütemben, mert minden extra folytonos derivált újabb{' '}
            <M t="1/n" /> tényezőt hoz be parciális integráláskor!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló: Taylor vs. Fourier és 4 tipikus hiba',
    body: (
      <>
        <TaylorVsFourierDiagram />

        <Warn>
          Négy tipikus hiba Fourier-soroknál:
          <ol>
            <li>
              <strong>A <M t="2" />-es faktor eltévesztése <M t="a_0" />-nál:</strong> ha a sor{' '}
              <M t="a_0 + \sum (a_n \cos nx + b_n \sin nx)" />, akkor <M t="a_0 = \frac{1}{2\pi}\int" /> (nem{' '}
              <M t="\frac{1}{\pi}\int" />!). Ha <M t="\frac{a_0}{2} + \sum\dots" /> alakot használsz, ott{' '}
              <M t="a_0 = \frac{1}{\pi}\int" /> — mindig ellenőrizd a konvenciót!
            </li>
            <li>
              <strong><M t="\cos(n\pi) = (-1)^n" /> elfelejtése:</strong> <M t="\sin(n\pi) = 0" />, viszont{' '}
              <M t="\cos(n\pi)" /> váltakozva <M t="-1" /> és <M t="+1" />!
            </li>
            <li>
              <strong>Végponti ugrás figyelmen kívül hagyása:</strong> az <M t="f(x) = x" /> folytonos{' '}
              <M t="(-\pi, \pi)" />-n, de periodikus kiterjesztése <M t="\pm\pi" />-nél <em>ugrik</em> (<M t="\pi" />-ről{' '}
              <M t="-\pi" />-re), így ott <M t="0" />-hoz konvergál!
            </li>
            <li>
              <strong>Páros/páratlan szimmetria csak szimmetrikus intervallumon működik:</strong> <M t="[0, 2\pi]" />-n
              óvatosan — előbb nézd meg a <M t="[-\pi, \pi]" /> periodikus képet!
            </li>
          </ol>
        </Warn>

        <Quiz
          q={<>Mi az <M t="f(x) = 1" /> (<M t="0 < x < \pi" />), <M t="f(x) = 0" /> (<M t="-\pi < x < 0" />) függvény <M t="a_0" /> konstans Fourier-együtthatója?</>}
          options={[
            { label: <M t="0" /> },
            { label: <M t="\frac{1}{2}" />, ok: true },
            { label: <M t="1" /> },
            { label: <M t="\frac{1}{\pi}" /> },
          ]}
          explain={
            <>
              <M t="a_0 = \frac{1}{2\pi}\int_{-\pi}^\pi f(x)\,dx = \frac{1}{2\pi}\int_0^\pi 1\,dx = \frac{\pi}{2\pi} = \frac{1}{2}" />{' '}
              — pontosan az átlagérték!
            </>
          }
        />

        <Task n={13} q={<>Igaz-e, hogy az <M t="f(x) = \cos^2 x" /> függvény Fourier-sora véges? Írd fel!</>}>
          <p>
            Igen! A félszög-képlettel <M t="\cos^2 x = \frac{1}{2} + \frac{1}{2}\cos(2x)" /> — ez már maga a Fourier-sor
            (<M t="a_0 = \frac{1}{2}" />, <M t="a_2 = \frac{1}{2}" />, minden más 0)!
          </p>
        </Task>

        <Task n={14} q={<>Miért nem mond ellent a Gibbs-jelenség annak, hogy a négyszögjel Fourier-sora minden pontban konvergál?</>}>
          <p>
            Mert minden rögzített <M t="x_0 > 0" /> pontra a túllendülés csúcsa (<M t="x \approx \pi/(2K)" />) előbb-utóbb
            balra elhalad <M t="x_0" /> mellett, így <M t="S_K(x_0) \to 1" /> <em>pontonként</em> teljesül — csak{' '}
            <em>egyenletesen</em> nem konvergál a szakadás közelében!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Gyakorlófeladatok (könnyű · közepes · nehéz) — 11. fejezet vége!',
    body: (
      <>
        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Írd fel az <M t="f(x) = \sin^2 x" /> függvény Fourier-sorát integrálás nélkül!</>}>
          <p>
            <M t="\sin^2 x = \frac{1}{2} - \frac{1}{2}\cos(2x)" />, tehát <M t="a_0 = \frac{1}{2}" />,{' '}
            <M t="a_2 = -\frac{1}{2}" />, minden más együttható 0.
          </p>
        </Task>

        <Task n={16} q={<>Számítsd ki az <M t="f(x) = \begin{cases} 0, & -\pi < x < 0, \\ 3, & 0 < x < \pi \end{cases}" /> függvény <M t="a_0" /> és <M t="b_1" /> együtthatóját!</>}>
          <p>
            <M t="a_0 = \frac{1}{2\pi}\int_0^\pi 3\,dx = \frac{3}{2}" />.{' '}
            <M t="b_1 = \frac{1}{\pi}\int_0^\pi 3\sin x\,dx = \frac{3}{\pi}[-\cos x]_0^\pi = \frac{6}{\pi}" />.
          </p>
        </Task>

        <Task n={17} q={<>Döntsd el számolás nélkül, hogy <M t="a_n = 0" /> vagy <M t="b_n = 0" /> teljesül-e <M t="[-\pi, \pi]" />-n az alábbiakra: (a) <M t="f(x) = x^3" />, (b) <M t="g(x) = 1 + x^4" />!</>}>
          <p>
            (a) <M t="x^3" /> páratlan <M t="\implies a_0 = a_n = 0" /> (csak szinuszok). (b) <M t="1 + x^4" /> páros{' '}
            <M t="\implies b_n = 0" /> (csak <M t="a_0" /> és koszinuszok).
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Határozd meg az <M t="f(x) = x" /> (<M t="-\pi < x < \pi" />, <M t="2\pi" />-periodikus) fűrészfogjel Fourier-sorát!</>}>
          <p>
            Páratlan, tehát <M t="a_0 = a_n = 0" />. Parciális integrálással:
            <M block t="b_n = \frac{2}{\pi}\int_0^\pi x\sin(nx)\,dx = \frac{2}{\pi}\left[-\frac{x\cos(nx)}{n}\right]_0^\pi = \frac{2(-1)^{n+1}}{n}." />
            Így <M t="x \sim 2\sum_{n=1}^\infty \frac{(-1)^{n+1}}{n}\sin(nx) = 2\left(\sin x - \frac{\sin 2x}{2} + \frac{\sin 3x}{3} - \cdots\right)" />.
          </p>
        </Task>

        <Task n={19} q={<>Határozd meg az <M t="f(x) = |x|" /> (<M t="-\pi \le x \le \pi" />) háromszöghullám Fourier-sorát!</>}>
          <p>
            Páros, tehát <M t="b_n = 0" />. <M t="a_0 = \frac{1}{\pi}\int_0^\pi x\,dx = \frac{\pi}{2}" />.{' '}
            <M t="a_n = \frac{2}{\pi}\int_0^\pi x\cos(nx)\,dx = \frac{2}{\pi n^2}\big((-1)^n - 1\big)" />. Páros{' '}
            <M t="n" />-re 0, páratlan <M t="n = 2k+1" />-re <M t="-\frac{4}{\pi(2k+1)^2}" />:
            <M block t="|x| = \frac{\pi}{2} - \frac{4}{\pi}\sum_{k=0}^\infty \frac{\cos((2k+1)x)}{(2k+1)^2}." />
          </p>
        </Task>

        <Task n={20} q={<>Helyettesíts <M t="x = 0" />-t a 19. feladat <M t="|x|" /> Fourier-sorába, és számítsd ki a <M t="\sum_{k=0}^\infty \frac{1}{(2k+1)^2}" /> sor pontos összegét!</>}>
          <p>
            <M t="0 = \frac{\pi}{2} - \frac{4}{\pi}\sum_{k=0}^\infty \frac{1}{(2k+1)^2} \implies \sum_{k=0}^\infty \frac{1}{(2k+1)^2} = \frac{\pi^2}{8}" />!
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Határozd meg az <M t="f(x) = x^2" /> (<M t="-\pi \le x \le \pi" />) Fourier-sorának <M t="a_n" /> együtthatóit kétszeri parciális integrálással!</>}>
          <p>
            <M t="a_0 = \frac{1}{\pi}\int_0^\pi x^2\,dx = \frac{\pi^2}{3}" />. Kétszeri parciális integrálással:
            <M block t="a_n = \frac{2}{\pi}\int_0^\pi x^2\cos(nx)\,dx = \frac{2}{\pi}\left[\frac{x^2\sin nx}{n} + \frac{2x\cos nx}{n^2} - \frac{2\sin nx}{n^3}\right]_0^\pi = \frac{4(-1)^n}{n^2}." />
            (Így kaptuk meg az 5. oldalon használt <M t="x^2 = \frac{\pi^2}{3} + 4\sum_{n=1}^\infty \frac{(-1)^n}{n^2}\cos(nx)" /> sort!)
          </p>
        </Task>

        <Task n={22} q={<>A Parseval-azonosság szerint <M t="\frac{1}{\pi}\int_{-\pi}^\pi f(x)^2\,dx = 2a_0^2 + \sum_{n=1}^\infty (a_n^2 + b_n^2)" />. Alkalmazd a négyszögjelre (<M t="f(x)=\pm 1" />), hogy megkapd <M t="\sum_{k=0}^\infty \frac{1}{(2k+1)^2} = \frac{\pi^2}{8}" />-et!</>}>
          <p>
            Bal oldal: <M t="\frac{1}{\pi}\int_{-\pi}^\pi 1\,dx = 2" />. Jobb oldal:{' '}
            <M t="\sum_{k=0}^\infty \left(\frac{4}{\pi(2k+1)}\right)^2 = \frac{16}{\pi^2}\sum_{k=0}^\infty \frac{1}{(2k+1)^2}" />.
            Egyenlővé téve: <M t="\sum_{k=0}^\infty \frac{1}{(2k+1)^2} = \frac{2\pi^2}{16} = \frac{\pi^2}{8}" />!
          </p>
        </Task>

        <Task n={23} q={<>Alkalmazd a Parseval-azonosságot a 21. feladat <M t="f(x) = x^2" /> sorára, és számítsd ki a híres <M t="\sum_{n=1}^\infty \frac{1}{n^4}" /> összeget!</>}>
          <p>
            Bal oldal: <M t="\frac{1}{\pi}\int_{-\pi}^\pi x^4\,dx = \frac{2\pi^4}{5}" />. Jobb oldal:{' '}
            <M t="2\left(\frac{\pi^2}{3}\right)^2 + \sum_{n=1}^\infty \frac{16}{n^4} = \frac{2\pi^4}{9} + 16\sum_{n=1}^\infty \frac{1}{n^4}" />.
            Kivonva <M t="\frac{2\pi^4}{9}" />-et: <M t="\frac{8\pi^4}{45} = 16\sum_{n=1}^\infty \frac{1}{n^4} \implies \sum_{n=1}^\infty \frac{1}{n^4} = \frac{\pi^4}{90}" />!
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Miért tűnik el minden <M t="b_k" /> szinuszos együttható egy páros (<M t="f(-x) = f(x)" />) függvény
              Fourier-sorából?
            </>
          }
          options={[
            { label: <>Mert <M t="f(x)\sin(kx)" /> páratlan függvény, így szimmetrikus <M t="[-\pi,\,\pi]" /> integrálja <M t="0" /></>, ok: true },
            { label: <>Mert <M t="\sin(kx)" /> mindig pozitív</> },
            { label: <>Mert a koszinuszok összege mindig <M t="0" /></> },
            { label: 'Csak folytonos függvényekre igaz' },
          ]}
          explain={
            <>
              Páros és páratlan függvény szorzata páratlan, ezért <M t="[-\pi,\,\pi]" />-n vett integrálja pontosan nulla.
            </>
          }
        />
      </>
    ),
  },
];
