import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import { CoordWidget } from '../components/CoordWidget';
import { SlopeWidget } from '../components/SlopeWidget';
import { LineWidget } from '../components/LineWidget';
import { PerpWidget } from '../components/PerpWidget';
import { CircleWidget } from '../components/CircleWidget';
import { ParabolaWidget } from '../components/ParabolaWidget';
import { Plane, PCircle, PLine, PParabola, PPoint } from '../components/Plane';
import type { Page } from './s1_1';

export const S1_2: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'A koordináta-rendszer',
    body: (
      <>
        <Story>
          <p>
            A legenda szerint Descartes betegen feküdt, és a plafonon mászó legyet nézte. Észrevette, hogy a légy helyzetét
            két szám is elég pontosan megadja: az, hogy milyen messze van az egyik faltól, és az, hogy milyen messze a
            másiktól. Hogy a történet valóban így esett-e, bizonytalan. Maga az ötlet viszont valódi, és óriási jelentőségű:
            geometriai alakzatokat egyenletekkel írhatunk le, és az egyenleteket a geometria segítségével érthetjük meg.
          </p>
        </Story>

        <p>
          A <strong>derékszögű koordináta-rendszer</strong> két, a 0 pontban merőlegesen metsződő számegyenesből áll. A
          vízszintes az <em>x</em>-tengely (jobbra nő), a függőleges az <em>y</em>-tengely (felfelé nő), a közös pontjuk az{' '}
          <strong>origó</strong>. A sík minden pontjához pontosan egy <strong>rendezett számpárt</strong> rendelünk: az első
          szám a pont <em>x</em>-koordinátája (abszcisszája), a második az <em>y</em>-koordinátája (ordinátája). A „rendezett”
          szó lényeges: a <M t="(3;\,-2)" /> és a <M t="(-2;\,3)" /> két különböző pont.
        </p>
        <p>
          A pár egy pontot úgy ad meg, hogy az <em>x</em>-tengelyen megkeressük az első számot, az <em>y</em>-tengelyen a
          másodikat, mindkettőn át a tengelyre merőleges egyenest húzunk, és a két egyenes metszéspontja a keresett pont.
        </p>

        <h3>Síknegyedek</h3>
        <p>
          A két tengely négy síknegyedre osztja a síkot. A számozás a jobb felső negyeddel kezdődik, és balra forogva halad tovább, mint a matematikai szögmérésnél.
        </p>
        <table className="tbl">
          <thead>
            <tr><th>Síknegyed</th><th>x előjele</th><th>y előjele</th></tr>
          </thead>
          <tbody>
            <tr><td>I.</td><td>+</td><td>+</td></tr>
            <tr><td>II.</td><td>−</td><td>+</td></tr>
            <tr><td>III.</td><td>−</td><td>−</td></tr>
            <tr><td>IV.</td><td>+</td><td>−</td></tr>
          </tbody>
        </table>
        <p>A tengelyek pontjai egyik síknegyedhez sem tartoznak.</p>

        <CoordWidget />

        <h3>Egyenlet grafikonja</h3>
        <p>
          Egy két ismeretlenes egyenlet vagy egyenlőtlenség <strong>grafikonja</strong> azoknak a pontoknak a halmaza, amelyek
          koordinátái kielégítik. Például az <M t="y=2" /> egyenlet grafikonja a vízszintes egyenes, amelynek minden pontján az{' '}
          <M t="y" /> koordináta 2. Az <M t="x=y" /> egyenleté az I. és a III. síknegyedet felező egyenes. Az <M t="x^2+y^2=4" />{' '}
          egyenletet pedig azok a pontok elégítik ki, amelyek az origótól 2 egységre vannak, ez egy kör.
        </p>

        <Warn>
          Két ábrázolási szabály. Ha a két változó (<em>x</em>, <em>y</em>) más-más mennyiséget jelent (például idő és erő), akkor a
          két tengelyen nyugodtan lehet különböző a skála. Ha viszont geometriáról van szó, a skálának egyenlőnek kell
          lennie. Különben a kör ellipszisnek látszik, a derékszög nem derékszögnek, és az egyenesek meredeksége is
          megváltozik. Ebben a szakaszban az ábrákon mindig egyenlő a skála.
        </Warn>
        <p className="hint">
          Egy megjegyzés a jelölésről: ha az <M t="(a;\,b)" /> szimbólumot látjuk, a szövegkörnyezet dönti el, hogy pont vagy
          nyílt intervallum. A koordinátákat itt pontosvessző választja el, hogy a tizedesvessző ne zavarjon, például{' '}
          <M t="(1{,}5;\,2)" />.
        </p>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Növekmény és meredekség',
    body: (
      <>
        <p>
          A <M t="\Delta" /> (delta) betű a görög <em>d</em>, és változást jelent. Ha egy pont az <M t="(x_1;\,y_1)" />{' '}
          helyről az <M t="(x_2;\,y_2)" /> helyre jut, a <strong>növekményei</strong>
        </p>
        <M block t="\Delta x = x_2 - x_1,\qquad \Delta y = y_2 - y_1." />
        <p>
          Ez mindig „vég mínusz kezdet”, ezért a növekmény lehet pozitív, negatív vagy nulla. Ha például egy pont az{' '}
          <M t="A(-2;\,1)" /> helyről a <M t="B(3;\,-4)" /> helyre megy, akkor <M t="\Delta x=3-(-2)=5" /> és{' '}
          <M t="\Delta y=-4-1=-5" />. A <M t="C(4;\,2)" /> pontból a <M t="D(4;\,-3)" /> pontba menet{' '}
          <M t="\Delta x=0" /> és <M t="\Delta y=-5" />.
        </p>

        <h3>Meredekség</h3>
        <Def title="Meredekség">
          Ha egy egyenes nem függőleges, és két különböző pontja <M t="P_1(x_1;\,y_1)" /> és <M t="P_2(x_2;\,y_2)" />, akkor a
          meredeksége
          <M block t="m=\frac{\Delta y}{\Delta x}=\frac{y_2-y_1}{x_2-x_1}." />
        </Def>
        <p>
          A meredekség azt mondja meg, hogy mennyivel változik az <M t="y" />, amíg az <M t="x" /> 1 egységet nő. Az, hogy
          a két pont melyik, nem számít: bármely két pont derékszögű háromszöget határoz meg, amelynek befogói <M t="\Delta x" />{' '}
          és <M t="\Delta y" />. Ezek a háromszögek az egyenes különböző helyein egymáshoz hasonlóak, tehát a befogók aránya
          mindenhol ugyanaz.
        </p>
        <ul>
          <li><M t="m>0" />: az egyenes jobbra haladva emelkedik, <M t="m<0" />: lejt, <M t="m=0" />: vízszintes.</li>
          <li>Minél nagyobb <M t="|m|" />, annál meredekebb az egyenes.</li>
          <li>Függőleges egyenesnél <M t="\Delta x=0" />, és nullával nem lehet osztani, ezért itt a meredekség <em>nem értelmezett</em>.</li>
        </ul>

        <h3>Irányszög</h3>
        <p>
          Az <strong>irányszög</strong> (<M t="\varphi" />) az a szög, amellyel a pozitív <em>x</em>-tengely félegyenesét balra
          kell forgatni, hogy az egyenessel párhuzamos legyen; <M t="0^\circ\le\varphi<180^\circ" />. A vízszintes egyenesé 0°, a függőlegesé 90°. Egy
          nem függőleges egyenesre
          <M block t="m=\operatorname{tg}\varphi." />
          Ezért a meredekséget iránytangensnek is hívják. Például <M t="m=1" /> esetén <M t="\varphi=45^\circ" />,{' '}
          <M t="m=-1" /> esetén <M t="\varphi=135^\circ" />.
        </p>

        <SlopeWidget />
        <p className="hint">Állítsd a két pontot úgy, hogy Δx = 0 legyen, és nézd meg, mi történik a meredekséggel.</p>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Az egyenes egyenletei',
    body: (
      <>
        <p>
          Egy egyenes több alakban is leírható. Melyiket használjuk, az attól függ, hogy mit tudunk róla.
        </p>
        <table className="tbl">
          <thead>
            <tr><th>Alak</th><th>Egyenlet</th><th>Mikor jó</th></tr>
          </thead>
          <tbody>
            <tr><td>vízszintes / függőleges</td><td><M t="y=c" /> / <M t="x=a" /></td><td>minden pontján ugyanaz az y / x</td></tr>
            <tr><td>pont–meredekség</td><td><M t="y=y_1+m(x-x_1)" /></td><td>adott egy pont és a meredekség</td></tr>
            <tr><td>meredekség–tengelymetszet</td><td><M t="y=mx+b" /></td><td>az <em>m</em> és a <em>b</em> leolvasható</td></tr>
            <tr><td>általános</td><td><M t="Ax+By=C" /></td><td>bármely egyenesre (a függőlegesekre is), ha <M t="A" /> és <M t="B" /> nem mindkettő 0</td></tr>
          </tbody>
        </table>

        <h3>Honnan jön a pont–meredekség alak?</h3>
        <p>
          Legyen az egyenes <M t="P_1(x_1;\,y_1)" /> pontján át haladó, <M t="m" /> meredekségű. Egy másik <M t="P(x;\,y)" /> pont
          pontosan akkor van az egyenesen, ha a <M t="P_1P" /> szakasz meredeksége is <M t="m" />:
        </p>
        <M block t="\frac{y-y_1}{x-x_1}=m\ \Longrightarrow\ y=y_1+m(x-x_1)." />
        <p>
          Ha a pont éppen az <M t="(0;\,b)" />, akkor ebből <M t="y=b+mx" /> lesz. Ez az <M t="y=mx+b" /> alak: a <M t="b" /> az{' '}
          <strong>y-tengelymetszet</strong>. Az <strong>x-tengelymetszet</strong> az az <M t="x" />, ahol <M t="y=0" />, vagyis{' '}
          <M t="x=-b/m" /> (ha <M t="m\ne0" />).
        </p>

        <h3>Példák</h3>
        <p>
          <strong>1.</strong> Írjuk fel a <M t="(-1;\,4)" /> ponton átmenő, <M t="\tfrac23" /> meredekségű egyenest:
        </p>
        <M block t="y=4+\tfrac23\,(x+1)=\tfrac23x+\tfrac{14}{3}." />
        <p>
          <strong>2.</strong> Az <M t="(1;\,-2)" /> és a <M t="(4;\,5)" /> pontra illeszkedő egyenes meredeksége{' '}
          <M t="m=\tfrac{5-(-2)}{4-1}=\tfrac73" />, így
        </p>
        <M block t="y=-2+\tfrac73(x-1)=\tfrac73x-\tfrac{13}{3}." />
        <p>
          Ellenőrzés a másik ponttal: <M t="x=4" />-nél <M t="\tfrac{28}{3}-\tfrac{13}{3}=5" />, ami a másik pont <M t="y" />{' '}
          koordinátája.
        </p>
        <p>
          <strong>3.</strong> Adott a <M t="6x-4y=12" /> egyenes. Megoldjuk <M t="y" />-ra: <M t="-4y=-6x+12" />, tehát{' '}
          <M t="y=\tfrac32x-3" />. A meredekség <M t="\tfrac32" />, az <em>y</em>-tengelymetszet <M t="-3" />, az <em>x</em>-tengelymetszet pedig{' '}
          <M t="x=-b/m=2" />.
        </p>

        <LineWidget />
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Párhuzamos és merőleges egyenesek',
    body: (
      <>
        <p>
          <strong>Párhuzamos</strong> egyeneseknek azonos az irányszögük, ezért (ha nem függőlegesek) a meredekségük is azonos.
          Fordítva: ha két egyenes meredeksége megegyezik, párhuzamosak.
        </p>

        <h3>Merőleges egyenesek</h3>
        <Def title="Merőlegesség és meredekség">
          Ha egyik egyenes sem függőleges, akkor a két egyenes pontosan akkor merőleges egymásra, ha{' '}
          <M t="m_1\,m_2=-1" />, azaz <M t="m_2=-\dfrac1{m_1}" />.
        </Def>
        <p>
          Miért? Egy <M t="m" /> meredekségű egyenes „iránya” az <M t="(1;\,m)" /> vektor: egy egységet jobbra, <M t="m" />{' '}
          egységet fel. Ha egy vektort 90°-kal balra forgatunk, akkor az <M t="(a;\,b)" /> vektor{' '}
          <M t="(-b;\,a)" />-ba megy át (például <M t="(2;\,0)\to(0;\,2)" />). Az <M t="(1;\,m)" /> így <M t="(-m;\,1)" /> lesz, és
          ennek a meredeksége
          <M block t="\frac{1}{-m}=-\frac1m." />
          A merőleges egyenes iránya tehát ennek megfelelő, a két meredekség szorzata <M t="m\cdot\left(-\tfrac1m\right)=-1" />.
        </p>
        <Warn>
          A vízszintes egyenes (<M t="m=0" />) merőlegese függőleges, amelynek nincs meredeksége. Ezt az esetet a szorzatszabály
          nem fedi le, külön kell kezelni.
        </Warn>
        <p>
          Általános alakban ugyanez: az <M t="Ax+By=C_1" /> egyenessel párhuzamos a <M t="Ax+By=C_2" /> (ha <M t="C_1\neq C_2" />), merőleges
          pedig a <M t="Bx-Ay=C_3" /> (ha <M t="A" /> és <M t="B" /> nem nulla: a meredekségek <M t="-\tfrac AB" /> és <M t="\tfrac BA" />,
          szorzatuk <M t="-1" />).
        </p>

        <h3>Példa</h3>
        <p>
          Adott a <M t="3x+4y=8" /> egyenes és a <M t="P(2;\,-1)" /> pont. Az egyenes <M t="y=-\tfrac34x+2" /> alakú, meredeksége{' '}
          <M t="-\tfrac34" />.
        </p>
        <ul>
          <li>
            A <strong>merőleges</strong> meredeksége <M t="\tfrac43" />, tehát <M t="y=-1+\tfrac43(x-2)=\tfrac43x-\tfrac{11}{3}" />.
          </li>
          <li>
            A <strong>párhuzamos</strong> meredeksége <M t="-\tfrac34" />, tehát <M t="y=-1-\tfrac34(x-2)=-\tfrac34x+\tfrac12" />.
          </li>
        </ul>

        <PerpWidget />
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Távolság és kör',
    body: (
      <>
        <h3>Két pont távolsága</h3>
        <p>
          A <M t="P(x_1;\,y_1)" /> és <M t="Q(x_2;\,y_2)" /> pontból és a vízszintes, illetve függőleges szakaszokból derékszögű
          háromszög építhető, amelynek befogói <M t="|\Delta x|" /> és <M t="|\Delta y|" />, az átfogója a <M t="PQ" /> szakasz.
          Pitagorasz tétele szerint
        </p>
        <M block t="d=\sqrt{(\Delta x)^2+(\Delta y)^2}=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}." />
        <p>
          Például az <M t="A(-2;\,3)" /> és a <M t="B(4;\,-5)" /> távolsága: <M t="\Delta x=6" />, <M t="\Delta y=-8" />, tehát{' '}
          <M t="d=\sqrt{36+64}=10" />. Az origótól mért távolság speciális eset: <M t="\sqrt{x^2+y^2}" />.
        </p>
        <p>
          A <M t="PQ" /> szakasz <strong>felezőpontjának</strong> koordinátái a koordinátánkénti átlagok:{' '}
          <M t="\left(\tfrac{x_1+x_2}{2};\,\tfrac{y_1+y_2}{2}\right)" />. A fenti <M t="A" /> és <M t="B" /> felezőpontja például az{' '}
          <M t="(1;\,-1)" />.
        </p>

        <h3>A kör egyenlete</h3>
        <p>
          A <M t="C(h;\,k)" /> középpontú, <M t="r" /> sugarú kör azokból a pontokból áll, amelyek <M t="C" />-től pontosan{' '}
          <M t="r" /> távolságra vannak. A távolságképlet szerint ez azt jelenti, hogy
        </p>
        <M block t="(x-h)^2+(y-k)^2=r^2." />
        <p>
          Az origó körüli egységkörre <M t="x^2+y^2=1" />. A kör <em>belső</em> pontjaira <M t="(x-h)^2+(y-k)^2<r^2" />, a{' '}
          <em>külsőkre</em> <M t="(x-h)^2+(y-k)^2>r^2" /> teljesül.
        </p>

        <CircleWidget />

        <h3>Teljes négyzetté alakítás</h3>
        <p>
          Ha a kör egyenletét kifejtve kapjuk, a <strong>teljes négyzetté alakítással</strong> hozzuk kanonikus alakra: az{' '}
          <M t="x" />-es és az <M t="y" />-os tagokat külön négyzetté egészítjük ki, és ugyanazt a számot az egyenlet másik oldalához is
          hozzáadjuk. Példa:
        </p>
        <M block t="x^2+y^2-6x+2y-6=0\ \Longrightarrow\ (x^2-6x+9)+(y^2+2y+1)=6+9+1\ \Longrightarrow\ (x-3)^2+(y+1)^2=16." />
        <p>
          Ez a <M t="(3;\,-1)" /> középpontú, 4 sugarú kör. Figyeljünk a végére: ha az egyenlet jobb oldala 0, az egyetlen pont, ha
          negatív, akkor üres halmaz. Például <M t="x^2+y^2-4x+6y+13=0" /> átalakítva <M t="(x-2)^2+(y+3)^2=0" />, ami csak a{' '}
          <M t="(2;\,-3)" /> pont.
        </p>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'A parabola',
    body: (
      <>
        <p>
          Az <M t="y=x^2" /> egyenlet pontjai (például <M t="(0;0)" />, <M t="(1;1)" />, <M t="(-2;4)" />, <M t="(\tfrac32;\tfrac94)" />) egyetlen
          folytonos görbére, a <strong>parabolára</strong> illeszkednek. A görbe az <M t="y" />-tengelyre szimmetrikus, a
          szimmetriatengelyét az origóban, a <strong>csúcspontban</strong> metszi.
        </p>
        <Plane xmin={-4} xmax={4} ymin={-1} ymax={7}>
          {(m) => (
            <>
              <PParabola map={m} a={1} b={0} c={0} />
              <PParabola map={m} a={2} b={0} c={0} cls="pl-alt" />
              <PParabola map={m} a={0.25} b={0} c={0} cls="pl-ok" />
              <PPoint map={m} x={2.2} y={4.84} label="y = x²" dx={8} dy={-6} color="#38bdf8" />
              <PPoint map={m} x={1.6} y={5.12} label="y = 2x²" dx={-62} dy={-6} color="#f472b6" />
              <PPoint map={m} x={3.6} y={3.24} label="y = x²/4" dx={-58} dy={-10} color="#34d399" />
            </>
          )}
        </Plane>
        <p>
          Az <M t="y=ax^2" /> egyenletnél az <M t="a" /> előjele azt adja meg, hogy a szárak fölfelé (<M t="a>0" />) vagy lefelé (
          <M t="a<0" />) nyílnak, az <M t="|a|" /> pedig az alakot: minél nagyobb, annál „karcsúbb” a parabola.
        </p>

        <h3>Az általános eset: csúcs és tengely</h3>
        <p>
          Az <M t="y=ax^2+bx+c" /> (ahol <M t="a\neq0" />) görbe csúcsát teljes négyzetté alakítással kapjuk meg:
        </p>
        <M block t="y=a\left(x+\frac{b}{2a}\right)^2+c-\frac{b^2}{4a}." />
        <p>
          A négyzetes tag sosem negatív, ezért <M t="a>0" /> esetén legkisebb az értéke, ha a zárójel 0, vagyis{' '}
          <M t="x=-\tfrac{b}{2a}" />-nál, <M t="a<0" /> esetén ugyanitt a legnagyobb. Így:
        </p>
        <ul>
          <li>a tengely az <M t="x=-\dfrac{b}{2a}" /> egyenletű egyenes;</li>
          <li>a csúcs <M t="\left(-\dfrac{b}{2a};\ c-\dfrac{b^2}{4a}\right)" />;</li>
          <li>az <em>y</em>-tengelyt az <M t="y=c" /> pontban metszi;</li>
          <li>
            az <em>x</em>-tengelyt ott metszi, ahol <M t="ax^2+bx+c=0" />. Ha a <strong>diszkrimináns</strong> <M t="D=b^2-4ac" /> pozitív,
            két metszéspont van, ha 0, akkor egy (a csúcs az <em>x</em>-tengelyen van), ha negatív, nincs.
          </li>
        </ul>

        <h3>Példák</h3>
        <p>
          <strong>1.</strong> <M t="y=2x^2-4x-6" />. A tengely <M t="x=-\tfrac{-4}{4}=1" />, a csúcs <M t="(1;\,2-4-6)=(1;\,-8)" />. A metszéspontok
          az <M t="2(x^2-2x-3)=2(x-3)(x+1)=0" /> egyenletből: <M t="x=3" /> és <M t="x=-1" />. Az <em>y</em>-tengelyt a <M t="-6" /> helyen metszi.
        </p>
        <p>
          <strong>2.</strong> <M t="y=-x^2+6x-8" />. Itt <M t="a<0" />, a szárak lefelé nyílnak. A tengely <M t="x=3" />, a csúcs{' '}
          <M t="(3;\,-9+18-8)=(3;\,1)" />. A metszéspontok: <M t="x^2-6x+8=0" />, azaz <M t="x=2" /> és <M t="x=4" />.
        </p>

        <ParabolaWidget />

        <p className="hint">
          A későbbiekben (1.5. szakasz) látni fogjuk, hogy az <M t="y=a(x-p)^2+q" /> parabola az <M t="y=ax^2" /> parabolának a{' '}
          <M t="p" /> egységgel jobbra és <M t="q" /> egységgel feljebb tolt másolata. A teljes négyzetté alakítás éppen ezt a
          tolást teszi láthatóvá.
        </p>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Metszéspontok és tartományok',
    body: (
      <>
        <h3>Alakzatok metszéspontja</h3>
        <p>
          Két alakzat közös pontjait úgy kapjuk, hogy a két egyenletet egyszerre elégítjük ki: az egyik változót kifejezzük, és
          behelyettesítjük a másikba.
        </p>
        <p>
          <strong>Egyenes és kör.</strong> Az <M t="y=x+1" /> egyenes és az <M t="x^2+y^2=13" /> kör metszéspontjai: behelyettesítve{' '}
          <M t="x^2+(x+1)^2=13" />, azaz <M t="2x^2+2x-12=0" />, vagyis <M t="x^2+x-6=0" />, ahonnan <M t="x=2" /> vagy{' '}
          <M t="x=-3" />. A pontok: <M t="(2;\,3)" /> és <M t="(-3;\,-2)" />. Ellenőrzés: <M t="4+9=13" /> és <M t="9+4=13" />.
        </p>
        <p>
          <strong>Parabola és egyenes.</strong> Az <M t="y=x^2" /> és az <M t="y=x+2" />: <M t="x^2=x+2" />, <M t="x^2-x-2=0" />,{' '}
          <M t="(x-2)(x+1)=0" />. A metszéspontok <M t="(2;\,4)" /> és <M t="(-1;\,1)" />.
        </p>
        <Plane xmin={-4} xmax={4} ymin={-2} ymax={6}>
          {(m) => (
            <>
              <PParabola map={m} a={1} b={0} c={0} />
              <PLine map={m} k={1} b={2} cls="pl-alt" />
              <PPoint map={m} x={2} y={4} label="(2; 4)" color="#f59e0b" />
              <PPoint map={m} x={-1} y={1} label="(−1; 1)" color="#f59e0b" dx={-48} dy={-8} />
            </>
          )}
        </Plane>

        <h3>Tartományok egyenlőtlenségekkel</h3>
        <ul>
          <li>
            A <M t="(-2;\,1)" /> középpontú, 3 sugarú kör belseje: <M t="(x+2)^2+(y-1)^2<9" />.
          </li>
          <li>
            A <strong>gyűrű</strong> az origó körül, 1 és 2 sugarú körvonalak között (a körvonalakat is beleértve):{' '}
            <M t="1\le x^2+y^2\le4" />.
          </li>
          <li>
            A <M t="y>2x-1" /> félsíkot az <M t="y=2x-1" /> egyenes választja el a sík többi részétől. Hogy melyik oldalról
            van szó, <em>ellenőrző ponttal</em> döntjük el: az origóra <M t="0>-1" /> igaz, tehát az origót tartalmazó oldal a
            megoldás, az egyenes pontjai nélkül.
          </li>
        </ul>
        <Plane xmin={-4} xmax={4} ymin={-4} ymax={4}>
          {(m) => (
            <>
              <circle cx={m.X(0)} cy={m.Y(0)} r={2 * m.sx} className="pl-fill" />
              <circle cx={m.X(0)} cy={m.Y(0)} r={1 * m.sx} className="pl-hole" />
              <PCircle map={m} h={0} k={0} r={2} />
              <PCircle map={m} h={0} k={0} r={1} cls="pl-alt" />
            </>
          )}
        </Plane>
        <p className="hint">A gyűrű: a kék kör belseje, a belső (rózsaszín) kör belső tartománya nélkül.</p>
      </>
    ),
  },

  // ---------------------------------------------------------------- 8
  {
    title: 'Gyakorló feladatok',
    body: (
      <>
        <p>Próbáld meg előbb önállóan megoldani, a megoldást csak utána nyisd ki.</p>

        <Task
          n={1}
          q={
            <>
              Egy pont az <M t="A(-3;\,2)" /> helyről a <M t="B(5;\,-4)" /> helyre megy. Add meg a növekményeket, a két pont távolságát,
              és az <M t="AB" /> egyenes meredekségét.
            </>
          }
        >
          <p>
            <M t="\Delta x=5-(-3)=8" />, <M t="\Delta y=-4-2=-6" />. A távolság <M t="\sqrt{64+36}=10" />. A meredekség{' '}
            <M t="m=\tfrac{-6}{8}=-\tfrac34" />.
          </p>
        </Task>

        <Task
          n={2}
          q={
            <>
              Írd fel a <M t="(3;\,1)" /> és a <M t="(-1;\,-7)" /> ponton átmenő egyenes egyenletét, és add meg az <em>x</em>-tengelymetszetét.
            </>
          }
        >
          <p>
            <M t="m=\tfrac{-7-1}{-1-3}=2" />. Pont–meredekség alakban <M t="y=1+2(x-3)=2x-5" />. Az <em>x</em>-tengelymetszet: <M t="2x-5=0" />,{' '}
            <M t="x=\tfrac52" />. Ellenőrzés a másik ponttal: <M t="2\cdot(-1)-5=-7" />.
          </p>
        </Task>

        <Task n={3} q={<>Hozd <M t="y=mx+b" /> alakra az <M t="5x-2y=10" /> egyenest, és add meg a meredekségét és a két tengelymetszetét.</>}>
          <p>
            <M t="-2y=-5x+10" />, tehát <M t="y=\tfrac52x-5" />. A meredekség <M t="\tfrac52" />, az <em>y</em>-tengelymetszet <M t="-5" />, az{' '}
            <em>x</em>-tengelymetszet <M t="x=-\tfrac{b}{m}=2" />.
          </p>
        </Task>

        <Task n={4} q={<>Írd fel a <M t="(0;\,4)" /> ponton átmenő, a <M t="2x-y=3" /> egyenesre merőleges egyenes egyenletét.</>}>
          <p>
            A megadott egyenes <M t="y=2x-3" />, meredeksége 2. A merőleges meredeksége <M t="-\tfrac12" />, és az <em>y</em>-tengelyt a 4-nél metszi:{' '}
            <M t="y=-\tfrac12x+4" />.
          </p>
        </Task>

        <Task n={5} q={<>Mi a középpontja és a sugara az <M t="x^2+y^2+8x-4y+4=0" /> körnek?</>}>
          <p>
            <M t="(x^2+8x+16)+(y^2-4y+4)=-4+16+4=16" />, tehát <M t="(x+4)^2+(y-2)^2=16" />. A középpont <M t="(-4;\,2)" />, a sugár 4.
          </p>
        </Task>

        <Task n={6} q={<>Add meg az <M t="y=x^2-4x+1" /> parabola tengelyét, csúcsát és az <em>x</em>-tengellyel alkotott metszéspontjait.</>}>
          <p>
            <M t="a=1" />, <M t="b=-4" />, <M t="c=1" />. A tengely <M t="x=2" />, a csúcs <M t="(2;\,4-8+1)=(2;\,-3)" />. A diszkrimináns{' '}
            <M t="D=16-4=12>0" />, a metszéspontok <M t="x=\tfrac{4\pm\sqrt{12}}{2}=2\pm\sqrt3" />. Az <em>y</em>-tengelyt <M t="y=1" />-nél metszi.
          </p>
        </Task>

        <Task n={7} q={<>Igazold, hogy az <M t="A(0;\,0)" />, <M t="B(4;\,0)" /> és <M t="C(2;\,5)" /> csúcsú háromszög egyenlő szárú, de nem szabályos.</>}>
          <p>
            <M t="AB=4" />, <M t="AC=\sqrt{4+25}=\sqrt{29}" />, <M t="BC=\sqrt{(2-4)^2+5^2}=\sqrt{29}" />. Két oldal egyenlő (<M t="AC=BC" />), a harmadik
            különbözik (<M t="\sqrt{29}\neq4" />), tehát egyenlő szárú, de nem szabályos.
          </p>
        </Task>

        <Task n={8} q={<>Hol metszi az <em>x</em>-tengelyt az <M t="(1;\,1)" /> középpontú, <M t="\sqrt5" /> sugarú kör?</>}>
          <p>
            A kör egyenlete <M t="(x-1)^2+(y-1)^2=5" />. Az <em>x</em>-tengelyen <M t="y=0" />, így <M t="(x-1)^2+1=5" />, <M t="(x-1)^2=4" />, <M t="x-1=\pm2" />.
            A metszéspontok <M t="(3;\,0)" /> és <M t="(-1;\,0)" />.
          </p>
        </Task>
      </>
    ),
  },
];
