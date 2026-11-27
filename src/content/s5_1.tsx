import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  AverageValueWidget,
  CylinderSlicesWidget,
  RiemannRectsWidget,
  UpperLowerDiffWidget,
  VelocityDistanceWidget,
} from '../components/Widgets51';
import type { Page } from './s1_1';

export const S5_1: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Görbe alatti terület: közelítés téglalapokkal',
    body: (
      <>
        <Story>
          <p>
            Üdv a <strong>II. kötetben</strong> és az <strong>integrálszámítás</strong> világában! Az I. kötet nagy kérdése az <em>érintő meredeksége</em> volt (deriválás). A II. kötet nagy kérdése a <strong>görbe alatti terület</strong>: hogyan mérjük meg pontosan egy görbe vonallal határolt alakzat területét, egy változó sebességű rakéta megtett útját, vagy egy gömb térfogatát? A válasz Arkhimédész óta ugyanaz: <strong>szeleteld fel apró darabokra, közelítsd téglalapokkal, és add össze őket!</strong>
          </p>
        </Story>
        <p>
          Osszuk fel az <M t="[a;\,b]" /> intervallumot <M t="n" /> egyenlő részre! Ekkor minden egyes sáv szélessége:
        </p>
        <M block t="\Delta x = \frac{b - a}{n}, \qquad x_k = a + k\Delta x \quad (k = 0, 1, \dots, n)." />
        <p>
          Minden <M t="[x_{k-1};\,x_k]" /> részintervallum fölé egy téglalapot állítunk. Attól függően, hol mérjük meg a téglalap magasságát, három klasszikus véges összeget kapunk:
        </p>
        <Def title="Bal, jobb és középponti téglalap-közelítés (LRAM, RRAM, MRAM)">
          <ul>
            <li><strong>Bal oldali összeg (<M t="L_n" />):</strong> <M t="\bigl[f(x_0) + f(x_1) + \dots + f(x_{n-1})\bigr]\Delta x" />.</li>
            <li><strong>Jobb oldali összeg (<M t="R_n" />):</strong> <M t="\bigl[f(x_1) + f(x_2) + \dots + f(x_n)\bigr]\Delta x" />.</li>
            <li><strong>Középponti összeg (<M t="M_n" />):</strong> <M t="\bigl[f(\bar{x}_1) + f(\bar{x}_2) + \dots + f(\bar{x}_n)\bigr]\Delta x" />, ahol <M t="\bar{x}_k = \dfrac{x_{k-1}+x_k}{2}" /> a részintervallum felezőpontja.</li>
          </ul>
        </Def>
        <RiemannRectsWidget />
        <Steps
          source="Analízis-labor"
          title="Felezőponti téglalap-közelítés (M₄)"
          problem={
            <>
              Közelítsük az <M t="f(x) = 4 - x^2" /> görbe alatti területet a <M t="[0;\,2]" /> intervallumon <M t="n = 4" /> egyenlő téglalappal, a felezőponti szabály segítségével!
            </>
          }
          steps={[
            {
              title: 'Lépésköz és felezőpontok',
              body: (
                <p>
                  <M t="\Delta x = \dfrac{2 - 0}{4} = 0{,}5" />. A részintervallumok felezőpontjai: <M t="c_1 = 0{,}25,\; c_2 = 0{,}75,\; c_3 = 1{,}25,\; c_4 = 1{,}75" />.
                </p>
              ),
            },
            {
              title: 'Függvényértékek a felezőpontokban',
              body: (
                <p>
                  <M t="f(0{,}25) = 3{,}9375" />, <M t="f(0{,}75) = 3{,}4375" />, <M t="f(1{,}25) = 2{,}4375" />, <M t="f(1{,}75) = 0{,}9375" />.
                </p>
              ),
            },
            {
              title: 'Összegzés',
              body: (
                <M block t="M_4 = 0{,}5\cdot(3{,}9375 + 3{,}4375 + 2{,}4375 + 0{,}9375) = 0{,}5\cdot 10{,}75 = 5{,}375." />
              ),
            },
            {
              title: 'Összehasonlítás a pontos értékkel',
              body: (
                <p>
                  A pontos érték <M t="\dfrac{16}{3} \approx 5{,}3333" />, tehát a felezőponti közelítés hibája már <M t="n = 4" />-nél is csupán <M t="0{,}0417" />.
                </p>
              ),
            },
          ]}
        />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Becsüld meg az <M t="f(x)=x^2" /> görbe alatti területet a <M t="[0;\,2]" /> intervallumon <M t="n=4" /> részre osztással, (a) bal oldali (<M t="L_4" />) és (b) jobb oldali (<M t="R_4" />) összeggel!
            </>
          }
        >
          <p>
            <M t="\Delta x = \dfrac{2-0}{4} = 0{,}5" />, osztópontok: <M t="0;\; 0{,}5;\; 1;\; 1{,}5;\; 2" />.
          </p>
          <p>
            (a) <M t="L_4 = (0^2 + 0{,}5^2 + 1^2 + 1{,}5^2)\cdot 0{,}5 = 3{,}5 \cdot 0{,}5 = \mathbf{1{,}75}" />.
          </p>
          <p>
            (b) <M t="R_4 = (0{,}5^2 + 1^2 + 1{,}5^2 + 2^2)\cdot 0{,}5 = 7{,}5 \cdot 0{,}5 = \mathbf{3{,}75}" />. (A pontos érték <M t="\frac{8}{3}\approx 2{,}67" />!)
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Számítsd ki az 1. feladatban a <strong>középponti</strong> (<M t="M_4" />) közelítést is! Mennyivel közelebb van a pontos <M t="2{,}667" /> értékhez?
            </>
          }
        >
          <p>
            Felezőpontok: <M t="0{,}25;\; 0{,}75;\; 1{,}25;\; 1{,}75" />.
          </p>
          <p>
            <M t="M_4 = (0{,}0625 + 0{,}5625 + 1{,}5625 + 3{,}0625)\cdot 0{,}5 = 5{,}25\cdot 0{,}5 = \mathbf{2{,}625}" />! (Hiba mindössze <M t="0{,}042" />, szemben <M t="L_4" /> és <M t="R_4" /> közel <M t="1" />-es hibájával!)
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Alsó és felső összeg: a garantált hibakorlát',
    body: (
      <>
        <p>
          Honnan tudjuk biztosan, hogy az egyre finomabb téglalap-közelítések valóban a <em>pontos területhez</em> tartanak? Monoton függvényeknél elképesztően szép, elemi bizonyításunk van rá!
        </p>
        <ul>
          <li>Ha <M t="f" /> <strong>növekvő</strong> <M t="[a;\,b]" />-n, akkor <M t="L_n" /> az <strong>alsó összeg</strong> (minden téglalap a görbe alatt marad) és <M t="R_n" /> a <strong>felső összeg</strong> (minden téglalap túllóg), tehát <M t="L_n \le T \le R_n" />.</li>
          <li>Ha <M t="f" /> <strong>csökkenő</strong> <M t="[a;\,b]" />-n, a szerepek megfordulnak: <M t="R_n \le T \le L_n" />!</li>
        </ul>
        <Def title="A felső és alsó összeg különbsége (monoton f esetén)">
          <p>
            Mivel a belső tagok mind kiejtik egymást (teleszkopikus összeg!), <M t="R_n" /> és <M t="L_n" /> különbsége pontosan:
          </p>
          <M block t="|R_n - L_n| = |f(b) - f(a)|\cdot \Delta x = \frac{|f(b) - f(a)|(b - a)}{n}." />
          <p>
            Mivel a valódi <M t="T" /> terület <M t="L_n" /> és <M t="R_n" /> között helyezkedik el, a közelítés hibája <strong>legfeljebb</strong> ez a szám — és ha <M t="n\to\infty" />, a hiba <M t="0" />-hoz tart!
          </p>
        </Def>
        <UpperLowerDiffWidget />
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Ha <M t="f(x)" /> szigorúan növekvő az <M t="[a;\,b]" /> intervallumon, melyik végpontválasztás adja a <strong>felső</strong> (felülről közelítő) összeget?
            </>
          }
          options={[
            { label: 'A részintervallumok jobb oldali végpontjai', ok: true },
            { label: 'A részintervallumok bal oldali végpontjai' },
            { label: 'A felezőpontok' },
            { label: 'Mindig egyenlőek' },
          ]}
          explain={
            <>
              Növekvő függvény minden <M t="[x_{k-1};\,x_k]" /> részintervallumon a jobb oldali <M t="x_k" /> végpontban veszi fel a maximumát.
            </>
          }
        />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Hány egyenlő részre (<M t="n" />) kell osztani a <M t="[0;\,2]" /> intervallumot az <M t="f(x)=x^2" /> függvénynél, hogy az alsó és felső összeg eltérése kisebb legyen <M t="0{,}01" />-nél?
            </>
          }
        >
          <p>
            <M t="|R_n - L_n| = \dfrac{|f(2)-f(0)|(2-0)}{n} = \dfrac{4\cdot 2}{n} = \dfrac{8}{n} < 0{,}01 \iff n > 800" />! Tehát <M t="n = 801" /> már biztosan elég!
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Az <M t="f(x)=1/x" /> függvény a <M t="[1;\,3]" /> intervallumon csökkenő. Melyik az <em>alsó</em> és melyik a <em>felső</em> összeg: <M t="L_n" /> vagy <M t="R_n" />?
            </>
          }
        >
          <p>
            Mivel csökkenő, minden részintervallumon a bal végpontban nagyobb, a jobb végpontban kisebb a függvényérték → <strong><M t="L_n" /> a felső</strong> és <strong><M t="R_n" /> az alsó összeg</strong>!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Megtett út változó sebességből',
    body: (
      <>
        <p>
          Ha egy autó állandó <M t="v" /> sebességgel halad <M t="\Delta t" /> ideig, a megtett út <M t="v\cdot\Delta t" />. De mi van, ha a sebesség folyamatosan változik? Osszuk fel a <M t="[a;\,b]" /> időintervallumot <M t="n" /> rövid <M t="\Delta t" /> szakaszra! Egy-egy rövid időköz alatt a sebesség közel állandó, így a teljes megtett út közelítése:
        </p>
        <M block t="S \approx v(t_1)\Delta t + v(t_2)\Delta t + \dots + v(t_n)\Delta t." />
        <p>
          Ez <strong>pontosan ugyanaz a téglalap-összeg</strong>, mint a területnél! Vagyis egy nemnegatív sebességgel mozgó test által megtett út megegyezik a <strong>sebesség-idő (<M t="v(t)" />) görbe alatti területtel</strong>!
        </p>
        <VelocityDistanceWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Egy kerékpáros sebességét 2 másodpercenként mértük: <M t="t=0" />-nál <M t="4" /> m/s, <M t="t=2" />-nél <M t="6" /> m/s, <M t="t=4" />-nél <M t="9" /> m/s, <M t="t=6" />-nál <M t="11" /> m/s. Adj alsó és felső becslést a 6 másodperc alatt megtett útra (feltéve, hogy a sebesség végig nőtt)!
            </>
          }
        >
          <p>
            <M t="\Delta t = 2" /> s. Alsó becslés (bal): <M t="(4 + 6 + 9)\cdot 2 = 38" /> m. Felső becslés (jobb): <M t="(6 + 9 + 11)\cdot 2 = 52" /> m. (A kettő átlaga: <M t="45" /> m.)
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Miért mondhatjuk biztosan az 5. feladatban, hogy a valódi megtett út <M t="38" /> m és <M t="52" /> m között van?
            </>
          }
        >
          <p>
            Mert a sebesség végig növekvő volt, így minden 2 másodperces szakaszon a bal végponti sebesség biztosan alsó korlát, a jobb végponti pedig felső korlát!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Térfogat közelítése hengerszeletekkel',
    body: (
      <>
        <p>
          A véges összegek módszere három dimenzióban is ugyanolyan természetes! Egy forgástestet (például egy <M t="R=1" /> sugarú félgömböt) <M t="n" /> darab vékony, <M t="\Delta y = \dfrac{1}{n}" /> vastagságú vízszintes <strong>hengerkorongra</strong> szeletelünk.
        </p>
        <p>
          A <M t="k" />-adik szelet <M t="y_k" /> magasságban lévő keresztmetszetének sugara Pitagorasz-tételből <M t="r_k = \sqrt{1 - y_k^2}" />, ezért a korong térfogata:
        </p>
        <M block t="\Delta V_k = \pi r_k^2\,\Delta y = \pi(1 - y_k^2)\,\Delta y." />
        <p>
          Az összes korong térfogatát összeadva egyre pontosabban megkapjuk a félgömb térfogatát (<M t="\frac{2}{3}\pi \approx 2{,}0944" />)!
        </p>
        <CylinderSlicesWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Becsüld meg egy <M t="H=4" /> m magas, <M t="R=2" /> m alapsugarú egyenes kúp térfogatát <M t="n=4" /> egyenlő vastagságú (<M t="\Delta y=1" /> m) <em>középponti</em> hengerkoronggal! (Az <M t="y" /> magasságban a sugár <M t="r(y) = 2 - 0{,}5y" />.)
            </>
          }
        >
          <p>
            Felezőpontok: <M t="y = 0{,}5;\; 1{,}5;\; 2{,}5;\; 3{,}5" />, a megfelelő sugarak: <M t="1{,}75;\; 1{,}25;\; 0{,}75;\; 0{,}25" />.
          </p>
          <p>
            <M t="V \approx \pi(1{,}75^2 + 1{,}25^2 + 0{,}75^2 + 0{,}25^2)\cdot 1 = 5{,}25\pi \approx 16{,}49\;\text{m}^3" /> (a pontos kúptérfogat <M t="\frac{1}{3}\pi R^2 H = \frac{16}{3}\pi \approx 16{,}76\;\text{m}^3" />!).
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              A félgömbnél (<M t="r(y)=\sqrt{1-y^2}" /> csökkenő!) a szeletek alsó vagy felső lapjával vett korongok adnak <em>túlbecslést</em>?
            </>
          }
        >
          <p>
            Mivel felfelé szűkül a félgömb, az <strong>alsó lap</strong> sugara a nagyobb, tehát az alsó lapokkal (bal végponttal) számolt korongok túlbecsülik, a felső lapokkal számoltak alulbecsülik a térfogatot!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Folytonos függvény átlagértéke egy intervallumon',
    body: (
      <>
        <p>
          Véges sok szám (<M t="y_1, \dots, y_n" />) átlaga egyszerű: összeadjuk és elosztjuk <M t="n" />-nel. De hogyan definiáljuk egy <strong>folytonos <M t="f(x)" /> függvény átlagértékét</strong> az <M t="[a;\,b]" /> intervallumon, ahol végtelen sok érték van?
        </p>
        <p>
          Vegyünk <M t="n" /> egyenletesen elosztott mintapontot <M t="c_1, \dots, c_n" /> (<M t="\Delta x = \dfrac{b-a}{n} \iff n = \dfrac{b-a}{\Delta x}" />):
        </p>
        <M block t="\frac{f(c_1) + f(c_2) + \dots + f(c_n)}{n} = \frac{1}{b-a}\bigl[f(c_1)\Delta x + \dots + f(c_n)\Delta x\bigr] \;\approx\; \frac{\text{görbe alatti terület}}{b - a}!" />
        <Def title="Függvény átlagértéke (geometriai értelemben)">
          <p>
            Egy nemnegatív <M t="f" /> függvény <strong>átlagértéke</strong> az <M t="[a;\,b]" /> intervallumon a görbe alatti terület osztva az intervallum hosszával:
          </p>
          <M block t="\text{átlag}(f) = \frac{\text{Terület}}{b - a}." />
        </Def>
        <AverageValueWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Mi az <M t="f(x) = 3x" /> lineáris függvény pontos átlagértéke a <M t="[0;\,4]" /> intervallumon?
            </>
          }
        >
          <p>
            A görbe alatti alakzat egy <M t="4" /> alapú, <M t="12" /> magas derékszögű háromszög, területe <M t="\dfrac{4\cdot 12}{2} = 24" />. Az átlagérték: <M t="\dfrac{24}{4-0} = \mathbf{6}" />!
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Mi az <M t="f(x)=\sqrt{4-x^2}" /> felső félkör átlagértéke a <M t="[-2;\,2]" /> intervallumon? (Használd a kör területképletét!)
            </>
          }
        >
          <p>
            Az <M t="R=2" /> sugarú félkör területe <M t="\dfrac{1}{2}\pi\cdot 2^2 = 2\pi" />. Az intervallum hossza <M t="2-(-2)=4" />, tehát az átlagérték: <M t="\dfrac{2\pi}{4} = \dfrac{\pi}{2} \approx 1{,}571" />!
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
              <th>fogalom</th>
              <th>képlet / jelentés</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lépésköz (<M t="n" /> rész)</td>
              <td><M t="\Delta x = \dfrac{b-a}{n}" />, osztópontok <M t="x_k = a + k\Delta x" /></td>
            </tr>
            <tr>
              <td><M t="L_n,\; R_n,\; M_n" /></td>
              <td>Bal, jobb és középponti téglalap-közelítés (<M t="M_n" /> a legpontosabb!)</td>
            </tr>
            <tr>
              <td>Hibakorlát (monoton <M t="f" />)</td>
              <td><M t="|R_n - L_n| = |f(b)-f(a)|\cdot \Delta x" /></td>
            </tr>
            <tr>
              <td>Megtett út / Térfogat / Átlag</td>
              <td>Mind véges összegek határértéke (<M t="v\Delta t" />, <M t="\pi r^2\Delta y" />, <M t="\text{Terület}/(b-a)" />)</td>
            </tr>
          </tbody>
        </table>
        <h3>Négy klasszikus hiba</h3>
        <Warn>
          <p>
            <strong>1. A <M t="\Delta x" /> szorzás elfelejtése:</strong> ha csak összeadod a függvényértékeket (<M t="f(x_1)+\dots+f(x_n)" />) és elfelejted megszorozni <M t="\Delta x" />-szel, az eredmény <M t="1/\Delta x" />-szeresére torzul!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. Bal = alsó tévhit:</strong> <M t="L_n" /> csak <em>növekvő</em> függvénynél alsó összeg! <em>Csökkenő</em> függvénynél <M t="L_n" /> a <strong>felső</strong>, <M t="R_n" /> az <strong>alsó</strong> összeg!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Végpontok száma vs. téglalapok száma:</strong> <M t="n=4" /> téglalaphoz <M t="5" /> osztópont tartozik (<M t="x_0, x_1, x_2, x_3, x_4" />), de minden összegben pontosan <strong>4 tag</strong> van!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Nem egyenlő osztásközök:</strong> mért adatoknál mindig ellenőrizd, hogy minden <M t="\Delta t_k" /> egyforma-e — ha nem, minden téglalapot a saját szélességével kell szorozni!
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
              Számítsd ki <M t="L_4" /> és <M t="R_4" /> értékét az <M t="f(x) = 2x + 1" /> függvényre a <M t="[0;\,4]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="\Delta x = 1" />, osztópontok <M t="0, 1, 2, 3, 4" />, értékek <M t="1, 3, 5, 7, 9" />.
          </p>
          <p>
            <M t="L_4 = (1+3+5+7)\cdot 1 = 16" />, <M t="R_4 = (3+5+7+9)\cdot 1 = 24" />. (Pontos trapézterület: <M t="20" />.)
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Számítsd ki a 11. feladatban <M t="M_4" /> értékét! Mit veszel észre?
            </>
          }
        >
          <p>
            Felezőpontok: <M t="0{,}5;\; 1{,}5;\; 2{,}5;\; 3{,}5" />, értékek: <M t="2, 4, 6, 8" /> → <M t="M_4 = (2+4+6+8)\cdot 1 = \mathbf{20}" /> — lineáris függvénynél a középponti szabály <strong>tökéletesen pontos</strong>!
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Számítsd ki <M t="L_3" /> és <M t="R_3" /> értékét az <M t="f(x)=x^2+1" /> függvényre a <M t="[0;\,3]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="\Delta x = 1" />. <M t="L_3 = f(0)+f(1)+f(2) = 1+2+5 = 8" />; <M t="R_3 = f(1)+f(2)+f(3) = 2+5+10 = 17" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Becsüld meg az <M t="f(x)=\dfrac{1}{x}" /> görbe alatti területet az <M t="[1;\,3]" /> intervallumon <M t="n=4" /> középponti téglalappal (<M t="M_4" />)!
            </>
          }
        >
          <p>
            <M t="\Delta x = 0{,}5" />, felezőpontok: <M t="1{,}25;\; 1{,}75;\; 2{,}25;\; 2{,}75" />.
          </p>
          <p>
            <M t="M_4 = 0{,}5\left(\dfrac{4}{5}+\dfrac{4}{7}+\dfrac{4}{9}+\dfrac{4}{11}\right) \approx 0{,}5(0{,}8+0{,}571+0{,}444+0{,}364) \approx \mathbf{1{,}090}" /> (a pontos érték <M t="\ln 3 \approx 1{,}099" />!).
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Számítsd ki <M t="M_4" /> értékét az <M t="f(x)=\sin x" /> függvényre a <M t="[0;\,\pi]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="\Delta x = \dfrac{\pi}{4}" />, felezőpontok: <M t="\dfrac{\pi}{8},\; \dfrac{3\pi}{8},\; \dfrac{5\pi}{8},\; \dfrac{7\pi}{8}" />.
          </p>
          <p>
            Szimmetriával: <M t="M_4 = \dfrac{\pi}{4}\cdot 2\bigl(\sin(\pi/8)+\sin(3\pi/8)\bigr) \approx 0{,}7854\cdot 2(0{,}3827 + 0{,}9239) \approx \mathbf{2{,}052}" /> (pontos érték: <M t="2" />!).
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Egy <M t="f(x)=x^3" /> függvénynél a <M t="[0;\,2]" /> intervallumon legalább mekkora <M t="n" /> kell ahhoz, hogy <M t="R_n - L_n \le 0{,}05" /> legyen?
            </>
          }
        >
          <p>
            <M t="R_n - L_n = \dfrac{(f(2)-f(0))(2-0)}{n} = \dfrac{8\cdot 2}{n} = \dfrac{16}{n} \le 0{,}05 \iff n \ge \dfrac{16}{0{,}05} = \mathbf{320}" />!
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              Egy vízcsapból a kifolyó víz sebessége (liter/perc): <M t="t=0" />-nál <M t="12" />, <M t="t=1" />-nél <M t="10" />, <M t="t=3" />-nál <M t="7" />, <M t="t=6" />-nál <M t="4" />. Figyeld meg, hogy az időközök <strong>nem egyenlők</strong>! Adj felső és alsó becslést a 6 perc alatt kifolyt vízmennyiségre (csökkenő ütem mellett)!
            </>
          }
        >
          <p>
            Az időközök: <M t="\Delta t_1 = 1" />, <M t="\Delta t_2 = 2" />, <M t="\Delta t_3 = 3" /> perc.
          </p>
          <p>
            Felső (bal): <M t="12\cdot 1 + 10\cdot 2 + 7\cdot 3 = 12 + 20 + 21 = \mathbf{53}" /> liter. Alsó (jobb): <M t="10\cdot 1 + 7\cdot 2 + 4\cdot 3 = 10 + 14 + 12 = \mathbf{36}" /> liter.
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Mekkora az <M t="f(x) = |x - 2|" /> függvény pontos átlagértéke a <M t="[0;\,5]" /> intervallumon?
            </>
          }
        >
          <p>
            A görbe alatti terület két derékszögű háromszög: <M t="[0;\,2]" />-n <M t="\dfrac{2\cdot 2}{2}=2" />, <M t="[2;\,5]" />-ön <M t="\dfrac{3\cdot 3}{2}=4{,}5" />, összesen <M t="6{,}5" />. Átlagérték: <M t="\dfrac{6{,}5}{5} = \mathbf{1{,}3}" />!
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Mutasd meg, hogy bármely <M t="f(x)=mx+c" /> lineáris függvénynél az <M t="[a;\,b]" /> intervallumon <M t="\dfrac{L_n + R_n}{2}" /> (a bal és jobb összeg átlaga) <strong>minden <M t="n \ge 1" /> esetén pontosan megegyezik</strong> a görbe alatti trapéz területével!
            </>
          }
        >
          <p>
            Egyetlen <M t="[x_{k-1};\,x_k]" /> sávon <M t="\dfrac{f(x_{k-1}) + f(x_k)}{2}\cdot \Delta x" /> éppen az adott sáv pontos <strong>trapézterülete</strong>! Így ezek összege minden <M t="n" /> esetén pontosan a teljes trapéz területét adja (ez a <em>trapézszabály</em> alapötlete)!
          </p>
        </Task>
      </>
    ),
  },
];
