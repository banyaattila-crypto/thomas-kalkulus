import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  AlgorithmComplexityWidget,
  BigOEnvelopeWidget,
  BinaryVsLinearSearchWidget,
  GrowthHierarchyLadderDiagram,
  GrowthRaceWidget,
  LimitDecisionTreeDiagram,
  LogVsRootCrossoverWidget,
  RatioConvergenceWidget,
} from '../components/Widgets76';
import type { Page } from './s1_1';

export const S7_6: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'A Proxima Centauri-paradoxon és a növekedési ütem definíciója',
    body: (
      <>
        <Story>
          <p>
            Képzeld el, hogy az <M t="y = e^x" /> grafikonját 1 cm-es léptékkel rajzolod egy táblára! <M t="x = 6" /> cm-nél a görbe már <strong>4 méter magasan</strong> (a mennyezeten) van, <M t="x = 10" /> cm-nél egy <strong>220 méteres felhőkarcoló</strong> tetején, <M t="x = 43" /> cm-nél pedig már <strong>5 fényévre</strong>, túl a legközelebbi csillagon, a Proxima Centaurin! Ezzel szemben az <M t="y = \ln x" /> görbének 5 fényévet kell haladnia jobbra, hogy 43 cm magasra emelkedjen!
          </p>
        </Story>

        <Def title="Függvények növekedési ütemének összehasonlítása (x → ∞)">
          <p>Legyen <M t="f(x) > 0" /> és <M t="g(x) > 0" /> elegendően nagy <M t="x" />-ekre:</p>
          <ol className="steps">
            <li>
              <strong><M t="f" /> gyorsabban növekszik, mint <M t="g" /></strong> (ekvivalensen: <em><M t="g" /> lassabban növekszik, mint <M t="f" /></em>), ha:
              <M block t="\lim_{x\to\infty}\frac{f(x)}{g(x)} = \infty \qquad \Longleftrightarrow \qquad \lim_{x\to\infty}\frac{g(x)}{f(x)} = 0." />
            </li>
            <li>
              <strong><M t="f" /> és <M t="g" /> ugyanabban az ütemben növekszik</strong>, ha:
              <M block t="\lim_{x\to\infty}\frac{f(x)}{g(x)} = L \qquad (\text{ahol } 0 < L < \infty \text{ véges pozitív szám!})." />
            </li>
          </ol>
        </Def>

        <p>
          <strong>Fontos megjegyzés:</strong> e definíció szerint <M t="100x" /> <em>nem</em> növekszik gyorsabban, mint <M t="x" />, mert <M t="\lim \frac{100x}{x} = 100" /> véges és pozitív! A „gyorsabb növekedés” azt jelenti, hogy elég nagy <M t="x" />-eknél a lassabb függvény teljesen <strong>elhanyagolhatóvá</strong> válik a gyorsabbhoz képest!
        </p>

        <GrowthRaceWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Igazold a L’Hospital-szabállyal, hogy <M t="e^x" /> gyorsabban növekszik, mint <M t="x^2" />, amikor <M t="x \to \infty" />!
            </>
          }
        >
          <p>
            Kétszeres L’Hospital-szabállyal (<M t="\infty/\infty" />):
            <M block t="\lim_{x\to\infty}\frac{e^x}{x^2} = \lim_{x\to\infty}\frac{e^x}{2x} = \lim_{x\to\infty}\frac{e^x}{2} = \mathbf{\infty}." />
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Igazold, hogy <M t="\ln x" /> lassabban növekszik, mint <M t="x" />, amikor <M t="x \to \infty" />!
            </>
          }
        >
          <p>
            L’Hospital-szabállyal: <M t="\displaystyle\lim_{x\to\infty}\frac{\ln x}{x} = \lim_{x\to\infty}\frac{1/x}{1} = \mathbf{0}" /> ✓
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'A növekedési ranglétra — exponenciális vs. hatvány vs. logaritmus',
    body: (
      <>
        <Story>
          <p>
            Három aranyszabály elegendő ahhoz, hogy ránézésre megmondd szinte bármely két függvényről, melyik nyeri a versenyt a végtelenben!
          </p>
        </Story>

        <Def title="A 3 alaptörvény (x → ∞)">
          <ol className="steps">
            <li>
              <strong>Bármely <M t="a > 1" /> alapú exponenciális legyőz bármely polinomot (<M t="x^n" />):</strong> <M t="n" />-szeres L’Hospital-szabállyal <M t="\displaystyle\lim_{x\to\infty}\frac{x^n}{e^x} = \lim_{x\to\infty}\frac{n!}{e^x} = 0" /> — még <M t="x^{1\,000\,000}" /> is alulmarad <M t="e^x" />-szel szemben!
            </li>
            <li>
              <strong>Bármely pozitív kitevőjű hatvány (<M t="x^p,\; p>0" />) legyőz bármely logaritmust:</strong> <M t="\displaystyle\lim_{x\to\infty}\frac{\ln x}{x^p} = \lim_{x\to\infty}\frac{1/x}{px^{p-1}} = \lim_{x\to\infty}\frac{1}{px^p} = 0" />!
            </li>
            <li>
              <strong>Az exponenciális alapja SZÁMÍT, a logaritmus alapja NEM!</strong>
              <ul>
                <li>Ha <M t="a > b > 1" />, akkor <M t="\lim\dfrac{a^x}{b^x} = \lim\left(\dfrac{a}{b}\right)^x = \infty" /> ⇒ <M t="a^x" /> <em>gyorsabb</em>, mint <M t="b^x" />!</li>
                <li>De bármely <M t="a, b > 1" /> alapra <M t="\lim\dfrac{\log_a x}{\log_b x} = \dfrac{\ln b}{\ln a} \in (0;\,\infty)" /> ⇒ minden logaritmus <em>ugyanabban az ütemben</em> nő!</li>
              </ul>
            </li>
          </ol>
        </Def>

        <GrowthHierarchyLadderDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Hasonlítsd össze <M t="e^x" />-szel (<M t="x\to\infty" />): gyorsabb, lassabb vagy azonos ütemű? (a) <M t="4^x" />, (b) <M t="e^{x/2}" />, (c) <M t="e^{x-1}" />, (d) <M t="xe^x" />!
            </>
          }
        >
          <p>
            (a) <M t="4 > e \implies" /> <strong>gyorsabb</strong>; (b) <M t="e^{x/2} = (\sqrt{e})^x" />, <M t="\sqrt{e} < e \implies" /> <strong>lassabb</strong>; (c) <M t="e^{x-1} = e^{-1}\cdot e^x \implies" /> <strong>azonos ütemű</strong>; (d) <M t="\frac{xe^x}{e^x} = x \to \infty \implies" /> <strong>gyorsabb</strong>!
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Rendezd növekvő sorrendbe (<M t="x\to\infty" />): <M t="e^x,\; x^x,\; (\ln x)^x,\; e^{x/2}" /> (Thomas 7. feladat)!
            </>
          }
        >
          <p>
            Mindegyik <M t="(\text{alap})^x" /> alakú: <M t="\sqrt{e} < e < \ln x < x" /> (elég nagy <M t="x" />-re!). Tehát a sorrend:
            <M block t="\mathbf{e^{x/2} \;\ll\; e^x \;\ll\; (\ln x)^x \;\ll\; x^x}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Azonos ütem, tranzitivitás és a főtag-módszer',
    body: (
      <>
        <Story>
          <p>
            Hogyan hasonlítsunk össze két bonyolultabb függvényt, például <M t="\sqrt{x^2 + 5}" />-öt és <M t="(2\sqrt{x} - 1)^2" />-et? A <strong>tranzitivitás</strong> miatt nem kell őket egymással elosztani: elég megmutatni, hogy mindkettő ugyanazzal az egyszerű „alapfüggvénnyel” (<M t="x" />-szel) azonos ütemű!
          </p>
        </Story>

        <Def title="Tranzitivitás és a főtag-szabály">
          <p>
            Ha <M t="f" /> azonos ütemű <M t="g" />-vel (<M t="\lim f/g = L_1 > 0" />) és <M t="g" /> azonos ütemű <M t="h" />-val (<M t="\lim g/h = L_2 > 0" />), akkor <M t="f" /> és <M t="h" /> is azonos ütemű, mert <M t="\lim\dfrac{f}{h} = L_1 L_2 \in (0;\,\infty)" />!
          </p>
          <p>
            <strong>Polinomoknál:</strong> minden <M t="n" />-edfokú polinom (<M t="a_n x^n + \dots + a_0,\; a_n > 0" />) pontosan az <M t="x^n" /> főtagjával azonos ütemű!
          </p>
        </Def>

        <RatioConvergenceWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Igazold, hogy <M t="\sqrt{10x + 1}" /> és <M t="\sqrt{x + 1}" /> azonos ütemben nőnek (<M t="x\to\infty" />, Thomas 17. feladat)!
            </>
          }
        >
          <p>
            Mindkettőt elosztva <M t="\sqrt{x}" />-szel: <M t="\lim\sqrt{10 + 1/x} = \sqrt{10}" /> és <M t="\lim\sqrt{1 + 1/x} = 1" />. Mindkettő véges és pozitív, tehát mindkettő <M t="\sqrt{x}" />-szel (és egymással is!) azonos ütemű ✓
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Igazold, hogy <M t="\ln(x^2 + 1)" /> és <M t="\ln x" /> azonos ütemben nőnek!
            </>
          }
        >
          <p>
            L’Hospital-szabállyal: <M t="\displaystyle\lim_{x\to\infty}\frac{\ln(x^2+1)}{\ln x} = \lim_{x\to\infty}\frac{2x/(x^2+1)}{1/x} = \lim_{x\to\infty}\frac{2x^2}{x^2+1} = \mathbf{2} \in (0;\,\infty)" /> ✓
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'A „kis ordó” (o) és a „nagy ordó” (O) jelölés',
    body: (
      <>
        <Story>
          <p>
            A matematikusok és az informatikusok egyaránt imádják a <strong>Landau-féle ordó-jelölést</strong> (<M t="o" /> és <M t="O" />), mert egyetlen betűvel kifejezi, hogy egy függvény szigorúan lassabban (<M t="o" />) vagy legfeljebb olyan gyorsan (<M t="O" />) nő-e, mint egy másik!
          </p>
        </Story>

        <Def title="„Kis ordó” (o) és „Nagy ordó” (O) definíciója (x → ∞)">
          <ul>
            <li>
              <strong>Kis ordó — <M t="f = o(g)" /></strong> („szigorúan lassabb, mint <M t="g" />”):
              <M block t="f = o(g) \quad\Longleftrightarrow\quad \lim_{x\to\infty}\frac{f(x)}{g(x)} = 0." />
            </li>
            <li>
              <strong>Nagy ordó — <M t="f = O(g)" /></strong> („legfeljebb olyan gyors, mint <M t="g" />”): létezik olyan <M t="M > 0" /> és <M t="x_0" /> szám, hogy
              <M block t="f(x) \le M\cdot g(x) \qquad \text{minden } x \ge x_0\text{-re.}" />
            </li>
          </ul>
          <p>
            <em>Megjegyzés:</em> ha <M t="f = o(g)" />, akkor biztosan <M t="f = O(g)" /> is (mint ahogy <M t="a < b \implies a \le b" />). Fordítva azonban nem: <M t="2x = O(x)" /> <strong>igaz</strong>, de <M t="2x = o(x)" /> <strong>hamis</strong>!
          </p>
        </Def>

        <BigOEnvelopeWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Igaz vagy hamis (<M t="x\to\infty" />)? (a) <M t="x = o(x)" />, (b) <M t="x = O(x + 5)" />, (c) <M t="e^x = o(e^{2x})" />, (d) <M t="\ln x = o(\ln 2x)" />!
            </>
          }
        >
          <p>
            (a) <strong>Hamis</strong> (<M t="\lim x/x = 1 \ne 0" />); (b) <strong>Igaz</strong> (<M t="x \le 1\cdot(x+5)" />); (c) <strong>Igaz</strong> (<M t="\lim e^x/e^{2x} = \lim e^{-x} = 0" />); (d) <strong>Hamis</strong> (<M t="\lim \frac{\ln x}{\ln 2 + \ln x} = 1 \ne 0" />)!
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Igazold, hogy <M t="2 + \cos x = O(1)" /> és <M t="e^x + x = O(e^x)" /> (<M t="x\to\infty" />)!
            </>
          }
        >
          <p>
            Mivel <M t="\cos x \le 1" />, ezért <M t="2 + \cos x \le 3\cdot 1" /> minden <M t="x" />-re (<M t="M = 3" />) ⇒ <M t="O(1)" /> ✓. A másodikhoz: <M t="x > 0" />-ra <M t="x < e^x \implies e^x + x < 2e^x" /> (<M t="M = 2" />) ⇒ <M t="O(e^x)" /> ✓.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Számítógéptudomány: szekvenciális O(n) vs. bináris keresés O(log₂ n)',
    body: (
      <>
        <Story>
          <p>
            Miért érdemes a programozóknak kívülről fújni a logaritmust? Mert egy <strong>rendezett 1 milliós listában</strong> a naiv (szekvenciális) keresés akár <strong>1 000 000</strong> lépésig tart, míg a <strong>bináris keresés</strong> (amely minden lépésben megfelezi a maradék listát!) legfeljebb <strong>20 lépésben</strong> megtalál bármit!
          </p>
        </Story>

        <Def title="Két keresőalgoritmus összehasonlítása (n elemű rendezett lista)">
          <ul>
            <li>
              <strong>Szekvenciális keresés — <M t="O(n)" />:</strong> elejétől a végéig sorban vizsgálja az elemeket; legrosszabb esetben <M t="n" /> összehasonlítás.
            </li>
            <li>
              <strong>Bináris keresés — <M t="O(\log_2 n)" />:</strong> mindig a középső elemet nézi, és eldobja a lista felét! Ha <M t="2^{m-1} < n \le 2^m" />, akkor legfeljebb <M t="m = \lceil\log_2 n\rceil" /> lépés kell!
            </li>
          </ul>
        </Def>

        <BinaryVsLinearSearchWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Egy 1 000 000 elemű rendezett tömbben legfeljebb hány lépés a bináris keresés (Thomas 25. feladat, <M t="2^{20} = 1\,048\,576" />)?
            </>
          }
        >
          <p>
            Mivel <M t="2^{19} = 524\,288 < 1\,000\,000 \le 2^{20}" />, a bináris keresés legfeljebb <strong>20 lépés</strong> (a szekvenciális 1 000 000 lépésével szemben!).
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Ha megduplázzuk a rendezett adatbázis méretét (1 millióról 2 millióra), hány <em>extra lépéssel</em> nő a bináris keresés legrosszabb esete?
            </>
          }
        >
          <p>
            <M t="\log_2(2n) = \log_2 n + 1" />, tehát mindössze <strong>1etlen extra lépéssel</strong>! Ez a logaritmus igazi ereje!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Algoritmusok futásideje: n log₂ n vs. n² vs. 2ⁿ',
    body: (
      <>
        <Story>
          <p>
            A valós szoftverfejlesztésben nemcsak a keresésnél, hanem rendezésnél, útvonaltervezésnél és titkosításnál is az ordó dönti el, hogy egy algoritmus <strong>használható-e nagy adathalmazokra</strong>. Nézzük meg, hogyan robban fel az <M t="O(2^n)" /> már <M t="n = 30" />-nál!
          </p>
        </Story>

        <AlgorithmComplexityWidget />

        <p>
          <strong>Hogyan hasonlítsunk össze két algoritmus-függvényt?</strong> Például (Thomas 23. feladat): <M t="n\log_2 n" />, <M t="n^{3/2}" /> és <M t="n(\log_2 n)^2" />! Osszuk el mindhármat <M t="n" />-nel — marad: <M t="\log_2 n" />, <M t="\sqrt{n}" /> és <M t="(\log_2 n)^2" />. Mivel a logaritmus bármely hatványa lassabb bármely pozitív hatványnál (<M t="(\log_2 n)^2 = o(\sqrt{n})" />), hosszú távon a sorrend:
        </p>
        <M block t="n\log_2 n \;\ll\; n(\log_2 n)^2 \;\ll\; n^{3/2} \qquad (\text{tehát az } n\log_2 n\text{ a leghatékonyabb!})." />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Három algoritmus lépésszáma: <M t="n" />, <M t="\sqrt{n}\log_2 n" /> és <M t="(\log_2 n)^2" /> (Thomas 24. feladat). Melyik a leghatékonyabb nagy <M t="n" />-re?
            </>
          }
        >
          <p>
            Mivel <M t="(\log_2 n)^2 \ll \sqrt{n}\log_2 n \ll n" /> (hiszen <M t="\frac{(\log_2 n)^2}{\sqrt{n}\log_2 n} = \frac{\log_2 n}{\sqrt{n}} \to 0" /> és <M t="\frac{\sqrt{n}\log_2 n}{n} = \frac{\log_2 n}{\sqrt{n}} \to 0" />), a leghatékonyabb a <strong><M t="(\log_2 n)^2" /></strong>!
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Igazold, hogy <M t="x\ln x = o(x^2)" /> (<M t="x\to\infty" />)!
            </>
          }
        >
          <p>
            <M t="\displaystyle\lim_{x\to\infty}\frac{x\ln x}{x^2} = \lim_{x\to\infty}\frac{\ln x}{x} = 0 \implies x\ln x = o(x^2)" /> ✓ (ezért gyorsabb a <M t="O(n\log n)" /> rendezés a <M t="O(n^2)" /> buborékrendezésnél!).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Döntési fa és a „lassú előzés” csapdája (ln x vs. x¹/ᵏ)',
    body: (
      <>
        <Story>
          <p>
            Két fontos gyakorlati eszköz a végére: egy <strong>gyors döntési fa</strong> a hányados-határértékhez, és egy látványos figyelmeztetés arról, miért nem szabad pusztán egy kis ablakos grafikon alapján ítélni!
          </p>
        </Story>

        <LimitDecisionTreeDiagram />
        <LogVsRootCrossoverWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Igazold, hogy <M t="\ln x = o(x^{1/1\,000\,000})" />, amikor <M t="x \to \infty" /> (Thomas 21a. feladat)!
            </>
          }
        >
          <p>
            Legyen <M t="p = 10^{-6} > 0" />. L’Hospital-szabállyal:
            <M block t="\lim_{x\to\infty}\frac{\ln x}{x^p} = \lim_{x\to\infty}\frac{1/x}{px^{p-1}} = \lim_{x\to\infty}\frac{1}{px^p} = \mathbf{0}." />
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Milyen ütemben nő <M t="\ln(x + 99)" /> az <M t="\ln x" /> függvényhez képest (Thomas 15. feladat)?
            </>
          }
        >
          <p>
            L’Hospital-szabállyal: <M t="\displaystyle\lim_{x\to\infty}\frac{\ln(x+99)}{\ln x} = \lim_{x\to\infty}\frac{1/(x+99)}{1/x} = \lim_{x\to\infty}\frac{x}{x+99} = \mathbf{1}" /> ⇒ <strong>azonos ütemben</strong> nőnek!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 8
  {
    title: 'Összefoglalás, buktatók és lépcsőzetes gyakorlófeladatok',
    body: (
      <>
        <Def title="7.6 Puskakártya">
          <ul>
            <li><strong>Hányados-teszt (<M t="L = \lim_{x\to\infty} f/g" />):</strong> <M t="L=0" /> (<M t="f" /> lassabb), <M t="0<L<\infty" /> (azonos ütem), <M t="L=\infty" /> (<M t="f" /> gyorsabb).</li>
            <li><strong>Aranyrangsor:</strong> <M t="1 \ll \ln\ln x \ll \ln x \ll x^p \ll a^x \ll b^x \ll x^x" /> (<M t="p>0,\; 1<a<b" />).</li>
            <li><strong>Kis ordó (<M t="f = o(g)" />):</strong> <M t="\lim f/g = 0" /> · <strong>Nagy ordó (<M t="f = O(g)" />):</strong> <M t="f(x) \le M g(x)" /> (<M t="x \ge x_0" />).</li>
            <li><strong>Keresés:</strong> szekvenciális <M t="O(n)" /> vs. bináris <M t="O(\log_2 n)" /> (rendezett listán!).</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>5 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong>Konstans szorzó nem változtat az ütemen:</strong> <M t="1000x" /> és <M t="x" /> <em>azonos ütemben</em> nőnek!
            </li>
            <li>
              <strong>Logaritmus alapja NEM számít, exponenciális alapja SZÁMÍT:</strong> <M t="\log_2 x" /> és <M t="\log_{10} x" /> azonos ütemű, de <M t="2^x = o(3^x)" />!
            </li>
            <li>
              <strong>Kitevőben szorzó vs. összeadás exponenciálisnál:</strong> <M t="e^{2x} = (e^2)^x" /> gyorsabb <M t="e^x" />-nél, viszont <M t="e^{x+5} = e^5 e^x" /> <em>azonos ütemű</em> <M t="e^x" />-szel!
            </li>
            <li>
              <strong><M t="x = O(x)" /> IGAZ, de <M t="x = o(x)" /> HAMIS!</strong> A kis ordó szigorúan lassabb növekedést követel (<M t="L = 0" />).
            </li>
            <li>
              <strong>Kis <M t="x" />-eken csalóka a grafikon:</strong> mindig a <M t="x\to\infty" /> határértékkel dönts!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={
            <>
              Hasonlítsd össze <M t="x^2" />-tel (<M t="x\to\infty" />): gyorsabb, lassabb vagy azonos ütemű? (a) <M t="x^2 + 100x" />, (b) <M t="x\ln x" />, (c) <M t="1{,}1^x" />, (d) <M t="\sqrt{x^4 + x^3}" />!
            </>
          }
        >
          <p>
            (a) <strong>azonos</strong> (<M t="L=1" />); (b) <strong>lassabb</strong> (<M t="\frac{\ln x}{x}\to 0" />); (c) <strong>gyorsabb</strong> (exponenciális <M t="a>1" />); (d) <strong>azonos</strong> (<M t="\lim\sqrt{1+1/x} = 1" />).
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Hasonlítsd össze <M t="\ln x" />-szel (<M t="x\to\infty" />): (a) <M t="\log_3 x" />, (b) <M t="\ln(\ln x)" />, (c) <M t="\ln(x^{10})" />, (d) <M t="\sqrt{x}" />!
            </>
          }
        >
          <p>
            (a) <strong>azonos</strong>; (b) <strong>lassabb</strong>; (c) <strong>azonos</strong> (<M t="10\ln x" />); (d) <strong>gyorsabb</strong>!
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Igaz vagy hamis (<M t="x\to\infty" />)? (a) <M t="\frac{1}{x+3} = O\!\left(\frac{1}{x}\right)" />, (b) <M t="\ln(\ln x) = O(\ln x)" />, (c) <M t="\ln x = o(\ln(x^2+1))" /> (Thomas 10. feladat)!
            </>
          }
        >
          <p>
            (a) <strong>Igaz</strong> (<M t="\frac{1}{x+3} < \frac{1}{x}" />); (b) <strong>Igaz</strong> (még <M t="o(\ln x)" /> is!); (c) <strong>Hamis</strong> (a hányados határértéke <M t="1/2 \ne 0" />!).
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={
            <>
              Rendezd növekvő ütem szerint (<M t="x\to\infty" />): <M t="2^x,\; x^2,\; (\ln 2)^x,\; e^x" /> (Thomas 8. feladat — vigyázz az egyik alapra!)
            </>
          }
        >
          <p>
            Mivel <M t="\ln 2 \approx 0{,}693 < 1" />, ezért <M t="(\ln 2)^x \to 0" /> (csökkenő!). Tehát a sorrend:
            <M block t="\mathbf{(\ln 2)^x \;\ll\; x^2 \;\ll\; 2^x \;\ll\; e^x}." />
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Igazold, hogy <M t="\sqrt{x^4 + x}" /> és <M t="\sqrt{x^4 - x^3}" /> azonos ütemben nőnek (<M t="x\to\infty" />, Thomas 18. feladat)!
            </>
          }
        >
          <p>
            Mindkettőt elosztva <M t="x^2" />-tel: <M t="\lim\sqrt{1 + 1/x^3} = 1" /> és <M t="\lim\sqrt{1 - 1/x} = 1" />. Tranzitivitással mindkettő <M t="x^2" />-tel (és egymással is!) azonos ütemű ✓
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              A Webster-szótár 450 000 rendezett címszót tartalmaz (Thomas 26. feladat). Legfeljebb hány lépés egy szó megtalálása szekvenciális, illetve bináris kereséssel (<M t="2^{18} = 262\,144,\; 2^{19} = 524\,288" />)?
            </>
          }
        >
          <p>
            Szekvenciálisan legfeljebb <strong>450 000</strong> lépés; bináris kereséssel <M t="\lceil\log_2 450\,000\rceil = \mathbf{19}" /> lépés!
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={
            <>
              <em>Általános eltolás logaritmusban (Thomas 16. feladat):</em> Igazold, hogy bármely <M t="a \in \mathbb{R}" /> konstansra <M t="\displaystyle\lim_{x\to\infty}\frac{\ln(x + a)}{\ln x} = 1" />!
            </>
          }
        >
          <p>
            <M t="x > |a|" /> esetén a hányados <M t="\infty/\infty" />, így L’Hospital-szabállyal:
            <M block t="\lim_{x\to\infty}\frac{\ln(x+a)}{\ln x} = \lim_{x\to\infty}\frac{1/(x+a)}{1/x} = \lim_{x\to\infty}\frac{x}{x+a} = \lim_{x\to\infty}\frac{1}{1 + a/x} = \mathbf{1}." />
            Tehát <M t="\ln(x+a)" /> minden <M t="a" />-ra azonos ütemű <M t="\ln x" />-szel!
          </p>
        </Task>
        <Task
          n={22}
          q={
            <>
              <em>Elméleti tétel (Thomas 11. feladat):</em> Igazold, hogy ha a pozitív <M t="f" /> és <M t="g" /> függvények ugyanabban az ütemben növekednek (<M t="\lim_{x\to\infty} f/g = L \in (0;\,\infty)" />), akkor <M t="f = O(g)" /> ÉS <M t="g = O(f)" />!
            </>
          }
        >
          <p>
            A határérték definíciója miatt (<M t="\varepsilon = L/2" /> választással) létezik olyan <M t="x_0" />, hogy minden <M t="x \ge x_0" /> esetén:
            <M block t="\frac{L}{2} \le \frac{f(x)}{g(x)} \le \frac{3L}{2}." />
            A jobb oldali egyenlőtlenségből <M t="f(x) \le \frac{3L}{2}g(x) \implies f = O(g)" />; a bal oldaliból <M t="g(x) \le \frac{2}{L}f(x) \implies g = O(f)" /> ✓
          </p>
        </Task>
        <Task
          n={23}
          q={
            <>
              <em>Melyik a gyorsabb: <M t="2^{\log_2 x}" /> vagy <M t="x^{\log_2 2}" />? És mi a helyzet <M t="2^{\sqrt{\log_2 x}}" /> vs. <M t="x^{0{,}01}" /> esetén?</em>
            </>
          }
        >
          <p>
            Az első pár trükkös: <M t="2^{\log_2 x} = x" /> és <M t="x^{\log_2 2} = x^1 = x" /> — <strong>pontosan ugyanaz a függvény!</strong>
          </p>
          <p>
            A második párnál vegyük a 2-es alapú logaritmusukat: <M t="\sqrt{\log_2 x}" /> vs. <M t="0{,}01\log_2 x" />. Mivel <M t="\sqrt{u} \ll 0{,}01 u" /> (ha <M t="u = \log_2 x \to \infty" />), ezért <M t="2^{\sqrt{\log_2 x}} = \mathbf{o(x^{0{,}01})}" /> — tehát lassabb minden pozitív hatványnál, de gyorsabb minden logaritmusnál!
          </p>
        </Task>
      </>
    ),
  },
];
