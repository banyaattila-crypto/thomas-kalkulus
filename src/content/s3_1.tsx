import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  DefDerivStepsWidget,
  GraphOfDerivWidget,
  HierarchyWidget,
  NonDiffWidget,
} from '../components/Widgets31';
import type { Page } from './s1_1';

export const S3_1: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'A számból függvény lesz: a deriváltfüggvény',
    body: (
      <>
        <Story>
          <p>
            A 2.7-es szakaszban kiszámoltuk, mennyi egy autó vagy egy labda sebessége egyetlen kiválasztott pillanatban — például <M t="t=2" /> másodperckor. Egyetlen <em>számot</em> kaptunk. Az autó sebességmérője azonban nem csak egyetlen pillanatban működik: <strong>minden</strong> <M t="t" /> időponthoz hozzárendeli az akkori pillanatnyi sebességet. Ez a hozzárendelés már egy új függvény — ezt nevezzük <em>deriváltfüggvénynek</em>.
          </p>
        </Story>
        <p>
          Gondolj bele, mennyivel praktikusabb ez! Ha az <M t="f(x)=x^2" /> parabola meredekségét akarod tudni <M t="x=1" />, <M t="x=2" />, <M t="x=5" /> és <M t="x=-3" /> helyen, nem kell négyszer elölről végigszámolni a határértéket. Elég <strong>egyszer</strong> kiszámolni általános <M t="x" />-re: megkapod az <M t="f'(x)=2x" /> képletet, és utána bárhová behelyettesíthetsz (<M t="f'(1)=2" />, <M t="f'(5)=10" />).
        </p>
        <Def title="A deriváltfüggvény definíciója (két ekvivalens alak)">
          <p>
            Az <M t="f" /> függvény <M t="f'" /> <strong>deriváltfüggvényét</strong> minden olyan <M t="x" /> helyen értelmezzük, ahol az alábbi határérték létezik (és véges):
          </p>
          <M block t="f'(x) = \lim_{h\to 0}\frac{f(x+h)-f(x)}{h} = \lim_{z\to x}\frac{f(z)-f(x)}{z-x}." />
        </Def>
        <p>
          Miért pontosan ugyanaz a két alak? Egyszerűen átneveztük a második pontot: ha <M t="z = x + h" />, akkor <M t="h = z - x" />, és az, hogy <M t="h\to 0" />, pontosan azt jelenti, hogy <M t="z\to x" />. Néha az első (<M t="h\to 0" />), máskor — például gyököknél — a második (<M t="z\to x" />) vezet gyorsabban célhoz.
        </p>
        <h3>Jelölések szótára (Newton és Leibniz)</h3>
        <p>
          Mivel a kalkulust Newton és Leibniz egymástól függetlenül fedezte fel, többféle jelölés is elterjedt. Mindegyik <strong>ugyanazt</strong> jelenti (ha <M t="y=f(x)" />):
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>jelölés</th>
              <th>kiolvasása / jelentése</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><M t="f'(x)" /> vagy <M t="y'" /></td>
              <td>„f vessző x” (Lagrange-féle, rövid és áttekinthető)</td>
            </tr>
            <tr>
              <td><M t="\dfrac{dy}{dx}" /> vagy <M t="\dfrac{df}{dx}" /></td>
              <td>„y deriváltja x szerint” (Leibniz-féle: mutatja, mi szerint deriválunk)</td>
            </tr>
            <tr>
              <td><M t="\dfrac{d}{dx}f(x)" /> vagy <M t="D_x f(x)" /></td>
              <td>deriválás-operátor: „deriváld az <M t="f(x)" /> kifejezést <M t="x" /> szerint!”</td>
            </tr>
            <tr>
              <td><M t="\left.\dfrac{dy}{dx}\right|_{x=a}" /></td>
              <td>a derivált értéke az <M t="x=a" /> helyen (ugyanaz, mint <M t="f'(a)" />)</td>
            </tr>
          </tbody>
        </table>
        <Warn>
          <p>
            A <M t="\frac{dy}{dx}" /> jelölést egyelőre <strong>egyben</strong> tekintsd, nem valódi törtnek! Ne próbálj „<M t="d" />-vel egyszerűsíteni” benne — a <M t="dx" /> és <M t="dy" /> önálló jelentésével majd a 3.8-as szakaszban (differenciálok) találkozunk.
          </p>
        </Warn>
        <h3>Feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Számítsd ki a definíció alapján az <M t="f(x)=4-x^2" /> függvény <M t="f'(x)" /> deriváltfüggvényét, majd add meg <M t="f'(-3)" />, <M t="f'(0)" /> és <M t="f'(1)" /> értékét!
            </>
          }
        >
          <p>
            <M t="f'(x)=\lim_{h\to 0}\dfrac{4-(x+h)^2-(4-x^2)}{h}=\lim_{h\to 0}\dfrac{-2xh-h^2}{h}=\lim_{h\to 0}(-2x-h)=-2x" />.
          </p>
          <p>
            Behelyettesítve: <M t="f'(-3)=6" />, <M t="f'(0)=0" />, <M t="f'(1)=-2" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Határozd meg a definícióból az <M t="F(x)=(x-1)^2+1" /> függvény deriváltját, és számítsd ki <M t="F'(0)" /> és <M t="F'(2)" /> értékét!
            </>
          }
        >
          <p>
            Kifejtve <M t="F(x)=x^2-2x+2" />. A differenciahányados: <M t="\dfrac{(x+h)^2-2(x+h)+2-(x^2-2x+2)}{h}=\dfrac{2xh+h^2-2h}{h}=2x-2+h \to 2x-2" />.
          </p>
          <p>
            Így <M t="F'(0)=-2" /> és <M t="F'(2)=2" />.
          </p>
        </Task>
        <Task
          n={3}
          q={
            <>
              Igazold a definícióból, hogy bármely <M t="f(x)=mx+b" /> lineáris függvény deriváltja állandó: <M t="\dfrac{d}{dx}(mx+b)=m" />! Miért nyilvánvaló ez geometriailag?
            </>
          }
        >
          <p>
            <M t="\lim_{h\to 0}\dfrac{m(x+h)+b-(mx+b)}{h}=\lim_{h\to 0}\dfrac{mh}{h}=m" />.
          </p>
          <p>
            Geometriailag: egy egyenes meredeksége minden pontjában ugyanaz az <M t="m" /> szám.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Deriváltak kiszámítása a definíció alapján',
    body: (
      <>
        <p>
          A 3.2-es szakaszban gyors deriválási szabályokat fogunk tanulni, de mielőtt „robotpilótára” kapcsolnánk, érdemes pontosan látni, hogyan működik a definíció három alapvető függvénytípusnál: <strong>polinomnál</strong>, <strong>törtfüggvénynél</strong> és <strong>gyökfüggvénynél</strong>.
        </p>
        <p>
          Minden definíciós deriválásnak ugyanaz a logikája: kezdetben <M t="0/0" /> alakot kapsz, mert a nevező <M t="h" /> (vagy <M t="z-x" />). A feladatod mindig az, hogy <strong>algebrai átalakítással kiemeld és kiejtsd</strong> ezt a nullává váló tényezőt:
        </p>
        <ul>
          <li>
            <strong>Polinomnál:</strong> bontsd fel a zárójeleket — minden <M t="h" />-mentes tag kiesik, a maradékból kiemelhető <M t="h" />.
          </li>
          <li>
            <strong>Törtfüggvénynél:</strong> hozd közös nevezőre a számlálóban lévő két törtet!
          </li>
          <li>
            <strong>Gyökfüggvénynél:</strong> használd a <M t="z\to x" /> alakot a <M t="z-x=(\sqrt{z}-\sqrt{x})(\sqrt{z}+\sqrt{x})" /> bontással (vagy bővíts konjugálttal).
          </li>
        </ul>
        <Def title="Két alapképlet, amelyet érdemes megjegyezni">
          <M block t="\frac{d}{dx}\left(\frac{1}{x}\right) = -\frac{1}{x^2}\quad(x\ne 0), \qquad\qquad \frac{d}{dx}\left(\sqrt{x}\right) = \frac{1}{2\sqrt{x}}\quad(x>0)." />
        </Def>
        <p>
          Kattintsd végig az alábbi interaktív levezetés négy lépését mindhárom függvénynél, majd húzd az <M t="x" /> csúszkát, hogy lásd: a kész képlet valóban pontosan a pontbeli érintő meredekségét adja!
        </p>
        <DefDerivStepsWidget />
        <Steps
          source="Analízis-labor"
          title="Gyökfüggvény deriváltja és értelmezési tartománya"
          problem={
            <>
              Határozzuk meg az <M t="f(x) = \sqrt{x + 3}" /> függvény deriváltját a definícióból, és adjuk meg <M t="f'" /> értelmezési tartományát!
            </>
          }
          steps={[
            {
              title: 'Differenciahányados gyöktelenítése',
              body: (
                <M block t="\frac{\sqrt{x+h+3}-\sqrt{x+3}}{h} = \frac{(x+h+3)-(x+3)}{h\big(\sqrt{x+h+3}+\sqrt{x+3}\big)} = \frac{1}{\sqrt{x+h+3}+\sqrt{x+3}}." />
              ),
            },
            {
              title: 'Határérték h → 0 mellett',
              body: (
                <p>
                  <M t="f'(x) = \dfrac{1}{2\sqrt{x+3}}" />.
                </p>
              ),
            },
            {
              title: 'Értelmezési tartományok összehasonlítása',
              body: (
                <p>
                  Míg <M t="D_f = [-3;\,\infty)" />, a derivált csak <M t="D_{f'} = (-3;\,\infty)" />-en létezik (az <M t="x = -3" /> végpontban függőleges az érintő).
                </p>
              ),
            },
          ]}
        />
        <h3>Feladatok</h3>
        <Task
          n={4}
          q={
            <>
              Számítsd ki a definíció alapján a <M t="g(t)=\dfrac{1}{t^2}" /> függvény <M t="g'(t)" /> deriváltját!
            </>
          }
        >
          <p>
            Közös nevezővel:
          </p>
          <M block t="g'(t)=\lim_{h\to 0}\frac{\frac{1}{(t+h)^2}-\frac{1}{t^2}}{h}=\lim_{h\to 0}\frac{t^2-(t^2+2th+h^2)}{h\,t^2(t+h)^2}=\lim_{h\to 0}\frac{-2t-h}{t^2(t+h)^2}=-\frac{2}{t^3}." />
        </Task>
        <Task
          n={5}
          q={
            <>
              Használd a <M t="\dfrac{d}{dx}\sqrt{x}=\dfrac{1}{2\sqrt{x}}" /> képletet: írd fel az <M t="y=\sqrt{x}" /> görbe <M t="(9;\,3)" /> pontbeli érintőjének egyenletét!
            </>
          }
        >
          <p>
            Az érintő meredeksége <M t="x=9" />-ben: <M t="f'(9)=\dfrac{1}{2\sqrt{9}}=\dfrac{1}{6}" />.
          </p>
          <p>
            Az érintő egyenlete: <M t="y=3+\dfrac{1}{6}(x-9)=\dfrac{1}{6}x+\dfrac{3}{2}" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Deriváld a definícióból (a <M t="z\to x" /> alakkal) a <M t="p(x)=\sqrt{x+5}" /> függvényt (<M t="x>-5" />)!
            </>
          }
        >
          <p>
            <M t="z-x=(z+5)-(x+5)=(\sqrt{z+5}-\sqrt{x+5})(\sqrt{z+5}+\sqrt{x+5})" />. Egyszerűsítve:
          </p>
          <M block t="p'(x)=\lim_{z\to x}\frac{1}{\sqrt{z+5}+\sqrt{x+5}}=\frac{1}{2\sqrt{x+5}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A derivált grafikonja: hogyan olvassuk le f′-t f-ből?',
    body: (
      <>
        <p>
          Nem mindig ismerjük egy függvény pontos képletét — sokszor csak a grafikonját látjuk (például egy kísérlet mérési görbéjét, egy sportoló pulzusgörbéjét vagy egy tőzsdei grafikont). Mégis meg tudjuk rajzolni belőle a deriváltfüggvény alakját!
        </p>
        <p>
          Csak egyetlen dolgot tarts észben: <strong>az <M t="f'(x)" /> grafikon magassága minden <M t="x" /> fölött az <M t="f(x)" /> görbe ottani meredeksége.</strong> Ebből négy kristálytiszta szabály következik:
        </p>
        <ol>
          <li>
            Ahol <M t="f" /> <strong>emelkedik</strong> (érintője felfelé dől) <M t="\Longrightarrow" /> <M t="f'(x)>0" /> (a derivált az <M t="x" />-tengely <em>fölött</em> van).
          </li>
          <li>
            Ahol <M t="f" /> <strong>csökken</strong> (érintője lefelé dől) <M t="\Longrightarrow" /> <M t="f'(x)<0" /> (a derivált az <M t="x" />-tengely <em>alatt</em> van).
          </li>
          <li>
            Ahol <M t="f" /> <strong>tetőponton vagy mélyponton</strong> van (vízszintes érintő) <M t="\Longrightarrow" /> <M t="f'(x)=0" /> (a derivált <em>metszi</em> az <M t="x" />-tengelyt).
          </li>
          <li>
            <strong>Minél meredekebb</strong> <M t="f" />, annál nagyobb <M t="|f'(x)|" /> (annál messzebb van az <M t="x" />-tengelytől).
          </li>
        </ol>
        <p>
          Próbáld ki az alábbi kettős ábrán! Figyeld meg a „töröttvonal” példát is: amikor mérési pontokat egyenes szakaszokkal kötünk össze (mint a könyvben a <em>Daedalus</em> repülőgép pilótájának óránkénti vércukorszint-mérésénél), az egyes szakaszokon állandó a meredekség, ezért a derivált <strong>lépcsős függvény</strong>, a töréspontokban pedig nincs értelmezve.
        </p>
        <GraphOfDerivWidget />
        <h3>Feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Egy <M t="f" /> függvény deriváltjáról tudjuk, hogy a <M t="(0;\,5)" /> intervallumon <M t="f'(x)>0" />, de <M t="f'(x)" /> folyamatosan <em>csökken</em>. Mit csinál maga az <M t="f" /> függvény ezen az intervallumon?
            </>
          }
        >
          <p>
            Mivel <M t="f'(x)>0" />, maga az <M t="f" /> függvény <strong>továbbra is növekszik</strong>! Az, hogy <M t="f'" /> csökken, csupán azt jelenti, hogy a növekedés <em>üteme lassul</em> (a görbe egyre laposabb lesz, mint például <M t="\sqrt{x}" />).
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Egy túrázó magassága az első órában egyenletesen 200 m-ről 500 m-re nő, a második órában 500 m-en pihen, a harmadikban egyenletesen 500 m-ről 350 m-re ereszkedik. Mennyi a magasságfüggvény deriváltja az egyes órák belsejében?
            </>
          }
        >
          <p>
            Az 1. órában: <M t="\dfrac{500-200}{1}=+300" /> m/óra. A 2. órában: <M t="0" /> m/óra. A 3. órában: <M t="\dfrac{350-500}{1}=-150" /> m/óra. A váltási időpontokban (<M t="t=1" /> és <M t="t=2" />) töréspont miatt nincs derivált.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Féloldali deriváltak és mikor nem differenciálható?',
    body: (
      <>
        <p>
          Mit jelent az a szó, hogy egy függvény egy pontban <strong>differenciálható</strong>? Egyszerűen azt, hogy ott <em>létezik (véges) deriváltja</em> — szemléletesen a grafikon az adott pontban <strong>sima</strong>, nem törik meg, nem ugrik, és nem fordul függőlegesbe.
        </p>
        <Def title="Differenciálhatóság intervallumon és féloldali deriváltak">
          <p>
            Az <M t="f" /> függvény <strong>differenciálható</strong> egy nyílt intervallumon, ha annak minden pontjában van deriváltja. Egy zárt <M t="[a;\,b]" /> intervallumon akkor differenciálható, ha <M t="(a;\,b)" /> minden pontjában differenciálható, és a végpontokban léteznek a véges <strong>jobb, illetve bal oldali deriváltak</strong>:
          </p>
          <M block t="f'_+(a)=\lim_{h\to 0^+}\frac{f(a+h)-f(a)}{h}, \qquad\qquad f'_-(b)=\lim_{h\to 0^-}\frac{f(b+h)-f(b)}{h}." />
        </Def>
        <p>
          Egy belső <M t="x_0" /> pontban a függvény pontosan akkor differenciálható, ha a bal és a jobb oldali derivált is létezik (véges), és <strong>egyenlők</strong>. Ennek alapján négy ok miatt hiúsulhat meg a differenciálhatóság:
        </p>
        <ol>
          <li>
            <strong>Töréspont (sarok):</strong> a bal és a jobb oldali derivált különböző (pl. <M t="f(x)=|x|" /> a <M t="0" />-ban: balról <M t="-1" />, jobbról <M t="+1" />).
          </li>
          <li>
            <strong>Csúcs (tüske):</strong> a meredekség az egyik oldalról <M t="+\infty" />, a másikról <M t="-\infty" /> (pl. <M t="x^{2/3}" /> a <M t="0" />-ban).
          </li>
          <li>
            <strong>Függőleges érintő:</strong> a meredekség mindkét oldalról <M t="+\infty" /> vagy <M t="-\infty" /> (pl. <M t="x^{1/3}" /> vagy <M t="\sqrt{x}" /> a <M t="0" />-ban: <M t="\lim_{h\to 0^+}\frac{\sqrt{h}}{h}=+\infty" />).
          </li>
          <li>
            <strong>Szakadás:</strong> ahol a görbe megszakad, ott nem lehet differenciálható.
          </li>
        </ol>
        <NonDiffWidget />
        <h3>Feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Igazold féloldali deriváltakkal, hogy az <M t="f(x)=\begin{cases}x^2,&x\le 1\\ 2x-1,&x>1\end{cases}" /> függvény <em>differenciálható</em> az <M t="x=1" /> pontban!
            </>
          }
        >
          <p>
            Először nézzük a csatlakozást: <M t="1^2=1" /> és <M t="2(1)-1=1" />, tehát folytonos.
          </p>
          <p>
            Bal oldali derivált: <M t="\lim_{h\to 0^-}\dfrac{(1+h)^2-1}{h}=\lim_{h\to 0^-}(2+h)=2" />. Jobb oldali derivált: <M t="\lim_{h\to 0^+}\dfrac{2(1+h)-1-1}{h}=2" />. A kettő egyenlő, tehát <M t="f'(1)=2" /> (a két ág simán illeszkedik!).
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Differenciálható-e az <M t="y=\sqrt{x}" /> függvény a <M t="[0;\,4]" /> zárt intervallumon?
            </>
          }
        >
          <p>
            <strong>Nem.</strong> A <M t="(0;\,4]" /> intervallumon mindenütt differenciálható (<M t="f'(x)=\frac{1}{2\sqrt{x}}" />), de az <M t="x=0" /> bal végpontban <M t="\lim_{h\to 0^+}\dfrac{\sqrt{h}-0}{h}=\lim_{h\to 0^+}\dfrac{1}{\sqrt{h}}=+\infty" />, ami nem véges.
          </p>
        </Task>
        <Task
          n={11}
          q={
            <>
              Mely pontokban nem differenciálható az <M t="f(x)=|x-3|+2" /> függvény?
            </>
          }
        >
          <p>
            Csak az <M t="x=3" /> helyen, ahol töréspontja van (balról <M t="-1" />, jobbról <M t="+1" /> a derivált). Minden más valós számban differenciálható.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Differenciálhatóság ⇒ folytonosság, és Darboux tétele',
    body: (
      <>
        <p>
          Két alapvető elméleti kérdést kell tisztáznunk: (1) Mi a kapcsolat a folytonosság és a differenciálhatóság között? (2) Lehet-e bármilyen függvény egy másik függvény deriváltja?
        </p>
        <Def title="1. Tétel (Differenciálhatóság ⇒ folytonosság)">
          <p>
            Ha az <M t="f" /> függvény differenciálható az <M t="x=c" /> helyen, akkor ott <strong>folytonos is</strong>.
          </p>
        </Def>
        <h3>Miért igaz ez? (A rövid bizonyítás lényege)</h3>
        <p>
          A folytonossághoz azt kell belátnunk, hogy <M t="\lim_{h\to 0}f(c+h)=f(c)" />. Írjuk fel <M t="f(c+h)" />-t ügyesen úgy, hogy megjelenjen benne a differenciahányados (bármely <M t="h\ne 0" /> esetén):
        </p>
        <M block t="f(c+h) = f(c) + \frac{f(c+h)-f(c)}{h}\cdot h." />
        <p>
          Most vegyük mindkét oldal <M t="h\to 0" /> határértékét! Mivel <M t="f" /> differenciálható <M t="c" />-ben, a tört határértéke a véges <M t="f'(c)" /> szám, a mellette lévő <M t="h" /> pedig <M t="0" />-hoz tart:
        </p>
        <M block t="\lim_{h\to 0}f(c+h) = f(c) + f'(c)\cdot 0 = f(c)." />
        <p>
          Ennyi az egész! A szorzás miatt a <M t="0" /> „lenullázza” a véges <M t="f'(c)" /> értéket.
        </p>
        <Warn>
          <p>
            <strong>Vigyázz az irányra!</strong> A tétel megfordítása <strong>HAMIS</strong>: attól, hogy egy függvény folytonos, még <em>nem</em> biztos, hogy differenciálható (lásd <M t="|x|" /> a <M t="0" />-ban: folytonos, mégis törik). Viszont a tagadása mindig igaz: <strong>ha egy függvény nem folytonos <M t="c" />-ben, akkor biztosan nem is differenciálható ott!</strong>
          </p>
        </Warn>
        <h3>Darboux tétele (a derivált nem ugorhat!)</h3>
        <Def title="2. Tétel (Darboux tétele)">
          <p>
            Ha <M t="f" /> differenciálható egy <M t="[a;\,b]" /> intervallumon, akkor az <M t="f'" /> deriváltfüggvény felvesz <strong>minden</strong> <M t="f'(a)" /> és <M t="f'(b)" /> közötti értéket.
          </p>
        </Def>
        <p>
          Ez azt jelenti, hogy egy deriváltfüggvénynek — még akkor is, ha esetleg nem mindenütt folytonos — <strong>soha nem lehet ugrásszakadása</strong>! Így például az <M t="U(x)" /> egységugrásfüggvény (amely <M t="0" />-ról hirtelen <M t="1" />-re ugrik) nem lehet egyetlen <M t="\mathbb{R}" />-en differenciálható függvény deriváltja sem.
        </p>
        <HierarchyWidget />
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Melyik függvény folytonos <M t="x = 0" />-ban, de <strong>NEM</strong> differenciálható ott?
            </>
          }
          options={[
            { label: <M t="f(x) = |x|" />, ok: true },
            { label: <M t="f(x) = x^2" /> },
            { label: <M t="f(x) = \sin x" /> },
            { label: <M t="f(x) = \dfrac{1}{x}" /> },
          ]}
          explain={
            <>
              Az <M t="|x|" /> grafikonja az origóban folytonos, de a bal oldali derivált <M t="-1" />, a jobb oldali <M t="+1" />, így töréspontja van.
            </>
          }
        />
        <h3>Feladatok</h3>
        <Task
          n={12}
          q={
            <>
              Igaz vagy hamis? (a) Ha <M t="f" /> nem folytonos <M t="x=2" />-ben, akkor <M t="f'(2)" /> nem létezik. (b) Ha <M t="f" /> folytonos <M t="x=2" />-ben, akkor <M t="f'(2)" /> létezik.
            </>
          }
        >
          <p>
            (a) <strong>Igaz</strong> (az 1. Tétel kontrapozíciója: ha létezne <M t="f'(2)" />, folytonosnak kellene lennie).
          </p>
          <p>
            (b) <strong>Hamis</strong> (ellenpélda: <M t="f(x)=|x-2|" /> folytonos <M t="x=2" />-ben, de ott nem differenciálható).
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Lehet-e a <M t="g(x)=\lfloor x\rfloor" /> alsó egészrészfüggvény egy minden valós számon differenciálható <M t="F(x)" /> függvény deriváltja?
            </>
          }
        >
          <p>
            <strong>Nem.</strong> A <M t="[0;\,1]" /> intervallumon <M t="g(0)=0" /> és <M t="g(1)=1" />, de a <M t="0" /> és <M t="1" /> közötti értékeket (pl. <M t="0{,}5" />) sehol nem veszi fel. Ez ellentmond Darboux tételének.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás, buktatók és vegyes gyakorlás',
    body: (
      <>
        <p>
          Foglaljuk össze a 3.1-es szakasz legfontosabb gondolatait egyetlen áttekintő táblázatban:
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>téma</th>
              <th>lényeg röviden</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Deriváltfüggvény</td>
              <td><M t="f'(x)=\lim_{h\to 0}\dfrac{f(x+h)-f(x)}{h}=\lim_{z\to x}\dfrac{f(z)-f(x)}{z-x}" /></td>
            </tr>
            <tr>
              <td>Grafikon-olvasás</td>
              <td><M t="f'>0 \Leftrightarrow f" /> nő; <M t="f'<0 \Leftrightarrow f" /> csökken; <M t="f'=0" /> vízszintes érintő</td>
            </tr>
            <tr>
              <td>Mikor nincs derivált?</td>
              <td>Töréspont, csúcs (tüske), függőleges érintő, szakadás</td>
            </tr>
            <tr>
              <td>Folytonossági kapcsolat</td>
              <td>Differenciálható <M t="\Longrightarrow" /> folytonos (visszafelé nem igaz!)</td>
            </tr>
            <tr>
              <td>Darboux tétele</td>
              <td>Egy deriváltfüggvény nem hagyhat ki közbenső értékeket (nincs ugrása)</td>
            </tr>
          </tbody>
        </table>
        <h3>Négy gyakori hiba</h3>
        <Warn>
          <p>
            <strong>1. Összekeverni <M t="f'" /> előjelét és monotonitását:</strong> ha <M t="f'(x)" /> pozitív, de csökken, attól még maga <M t="f(x)" /> <em>növekszik</em> (csak lassuló ütemben)!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. „Függőleges érintő van” ≠ „differenciálható”:</strong> az <M t="x^{1/3}" /> görbének van függőleges érintője <M t="0" />-ban, de ott a derivált <M t="+\infty" />, ami nem valós szám — tehát <em>nem</em> differenciálható!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Folytonosságból differenciálhatóságra következtetni:</strong> a folytonosság csak <em>szükséges</em>, nem elégséges feltétel (a sarkoknál elbukik).
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. A <M t="\frac{dy}{dx}" /> kezelése közönséges törtként:</strong> ebben a fejezetben ez egyetlen szimbólum a deriváltra, nem osztás!
          </p>
        </Warn>
        <h3>Vegyes feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Határozd meg az <M t="a" /> és <M t="b" /> valós számokat úgy, hogy az
              <M block t="f(x)=\begin{cases}x^2+1,&x\le 2\\ ax+b,&x>2\end{cases}" />
              függvény <strong>differenciálható</strong> legyen az <M t="x=2" /> helyen!
            </>
          }
        >
          <p>
            1. <em>Folytonosság szükséges</em> (<M t="x=2" />): balról <M t="2^2+1=5" />, jobbról <M t="2a+b" />, tehát <M t="2a+b=5" />.
          </p>
          <p>
            2. <em>Féloldali deriváltak egyezése:</em> balról az <M t="x^2+1" /> deriváltja <M t="2x" />, ami <M t="x=2" />-ben <M t="4" />. Jobbról az <M t="ax+b" /> deriváltja <M t="a" />. Tehát <M t="a=4" />, amiből <M t="b=5-2\cdot 4=-3" />. (Az <M t="y=4x-3" /> egyenes éppen a parabola <M t="(2;\,5)" /> pontbeli érintője!)
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Számítsd ki a definíció alapján az <M t="f(x)=\dfrac{1}{x+1}" /> függvény deriváltját, és írd fel a görbe <M t="(1;\,\frac{1}{2})" /> pontbeli érintőjének egyenletét!
            </>
          }
        >
          <p>
            <M t="f'(x)=\lim_{h\to 0}\dfrac{\frac{1}{x+h+1}-\frac{1}{x+1}}{h}=\lim_{h\to 0}\dfrac{-h}{h(x+h+1)(x+1)}=-\dfrac{1}{(x+1)^2}" />.
          </p>
          <p>
            Az <M t="x=1" /> helyen <M t="f'(1)=-\dfrac{1}{4}" />. Az érintő egyenlete: <M t="y=\dfrac{1}{2}-\dfrac{1}{4}(x-1)=-\dfrac{1}{4}x+\dfrac{3}{4}" />.
          </p>
        </Task>
      </>
    ),
  },
];
