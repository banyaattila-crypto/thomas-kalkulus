import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import { FuncMachineWidget } from '../components/FuncMachineWidget';
import { DomainWidget } from '../components/DomainWidget';
import { SampleWidget } from '../components/SampleWidget';
import { VerticalWidget } from '../components/VerticalWidget';
import { PiecewiseWidget } from '../components/PiecewiseWidget';
import { Plane, PEnd, PFunc } from '../components/Plane';
import type { Page } from './s1_1';

/** Nyíldiagram a négyzetre emelés hozzárendelésről. */
function ArrowDiagram() {
  const L = [-2, -1, 1, 2];
  const R = [1, 4, 9];
  const ly = (i: number) => 40 + i * 44;
  const ry = (v: number) => 40 + R.indexOf(v) * 58;
  return (
    <svg viewBox="0 0 380 230" className="arrowdiag" role="img" aria-label="nyíldiagram az x négyzete függvényről">
      <ellipse cx={90} cy={105} rx={55} ry={100} className="ad-set" />
      <ellipse cx={290} cy={105} rx={55} ry={100} className="ad-set" />
      <text x={90} y={14} textAnchor="middle" className="ad-cap">D</text>
      <text x={290} y={14} textAnchor="middle" className="ad-cap">Y</text>
      {L.map((v, i) => (
        <g key={v}>
          <line x1={112} y1={ly(i)} x2={266} y2={ry(v * v)} className="ad-arrow" />
          <circle cx={90} cy={ly(i)} r={4} fill="#fb923c" />
          <text x={72} y={ly(i) + 5} textAnchor="end" className="ad-t">{String(v).replace('-', '−')}</text>
        </g>
      ))}
      {R.map((v) => (
        <g key={v}>
          <circle cx={290} cy={ry(v)} r={4} fill={L.some((u) => u * u === v) ? '#34d399' : '#64748b'} />
          <text x={308} y={ry(v) + 5} className="ad-t">{v}</text>
        </g>
      ))}
    </svg>
  );
}

/** Kihűlési példaadatok pontdiagramja (kitalált értékek). */
function ScatterTea() {
  const t = [0, 2, 4, 6, 8, 10];
  const T = [90, 72, 60, 52, 46, 42];
  const X = (v: number) => 50 + v * 28;
  const Y = (v: number) => 190 - (v - 30) * 2.6;
  return (
    <svg viewBox="0 0 380 220" className="scatter" role="img" aria-label="tea kihűlése">
      <line x1={50} y1={190} x2={350} y2={190} className="pl-axis" />
      <line x1={50} y1={20} x2={50} y2={190} className="pl-axis" />
      {t.map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={190} x2={X(v)} y2={194} className="pl-axis" />
          <text x={X(v)} y={208} textAnchor="middle" className="pl-tick">{v}</text>
        </g>
      ))}
      {[40, 60, 80].map((v) => (
        <g key={v}>
          <line x1={46} y1={Y(v)} x2={350} y2={Y(v)} className="pl-grid" />
          <text x={42} y={Y(v) + 4} textAnchor="end" className="pl-tick">{v}</text>
        </g>
      ))}
      <polyline points={t.map((v, i) => `${X(v)},${Y(T[i])}`).join(' ')} className="pl-dash2" />
      {t.map((v, i) => (
        <circle key={v} cx={X(v)} cy={Y(T[i])} r={5} fill="#fbbf24" />
      ))}
      <text x={350} y={186} textAnchor="end" className="pl-axname">perc</text>
      <text x={58} y={26} className="pl-axname">°C</text>
    </svg>
  );
}

