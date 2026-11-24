import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  ConcavityBiasDiagram,
  EulerGeometryDiagram,
  EulerInstabilityWidget,
  EulerStepTableWidget,
  EulerVsRK2Widget,
  HeunPredictorDiagram,
  MethodComparisonDiagram,
  StepSizeErrorWidget,
} from '../components/Widgets93';
import type { Page } from './s1_1';

export const S9_3: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Numerikus megoldás: az Euler-módszer geometriája',
    body: (
      <>
        <Story>
          <p>
            A 9.1-ben és 9.2-ben megtanultuk pontosan megoldani a szétválasztható és a lineáris differenciálegyenleteket.
            De mi van egy olyan, ártatlannak tűnő egyenlettel, mint az <M t="y' = x^2 + y^2" /> vagy az{' '}
            <M t="y' = \sin(x^2)" />? Ezeknek <strong>nincs elemi függvényekkel felírható zárt megoldása</strong>!
            Az időjárás-előrejelzés, a rakétapályák és a gyógyszerkinetika mégis ezredmásodperc alatt megoldja őket —
            <strong>numerikus módszerekkel</strong>, amelyek ősatyja Leonhard Euler 1768-as érintőléptetése!
          </p>
        </Story>

        <p>
          Az ötlet a 3.8-as <strong>linearizáció</strong> közvetlen folytatása: induljunk a megadott{' '}
          <M t="(x_0;\,y_0)" /> pontból! Ott a megoldásgörbe érintőjének meredeksége pontosan{' '}
          <M t="f(x_0, y_0)" />. Ha egy kis <M t="h = dx" /> lépést teszünk ezen az érintőn, eljutunk az{' '}
          <M t="(x_1;\,y_1)" /> pontba — ahol újra kiolvassuk az iránymező meredekségét, és lépünk tovább!
        </p>

        <Def title="Az Euler-módszer iterációs képlete">
          <p>
            Az <M t="y' = f(x, y),\; y(x_0) = y_0" /> kezdetiérték-probléma közelítő megoldása <M t="h = dx" />{' '}
            lépésközzel:
          </p>
          <M block t="x_n = x_{n-1} + h, \qquad y_n = y_{n-1} + f(x_{n-1}, y_{n-1})\cdot h \qquad (n = 1, 2, 3, \dots)." />
        </Def>

        <EulerGeometryDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={<>Számítsd ki az első két Euler-lépést (<M t="y_1, y_2" />) az <M t="y' = x + y,\; y(0) = 1" /> feladatra <M t="h = 0{,}5" /> lépésközzel!</>}
        >
          <p>
            1. lépés (<M t="x_0=0,\; y_0=1" />): <M t="f(0,1)=1 \implies y_1 = 1 + 1\cdot 0{,}5 = \mathbf{1{,}5}" /> (<M t="x_1=0{,}5" />).
          </p>
          <p>
            2. lépés (<M t="x_1=0{,}5,\; y_1=1{,}5" />): <M t="f(0{,}5, 1{,}5)=2 \implies y_2 = 1{,}5 + 2\cdot 0{,}5 = \mathbf{2{,}5}" /> (<M t="x_2=1" />).
          </p>
        </Task>
        <Task
          n={2}
          q={<>Ha <M t="y' = 2x" /> és <M t="y(0) = 0" />, miért ad az Euler-módszer minden <M t="h > 0" /> lépésközre <em>kisebb</em> értéket, mint a pontos <M t="y(x) = x^2" />?</>}
        >
          <p>
            Mert az <M t="y=x^2" /> parabola mindenütt <strong>konvex</strong> (<M t="y''=2>0" />), így az érintői minden lépésben a görbe <em>alatt</em> haladnak!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Az Euler-táblázat felépítése lépésről lépésre',
    body: (
      <>
        <p>
          Kézi számolásnál a legátláthatóbb, ha <strong>táblázatba</strong> rendezzük a lépéseket. Nézzük végig a
          klasszikus <strong>Thomas 2. példát</strong>: <M t="y' = 1 + y,\; y(0) = 1" /> (pontos megoldás:{' '}
          <M t="y = 2e^x - 1" />, így <M t="y(1) = 2e - 1 \approx 4{,}4366" />), <M t="h = 0{,}2" /> lépésközzel:
        </p>

        <table className="tbl">
          <thead>
            <tr>
              <th><M t="n" /></th>
              <th><M t="x_n" /></th>
              <th><M t="y_n" /> (Euler)</th>
              <th><M t="f(x_n, y_n) = 1+y_n" /></th>
              <th><M t="\Delta y = f\cdot h" /></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>0,0</td>
              <td>1,0000</td>
              <td>2,0000</td>
              <td>0,4000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>0,2</td>
              <td>1,4000</td>
              <td>2,4000</td>
              <td>0,4800</td>
            </tr>
            <tr>
              <td>2</td>
              <td>0,4</td>
              <td>1,8800</td>
              <td>2,8800</td>
              <td>0,5760</td>
            </tr>
            <tr>
              <td>3</td>
              <td>0,6</td>
              <td>2,4560</td>
              <td>3,4560</td>
              <td>0,6912</td>
            </tr>
            <tr>
              <td>4</td>
              <td>0,8</td>
              <td>3,1472</td>
              <td>4,1472</td>
              <td>0,8294</td>
            </tr>
            <tr>
              <td>5</td>
              <td>1,0</td>
              <td><strong>3,9766</strong></td>
              <td>—</td>
              <td>(pontos: 4,4366)</td>
            </tr>
          </tbody>
        </table>

        <EulerStepTableWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={<>Becsüld meg <M t="y(0{,}6)" /> értékét az <M t="y' = 2y,\; y(0) = 1" /> feladatra <M t="h = 0{,}2" /> lépésközzel (3 lépés)!</>}
        >
          <p>
            Mivel <M t="y_n = y_{n-1} + 2y_{n-1}(0{,}2) = 1{,}4\,y_{n-1}" />, három lépés után:{' '}
            <M t="y_3 = 1{,}4^3 = \mathbf{2{,}744}" />! (Pontos: <M t="e^{1{,}2} \approx 3{,}320" />.)
          </p>
        </Task>
        <Task
          n={4}
          q={<>Hány Euler-lépés szükséges az <M t="x_0 = 1" /> ponttól <M t="x = 3" />-ig, ha <M t="h = 0{,}25" />?</>}
        >
          <p>
            <M t="N = \dfrac{3 - 1}{0{,}25} = \mathbf{8}" /> lépés!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Pontosság, hibaelemzés és a konvexitás szerepe',
    body: (
      <>
        <p>
          Mennyire pontos az Euler-módszer? Kétféle csonkítási hibát kell megkülönböztetnünk:
        </p>
        <ul>
          <li>
            <strong>Lokális (egylépéses) hiba:</strong> Taylor-sorból egyetlen lépésben a hiba{' '}
            <M t="\approx \frac{1}{2}y''(x_0)h^2 = O(h^2)" /> (a lépésköz négyzetével arányos).
          </li>
          <li>
            <strong>Globális (összesített) hiba:</strong> az <M t="[x_0;\,b]" /> intervallumon{' '}
            <M t="N = \frac{b-x_0}{h}" /> lépést teszünk, és a hibák felhalmozódnak, ezért a végső hiba{' '}
            <M t="N \cdot O(h^2) = \mathbf{O(h)}" /> (elsőrendű módszer)!
          </li>
        </ul>
        <Def title="Az Euler-módszer hibaszabálya (elsőrendű konvergencia)">
          <p>
            Ha az Euler-módszer lépésközét <strong>felére csökkented</strong> (<M t="h \to h/2" />), akkor a
            globális hiba nagyjából a <strong>felére csökken</strong> (miközben kétszer annyi lépést kell számolni).
          </p>
        </Def>

        <StepSizeErrorWidget />
        <ConcavityBiasDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={<>Ha <M t="h = 0{,}1" /> lépésközzel az Euler-módszer hibája <M t="0{,}24" />, körülbelül mekkora hibára számíthatsz <M t="h = 0{,}025" /> esetén?</>}
        >
          <p>
            A lépésköz <strong>negyedére</strong> csökkent, ezért az elsőrendű (<M t="O(h)" />) globális hiba is nagyjából a negyedére esik:{' '}
            <M t="\approx \dfrac{0{,}24}{4} = \mathbf{0{,}06}" />!
          </p>
        </Task>
        <Task
          n={6}
          q={<>Az <M t="y' = \dfrac{1}{1+x},\; y(0) = 0" /> egyenlet megoldása <M t="y(x) = \ln(1+x)" />. Alul- vagy felülbecsüli az Euler-módszer <M t="y(1)" /> értékét?</>}
        >
          <p>
            Mivel <M t="y''(x) = -\dfrac{1}{(1+x)^2} < 0" />, a görbe mindenütt <strong>konkáv</strong>, így az
            érintők a görbe felett futnak → az Euler-módszer <strong>felülbecsüli</strong> <M t="\ln 2" />-t!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A javított Euler-módszer (Heun / 2. rendű Runge–Kutta)',
    body: (
      <>
        <p>
          Miért torzít az egyszerű Euler-módszer? Mert a teljes <M t="[x_{n-1};\,x_n]" /> szakaszon a{' '}
          <em>bal végponti</em> meredekséget használja, mintha az út közben nem is kanyarodna a görbe! Ha viszont a
          kezdőponti és a (becsült) végponti meredekség <strong>átlagával</strong> lépünk (ugyanaz az ötlet, mint a
          trapézszabály a 8.7-ben!), drámaian megnő a pontosság!
        </p>

        <Def title="Javított Euler-módszer (Heun-módszer / RK2)">
          <p>Minden lépés két részből (prediktor + korrektor) áll:</p>
          <M block t="k_1 = f(x_{n-1}, y_{n-1}), \qquad z_n = y_{n-1} + k_1 h, \qquad k_2 = f(x_n, z_n)," />
          <M block t="y_n = y_{n-1} + \frac{k_1 + k_2}{2}\cdot h." />
          <p>
            Globális hibája <strong>másodrendű: <M t="O(h^2)" /></strong>! Ha felezed <M t="h" />-t, a hiba{' '}
            <strong>negyedére</strong> csökken!
          </p>
        </Def>

        <HeunPredictorDiagram />
        <EulerVsRK2Widget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={<>Számíts ki <strong>1 lépést</strong> javított Euler-módszerrel (RK2) az <M t="y' = 1 + y,\; y(0) = 1" /> feladatra <M t="h = 0{,}2" /> lépésközzel, és hasonlítsd a pontos <M t="y(0{,}2) = 2e^{0{,}2}-1 \approx 1{,}4428" /> értékhez!</>}
        >
          <p>
            1) <M t="k_1 = 1 + 1 = 2" />, prediktor: <M t="z_1 = 1 + 2(0{,}2) = 1{,}4" />.
          </p>
          <p>
            2) <M t="k_2 = 1 + 1{,}4 = 2{,}4" />.
          </p>
          <p>
            3) Korrektor: <M t="y_1 = 1 + \dfrac{2 + 2{,}4}{2}(0{,}2) = 1 + 0{,}44 = \mathbf{1{,}4400}" />! (Hiba csak <M t="0{,}0028" />, szemben az egyszerű Euler <M t="0{,}0428" />-as hibájával — 15× pontosabb!)
          </p>
        </Task>
        <Task
          n={8}
          q={<>Ha a javított Euler-módszer (<M t="O(h^2)" />) hibája <M t="h=0{,}1" />-nél <M t="0{,}008" />, körülbelül mennyi lesz <M t="h=0{,}05" />-nél?</>}
        >
          <p>
            Felezett lépésköznél a hiba negyedére esik: <M t="\approx \dfrac{0{,}008}{4} = \mathbf{0{,}002}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Mikor omlik össze az Euler-módszer? Aszimptota és instabilitás',
    body: (
      <>
        <p>
          A numerikus módszerek kényelmesek, de <strong>vakrepülést</strong> okozhatnak két jellegzetes helyzetben:
        </p>
        <ul>
          <li>
            <strong>1. Véges idő alatti felrobbanás (függőleges aszimptota):</strong> az{' '}
            <M t="y' = y^2,\; y(0) = 1" /> feladat pontos megoldása <M t="y(x) = \dfrac{1}{1-x}" />, amely{' '}
            <M t="x=1" />-nél <M t="+\infty" />-be szökik! Az Euler-módszer azonban nem látja az aszimptotát, és
            gond nélkül kiír egy véges, teljesen hamis számot <M t="x=1" />-nél és <M t="x=1{,}5" />-nél is!
          </li>
          <li>
            <strong>2. Numerikus instabilitás (túl nagy <M t="h" />):</strong> az <M t="y' = -\lambda y" />{' '}
            (<M t="\lambda > 0" />) gyorsan csillapodó egyenletnél az Euler-lépés{' '}
            <M t="y_n = (1 - \lambda h)^n y_0" />. Ha <M t="|1 - \lambda h| > 1 \iff h > \dfrac{2}{\lambda}" />, a
            számított értékek <strong>előjelet váltva végtelenbe robbannak</strong>, miközben a valódi megoldás 0-hoz tart!
          </li>
        </ul>

        <EulerInstabilityWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={<>Az <M t="y' = -20y,\; y(0) = 1" /> egyenletnél legfeljebb mekkora <M t="h" /> lépésközt szabad választani, hogy az Euler-módszer stabil maradjon (<M t="|1-20h| < 1" />)?</>}
        >
          <p>
            <M t="h < \dfrac{2}{20} = \mathbf{0{,}1}" />! (Sőt oszcillációmentes csillapodáshoz <M t="h \le 0{,}05" /> kell!)
          </p>
        </Task>
        <Task
          n={10}
          q={<>Mit ad 2 Euler-lépés (<M t="h=0{,}5" />) az <M t="y' = y^2,\; y(0)=1" /> egyenletre <M t="x=1" />-nél, és miért teljesen hamis ez?</>}
        >
          <p>
            <M t="y_1 = 1 + 1^2(0{,}5) = 1{,}5" />; <M t="y_2 = 1{,}5 + 1{,}5^2(0{,}5) = 2{,}625" />. A pontos megoldás{' '}
            <M t="y = \frac{1}{1-x}" /> viszont <M t="x=1" />-nél <strong>nem is létezik</strong> (függőleges aszimptota)!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Visszafelé léptetés (h < 0) és kitekintés az RK4-re',
    body: (
      <>
        <p>
          Az Euler-módszer <strong>negatív <M t="h < 0" /> lépésközzel</strong> is pontosan ugyanúgy működik: ha{' '}
          <M t="y(1)=2" /> adott, és <M t="y(0)" /> értékét keressük, egyszerűen <M t="h = -0{,}2" /> lépésekkel
          haladunk balra!
        </p>
        <p>
          <strong>Kitekintés — a mérnöki ipar igáslova (RK4):</strong> a modern szoftverek (MATLAB, SciPy,
          űrkutatás) leggyakrabban a <strong>4. rendű Runge–Kutta-módszert (RK4)</strong> használják, amely minden
          lépésben 4 meredekséget (<M t="k_1" /> elején, <M t="k_2, k_3" /> középen, <M t="k_4" /> végén) súlyoz:{' '}
          <M t="y_n = y_{n-1} + \frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)" />. Globális hibája <M t="O(h^4)" />!
        </p>

        <MethodComparisonDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={<>Becsüld meg <M t="y(0{,}6)" /> értékét visszafelé lépkedve (<M t="h = -0{,}2" />, 2 lépés) az <M t="y' = x - y,\; y(1) = 2" /> feladatra!</>}
        >
          <p>
            1. lépés (<M t="x_0=1,\; y_0=2" />): <M t="f(1,2)=-1 \implies y_1 = 2 + (-1)(-0{,}2) = 2{,}2" /> (<M t="x_1=0{,}8" />).
          </p>
          <p>
            2. lépés (<M t="x_1=0{,}8,\; y_1=2{,}2" />): <M t="f(0{,}8, 2{,}2)=-1{,}4 \implies y_2 = 2{,}2 + (-1{,}4)(-0{,}2) = \mathbf{2{,}48}" />!
          </p>
        </Task>
        <Task
          n={12}
          q={<>Az RK4 módszernél (<M t="O(h^4)" />) hányszorosára csökken a hiba, ha a lépésközt tizedére (<M t="h/10" />) csökkented?</>}
        >
          <p>
            <M t="10^4 = \mathbf{10\,000}" />-ed részére! (Míg az egyszerű Eulernél csak tizedére!)
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglalás és a 4 legnagyobb buktató',
    body: (
      <>
        <table className="tbl">
          <thead>
            <tr>
              <th>fogalom / módszer</th>
              <th>képlet / tulajdonság</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Euler-módszer</td>
              <td><M t="y_n = y_{n-1} + f(x_{n-1}, y_{n-1})\cdot h" /> · globális hiba <M t="O(h)" /></td>
            </tr>
            <tr>
              <td>Javított Euler (RK2)</td>
              <td><M t="z_n = y_{n-1}+k_1 h,\; y_n = y_{n-1}+\frac{k_1+k_2}{2}h" /> · hiba <M t="O(h^2)" /></td>
            </tr>
            <tr>
              <td>Konvexitási torzítás</td>
              <td><M t="y'' > 0 \Rightarrow" /> Euler alulbecsül; <M t="y'' < 0 \Rightarrow" /> Euler felülbecsül</td>
            </tr>
            <tr>
              <td>Stabilitás (<M t="y'=-\lambda y" />)</td>
              <td><M t="h < 2/\lambda" /> kell, különben oszcillálva felrobban!</td>
            </tr>
          </tbody>
        </table>

        <h3>Négy klasszikus buktató</h3>
        <Warn>
          <p>
            <strong>1. A <M t="h" /> szorzó elfelejtése:</strong> az új érték <M t="y_{n-1} + f(x_{n-1}, y_{n-1})\cdot \mathbf{h}" />, nem pedig <M t="y_{n-1} + f" />!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. Új <M t="x_n" /> behelyettesítése a régi helyett:</strong> az egyszerű Eulerben <M t="y_n" /> számolásához mindig a <em>megelőző</em> <M t="(x_{n-1}, y_{n-1})" /> pontot írjuk <M t="f" />-be!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Korai kerekítés a táblázatban:</strong> ha 2 tizedesjegyre kerekítesz minden sorban, a kerekítési hiba 10 lépés alatt eltorzítja a végeredményt! Tarts meg legalább 4–5 jegyet végig!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Ellenőrzés nélküli futtatás:</strong> mindig futtasd le <em>felezett lépésközzel</em> (<M t="h/2" />) is — ha a két eredmény drasztikusan eltér, <M t="h" /> túl nagy volt vagy aszimptota van a közelben!
          </p>
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={<>Milyen típusú differenciálegyenletre ad az Euler-módszer <em>minden</em> <M t="h" /> lépésközre <strong>teljesen pontos</strong> eredményt?</>}
        >
          <p>
            Amikor a pontos megoldás <strong>lineáris függvény</strong> (<M t="y'' \equiv 0" />, vagyis <M t="y' = c" /> állandó), mert ekkor az érintő egybeesik a görbével!
          </p>
        </Task>
        <Task
          n={14}
          q={<>Miért nem kell a javított Euler-módszerben a prediktor <M t="z_n" /> értéket megtartani a következő lépéshez?</>}
        >
          <p>
            Mert <M t="z_n" /> csak egy ideiglenes próbabecslés volt a végponti <M t="k_2 = f(x_n, z_n)" /> meredekség kiszámításához; a következő lépés mindig a pontosabb <strong>korrektor <M t="y_n" /></strong> pontból indul!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Lépcsőzetes gyakorlófeladatok (könnyűtől a haladóig)',
    body: (
      <>
        <p>Oldd meg az alábbi 9 feladatot növekvő nehézségi sorrendben!</p>

        <h3>Könnyebb (alapozó) feladatok</h3>
        <Task
          n={15}
          q={<>Alkalmazd az Euler-módszert <M t="h = 0{,}5" /> lépésközzel (2 lépés) az <M t="y' = 2x,\; y(0) = 1" /> feladatra, és becsüld meg <M t="y(1)" />-et!</>}
        >
          <p>
            <M t="y_1 = 1 + 2(0)(0{,}5) = 1" /> (<M t="x_1=0{,}5" />); <M t="y_2 = 1 + 2(0{,}5)(0{,}5) = \mathbf{1{,}5}" />. (Pontos: <M t="y=x^2+1 \Rightarrow y(1)=2" />.)
          </p>
        </Task>
        <Task
          n={16}
          q={<>Számíts ki 3 Euler-lépést (<M t="h = 0{,}1" />) az <M t="y' = y,\; y(0) = 1" /> feladatra!</>}
        >
          <p>
            Mivel <M t="y_n = 1{,}1\,y_{n-1}" />: <M t="y_1 = 1{,}1" />, <M t="y_2 = 1{,}21" />, <M t="y_3 = \mathbf{1{,}331}" /> (pontos: <M t="e^{0{,}3} \approx 1{,}3499" />).
          </p>
        </Task>
        <Task
          n={17}
          q={<>Számíts ki 2 Euler-lépést (<M t="h = 0{,}5" />) az <M t="y' = y - 1,\; y(0) = 3" /> feladatra!</>}
        >
          <p>
            <M t="y_1 = 3 + (3-1)(0{,}5) = 4" />; <M t="y_2 = 4 + (4-1)(0{,}5) = \mathbf{5{,}5}" />. (Pontos: <M t="y = 1 + 2e^x \Rightarrow y(1) \approx 6{,}437" />.)
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={<>Becsüld meg <M t="y(0{,}4)" /> értékét az <M t="y' = x + y^2,\; y(0) = 0" /> nemlineáris egyenletre <M t="h = 0{,}2" /> lépésközzel (2 Euler-lépés)!</>}
        >
          <p>
            1. lépés (<M t="0; 0" />): <M t="f(0,0)=0 \implies y_1 = 0" /> (<M t="x_1=0{,}2" />).
          </p>
          <p>
            2. lépés (<M t="0{,}2; 0" />): <M t="f(0{,}2, 0)=0{,}2 \implies y_2 = 0 + 0{,}2(0{,}2) = \mathbf{0{,}04}" />!
          </p>
        </Task>
        <Task
          n={19}
          q={<>Oldd meg a 15. feladatot (<M t="y' = 2x,\; y(0) = 1,\; h = 0{,}5" />, 2 lépés) <strong>javított Euler-módszerrel (RK2)</strong>! Mit veszel észre?</>}
        >
          <p>
            1. lépés (<M t="0 \to 0{,}5" />): <M t="k_1=0,\; k_2=2(0{,}5)=1 \implies y_1 = 1 + \frac{0+1}{2}(0{,}5) = 1{,}25" />.
          </p>
          <p>
            2. lépés (<M t="0{,}5 \to 1" />): <M t="k_1=1,\; k_2=2(1)=2 \implies y_2 = 1{,}25 + \frac{1+2}{2}(0{,}5) = \mathbf{2{,}00}" /> — <strong>tökéletesen pontos!</strong> (Másodfokú polinomra az RK2 egzakt!)
          </p>
        </Task>
        <Task
          n={20}
          q={<>Becsüld meg <M t="y(1{,}4)" /> értékét az <M t="y' = \dfrac{y}{x},\; y(1) = 2" /> feladatra <M t="h = 0{,}2" /> lépésközzel (2 Euler-lépés)!</>}
        >
          <p>
            1. lépés (<M t="1; 2" />): <M t="f(1,2)=2 \implies y_1 = 2 + 2(0{,}2) = 2{,}4" /> (<M t="x_1=1{,}2" />).
          </p>
          <p>
            2. lépés (<M t="1{,}2; 2{,}4" />): <M t="f(1{,}2, 2{,}4)=2 \implies y_2 = 2{,}4 + 2(0{,}2) = \mathbf{2{,}8}" />! (Pontos megoldás: <M t="y = 2x" />, ami egyenes, ezért az Euler pontos!)
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={<>Mutasd meg, hogy az <M t="y' = y,\; y(0) = 1" /> feladatra <M t="x = 1" />-nél az <M t="N" /> lépéses Euler-becslés pontosan <M t="y_N = \left(1 + \dfrac{1}{N}\right)^N" />, és ez <M t="N \to \infty" /> esetén az <M t="e" /> számhoz tart!</>}
        >
          <p>
            Mivel <M t="h = \dfrac{1}{N}" />, minden lépés <M t="y_k = y_{k-1} + y_{k-1}\cdot\dfrac{1}{N} = \left(1+\dfrac{1}{N}\right)y_{k-1}" />.
          </p>
          <p>
            <M t="N" /> lépés után <M t="y_N = \left(1+\dfrac{1}{N}\right)^N \cdot 1 \;\xrightarrow{N\to\infty}\; \mathbf{e}" /> — ami éppen a pontos <M t="y(1)=e^1" /> megoldás!
          </p>
        </Task>
        <Task
          n={22}
          q={<>Becsüld meg <M t="y(0{,}4)" /> értékét <strong>javított Euler-módszerrel (RK2)</strong> az <M t="y' = x + y,\; y(0) = 1" /> feladatra <M t="h = 0{,}2" /> lépésközzel (2 lépés)!</>}
        >
          <p>
            1. lépés (<M t="0; 1 \to 0{,}2" />): <M t="k_1 = 0+1 = 1" />, <M t="z_1 = 1 + 0{,}2 = 1{,}2" />, <M t="k_2 = 0{,}2 + 1{,}2 = 1{,}4" /> → <M t="y_1 = 1 + 1{,}2(0{,}2) = 1{,}24" />.
          </p>
          <p>
            2. lépés (<M t="0{,}2; 1{,}24 \to 0{,}4" />): <M t="k_1 = 1{,}44" />, <M t="z_2 = 1{,}24 + 0{,}288 = 1{,}528" />, <M t="k_2 = 0{,}4 + 1{,}528 = 1{,}928" /> → <M t="y_2 = 1{,}24 + \dfrac{1{,}44+1{,}928}{2}(0{,}2) = \mathbf{1{,}5768}" />! (Pontos: <M t="2e^{0{,}4}-0{,}4-1 \approx 1{,}5836" />!)
          </p>
        </Task>
        <Task
          n={23}
          q={<>Hasonlítsd össze <M t="y' = -y,\; y(0) = 1" /> esetén a pontos <M t="y(x)=e^{-x}" /> megoldást az Euler-módszerrel <M t="h = 1{,}5" /> és <M t="h = 2{,}5" /> lépésközöknél! Melyik stabil?</>}
        >
          <p>
            Itt <M t="\lambda = 1" />, a stabilitási feltétel <M t="|1-h| < 1 \iff h < 2" />!
          </p>
          <p>
            <M t="h=1{,}5" /> esetén <M t="y_n = (-0{,}5)^n \to 0" /> (oszcillálva ugyan, de <strong>stabil</strong>!). <M t="h=2{,}5" /> esetén <M t="y_n = (-1{,}5)^n" /> (<strong>instabil</strong>, felrobban!).
          </p>
        </Task>
      </>
    ),
  },
];
