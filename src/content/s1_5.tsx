import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import { ArithWidget, CompositeWidget, TransformWidget, OrderWidget, EllipseWidget } from '../components/Widgets15';
import type { Page } from './s1_1';

export const S1_5: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Műveletek két függvénnyel',
    body: (
      <>
        <Story>
          <p>
            Egy kisüzem havi nyeresége úgy számolható, hogy a bevétel függvényéből kivonjuk a költség függvényét. Két függvényből így egy
            harmadik lett, és a számolást minden darabszámnál külön, az ahhoz tartozó értékekkel végeztük el.
          </p>
        </Story>
        <p>
          Ez az általános eljárás: két függvényből új függvényt építünk úgy, hogy ugyanahhoz az <M t="x" /> értékhez tartozó függvényértékeken
          végzünk műveletet.
        </p>
        <Def title="Összeg, különbség, szorzat, hányados, számszoros">
          <M block t="(f+g)(x)=f(x)+g(x),\qquad (f-g)(x)=f(x)-g(x)," />
          <M block t="(f\cdot g)(x)=f(x)\,g(x),\qquad \Big(\dfrac fg\Big)(x)=\dfrac{f(x)}{g(x)}," />
          <M block t="(c\,f)(x)=c\cdot f(x)." />
        </Def>
        <h3>Hol értelmes az eredmény?</h3>
        <p>
          Az <M t="(f+g)(x)" /> kiszámításához mindkét függvény értékére szükség van, ezért az eredmény csak azokon a helyeken él, ahol{' '}
          <M t="f" /> és <M t="g" /> egyaránt értelmezett: a <M t="D(f)\cap D(g)" /> metszeten. Ugyanez igaz a különbségre és a szorzatra.
          A hányadosnál még egy feltétel jön: <M t="g(x)\ne0" />, vagyis a nevező zérushelyeit ki kell hagyni. A <M t="c\,f" /> függvény
          tartománya megegyezik <M t="D(f)" />-fel.
        </p>
        <p>
          Grafikusan az összeg azt jelenti, hogy minden <M t="x" /> fölött összeadjuk a két görbe magasságát (előjelesen: a tengely alatti
          „magasság” negatív). A szorzatnál a magasságok szorzódnak, ezért ott, ahol az egyik függvény nulla, a szorzat is nulla.
        </p>
        <p>Próbáld ki az eszközben: válassz két függvényt és egy műveletet, és figyeld a sárga sávot. Az mutatja, hol él az eredmény.</p>
        <ArithWidget />
        <Warn>
          Az értelmezési tartományt az egyszerűsítés <em>előtt</em> kell megállapítani. Például <M t="f(x)=x^2-1" /> és <M t="g(x)=x-1" /> esetén{' '}
          <M t="\dfrac{f(x)}{g(x)}=\dfrac{(x-1)(x+1)}{x-1}=x+1" />, de az <M t="f/g" /> függvény az <M t="x=1" /> helyen nincs értelmezve, tehát
          nem azonos az <M t="x+1" /> függvénnyel, amelynek tartománya a teljes számegyenes.
        </Warn>

        <h3>Feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Legyen <M t="f(x)=\sqrt{x+3}" /> és <M t="g(x)=\sqrt{5-x}" />. Add meg <M t="D(f)" />, <M t="D(g)" /> és a következők tartományát:{' '}
              <M t="f+g" />, <M t="f\cdot g" />, <M t="f/g" />, <M t="g/f" />.
            </>
          }
        >
          <p>
            <M t="D(f)=[-3;\infty)" /> (mert <M t="x+3\ge0" />), <M t="D(g)=(-\infty;5]" /> (mert <M t="5-x\ge0" />). A metszet <M t="[-3;5]" />, ez a tartománya{' '}
            <M t="f+g" />-nek és <M t="f\cdot g" />-nek.
          </p>
          <p>
            A hányadosnál ki kell zárni a nevező zérushelyét. <M t="g(5)=0" />, ezért <M t="D(f/g)=[-3;5)" />. <M t="f(-3)=0" />, ezért{' '}
            <M t="D(g/f)=(-3;5]" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Legyen <M t="f(x)=\dfrac1{x-2}" /> és <M t="g(x)=x^2-9" />. Írd fel <M t="f/g" /> és <M t="g/f" /> képletét és értelmezési tartományát.
            </>
          }
        >
          <p>
            <M t="D(f)=\mathbb{R}\setminus\{2\}" />, <M t="D(g)=\mathbb{R}" />, a metszet <M t="\mathbb{R}\setminus\{2\}" />. A <M t="g" /> zérushelyei <M t="\pm3" />.
          </p>
          <p>
            <M t="(f/g)(x)=\dfrac{1}{(x-2)(x^2-9)}" />, tartománya <M t="\mathbb{R}\setminus\{-3;\,2;\,3\}" />. Az <M t="f" />-nek nincs zérushelye, ezért{' '}
            <M t="(g/f)(x)=(x^2-9)(x-2)" />, tartománya csak <M t="\mathbb{R}\setminus\{2\}" />. A képlet polinomnak látszik, de a tartomány nem a teljes számegyenes.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Összetett függvények',
    body: (
      <>
        <Story>
          <p>
            Ha euróban kapsz egy árat, először forintra váltod, aztán a forintösszegből számolsz áfát. Két átalakítás követi egymást, és a második
            bemenete az első eredménye. Fordított sorrendben (előbb áfa, aztán váltás) más lépéseket végeznél, és az eredmény általában is más.
          </p>
        </Story>
        <Def title="Összetett függvény">
          <M block t="(f\circ g)(x)=f\big(g(x)\big)." />
          <p>
            Előbb a <M t="g" /> dolgozik, aztán az <M t="f" />. A jelölést „f kör g”-nek olvassuk. A tartomány azokból az <M t="x\in D(g)" /> értékekből áll,
            amelyekre <M t="g(x)\in D(f)" /> teljesül: a belső függvény eredményét a külső függvény még fel kell tudja dolgozni.
          </p>
        </Def>
        <p>
          Példa: <M t="f(x)=\sqrt x" />, <M t="g(x)=x-3" />. Az <M t="f\circ g" /> képlete <M t="\sqrt{x-3}" />, a <M t="g(x)=x-3" /> eredményének nemnegatívnak kell
          lennie, vagyis <M t="x\ge3" />. A <M t="g\circ f" /> képlete <M t="\sqrt x-3" />, itt a belső függvény a gyökvonás, ezért a tartomány <M t="[0;\infty)" />.
          A kettő különbözik: <M t="f\circ g" /> és <M t="g\circ f" /> általában nem azonos.
        </p>
        <p>
          Az eszközben hat függvénypárt találsz. A csúszkával választott <M t="x" /> helyen lépésről lépésre látod a belső, majd a külső függvény
          értékét, vagy azt, hogy hol akad el a számolás.
        </p>
        <CompositeWidget />
        <p>
          Az utolsó pár különlegesség: ott <M t="f\circ g=g\circ f" />. Ez ritka véletlen, nem szabály.
        </p>
        <Warn>
          Az összetétel képlete egyszerűsítés után elveszítheti a tartományi feltételt. Az <M t="f(x)=\sqrt x" />, <M t="g(x)=4-x^2" /> pár esetén{' '}
          <M t="(g\circ f)(x)=4-(\sqrt x)^2" />, ami „csak” <M t="4-x" />-nek látszik, de a gyökvonás miatt ez csak <M t="x\ge0" />-ra él.
        </Warn>

        <h3>Felbontás belső és külső függvényre</h3>
        <p>
          Egy képletnél azt kérdezd meg, mit számolsz ki először az <M t="x" />-ből. Az lesz a belső függvény. A <M t="\dfrac1{x^2+1}" /> esetén előbb{' '}
          <M t="x^2+1" /> készül, utána jön a reciprok: <M t="g(x)=x^2+1" />, <M t="f(x)=1/x" />.
        </p>

        <h3>Feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Legyen <M t="f(x)=\sqrt{x-1}" /> és <M t="g(x)=x^2+1" />. Add meg az <M t="f\circ g" /> és <M t="g\circ f" /> képletét és tartományát.
            </>
          }
        >
          <p>
            <M t="(f\circ g)(x)=\sqrt{x^2+1-1}=\sqrt{x^2}=|x|" />. A belső érték <M t="x^2+1\ge1" /> mindig megfelel, ezért a tartomány <M t="\mathbb{R}" />.
          </p>
          <p>
            <M t="(g\circ f)(x)=(\sqrt{x-1})^2+1=x" />. A képlet azonosság, de a belső <M t="f" /> csak <M t="x\ge1" />-re él, ezért a tartomány <M t="[1;\infty)" />.
            Az <M t="f\circ g=|x|" /> a teljes számegyenesen él, a <M t="g\circ f" /> csak a <M t="[1;\infty)" /> félegyenesen: a két összetétel különbözik.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Bontsd belső és külső függvényre: (a) <M t="h(x)=|3x-6|" />, (b) <M t="k(x)=\dfrac1{x^2+1}" />, (c) <M t="m(x)=\sqrt{4-|x|}" />. A (c) tartományát is add meg.
            </>
          }
        >
          <p>
            (a) belső <M t="g(x)=3x-6" />, külső <M t="f(x)=|x|" />. (b) belső <M t="g(x)=x^2+1" />, külső <M t="f(x)=1/x" />. (c) belső <M t="g(x)=4-|x|" />, külső{' '}
            <M t="f(x)=\sqrt x" />.
          </p>
          <p>
            A (c) tartománya: <M t="4-|x|\ge0" />, azaz <M t="|x|\le4" />, tehát <M t="[-4;4]" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A grafikon eltolása',
    body: (
      <>
        <Story>
          <p>
            Ha egy filmet tíz perccel később indítanak, ugyanazok a jelenetek követik egymást, csak minden esemény későbbre kerül. A grafikonoknál ugyanez
            történik, ha az idő (az <M t="x" />) tengelyén eltoljuk a görbét.
          </p>
        </Story>
        <h3>Függőleges eltolás</h3>
        <p>
          Az <M t="y=f(x)+k" /> függvény minden értéke <M t="k" />-val nagyobb, mint <M t="f" />-é. A görbe tehát <M t="k" /> egységgel feljebb kerül (<M t="k>0" />),
          vagy lejjebb (<M t="k<0" />). Ez a megszokott irány.
        </p>
        <h3>Vízszintes eltolás: a megtévesztő előjel</h3>
        <p>
          Legyen <M t="g(x)=f(x-h)" />. Az <M t="f" /> egy értékét az <M t="x_0" /> helyen vette fel. A <M t="g" /> ugyanezt az értéket ott veszi fel, ahol{' '}
          <M t="x-h=x_0" />, azaz <M t="x=x_0+h" />. Minden pont tehát <M t="h" />-val jobbra csúszott. A kivonás az argumentumban jobbra tol, az összeadás balra:{' '}
          <M t="f(x+3)" /> a görbét 3-mal balra viszi.
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>Képlet</th>
              <th>Hatás a grafikonra</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <M t="f(x)+k" />, <M t="k>0" />
              </td>
              <td>k egységgel fel</td>
            </tr>
            <tr>
              <td>
                <M t="f(x)+k" />, <M t="k<0" />
              </td>
              <td>|k| egységgel le</td>
            </tr>
            <tr>
              <td>
                <M t="f(x-h)" />, <M t="h>0" />
              </td>
              <td>h egységgel jobbra</td>
            </tr>
            <tr>
              <td>
                <M t="f(x-h)" />, <M t="h<0" />
              </td>
              <td>|h| egységgel balra</td>
            </tr>
          </tbody>
        </table>
        <p>
          Példa: az <M t="y=\sqrt{x+4}-1" /> az <M t="y=\sqrt x" /> képe, balra 4-gyel és lefelé 1-gyel eltolva. A tartomány <M t="[-4;\infty)" />, az értékkészlet{' '}
          <M t="[-1;\infty)" />: mindkettő ugyanúgy csúszott el, mint a görbe.
        </p>
        <p>
          Az eszközben a szürke görbe az eredeti, a kék az eltolt. A karikázott pont az (1; 1) pont, a narancs pedig az eltolás utáni helye. Így a nyíl irányát
          közvetlenül látod.
        </p>
        <TransformWidget mode="shift" />
        <h3>Feladat</h3>
        <Task
          n={5}
          q={
            <>
              (a) Az <M t="y=|x|" /> grafikonját 3-mal jobbra és 2-vel fel toljuk. Írd fel az új függvényt, a csúcspontját és az <M t="y" />-tengelymetszetét. (b) Az{' '}
              <M t="y=(x+1)^2-4" /> melyik eltolt alapfüggvény? Hol vannak a zérushelyei?
            </>
          }
        >
          <p>
            (a) <M t="y=|x-3|+2" />. A csúcspont (3; 2). Az <M t="x=0" /> helyen <M t="y=|-3|+2=5" />, a metszéspont (0; 5).
          </p>
          <p>
            (b) Az <M t="y=x^2" /> balra 1-gyel és lefelé 4-gyel eltolva. Zérushely: <M t="(x+1)^2=4" />, <M t="x+1=\pm2" />, tehát <M t="x=1" /> és <M t="x=-3" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Nyújtás, zsugorítás, tükrözés',
    body: (
      <>
        <h3>Függőleges méretezés</h3>
        <p>
          Az <M t="y=a\,f(x)" /> függvény minden magassága <M t="a" />-szorosa az eredetinek. Ha <M t="|a|>1" />, a görbe „megnyúlik”, ha <M t="0<|a|<1" />, lelapul. A nulla szint
          nem mozdul. Negatív <M t="a" /> esetén a magasságok előjelet váltanak, vagyis a görbe az <M t="x" />-tengelyre tükröződik is.
        </p>
        <h3>Vízszintes méretezés: fordítva működik</h3>
        <p>
          Az <M t="y=f(bx)" /> függvény azt az értéket, amelyet <M t="f" /> az <M t="x_0" /> helyen vett fel, ott veszi fel, ahol <M t="bx=x_0" />, azaz{' '}
          <M t="x=x_0/b" />. A nagyobb <M t="b" /> tehát <em>összébb</em> húzza a görbét az <M t="y" />-tengely felé, a kisebb széthúzza. Az egész olyan, mintha a görbét más
          léptékű tengelyre rajzolnánk. A <M t="b=-1" /> esetén <M t="f(-x)" /> az <M t="y" />-tengelyre tükrözött görbe.
        </p>
        <p>
          Az 1.4-ben megismert páros függvény éppen az, amelyik ettől a tükrözéstől nem változik: <M t="f(-x)=f(x)" />, a páratlan függvény pedig a két tükrözés együttesétől
          (<M t="-f(-x)=f(x)" />).
        </p>
        <TransformWidget mode="scale" />
        <p>
          A csúszkák értékei között a nulla szándékosan nincs ott, mert <M t="a=0" /> vagy <M t="b=0" /> esetén egy vízszintes egyenes vagy egy konstans maradna.
        </p>
        <h3>Mikor ugyanaz a vízszintes és a függőleges méretezés?</h3>
        <p>
          Hatványfüggvényeknél mindig: <M t="(bx)^p=b^p\,x^p" />. A <M t="\sqrt{4x}=2\sqrt x" /> vízszintes zsugorítása a függőleges kétszeres nyújtással azonos. Általában
          ez nem igaz: az <M t="x^2+x" /> esetén <M t="f(2x)=4x^2+2x" />, ami nem számszorosa <M t="f" />-nek.
        </p>
        <Warn>
          A kis <M t="b" /> nem zsugorít, hanem széthúz. Ha <M t="y=f(x/3)" />, akkor <M t="b=1/3" />, a görbe vízszintesen háromszor szélesebb lesz.
        </Warn>
        <h3>Feladat</h3>
        <Task
          n={6}
          q={
            <>
              Fejezd ki függőleges méretezéssel: (a) <M t="y=\sqrt{16x}" />, (b) <M t="y=\left(\dfrac x2\right)^3" />. (c) Mutasd meg, hogy az <M t="f(x)=x^2+x" /> függvénynél a{' '}
              <M t="b=2" /> vízszintes méretezés nem pótolható függőlegessel.
            </>
          }
        >
          <p>
            (a) <M t="\sqrt{16x}=4\sqrt x" />: függőleges 4-szeres nyújtás. (b) <M t="(x/2)^3=\dfrac18x^3" />: függőleges méretezés <M t="1/8" />-ra.
          </p>
          <p>
            (c) <M t="f(2x)=4x^2+2x" />. Ha ez <M t="c\,(x^2+x)" /> lenne, akkor <M t="x^2" /> együtthatójából <M t="c=4" />, <M t="x" /> együtthatójából <M t="c=2" /> következne: ellentmondás.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Transzformációk együtt: a sorrend',
    body: (
      <>
        <p>
          Az eddigi négy átalakítás egyetlen képletbe fér:
        </p>
        <M block t="y=a\,f\big(b\,(x-h)\big)+k." />
        <p>
          Itt <M t="a" /> a függőleges, <M t="b" /> a vízszintes méretezés (negatív értéknél tükrözéssel), <M t="h" /> a vízszintes, <M t="k" /> a függőleges eltolás.
        </p>
        <h3>A számolás és az építés sorrendje fordított</h3>
        <p>
          Ha egy konkrét <M t="x" />-re kiszámolod az értéket, ez a sorrend: kivonsz <M t="h" />-t, szorzol <M t="b" />-vel, alkalmazod <M t="f" />-et, szorzol{' '}
          <M t="a" />-val, hozzáadsz <M t="k" />-t. A grafikont ezzel szemben így építed: előbb az <M t="f(bx)" /> méretezést, utána az <M t="x\to x-h" /> eltolást, majd a
          függőleges méretezést, végül a függőleges eltolást.
        </p>
        <p>
          Ha a képlet <M t="f(bx+c)" /> alakú, emeld ki <M t="b" />-t: <M t="f\big(b(x+c/b)\big)" />. Ebből olvasható le az eltolás: <M t="f(2x-1)=f\big(2(x-\tfrac12)\big)" />,
          vagyis előbb 2-es vízszintes zsugorítás, utána <em>fél</em> egység jobbra tolás, nem egy egész.
        </p>
        <TransformWidget mode="full" />
        <p>
          Az alábbi eszköz a sorrend hatását mutatja ugyanarra a két lépésre: tolás <M t="h" />-val és vízszintes méretezés <M t="b" />-vel. Az A görbét az{' '}
          <M t="f(bx-h)" />, a B görbét az <M t="f(b(x-h))" /> képlet adja. Ha egyik lépés hiányzik, a két görbe egybeesik, különben a csúcspontok eltérnek.
        </p>
        <OrderWidget />
        <h3>Feladat</h3>
        <Task
          n={7}
          q={
            <>
              Az <M t="y=\sqrt x" /> grafikonját előbb vízszintesen a felére zsugorítjuk (<M t="x\to2x" />), utána 3-mal jobbra toljuk, végül az <M t="x" />-tengelyre
              tükrözzük. (a) Írd fel a képletet és a tartományát. (b) Mi lesz a képlet, ha a tolás és a zsugorítás sorrendjét felcseréled?
            </>
          }
        >
          <p>
            (a) Zsugorítás: <M t="\sqrt{2x}" />. Tolás jobbra 3-mal: <M t="\sqrt{2(x-3)}" />. Tükrözés: <M t="y=-\sqrt{2(x-3)}" />. Tartomány: <M t="x\ge3" />, azaz <M t="[3;\infty)" />.
            Ellenőrzés: az (1; 1) pont képe <M t="x=3{,}5" />-nél van, és <M t="-\sqrt{2\cdot0{,}5}=-1" />.
          </p>
          <p>
            (b) Előbb tolás: <M t="\sqrt{x-3}" />, aztán <M t="x\to2x" />: <M t="\sqrt{2x-3}" />, végül tükrözés: <M t="y=-\sqrt{2x-3}" />. A tartomány <M t="[1{,}5;\infty)" />: a tolás mértéke
            a zsugorítás miatt 3 helyett <M t="3/2" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Az ellipszis mint nyújtott kör',
    body: (
      <>
        <Story>
          <p>
            Ha egy tányért ferdén nézel, a kör alakú pereme megnyúlt körnek látszik. Matematikailag ez az, amit a méretezésekkel meg tudunk fogalmazni: a kört az egyik irányban
            másként nyújtjuk, mint a másikban.
          </p>
        </Story>
        <p>
          Az origó körüli egységkör egyenlete <M t="x^2+y^2=1" />. Nyújtsuk vízszintesen <M t="a" />-szorosára és függőlegesen <M t="b" />-szeresére. A vízszintes nyújtás az
          egyenletben <M t="x" /> helyére <M t="x/a" />-t, a függőleges <M t="y" /> helyére <M t="y/b" />-t ír (ahogy a <M t="b" />-nél láttuk, a nyújtás „fordított”):
        </p>
        <M block t="\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1." />
        <p>
          Ez az origó középpontú <strong>ellipszis</strong>. A két tengelymetszéspár <M t="(\pm a;0)" /> és <M t="(0;\pm b)" />. Az <M t="a" />, <M t="b" /> közül a nagyobbik szakasz{' '}
          a <strong>nagytengely</strong> fele, a kisebbik a <strong>kistengely</strong> fele. Ha <M t="a=b" />, az ellipszis kör.
        </p>
        <p>
          Eltolva a <M t="(h;k)" /> pontba:
        </p>
        <M block t="\dfrac{(x-h)^2}{a^2}+\dfrac{(y-k)^2}{b^2}=1." />
        <p>
          Terület: az egységkör területe <M t="\pi" />, a vízszintes <M t="a" />-szoros és a függőleges <M t="b" />-szeres nyújtás együtt <M t="ab" />-szeresére növeli a területeket, ezért az
          ellipszis területe <M t="\pi\,a\,b" />. Az eltolás nem változtat rajta.
        </p>
        <EllipseWidget />
        <Warn>
          Az ellipszis egyenletéből nem „y = …” függvény lesz, mert egy <M t="x" /> értékhez két <M t="y" /> is tartozhat (felső és alsó ív). Az ellipszis tehát nem függvény grafikonja,
          csak két függvény grafikonjából rakható össze, ahogy a körnél is.
        </Warn>
        <h3>Feladat</h3>
        <Task
          n={8}
          q={
            <>
              (a) Írd fel annak az ellipszisnek az egyenletét, amelynek középpontja <M t="(-1;2)" />, vízszintes félátmérője 4, függőleges félátmérője 3. Mekkora a nagytengely hossza és a
              területe? (b) Milyen ellipszist ír le a <M t="9x^2+4y^2=36" /> egyenlet?
            </>
          }
        >
          <p>
            (a) <M t="\dfrac{(x+1)^2}{16}+\dfrac{(y-2)^2}{9}=1" />. Mivel <M t="a=4>b=3" />, a nagytengely vízszintes, hossza <M t="2a=8" />. A terület <M t="\pi\cdot4\cdot3=12\pi\approx37{,}7" />.
          </p>
          <p>
            (b) 36-tal osztva: <M t="\dfrac{x^2}{4}+\dfrac{y^2}{9}=1" />, tehát <M t="a=2" />, <M t="b=3" />. Origó középpontú ellipszis, a nagytengely függőleges, hossza 6, a kistengely 4, a területe{' '}
            <M t="6\pi\approx18{,}8" />.
          </p>
        </Task>

        <h3>Összefoglalás</h3>
        <table className="tbl">
          <thead>
            <tr>
              <th>Átalakítás</th>
              <th>Képlet</th>
              <th>Hatás</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>függőleges eltolás</td>
              <td>
                <M t="f(x)+k" />
              </td>
              <td>k-val fel</td>
            </tr>
            <tr>
              <td>vízszintes eltolás</td>
              <td>
                <M t="f(x-h)" />
              </td>
              <td>h-val jobbra</td>
            </tr>
            <tr>
              <td>függőleges méretezés</td>
              <td>
                <M t="a\,f(x)" />
              </td>
              <td>magasságok ×a, a&lt;0: tükrözés az x-tengelyre</td>
            </tr>
            <tr>
              <td>vízszintes méretezés</td>
              <td>
                <M t="f(bx)" />
              </td>
              <td>távolságok ×1/b, b&lt;0: tükrözés az y-tengelyre</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
];
