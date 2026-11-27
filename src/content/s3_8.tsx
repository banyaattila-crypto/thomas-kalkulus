import { M } from '../components/M';
import { Def, Quiz, Story, Task, Warn } from '../components/ui';
import {
  BinomialApproxWidget,
  DifferentialFlowDiagram,
  DifferentialGeometryWidget,
  ErrorPropagationWidget,
  LinearizationZoomWidget,
} from '../components/Widgets38';
import type { Page } from './s1_1';

export const S3_8: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Linearizáció: az érintő mint nagyító',
    body: (
      <>
        <Story>
          <p>
            A Föld felszíne gömbölyű, mégis síknak látjuk a kertünket és lapos térképpel tájékozódunk a városban. Miért működik ez? Mert minden <strong>sima (differenciálható) görbe</strong> elegendően nagy nagyítás alatt szinte megkülönböztethetetlen az érintőegyenesétől! Ezt a jelenséget hívjuk <strong>lokális linearitásnak</strong> — és ez adja a legegyszerűbb képletet bonyolult értékek fejben történő becsléséhez.
          </p>
        </Story>
        <p>
          Ha az <M t="f" /> függvény differenciálható az <M t="x=a" /> pontban, akkor az ottani érintőegyenes egyenlete <M t="y = f(a) + f'(a)(x-a)" />. Amíg <M t="x" /> közel marad <M t="a" />-hoz, ez az egyszerű lineáris függvény nagyon pontosan közelíti <M t="f(x)" />-et!
        </p>
        <Def title="Linearizáció és standard lineáris közelítés">
          <p>
            Az <M t="f" /> függvény <strong>linearizációja</strong> az <M t="x=a" /> pontban:
          </p>
          <M block t="L(x) = f(a) + f'(a)(x - a)." />
          <p>
            Az <M t="f(x) \approx L(x)" /> becslést <M t="f" /> <strong>lineáris (érintővonalas) közelítésének</strong> nevezzük <M t="a" /> környezetében.
          </p>
        </Def>
        <p>
          <strong>Példa:</strong> becsüljük meg <M t="\sqrt{4{,}12}" /> értékét számológép nélkül! Válasszuk a közeli, könnyen számolható <M t="a=4" /> pontot <M t="f(x)=\sqrt{x}" /> esetén: <M t="f(4)=2" />, <M t="f'(x)=\frac{1}{2\sqrt{x}} \Rightarrow f'(4)=\frac{1}{4}" />. Így <M t="L(x)=2+\frac{1}{4}(x-4)" />, amiből:
        </p>
        <M block t="\sqrt{4{,}12} \approx L(4{,}12) = 2 + \frac{1}{4}(0{,}12) = 2{,}03 \quad (\text{pontosan: } 2{,}02978\ldots)." />
        <LinearizationZoomWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Írd fel az <M t="f(x)=\sqrt{x}" /> függvény linearizációját az <M t="a=9" /> pontban, és becsüld meg vele <M t="\sqrt{9{,}3}" /> értékét!
            </>
          }
        >
          <p>
            <M t="f(9)=3" />, <M t="f'(9)=\dfrac{1}{2\sqrt{9}}=\dfrac{1}{6}" />, tehát <M t="L(x)=3+\dfrac{1}{6}(x-9)" />.
          </p>
          <p>
            Behelyettesítve: <M t="\sqrt{9{,}3} \approx 3 + \dfrac{0{,}3}{6} = 3{,}05" /> (a pontos érték <M t="3{,}04959\ldots" />).
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Add meg az <M t="f(x)=\cos x" /> függvény linearizációját az <M t="a=\dfrac{\pi}{2}" /> pontban!
            </>
          }
        >
          <p>
            <M t="f(\pi/2)=\cos(\pi/2)=0" />, <M t="f'(x)=-\sin x \Rightarrow f'(\pi/2)=-1" />.
          </p>
          <p>
            Így <M t="L(x) = 0 - 1\cdot\left(x-\dfrac{\pi}{2}\right) = \dfrac{\pi}{2} - x" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Nevezetes lineáris közelítések és a (1 + x)ᵏ szabály',
    body: (
      <>
        <p>
          A fizikában és a mérnöki gyakorlatban különösen fontosak az <M t="x=0" /> körüli (kis <M t="|x|" /> melletti) közelítések. A legfontosabb általános képlet a <strong>binomiális közelítés</strong>:
        </p>
        <Def title="Binomiális lineáris közelítés (x ≈ 0 esetén)">
          <p>
            Tetszőleges <M t="k" /> valós kitevőre az <M t="f(x)=(1+x)^k" /> függvénynél <M t="f(0)=1" /> és <M t="f'(0)=k" />, ezért:
          </p>
          <M block t="(1 + x)^k \approx 1 + kx \qquad (|x| \ll 1)." />
        </Def>
        <p>
          Néhány mindennapi speciális eset <M t="x\approx 0" /> közelében (szögeknél szigorúan <strong>radiánban</strong>!):
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>függvény</th>
              <th>lineáris közelítés (<M t="x\approx 0" />)</th>
              <th>honnan jön?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><M t="\sqrt{1+x}" /></td>
              <td><M t="1 + \frac{1}{2}x" /></td>
              <td><M t="k = \frac{1}{2}" /></td>
            </tr>
            <tr>
              <td><M t="\dfrac{1}{1+x}" /></td>
              <td><M t="1 - x" /></td>
              <td><M t="k = -1" /></td>
            </tr>
            <tr>
              <td><M t="\dfrac{1}{\sqrt{1+x}}" /></td>
              <td><M t="1 - \frac{1}{2}x" /></td>
              <td><M t="k = -\frac{1}{2}" /></td>
            </tr>
            <tr>
              <td><M t="\sin x" /></td>
              <td><M t="x" /></td>
              <td><M t="\sin 0 = 0,\; \cos 0 = 1" /></td>
            </tr>
            <tr>
              <td><M t="\cos x" /></td>
              <td><M t="1" /></td>
              <td><M t="\cos 0 = 1,\; -\sin 0 = 0" /></td>
            </tr>
            <tr>
              <td><M t="\operatorname{tg} x" /></td>
              <td><M t="x" /></td>
              <td><M t="\operatorname{tg} 0 = 0,\; \sec^2 0 = 1" /></td>
            </tr>
          </tbody>
        </table>
        <BinomialApproxWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Használd az <M t="(1+x)^k \approx 1+kx" /> szabályt a <M t="\dfrac{1}{1{,}02}" /> és a <M t="\sqrt[3]{1{,}06}" /> megbecslésére!
            </>
          }
        >
          <p>
            1) <M t="\dfrac{1}{1{,}02} = (1+0{,}02)^{-1} \approx 1 - 0{,}02 = 0{,}98" /> (pontosan <M t="0{,}98039\ldots" />).
          </p>
          <p>
            2) <M t="\sqrt[3]{1{,}06} = (1+0{,}06)^{1/3} \approx 1 + \dfrac{1}{3}\cdot 0{,}06 = 1{,}02" /> (pontosan <M t="1{,}01961\ldots" />).
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Miért írják a fizikakönyvek az inga kis kitérésénél, hogy <M t="\sin\theta \approx \theta" />? Mekkora a hiba <M t="\theta = 0{,}1" /> rad (<M t="\approx 5{,}7^\circ" />) esetén?
            </>
          }
        >
          <p>
            Mert <M t="\sin\theta" /> linearizációja <M t="0" />-ban éppen <M t="L(\theta)=\theta" />.
          </p>
          <p>
            <M t="\theta=0{,}1" /> radnál <M t="\sin(0{,}1)\approx 0{,}09983" />, az eltérés mindössze <M t="0{,}00017" /> (kevesebb mint <M t="0{,}2\%" />!).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Differenciálok: dy kontra Δy',
    body: (
      <>
        <Story>
          <p>
            Eddig a <M t="\dfrac{dy}{dx}" /> jelölést egyetlen, szétválaszthatatlan szimbólumként kezeltük. Leibniz azonban zseniális ötlettel állt elő: adjunk önálló értelmet a <M t="dx" /> és a <M t="dy" /> mennyiségeknek úgy, hogy a hányadosuk tényleg a derivált legyen!
          </p>
        </Story>
        <Def title="A differenciál definíciója">
          <p>
            Legyen <M t="y=f(x)" /> differenciálható függvény. A <strong><M t="dx" /> differenciál</strong> tetszőleges valós független változó (lépésköz). A <strong><M t="dy" /> differenciál</strong> pedig a <M t="dx" />-től és <M t="x" />-től függő mennyiség:
          </p>
          <M block t="dy = f'(x)\,dx." />
        </Def>
        <p>
          Geometriailag két különböző függőleges elmozdulást kell tisztán megkülönböztetnünk, amikor <M t="x" />-ből <M t="x+dx" />-be lépünk (<M t="\Delta x = dx" />):
        </p>
        <ul>
          <li>
            <strong><M t="\Delta y = f(x+dx) - f(x)" /></strong>: a <em>görbe</em> tényleges magasságváltozása.
          </li>
          <li>
            <strong><M t="dy = f'(x)\,dx" /></strong>: az <em>érintőegyenes</em> magasságváltozása — vagyis <M t="\Delta y" /> lineáris közelítése (<M t="\Delta y \approx dy" />)!
          </li>
        </ul>
        <DifferentialGeometryWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Számítsd ki <M t="y=x^3-2x" /> esetén <M t="dy" /> képletét, majd értékét <M t="x=2" />, <M t="dx=0{,}05" /> mellett!
            </>
          }
        >
          <p>
            <M t="f'(x)=3x^2-2 \Rightarrow dy=(3x^2-2)\,dx" />.
          </p>
          <p>
            Behelyettesítve: <M t="dy=(3\cdot 4 - 2)\cdot 0{,}05 = 10\cdot 0{,}05 = 0{,}5" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Hasonlítsd össze <M t="\Delta y" />-t és <M t="dy" />-t az <M t="y=x^2" /> függvénynél <M t="x=3" /> és <M t="dx=0{,}1" /> esetén! Mekkora a közelítési hiba (<M t="|\Delta y - dy|" />)?
            </>
          }
        >
          <p>
            <M t="\Delta y = 3{,}1^2 - 3^2 = 9{,}61 - 9 = 0{,}61" />.
          </p>
          <p>
            <M t="dy = 2x\,dx = 2\cdot 3\cdot 0{,}1 = 0{,}60" />. A hiba mindössze <M t="|\Delta y - dy| = 0{,}01 = (dx)^2" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Differenciálási szabályok differenciál-alakban',
    body: (
      <>
        <p>
          Minden deriválási szabályt egyetlen mozdulattal átírhatunk <strong>differenciál-alakba</strong> — egyszerűen megszorozzuk <M t="dx" />-szel, és a láncszabály automatikusan működik! Ez a jelölés később, az <em>integrálásnál</em> (helyettesítési módszer, 5. fejezet) aranyat fog érni.
        </p>
        <DifferentialFlowDiagram />
        <p>
          <strong>Hogyan működik összetett függvénynél?</strong> Tegyük fel, hogy <M t="y = \sin(3x^2)" />. Kétféleképpen is felírhatjuk <M t="dy" />-t — mindkettő ugyanazt adja:
        </p>
        <M block t="dy = \cos(3x^2)\cdot d(3x^2) = \cos(3x^2)\cdot 6x\,dx = 6x\cos(3x^2)\,dx." />
        <p>
          A <M t="d(\cdot)" /> operátor tehát pontosan úgy viselkedik, mint a deriválás, csak a végén mindig ott marad a belső változó differenciálja (<M t="dx" /> vagy <M t="du" />)!
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Határozd meg <M t="dy" />-t a következő függvényekre: (a) <M t="y=\operatorname{tg}(2x)" />, (b) <M t="y=\dfrac{x}{x+1}" />!
            </>
          }
        >
          <p>
            (a) <M t="dy = \sec^2(2x)\cdot d(2x) = 2\sec^2(2x)\,dx" />.
          </p>
          <p>
            (b) Hányadosszabállyal: <M t="dy = \dfrac{(x+1)\,dx - x\,dx}{(x+1)^2} = \dfrac{1}{(x+1)^2}\,dx" />.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Add meg <M t="dy" />-t az <M t="y=\sqrt{1+x^2}" /> függvényre!
            </>
          }
        >
          <p>
            <M t="dy = \dfrac{1}{2\sqrt{1+x^2}}\cdot d(1+x^2) = \dfrac{2x}{2\sqrt{1+x^2}}\,dx = \dfrac{x}{\sqrt{1+x^2}}\,dx" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Hibaterjedés, érzékenység és százalékos hiba',
    body: (
      <>
        <p>
          A mérések sosem tökéletesen pontosak: ha egy kör sugarát <M t="r=10" /> cm-nek mérjük <M t="\pm 0{,}2" /> cm pontossággal, mekkora hibát okoz ez a számított területben? A differenciálok pontosan erre adnak villámgyors választ!
        </p>
        <Def title="Abszolút, relatív és százalékos változás becslése">
          <p>
            Ha a bemenet <M t="a" />-ról <M t="a+dx" />-re változik (vagy <M t="dx" /> a mérési hiba), akkor <M t="f" /> változásának becslései:
          </p>
          <ul>
            <li>
              <strong>Abszolút változás (hiba):</strong> <M t="\Delta f \approx df = f'(a)\,dx" />
            </li>
            <li>
              <strong>Relatív változás (hiba):</strong> <M t="\dfrac{\Delta f}{f(a)} \approx \dfrac{df}{f(a)}" />
            </li>
            <li>
              <strong>Százalékos változás (hiba):</strong> <M t="\dfrac{\Delta f}{f(a)}\cdot 100\% \approx \dfrac{df}{f(a)}\cdot 100\%" />
            </li>
          </ul>
        </Def>
        <p>
          <strong>Ökölszabály hatványfüggvényekre:</strong> ha egy fizikai vagy geometriai mennyiség <M t="Q = c\cdot r^n" /> alakú, akkor <M t="dQ = c\cdot n r^{n-1}\,dr" />, így elosztva <M t="Q" />-val:
        </p>
        <M block t="\frac{dQ}{Q} = n\cdot\frac{dr}{r}." />
        <p>
          Vagyis egy <M t="2\%" />-os sugárhiba a kör területében (<M t="n=2" />) kb. <strong><M t="4\%" /></strong>, a gömb térfogatában (<M t="n=3" />) pedig kb. <strong><M t="6\%" /></strong> hibát okoz! A derivált <M t="f'(a)" /> nagysága pedig a függvény <strong>érzékenységét</strong> méri: minél nagyobb <M t="|f'(a)|" />, annál érzékenyebb a kimenet a bemenet kis hibáira.
        </p>
        <ErrorPropagationWidget />
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Egy kocka élhosszát <M t="1\%" />-os hibával mérjük. A differenciál-közelítés szerint körülbelül mekkora lesz a térfogat (<M t="V = x^3" />) relatív hibája?
            </>
          }
          options={[
            { label: <M t="3\%" />, ok: true },
            { label: <M t="1\%" /> },
            { label: <M t="6\%" /> },
            { label: <M t="9\%" /> },
          ]}
          explain={
            <>
              <M t="\dfrac{dV}{V} = \dfrac{3x^2\,dx}{x^3} = 3\dfrac{dx}{x}" />, tehát a térfogat relatív hibája az él relatív hibájának háromszorosa: <M t="3\%" />.
            </>
          }
        />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Egy <M t="r=20" /> cm sugarú gömb alakú tartályra <M t="0{,}1" /> cm vastag védőfestéket visznek fel. Becsüld meg differenciállal a szükséges festék térfogatát (<M t="dV" />)!
            </>
          }
        >
          <p>
            <M t="V=\dfrac{4}{3}\pi r^3 \Rightarrow dV = 4\pi r^2\,dr" /> (szemléletesen: a felszín szorozva a rétegvastagsággal!).
          </p>
          <p>
            <M t="dV = 4\pi(20)^2(0{,}1) = 160\pi \approx 502{,}7\;\text{cm}^3" /> (kb. fél liter festék).
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Egy kocka térfogatát legfeljebb <M t="3\%" /> hibával szabad meghatározni. Legfeljebb hány százalékos hibával mérhetjük meg a kocka élét?
            </>
          }
        >
          <p>
            <M t="V=a^3 \Rightarrow \dfrac{dV}{V}=3\dfrac{da}{a}" />. Mivel <M t="\left|\dfrac{dV}{V}\right|\le 3\%" />, a megengedett élhiba <M t="\left|\dfrac{da}{a}\right|\le \dfrac{3\%}{3} = 1\%" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás, a 3. fejezet lezárása és a 4 buktató',
    body: (
      <>
        <table className="tbl">
          <thead>
            <tr>
              <th>fogalom</th>
              <th>képlet</th>
              <th>mire használjuk?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Linearizáció <M t="a" />-ban</td>
              <td><M t="L(x) = f(a) + f'(a)(x-a)" /></td>
              <td>függvényérték becslése <M t="a" /> közelében</td>
            </tr>
            <tr>
              <td>Binomiális közelítés</td>
              <td><M t="(1+x)^k \approx 1+kx" /></td>
              <td>gyökök, törtek, hatványok <M t="x\approx 0" />-nál</td>
            </tr>
            <tr>
              <td>Differenciál</td>
              <td><M t="dy = f'(x)\,dx" /></td>
              <td>tényleges <M t="\Delta y" /> közelítése az érintőn</td>
            </tr>
            <tr>
              <td>Relatív / %-os hiba</td>
              <td><M t="\dfrac{df}{f(a)}" /> (és <M t="\times 100\%" />)</td>
              <td>mérési hibák terjedése, tűréshatárok</td>
            </tr>
          </tbody>
        </table>
        <Def title="A 3. fejezet (Differenciálás) lezárása — mit tanultál meg?">
          <p>
            Ezzel befejezted a <strong>3. fejezetet</strong>! A definícióból kiindulva (3.1) felépítetted a deriválási szabályokat (3.2), megértetted a változási sebességet (3.3), deriváltad a trigonometrikus függvényeket (3.4), a láncszabállyal és paraméteres görbékkel összetett kifejezéseket oldottál meg (3.5), megtanultad az implicit deriválást (3.6), a kapcsolt deriváltakat (3.7), és most a linearizációt és a differenciálokat (3.8). A 4. fejezetben mindezt szélsőértékekre, görbevizsgálatra és optimalizálásra használjuk majd!
          </p>
        </Def>
        <h3>Négy klasszikus buktató</h3>
        <Warn>
          <p>
            <strong>1. Túl távoli <M t="a" /> pont választása:</strong> a linearizáció <em>helyi</em> közelítés! Ha <M t="\sqrt{10}" />-et kell becsülni, válaszd <M t="a=9" />-et, ne <M t="a=4" />-et!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. Fok használata radián helyett:</strong> a <M t="\sin x \approx x" /> és a <M t="(\sin x)'=\cos x" /> képletek <strong>kizárólag radiánban</strong> igazak! Ha fokban adott a szög (pl. <M t="2^\circ" />), előbb váltsd át: <M t="2^\circ = \frac{\pi}{90}\approx 0{,}0349" /> rad.
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. A <M t="dx" /> lehagyása:</strong> a derivált <M t="f'(x)" />, a differenciál viszont <M t="dy = f'(x)\,dx" />! Ha <M t="dy" />-t kérdeznek, sosem maradhat el a <M t="dx" /> tényező.
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Abszolút és relatív hiba összekeverése:</strong> a <M t="dV = 12\;\text{cm}^3" /> abszolút hiba (mértékegysége van), míg a <M t="dV/V = 0{,}03 = 3\%" /> dimenzió nélküli relatív/százalékos hiba!
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
              Add meg az <M t="f(x)=x^3-2x+3" /> függvény linearizációját az <M t="a=2" /> pontban!
            </>
          }
        >
          <p>
            <M t="f(2)=8-4+3=7" />, <M t="f'(x)=3x^2-2 \Rightarrow f'(2)=10" />.
          </p>
          <p>
            Így <M t="L(x) = 7 + 10(x-2) = 10x - 13" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Becsüld meg lineáris közelítéssel <M t="\sqrt{16{,}4}" /> értékét!
            </>
          }
        >
          <p>
            <M t="f(x)=\sqrt{x}" />, <M t="a=16" />: <M t="f(16)=4" />, <M t="f'(16)=\dfrac{1}{2\sqrt{16}}=\dfrac{1}{8}" />.
          </p>
          <p>
            <M t="\sqrt{16{,}4} \approx 4 + \dfrac{1}{8}(0{,}4) = 4{,}05" /> (pontosan <M t="4{,}04969\ldots" />).
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Írd fel <M t="dy" />-t az <M t="y = x^4 - 5x^2 + 1" /> függvényre, majd számítsd ki az értékét <M t="x=1" />, <M t="dx=-0{,}02" /> esetén!
            </>
          }
        >
          <p>
            <M t="dy = (4x^3 - 10x)\,dx" />. Behelyettesítve: <M t="dy = (4-10)(-0{,}02) = (-6)(-0{,}02) = +0{,}12" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Határozd meg az <M t="f(x)=\dfrac{1}{\sqrt{1+2x}}" /> függvény linearizációját <M t="a=0" />-ban, és becsüld meg <M t="\dfrac{1}{\sqrt{1{,}08}}" /> értékét!
            </>
          }
        >
          <p>
            Binomiális közelítéssel (<M t="k=-1/2" />, belső tag <M t="2x" />): <M t="(1+2x)^{-1/2} \approx 1 - \dfrac{1}{2}(2x) = 1 - x" />.
          </p>
          <p>
            <M t="1+2x=1{,}08 \Rightarrow x=0{,}04" />, tehát <M t="\dfrac{1}{\sqrt{1{,}08}} \approx 1 - 0{,}04 = 0{,}96" /> (pontosan <M t="0{,}96225\ldots" />).
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Becsüld meg <M t="\sin(46^\circ)" /> értékét linearizációval! (Tipp: <M t="a=\frac{\pi}{4}=45^\circ" />, és <M t="1^\circ = \frac{\pi}{180}\approx 0{,}01745" /> rad.)
            </>
          }
        >
          <p>
            <M t="f(x)=\sin x" />, <M t="f(\pi/4)=\dfrac{\sqrt{2}}{2}\approx 0{,}7071" />, <M t="f'(\pi/4)=\cos(\pi/4)=\dfrac{\sqrt{2}}{2}\approx 0{,}7071" />.
          </p>
          <p>
            <M t="\sin(46^\circ) \approx \dfrac{\sqrt{2}}{2}\left(1 + \dfrac{\pi}{180}\right) \approx 0{,}7071\cdot 1{,}01745 \approx 0{,}7194" /> (pontosan <M t="0{,}71934\ldots" />).
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Egy fémlemezből kivágott körlap sugara melegítés hatására <M t="10" /> cm-ről <M t="10{,}05" /> cm-re nő. Becsüld meg differenciállal a terület növekedését (<M t="dA" />) és a százalékos növekedést!
            </>
          }
        >
          <p>
            <M t="A=\pi r^2 \Rightarrow dA = 2\pi r\,dr = 2\pi(10)(0{,}05) = \pi \approx 3{,}14\;\text{cm}^2" />.
          </p>
          <p>
            Százalékos növekedés: <M t="\dfrac{dA}{A}=2\dfrac{dr}{r}=2\cdot\dfrac{0{,}05}{10}=0{,}01=1\%" />.
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              Egy <M t="10" /> cm élhosszúságú fémkocka tömegét a térfogatából számolják ki. Ha az él mérésekor legfeljebb <M t="0{,}04" /> cm hibát követhetünk el, mekkora a térfogat maximális becsült abszolút és százalékos hibája?
            </>
          }
        >
          <p>
            <M t="V=a^3 \Rightarrow dV = 3a^2\,da = 3(10)^2(0{,}04) = 12\;\text{cm}^3" /> (abszolút hiba).
          </p>
          <p>
            Százalékos hiba: <M t="\dfrac{dV}{V}=3\dfrac{da}{a}=3\cdot\dfrac{0{,}04}{10}=0{,}012=1{,}2\%" />.
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Egy inga lengésideje <M t="T = 2\pi\sqrt{\dfrac{L}{g}}" /> (ahol <M t="g" /> állandó). Ha az inga <M t="L" /> hossza nyári melegben <M t="0{,}4\%" />-kal megnyúlik, hány százalékkal változik meg a lengésidő? Siet vagy késik az ingaóra?
            </>
          }
        >
          <p>
            Mivel <M t="T = c\cdot L^{1/2}" />, a hatványszabály szerint <M t="\dfrac{dT}{T} = \dfrac{1}{2}\dfrac{dL}{L} = \dfrac{1}{2}\cdot 0{,}4\% = +0{,}2\%" />.
          </p>
          <p>
            A lengésidő <M t="0{,}2\%" />-kal <em>nő</em> (lassabban leng), ezért az óra <strong>késni</strong> fog (naponta kb. <M t="0{,}002\cdot 86\,400 \approx 173" /> másodpercet, azaz majdnem 3 percet!).
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Az <M t="x^2 + y^2 = 25" /> körvonalon a <M t="(3;\,4)" /> pontból úgy lépünk tovább, hogy <M t="dx = 0{,}2" />. Implicit differenciálással becsüld meg <M t="dy" /> értékét és az új <M t="y" /> koordinátát!
            </>
          }
        >
          <p>
            Az egyenlet differenciálját véve: <M t="2x\,dx + 2y\,dy = 0 \Rightarrow dy = -\dfrac{x}{y}\,dx" />.
          </p>
          <p>
            A <M t="(3;\,4)" /> pontban <M t="dy = -\dfrac{3}{4}(0{,}2) = -0{,}15" />, így az új koordináta <M t="y \approx 4 - 0{,}15 = 3{,}85" /> (pontosan <M t="\sqrt{25-3{,}2^2}=\sqrt{14{,}76}\approx 3{,}8419" />).
          </p>
        </Task>
      </>
    ),
  },
];