export const S1_3: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Mi a függvény?',
    body: (
      <>
        <Story>
          <p>
            Egy taxi számlálója 600 forintról indul, és kilométerenként 300 forinttal nő. Ha tudod, hány kilométert mentél,
            a fizetendő összeg már nem lehet kérdés: <M t="y=600+300x" />. Nincs két különböző végösszeg ugyanarra az útra.
            Ez a „pontosan egy” az, ami a függvényfogalom lényege.
          </p>
        </Story>
        <p>
          Az analízis tárgya a változó mennyiségek közti kapcsolat. Ha az <M t="y" /> mennyiség értékét egyedül az{' '}
          <M t="x" /> mennyiség értéke dönti el, akkor <M t="y" />-t az <M t="x" /> <strong>függvényének</strong> nevezzük. A kapcsolatot
          gyakran szabály adja meg, ilyen a kör területe a sugár függvényében: <M t="T=\pi r^2" />. A szabály megmondja, mit
          kell kiszámítani a sugárból.
        </p>
        <Def title="Függvény">
          Legyen <M t="D" /> és <M t="Y" /> két halmaz. <M t="D" />-ből <M t="Y" />-ba képező <strong>függvény</strong> az a
          szabály, amely <M t="D" /> minden <M t="x" /> eleméhez <em>pontosan egy</em> <M t="f(x)" /> elemet rendel{' '}
          <M t="Y" />-ból. Jelölés: <M t="y=f(x)" />.
        </Def>
        <ul>
          <li>
            <M t="x" /> a <strong>független változó</strong> (bemenet), <M t="y" /> a <strong>függő változó</strong>{' '}
            (kimenet).
          </li>
          <li>
            A bemenetek halmaza az <strong>értelmezési tartomány</strong>, jele <M t="D(f)" />. A felvett kimenetek halmaza az{' '}
            <strong>értékkészlet</strong>, jele <M t="R(f)" />.
          </li>
          <li>
            Az <M t="Y" /> halmaznak lehetnek olyan elemei, amelyeket a függvény nem vesz fel, ezért <M t="R(f)\subseteq Y" />.
          </li>
        </ul>
        <p>
          Az analízisben főleg olyan függvényekkel dolgozunk, amelyeknek mindkét halmaza valós számokból áll. A több
          változós függvényekre később (13–16. fejezet) kerül sor.
        </p>

        <h3>Az automata-kép</h3>
        <p>
          Gondolj egy függvényre úgy, mint egy automatára: bedobod az <M t="x" /> értéket, kijön az <M t="f(x)" />. A
          számológép gyökvonás gombja is ilyen: ha nemnegatív számot adsz neki, kiírja a gyökét. Ha olyat, amire a szabály
          nem ad valós eredményt, az automata elakad.
        </p>
        <FuncMachineWidget />

        <h3>Nyíldiagram</h3>
        <p>
          A hozzárendelést nyilakkal is rajzolhatjuk. Az ábra az <M t="x\mapsto x^2" /> hozzárendelést szemlélteti a{' '}
          <M t="D=\{-2;-1;1;2\}" /> halmazon, <M t="Y=\{1;4;9\}" /> célhalmazzal.
        </p>
        <ArrowDiagram />
        <p className="hint">
          Minden <M t="D" />-beli pontból pontosan egy nyíl indul. Két pontból is mutathat nyíl ugyanarra az értékre
          (itt −2 és 2 is a 4-be), ez megengedett. A 9-be viszont nem mutat nyíl: ez <M t="Y" />-nak eleme, de nem tartozik az
          értékkészlethez, ami itt <M t="R(f)=\{1;4\}" />.
        </p>
        <Warn>
          Az egy bemenethez tartozó kimenet egyértelmű, fordítva viszont nem kell annak lennie. Egy függvény két különböző{' '}
          <M t="x" />-hez rendelhet ugyanazt az <M t="y" />-t, de egyetlen <M t="x" />-hez sosem rendelhet két értéket.
        </Warn>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Értelmezési tartomány és értékkészlet',
    body: (
      <>
        <p>
          Ha egy függvényt csak képlettel adunk meg, és nem mondjuk meg a tartományát, akkor a <strong>természetes
          értelmezési tartományt</strong> értjük alatta: a valós számok azon legbővebb halmazát, amelyre a képlet valós
          számot ad. Ha ennél szűkebb tartományt akarunk, azt külön ki kell kötni, például{' '}
          <M t="y=x^2,\ -1\le x\le3" />.
        </p>
        <p>Két tipikus akadály szűkíti a természetes tartományt:</p>
        <ul>
          <li>nullával nem osztunk, tehát a nevező nem lehet 0;</li>
          <li>páros kitevős gyök alatt nem állhat negatív szám.</li>
        </ul>
        <p>
          Amikor a tartományt változtatjuk, az értékkészlet is változhat. Az <M t="y=x^2" /> függvény értékkészlete a teljes
          valós számegyenesen <M t="[0;\,\infty)" />, de a <M t="-1\le x\le3" /> tartományon már <M t="[0;\,9]" />. A 0 a
          tartomány belsejében fekvő <M t="x=0" />-nál adódik, a 9 pedig a távolabbi végponton, <M t="x=3" />-nál.
        </p>

        <h3>Gyakorlati tartomány</h3>
        <p>
          Szöveges feladatokban a tartományt a helyzet is korlátozza. Egy 40 cm kerületű téglalap egyik oldala <M t="a" />, a
          másik <M t="20-a" />, a területe <M t="A(a)=a(20-a)" />. A képlet bármely valós <M t="a" />-ra értelmes volna, de
          oldalhossz csak pozitív lehet, és a másik oldal is: <M t="0<a<20" />. Az értékkészlet <M t="(0;\,100]" />, a
          maximum az <M t="a=10" /> négyzetnél adódik (<M t="a(20-a)=100-(a-10)^2" />).
        </p>

        <h3>Egy részletesen kidolgozott példa</h3>
        <p>
          Határozzuk meg a <M t="h(x)=\dfrac{\sqrt{x+2}}{x-1}" /> természetes tartományát.
        </p>
        <ul>
          <li>A gyök miatt <M t="x+2\ge0" />, azaz <M t="x\ge-2" />.</li>
          <li>A nevező miatt <M t="x\ne1" />.</li>
        </ul>
        <p>
          A kettő együtt: <M t="D(h)=[-2;\,1)\cup(1;\,\infty)" />. A „kihagyott” 1 az intervallumot két részre vágja, ezért
          kell az unió jel.
        </p>
        <DomainWidget />
        <p className="hint">
          Az ábrán az értelmezési tartomány az x-tengely, az értékkészlet az y-tengely mentén van jelölve. Az utolsó két
          függvénynél (<M t="\tfrac{1}{x^2-4}" /> és <M t="\sqrt{x^2-1}" />) a tartomány több darabból áll.
        </p>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A függvény grafikonja',
    body: (
      <>
        <Def title="Grafikon">
          Az <M t="f" /> függvény <strong>grafikonját</strong> azok a síkbeli pontok alkotják, amelyeknek
          koordinátái összetartozó bemenet–kimenet párok:
          <M block t="\{(x;\,f(x)) : x\in D(f)\}." />
        </Def>
        <p>
          Ha az <M t="(x;\,y)" /> pont a grafikon eleme, akkor <M t="y=f(x)" /> a pont magassága az{' '}
          <M t="x" /> hely fölött. Ez a magasság negatív is lehet, ilyenkor a pont az x-tengely alatt van.
        </p>

        <h3>Grafikon rajzolása pontokból</h3>
        <p>Vázoljuk az <M t="f(x)=x^2-2" /> grafikonját a <M t="[-2;\,3]" /> intervallumon, három lépésben:</p>
        <ol>
          <li>táblázatot készítünk néhány <M t="x" /> értékre;</li>
          <li>a táblázat pontjait felvesszük a koordináta-rendszerben;</li>
          <li>a pontokat folytonos vonallal összekötjük.</li>
        </ol>
        <table className="tbl">
          <thead>
            <tr><th><M t="x" /></th><th>−2</th><th>−1</th><th>0</th><th>1</th><th>2</th><th>3</th></tr>
          </thead>
          <tbody>
            <tr><td><M t="f(x)" /></td><td>2</td><td>−1</td><td>−2</td><td>−1</td><td>2</td><td>7</td></tr>
          </tbody>
        </table>
        <p>
          Honnan tudjuk, hogy a pontok között valóban sima ív van, és nem hullámzik a görbe? A pontos választ a 4. fejezet
          adja majd, a derivált segítségével. Egyelőre az a gyakorlati szabály, hogy minél sűrűbben mintavételezünk, annál
          megbízhatóbb a kép. Próbáld ki:
        </p>
        <SampleWidget />

        <h3>Numerikusan megadott függvény</h3>
        <p>
          A függvényeket nemcsak képlettel és grafikonnal lehet megadni, hanem <strong>értéktáblázattal</strong> is. Mérésnél
          ez a természetes forma. Ha csak a táblázat pontjait rajzoljuk ki, <strong>pontdiagramot</strong> kapunk. Példa (a
          számok szemléltető jellegűek): egy csésze tea hőmérséklete a kitöltés óta eltelt idő függvényében.
        </p>
        <table className="tbl">
          <thead>
            <tr><th>idő (perc)</th><th>0</th><th>2</th><th>4</th><th>6</th><th>8</th><th>10</th></tr>
          </thead>
          <tbody>
            <tr><td>hőmérséklet (°C)</td><td>90</td><td>72</td><td>60</td><td>52</td><td>46</td><td>42</td></tr>
          </tbody>
        </table>
        <ScatterTea />
        <p className="hint">
          A szaggatott vonal csak szemléltet: a mérések között nem tudjuk biztosan, mi történt, a görbe a pontokra illesztett
          becslés. Az, hogy a lehűlés lassul, jól látszik: az első két percben 18 fokot csökken a hőmérséklet, az utolsó két
          percben már csak 4-et.
        </p>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'A vertikális teszt',
    body: (
      <>
        <p>
          Nem minden görbe lehet függvény grafikonja. A függvény minden <M t="x" />-hez legfeljebb egy értéket rendel, tehát a
          grafikonját egy függőleges egyenes legfeljebb egy pontban metszheti. Ez a <strong>vertikális teszt</strong>:
        </p>
        <Def title="Vertikális teszt">
          Egy síkbeli alakzat akkor és csak akkor lehet egy <M t="y=f(x)" /> függvény grafikonja, ha minden függőleges egyenes
          legfeljebb egy pontban metszi.
        </Def>
        <p>
          Az <M t="x=a" /> egyenes pontosan akkor metszi a grafikont, ha <M t="a" /> eleme az értelmezési tartománynak, és ekkor a
          metszéspont <M t="(a;\,f(a))" />.
        </p>

        <h3>A kör nem függvény, de két függvényből áll</h3>
        <p>
          Az <M t="x^2+y^2=9" /> körön az <M t="x=2" /> egyeneshez két pont tartozik, <M t="y=\pm\sqrt5" />. Ezért a kör nem
          grafikonja semmilyen <M t="y=f(x)" /> függvénynek. Ha viszont <M t="y" />-t kifejezzük, két ágat kapunk:
        </p>
        <M block t="y=\sqrt{9-x^2}\ \ (\text{felső félkör}),\qquad y=-\sqrt{9-x^2}\ \ (\text{alsó félkör}),\qquad -3\le x\le3." />
        <p>Mindkét félkör már átmegy a teszten, mindkettő külön függvény.</p>
        <VerticalWidget />
        <p className="hint">
          Az <M t="x=y^2" /> görbe az <M t="x" />-et fejezi ki az <M t="y" /> függvényeként, ezért az <M t="x" /> szerinti vertikális teszten
          elbukik: minden pozitív <M t="x" />-hez két <M t="y" /> tartozik.</p>
        <Warn>
          A tesztet a <em>teljes</em> alakzatra kell alkalmazni, nem elég egyetlen függőleges egyenest kipróbálni. Az{' '}
          <M t="y=x^2-2" /> parabolát minden függőleges egyenes egy pontban metszi, ezért átmegy, a kör viszont elbukik: a belsejében
          haladó függőleges egyenesek mindegyike két pontban metszi.
        </Warn>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Szakaszonként definiált függvények',
    body: (
      <>
        <p>
          Gyakran az értelmezési tartomány különböző részein különböző képlet ad értéket. Ilyen az{' '}
          <strong>abszolútérték-függvény</strong>:
        </p>
        <M block t="|x|=\begin{cases}x,&x\ge0\\-x,&x<0.\end{cases}" />
        <p>
          Egyetlen függvény, amelynek a hozzárendelési szabálya két darabból áll. A grafikonja két félegyenesből álló „V”.
        </p>

        <h3>Egy saját példa</h3>
        <p>
          Legyen
          <M block t="g(x)=\begin{cases}x+3,&x<-1\\2,&-1\le x\le1\\4-x,&x>1.\end{cases}" />
          A <M t="-1" />-nél a bal oldali ág értéke <M t="-1+3=2" />, és ez megegyezik a középső szakasz értékével, így itt
          nincs ugrás. Az <M t="x=1" />-nél viszont a középső ág értéke 2, a jobb oldali ág a 3-hoz tart: ott a grafikon egyet
          ugrik, és az üres pont mutatja, hogy a (1; 3) pont <em>nem</em> tartozik a grafikonhoz.
        </p>

        <h3>Egészrész-függvények</h3>
        <p>
          Az <strong>alsó egészrész</strong> <M t="\lfloor x\rfloor" /> az <M t="x" />-nél nem nagyobb egészek közül a
          legnagyobb, a <strong>felső egészrész</strong> <M t="\lceil x\rceil" /> az <M t="x" />-nél nem kisebb egészek közül a
          legkisebb. Néhány érték:
        </p>
        <table className="tbl">
          <thead>
            <tr><th><M t="x" /></th><th>3,7</th><th>3</th><th>−1,2</th><th>−0,5</th></tr>
          </thead>
          <tbody>
            <tr><td><M t="\lfloor x\rfloor" /></td><td>3</td><td>3</td><td>−2</td><td>−1</td></tr>
            <tr><td><M t="\lceil x\rceil" /></td><td>4</td><td>3</td><td>−1</td><td>0</td></tr>
          </tbody>
        </table>
        <Warn>
          Negatív számnál az alsó egészrész nem „a tizedesek elhagyása”: <M t="\lfloor -1{,}2\rfloor=-2" />, mert a −2 a
          legnagyobb egész, amely nem nagyobb −1,2-nél.
        </Warn>
        <p>
          A felső egészrész természetes alkalmazása a „megkezdett egységek” díjszabása. Ha egy parkoló minden megkezdett órára
          400 forintot kér, akkor <M t="t" /> óra parkolás ára <M t="C(t)=400\lceil t\rceil" />, <M t="t>0" />. Két óra pontosan 800
          Ft, két óra egy perc már 1200 Ft.
        </p>
        <PiecewiseWidget />

        <h3>Képlet felírása grafikonból</h3>
        <p>
          Tegyük fel, hogy a grafikon két szakaszból áll: az <M t="(0;\,1)" /> pontból (ez a grafikon pontja) a <M t="(2;\,3)" />{' '}
          pontig (ez már nem pontja), majd a <M t="(2;\,0)" /> pontból (pontja) a <M t="(4;\,2)" /> pontig (pontja).
        </p>
        <ul>
          <li>
            Az első szakasz meredeksége <M t="\tfrac{3-1}{2-0}=1" />, az <M t="y" />-tengelymetszet 1, egyenlete <M t="y=x+1" />,
            és az <M t="x" /> értéke 0-tól 2-ig, a 2-t kivéve: <M t="0\le x<2" />.
          </li>
          <li>
            A második szakasz meredeksége <M t="\tfrac{2-0}{4-2}=1" />, és átmegy a <M t="(2;\,0)" /> ponton: <M t="y=x-2" />,{' '}
            <M t="2\le x\le4" />.
          </li>
        </ul>
        <M block t="f(x)=\begin{cases}x+1,&0\le x<2\\x-2,&2\le x\le4.\end{cases}" />
        <p className="hint">
          Az egyenlőtlenségek jeleinél a lényeg: minden <M t="x" /> pontosan egy ágba essen. A tartományok se ne fedjék át
          egymást, se ne hagyjanak lyukat.
        </p>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Gyakorló feladatok',
    body: (
      <>
        <p>Próbáld meg előbb önállóan megoldani, a megoldást csak utána nyisd ki.</p>

        <Task n={1} q={<>Add meg az értelmezési tartományt és az értékkészletet: (a) <M t="f(x)=\sqrt{x+4}" />; (b) <M t="h(x)=\dfrac{3}{x-2}" />.</>}>
          <p>
            (a) <M t="x+4\ge0" />, tehát <M t="D=[-4;\,\infty)" />. A gyök értéke bármely nemnegatív szám lehet: <M t="R=[0;\,\infty)" />.
          </p>
          <p>
            (b) A nevező miatt <M t="x\ne2" />, <M t="D=\mathbb{R}\setminus\{2\}" />. Egy <M t="y\ne0" /> értéket felvesz{' '}
            <M t="x=2+\tfrac3y" />-nál, a 0-t viszont soha (a tört számlálója 3), ezért <M t="R=\mathbb{R}\setminus\{0\}" />.
          </p>
        </Task>

        <Task n={2} q={<>Add meg az <M t="f(x)=\dfrac{\sqrt{x-1}}{x^2-9}" /> természetes értelmezési tartományát.</>}>
          <p>
            A gyök miatt <M t="x\ge1" />. A nevező <M t="x^2-9=0" /> ott, ahol <M t="x=\pm3" />; ezek közül csak a 3 esik a{' '}
            <M t="[1;\infty)" /> félegyenesre. Tehát <M t="D=[1;\,3)\cup(3;\,\infty)" />.
          </p>
        </Task>

        <Task n={3} q={<>Egy téglalap kerülete 40 cm. Írd fel a területét az egyik oldal, <M t="a" /> függvényében, add meg a tartományt és az értékkészletet.</>}>
          <p>
            A másik oldal <M t="20-a" />, így <M t="A(a)=a(20-a)" />. Mindkét oldal pozitív: <M t="D=(0;\,20)" />. Mivel{' '}
            <M t="A=100-(a-10)^2" />, a legnagyobb érték 100 (<M t="a=10" />-nél), és a 0-hoz tetszőlegesen közel kerül, de el nem éri:{' '}
            <M t="R=(0;\,100]" />.
          </p>
        </Task>

        <Task n={4} q={<>Egy 20 cm × 30 cm-es lemez négy sarkából egy-egy <M t="x" /> cm oldalú négyzetet kivágunk, a maradékból nyitott dobozt hajtunk. Fejezd ki a doboz térfogatát <M t="x" /> függvényében, és add meg a tartományt.</>}>
          <p>
            Az alap oldalai <M t="20-2x" /> és <M t="30-2x" />, a magasság <M t="x" />: <M t="V(x)=x(20-2x)(30-2x)" />. Az alapélek
            pozitívak, ha <M t="x<10" />, és <M t="x>0" />: <M t="D=(0;\,10)" />. Például <M t="x=3" />-nál{' '}
            <M t="V=3\cdot14\cdot24=1008\ \text{cm}^3" />.
          </p>
        </Task>

        <Task n={5} q={<>Az <M t="x^2+y^2=25" /> egyenlet meghatározza-e <M t="y" />-t mint <M t="x" /> függvényét? Ha nem, hogyan lehet belőle két függvényt készíteni?</>}>
          <p>
            Nem: az <M t="x=3" />-hoz <M t="y=4" /> és <M t="y=-4" /> is tartozik, vagyis a vertikális teszt elbukik. Két függvény:{' '}
            <M t="y=\sqrt{25-x^2}" /> (felső félkör) és <M t="y=-\sqrt{25-x^2}" /> (alsó félkör), mindkettőnek a tartománya{' '}
            <M t="[-5;\,5]" />.
          </p>
        </Task>

        <Task
          n={6}
          q={
            <>
              Add meg az ábrán rajzolt, két szakaszból álló függvény képletét.
              <Plane xmin={-4} xmax={5} ymin={-3} ymax={4}>
                {(m) => (
                  <>
                    <PFunc map={m} fn={(x) => x + 2} from={-2} to={0} n={20} />
                    <PFunc map={m} fn={(x) => 1 - x} from={0} to={3} n={20} />
                    <PEnd map={m} x={-2} y={0} closed />
                    <PEnd map={m} x={0} y={2} closed={false} />
                    <PEnd map={m} x={0} y={1} closed />
                    <PEnd map={m} x={3} y={-2} closed />
                  </>
                )}
              </Plane>
            </>
          }
        >
          <p>
            Bal szakasz: a (−2; 0) és (0; 2) pontokon át, meredekség 1, egyenlet <M t="y=x+2" />, a jobb végpont nem pontja a
            grafikonnak: <M t="-2\le x<0" />. Jobb szakasz: a (0; 1) és (3; −2) pontokon át, meredekség <M t="\tfrac{-2-1}{3-0}=-1" />,
            egyenlet <M t="y=1-x" />, mindkét végpont pontja a grafikonnak: <M t="0\le x\le3" />.
          </p>
          <M block t="f(x)=\begin{cases}x+2,&-2\le x<0\\1-x,&0\le x\le3.\end{cases}" />
        </Task>

        <Task n={7} q={<>Számítsd ki: <M t="\lfloor-2{,}5\rfloor" />, <M t="\lceil-2{,}5\rceil" />, <M t="\lceil-0{,}3\rceil" />, <M t="\lfloor4\rfloor" />. Milyen értékeket vehet fel a <M t="\lceil x\rceil-\lfloor x\rfloor" /> különbség?</>}>
          <p>
            <M t="\lfloor-2{,}5\rfloor=-3" />, <M t="\lceil-2{,}5\rceil=-2" />, <M t="\lceil-0{,}3\rceil=0" />, <M t="\lfloor4\rfloor=4" />. Ha{' '}
            <M t="x" /> egész, akkor <M t="\lceil x\rceil=\lfloor x\rfloor=x" /> és a különbség 0. Ha nem egész, a két egészrész
            szomszédos egész szám, a különbség 1. Az értékkészlet tehát <M t="\{0;\,1\}" />.
          </p>
        </Task>

        <Task n={8} q={<>Egy parkoló minden megkezdett órára 400 Ft-ot kér. Írd fel a díjat az idő függvényében, és számítsd ki 0,5 óra, 2 óra, 2,1 óra és 3 óra díját.</>}>
          <p>
            <M t="C(t)=400\lceil t\rceil" />, <M t="t>0" />. Értékek: <M t="C(0{,}5)=400\cdot1=400" />, <M t="C(2)=800" />, <M t="C(2{,}1)=400\cdot3=1200" />,{' '}
            <M t="C(3)=1200" />. A grafikon lépcsős: minden egész óra elérése után ugrik 400 Ft-ot, az ugrás előtti szakasz végpontja a
            grafikon része (zárt), a következő szakasz kezdőpontja nem (nyílt).
          </p>
        </Task>
      </>
    ),
  },
];
