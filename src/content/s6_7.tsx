import { M } from '../components/M';
import { Def, Quiz, Story, Task, Warn } from '../components/ui';
import {
  CentroidForceShortcutWidget,
  HydrostaticParadoxWidget,
  ParabolicGateDiagram,
  SubmergedPlateShapesWidget,
  VerticalDamSliceWidget,
} from '../components/Widgets67';
import type { Page } from './s1_1';

export const S6_7: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Hidrosztatikai nyomás és a hidrosztatikai paradoxon',
    body: (
      <>
        <Story>
          <p>
            Ha valaha lemerültél egy uszoda aljára, azonnal érezted a füleden, hogy mélyebben erősebben nyom a víz. A völgyzáró gátakat, tengeralattjáró-ablakokat és óriásakváriumokat pontosan ennek a növekvő nyomásnak kell ellenállniuk — lássuk, hogyan számoljuk ki a teljes folyadékerőt integrálással!
          </p>
        </Story>
        <Def title="Hidrosztatikai nyomás és állandó mélységű erő">
          <ul>
            <li>
              Nyugvó, <M t="\rho" /> sűrűségű folyadékban <M t="h" /> mélységben a nyomás:
              <M block t="p \;=\; \rho g h \qquad (\text{SI: Pa} = \text{N/m}^2;\quad \text{víznél } \rho g \approx 9800\text{ N/m}^3)." />
            </li>
            <li>
              Egy <strong>vízszintes</strong>, <M t="A" /> területű lapra <M t="h" /> mélységben ható erő:
              <M block t="F \;=\; p\cdot A \;=\; \rho g h A." />
            </li>
          </ul>
        </Def>
        <p>
          A nyomás <strong>kizárólag a mélységtől</strong> függ — egyáltalán nem számít, milyen alakú a tartály! Ezt nevezzük <strong>hidrosztatikai paradoxonnak</strong>:
        </p>
        <HydrostaticParadoxWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Egy <M t="10\text{ m}\times 5\text{ m}" /> alapterületű úszómedencében <M t="2\text{ m}" /> mély a víz. Mekkora erő nehezedik a medence aljára (<M t="\rho g = 9800\text{ N/m}^3" />)?
            </>
          }
        >
          <p>
            <M t="A = 50\text{ m}^2,\; h = 2\text{ m} \implies F = 9800\cdot 2\cdot 50 = 980\,000\text{ N} = \mathbf{980\text{ kN}}" /> (közel 100 tonna súlya!).
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Egy búvár <M t="10\text{ m}" /> mélyre merül édesvízben. Mekkora a hidrosztatikai nyomás, és mekkora erő hat a <M t="0{,}5\text{ cm}^2" />-es dobhártyájára?
            </>
          }
        >
          <p>
            <M t="p = 9800\cdot 10 = \mathbf{98\text{ kPa}}" /> (majdnem +1 atmoszféra!). A terület <M t="A = 0{,}5\cdot 10^{-4}\text{ m}^2" />, így <M t="F = 98\,000\cdot 0{,}5\cdot 10^{-4} = \mathbf{4{,}9\text{ N}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Függőleges falakra ható folyadékerő (integrálképlet)',
    body: (
      <>
        <Story>
          <p>
            Egy függőleges gát vagy akváriumfal esetében a nyomás már <em>nem állandó</em>: a vízfelszínen nulla, lefelé haladva pedig arányosan nő! Ezért a falat <strong>vékony vízszintes csíkokra</strong> vágjuk — egy keskeny vízszintes csík mentén a mélység (és a nyomás) közel állandó!
          </p>
        </Story>
        <Def title="Függőleges síklemezre ható folyadékerő">
          <p>
            Ha az <M t="y\in[a;\,b]" /> sávban a vízszintes csík mélysége a vízfelszíntől <M t="h(y)" />, szélessége pedig <M t="L(y)" />, akkor a teljes folyadékerő:
          </p>
          <M block t="F \;=\; \int_{a}^{b} \rho g\,h(y)\,L(y)\,dy." />
        </Def>
        <VerticalDamSliceWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Egy <M t="4\text{ m}" /> széles, <M t="3\text{ m}" /> magas téglalap alakú zsilipkapu felső éle pontosan a vízfelszínen van. Mekkora erő nyomja a víz felőli oldalát (<M t="\rho g" />-vel és kN-ban)?
            </>
          }
        >
          <p>
            <M t="F = \rho g\int_0^3 h\cdot 4\,dh = 4\rho g\left[\frac{h^2}{2}\right]_0^3 = \mathbf{18\rho g} \approx \mathbf{176{,}4\text{ kN}}" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Most süllyesszük le ugyanezt a <M t="4\text{ m}\times 3\text{ m}" />-es zsilipkaput úgy, hogy a felső éle <M t="2\text{ m}" />-rel a vízfelszín alatt legyen! Mekkora erő hat rá most?
            </>
          }
        >
          <p>
            A mélység most <M t="h=2" />-től <M t="h=5" />-ig fut:
            <M block t="F = 4\rho g\int_{2}^{5} h\,dh = 2\rho g(25 - 4) = \mathbf{42\rho g} \approx \mathbf{411{,}6\text{ kN}}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Háromszög és trapéz alakú gátak, vályúk',
    body: (
      <>
        <Story>
          <p>
            A valóságban a gátak és vályúk oldallapjai gyakran háromszög vagy trapéz alakúak, így a vízszintes csík <M t="L(y)" /> szélessége is változik a mélységgel! Nézd meg az alábbi ábrán: ha megfordítasz egy háromszöglemezt (csúccsal lefelé vs. csúccsal felfelé), a területe ugyanakkora marad — a rá ható vízerő viszont <strong>megduplázódik</strong>!
          </p>
        </Story>
        <SubmergedPlateShapesWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Egy vízzel teli vályú véglemeze egy csúcsával lefelé álló, felül <M t="6\text{ m}" /> széles és <M t="3\text{ m}" /> magas háromszög. Mekkora erő hat rá?
            </>
          }
        >
          <p>
            Hasonló háromszögekkel <M t="h" /> mélységben a szélesség <M t="L(h) = 6\left(1-\frac{h}{3}\right) = 6 - 2h" />:
          </p>
          <M block t="F = \rho g\int_{0}^{3} h(6-2h)\,dh = \rho g\left[3h^2 - \frac{2}{3}h^3\right]_{0}^{3} = \rho g(27 - 18) = \mathbf{9\rho g}." />
        </Task>
        <Task
          n={6}
          q={
            <>
              Egy trapéz alakú gát felül <M t="10\text{ m}" />, alul <M t="6\text{ m}" /> széles és <M t="4\text{ m}" /> magas, a víz a tetejéig ér. Számítsd ki a gátra ható teljes vízerőt!
            </>
          }
        >
          <p>
            A szélesség <M t="h=0" />-nál <M t="10" />, <M t="h=4" />-nél <M t="6" />, tehát lineárisan <M t="L(h) = 10 - h" />:
          </p>
          <M block t="F = \rho g\int_{0}^{4} h(10-h)\,dh = \rho g\left[5h^2 - \frac{h^3}{3}\right]_{0}^{4} = \rho g\left(80 - \frac{64}{3}\right) = \mathbf{\frac{176}{3}\rho g}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'A súlypont-csoda: F = ρg · h̄ · A (integrálás nélkül!)',
    body: (
      <>
        <Story>
          <p>
            Van egy lenyűgöző összefüggés a 6.4-es szakasz (súlypont) és a 6.7-es szakasz (folyadékerő) között! Figyeld meg az <M t="F = \rho g\int_a^b h(y)\,L(y)\,dy" /> integrált: a benne lévő <M t="\int h(y)\,L(y)\,dy" /> pontosan a lemez vízfelszínre vett <strong>nyomatéka</strong>, ami egyenlő <M t="\bar{h}\cdot A" />-val!
          </p>
        </Story>
        <Def title="Folyadékerő a súlypont mélységével">
          <M block t="F \;=\; \rho g\,\bar{h}\,A \;=\; p(\bar{h})\cdot A." />
          <p>
            Egy tetszőleges, függőlegesen vízbe merített <M t="A" /> területű síklemezre ható teljes folyadékerő pontosan egyenlő a lemez <strong>területének</strong> és a <strong>súlypontjában (<M t="\bar{h}" />) mért nyomásnak</strong> a szorzatával!
          </p>
        </Def>
        <CentroidForceShortcutWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Egy tengeralattjáró <M t="r=0{,}5\text{ m}" /> sugarú függőleges körablakának középpontja <M t="8\text{ m}" /> mélyen van édesvízben. Mekkora erő nyomja az ablakot?
            </>
          }
        >
          <p>
            <M t="A = \pi(0{,}5)^2 = \frac{\pi}{4}\text{ m}^2" />, <M t="\bar{h}=8\text{ m}" />:
            <M t="F = \rho g\cdot 8\cdot\frac{\pi}{4} = \mathbf{2\pi\rho g} \approx \mathbf{61{,}6\text{ kN}}" />!
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Egy <M t="r=3\text{ m}" /> sugarú félkör alakú függőleges zsilip egyenes átmérője pontosan a vízfelszínen fekszik. Számítsd ki a vízerőt 1 sorban a 6.4-es félkör-súlyponttal (<M t="\bar{h}=\frac{4r}{3\pi}" />)!
            </>
          }
        >
          <p>
            <M t="A = \frac{9\pi}{2}" />, <M t="\bar{h} = \frac{4\cdot 3}{3\pi} = \frac{4}{\pi}" />:
            <M block t="F = \rho g\cdot\frac{4}{\pi}\cdot\frac{9\pi}{2} = \mathbf{18\rho g}!" />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Görbe határolású kapuk — integrál és súlypont együtt',
    body: (
      <>
        <Story>
          <p>
            Ha egy zsilipkapu vagy kémlelőnyílás parabola vagy félkör alakú, mindkét fegyverünket bevethetjük: felírhatjuk a közvetlen vízszintes csíkos integrált, vagy felhasználhatjuk a 6.4-ből ismert súlypontot — és a két eredmény tökéletesen ellenőrzi egymást!
          </p>
        </Story>
        <ParabolicGateDiagram />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Igazold részletes integrálással az 5. ábra eredményét: az <M t="y=x^2" /> (<M t="0\le y\le 4" />) parabola kapura ható vízerő <M t="\dfrac{256}{15}\rho g" /> (vízfelszín <M t="y=4" />-nél)!
            </>
          }
        >
          <p>
            Az <M t="y" /> magasságban a mélység <M t="4-y" />, a szélesség <M t="2\sqrt{y}" />:
          </p>
          <M block t="F = \rho g\int_{0}^{4}(4-y)\cdot 2y^{1/2}\,dy = 2\rho g\left[\frac{8}{3}y^{3/2}-\frac{2}{5}y^{5/2}\right]_{0}^{4} = 2\rho g\left(\frac{64}{3}-\frac{64}{5}\right) = \mathbf{\frac{256}{15}\rho g}." />
        </Task>
        <Task
          n={10}
          q={
            <>
              Egy <M t="r=2\text{ m}" /> sugarú félkör alakú függőleges ablak <em>domború teteje</em> érinti a vízfelszínt (egyenes alapja <M t="2\text{ m}" /> mélyen van). Mekkora erő hat rá a súlypont-tétellel?
            </>
          }
        >
          <p>
            A súlypont az alaptól <M t="\frac{4r}{3\pi}=\frac{8}{3\pi}" /> magasságban van, tehát a vízfelszíntől mért mélysége <M t="\bar{h} = 2 - \frac{8}{3\pi}" />. Területe <M t="A = \frac{\pi\cdot 2^2}{2} = 2\pi" />:
          </p>
          <M block t="F = \rho g\left(2-\frac{8}{3\pi}\right)(2\pi) = \mathbf{\left(4\pi - \frac{16}{3}\right)\rho g} \approx 7{,}23\rho g." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok',
    body: (
      <>
        <Def title="6.7 Puskakártya">
          <ul>
            <li><strong>Hidrosztatikai nyomás:</strong> <M t="p = \rho g h" /> (víznél <M t="\rho g \approx 9800\text{ N/m}^3" />).</li>
            <li><strong>Vízszintes lap:</strong> <M t="F = \rho g h A" /> (hidrosztatikai paradoxon: a tartály alakja nem számít).</li>
            <li><strong>Függőleges lap (integrál):</strong> <M t="F = \int_a^b \rho g\,h(y)\,L(y)\,dy" /> (vízszintes csíkokkal!).</li>
            <li><strong>Súlypont-rövidítés:</strong> <M t="F = \rho g\,\bar{h}\,A" /> (egyetlen integrál nélkül, ha ismered <M t="\bar{h}" />-t és <M t="A" />-t!).</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>4 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong>A mélységet (<M t="h" />) MINDIG a vízfelszíntől mérd!</strong> Ha a lemez teteje <M t="2\text{ m}" />-rel a felszín alatt van, akkor <M t="h" /> értéke <M t="2" />-ről indul, nem <M t="0" />-ról!
            </li>
            <li>
              <strong>Csak vízszintes csíkokat szabad használni!</strong> Függőleges csíkon változik a mélység (és a nyomás), ezért nem állandó rajta <M t="p" />!
            </li>
            <li>
              <strong>Félig víz alatti lemez:</strong> csak a <em>víz alá merülő</em> részre hat víznyomás — a levegőben lévő részt hagyd ki az integrálból!
            </li>
            <li>
              <strong>Más folyadékok sűrűsége:</strong> tengervíznél (<M t="\approx 1025" />), olajnál (<M t="\approx 900" />) vagy higanynál (<M t="13\,600\text{ kg/m}^3" />) mindig a megadott <M t="\rho" />-val számolj!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={11}
          q={
            <>
              Egy <M t="2\text{ m}" /> széles és <M t="1\text{ m}" /> mély akvárium függőleges üvegfalára mekkora vízerő hat?
            </>
          }
        >
          <p>
            <M t="F = \rho g\cdot 0{,}5\cdot 2 = \mathbf{\rho g} \approx \mathbf{9{,}8\text{ kN}}" /> (közel 1 tonna súlya!).
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Egy <M t="r=1\text{ m}" /> sugarú kör alakú víz alatti ablak középpontja <M t="5\text{ m}" /> mélyen van. Mekkora erő nyomja?
            </>
          }
        >
          <p>
            Súlypont-tétellel: <M t="F = \rho g\cdot 5\cdot(\pi\cdot 1^2) = \mathbf{5\pi\rho g} \approx \mathbf{153{,}9\text{ kN}}" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Egy <M t="2\text{ m}\times 2\text{ m}" />-es négyzet alakú zsilip felső éle <M t="3\text{ m}" />-rel a vízfelszín alatt van. Mekkora erő hat rá?
            </>
          }
        >
          <p>
            A négyzet középpontja <M t="\bar{h} = 3+1 = 4\text{ m}" /> mélyen van, területe <M t="A=4\text{ m}^2" />: <M t="F = \rho g\cdot 4\cdot 4 = \mathbf{16\rho g} \approx \mathbf{156{,}8\text{ kN}}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Egy <M t="4\text{ m}" /> alapú, <M t="6\text{ m}" /> magas háromszöglemezt függőlegesen vízbe merítünk úgy, hogy a felső csúcsa a vízfelszínen, vízszintes alapja pedig <M t="6\text{ m}" /> mélyen legyen. Mekkora erő hat rá?
            </>
          }
        >
          <p>
            Terület <M t="A=12\text{ m}^2" />, súlypont mélysége a csúcstól <M t="\bar{h}=\frac{2}{3}\cdot 6 = 4\text{ m}" />:
            <M t="F = \rho g\cdot 4\cdot 12 = \mathbf{48\rho g}" />. (Integrállal: <M t="\rho g\int_0^6 h\cdot\frac{2}{3}h\,dh = 48\rho g" /> ✓)
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Egy trapéz alakú gát felül <M t="8\text{ m}" />, alul <M t="4\text{ m}" /> széles és <M t="6\text{ m}" /> magas, a víz a tetejéig ér. Számítsd ki a vízerőt!
            </>
          }
        >
          <p>
            <M t="h" /> mélységben a szélesség <M t="L(h) = 8 - \frac{2}{3}h" />:
          </p>
          <M block t="F = \rho g\int_{0}^{6} h\left(8-\frac{2}{3}h\right)dh = \rho g\left[4h^2 - \frac{2}{9}h^3\right]_{0}^{6} = \rho g(144 - 48) = \mathbf{96\rho g}." />
        </Task>
        <Task
          n={16}
          q={
            <>
              Egy <M t="4\text{ m}" /> széles, <M t="6\text{ m}" /> magas függőleges kapu előtt csak <M t="3\text{ m}" /> magasan áll a víz. Mekkora erő hat a kapura?
            </>
          }
        >
          <p>
            Csak az alsó <M t="4\text{ m}\times 3\text{ m}" />-es víz alatti részre hat víznyomás: <M t="A=12\text{ m}^2,\; \bar{h}=1{,}5\text{ m} \implies F = \mathbf{18\rho g}" />.
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              Egy <M t="R=2\text{ m}" /> sugarú félkör alakú függőleges ablak egyenes átmérője pontosan a vízfelszínen van. Számítsd ki a vízerőt (a) közvetlen integrálással, (b) a súlypont-tétellel!
            </>
          }
        >
          <p>
            (a) <M t="h\in[0;\,2]" /> mélységben <M t="L(h)=2\sqrt{4-h^2}" /> (<M t="u=4-h^2" />):
            <M block t="F = \rho g\int_{0}^{2} 2h\sqrt{4-h^2}\,dh = \rho g\left[-\frac{2}{3}(4-h^2)^{3/2}\right]_{0}^{2} = \mathbf{\frac{16}{3}\rho g}." />
            (b) <M t="A=2\pi,\; \bar{h}=\frac{4\cdot 2}{3\pi}=\frac{8}{3\pi} \implies F = \rho g\cdot\frac{8}{3\pi}\cdot 2\pi = \mathbf{\dfrac{16}{3}\rho g}" /> ✓
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              <em>Erőfelező mélység:</em> egy <M t="H" /> mélységű téglalap alakú gátat milyen <M t="d" /> mélységben kell vízszintesen kettévágni ahhoz, hogy a felső és az alsó részre <strong>ugyanakkora</strong> vízerő hasson?
            </>
          }
        >
          <p>
            A felső <M t="[0;\,d]" /> sávra ható erő <M t="\frac{1}{2}\rho g w d^2" />, a teljes erő <M t="\frac{1}{2}\rho g w H^2" />. A feltétel:
          </p>
          <M block t="\frac{1}{2}\rho g w d^2 = \frac{1}{2}\left(\frac{1}{2}\rho g w H^2\right) \implies d^2 = \frac{H^2}{2} \implies d = \mathbf{\frac{H}{\sqrt{2}} \approx 0{,}707\,H}." />
          <p><em>(A gát alsó 29%-a tartja a teljes vízerő felét!)</em></p>
        </Task>
        <Task
          n={19}
          q={
            <>
              <em>Csúcsára állított négyzetablak:</em> egy <M t="2\sqrt{2}\text{ m}" /> oldalú négyzetet csúcsára állítva merítünk vízbe úgy, hogy a felső csúcsa éppen a vízfelszínt érinti. Mekkora vízerő hat rá?
            </>
          }
        >
          <p>
            A négyzet átlója <M t="2\sqrt{2}\cdot\sqrt{2}=4\text{ m}" />, így a súlypontja <M t="\bar{h}=2\text{ m}" /> mélyen van, területe pedig <M t="A=(2\sqrt{2})^2=8\text{ m}^2" />. A súlypont-tétellel 1 sorban:
          </p>
          <M block t="F = \rho g\cdot 2\cdot 8 = \mathbf{16\rho g} \approx \mathbf{156{,}8\text{ kN}}." />
        </Task>

        <h3>Gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={<>Függ-e egy függőleges zsilipkapura ható hidrosztatikai erő a mögötte lévő víztározó hosszúságától (a tó méretétől)?</>}
          options={[
            { label: <>Igen, a tó teljes tömegétől függ</> },
            { label: <>Csak akkor nem, ha a fal ferde</> },
            { label: <>Igen, a tó szélességével arányos</> },
            { label: <>Nem, kizárólag a vízmélységtől, a folyadék sűrűségétől és a kapu geometriájától</>, ok: true },
          ]}
          explain={
            <>
              A hidrosztatikai paradoxon értelmében a nyomás csak a mélységtől függ (<M t="p = \rho g h" />).
            </>
          }
        />
      </>
    ),
  },
];
