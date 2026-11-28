import { M } from '../components/M';
import { Def, Quiz, Story, Task, Warn } from '../components/ui';
import {
  HorizontalLineTestWidget,
  HorizontalToVerticalTangentWidget,
  InverseMachineWidget,
  MappingArrowDiagram,
  NoFormulaDerivativeWidget,
  ParametricAndAreaWidget,
  ReciprocalSlopeWidget,
  ReflectionGraphWidget,
} from '../components/Widgets71';
import type { Page } from './s1_1';

export const S7_1: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Transzcendens függvények és az injektivitás (horizontális teszt)',
    body: (
      <>
        <Story>
          <p>
            A <strong>7. fejezetben</strong> egy teljesen új világba lépünk: az <em>algebrai függvények</em> (polinomok, törtek, gyökök) után megismerkedünk a <strong>transzcendens függvényekkel</strong> — a természetes logaritmussal (<M t="\ln x" />), az exponenciális függvénnyel (<M t="e^x" />), az inverz trigonometrikus függvényekkel (<M t="\arcsin x, \arctan x" />) és a hiperbolikus függvényekkel. Ezek közös motorja az <strong>inverz függvény</strong> fogalma!
          </p>
        </Story>

        <p>
          Mielőtt egy függvény „hatását visszafordítanánk”, fel kell tennünk a legfontosabb kérdést: <strong>egyáltalán visszafordítható-e minden függvény?</strong> Gondolj az <M t="f(x)=x^2" /> függvényre: mind a <M t="-2" />, mind a <M t="+2" /> bemenetre ugyanazt a <M t="4" /> kimenetet adja. Ha valaki azt mondja, hogy a kimenet <M t="4" /> volt, nem tudod egyértelműen megmondani, honnan indultunk!
        </p>

        <Def title="Injektív (egy-egyértelmű) függvény">
          <p>
            Egy <M t="f" /> függvényt a <M t="D" /> értelmezési tartományán <strong>injektívnek</strong> (vagy <em>egy-egyértelműnek</em>) nevezünk, ha különböző bemenetekhez mindig különböző kimeneteket rendel:
          </p>
          <M block t="x_1 \ne x_2 \;\implies\; f(x_1) \ne f(x_2) \qquad (\text{minden } x_1, x_2 \in D\text{-re})." />
          <p>
            Ekvivalens megfogalmazás (bizonyításoknál ez a leghasznosabb!):
          </p>
          <M block t="f(x_1) = f(x_2) \;\implies\; x_1 = x_2." />
        </Def>

        <MappingArrowDiagram />

        <p>
          Geometriailag rendkívül egyszerű felismerni az injektivitást. Mivel egy adott <M t="y=c" /> magasságban lévő vízszintes egyenes pontosan azokat a pontokat metszi ki a grafikonból, ahol <M t="f(x)=c" />, azonnal adódik a <strong>horizontális teszt</strong>:
        </p>

        <Def title="Horizontális teszt és a monotonitás szerepe">
          <ul>
            <li>
              <strong>Horizontális (vízszintes egyenes) teszt:</strong> Egy <M t="y=f(x)" /> függvény pontosan akkor injektív, ha <strong>egyetlen vízszintes egyenes sem metszi a grafikonját egynél több pontban</strong>.
            </li>
            <li>
              <strong>Monotonitás → injektivitás (kapcsolat a 4.3-as szakasszal):</strong> Ha <M t="f" /> egy intervallumon <em>szigorúan növekvő</em> (<M t="x_1 < x_2 \implies f(x_1) < f(x_2)" />) vagy <em>szigorúan csökkenő</em>, akkor biztosan injektív! Differenciálható függvénynél ehhez elég ellenőrizni, hogy <M t="f'(x) > 0" /> vagy <M t="f'(x) < 0" /> az intervallumon (véges sok pontban akár nulla is lehet, mint <M t="x^3" />-nál <M t="x=0" />-ban).
            </li>
            <li>
              <strong>Tartományszűkítés:</strong> Ha egy függvény nem injektív a teljes tartományán (mint <M t="x^2" /> vagy <M t="\sin x" />), akkor egy <em>szigorúan monoton részintervallumra szűkítve</em> már injektívvé tehető!
            </li>
          </ul>
        </Def>

        <HorizontalLineTestWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Igazold algebrailag és a derivált segítségével is, hogy az <M t="f(x) = 4x - 7" /> és a <M t="g(x) = x^3 + 5x" /> függvények injektívek a teljes <M t="\mathbb{R}" />-en!
            </>
          }
        >
          <p>
            <strong>Algebrailag <M t="f" />-re:</strong> <M t="4x_1 - 7 = 4x_2 - 7 \implies 4x_1 = 4x_2 \implies x_1 = x_2" />, tehát <M t="f" /> injektív.
          </p>
          <p>
            <strong>Deriválttal <M t="g" />-re:</strong> <M t="g'(x) = 3x^2 + 5 \ge 5 > 0" /> minden <M t="x\in\mathbb{R}" />-re. Ezért <M t="g" /> szigorúan növekvő egész <M t="\mathbb{R}" />-en, így biztosan injektív!
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Miért <em>nem</em> injektív a <M t="h(x) = \cos x" /> a <M t="[0;\,2\pi]" /> intervallumon, és adj meg egy olyan maximális intervallumot, amelyen már injektív!
            </>
          }
        >
          <p>
            Mert például <M t="\cos(0) = \cos(2\pi) = 1" /> (vagy <M t="\cos(\pi/3) = \cos(5\pi/3) = 1/2" />), vagyis ugyanazt az értéket többször felveszi. A <M t="[0;\,\pi]" /> intervallumon viszont szigorúan csökkenő (<M t="h'(x) = -\sin x < 0" /> a belsejében), így <M t="[0;\,\pi]" />-n injektív!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Az inverz függvény definíciója és a kétoldali semlegesítés',
    body: (
      <>
        <Story>
          <p>
            Ha egy függvény injektív, akkor minden kimenethez <em>pontosan egy</em> bemenet tartozik — vagyis a nyilakat megfordíthatjuk! Az így kapott visszafordító szabályt nevezzük <strong>inverz függvénynek</strong>.
          </p>
        </Story>

        <Def title="Az inverz függvény definíciója">
          <p>
            Legyen <M t="f" /> injektív függvény, amelynek értelmezési tartománya <M t="D" />, értékkészlete pedig <M t="R" />. Az <M t="f" /> függvény <M t="f^{-1}" /> <strong>inverz függvénye</strong> az <M t="R" /> halmazon értelmezett függvény, amelyre:
          </p>
          <M block t="f^{-1}(b) = a \;\iff\; f(a) = b \qquad (a \in D,\; b \in R)." />
          <ul>
            <li>
              <strong>Tartomány és értékkészlet felcserélődése:</strong> <M t="D_{f^{-1}} = R_f" /> és <M t="R_{f^{-1}} = D_f" />.
            </li>
            <li>
              <strong>Kétoldali semlegesítési azonosságok:</strong>
              <M block t="(f^{-1} \circ f)(x) = f^{-1}\!\bigl(f(x)\bigr) = x \quad (\forall\, x \in D_f), \qquad (f \circ f^{-1})(y) = f\!\bigl(f^{-1}(y)\bigr) = y \quad (\forall\, y \in R_f)." />
            </li>
          </ul>
        </Def>

        <Warn>
          <p>
            Az <M t="f^{-1}(x)" /> jelölésben a <M t="-1" /> felső index <strong>NEM kitevő és NEM a reciprokot jelenti!</strong>
          </p>
          <M block t="f^{-1}(x) \;\ne\; \frac{1}{f(x)} \;=\; \bigl[f(x)\bigr]^{-1}." />
          <p>
            Például <M t="f(x) = 2x" /> esetén az inverz függvény <M t="f^{-1}(x) = \frac{x}{2}" /> (mert a felezés semlegesíti a duplázást), míg a reciprok <M t="\frac{1}{2x}" /> — a kettő teljesen más függvény!
          </p>
        </Warn>

        <p>
          A kétoldali semlegesítés szemléletes jelentése: ha egy <M t="x" /> számot bedobsz az <M t="f" /> gépbe, majd az eredményt továbbküldöd az <M t="f^{-1}" /> gépbe, pontosan visszakapod az eredeti <M t="x" /> számot — mintha semmi sem történt volna! Próbáld ki az alábbi interaktív gépsoron:
        </p>

        <InverseMachineWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Ellenőrizd mindkét kompozícióval (<M t="f(g(x))" /> és <M t="g(f(x))" />), hogy az <M t="f(x) = 3x - 6" /> és a <M t="g(x) = \frac{1}{3}x + 2" /> függvények egymás inverzei!
            </>
          }
        >
          <p>
            <M t="f(g(x)) = 3\left(\frac{1}{3}x + 2\right) - 6 = x + 6 - 6 = x" />, és{' '}
            <M t="g(f(x)) = \frac{1}{3}(3x - 6) + 2 = x - 2 + 2 = x" />. Mindkét sorrendben az identitást kaptuk, tehát <M t="g = f^{-1}" /> ✓
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Legyen <M t="f(x) = \sqrt{x - 3}" />. Add meg <M t="f" /> értelmezési tartományát és értékkészletét, majd ezek alapján mondd meg <M t="f^{-1}" /> értelmezési tartományát és értékkészletét anélkül is, hogy kiszámolnád a képletét!
            </>
          }
        >
          <p>
            A gyök alatti kifejezés nemnegatív, így <M t="D_f = [3;\,\infty)" />, a négyzetgyök értékei pedig <M t="R_f = [0;\,\infty)" />. A tartománycseréből azonnal következik: <M t="D_{f^{-1}} = [0;\,\infty)" /> és <M t="R_{f^{-1}} = [3;\,\infty)" />. (A képlet egyébként <M t="f^{-1}(x) = x^2 + 3,\; x \ge 0" />.)
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Az inverz képletének megkeresése és a tükrözés az y = x egyenesre',
    body: (
      <>
        <Story>
          <p>
            Hogyan kapjuk meg konkrétan az <M t="f^{-1}(x)" /> képletét, és hogyan néz ki a grafikonja <M t="f(x)" /> grafikonjához képest? A válasz egyszerre algebrai (változócsere) és gyönyörűen geometriai (tükrözés)!
          </p>
        </Story>

        <Def title="Az f⁻¹(x) képletének 2 lépéses receptje">
          <p>Egy injektív <M t="y = f(x)" /> függvény inverzének meghatározása:</p>
          <ol className="steps">
            <li>
              <strong>Fejezd ki <M t="x" />-et <M t="y" /> segítségével</strong> az <M t="y = f(x)" /> egyenletből! Ezzel megkapod az <M t="x = f^{-1}(y)" /> összefüggést (itt még <M t="y" /> a bemenet és <M t="x" /> a kimenet).
            </li>
            <li>
              <strong>Cseréld fel <M t="x" />-et és <M t="y" />-t!</strong> Ezzel az inverz függvényt a megszokott <M t="y = f^{-1}(x)" /> alakba írod át, hogy ugyanabban a koordináta-rendszerben ábrázolhasd.
            </li>
          </ol>
        </Def>

        <p>
          <strong>Kidolgozott példa (racionális törtfüggvény):</strong> Keressük meg az <M t="f(x) = \dfrac{2x + 1}{x - 1}" /> (<M t="x \ne 1" />) függvény inverzét!
        </p>
        <M block t="y = \frac{2x+1}{x-1} \;\implies\; y(x-1) = 2x+1 \;\implies\; xy - 2x = y + 1 \;\implies\; x(y-2) = y+1 \;\implies\; x = \frac{y+1}{y-2}." />
        <p>
          Most cseréljük fel <M t="x" />-et és <M t="y" />-t: <M t="f^{-1}(x) = \dfrac{x + 1}{x - 2}" /> (<M t="x \ne 2" />). Figyeld meg, hogy <M t="f" /> függőleges aszimptotája (<M t="x=1" />) átalakult <M t="f^{-1}" /> vízszintes aszimptotájává (<M t="y=1" />), míg <M t="f" /> vízszintes aszimptotája (<M t="y=2" />) lett <M t="f^{-1}" /> függőleges aszimptotája (<M t="x=2" />)!
        </p>

        <p>
          <strong>Miért pontosan az <M t="y = x" /> egyenesre való tükrözés a grafikon?</strong> Ha a <M t="P(a;\,b)" /> pont rajta van <M t="f" /> grafikonján (tehát <M t="b = f(a)" />), akkor a definíció szerint <M t="a = f^{-1}(b)" />, vagyis a <M t="Q(b;\,a)" /> pont rajta van <M t="f^{-1}" /> grafikonján. A <M t="PQ" /> szakasz felezőpontja <M t="\left(\frac{a+b}{2};\,\frac{a+b}{2}\right)" />, amely rajta van az <M t="y=x" /> egyenesen, meredeksége pedig <M t="\frac{a-b}{b-a} = -1" />, ami merőleges az <M t="y=x" /> egyenes <M t="+1" />-es meredekségére! Tehát <M t="Q" /> valóban <M t="P" /> tükörképe az <M t="y=x" /> egyenesre!
        </p>

        <ReflectionGraphWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Határozd meg az <M t="f(x) = x^2 - 4" /> (<M t="x \ge 0" />) függvény inverzét, értelmezési tartományával együtt! Mi lenne az inverz, ha a tartományt <M t="x \le 0" />-ra szűkítenénk?
            </>
          }
        >
          <p>
            <M t="y = x^2 - 4 \implies x^2 = y + 4 \implies |x| = \sqrt{y + 4}" />.
          </p>
          <ul>
            <li>Ha <M t="x \ge 0" />, akkor <M t="x = +\sqrt{y+4}" />, csere után: <M t="f^{-1}(x) = \mathbf{\sqrt{x + 4}}" />, tartománya <M t="[-4;\,\infty)" />.</li>
            <li>Ha <M t="x \le 0" />, akkor <M t="x = -\sqrt{y+4}" />, csere után: <M t="f^{-1}(x) = \mathbf{-\sqrt{x + 4}}" />, tartománya szintén <M t="[-4;\,\infty)" />.</li>
          </ul>
        </Task>
        <Task
          n={6}
          q={
            <>
              Igazold, hogy az <M t="f(x) = -x + 5" /> függvény <em>saját magának az inverze</em>! Mit jelent ez geometriailag a grafikonjára nézve?
            </>
          }
        >
          <p>
            <M t="y = -x + 5 \implies x = -y + 5" />, csere után <M t="f^{-1}(x) = -x + 5 = f(x)" />! Geometriailag ez azt jelenti, hogy az <M t="y = -x + 5" /> egyenes <strong>merőleges</strong> az <M t="y = x" /> tükörtengelyre, ezért önmagába tükröződik!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Miért egymás reciprokai a meredekségek? (Háromféle szemlélet)',
    body: (
      <>
        <Story>
          <p>
            Elérkeztünk a 7.1-es szakasz szívéhez: <strong>hogyan deriváljunk egy inverz függvényt?</strong> A válasz meglepően elegáns — és mielőtt felírnánk a tételt, nézzük meg <em>három különböző szemszögből</em>, miért pont a meredekség <strong>reciproka</strong> jelenik meg!
          </p>
        </Story>

        <Def title="Három egymást erősítő magyarázat a reciprok-szabályra">
          <ol className="steps">
            <li>
              <strong>Geometriai tükrözés (meredekségi háromszög):</strong> Ha egy egyenes (vagy érintő) meredeksége <M t="m = \dfrac{\Delta y}{\Delta x}" />, akkor az <M t="y = x" /> egyenesre tükrözve minden <M t="x" />-lépésből <M t="y" />-lépés lesz és fordítva (<M t="\Delta x \leftrightarrow \Delta y" />). A tükrözött érintő meredeksége ezért pontosan:
              <M block t="m_{\text{tükör}} = \frac{\Delta x}{\Delta y} = \frac{1}{\Delta y / \Delta x} = \frac{1}{m}." />
            </li>
            <li>
              <strong>Differenciálok és változási sebesség (Leibniz-szemlélet):</strong> Az <M t="x = a" /> helyen a kis változások aránya <M t="dy = f'(a)\,dx" />, vagyis <M t="y" /> pontosan <M t="f'(a)" />-szor olyan gyorsan változik, mint <M t="x" />. Megfordítva: <M t="x" /> pontosan <M t="\dfrac{1}{f'(a)}" />-szor olyan gyorsan változik, mint <M t="y" />:
              <M block t="\frac{dx}{dy} = \frac{1}{dy/dx}." />
            </li>
            <li>
              <strong>Láncszabály (algebrai ellenőrzés):</strong> Ha már tudjuk, hogy <M t="f^{-1}" /> differenciálható, akkor az <M t="f\bigl(f^{-1}(x)\bigr) = x" /> azonosság mindkét oldalát <M t="x" /> szerint deriválva:
              <M block t="f'\!\bigl(f^{-1}(x)\bigr) \cdot (f^{-1})'(x) = 1 \;\implies\; (f^{-1})'(x) = \frac{1}{f'\!\bigl(f^{-1}(x)\bigr)}." />
            </li>
          </ol>
        </Def>

        <p>
          Mozgasd a csúszkát az alábbi ábrán, és figyeld meg a <strong>két sárga meredekségi háromszöget</strong>! Látni fogod, hogy a kék görbén a vízszintes <M t="\Delta x" /> és függőleges <M t="\Delta y" /> pontosan felcserélődik a zöld görbén — ezért ha a kék érintő meredek (<M t="m = 3" />), a zöld érintő lapos (<M t="1/3" />), és fordítva!
        </p>

        <ReciprocalSlopeWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Az <M t="f" /> injektív függvény grafikonja átmegy a <M t="(3;\,7)" /> ponton, és ott az érintője meredeksége <M t="f'(3) = 5" />. Melyik ponton megy át biztosan <M t="f^{-1}" /> grafikonja, és mekkora ott a meredeksége?
            </>
          }
        >
          <p>
            A koordináták felcserélődnek, tehát <M t="f^{-1}" /> átmegy a <M t="\mathbf{(7;\,3)}" /> ponton, a meredeksége pedig a reciprok: <M t="(f^{-1})'(7) = \dfrac{1}{f'(3)} = \mathbf{\dfrac{1}{5}}" />.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Igazold egy konkrét <M t="y = mx + c" /> (<M t="m \ne 0" />) egyenesre közvetlen számítással, hogy az inverzének meredeksége <M t="1/m" />!
            </>
          }
        >
          <p>
            <M t="y = mx + c \implies x = \frac{1}{m}y - \frac{c}{m}" />, csere után <M t="f^{-1}(x) = \frac{1}{m}x - \frac{c}{m}" />. Ennek az egyenesnek a meredeksége valóban <M t="\mathbf{\frac{1}{m}}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Az 1. Tétel: az inverz függvény deriváltja (és az f′(a) = 0 csapda)',
    body: (
      <>
        <Story>
          <p>
            Most fogalmazzuk meg precízen a tankönyv központi tételét! Figyelj különösen a feltételre: <strong>miért követeli meg a tétel, hogy <M t="f'(x) \ne 0" /> legyen?</strong>
          </p>
        </Story>

        <Def title="1. Tétel — Az inverz függvény deriváltja">
          <p>
            Legyen <M t="f" /> az <M t="I" /> intervallumon értelmezett injektív függvény. Ha <M t="f" /> az <M t="I" /> minden pontjában differenciálható, és <M t="f'(x) \ne 0" /> minden <M t="x \in I" />-re, akkor az <M t="f^{-1}" /> inverz függvény a teljes értelmezési tartományán differenciálható, és bármely <M t="b = f(a)" /> pontban:
          </p>
          <M block t="(f^{-1})'(b) \;=\; \frac{1}{f'\!\bigl(f^{-1}(b)\bigr)} \;=\; \frac{1}{f'(a)}, \qquad\text{más jelöléssel:}\qquad \left.\frac{df^{-1}}{dx}\right|_{x=b} \;=\; \frac{1}{\left.\dfrac{df}{dx}\right|_{x=f^{-1}(b)}}." />
        </Def>

        <p>
          <strong>Mit jelent a képlet alkalmazása konkrét függvényre?</strong> Nézzük az <M t="f(x) = x^2" /> (<M t="x > 0" />) függvényt! Tudjuk, hogy <M t="f'(x) = 2x" /> és <M t="f^{-1}(x) = \sqrt{x}" />. Az 1. Tétel szerint:
        </p>
        <M block t="(f^{-1})'(x) = \frac{1}{f'\!\bigl(f^{-1}(x)\bigr)} = \frac{1}{2\cdot f^{-1}(x)} = \frac{1}{2\sqrt{x}}." />
        <p>
          Pontosan visszakaptuk a <M t="(\sqrt{x})' = \frac{1}{2\sqrt{x}}" /> hatványszabályt! Egy konkrét pontban, például <M t="a=2,\; b=f(2)=4" /> esetén: <M t="f'(2) = 4" />, így <M t="(f^{-1})'(4) = \frac{1}{4}" />.
        </p>

        <p>
          <strong>És mi történik, ha <M t="f'(a) = 0" />?</strong> Ha az <M t="f" /> görbének az <M t="(a;\,b)" /> pontban <em>vízszintes érintője</em> van (<M t="m = 0" />), akkor az <M t="y = x" /> egyenesre tükrözve ez az érintő <strong>függőleges érintővé</strong> válik <M t="f^{-1}" /> grafikonján a <M t="(b;\,a)" /> pontban! A függőleges érintőnek viszont nincs véges meredeksége (<M t="1/0" />), tehát <M t="f^{-1}" /> ott <strong>nem differenciálható</strong>! Húzd el a csúszkát <M t="a = 0" />-hoz, és nézd meg élőben az <M t="x^3 \leftrightarrow \sqrt[3]{x}" /> páron:
        </p>

        <HorizontalToVerticalTangentWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Alkalmazd az 1. Tételt az <M t="f(x) = x^3" /> (<M t="x \ne 0" />) függvényre, hogy levezesd az <M t="f^{-1}(x) = \sqrt[3]{x}" /> deriváltképletét!
            </>
          }
        >
          <p>
            <M t="f'(x) = 3x^2" />, és <M t="f^{-1}(x) = x^{1/3}" />. Az 1. Tétel alapján:
          </p>
          <M block t="(f^{-1})'(x) = \frac{1}{f'\!\bigl(f^{-1}(x)\bigr)} = \frac{1}{3\bigl(x^{1/3}\bigr)^2} = \mathbf{\frac{1}{3x^{2/3}}} \quad (x \ne 0)." />
        </Task>
        <Task
          n={10}
          q={
            <>
              Az <M t="f(x) = (x - 2)^3 + 5" /> függvény injektív egész <M t="\mathbb{R}" />-en. Melyik <M t="b" /> pontban <em>nem</em> differenciálható az <M t="f^{-1}" /> inverz függvénye?
            </>
          }
        >
          <p>
            <M t="f'(x) = 3(x-2)^2 = 0 \iff x = 2" />. Az ehhez tartozó függvényérték <M t="b = f(2) = 5" />. Tehát <M t="f^{-1}" /> a <M t="\mathbf{b = 5}" /> helyen nem differenciálható (ott függőleges érintője van).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Deriválás az inverz képlete NÉLKÜL! (A tétel szuperereje)',
    body: (
      <>
        <Story>
          <p>
            Próbáld meg kifejezni <M t="x" />-et az <M t="y = x^5 + x + 1" /> vagy az <M t="y = x^3 + 2x - 1" /> egyenletből! Az ötödfokú egyenletet <em>elvileg sem</em> lehet gyökjelekkel megoldani (Abel–Ruffini-tétel) — az 1. Tétel segítségével mégis <strong>10 másodperc alatt</strong> ki tudjuk számolni <M t="(f^{-1})'(b)" /> pontos értékét!
          </p>
        </Story>

        <Def title="4 lépéses recept: (f⁻¹)′(b) meghatározása f⁻¹ képlete nélkül">
          <ol className="steps">
            <li>
              <strong>Ellenőrizd az injektivitást:</strong> mutasd meg, hogy <M t="f'(x) > 0" /> (vagy <M t="< 0" />) a tartományon, így <M t="f" /> szigorúan monoton, tehát minden <M t="b" />-hez <em>legfeljebb egy</em> <M t="a" /> tartozik!
            </li>
            <li>
              <strong>Találd meg azt az <M t="a" /> számot, amelyre <M t="f(a) = b" />!</strong> (Ez a pont az <M t="a = f^{-1}(b)" />. Gyakran egyszerű kis egész szám: <M t="0, \pm 1, \pm 2" />.)
            </li>
            <li>
              <strong>Számítsd ki <M t="f'(a)" />-t!</strong> <em>(Vigyázat: mindig az <M t="a" /> számot helyettesítsd be <M t="f'" />-be, SOHA NE <M t="b" />-t!)</em>
            </li>
            <li>
              <strong>Vedd a reciprokát:</strong> <M t="(f^{-1})'(b) = \dfrac{1}{f'(a)}" />.
            </li>
          </ol>
        </Def>

        <p>
          <strong>Kidolgozott nagypélda:</strong> Legyen <M t="f(x) = x^3 + 2x - 1" />. Határozzuk meg <M t="(f^{-1})'(2)" /> értékét, és írjuk fel az <M t="f^{-1}" /> grafikonjához a <M t="b = 2" /> abszcisszájú pontban húzott érintő egyenletét!
        </p>
        <ol className="steps">
          <li><M t="f'(x) = 3x^2 + 2 \ge 2 > 0" /> minden <M t="x\in\mathbb{R}" />-re ⇒ <M t="f" /> szigorúan növekvő, tehát injektív.</li>
          <li>Keressük <M t="a" />-t: <M t="a^3 + 2a - 1 = 2 \iff a^3 + 2a - 3 = 0" />. Kipróbálva <M t="a = 1" />-et: <M t="1 + 2 - 3 = 0" /> ✓ (és a szigorú monotonitás miatt ez az <em>egyetlen</em> megoldás!). Tehát <M t="f^{-1}(2) = 1" />.</li>
          <li><M t="f'(1) = 3(1)^2 + 2 = 5" />.</li>
          <li><M t="(f^{-1})'(2) = \dfrac{1}{f'(1)} = \mathbf{\dfrac{1}{5}}" />. Az érintő a <M t="(2;\,1)" /> pontban: <M t="y - 1 = \frac{1}{5}(x - 2) \implies y = \mathbf{\frac{1}{5}x + \frac{3}{5}}" />.</li>
        </ol>

        <NoFormulaDerivativeWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Legyen <M t="f(x) = x^3 - 2" />. Számítsd ki <M t="(f^{-1})'(6)" /> értékét az <M t="f^{-1}" /> képletének felírása nélkül!
            </>
          }
        >
          <p>
            <M t="f(a) = a^3 - 2 = 6 \implies a^3 = 8 \implies a = 2" />. A derivált <M t="f'(x) = 3x^2" />, így <M t="f'(2) = 12" />. Ezért:
            <M block t="(f^{-1})'(6) = \frac{1}{f'(2)} = \mathbf{\frac{1}{12}}." />
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Legyen <M t="f(x) = 2x + \sin x" />. Igazold, hogy <M t="f" /> invertálható egész <M t="\mathbb{R}" />-en, és számítsd ki <M t="(f^{-1})'(0)" /> értékét!
            </>
          }
        >
          <p>
            <M t="f'(x) = 2 + \cos x \ge 2 - 1 = 1 > 0" /> mindenütt ⇒ <M t="f" /> szigorúan növekvő, tehát invertálható. Mivel <M t="f(0) = 0 + \sin 0 = 0" />, ezért <M t="a = 0" />, és <M t="f'(0) = 2 + \cos 0 = 3" />. Így <M t="(f^{-1})'(0) = \mathbf{\dfrac{1}{3}}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Inverz függvény paraméterezése és az integrálos terület-csoda',
    body: (
      <>
        <Story>
          <p>
            Ha nem tudjuk felírni <M t="f^{-1}(x)" /> képletét, hogyan rajzolhatjuk mégis meg pontosan a grafikonját számítógéppel — és hogyan tudjuk integrálni? Mindkettőre létezik egy meglepően egyszerű, gyönyörű trükk!
          </p>
        </Story>

        <Def title="1. Inverz függvény paraméteres alakja (kapcsolat a 3.5-tel)">
          <p>
            Az <M t="y = f(x)" /> grafikon paraméteresen <M t="x = t,\; y = f(t)" />. Az <M t="f^{-1}" /> inverz grafikonját egyszerűen a két koordináta felcserélésével kapjuk:
          </p>
          <M block t="f\text{ grafikonja: } \begin{cases} x = t \\ y = f(t) \end{cases} \qquad\longleftrightarrow\qquad f^{-1}\text{ grafikonja: } \begin{cases} x = f(t) \\ y = t \end{cases}" />
          <p>
            Ráadásul a 3.5-ös szakasz paraméteres deriválási szabályából <em>egyetlen sorban</em> visszakapjuk az inverz deriváltját:
            <M block t="\frac{dy}{dx} = \frac{dy/dt}{dx/dt} = \frac{1}{f'(t)}." />
          </p>
        </Def>

        <Def title="2. A két görbe alatti területek összege (Young-féle terület-tétel)">
          <p>
            Ha <M t="f" /> folytonos, szigorúan növekvő és pozitív az <M t="[a;\,b]" /> intervallumon (<M t="a \ge 0" />), akkor az <M t="f" /> alatti terület és az <M t="f^{-1}" /> alatti terület együtt pontosan egy L alakú téglalapkülönbséget tölt ki:
          </p>
          <M block t="\int_{a}^{b} f(x)\,dx \;+\; \int_{f(a)}^{f(b)} f^{-1}(y)\,dy \;=\; b\,f(b) - a\,f(a)." />
          <p>
            Ebből azonnal kiszámíthatjuk <M t="\int f^{-1}(y)\,dy" /> értékét <strong>úgy is, hogy az inverz primitív függvényét egyáltalán nem ismerjük!</strong>
          </p>
        </Def>

        <ParametricAndAreaWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Add meg az <M t="f(x) = x^3 + x" /> függvény inverzének paraméteres egyenleteit, majd a paraméteres deriválással (<M t="dy/dx = (dy/dt)/(dx/dt)" />) számítsd ki a meredekségét a <M t="t = 1" /> paraméterhez tartozó pontban!
            </>
          }
        >
          <p>
            Paraméteres alak: <M t="x(t) = t^3 + t,\; y(t) = t" />. A <M t="t=1" /> paraméterhez a <M t="(2;\,1)" /> pont tartozik, a meredekség pedig:
            <M block t="\left.\frac{dy}{dx}\right|_{t=1} = \frac{1}{3t^2 + 1}\Big|_{t=1} = \mathbf{\frac{1}{4}}." />
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Használd a terület-tételt az <M t="f(x) = x^3" /> függvényre a <M t="[0;\,2]" /> intervallumon, hogy kiszámítsd <M t="\displaystyle\int_{0}^{8} \sqrt[3]{y}\,dy" /> értékét gyökvonásos integrálás nélkül!
            </>
          }
        >
          <p>
            <M t="a=0,\; b=2,\; f(0)=0,\; f(2)=8" />. A tétel szerint:
            <M block t="\int_{0}^{8}\sqrt[3]{y}\,dy = 2\cdot 8 - 0\cdot 0 - \int_{0}^{2} x^3\,dx = 16 - \left[\frac{x^4}{4}\right]_{0}^{2} = 16 - 4 = \mathbf{12}." />
            (Ellenőrzés: <M t="\left[\frac{3}{4}y^{4/3}\right]_0^8 = \frac{3}{4}\cdot 16 = 12" /> ✓)
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
        <Def title="7.1 Puskakártya">
          <ul>
            <li><strong>Injektivitás:</strong> <M t="x_1 \ne x_2 \implies f(x_1) \ne f(x_2)" /> · Horizontális teszt: minden vízszintes egyenes legfeljebb 1 pontban metszi a grafikont. Szigorúan monoton ⇒ injektív!</li>
            <li><strong>Inverz függvény:</strong> <M t="f^{-1}(b) = a \iff f(a) = b" /> · <M t="D_{f^{-1}} = R_f,\; R_{f^{-1}} = D_f" /> · <M t="f^{-1}(f(x)) = x,\; f(f^{-1}(y)) = y" />.</li>
            <li><strong>Képlet és grafikon:</strong> fejezd ki <M t="x" />-et, majd cseréld fel <M t="x" />-et és <M t="y" />-t · a grafikon az <M t="y=x" /> egyenesre való tükörkép.</li>
            <li><strong>1. Tétel (inverz deriváltja):</strong> ha <M t="f'(a) \ne 0" /> és <M t="b = f(a)" />, akkor <M t="(f^{-1})'(b) = \dfrac{1}{f'(a)} = \dfrac{1}{f'(f^{-1}(b))}" />.</li>
            <li><strong>Paraméterezés &amp; terület:</strong> <M t="f^{-1}:\; x=f(t),\; y=t" /> · <M t="\int_a^b f + \int_{f(a)}^{f(b)} f^{-1} = b f(b) - a f(a)" />.</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>5 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong>Inverz ≠ reciprok:</strong> <M t="f^{-1}(x) \ne \dfrac{1}{f(x)}" />! A <M t="-1" /> itt függvény-inverzet jelent, nem hatványkitevőt.
            </li>
            <li>
              <strong>A leggyakoribb vizsgahiba — rossz pontba helyettesítés:</strong> <M t="(f^{-1})'(b) = \dfrac{1}{f'(a)}" />, ahol <M t="f(a)=b" />! <em>Soha ne <M t="b" />-t írd be <M t="f'" />-be!</em>
            </li>
            <li>
              <strong>Vízszintes érintő (<M t="f'(a)=0" />):</strong> ilyenkor <M t="f^{-1}" /> a <M t="b=f(a)" /> pontban függőleges érintőt kap, tehát ott <em>nem differenciálható</em> (pl. <M t="\sqrt[3]{x}" /> a <M t="0" />-ban).
            </li>
            <li>
              <strong>Tartomány elfelejtése:</strong> <M t="y=x^2" /> csak szűkített tartományon (<M t="x\ge 0" /> vagy <M t="x\le 0" />) invertálható; <M t="\sqrt{x^2}=|x|" />, nem automatikusan <M t="x" />!
            </li>
            <li>
              <strong>Előjel megtartása:</strong> ha <M t="f" /> szigorúan csökkenő (<M t="f'(a) < 0" />), akkor <M t="f^{-1}" /> is szigorúan csökkenő, hiszen egy negatív szám reciproka is negatív!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={
            <>
              Határozd meg az <M t="f(x) = \frac{1}{3}x + \frac{5}{6}" /> függvény inverzét, majd igazold az 1. Tétellel és közvetlen deriválással is, hogy <M t="(f^{-1})'(x) = 3" />!
            </>
          }
        >
          <p>
            <M t="y = \frac{1}{3}x + \frac{5}{6} \implies x = 3y - \frac{5}{2}" />, csere után <M t="f^{-1}(x) = \mathbf{3x - \frac{5}{2}}" />. Közvetlen deriválással <M t="(f^{-1})'(x) = 3" />; az 1. Tétellel <M t="f'(x) = \frac{1}{3} \implies (f^{-1})'(x) = \frac{1}{1/3} = \mathbf{3}" /> ✓
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Legyen <M t="f(x) = 1 - 8x^3" />. Igazold, hogy <M t="f" /> injektív egész <M t="\mathbb{R}" />-en, és add meg <M t="f^{-1}(x)" /> képletét!
            </>
          }
        >
          <p>
            <M t="f'(x) = -24x^2 \le 0" /> (csak <M t="x=0" />-ban nulla), így <M t="f" /> szigorúan csökkenő egész <M t="\mathbb{R}" />-en ⇒ injektív.
            <M block t="y = 1 - 8x^3 \implies x^3 = \frac{1-y}{8} \implies x = \frac{\sqrt[3]{1-y}}{2} \implies f^{-1}(x) = \mathbf{\frac{\sqrt[3]{1-x}}{2}}." />
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Egy injektív <M t="f" /> függvényről tudjuk, hogy <M t="f(4) = -2" /> és <M t="f'(4) = -3" />. Mennyi <M t="f^{-1}(-2)" /> és <M t="(f^{-1})'(-2)" />?
            </>
          }
        >
          <p>
            Definícióból <M t="f^{-1}(-2) = \mathbf{4}" />. Az 1. Tétel alapján: <M t="(f^{-1})'(-2) = \dfrac{1}{f'(4)} = \mathbf{-\dfrac{1}{3}}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={
            <>
              Legyen <M t="f(x) = x^3 + 3x + 2" />. Számítsd ki <M t="(f^{-1})'(6)" /> értékét az inverz képlete nélkül!
            </>
          }
        >
          <p>
            <M t="f'(x) = 3x^2 + 3 \ge 3 > 0" /> ⇒ injektív. Keressük <M t="a" />-t: <M t="a^3 + 3a + 2 = 6 \implies a^3 + 3a - 4 = 0" />. Behelyettesítve <M t="a=1" />: <M t="1 + 3 - 4 = 0" /> ✓. Mivel <M t="f'(1) = 3(1)^2 + 3 = 6" />:
            <M block t="(f^{-1})'(6) = \frac{1}{f'(1)} = \mathbf{\frac{1}{6}}." />
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Legyen <M t="f(x) = x^2 - 4x + 5" /> az <M t="x \ge 2" /> tartományon. Határozd meg <M t="f^{-1}(x)" /> képletét és <M t="(f^{-1})'(10)" /> értékét kétféleképp (közvetlenül és az 1. Tétellel)!
            </>
          }
        >
          <p>
            Teljes négyzetté alakítva <M t="y = (x-2)^2 + 1" />. Mivel <M t="x \ge 2" />, ezért <M t="x - 2 = \sqrt{y - 1} \implies f^{-1}(x) = \mathbf{2 + \sqrt{x - 1}}" /> (<M t="x \ge 1" />).
          </p>
          <ul>
            <li><strong>Közvetlenül:</strong> <M t="(f^{-1})'(x) = \frac{1}{2\sqrt{x-1}} \implies (f^{-1})'(10) = \frac{1}{2\sqrt{9}} = \mathbf{\frac{1}{6}}" />.</li>
            <li><strong>1. Tétellel:</strong> <M t="f(a)=10 \implies (a-2)^2=9 \implies a=5" /> (mert <M t="a\ge 2" />). <M t="f'(x) = 2x - 4 \implies f'(5) = 6 \implies (f^{-1})'(10) = \mathbf{\frac{1}{6}}" /> ✓</li>
          </ul>
        </Task>
        <Task
          n={20}
          q={
            <>
              Írd fel az <M t="f(x) = x^5 + 2x^3 + x - 4" /> függvény inverzének grafikonjához az <M t="x = 0" /> helyen húzott érintő egyenletét!
            </>
          }
        >
          <p>
            <M t="f'(x) = 5x^4 + 6x^2 + 1 \ge 1 > 0" /> ⇒ injektív. Keressük <M t="a = f^{-1}(0)" />-t: <M t="a^5 + 2a^3 + a - 4 = 0 \implies a = 1" /> (mert <M t="1 + 2 + 1 - 4 = 0" />). Így az érintési pont <M t="(0;\,1)" />. A meredekség: <M t="f'(1) = 5 + 6 + 1 = 12 \implies (f^{-1})'(0) = \frac{1}{12}" />. Az érintő egyenlete:
            <M block t="y - 1 = \frac{1}{12}(x - 0) \;\implies\; \mathbf{y = \frac{1}{12}x + 1}." />
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={
            <>
              <em>Lineáris törtfüggvény invertálhatósága (Thomas 50. feladat):</em> Milyen feltételnek kell teljesülnie az <M t="a,b,c,d" /> konstansokra ahhoz, hogy az <M t="f(x) = \dfrac{ax+b}{cx+d}" /> függvény invertálható legyen, és mi az inverze?
            </>
          }
        >
          <p>
            Hányadosszabállyal <M t="f'(x) = \dfrac{a(cx+d) - c(ax+b)}{(cx+d)^2} = \dfrac{ad - bc}{(cx+d)^2}" />. Ha <M t="ad - bc = 0" />, akkor <M t="f" /> konstans (nem injektív). Tehát pontosan akkor invertálható, ha <M t="\mathbf{ad - bc \ne 0}" />!
          </p>
          <p>
            Kifejezve <M t="x" />-et: <M t="y(cx+d)=ax+b \implies x(cy-a) = b - dy \implies f^{-1}(x) = \mathbf{\dfrac{dx - b}{-cx + a}}" />.
          </p>
        </Task>
        <Task
          n={22}
          q={
            <>
              <em>Az inverz második deriváltja:</em> Tegyük fel, hogy <M t="f" /> kétszer differenciálható, injektív, és <M t="f'(a) \ne 0" />. Igazold a láncszabállyal, hogy <M t="b = f(a)" /> esetén:
              <M block t="(f^{-1})''(b) \;=\; -\frac{f''(a)}{\bigl[f'(a)\bigr]^3}." />
            </>
          }
        >
          <p>
            Induljunk ki az <M t="(f^{-1})'(x) = \bigl[f'(f^{-1}(x))\bigr]^{-1}" /> képletből, és deriváljuk <M t="x" /> szerint a láncszabállyal:
          </p>
          <M block t="(f^{-1})''(x) = -\bigl[f'(f^{-1}(x))\bigr]^{-2} \cdot f''(f^{-1}(x)) \cdot (f^{-1})'(x) = -\frac{f''(f^{-1}(x))}{\bigl[f'(f^{-1}(x))\bigr]^2} \cdot \frac{1}{f'(f^{-1}(x))} = -\frac{f''(f^{-1}(x))}{\bigl[f'(f^{-1}(x))\bigr]^3}." />
          <p>
            Behelyettesítve <M t="x = b" />-t (ahol <M t="f^{-1}(b) = a" />), pontosan a kívánt formulát kapjuk! <em>(Érdekesség: ha <M t="f" /> növekvő és alulról konvex, akkor <M t="f'>0,\; f''>0 \implies (f^{-1})'' < 0" />, vagyis az inverze felülről konvex — gondolj az <M t="x^2" /> és <M t="\sqrt{x}" /> párra!)</em>
          </p>
        </Task>
        <Task
          n={23}
          q={
            <>
              <em>Inverz integrálása képlet nélkül:</em> Legyen <M t="f(x) = x^3 + x" /> az <M t="[0;\,2]" /> intervallumon. Számítsd ki <M t="\displaystyle\int_{0}^{10} f^{-1}(y)\,dy" /> pontos értékét anélkül, hogy felírnád <M t="f^{-1}(y)" /> képletét!
            </>
          }
        >
          <p>
            <M t="f" /> folytonos, szigorúan növekvő és nemnegatív <M t="[0;\,2]" />-n, továbbá <M t="f(0) = 0" /> és <M t="f(2) = 8 + 2 = 10" />. A 7. oldalon látott terület-tétellel:
          </p>
          <M block t="\int_{0}^{10} f^{-1}(y)\,dy = 2\cdot 10 - 0\cdot 0 - \int_{0}^{2} (x^3 + x)\,dx = 20 - \left[\frac{x^4}{4} + \frac{x^2}{2}\right]_{0}^{2} = 20 - (4 + 2) = \mathbf{14}." />
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Ha <M t="f(2) = 5" /> és <M t="f'(2) = 3" />, mennyi <M t="(f^{-1})'(5)" />?
            </>
          }
          options={[
            { label: <M t="\dfrac{1}{3}" />, ok: true },
            { label: <M t="3" /> },
            { label: <M t="\dfrac{1}{5}" /> },
            { label: <M t="\dfrac{2}{5}" /> },
          ]}
          explain={
            <>
              <M t="(f^{-1})'(5) = \dfrac{1}{f'(f^{-1}(5))} = \dfrac{1}{f'(2)} = \dfrac{1}{3}" />.
            </>
          }
        />
      </>
    ),
  },
];
