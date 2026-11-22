import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  AsymptoteTrapWidget,
  FirstDerivTestCasesWidget,
  MonotoneDerivativeWidget,
  ReadFromFPrimeWidget,
  SignChartWidget,
} from '../components/Widgets43';
import type { Page } from './s1_1';

export const S4_3: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Növekvő és csökkenő szakaszok: az első derivált előjele',
    body: (
      <>
        <Story>
          <p>
            A 4.1-ben láttuk, hogy egy kritikus pontban (<M t="f'(c)=0" />) lehet maximum, lehet minimum, de az is lehet, hogy semmi sincs ott (mint <M t="x^3" />-nél). Honnan tudjuk megbízhatóan, melyik esettel állunk szemben? A választ a <strong>Lagrange-féle középértéktétel</strong> adja meg: az első derivált előjele elárulja, merre tart a görbe!
          </p>
        </Story>
        <Def title="Monotonitási kritérium (a középértéktétel 3. következménye)">
          <p>
            Legyen <M t="f" /> folytonos <M t="[a;\,b]" />-n és differenciálható <M t="(a;\,b)" />-n:
          </p>
          <ul>
            <li>
              Ha <M t="f'(x) > 0" /> minden <M t="x \in (a;\,b)" />-re, akkor <M t="f" /> <strong>szigorúan növekvő</strong> <M t="[a;\,b]" />-n.
            </li>
            <li>
              Ha <M t="f'(x) < 0" /> minden <M t="x \in (a;\,b)" />-re, akkor <M t="f" /> <strong>szigorúan csökkenő</strong> <M t="[a;\,b]" />-n.
            </li>
          </ul>
        </Def>
        <p>
          A bizonyítás egyetlen sor a Lagrange-tételből: bármely <M t="x_1 < x_2" /> pontra <M t="f(x_2)-f(x_1) = f'(c)(x_2-x_1)" />. Mivel <M t="x_2-x_1 > 0" />, ha <M t="f'(c) > 0" />, akkor <M t="f(x_2) > f(x_1)" />!
        </p>
        <MonotoneDerivativeWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Mely intervallumokon növekvő és melyeken csökkenő az <M t="f(x)=x^2 - 6x + 5" /> függvény?
            </>
          }
        >
          <p>
            <M t="f'(x)=2x-6" />. Ha <M t="x < 3" />, akkor <M t="f'(x) < 0" /> (csökkenő); ha <M t="x > 3" />, akkor <M t="f'(x) > 0" /> (növekvő).
          </p>
          <p>
            Tehát csökkenő a <M t="(-\infty;\,3]" />, növekvő a <M t="[3;\,\infty)" /> intervallumon!
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Mutasd meg, hogy az <M t="f(x)=x^3 + 2x - 7" /> függvény a teljes valós számegyenesen szigorúan növekvő!
            </>
          }
        >
          <p>
            <M t="f'(x)=3x^2+2 \ge 2 > 0" /> minden <M t="x \in \mathbb{R}" />-re, tehát <M t="f" /> mindenütt szigorúan növekszik!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Az első derivált teszt lokális szélsőértékekre',
    body: (
      <>
        <p>
          Ha tudjuk, hol emelkedik és hol süllyed a függvény, azonnal felismerjük a csúcsokat és a völgyeket: a csúcs előtt <em>felfelé</em>, utána <em>lefelé</em> megyünk; a völgy előtt <em>lefelé</em>, utána <em>felfelé</em>!
        </p>
        <Def title="Első derivált teszt (belső c kritikus pontra, ahol f folytonos)">
          <ul>
            <li>
              Ha <M t="f'" /> előjele <M t="c" />-nél <strong><M t="+\;\longrightarrow\;-" /></strong> irányban vált, akkor <M t="f" />-nek <strong>lokális maximuma</strong> van <M t="c" />-ben.
            </li>
            <li>
              Ha <M t="f'" /> előjele <M t="c" />-nél <strong><M t="-\;\longrightarrow\;+" /></strong> irányban vált, akkor <M t="f" />-nek <strong>lokális minimuma</strong> van <M t="c" />-ben.
            </li>
            <li>
              Ha <M t="f'" /> <strong>nem vált előjelet</strong> (<M t="+\to +" /> vagy <M t="-\to -" />), akkor <M t="c" />-ben <strong>nincs lokális szélsőérték</strong>!
            </li>
          </ul>
        </Def>
        <FirstDerivTestCasesWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Egy folytonos <M t="f" /> függvény deriváltja <M t="f'(x) = (x+2)(x-1)^2" />. Melyik kritikus pontban van lokális szélsőértéke, és milyen típusú?
            </>
          }
        >
          <p>
            Kritikus pontok: <M t="x=-2" /> és <M t="x=1" />. Mivel <M t="(x-1)^2 \ge 0" /> mindig nemnegatív, az előjelet csak <M t="(x+2)" /> szabja meg:
          </p>
          <p>
            <M t="x < -2" />: <M t="-" />; <M t="-2 < x < 1" />: <M t="+" />; <M t="x > 1" />: <M t="+" />. Tehát <M t="x=-2" />-nél <strong>lokális minimum</strong> (<M t="-\to +" />), <M t="x=1" />-nél pedig <strong>nincs szélsőérték</strong> (<M t="+\to +" />)!
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Mi a helyzet egy zárt <M t="[a;\,b]" /> intervallum bal <M t="a" /> végpontjával, ha tőle jobbra <M t="f'(x) < 0" />?
            </>
          }
        >
          <p>
            Ha <M t="a" />-tól jobbra csökken a függvény (<M t="f'<0" />), akkor <M t="a" />-ban magasabban áll, mint a tőle jobbra lévő pontokban — vagyis <M t="a" />-ban <strong>lokális maximuma</strong> van!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Előjeltáblázat lépésről lépésre (polinom és törtkitevő)',
    body: (
      <>
        <p>
          A gyakorlatban az alábbi <strong>3 lépéses rutin</strong> a leggyorsabb és legbiztonságosabb:
        </p>
        <ol>
          <li>Deriváld <M t="f" />-et, és <strong>bontsd szorzattá</strong> (vagy hozd közös nevezőre) <M t="f'(x)" />-et!</li>
          <li>Jelöld be a számegyenesen az összes kritikus pontot (<M t="f'=0" /> és ahol <M t="f'" /> nem létezik) — és az esetleges szakadási helyeket is!</li>
          <li>Minden részintervallumon tesztelj egy kényelmes próbaszámot <M t="f'" />-ben, írd fel a <M t="+" /> / <M t="-" /> előjeleket, és olvasd le a szélsőértékeket!</li>
        </ol>
        <SignChartWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Készíts előjeltáblázatot az <M t="f(x)=x^3 - 12x - 5" /> függvényhez, és határozd meg a monotonitását és lokális szélsőértékeit!
            </>
          }
        >
          <p>
            <M t="f'(x)=3x^2-12=3(x+2)(x-2)" />. Kritikus pontok: <M t="-2" /> és <M t="2" />.
          </p>
          <p>
            Előjelek: <M t="(-\infty;\,-2)" />-n <M t="+" />, <M t="(-2;\,2)" />-n <M t="-" />, <M t="(2;\,\infty)" />-n <M t="+" />.
          </p>
          <p>
            <strong>Lokális maximum:</strong> <M t="f(-2)=11" />; <strong>lokális minimum:</strong> <M t="f(2)=-21" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Vizsgáld meg az <M t="f(x)=x^{4/3}-4x^{1/3}" /> függvényt az első derivált teszttel!
            </>
          }
        >
          <p>
            <M t="f'(x)=\dfrac{4}{3}x^{1/3}-\dfrac{4}{3}x^{-2/3}=\dfrac{4(x-1)}{3x^{2/3}}" />. Kritikus pontok: <M t="x=0" /> (nem diff.) és <M t="x=1" /> (<M t="f'=0" />).
          </p>
          <p>
            Mivel <M t="x^{2/3} > 0" /> minden <M t="x\ne 0" />-ra, <M t="f'" /> előjele: <M t="(-\infty;\,0)" />-n <M t="-" />, <M t="(0;\,1)" />-n <M t="-" />, <M t="(1;\,\infty)" />-n <M t="+" />. Tehát <M t="x=0" />-nál <em>nincs</em> szélsőérték, <M t="x=1" />-nél <strong>lokális (és abszolút) minimum</strong> van: <M t="f(1)=-3" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Szakadási helyek és aszimptoták az előjeltáblázatban',
    body: (
      <>
        <p>
          Mi történik, ha <M t="f(x)" /> nem értelmezett egy <M t="x_0" /> helyen (például függőleges aszimptotája van)? Az <M t="x_0" /> pont <strong>nem kritikus pont</strong> (hiszen nincs is benne az értelmezési tartományban!), mégis <strong>kötelező bejelölni az előjeltáblázatba</strong>, mert a függvény és deriváltja itt is válthat előjelet!
        </p>
        <AsymptoteTrapWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Miért mondhatjuk az <M t="f(x)=1/x" /> függvényről, hogy csökkenő a <M t="(-\infty;\,0)" /> és a <M t="(0;\,\infty)" /> intervallumon is, de <em>nem</em> csökkenő a teljes értelmezési tartományán?
            </>
          }
        >
          <p>
            Mert <M t="x_1=-1 < 1=x_2" />, mégis <M t="f(-1)=-1 < +1=f(1)" />! A szakadási hely miatt a monotonitást mindig <strong>külön-külön intervallumonként</strong> adjuk meg!
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Határozd meg az <M t="f(x)=\dfrac{x^2}{x-1}" /> függvény növekvő/csökkenő szakaszait és lokális szélsőértékeit!
            </>
          }
        >
          <p>
            Hányadosszabállyal: <M t="f'(x)=\dfrac{2x(x-1)-x^2}{(x-1)^2}=\dfrac{x(x-2)}{(x-1)^2}" />. Kritikus pontok: <M t="x=0, 2" />; szakadás: <M t="x=1" />.
          </p>
          <p>
            Előjelek (<M t="(x-1)^2>0" />): <M t="(-\infty;\,0)" />-n <M t="+" />, <M t="(0;\,1)" />-n <M t="-" />, <M t="(1;\,2)" />-n <M t="-" />, <M t="(2;\,\infty)" />-n <M t="+" />.
          </p>
          <p>
            <strong>Lok. max:</strong> <M t="f(0)=0" />; <strong>lok. min:</strong> <M t="f(2)=4" /> (és <M t="x=1" />-nél függőleges aszimptota).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Görbe viselkedése f′ grafikonjából leolvasva',
    body: (
      <>
        <p>
          Az egyik legfontosabb vizsgakészség: adott a <strong>derivált <M t="f'(x)" /> grafikonja</strong> (és <em>nem</em> az eredeti <M t="f(x)" />!), és ebből kell kiolvasnod, hol emelkedik/süllyed <M t="f" />, illetve hol vannak a lokális szélsőértékei!
        </p>
        <ul>
          <li><M t="f'" /> az <M t="x" />-tengely <strong>felett</strong> (<M t="f'>0" />) ⇒ <M t="f" /> <strong>növekszik</strong> (akkor is, ha <M t="f'" /> maga épp csökken!).</li>
          <li><M t="f'" /> az <M t="x" />-tengely <strong>alatt</strong> (<M t="f'<0" />) ⇒ <M t="f" /> <strong>csökken</strong>.</li>
          <li><M t="f'" /> felülről lefelé metszi az <M t="x" />-tengelyt (<M t="+\to -" />) ⇒ <M t="f" />-nek <strong>lokális maximuma</strong> van!</li>
          <li><M t="f'" /> alulról felfelé metszi az <M t="x" />-tengelyt (<M t="-\to +" />) ⇒ <M t="f" />-nek <strong>lokális minimuma</strong> van!</li>
        </ul>
        <ReadFromFPrimeWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Ha <M t="f'(x)" /> grafikonja az <M t="x=3" /> pontban csak <em>érinti</em> az <M t="x" />-tengelyt (végig felette marad), van-e <M t="f" />-nek lokális szélsőértéke <M t="x=3" />-nál?
            </>
          }
        >
          <p>
            <strong>Nincs!</strong> Mivel <M t="f'" /> nem vált előjelet (<M t="+\to +" />), <M t="f" /> csak pillanatnyilag vízszintes lesz, majd tovább emelkedik.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Ha <M t="f'(x) > 0" />, de <M t="f'(x)" /> éppen csökkenő szakaszban van (pl. <M t="f'" /> értéke <M t="5" />-ről <M t="1" />-re esik), akkor <M t="f(x)" /> növekszik vagy csökken?
            </>
          }
        >
          <p>
            <M t="f(x)" /> <strong>továbbra is növekszik</strong> (csak egyre lassabban!), mert a növekedést <M t="f'" /> <em>előjele</em> (<M t=">0" />) dönti el, nem pedig az, hogy <M t="f'" /> nő vagy csökken!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás és a 4 legnagyobb buktató',
    body: (
      <>
        <table className="tbl">
          <thead>
            <tr>
              <th>jelenség <M t="f'" />-ben</th>
              <th>következmény <M t="f" />-re</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><M t="f'(x) > 0" /> az <M t="I" /> intervallumon</td>
              <td><M t="f" /> szigorúan növekvő <M t="I" />-n</td>
            </tr>
            <tr>
              <td><M t="f'(x) < 0" /> az <M t="I" /> intervallumon</td>
              <td><M t="f" /> szigorúan csökkenő <M t="I" />-n</td>
            </tr>
            <tr>
              <td><M t="f'" /> előjelváltása <M t="+\to -" /> folytonos <M t="c" />-nél</td>
              <td><strong>lokális maximum</strong> <M t="c" />-ben</td>
            </tr>
            <tr>
              <td><M t="f'" /> előjelváltása <M t="-\to +" /> folytonos <M t="c" />-nél</td>
              <td><strong>lokális minimum</strong> <M t="c" />-ben</td>
            </tr>
            <tr>
              <td><M t="f'" /> nem vált előjelet (<M t="+\to +" /> vagy <M t="-\to -" />)</td>
              <td>nincs lokális szélsőérték</td>
            </tr>
          </tbody>
        </table>
        <h3>Négy klasszikus hiba</h3>
        <Warn>
          <p>
            <strong>1. <M t="f" /> és <M t="f'" /> összekeverése:</strong> a lokális szélsőérték <em>helyét</em> <M t="f'" /> előjelváltása adja, de a szélsőérték <em>értékét</em> mindig az <strong>eredeti <M t="f(c)" /></strong>-be behelyettesítve számoljuk ki!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. Uniójel (<M t="\cup" />) használata monotonitásnál:</strong> NE írd azt, hogy <M t="1/x" /> csökkenő <M t="(-\infty;\,0)\cup(0;\,\infty)" />-n! Írd külön: csökkenő <M t="(-\infty;\,0)" />-n és csökkenő <M t="(0;\,\infty)" />-n.
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Páros multiplicitású gyök félreértése:</strong> ha <M t="f'(x)=(x-1)^2(x+3)" />, az <M t="(x-1)^2" /> tényezőnél <em>nem</em> vált előjelet a derivált — mindig ellenőrizd próbaszámmal!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Szakadási hely kinevezése szélsőértéknek:</strong> ha <M t="f'" /> előjelet vált egy <M t="x_0" /> szakadási helyen (pl. <M t="f(x)=1/x^2" /> az <M t="x=0" />-nál <M t="+\to -" />!), ott <strong>nincs</strong> szélsőérték, mert <M t="f(0)" /> nem is létezik!
          </p>
        </Warn>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Lépcsőzetes gyakorlófeladatok (könnyűtől a haladóig)',
    body: (
      <>
        <p>
          Oldd meg az alábbi 9 feladatot növekvő nehézségi sorrendben!
        </p>

        <h3>Könnyebb (alapozó) feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Határozd meg az <M t="f(x)=2x^3 - 3x^2 - 12x + 1" /> függvény növekvő/csökkenő intervallumait és lokális szélsőértékeit!
            </>
          }
        >
          <p>
            <M t="f'(x)=6x^2-6x-12=6(x+1)(x-2)" />. Kritikus pontok: <M t="-1, 2" />.
          </p>
          <p>
            Növekvő: <M t="(-\infty;\,-1]" /> és <M t="[2;\,\infty)" />; csökkenő: <M t="[-1;\,2]" />. <strong>Lok. max:</strong> <M t="f(-1)=8" />, <strong>lok. min:</strong> <M t="f(2)=-19" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Vizsgáld meg az <M t="f(x)=-x^2+8x-7" /> függvényt az első derivált teszttel!
            </>
          }
        >
          <p>
            <M t="f'(x)=-2x+8=0 \Rightarrow x=4" />. Előjelváltás <M t="+\to -" /> → <strong>lokális (és abszolút) maximum:</strong> <M t="f(4)=9" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Adott <M t="f'(x)=(x-1)(x-4)" />. Melyik kritikus pont lokális maximum és melyik lokális minimum?
            </>
          }
        >
          <p>
            Előjelek: <M t="(-\infty;\,1)" />-n <M t="+" />, <M t="(1;\,4)" />-n <M t="-" />, <M t="(4;\,\infty)" />-n <M t="+" />. Tehát <M t="x=1" /> <strong>lokális maximum</strong>, <M t="x=4" /> <strong>lokális minimum</strong>.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Határozd meg az <M t="f(x)=x^4 - 4x^3 + 2" /> függvény lokális szélsőértékeit!
            </>
          }
        >
          <p>
            <M t="f'(x)=4x^3-12x^2=4x^2(x-3)" />. Kritikus pontok: <M t="0" /> és <M t="3" />.
          </p>
          <p>
            Előjelek: <M t="-" /> (<M t="x<0" />), <M t="-" /> (<M t="0<x<3" />), <M t="+" /> (<M t="x>3" />). Tehát <M t="x=0" />-nál <em>nincs</em> szélsőérték, <M t="x=3" />-nál <strong>lokális (és abszolút) minimum:</strong> <M t="f(3)=-25" />.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Keresd meg az <M t="f(x)=\dfrac{x}{x^2+4}" /> függvény lokális szélsőértékeit!
            </>
          }
        >
          <p>
            <M t="f'(x)=\dfrac{(x^2+4)-2x^2}{(x^2+4)^2}=\dfrac{4-x^2}{(x^2+4)^2}" />. Kritikus pontok: <M t="-2, 2" />.
          </p>
          <p>
            Előjelek: <M t="-" />, <M t="+" />, <M t="-" />. <strong>Lok. min:</strong> <M t="f(-2)=-\frac{1}{4}" />; <strong>lok. max:</strong> <M t="f(2)=\frac{1}{4}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Határozd meg az <M t="f(x) = x - 2\sin x" /> függvény lokális szélsőértékeit a <M t="[0;\,2\pi]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="f'(x)=1-2\cos x=0 \iff \cos x = \dfrac{1}{2} \Rightarrow x=\dfrac{\pi}{3}" /> és <M t="x=\dfrac{5\pi}{3}" />.
          </p>
          <p>
            Előjelek: <M t="(0;\,\pi/3)" />-n <M t="-" />, <M t="(\pi/3;\,5\pi/3)" />-n <M t="+" />, <M t="(5\pi/3;\,2\pi)" />-n <M t="-" />.
          </p>
          <p>
            Belső <strong>lok. min:</strong> <M t="x=\frac{\pi}{3}" />; belső <strong>lok. max:</strong> <M t="x=\frac{5\pi}{3}" /> (és a végpontokban: <M t="x=0" /> lok. max, <M t="x=2\pi" /> lok. min).
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              Vizsgáld meg az <M t="f(x)=(x^2-1)^{2/3}" /> függvény monotonitását és lokális szélsőértékeit!
            </>
          }
        >
          <p>
            <M t="f'(x)=\dfrac{2}{3}(x^2-1)^{-1/3}\cdot 2x = \dfrac{4x}{3\sqrt[3]{x^2-1}}" />. Kritikus pontok: <M t="x=0" /> (<M t="f'=0" />) és <M t="x=\pm 1" /> (<M t="f'" /> nem létezik, de <M t="f" /> folytonos!).
          </p>
          <p>
            Előjelek: <M t="(-\infty;\,-1)" />: <M t="-" />; <M t="(-1;\,0)" />: <M t="+" />; <M t="(0;\,1)" />: <M t="-" />; <M t="(1;\,\infty)" />: <M t="+" />.
          </p>
          <p>
            <strong>Lok. (és abs.) minimumok:</strong> <M t="f(-1)=f(1)=0" />; <strong>lok. maximum:</strong> <M t="f(0)=1" />!
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Bizonyítsd be a monotonitás segítségével, hogy minden <M t="x > 0" /> esetén <M t="\sin x < x" />!
            </>
          }
        >
          <p>
            Legyen <M t="g(x)=x-\sin x" />. Ekkor <M t="g(0)=0" />, és <M t="g'(x)=1-\cos x \ge 0" /> (sőt csak elszigetelt pontokban nulla), tehát <M t="g" /> szigorúan növekvő <M t="[0;\,\infty)" />-n!
          </p>
          <p>
            Ezért minden <M t="x > 0" />-ra <M t="g(x) > g(0) = 0 \iff x > \sin x" />!
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Milyen <M t="k" /> valós paraméterek esetén lesz az <M t="f(x)=x^3 + kx^2 + 3x - 1" /> függvény a teljes valós számegyenesen monoton növekvő?
            </>
          }
        >
          <p>
            Akkor és csak akkor, ha <M t="f'(x)=3x^2+2kx+3 \ge 0" /> minden <M t="x" />-re!
          </p>
          <p>
            Ez egy felfelé nyíló parabola, amely pontosan akkor marad az <M t="x" />-tengely felett (vagy érinti azt), ha a diszkriminánsa <M t="\Delta = (2k)^2 - 4\cdot 3\cdot 3 = 4k^2 - 36 \le 0 \iff k^2 \le 9 \iff -3 \le k \le 3" />!
          </p>
        </Task>
      </>
    ),
  },
];
