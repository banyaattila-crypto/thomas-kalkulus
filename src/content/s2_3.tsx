import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import { EpsDeltaGame, RecipeWidget, SafeDeltaWidget, SumWidget } from '../components/Widgets23';
import type { Page } from './s1_1';

export const S2_3: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'A hibahatár-játék: miért kell pontos definíció?',
    body: (
      <>
        <Story>
          <p>
            Egy műhelyben a megrendelő azt mondja: „a tengely átmérője legyen 40 mm, legfeljebb 0,02 mm eltéréssel”. A gépkezelő erre megkérdezi: milyen pontosan kell a gépet beállítanom? A megrendelő hibahatárt ad, a gyártó pedig a beállítási pontosságot. Kisebb hibahatárhoz finomabb beállítás kell.
          </p>
        </Story>
        <p>
          Eddig azt mondtuk, hogy <M t="f(x)" /> „tetszőlegesen közel kerül” <M t="L" />-hez, ha <M t="x" /> elég közel van <M t="x_0" />-hoz. Ez szemléletes, de nem pontos: mennyire közel? „Elég közel” alapján nem lehet tételt bizonyítani. A pontos definíció ugyanezt a műhelyi párbeszédet fogalmazza meg számokkal.
        </p>
        <h3>A játék szabályai</h3>
        <p>
          Egy szkeptikus kétségbe vonja, hogy <M t="\lim_{x\to x_0}f(x)=L" />. Két lépésből álló játékot játszunk:
        </p>
        <ol>
          <li>
            A szkeptikus kitűz egy <M t="\varepsilon>0" /> hibahatárt: azt követeli, hogy <M t="f(x)" /> az <M t="L" />-től <em>kevesebb mint ε</em>-nal térjen el.
          </li>
          <li>
            Mi válaszolunk egy <M t="\delta>0" /> számmal: ha <M t="x" /> az <M t="x_0" />-tól kevesebb mint <M t="\delta" />-val tér el (de <M t="x\neq x_0" />), akkor a követelés teljesül.
          </li>
        </ol>
        <p>
          Egyetlen jó válasz még nem elég: a szkeptikus újabb, kisebb ε-t is kitűzhet. A határérték akkor létezik, ha <strong>bármilyen</strong> ε-ra tudunk jó δ-t mondani. Ha egyetlen ε-ra sincs, az állított L nem határérték.
        </p>
        <EpsDeltaGame />
        <p>
          Próbáld ki: állíts be kicsi ε-t, majd keress hozzá olyan δ-t, amelynél a kék ablakban a grafikon végig a narancs sávon belül marad. Figyeld meg, hogy minél kisebb az ε, annál kisebb δ kell.
        </p>
        <h3>Feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Adj meg olyan <M t="\delta>0" /> számot, amelyre <M t="0<|x-x_0|<\delta" /> esetén <M t="a<x<b" />: (a) <M t="(a;b)=(2;9)" />, <M t="x_0=5" />; (b) <M t="(-1;4)" />, <M t="x_0=0" />; (c) <M t="(0{,}6;\,1{,}1)" />, <M t="x_0=0{,}8" />.
            </>
          }
        >
          <p>
            A δ legfeljebb az <M t="x_0" /> és a közelebbi végpont távolsága lehet.
          </p>
          <p>
            (a) <M t="5-2=3" /> és <M t="9-5=4" />, tehát <M t="\delta=3" /> (vagy kisebb). (b) <M t="0-(-1)=1" /> és <M t="4-0=4" />, tehát <M t="\delta=1" />. (c) <M t="0{,}8-0{,}6=0{,}2" /> és <M t="1{,}1-0{,}8=0{,}3" />, tehát <M t="\delta=0{,}2" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Az <M t="f(x)=2x+5" /> függvényre <M t="\lim_{x\to2}f(x)=9" />. Adj meg olyan δ-t, amely (a) <M t="\varepsilon=0{,}1" />, (b) <M t="\varepsilon=0{,}01" /> esetén megfelel.
            </>
          }
        >
          <p>
            <M t="|f(x)-9|=|2x-4|=2|x-2|" />. Ez akkor kisebb ε-nál, ha <M t="|x-2|<\varepsilon/2" />.
          </p>
          <p>
            (a) <M t="\delta=0{,}05" />. (b) <M t="\delta=0{,}005" />. Tízszer szigorúbb hibahatárhoz tízszer kisebb δ kell, mert a meredekség 2.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'A határérték ε–δ definíciója',
    body: (
      <>
        <Def title="Függvény határértéke (ε–δ definíció)">
          <p>
            Legyen <M t="f" /> értelmezve <M t="x_0" /> egy nyílt környezetében, esetleg <M t="x_0" /> kivételével. Azt mondjuk, hogy
          </p>
          <M block t="\lim_{x\to x_0}f(x)=L," />
          <p>
            ha bármely <M t="\varepsilon>0" />-hoz létezik <M t="\delta>0" />, amellyel minden <M t="x" />-re igaz a következő implikáció:
          </p>
          <M block t="0<|x-x_0|<\delta\ \Longrightarrow\ |f(x)-L|<\varepsilon." />
        </Def>
        <p>
          Kvantorokkal: <M t="\forall\varepsilon>0\ \exists\delta>0\ \forall x:\ 0<|x-x_0|<\delta\Rightarrow|f(x)-L|<\varepsilon" />. A sorrend lényeges. Az ε a szkeptikusé, ő választ először. A δ-nak ezután kell létrejönnie, ezért <em>függhet ε-tól</em> (és <M t="x_0" />-tól), de nem függhet az <M t="x" />-től.
        </p>
        <h3>Geometriai jelentés</h3>
        <p>
          Az egyenlőtlenség <M t="L-\varepsilon<f(x)<L+\varepsilon" /> alakban azt mondja, hogy a grafikon pontjai a vízszintes ε-sávban vannak. A <M t="0<|x-x_0|<\delta" /> az <M t="x_0" /> köré rajzolt függőleges δ-ablakot jelenti. A definíció azt követeli: az ablakon belül (az <M t="x=x_0" /> vonalat kivéve) a grafikon nem lóghat ki a sávból.
        </p>
        <h3>Miért áll ott a 0 &lt; |x − x₀|?</h3>
        <p>
          A határérték azt írja le, mi történik <M t="x_0" /> <em>közelében</em>, nem azt, hogy mi van magában <M t="x_0" />-ban. Ezért az <M t="x=x_0" /> pontot kizárjuk. Így az <M t="f" /> függvény <M t="x_0" />-beli értéke (vagy az, hogy ott nem is értelmezett) nem befolyásolja a határértéket. Próbáld ki a „kiugró pont” és az „ugrás” példával:
        </p>
        <EpsDeltaGame start={3} />
        <Warn>
          <p>
            Az „ugrás” példában a tagadás is látszik. Az <M t="L" /> nem határérték, ha van olyan ε, amelyhez <em>semmilyen</em> δ nem jó. Itt például <M t="\varepsilon=1" /> ilyen: bármilyen szűk ablakban van a bal oldalon olyan pont, ahol a függvényérték 2-vel tér el az állított 1-től.
          </p>
        </Warn>
        <h3>Feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Egy esztergagép állítócsavarjának <M t="x" /> állásából (mm-ben) a kapott átmérő <M t="D(x)=4x" /> mm. A névleges állás <M t="x_0=10" /> mm (átmérő: 40 mm). Mekkora legyen a beállítási pontosság, ha a megengedett eltérés <M t="\varepsilon=0{,}02" /> mm? Írd fel a megfelelő határértékállítást is.
            </>
          }
        >
          <p>
            Az állítás: <M t="\lim_{x\to10}4x=40" />. Az eltérés <M t="|4x-40|=4|x-10|" />, ez akkor kisebb 0,02-nél, ha <M t="|x-10|<0{,}005" />.
          </p>
          <p>
            Tehát <M t="\delta=0{,}005" /> mm: a csavart ezredmilliméter-pontossággal kell állítani. A tűréshatár felezése a δ-t is felezi.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Legyen <M t="f(x)=1" />, ha <M t="x>0" />, és <M t="f(x)=-1" />, ha <M t="x<0" />. Bizonyítsd be, hogy az <M t="f" /> függvénynek 0-ban nincs határértéke: semmilyen <M t="L" /> szám nem felel meg.
            </>
          }
        >
          <p>
            Válasszuk <M t="\varepsilon=1" />-et, és legyen <M t="\delta>0" /> tetszőleges. A <M t="\delta/2" /> és a <M t="-\delta/2" /> is az ablakba esik, az egyikben <M t="f=1" />, a másikban <M t="f=-1" />.
          </p>
          <p>
            A két függvényérték távolsága 2, ezért <M t="L" /> nem lehet mindkettőtől 1-nél közelebb: <M t="|1-L|+|-1-L|\ge2" />, így az egyik tag legalább 1. Az ablakban tehát van olyan pont, ahol <M t="|f(x)-L|\ge1=\varepsilon" />. Egyetlen δ sem jó, tehát egyetlen <M t="L" /> sem határérték.
          </p>
        </Task>
        <Task
          n={5}
          q={
            <>
              Legyen <M t="f(x)=3x" />, ha <M t="x\neq1" />, és <M t="f(1)=10" />. Mi a határértéke <M t="x\to1" /> esetén? Mekkora δ jó <M t="\varepsilon=0{,}3" />-hoz? Számít-e az <M t="f(1)=10" />?
            </>
          }
        >
          <p>
            Az <M t="x\neq1" /> pontokban <M t="f(x)=3x" />, ezért <M t="\lim_{x\to1}f(x)=3" />. Az eltérés <M t="|3x-3|=3|x-1|<0{,}3" />, ha <M t="|x-1|<0{,}1" />: <M t="\delta=0{,}1" />.
          </p>
          <p>
            Az <M t="f(1)=10" /> érték nem számít, mert a feltétel <M t="0<|x-1|" />. A határérték 3, a függvényérték pedig 10: a kettő különbözhet.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A δ megkeresése két lépésben',
    body: (
      <>
        <p>
          A definíció nem ad módszert a határérték kiszámolására, csak arra jó, hogy egy sejtést ellenőrizzünk. Az ellenőrzéshez viszont meg kell tudni adni a δ-t. Ennek egy általános receptje van:
        </p>
        <Def title="Recept a δ megadására (adott f, L, x₀, ε)">
          <ol>
            <li>
              Oldd meg az <M t="|f(x)-L|<\varepsilon" /> egyenlőtlenséget: keress egy <M t="(a;b)" /> intervallumot, amely <M t="x_0" />-t tartalmazza, és amelynek minden (x₀-tól különböző) pontjában az egyenlőtlenség igaz.
            </li>
            <li>
              Válaszd δ-t az <M t="x_0" />-nak az <M t="(a;b)" /> két végpontjától mért távolsága közül a kisebbnek: <M t="\delta=\min\{x_0-a,\ b-x_0\}" />. Ekkor az <M t="x_0" /> körüli <M t="(x_0-\delta;\,x_0+\delta)" /> ablak belefér az <M t="(a;b)" />-be.
            </li>
          </ol>
        </Def>
        <RecipeWidget />
        <p>
          Két megjegyzés. A recept a <em>legnagyobb</em> jó δ-t adja, de nincs rá szükség: bármilyen nála kisebb pozitív szám is megfelel, és a bizonyításhoz elég egyet találni. Másrészt az <M t="(a;b)" /> intervallum általában nem szimmetrikus <M t="x_0" /> körül, az ablak viszont az: ezért kell a két távolság közül a kisebbet venni (ezt a <M t="\min" /> jelöli).
        </p>
        <h3>Egy teljes bizonyítás</h3>
        <p>
          Igazoljuk, hogy <M t="\lim_{x\to2}(3x+1)=7" />. Legyen <M t="\varepsilon>0" /> tetszőleges, és <M t="\delta=\varepsilon/3" />. Ha <M t="0<|x-2|<\delta" />, akkor
        </p>
        <M block t="|(3x+1)-7|=3|x-2|<3\delta=\varepsilon." />
        <p>
          A bizonyítás azért érvényes, mert a δ egyetlen képlet <M t="\varepsilon" />-ból, így <em>minden</em> ε-ra működik.
        </p>
        <Steps
          source="Analízis-labor"
          title="Lineáris határérték ε–δ bizonyítása"
          problem={
            <>
              Bizonyítsuk az <M t="\varepsilon" />–<M t="\delta" /> definícióval, hogy <M t="\lim_{x\to 3}(4x - 5) = 7" />!
            </>
          }
          steps={[
            {
              title: 'A cél-egyenlőtlenség felírása',
              body: (
                <p>
                  Legyen adott tetszőleges <M t="\varepsilon > 0" />. Azt szeretnénk, hogy <M t="|(4x - 5) - 7| < \varepsilon" /> teljesüljön.
                </p>
              ),
            },
            {
              title: 'Kiemelés és δ megsejtése',
              body: (
                <p>
                  Átalakítva: <M t="|4x - 12| = 4|x - 3| < \varepsilon \iff |x - 3| < \dfrac{\varepsilon}{4}" />.
                </p>
              ),
            },
            {
              title: 'A δ megválasztása és ellenőrzés',
              body: (
                <p>
                  Válasszuk <M t="\delta = \dfrac{\varepsilon}{4}" />-et! Ekkor <M t="0 < |x - 3| < \delta \implies |(4x - 5) - 7| = 4|x - 3| < 4 \cdot \dfrac{\varepsilon}{4} = \varepsilon" />. <span aria-hidden>∎</span>
                </p>
              ),
            },
          ]}
        />
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Az <M t="f(x) = 3x + 1" /> függvénynél <M t="x_0 = 2" />, <M t="L = 7" /> és <M t="\varepsilon = 0{,}06" /> esetén mi a legnagyobb jó <M t="\delta" />?
            </>
          }
          options={[
            { label: <M t="\delta = 0{,}02" />, ok: true },
            { label: <M t="\delta = 0{,}18" /> },
            { label: <M t="\delta = 0{,}06" /> },
            { label: <M t="\delta = 0{,}03" /> },
          ]}
          explain={
            <>
              <M t="|3x + 1 - 7| = 3|x - 2| < 0{,}06 \implies |x - 2| < 0{,}02" />, így a legnagyobb megfelelő választás <M t="\delta = 0{,}02" />.
            </>
          }
        />
        <h3>Feladatok</h3>
        <Task
          n={6}
          q={
            <>
              Bizonyítsd be a definícióval, hogy <M t="\lim_{x\to2}(4x-3)=5" />. Add meg a konkrét δ-t <M t="\varepsilon=0{,}2" /> esetén.
            </>
          }
        >
          <p>
            <M t="|(4x-3)-5|=4|x-2|" />. Ez kisebb ε-nál, ha <M t="|x-2|<\varepsilon/4" />. Legyen tehát <M t="\delta=\varepsilon/4" />: ekkor <M t="0<|x-2|<\delta" /> esetén <M t="|(4x-3)-5|<4\delta=\varepsilon" />.
          </p>
          <p>
            <M t="\varepsilon=0{,}2" />-nél <M t="\delta=0{,}05" />.
          </p>
        </Task>
        <Task
          n={7}
          q={
            <>
              A <M t="\lim_{x\to4}\sqrt{2x+1}=3" /> állításhoz keress <M t="\varepsilon=0{,}3" />-hoz δ-t.
            </>
          }
        >
          <p>
            1. lépés: <M t="|\sqrt{2x+1}-3|<0{,}3\iff2{,}7<\sqrt{2x+1}<3{,}3\iff7{,}29<2x+1<10{,}89\iff3{,}145<x<4{,}945" />.
          </p>
          <p>
            2. lépés: <M t="4-3{,}145=0{,}855" /> és <M t="4{,}945-4=0{,}945" />, tehát <M t="\delta=0{,}855" /> (vagy kisebb).
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              A <M t="\lim_{x\to4}\dfrac1x=\dfrac14" /> állításhoz keress <M t="\varepsilon=0{,}05" />-höz δ-t.
            </>
          }
        >
          <p>
            1. lépés: <M t="\left|\dfrac1x-\dfrac14\right|<0{,}05\iff0{,}2<\dfrac1x<0{,}3\iff\dfrac{10}3<x<5" /> (pozitív x-ekre; a reciprokképzés megfordítja a rendezést).
          </p>
          <p>
            2. lépés: <M t="4-\dfrac{10}3=\dfrac23" /> és <M t="5-4=1" />, tehát <M t="\delta=\dfrac23\approx0{,}667" />. A bal oldali távolság a kisebb.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Nem lineáris függvények: a δ biztonságos megválasztása',
    body: (
      <>
        <p>
          Lineáris függvénynél a δ egyszerű képlet. A gyökös vagy törtes esetekben az egyenlőtlenség megoldása már fáradságos. Szerencsére nem kell a <em>legnagyobb</em> δ-t megtalálni: elég egy jó. Ehhez egy ügyes trükk van: előre korlátozzuk az ablakot (például <M t="\delta\le1" />), hogy a „bonyolult” tényezőt felülről becsülni tudjuk.
        </p>
        <h3>Példa: <M t="\lim_{x\to x_0}x^2=x_0^2" /></h3>
        <p>
          Az eltérést szorzattá bontjuk:
        </p>
        <M block t="|x^2-x_0^2|=|x-x_0|\cdot|x+x_0|." />
        <p>
          Az első tényezőt a δ szabályozza. A másodikat becsüljük: ha <M t="\delta\le1" /> és <M t="|x-x_0|<\delta" />, akkor <M t="|x+x_0|=|(x-x_0)+2x_0|\le1+2|x_0|" />. Így
        </p>
        <M block t="|x^2-x_0^2|<(2|x_0|+1)\,\delta." />
        <p>
          Ez ε alatt marad, ha <M t="\delta\le\varepsilon/(2|x_0|+1)" />. Mindkét kikötést teljesíti a
        </p>
        <M block t="\delta=\min\left\{1,\ \dfrac{\varepsilon}{2|x_0|+1}\right\}." />
        <SafeDeltaWidget />
        <p>
          A biztonságos δ valamivel kisebb a pontosnál, de ez a bizonyításhoz nem baj, és a számolása gyökvonás nélkül megy. A bizonyítás lényege itt a <em>becslés</em>: a nehezen kezelhető tényezőt egy konstans felső korlátjával cseréljük.
        </p>
        <Warn>
          <p>
            A δ nem függhet az <M t="x" />-től. A „<M t="\delta=\varepsilon/|x+x_0|" />” hibás választás: az <M t="x" /> az ablakon belül változik, a δ-t viszont előre, az <M t="x" /> kiválasztása előtt kell megadnunk. Ezért kellett a becslés (<M t="|x+x_0|\le2|x_0|+1" />), amely az <M t="x" />-et kiküszöböli.
          </p>
        </Warn>
        <h3>Feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Add meg az <M t="x^2" /> függvény <M t="x_0=4" />, <M t="\varepsilon=0{,}5" /> esetén megfelelő pontos δ-t és a biztonságos <M t="\min\{1;\varepsilon/(2x_0+1)\}" /> értéket. Melyik a kisebb?
            </>
          }
        >
          <p>
            Pontos: <M t="|x^2-16|<0{,}5\iff15{,}5<x^2<16{,}5\iff3{,}937<x<4{,}062" /> (négy tizedesre kerekítve). A távolságok: <M t="4-\sqrt{15{,}5}\approx0{,}0630" /> és <M t="\sqrt{16{,}5}-4\approx0{,}0620" />. Tehát <M t="\delta_{\text{pontos}}\approx0{,}0620" />.
          </p>
          <p>
            Biztonságos: <M t="\min\{1;\ 0{,}5/9\}\approx0{,}0556" />. A biztonságos érték a kisebb, ahogy várható: a pontosnál nem lehet nagyobb.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Bizonyítsd be a definícióval: <M t="\lim_{x\to1}(x^2+x)=2" />. Mekkora a δ, ha <M t="\varepsilon=0{,}02" />?
            </>
          }
        >
          <p>
            <M t="x^2+x-2=(x-1)(x+2)" />. Ha <M t="\delta\le1" />, akkor <M t="0<x<2" />, így <M t="x+2<4" />, és <M t="|x^2+x-2|<4|x-1|<4\delta" />.
          </p>
          <p>
            Ez ε alatt van, ha <M t="\delta\le\varepsilon/4" />. Válasszuk <M t="\delta=\min\{1;\varepsilon/4\}" />-et. <M t="\varepsilon=0{,}02" />-nél <M t="\delta=0{,}005" />.
          </p>
        </Task>
        <Task
          n={11}
          q={
            <>
              Bizonyítsd be a definícióval: <M t="\lim_{x\to1}\dfrac1x=1" />. Mekkora a δ, ha <M t="\varepsilon=0{,}1" />?
            </>
          }
        >
          <p>
            <M t="\left|\dfrac1x-1\right|=\dfrac{|x-1|}{|x|}" />. A nevezőt alulról kell becsülni: ha <M t="\delta\le\tfrac12" />, akkor <M t="x>\tfrac12" />, így <M t="\dfrac1{|x|}<2" /> és az eltérés kisebb, mint <M t="2|x-1|<2\delta" />.
          </p>
          <p>
            Ez ε alatt van, ha <M t="\delta\le\varepsilon/2" />. Legyen <M t="\delta=\min\{\tfrac12;\ \varepsilon/2\}" />. <M t="\varepsilon=0{,}1" />-nél <M t="\delta=0{,}05" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Tételek bizonyítása a definícióból',
    body: (
      <>
        <p>
          A határértékszámításban a definíciót ritkán használjuk közvetlenül. A 2.2-ben megismert szabályokat (összeg, szorzat, hányados) használjuk, és ezeket éppen a definícióból lehet bebizonyítani. Nézzük az összegszabályt.
        </p>
        <Def title="Összegszabály">
          <p>
            Ha <M t="\lim_{x\to c}f(x)=L" /> és <M t="\lim_{x\to c}g(x)=M" />, akkor <M t="\lim_{x\to c}(f(x)+g(x))=L+M" />.
          </p>
        </Def>
        <p>
          <strong>Bizonyítás.</strong> Legyen <M t="\varepsilon>0" /> a szkeptikus kihívása az összegre. Az eltérést a háromszög-egyenlőtlenséggel két részre bontjuk:
        </p>
        <M block t="|f+g-(L+M)|=|(f-L)+(g-M)|\le|f-L|+|g-M|." />
        <p>
          Ha mindkét tagot <M t="\varepsilon/2" /> alatt tartjuk, az összeg ε alatt marad. Kérjünk tehát az <M t="f" /> és a <M t="g" /> határértékétől is <M t="\varepsilon/2" /> pontosságot (ez újabb, saját kihívás: a feltevések minden pozitív számra érvényesek, így <M t="\varepsilon/2" />-re is). Így van <M t="\delta_1" /> és <M t="\delta_2" />, hogy
        </p>
        <M block t="0<|x-c|<\delta_1\Rightarrow|f-L|<\tfrac\varepsilon2,\qquad 0<|x-c|<\delta_2\Rightarrow|g-M|<\tfrac\varepsilon2." />
        <p>
          A <M t="\delta=\min\{\delta_1,\delta_2\}" /> választással mindkét feltétel egyszerre teljesül, és <M t="|f+g-(L+M)|<\tfrac\varepsilon2+\tfrac\varepsilon2=\varepsilon" />. <span aria-hidden>∎</span>
        </p>
        <SumWidget />
        <h3>Az egyenlőtlenség megőrzése</h3>
        <p>
          Ha <M t="f(x)\le g(x)" /> teljesül <M t="c" /> egy környezetében (c kivételével), és <M t="\lim f=L" />, <M t="\lim g=M" />, akkor <M t="L\le M" />. Indirekt bizonyítás: tegyük fel, hogy <M t="L>M" />, és legyen <M t="\varepsilon=\dfrac{L-M}2>0" />. Elég közel <M t="c" />-hez <M t="f(x)>L-\varepsilon=\dfrac{L+M}2" /> és <M t="g(x)<M+\varepsilon=\dfrac{L+M}2" />, vagyis <M t="g(x)<f(x)" />, ami ellentmond a feltevésnek. Tehát <M t="L\le M" />.
        </p>
        <Warn>
          <p>
            A szigorú egyenlőtlenség nem marad meg: az <M t="f(x)=x^2>0=g(x)" /> minden <M t="x\ne0" /> pontban igaz, a határértékek viszont mindkettő 0. A határérték „lágyítja” a szigorú egyenlőtlenséget.
          </p>
        </Warn>
        <h3>Feladatok</h3>
        <Task
          n={12}
          q={
            <>
              Ha <M t="\lim_{x\to c}f(x)=L" />, bizonyítsd be a definícióval, hogy <M t="\lim_{x\to c}5f(x)=5L" />.
            </>
          }
        >
          <p>
            Legyen <M t="\varepsilon>0" />. A feltevést az <M t="\varepsilon/5" /> kihívásra alkalmazzuk: van <M t="\delta>0" />, hogy <M t="0<|x-c|<\delta" /> esetén <M t="|f(x)-L|<\varepsilon/5" />.
          </p>
          <p>
            Ugyanerre a δ-ra <M t="|5f(x)-5L|=5|f(x)-L|<5\cdot\varepsilon/5=\varepsilon" />. <span aria-hidden>∎</span>
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Ha <M t="\lim_{x\to c}f(x)=L" /> és <M t="L>0" />, bizonyítsd be, hogy van olyan <M t="\delta>0" />, hogy <M t="0<|x-c|<\delta" /> esetén <M t="f(x)>L/2" />.
            </>
          }
        >
          <p>
            Használjuk a definíciót az <M t="\varepsilon=L/2>0" /> kihívásra: van δ, hogy <M t="0<|x-c|<\delta" /> esetén <M t="|f(x)-L|<L/2" />.
          </p>
          <p>
            Ebből <M t="f(x)>L-L/2=L/2" />. A pozitív határérték tehát c közelében pozitív függvényértékeket is jelent. <span aria-hidden>∎</span>
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Igazold, hogy <M t="\lim_{x\to0}x^2=0" />, és magyarázd meg, hogy ez miért mutatja a szigorú egyenlőtlenség elvesztését.
            </>
          }
        >
          <p>
            Legyen ε &gt; 0 és <M t="\delta=\sqrt\varepsilon" />. Ha <M t="0<|x|<\delta" />, akkor <M t="|x^2-0|=x^2<\delta^2=\varepsilon" />, tehát a határérték 0.
          </p>
          <p>
            Minden <M t="x\ne0" />-ra <M t="x^2>0" />, a 0 viszont a konstans 0 függvény határértéke is. Az <M t="f(x)>g(x)" /> egyenlőtlenségből tehát csak <M t="L\ge M" /> következik, <M t="L>M" /> nem.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Hol hibás az alábbi „bizonyítás”? Javítsd ki. <em>Állítás: <M t="\lim_{x\to2}x^2=4" />. Legyen <M t="\delta=\varepsilon/(x+2)" />. Ha <M t="0<|x-2|<\delta" />, akkor <M t="|x^2-4|=|x-2||x+2|<\delta(x+2)=\varepsilon" />.</em>
            </>
          }
        >
          <p>
            A hiba: a δ az <M t="x" />-től függ. A δ-t előre kell megadni ε-hoz, az <M t="x" /> pedig csak ezután, az ablakból kerül kiválasztásra. Ilyen „δ” nem is szám, hanem függvény.
          </p>
          <p>
            Javítás: ha <M t="\delta\le1" />, akkor <M t="1<x<3" />, így <M t="x+2<5" />, és <M t="|x^2-4|<5|x-2|<5\delta" />. A <M t="\delta=\min\{1;\varepsilon/5\}" /> már csak ε-tól függ.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás és gyakori hibák',
    body: (
      <>
        <h3>A definíció egy mondatban</h3>
        <p>
          <M t="\lim_{x\to x_0}f(x)=L" /> azt jelenti, hogy <strong>bármilyen szűk ε-sávot</strong> kér a szkeptikus <M t="L" /> körül, mindig van olyan <strong>δ-ablak</strong> <M t="x_0" /> körül, amelyben (<M t="x_0" /> kivételével) a grafikon a sávon belül marad.
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>Szemléletes kifejezés</th>
              <th>Pontos megfelelője</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>„f(x) tetszőlegesen közel van L-hez”</td>
              <td>
                bármilyen <M t="\varepsilon>0" />-ra teljesül <M t="|f(x)-L|<\varepsilon" />
              </td>
            </tr>
            <tr>
              <td>„ha x elég közel van x₀-hoz”</td>
              <td>
                létezik <M t="\delta>0" />, hogy <M t="0<|x-x_0|<\delta" />
              </td>
            </tr>
            <tr>
              <td>„x tart x₀-hoz, de nem éri el”</td>
              <td>
                a <M t="0<|x-x_0|" /> feltétel kizárja az <M t="x=x_0" /> pontot
              </td>
            </tr>
            <tr>
              <td>„L nem határérték”</td>
              <td>
                van olyan <M t="\varepsilon>0" />, amelyhez nincs jó <M t="\delta" />
              </td>
            </tr>
          </tbody>
        </table>
        <h3>A δ megadásának módszerei</h3>
        <table className="tbl">
          <thead>
            <tr>
              <th>Eset</th>
              <th>Módszer</th>
              <th>Példa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>lineáris: <M t="ax+b" /></td>
              <td>
                <M t="\delta=\varepsilon/|a|" />
              </td>
              <td>
                <M t="4x-3" />: <M t="\delta=\varepsilon/4" />
              </td>
            </tr>
            <tr>
              <td>monoton, invertálható</td>
              <td>2 lépéses recept: intervallum, közelebbi végpont</td>
              <td>
                <M t="\sqrt{2x+1}" />, <M t="1/x" />
              </td>
            </tr>
            <tr>
              <td>szorzat, tört</td>
              <td>
                <M t="\delta\le1" /> korlátozás és felső becslés: <M t="\delta=\min\{1;\,\varepsilon/K\}" />
              </td>
              <td>
                <M t="x^2+x" />, <M t="1/x" />
              </td>
            </tr>
            <tr>
              <td>összeg, szorzat tételekben</td>
              <td>
                <M t="\varepsilon/2" /> felosztás és <M t="\delta=\min\{\delta_1,\delta_2\}" />
              </td>
              <td>összegszabály</td>
            </tr>
          </tbody>
        </table>
        <h3>Gyakori hibák</h3>
        <ul>
          <li>
            <strong>Fordított sorrend.</strong> Az ε a kihívás (előbb adott), a δ a válasz. A δ-t nem választhatjuk meg ε ismerete nélkül.
          </li>
          <li>
            <strong>Egyetlen ε.</strong> Egy konkrét ε-ra talált δ még nem bizonyítja a határértéket, csak azt, hogy az adott kihívásra tudunk válaszolni. Általános ε-ra kell megadni a képletet.
          </li>
          <li>
            <strong>A δ függ az x-től.</strong> Ez nem megengedett (l. 15. feladat).
          </li>
          <li>
            <strong>A 0 &lt; |x − x₀| elhagyása.</strong> Ha az <M t="x=x_0" /> pontot is beleértjük, a definíció a folytonosság lesz, amely más fogalom. Folytonosság: <M t="f(x_0)=L" /> is kell (2.6).
          </li>
          <li>
            <strong>Egyenlőtlenségek összekeverése.</strong> Az ε-nál „kisebb” és „legfeljebb” ugyanazt a fogalmat adja, mert ε tetszőleges. A lényeg a <em>bármely</em> ε.
          </li>
        </ul>
        <h3>Mi következik?</h3>
        <p>
          A 2.4-ben a definíciót egyoldali közelítésre szűkítjük (bal és jobb oldali határérték), majd a határértéket a végtelenben vizsgáljuk.
        </p>
      </>
    ),
  },
];
