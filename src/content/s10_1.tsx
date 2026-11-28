import { M } from '../components/M';
import { Def, Steps, Story, Task, Warn } from '../components/ui';
import {
  ConicIdentifierDiagram,
  ConicSlicesDiagram,
  EllipseFocusWidget,
  EllipseVsHyperbolaDiagram,
  HyperbolaFocusWidget,
  ParabolaFocusWidget,
  ReflectivePropertiesDiagram,
  ShiftedConicWidget,
} from '../components/Widgets101';
import type { Page } from './s1_1';

export const S10_1: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Üdv a III. kötetben! A kúpszeletek geometriája',
    body: (
      <>
        <Story>
          <p>
            Elkezdődött a <strong>III. kötet</strong>! A 10. fejezetben az ókori görög geometria gyöngyszemeivel — a{' '}
            <strong>kúpszeletekkel</strong> — indulunk, amelyek a csillagászat (bolygópályák, üstökösök), az optika
            (távcsövek, parabolaantennák) és a navigáció alapgörbéi. Mind a négy alakzat egyetlen közös forrásból
            származik: egy kettős forgáskúp és egy sík metszésvonalából!
          </p>
        </Story>

        <ConicSlicesDiagram />

        <p>
          Algebrailag minden tengelyekkel párhuzamos kúpszelet az alábbi másodfokú egyenlettel írható le:
        </p>
        <M block t="Ax^2 + Cy^2 + Dx + Ey + F = 0." />
        <p>
          (A vegyes <M t="Bxy" /> tag elforgatott kúpszeleteket ad — erről a 10.3-as szakaszban lesz szó!)
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={<>Milyen elfajult kúpszeletet kapunk, ha a metsző sík pontosan átmegy a kettős kúp csúcsán?</>}
        >
          <p>
            A sík dőlésszögétől függően: egyetlen <strong>pontot</strong>, egyetlen <strong>egyenest</strong> (érintő
            sík), vagy <strong>két metsző egyenest</strong> (pl. <M t="x^2 - y^2 = 0" />)!
          </p>
        </Task>
        <Task
          n={2}
          q={<>Ránézésre milyen kúpszelet a <M t="4x^2 + 9y^2 = 36" />, illetve a <M t="4x^2 - 9y^2 = 36" /> egyenlet?</>}
        >
          <p>
            Az első <strong>ellipszis</strong> (<M t="A=4, C=9" />, azonos előjel, különböző érték), a második{' '}
            <strong>hiperbola</strong> (<M t="A=4, C=-9" />, ellentétes előjel)!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'A parabola: fókuszpont és vezéregyenes (direktrix)',
    body: (
      <>
        <Def title="Parabola, fókusz, vezéregyenes">
          <p>
            A <strong>parabola</strong> a sík azon <M t="P" /> pontjainak halmaza, amelyek egy rögzített{' '}
            <M t="F" /> <strong>fókuszponttól</strong> és egy rögzített <M t="L" /> <strong>vezéregyenestől</strong>{' '}
            (direktrixtől) egyenlő távolságra vannak: <M t="PF = d(P, L)" />.
          </p>
        </Def>

        <p>
          Ha a csúcspont az origóban van, a fókusz <M t="F(0;\,p)" />, a direktrix pedig <M t="y = -p" /> (<M t="p > 0" />),
          akkor <M t="\sqrt{x^2 + (y-p)^2} = |y + p|" /> négyzetre emelésével kapjuk a normálalakot:
        </p>
        <M block t="x^2 = 4py \qquad (\text{felfelé nyíló}) \qquad \text{és} \qquad y^2 = 4px \qquad (\text{jobbra nyíló})." />
        <p>
          <strong>Thomas 1. példa:</strong> Határozzuk meg az <M t="y^2 = 10x" /> parabola fókuszát és direktrixét!
          Összevetve <M t="y^2 = 4px" />-szel: <M t="4p = 10 \implies p = \dfrac{5}{2} = 2{,}5" />. Tehát a fókusz{' '}
          <M t="F\left(\frac{5}{2};\,0\right)" />, a direktrix <M t="x = -\frac{5}{2}" />!
        </p>

        <ParabolaFocusWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={<>Határozd meg az <M t="x^2 = -12y" /> parabola fókuszát, direktrixét és nyílásirányát!</>}
        >
          <p>
            <M t="4p = -12 \implies p = -3" />: <strong>lefelé nyíló</strong> parabola, fókusza <M t="F(0;\,-3)" />,
            vezéregyenese <M t="y = 3" />!
          </p>
        </Task>
        <Task
          n={4}
          q={<>Írd fel annak az origó csúcsú parabolának az egyenletét, amelynek fókusza <M t="F(-4;\,0)" />!</>}
        >
          <p>
            Balra nyíló (<M t="p = -4" />): <M t="y^2 = 4(-4)x \implies \mathbf{y^2 = -16x}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Az ellipszis: állandó távolságösszeg (PF₁ + PF₂ = 2a)',
    body: (
      <>
        <Def title="Ellipszis és fókuszai">
          <p>
            Az <strong>ellipszis</strong> azon <M t="P" /> pontok halmaza, amelyek két rögzített <M t="F_1, F_2" />{' '}
            fókuszponttól mért távolságainak <strong>összege állandó</strong> (<M t="2a" />):{' '}
            <M t="PF_1 + PF_2 = 2a" />.
          </p>
          <M block t="\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 \quad (a \ge b > 0, \text{ vízszintes nagytengely}), \qquad \mathbf{c = \sqrt{a^2 - b^2}}." />
        </Def>
        <p>
          <strong>Thomas 2–3. példa:</strong>
        </p>
        <ul>
          <li>
            <M t="\dfrac{x^2}{16} + \dfrac{y^2}{9} = 1" />: a nagyobb nevező <M t="x^2" /> alatt van (<M t="a=4, b=3" />),
            így a nagytengely <strong>vízszintes</strong>, <M t="c = \sqrt{16-9} = \sqrt{7}" />, fókuszok{' '}
            <M t="(\pm\sqrt{7};\,0)" />!
          </li>
          <li>
            <M t="\dfrac{x^2}{9} + \dfrac{y^2}{16} = 1" />: a nagyobb nevező <M t="y^2" /> alatt van (<M t="a=4, b=3" />),
            így a nagytengely <strong>függőleges</strong>, fókuszok <M t="(0;\,\pm\sqrt{7})" />!
          </li>
        </ul>

        <EllipseFocusWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={<>Határozd meg a <M t="9x^2 + 25y^2 = 225" /> ellipszis féltengelyeit, csúcsait és fókuszait!</>}
        >
          <p>
            Osszuk el <M t="225" />-tel: <M t="\dfrac{x^2}{25} + \dfrac{y^2}{9} = 1" />. Tehát <M t="a=5,\; b=3" />,
            <M t="c = \sqrt{25-9} = \mathbf{4}" />! Csúcsok: <M t="(\pm 5;\,0)" />, fókuszok: <M t="(\pm 4;\,0)" />!
          </p>
        </Task>
        <Task
          n={6}
          q={<>Írd fel annak az origó középpontú ellipszisnek az egyenletét, amelynek csúcsai <M t="(0;\,\pm 5)" /> és fókuszai <M t="(0;\,\pm 3)" />!</>}
        >
          <p>
            Függőleges nagytengely: <M t="a=5,\; c=3 \implies b^2 = a^2 - c^2 = 25 - 9 = 16" />, tehát{' '}
            <M t="\mathbf{\dfrac{x^2}{16} + \dfrac{y^2}{25} = 1}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A hiperbola: állandó távolságkülönbség és aszimptoták',
    body: (
      <>
        <Def title="Hiperbola, fókuszok és aszimptoták">
          <p>
            A <strong>hiperbola</strong> azon <M t="P" /> pontok halmaza, amelyek két fókuszponttól mért
            távolságainak <strong>különbsége (abszolút értékben) állandó</strong>: <M t="|PF_1 - PF_2| = 2a" />.
          </p>
          <M block t="\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1 \;\Longrightarrow\; \mathbf{c = \sqrt{a^2 + b^2}}, \quad \text{aszimptoták: } y = \pm\frac{b}{a}x." />
          <p>
            Ha az <M t="y^2" /> tag pozitív (<M t="\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1" />), a fókuszok az{' '}
            <M t="y" />-tengelyen vannak <M t="(0;\,\pm c)" />, az aszimptoták pedig <M t="y = \pm\frac{a}{b}x" />!
          </p>
        </Def>

        <HyperbolaFocusWidget />
        <EllipseVsHyperbolaDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={<>Határozd meg a <M t="\dfrac{x^2}{9} - \dfrac{y^2}{16} = 1" /> hiperbola csúcsait, fókuszait és aszimptotáit!</>}
        >
          <p>
            <M t="a=3,\; b=4 \implies c = \sqrt{9+16} = \mathbf{5}" />! Csúcsok: <M t="(\pm 3;\,0)" />, fókuszok:{' '}
            <M t="(\pm 5;\,0)" />, aszimptoták: <M t="y = \pm\dfrac{4}{3}x" />!
          </p>
        </Task>
        <Task
          n={8}
          q={<>Határozd meg a <M t="4y^2 - x^2 = 4" /> hiperbola fókuszait és aszimptotáit!</>}
        >
          <p>
            Osztva 4-gyel: <M t="\dfrac{y^2}{1} - \dfrac{x^2}{4} = 1" /> (<M t="a=1,\; b=2" />, függőleges ágak!).
            <M t="c = \sqrt{1+4} = \sqrt{5}" />, fókuszok <M t="(0;\,\pm\sqrt{5})" />, aszimptoták:{' '}
            <M t="y = \pm\dfrac{1}{2}x" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Eltolt kúpszeletek és a teljes négyzetté kiegészítés',
    body: (
      <>
        <p>
          Ha egy kúpszelet középpontja (vagy csúcsa) nem az origóban, hanem egy tetszőleges <M t="(h;\,k)" /> pontban
          van, egyszerűen <M t="x \mapsto x - h" /> és <M t="y \mapsto y - k" /> helyettesítéssel kapjuk a normálalakot!
          Visszafelé pedig a <strong>teljes négyzetté kiegészítés</strong> varázsolja elő az <M t="(h;\,k)" /> pontot!
        </p>
        <p>
          <strong>Kidolgozott nagypélda:</strong> azonosítsuk a{' '}
          <M t="9x^2 - 4y^2 - 18x + 16y - 43 = 0" /> kúpszeletet!
        </p>
        <ol>
          <li>Csoportosítás és kiemelés: <M t="9(x^2 - 2x) - 4(y^2 - 4y) = 43" />.</li>
          <li>Teljes négyzet (figyelj a mínuszjelre!): <M t="9(x-1)^2 - 9 - 4(y-2)^2 + 16 = 43 \iff 9(x-1)^2 - 4(y-2)^2 = 36" />.</li>
          <li>Osztás 36-tal: <M t="\mathbf{\dfrac{(x-1)^2}{4} - \dfrac{(y-2)^2}{9} = 1}" /> — ez egy <M t="(1;\,2)" /> középpontú hiperbola (<M t="a=2,\; b=3,\; c=\sqrt{13}" />)!</li>
        </ol>

        <ShiftedConicWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={<>Alakítsd normálalakra és azonosítsd: <M t="x^2 + 4y^2 - 6x + 8y + 9 = 0" />!</>}
        >
          <p>
            <M t="(x-3)^2 - 9 + 4(y+1)^2 - 4 + 9 = 0 \iff (x-3)^2 + 4(y+1)^2 = 4 \iff \mathbf{\dfrac{(x-3)^2}{4} + \dfrac{(y+1)^2}{1} = 1}" />
            — ellipszis <M t="(3;\,-1)" /> középponttal, <M t="a=2,\; b=1" />!
          </p>
        </Task>
        <Task
          n={10}
          q={<>Határozd meg az <M t="y^2 - 4y - 8x + 20 = 0" /> parabola csúcsát és fókuszát!</>}
        >
          <p>
            <M t="(y-2)^2 - 4 = 8x - 20 \iff (y-2)^2 = 8(x - 2)" />! Csúcs: <M t="(2;\,2)" />,{' '}
            <M t="4p=8 \Rightarrow p=2" /> (jobbra nyíló), így a fókusz <M t="(2+2;\,2) = \mathbf{(4;\,2)}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Optikai és akusztikai visszaverési tulajdonságok',
    body: (
      <>
        <p>
          A kúpszeletek nem véletlenül népszerűek a mérnöki gyakorlatban: mindháromnak van egy bámulatos{' '}
          <strong>fény- és hangvisszaverési törvénye</strong> (amely a 3. fejezet érintőivel igazolható!):
        </p>
        <ul>
          <li><strong>Parabola:</strong> a tengellyel párhuzamosan érkező minden sugár a <strong>fókuszba</strong> verődik vissza (műholdvevő tányér, reflektor, naperőmű)!</li>
          <li><strong>Ellipszis:</strong> az <M t="F_1" /> fókuszból induló minden sugár a görbéről visszaverődve pontosan az <M t="F_2" /> fókuszba érkezik (<em>suttogó galériák</em> és orvosi vesekőzúzó litotripter)!</li>
          <li><strong>Hiperbola:</strong> az egyik fókusz felé tartó sugár a hiperbola külső tükréről pontosan a <strong>másik fókuszba</strong> verődik (Cassegrain-csillagászati távcső és LORAN-rádiónavigáció)!</li>
        </ul>

        <ReflectivePropertiesDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={<>Egy <M t="4" /> m átmérőjű és <M t="0{,}5" /> m mély parabolaantenna fókuszába (a vevőfej helyére) milyen magasra kell tenni a vevőt az antenna aljától?</>}
        >
          <p>
            Az <M t="x^2 = 4py" /> parabola átmegy a <M t="(2;\,0{,}5)" /> peremponton: <M t="2^2 = 4p(0{,}5) \implies 4 = 2p \implies \mathbf{p = 2\text{ m}}" />!
          </p>
        </Task>
        <Task
          n={12}
          q={<>Egy ellipszis alakú suttogó terem hossza <M t="20" /> m (<M t="2a=20" />), szélessége <M t="12" /> m (<M t="2b=12" />). Milyen távol álljon egymástól két ember a két fókuszban?</>}
        >
          <p>
            <M t="a=10,\; b=6 \implies c = \sqrt{100-36} = 8" /> m, tehát a két fókusz távolsága <M t="2c = \mathbf{16\text{ m}}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglalás és a 4 legnagyobb buktató',
    body: (
      <>
        <ConicIdentifierDiagram />

        <table className="tbl">
          <thead>
            <tr>
              <th>kúpszelet</th>
              <th>normálalak (origó)</th>
              <th>fókusz (<M t="c" /> vagy <M t="p" />)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Parabola</td>
              <td><M t="x^2 = 4py" /> / <M t="y^2 = 4px" /></td>
              <td><M t="(0;\,p)" /> / <M t="(p;\,0)" />, direktrix <M t="-p" /></td>
            </tr>
            <tr>
              <td>Ellipszis</td>
              <td><M t="\frac{x^2}{a^2}+\frac{y^2}{b^2}=1" /></td>
              <td><M t="c = \sqrt{a^2 - b^2}" /> (a nagyobb tengelyen!)</td>
            </tr>
            <tr>
              <td>Hiperbola</td>
              <td><M t="\frac{x^2}{a^2}-\frac{y^2}{b^2}=1" /></td>
              <td><M t="c = \sqrt{a^2 + b^2}" />, aszimp. <M t="y=\pm\frac{b}{a}x" /></td>
            </tr>
          </tbody>
        </table>

        <h3>Négy klasszikus buktató</h3>
        <Warn>
          <p>
            <strong>1. A <M t="c^2" /> előjelének felcserélése:</strong> ellipszisnél <M t="c^2 = a^2 \mathbf{-} b^2" />,
            hiperbolánál <M t="c^2 = a^2 \mathbf{+} b^2" />! (Gondolj rá: az egyenletben lévő előjel <em>ellentettje</em>!)
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. A parabola <M t="4p" /> együtthatója:</strong> az <M t="x^2 = 8y" /> parabolánál{' '}
            <M t="p" /> NEM <M t="8" />, hanem <M t="4p = 8 \Rightarrow p = 2" />!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Hiperbolánál nem a nagyobb nevező az <M t="a^2" />!</strong> Ellipszisnél a nagyobb nevező adja
            a főtengelyt; hiperbolánál viszont a <strong>POZITÍV előjelű tag</strong> adja, merre nyílnak az ágak!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Negatív kiemelés teljes négyzetnél:</strong> a <M t="-4(y^2 - 4y)" /> kifejezésben a zárójelen
            belüli <M t="+4" /> kívül <M t="\mathbf{-16}" />-ot jelent — mindig vigyázz a kiemelt előjelre!
          </p>
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={<>A <M t="\dfrac{y^2}{4} - \dfrac{x^2}{9} = 1" /> hiperbolának az <M t="x" />- vagy az <M t="y" />-tengelyen vannak a fókuszai?</>}
        >
          <p>
            Az <M t="y^2" /> tag pozitív, tehát az <strong><M t="y" />-tengelyen</strong> (függőleges ágak, hiába nagyobb a <M t="9" />)!
          </p>
        </Task>
        <Task
          n={14}
          q={<>Milyen kúpszelet a <M t="3x^2 - 6x + 3y^2 + 12y = 0" /> egyenlet?</>}
        >
          <p>
            <M t="A = C = 3" /> (azonos együttható!) → <strong>kör</strong>: <M t="(x-1)^2 + (y+2)^2 = 5" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Lépcsőzetes gyakorlófeladatok (könnyűtől a haladóig)',
    body: (
      <>
        <p>Oldd meg az alábbi 9 feladatot növekvő nehézségi sorrendben!</p>

        <h3>Könnyebb (alapozó) feladatok</h3>
        <Task
          n={15}
          q={<>Határozd meg az <M t="x^2 = 16y" /> parabola fókuszát és direktrixét!</>}
        >
          <p>
            <M t="4p=16 \Rightarrow p=4" />: fókusz <M t="F(0;\,4)" />, direktrix <M t="y = -4" />.
          </p>
        </Task>
        <Task
          n={16}
          q={<>Add meg a <M t="\dfrac{x^2}{36} + \dfrac{y^2}{20} = 1" /> ellipszis fókuszait!</>}
        >
          <p>
            <M t="c = \sqrt{36 - 20} = 4" />, vízszintes nagytengely → fókuszok <M t="(\pm 4;\,0)" />.
          </p>
        </Task>
        <Task
          n={17}
          q={<>Add meg a <M t="\dfrac{x^2}{25} - \dfrac{y^2}{144} = 1" /> hiperbola fókuszait és aszimptotáit!</>}
        >
          <p>
            <M t="a=5,\; b=12 \Rightarrow c = \sqrt{25+144} = 13" />. Fókuszok <M t="(\pm 13;\,0)" />, aszimptoták{' '}
            <M t="y = \pm\dfrac{12}{5}x" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={<>Írd fel annak a hiperbolának az egyenletét, amelynek csúcsai <M t="(\pm 2;\,0)" /> és aszimptotái <M t="y = \pm 3x" />!</>}
        >
          <p>
            <M t="a = 2" />, és <M t="\dfrac{b}{a} = 3 \implies b = 6" />, így <M t="\mathbf{\dfrac{x^2}{4} - \dfrac{y^2}{36} = 1}" />!
          </p>
        </Task>
        <Task
          n={19}
          q={<>Hozd normálalakra és add meg a fókuszait: <M t="16x^2 + 9y^2 - 64x + 54y + 1 = 0" />!</>}
        >
          <p>
            <M t="16(x-2)^2 - 64 + 9(y+3)^2 - 81 + 1 = 0 \iff 16(x-2)^2 + 9(y+3)^2 = 144" />.
          </p>
          <p>
            Osztva 144-gyel: <M t="\dfrac{(x-2)^2}{9} + \dfrac{(y+3)^2}{16} = 1" /> (függőleges ellipszis, középpont{' '}
            <M t="(2;\,-3)" />, <M t="c=\sqrt{7}" /> → fókuszok <M t="(2;\,-3\pm\sqrt{7})" />!).
          </p>
        </Task>
        <Task
          n={20}
          q={<>Írd fel annak a parabolának az egyenletét, amelynek fókusza <M t="F(3;\,5)" /> és direktrixe az <M t="y = 1" /> egyenes!</>}
        >
          <p>
            A csúcs félúton van <M t="F" /> és a direktrix között: <M t="(3;\,3)" />, és <M t="p = 5 - 3 = 2" /> (felfelé nyíló).
            Egyenlet: <M t="\mathbf{(x - 3)^2 = 8(y - 3)}" />!
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={<>Hozd normálalakra és add meg az aszimptotáit: <M t="4y^2 - 9x^2 - 16y - 18x - 29 = 0" />!</>}
        >
          <p>
            <M t="4(y-2)^2 - 16 - 9(x+1)^2 + 9 = 29 \iff 4(y-2)^2 - 9(x+1)^2 = 36 \iff \dfrac{(y-2)^2}{9} - \dfrac{(x+1)^2}{4} = 1" />.
          </p>
          <p>
            Középpont <M t="(-1;\,2)" />, <M t="a=3,\; b=2" /> (függőleges ágak), aszimptoták:{' '}
            <M t="y - 2 = \pm\dfrac{3}{2}(x + 1)" />!
          </p>
        </Task>
        <Task
          n={22}
          q={<>A Föld ellipszispályán kering a Nap (az egyik fókusz) körül: a legkisebb naptávolsága (perihélium, <M t="a-c" />) kb. <M t="147{,}1" /> millió km, a legnagyobb (aphélium, <M t="a+c" />) kb. <M t="152{,}1" /> millió km. Mennyi az <M t="a" /> fél-nagytengely és a <M t="c" /> lineáris excentricitás?</>}
        >
          <p>
            Összeadva: <M t="2a = 299{,}2 \implies a = \mathbf{149{,}6}" /> M km (1 csillagászati egység!). Kivonva:{' '}
            <M t="2c = 5{,}0 \implies c = \mathbf{2{,}5}" /> M km!
          </p>
        </Task>
        <Task
          n={23}
          q={<><strong>LORAN-navigáció:</strong> két rádióadó <M t="100" /> km távolságra van egymástól (<M t="F_1(-50;\,0)" />, <M t="F_2(50;\,0)" />). Egy hajó úgy méri, hogy <M t="F_2" />-től pontosan <M t="60" /> km-rel közelebb van, mint <M t="F_1" />-től. Melyik hiperbola-ágon tartózkodik a hajó?</>}
        >
          <p>
            <M t="c = 50" />, <M t="2a = 60 \Rightarrow a = 30" />, <M t="b^2 = c^2 - a^2 = 2500 - 900 = 1600" /> (<M t="b=40" />).
          </p>
          <p>
            A hajó a <M t="\mathbf{\dfrac{x^2}{900} - \dfrac{y^2}{1600} = 1}" /> hiperbola <strong>jobb oldali (<M t="x > 0" />) ágán</strong> van!
          </p>
        </Task>

        <h3>Kiegészítő mintapélda</h3>
        <Steps
          title="Hiperbola normálalakja, fókuszai és aszimptotái"
          source="Analízis-labor"
          problem={
            <>
              Határozzuk meg a <M t="9x^2 - 16y^2 = 144" /> hiperbola tengelypontjait, fókuszait és aszimptotáit!
            </>
          }
          steps={[
            {
              title: 'Normálalakra hozás',
              body: (
                <M block t="\frac{x^2}{16} - \frac{y^2}{9} = 1." />
              ),
            },
            {
              title: 'Féltengelyek és csúcspontok',
              body: (
                <p>
                  Innen <M t="a = 4" />, <M t="b = 3" />, tehát a tengelypontok (csúcsok) <M t="(\pm 4;\,0)" />.
                </p>
              ),
            },
            {
              title: 'Fókuszok és aszimptoták',
              body: (
                <p>
                  <M t="c = \sqrt{a^2 + b^2} = \sqrt{16 + 9} = 5" />, így a fókuszok <M t="(\pm 5;\,0)" />, az aszimptoták egyenletei pedig <M t="y = \pm\dfrac{b}{a}x = \mathbf{\pm\dfrac{3}{4}x}" />.
                </p>
              ),
            },
          ]}
        />
      </>
    ),
  },
];
