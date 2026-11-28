import type { Page } from './s1_1';
import { M } from '../components/M';
import { Def, Story, Task, Warn, Quiz, Steps } from '../components/ui';
import {
  ExtremaTypes3DWidget,
  HessianClassifierWidget,
  TwoCriticalPointsWidget,
  DegenerateDZeroWidget,
  ClosedTriangleDomainWidget,
  OpenBoxOptimizationWidget,
  LeastSquaresWidget,
  ExtremaDecisionTreeDiagram,
} from '../components/Widgets147';

export const S14_7: Page[] = [
  /* ── 1. OLDAL ── */
  {
    title: '1. Lokális szélsőértékek és kritikus pontok',
    body: (
      <>
        <Story>
          Egyváltozós függvényeknél egy hegycsúcs vagy völgy alja ott van, ahol az érintőegyenes vízszintes
          (<M t="f'(x)=0" />). Két változóban a függvény grafikonja egy domborzati felszín: csúcspontban vagy
          kráter alján a teljes <strong>érintősík vízszintes</strong> — vagyis mindkét koordinátairányban nulla
          a meredekség. De a 3D világ egy teljesen új tereptárgyat is rejt: a <strong>hágót (nyeregpontot)</strong>!
        </Story>

        <Def title="Lokális maximum és lokális minimum">
          <p>
            Legyen <M t="f(x,y)" /> értelmezve egy <M t="(a,b)" /> pontot tartalmazó <M t="R" /> tartományon.
          </p>
          <ul>
            <li>
              <M t="f(a,b)" /> <strong>lokális maximum</strong>, ha létezik olyan <M t="(a,b)" /> középpontú nyílt körlap,
              amelynek minden pontjában <M t="f(a,b) \ge f(x,y)" />.
            </li>
            <li>
              <M t="f(a,b)" /> <strong>lokális minimum</strong>, ha létezik olyan <M t="(a,b)" /> középpontú nyílt körlap,
              amelynek minden pontjában <M t="f(a,b) \le f(x,y)" />.
            </li>
          </ul>
        </Def>

        <Def title="10. tétel — Az első derivált próbája (szükséges feltétel)">
          <p>
            Ha <M t="f(x,y)" />-nak lokális szélsőértéke van az <M t="(a,b)" /> belső pontban, és ott léteznek az első
            parciális deriváltak, akkor:
          </p>
          <M block t="f_x(a,b) = 0 \quad \text{és} \quad f_y(a,b) = 0 \qquad (\text{azaz } \nabla f(a,b) = \mathbf{0})." />
          <p>
            <strong>Kritikus pontnak</strong> nevezzük az <M t="f" /> értelmezési tartományának minden olyan belső
            <M t="(a,b)" /> pontját, ahol <M t="f_x(a,b) = f_y(a,b) = 0" />, <em>vagy</em> legalább az egyik parciális
            derivált nem létezik.
          </p>
        </Def>

        <ExtremaTypes3DWidget />

        <Task n={1} q={<>Határozd meg az <M t="f(x,y) = x^2 + y^2 - 4y + 9" /> függvény kritikus pontját és lokális szélsőértékét!</>}>
          <p>
            Parciális deriváltak: <M t="f_x = 2x = 0 \implies x = 0" />, <M t="f_y = 2y - 4 = 0 \implies y = 2" />.
            Egyetlen kritikus pont a <M t="(0, 2)" />. Teljes négyzetté alakítva:
            <M block t="f(x,y) = x^2 + (y - 2)^2 + 5 \ge 5." />
            Mivel a négyzetek összege nemnegatív, a <M t="(0, 2)" /> pontban <strong>lokális (és abszolút) minimum</strong>
            van, amelynek értéke <M t="f(0,2) = 5" />.
          </p>
        </Task>

        <Task n={2} q={<>Miért kritikus pont a <M t="(0, 0)" /> a <M t="g(x,y) = 3 - \sqrt{x^2 + y^2}" /> kúp esetén, és milyen szélsőértéke van ott?</>}>
          <p>
            Az origóban <M t="g_x(0,0)" /> és <M t="g_y(0,0)" /> <strong>nem léteznek</strong> (a kúpnak csúcsa van,
            nincs érintősíkja), ezért <M t="(0,0)" /> kritikus pont. Mivel <M t="\sqrt{x^2+y^2} \ge 0" />,
            mindenütt <M t="g(x,y) \le 3 = g(0,0)" />, így ott <strong>abszolút (és lokális) maximum</strong> van.
          </p>
        </Task>
      </>
    ),
  },

  /* ── 2. OLDAL ── */
  {
    title: '2. Nyeregpontok és a második derivált próbája (Hesse-determináns)',
    body: (
      <>
        <Story>
          A vízszintes érintősík önmagában még nem garantál szélsőértéket! Gondolj egy hegyi hágóra (vagy egy
          Pringles-chipsre): ha az ösvényen haladsz át két csúcs között, a hágó a legmagasabb pontod; ha viszont
          merőlegesen, a két völgy irányába nézel, ugyanaz a pont a legalacsonyabb. Ezt nevezzük <strong>nyeregpontnak</strong>.
        </Story>

        <Def title="Nyeregpont és a 11. tétel (Második derivált próbája)">
          <p>
            Egy differenciálható függvény <M t="(a,b)" /> kritikus pontja <strong>nyeregpont</strong>, ha minden
            <M t="(a,b)" /> körüli nyílt körlapon van olyan pont, ahol <M t="f(x,y) > f(a,b)" />, és olyan is,
            ahol <M t="f(x,y) < f(a,b)" />.
          </p>
          <p>
            Ha <M t="f" /> másodrendű parciális deriváltjai folytonosak az <M t="(a,b)" /> kritikus pont egy nyílt
            környezetében, definiáljuk a <strong>Hesse-determinánst (diszkriminánst)</strong>:
          </p>
          <M block t="D(a,b) = \det\begin{pmatrix} f_{xx} & f_{xy} \\ f_{xy} & f_{yy} \end{pmatrix}_{(a,b)} = f_{xx}(a,b)\,f_{yy}(a,b) - \bigl[f_{xy}(a,b)\bigr]^2." />
          <ul>
            <li>Ha <M t="D > 0" /> és <M t="f_{xx}(a,b) < 0" /> ⇒ <strong>lokális maximum</strong>.</li>
            <li>Ha <M t="D > 0" /> és <M t="f_{xx}(a,b) > 0" /> ⇒ <strong>lokális minimum</strong>.</li>
            <li>Ha <M t="D < 0" /> ⇒ <strong>nyeregpont</strong>.</li>
            <li>Ha <M t="D = 0" /> ⇒ <strong>a próba nem dönt</strong> (más módszer kell!).</li>
          </ul>
        </Def>

        <HessianClassifierWidget />

        <Quiz
          q={<>Egy kritikus pontban <M t="f_{xx} = -4" />, <M t="f_{yy} = -2" /> és <M t="f_{xy} = 3" />. Mi van ebben a pontban?</>}
          options={[
            { label: 'Lokális maximum (mert f_xx < 0 és f_yy < 0)' },
            { label: 'Nyeregpont, mert D = (−4)(−2) − 3² = 8 − 9 = −1 < 0', ok: true },
            { label: 'Lokális minimum' },
            { label: 'A próba nem dönt' },
          ]}
          explain={<>Hiába negatív mindkét tengelyirányú görbület (<M t="f_{xx}<0, f_{yy}<0" />), az erős vegyes csavarodás (<M t="f_{xy}=3" />) miatt az átló irányában felfelé hajlik a felület, így <M t="D = -1 < 0" />: nyeregpont!</>}
        />

        <Task n={3} q={<>Vizsgáld meg az <M t="f(x,y) = xy - x^2 - y^2 - 2x - 2y + 4" /> függvény kritikus pontját a Hesse-próbával!</>}>
          <p>
            Első deriváltak: <M t="f_x = y - 2x - 2 = 0" /> és <M t="f_y = x - 2y - 2 = 0" />.
            Az elsőből <M t="y = 2x + 2" />, behelyettesítve a másodikba: <M t="x - 4x - 4 - 2 = 0 \implies x = -2, \; y = -2" />.
            Második deriváltak: <M t="f_{xx} = -2" />, <M t="f_{yy} = -2" />, <M t="f_{xy} = 1" />.
            Így <M t="D = (-2)(-2) - 1^2 = 3 > 0" /> és <M t="f_{xx} = -2 < 0" /> ⇒ <strong>lokális maximum</strong> a
            <M t="(-2, -2)" /> pontban, értéke <M t="f(-2,-2) = 4 - 4 - 4 + 4 + 4 + 4 = 8" />.
          </p>
        </Task>

        <Task n={4} q={<>Mutasd meg, hogy az <M t="f(x,y) = xy" /> függvénynek nyeregpontja van az origóban!</>}>
          <p>
            <M t="f_x = y = 0" />, <M t="f_y = x = 0 \implies (0,0)" /> az egyetlen kritikus pont.
            Mivel <M t="f_{xx} = 0, \; f_{yy} = 0, \; f_{xy} = 1" />, a Hesse-determináns
            <M t="D = 0 \cdot 0 - 1^2 = -1 < 0" />, tehát az origó <strong>nyeregpont</strong> (az <M t="y=x" /> irányban
            <M t="x^2 > 0" />, az <M t="y=-x" /> irányban <M t="-x^2 < 0" />).
          </p>
        </Task>
      </>
    ),
  },

  /* ── 3. OLDAL ── */
  {
    title: '3. Több kritikus pont rendszerezése',
    body: (
      <>
        <Story>
          A nemlineáris egyenletrendszerek (<M t="f_x = 0, \; f_y = 0" />) gyakran több kritikus pontot adnak —
          egyszerre lehet domb, völgy és több nyereg is ugyanazon a felületen. A siker titka a <strong>fegyelmezett
          algebrai megoldás</strong> (soha ne ossz el egy ismeretlennel, mielőtt a 0-esetet megvizsgáltad!) és egy
          áttekinthető Hesse-táblázat.
        </Story>

        <Steps
          title="Teljes elemzés: f(x, y) = x³ − 3xy + y³"
          problem={<>Keresd meg és osztályozd az <M t="f(x,y) = x^3 - 3xy + y^3" /> függvény összes kritikus pontját!</>}
          steps={[
            {
              title: '1. Első parciális deriváltak nullává tétele',
              body: (
                <>
                  <M block t="f_x = 3x^2 - 3y = 0 \implies y = x^2, \qquad f_y = -3x + 3y^2 = 0 \implies x = y^2." />
                </>
              ),
            },
            {
              title: '2. Egyenletrendszer megoldása (faktorizálással!)',
              body: (
                <>
                  Behelyettesítve <M t="y = x^2" />-et a másodikba: <M t="x^4 - x = 0 \implies x(x^3 - 1) = 0" />.
                  A valós gyökök: <M t="x = 0" /> (ekkor <M t="y = 0" />) és <M t="x = 1" /> (ekkor <M t="y = 1" />).
                  Két kritikus pontunk van: <M t="(0,0)" /> és <M t="(1,1)" />.
                </>
              ),
            },
            {
              title: '3. Második deriváltak és D(x, y) kiszámítása',
              body: (
                <>
                  <M block t="f_{xx} = 6x, \quad f_{yy} = 6y, \quad f_{xy} = -3 \implies D(x,y) = 36xy - 9." />
                </>
              ),
            },
            {
              title: '4. Osztályozás a kritikus pontokban',
              body: (
                <>
                  <ul>
                    <li><M t="(0,0)" />: <M t="D(0,0) = -9 < 0" /> ⇒ <strong>nyeregpont</strong> (<M t="f(0,0) = 0" />).</li>
                    <li><M t="(1,1)" />: <M t="D(1,1) = 27 > 0" /> és <M t="f_{xx}(1,1) = 6 > 0" /> ⇒ <strong>lokális minimum</strong> (<M t="f(1,1) = -1" />).</li>
                  </ul>
                </>
              ),
            },
          ]}
        />

        <TwoCriticalPointsWidget />

        <Task n={5} q={<>Határozd meg és osztályozd az <M t="f(x,y) = x^3 - 3x + y^2 - 4y" /> függvény kritikus pontjait!</>}>
          <p>
            <M t="f_x = 3x^2 - 3 = 0 \implies x = \pm 1" />, <M t="f_y = 2y - 4 = 0 \implies y = 2" />.
            Kritikus pontok: <M t="(1,2)" /> és <M t="(-1,2)" />.
            Második deriváltak: <M t="f_{xx} = 6x" />, <M t="f_{yy} = 2" />, <M t="f_{xy} = 0" />, tehát <M t="D = 12x" />.
          </p>
          <ul>
            <li><M t="(1,2)" />: <M t="D = 12 > 0, \; f_{xx} = 6 > 0" /> ⇒ <strong>lokális minimum</strong>, <M t="f(1,2) = -6" />.</li>
            <li><M t="(-1,2)" />: <M t="D = -12 < 0" /> ⇒ <strong>nyeregpont</strong>, <M t="f(-1,2) = -2" />.</li>
          </ul>
        </Task>

        <Task n={6} q={<>Keresd meg az <M t="f(x,y) = e^{-(x^2+y^2)}(x^2 + 2y^2)" /> függvény összes kritikus pontját (a szimmetria kihasználásával)!</>}>
          <p>
            Mivel <M t="e^{-(x^2+y^2)} > 0" />, csak a szorzótényezőket kell nullává tenni:
            <M block t="f_x = 2x e^{-(x^2+y^2)}(1 - x^2 - 2y^2) = 0, \qquad f_y = 2y e^{-(x^2+y^2)}(2 - x^2 - 2y^2) = 0." />
            Öt kritikus pont adódik: <M t="(0,0)" /> (lokális minimum, <M t="f=0" />), <M t="(\pm 1, 0)" /> (két nyeregpont,
            <M t="f = 1/e" />), és <M t="(0, \pm 1)" /> (két globális maximum, <M t="f = 2/e" />).
          </p>
        </Task>
      </>
    ),
  },

  /* ── 4. OLDAL ── */
  {
    title: '4. Miért működik a Hesse-próba? És mi történik, ha D = 0?',
    body: (
      <>
        <Story>
          A Hesse-determináns nem varázslat, hanem egy elegáns középiskolai trükk: a <strong>teljes négyzetté alakítás</strong>!
          Egy kritikus pont körül a függvény növekményét a másodrendű Taylor-tag uralja:
          <M t="\Delta f \approx \tfrac{1}{2}\bigl(f_{xx} h^2 + 2f_{xy} hk + f_{yy} k^2\bigr)" />.
        </Story>

        <Def title="A teljes négyzet titka (miért D és f_xx dönt?)">
          <p>Ha <M t="f_{xx} \ne 0" />, emeljük ki <M t="1/f_{xx}" />-et:</p>
          <M block t="f_{xx}h^2 + 2f_{xy}hk + f_{yy}k^2 = \frac{1}{f_{xx}}\Bigl[\underbrace{(f_{xx}h + f_{xy}k)^2}_{\ge\, 0} + \underbrace{(f_{xx}f_{yy} - f_{xy}^2)}_{=\, D} k^2\Bigr]." />
          <ul>
            <li>Ha <M t="D > 0" />, a szögletes zárójel <em>minden</em> <M t="(h,k) \ne (0,0)" /> irányban szigorúan pozitív, így a teljes kifejezés előjele kizárólag <M t="f_{xx}" /> előjelétől függ!</li>
            <li>Ha <M t="D < 0" />, akkor <M t="k = 0" /> esetén a kifejezés <M t="f_{xx}" /> előjelű, míg <M t="f_{xx}h + f_{xy}k = 0" /> mentén ellentétes előjelű ⇒ biztosan nyeregpont!</li>
            <li>Ha <M t="D = 0" />, létezik olyan irány, amelyben a másodrendű tag eltűnik — ekkor a harmad-, negyedrendű tagok döntenek, ezért a próba hallgat.</li>
          </ul>
        </Def>

        <DegenerateDZeroWidget />

        <Warn>
          <strong>A Peano-csapda figyelmeztetése:</strong> 2D-ben <em>nem elég</em> azt ellenőrizni, hogy az összes
          origón átmenő egyenes mentén lokális minimum van! Az <M t="f(x,y) = (y-x^2)(y-2x^2)" /> függvény minden
          egyenesen lokális minimumot mutat <M t="(0,0)" />-ban, mégis nyeregpontja van, mert az <M t="y = 1{,}5x^2" />
          parabola mentén <M t="f(x, 1{,}5x^2) = -0{,}25x^4 < 0" />.
        </Warn>

        <Task n={7} q={<>Mi van a <M t="(0,0)" /> kritikus pontban az <M t="f(x,y) = x^2y^2" /> függvénynél?</>}>
          <p>
            <M t="f_{xx}(0,0) = f_{yy}(0,0) = f_{xy}(0,0) = 0 \implies D = 0" />, a próba nem dönt.
            Közvetlenül ránézve viszont <M t="f(x,y) = (xy)^2 \ge 0 = f(0,0)" /> mindenütt, tehát a <M t="(0,0)" />
            (sőt az egész <M t="x" />- és <M t="y" />-tengely!) <strong>lokális (és abszolút) minimum</strong>.
          </p>
        </Task>

        <Task n={8} q={<>Döntsd el közvetlen vizsgálattal, mi van a <M t="(0,0)" /> pontban a <M t="g(x,y) = x^2 - y^3" /> függvénynél!</>}>
          <p>
            <M t="g_x = 2x = 0, \; g_y = -3y^2 = 0 \implies (0,0)" /> kritikus pont, ahol <M t="g_{xx}=2, \; g_{yy}=0, \; g_{xy}=0 \implies D = 0" />.
            Az <M t="x=0" /> tengely mentén <M t="g(0,y) = -y^3" />, amely <M t="y > 0" /> esetén negatív, <M t="y < 0" /> esetén
            pozitív. Így az origó minden környezetében vesz fel pozitív és negatív értéket is ⇒ <strong>nyeregpont</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ── 5. OLDAL ── */
  {
    title: '5. Abszolút szélsőértékek zárt, korlátos tartományokon',
    body: (
      <>
        <Story>
          A gyakorlatban ritkán optimalizálunk az egész végtelen síkon: általában egy lekerített telken, egy
          háromszöglemezen vagy egy körlapon keressük a legmagasabb hőmérsékletet vagy a legnagyobb feszültséget.
          Ilyenkor a legfontosabb érték sokszor nem belül, hanem a <strong>kerítésen (a határon)</strong> bújik meg!
        </Story>

        <Def title="Weierstrass-tétel 2D-ben és a 3 lépéses recept">
          <p>
            Ha <M t="f(x,y)" /> folytonos egy <strong>zárt és korlátos</strong> <M t="R \subset \mathbb{R}^2" />
            tartományon, akkor biztosan felveszi abszolút maximumát és abszolút minimumát <M t="R" />-en.
          </p>
          <ol>
            <li><strong>Belső jelöltek:</strong> Keresd meg <M t="f" /> összes kritikus pontját <M t="R" /> belsejében (a kívül esőket dobd el!).</li>
            <li><strong>Határjelöltek:</strong> Paraméterezd a <M t="\partial R" /> határ egyes szakaszait/íveit, keresd meg a keletkező 1D függvények szélsőértékeit, és <em>mindig</em> vedd fel a <strong>csúcspontokat</strong> is!</li>
            <li><strong>Összehasonlítás:</strong> Számítsd ki <M t="f" /> értékét az összes jelöltben — a legnagyobb az abszolút maximum, a legkisebb az abszolút minimum. (Hesse-próbára itt nincs is szükség!)</li>
          </ol>
        </Def>

        <ClosedTriangleDomainWidget />

        <Quiz
          q={<>Zárt, korlátos tartományon abszolút szélsőértéket keresve kötelező-e kiszámítani a Hesse-determinánst a belső kritikus pontokban?</>}
          options={[
            { label: 'Igen, különben nem tudjuk, maximum vagy minimum-e' },
            { label: 'Nem — elég a belső kritikus pontok, határpontok és csúcsok f-értékeit összehasonlítani!', ok: true },
            { label: 'Csak akkor, ha a tartomány körlap' },
          ]}
          explain={<>A Weierstrass-tétel garantálja az abszolút szélsőértékek létezését; a jelöltek véges listájából a legnagyobb és legkisebb függvényérték automatikusan kiválasztja az abszolút maxot és mint!</>}
        />

        <Task n={9} q={<>Keresd meg az <M t="f(x,y) = x^2 - 2xy + 2y" /> abszolút szélsőértékeit a <M t="0 \le x \le 3, \; 0 \le y \le 2" /> téglalapon!</>}>
          <p>
            <strong>1. Belső:</strong> <M t="f_x = 2x - 2y = 0, \; f_y = -2x + 2 = 0 \implies (1,1)" />, benne van a téglalapban, <M t="f(1,1) = 1" />.
          </p>
          <p>
            <strong>2. Négy él:</strong>
            <br />• <M t="y=0" />: <M t="x^2" /> → csak végpontok: <M t="f(0,0)=0, \; f(3,0)=9" />.
            <br />• <M t="y=2" />: <M t="x^2 - 4x + 4 = (x-2)^2" /> → belső minimum <M t="(2,2)" />-ben: <M t="f(2,2) = 0" />, és <M t="f(0,2)=4, \; f(3,2)=1" />.
            <br />• <M t="x=0" />: <M t="2y" /> (lineáris, max/min a végpontokban); <M t="x=3" />: <M t="9 - 4y" /> (lineáris).
          </p>
          <p>
            <strong>3. Eredmény:</strong> Abszolút maximum <M t="9" /> a <M t="(3,0)" /> csúcsban; abszolút minimum <M t="0" /> a <M t="(0,0)" /> és <M t="(2,2)" /> pontokban.
          </p>
        </Task>

        <Task n={10} q={<>Mi az <M t="f(x,y) = 2x^2 + y^2 - 2y" /> abszolút maximuma és minimuma az <M t="x^2 + y^2 \le 4" /> zárt körlapon?</>}>
          <p>
            <strong>Belső:</strong> <M t="f_x = 4x = 0, \; f_y = 2y - 2 = 0 \implies (0,1)" /> (benne van, <M t="0^2+1^2 \le 4" />), <M t="f(0,1) = -1" />.
            <br />
            <strong>Határ (<M t="x^2 = 4 - y^2, \; -2 \le y \le 2" />):</strong>
            <M block t="g(y) = 2(4 - y^2) + y^2 - 2y = -y^2 - 2y + 8." />
            Deriválva: <M t="g'(y) = -2y - 2 = 0 \implies y = -1" />, ekkor <M t="x = \pm\sqrt{3}" /> és <M t="g(-1) = 9" />.
            Végpontok: <M t="y=2 \implies g(2) = 0" />, <M t="y=-2 \implies g(-2) = 8" />.
            <br />
            <strong>Válasz:</strong> Abszolút minimum <M t="-1" /> a <M t="(0,1)" />-ben; abszolút maximum <M t="9" /> a <M t="(\pm\sqrt{3}, -1)" /> pontokban.
          </p>
        </Task>
      </>
    ),
  },

  /* ── 6. OLDAL ── */
  {
    title: '6. Gyakorlati optimalizálás két változóban',
    body: (
      <>
        <Story>
          Mérnöki és gazdasági tervezéskor gyakran egy rögzített korlát (pl. adott térfogat vagy adott költségvetés)
          mellett kell egy másik mennyiséget minimalizálni vagy maximalizálni. Ha a feltételből egy változót
          kifejezünk (pl. <M t="z = V/(xy)" />), a 3D feladat máris <strong>kétváltozós szabad szélsőérték-feladattá</strong>
          szelídül! (A 14.8-ban ugyanezt még elegánsabban, Lagrange-multiplikátorokkal is megoldjuk.)
        </Story>

        <Def title="Klasszikus modell: Nyitott téglatest doboz minimális anyagigénnyel">
          <p>
            Készítsünk felül nyitott, <M t="V = 32\text{ dm}^3" /> térfogatú téglatest dobozt a lehető legkevesebb
            lemezből! Az alapélek <M t="x, y > 0" />, a magasság <M t="z = 32/(xy)" />. A minimalizálandó felszín:
          </p>
          <M block t="A(x,y) = xy + 2xz + 2yz = xy + \frac{64}{y} + \frac{64}{x}." />
          <p>
            Kritikus pont: <M t="A_x = y - \frac{64}{x^2} = 0" /> és <M t="A_y = x - \frac{64}{y^2} = 0" />
            ⇒ <M t="x^2 y = 64 = x y^2 \implies x = y = 4" />, <M t="z = 2" />.
            A Hesse-próba igazolja: <M t="A_{xx} = \frac{128}{x^3} = 2" />, <M t="A_{yy} = 2" />, <M t="A_{xy} = 1" />,
            <M t="D = 2\cdot 2 - 1^2 = 3 > 0" />, <M t="A_{xx} > 0" /> ⇒ globális minimum <M t="A_{\min} = 48\text{ dm}^2" />!
          </p>
        </Def>

        <OpenBoxOptimizationWidget />

        <Task n={11} q={<>Találd meg a <M t="2x - y + 2z = 9" /> síknak az origóhoz legközelebbi pontját kétváltozós optimalizálással!</>}>
          <p>
            A távolság négyzete minimalizálható gyök nélkül: <M t="d^2 = x^2 + y^2 + z^2" />. A síkból <M t="y = 2x + 2z - 9" />, így:
            <M block t="f(x,z) = x^2 + (2x + 2z - 9)^2 + z^2." />
            Deriválva: <M t="f_x = 2x + 4(2x+2z-9) = 10x + 8z - 36 = 0" /> és <M t="f_z = 2z + 4(2x+2z-9) = 8x + 10z - 36 = 0" />.
            Szimmetriából <M t="x = z = 2" />, amiből <M t="y = -1" />. A legközelebbi pont a <M t="(2, -1, 2)" />, távolsága <M t="\sqrt{4+1+4} = 3" />.
          </p>
        </Task>

        <Task n={12} q={<>Milyen <M t="x, y, z > 0" /> számok esetén maximális a <M t="P = xyz" /> szorzat, ha <M t="x + y + z = 12" />?</>}>
          <p>
            <M t="z = 12 - x - y" /> behelyettesítéssel <M t="f(x,y) = xy(12 - x - y) = 12xy - x^2y - xy^2" />.
            <M block t="f_x = y(12 - 2x - y) = 0, \qquad f_y = x(12 - x - 2y) = 0." />
            Mivel <M t="x, y > 0" />, a zárójelek nullák: <M t="2x + y = 12" /> és <M t="x + 2y = 12 \implies x = y = 4" />,
            tehát <M t="z = 4" /> (kocka!), és <M t="P_{\max} = 64" />. (Hesse: <M t="f_{xx}=-8, \; f_{yy}=-8, \; f_{xy}=-4 \implies D = 48 > 0" />.)
          </p>
        </Task>
      </>
    ),
  },

  /* ── 7. OLDAL ── */
  {
    title: '7. A legkisebb négyzetek módszere (Lineáris regresszió)',
    body: (
      <>
        <Story>
          A statisztika, a fizikai mérésfeldolgozás és a gépi tanulás egyik legfontosabb alapköve — az adatokra
          illesztett legjobb egyenes — valójában egy tiszta <strong>14.7-es kétváltozós minimumfeladat</strong>!
          Az ismeretlenek itt nem <M t="x" /> és <M t="y" />, hanem az egyenes két paramétere: a meredekség (<M t="m" />)
          és a tengelymetszet (<M t="b" />).
        </Story>

        <Def title="Normálegyenletek a legjobb illesztésű y = mx + b egyeneshez">
          <p>
            Adott <M t="(x_1, y_1), \dots, (x_n, y_n)" /> mérési pontok esetén minimalizáljuk a függőleges eltérések
            négyzetösszegét:
          </p>
          <M block t="S(m, b) = \sum_{i=1}^n (m x_i + b - y_i)^2." />
          <p>
            A <M t="\frac{\partial S}{\partial m} = 0" /> és <M t="\frac{\partial S}{\partial b} = 0" /> feltételek
            egy lineáris <M t="2\times 2" />-es egyenletrendszert (a <strong>normálegyenleteket</strong>) adnak:
          </p>
          <M block t="m\sum x_i^2 + b\sum x_i = \sum x_i y_i, \qquad m\sum x_i + n b = \sum y_i." />
          <p>
            A Hesse-determináns <M t="D = 4\bigl[n\sum x_i^2 - (\sum x_i)^2\bigr]" />, amely a Cauchy–Schwarz-egyenlőtlenség
            szerint szigorúan pozitív (ha nem minden <M t="x_i" /> egyenlő), és <M t="S_{bb} = 2n > 0" /> — tehát a
            megoldás <strong>mindig egyértelmű globális minimum</strong>!
          </p>
        </Def>

        <LeastSquaresWidget />

        <Quiz
          q={<>A legkisebb négyzetek egyenese mindig áthalad egy nevezetes ponton. Melyik az?</>}
          options={[
            { label: 'Az origón (0, 0)' },
            { label: 'Az adatok súlypontján (x̄, ȳ)', ok: true },
            { label: 'Az első és utolsó adatpont felezőpontján' },
          ]}
          explain={<>A második normálegyenletet n-nel elosztva pontosan azt kapjuk, hogy m·x̄ + b = ȳ — tehát a legjobb egyenes mindig átmegy az átlagok (x̄, ȳ) pontján!</>}
        />

        <Task n={13} q={<>Illessz legkisebb négyzetek szerinti <M t="y = mx + b" /> egyenest a <M t="(0,1), \; (1,3), \; (2,4)" /> pontokra!</>}>
          <p>
            Összegek (<M t="n=3" />): <M t="\sum x_i = 3" />, <M t="\sum y_i = 8" />, <M t="\sum x_i^2 = 5" />,
            <M t="\sum x_i y_i = 0 + 3 + 8 = 11" />.
            Normálegyenletek:
            <M block t="5m + 3b = 11, \qquad 3m + 3b = 8." />
            Kivonva egymásból: <M t="2m = 3 \implies m = 1{,}5" />, innen <M t="3b = 8 - 4{,}5 = 3{,}5 \implies b = \frac{7}{6}" />.
            A legjobb egyenes: <M t="y = \frac{3}{2}x + \frac{7}{6}" />.
          </p>
        </Task>

        <Task n={14} q={<>Miért a négyzetes eltérést (<M t="\sum e_i^2" />) minimalizáljuk, és nem az abszolút értéket (<M t="\sum |e_i|" />)?</>}>
          <p>
            Az <M t="|e_i|" /> függvény nem differenciálható <M t="e_i = 0" />-nál (töréspontok), és a megoldás nem
            adható meg zárt lineáris képlettel. Ezzel szemben <M t="S(m,b)" /> végtelenszer differenciálható,
            konvex paraboloid, amelynek egyetlen globális minimuma két lineáris egyenletből azonnal kiszámítható.
          </p>
        </Task>
      </>
    ),
  },

  /* ── 8. OLDAL ── */
  {
    title: '8. Összefoglalás, buktatók és 9 lépcsőzetes gyakorlófeladat',
    body: (
      <>
        <ExtremaDecisionTreeDiagram />

        <Def title="Puskakártya — 14.7 Szélsőértékek és nyeregpontok">
          <ul>
            <li><strong>Kritikus pont:</strong> belső pont, ahol <M t="f_x = f_y = 0" /> vagy valamelyik nem létezik.</li>
            <li><strong>Hesse-determináns:</strong> <M t="D = f_{xx}f_{yy} - (f_{xy})^2" />.</li>
            <li><strong>Besorolás:</strong> <M t="D>0, f_{xx}>0" /> (Min) · <M t="D>0, f_{xx}<0" /> (Max) · <M t="D<0" /> (Nyereg) · <M t="D=0" /> (Nem dönt).</li>
            <li><strong>Zárt, korlátos tartomány:</strong> Belső kritikus pontok + Határ 1D kritikus pontjai + Csúcspontok → táblázatos összehasonlítás!</li>
          </ul>
        </Def>

        <Warn>
          <strong>5 klasszikus vizsgabuktató:</strong>
          <ol>
            <li><strong>Elfelejtett gyök osztás miatt:</strong> Pl. <M t="3x^2 - 3x = 0" /> esetén ne ossz <M t="x" />-szel, hanem emeld ki: <M t="3x(x-1)=0" />!</li>
            <li><strong>Előjelhiba a <M t="D" /> képletben:</strong> Mindig <em>mínusz</em> <M t="f_{xy}^2" /> van (<M t="D = f_{xx}f_{yy} - f_{xy}^2" />), és <M t="f_{xy}^2" /> mindig nemnegatív.</li>
            <li><strong>„Mindkét tengelyirányban minimum ⇒ lokális minimum”:</strong> Hamis! Ha <M t="f_{xx}>0, f_{yy}>0" />, de <M t="|f_{xy}|" /> túl nagy, <M t="D < 0" /> lehet (nyeregpont!).</li>
            <li><strong>Határ és csúcspontok kifelejtése:</strong> Zárt tartományon a belső kritikus pont gyakran <em>nem</em> adja meg az abszolút szélsőértéket — a csúcspontokat mindig számold ki!</li>
            <li><strong><M t="D = 0 \implies" /> nyeregpont?</strong> Hamis! Lehet minimum (<M t="x^4+y^4" />), maximum (<M t="-x^4-y^4" />) vagy nyereg (<M t="x^3+y^3" />) is.</li>
          </ol>
        </Warn>

        <h3>Könnyebb feladatok (15–17.)</h3>

        <Task n={15} q={<>Határozd meg az <M t="f(x,y) = x^2 + xy + y^2 + 3x - 3y + 4" /> kritikus pontját és típusát!</>}>
          <p>
            <M t="f_x = 2x + y + 3 = 0" />, <M t="f_y = x + 2y - 3 = 0" />.
            Megoldva: <M t="x = -3, \; y = 3" />.
            <M t="f_{xx} = 2, \; f_{yy} = 2, \; f_{xy} = 1 \implies D = 4 - 1 = 3 > 0" /> és <M t="f_{xx} > 0" /> ⇒
            <strong>lokális minimum</strong> a <M t="(-3, 3)" /> pontban, <M t="f(-3,3) = -5" />.
          </p>
        </Task>

        <Task n={16} q={<>Osztályozd az <M t="f(x,y) = 2xy - 5x^2 - 2y^2 + 4x + 4y - 4" /> kritikus pontját!</>}>
          <p>
            <M t="f_x = 2y - 10x + 4 = 0 \implies y = 5x - 2" />, <M t="f_y = 2x - 4y + 4 = 0" />.
            Behelyettesítve: <M t="2x - 20x + 8 + 4 = 0 \implies x = \frac{2}{3}, \; y = \frac{4}{3}" />.
            <M t="f_{xx} = -10, \; f_{yy} = -4, \; f_{xy} = 2 \implies D = 40 - 4 = 36 > 0" />, <M t="f_{xx} < 0" /> ⇒
            <strong>lokális maximum</strong> a <M t="(\frac{2}{3}, \frac{4}{3})" /> pontban, értéke <M t="0" />.
          </p>
        </Task>

        <Task n={17} q={<>Mutasd meg, hogy az <M t="f(x,y) = x^2 - y^2 - 2x + 4y + 1" /> függvénynek nincs lokális szélsőértéke!</>}>
          <p>
            <M t="f_x = 2x - 2 = 0 \implies x = 1" />, <M t="f_y = -2y + 4 = 0 \implies y = 2" />.
            Egyetlen kritikus pont a <M t="(1,2)" />, ahol <M t="f_{xx} = 2, \; f_{yy} = -2, \; f_{xy} = 0 \implies D = -4 < 0" />:
            nyeregpont, így a függvénynek sehol sincs lokális maximuma vagy minimuma.
          </p>
        </Task>

        <h3>Közepes feladatok (18–20.)</h3>

        <Task n={18} q={<>Keresd meg és osztályozd az <M t="f(x,y) = x^3 + y^3 + 3x^2 - 3y^2 - 8" /> összes kritikus pontját!</>}>
          <p>
            <M t="f_x = 3x(x+2) = 0 \implies x \in \{0, -2\}" />, <M t="f_y = 3y(y-2) = 0 \implies y \in \{0, 2\}" />.
            Négy kritikus pont, <M t="f_{xx}=6x+6, \; f_{yy}=6y-6, \; f_{xy}=0 \implies D = 36(x+1)(y-1)" />:
          </p>
          <ul>
            <li><M t="(0,0)" />: <M t="D = -36 < 0" /> ⇒ nyeregpont;</li>
            <li><M t="(0,2)" />: <M t="D = 36 > 0, \; f_{xx} = 6 > 0" /> ⇒ <strong>lokális minimum</strong> (<M t="f=-12" />);</li>
            <li><M t="(-2,0)" />: <M t="D = 36 > 0, \; f_{xx} = -6 < 0" /> ⇒ <strong>lokális maximum</strong> (<M t="f=-4" />);</li>
            <li><M t="(-2,2)" />: <M t="D = -36 < 0" /> ⇒ nyeregpont.</li>
          </ul>
        </Task>

        <Task n={19} q={<>Határozd meg az <M t="f(x,y) = x^2 + y^2 - xy + x + y" /> abszolút szélsőértékeit az <M t="x \le 0, \; y \le 0, \; x + y \ge -3" /> zárt háromszögön!</>}>
          <p>
            <strong>Belső:</strong> <M t="f_x = 2x - y + 1 = 0, \; f_y = 2y - x + 1 = 0 \implies (-1, -1)" /> (benne van, <M t="f(-1,-1) = -1" />).
            <br />
            <strong>Határ:</strong>
            • <M t="y=0, -3\le x\le 0" />: <M t="x^2+x" /> min <M t="(-1/2, 0)" />-ban (<M t="-1/4" />), végpontok <M t="(0,0): 0" />, <M t="(-3,0): 6" />.
            • <M t="x=0, -3\le y\le 0" />: szimmetriából <M t="(0,-1/2): -1/4" />, <M t="(0,-3): 6" />.
            • <M t="y = -3-x" />: <M t="3x^2 + 9x + 6" /> min <M t="x = -3/2" />-nél (<M t="f(-3/2,-3/2) = -3/4" />).
            <br />
            <strong>Válasz:</strong> Abszolút minimum <M t="-1" /> a <M t="(-1,-1)" /> pontban; abszolút maximum <M t="6" /> a <M t="(-3,0)" /> és <M t="(0,-3)" /> csúcsokban.
          </p>
        </Task>

        <Task n={20} q={<>Egy zárt téglatest alakú tartály alapja és teteje 2000 Ft/m², oldalai 1000 Ft/m² anyagból készülnek. Mi a legolcsóbb méret <M t="V = 4\text{ m}^3" /> térfogathoz?</>}>
          <p>
            Költség (ezer Ft-ban): <M t="C(x,y) = 4xy + 2(x+y)\frac{4}{xy} = 4xy + \frac{8}{y} + \frac{8}{x}" />.
            <M t="C_x = 4y - \frac{8}{x^2} = 0" />, <M t="C_y = 4x - \frac{8}{y^2} = 0 \implies x^2 y = 2 = x y^2 \implies x = y = \sqrt[3]{2} \approx 1{,}26\text{ m}" />,
            <M t="z = \frac{4}{2^{2/3}} = 2\sqrt[3]{2} \approx 2{,}52\text{ m}" />.
            (Érdemes megfigyelni: drágább fedél és fenék miatt a tartály karcsúbb, kétszer magasabb, mint amilyen széles!)
          </p>
        </Task>

        <h3>Haladó feladatok (21–23.)</h3>

        <Task n={21} q={<>Keresd meg az <M t="f(x,y) = e^x \cos y" /> függvény összes kritikus pontját, és indokold geometriailag az eredményt!</>}>
          <p>
            <M t="f_x = e^x \cos y = 0 \implies \cos y = 0" />, <M t="f_y = -e^x \sin y = 0 \implies \sin y = 0" />.
            Mivel <M t="\cos y" /> és <M t="\sin y" /> soha nem nulla egyszerre (<M t="\sin^2 y + \cos^2 y = 1" />),
            a függvénynek <strong>egyetlen kritikus pontja sincs</strong>! (Geometriailag: ez egy harmonikus függvény,
            <M t="f_{xx} + f_{yy} = 0" />, és a harmonikus függvényeknek a maximum-elv szerint nincs szigorú belső szélsőértékük.)
          </p>
        </Task>

        <Task n={22} q={<>Bizonyítsd be, hogy ha egy <M t="C^2" /> függvény eleget tesz a Laplace-egyenletnek (<M t="f_{xx} + f_{yy} = 0" />), és nem konstans, akkor nem lehet olyan kritikus pontja, ahol <M t="D > 0" />!</>}>
          <p>
            Mivel <M t="f_{yy} = -f_{xx}" />, a Hesse-determináns minden kritikus pontban:
            <M block t="D = f_{xx}(-f_{xx}) - f_{xy}^2 = -\bigl(f_{xx}^2 + f_{xy}^2\bigr) \le 0." />
            Így <M t="D > 0" /> lehetetlen! Minden nem elfajuló kritikus pont nyeregpont — pont úgy, ahogy egy
            szappanhártya sem tud magától „púpot” képezni a keret belsejében.
          </p>
        </Task>

        <Task n={23} q={<>Adott az <M t="f(x,y) = (x^2 + y^2)e^{-(x^2+y^2)}" /> függvény az <M t="x^2 + y^2 \le 4" /> zárt körlapon. Keresd meg az abszolút minimumát és az összes pontot, ahol az abszolút maximumát felveszi!</>}>
          <p>
            Vezessük be az <M t="r^2 = x^2 + y^2 \in [0, 4]" /> változót! Ekkor <M t="f(x,y) = h(r^2) = u e^{-u}" />,
            ahol <M t="u \in [0, 4]" />.
            Deriválva: <M t="h'(u) = (1 - u)e^{-u} = 0 \implies u = 1" />.
          </p>
          <ul>
            <li><M t="u = 0" /> (origó): <M t="h(0) = 0" /> → <strong>abszolút minimum</strong> az <M t="(0,0)" /> pontban.</li>
            <li><M t="u = 1" /> (egységkör!): <M t="h(1) = \frac{1}{e} \approx 0{,}368" /> → <strong>abszolút maximum</strong> az egész <M t="x^2 + y^2 = 1" /> körvonal minden pontjában!</li>
            <li><M t="u = 4" /> (határkör): <M t="h(4) = 4e^{-4} \approx 0{,}073" /> (sem nem min, sem nem max).</li>
          </ul>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={<>Ha egy kritikus pontban <M t="f_{xx} = -4" />, <M t="f_{yy} = -2" /> és <M t="f_{xy} = 1" />, milyen típusú a kritikus pont?</>}
          options={[
            { label: 'Lokális maximum', ok: true },
            { label: 'Lokális minimum' },
            { label: 'Nyeregpont' },
            { label: 'Nem dönthető el' },
          ]}
          explain={
            <>
              A Hesse-determináns <M t="D = (-4)(-2) - 1^2 = 7 > 0" /> és <M t="f_{xx} = -4 < 0" />, ezért a kritikus pont{' '}
              <strong>lokális maximum</strong>.
            </>
          }
        />
      </>
    ),
  },
];
