import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  ConvexityOverUnderWidget,
  MidpointTangentDiagram,
  NumericalMethodsSummaryDiagram,
  RealWorldDataSimpsonWidget,
  SimpsonRuleWidget,
  TrapezoidErrorBoundWidget,
  TrapezoidRuleWidget,
  TrapezoidVsSimpsonRaceWidget,
} from '../components/Widgets87';
import type { Page } from './s1_1';

export const S8_7: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Miért kell numerikus integrálás? A trapézformula',
    body: (
      <>
        <Story>
          <p>
            A 8.6-ban láttuk, hogy sok fontos függvénynek (<M t="e^{-x^2}" />, <M t="\sin(x^2)" />,{' '}
            <M t="\frac{\sin x}{x}" />) nincs elemi primitív függvénye. A valós mérnöki munkában ráadásul
            gyakran egyáltalán nincs is képletünk — csak szenzorokból származó mérési pontjaink! A{' '}
            <strong>numerikus integrálás</strong> mindkét problémát megoldja: az intervallumot sávokra osztja,
            és egyszerű alakzatokkal (trapézokkal vagy parabolákkal) közelíti a területet.
          </p>
        </Story>

        <Def title="A trapézformula">
          <p>
            Osszuk fel az <M t="[a, b]" /> intervallumot <M t="n" /> egyenlő, <M t="\Delta x = \frac{b-a}{n}" />{' '}
            szélességű részre az <M t="x_0=a,\; x_1,\; \dots,\; x_n=b" /> osztópontokkal, és legyen{' '}
            <M t="y_i = f(x_i)" />. Ekkor a trapézok területösszege:
          </p>
          <M block t="T = \frac{\Delta x}{2}\big(y_0 + 2y_1 + 2y_2 + \dots + 2y_{n-1} + y_n\big)." />
        </Def>

        <p>
          Miért <M t="1, 2, 2, \dots, 2, 1" /> a súlyminta? Mert az <M t="i" />-edik trapéz területe{' '}
          <M t="\frac{\Delta x}{2}(y_{i-1}+y_i)" />, így minden <strong>belső</strong> magasság (<M t="y_1, \dots, y_{n-1}" />)
          két szomszédos trapézhoz is tartozik, míg a két szélső (<M t="y_0, y_n" />) csak egyszer szerepel!
        </p>

        <p>
          <strong>Thomas 1. példa:</strong> Közelítsük az <M t="\int_1^2 x^2\,dx" /> integrált <M t="n=4" />{' '}
          trapézzal (<M t="\Delta x = \frac{1}{4}" />)! Az osztópontok <M t="1,\; \frac{5}{4},\; \frac{6}{4},\; \frac{7}{4},\; 2" />:
        </p>
        <M block t="T_4 = \frac{1/4}{2}\left(1 + 2\cdot\frac{25}{16} + 2\cdot\frac{36}{16} + 2\cdot\frac{49}{16} + 4\right) = \frac{75}{32} = 2{,}34375." />
        <p>
          A pontos érték <M t="\frac{7}{3} \approx 2{,}33333" />, tehát a relatív hiba mindössze{' '}
          <strong>0,446%</strong>!
        </p>

        <TrapezoidRuleWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={<>Számítsd ki a trapézformulával az <M t="\int_0^2 x^2\,dx" /> integrál közelítő értékét <M t="n=2" /> és <M t="n=4" /> esetén! Hányadára csökken a hiba?</>}
        >
          <p>
            Pontos érték <M t="\frac{8}{3}\approx 2{,}6667" />. <M t="n=2" /> (<M t="\Delta x=1" />):{' '}
            <M t="T_2 = \frac{1}{2}(0 + 2\cdot 1 + 4) = 3" /> (hiba <M t="\frac{1}{3}" />).{' '}
            <M t="n=4" /> (<M t="\Delta x=0{,}5" />):{' '}
            <M t="T_4 = \frac{0{,}5}{2}(0 + 2\cdot 0{,}25 + 2\cdot 1 + 2\cdot 2{,}25 + 4) = 2{,}75" /> (hiba{' '}
            <M t="\frac{1}{12}" /> — pontosan <strong>negyedére</strong> csökkent!).
          </p>
        </Task>
        <Task
          n={2}
          q={<>Miért ad a trapézformula <strong>teljesen pontos</strong> eredményt minden elsőfokú <M t="f(x)=mx+b" /> függvényre már <M t="n=1" /> mellett is?</>}
        >
          <p>
            Mert az egyenes grafikonja alatti idom pontosan egy trapéz (illetve <M t="f''(x)\equiv 0" />, így a
            hibatag pontosan <M t="0" />).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Konvexitás, előjel és mért adatok',
    body: (
      <>
        <p>
          Sokszor számolás nélkül is meg tudjuk mondani, hogy a trapézformula <em>túl sokat</em> vagy{' '}
          <em>túl keveset</em> ad-e: a görbe görbülete (<M t="f''(x)" /> előjele) azonnal elárulja!
        </p>

        <ConvexityOverUnderWidget />

        <Def title="Thomas 2. példa — Átlaghőmérséklet mérési táblázatból">
          <p>
            Egy őszi napon déltől éjfélig óránként (<M t="\Delta t = 1\text{ óra}" />) mértük a hőmérsékletet
            (13 mérés): <M t="17, 19, 20, 21, 21, 20, 20, 20, 19, 18, 16, 15, 13\;^\circ\text{C}" />.
          </p>
          <M block t="T = \frac{1}{2}\big(17 + 2(19+20+21+21+20+20+20+19+18+16+15) + 13\big) = 224." />
          <p>
            A 12 órás átlaghőmérséklet: <M t="\frac{1}{12}\int_{12}^{24} f(t)\,dt \approx \frac{224}{12} \approx \mathbf{18{,}67\;^\circ\text{C}}" />.
            Figyeld meg: ez <em>nem</em> egyenlő a 13 szám sima számtani átlagával (<M t="18{,}38\;^\circ\text{C}" />),
            mert a trapézformula a két szélső mérést fél súllyal veszi figyelembe!
          </p>
        </Def>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={<>Felül- vagy alulbecsli a trapézformula a következő integrálokat: (a) <M t="\int_0^\pi \sin x\,dx" />, (b) <M t="\int_0^1 e^x\,dx" />, (c) <M t="\int_1^3 \ln x\,dx" />?</>}
        >
          <p>
            (a) <M t="(\sin x)'' = -\sin x \le 0" /> (konkáv) → <strong>alulbecsül</strong>. (b){' '}
            <M t="(e^x)'' = e^x > 0" /> (konvex) → <strong>felülbecsül</strong>. (c){' '}
            <M t="(\ln x)'' = -1/x^2 < 0" /> (konkáv) → <strong>alulbecsül</strong>.
          </p>
        </Task>
        <Task
          n={4}
          q={<>Egy autó sebességét 2 másodpercenként mértük: <M t="v(0)=0,\; v(2)=6,\; v(4)=10,\; v(6)=12\text{ m/s}" />. Becsüld meg a 6 másodperc alatt megtett utat a trapézformulával!</>}
        >
          <p>
            <M t="\Delta t = 2" />: <M t="T = \frac{2}{2}(0 + 2\cdot 6 + 2\cdot 10 + 12) = 44\text{ m}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'A trapézformula hibabecslése és a szükséges n',
    body: (
      <>
        <p>
          A numerikus módszerek igazi ereje nem az, hogy adnak egy számot, hanem az, hogy{' '}
          <strong>garantálni tudjuk a pontosságát</strong> még akkor is, ha a pontos értéket egyáltalán nem
          ismerjük!
        </p>

        <Def title="A trapézformula hibabecslése">
          <p>
            Ha <M t="f''" /> folytonos <M t="[a, b]" />-n, és <M t="|f''(x)| \le M" /> minden <M t="x\in[a,b]" />-re,
            akkor a <M t="T_n" /> trapéz-közelítés <M t="E_T = \int_a^b f(x)\,dx - T_n" /> hibájára teljesül:
          </p>
          <M block t="|E_T| \le \frac{M(b-a)^3}{12n^2}." />
        </Def>

        <p>
          <strong>Kidolgozott példa (Thomas 3–4. példa mintájára):</strong> Hány részintervallumot válasszunk,
          hogy az <M t="\int_1^2 \frac{1}{x}\,dx = \ln 2" /> trapéz-közelítésének hibája garantáltan kisebb
          legyen <M t="10^{-4}" />-nél?
        </p>
        <p>
          Először megkeressük a második derivált maximumát <M t="[1,2]" />-n:{' '}
          <M t="f'(x) = -x^{-2},\; f''(x) = 2x^{-3}" />. Ez <M t="[1,2]" />-n csökkenő, így maximuma{' '}
          <M t="x=1" />-nél van: <M t="M = 2" />. Behelyettesítve (<M t="b-a=1" />):
        </p>
        <M block t="\frac{2\cdot 1^3}{12n^2} \le 10^{-4} \iff n^2 \ge \frac{20\,000}{12} \approx 1666{,}7 \implies n \ge 41." />

        <TrapezoidErrorBoundWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={<>Adj felső korlátot az <M t="\int_0^1 e^{-x^2}\,dx" /> trapéz-közelítésének hibájára <M t="n=10" /> esetén! (Segítség: <M t="(e^{-x^2})'' = (4x^2-2)e^{-x^2}" />.)</>}
        >
          <p>
            <M t="[0,1]" />-en <M t="|4x^2-2|\le 2" /> és <M t="e^{-x^2}\le 1" />, így <M t="M = 2" /> választható.
            Ekkor <M t="|E_T| \le \frac{2\cdot 1^3}{12\cdot 10^2} = \frac{1}{600} \approx 0{,}00167" />.
          </p>
        </Task>
        <Task
          n={6}
          q={<>Hány részintervallum kell, hogy az <M t="\int_0^\pi \sin x\,dx" /> trapéz-közelítésének hibája legfeljebb <M t="0{,}001" /> legyen?</>}
        >
          <p>
            <M t="|f''(x)| = |-\sin x| \le 1 = M" />, <M t="b-a=\pi" />:{' '}
            <M t="\frac{1\cdot \pi^3}{12n^2} \le 0{,}001 \implies n \ge \sqrt{\frac{1000\pi^3}{12}} \approx 50{,}8 \implies \mathbf{n = 51}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A Simpson-formula: parabolaívek a görbére',
    body: (
      <>
        <Story>
          <p>
            A trapézformula egyenes szakaszokkal (1. fokú polinomokkal) közelíti a görbét. Thomas Simpson
            (1710–1761) zseniális ötlete: ha minden <strong>három egymást követő pontra</strong> egy{' '}
            <strong>másodfokú parabolát</strong> fektetünk, a görbe hajlását is pontosan követni tudjuk!
          </p>
        </Story>

        <p>
          <strong>A parabolaterület levezetése:</strong> Toljuk el az első két sávot a <M t="[-h, h]" />{' '}
          intervallumra (<M t="h = \Delta x" />), ahol a parabola <M t="y = Ax^2+Bx+C" /> átmegy a{' '}
          <M t="(-h,y_0),\; (0,y_1),\; (h,y_2)" /> pontokon. Integrálva:
        </p>
        <M block t="\int_{-h}^{h} (Ax^2+Bx+C)\,dx = \frac{h}{3}(2Ah^2 + 6C)." />
        <p>
          Mivel <M t="C = y_1" /> és <M t="y_0 + y_2 = 2Ah^2 + 2C \Rightarrow 2Ah^2 = y_0 + y_2 - 2y_1" />,
          behelyettesítve megkapjuk a híres <M t="1 - 4 - 1" /> súlyokat:{' '}
          <M t="A_p = \frac{h}{3}(y_0 + 4y_1 + y_2)" />! Összeadva az összes sávpárra:
        </p>

        <Def title="A Simpson-formula (n kötelezően páros!)">
          <M block t="S = \frac{\Delta x}{3}\big(y_0 + 4y_1 + 2y_2 + 4y_3 + 2y_4 + \dots + 2y_{n-2} + 4y_{n-1} + y_n\big)," />
          <p>
            ahol <M t="n" /> <strong>páros</strong> pozitív egész, és <M t="\Delta x = \frac{b-a}{n}" />. A
            súlyminta: <strong>1, 4, 2, 4, 2, …, 2, 4, 1</strong>!
          </p>
        </Def>

        <p>
          <strong>Thomas 5. példa:</strong> <M t="\int_0^2 5x^4\,dx" /> közelítése <M t="n=4" />-gyel (<M t="\Delta x = \frac{1}{2}" />):
        </p>
        <M block t="S_4 = \frac{1/2}{3}\left(0 + 4\cdot\frac{5}{16} + 2\cdot 5 + 4\cdot\frac{405}{16} + 80\right) = 32 + \frac{1}{12} \approx 32{,}0833." />

        <SimpsonRuleWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={<>Számítsd ki Simpson-formulával az <M t="\int_0^2 x^3\,dx" /> integrált <M t="n=2" />-vel (<M t="\Delta x=1" />)! Mennyi a hiba?</>}
        >
          <p>
            <M t="y_0=0,\; y_1=1,\; y_2=8" />:{' '}
            <M t="S_2 = \frac{1}{3}(0 + 4\cdot 1 + 8) = 4" />. A pontos érték is <M t="\left[\frac{x^4}{4}\right]_0^2 = 4" /> —
            a hiba <strong>pontosan 0</strong>!
          </p>
        </Task>
        <Task
          n={8}
          q={<>Miért <strong>tilos</strong> a Simpson-formulát <M t="n=5" /> részintervallumra alkalmazni?</>}
        >
          <p>
            Mert minden egyes parabola <em>két</em> szomszédos részintervallumot (3 pontot) fog össze, így csak
            páros számú részintervallum fedhető le maradék nélkül parabolákkal!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'A Simpson-formula harmadfokú bónusza és hibabecslése',
    body: (
      <>
        <p>
          Az előző feladatban láttunk egy kis csodát: a Simpson-formula másodfokú parabolákból épül fel, mégis{' '}
          <strong>minden harmadfokú polinomot is 100%-osan pontosan integrál</strong>! Ennek oka a szimmetria:
          a <M t="[-h, h]" /> intervallumon minden páratlan <M t="Dx^3" /> tag integrálja <M t="0" />, és a
          Simpson-súlyok is <M t="(-h)^3 + 4\cdot 0^3 + h^3 = 0" />-t adnak!
        </p>

        <Def title="A Simpson-formula hibabecslése">
          <p>
            Ha <M t="f^{(4)}" /> folytonos <M t="[a, b]" />-n, és <M t="|f^{(4)}(x)| \le M" /> minden{' '}
            <M t="x\in[a,b]" />-re, akkor a páros <M t="n" />-re számított Simpson-közelítés hibája:
          </p>
          <M block t="|E_S| \le \frac{M(b-a)^5}{180n^4}." />
        </Def>

        <p>
          A nevezőben lévő <M t="180n^4" /> elképesztő gyorsaságot jelent: ha megduplázod <M t="n" />-et, a hiba
          a <strong>16-odára</strong> (<M t="2^4 = 16" />) esik! Hasonlítsd össze a két módszert az alábbi
          élő táblázatban:
        </p>

        <TrapezoidVsSimpsonRaceWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={<>Hány részintervallum (páros <M t="n" />) kell, hogy az <M t="\int_1^2 \frac{1}{x}\,dx = \ln 2" /> Simpson-közelítésének hibája <M t="\le 10^{-4}" /> legyen? Hasonlítsd össze a 3. oldalon kapott trapézos <M t="n=41" />-gyel!</>}
        >
          <p>
            <M t="f^{(4)}(x) = 24x^{-5} \implies M = 24" /> az <M t="[1,2]" />-n.{' '}
            <M t="\frac{24\cdot 1^5}{180n^4} \le 10^{-4} \iff n^4 \ge 1333{,}3 \implies n \ge 6{,}04" />. A
            legkisebb megfelelő páros egész <M t="\mathbf{n = 8}" /> (szemben a trapéz 41-ével!).
          </p>
        </Task>
        <Task
          n={10}
          q={<>Ha a Thomas 5. példában (<M t="\int_0^2 5x^4\,dx" />) <M t="n=4" />-ről <M t="n=8" />-ra növeljük a felosztást, mennyi lesz a Simpson-hiba pontos értéke?</>}
        >
          <p>
            Mivel <M t="f^{(4)}(x) \equiv 120" /> állandó, a hiba pontosan <M t="\frac{120\cdot 2^5}{180 n^4}" />:
            <M t="n=4" />-nél <M t="\frac{1}{12}" />, <M t="n=8" />-nál pedig pontosan a 16-oda, azaz{' '}
            <M t="\frac{1}{192} \approx 0{,}00521" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'A középpont-szabály és a titkos kapcsolat Simpsonnal',
    body: (
      <>
        <p>
          Van egy harmadik, meglepően erős numerikus szabály is: a <strong>középpont-szabály (<M t="M_n" />)</strong>,
          amely minden részintervallumban a felezőpontban (<M t="\bar{x}_i = \frac{x_{i-1}+x_i}{2}" />) méri a
          téglalap magasságát:
        </p>
        <M block t="M_n = \Delta x\big(f(\bar{x}_1) + f(\bar{x}_2) + \dots + f(\bar{x}_n)\big), \qquad |E_M| \le \frac{M(b-a)^3}{24n^2}." />

        <p>
          Miért kétszer pontosabb a sima középpont-téglalap, mint a trapéz? Mert ha a felezőpontban meghúzod a
          görbe <em>érintőjét</em>, az érintő alatti trapéz területe <strong>pontosan egyenlő</strong> a
          téglalap területével (a bal és jobb oldali kis háromszög egybevágó!), és az érintő feleakkora rést
          hagy a görbe alatt, mint a húr a görbe fölött!
        </p>

        <MidpointTangentDiagram />

        <Def title="Az arany összefüggés: Simpson = 2 : 1 súlyozott átlag">
          <M block t="S_{2n} = \frac{2M_n + T_n}{3}." />
          <p>
            Ez egyben elképesztően hasznos ellenőrzőképlet is: ha már kiszámoltad <M t="T_n" />-et és{' '}
            <M t="M_n" />-et, egyetlen osztással megkapod a sokkal pontosabb <M t="S_{2n}" />-et!
          </p>
        </Def>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={<>Számítsd ki az <M t="\int_0^2 x^2\,dx" /> közelítését <M t="M_2" />-vel (<M t="\Delta x=1" />), majd az <M t="S_4 = \frac{2M_2+T_2}{3}" /> képlettel (tudva, hogy az 1. feladatban <M t="T_2 = 3" /> volt)!</>}
        >
          <p>
            Felezőpontok <M t="0{,}5" /> és <M t="1{,}5" />:{' '}
            <M t="M_2 = 1\cdot(0{,}25 + 2{,}25) = 2{,}5" />. Innen{' '}
            <M t="S_4 = \frac{2\cdot 2{,}5 + 3}{3} = \frac{8}{3}" /> — <strong>hajszálpontos</strong>!
          </p>
        </Task>
        <Task
          n={12}
          q={<>Konvex függvénynél (<M t="f''>0" />) milyen sorrendben áll a három szám: <M t="M_n" />, a pontos <M t="I" /> integrál, és <M t="T_n" />?</>}
        >
          <p>
            <M t="M_n < I < T_n" /> (a középpont-szabály alulról, a trapéz felülről szorítja közre a pontos
            integrált, ráadásul <M t="I" /> kétszer közelebb van <M t="M_n" />-hez, mint <M t="T_n" />-hez!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Valós alkalmazások és amikor a numerika elbukik',
    body: (
      <>
        <p>
          A gyakorlatban a Simpson- és trapézformulát leggyakrabban két helyen használják: (1) terepi mérési
          táblázatok integrálására (pl. folyómeder vízhozama, szárnyprofil területe, teljes elfogyasztott energia
          teljesítmény-idő görbéből), (2) nem elemi ívhosszak (pl. ellipszis kerülete) és valószínűségek
          (<M t="\operatorname{erf}" />) kiszámítására.
        </p>

        <RealWorldDataSimpsonWidget />

        <Warn>
          <strong>Három eset, amikor a sima Trapéz/Simpson megbízhatatlan:</strong>
          <ol style={{ margin: '6px 0 0 18px' }}>
            <li>
              <strong>Függőleges aszimptota / szakadás</strong> az intervallumban (pl. <M t="\int_0^1 \frac{dx}{\sqrt{x}}" />):
              a végpontban <M t="f(0)=\infty" /> — ide az <strong>improprius integrálok</strong> (8.8. szakasz)
              kellenek!
            </li>
            <li>
              <strong>Töréspont (nem létező derivált):</strong> pl. <M t="|x-1|" /> — bontsd ketté az integrált a
              töréspontnál!
            </li>
            <li>
              <strong>Gyors oszcilláció:</strong> ha <M t="\sin(100x)" />-et <M t="n=4" /> ponttal mintavételezed,
              a lépésköz átugorja a hullámokat (<em>aliasing</em>-hiba).
            </li>
          </ol>
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={<>Becsüld meg <M t="\pi = \int_0^1 \frac{4}{1+x^2}\,dx" /> értékét Simpson-formulával <M t="n=4" /> mellett!</>}
        >
          <p>
            <M t="\Delta x = 0{,}25" />, <M t="y_0=4,\; y_1=\frac{64}{17},\; y_2=\frac{16}{5},\; y_3=\frac{64}{25},\; y_4=2" />:{' '}
            <M t="S_4 = \frac{1}{12}\left(4 + \frac{256}{17} + \frac{32}{5} + \frac{256}{25} + 2\right) \approx \mathbf{3{,}141569}" />{' '}
            (a hiba csak <M t="2{,}4\cdot 10^{-5}" />!).
          </p>
        </Task>
        <Task
          n={14}
          q={<>Egy napelem teljesítményét 2 óránként mértük reggel 6-tól délután 6-ig (<M t="n=6" />, kW-ban): <M t="0,\; 1{,}2,\; 3{,}8,\; 4{,}6,\; 3{,}5,\; 1{,}1,\; 0" />. Mennyi a napi megtermelt energia (kWh) Simpson-szabállyal?</>}
        >
          <p>
            <M t="\Delta t = 2" />:{' '}
            <M t="S_6 = \frac{2}{3}\big(0 + 4(1{,}2) + 2(3{,}8) + 4(4{,}6) + 2(3{,}5) + 4(1{,}1) + 0\big) = \frac{2}{3}\cdot 42{,}2 \approx \mathbf{28{,}13\text{ kWh}}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok',
    body: (
      <>
        <NumericalMethodsSummaryDiagram />

        <Def title="8.7 Puskakártya — Minden képlet egy helyen">
          <ul>
            <li>
              <strong>Trapéz:</strong> <M t="T_n = \frac{\Delta x}{2}(y_0 + 2y_1 + \dots + 2y_{n-1} + y_n)" />,{' '}
              <M t="|E_T| \le \frac{M_2(b-a)^3}{12n^2}" />.
            </li>
            <li>
              <strong>Középpont:</strong> <M t="M_n = \Delta x\sum f(\bar{x}_i)" />,{' '}
              <M t="|E_M| \le \frac{M_2(b-a)^3}{24n^2}" />.
            </li>
            <li>
              <strong>Simpson (páros <M t="n" />):</strong>{' '}
              <M t="S_n = \frac{\Delta x}{3}(y_0 + 4y_1 + 2y_2 + 4y_3 + \dots + 4y_{n-1} + y_n)" />,{' '}
              <M t="|E_S| \le \frac{M_4(b-a)^5}{180n^4}" />.
            </li>
            <li>
              <strong>Kapcsolat:</strong> <M t="S_{2n} = \frac{2M_n + T_n}{3}" />.
            </li>
          </ul>
        </Def>

        <Warn>
          <strong>5 tipikus buktató a 8.7-ben:</strong>
          <ol style={{ margin: '6px 0 0 18px' }}>
            <li>Páratlan <M t="n" /> választása Simpson-formulához (a súlyminta elcsúszik!).</li>
            <li>A Simpson-súlyok eltévesztése: nem <M t="1,4,4,\dots" />, hanem szigorúan váltakozó <M t="1,4,2,4,2,\dots,4,1" />!</li>
            <li>A <M t="\Delta x/2" /> és <M t="\Delta x/3" /> előtti szorzó összecserélése vagy elhagyása.</li>
            <li>A hibaképletben <M t="n" /> kiszámításakor lefelé kerekítés (mindig <strong>felfelé</strong>, Simpsonnál a következő <strong>páros</strong> egészre!).</li>
            <li>A deriváltkorlát <M t="M" /> összekeverése: trapéznál <M t="|f''|" />, Simpsonnál <M t="|f^{(4)}|" /> maximuma kell!</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={<>Számítsd ki az <M t="\int_0^4 \sqrt{x}\,dx" /> közelítő értékét <M t="n=4" /> mellett trapézformulával!</>}
        >
          <p>
            <M t="\Delta x = 1" />, <M t="y = 0, 1, \sqrt{2}, \sqrt{3}, 2" />:{' '}
            <M t="T_4 = \frac{1}{2}(0 + 2 + 2\sqrt{2} + 2\sqrt{3} + 2) = 2 + \sqrt{2} + \sqrt{3} \approx 5{,}146" />{' '}
            (pontos érték <M t="\frac{16}{3}\approx 5{,}333" />, alulbecsül, mert <M t="\sqrt{x}" /> konkáv).
          </p>
        </Task>
        <Task
          n={16}
          q={<>Számítsd ki ugyanazt az <M t="\int_0^4 \sqrt{x}\,dx" /> integrált Simpson-formulával <M t="n=4" /> mellett!</>}
        >
          <p>
            <M t="S_4 = \frac{1}{3}(0 + 4\cdot 1 + 2\sqrt{2} + 4\sqrt{3} + 2) = \frac{6 + 2\sqrt{2} + 4\sqrt{3}}{3} \approx 5{,}252" />{' '}
            (már közelebb a <M t="5{,}333" />-hoz; a <M t="0" />-beli végtelen derivált miatt lassabban konvergál).
          </p>
        </Task>
        <Task
          n={17}
          q={<>Írd fel a Simpson-formula súlysorozatát <M t="n=6" /> esetén!</>}
        >
          <p>
            7 pont (<M t="y_0 \dots y_6" />), súlyok: <strong>1, 4, 2, 4, 2, 4, 1</strong>, elöl pedig{' '}
            <M t="\frac{\Delta x}{3}" />.
          </p>
        </Task>

        <h3>Közepes gyakorlófeladatok</h3>
        <Task
          n={18}
          q={<>Számítsd ki az <M t="\int_0^1 e^{x^2}\,dx" /> nem elemi integrál közelítő értékét Simpson-formulával <M t="n=4" />-gyel!</>}
        >
          <p>
            <M t="\Delta x = 0{,}25" />:{' '}
            <M t="S_4 = \frac{0{,}25}{3}\big(e^0 + 4e^{1/16} + 2e^{1/4} + 4e^{9/16} + e^1\big) \approx \frac{1}{12}(1 + 4{,}258 + 2{,}568 + 7{,}020 + 2{,}718) \approx \mathbf{1{,}4637}" />{' '}
            (pontos érték <M t="\approx 1{,}4627" />).
          </p>
        </Task>
        <Task
          n={19}
          q={<>Hány részintervallum kell, hogy az <M t="\int_0^2 e^x\,dx" /> trapéz-közelítésének hibája <M t="\le 10^{-3}" /> legyen? (Használd, hogy <M t="e^2 < 8" />.)</>}
        >
          <p>
            <M t="f''(x)=e^x \le e^2 < 8 = M" />, <M t="b-a=2" />:{' '}
            <M t="\frac{8\cdot 2^3}{12n^2} \le 10^{-3} \iff n^2 \ge \frac{64\,000}{12} \approx 5333{,}3 \implies \mathbf{n = 74}" />.
          </p>
        </Task>
        <Task
          n={20}
          q={<>Ugyanerre az <M t="\int_0^2 e^x\,dx" /> integrálra hány (páros) részintervallum kell Simpson-formulával <M t="\le 10^{-3}" /> hibához?</>}
        >
          <p>
            <M t="f^{(4)}(x)=e^x < 8 = M" />, <M t="b-a=2" />:{' '}
            <M t="\frac{8\cdot 2^5}{180n^4} \le 10^{-3} \iff n^4 \ge \frac{256\,000}{180} \approx 1422{,}2 \implies n \ge 6{,}14 \implies \mathbf{n = 8}" />!
          </p>
        </Task>

        <h3>Haladó gyakorlófeladatok</h3>
        <Task
          n={21}
          q={<>Az <M t="y=\sin x" /> görbe ívhossza a <M t="[0,\pi]" />-n az <M t="L = \int_0^\pi \sqrt{1+\cos^2 x}\,dx" /> nem elemi integrál. Becsüld meg Simpson-formulával <M t="n=4" />-gyel!</>}
        >
          <p>
            <M t="\Delta x = \frac{\pi}{4}" />, <M t="y_0=\sqrt{2},\; y_1=\sqrt{1{,}5},\; y_2=1,\; y_3=\sqrt{1{,}5},\; y_4=\sqrt{2}" />:{' '}
            <M t="S_4 = \frac{\pi}{12}\big(2\sqrt{2} + 8\sqrt{1{,}5} + 2\big) \approx \frac{\pi}{12}\cdot 14{,}626 \approx \mathbf{3{,}829}" />{' '}
            (a valódi érték <M t="\approx 3{,}8202" />).
          </p>
        </Task>
        <Task
          n={22}
          q={<>Igazold algebrailag az <M t="S_{2n} = \frac{2M_n + T_n}{3}" /> összefüggést <M t="n=1" /> (<M t="S_2" />) esetén az <M t="[a, b]" /> intervallumon!</>}
        >
          <p>
            <M t="n=1" /> esetén <M t="T_1 = \frac{b-a}{2}(y_0 + y_2)" /> és <M t="M_1 = (b-a)y_1" /> (ahol{' '}
            <M t="y_1 = f(\frac{a+b}{2})" />). Ekkor:{' '}
            <M t="\frac{2M_1 + T_1}{3} = \frac{b-a}{6}(4y_1 + y_0 + y_2) = \frac{(b-a)/2}{3}(y_0 + 4y_1 + y_2) = S_2" />.
          </p>
        </Task>
        <Task
          n={23}
          q={<>Tegyük fel, hogy egy ismeretlen sima függvényre <M t="T_4 = 1{,}240" /> és <M t="T_8 = 1{,}210" />. Mivel a trapézhiba <M t="\approx C/n^2" />, becsüld meg a pontos integrált <strong>Richardson-extrapolációval</strong> (és ellenőrizd, hogy ez éppen <M t="\frac{4T_8 - T_4}{3} = S_8" />)!</>}
        >
          <p>
            Mivel <M t="T_4 - I \approx 4(T_8 - I)" />, átrendezve{' '}
            <M t="I \approx \frac{4T_8 - T_4}{3} = \frac{4(1{,}210) - 1{,}240}{3} = \mathbf{1{,}200}" />.
            Valóban, <M t="T_8 = \frac{T_4 + M_4}{2} \Rightarrow M_4 = 2T_8 - T_4" />, így{' '}
            <M t="S_8 = \frac{2M_4+T_4}{3} = \frac{4T_8-T_4}{3}" />!
          </p>
        </Task>

        <h3>Kiegészítő mintapélda és gyorsteszt</h3>
        <Steps
          title="Az ln 3 közelítése Simpson-szabállyal (n = 4)"
          source="Analízis-labor"
          problem={
            <>
              Közelítsük az <M t="\displaystyle\int_{0}^{2} \frac{1}{1 + x}\,dx = \ln 3 \approx 1{,}09861" /> integrált <M t="n = 4" /> esetén a Simpson-szabállyal!
            </>
          }
          steps={[
            {
              title: 'Osztópontok és függvényértékek',
              body: (
                <p>
                  <M t="\Delta x = 0{,}5" />, pontok: <M t="x = 0;\; 0{,}5;\; 1;\; 1{,}5;\; 2" />; értékek: <M t="y = 1,\; \frac{2}{3},\; \frac{1}{2},\; \frac{2}{5},\; \frac{1}{3}" />.
                </p>
              ),
            },
            {
              title: 'Simpson-súlyok (1, 4, 2, 4, 1) alkalmazása',
              body: (
                <M block t="S_4 = \frac{0{,}5}{3}\left(1 + 4\cdot\frac{2}{3} + 2\cdot\frac{1}{2} + 4\cdot\frac{2}{5} + \frac{1}{3}\right) = \frac{1}{6}\cdot 6{,}6 = \mathbf{1{,}1000}." />
              ),
            },
            {
              title: 'Pontosság értékelése',
              body: (
                <p>
                  A hiba mindössze <M t="0{,}0014" /> (<M t="0{,}13\%" />) csupán <M t="4" /> részintervallummal!
                </p>
              ),
            },
          ]}
        />
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Ha a Simpson-szabályban megduplázzuk a részintervallumok <M t="n" /> számát, körülbelül hányad részére csökken a hiba?
            </>
          }
          options={[
            { label: <>Tizenhatodára (<M t="1/2^4 = 1/16" />)</>, ok: true },
            { label: <>Negyedére (<M t="1/4" />)</> },
            { label: <>Felére (<M t="1/2" />)</> },
            { label: <>Nyolcadára (<M t="1/8" />)</> },
          ]}
          explain={
            <>
              Mivel <M t="|E_S| \propto 1/n^4" />, <M t="n" /> megduplázása <M t="2^4 = 16" />-szoros pontosságnövekedést hoz.
            </>
          }
        />
      </>
    ),
  },
];
