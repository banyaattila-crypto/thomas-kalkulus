import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import { LawsWidget, RationalWidget, StepsWidget, SandwichWidget, FailWidget, StrategyWidget } from '../components/Widgets22';
import type { Page } from './s1_1';

export const S2_2: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'A határérték és az alapműveletek',
    body: (
      <>
        <Story>
          <p>
            A 2.1-ben minden határértéket táblázattal sejtettünk meg. Ez lassú, és kis számolási hibával félre is vihet. Szerencsére a határérték „jól viselkedik” a műveletekkel, ezért bonyolult kifejezések határértékét egyszerűbb részekre bonthatjuk.
          </p>
        </Story>
        <Def title="Határérték és műveletek (1. tétel)">
          <p>
            Legyen <M t="\lim_{x\to c}f(x)=L" /> és <M t="\lim_{x\to c}g(x)=M" /> (valós számok), továbbá <M t="k" /> konstans. Ekkor
          </p>
          <ul>
            <li>
              összeg, különbség: <M t="\lim(f\pm g)=L\pm M" />,
            </li>
            <li>
              szorzat: <M t="\lim(f\cdot g)=L\cdot M" />, konstansszoros: <M t="\lim(kf)=kL" />,
            </li>
            <li>
              hányados: <M t="\lim\dfrac fg=\dfrac LM" />, ha <M t="M\neq0" />,
            </li>
            <li>
              hatvány: <M t="\lim f^{r/s}=L^{r/s}" />, ha <M t="L^{r/s}" /> valós szám (páros <M t="s" />-nél <M t="L>0" /> kell).
            </li>
          </ul>
        </Def>
        <p>
          Szemléletesen ez magától értetődő: ha <M t="f(x)" /> közel van <M t="L" />-hez, és <M t="g(x)" /> közel van <M t="M" />-hez, akkor az összegük közel van <M t="L+M" />-hez. A szabályok szigorú bizonyítását a pontos definíció (2.3) ismeretében lehet megadni.
        </p>
        <LawsWidget />
        <p>
          Mivel <M t="\lim_{x\to c}x=c" /> és <M t="\lim_{x\to c}k=k" />, a szabályokból következik: polinom határértéke <M t="x\to c" /> esetén <M t="P(c)" />, racionális törtfüggvényé pedig <M t="P(c)/Q(c)" />, ha <M t="Q(c)\neq0" />. Ez a 2.1-ben csak tapasztalat volt, most tétel.
        </p>
        <h3>Feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Számítsd ki a határértékeket a szabályokkal: (a) <M t="\lim_{x\to3}(2x^2-3x+1)" />, (b) <M t="\lim_{x\to-1}\dfrac{x^2+3}{2x-1}" />.
            </>
          }
        >
          <p>
            (a) Összeg, konstansszoros és hatvány szabályával: <M t="2\cdot3^2-3\cdot3+1=18-9+1=10" />.
          </p>
          <p>
            (b) A nevező határértéke <M t="2\cdot(-1)-1=-3\ne0" />, így a hányadosszabály használható: <M t="\dfrac{(-1)^2+3}{-3}=-\dfrac43" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Tudjuk, hogy <M t="\lim_{x\to a}f(x)=4" /> és <M t="\lim_{x\to a}g(x)=-2" />. Mennyi <M t="\lim_{x\to a}\dfrac{3f(x)+(g(x))^2}{f(x)g(x)+1}" />? Melyik szabályt hol használtad?
            </>
          }
        >
          <p>
            Számláló: konstansszoros és összeg/hatvány szabálya: <M t="3\cdot4+(-2)^2=16" />. Nevező: szorzat és összeg szabálya: <M t="4\cdot(-2)+1=-7" />.
          </p>
          <p>
            A nevező határértéke nem 0, ezért a hányadosszabály alkalmazható: a határérték <M t="\dfrac{16}{-7}=-\dfrac{16}{7}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Polinomok és racionális törtfüggvények',
    body: (
      <>
        <p>
          Polinomnál (<M t="P(x)=a_nx^n+\dots+a_0" />) a határérték egyszerűen a helyettesítési érték: <M t="\lim_{x\to c}P(x)=P(c)" />. Racionális törtfüggvénynél (<M t="P/Q" />) ugyanez igaz, <em>ha</em> <M t="Q(c)\neq0" />.
        </p>
        <p>
          Ha <M t="Q(c)=0" />, a hányadosszabály nem használható, és két lényegesen különböző eset van, attól függően, mi a számláló:
        </p>
        <ul>
          <li>
            <M t="P(c)=0" /> is: <strong>0/0 alak</strong>. Mindkét polinomból kiemelhető <M t="(x-c)" />, egyszerűsítés után új törtet kapunk, amelybe újra megpróbálhatunk behelyettesíteni.
          </li>
          <li>
            <M t="P(c)\neq0" />: az értékek <M t="c" /> közelében minden határon túl nőnek, nincs (véges) határérték.
          </li>
        </ul>
        <RationalWidget />
        <Warn>
          A „0/0” nem azt jelenti, hogy a határérték 0, és azt sem, hogy nem létezik. Ez azt jelzi, hogy a behelyettesítés nem döntött el semmit, és további átalakítás kell.
        </Warn>
        <h3>Feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to2}\dfrac{x^2-4}{x^2-x-2}" />.
            </>
          }
        >
          <p>
            Behelyettesítve 0/0. Szorzattá bontás: <M t="\dfrac{(x-2)(x+2)}{(x-2)(x+1)}=\dfrac{x+2}{x+1}" />, ha <M t="x\ne2" />.
          </p>
          <p>
            Az egyszerűsített alakba behelyettesítve: <M t="\dfrac{2+2}{2+1}=\dfrac43" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Legyen <M t="R(x)=\dfrac{x^2+x-6}{x^2-4}" />. Mi a helyzet a határértékkel <M t="c=1" />, <M t="c=2" /> és <M t="c=-2" /> esetén?
            </>
          }
        >
          <p>
            <M t="c=1" />: a nevező <M t="1-4=-3\ne0" />, a határérték <M t="\dfrac{1+1-6}{-3}=\dfrac43" />.
          </p>
          <p>
            <M t="c=2" />: 0/0 alak, <M t="R(x)=\dfrac{(x-2)(x+3)}{(x-2)(x+2)}=\dfrac{x+3}{x+2}" />, így a határérték <M t="\dfrac54" />.
          </p>
          <p>
            <M t="c=-2" />: a nevező 0, a számláló <M t="4-2-6=-4\ne0" />, ezért nincs véges határérték.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A nullává váló nevező kiküszöbölése',
    body: (
      <>
        <p>
          0/0 alaknál az a cél, hogy a törtet olyan alakra hozzuk, amely <M t="x\ne c" /> esetén ugyanazt az értéket adja, de már behelyettesíthető. Három fogás elég a legtöbb feladathoz:
        </p>
        <ol>
          <li>
            <strong>Szorzattá bontás és egyszerűsítés</strong>: polinomoknál; a közös tényező <M t="(x-c)" />.
          </li>
          <li>
            <strong>Konjugálttal bővítés</strong>: négyzetgyöknél; <M t="(\sqrt a-b)(\sqrt a+b)=a-b^2" />, így a gyökjel eltűnik.
          </li>
          <li>
            <strong>Közös nevezőre hozás</strong>: ha a számlálóban vagy a nevezőben tört van.
          </li>
        </ol>
        <StepsWidget />
        <p>
          Az egyszerűsítés csak <M t="x\neq c" /> esetén igaz, de a határérték éppen az <M t="x\neq c" /> értékekről szól, ezért ez nem okoz gondot. Az eredeti és az átalakított függvény grafikonja csak egyetlen pontban tér el: az eredetin ott „lyuk” van.
        </p>
        <Steps
          source="Analízis-labor"
          title="Gyökös 0/0 alak konjugálttal"
          problem={
            <>
              Számítsuk ki a <M t="\lim_{x\to 4}\dfrac{\sqrt{x+5}-3}{x-4}" /> határértéket!
            </>
          }
          steps={[
            {
              title: 'Bővítés a számláló konjugáltjával',
              body: (
                <>
                  <p>Behelyettesítve <M t="0/0" /> alakot kapunk. Szorozzuk meg a számlálót és a nevezőt <M t="(\sqrt{x+5}+3)" />-mal:</p>
                  <M block t="\frac{(\sqrt{x+5}-3)(\sqrt{x+5}+3)}{(x-4)(\sqrt{x+5}+3)} = \frac{(x+5)-9}{(x-4)(\sqrt{x+5}+3)}." />
                </>
              ),
            },
            {
              title: 'Egyszerűsítés (x ≠ 4)',
              body: (
                <p>
                  A számláló <M t="x - 4" />, amellyel <M t="x \neq 4" /> mellett egyszerűsíthetünk: <M t="\dfrac{1}{\sqrt{x+5}+3}" />.
                </p>
              ),
            },
            {
              title: 'Közvetlen behelyettesítés',
              body: (
                <p>
                  Most már a nevező nem nulla: <M t="\dfrac{1}{\sqrt{4+5}+3} = \dfrac{1}{3+3} = \dfrac{1}{6}" />.
                </p>
              ),
            },
          ]}
        />
        <h3>Feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to2}\dfrac{\sqrt{x+7}-3}{x-2}" />.
            </>
          }
        >
          <p>
            Konjugálttal bővítve: <M t="\dfrac{(x+7)-9}{(x-2)(\sqrt{x+7}+3)}=\dfrac{1}{\sqrt{x+7}+3}" />, ha <M t="x\ne2" />.
          </p>
          <p>
            Behelyettesítve: <M t="\dfrac{1}{3+3}=\dfrac16" />. (Ellenőrzés: <M t="x=2{,}001" />-nél 0,166662.)
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to0}\dfrac{\frac{1}{2+x}-\frac12}{x}" />.
            </>
          }
        >
          <p>
            Közös nevező: <M t="\dfrac1{2+x}-\dfrac12=\dfrac{2-(2+x)}{2(2+x)}=\dfrac{-x}{2(2+x)}" />.
          </p>
          <p>
            Így a hányados <M t="\dfrac{-x}{2(2+x)x}=-\dfrac{1}{2(2+x)}" />, ha <M t="x\ne0" />, és a határérték <M t="-\dfrac14" />.
          </p>
        </Task>
        <Task
          n={7}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to-1}\dfrac{x^2+3x+2}{x^2-x-2}" />.
            </>
          }
        >
          <p>
            <M t="x=-1" />-nél 0/0. Szorzattá bontva: <M t="\dfrac{(x+1)(x+2)}{(x+1)(x-2)}=\dfrac{x+2}{x-2}" />, ha <M t="x\ne-1" />.
          </p>
          <p>
            A határérték <M t="\dfrac{-1+2}{-1-2}=-\dfrac13" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'A szendvicstétel',
    body: (
      <>
        <p>
          Néha olyan függvénnyel van dolgunk, amelynek képlete bonyolult, és az algebrai átalakítás nem segít. Ilyenkor egy másik ötlet jó: ha a függvény két másik közé van szorítva, és azok ugyanahhoz a számhoz tartanak, a közrefogott függvénynek sincs más választása.
        </p>
        <Def title="Szendvicstétel (4. tétel)">
          <p>
            Tegyük fel, hogy <M t="c" /> egy környezetében (esetleg <M t="c" /> kivételével) <M t="g(x)\le f(x)\le h(x)" />, és <M t="\lim_{x\to c}g(x)=\lim_{x\to c}h(x)=L" />. Ekkor <M t="\lim_{x\to c}f(x)=L" />.
          </p>
        </Def>
        <SandwichWidget />
        <p>
          A tétel akkor hasznos, ha a függvény egy <em>korlátos</em> (például szinuszos vagy koszinuszos) tényezőt tartalmaz, amely ingadozik, de egy nullához tartó tényezővel szorzódik. Mivel <M t="|\sin t|\le1" />, a szorzat abszolút értékét a másik tényező abszolút értéke korlátozza.
        </p>
        <p>
          Egy hasznos következmény: ha <M t="\lim_{x\to c}|f(x)|=0" />, akkor <M t="\lim_{x\to c}f(x)=0" /> is fennáll, mert <M t="-|f|\le f\le|f|" />. A szinuszfüggvény belső tulajdonságaiból (<M t="|\sin\theta|\le|\theta|" />) kapjuk: <M t="\lim_{\theta\to0}\sin\theta=0" />.
        </p>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Mennyi <M t="\lim_{x\to 0} x^2\cos\!\left(\dfrac{1}{x}\right)" /> értéke?
            </>
          }
          options={[
            { label: <M t="0" />, ok: true },
            { label: <M t="1" /> },
            { label: 'Nem létezik' },
            { label: <M t="\infty" /> },
          ]}
          explain={
            <>
              Mivel <M t="-1 \le \cos(1/x) \le 1" />, ezért <M t="-x^2 \le x^2\cos(1/x) \le x^2" />. Mindkét korlát <M t="0" />-hoz tart, így a szendvicstétel szerint a határérték <M t="0" />.
            </>
          }
        />
        <h3>Feladatok</h3>
        <Task
          n={8}
          q={
            <>
              Határozd meg: <M t="\lim_{x\to0}x\sin\dfrac1{x^2}" />.
            </>
          }
        >
          <p>
            Minden <M t="x\ne0" />-ra <M t="\left|\sin\tfrac1{x^2}\right|\le1" />, így <M t="-|x|\le x\sin\tfrac1{x^2}\le|x|" />.
          </p>
          <p>
            Mindkét korlát 0-hoz tart, ezért a szendvicstétel szerint a határérték 0, hiába oszcillál a szinusz.
          </p>
        </Task>
        <Task
          n={9}
          q={
            <>
              Az <M t="u" /> függvényről annyit tudunk, hogy <M t="x\ne0" /> esetén <M t="3-x^2\le u(x)\le3+x^4" />. Mit mondhatunk <M t="\lim_{x\to0}u(x)" />-ról?
            </>
          }
        >
          <p>
            <M t="\lim_{x\to0}(3-x^2)=3" /> és <M t="\lim_{x\to0}(3+x^4)=3" />, így a szendvicstétel szerint <M t="\lim_{x\to0}u(x)=3" />, bármi is <M t="u" /> képlete.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Egyenlőtlenségek és a szabályok határai',
    body: (
      <>
        <p>
          A határértékek egyenlőtlenségekkel is összefüggnek.
        </p>
        <Def title="Egyenlőtlenség megmarad (5. tétel)">
          <p>
            Ha <M t="c" /> egy környezetében (esetleg <M t="c" /> kivételével) <M t="f(x)\le g(x)" />, és mindkét határérték létezik, akkor <M t="\lim_{x\to c}f(x)\le\lim_{x\to c}g(x)" />.
          </p>
        </Def>
        <p>
          A tételben a <M t="\le" /> nem erősíthető <M t="<" />-re. Az <M t="x^2>0" /> egyenlőtlenség minden <M t="x\neq0" />-ra teljesül, a határértékek mégis egyenlők. Az 1. tétel szabályai is csak akkor használhatók, ha a feltételek teljesülnek: ez elégséges feltétel, de nem szükséges.
        </p>
        <FailWidget />
        <h3>Feladatok</h3>
        <Task
          n={10}
          q={
            <>
              Legyen <M t="f(x)=\dfrac1x" /> és <M t="g(x)=-\dfrac1x" />. Van-e határértékük 0-ban? Mi a helyzet az összegükkel? Mondhatod-e, hogy „az összeg határértéke a határértékek összege”?
            </>
          }
        >
          <p>
            Egyiknek sincs határértéke 0-ban (az értékek minden határon túl nőnek, illetve csökkennek). Az összegük viszont <M t="x\ne0" /> esetén azonosan 0, így <M t="\lim_{x\to0}(f+g)=0" />.
          </p>
          <p>
            Az összegszabály tehát nem alkalmazható, mert nincs <M t="L" /> és <M t="M" />. A szabály feltétele elégséges, az eredmény mégis létezhet.
          </p>
        </Task>
        <Task
          n={11}
          q={
            <>
              Tudjuk, hogy minden <M t="x\ne2" />-re <M t="f(x)<g(x)" />, <M t="\lim_{x\to2}f(x)=3" /> és <M t="\lim_{x\to2}g(x)=L" />. Mit állíthatunk <M t="L" />-ről? Lehet-e <M t="L=3" />?
            </>
          }
        >
          <p>
            Az 5. tétel szerint <M t="3\le L" />. A szigorú egyenlőtlenségből nem következik <M t="3<L" />: az <M t="f(x)=3+(x-2)^2" />, <M t="g(x)=3+2(x-2)^2" /> példánál <M t="x\to2" />-re mindkettő határértéke 3, miközben <M t="f<g" /> minden <M t="x\neq2" />-re.
          </p>
          <p>Tehát igen, <M t="L=3" /> is lehet.</p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Melyik módszert válasszam?',
    body: (
      <>
        <p>
          A fejezet eszközei egy egyszerű döntési sorrendet adnak. Mindig behelyettesítéssel kezdünk, és a kapott alak dönti el, mit teszünk tovább.
        </p>
        <StrategyWidget />
        <p>
          Gyakorlásnál érdemes minden eredményt egyszer táblázattal vagy grafikonnal is ellenőrizni, ahogy a 2.1-ben tanultuk, de a kiszámolt érték a hiteles: az ellenőrzés a számítást támogatja, nem helyettesíti.
        </p>
        <h3>Vegyes feladatok</h3>
        <Task
          n={12}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to-3}\dfrac{x^2+5x+6}{x+3}" />.
            </>
          }
        >
          <p>
            0/0 alak. <M t="x^2+5x+6=(x+2)(x+3)" />, így a tört <M t="x+2" /> (<M t="x\ne-3" />), és a határérték <M t="-3+2=-1" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to4}\dfrac{\sqrt x-2}{x-4}" />.
            </>
          }
        >
          <p>
            Konjugálttal bővítve: <M t="\dfrac{x-4}{(x-4)(\sqrt x+2)}=\dfrac1{\sqrt x+2}" />, ha <M t="x\ne4" />. Behelyettesítve: <M t="\dfrac14" />.
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Vizsgáld az <M t="f(x)=\dfrac{x^2-2x-3}{x^2-1}" /> függvényt <M t="x\to-1" /> és <M t="x\to1" /> esetén!
            </>
          }
        >
          <p>
            <M t="x^2-2x-3=(x-3)(x+1)" /> és <M t="x^2-1=(x-1)(x+1)" />.
          </p>
          <p>
            <M t="x\to-1" />: 0/0 alak, egyszerűsítés után <M t="\dfrac{x-3}{x-1}" /> (<M t="x\ne-1" />), a határérték <M t="\dfrac{-4}{-2}=2" />.
          </p>
          <p>
            <M t="x\to1" />: a nevező 0, a számláló <M t="1-2-3=-4\ne0" />, ezért nincs véges határérték.
          </p>
        </Task>

        <h3>Mi következik?</h3>
        <p>
          Eddig a „tetszőlegesen közel” kifejezést csak szemléletesen használtuk. A 2.3-ban pontos definíciót adunk rá, és ezzel az 1. tétel szabályait be is tudjuk bizonyítani.
        </p>
      </>
    ),
  },
];
