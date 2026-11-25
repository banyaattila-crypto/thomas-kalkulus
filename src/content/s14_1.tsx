import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  Contour3DSliceWidget,
  ContourPatternGalleryWidget,
  DomainExplorer2DWidget,
  LevelSurface3DWidget,
  MultivariableMapDiagram,
  Surface3DRotatorWidget,
  TopologyDiskProbeWidget,
  UndergroundTempWidget,
} from '../components/Widgets141';
import type { Page } from './s1_1';

export const S14_1: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Többváltozós függvények, értelmezési tartomány és értékkészlet',
    body: (
      <>
        <Story>
          <p>
            A valóság szinte soha nem egydimenziós: egy henger térfogata (<M t="V = \pi r^2 h" />) egyszerre függ a
            sugártól és a magasságtól; egy hegyoldal magassága (<M t="z = f(x, y)" />) a kelet–nyugati és az
            észak–déli koordinátától; a levegő hőmérséklete (<M t="T = f(x, y, z, t)" />) pedig a három térkoordinátától
            és az időtől! A 14. fejezetben kiterjesztjük a teljes differenciálszámítást a <strong>többváltozós világra</strong>.
          </p>
        </Story>

        <Def title="n-változós valós értékű függvény">
          <p>
            Legyen <M t="D \subseteq \mathbb{R}^n" /> rendezett valós szám-<M t="n" />-esek halmaza. Az{' '}
            <M t="f" /> függvény minden <M t="(x_1,\dots,x_n) \in D" /> ponthoz egyetlen{' '}
            <M t="w = f(x_1,\dots,x_n) \in \mathbb{R}" /> valós számot rendel. <M t="D" /> az{' '}
            <strong>értelmezési tartomány</strong>, a felvett <M t="w" /> értékek halmaza pedig az{' '}
            <strong>értékkészlet</strong>.
          </p>
        </Def>

        <p>
          <strong>Thomas 1. példa:</strong> Az <M t="f(x, y, z) = \sqrt{x^2 + y^2 + z^2}" /> függvény az origótól
          mért távolságot adja meg: <M t="f(3, 0, 4) = \sqrt{9 + 0 + 16} = 5" />. Értelmezési tartománya a teljes{' '}
          <M t="\mathbb{R}^3" />, értékkészlete <M t="[0,\,\infty)" />.
        </p>

        <DomainExplorer2DWidget />

        <Quiz
          q={<>Mi az <M t="f(x, y) = \ln(x + y - 2)" /> függvény értelmezési tartománya?</>}
          options={[
            { label: <><M t="x + y \ge 2" /> (zárt félsík)</> },
            { label: <><M t="x + y > 2" /> (nyílt félsík)</>, ok: true },
            { label: <><M t="x + y \neq 2" /></> },
            { label: <>A teljes <M t="\mathbb{R}^2" /> sík</> },
          ]}
          explain={
            <>
              A logaritmus argumentumának szigorúan pozitívnak kell lennie: <M t="x + y - 2 > 0 \iff x + y > 2" />,
              ami az <M t="x+y=2" /> egyenes fölötti <strong>nyílt félsík</strong>!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={<>Add meg az <M t="f(x, y) = \sqrt{16 - x^2 - 4y^2}" /> függvény értelmezési tartományát és értékkészletét!</>}
        >
          <p>
            <M t="16 - x^2 - 4y^2 \ge 0 \iff \frac{x^2}{16} + \frac{y^2}{4} \le 1" /> (zárt ellipszislap, féltengelyei 4 és 2).
            Értékkészlete: <M t="\mathbf{[0,\,4]}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={<>Add meg a <M t="w = xy\ln z" /> háromváltozós függvény értelmezési tartományát és értékkészletét (Thomas 2b. példa)!</>}
        >
          <p>
            Értelmezési tartomány: <M t="z > 0" /> (nyílt felső féltér). Értékkészlet: <M t="(-\infty,\,\infty)" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Síktartományok topológiája: nyílt, zárt, korlátos',
    body: (
      <>
        <p>
          Egyváltozós analízisben a nyílt <M t="(a, b)" /> és a zárt <M t="[a, b]" /> intervallumokat használtuk.
          A síkban az intervallumok helyét <strong><M t="\varepsilon" />-körlapok</strong> veszik át!
        </p>

        <Def title="Belső pont, határpont, nyílt és zárt halmaz (Thomas 14.1)">
          <ul>
            <li>
              <strong>Belső pont:</strong> <M t="(x_0, y_0)" /> belső pontja <M t="T" />-nek, ha van körülötte olyan
              pozitív sugarú körlap, amely <em>teljes egészében</em> <M t="T" />-ben fekszik.
            </li>
            <li>
              <strong>Határpont:</strong> minden körülötte lévő pozitív sugarú körlap tartalmaz <M t="T" />-beli{' '}
              <em>és</em> <M t="T" />-n kívüli pontot is.
            </li>
            <li>
              <strong>Nyílt halmaz:</strong> minden pontja belső pont (egyetlen határpontját sem tartalmazza).{' '}
              <strong>Zárt halmaz:</strong> minden határpontját tartalmazza.
            </li>
            <li>
              <strong>Korlátos halmaz:</strong> belefér egy kellően nagy, origó középpontú körlapba.
            </li>
          </ul>
        </Def>

        <TopologyDiskProbeWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={<>Nyílt, zárt, vagy egyik sem a <M t="T = \{(x, y) : 1 \le x^2 + y^2 < 4\}" /> körgyűrű? Korlátos-e?</>}
        >
          <p>
            <strong>Se nem nyílt, se nem zárt</strong> (a belső <M t="r=1" /> határ hozzátartozik, a külső{' '}
            <M t="r=2" /> határ viszont nem!). <strong>Korlátos</strong>, mert elfér az <M t="R=3" /> körben.
          </p>
        </Task>
        <Task
          n={4}
          q={<>A teljes <M t="\mathbb{R}^2" /> sík nyílt vagy zárt? Korlátos-e?</>}
        >
          <p>
            <strong>Egyszerre nyílt ÉS zárt!</strong> (Minden pontja belső pont, és nincs határpontja, így az összes
            határpontját üresen tartalmazza.) Nyilván <strong>nem korlátos</strong>.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Kétváltozós függvények grafikonja: 3D felületek',
    body: (
      <>
        <p>
          Az <M t="f(x, y)" /> kétváltozós függvény <strong>grafikonja</strong> az{' '}
          <M t="\{(x, y, z) : z = f(x, y),\; (x, y) \in D\}" /> pontok halmaza az <M t="xyz" />-térben — vagyis egy
          térbeli <strong>felület</strong>, amelyre minden függőleges egyenes legfeljebb egyszer metszi rá!
        </p>

        <Surface3DRotatorWidget />

        <Steps
          title="Felület azonosítása képletből (Thomas 3. példa)"
          problem={<>Elemezzük a <M t="z = \sqrt{100 - x^2 - y^2}" /> kétváltozós függvény grafikonját!</>}
          steps={[
            {
              title: 'Értelmezési tartomány és értékkészlet',
              body: (
                <>
                  <M t="100 - x^2 - y^2 \ge 0 \iff x^2 + y^2 \le 100" /> (zárt <M t="R=10" /> körlap), és a
                  négyzetgyök nemnegatív, így <M t="0 \le z \le 10" />.
                </>
              ),
            },
            {
              title: 'Négyzetre emelés',
              body: (
                <>
                  <M t="z^2 = 100 - x^2 - y^2 \iff x^2 + y^2 + z^2 = 100" /> (és <M t="z \ge 0" />).
                </>
              ),
            },
            {
              title: 'Geometriai alak',
              body: (
                <>
                  Origó középpontú, <M t="R = 10" /> sugarú <strong>felső félgömb</strong>!
                </>
              ),
            },
          ]}
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={<>Milyen térbeli felület a <M t="z = 6 - 2x - 3y" /> grafikonja? Hol metszi a három koordinátatengelyt?</>}
        >
          <p>
            Egy <strong>sík</strong> (<M t="2x + 3y + z = 6" />), tengelymetszetei:{' '}
            <M t="(3, 0, 0)" />, <M t="(0, 2, 0)" /> és <M t="(0, 0, 6)" />.
          </p>
        </Task>
        <Task
          n={6}
          q={<>Miért nem függvénygrafikon a teljes <M t="x^2 + y^2 + z^2 = 100" /> gömb?</>}
        >
          <p>
            Mert az <M t="x^2+y^2 < 100" /> pontok fölött <em>két</em> különböző <M t="z" /> magasság is tartozik
            hozzá (<M t="z = +\sqrt{100-x^2-y^2}" /> és <M t="z = -\sqrt{100-x^2-y^2}" />), ami sérti a függvény
            egyértelműségét!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Szintvonalak és szintvonalas térképek',
    body: (
      <>
        <Def title="Szintvonal (szintgörbe)">
          <p>
            Az <M t="f(x, y)" /> függvény <M t="c" /> szinthez tartozó <strong>szintvonala</strong> az{' '}
            <M t="xy" />-sík azon <M t="(x, y)" /> pontjainak halmaza, amelyekben <M t="f(x, y) = c" />.
            Geometriailag: elmetsszük a <M t="z = f(x, y)" /> felületet a <M t="z = c" /> vízszintes síkkal, és a
            metszetgörbét levetítjük az <M t="xy" />-síkba!
          </p>
        </Def>

        <Contour3DSliceWidget />

        <Quiz
          q={<>Egy topográfiai térképen az A térségben a 10 méterenkénti szintvonalak nagyon sűrűn futnak, a B térségben pedig ritkán. Hol meredekebb a hegyoldal?</>}
          options={[
            { label: <>Az A térségben (sűrű szintvonalak = meredek lejtő)</>, ok: true },
            { label: <>A B térségben (ritka szintvonalak = meredek lejtő)</> },
            { label: <>Mindkét helyen egyforma meredek</> },
          ]}
          explain={
            <>
              Ha kis vízszintes lépéssel is nagy magasságváltozás (<M t="\Delta z" />) történik, a szintvonalak
              közel kerülnek egymáshoz — tehát <strong>sűrű szintvonalak = meredek felület</strong>!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={<>Írd fel az <M t="f(x, y) = 4x^2 + y^2" /> függvény <M t="c = 4" /> és <M t="c = 16" /> szintvonalait!</>}
        >
          <p>
            <M t="c=4" />: <M t="x^2 + \frac{y^2}{4} = 1" /> (ellipszis, féltengelyei 1 és 2);{' '}
            <M t="c=16" />: <M t="\frac{x^2}{4} + \frac{y^2}{16} = 1" /> (ellipszis, féltengelyei 2 és 4).
          </p>
        </Task>
        <Task
          n={8}
          q={<>Metszheti-e egymást egy függvény két <em>különböző</em> (<M t="c_1 \neq c_2" />) szintvonala?</>}
        >
          <p>
            <strong>Soha!</strong> Egy metszéspontban <M t="f(x, y)" /> egyszerre lenne egyenlő <M t="c_1" />-gyel és{' '}
            <M t="c_2" />-vel, ami ellentmond annak, hogy <M t="f" /> függvény!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Szintvonal-olvasás: 4 alapfelület ujjlenyomata',
    body: (
      <>
        <p>
          Egy tapasztalt mérnök vagy matematikus a 2D szintvonalas térképről egyetlen pillantással „látja” a 3D
          felületet. Különösen fontos megkülönböztetni a <strong>kúpot</strong> és a <strong>paraboloidot</strong>:
          mindkettőnek koncentrikus körök a szintvonalai, de egyenlő <M t="\Delta c" /> lépéseknél a kúp körei
          egyenlő távolságra vannak, míg a paraboloid körei kifelé egyre sűrűsödnek!
        </p>

        <ContourPatternGalleryWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={<>Milyen görbék az <M t="f(x, y) = y - x^2" /> függvény szintvonalai?</>}
        >
          <p>
            <M t="y - x^2 = c \iff y = x^2 + c" /> — egymás fölé függőlegesen eltolt, egybevágó{' '}
            <strong>parabolák</strong>!
          </p>
        </Task>
        <Task
          n={10}
          q={<>Milyen szintvonalai vannak az <M t="f(x, y) = xy" /> függvénynek <M t="c > 0" />, <M t="c = 0" /> és <M t="c < 0" /> esetén?</>}
        >
          <p>
            <M t="c > 0" />: I. és III. síknegyedbeli hiperbolák; <M t="c < 0" />: II. és IV. síknegyedbeli hiperbolák;{' '}
            <M t="c = 0" />: a két koordinátatengely (<M t="x=0" /> és <M t="y=0" />)! Ez egy 45°-kal elforgatott nyereg!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Háromváltozós függvények és szintfelületek',
    body: (
      <>
        <p>
          Egy háromváltozós <M t="w = f(x, y, z)" /> függvény grafikonja a <strong>négydimenziós térben</strong>{' '}
          (<M t="\mathbb{R}^4" />) fekszik, ezért nem rajzolható le közvetlenül. Helyette a{' '}
          <strong>szintfelületeit</strong> vizsgáljuk: az <M t="f(x, y, z) = c" /> egyenletű felületeket a 3D térben
          (pl. azonos hőmérsékletű izoterma-felületek egy szobában, vagy ekvipotenciális felületek egy elektromos térben)!
        </p>

        <LevelSurface3DWidget />

        <p>
          A térbeli tartományok topológiája pontosan ugyanúgy működik, mint a síkban, csak a körlapok helyét{' '}
          <strong>pozitív sugarú nyílt gömbök</strong> veszik át (Thomas 14.8. ábra).
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={<>Milyen szintfelületei vannak az <M t="f(x, y, z) = x^2 + y^2" /> függvénynek <M t="c > 0" /> és <M t="c = 0" /> esetén?</>}
        >
          <p>
            <M t="c > 0" />: <M t="\sqrt{c}" /> sugarú, a <M t="z" />-tengely körüli koaxiális{' '}
            <strong>körhengerek</strong>; <M t="c = 0" />: maga a <M t="z" />-tengely!
          </p>
        </Task>
        <Task
          n={12}
          q={<>Írd le az <M t="f(x, y, z) = z - x^2 - y^2" /> függvény <M t="c = -1, 0, 2" /> szintfelületeit!</>}
        >
          <p>
            <M t="z = x^2 + y^2 + c" /> — egymás fölé függőlegesen eltolt, felfelé nyíló{' '}
            <strong>elliptikus paraboloidok</strong>, csúcsuk <M t="(0, 0, -1)" />, <M t="(0, 0, 0)" />, <M t="(0, 0, 2)" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Valós alkalmazás: hőmérséklet a Föld felszíne alatt',
    body: (
      <>
        <p>
          <strong>Thomas 6. példa:</strong> A talaj hőmérsékletének éves ingadozása az <M t="x" /> mélység (méter) és a{' '}
          <M t="t" /> idő (nap) kétváltozós függvénye:
        </p>
        <M block t="w(x, t) = e^{-0{,}6x}\cos\!\left(1{,}7\cdot 10^{-2}t - 0{,}6x\right)." />
        <p>
          Próbáld ki a szimulátoron, hogyan csillapodik le a nyár–tél hőhullám lefelé haladva, és hogyan tolódnak el az
          évszakok! Ez magyarázza, miért hűvös a borospince nyáron és miért nem fagy be télen!
        </p>

        <UndergroundTempWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={<>A <M t="w(x, t)" /> képlet alapján mekkora a hőmérséklet-ingadozás amplitúdója <M t="x = 5\text{ m}" /> mélységben a felszínhez képest?</>}
        >
          <p>
            <M t="e^{-0{,}6\cdot 5} = e^{-3} \approx 0{,}0498 \approx \mathbf{5\%}" />!
          </p>
        </Task>
        <Task
          n={14}
          q={<>Milyen mélységben van pontosan <strong>negyed év</strong> (<M t="\frac{\pi}{2}" /> radián) fáziskésés a felszínhez képest?</>}
        >
          <p>
            <M t="0{,}6x = \frac{\pi}{2} \implies x = \frac{\pi}{1{,}2} \approx \mathbf{2{,}62\text{ m}}" /> mélységben!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok (80%-os mérföldkő!)',
    body: (
      <>
        <MultivariableMapDiagram />

        <Def title="14.1 Puskakártya — Kulcsfogalmak egy helyen">
          <ul>
            <li>
              <strong>Értelmezési tartomány:</strong> gyök alatt <M t="\ge 0" /> (zárt határ), logaritmusban{' '}
              <M t="> 0" /> (nyílt határ), nevezőben <M t="\neq 0" /> (kizárt görbe/felület).
            </li>
            <li>
              <strong>Topológia:</strong> nyílt = minden pont belső; zárt = minden határpont benne van; korlátos =
              elfér egy véges körben/gömbben.
            </li>
            <li>
              <strong>Szintvonal (<M t="2" /> változó):</strong> <M t="f(x, y) = c" /> az <M t="xy" />-síkban (sűrű =
              meredek, ritka = lankás, különböző <M t="c" />-k nem metszhetik egymást).
            </li>
            <li>
              <strong>Szintfelület (<M t="3" /> változó):</strong> <M t="f(x, y, z) = c" /> a 3D térben.
            </li>
          </ul>
        </Def>

        <Warn>
          <strong>5 tipikus buktató a 14.1-ben:</strong>
          <ol style={{ margin: '6px 0 0 18px' }}>
            <li>Azt hinni, hogy minden halmaz vagy nyílt, vagy zárt — sok halmaz <strong>se nem nyílt, se nem zárt</strong> (pl. félig zárt körgyűrű)!</li>
            <li>A szintvonalat összekeverni a 3D metszetgörbével: a szintvonal az <strong><M t="xy" />-síkban</strong> van!</li>
            <li>Elfelejteni, hogy <M t="f(x, y) = \sqrt{a^2-x^2-y^2}" /> értékkészlete csak <M t="[0, a]" /> (a félgömb), nem <M t="[-a, a]" />!</li>
            <li>Összekeverni a kúp (egyenlő közű körök) és a paraboloid (kifelé sűrűsödő körök) szintvonalas térképét.</li>
            <li>A <M t="w = f(x, y, z)" /> háromváltozós függvény grafikonját 3D-ben keresni — a grafikon 4D, a 3D-ben a <em>szintfelületeket</em> látjuk!</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={<>Számítsd ki <M t="f(2, -1, 3)" /> értékét, ha <M t="f(x, y, z) = x^2 y + e^{y+1} - \ln(z/3)" />!</>}
        >
          <p>
            <M t="4(-1) + e^0 - \ln 1 = -4 + 1 - 0 = \mathbf{-3}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={<>Add meg az <M t="f(x, y) = \frac{1}{\sqrt{x^2 + y^2 - 1}}" /> értelmezési tartományát és értékkészletét! Nyílt vagy zárt-e <M t="D" />?</>}
        >
          <p>
            <M t="D = \{x^2 + y^2 > 1\}" /> (az egységkör <strong>nyílt</strong> külső tartománya, nem korlátos).
            Értékkészlet: <M t="(0,\,\infty)" />.
          </p>
        </Task>
        <Task
          n={17}
          q={<>Írd fel az <M t="f(x, y) = 2x - 3y + 5" /> függvény <M t="c = 5" /> és <M t="c = 11" /> szintvonalait!</>}
        >
          <p>
            <M t="2x - 3y = 0" /> és <M t="2x - 3y = 6" /> — két párhuzamos egyenes (<M t="m = \frac{2}{3}" />).
          </p>
        </Task>

        <h3>Közepes gyakorlófeladatok</h3>
        <Task
          n={18}
          q={<>Határozd meg az <M t="f(x, y) = \arcsin(x + y)" /> értelmezési tartományát! Nyílt, zárt, korlátos?</>}
        >
          <p>
            <M t="-1 \le x + y \le 1" /> — az <M t="y = -x-1" /> és <M t="y = -x+1" /> párhuzamos egyenesek közötti{' '}
            <strong>zárt</strong>, <strong>nem korlátos</strong> sáv!
          </p>
        </Task>
        <Task
          n={19}
          q={<>Milyen szintvonalai vannak az <M t="f(x, y) = \ln(x^2 + y^2)" /> függvénynek? Hogyan változik a sugár <M t="c = 0, 1, 2" /> esetén?</>}
        >
          <p>
            <M t="x^2 + y^2 = e^c" />: origó középpontú körök, sugaruk <M t="r = e^{c/2}" /> (<M t="1,\; \sqrt{e},\; e" /> —
            kifelé exponenciálisan ritkulnak!).
          </p>
        </Task>
        <Task
          n={20}
          q={<>Milyen szintfelületei vannak az <M t="f(x, y, z) = x^2 + 4y^2 + 9z^2" /> függvénynek <M t="c > 0" /> esetén?</>}
        >
          <p>
            <M t="\frac{x^2}{c} + \frac{y^2}{c/4} + \frac{z^2}{c/9} = 1" /> — koncentrikus, hasonló{' '}
            <strong>ellipszoidok</strong>!
          </p>
        </Task>

        <h3>Haladó gyakorlófeladatok</h3>
        <Task
          n={21}
          q={<>Határozd meg az <M t="f(x, y) = \sqrt{4 - x^2} + \ln(y - 1)" /> értelmezési tartományát, és döntsd el, nyílt-e vagy zárt!</>}
        >
          <p>
            <M t="-2 \le x \le 2" /> és <M t="y > 1" /> (egy felfelé végtelen félsáv, amelynek a két függőleges
            oldala hozzátartozik, az alsó <M t="y=1" /> éle viszont nem). Ezért <strong>se nem nyílt, se nem zárt</strong>,
            és <strong>nem korlátos</strong>!
          </p>
        </Task>
        <Task
          n={22}
          q={<>Írd le az <M t="f(x, y, z) = x^2 + y^2 - z^2" /> szintfelületeit mindhárom esetben: <M t="c > 0" />, <M t="c = 0" />, <M t="c < 0" />!</>}
        >
          <p>
            <M t="c > 0" />: <strong>egyköpenyű hiperboloid</strong>; <M t="c = 0" />: <strong>kettős körkúp</strong>{' '}
            (<M t="z^2 = x^2+y^2" />); <M t="c < 0" />: <strong>kétköpenyű hiperboloid</strong>!
          </p>
        </Task>
        <Task
          n={23}
          q={<>Egy fémlemez hőmérséklete <M t="T(x, y) = \frac{100}{1 + x^2 + 2y^2}" />. Hol a legmelegebb a lemez, és milyen alakúak az izotermák (azonos hőmérsékletű görbék)?</>}
        >
          <p>
            A nevező az origóban a legkisebb (<M t="1" />), így a maximum <M t="T(0, 0) = \mathbf{100^\circ\text{C}}" />.
            Az izotermák (<M t="T = c \in (0, 100)" />): <M t="x^2 + 2y^2 = \frac{100}{c} - 1" /> — origó középpontú{' '}
            <strong>ellipszisek</strong>!
          </p>
        </Task>
      </>
    ),
  },
];
