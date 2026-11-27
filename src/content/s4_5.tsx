import { M } from '../components/M';
import { Def, Steps, Story, Task, Warn } from '../components/ui';
import {
  CanOptWidget,
  InscribedRectWidget,
  LifeguardWidget,
  OpenBoxWidget,
  OptStepsDiagram,
  ProfitOptWidget,
} from '../components/Widgets45';
import type { Page } from './s1_1';

export const S4_5: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Az optimalizálás művészete: a 6 lépéses stratégia',
    body: (
      <>
        <Story>
          <p>
            A természet és a mérnöki tervezés egyaránt „takarékos”: a méhek a legkevesebb viaszból építik a legnagyobb térfogatú sejtet, a fénysugár a leggyorsabb utat választja két közeg között, a gyárak pedig a legkisebb költséggel akarnak maximális profitot elérni. Mindezek mögött ugyanaz a matematikai elv áll: <strong>alkalmazott optimalizálás</strong> deriválással!
          </p>
        </Story>
        <p>
          Az optimalizálási feladatokban a nehézség ritkán maga a deriválás — szinte mindig a <strong>szöveg lefordítása egyetlen egyváltozós függvényre</strong>! Az alábbi 6 lépéses recept minden típusú feladatot biztonságosan sínen tart:
        </p>
        <OptStepsDiagram />
        <Def title="A 6 lépéses optimalizálási stratégia">
          <ol>
            <li><strong>Értsd meg és rajzolj:</strong> írd fel az ismert adatokat, nevezd el a változókat, és jelöld meg világosan, mit kell maximalizálni vagy minimalizálni.</li>
            <li><strong>Célfüggvény:</strong> írd fel a keresett mennyiséget (pl. terület <M t="A" />, térfogat <M t="V" />, költség <M t="K" />, idő <M t="T" />) képlettel.</li>
            <li><strong>Mellékfeltétel (kényszer):</strong> ha a célfüggvényben két változó szerepel (<M t="x, y" />), használd a feladat kényszerfeltételét (pl. adott kerület, adott térfogat, Pitagorasz-tétel), fejezd ki <M t="y" />-t <M t="x" />-szel, és helyettesítsd be!</li>
            <li><strong>Értelmezési tartomány:</strong> gondold végig, milyen <M t="x" /> értékeknek van fizikai értelme (pl. hosszúság <M t=">0" />). Zárt <M t="[a;\,b]" /> vagy nyílt <M t="(a;\,b)" /> intervallum?</li>
            <li><strong>Kritikus pontok:</strong> deriválj <M t="x" /> szerint, oldd meg az <M t="f'(x)=0" /> egyenletet (és nézd meg, hol nem létezik <M t="f'" />).</li>
            <li><strong>Igazolás (abszolút szélsőérték!):</strong> zárt intervallumon hasonlítsd össze a végpontokkal; nyílt intervallumon igazold az első vagy második derivált előjelével az egész tartományon!</li>
          </ol>
        </Def>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Két nemnegatív szám összege <M t="20" />. Melyik két szám szorzata a legnagyobb?
            </>
          }
        >
          <p>
            Mellékfeltétel: <M t="x+y=20 \Rightarrow y=20-x" /> (<M t="x \in [0;\,20]" />). Célfüggvény: <M t="P(x)=x(20-x)=20x-x^2" />.
          </p>
          <p>
            <M t="P'(x)=20-2x=0 \Rightarrow x=10" />, és <M t="P''(x)=-2 < 0" />. A két szám <M t="10" /> és <M t="10" />, a maximális szorzat <M t="100" />!
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Egy <M t="40" /> m kerületű téglalap alakú kert oldalait hogyan válasszuk meg, hogy a területe a lehető legnagyobb legyen?
            </>
          }
        >
          <p>
            <M t="2x+2y=40 \Rightarrow y=20-x" />, <M t="A(x)=x(20-x)" /> (<M t="x \in (0;\,20)" />).
          </p>
          <p>
            <M t="A'(x)=20-2x=0 \Rightarrow x=10,\; y=10" /> m (vagyis a <strong>négyzet</strong> adja a legnagyobb területet: <M t="100\;\text{m}^2" />!).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Geometriai klasszikus 1: A nyitott doboz és a folyóparti kerítés',
    body: (
      <>
        <p>
          Nézzünk két alapvető, zárt intervallumos geometriai nagypéldát lépésről lépésre!
        </p>
        <p>
          <strong>Nagypélda 1 (nyitott doboz kartonból):</strong> egy <M t="24\times 24" /> cm-es négyzet alakú kartonlap négy sarkából egybevágó <M t="x\times x" />-es négyzeteket vágunk ki, majd az oldalakat felhajtjuk. Mekkora <M t="x" /> esetén lesz a doboz térfogata maximális?
        </p>
        <ul>
          <li><strong>Célfüggvény:</strong> az alap oldalhossza <M t="24-2x" />, a magasság <M t="x" />, tehát <M t="V(x) = x(24-2x)^2 = 4x^3 - 96x^2 + 576x" />.</li>
          <li><strong>Tartomány:</strong> <M t="x \ge 0" /> és <M t="24-2x \ge 0 \Rightarrow x \in [0;\,12]" />.</li>
          <li><strong>Deriválás:</strong> <M t="V'(x) = 12x^2 - 192x + 576 = 12(x^2-16x+48) = 12(x-4)(x-12) = 0" />. Belső kritikus pont: <M t="x=4" /> cm!</li>
          <li><strong>Igazolás (zárt intervallum):</strong> <M t="V(0)=0" />, <M t="V(4)=4\cdot 16^2 = 1024\;\text{cm}^3" />, <M t="V(12)=0" /> → abszolút maximum <M t="x=4" /> cm-nél!</li>
        </ul>
        <OpenBoxWidget />
        <Steps
          source="Analízis-labor"
          title="Nyitott doboz optimalizálása 18×18 cm-es lemezből"
          problem={
            <>
              Egy <M t="18\text{ cm}\times 18\text{ cm}" />-es fémlemez sarkaiból <M t="x" /> oldalú négyzeteket vágunk ki és nyitott dobozt hajtogatunk. Mekkora <M t="x" /> adja a legnagyobb térfogatot?
            </>
          }
          steps={[
            {
              title: 'Célfüggvény és fizikai tartomány',
              body: (
                <p>
                  Térfogat: <M t="V(x) = x(18 - 2x)^2 = 4x^3 - 72x^2 + 324x" />, ahol <M t="0 < x < 9" />.
                </p>
              ),
            },
            {
              title: 'Deriválás és kritikus pontok',
              body: (
                <p>
                  <M t="V'(x) = 12x^2 - 144x + 324 = 12(x - 3)(x - 9) = 0" />.
                </p>
              ),
            },
            {
              title: 'Igazolás második deriválttal',
              body: (
                <p>
                  Az egyetlen belső kritikus pont <M t="x = 3\text{ cm}" />, ekkor <M t="V''(3) = 24(3) - 144 = -72 < 0" /> (maximum).
                </p>
              ),
            },
            {
              title: 'Maximális térfogat',
              body: (
                <p>
                  <M t="V(3) = 3\cdot 12^2 = 432\text{ cm}^3" />.
                </p>
              ),
            },
          ]}
        />
        <p>
          <strong>Nagypélda 2 (folyóparti kerítés):</strong> <M t="120" /> m drótkerítéssel egy egyenes folyópart mentén akarunk téglalap alakú karámot elkeríteni (a folyó felőli oldalra nem kell kerítés!). Ekkor a mellékfeltétel <M t="2x+y=120 \Rightarrow y=120-2x" />, a terület <M t="A(x)=x(120-2x)=120x-2x^2" />. Deriválva <M t="A'(x)=120-4x=0 \Rightarrow x=30" /> m, <M t="y=60" /> m! Figyeld meg: itt <em>nem</em> négyzet az optimum, hanem <M t="1:2" /> arányú téglalap (<M t="A_{\max}=1800\;\text{m}^2" />)!
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Egy <M t="30\times 30" /> cm-es kartonból vágunk ki <M t="x\times x" />-es sarkokat nyitott dobozhoz. Mekkora <M t="x" /> adja a legnagyobb térfogatot?
            </>
          }
        >
          <p>
            <M t="V(x)=x(30-2x)^2 \Rightarrow V'(x)=(30-2x)^2 - 4x(30-2x) = (30-2x)(30-6x) = 0 \Rightarrow x = 5" /> cm! (Általános szabály: négyzet alakú lapnál mindig az oldal <strong>egyhatoda</strong>, <M t="a/6" /> az optimális kivágás!)
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              <M t="240" /> m kerítésből két egyforma, egymás melletti téglalap alakú karámot kerítünk el (közös belső elválasztófallal, tehát 3 db <M t="x" /> és 2 db <M t="y" /> oldal). Mekkora a maximális összterület?
            </>
          }
        >
          <p>
            Mellékfeltétel: <M t="3x+2y=240 \Rightarrow y=120-\frac{3}{2}x" />. Terület: <M t="A(x)=xy = 120x - \frac{3}{2}x^2" />.
          </p>
          <p>
            <M t="A'(x)=120-3x=0 \Rightarrow x=40" /> m, <M t="y=60" /> m, maximális összterület: <M t="40\cdot 60 = 2400\;\text{m}^2" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Nyílt intervallumos optimum: a legolcsóbb konzervdoboz',
    body: (
      <>
        <p>
          Sok valódi tervezési feladatban az értelmezési tartomány <strong>nyílt és korlátlan</strong> (pl. <M t="r \in (0;\,\infty)" />), így a zárt intervallumos módszer nem alkalmazható! Hogyan bizonyítjuk be mégis, hogy a talált kritikus pont valóban <strong>abszolút</strong> szélsőérték?
        </p>
        <Def title="Az egyetlen kritikus pont tesztje (nyílt intervallumon)">
          <p>
            Ha a folytonos <M t="f" /> függvénynek egy <M t="I" /> intervallumon <strong>egyetlen <M t="c" /> kritikus pontja</strong> van, és:
          </p>
          <ul>
            <li><M t="f'(x) < 0" /> minden <M t="x < c" />-re és <M t="f'(x) > 0" /> minden <M t="x > c" />-re (vagy <M t="f''(x) > 0" /> az egész <M t="I" />-n), akkor <M t="f(c)" /> <strong>abszolút minimum</strong>!</li>
            <li><M t="f'(x) > 0" /> minden <M t="x < c" />-re és <M t="f'(x) < 0" /> minden <M t="x > c" />-re (vagy <M t="f''(x) < 0" /> az egész <M t="I" />-n), akkor <M t="f(c)" /> <strong>abszolút maximum</strong>!</li>
          </ul>
        </Def>
        <p>
          <strong>Nagypélda (1 literes zárt fémhenger minimális anyaggal):</strong> tervezzünk <M t="V=1000\;\text{cm}^3" /> térfogatú, zárt henger alakú konzervdobozt úgy, hogy a teljes felszíne (<M t="S" />) a lehető legkisebb legyen!
        </p>
        <ul>
          <li><strong>Mellékfeltétel:</strong> <M t="\pi r^2 h = 1000 \;\Longrightarrow\; h = \dfrac{1000}{\pi r^2}" /> (<M t="r > 0" />).</li>
          <li><strong>Célfüggvény:</strong> <M t="S(r) = 2\pi r^2 + 2\pi r h = 2\pi r^2 + \dfrac{2000}{r}" />.</li>
          <li><strong>Deriválás:</strong> <M t="S'(r) = 4\pi r - \dfrac{2000}{r^2} = 0 \;\Longleftrightarrow\; 4\pi r^3 = 2000 \;\Longleftrightarrow\; r = \sqrt[3]{\dfrac{500}{\pi}} \approx 5{,}42" /> cm.</li>
          <li><strong>Igazolás:</strong> <M t="S''(r) = 4\pi + \dfrac{4000}{r^3} > 0" /> <em>minden</em> <M t="r > 0" />-ra! A görbe végig konvex, tehát ez biztosan <strong>abszolút minimum</strong>!</li>
          <li><strong>Meglepő geometriai arány:</strong> <M t="h = \dfrac{1000}{\pi r^2} = \dfrac{2\cdot 500}{\pi r^2} = \dfrac{2\pi r^3}{\pi r^2} = \mathbf{2r}" /> — vagyis a legolcsóbb zárt henger magassága pontosan megegyezik az <strong>átmérőjével</strong>!</li>
        </ul>
        <CanOptWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Mi változik a fenti konzervdoboznál, ha a teteje <strong>nyitott</strong> (pl. vödör, tehát <M t="S = \pi r^2 + 2\pi rh" />)? Mekkora lesz az optimális <M t="h/r" /> arány?
            </>
          }
        >
          <p>
            <M t="S(r) = \pi r^2 + \dfrac{2V}{r} \Rightarrow S'(r) = 2\pi r - \dfrac{2V}{r^2} = 0 \Rightarrow V = \pi r^3" />.
          </p>
          <p>
            Mivel <M t="V=\pi r^2 h" />, innen <M t="\mathbf{h = r}" /> (a magasság most a <em>sugárral</em> egyenlő, nem az átmérővel)!
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Melyik pozitív <M t="x" /> szám esetén a legkisebb az <M t="x + \dfrac{9}{x}" /> összeg? Igazold, hogy abszolút minimum!
            </>
          }
        >
          <p>
            <M t="f'(x)=1-\dfrac{9}{x^2}=0 \Rightarrow x=3" /> (<M t="x>0" />). Mivel <M t="f''(x)=\dfrac{18}{x^3} > 0" /> minden <M t="x>0" />-ra, <M t="f(3)=6" /> abszolút minimum!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Beírt alakzatok és a legközelebbi pont (a négyzet-trükk)',
    body: (
      <>
        <p>
          Két klasszikus geometriai optimalizálási feladat, amelyekhez egy-egy elegáns algebrai trükk tartozik:
        </p>
        <p>
          <strong>1. A négyzet-trükk (legközelebbi pont):</strong> keressük az <M t="y=x^2" /> parabolának azt a pontját, amely a legközelebb van a <M t="(0;\,2)" /> ponthoz! A távolság <M t="d(x)=\sqrt{(x-0)^2+(x^2-2)^2}" />. Mivel a gyökfüggvény szigorúan növekvő, <M t="d(x)" /> pontosan ott minimális, ahol a <strong>távolság négyzete</strong> minimális — gyök nélkül sokkal könnyebb deriválni!
        </p>
        <M block t="D(x) = x^2 + (x^2-2)^2 = x^4 - 3x^2 + 4 \;\Longrightarrow\; D'(x) = 4x^3 - 6x = 2x(2x^2-3) = 0." />
        <p>
          Kritikus pontok: <M t="x=0" /> (<M t="D(0)=4" />, ez lokális maximum!) és <M t="x=\pm\sqrt{\frac{3}{2}}" /> (<M t="D=\frac{7}{4}" />, abszolút minimum!). A két legközelebbi pont tehát <M t="\left(\pm\sqrt{\frac{3}{2}};\,\frac{3}{2}\right)" />, a távolságuk <M t="\frac{\sqrt{7}}{2}" />!
        </p>
        <p>
          <strong>2. Félkörbe írt legnagyobb területű téglalap:</strong> az <M t="R" /> sugarú felső félkör (<M t="y=\sqrt{R^2-x^2}" />) alá írt téglalap területe <M t="A(x)=2x\sqrt{R^2-x^2}" /> (<M t="x\in[0;\,R]" />). Szintén használhatjuk a négyzet-trükköt: <M t="A^2(x)=4x^2(R^2-x^2)=4R^2x^2-4x^4" />! Deriválva <M t="8R^2x-16x^3=0 \Rightarrow x=\dfrac{R}{\sqrt{2}}" />, ahonnan <M t="y=\dfrac{R}{\sqrt{2}}" /> és <M t="A_{\max} = R^2" />!
        </p>
        <InscribedRectWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Melyik pontja van legközelebb az <M t="y=\sqrt{x}" /> görbének a <M t="(4;\,0)" /> ponthoz?
            </>
          }
        >
          <p>
            Távolság négyzete: <M t="D(x) = (x-4)^2 + (\sqrt{x})^2 = x^2 - 7x + 16" /> (<M t="x\ge 0" />).
          </p>
          <p>
            <M t="D'(x)=2x-7=0 \Rightarrow x=\dfrac{7}{2}=3{,}5" />, <M t="D''(x)=2>0" />. A legközelebbi pont: <M t="\left(3{,}5;\,\sqrt{3{,}5}\right)" />!
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Az <M t="y=12-x^2" /> parabola és az <M t="x" />-tengely közé szimmetrikusan beírt téglalapnak mekkora a maximális területe?
            </>
          }
        >
          <p>
            <M t="A(x)=2x(12-x^2)=24x-2x^3" /> (<M t="x\in[0;\,\sqrt{12}]" />).
          </p>
          <p>
            <M t="A'(x)=24-6x^2=0 \Rightarrow x=2" /> (mivel <M t="x>0" />). Maximális terület: <M t="A(2)=4\cdot 8 = 32" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Fizika és optika: a leggyorsabb út és a fénytörés törvénye',
    body: (
      <>
        <p>
          <strong>Kábelhúzás folyón át (és a vízimentő-probléma):</strong> egy <M t="3" /> km széles egyenes folyó egyik partján áll egy erőmű, a túlparton, <M t="8" /> km-rel lejjebb pedig egy város. A kábelt víz alatt <M t="5" /> M Ft/km, szárazföldön <M t="3" /> M Ft/km áron lehet fektetni. Melyik <M t="x" /> pontban érjen partot a kábel, hogy a teljes költség minimális legyen?
        </p>
        <ul>
          <li><strong>Célfüggvény:</strong> <M t="K(x) = 5\sqrt{9+x^2} + 3(8-x)" />, a zárt tartomány <M t="x \in [0;\,8]" />.</li>
          <li><strong>Deriválás:</strong> <M t="K'(x) = \dfrac{5x}{\sqrt{9+x^2}} - 3 = 0 \;\Longleftrightarrow\; 5x = 3\sqrt{9+x^2}" />.</li>
          <li>Négyzetre emelve: <M t="25x^2 = 9(9+x^2) \iff 16x^2 = 81 \iff x = \dfrac{9}{4} = 2{,}25" /> km!</li>
          <li><strong>Összehasonlítás a végpontokkal:</strong> <M t="K(0)=39" /> M Ft, <M t="K(2{,}25) = 5(3{,}75) + 3(5{,}75) = \mathbf{36}" /> M Ft, <M t="K(8)=5\sqrt{73}\approx 42{,}72" /> M Ft!</li>
        </ul>
        <LifeguardWidget />
        <Def title="Fermat elve és a Snellius–Descartes-törvény">
          <p>
            Ha egy fénysugár két közeg határán halad át (<M t="v_1" /> és <M t="v_2" /> sebességgel), a teljes menetidő <M t="T(x) = \dfrac{\sqrt{a^2+x^2}}{v_1} + \dfrac{\sqrt{b^2+(d-x)^2}}{v_2}" />. Az optimum (<M t="T'(x)=0" />) pontosan a fizika híres <strong>fénytörési törvényét</strong> adja:
          </p>
          <M block t="\frac{x}{v_1\sqrt{a^2+x^2}} = \frac{d-x}{v_2\sqrt{b^2+(d-x)^2}} \;\Longleftrightarrow\; \frac{\sin\theta_1}{v_1} = \frac{\sin\theta_2}{v_2}!" />
        </Def>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              A fenti kábelhúzási feladatban mi lenne az optimális <M t="x" />, ha a város nem <M t="8" /> km-re, hanem csak <M t="1" /> km-re lenne lejjebb a túlparton? (Vigyázat: tartomány!)
            </>
          }
        >
          <p>
            A belső kritikus pont (<M t="x=2{,}25" /> km) most <strong>kívül esik</strong> a <M t="[0;\,1]" /> tartományon! Mivel <M t="K'(x) < 0" /> az egész <M t="[0;\,1]" />-en, a minimum a jobb végpontban, <M t="x=1" /> km-nél van — vagyis <strong>egyenesen a városba</strong> kell húzni a kábelt a víz alatt! (Ez egy klasszikus <em>sarokmegoldás</em>!)
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              A kábelhúzásnál mi a geometriai jelentése az <M t="\dfrac{x}{\sqrt{9+x^2}} = \dfrac{3}{5}" /> egyenletnek?
            </>
          }
        >
          <p>
            Az <M t="\dfrac{x}{\sqrt{9+x^2}} = \sin\theta" />, ahol <M t="\theta" /> a kábel merőlegessel bezárt szöge! Ez független a város távolságától (amíg <M t="L \ge 2{,}25" /> km): a kábel mindig ugyanabban az optimális szögben lép ki a vízből!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Közgazdaságtan: maximális profit és minimális átlagköltség',
    body: (
      <>
        <p>
          A vállalati döntéshozatal két alapvető optimalizálási törvénye közvetlenül a deriváltból következik (emlékezz a 3.3-ra: <M t="R'" /> a határbevétel, <M t="C'" /> a határköltség!):
        </p>
        <Def title="A közgazdaságtan 2 alaptétele (MR = MC és MC = AC)">
          <ol>
            <li>
              <strong>Profitmaximalizálás:</strong> a profit <M t="P(x)=R(x)-C(x)" />. Egy belső optimumban <M t="P'(x)=0" />, vagyis:
              <M block t="R'(x) = C'(x) \qquad (\text{Határbevétel} = \text{Határköltség})." />
              <em>Szemléletesen:</em> amíg a következő darab többet hoz, mint amennyibe kerül (<M t="R'>C'" />), érdemes növelni a termelést; pont ott kell megállni, ahol kiegyenlítődnek!
            </li>
            <li>
              <strong>Átlagköltség-minimalizálás:</strong> az egy darabra jutó átlagköltség <M t="c(x) = \dfrac{C(x)}{x}" />. Hányadosszabállyal <M t="c'(x) = \dfrac{xC'(x)-C(x)}{x^2} = 0" />, vagyis:
              <M block t="C'(x) = \frac{C(x)}{x} = c(x) \qquad (\text{Határköltség} = \text{Átlagköltség})." />
            </li>
          </ol>
        </Def>
        <ProfitOptWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Egy termék bevétele <M t="R(x)=50x - 0{,}5x^2" />, költsége <M t="C(x)=10x + 200" />. Hány darab gyártása maximalizálja a profitot, és mennyi a maximális profit?
            </>
          }
        >
          <p>
            <M t="R'(x)=C'(x) \iff 50 - x = 10 \Rightarrow x = 40" /> db. (<M t="P''(x)=-1 < 0" /> → biztosan maximum!)
          </p>
          <p>
            Maximális profit: <M t="P(40) = (2000-800) - (400+200) = 600" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Ha a költségfüggvény <M t="C(x)=x^3 - 6x^2 + 15x" /> (<M t="x>0" />), melyik <M t="x" />-nél minimális az átlagköltség (<M t="c(x)=C(x)/x" />)?
            </>
          }
        >
          <p>
            <M t="c(x) = x^2 - 6x + 15 \Rightarrow c'(x) = 2x - 6 = 0 \Rightarrow x = 3" /> (és <M t="c''(3)=2>0" />). Ellenőrzés: <M t="C'(3)=27-36+15=6" /> és <M t="c(3)=9-18+15=6" />, valóban <M t="MC = AC" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Összefoglalás és a 4 legnagyobb buktató',
    body: (
      <>
        <table className="tbl">
          <thead>
            <tr>
              <th>problématípus</th>
              <th>kulcsötlet / eredmény</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Doboz / kerítés</td>
              <td>Mellékfeltételből 1 változó + zárt intervallumos módszer</td>
            </tr>
            <tr>
              <td>Konzervdoboz (henger)</td>
              <td>Zárt henger: <M t="h = 2r" />; nyitott henger: <M t="h = r" /></td>
            </tr>
            <tr>
              <td>Legközelebbi pont / beírt alakzat</td>
              <td><strong>Négyzet-trükk:</strong> <M t="d" /> helyett <M t="D=d^2" /> optimalizálása!</td>
            </tr>
            <tr>
              <td>Kábelhúzás / fénytörés</td>
              <td>Menetidő / költség minimalizálása → Snellius–Descartes-törvény</td>
            </tr>
            <tr>
              <td>Közgazdaságtan</td>
              <td>Max profit: <M t="R'=C'" />; min átlagköltség: <M t="C'=C/x" /></td>
            </tr>
          </tbody>
        </table>
        <h3>Négy klasszikus hiba</h3>
        <Warn>
          <p>
            <strong>1. Elfelejtett igazolás:</strong> az <M t="f'(c)=0" /> csak <em>jelölt</em>! Mindig igazold, hogy tényleg maximum (vagy minimum), és hogy <strong>abszolút</strong> szélsőérték (végpontok vagy <M t="f'" /> / <M t="f''" /> teszt)!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. Tartomány és sarokmegoldás figyelmen kívül hagyása:</strong> ha a kritikus pont kívül esik a fizikai tartományon (mint a 9. feladatban!), az optimum az egyik <strong>végpontban</strong> van!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Két változó bent maradása:</strong> ne deriválj addig, amíg a mellékfeltétellel nem fejezted ki az egyik változót a másikkal!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. A kérdés félreolvasása:</strong> a végén mindig olvasd el újra a kérdést! A méreteket (<M t="x, y" />) kérdezték, vagy magát a maximális területet / térfogatot / minimális költséget?
          </p>
        </Warn>
      </>
    ),
  },

  // ---------------------------------------------------------------- 8
  {
    title: 'Lépcsőzetes gyakorlófeladatok (könnyűtől a haladóig)',
    body: (
      <>
        <p>
          Oldd meg az alábbi 9 feladatot növekvő nehézségi sorrendben!
        </p>

        <h3>Könnyebb (alapozó) feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Két pozitív szám szorzata <M t="100" />. Melyik két szám összege a legkisebb?
            </>
          }
        >
          <p>
            <M t="xy=100 \Rightarrow y=100/x" />, <M t="S(x)=x+\dfrac{100}{x}" /> (<M t="x>0" />). <M t="S'(x)=1-\dfrac{100}{x^2}=0 \Rightarrow x=10,\; y=10" /> (és <M t="S''>0" />). A minimális összeg <M t="20" />.
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Egy <M t="60" /> m-es kerítéssel egy ház fala mellé (tehát 3 oldalról) kerítünk el téglalap alakú kertet. Mekkora a maximális terület?
            </>
          }
        >
          <p>
            <M t="2x+y=60 \Rightarrow A(x)=x(60-2x)=60x-2x^2" />. <M t="A'(x)=60-4x=0 \Rightarrow x=15" /> m, <M t="y=30" /> m, <M t="A_{\max}=450\;\text{m}^2" />.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Melyik <M t="x \in [0;\,1]" /> számból kivonva a négyzetét kapjuk a legnagyobb különbséget (<M t="x - x^2" />)?
            </>
          }
        >
          <p>
            <M t="f'(x)=1-2x=0 \Rightarrow x=\dfrac{1}{2}" />. A maximális különbség <M t="\dfrac{1}{4}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={16}
          q={
            <>
              Egy <M t="32\;\text{m}^3" /> térfogatú, négyzet alapú, <strong>nyitott</strong> tetejű víztartályt szeretnénk építeni a legkisebb összfelülettel. Mekkora legyen az alapéle (<M t="x" />) és a magassága (<M t="h" />)?
            </>
          }
        >
          <p>
            <M t="x^2h=32 \Rightarrow h=\dfrac{32}{x^2}" />. Felszín: <M t="S(x)=x^2+4xh = x^2+\dfrac{128}{x}" /> (<M t="x>0" />).
          </p>
          <p>
            <M t="S'(x)=2x-\dfrac{128}{x^2}=0 \Rightarrow x^3=64 \Rightarrow x=4" /> m, <M t="h=2" /> m (<M t="S''>0" /> → abs. min, <M t="S=48\;\text{m}^2" />)!
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Egy nyomtatott plakát szövegmezője <M t="50\;\text{cm}^2" /> területű. Felül és alul <M t="4" /> cm, bal és jobb oldalon <M t="2" /> cm margót hagyunk. Mekkora legyen a szövegmező (<M t="x \times y" />), hogy a teljes papír területe minimális legyen?
            </>
          }
        >
          <p>
            <M t="xy=50 \Rightarrow y=50/x" />. Teljes papír: <M t="A(x)=(x+4)(y+8) = (x+4)\left(\dfrac{50}{x}+8\right) = 82 + 8x + \dfrac{200}{x}" />.
          </p>
          <p>
            <M t="A'(x)=8-\dfrac{200}{x^2}=0 \Rightarrow x^2=25 \Rightarrow x=5" /> cm, <M t="y=10" /> cm (teljes papír: <M t="9\times 18 = 162\;\text{cm}^2" />)!
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Melyik pontja van az <M t="y=2x+1" /> egyenesnek a legközelebb a <M t="(3;\,0)" /> ponthoz? (Használd a négyzet-trükköt!)
            </>
          }
        >
          <p>
            <M t="D(x)=(x-3)^2+(2x+1)^2 = 5x^2-2x+10 \Rightarrow D'(x)=10x-2=0 \Rightarrow x=\dfrac{1}{5}=0{,}2" />, <M t="y=1{,}4" />.
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={19}
          q={
            <>
              Egy <M t="R" /> sugarú gömbbe írt forgáshenger térfogatát szeretnénk maximalizálni. Mekkora lesz a henger magassága (<M t="h" />) <M t="R" /> függvényében?
            </>
          }
        >
          <p>
            Pitagoraszból <M t="r^2 + \left(\dfrac{h}{2}\right)^2 = R^2 \Rightarrow r^2 = R^2 - \dfrac{h^2}{4}" /> (<M t="h \in [0;\,2R]" />).
          </p>
          <p>
            <M t="V(h)=\pi\left(R^2 h - \dfrac{h^3}{4}\right) \Rightarrow V'(h)=\pi\left(R^2 - \dfrac{3h^2}{4}\right)=0 \Rightarrow h = \dfrac{2R}{\sqrt{3}}" />!
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Egy <M t="4" /> m hosszú drótot két darabra vágunk: az egyikből négyzetet, a másikból kört hajlítunk. Hol vágjuk el, hogy a két alakzat <strong>összterülete minimális</strong>, illetve <strong>maximális</strong> legyen?
            </>
          }
        >
          <p>
            Legyen <M t="x \in [0;\,4]" /> a négyzet kerülete (oldala <M t="x/4" />), <M t="4-x" /> a kör kerülete (sugara <M t="(4-x)/(2\pi)" />):
          </p>
          <M block t="A(x) = \frac{x^2}{16} + \frac{(4-x)^2}{4\pi} \;\Longrightarrow\; A'(x) = \frac{x}{8} - \frac{4-x}{2\pi} = 0 \;\Longrightarrow\; x = \frac{16}{4+\pi}\approx 2{,}24\text{ m}." />
          <p>
            Mivel <M t="A''(x) > 0" />, itt <strong>abszolút minimum</strong> van! Az <strong>abszolút maximum</strong> az egyik végpontban van: <M t="A(0)=\frac{4}{\pi}\approx 1{,}27 > 1 = A(4)" />, tehát maximális területhez az <em>egész drótból kört</em> kell hajlítani!
          </p>
        </Task>
        <Task
          n={21}
          q={
            <>
              Egy szálloda 80 szobáját napi <M t="20\,000" /> Ft-ért mind ki tudja adni. Minden <M t="1000" /> Ft-os áremelés után 2 szoba üresen marad, viszont minden kiadott szoba napi takarítása <M t="4000" /> Ft-ba kerül. Milyen szobaár maximalizálja a napi profitot?
            </>
          }
        >
          <p>
            Legyen <M t="x" /> az <M t="1000" /> Ft-os emelések száma. Ár: <M t="20+x" /> (ezer Ft), kiadott szobák: <M t="80-2x" />, szobánkénti nyereség: <M t="(20+x)-4 = 16+x" />.
          </p>
          <p>
            Profit (ezer Ft): <M t="P(x) = (80-2x)(16+x) = 1280 + 48x - 2x^2 \Rightarrow P'(x) = 48 - 4x = 0 \Rightarrow x = 12" />.
          </p>
          <p>
            Optimális ár: <M t="20+12 = \mathbf{32\,000}" /> Ft/éj (56 kiadott szoba, napi <M t="1\,568\,000" /> Ft profit)!
          </p>
        </Task>
      </>
    ),
  },
];
