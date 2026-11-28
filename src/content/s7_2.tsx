import { M } from '../components/M';
import { Def, Quiz, Story, Task, Warn } from '../components/ui';
import {
  AbsLogBranchesWidget,
  LnAreaDefinitionWidget,
  LnDerivativeAndShiftWidget,
  LnGraphAnalysisWidget,
  LnLinearizationWidget,
  LnProductAreaDiagram,
  LogDiffPipelineDiagram,
  TanIntegralWidget,
} from '../components/Widgets72';
import type { Page } from './s1_1';

export const S7_2: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'A természetes logaritmus integrálos definíciója és az e szám',
    body: (
      <>
        <Story>
          <p>
            Középiskolában a logaritmust a hatványozás fordítottjaként tanultad — csakhogy az analízisben van egy komoly bökkenő: mit jelent pontosan az <M t="a^{\sqrt{2}}" /> irracionális kitevőjű hatvány? A <em>Thomas-féle Kalkulus</em> ezért egy zseniális, kőszilárd utat választ: <strong>először a természetes logaritmust definiáljuk egy határozott integrállal</strong>, és belőle építjük fel az összes exponenciális és logaritmusfüggvényt!
          </p>
        </Story>

        <p>
          Emlékezz vissza a hatványfüggvények integrálására: <M t="\int t^n\,dt = \frac{t^{n+1}}{n+1}+C" /> minden <M t="n \ne -1" /> kitevőre működött, egyetlen lyuk maradt csak: az <M t="y = \frac{1}{t} = t^{-1}" /> függvény! Pontosan ennek az integrálja adja a természetes logaritmust:
        </p>

        <Def title="A természetes logaritmus és az e szám definíciója">
          <ul>
            <li>
              <strong>Természetes logaritmus:</strong> minden <M t="x > 0" /> valós számra
              <M block t="\ln x \;=\; \int_{1}^{x} \frac{1}{t}\,dt \qquad (x > 0)." />
            </li>
            <li>
              <strong>Előjeles területi értelmezés:</strong>
              <ul>
                <li>Ha <M t="x > 1" />, akkor <M t="\ln x > 0" /> az <M t="y = 1/t" /> görbe alatti terület az <M t="[1;\,x]" /> szakaszon.</li>
                <li>Ha <M t="x = 1" />, akkor <M t="\ln 1 = \int_1^1 \frac{1}{t}\,dt = 0" />.</li>
                <li>Ha <M t="0 < x < 1" />, akkor <M t="\ln x = -\int_x^1 \frac{1}{t}\,dt < 0" /> (a görbe alatti terület ellentettje!).</li>
              </ul>
            </li>
            <li>
              <strong>Az <M t="e" /> (Euler-féle) szám:</strong> az a különleges pozitív szám, amelyre
              <M block t="\ln e \;=\; \int_{1}^{e} \frac{1}{t}\,dt \;=\; 1 \qquad (e \approx 2{,}718281828\ldots)." />
            </li>
          </ul>
        </Def>

        <LnAreaDefinitionWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Döntsd el számológép nélkül, csak a definícióból, hogy pozitív, negatív vagy nulla-e: (a) <M t="\ln 3" />, (b) <M t="\ln(0{,}4)" />, (c) <M t="\ln 1" />!
            </>
          }
        >
          <p>
            (a) <M t="3 > 1 \implies \ln 3 > 0" />; (b) <M t="0 < 0{,}4 < 1 \implies \ln(0{,}4) < 0" />; (c) <M t="\ln 1 = \int_1^1 \frac{1}{t}\,dt = \mathbf{0}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Becsüld meg alulról és felülről <M t="\ln 2 = \int_1^2 \frac{1}{t}\,dt" /> értékét egyetlen beírt és egyetlen körülírt téglalappal!
            </>
          }
        >
          <p>
            Az <M t="[1;\,2]" /> intervallumon <M t="\frac{1}{2} \le \frac{1}{t} \le 1" />, és az intervallum hossza <M t="1" />. Tehát a beírt téglalap területe <M t="\frac{1}{2}" />, a körülírté <M t="1" />, vagyis <M t="\mathbf{0{,}5 < \ln 2 < 1}" />! (Pontosabban <M t="\ln 2 \approx 0{,}693" />.)
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Az ln x deriváltja, láncszabály és az ln(ax) csodája',
    body: (
      <>
        <Story>
          <p>
            Az integrálos definíció első hatalmas jutalma azonnal megérkezik: a <strong>Newton–Leibniz-tétel 1. része</strong> (5.4-es szakasz) egyetlen sorban megadja az <M t="\ln x" /> deriváltját!
          </p>
        </Story>

        <Def title="A természetes logaritmus deriválási szabályai">
          <ul>
            <li>
              <strong>Alapderivált (<M t="x > 0" />):</strong>
              <M block t="\frac{d}{dx}(\ln x) \;=\; \frac{d}{dx}\int_{1}^{x}\frac{1}{t}\,dt \;=\; \frac{1}{x}." />
            </li>
            <li>
              <strong>Láncszabállyal (<M t="u(x) > 0" /> differenciálható):</strong>
              <M block t="\frac{d}{dx}\bigl(\ln u\bigr) \;=\; \frac{1}{u}\cdot\frac{du}{dx} \;=\; \frac{u'}{u}." />
            </li>
            <li>
              <strong>Abszolútértékkel (<M t="u(x) \ne 0" />):</strong> ha <M t="u < 0" />, akkor <M t="-u > 0" />, és <M t="(\ln(-u))' = \frac{-u'}{-u} = \frac{u'}{u}" />, tehát mindkét előjelre:
              <M block t="\frac{d}{dx}\bigl(\ln|u|\bigr) \;=\; \frac{u'}{u} \qquad (u \ne 0)." />
            </li>
          </ul>
        </Def>

        <p>
          <strong>Egy meglepő megfigyelés:</strong> Mi az <M t="y = \ln(ax)" /> deriváltja egy tetszőleges <M t="a > 0" /> konstans esetén? A láncszabállyal:
        </p>
        <M block t="\frac{d}{dx}\ln(ax) = \frac{1}{ax}\cdot a = \frac{1}{x}!" />
        <p>
          A konstans <M t="a" /> egyszerűen <strong>kiesik</strong>! Geometriailag ez azért van, mert <M t="\ln(ax) = \ln x + \ln a" /> csupán függőleges eltolása <M t="\ln x" /> grafikonjának, az eltolás pedig nem változtatja meg a görbe meredekségét! Ellenőrizd az alábbi interaktív grafikonon:
        </p>

        <LnDerivativeAndShiftWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Deriváld: (a) <M t="f(x) = \ln(x^2 + 3)" />, (b) <M t="g(x) = \ln(\sin x)" /> (<M t="0 < x < \pi" />)!
            </>
          }
        >
          <p>
            (a) <M t="f'(x) = \dfrac{(x^2+3)'}{x^2+3} = \mathbf{\dfrac{2x}{x^2+3}}" />.
          </p>
          <p>
            (b) <M t="g'(x) = \dfrac{(\sin x)'}{\sin x} = \dfrac{\cos x}{\sin x} = \mathbf{\operatorname{ctg} x}" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Deriváld: <M t="h(x) = \ln(\ln x)" /> (<M t="x > 1" />)!
            </>
          }
        >
          <p>
            Kétszeres láncszabály (<M t="u = \ln x \implies u' = 1/x" />):
            <M block t="h'(x) = \frac{1}{\ln x}\cdot\frac{1}{x} = \mathbf{\frac{1}{x\ln x}}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A logaritmus tulajdonságai — bizonyítás deriválással és területtel',
    body: (
      <>
        <Story>
          <p>
            John Napier 1614-ben azért alkotta meg a logaritmust, hogy a csillagászok és hajósok <em>szorzás helyett összeadhassanak</em>, <em>osztás helyett kivonhassanak</em>. Nézzük meg, hogyan következnek ezek a híres azonosságok szinte erőfeszítés nélkül az integrálos definícióból!
          </p>
        </Story>

        <Def title="2. Tétel — A természetes logaritmus azonosságai">
          <p>Tetszőleges <M t="a > 0,\; x > 0" /> számokra és <M t="r" /> racionális kitevőre:</p>
          <ol className="steps">
            <li><strong>Szorzatszabály:</strong> <M t="\ln(ax) = \ln a + \ln x" /></li>
            <li><strong>Hányadosszabály:</strong> <M t="\ln\!\left(\dfrac{a}{x}\right) = \ln a - \ln x" /></li>
            <li><strong>Reciprokszabály:</strong> <M t="\ln\!\left(\dfrac{1}{x}\right) = -\ln x" /> <em>(a 2. szabály <M t="a=1" /> esete)</em></li>
            <li><strong>Hatványszabály:</strong> <M t="\ln(x^r) = r\ln x" /></li>
          </ol>
        </Def>

        <p>
          <strong>Miért igaz a szorzatszabály? (3 soros analízis-bizonyítás!):</strong> Az előző oldalon láttuk, hogy <M t="\frac{d}{dx}\ln(ax) = \frac{1}{x} = \frac{d}{dx}\ln x" />. A 4.2-es Lagrange-féle középértéktétel következménye szerint két olyan függvény, amelynek egy intervallumon azonos a deriváltja, csak egy <M t="C" /> konstansban különbözhet:
        </p>
        <M block t="\ln(ax) = \ln x + C \qquad (\forall\,x > 0)." />
        <p>
          Helyettesítsük be <M t="x = 1" />-et: <M t="\ln a = \ln 1 + C = 0 + C \implies C = \ln a" />! Ezzel be is bizonyítottuk, hogy <M t="\ln(ax) = \ln a + \ln x" />! Hasonlóan, a hatványszabályhoz: <M t="\frac{d}{dx}\ln(x^r) = \frac{rx^{r-1}}{x^r} = \frac{r}{x} = \frac{d}{dx}(r\ln x)" />, és <M t="x=1" />-nél <M t="C=0" />!
        </p>

        <p>
          De geometriailag még látványosabb! Az <M t="y = 1/t" /> hiperbola alatti terület különleges skálázási szimmetriája miatt az <M t="[1;\,b]" /> és az <M t="[a;\,ab]" /> intervallum feletti terület <strong>pontosan megegyezik</strong>:
        </p>

        <LnProductAreaDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Írd fel egyetlen logaritmussal: <M t="2\ln x + \frac{1}{2}\ln(x+1) - 3\ln(x-2)" /> (<M t="x > 2" />)!
            </>
          }
        >
          <p>
            Először az együtthatókat bevisszük kitevőbe, majd összevonjuk a szorzatokat és hányadosokat:
            <M block t="\ln(x^2) + \ln\sqrt{x+1} - \ln(x-2)^3 = \mathbf{\ln\!\left(\frac{x^2\sqrt{x+1}}{(x-2)^3}\right)}." />
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Fejtsd ki <M t="\ln 2" /> és <M t="\ln 3" /> segítségével: (a) <M t="\ln 12" />, (b) <M t="\ln\!\left(\frac{8}{9}\right)" />, (c) <M t="\ln\sqrt{6}" />!
            </>
          }
        >
          <p>
            (a) <M t="\ln(2^2\cdot 3) = \mathbf{2\ln 2 + \ln 3}" />; (b) <M t="\ln(2^3) - \ln(3^2) = \mathbf{3\ln 2 - 2\ln 3}" />; (c) <M t="\frac{1}{2}\ln(2\cdot 3) = \mathbf{\frac{1}{2}\ln 2 + \frac{1}{2}\ln 3}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Az y = ln x grafikonja, konvexitása és határértékei',
    body: (
      <>
        <Story>
          <p>
            Ha megnézzük <M t="\ln x" /> grafikonját, úgy tűnik, mintha nagyon laposodna — felmerülhet a kérdés: van-e vízszintes aszimptotája, vagy tényleg a végtelenbe nő? Az integrálos definíció és a logaritmus hatványszabálya erre is tökéletes választ ad!
          </p>
        </Story>

        <Def title="Az y = ln x teljes függvényjellemzése">
          <ul>
            <li><strong>Értelmezési tartomány és értékkészlet:</strong> <M t="D = (0;\,\infty)" />, <M t="R = (-\infty;\,\infty)" />.</li>
            <li><strong>Monotonitás:</strong> <M t="(\ln x)' = \dfrac{1}{x} > 0" /> minden <M t="x > 0" />-ra ⇒ <strong>szigorúan növekvő</strong>, tehát <strong>injektív és invertálható</strong>! <em>(Az inverze lesz a 7.3-as <M t="e^x" /> függvény!)</em></li>
            <li><strong>Konvexitás:</strong> <M t="(\ln x)'' = -\dfrac{1}{x^2} < 0" /> minden <M t="x > 0" />-ra ⇒ a teljes tartományán <strong>konkáv</strong> (alulról nézve boltozatos), inflexiós pontja nincs!</li>
            <li>
              <strong>Határértékek:</strong>
              <M block t="\lim_{x\to\infty}\ln x = +\infty, \qquad \lim_{x\to 0^+}\ln x = -\infty \quad (\text{függőleges aszimptota: } x = 0)." />
            </li>
          </ul>
        </Def>

        <p>
          <strong>Miért nem korlátos felülről <M t="\ln x" />?</strong> Az <M t="[1;\,2]" /> intervallum alatti, <M t="\frac{1}{2}" /> magasságú téglalap teljesen az <M t="y = 1/t" /> görbe alá esik, ezért <M t="\ln 2 > \frac{1}{2}" />. Ha most vesszük a <M t="2^n" /> számokat, a hatványszabály miatt <M t="\ln(2^n) = n\ln 2 > \frac{n}{2}" />, ami tetszőlegesen nagy számot meghalad, ha <M t="n" /> elég nagy! Ugyanígy <M t="\ln(2^{-n}) = -n\ln 2 < -\frac{n}{2} \to -\infty" />!
        </p>

        <LnGraphAnalysisWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Igazold a derivált segítségével, hogy minden <M t="x > 0" /> esetén <M t="\ln x \le x - 1" /> (és egyenlőség csak <M t="x=1" />-nél áll fenn)!
            </>
          }
        >
          <p>
            Legyen <M t="g(x) = x - 1 - \ln x" /> (<M t="x > 0" />). Deriváltja <M t="g'(x) = 1 - \frac{1}{x} = \frac{x-1}{x}" />, amely <M t="0 < x < 1" /> esetén negatív, <M t="x > 1" /> esetén pozitív. Tehát <M t="g" />-nek <M t="x=1" />-ben szigorú abszolút minimuma van: <M t="g(x) \ge g(1) = 0 \implies \ln x \le x - 1" /> ✓
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Határozd meg az <M t="f(x) = \ln(\cos x)" /> függvény abszolút szélsőértékeit a <M t="[-\pi/4;\,\pi/3]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="f'(x) = -\operatorname{tg} x = 0 \implies x = 0" />. Végpontok és kritikus pont: <M t="f(0) = \ln 1 = 0" />, <M t="f(-\pi/4) = \ln(\sqrt{2}/2) = -\frac{1}{2}\ln 2 \approx -0{,}347" />, <M t="f(\pi/3) = \ln(1/2) = -\ln 2 \approx -0{,}693" />. Abszolút maximum: <M t="\mathbf{0}" /> (<M t="x=0" />-ban), abszolút minimum: <M t="\mathbf{-\ln 2}" /> (<M t="x=\pi/3" />-ban).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Az ∫ (1/u) du = ln|u| + C integrál és az f′/f minta',
    body: (
      <>
        <Story>
          <p>
            A hatványfüggvények integrálásának egyetlen hiányzó esete (<M t="n = -1" />) most végre megoldódik — de van egy apró, annál fontosabb részlet: <strong>az abszolútérték-jel!</strong> Nézzük meg, miért elengedhetetlen!
          </p>
        </Story>

        <Def title="Az 1/u és az f′(x)/f(x) integrálási szabálya">
          <p>Ha <M t="u = f(x)" /> differenciálható és egy intervallumon <strong>sehol sem nulla</strong>, akkor:</p>
          <M block t="\int \frac{1}{u}\,du \;=\; \ln|u| + C, \qquad\text{illetve}\qquad \int \frac{f'(x)}{f(x)}\,dx \;=\; \ln|f(x)| + C." />
          <p>
            <strong>Miért működik mindkét előjelre?</strong> Ha <M t="u > 0" />, akkor <M t="\ln|u| = \ln u" />, deriváltja <M t="1/u" />. Ha <M t="u < 0" />, akkor <M t="-u > 0" />, tehát <M t="\ln|u| = \ln(-u)" />, amelynek deriváltja a láncszabállyal <M t="\frac{1}{-u}\cdot(-1) = \frac{1}{u}" />!
          </p>
        </Def>

        <AbsLogBranchesWidget />

        <p>
          <strong>Mikor gyanakodj azonnal logaritmusos integrálra?</strong> Ha egy törtintegrálban a <strong>számláló pontosan a nevező deriváltja</strong> (vagy annak egy konstansszorosa)! Például:
        </p>
        <M block t="\int_{0}^{2}\frac{2x}{x^2 - 5}\,dx \;\xlongequal[\,u(0)=-5,\;u(2)=-1\,]{u=x^2-5,\;du=2x\,dx}\; \int_{-5}^{-1}\frac{du}{u} = \Big[\ln|u|\Big]_{-5}^{-1} = \ln|-1| - \ln|-5| = 0 - \ln 5 = -\ln 5." />
        <p>
          Figyeld meg, hogy a <M t="[0;\,2]" /> szakaszon <M t="x^2 - 5" /> végig <em>negatív</em> (nem ér el a <M t="\sqrt{5}\approx 2{,}24" /> zérushelyig!), ezért az abszolútérték mentette meg a számítást!
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{3x^2}{x^3 + 7}\,dx" /> és <M t="\displaystyle\int \frac{x}{x^2 + 4}\,dx" />!
            </>
          }
        >
          <p>
            Az elsőnél a számláló pontosan a nevező deriváltja: <M t="\mathbf{\ln|x^3 + 7| + C}" />.
          </p>
          <p>
            A másodiknál <M t="(x^2+4)' = 2x" />, ezért <M t="\frac{1}{2}" />-del korrigálunk: <M t="\frac{1}{2}\int \frac{2x}{x^2+4}\,dx = \mathbf{\frac{1}{2}\ln(x^2 + 4) + C}" /> (mivel <M t="x^2+4 > 0" />, az abszolútérték elhagyható).
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Számítsd ki a határozott integrált: <M t="\displaystyle\int_{-\pi/2}^{\pi/2} \frac{4\cos\theta}{3 + 2\sin\theta}\,d\theta" />!
            </>
          }
        >
          <p>
            Legyen <M t="u = 3 + 2\sin\theta \implies du = 2\cos\theta\,d\theta" /> (így <M t="4\cos\theta\,d\theta = 2\,du" />). Határok: <M t="u(-\pi/2) = 1,\; u(\pi/2) = 5" /> (végig pozitív!).
            <M block t="\int_{1}^{5}\frac{2}{u}\,du = \bigl[2\ln u\bigr]_{1}^{5} = 2\ln 5 - 2\ln 1 = \mathbf{2\ln 5}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'A tangens és a kotangens integrálja',
    body: (
      <>
        <Story>
          <p>
            Az 5. fejezetben már tudtuk integrálni <M t="\sin x" />-et és <M t="\cos x" />-et, de a <M t="\operatorname{tg} x" /> és <M t="\operatorname{ctg} x" /> integráljával adósak maradtunk! Az <M t="\int \frac{f'(x)}{f(x)}\,dx" /> minta most ezt is egy pillanat alatt megoldja!
          </p>
        </Story>

        <Def title="A tangens és a kotangens határozatlan integrálja">
          <ul>
            <li>
              <strong>Tangens:</strong> írjuk fel <M t="\operatorname{tg} u = \dfrac{\sin u}{\cos u}" /> alakban! Legyen <M t="w = \cos u \implies dw = -\sin u\,du" />:
              <M block t="\int \operatorname{tg} u\,du \;=\; -\int\frac{dw}{w} \;=\; -\ln|\cos u| + C \;=\; \ln|\sec u| + C." />
            </li>
            <li>
              <strong>Kotangens:</strong> írjuk fel <M t="\operatorname{ctg} u = \dfrac{\cos u}{\sin u}" /> alakban! Legyen <M t="w = \sin u \implies dw = \cos u\,du" />:
              <M block t="\int \operatorname{ctg} u\,du \;=\; \int\frac{dw}{w} \;=\; \ln|\sin u| + C \;=\; -\ln|\csc u| + C." />
            </li>
          </ul>
        </Def>

        <p>
          Miért egyenlő <M t="-\ln|\cos u|" /> és <M t="\ln|\sec u|" />? A logaritmus reciprokszabálya miatt <M t="-\ln|\cos u| = \ln\left|\frac{1}{\cos u}\right| = \ln|\sec u|" />! A gyakorlatban gyakran a <M t="-\ln|\cos u|" /> alakot könnyebb megjegyezni, mert a koszinusz deriváltja a mínusz szinusz!
        </p>

        <TanIntegralWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/6} \operatorname{tg}(2x)\,dx" />!
            </>
          }
        >
          <p>
            Legyen <M t="u = 2x \implies dx = \frac{du}{2}" />, a határok <M t="0 \to \pi/3" />:
            <M block t="\frac{1}{2}\int_{0}^{\pi/3}\operatorname{tg} u\,du = \frac{1}{2}\Big[-\ln|\cos u|\Big]_{0}^{\pi/3} = \frac{1}{2}\left(-\ln\frac{1}{2} + \ln 1\right) = \mathbf{\frac{1}{2}\ln 2}." />
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Számítsd ki a <M t="\displaystyle\int_{\pi/6}^{\pi/2} \operatorname{ctg} x\,dx" /> integrált!
            </>
          }
        >
          <p>
            <M t="\Big[\ln|\sin x|\Big]_{\pi/6}^{\pi/2} = \ln(1) - \ln\!\left(\frac{1}{2}\right) = 0 - (-\ln 2) = \mathbf{\ln 2}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Logaritmusos deriválás és az ln(1 + x) ≈ x linearizáció',
    body: (
      <>
        <Story>
          <p>
            Képzeld el, hogy le kell deriválnod az <M t="y = \dfrac{(x^2+1)\sqrt{x+3}}{x-1}" /> függvényt! Hányadosszabályon belül szorzatszabály, azon belül gyökderiválás — kész hibacsapda! A <strong>logaritmusos deriválás</strong> ezt az egészet 3 soros, könnyed összeadássá varázsolja!
          </p>
        </Story>

        <Def title="A logaritmusos deriválás 4 lépése">
          <ol className="steps">
            <li><strong>Vegyél logaritmust mindkét oldalon:</strong> <M t="\ln|y| = \ln|\text{kifejezés}|" />.</li>
            <li><strong>Bontsd szét a logaritmusszabályokkal</strong> szorzatokból összegekre, hányadosokból különbségekre, kitevőkből szorzókra!</li>
            <li><strong>Deriváld mindkét oldalt implicit módon <M t="x" /> szerint:</strong> a bal oldal <M t="\dfrac{1}{y}\dfrac{dy}{dx}" />!</li>
            <li><strong>Szorozz be <M t="y" />-nal</strong>, és írd vissza <M t="y" /> eredeti képletét!</li>
          </ol>
        </Def>

        <LogDiffPipelineDiagram />

        <p>
          <strong>Bónusz — a kis változások aranyközelítése (Thomas 83. feladat):</strong> A 3.8-as szakasz linearizációjával az <M t="f(x) = \ln(1 + x)" /> függvény <M t="x = 0" /> pontbeli érintője <M t="L(x) = f(0) + f'(0)x = 0 + 1\cdot x = x" />. Ezért kis <M t="|x|" /> értékekre rendkívül pontosan teljesül, hogy <M t="\mathbf{\ln(1 + x) \approx x}" />!
        </p>

        <LnLinearizationWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Használj logaritmusos deriválást az <M t="y = \dfrac{\sqrt{x^2 + 1}}{(x + 1)^{2/3}}" /> (<M t="x > -1" />) függvény deriváltjának meghatározásához!
            </>
          }
        >
          <p>
            <M t="\ln y = \frac{1}{2}\ln(x^2+1) - \frac{2}{3}\ln(x+1)" />. Mindkét oldalt deriválva:
            <M block t="\frac{y'}{y} = \frac{x}{x^2+1} - \frac{2}{3(x+1)} \;\implies\; y' = \mathbf{\frac{\sqrt{x^2+1}}{(x+1)^{2/3}}\left(\frac{x}{x^2+1} - \frac{2}{3(x+1)}\right)}." />
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Becsüld meg számológép nélkül a linearizációval <M t="\ln(1{,}02)" /> és <M t="\ln(0{,}97)" /> értékét!
            </>
          }
        >
          <p>
            <M t="\ln(1{,}02) = \ln(1 + 0{,}02) \approx \mathbf{0{,}02}" /> (valódi: <M t="0{,}01980" />), és <M t="\ln(0{,}97) = \ln(1 - 0{,}03) \approx \mathbf{-0{,}03}" /> (valódi: <M t="-0{,}03046" />).
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
        <Def title="7.2 Puskakártya">
          <ul>
            <li><strong>Definíció és <M t="e" />:</strong> <M t="\ln x = \int_1^x \frac{1}{t}\,dt" /> (<M t="x > 0" />), <M t="\ln 1 = 0" />, <M t="\ln e = 1" /> (<M t="e \approx 2{,}71828" />).</li>
            <li><strong>Deriválás:</strong> <M t="(\ln x)' = \frac{1}{x}" />, <M t="(\ln|u|)' = \frac{u'}{u}" /> (<M t="u \ne 0" />).</li>
            <li><strong>Azonosságok:</strong> <M t="\ln(ab)=\ln a+\ln b" />, <M t="\ln(a/b)=\ln a-\ln b" />, <M t="\ln(1/b)=-\ln b" />, <M t="\ln(a^r)=r\ln a" />.</li>
            <li><strong>Integrálok:</strong> <M t="\int \frac{du}{u} = \ln|u| + C" />, <M t="\int \operatorname{tg} u\,du = -\ln|\cos u| + C = \ln|\sec u| + C" />, <M t="\int \operatorname{ctg} u\,du = \ln|\sin u| + C" />.</li>
            <li><strong>Logaritmusos deriválás:</strong> <M t="\ln|y| \to" /> szétszedés <M t="\to \frac{y'}{y} \to" /> szorzás <M t="y" />-nal!</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>5 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong>Összeg logaritmusa NEM bomlik szét:</strong> <M t="\ln(a + b) \ne \ln a + \ln b" />! Csak a <em>szorzat</em> bomlik összegre!
            </li>
            <li>
              <strong>Abszolútérték elhagyása:</strong> <M t="\int \frac{1}{x}\,dx = \ln|x| + C" /> — negatív intervallumon (pl. <M t="[-5;\,-1]" />) az abszolútérték nélkül értelmetlen lenne!
            </li>
            <li>
              <strong>Zérushely átlépése határozott integrálban:</strong> az <M t="\int_{-1}^{1} \frac{1}{x}\,dx" /> integrálra <em>nem</em> szabad alkalmazni a Newton–Leibniz-tételt, mert <M t="x = 0" />-nál szakadás (végtelen pólus) van!
            </li>
            <li>
              <strong>Páros hatványnál vigyázz az előjelre:</strong> <M t="\ln(x^2) = 2\ln|x|" />, nem <M t="2\ln x" />, ha <M t="x < 0" /> is megengedett!
            </li>
            <li>
              <strong>Logaritmusos deriválás vége:</strong> a bal oldalon <M t="y'/y" /> áll — a végén <em>soha ne felejts el beszorozni <M t="y" />-nal</em>!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={
            <>
              Deriváld: (a) <M t="y = \ln(5x - 3)" />, (b) <M t="y = x\ln x - x" />!
            </>
          }
        >
          <p>
            (a) <M t="y' = \mathbf{\dfrac{5}{5x-3}}" />.
          </p>
          <p>
            (b) Szorzatszabállyal: <M t="y' = 1\cdot\ln x + x\cdot\frac{1}{x} - 1 = \mathbf{\ln x}" />! <em>(Jegyezd meg: <M t="x\ln x - x" /> az <M t="\ln x" /> primitív függvénye!)</em>
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{1}^{e^2} \frac{3}{x}\,dx" />!
            </>
          }
        >
          <p>
            <M t="3\big[\ln x\big]_{1}^{e^2} = 3(\ln(e^2) - \ln 1) = 3(2\ln e - 0) = \mathbf{6}" />.
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{2x + 3}{x^2 + 3x - 1}\,dx" />!
            </>
          }
        >
          <p>
            A nevező deriváltja pontosan <M t="2x + 3" />, így azonnal <M t="\mathbf{\ln|x^2 + 3x - 1| + C}" />!
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={
            <>
              Számítsd ki az <M t="y = \ln x" /> és az <M t="y = \ln(2x)" /> görbék által közbezárt területet az <M t="[1;\,5]" /> intervallumon!
            </>
          }
        >
          <p>
            Mivel <M t="\ln(2x) - \ln x = \ln 2" /> állandó minden <M t="x > 0" />-ra, a két görbe közti terület egy <M t="4" /> széles és <M t="\ln 2" /> magas „görbe téglalap”:
            <M block t="A = \int_{1}^{5} \bigl(\ln(2x) - \ln x\bigr)\,dx = \int_{1}^{5} \ln 2\,dx = \mathbf{4\ln 2 = \ln 16}." />
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Számítsd ki a <M t="\displaystyle\int \frac{dx}{x\ln x}" /> határozatlan integrált (<M t="x > 1" />)!
            </>
          }
        >
          <p>
            Legyen <M t="u = \ln x \implies du = \frac{1}{x}\,dx" />:
            <M block t="\int \frac{1}{\ln x}\cdot\frac{1}{x}\,dx = \int\frac{du}{u} = \ln|u| + C = \mathbf{\ln|\ln x| + C}." />
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Deriváld logaritmusos deriválással: <M t="y = \dfrac{x^3\sqrt{x^2 + 4}}{(2x + 1)^5}" /> (<M t="x > 0" />)!
            </>
          }
        >
          <p>
            <M t="\ln y = 3\ln x + \frac{1}{2}\ln(x^2+4) - 5\ln(2x+1)" />. Deriválva:
            <M block t="y' = \mathbf{\frac{x^3\sqrt{x^2+4}}{(2x+1)^5}\left(\frac{3}{x} + \frac{x}{x^2+4} - \frac{10}{2x+1}\right)}." />
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={
            <>
              <em>Polinomosztás + logaritmus:</em> Számítsd ki <M t="\displaystyle\int_{0}^{2} \frac{x + 3}{x + 1}\,dx" /> értékét!
            </>
          }
        >
          <p>
            Bontsuk szét a törtet: <M t="\dfrac{x + 3}{x + 1} = \dfrac{(x + 1) + 2}{x + 1} = 1 + \dfrac{2}{x + 1}" />:
            <M block t="\int_{0}^{2}\left(1 + \frac{2}{x+1}\right)dx = \Big[x + 2\ln|x+1|\Big]_{0}^{2} = (2 + 2\ln 3) - (0 + 2\ln 1) = \mathbf{2 + 2\ln 3}." />
          </p>
        </Task>
        <Task
          n={22}
          q={
            <>
              <em>Kezdetiérték-feladat másodrendben (Thomas 82. feladat):</em> Oldd meg az <M t="y'' = \sec^2 x" />, <M t="y(0) = 0,\; y'(0) = 1" /> feladatot (<M t="-\pi/2 < x < \pi/2" />)!
            </>
          }
        >
          <p>
            Első integrálás: <M t="y'(x) = \operatorname{tg} x + C_1" />. Mivel <M t="y'(0) = 0 + C_1 = 1 \implies C_1 = 1" />, tehát <M t="y'(x) = \operatorname{tg} x + 1" />.
          </p>
          <p>
            Második integrálás: <M t="y(x) = -\ln|\cos x| + x + C_2" />. Mivel <M t="y(0) = -\ln 1 + 0 + C_2 = 0 \implies C_2 = 0" />, tehát <M t="\mathbf{y(x) = x - \ln(\cos x)}" />!
          </p>
        </Task>
        <Task
          n={23}
          q={
            <>
              <em>Ívhossz logaritmussal (Thomas 77a. feladat):</em> Számítsd ki az <M t="y = \dfrac{x^2}{8} - \ln x" /> görbe ívhosszát a <M t="[4;\,8]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="y' = \frac{x}{4} - \frac{1}{x}" />, ezért:
            <M block t="1 + (y')^2 = 1 + \frac{x^2}{16} - \frac{1}{2} + \frac{1}{x^2} = \frac{x^2}{16} + \frac{1}{2} + \frac{1}{x^2} = \left(\frac{x}{4} + \frac{1}{x}\right)^2!" />
            Így az ívhossz (teljes négyzet gyöke!):
            <M block t="L = \int_{4}^{8}\left(\frac{x}{4} + \frac{1}{x}\right)dx = \left[\frac{x^2}{8} + \ln x\right]_{4}^{8} = (8 + \ln 8) - (2 + \ln 4) = \mathbf{6 + \ln 2}." />
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Mi az <M t="y = \ln(x^2 + 4)" /> függvény deriváltja?
            </>
          }
          options={[
            { label: <M t="\dfrac{2x}{x^2 + 4}" />, ok: true },
            { label: <M t="\dfrac{1}{x^2 + 4}" /> },
            { label: <M t="\dfrac{2x}{\ln(x^2 + 4)}" /> },
            { label: <M t="\dfrac{x}{x^2 + 4}" /> },
          ]}
          explain={
            <>
              A láncszabály miatt <M t="(\ln u)' = \dfrac{u'}{u} = \dfrac{2x}{x^2 + 4}" />.
            </>
          }
        />
      </>
    ),
  },
];
