import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import { RadianWidget, UnitCircleWidget, TrigGraphWidget, SineWidget, IdentityWidget, CosineLawWidget } from '../components/Widgets16';
import type { Page } from './s1_1';

export const S1_6: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Szögek mérése: a radián',
    body: (
      <>
        <Story>
          <p>
            Egy 30 cm sugarú kerék egyszer gördül körbe, és közben a talajon 2π · 30 ≈ 188 cm-t tesz meg. Fordulatonként ugyanannyi, tehát a megtett út és az elfordulás
            egymással arányos. Ha az elfordulást úgy mérjük, hogy ez az arány különösen egyszerű legyen, megkapjuk a radiánt.
          </p>
        </Story>
        <h3>A radián definíciója</h3>
        <p>
          Egy szög <strong>radiánban mért nagysága</strong> az az ív, amelyet a szög szárai az egységsugarú körből kimetszenek. Más sugarú körben az ív hosszát el kell osztani a
          sugárral: <M t="\theta=s/r" />, azaz
        </p>
        <M block t="s=r\,\theta." />
        <p>
          Az arány nem függ a kör méretétől, ezért a szög mérőszáma mértékegység nélküli szám (a „rad” csak emlékeztető). A teljes kör kerülete <M t="2\pi" /> (egységsugárnál), így
        </p>
        <M block t="2\pi\ \text{rad}=360^\circ,\qquad \pi\ \text{rad}=180^\circ." />
        <p>
          Átváltás fokból radiánba: szorzás <M t="\pi/180" />-nal. Radiánból fokba: szorzás <M t="180/\pi" />-vel. Néhány gyakori szög: <M t="30^\circ=\pi/6" />,{' '}
          <M t="45^\circ=\pi/4" />, <M t="60^\circ=\pi/3" />, <M t="90^\circ=\pi/2" />. Egy radián körülbelül <M t="57{,}3^\circ" />.
        </p>
        <h3>Előjeles szögek</h3>
        <p>
          A szöget az origóból indítjuk: a kezdő szár a pozitív <M t="x" />-tengely, a másik szár ebből forog el. Az óramutatóval ellentétes irány a pozitív, az óramutatóval egyező a negatív. A
          szög lehet 2π-nél nagyobb is (több fordulat), és −2π-nél kisebb is.
        </p>
        <RadianWidget />
        <Warn>
          Az analízisben a szögeket mindig radiánban értjük. A számológépet ilyenkor RAD módba kell állítani. A <M t="\sin30" /> értéke radiánban <M t="-0{,}988" />, míg
          <M t="\sin30^\circ=0{,}5" />: a jelölés nélküli 30 radián, nem 30 fok.
        </Warn>

        <h3>Feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Milyen hosszú ív tartozik (a) egy 6 m sugarú körben az <M t="\tfrac{5\pi}{6}" /> rad nagyságú, (b) egy 9 m sugarú körben a <M t="40^\circ" /> nagyságú középponti szöghöz?
            </>
          }
        >
          <p>
            (a) <M t="s=r\theta=6\cdot\tfrac{5\pi}{6}=5\pi\approx15{,}71" /> m. (b) Előbb radiánba váltunk: <M t="40^\circ=40\cdot\tfrac{\pi}{180}=\tfrac{2\pi}{9}" />, tehát{' '}
            <M t="s=9\cdot\tfrac{2\pi}{9}=2\pi\approx6{,}28" /> m.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Egy 60 cm átmérőjű kerék csúszás nélkül 2 m utat tesz meg. Mekkora szöggel fordult el (radiánban és fokban), és hány fordulat ez?
            </>
          }
        >
          <p>
            A sugár <M t="r=0{,}3" /> m, az ív <M t="s=2" /> m, így <M t="\theta=s/r=2/0{,}3\approx6{,}67" /> rad. Fokban <M t="6{,}67\cdot\tfrac{180}{\pi}\approx382^\circ" />, ez{' '}
            <M t="6{,}67/(2\pi)\approx1{,}06" /> fordulat.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'A hat szögfüggvény az egységkörön',
    body: (
      <>
        <h3>Hegyesszögtől tetszőleges szögig</h3>
        <p>
          Derékszögű háromszögben a hegyesszög szögfüggvényeit oldalarányok adják (szemközti befogó, melletti befogó, átfogó). Ez csak 0 és <M t="\pi/2" /> közötti szögekre működik.
          Általánosításhoz tegyük a szöget az origóba (kezdő szár a pozitív <M t="x" />-tengely), és nézzük meg, hol metszi a másik szár az <M t="r" /> sugarú kört. Ha ez a pont{' '}
          <M t="P(x;y)" />, akkor
        </p>
        <Def title="A hat trigonometrikus függvény">
          <M block t="\sin\theta=\dfrac yr,\quad \cos\theta=\dfrac xr,\quad \operatorname{tg}\theta=\dfrac yx,\quad \csc\theta=\dfrac ry,\quad \sec\theta=\dfrac rx,\quad \operatorname{ctg}\theta=\dfrac xy." />
        </Def>
        <p>
          Egységsugárnál (<M t="r=1" />) ez egyszerűbb: <M t="\cos\theta" /> a pont <M t="x" />-koordinátája, <M t="\sin\theta" /> pedig az <M t="y" />-koordinátája. A tangens a
          kettő hányadosa, és az <M t="x=1" /> egyenesen mérhető szakaszként is látszik. A többi függvény reciprok: <M t="\sec=1/\cos" />, <M t="\csc=1/\sin" />,{' '}
          <M t="\operatorname{ctg}=1/\operatorname{tg}" />.
        </p>
        <p>
          Hol nincs értelmezve? Ahol a nevező nulla. A <M t="\operatorname{tg}" /> és <M t="\sec" /> az <M t="x=0" /> pontokban, vagyis <M t="\theta=\tfrac\pi2+k\pi" /> esetén, a{' '}
          <M t="\operatorname{ctg}" /> és <M t="\csc" /> az <M t="y=0" /> pontokban, vagyis <M t="\theta=k\pi" /> esetén.
        </p>
        <UnitCircleWidget />
        <h3>Nevezetes szögek pontos értékei</h3>
        <p>
          Két háromszög elég hozzá. A derékszögű egyenlő szárú háromszög befogói 1, átfogója <M t="\sqrt2" />: ebből <M t="\sin45^\circ=\cos45^\circ=\tfrac{\sqrt2}{2}" />. Az 1 oldalú
          szabályos háromszöget kettévágva egy 30°–60°–90°-os háromszög lesz, amelynek átfogója 1, rövidebb befogója <M t="\tfrac12" />, hosszabb befogója <M t="\tfrac{\sqrt3}2" />.
          Innen <M t="\sin30^\circ=\tfrac12" />, <M t="\cos30^\circ=\tfrac{\sqrt3}{2}" />, és a 60°-nál a szerepek felcserélődnek.
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>θ</th>
              <th>0</th>
              <th>
                <M t="\pi/6" /> (30°)
              </th>
              <th>
                <M t="\pi/4" /> (45°)
              </th>
              <th>
                <M t="\pi/3" /> (60°)
              </th>
              <th>
                <M t="\pi/2" /> (90°)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>sin θ</td>
              <td>0</td>
              <td>
                <M t="\tfrac12" />
              </td>
              <td>
                <M t="\tfrac{\sqrt2}2" />
              </td>
              <td>
                <M t="\tfrac{\sqrt3}2" />
              </td>
              <td>1</td>
            </tr>
            <tr>
              <td>cos θ</td>
              <td>1</td>
              <td>
                <M t="\tfrac{\sqrt3}2" />
              </td>
              <td>
                <M t="\tfrac{\sqrt2}2" />
              </td>
              <td>
                <M t="\tfrac12" />
              </td>
              <td>0</td>
            </tr>
            <tr>
              <td>tg θ</td>
              <td>0</td>
              <td>
                <M t="\tfrac{\sqrt3}3" />
              </td>
              <td>1</td>
              <td>
                <M t="\sqrt3" />
              </td>
              <td>nincs</td>
            </tr>
          </tbody>
        </table>
        <p>
          Más szögekre a <strong>referenciaszög</strong> segít: a szög és a legközelebbi <M t="x" />-tengely-fél által bezárt hegyesszög. A függvény abszolút értékét ennek a szögnek az értéke adja,
          az előjelet a síknegyed: a szinusz a felső két negyedben pozitív, a koszinusz a jobb oldali kettőben. Például <M t="\tfrac{2\pi}{3}" /> referenciaszöge <M t="\tfrac\pi3" />, a II. negyedben
          a szinusz pozitív, a koszinusz negatív: <M t="\sin\tfrac{2\pi}{3}=\tfrac{\sqrt3}2" />, <M t="\cos\tfrac{2\pi}3=-\tfrac12" />.
        </p>

        <h3>Feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Tudjuk, hogy <M t="\cos\theta=-\tfrac35" /> és <M t="\tfrac\pi2<\theta<\pi" />. Add meg a másik öt függvény értékét.
            </>
          }
        >
          <p>
            A II. negyedben a szinusz pozitív. A <M t="\sin^2\theta+\cos^2\theta=1" /> miatt <M t="\sin^2\theta=1-\tfrac{9}{25}=\tfrac{16}{25}" />, tehát <M t="\sin\theta=\tfrac45" />.
          </p>
          <p>
            <M t="\operatorname{tg}\theta=\dfrac{4/5}{-3/5}=-\tfrac43" />, <M t="\operatorname{ctg}\theta=-\tfrac34" />, <M t="\sec\theta=-\tfrac53" />, <M t="\csc\theta=\tfrac54" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Add meg pontosan: (a) <M t="\sin\tfrac{5\pi}{6}" />, (b) <M t="\cos\tfrac{7\pi}{4}" />, (c) <M t="\operatorname{tg}\tfrac{4\pi}{3}" />, (d) <M t="\sec\tfrac{2\pi}{3}" />.
            </>
          }
        >
          <p>
            (a) referenciaszög <M t="\tfrac\pi6" />, II. negyed, a szinusz pozitív: <M t="\tfrac12" />. (b) referenciaszög <M t="\tfrac\pi4" />, IV. negyed, a koszinusz pozitív:{' '}
            <M t="\tfrac{\sqrt2}2" />. (c) referenciaszög <M t="\tfrac\pi3" />, III. negyed, mindkettő negatív, a hányados pozitív: <M t="\sqrt3" />. (d) <M t="\cos\tfrac{2\pi}3=-\tfrac12" />, tehát a
            szekáns <M t="-2" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Periodikus függvények és grafikonjuk',
    body: (
      <>
        <Story>
          <p>
            Egy óra mutatója 12 óránként ugyanoda ér vissza, a tengerjárás napi két ciklust ír le, és a hét napjai is ismétlődnek. A matematikában az ilyen visszatérést a periodicitás írja le.
          </p>
        </Story>
        <Def title="Periodikus függvény">
          <p>
            Az <M t="f" /> periodikus, ha van olyan <M t="p>0" /> szám, amelyre minden <M t="x\in D(f)" /> esetén <M t="x+p\in D(f)" /> és <M t="f(x+p)=f(x)" />. A legkisebb ilyen <M t="p" /> a{' '}
            <strong>periódus</strong>.
          </p>
        </Def>
        <p>
          A szög egy teljes fordulat után ugyanabba a helyzetbe kerül, ezért <M t="\sin(x+2\pi)=\sin x" /> és <M t="\cos(x+2\pi)=\cos x" />. A tangens és a kotangens már fél fordulat után
          ismétel, mert <M t="(x;y)" /> helyett <M t="(-x;-y)" /> a hányadost nem változtatja: periódusuk <M t="\pi" />.
        </p>
        <p>
          Egy periodikus függvényt elég egyetlen periódusában megismerni, a többi a másolata. Ezért a modellezésben fontosak: ciklikus jelenségek (évszakok, hullámok, váltakozó áram) írhatók
          le velük.
        </p>
        <h3>Páros és páratlan tagok</h3>
        <p>
          Az egységkörön a <M t="-\theta" /> szög a <M t="\theta" /> tükörképe az <M t="x" />-tengelyre: az <M t="x" />-koordináta ugyanaz, az <M t="y" /> ellentett. Ebből:{' '}
          <M t="\cos(-\theta)=\cos\theta" />, <M t="\sin(-\theta)=-\sin\theta" />. Páros a koszinusz és a szekáns, páratlan a másik négy.
        </p>
        <TrigGraphWidget />
        <h3>Feladat</h3>
        <Task
          n={5}
          q={
            <>
              Döntsd el, hogy páros, páratlan vagy egyik sem: (a) <M t="x\sin x" />, (b) <M t="\sin x+\cos x" />, (c) <M t="\sin x\cos x" />, (d) <M t="\dfrac{\operatorname{tg}x}{x}" />.
            </>
          }
        >
          <p>
            (a) <M t="(-x)\sin(-x)=(-x)(-\sin x)=x\sin x" />: páros. (b) <M t="f(-x)=-\sin x+\cos x" />, ami sem <M t="f(x)" />, sem <M t="-f(x)" />: egyik sem. (c) <M t="\sin(-x)\cos(-x)=-\sin x\cos x" />:
            páratlan (páratlan és páros szorzata). (d) páratlan per páratlan, azaz páros: <M t="\dfrac{\operatorname{tg}(-x)}{-x}=\dfrac{\operatorname{tg}x}{x}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Trigonometrikus függvények átalakítása',
    body: (
      <>
        <p>
          Az 1.5-ben megtanult átalakítások a szögfüggvényekre is érvényesek. A <M t="y=d+A\sin\big(\omega(x-c)\big)" /> általános szinuszfüggvény négy paramétere mind egy
          jól ismert átalakításnak felel meg:
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>Paraméter</th>
              <th>Szerep</th>
              <th>Leolvasás</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <M t="A" />
              </td>
              <td>függőleges nyújtás (negatív: tükrözés)</td>
              <td>
                amplitúdó: <M t="|A|" />
              </td>
            </tr>
            <tr>
              <td>
                <M t="\omega" />
              </td>
              <td>vízszintes méretezés</td>
              <td>
                periódus: <M t="2\pi/|\omega|" />
              </td>
            </tr>
            <tr>
              <td>
                <M t="c" />
              </td>
              <td>vízszintes eltolás (jobbra, ha pozitív)</td>
              <td>a ciklus kezdete</td>
            </tr>
            <tr>
              <td>
                <M t="d" />
              </td>
              <td>függőleges eltolás</td>
              <td>középvonal: <M t="y=d" /></td>
            </tr>
          </tbody>
        </table>
        <p>
          Az értékkészlet így <M t="[d-|A|;\ d+|A|]" />. A periódus a hullámhosszat adja meg: az <M t="\omega=2" /> kétszer sűrűbb hullám, fele akkora periódussal.
        </p>
        <SineWidget />
        <h3>Adatok modellezése</h3>
        <p>
          Évszakos hőmérséklet, árapály, hangjel: mindegyik jellemezhető a maximummal, a minimummal és a periódussal. Ezekből a négy paraméter kiolvasható:{' '}
          <M t="d=\tfrac{\max+\min}{2}" />, <M t="|A|=\tfrac{\max-\min}{2}" />, <M t="\omega=\tfrac{2\pi}{\text{periódus}}" />, és az eltolás abból, hogy hol van a maximum (koszinusznál ott a
          ciklus kezdete).
        </p>
        <Warn>
          A <M t="\sin(2x-\pi)" /> alakból nem szabad egyből „π-vel jobbra” olvasni. Előbb ki kell emelni az <M t="\omega" />-t: <M t="\sin\big(2(x-\tfrac\pi2)\big)" />, tehát az eltolás{' '}
          <M t="\tfrac\pi2" />.
        </Warn>

        <h3>Feladatok</h3>
        <Task
          n={6}
          q={
            <>
              Add meg az amplitúdót, a periódust, a vízszintes eltolást, a középvonalat és az értékkészletet: (a) <M t="y=3\cos(2x-\pi)" />, (b) <M t="y=1-2\sin\tfrac x3" />.
            </>
          }
        >
          <p>
            (a) <M t="3\cos\big(2(x-\tfrac\pi2)\big)" />: amplitúdó 3, periódus <M t="\pi" />, eltolás <M t="\tfrac\pi2" /> jobbra, középvonal <M t="y=0" />, értékkészlet <M t="[-3;3]" />.
          </p>
          <p>
            (b) <M t="A=-2" />, <M t="\omega=\tfrac13" />, <M t="d=1" />. Amplitúdó 2 (a negatív előjel tükrözést jelent), periódus <M t="2\pi/(1/3)=6\pi" />, eltolás nincs, középvonal{' '}
            <M t="y=1" />, értékkészlet <M t="[-1;3]" />.
          </p>
        </Task>
        <Task
          n={7}
          q={
            <>
              Egy város havi átlaghőmérséklete 4 °C és 24 °C között ingadozik, a maximum a 7. hónapban van. Írj fel koszinuszos modellt (<M t="x" /> a hónap sorszáma), majd határozd meg, mikor
              melegebb 20 °C-nál.
            </>
          }
        >
          <p>
            <M t="d=\tfrac{24+4}{2}=14" />, <M t="A=\tfrac{24-4}2=10" />, a periódus 12 hónap, <M t="\omega=\tfrac{2\pi}{12}=\tfrac\pi6" />. A koszinusz maximuma az eltolt helyen van:{' '}
            <M t="T(x)=14+10\cos\big(\tfrac\pi6(x-7)\big)" />. Ellenőrzés: <M t="T(7)=24" />, <M t="T(1)=14+10\cos(-\pi)=4" />.
          </p>
          <p>
            <M t="T>20" /> pontosan akkor, ha <M t="\cos u>0{,}6" /> (<M t="u=\tfrac\pi6(x-7)" />), azaz <M t="|u|<\arccos0{,}6\approx0{,}927" />. Ebből <M t="|x-7|<0{,}927\cdot\tfrac6\pi\approx1{,}77" />: a hőmérséklet
            nagyjából az 5,2. és a 8,8. hónap között haladja meg a 20 °C-ot, vagyis mintegy három és fél hónapig.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Azonosságok: összegzés, kétszeres és fél szög',
    body: (
      <>
        <h3>Az alapazonosság</h3>
        <p>
          Az egységkör pontjára <M t="x^2+y^2=1" />, és <M t="x=\cos\theta" />, <M t="y=\sin\theta" />. Tehát bármely <M t="\theta" />-ra
        </p>
        <M block t="\sin^2\theta+\cos^2\theta=1." />
        <p>
          Ez az egyik leggyakrabban használt összefüggés. Osztva <M t="\cos^2\theta" />-val, illetve <M t="\sin^2\theta" />-val: <M t="1+\operatorname{tg}^2\theta=\sec^2\theta" /> és{' '}
          <M t="1+\operatorname{ctg}^2\theta=\csc^2\theta" />.
        </p>
        <h3>Összegzési képletek</h3>
        <p>
          Vegyük az egységkör két pontját: <M t="P(\cos a;\sin a)" /> és <M t="Q(\cos b;\sin b)" />. Távolságuk négyzete két módon is felírható. A távolságképlettel:
        </p>
        <M block t="|PQ|^2=(\cos a-\cos b)^2+(\sin a-\sin b)^2=2-2(\cos a\cos b+\sin a\sin b)." />
        <p>
          A kör elforgatása nem változtatja a húr hosszát, ezért ugyanekkora a távolság a <M t="(\cos(a-b);\sin(a-b))" /> és az <M t="(1;0)" /> pont között is:{' '}
          <M t="(\cos(a-b)-1)^2+\sin^2(a-b)=2-2\cos(a-b)" />. A két kifejezést egyenlővé téve:
        </p>
        <M block t="\cos(a-b)=\cos a\cos b+\sin a\sin b." />
        <p>
          Ebből <M t="b" /> helyére <M t="-b" />-t írva (a koszinusz páros, a szinusz páratlan) adódik a <M t="\cos(a+b)=\cos a\cos b-\sin a\sin b" />, és a{' '}
          <M t="\sin(a+b)=\cos\big(\tfrac\pi2-(a+b)\big)=\cos\big((\tfrac\pi2-a)-b\big)" /> átalakítással:
        </p>
        <M block t="\sin(a+b)=\sin a\cos b+\cos a\sin b." />
        <h3>Kétszeres és fél szög</h3>
        <p>
          Az <M t="a=b=\theta" /> helyettesítés a kétszeres szög képleteit adja:
        </p>
        <M block t="\sin2\theta=2\sin\theta\cos\theta,\qquad \cos2\theta=\cos^2\theta-\sin^2\theta." />
        <p>
          A <M t="\cos2\theta" /> képletét az alapazonossággal összeadva, illetve kivonva megkapjuk a <strong>félszögképleteket</strong> (az integrálásnál később nagyon hasznosak lesznek):
        </p>
        <M block t="\cos^2\theta=\dfrac{1+\cos2\theta}{2},\qquad \sin^2\theta=\dfrac{1-\cos2\theta}{2}." />
        <p>Az eszközben bármelyik azonosságot kipróbálhatod: a két oldal értéke és görbéje minden szögnél egybeesik.</p>
        <IdentityWidget />
        <h3>Feladat</h3>
        <Task
          n={8}
          q={
            <>
              Add meg pontosan: (a) <M t="\cos75^\circ" />, (b) <M t="\sin\tfrac\pi8" />.
            </>
          }
        >
          <p>
            (a) <M t="\cos(45^\circ+30^\circ)=\cos45^\circ\cos30^\circ-\sin45^\circ\sin30^\circ=\tfrac{\sqrt2}2\cdot\tfrac{\sqrt3}2-\tfrac{\sqrt2}2\cdot\tfrac12=\tfrac{\sqrt6-\sqrt2}{4}\approx0{,}2588" />.
          </p>
          <p>
            (b) <M t="\sin^2\tfrac\pi8=\dfrac{1-\cos\frac\pi4}{2}=\dfrac{1-\frac{\sqrt2}2}{2}=\dfrac{2-\sqrt2}{4}" />. A szög hegyesszög, a szinusz pozitív: <M t="\sin\tfrac\pi8=\tfrac{\sqrt{2-\sqrt2}}{2}\approx0{,}3827" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'A koszinusztétel',
    body: (
      <>
        <Story>
          <p>
            Két útszakasz egy pontból indul, egymással adott szöget zár be. Milyen messze kerülnek egymástól a végpontjaik? A Pitagorasz-tétel csak derékszögnél segít. Általános szögnél a
            koszinusz teszi lehetővé a számolást.
          </p>
        </Story>
        <Def title="Koszinusztétel">
          <p>
            Ha egy háromszög két oldala <M t="a" /> és <M t="b" />, a közbezárt szög <M t="\gamma" />, a szemközti oldal <M t="c" />, akkor
          </p>
          <M block t="c^2=a^2+b^2-2ab\cos\gamma." />
        </Def>
        <p>
          <strong>Bizonyítás.</strong> Tegyük a <M t="\gamma" /> szög csúcsát az origóba, az <M t="b" /> oldalt az <M t="x" />-tengelyre: <M t="A=(b;0)" />, és a másik végpont{' '}
          <M t="B=(a\cos\gamma;\ a\sin\gamma)" />. A távolságképlet:
        </p>
        <M block t="c^2=(a\cos\gamma-b)^2+(a\sin\gamma)^2" />
        <M block t="=a^2(\cos^2\gamma+\sin^2\gamma)-2ab\cos\gamma+b^2=a^2+b^2-2ab\cos\gamma." />
        <p>
          A <M t="\gamma=\tfrac\pi2" /> esetén <M t="\cos\gamma=0" />, és visszakapjuk a Pitagorasz-tételt. A hegyesszögnél a levonandó tag pozitív, így <M t="c^2<a^2+b^2" />; tompaszögnél a koszinusz negatív,
          tehát <M t="c^2>a^2+b^2" />.
        </p>
        <CosineLawWidget />
        <p>
          A tételt fordítva is használhatjuk: ha mindhárom oldal ismert, a szög koszinusza <M t="\cos\gamma=\dfrac{a^2+b^2-c^2}{2ab}" />.
        </p>
        <h3>Feladat</h3>
        <Task
          n={9}
          q={
            <>
              (a) Egy háromszögben <M t="a=6" />, <M t="b=10" />, a közbezárt szög <M t="120^\circ" />. Mekkora a harmadik oldal? (b) Egy háromszög oldalai 5, 7 és 8. Mekkora a 7 hosszú oldallal szemközti szög?
            </>
          }
        >
          <p>
            (a) <M t="c^2=36+100-2\cdot6\cdot10\cdot\cos120^\circ=136-120\cdot(-\tfrac12)=196" />, tehát <M t="c=14" />.
          </p>
          <p>
            (b) A 7-es oldallal szemközti szög <M t="\gamma" />: <M t="\cos\gamma=\dfrac{5^2+8^2-7^2}{2\cdot5\cdot8}=\dfrac{40}{80}=\tfrac12" />, tehát <M t="\gamma=60^\circ" />.
          </p>
        </Task>

        <h3>Összefoglalás</h3>
        <table className="tbl">
          <thead>
            <tr>
              <th>Fogalom</th>
              <th>Lényeg</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>radián</td>
              <td>
                <M t="s=r\theta" />, <M t="\pi" /> rad = 180°
              </td>
            </tr>
            <tr>
              <td>szögfüggvények</td>
              <td>
                az egységkör pontjának koordinátái: <M t="\cos\theta" />, <M t="\sin\theta" />; a többi ezekből
              </td>
            </tr>
            <tr>
              <td>periódus</td>
              <td>
                sin, cos, sec, csc: <M t="2\pi" />; tg, ctg: <M t="\pi" />
              </td>
            </tr>
            <tr>
              <td>általános szinusz</td>
              <td>
                <M t="d+A\sin(\omega(x-c))" />: amplitúdó <M t="|A|" />, periódus <M t="2\pi/|\omega|" />
              </td>
            </tr>
            <tr>
              <td>azonosságok</td>
              <td>
                <M t="\sin^2+\cos^2=1" />, összegzési, kétszeres és fél szög képletek
              </td>
            </tr>
            <tr>
              <td>koszinusztétel</td>
              <td>
                <M t="c^2=a^2+b^2-2ab\cos\gamma" />
              </td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
];
