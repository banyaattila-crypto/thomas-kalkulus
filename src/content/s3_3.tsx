import { M } from '../components/M';
import { Def, Quiz, Story, Task, Warn } from '../components/ui';
import {
  GeoRateWidget,
  MarginalEconWidget,
  MotionLadderDiagram,
  SensitivityWidget,
  VelocityGraphWidget,
  VerticalThrowWidget,
} from '../components/Widgets33';
import type { Page } from './s1_1';

export const S3_3: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Pillanatnyi változási sebesség — nem csak az idő függvényében',
    body: (
      <>
        <Story>
          <p>
            A „sebesség” szóról szinte mindenkinek egy mozgó autó jut eszébe. A kalkulusban azonban a derivált ennél sokkal tágabb: <strong>bármely két összefüggő mennyiség</strong> egymáshoz viszonyított változási ütemét méri — legyen szó egy kör területéről az átmérő függvényében, egy gyár költségéről a darabszám függvényében, vagy egy gyógyszer hatásáról az adagolás függvényében.
          </p>
        </Story>
        <Def title="Pillanatnyi változási sebesség">
          <p>
            Az <M t="f(x)" /> függvény <M t="x=x_0" /> helybeli <strong>pillanatnyi változási sebessége</strong> az átlagos változási sebességek határértéke, vagyis maga a derivált:
          </p>
          <M block t="f'(x_0) = \lim_{h\to 0}\frac{f(x_0+h)-f(x_0)}{h}." />
          <p>
            <strong>Mértékegysége</strong> mindig az <M t="f" /> mértékegysége osztva az <M t="x" /> mértékegységével!
          </p>
        </Def>
        <p>
          <strong>Geometriai példa:</strong> egy <M t="D" /> átmérőjű kör területe <M t="A(D)=\dfrac{\pi}{4}D^2" />. A terület változási sebessége az átmérőre nézve:
        </p>
        <M block t="\frac{dA}{dD} = \frac{\pi}{4}\cdot 2D = \frac{\pi}{2}D." />
        <p>
          Amikor <M t="D=10" /> m, a változási sebesség <M t="5\pi \approx 15{,}71\;\text{m}^2/\text{m}" />. Ez azt jelenti, hogy ekkora átmérőnél 1 méternyi átmérőnövelés nagyjából <M t="15{,}7" /> négyzetméterrel növeli a területet.
        </p>
        <GeoRateWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Egy <M t="r" /> sugarú gömb térfogata <M t="V(r)=\dfrac{4}{3}\pi r^3" />. Mekkora a térfogat változási sebessége a sugár függvényében? Melyik ismert képletet kapod?
            </>
          }
        >
          <p>
            <M t="\dfrac{dV}{dr}=\dfrac{4}{3}\pi\cdot 3r^2 = 4\pi r^2" /> — éppen a gömb <strong>felszíne</strong>! (A növekvő gömb egy vékony „héjjal” hízik.)
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Egy <M t="a" /> élhosszúságú kocka felszíne <M t="S(a)=6a^2" />. Mekkora <M t="\dfrac{dS}{da}" />, amikor <M t="a=5" /> cm? Add meg a mértékegységet is!
            </>
          }
        >
          <p>
            <M t="S'(a)=12a" />, így <M t="S'(5)=60\;\text{cm}^2/\text{cm}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Egyenes vonalú mozgás: helyzet, sebesség, gyorsulás, lökés',
    body: (
      <>
        <p>
          Ha egy test egyetlen egyenes (az <M t="s" />-tengely) mentén mozog, és a <M t="t" /> időpontban elfoglalt helyét az <M t="s=f(t)" /> függvény adja meg, akkor az egymást követő deriváltak a fizika négy alapfogalmát adják ki:
        </p>
        <MotionLadderDiagram />
        <Def title="Sebesség, gyorsaság, gyorsulás és lökés">
          <ul>
            <li>
              <strong>Sebesség:</strong> <M t="v(t)=\dfrac{ds}{dt}" /> — <em>előjeles</em>! Ha <M t="v>0" />, a test előre halad; ha <M t="v<0" />, visszafelé; ha <M t="v=0" />, abban a pillanatban áll.
            </li>
            <li>
              <strong>Gyorsaság:</strong> <M t="|v(t)|=\left|\dfrac{ds}{dt}\right|" /> — a sebesség abszolút értéke (ezt mutatja az autó kilométerórája: visszafelé is <M t="50" /> km/h, nem <M t="-50" />).
            </li>
            <li>
              <strong>Gyorsulás:</strong> <M t="a(t)=\dfrac{dv}{dt}=\dfrac{d^2s}{dt^2}" /> — milyen gyorsan változik a sebesség.
            </li>
            <li>
              <strong>Lökés (jerk):</strong> <M t="j(t)=\dfrac{da}{dt}=\dfrac{d^3s}{dt^3}" /> — milyen hirtelen változik a gyorsulás (ez rántja meg az utasokat a buszon, amikor a sofőr hirtelen fékez!).
            </li>
          </ul>
        </Def>
        <p>
          Próbáld ki az alábbi sebesség–idő grafikonon, hogyan olvasható le a haladási irány, a megállás és a legnagyobb gyorsaság!
        </p>
        <VelocityGraphWidget />
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Ha egy test sebessége <M t="v(t) < 0" /> és gyorsulása <M t="a(t) < 0" />, akkor a gyorsasága (<M t="|v|" />) éppen…
            </>
          }
          options={[
            { label: 'növekszik (negatív irányban gyorsul)', ok: true },
            { label: 'csökken' },
            { label: 'állandó' },
            { label: 'nulla' },
          ]}
          explain={
            <>
              Mivel a sebesség és a gyorsulás azonos előjelű, a test egyre gyorsabban halad a negatív irányba, tehát a sebesség abszolút értéke (<M t="|v|" />) nő.
            </>
          }
        />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Egy részecske helyzete <M t="s(t)=t^3-6t^2+9t" /> méter (<M t="t\ge 0" />). Mikor áll meg a részecske egy pillanatra, és mekkora ekkor a gyorsulása?
            </>
          }
        >
          <p>
            <M t="v(t)=3t^2-12t+9=3(t-1)(t-3)" />, tehát <M t="t=1" /> s-kor és <M t="t=3" /> s-kor áll meg.
          </p>
          <p>
            <M t="a(t)=6t-12" />, így <M t="a(1)=-6\;\text{m/s}^2" /> és <M t="a(3)=+6\;\text{m/s}^2" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Mi az előző mozgás <em>lökése</em> (<M t="j(t)" />)? Állandó-e?
            </>
          }
        >
          <p>
            <M t="j(t)=a'(t)=6\;\text{m/s}^3" /> — állandó pozitív lökés.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Szabadesés és függőleges hajítás',
    body: (
      <>
        <p>
          A Föld felszíne közelében (légellenállástól eltekintve) minden szabadon eső test ugyanazzal az állandó <M t="g\approx 9{,}8\;\text{m/s}^2" /> gyorsulással zuhan. Mivel <M t="a(t)=-g" /> állandó, a lökés <M t="j(t)=a'(t)=0" />: a szabadesés teljesen rángatásmentes!
        </p>
        <p>
          Ha egy követ <M t="v_0" /> kezdősebességgel pontosan függőlegesen felfelé dobunk, a magassága <M t="t" /> másodperc múlva:
        </p>
        <M block t="s(t) = v_0 t - \frac{1}{2}g t^2 \approx v_0 t - 4{,}9 t^2." />
        <p>
          Ebből a deriválási szabályokkal azonnal mindent ki tudunk számolni:
        </p>
        <ul>
          <li>
            <strong>Csúcspont:</strong> ott éri el, ahol <M t="v(t)=v_0 - gt = 0 \iff t=\dfrac{v_0}{g}" />.
          </li>
          <li>
            <strong>Szimmetria:</strong> bármely adott magasságon a kő felfelé és lefelé <em>ugyanakkora gyorsasággal</em>, csak ellentétes előjelű sebességgel halad át!
          </li>
          <li>
            <strong>Földet érés:</strong> <M t="s(t)=t(v_0-4{,}9t)=0 \iff t=\dfrac{2v_0}{g}" /> (pontosan kétszer annyi idő, mint a csúcspontig!).
          </li>
        </ul>
        <Warn>
          <p>
            Az <M t="s(t)" /> parabola <strong>NEM a kő térbeli röppályája!</strong> A kő egyetlen függőleges vonalon megy fel és vissza — a parabola csupán a <em>magasságot ábrázolja az idő függvényében</em>.
          </p>
        </Warn>
        <VerticalThrowWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Egy követ <M t="29{,}4" /> m/s kezdősebességgel dobunk felfelé (<M t="s(t)=29{,}4t-4{,}9t^2" />). Milyen magasra jut, és mikor ér újra földet?
            </>
          }
        >
          <p>
            <M t="v(t)=29{,}4-9{,}8t=0 \iff t=3" /> s. Maximális magasság: <M t="s(3)=29{,}4\cdot 3 - 4{,}9\cdot 9 = 44{,}1" /> m.
          </p>
          <p>
            Földet érés: <M t="s(t)=4{,}9t(6-t)=0 \iff t=6" /> s.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Az 5. feladatban mekkora a kő sebessége és gyorsasága <M t="t=5" /> másodperckor?
            </>
          }
        >
          <p>
            <M t="v(5)=29{,}4-9{,}8\cdot 5 = -19{,}6" /> m/s (lefelé zuhan). A gyorsasága <M t="|v(5)|=19{,}6" /> m/s.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Közgazdaságtan: határköltség, határbevétel, marginális adó',
    body: (
      <>
        <p>
          A közgazdaságtanban a deriváltat <strong>marginális</strong> (magyarul gyakran <em>határ-</em>) mennyiségnek nevezik. A gondolat rendkívül gyakorlatias: egy gyár már gyárt napi <M t="x" /> terméket, és a vezető azt kérdezi: <em>„Mennyibe kerülne még <strong>egyetlen plusz darab</strong> legyártása?”</em>
        </p>
        <Def title="Határköltség, határbevétel és marginális adó">
          <ul>
            <li>
              <strong>Határköltség:</strong> <M t="c'(x)=\dfrac{dc}{dx}" /> — jó közelítéssel megadja az <M t="(x+1)" />-edik egység előállításának többletköltségét: <M t="c'(x)\approx c(x+1)-c(x)" />.
            </li>
            <li>
              <strong>Határbevétel:</strong> <M t="r'(x)=\dfrac{dr}{dx}" /> — jó közelítéssel az eggyel több eladott egységből származó többletbevétel.
            </li>
            <li>
              <strong>Marginális adókulcs:</strong> <M t="T'(I)=\dfrac{dT}{dI}" /> — ha egy <M t="I" /> jövedelemszinten a marginális adó 28% (<M t="0{,}28" />), az azt jelenti, hogy a következő 1000 Ft többletjövedelemből 280 Ft az adó (nem pedig a teljes jövedelemből!).
            </li>
          </ul>
        </Def>
        <p>
          Miért közelíti <M t="c'(x)" /> olyan jól a pontos <M t="c(x+1)-c(x)" /> különbséget? Mert <M t="c(x+1)-c(x)=\dfrac{c(x+1)-c(x)}{1}" /> éppen a <M t="\Delta x=1" /> szélességű szelő meredeksége — és ha a görbe nem kanyarodik túl élesen, a szelő és az érintő meredeksége alig tér el egymástól!
        </p>
        <MarginalEconWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Egy üzemben <M t="x" /> darab szivattyú gyártási költsége <M t="c(x)=x^3-6x^2+15x" /> (ezer Ft), bevétele <M t="r(x)=x^3-3x^2+12x" /> (ezer Ft). Ha jelenleg <M t="x=10" /> darabot gyártanak, mennyi a határköltség és a határbevétel? Érdemes-e eggyel többet gyártani?
            </>
          }
        >
          <p>
            <M t="c'(x)=3x^2-12x+15 \Rightarrow c'(10)=195" /> ezer Ft. <M t="r'(x)=3x^2-6x+12 \Rightarrow r'(10)=252" /> ezer Ft.
          </p>
          <p>
            Mivel a határbevétel (<M t="252" />) nagyobb a határköltségnél (<M t="195" />), <strong>érdemes</strong> bővíteni a termelést!
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Ha egy adórendszerben <M t="T'(I)=0{,}25" /> az aktuális jövedelmednél, mennyivel nő meg nagyjából az adód, ha 40 000 Ft jutalmat kapsz?
            </>
          }
        >
          <p>
            <M t="\Delta T \approx T'(I)\cdot\Delta I = 0{,}25\cdot 40\,000 = 10\,000" /> Ft.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Érzékenység a változásra (genetika és természettudomány)',
    body: (
      <>
        <p>
          A derivált még egy gyönyörű jelentéssel bír: <strong>az érzékenység mérőszáma</strong>. Ha <M t="x" /> apró elmozdítása nagy változást idéz elő <M t="f(x)" />-ben, akkor <M t="|f'(x)|" /> nagy — a rendszer „érzékeny”. Ha <M t="|f'(x)|" /> kicsi, a rendszer „tompa”, alig reagál.
        </p>
        <p>
          <strong>Gregor Mendel borsókísérlete:</strong> ha egy populációban <M t="p\in(0;\,1)" /> a domináns (sima héjú) gén aránya, akkor a következő nemzedékben a sima héjú borsók aránya:
        </p>
        <M block t="y(p) = 2p(1-p) + p^2 = 2p - p^2 \;\Longrightarrow\; \frac{dy}{dp} = 2 - 2p." />
        <p>
          Nézd meg a deriváltat! Amikor <M t="p" /> nagyon kicsi (<M t="p\to 0" />), az érzékenység közel <M t="2" />: ha egy csupa ráncos borsóból álló állományba néhány domináns növényt keverünk, a hatás drámai. Amikor viszont <M t="p" /> közel van <M t="1" />-hez, <M t="dy/dp \to 0" />: egy már eleve domináns állományon néhány plusz növény szinte semmit sem változtat!
        </p>
        <SensitivityWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              A Mendel-modellben (<M t="y=2p-p^2" />) mekkora az érzékenység <M t="p=0{,}1" /> és <M t="p=0{,}8" /> esetén? Hányszor érzékenyebb az első eset?
            </>
          }
        >
          <p>
            <M t="y'(0{,}1)=2-0{,}2=1{,}8" />, <M t="y'(0{,}8)=2-1{,}6=0{,}4" />. Az első eset <M t="1{,}8/0{,}4=4{,}5" />-ször érzékenyebb!
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Egy gyógyszer hatását <M t="M" /> mg hatóanyag esetén az <M t="R(M)=6M^2-0{,}2M^3" /> függvény írja le (<M t="0\le M\le 20" />). Add meg a szervezet érzékenységét (<M t="dR/dM" />) <M t="M=10" /> mg-nál!
            </>
          }
        >
          <p>
            <M t="R'(M)=12M-0{,}6M^2" />, így <M t="R'(10)=120-60=60" /> (egység / mg).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás és a 4 leggyakoribb buktató',
    body: (
      <>
        <p>
          Ugyanaz a matematikai eszköz (<M t="df/dx" />) minden tudományágban más-más gyakorlati jelentést ölt:
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>terület</th>
              <th>függvény</th>
              <th>derivált jelentése</th>
              <th>tipikus egység</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Geometria</td>
              <td><M t="A(D)" />, <M t="V(r)" /></td>
              <td>terület / térfogat növekedési üteme</td>
              <td><M t="\text{m}^2/\text{m}" />, <M t="\text{m}^3/\text{m}" /></td>
            </tr>
            <tr>
              <td>Kinematika</td>
              <td><M t="s(t)" />, <M t="v(t)" />, <M t="a(t)" /></td>
              <td>sebesség, gyorsulás, lökés</td>
              <td><M t="\text{m/s}" />, <M t="\text{m/s}^2" />, <M t="\text{m/s}^3" /></td>
            </tr>
            <tr>
              <td>Közgazdaságtan</td>
              <td><M t="c(x)" />, <M t="r(x)" />, <M t="T(I)" /></td>
              <td>határköltség, határbevétel, marginális adó</td>
              <td>Ft / db, Ft / Ft</td>
            </tr>
            <tr>
              <td>Biológia / kémia</td>
              <td><M t="y(p)" />, <M t="R(M)" /></td>
              <td>érzékenység a bemenet változására</td>
              <td>hatás / mg</td>
            </tr>
          </tbody>
        </table>
        <h3>Négy gyakori hiba</h3>
        <Warn>
          <p>
            <strong>1. „Negatív gyorsulás = lassulás”:</strong> HAMIS! Egy test akkor <em>gyorsul</em> (nő a gyorsasága), ha <M t="v(t)" /> és <M t="a(t)" /> <strong>azonos előjelű</strong> (pl. mindkettő negatív: egyre gyorsabban zuhan lefelé!), és akkor <em>lassul</em>, ha ellentétes előjelűek!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. Az <M t="s(t)" /> grafikon összekeverése a röppályával:</strong> a vízszintes tengely az <em>idő</em>, nem a vízszintes távolság!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. A mértékegység elhagyása:</strong> a derivált mértékegysége mindig elárulja, mit számoltál ki (ha nem stimmel az egység, rossz változó szerint deriváltál).
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Marginális adó ≠ átlagos adó:</strong> a 28%-os marginális adó csak az új, többletjövedelemre vonatkozik.
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
              Egy szabadon eső golyó útja <M t="s(t)=4{,}9t^2" /> méter. Mekkora a megtett út, a sebesség és a gyorsulás <M t="t=4" /> másodperckor?
            </>
          }
        >
          <p>
            <M t="s(4)=4{,}9\cdot 16=78{,}4" /> m; <M t="v(t)=9{,}8t \Rightarrow v(4)=39{,}2" /> m/s; <M t="a(4)=9{,}8\;\text{m/s}^2" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Egy négyzet területe a kerülete függvényében <M t="A(K)=\dfrac{K^2}{16}" />. Mekkora <M t="\dfrac{dA}{dK}" />, ha <M t="K=24" /> cm?
            </>
          }
        >
          <p>
            <M t="A'(K)=\dfrac{K}{8}" />, tehát <M t="A'(24)=3\;\text{cm}^2/\text{cm}" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Egy termék költségfüggvénye <M t="c(x)=2x^2+30x+100" /> Ft. Mennyi a határköltség <M t="x=25" /> darabnál?
            </>
          }
        >
          <p>
            <M t="c'(x)=4x+30 \Rightarrow c'(25)=130" /> Ft/db.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Egy részecske helyzete <M t="s(t)=t^3-9t^2+24t" /> méter (<M t="t\ge 0" />). Mikor mozog előre, és mikor hátrafelé?
            </>
          }
        >
          <p>
            <M t="v(t)=3t^2-18t+24=3(t-2)(t-4)" />.
          </p>
          <p>
            Előre mozog (<M t="v>0" />): <M t="0\le t<2" /> és <M t="t>4" /> esetén. Hátrafelé mozog (<M t="v<0" />): <M t="2<t<4" /> esetén.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Egy kő magassága <M t="s(t)=49t-4{,}9t^2" /> méter. Mely két időpontban van pontosan <M t="78{,}4" /> méter magasan, és mekkora ekkor a sebessége?
            </>
          }
        >
          <p>
            <M t="49t-4{,}9t^2=78{,}4 \iff t^2-10t+16=0 \iff (t-2)(t-8)=0" />, tehát <M t="t=2" /> s és <M t="t=8" /> s.
          </p>
          <p>
            <M t="v(t)=49-9{,}8t" /> alapján <M t="v(2)=+29{,}4" /> m/s (felfelé) és <M t="v(8)=-29{,}4" /> m/s (lefelé).
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              A <M t="c(x)=0{,}5x^2+10x+200" /> költségfüggvénynél hasonlítsd össze <M t="x=20" />-nál a határköltséget (<M t="c'(20)" />) a 21. darab pontos többletköltségével (<M t="c(21)-c(20)" />)!
            </>
          }
        >
          <p>
            Határköltség: <M t="c'(x)=x+10 \Rightarrow c'(20)=30" />.
          </p>
          <p>
            Pontos különbség: <M t="c(21)-c(20)=(220{,}5+210+200)-(200+200+200)=30{,}5" />. A kettő eltérése mindössze <M t="0{,}5" />!
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              A 14. feladat részecskéjénél (<M t="s(t)=t^3-9t^2+24t" />) mely időintervallumokon <strong>nő a gyorsaság</strong> (<M t="|v(t)|" />), azaz mikor gyorsul valóban a részecske?
            </>
          }
        >
          <p>
            <M t="v(t)=3(t-2)(t-4)" /> és <M t="a(t)=6t-18=6(t-3)" />. A gyorsaság akkor nő, ha <M t="v" /> és <M t="a" /> <strong>azonos előjelű</strong>:
          </p>
          <p>
            Mindkettő negatív <M t="(2;\,3)" />-on; mindkettő pozitív <M t="(4;\,\infty)" />-en. Tehát <M t="(2;\,3)\cup(4;\,\infty)" />-en gyorsul, míg <M t="(0;\,2)\cup(3;\,4)" />-en lassul!
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              A Holdon a gravitációs gyorsulás csak <M t="g_H=1{,}6\;\text{m/s}^2" />. Ha ugyanazzal a <M t="v_0=16" /> m/s sebességgel dobunk fel egy követ a Holdon (<M t="s_H(t)=16t-0{,}8t^2" />), hányszor magasabbra jut és hányszor tovább marad a levegőben, mint a Földön (<M t="g_F=9{,}8\;\text{m/s}^2" />)?
            </>
          }
        >
          <p>
            Mind a maximális magasság (<M t="v_0^2/(2g)" />), mind a repülési idő (<M t="2v_0/g" />) <strong>fordítottan arányos</strong> <M t="g" />-vel!
          </p>
          <p>
            Ezért mindkettő <M t="\dfrac{9{,}8}{1{,}6}=6{,}125" />-szörös lesz: a Holdon <M t="80" /> méter magasra repül és <M t="20" /> másodpercig marad fent!
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Egy gyógyszer hatása <M t="R(M)=M^2\left(\dfrac{C}{2}-\dfrac{M}{3}\right)" /> (<M t="C>0" /> állandó). Határozd meg az érzékenységet (<M t="R'(M)" />) és azt az <M t="M" /> adagot, amelynél az érzékenység változási sebessége (<M t="R''(M)" />) nulla!
            </>
          }
        >
          <p>
            Kibontva: <M t="R(M)=\dfrac{C}{2}M^2-\dfrac{1}{3}M^3" />. Innen az érzékenység: <M t="R'(M)=CM-M^2" />.
          </p>
          <p>
            Második derivált: <M t="R''(M)=C-2M=0 \iff M=\dfrac{C}{2}" /> (ez a maximális érzékenység pontja!).
          </p>
        </Task>
      </>
    ),
  },
];
