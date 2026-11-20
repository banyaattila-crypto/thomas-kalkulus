import { ReactNode } from 'react';
import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import { DecimalWidget } from '../components/DecimalWidget';
import { SignFlipWidget } from '../components/SignFlipWidget';
import { IntervalWidget } from '../components/IntervalWidget';
import { AbsWidget } from '../components/AbsWidget';
import { NumberLine } from '../components/NumberLine';

export type Page = { title: string; body: ReactNode };

export const S1_1: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Számok a számegyenesen',
    body: (
      <>
        <Story>
          <p>
            A hagyomány szerint a pitagoreusok abban hittek, hogy minden mennyiség kifejezhető két egész szám
            arányaként. Aztán valaki megpróbálta kiszámolni egy egységnyi oldalú négyzet átlóját. Az átló hossza olyan
            szám, amely sehogyan sem írható fel törtként. A történet szerint ez a felfedezés komoly zavart okozott az
            iskolában. Ma már tudjuk, hogy ez a szám egészen hétköznapi, csak a törtek nem elegendők a leírásához.
          </p>
        </Story>

        <p>
          Az analízis alapanyaga a <strong>valós számok</strong> rendszere. Gyakorlatilag mindent, amit a kalkulusban
          csinálunk, erre építjük. A valós számot úgy képzelhetjük el, mint egy tizedes törtet, amely akár a végtelenségig
          folytatódik:
        </p>
        <M block t="\tfrac{3}{8}=0{,}375000\ldots,\qquad \tfrac{1}{3}=0{,}333\ldots,\qquad \sqrt{2}=1{,}41421\ldots" />
        <p>
          Minden valós számnak van tizedes alakja, és minden tizedes tört egy valós számot ír le. A valós számok
          megfeleltethetők a számegyenes pontjainak: minden ponthoz tartozik egy szám, és minden számhoz egy pont. A
          számegyenest és a számok halmazát is <M t="\mathbb{R}" />-rel jelöljük.
        </p>

        <h3>Két alak, egy szám</h3>
        <p>
          A megfeleltetés egyetlen helyen nem kölcsönösen egyértelmű: bizonyos számoknak két tizedes alakjuk is van.
          Ilyen például az <M t="0{,}999\ldots" />, amely ugyanaz a szám, mint az <M t="1" />. A meggyőző érvelés:
        </p>
        <M block t="x=0{,}999\ldots\ \Rightarrow\ 10x=9{,}999\ldots\ \Rightarrow\ 10x-x=9\ \Rightarrow\ x=1." />
        <p>
          A kivonásnál a végtelen sok kilences kiejti egymást, ezért marad a <M t="9x=9" />. Ez nem kerekítés. A két
          tizedes tört <em>pontosan</em> ugyanazt a számot jelöli. Ugyanez történik minden véges tizedes törttel: például{' '}
          <M t="0{,}25=0{,}24999\ldots" />.
        </p>

        <DecimalWidget />
        <p className="hint">
          Próbáld ki a 1/7, a 3/11 és az 5/8 törteket. Melyiknél ér véget az osztás, és melyiknél kezdődik ismétlődés?
        </p>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Számhalmazok és a teljesség',
    body: (
      <>
        <h3>A számhalmazok sorrendje</h3>
        <p>
          Három, egymásba ágyazott számhalmazt kell megkülönböztetnünk: a <strong>természetes számokat</strong> (
          <M t="1,2,3,\ldots" />
          ), az <strong>egész számokat</strong> (<M t="\ldots,-1,0,1,\ldots" />
          ) és a <strong>racionális számokat</strong>, amelyek felírhatók <M t="\tfrac{m}{n}" /> alakban, ahol{' '}
          <M t="m" /> és <M t="n" /> egész, <M t="n\ne 0" />. Ha egy valós szám nem írható fel ilyen alakban, akkor <strong>irracionális</strong>.
        </p>

        <Def title="Racionális szám tizedes alakja">
          Egy valós szám pontosan akkor racionális, ha tizedes alakja <em>véges</em>, vagy <em>végtelen, de egy idő után
          szakaszosan ismétlődik</em>.
        </Def>

        <p>
          Hogy miért ismétlődik: ha <M t="m/n" />-t hosszú osztással számoljuk, minden lépés után a maradék egy{' '}
          <M t="0,1,\ldots,n-1" /> közötti szám. Ha ennyi lépés alatt nem lett 0 a maradék, akkor legkésőbb az{' '}
          <M t="n" />-edik lépés után már előfordult olyan maradék, amilyen korábban is volt, és onnantól az osztás a
          korábbi számjegyeket ismétli. A megfordítás is igaz. Például a <M t="x=0{,}\overline{27}" /> szám így alakítható
          törtté:
        </p>
        <M block t="100x=27{,}\overline{27},\quad 100x-x=27\ \Rightarrow\ x=\tfrac{27}{99}=\tfrac{3}{11}." />

        <h3>Egy szám, ami nem tört</h3>
        <p>
          Mutassuk meg, hogy <M t="\sqrt{2}" /> nem racionális. Tegyük fel az ellenkezőjét: legyen{' '}
          <M t="\sqrt2=\tfrac{m}{n}" />, ahol a tört már a lehető legegyszerűbb, vagyis <M t="m" /> és <M t="n" />{' '}
          nem oszthatók közös számmal. Négyzetre emelve <M t="m^2=2n^2" />, tehát <M t="m^2" /> páros, ezért <M t="m" />{' '}
          is páros. Legyen <M t="m=2k" />. Ekkor <M t="4k^2=2n^2" />, vagyis <M t="n^2=2k^2" /> páros, így <M t="n" /> is
          páros. Ez ellentmond annak, hogy a tört nem egyszerűsíthető. A feltevésünk tehát hamis.
        </p>
        <p>
          Ezzel az átló története is kerek: a négyzet átlója <M t="\sqrt2" /> hosszú, és ez nem arányos az oldallal egész
          számokkal kifejezve.
        </p>

        <h3>Mit jelent a teljesség?</h3>
        <p>
          A valós számoknak három fajta tulajdonságát szokás megkülönböztetni:
        </p>
        <ul>
          <li><strong>algebrai</strong>: összeadás, kivonás, szorzás és osztás (kivéve 0-val) a szokásos szabályok szerint;</li>
          <li><strong>rendezési</strong>: bármely két számról eldönthető, hogy melyik a kisebb;</li>
          <li><strong>teljességi</strong>: a számegyenesen nincs „lyuk”.</li>
        </ul>
        <p>
          Az első két tulajdonság a racionális számokra is igaz. A teljesség viszont nem: a racionális számok között{' '}
          <M t="\sqrt2" /> helyén lyuk van, hiszen nincs olyan racionális szám, amelynek négyzete 2. Pontosabban: a
          teljesség azt jelenti, hogy minden nem üres, felülről korlátos valós számhalmaznak van legkisebb felső korlátja.
          A határérték elmélete éppen erre épül, ezért a 2. fejezetben fontos szerepet kap.
        </p>
        <p>
          Érdemes még megjegyezni, hogy bármely két különböző valós szám között van racionális és irracionális szám is.
          Sehol sincs „üres hely”, de „sűrűn” keveredik a kétféle szám.
        </p>

        <h3>Halmazok jelölése</h3>
        <table className="tbl">
          <tbody>
            <tr><td><M t="a\in S" /></td><td>az <em>a</em> eleme az <em>S</em> halmaznak</td></tr>
            <tr><td><M t="S\subseteq T" /></td><td>minden <em>S</em>-beli elem <em>T</em>-ben is megvan</td></tr>
            <tr><td><M t="S\cup T" /></td><td>unió: azok az elemek, amelyek legalább az egyikben benne vannak</td></tr>
            <tr><td><M t="S\cap T" /></td><td>metszet: azok az elemek, amelyek mindkettőben benne vannak</td></tr>
            <tr><td><M t="\varnothing" /></td><td>üres halmaz</td></tr>
            <tr><td><M t="\{1,2,3\}" /></td><td>felsorolással megadott halmaz</td></tr>
            <tr><td><M t="\{x : 0<x<6,\ x\in\mathbb Z\}" /></td><td>tulajdonsággal megadott halmaz (itt: 1, 2, 3, 4, 5)</td></tr>
          </tbody>
        </table>
        <p>
          Egy szám nem lehet egyszerre tört alakú és nem tört alakú, vagyis a két halmaznak nincs közös eleme. Együtt
          viszont kiadják az egész <M t="\mathbb R" />-et.
        </p>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Egyenlőtlenségek szabályai',
    body: (
      <>
        <p>
          Egyenlőtlenségekkel úgy dolgozunk, mint az egyenletekkel, de egyetlen helyen más a szabály: ha negatív számmal
          szorzunk, a reláció iránya megfordul. Az alábbi szabályok mind következnek a rendezés alaptulajdonságaiból.
        </p>

        <Def title="Egyenlőtlenségek közti átalakítások (a, b, c valós számok)">
          <ol>
            <li><M t="a<b\ \Rightarrow\ a+c<b+c" /> (ugyanannyi hozzáadása nem változtat)</li>
            <li><M t="a<b\ \Rightarrow\ a-c<b-c" /></li>
            <li><M t="a<b" /> és <M t="c>0\ \Rightarrow\ ac<bc" /></li>
            <li><M t="a<b" /> és <M t="c<0\ \Rightarrow\ ac>bc" /> (megfordul!)</li>
            <li><M t="a<b\ \Rightarrow\ -b<-a" /> (a 4. szabály speciális esete, <M t="c=-1" />)</li>
            <li>ha <M t="a" /> és <M t="b" /> előjele azonos, akkor <M t="a<b\ \Rightarrow\ \tfrac1b<\tfrac1a" /></li>
          </ol>
        </Def>

        <SignFlipWidget />

        <p>
          Az ok a számegyenes geometriájában rejlik. A <M t="-1" />-gyel való szorzás a 0 körüli tükrözés, és a tükörképben a
          bal és a jobb oldal felcserélődik. Egy konkrét példa: <M t="2<5" />, de <M t="-2>-5" />.
        </p>

        <Warn>
          A reciprokra vonatkozó szabály csak <em>azonos előjelű</em> számokra igaz. A <M t="-2<3" /> egyenlőtlenség
          reciprokai <M t="-\tfrac12" /> és <M t="\tfrac13" />, és itt <M t="-\tfrac12<\tfrac13" />: a reláció nem fordult
          meg, mert a két szám különböző előjelű. Törtes egyenlőtlenségnél ezért sokszor érdemes külön kezelni a
          nevező pozitív és negatív esetét.
        </Warn>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Intervallumok',
    body: (
      <>
        <p>
          <strong>Intervallumnak</strong> nevezzük a számegyenes olyan részhalmazát, amely legalább két elemet tartalmaz, és
          bármely két elemével együtt az összes közéjük eső számot is. A számegyenesen ezek folytonos szakaszok vagy
          félegyenesek.
        </p>
        <Warn>
          A <M t="\mathbb R\setminus\{0\}" /> (a 0-tól különböző számok) <em>nem</em> intervallum, mert például a <M t="-1" /> és az{' '}
          <M t="1" /> között ott van a <M t="0" />, de az nincs a halmazban.
        </Warn>

        <h3>Típusok</h3>
        <table className="tbl">
          <thead>
            <tr><th>Jelölés</th><th>Halmazos alak</th><th>Típus</th></tr>
          </thead>
          <tbody>
            <tr><td><M t="(a;\,b)" /></td><td><M t="\{x : a<x<b\}" /></td><td>véges, nyílt</td></tr>
            <tr><td><M t="[a;\,b]" /></td><td><M t="\{x : a\le x\le b\}" /></td><td>véges, zárt</td></tr>
            <tr><td><M t="[a;\,b)" /></td><td><M t="\{x : a\le x<b\}" /></td><td>félig nyílt</td></tr>
            <tr><td><M t="(a;\,b]" /></td><td><M t="\{x : a<x\le b\}" /></td><td>félig nyílt</td></tr>
            <tr><td><M t="(a;\,\infty)" /></td><td><M t="\{x : x>a\}" /></td><td>végtelen, nyílt</td></tr>
            <tr><td><M t="[a;\,\infty)" /></td><td><M t="\{x : x\ge a\}" /></td><td>végtelen, zárt</td></tr>
            <tr><td><M t="(-\infty;\,b)" /></td><td><M t="\{x : x<b\}" /></td><td>végtelen, nyílt</td></tr>
            <tr><td><M t="(-\infty;\,b]" /></td><td><M t="\{x : x\le b\}" /></td><td>végtelen, zárt</td></tr>
            <tr><td><M t="(-\infty;\,\infty)" /></td><td><M t="\mathbb R" /></td><td>egyszerre nyílt és zárt</td></tr>
          </tbody>
        </table>
        <p>
          Ábrázoláskor az üres kör azt jelzi, hogy a végpont <em>nem</em> tartozik az intervallumhoz, a tömör kör pedig azt,
          hogy hozzátartozik. Az intervallum <strong>határpontjai</strong> a végpontjai, a többi pontja a{' '}
          <strong>belső pont</strong>.
        </p>

        <IntervalWidget />

        <p>
          A „végtelen” nem szám, hanem annak a jelölése, hogy az intervallum abba az irányba korlátlanul folytatódik. Ezért
          a végtelen mellett a zárójel mindig kerek.
        </p>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Az abszolútérték',
    body: (
      <>
        <Def title="Definíció">
          <M block t="|x|=\begin{cases} x, & \text{ha } x\ge 0,\\ -x, & \text{ha } x<0.\end{cases}" />
        </Def>
        <p>
          Geometriailag <M t="|x|" /> az <M t="x" /> pont távolsága a 0-tól, és általánosabban <M t="|x-y|" /> az <M t="x" />{' '}
          és az <M t="y" /> pont távolsága. Mivel a távolság sosem negatív, <M t="|x|\ge 0" />, és <M t="|x|=0" /> csak az{' '}
          <M t="x=0" /> esetben áll fenn. A definíció másik, gyakran hasznos alakja <M t="|x|=\sqrt{x^2}" />.
        </p>
        <Warn>
          A <M t="\sqrt{a^2}=|a|" /> egyenlőség mindig igaz, a <M t="\sqrt{a^2}=a" /> viszont csak ha <M t="a\ge0" />. Például{' '}
          <M t="\sqrt{(-4)^2}=\sqrt{16}=4=|-4|" />, nem <M t="-4" />.
        </Warn>

        <h3>Számolási szabályok</h3>
        <ul>
          <li><M t="|-a|=|a|" /></li>
          <li><M t="|ab|=|a|\,|b|" /></li>
          <li><M t="\left|\tfrac ab\right|=\tfrac{|a|}{|b|}" /> (ha <M t="b\ne0" />)</li>
          <li><M t="|a+b|\le|a|+|b|" /> (<strong>háromszög-egyenlőtlenség</strong>)</li>
        </ul>
        <p>
          Az utolsó szabály bizonyítása rövid. Mivel <M t="-|a|\le a\le|a|" /> és <M t="-|b|\le b\le|b|" />, ezeket összeadva
          <M block t="-(|a|+|b|)\le a+b\le |a|+|b|," />
          ami éppen azt jelenti, hogy <M t="|a+b|\le |a|+|b|" />. Az egyenlőség akkor áll fenn, ha <M t="a" /> és <M t="b" />{' '}
          előjele azonos (vagy az egyik 0). Különböző előjelnél a két szám részben kiolthatja egymást, ezért az összeg
          abszolútértéke kisebb.
        </p>

        <h3>Abszolútérték és intervallum</h3>
        <p>
          Legyen <M t="a>0" />. Az <M t="|x|<a" /> azt jelenti, hogy <M t="x" /> a 0-tól kisebb távolságra van, mint{' '}
          <M t="a" />, vagyis a <M t="-a" /> és az <M t="a" /> között helyezkedik el:
        </p>
        <table className="tbl">
          <tbody>
            <tr><td><M t="|x|=a" /></td><td><M t="\Leftrightarrow" /></td><td><M t="x=a" /> vagy <M t="x=-a" /></td></tr>
            <tr><td><M t="|x|<a" /></td><td><M t="\Leftrightarrow" /></td><td><M t="-a<x<a" /></td></tr>
            <tr><td><M t="|x|\le a" /></td><td><M t="\Leftrightarrow" /></td><td><M t="-a\le x\le a" /></td></tr>
            <tr><td><M t="|x|>a" /></td><td><M t="\Leftrightarrow" /></td><td><M t="x>a" /> vagy <M t="x<-a" /></td></tr>
            <tr><td><M t="|x|\ge a" /></td><td><M t="\Leftrightarrow" /></td><td><M t="x\ge a" /> vagy <M t="x\le -a" /></td></tr>
          </tbody>
        </table>
        <p>
          A <M t="\Leftrightarrow" /> jel jelentése „akkor és csak akkor”. Ugyanezek érvényesek az <M t="x" /> helyén álló
          bármilyen kifejezésre, így a <M t="|x-c|<r" /> a <M t="c" /> körüli, <M t="r" /> sugarú nyílt intervallumot adja.
        </p>

        <AbsWidget />
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Megoldott példák',
    body: (
      <>
        <p>
          Ha egy egyenlőtlenséget meg akarunk oldani, össze kell gyűjtenünk az összes olyan <M t="x" /> értéket, amely
          mellett igaz lesz. Ez a halmaz a gyakorlatban egy intervallum, vagy néhány intervallum egyesítése.
        </p>

        <h3>1. Lineáris egyenlőtlenség</h3>
        <M block t="3x+2\ge 5x-4" />
        <p>
          Kivonunk <M t="5x" />-et és <M t="2" />-t: <M t="-2x\ge -6" />. Mindkét oldalt <M t="-2" />-vel osztjuk, ezért
          a reláció megfordul: <M t="x\le 3" />. A megoldáshalmaz <M t="(-\infty;\,3]" />.
        </p>

        <h3>2. Törtes együtthatóval</h3>
        <M block t="\frac{2x+1}{3}<x-2" />
        <p>
          3-mal (pozitív szám) szorzunk: <M t="2x+1<3x-6" />, tehát <M t="7<x" />. A megoldás <M t="(7;\,\infty)" />.
        </p>

        <h3>3. Az ismeretlen a nevezőben</h3>
        <M block t="\frac{4}{x+1}\le 2" />
        <p>
          A tört csak <M t="x\neq-1" /> esetén értelmezett, és a nevező előjele számít, ezért két esetet különböztetünk meg.
        </p>
        <ul>
          <li>
            Ha <M t="x+1>0" /> (azaz <M t="x>-1" />): szorzunk a pozitív nevezővel, <M t="4\le 2(x+1)" />, így{' '}
            <M t="x\ge1" />. Ez az <M t="x>-1" /> feltétellel együtt <M t="x\ge 1" />.
          </li>
          <li>
            Ha <M t="x+1<0" /> (azaz <M t="x<-1" />): negatívval szorzunk, a reláció megfordul, <M t="4\ge 2(x+1)" />, így{' '}
            <M t="x\le 1" />. Ez az <M t="x<-1" /> feltétellel együtt <M t="x<-1" />.
          </li>
        </ul>
        <p>
          A megoldáshalmaz: <M t="(-\infty;\,-1)\cup[1;\,\infty)" />. Ellenőrzés: <M t="x=-2" />-nél a bal oldal{' '}
          <M t="-4\le 2" />, igaz. <M t="x=0" />-nál <M t="4\le2" />, hamis. <M t="x=1" />-nél <M t="2\le2" />, igaz.
        </p>

        <h3>4. Abszolútértékes egyenlet</h3>
        <M block t="|3x+1|=8" />
        <p>
          Ekkor <M t="3x+1=8" /> vagy <M t="3x+1=-8" />. Az első esetben <M t="x=\tfrac73" />, a másodikban <M t="x=-3" />.
        </p>

        <h3>5. Abszolútértékes egyenlőtlenségek</h3>
        <p>
          (a) <M t="|x-4|\le3" />: a 4-től legfeljebb 3 távolságra lévő számok, vagyis <M t="1\le x\le 7" />, az{' '}
          <M t="[1;\,7]" /> intervallum.
        </p>
        <NumberLine min={-1} max={9} segs={[{ from: 1, to: 7, fromClosed: true, toClosed: true }]} marks={[{ x: 4, label: '4' }]} />
        <p>
          (b) <M t="|2x+1|>5" />: vagy <M t="2x+1>5" />, azaz <M t="x>2" />, vagy <M t="2x+1<-5" />, azaz <M t="x<-3" />. A
          megoldás <M t="(-\infty;\,-3)\cup(2;\,\infty)" />.
        </p>

        <h3>6. Két abszolútérték összehasonlítása</h3>
        <M block t="|x+2|<|x-1|" />
        <p>
          Geometriai olvasat: azok az <M t="x" /> pontok kellenek, amelyek közelebb vannak a <M t="-2" />-höz, mint az{' '}
          <M t="1" />-hez. A két pont felezőpontja <M t="-\tfrac12" />, ennél balra vannak a közelebbi pontok, tehát{' '}
          <M t="x<-\tfrac12" />. Algebrailag: mindkét oldal nemnegatív, ezért négyzetre emelhetünk: <M t="x^2+4x+4<x^2-2x+1" />,
          amiből <M t="6x<-3" />, tehát <M t="x<-\tfrac12" />.
        </p>

        <h3>7. Másodfokú egyenlőtlenség</h3>
        <M block t="x^2-x-6<0" />
        <p>
          Szorzattá alakítunk: <M t="(x-3)(x+2)<0" />. A szorzat akkor negatív, ha a két tényező ellenkező előjelű. Ez csak a
          gyökök között teljesül, hiszen ott <M t="x-3<0" /> és <M t="x+2>0" />. A megoldás <M t="(-2;\,3)" />.
        </p>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Gyakorló feladatok',
    body: (
      <>
        <p>Próbáld meg előbb önállóan megoldani, a megoldást csak utána nyisd ki.</p>

        <Task
          n={1}
          q={
            <>
              Írd fel tizedes tört alakban az <M t="\tfrac{5}{12}" /> számot, és tört alakban a <M t="0{,}\overline{54}" /> számot.
            </>
          }
        >
          <p>
            Hosszú osztással <M t="\tfrac5{12}=0{,}41666\ldots=0{,}41\overline{6}" />. A második számra{' '}
            <M t="100x=54{,}\overline{54}" />, így <M t="99x=54" />, azaz <M t="x=\tfrac{54}{99}=\tfrac{6}{11}" />.
          </p>
        </Task>

        <Task
          n={2}
          q={
            <>
              Tudjuk, hogy <M t="-1<x<4" />. Add meg a legszűkebb intervallumot, amelyben a <M t="2x-3" /> és az{' '}
              <M t="\tfrac{1}{x+2}" /> kifejezés értéke biztosan benne van.
            </>
          }
        >
          <p>
            Szorzunk 2-vel: <M t="-2<2x<8" />, majd kivonunk 3-at: <M t="-5<2x-3<5" />.
          </p>
          <p>
            Az <M t="x+2" /> értéke <M t="1" /> és <M t="6" /> között van, vagyis pozitív. Pozitív számoknál a reciprok
            megfordítja a relációt: <M t="\tfrac16<\tfrac1{x+2}<1" />.
          </p>
        </Task>

        <Task n={3} q={<>Oldd meg: <M t="5-2x<3x+10" />.</>}>
          <p>
            Az <M t="x" />-es tagokat egy oldalra rendezve <M t="-5<5x" />, tehát <M t="x>-1" />. Megoldás: <M t="(-1;\,\infty)" />.
          </p>
        </Task>

        <Task n={4} q={<>Oldd meg: <M t="|5-2x|\le 7" />.</>}>
          <p>
            <M t="-7\le 5-2x\le 7" />. Kivonunk 5-öt: <M t="-12\le -2x\le 2" />. Osztunk <M t="-2" />-vel, a relációk megfordulnak:{' '}
            <M t="6\ge x\ge -1" />. Megoldás: <M t="[-1;\,6]" />. A végpontokra ellenőrzés: <M t="x=6" />-nál <M t="|-7|=7" />,{' '}
            <M t="x=-1" />-nél <M t="|7|=7" />.
          </p>
        </Task>

        <Task n={5} q={<>Oldd meg az <M t="|x|+|x-2|=4" /> egyenletet.</>}>
          <p>Az abszolútértékek előjelváltása a 0 és a 2 helyen van, ezért három tartományt vizsgálunk.</p>
          <ul>
            <li>
              <M t="x<0" />: <M t="-x+(2-x)=4" />, <M t="2-2x=4" />, <M t="x=-1" />. Ez valóban a tartományban van.
            </li>
            <li>
              <M t="0\le x<2" />: <M t="x+(2-x)=2\neq4" />. Itt nincs megoldás.
            </li>
            <li>
              <M t="x\ge2" />: <M t="x+(x-2)=4" />, <M t="x=3" />. Ez is megfelel.
            </li>
          </ul>
          <p>Megoldások: <M t="x=-1" /> és <M t="x=3" />. Geometriailag: azok a pontok, amelyeknek a 0-tól és a 2-től mért távolságának összege 4.</p>
        </Task>

        <Task n={6} q={<>Bizonyítsd be, hogy tetszőleges valós <M t="a,b" /> esetén <M t="\big||a|-|b|\big|\le |a-b|" />.</>}>
          <p>
            A háromszög-egyenlőtlenséget alkalmazzuk az <M t="a=(a-b)+b" /> felbontásra:{' '}
            <M t="|a|\le|a-b|+|b|" />, vagyis <M t="|a|-|b|\le|a-b|" />. Az <M t="a" /> és <M t="b" /> szerepét felcserélve{' '}
            <M t="|b|-|a|\le|b-a|=|a-b|" />. A két egyenlőtlenség együtt azt jelenti, hogy <M t="|a|-|b|" /> és az ellentettje is
            legfeljebb <M t="|a-b|" />, ez pedig éppen a bizonyítandó állítás.
          </p>
        </Task>
      </>
    ),
  },
];
