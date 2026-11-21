import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import { PowerWidget } from '../components/PowerWidget';
import { PolyWidget } from '../components/PolyWidget';
import { ExpLogWidget } from '../components/ExpLogWidget';
import { ClassifyWidget } from '../components/ClassifyWidget';
import { MonotoneWidget } from '../components/MonotoneWidget';
import { SymmetryWidget } from '../components/SymmetryWidget';
import { ModelFitWidget } from '../components/ModelFitWidget';
import type { Page } from './s1_1';

export const S1_4: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Lineáris és hatványfüggvények',
    body: (
      <>
        <Story>
          <p>
            Egy könyvtárban nem a méretük szerint, hanem témakörök szerint állnak a könyvek. A függvényeknél is hasznos a
            „polcrendszer”: ha tudod, melyik családba tartozik egy képlet, már sejted a grafikonja alakját, az értelmezési
            tartományát és azt is, hol veszélyes (hol nem osztható, hol nem gyökvonható).
          </p>
        </Story>
        <p>Ebben a szakaszban a legfontosabb függvénycsaládokat gyűjtjük össze. Az első kettő a lineáris és a hatványfüggvény.</p>

        <h3>Lineáris függvények</h3>
        <p>
          Az <M t="f(x)=mx+b" /> alakú függvény <strong>lineáris</strong> (<M t="m" /> és <M t="b" /> állandók). Grafikonja az 1.2-ben
          tanult egyenes: <M t="m" /> a meredekség, <M t="b" /> az <M t="y" />-tengelymetszet. A <M t="b=0" /> esetben a grafikon
          átmegy az origón. Ha <M t="m=0" />, <strong>konstans függvényt</strong> kapunk, grafikonja vízszintes egyenes.
        </p>

        <h3>Hatványfüggvények</h3>
        <p>
          <strong>Hatványfüggvénynek</strong> nevezzük az <M t="f(x)=x^a" /> alakú függvényeket, ahol <M t="a" /> állandó kitevő. A
          kitevő fajtája szerint négy jellegzetes csoportot érdemes megkülönböztetni.
        </p>
        <ul>
          <li>
            <strong>Pozitív egész kitevő</strong> (<M t="x,\ x^2,\ x^3,\dots" />). Értelmezési tartomány: az összes valós szám. Minden
            grafikon átmegy a (0; 0) és (1; 1) ponton. Ahogy a kitevő nő, a (−1; 1) intervallumban laposabb, azon kívül
            meredekebb lesz.
          </li>
          <li>
            <strong>Negatív egész kitevő</strong> (<M t="x^{-1}=\tfrac1x" />, <M t="x^{-2}=\tfrac1{x^2}" />). A 0-nál nincs értelmezve. Az{' '}
            <M t="y=1/x" /> grafikonja az <M t="xy=1" /> hiperbola, szárai egyre jobban simulnak a tengelyekhez.
          </li>
          <li>
            <strong>Törtkitevő</strong>, például <M t="x^{1/2}=\sqrt x" /> és <M t="x^{1/3}=\sqrt[3]x" />. A négyzetgyök csak{' '}
            <M t="x\ge0" />-ra értelmezett, a köbgyök minden valós számra.
          </li>
          <li>
            <M t="x^{3/2}=(\sqrt x)^3" /> és <M t="x^{2/3}=(\sqrt[3]x)^2" />: előbbi csak a nemnegatív számokon, utóbbi az egész számegyenesen
            értelmes.
          </li>
        </ul>
        <PowerWidget />
        <Warn>
          Az <M t="x^{2/3}" /> függvényt a <M t="(\sqrt[3]x)^2" /> alakban kell kiértékelni, ekkor negatív <M t="x" />-re is jó eredményt
          kapunk: <M t="(-8)^{2/3}=(-2)^2=4" />. A „kitevők egyszerűsítése” trükkös, a törtkitevő nevezője (itt 3) dönti el a
          gyökvonás fajtáját.
        </Warn>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Polinomok, racionális és más függvények',
    body: (
      <>
        <h3>Polinomfüggvények</h3>
        <Def title="Polinomfüggvény">
          Polinomfüggvény az olyan <M t="p" />, amelynek szabálya
          <M block t="p(x)=a_nx^n+a_{n-1}x^{n-1}+\dots+a_1x+a_0," />
          ahol <M t="n" /> nemnegatív egész, az <M t="a_i" /> számok az együtthatók. Ha <M t="a_n\ne0" /> és <M t="n>0" />, akkor <M t="n" /> a{' '}
          <strong>fokszám</strong>.
        </Def>
        <p>
          Az értelmezési tartomány mindig a teljes számegyenes. Az elsőfokú polinomok a lineáris függvények, a másodfokúak a
          parabolák (<M t="ax^2+bx+c" />), a harmadfokúak <M t="ax^3+bx^2+cx+d" /> alakúak. Páros fokszámnál a grafikon két széle
          azonos irányba tart, páratlannál ellentétesbe, ezért egy páratlan fokú polinomnak mindig van valós gyöke.
        </p>
        <PolyWidget />

        <h3>Racionális függvények</h3>
        <p>
          Két polinom hányadosa: <M t="f(x)=\dfrac{p(x)}{q(x)}" />. Értelmezési tartománya azon <M t="x" /> számok halmaza, amelyekre{' '}
          <M t="q(x)\ne0" />. Például <M t="\dfrac{3x-1}{2x+8}" /> tartománya <M t="\{x:x\ne-4\}" />, mert <M t="2x+8=0" /> az{' '}
          <M t="x=-4" />-nél adódik.
        </p>

        <h3>Algebrai és transzcendens függvények</h3>
        <p>
          <strong>Algebrai</strong> az a függvény, amely polinomokból az alapműveletekkel (összeadás, kivonás, szorzás, osztás) és
          gyökvonással előállítható. Ilyen minden racionális függvény, és ilyen az <M t="\sqrt{1+x^2}" /> is. Ami nem algebrai, az{' '}
          <strong>transzcendens</strong>. Ide sorolhatók a szögfüggvények, az exponenciális függvények és a logaritmusok (ezeket
          részletesen később, az 1.6-ban és a 7. fejezetben vesszük).
        </p>
        <ul>
          <li>
            <strong>Exponenciális függvény</strong>: <M t="f(x)=a^x" />, <M t="a>0" />, <M t="a\ne1" />. Tartománya <M t="(-\infty;\infty)" />, értékkészlete <M t="(0;\infty)" />.
          </li>
          <li>
            <strong>Logaritmusfüggvény</strong>: <M t="f(x)=\log_ax" />, ugyanezekkel a kikötésekkel az alapra, az exponenciális függvény inverze.
            Tartománya <M t="(0;\infty)" />, értékkészlete <M t="(-\infty;\infty)" />.
          </li>
        </ul>
        <ExpLogWidget />
        <h3>Gyakorolj: melyik család?</h3>
        <p>
          Egy képlet több szempontból is besorolható (az <M t="x^2" /> hatványfüggvény és másodfokú polinom is). A feladatban mindig a
          legjellemzőbb, legpontosabb osztályt kell választani.
        </p>
        <ClassifyWidget />
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Növekvő és csökkenő függvények',
    body: (
      <>
        <p>
          Ha a grafikonon jobbra haladva a pontok egyre feljebb kerülnek, a függvény <strong>növekvő</strong>, ha egyre lejjebb, akkor{' '}
          <strong>csökkenő</strong>. Pontosabban, egy <M t="I" /> intervallumon:
        </p>
        <Def title="Monotonitás (szigorú értelemben)">
          <ul>
            <li>
              <M t="f" /> <em>növekszik</em> <M t="I" />-n, ha <M t="x_1<x_2" /> esetén <M t="f(x_1)<f(x_2)" /> (minden <M t="x_1,x_2\in I" />).
            </li>
            <li>
              <M t="f" /> <em>csökken</em> <M t="I" />-n, ha <M t="x_1<x_2" /> esetén <M t="f(x_1)>f(x_2)" />.
            </li>
          </ul>
        </Def>
        <p>
          Egy függvény különböző intervallumokon különbözően viselkedhet. Az <M t="x^2" /> a <M t="(-\infty;0]" /> intervallumon csökken
          (minél közelebb a 0-hoz, annál kisebb), a <M t="[0;\infty)" /> intervallumon növekszik. Az <M t="x^3" /> mindenhol növekszik.
        </p>
        <MonotoneWidget />
        <Warn>
          Az <M t="1/x" /> a <M t="(-\infty;0)" /> intervallumon is és a <M t="(0;\infty)" /> intervallumon is csökken, mégsem csökkenő a
          teljes értelmezési tartományán: <M t="-1<1" />, de <M t="f(-1)=-1<1=f(1)" />. A monotonitást mindig <em>intervallumra</em> kell
          kimondani, és az intervallumnak a tartományon belül kell lennie.
        </Warn>
        <p className="hint">
          A pontos kereső módszert, amely megmondja, hol milyen az irány, a 4.3. alfejezetben kapjuk meg, a derivált segítségével. Egyelőre
          a grafikon és a definíció az eszközünk.
        </p>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Páros és páratlan függvények',
    body: (
      <>
        <Def title="Páros és páratlan függvény">
          Legyen <M t="D(f)" /> olyan, hogy ha <M t="x" /> eleme, akkor <M t="-x" /> is. Az <M t="f" /> függvény
          <ul>
            <li>
              <strong>páros</strong>, ha <M t="f(-x)=f(x)" /> minden <M t="x\in D(f)" />-re;
            </li>
            <li>
              <strong>páratlan</strong>, ha <M t="f(-x)=-f(x)" /> minden <M t="x\in D(f)" />-re.
            </li>
          </ul>
        </Def>
        <p>
          A nevek a hatványokból jönnek: páros kitevőre <M t="(-x)^2=x^2" />, páratlan kitevőre <M t="(-x)^3=-x^3" />.
        </p>
        <ul>
          <li>
            A páros függvény grafikonja <strong>tükrös az y-tengelyre</strong>: az <M t="(x;y)" /> pontja mellett a <M t="(-x;y)" /> is a
            grafikon pontja.
          </li>
          <li>
            A páratlan függvény grafikonja <strong>középpontosan szimmetrikus az origóra</strong>: az <M t="(x;y)" /> mellett a{' '}
            <M t="(-x;-y)" /> is pont, vagyis ha a grafikont az origó körül félfordulattal (180°) elforgatjuk, önmagába megy át.
          </li>
        </ul>
        <Warn>
          A definícióban a tartomány szimmetriája is benne van: <M t="x" />-nek és <M t="-x" />-nek is a tartományban kell lennie. Az{' '}
          <M t="\sqrt x" /> ezért se nem páros, se nem páratlan, hiszen a <M t="-1" />-nél nincs értelmezve.
        </Warn>
        <h3>Példák</h3>
        <ul>
          <li>
            <M t="f(x)=x^4-3x^2+1" /> páros: csak páros kitevők szerepelnek, <M t="f(-x)=f(x)" />.
          </li>
          <li>
            <M t="f(x)=x^3-x" /> páratlan: <M t="f(-x)=-x^3+x=-(x^3-x)" />.
          </li>
          <li>
            <M t="f(x)=x+1" /> egyik sem: <M t="f(-x)=-x+1" />, ami nem egyenlő <M t="f(x)=x+1" />-gyel (ha <M t="x\ne0" />), de <M t="-f(x)=-x-1" />-gyel
            sem.
          </li>
          <li>
            <M t="f(x)=x^2+x" /> sem páros, sem páratlan: <M t="f(-x)=x^2-x" />, ami sem <M t="f(x)" />, sem <M t="-f(x)" />. Egy páros és egy páratlan tag összege általában egyik
            sem.
          </li>
        </ul>
        <SymmetryWidget />
        <p>
          Az egyetlen függvény, amely páros és páratlan is egyszerre, az azonosan nulla függvény: <M t="f(-x)=f(x)" /> és <M t="f(-x)=-f(x)" />{' '}
          csak úgy teljesülhet, ha <M t="f(x)=0" />.
        </p>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Matematikai modellek és arányosság',
    body: (
      <>
        <p>
          A <strong>matematikai modell</strong> a valóság egyszerűsítése: megfigyelésekből függvényt vagy egyenletet készítünk, amely a
          jelenséget közelítőleg leírja. A modell sosem tökéletes, de ha jól választottuk, jósolni is lehet vele. A folyamat így
          zajlik:
        </p>
        <ol>
          <li>Mérünk, adatot gyűjtünk.</li>
          <li>Hipotézist állítunk, azaz megsejtünk egy összefüggést.</li>
          <li>Összevetjük az adatokkal: ha nem illik, módosítjuk, ha igen, megjósolunk vele még nem mért értékeket.</li>
          <li>A jóslatokat új mérésekkel ellenőrizzük.</li>
        </ol>

        <h3>Egyenes arányosság</h3>
        <Def title="Egyenes arányosság">
          <M t="y" /> egyenesen arányos <M t="x" />-szel, ha <M t="y=kx" /> valamilyen <M t="k\ne0" /> állandóval.
        </Def>
        <p>
          Az összetartozó <M t="(x;y)" /> értékpárok ilyenkor egy origón átmenő, <M t="k" /> meredekségű egyenesre esnek. Ezért az első
          próba mindig az, hogy a mért pontok ilyen egyenesre esnek-e: az <M t="y/x" /> hányados minden mérésnél (közelítőleg) ugyanaz
          legyen.
        </p>

        <h3>Hatvány-arányosság: egy trükk</h3>
        <p>
          Gyakran nem <M t="y" /> és <M t="x" />, hanem <M t="y" /> és <M t="x^p" /> arányos: <M t="y=kx^p" />. Ezt úgy ellenőrizzük, hogy a
          vízszintes tengelyre nem az <M t="x" />-et, hanem az <M t="x^p" />-t rajzoljuk. Ha a pontok így egyenesre esnek, a kitevőt
          eltaláltuk, a meredekség pedig <M t="k" />. Két saját példa:
        </p>
        <ul>
          <li>
            <strong>Szabadesés</strong>: a megtett út az idő négyzetével arányos, <M t="s\approx4{,}9\,t^2" /> (itt <M t="p=2" />).
          </li>
          <li>
            <strong>Fonalinga</strong>: a lengésidő a hossz négyzetgyökével arányos, <M t="T\approx2\sqrt{L}" /> (itt <M t="p=\tfrac12" />).
          </li>
        </ul>
        <ModelFitWidget />
        <Warn>
          Az, hogy a pontok jól illeszkednek egy modellre, <em>nem bizonyítja</em> a törvényt. Néhány mérésből általános szabály nem
          igazolható, legfeljebb hihetővé tehető, és a modell csak az adatok tartományában megbízható: az ingánál nagy kitérésnél már
          nem érvényes a képlet, a szabadesésnél pedig nagy sebességnél a légellenállás is számít.
        </Warn>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Gyakorló feladatok',
    body: (
      <>
        <p>Próbáld meg előbb önállóan megoldani, a megoldást csak utána nyisd ki.</p>

        <Task n={1} q={<>Milyen típusúak? (a) <M t="f(x)=5-\tfrac x2" />, (b) <M t="g(x)=x^{-3}" />, (c) <M t="h(x)=4^x" />, (d) <M t="k(x)=x^4+x" />.</>}>
          <p>
            (a) lineáris (<M t="m=-\tfrac12" />, <M t="b=5" />). (b) hatványfüggvény negatív egész kitevővel, egyben racionális is (<M t="1/x^3" />). (c)
            exponenciális (az <M t="x" /> a kitevőben áll). (d) negyedfokú polinomfüggvény.
          </p>
        </Task>

        <Task n={2} q={<>Add meg az <M t="f(x)=\dfrac{3x-1}{x^2-4x+3}" /> függvény típusát és értelmezési tartományát.</>}>
          <p>
            Két polinom hányadosa: racionális függvény. A nevező <M t="x^2-4x+3=(x-1)(x-3)" />, zérushelyei 1 és 3. Tehát{' '}
            <M t="D=\mathbb{R}\setminus\{1;\,3\}" />.
          </p>
        </Task>

        <Task n={3} q={<>Döntsd el, hogy páros, páratlan vagy egyik sem: (a) <M t="x^6-x^2" />, (b) <M t="x^5+3x" />, (c) <M t="x^2+2x" />, (d) <M t="\sqrt{x^2+4}" />.</>}>
          <p>
            (a) páros: <M t="(-x)^6-(-x)^2=x^6-x^2" />. (b) páratlan: <M t="(-x)^5+3(-x)=-(x^5+3x)" />. (c) egyik sem: <M t="f(-x)=x^2-2x" />, ami nem
            egyenlő <M t="f(x)" />-szel és <M t="-f(x)=-x^2-2x" />-szel sem. (d) páros: <M t="\sqrt{(-x)^2+4}=\sqrt{x^2+4}" />.
          </p>
        </Task>

        <Task n={4} q={<>Igazold, hogy két páratlan függvény szorzata páros.</>}>
          <p>
            Legyen <M t="f" /> és <M t="g" /> páratlan, <M t="h=fg" />. Ekkor <M t="h(-x)=f(-x)g(-x)=(-f(x))(-g(x))=f(x)g(x)=h(x)" />, tehát <M t="h" /> páros. (A közös
            tartomány szimmetrikus, mert mindkét tartomány az.)
          </p>
        </Task>

        <Task n={5} q={<>Hol növekszik és hol csökken (a) <M t="f(x)=(x-2)^2" />, (b) <M t="g(x)=4-x^3" />?</>}>
          <p>
            (a) A <M t="(x-2)^2" /> az <M t="x^2" /> jobbra tolt képe: a <M t="(-\infty;2]" /> intervallumon csökken, a <M t="[2;\infty)" /> intervallumon növekszik. (b) Az <M t="x^3" />{' '}
            növekvő, ezért a <M t="-x^3" /> csökkenő, és az eltolás sem változtat ezen: <M t="g" /> az egész számegyenesen csökken.
          </p>
        </Task>

        <Task n={6} q={<>Mért adatok: <M t="x=1;2;3;4" /> esetén <M t="y=2{,}1;\ 3{,}9;\ 6{,}2;\ 7{,}8" />. Igazolja-e az adatsor az egyenes arányosságot? Mekkora a <M t="k" />?</>}>
          <p>
            Az <M t="y/x" /> hányadosok: <M t="2{,}1;\ 1{,}95;\ 2{,}07;\ 1{,}95" />, mind közel 2. Az origón átmenő legjobb illesztés meredeksége a
            legkisebb négyzetek szerint <M t="k=\dfrac{\sum xy}{\sum x^2}=\dfrac{59{,}7}{30}\approx1{,}99" />. A modell: <M t="y\approx2x" />.
          </p>
        </Task>

        <Task n={7} q={<>Az <M t="x=1;2;3;4" /> értékekhez <M t="y=3;\ 12;\ 27;\ 48" /> tartozik. Arányos-e <M t="y" /> az <M t="x" />-szel, vagy inkább az <M t="x^2" />-tel?</>}>
          <p>
            Az <M t="y/x" /> hányados <M t="3;\ 6;\ 9;\ 12" />, nem állandó: nincs egyenes arányosság. Az <M t="y/x^2" /> viszont mindenhol 3 (<M t="3/1,\ 12/4,\ 27/9,\ 48/16" />), tehát{' '}
            <M t="y=3x^2" />.
          </p>
        </Task>

        <Task n={8} q={<>Egy ingánál <M t="L=1{,}0" /> m hosszúságnál a lengésidő 2,01 s. Tegyük fel, hogy <M t="T=k\sqrt L" />. Mekkora a <M t="k" />, és mennyi a lengésidő 3 m hosszúságnál?</>}>
          <p>
            <M t="k=T/\sqrt L=2{,}01/1=2{,}01" />. Így <M t="T(3)=2{,}01\sqrt3\approx3{,}48" /> s. A jóslat csak kis kitérésekre érvényes, és az adat egyetlen
            mérésre épül: több mérés megbízhatóbb <M t="k" />-t adna.
          </p>
        </Task>
      </>
    ),
  },
];
