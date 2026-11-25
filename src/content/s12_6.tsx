import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  AxisIdentifierDiagram,
  Cylinders3DWidget,
  Ellipsoid3DWidget,
  Hyperboloid3DWidget,
  ParaboloidCone3DWidget,
  QuadricCatalogDiagram,
  Saddle3DWidget,
  TraceSlicerDiagram,
} from '../components/Widgets126';
import type { Page } from './s1_1';

export const S12_6: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Hengerek a térben: nem csak körhenger létezik!',
    body: (
      <>
        <Story>
          <p>
            A mindennapokban a „henger” szóról egy konzervdoboz jut eszünkbe. A matematikában viszont a henger sokkal
            tágabb fogalom: egy hullámpala tető (<M t="z = \sin x" />) vagy egy félcső gördeszkapálya (
            <M t="z = x^2" />) ugyanúgy <strong>hengerfelület</strong>!
          </p>
        </Story>

        <Def title="Hengerfelület (henger) a térben">
          <p>
            Egy <strong>henger</strong> az a felület, amelyet egy adott egyenessel párhuzamos egyenesek (<em>alkotók</em>)
            súrolnak, miközben egy síkgörbe (<em>vezérgörbe</em>) mentén mozognak.
          </p>
          <p>
            <strong>Aranyszabály:</strong> ha egy <M t="F(x, y, z) = 0" /> egyenletből <em>hiányzik az egyik változó</em>,
            akkor a felület egy henger, amelynek alkotói párhuzamosak a hiányzó változó tengelyével!
          </p>
        </Def>

        <Cylinders3DWidget />

        <Task n={1} q={<>Írd le geometriailag a következő felületeket <M t="\mathbb{R}^3" />-ban: (a) <M t="x^2 + z^2 = 9" />, (b) <M t="y = x^2" />!</>}>
          <p>
            (a) Hiányzik <M t="y" /> → 3 sugarú körhenger az <strong><M t="y" />-tengely</strong> mentén. (b) Hiányzik{' '}
            <M t="z" /> → parabolikus henger, amelynek alkotói párhuzamosak a <strong><M t="z" />-tengellyel</strong>.
          </p>
        </Task>

        <Task n={2} q={<>Milyen felületet ír le a <M t="4y^2 + z^2 = 16" /> egyenlet a térben?</>}>
          <p>
            16-tal osztva <M t="\frac{y^2}{4} + \frac{z^2}{16} = 1" />, <M t="x" /> hiányzik: ez egy{' '}
            <strong>elliptikus henger</strong> az <M t="x" />-tengely mentén (féltengelyei 2 és 4).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Másodrendű felületek (kvadrikok) és az ellipszoid',
    body: (
      <>
        <p>
          A 10. fejezet kúpszeleteinek (ellipszis, parabola, hiperbola) háromdimenziós megfelelői a{' '}
          <strong>másodrendű felületek (kvadrikok)</strong>: az <M t="x, y, z" /> változók legfeljebb másodfokú
          egyenleteinek grafikonjai. Elfordítással és eltolással mind a <strong>hat kanonikus alaptípusra</strong>{' '}
          vezethető vissza — ezek közül az első a zárt, sima <strong>ellipszoid</strong>.
        </p>

        <Def title="Az ellipszoid kanonikus egyenlete">
          <M block t="\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1 \qquad (a, b, c > 0)." />
          <p>
            A tengelymetszetek <M t="(\pm a;0;0)" />, <M t="(0;\pm b;0)" />, <M t="(0;0;\pm c)" />. Minden
            koordinátasíkkal párhuzamos metszete <strong>ellipszis</strong> (ha <M t="a=b=c" />, gömböt kapunk).
          </p>
        </Def>

        <Ellipsoid3DWidget />

        <Quiz
          q={<>Milyen felületet ír le a <M t="z = y^2" /> egyenlet a háromdimenziós térben (<M t="\mathbb{R}^3" />)?</>}
          options={[
            { label: <>Elliptikus paraboloidot a <M t="z" />-tengely körül</> },
            { label: <>Parabolikus hengert az <M t="x" />-tengely mentén</>, ok: true },
            { label: <>Egyetlen síkbeli parabolát a <M t="yz" />-síkban</> },
            { label: <>Kúpot az origó csúcsával</> },
          ]}
          explain={
            <>
              Mivel <M t="x" /> hiányzik az egyenletből, a <M t="z = y^2" /> parabola az <M t="x" />-tengely mentén
              végtelenül elcsúszik → parabolikus henger!
            </>
          }
        />

        <Task n={3} q={<>Határozd meg a <M t="9x^2 + 4y^2 + 36z^2 = 36" /> ellipszoid féltengelyeit és az <M t="xy" />-síkkal való metszetét!</>}>
          <p>
            36-tal osztva: <M t="\frac{x^2}{4} + \frac{y^2}{9} + \frac{z^2}{1} = 1" />, tehát a féltengelyek{' '}
            <M t="a = 2,\; b = 3,\; c = 1" />. Az <M t="xy" />-síkban (<M t="z=0" />) az{' '}
            <M t="\frac{x^2}{4} + \frac{y^2}{9} = 1" /> ellipszis!
          </p>
        </Task>

        <Task n={4} q={<>Mekkora a legnagyobb <M t="z" /> koordináta a <M t="\frac{x^2}{9} + \frac{y^2}{16} + \frac{z^2}{25} = 1" /> ellipszoidon?</>}>
          <p>
            <M t="z_{\max} = c = \sqrt{25} = 5" /> (a <M t="(0;\,0;\,5)" /> pontban).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Elliptikus paraboloid és elliptikus kúp',
    body: (
      <>
        <p>
          Ha egy változó csak <strong>első hatványon</strong> szerepel (pl. <M t="z" />), a másik kettő pedig azonos
          előjelű négyzetek összege, akkor <strong>elliptikus paraboloidot</strong> kapunk (ilyen a műholdas
          parabolaantenna!). Ha mindhárom négyzetes, és a jobb oldal <strong>nulla</strong>, akkor{' '}
          <strong>elliptikus kúpot</strong> kapunk:
        </p>

        <Def title="Elliptikus paraboloid és elliptikus kúp">
          <M block t="\text{Paraboloid:}\quad \frac{z}{c} = \frac{x^2}{a^2} + \frac{y^2}{b^2}, \qquad \text{Kúp:}\quad \frac{z^2}{c^2} = \frac{x^2}{a^2} + \frac{y^2}{b^2}." />
        </Def>

        <ParaboloidCone3DWidget />

        <Task n={5} q={<>Azonosítsd a <M t="y = 4x^2 + z^2" /> felületet, és add meg a tengelyét és csúcspontját!</>}>
          <p>
            Az <M t="y" /> első hatványon, <M t="x^2" /> és <M t="z^2" /> azonos (+) előjellel →{' '}
            <strong>elliptikus paraboloid</strong>, amely a pozitív <strong><M t="y" />-tengely</strong> irányába
            nyílik, csúcspontja az <M t="(0;\,0;\,0)" /> origó!
          </p>
        </Task>

        <Task n={6} q={<>Milyen görbékben metszi a <M t="z^2 = x^2 + y^2" /> kúpot a (a) <M t="z = 3" />, (b) <M t="y = 0" /> sík?</>}>
          <p>
            (a) <M t="x^2 + y^2 = 9" /> → 3 sugarú kör a <M t="z=3" /> síkban. (b) <M t="z^2 = x^2 \iff z = \pm x" /> →
            két egymást az origóban metsző egyenes az <M t="xz" />-síkban!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Egyköpenyű és kétköpenyű hiperboloid',
    body: (
      <>
        <p>
          Ha mindhárom változó négyzetes és a jobb oldal <M t="1" />, akkor a <strong>mínuszjelek száma</strong>{' '}
          azonnal megmondja, hány darabból (<em>köpenyből</em>) áll a felület!
        </p>

        <Def title="Hiperboloidok (1 mínusz = 1 köpeny · 2 mínusz = 2 köpeny)">
          <M block t="\text{Egyköpenyű:}\quad \frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = 1, \qquad \text{Kétköpenyű:}\quad \frac{z^2}{c^2} - \frac{x^2}{a^2} - \frac{y^2}{b^2} = 1." />
        </Def>

        <Hyperboloid3DWidget />

        <Quiz
          q={<>Hány köpenyből áll az <M t="x^2 - y^2 - z^2 = 1" /> hiperboloid, és melyik a szimmetriatengelye?</>}
          options={[
            { label: <>Egyköpenyű, az <M t="x" />-tengely mentén</> },
            { label: <>Kétköpenyű, az <M t="x" />-tengely mentén</>, ok: true },
            { label: <>Kétköpenyű, a <M t="z" />-tengely mentén</> },
            { label: <>Egyköpenyű, a <M t="y" />-tengely mentén</> },
          ]}
          explain={
            <>
              Két mínuszjel van (<M t="-y^2 - z^2" />), a jobb oldal <M t="+1" />, tehát <strong>kétköpenyű</strong>;
              az eltérő (+) előjelű <M t="x" /> adja a tengelyt (<M t="|x| \ge 1" />)!
            </>
          }
        />

        <Task n={7} q={<>Miért van „üres sáv” a <M t="z^2 - x^2 - y^2 = 1" /> kétköpenyű hiperboloid közepén?</>}>
          <p>
            Átrendezve <M t="x^2 + y^2 = z^2 - 1" />. Mivel a bal oldal nemnegatív, kell hogy{' '}
            <M t="z^2 \ge 1 \iff |z| \ge 1" />. A <M t="-1 < z < 1" /> sávban egyetlen pontja sincs a felületnek!
          </p>
        </Task>

        <Task n={8} q={<>Mekkora a legkisebb keresztmetszeti kör sugara az <M t="x^2 + y^2 - \frac{z^2}{4} = 9" /> egyköpenyű hiperboloidon?</>}>
          <p>
            A „derék” <M t="z = 0" />-nál van: <M t="x^2 + y^2 = 9" />, tehát a legkisebb sugár <M t="r = 3" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'A hiperbolikus paraboloid (nyeregfelület)',
    body: (
      <>
        <p>
          A hat kvadrik legkülönlegesebb, művészek és építészek által is imádott alakja a{' '}
          <strong>hiperbolikus paraboloid</strong> (lovaglónyereg vagy Pringles-chips alak!):
        </p>

        <Def title="Hiperbolikus paraboloid">
          <M block t="\frac{z}{c} = \frac{y^2}{b^2} - \frac{x^2}{a^2} \qquad (c > 0)." />
          <p>
            Az egyik függőleges metszete <em>felfelé</em>, a rá merőleges pedig <em>lefelé</em> nyíló parabola, a
            vízszintes metszetei pedig <strong>hiperbolák</strong> (az <M t="z = 0" /> síkban két metsző egyenes).
          </p>
        </Def>

        <Saddle3DWidget />

        <Task n={9} q={<>Add meg a <M t="z = y^2 - 4x^2" /> nyeregfelület metszetét az <M t="xy" />-síkkal (<M t="z = 0" />)!</>}>
          <p>
            <M t="y^2 - 4x^2 = 0 \implies (y - 2x)(y + 2x) = 0" />, tehát a két metsző egyenes: <M t="y = 2x" /> és{' '}
            <M t="y = -2x" />!
          </p>
        </Task>

        <Task n={10} q={<>Miért hívjuk az origót <strong>nyeregpontnak</strong> a <M t="z = y^2 - x^2" /> felületen?</>}>
          <p>
            Mert az <M t="y" />-tengely mentén (<M t="x=0" />) az origó lokális <em>minimum</em>, az <M t="x" />-tengely
            mentén (<M t="y=0" />) viszont lokális <em>maximum</em> — ez lesz a 14.7. szakasz egyik főszereplője!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Metszet-detektív és eltolt kvadrikok azonosítása',
    body: (
      <>
        <p>
          Ha egy egyenletben elsőfokú tagok is vannak (pl. <M t="-8x + 4y" />), egyszerűen{' '}
          <strong>teljes négyzetté alakítjuk</strong>, és a kapott eltolt kanonikus alakból leolvassuk a felület
          típusát és középpontját/csúcspontját!
        </p>

        <TraceSlicerDiagram />

        <Steps
          title="Eltolt másodrendű felület azonosítása"
          problem={<>Azonosítsd a <M t="x^2 + 4y^2 - z^2 - 2x + 8y + 4 = 0" /> felületet, és add meg a középpontját!</>}
          steps={[
            {
              title: 'Változók csoportosítása és főegyüttható kiemelése',
              body: (
                <p>
                  <M block t="(x^2 - 2x) + 4(y^2 + 2y) - z^2 = -4." />
                </p>
              ),
            },
            {
              title: 'Teljes négyzetté alakítás',
              body: (
                <p>
                  <M block t="(x - 1)^2 + 4(y + 1)^2 - z^2 = -4 + 1 + 4 = 1." />
                </p>
              ),
            },
            {
              title: 'Felismerés és paraméterek leolvasása',
              body: (
                <p>
                  <M t="(x-1)^2 + \frac{(y+1)^2}{1/4} - z^2 = 1" /> — 1 mínuszjel, jobb oldalon <M t="+1" /> →{' '}
                  <strong>egyköpenyű hiperboloid</strong>, középpontja <strong><M t="(1;\,-1;\,0)" /></strong>,
                  szimmetriatengelye a <M t="z" />-tengellyel párhuzamos!
                </p>
              ),
            },
          ]}
        />

        <Task n={11} q={<>Azonosítsd a <M t="z = x^2 + y^2 - 4x + 6y + 14" /> felületet és a csúcspontját!</>}>
          <p>
            <M t="z = (x - 2)^2 + (y + 3)^2 + 1 \implies z - 1 = (x - 2)^2 + (y + 3)^2" />. Felfelé nyíló{' '}
            <strong>elliptikus paraboloid</strong>, csúcspontja <M t="(2;\,-3;\,1)" />!
          </p>
        </Task>

        <Task n={12} q={<>Azonosítsd a <M t="x^2 - 2x + y^2 - z^2 + 1 = 0" /> felületet!</>}>
          <p>
            <M t="(x - 1)^2 + y^2 = z^2" /> — mivel a jobb oldal nulla, ez egy <strong>körkúp</strong>, amelynek
            csúcspontja az <M t="(1;\,0;\,0)" /> pontban van!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló: a 6 kvadrik katalógusa és 4 tipikus hiba',
    body: (
      <>
        <QuadricCatalogDiagram />

        <AxisIdentifierDiagram />

        <Warn>
          Négy tipikus hiba másodrendű felületeknél:
          <ol>
            <li>
              <strong>A jobb oldal előjelének elfelejtése:</strong> az <M t="x^2 + y^2 - z^2 = -1" /> egyenletet előbb
              szorozd meg <M t="-1" />-gyel (<M t="z^2 - x^2 - y^2 = 1" />) → ez <em>kétköpenyű</em>, nem egyköpenyű!
            </li>
            <li>
              <strong>Hiányzó változó figyelmen kívül hagyása:</strong> ha egy változó hiányzik (pl. <M t="y^2 - z^2 = 1" />),
              az <em>hiperbolikus henger</em>, nem hiperboloid!
            </li>
            <li>
              <strong>Kúp vs. egyköpenyű hiperboloid:</strong> a jobb oldalon <M t="0" /> = kúp (hegyes csúcs),{' '}
              <M t="1" /> = egyköpenyű hiperboloid (sima derék)!
            </li>
            <li>
              <strong>Kakukktojás-tengely eltévesztése:</strong> <M t="x = y^2 + z^2" /> az <M t="x" />-tengely mentén
              nyílik, nem a <M t="z" />-tengely mentén!
            </li>
          </ol>
        </Warn>

        <Quiz
          q={<>Milyen felületet ír le az <M t="x^2 + y^2 - z^2 = -4" /> egyenlet?</>}
          options={[
            { label: 'Egyköpenyű hiperboloid' },
            { label: 'Kétköpenyű hiperboloid', ok: true },
            { label: 'Elliptikus kúp' },
            { label: 'Ellipszoid' },
          ]}
          explain={
            <>
              Osszuk el <M t="-4" />-gyel, hogy a jobb oldal <M t="+1" /> legyen:{' '}
              <M t="\frac{z^2}{4} - \frac{x^2}{4} - \frac{y^2}{4} = 1" /> — két mínuszjel, tehát <strong>kétköpenyű hiperboloid</strong>!
            </>
          }
        />

        <Task n={13} q={<>Osztályozd ránézésre: (a) <M t="x^2 + 2y^2 + 3z^2 = 6" />, (b) <M t="y = x^2 - z^2" />, (c) <M t="x^2 + z^2 = 4y^2" />!</>}>
          <p>
            (a) Ellipszoid; (b) Hiperbolikus paraboloid (<M t="y" /> első hatványon, másik kettő ellentétes előjelű);
            (c) Elliptikus kúp az <M t="y" />-tengely mentén.
          </p>
        </Task>

        <Task n={14} q={<>Miért van minden másodrendű felületnél akkora szerepe a 14–15. fejezetben (többváltozós analízis)?</>}>
          <p>
            Mert a többváltozós függvények szélsőértékeit és nyeregpontjait lokálisan pontosan{' '}
            <strong>elliptikus és hiperbolikus paraboloidokkal</strong> közelítjük (kétváltozós Taylor-formula), a
            térintegrálok tartományait pedig gyakran kúpok, hengerek és gömbök határolják!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Gyakorlófeladatok (könnyű · közepes · nehéz) — 12. fejezet vége!',
    body: (
      <>
        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Nevezd meg a felületet: <M t="4x^2 + 9y^2 + 36z^2 = 36" />!</>}>
          <p>
            <M t="\frac{x^2}{9} + \frac{y^2}{4} + z^2 = 1" /> — <strong>ellipszoid</strong> (<M t="a=3, b=2, c=1" />).
          </p>
        </Task>

        <Task n={16} q={<>Nevezd meg a felületet: <M t="x^2 + z^2 = 16" /> (<M t="\mathbb{R}^3" />-ban)!</>}>
          <p>
            4 sugarú <strong>körhenger</strong> az <M t="y" />-tengely mentén.
          </p>
        </Task>

        <Task n={17} q={<>Nevezd meg a felületet és a tengelyét: <M t="x = y^2 + 4z^2" />!</>}>
          <p>
            <strong>Elliptikus paraboloid</strong>, amely a pozitív <M t="x" />-tengely irányába nyílik.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Nevezd meg a felületet: <M t="4x^2 - y^2 + 4z^2 = 4" />!</>}>
          <p>
            <M t="x^2 - \frac{y^2}{4} + z^2 = 1" /> — 1 mínuszjel, jobb oldalon <M t="+1" /> →{' '}
            <strong>egyköpenyű hiperboloid</strong> az <M t="y" />-tengely mentén!
          </p>
        </Task>

        <Task n={19} q={<>Nevezd meg a felületet: <M t="9y^2 - 4x^2 - 36z^2 = 36" />!</>}>
          <p>
            <M t="\frac{y^2}{4} - \frac{x^2}{9} - z^2 = 1" /> — 2 mínuszjel → <strong>kétköpenyű hiperboloid</strong>{' '}
            az <M t="y" />-tengely mentén (<M t="|y| \ge 2" />)!
          </p>
        </Task>

        <Task n={20} q={<>Milyen görbében metszi a <M t="z = x^2 + y^2" /> paraboloidot a <M t="z = 4 - x^2 - y^2" /> lefelé nyíló paraboloid?</>}>
          <p>
            Egyenlővé téve: <M t="x^2 + y^2 = 4 - x^2 - y^2 \implies x^2 + y^2 = 2" />, és <M t="z = 2" />! Tehát egy{' '}
            <M t="\sqrt{2}" /> sugarú kör a <M t="z = 2" /> vízszintes síkban.
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Alakítsd át és azonosítsd: <M t="x^2 + y^2 - 2z^2 - 4x + 6y + 13 = 0" />!</>}>
          <p>
            <M t="(x-2)^2 + (y+3)^2 - 2z^2 = -13 + 4 + 9 = 0 \implies (x-2)^2 + (y+3)^2 = 2z^2" />. Ez egy{' '}
            <strong>elliptikus kúp</strong>, amelynek csúcspontja a <M t="(2;\,-3;\,0)" /> pont!
          </p>
        </Task>

        <Task n={22} q={<>Igazold, hogy az <M t="x^2 + y^2 - z^2 = 1" /> egyköpenyű hiperboloid <em>vonalas felület</em>: tartalmazza például az <M t="L: (1,\; t,\; t)" /> teljes egyenest!</>}>
          <p>
            Behelyettesítve <M t="x=1, y=t, z=t" />-t: <M t="1^2 + t^2 - t^2 = 1" /> minden <M t="t \in \mathbb{R}" />-re
            azonosan teljesül! (Ezért építhetők az erőművek hiperboloid hűtőtornyai egyenes acélgerendákból!)
          </p>
        </Task>

        <Task n={23} q={<>Igazold, hogy a <M t="z = y^2 - x^2" /> nyeregfelület is vonalas felület: add meg mindkét egyenest, amely rajta fekszik a felületen és átmegy a <M t="(1;\,1;\,0)" /> ponton!</>}>
          <p>
            Írjuk szorzattá: <M t="z = (y - x)(y + x)" />. Ha <M t="y - x = 0" /> (azaz <M t="y = x" />), akkor{' '}
            <M t="z = 0" />, tehát az <M t="L_1: (t,\; t,\; 0)" /> egyenes a felületen van! A második egyeneshez
            válasszuk <M t="y + x = 2" />-t (<M t="y = 2 - x" />): ekkor <M t="z = 2(2 - 2x) = 4 - 4x" />, tehát az{' '}
            <M t="L_2: (t,\; 2-t,\; 4-4t)" /> egyenes is végig a nyeregfelületen fekszik és áthalad <M t="(1;\,1;\,0)" />-n (<M t="t=1" />)!
          </p>
        </Task>
      </>
    ),
  },
];
