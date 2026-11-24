import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import { WindowWidget, AspectWidget, PoleWidget, AliasWidget, RootWidget, RegressionWidget } from '../components/Widgets17';
import type { Page } from './s1_1';

export const S1_7: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Hogyan rajzol a gép, és mit mutat az ablak?',
    body: (
      <>
        <Story>
          <p>
            Ha egy hegyvidéket egyetlen, rosszul beállított fényképen akarsz megmutatni, vagy csak a völgyet látod, vagy csak a csúcsokat. A függvényábrázoló programokkal ugyanez a helyzet: a kép
            attól függ, melyik részt nézzük.
          </p>
        </Story>
        <p>
          A program (vagy a grafikus számológép) nem „érti” a függvényt, hanem pontokat számol. A lépései:
        </p>
        <ol>
          <li>
            A felhasználó megad egy <strong>ablakot</strong>: <M t="[x_{\min};x_{\max}]\times[y_{\min};y_{\max}]" />.
          </li>
          <li>
            Az <M t="[x_{\min};x_{\max}]" /> intervallumot egyenlő részekre osztja, és minden osztópontban kiszámítja <M t="f(x)" />-et, ha az ott értelmezve van.
          </li>
          <li>A szomszédos pontokat rövid egyenes szakaszokkal köti össze, és a képernyőn csak az ablakba eső részt mutatja.</li>
        </ol>
        <p>
          Ezért a kép két dologtól függ: az ablaktól és a mintapontok sűrűségétől. Bármelyik hibás lehet. Ha az ablak túl szűk, a görbe jellegzetes részei kimaradnak, ha túl tág, a részletek
          összemosódnak.
        </p>
        <h3>Próbálgatás helyett gondolkodás</h3>
        <p>
          Az ablak megválasztása nem csak próbálgatás. Néhány függvényérték táblázata már elárulja a méretrendet: mekkorák az értékek, hol vannak a zérushelyek, hol kanyarodik a görbe. Egy
          harmadfokú polinomnál például a két „púp” magassága dönti el, mekkora függőleges tartomány kell.
        </p>
        <WindowWidget />
        <h3>Feladat</h3>
        <Task
          n={1}
          q={
            <>
              Az <M t="f(x)=x^3-12x" /> függvényhez készíts értéktáblázatot <M t="x=-4,\dots,4" /> egész értékekre, és válassz belőle ablakot. Mit látnál az <M t="[-5;5]\times[-5;5]" /> ablakban?
            </>
          }
        >
          <p>
            Az értékek <M t="x=-4,-3,\dots,4" /> sorrendben: <M t="-16,\ 9,\ 16,\ 11,\ 0,\ -11,\ -16,\ -9,\ 16" />. A függvény páratlan, a zérushelyek: <M t="x=0" /> és <M t="x^2=12" />, vagyis{' '}
            <M t="x\approx\pm3{,}46" />. A „púpok” kb. <M t="\pm16" /> magasak, ezért jó ablak például <M t="[-5;5]\times[-20;20]" />.
          </p>
          <p>
            Az <M t="[-5;5]^2" /> ablakban csak a zérushelyek közvetlen környéke látszana, ahol <M t="|f|\le5" />: három meredek, majdnem egyenes darab, a púpok teljesen kimaradnának.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Négyzetes ablak: ne torzítsd a képet',
    body: (
      <>
        <p>
          Az ablak <M t="[a;b]\times[c;d]" /> kijelölésével a két tengely skáláját is megadjuk: az <M t="x" />-tengelyen <M t="b-a" /> egység fér el a kép szélességén, az <M t="y" />-tengelyen{' '}
          <M t="d-c" /> egység a magasságán. A kép <strong>négyzetes</strong> (jobb szóval: azonos léptékű), ha egy <M t="x" />-egység és egy <M t="y" />-egység ugyanolyan hosszú a képernyőn. Ez nem az
          ablak alakjára vonatkozik, az általában téglalap.
        </p>
        <p>
          Nem azonos léptékű ablakban a kép torzít. Ez pontosan az 1.5-ben látott méretezés: a kép vízszintes és függőleges irányban eltérő tényezővel nyúlik. Ezért
        </p>
        <ul>
          <li>a kör ellipszisnek látszik (1.5, ellipszis),</li>
          <li>a merőleges egyenesek nem látszanak merőlegesnek,</li>
          <li>a meredekségek hamisak: a 45°-os egyenes más szögben jelenik meg.</li>
        </ul>
        <AspectWidget />

        <Quiz
          q={<>Mi történik az <M t="x^2 + y^2 = 9" /> kör képével, ha a rajzoló ablakban egy <M t="x" />-egység kétszer olyan széles képpontban, mint egy <M t="y" />-egység?</>}
          options={[
            { label: 'Kör marad, csak nagyobb lesz' },
            { label: 'Vízszintesen megnyúlt ellipszisnek látszik', ok: true },
            { label: 'Függőlegesen megnyúlt ellipszisnek látszik' },
            { label: 'Hiperbolává torzul' },
          ]}
          explain={
            <>
              A nem azonos léptékű ablak vízszintesen 2-szeresére nyújtja a képet, így a kör 2:1 arányú fekvő ellipszisnek
              látszik, és a merőleges egyenesek sem látszanak derékszögűnek.
            </>
          }
        />
        <p>
          Ha az arányt mi akarjuk beállítani, számolni kell: a képernyő szélességét és magasságát elosztjuk az ablak megfelelő hosszaival, és a két hányadosnak egyenlőnek kell lennie. A legtöbb
          program felkínál egy „square” (négyzetes) beállítást is.
        </p>
        <Warn>
          Nem mindig a négyzetes ablak a legjobb. A sin 100x vagy az 1000-es nagyságrendű értékeket felvevő függvénynél az azonos léptékű ablak vagy csak egy vonalat mutat, vagy kimarad belőle a
          lényeg. Ilyenkor szándékosan torzított ablakot használunk, de tudnunk kell, hogy a meredekségek és az alakzatok nem hitelesek.
        </Warn>
        <h3>Feladatok</h3>
        <Task
          n={2}
          q={
            <>
              Egy kép 560 px széles és 280 px magas, az ablak <M t="[-10;10]\times[-10;10]" />. Hány képpont egy <M t="x" />- és egy <M t="y" />-egység? Mekkora lesz a képen az{' '}
              <M t="x^2+y^2=25" /> kör, és milyen szögben jelenik meg az <M t="y=x" /> egyenes?
            </>
          }
        >
          <p>
            Egy <M t="x" />-egység <M t="560/20=28" /> px, egy <M t="y" />-egység <M t="280/20=14" /> px. A kör a képen 280 px széles (2·5·28) és 140 px magas (2·5·14), tehát 2:1 arányú ellipszis.
          </p>
          <p>
            Az <M t="y=x" /> egyenesen 1 egységnyi lépés 28 px vízszintes és 14 px függőleges elmozdulás, a szög <M t="\arctan\tfrac{14}{28}\approx26{,}6^\circ" /> a 45° helyett.
          </p>
        </Task>
        <Task
          n={3}
          q={
            <>
              Egy 640 × 400 px-es képernyőn az <M t="x" />-tartomány <M t="[-8;8]" />. Milyen <M t="y" />-tartomány ad azonos léptékű (négyzetes) ablakot?
            </>
          }
        >
          <p>
            Egy <M t="x" />-egység <M t="640/16=40" /> px. Ugyanennyinek kell lennie egy <M t="y" />-egységnek: a magasság <M t="400/40=10" /> egység, például <M t="[-5;5]" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Hamis függőleges vonalak a pólusok körül',
    body: (
      <>
        <p>
          Ha egy tört nevezője nulla, a függvény ott nincs értelmezve. A program ezt észreveszi, és az ilyen pontot kihagyja. Probléma akkor van, ha a nevező zérushelye két mintapont közé esik. Mindkét
          szomszédos pontban van érték (az egyik nagy pozitív, a másik nagy negatív), és a program azokat is összeköti. Az így kapott szakasz átmegy a hézagon, ott húz egy meredek, majdnem függőleges
          vonalat, amely nem része a grafikonnak.
        </p>
        <p>
          A hiba a mintapontok számával változik: más osztásnál más a két szomszéd, így az álvonal helye, meredeksége és hossza is más lesz. Jó programok a nagy ugrásnál megszakítják a vonalat.
        </p>
        <PoleWidget />
        <Def title="Mit érdemes tudni?">
          <p>
            A függőleges vonal a képen <em>sosem</em> a függvény része ott, ahol a nevező nulla. Ha egy racionális függvény grafikonján függőleges szakaszt látsz, előbb nézd meg a nevező zérushelyeit.
          </p>
        </Def>
        <h3>Feladat</h3>
        <Task
          n={4}
          q={
            <>
              Egy program az <M t="[-10;10]" /> intervallumot 99 egyenlő részre osztja, és az <M t="f(x)=\dfrac1{x-2}" /> függvényt ábrázolja. Mely két szomszédos mintapont fogja közre az <M t="x=2" /> pólust, mekkora
              bennük a függvényérték, és hol metszi az <M t="x" />-tengelyt a köztük húzott szakasz?
            </>
          }
        >
          <p>
            A lépésköz <M t="h=20/99\approx0{,}202" />. A mintapontok <M t="x_i=-10+ih" />, ezek közül <M t="x_{59}\approx1{,}919" /> és <M t="x_{60}\approx2{,}121" /> fogja közre a 2-t. Itt{' '}
            <M t="f(x_{59})\approx-12{,}37" /> és <M t="f(x_{60})\approx8{,}25" />.
          </p>
          <p>
            A két pontot összekötő szakasz az <M t="x\approx2{,}04" /> helyen metszi az <M t="x" />-tengelyt. Ez a pont nem eleme a grafikonnak (<M t="f" /> sehol sem nulla), vagyis a szakasz hamis.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Gyorsan oszcilláló függvények',
    body: (
      <>
        <p>
          A mintavételezés másik csapdája a gyors ingadozás. Ha a hullám egy periódusa alatt a program csak néhány pontot számol, a pontokat összekötve nem a valódi hullámot kapja, hanem egy lassabbat
          vagy szabálytalant. Ugyanez történik a mozgóképeken, amikor egy forgó kerék kereke visszafelé forogni látszik.
        </p>
        <p>
          Egy <M t="\sin(\omega x)" /> függvény periódusa <M t="2\pi/\omega" />. Ha ez az ablak szélességénél sokkal kisebb, az ablakban sok periódus fér el, és periódusonként kevés mintapont jut.
          Gyakorlati mérce: legalább tíz-húsz minta kell periódusonként.
        </p>
        <AliasWidget />

        <Quiz
          q={<>Miért tűnhet lassú hullámnak az <M t="y = \sin(80x)" /> grafikonja egy <M t="[-10;\,10]" /> ablakban kevés mintaponttal?</>}
          options={[
            { label: 'Mert a mintavételi lépésköz nagyobb a periódus felénél (aliasing)', ok: true },
            { label: 'Mert a szinusz periódusa 80' },
            { label: 'Mert a tengelyek nem négyzetesek' },
            { label: 'Mert a függvény nem folytonos' },
          ]}
          explain={
            <>
              A periódus <M t="2\pi/80 \approx 0{,}0785" />; ha a mintavételi lépésköz ennél durvább, a pontok összekötése
              hamis, alacsony frekvenciájú görbét rajzol (mintavételi torzítás, <em>aliasing</em>).
            </>
          }
        />
        <p>
          A második függvény két tagot tartalmaz: egy lassú, nagy <M t="\cos x" /> tagot és egy gyors, de kis amplitúdójú <M t="\tfrac1{50}\sin50x" /> tagot. Széles ablakban a gyors tag
          láthatatlan, mert ráadásul kis amplitúdójú. Az x-tartomány szűkítése után az y-tartományt is ehhez kell igazítani, különben a kicsi ingadozás a képen elvész.
        </p>
        <h3>Feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Egy program 400 mintapontot használ az <M t="[-6;6]" /> intervallumon az <M t="f(x)=\sin100x" /> ábrázolásához. Hány minta jut egy periódusra? Milyen széles ablakban lenne periódusonként legalább 20 minta?
            </>
          }
        >
          <p>
            A periódus <M t="2\pi/100\approx0{,}0628" />. A 12 egység széles ablakban <M t="12/0{,}0628\approx191" /> periódus van, a 400 mintapontból tehát periódusonként <M t="400/191\approx2{,}1" /> jut:
            ez túl kevés, a kép hamis.
          </p>
          <p>
            20 minta/periódushoz <M t="400\cdot0{,}0628/20\approx1{,}26" /> egység szélesség a legtöbb, például <M t="[-0{,}6;0{,}6]" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Hol és milyen ablakban látnád a <M t="g(x)=\cos x+\tfrac1{50}\sin50x" /> grafikonján a gyors ingadozást? Indokold az ablak magasságát is.
            </>
          }
        >
          <p>
            A gyors tag amplitúdója <M t="\tfrac1{50}=0{,}02" />, ezért a grafikon legfeljebb 0,02-re tér el a <M t="\cos x" />-től. Az <M t="x=0" /> környéke jó: a <M t="\cos x" /> az{' '}
            <M t="[-0{,}4;0{,}4]" /> intervallumon <M t="0{,}92" /> és 1 között van, tehát a grafikon a <M t="[0{,}9;1{,}03]" /> sávban marad (számítással: a minimum kb. 0,903, a maximum kb. 1,020).
          </p>
          <p>
            Az ablak <M t="[-0{,}4;0{,}4]\times[0{,}9;1{,}03]" />. A gyors tag periódusa <M t="2\pi/50\approx0{,}126" />, így 0,8 egységnyi szélességben mintegy 6 periódus látszik, a 0,13 magas sávban pedig a 0,04
            nagyságú ingadozás jól kivehető.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Amikor a gép levágja a grafikon felét',
    body: (
      <>
        <p>
          Sok program a hatványt úgy számolja, hogy <M t="x^a=e^{a\ln x}" />. Ez jól működik, ha <M t="x>0" />, de a logaritmus a negatív számokra nincs értelmezve. A program ezért a
          negatív <M t="x" />-eknél nem ad értéket, még akkor sem, ha a függvény valójában értelmes. Az <M t="x^{1/3}" /> köbgyök például minden valós számra létezik (<M t="(-8)^{1/3}=-2" />), a gép képén mégis csak
          a jobb ág látszik.
        </p>
        <p>
          A hiányzó ágat egyszerűen pótolhatjuk, ha a negatív számoknál az abszolút értékkel számolunk, és a szimmetria szerint állítjuk be az előjelet. Páratlan nevezőjű törtkitevőre (
          <M t="x^{p/q}" />, <M t="q" /> páratlan):
        </p>
        <M block t="x^{p/q}=\begin{cases}|x|^{p/q}, & p\text{ páros},\\ \operatorname{sgn}(x)\,|x|^{p/q}, & p\text{ páratlan}.\end{cases}" />
        <p>
          Az első esetben a függvény páros (a grafikon szimmetrikus az <M t="y" />-tengelyre), a másodikban páratlan (középpontosan szimmetrikus az origóra). Ez ugyanaz a paritás, amelyről az 1.4-ben és az 1.6-ban volt szó.
        </p>
        <RootWidget />
        <Warn>
          A hiba nem a függvényben van, hanem a program számolási módszerében. A matematikai grafikon és a gép képe tehát eltérhet, és mindig az értelmezési tartomány vizsgálatával kell eldönteni, melyik a hiteles.
        </Warn>
        <h3>Feladat</h3>
        <Task
          n={7}
          q={
            <>
              Számítsd ki: (a) <M t="(-8)^{2/3}" />, (b) <M t="(-32)^{3/5}" />. Páros vagy páratlan az <M t="x^{4/5}" /> és az <M t="x^{5/3}" /> függvény, és milyen képlettel kapod meg a gép által elhagyott ágat?
            </>
          }
        >
          <p>
            (a) <M t="(-8)^{2/3}=\big((-8)^{1/3}\big)^2=(-2)^2=4" />. (b) <M t="(-32)^{3/5}=\big((-32)^{1/5}\big)^3=(-2)^3=-8" />.
          </p>
          <p>
            Az <M t="x^{4/5}" /> számlálója páros: páros függvény, a bal ág <M t="|x|^{4/5}" />. Az <M t="x^{5/3}" /> számlálója páratlan: páratlan függvény, a bal ág <M t="\operatorname{sgn}(x)|x|^{5/3}" />, azaz
            negatív <M t="x" />-re <M t="-|x|^{5/3}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Adatok, modellek és az extrapoláció veszélye',
    body: (
      <>
        <Story>
          <p>
            Egy rugóra egyre nagyobb súlyt akasztasz, és minden lépésben lemérsz egy hosszat. A mérések sosem esnek pontosan egy egyenesre. A kérdés az, melyik egyenes (vagy görbe) írja le legjobban az adatokat,
            és ennek alapján mit mondhatunk a még nem mért esetekről.
          </p>
        </Story>
        <h3>A regresszióanalízis négy lépése</h3>
        <ol>
          <li>Ábrázoljuk az adatokat pontdiagramon.</li>
          <li>Választunk egy modelltípust (egyenes, másodfokú, hatvány, exponenciális, szinuszos), és megkeressük a legjobban illeszkedő görbét.</li>
          <li>Egy képen ábrázoljuk az adatokat és a görbét, és megnézzük, mennyire illeszkednek.</li>
          <li>Ha az illeszkedés jó, a görbével előre jelzünk olyan helyekre, ahol nincs mérés.</li>
        </ol>
        <p>
          A „legjobb” szokásos jelentése a <strong>legkisebb négyzetek módszere</strong>: azt a görbét választjuk, amelynél az adatpontok és a görbe közötti függőleges távolságok négyzetösszege
          a legkisebb. Egyenesre <M t="y=mx+b" /> a megoldás zárt alakban is megadható:
        </p>
        <M block t="m=\dfrac{\sum(x_i-\bar x)(y_i-\bar y)}{\sum(x_i-\bar x)^2},\qquad b=\bar y-m\bar x." />
        <p>
          (Az exponenciális modellt úgy illesztjük, hogy az <M t="\ln y" /> értékekre illesztünk egyenest. Ez az <M t="\ln y" />-ra nézve a legkisebb négyzetes, nem pedig magára az <M t="y" />-ra.)
        </p>
        <p>
          A legkisebb négyzetek módszerét a differenciálszámítás indokolja majd teljesen (a 14. fejezetben). Itt a lényeg a tapasztalat: kézzel is kipróbálhatod a „kézi egyenes” beállítással, hogy a
          négyzetösszeg a legjobb egyenesnél a legkisebb.
        </p>
        <RegressionWidget />
        <h3>Extrapoláció: a modell hatóköre</h3>
        <p>
          A második adatsor egy tenyészet méretét írja le. Az első nyolc pont mintha egy parabolára esne, a másodfokú modell hibája itt elenyésző. Ám a további mérések kiderítik, hogy a növekedés lelassul. A parabola
          a mintatartományon kívül, a 16. időpontra, jóval a valóság fölött jár. Ennek oka nem a számolás, hanem az, hogy a modelltípus indoklás nélküli feltevés volt.
        </p>
        <Warn>
          A jó illeszkedés a mért tartományon belül nem igazolja a jóslatot a tartományon kívül. A mintán belüli becslés (interpoláció) általában biztonságos, a mintán túli (extrapoláció) kockázatos, főleg ha a
          modelltípust semmilyen elmélet nem támasztja alá.
        </Warn>

        <Steps
          title="Miért veszélyes a vak extrapoláció?"
          problem={<>Egy laboratóriumi mérésben <M t="x \in [0;\,4]" /> időintervallumon lineáris trendet találtunk: <M t="y = 2{,}4x + 1{,}5" />. Miért kockázatos ebből <M t="x = 40" />-re jósolni?</>}
          steps={[
            {
              title: 'Interpolációs tartomány',
              body: (
                <p>
                  A legkisebb négyzetek módszerével illesztett egyenes csak a mért <M t="[0;\,4]" /> tartományon belül
                  minimalizálja az eltérések négyzetösszegét (<M t="S(m,b) = \sum (y_i - (mx_i + b))^2" />).
                </p>
              ),
            },
            {
              title: 'Nemlineáris jelenségek a tartományon túl',
              body: (
                <p>
                  Tízszer nagyobb <M t="x" /> értéknél fizikai telítődés, csillapítás, rugó-megnyúlási határ vagy
                  fázisváltás léphet fel, amiről az első 4 egység adatai semmit nem árulnak el.
                </p>
              ),
            },
            {
              title: 'Következtetés',
              body: (
                <p>
                  A tartományon túli <strong>extrapoláció</strong> önálló elméleti/fizikai modell nélkül sosem
                  igazolható — mindig külön méréssel kell ellenőrizni!
                </p>
              ),
            },
          ]}
        />

        <Quiz
          q={<>Mit minimalizál pontosan a legkisebb négyzetek módszere az <M t="(x_i;\,y_i)" /> pontokra illesztett <M t="y = mx + b" /> egyenesnél?</>}
          options={[
            { label: <>A pontok és az egyenes közti függőleges eltérések négyzetösszegét: <M t="\sum (y_i - (mx_i + b))^2" /></>, ok: true },
            { label: <>Az eltérések előjeles összegét: <M t="\sum (y_i - (mx_i + b))" /></> },
            { label: <>Csak az első és az utolsó pont közötti távolságot</> },
            { label: <>A meredekség abszolút értékét (<M t="|m|" />)</> },
          ]}
          explain={
            <>
              A négyzetre emelés miatt a pozitív és negatív hibák nem oltják ki egymást, és a nagyobb eltérések erősebben
              súlyozódnak: <M t="S(m,b) = \sum_{i=1}^n (y_i - (mx_i + b))^2" />.
            </>
          }
        />
        <h3>Feladatok</h3>
        <Task
          n={8}
          q={
            <>
              Az (1; 2), (2; 3), (3; 5), (4; 6) adatpontokra illessz egyenest a legkisebb négyzetek módszerével, és becsüld meg <M t="y(6)" />-ot. Mekkora az eltérések négyzetösszege?
            </>
          }
        >
          <p>
            <M t="\bar x=2{,}5" />, <M t="\bar y=4" />. <M t="\sum(x_i-\bar x)(y_i-\bar y)=(-1{,}5)(-2)+(-0{,}5)(-1)+0{,}5\cdot1+1{,}5\cdot2=7" />, <M t="\sum(x_i-\bar x)^2=5" />. Így{' '}
            <M t="m=7/5=1{,}4" />, <M t="b=4-1{,}4\cdot2{,}5=0{,}5" />, az egyenes <M t="y=1{,}4x+0{,}5" />. A becslés <M t="y(6)=8{,}9" />.
          </p>
          <p>
            A pontokban az egyenes értékei 1,9; 3,3; 4,7; 6,1, az eltérések 0,1; −0,3; 0,3; −0,1. A négyzetösszeg <M t="0{,}01+0{,}09+0{,}09+0{,}01=0{,}2" />.
          </p>
        </Task>
        <Task
          n={9}
          q={
            <>
              A tenyészet első 8 adatára (<M t="x=0,\dots,7" />) illesztett másodfokú modell <M t="y\approx2{,}179x^2-0{,}536x+6" />. Mit jósol <M t="x=16" />-ra, és a valós érték 199 egyed. Mit mutat ez a modell
              megbízhatóságáról?
            </>
          }
        >
          <p>
            <M t="y(16)\approx2{,}179\cdot256-0{,}536\cdot16+6\approx555" />, a valós érték 199: a modell közel háromszoros túlbecslést ad, pedig a mintán a négyzetes hiba összesen csak 4,7 volt. Az egyenes
            modell kb. 226-ot, az exponenciális kb. 6970-et jósolna: három jó illeszkedésű modell, három merőben eltérő jóslat.
          </p>
          <p>
            Az adatsor valójában telítődik (logisztikus jellegű), de ez az első nyolc pontból nem látszik. A tanulság: az extrapoláció előtt indokolni kell a modelltípust, a jó illeszkedés önmagában nem elég.
          </p>
        </Task>

        <h3>Az 1. fejezet vége</h3>
        <p>
          A függvények alapjai kész: koordináták, egyenesek, függvényfogalom, függvénycsaládok, műveletek és transzformációk, szögfüggvények, valamint az ábrázolás és a modellezés buktatói. A következő
          fejezet a határértékkel kezdődik: azzal a fogalommal, amely a változás sebességét és a folytonosságot is lehetővé teszi.
        </p>
      </>
    ),
  },
];
