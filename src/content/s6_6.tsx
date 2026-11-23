import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  GravityEscapeDiagram,
  HangingChainWidget,
  HookeSpringWidget,
  TankPumpingWidget,
  WorkForceGraphWidget,
} from '../components/Widgets66';
import type { Page } from './s1_1';

export const S6_6: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Állandó erőből változó erő — a munka integrálképlete',
    body: (
      <>
        <Story>
          <p>
            A középiskolai fizikából ismerős a képlet: ha egy állandó <M t="F" /> erővel <M t="d" /> távolságon át tolsz egy ládát, az elvégzett munka <M t="W = F\cdot d" /> (SI-egysége: <M t="\text{N}\cdot\text{m} = \text{J}" />, joule). De mi van akkor, ha az erő <strong>folyamatosan változik</strong> — mint egy rugó nyújtásakor, egy kútból felhúzott nehéz láncnál vagy egy műhold fellövésekor? Ilyenkor lép színre a határozott integrál!
          </p>
        </Story>
        <Def title="Változó erő munkája az [a; b] szakaszon">
          <p>
            Ha egy egyenes (<M t="x" />-tengely) mentén ható, folyamatosan változó <M t="F(x)" /> erő egy testet <M t="x=a" />-ból <M t="x=b" />-be mozgat, akkor az elvégzett munka:
          </p>
          <M block t="W \;=\; \int_{a}^{b} F(x)\,dx." />
          <p>Geometriailag a munka pontosan az <M t="F(x)" /> erő–elmozdulás grafikon alatti terület!</p>
        </Def>
        <WorkForceGraphWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Egy testre az <M t="F(x) = 3x^2 + 2\;\text{(N)}" /> erő hat. Mennyi munkát végez az erő, miközben a test <M t="x=0" />-tól <M t="x=4\text{ m}" />-ig mozog?
            </>
          }
        >
          <p>
            <M t="W = \displaystyle\int_0^4 (3x^2+2)\,dx = \Bigl[x^3 + 2x\Bigr]_0^4 = 64 + 8 = \mathbf{72\text{ J}}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Egy testet <M t="F(x)=\dfrac{10}{x^2}\;\text{(N)}" /> erő mozgat <M t="x=1\text{ m}" />-től <M t="x=5\text{ m}" />-ig. Mekkora munkát végez?
            </>
          }
        >
          <p>
            <M t="W = \displaystyle\int_1^5 10x^{-2}\,dx = \left[-\frac{10}{x}\right]_1^5 = -2 - (-10) = \mathbf{8\text{ J}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Hooke-törvény: rugók nyújtása és összenyomása',
    body: (
      <>
        <Story>
          <p>
            Ha megpróbálsz széthúzni egy erős edzőrugót, az első pár centi könnyű, a végén viszont már alig bírja a kezed! Robert Hooke 1676-ban fogalmazta meg a törvényt: a rugó visszahúzó ereje egyenesen arányos a <strong>nyugalmi hosszától mért <M t="x" /> elmozdulással</strong>.
          </p>
        </Story>
        <Def title="Hooke-törvény és a rugómunka képlete">
          <M block t="F(x) = k x \quad\Longrightarrow\quad W = \int_{a}^{b} kx\,dx = \frac{1}{2}k\left(b^2 - a^2\right)." />
          <p>
            Itt <M t="k" /> a <strong>rugóállandó</strong> (<M t="\text{N/m}" />), <M t="a" /> és <M t="b" /> pedig a <em>nyugalmi helyzettől</em> (<M t="x=0" />) mért kezdeti és végső megnyúlás (vagy összenyomódás) <strong>méterben</strong>!
          </p>
        </Def>
        <p>
          <em>Érdekesség:</em> a négyzetes formula miatt a második <M t="10\text{ cm}" /> megnyújtása (<M t="10\to 20\text{ cm}" />) pontosan <strong>3-szor</strong> annyi munkát igényel, mint az első <M t="10\text{ cm}" /> (<M t="2^2-1^2 = 3" /> vs. <M t="1^2 = 1" />)!
        </p>
        <HookeSpringWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Egy rugót <M t="20\text{ N}" /> erő <M t="10\text{ cm}" />-rel nyújt meg. Határozd meg a rugóállandót (<M t="k" />), és számítsd ki, mennyi munka kell a rugó <M t="20\text{ cm}" />-re való megnyújtásához!
            </>
          }
        >
          <p>
            <M t="20 = k\cdot 0{,}10 \implies k = \mathbf{200\text{ N/m}}" />. A munka <M t="0" />-tól <M t="0{,}20\text{ m}" />-ig:
            <M t="W = \frac{1}{2}(200)(0{,}20)^2 = 100\cdot 0{,}04 = \mathbf{4\text{ J}}" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Egy <M t="k=500\text{ N/m}" /> rugóállandójú rugó nyugalmi hossza <M t="30\text{ cm}" />. Mennyi munka kell ahhoz, hogy <M t="35\text{ cm}" />-ről <M t="45\text{ cm}" />-re nyújtsuk?
            </>
          }
        >
          <p>
            A nyugalmi hossztól mért elmozdulások: <M t="a = 0{,}05\text{ m}" /> és <M t="b = 0{,}15\text{ m}" />!
          </p>
          <M block t="W = \frac{1}{2}(500)\left(0{,}15^2 - 0{,}05^2\right) = 250(0{,}0225 - 0{,}0025) = 250\cdot 0{,}02 = \mathbf{5\text{ J}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Lógó láncok és csöpögő vödör (változó tömeg emelése)',
    body: (
      <>
        <Story>
          <p>
            Egy toronyház tetejéről egy <M t="20\text{ m}" /> hosszú, nehéz acéllánc lóg le. Ahogy húzzuk felfelé, minden egyes méterrel kevesebb lánc marad a levegőben — vagyis az emelendő súly <em>folyamatosan csökken</em>! Ugyanez történik, ha egy lyukas vödörből emelés közben folyik ki a víz.
          </p>
        </Story>
        <HangingChainWidget />
        <h3>Két szemlélet, ugyanaz az eredmény</h3>
        <ul>
          <li><strong>Változó erővel:</strong> ha <M t="x" /> métert már felhúztunk, a még lógó rész súlya <M t="F(x)=\lambda(L-x)" />, így <M t="W = \int_0^L \lambda(L-x)\,dx = \frac{1}{2}\lambda L^2" />.</li>
          <li><strong>Szeleteléssel:</strong> a tetőtől <M t="y" /> mélyen lévő <M t="\lambda\,dy" /> súlyú láncszemet <M t="y" /> magasra emeljük, tehát <M t="W = \int_0^L \lambda y\,dy = \frac{1}{2}\lambda L^2 = (mg)\cdot\frac{L}{2}" />!</li>
        </ul>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Egy <M t="20\text{ m}" /> hosszú, <M t="15\text{ N/m}" /> fajlagos súlyú kábelt <strong>csak a feléig</strong> (<M t="10\text{ m}" />-nyit) húzunk fel a tetőre! Mennyi munkát végzünk?
            </>
          }
        >
          <p>
            Az <M t="x\in[0;\,10]" /> szakaszon <M t="F(x) = 15(20-x)" />:
          </p>
          <M block t="W = \int_{0}^{10} 15(20-x)\,dx = 15\left[20x - \frac{x^2}{2}\right]_{0}^{10} = 15(200 - 50) = \mathbf{2250\text{ J}}." />
          <p><em>(A teljes munka 75%-a az első felénél elmegy, mert akkor még sokkal nehezebb!)</em></p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Egy <M t="2\text{ kg}" />-os vödörben <M t="20\text{ kg}" /> víz van. Egyenletes sebességgel <M t="10\text{ m}" /> magasra húzzuk fel, miközben a lyukon egyenletesen kifolyik az összes víz (mire felér, üres). Mennyi munkát végzünk (<M t="g=9{,}8\text{ m/s}^2" />)?
            </>
          }
        >
          <p>
            Az <M t="x\in[0;\,10]" /> magasságban a vödör + maradék víz tömege <M t="m(x) = 2 + 20\left(1-\frac{x}{10}\right) = 22 - 2x\;\text{(kg)}" />:
          </p>
          <M block t="W = g\int_{0}^{10}(22-2x)\,dx = g\Bigl[22x - x^2\Bigr]_{0}^{10} = 120g \approx \mathbf{1176\text{ J}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Folyadék kiszivattyúzása tartályokból',
    body: (
      <>
        <Story>
          <p>
            Hogyan számoljuk ki, mennyi munka kell egy földalatti hengeres, kúpos vagy félgömb alakú víztartály kiürítéséhez? A felső vízréteget alig kell megemelni, az alján lévő vizet viszont a teljes mélységből fel kell emelni! Vágjuk fel a vizet <strong>vékony vízszintes rétegekre</strong>!
          </p>
        </Story>
        <Def title="Tartály kiszivattyúzásának munkája">
          <p>
            Egy <M t="y" /> magasságban lévő, <M t="A(y)" /> keresztmetszetű és <M t="dy" /> vastag vízréteg súlya <M t="dF = \rho g\,A(y)\,dy" /> (víznél <M t="\rho = 1000\text{ kg/m}^3,\; \rho g \approx 9800\text{ N/m}^3" />). Ha ezt a réteget <M t="D(y)" /> magasságba kell felemelni, akkor a teljes munka:
          </p>
          <M block t="W \;=\; \int_{y_1}^{y_2} \rho g\,A(y)\,D(y)\,dy." />
        </Def>
        <TankPumpingWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Egy <M t="r=2\text{ m}" /> sugarú, <M t="H=5\text{ m}" /> magas hengeres tartály tele van vízzel. Mennyi munkával szivattyúzható ki a felső pereméig (<M t="\rho g" />-vel kifejezve)?
            </>
          }
        >
          <p>
            Minden réteg területe <M t="A(y)=4\pi" />, emelése <M t="5-y" />:
          </p>
          <M block t="W = 4\pi\rho g\int_{0}^{5}(5-y)\,dy = 4\pi\rho g\left[5y-\frac{y^2}{2}\right]_{0}^{5} = 4\pi\rho g\cdot\frac{25}{2} = \mathbf{50\pi\rho g}." />
        </Task>
        <Task
          n={8}
          q={
            <>
              Egy csúcsára állított kúp alakú tartály <M t="H=6\text{ m}" /> magas, felső sugara <M t="R=3\text{ m}" />, és tele van vízzel. Igazold a 4. ábra eredményét (<M t="W=27\pi\rho g" />)!
            </>
          }
        >
          <p>
            Hasonló háromszögekkel az aljától <M t="y" /> magasságban a sugár <M t="r(y)=\frac{y}{2}" />, így <M t="A(y)=\pi\frac{y^2}{4}" />, az emelés <M t="6-y" />:
          </p>
          <M block t="W = \frac{\pi\rho g}{4}\int_{0}^{6}(6y^2-y^3)\,dy = \frac{\pi\rho g}{4}\left[2y^3-\frac{y^4}{4}\right]_{0}^{6} = \frac{\pi\rho g}{4}(432-324) = \mathbf{27\pi\rho g}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Munkatétel (kinetikus energia) és gravitációs munka az űrben',
    body: (
      <>
        <Story>
          <p>
            A munka integrálképlete két óriási fizikai kaput is kinyit: az egyik a <strong>kinetikus energia</strong> (hogyan gyorsul fel egy teniszlabda vagy autó?), a másik a <strong>bolygóközi gravitáció</strong> (mennyi energia kell egy műhold pályára állításához vagy a Föld elhagyásához?).
          </p>
        </Story>
        <Def title="Munkatétel és gravitációs munka">
          <ul>
            <li>
              <strong>Munka–kinetikus energia tétel:</strong> egy <M t="m" /> tömegű test <M t="v_1" />-ről <M t="v_2" /> sebességre gyorsításához végzett eredő munka:
              <M block t="W = \frac{1}{2}mv_2^2 - \frac{1}{2}mv_1^2." />
            </li>
            <li>
              <strong>Gravitációs munka (<M t="F(r) = \frac{GMm}{r^2}" />):</strong> egy <M t="m" /> tömegű test <M t="r_1" /> távolságról <M t="r_2" /> távolságra emelése:
              <M block t="W = \int_{r_1}^{r_2} \frac{GMm}{r^2}\,dr = GMm\left(\frac{1}{r_1} - \frac{1}{r_2}\right)." />
            </li>
          </ul>
        </Def>
        <GravityEscapeDiagram />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Egy <M t="60\text{ g}" /> tömegű teniszlabdát álló helyzetből <M t="50\text{ m/s}" /> (<M t="180\text{ km/h}" />) sebességű szervával ütünk meg. Mennyi munkát végez az ütő a labdán?
            </>
          }
        >
          <p>
            <M t="m=0{,}06\text{ kg} \implies W = \frac{1}{2}(0{,}06)(50)^2 = 0{,}03\cdot 2500 = \mathbf{75\text{ J}}" />.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Igazold a gravitációs képlettel, hogy egy műholdat a Föld felszínétől (<M t="R_F" />) a <M t="2R_F" /> távolságig emelni pontosan <em>ugyanannyi</em> munka, mint <M t="2R_F" />-től a végtelenig (<M t="\infty" />)!
            </>
          }
        >
          <p>
            <M t="W_{R_F\to 2R_F} = GMm\left(\frac{1}{R_F}-\frac{1}{2R_F}\right) = \dfrac{GMm}{2R_F}" />, és <M t="W_{2R_F\to\infty} = GMm\left(\frac{1}{2R_F}-0\right) = \dfrac{GMm}{2R_F}" /> — pontosan egyenlők!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok',
    body: (
      <>
        <Def title="6.6 Puskakártya">
          <ul>
            <li><strong>Változó erő munkája:</strong> <M t="W = \int_a^b F(x)\,dx" /> (SI: joule = <M t="\text{N}\cdot\text{m}" />).</li>
            <li><strong>Hooke-törvény:</strong> <M t="F=kx \implies W = \frac{1}{2}k(b^2-a^2)" /> (<M t="a,b" /> a nyugalmi hossztól!).</li>
            <li><strong>Lógó lánc (teljes):</strong> <M t="W = \int_0^L \lambda y\,dy = \frac{1}{2}\lambda L^2" />.</li>
            <li><strong>Tartály szivattyúzása:</strong> <M t="W = \int_{y_1}^{y_2} \rho g\,A(y)\,D(y)\,dy" />.</li>
            <li><strong>Gravitáció / kinetikus energia:</strong> <M t="W = GMm(\frac{1}{r_1}-\frac{1}{r_2})" />; <M t="W = \frac{1}{2}m(v_2^2-v_1^2)" />.</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>4 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong>Mértékegységek!</strong> A cm-t MINDIG váltsd méterre, a grammot kilogrammra, mielőtt joule-t számolsz!
            </li>
            <li>
              <strong>Rugó nyugalmi hossza:</strong> ha egy <M t="30\text{ cm}" />-es rugót <M t="35\text{ cm}" />-ről <M t="45\text{ cm}" />-re nyújtasz, a határok <M t="0{,}05" /> és <M t="0{,}15" />, NEM <M t="0{,}35" /> és <M t="0{,}45" />!
            </li>
            <li>
              <strong>Félig telt tartály:</strong> a határok a <em>víz</em> alja és teteje (<M t="[0;\,H/2]" />), de az emelési távolság továbbra is a <em>peremig</em> (<M t="H-y" />) számít!
            </li>
            <li>
              <strong>Tömeg vs. súly:</strong> ha kg-ban van megadva a tömeg, ne felejtsd megszorozni <M t="g \approx 9{,}8\text{ m/s}^2" />-tel, hogy newtont kapj!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={11}
          q={
            <>
              Egy testre <M t="F(x)=4x+6\;\text{(N)}" /> erő hat <M t="x=0" />-tól <M t="x=5\text{ m}" />-ig. Mennyi munkát végez?
            </>
          }
        >
          <p>
            <M t="W = \int_0^5(4x+6)\,dx = \Bigl[2x^2+6x\Bigr]_0^5 = 50+30 = \mathbf{80\text{ J}}" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Egy <M t="k=400\text{ N/m}" /> rugóállandójú rugót nyugalmi helyzetéből <M t="15\text{ cm}" />-rel nyújtunk meg. Mennyi munkát végzünk?
            </>
          }
        >
          <p>
            <M t="W = \frac{1}{2}(400)(0{,}15)^2 = 200\cdot 0{,}0225 = \mathbf{4{,}5\text{ J}}" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Egy <M t="10\text{ m}" /> hosszú, <M t="8\text{ N/m}" /> fajlagos súlyú kötelet teljesen felhúzunk egy erkélyre. Mennyi a munka?
            </>
          }
        >
          <p>
            <M t="W = \int_0^{10} 8y\,dy = \Bigl[4y^2\Bigr]_0^{10} = \mathbf{400\text{ J}}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Egy <M t="40\text{ cm}" /> nyugalmi hosszúságú rugót <M t="30\text{ N}" /> erő <M t="50\text{ cm}" />-re nyújt. Mennyi munka kell ahhoz, hogy <M t="50\text{ cm}" />-ről <M t="60\text{ cm}" />-re nyújtsuk tovább?
            </>
          }
        >
          <p>
            <M t="k = \frac{30}{0{,}10} = 300\text{ N/m}" />. Határok: <M t="a=0{,}10\text{ m},\; b=0{,}20\text{ m}" />:
          </p>
          <M block t="W = \frac{1}{2}(300)(0{,}20^2 - 0{,}10^2) = 150\cdot 0{,}03 = \mathbf{4{,}5\text{ J}}." />
        </Task>
        <Task
          n={15}
          q={
            <>
              Egy <M t="r=2\text{ m}" /> sugarú, <M t="H=6\text{ m}" /> magas hengeres tartály csak <strong>félig</strong> (<M t="3\text{ m}" />-ig) van tele vízzel. Mennyi munka kell a víz kiszivattyúzásához a tartály pereméig?
            </>
          }
        >
          <p>
            A víz <M t="y\in[0;\,3]" /> között van, az emelés <M t="6-y" />, <M t="A(y)=4\pi" />:
          </p>
          <M block t="W = 4\pi\rho g\int_{0}^{3}(6-y)\,dy = 4\pi\rho g\left[6y-\frac{y^2}{2}\right]_{0}^{3} = 4\pi\rho g(18-4{,}5) = \mathbf{54\pi\rho g}." />
        </Task>
        <Task
          n={16}
          q={
            <>
              Egy daruról <M t="15\text{ m}" /> hosszú, <M t="20\text{ N/m}" /> súlyú lánc lóg le, az alján egy <M t="100\text{ N}" /> súlyú horoggal. Mennyi munka kell az egész (lánc + horog) felhúzásához?
            </>
          }
        >
          <p>
            Horog munkája: <M t="100\cdot 15 = 1500\text{ J}" />. Lánc munkája: <M t="\int_0^{15} 20y\,dy = 2250\text{ J}" />. Összesen: <M t="\mathbf{3750\text{ J}}" />.
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              <em>Félgömb medence:</em> egy <M t="R=3\text{ m}" /> sugarú félgömb alakú medence színültig van vízzel. Számítsd ki a pereméig való kiszivattyúzás munkáját (<M t="\rho g" />-vel kifejezve)!
            </>
          }
        >
          <p>
            Mérjük <M t="u" />-t a peremtől <em>lefelé</em> (<M t="0\le u\le 3" />): a körszelet sugara <M t="r^2 = 9 - u^2" />, emelési távolsága éppen <M t="u" />!
          </p>
          <M block t="W = \pi\rho g\int_{0}^{3}(9-u^2)u\,du = \pi\rho g\left[\frac{9}{2}u^2 - \frac{u^4}{4}\right]_{0}^{3} = \pi\rho g\left(\frac{81}{2}-\frac{81}{4}\right) = \mathbf{\frac{81\pi}{4}\rho g}." />
        </Task>
        <Task
          n={18}
          q={
            <>
              Egy műholdat a Föld felszínétől (<M t="R" />) előbb <M t="2R" /> távolságra, majd <M t="2R" />-ről <M t="3R" /> távolságra emelünk. Hányszor több munka kell az első szakaszhoz, mint a másodikhoz?
            </>
          }
        >
          <p>
            <M t="W_1 = GMm\left(\frac{1}{R}-\frac{1}{2R}\right)=\frac{GMm}{2R}" />, <M t="W_2 = GMm\left(\frac{1}{2R}-\frac{1}{3R}\right)=\frac{GMm}{6R}" />. Arányuk: <M t="\dfrac{W_1}{W_2} = \mathbf{3}" />!
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              <em>Rugós kilövő:</em> egy <M t="50\text{ g}" /> tömegű labdát egy <M t="k=40\text{ N/m}" /> rugóállandójú, <M t="10\text{ cm}" />-rel összenyomott függőleges rugó lő fel. Milyen magasra repül a labda (<M t="g=9{,}8\text{ m/s}^2" />, légellenállás nélkül)?
            </>
          }
        >
          <p>
            A rugó munkája átalakul helyzeti energiává (<M t="\frac{1}{2}kx^2 = mgh" />):
          </p>
          <M block t="\frac{1}{2}(40)(0{,}10)^2 = 0{,}20\text{ J} = 0{,}05\cdot 9{,}8\cdot h \implies h = \frac{0{,}20}{0{,}49} \approx \mathbf{0{,}408\text{ m} = 40{,}8\text{ cm}}." />
        </Task>
      </>
    ),
  },
];
