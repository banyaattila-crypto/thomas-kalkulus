import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  CircleImplicitWidget,
  FoliumWidget,
  ImplicitSecondWidget,
  ImplicitStepsDiagram,
  RationalPowerWidget,
} from '../components/Widgets36';
import type { Page } from './s1_1';

export const S3_6: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Mi az implicit függvény, és miért nem fejezzük ki y-t?',
    body: (
      <>
        <Story>
          <p>
            Az eddigi függvényeink szinte mindig <M t="y=f(x)" /> (<em>explicit</em>) alakban álltak: bal oldalon magányosan <M t="y" />, jobb oldalon csupa <M t="x" />. A geometriában azonban sok híres görbe <strong>összekeveri</strong> <M t="x" />-et és <M t="y" />-t — például a kör (<M t="x^2+y^2=25" />) vagy a Descartes-féle levél (<M t="x^3+y^3-9xy=0" />). Az utóbbiból <M t="y" />-t kifejezni szinte lehetetlen! Szerencsére <strong>egyáltalán nem is kell kifejezni ahhoz, hogy megtaláljuk az érintő meredekségét.</strong>
          </p>
        </Story>
        <p>
          Az <strong>implicit deriválás</strong> egyetlen zseniális gondolatra épül: képzeld el, hogy <M t="y" /> valójában egy rejtett <M t="y(x)" /> függvény! Ezért amikor az egyenlet mindkét oldalát deriválod <M t="x" /> szerint:
        </p>
        <ul>
          <li>A tiszta <M t="x" />-es tagokat a szokásos módon deriválod (<M t="(x^2)'=2x" />).</li>
          <li><strong>Minden <M t="y" />-t tartalmazó tagnál a láncszabály miatt megjelenik egy <M t="y'=\dfrac{dy}{dx}" /> szorzó!</strong> Például:
            <M block t="\frac{d}{dx}(y^2) = 2y\cdot\frac{dy}{dx}, \qquad \frac{d}{dx}(\sin y) = \cos y\cdot\frac{dy}{dx}, \qquad \frac{d}{dx}(xy) = 1\cdot y + x\cdot\frac{dy}{dx}." />
          </li>
        </ul>
        <p>
          Nézd meg a körnél (<M t="x^2+y^2=25" />): mindkét oldalt deriválva <M t="2x + 2y\frac{dy}{dx} = 0" />, amiből egyetlen sorban <M t="\dfrac{dy}{dx}=-\dfrac{x}{y}" />!
        </p>
        <CircleImplicitWidget />
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Ha <M t="x^2 + y^2 = 25" />, mennyi <M t="\dfrac{dy}{dx}" /> a <M t="(3;\,4)" /> pontban?
            </>
          }
          options={[
            { label: <M t="-\dfrac{3}{4}" />, ok: true },
            { label: <M t="\dfrac{3}{4}" /> },
            { label: <M t="-\dfrac{4}{3}" /> },
            { label: <M t="\dfrac{4}{3}" /> },
          ]}
          explain={
            <>
              Implicit deriválással <M t="2x + 2yy' = 0 \implies y' = -\dfrac{x}{y} = -\dfrac{3}{4}" />.
            </>
          }
        />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Deriváld implicit módon az <M t="y^2=x" /> egyenletet, és ellenőrizd, hogy <M t="y=\sqrt{x}" /> esetén visszakapod-e az ismert <M t="\dfrac{1}{2\sqrt{x}}" /> képletet!
            </>
          }
        >
          <p>
            <M t="2y\dfrac{dy}{dx}=1 \;\Longrightarrow\; \dfrac{dy}{dx}=\dfrac{1}{2y}" />. Ha <M t="y=\sqrt{x}" />, akkor ez valóban <M t="\dfrac{1}{2\sqrt{x}}" /> (és <M t="y=-\sqrt{x}" /> esetén <M t="-\dfrac{1}{2\sqrt{x}}" />)!
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Mi az <M t="\dfrac{x^2}{9}+\dfrac{y^2}{4}=1" /> ellipszis meredeksége a <M t="\left(0;\,2\right)" /> és a <M t="\left(\frac{3}{\sqrt{2}};\,\frac{2}{\sqrt{2}}\right)" /> pontban?
            </>
          }
        >
          <p>
            Deriválva: <M t="\dfrac{2x}{9}+\dfrac{2y}{4}y'=0 \Rightarrow y'=-\dfrac{4x}{9y}" />.
          </p>
          <p>
            <M t="(0;\,2)" />-ben <M t="y'=0" /> (vízszintes); <M t="\left(\frac{3}{\sqrt{2}};\,\frac{2}{\sqrt{2}}\right)" />-ben <M t="y'=-\dfrac{4\cdot 3}{9\cdot 2}=-\dfrac{2}{3}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Az implicit deriválás 3 lépése',
    body: (
      <>
        <p>
          Minden implicit deriválási feladat pontosan ugyanazt a 3 lépéses sémát követi:
        </p>
        <ImplicitStepsDiagram />
        <h3>Részletes mintapélda (láncszabály + szorzatszabály együtt)</h3>
        <p>
          Határozzuk meg <M t="\dfrac{dy}{dx}" />-et az <M t="y^2 = x^2 + \sin(xy)" /> egyenletből!
        </p>
        <ol>
          <li>
            <strong>Deriválás <M t="x" /> szerint:</strong>
            <M block t="2y\frac{dy}{dx} = 2x + \cos(xy)\cdot\left(1\cdot y + x\frac{dy}{dx}\right) = 2x + y\cos(xy) + x\cos(xy)\frac{dy}{dx}." />
          </li>
          <li>
            <strong>Az <M t="y'" />-s tagok balra rendezése:</strong>
            <M block t="2y\frac{dy}{dx} - x\cos(xy)\frac{dy}{dx} = 2x + y\cos(xy)." />
          </li>
          <li>
            <strong>Kiemelés és osztás:</strong>
            <M block t="\frac{dy}{dx} = \frac{2x + y\cos(xy)}{2y - x\cos(xy)}." />
          </li>
        </ol>
        <p>
          Figyeld meg: az eredményben <M t="x" /> és <M t="y" /> is szerepel — ez teljesen természetes! Ha egy konkrét <M t="(x_0;\,y_0)" /> pontban keresed a meredekséget, mindkét koordinátát behelyettesíted.
        </p>
        <Steps
          source="Analízis-labor"
          title="Elforgatott ellipszis meredeksége egy adott pontban"
          problem={
            <>
              Határozzuk meg az <M t="x^2 + xy + y^2 = 7" /> görbe érintőjének meredekségét az <M t="(1;\,2)" /> pontban!
            </>
          }
          steps={[
            {
              title: 'Pont ellenőrzése',
              body: (
                <p>
                  <M t="1^2 + 1\cdot 2 + 2^2 = 1 + 2 + 4 = 7" />, tehát az <M t="(1;\,2)" /> pont rajta van a görbén.
                </p>
              ),
            },
            {
              title: 'Implicit deriválás x szerint',
              body: (
                <>
                  <p>A középső <M t="xy" /> tagra szorzatszabályt alkalmazunk:</p>
                  <M block t="2x + (1\cdot y + xy') + 2yy' = 0." />
                </>
              ),
            },
            {
              title: 'Rendezés y′-re',
              body: (
                <p>
                  <M t="y'(x + 2y) = -(2x + y) \implies y' = -\dfrac{2x + y}{x + 2y}" />.
                </p>
              ),
            },
            {
              title: 'Behelyettesítés az (1; 2) pontban',
              body: (
                <p>
                  <M t="m = -\dfrac{2(1) + 2}{1 + 2(2)} = -\dfrac{4}{5}" />.
                </p>
              ),
            },
          ]}
        />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Határozd meg <M t="y'" />-t, ha <M t="2xy + y^2 = x + y" />!
            </>
          }
        >
          <p>
            Deriválva: <M t="2(y+xy')+2yy'=1+y' \Rightarrow (2x+2y-1)y'=1-2y \Rightarrow y'=\dfrac{1-2y}{2x+2y-1}" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Határozd meg <M t="y'" />-t, ha <M t="x^3 - xy + y^3 = 1" />!
            </>
          }
        >
          <p>
            <M t="3x^2 - (y+xy') + 3y^2y' = 0 \Rightarrow (3y^2-x)y'=y-3x^2 \Rightarrow y'=\dfrac{y-3x^2}{3y^2-x}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Érintő, normális és a Descartes-féle levél',
    body: (
      <>
        <p>
          Az optikában egy görbe lencsére érkező fénysugár törési szögét mindig a beesési pontbeli <strong>normálishoz</strong> (a felület érintőjére merőleges egyeneshez) mérjük. Az implicit deriválás pontosan ezeket az érintőket és normálisokat adja meg görbe egyenletéből!
        </p>
        <p>
          Vegyük a híres <strong>Descartes-féle levelet</strong>: <M t="x^3+y^3-9xy=0" />! A <M t="(2;\,4)" /> pont rajta van (<M t="8+64-72=0" />). Deriváljuk implicit módon:
        </p>
        <M block t="3x^2 + 3y^2 y' - 9(y + xy') = 0 \;\Longrightarrow\; (3y^2 - 9x)y' = 9y - 3x^2 \;\Longrightarrow\; y' = \frac{3y - x^2}{y^2 - 3x}." />
        <p>
          A <M t="(2;\,4)" /> pontban <M t="m=\dfrac{12-4}{16-6}=\dfrac{8}{10}=\dfrac{4}{5}" />. Innen az érintő <M t="y=4+\frac{4}{5}(x-2)" />, a rá merőleges normális pedig <M t="y=4-\frac{5}{4}(x-2)" />!
        </p>
        <FoliumWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              A Descartes-féle levélen (<M t="y'=\dfrac{3y-x^2}{y^2-3x}" />) mennyi a meredekség a <M t="(4;\,2)" /> pontban? Miért a <M t="(2;\,4)" />-beli meredekség reciproka?
            </>
          }
        >
          <p>
            <M t="m=\dfrac{6-16}{4-12}=\dfrac{-10}{-8}=\dfrac{5}{4}" /> — mert az <M t="x^3+y^3=9xy" /> egyenlet szimmetrikus az <M t="y=x" /> egyenesre!
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Ellenőrizd, hogy <M t="(-1;\,3)" /> rajta van az <M t="x^2y^2=9" /> görbén, és írd fel az ottani érintő egyenletét!
            </>
          }
        >
          <p>
            <M t="(-1)^2\cdot 3^2=9" /> (rajta van). Deriválva: <M t="2xy^2+2x^2yy'=0 \Rightarrow y'=-\dfrac{y}{x}" />.
          </p>
          <p>
            A <M t="(-1;\,3)" /> pontban <M t="m=3" />, az érintő: <M t="y=3+3(x+1)=3x+6" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Második derivált implicit deriválással',
    body: (
      <>
        <p>
          Implicit egyenletből a <M t="\dfrac{d^2y}{dx^2}" /> második deriváltat is kiszámíthatjuk — egyetlen extra lépésre kell figyelni: amikor <M t="y'" />-t újra deriválod <M t="x" /> szerint, <strong>ismét megjelenik benne <M t="y'" /></strong>, amelynek a helyére <strong>vissza kell helyettesíteni</strong> az első lépésben kapott kifejezést!
        </p>
        <ImplicitSecondWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Határozd meg <M t="y''" /> értékét a <M t="(2;\,2)" /> pontban, ha <M t="x^3+y^3=16" />!
            </>
          }
        >
          <p>
            1. <M t="3x^2+3y^2y'=0 \Rightarrow y'=-\dfrac{x^2}{y^2}" />. A <M t="(2;\,2)" /> pontban <M t="y'=-1" />.
          </p>
          <p>
            2. <M t="y''=-\dfrac{y^2(2x)-x^2(2yy')}{y^4}" />. Behelyettesítve <M t="x=2, y=2, y'=-1" />-et: <M t="y''=-\dfrac{4\cdot 4 - 4\cdot 4(-1)}{16}=-\dfrac{32}{16}=-2" />!
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Számítsd ki <M t="y''" /> értékét a <M t="(0;\,1)" /> pontban, ha <M t="xy+y^2=1" />!
            </>
          }
        >
          <p>
            1. <M t="y+xy'+2yy'=0 \Rightarrow y'=-\dfrac{y}{x+2y}" />. A <M t="(0;\,1)" /> pontban <M t="y'=-\dfrac{1}{2}" />.
          </p>
          <p>
            2. Az <M t="y+xy'+2yy'=0" /> egyenletet közvetlenül újra deriválva (gyorsabb!): <M t="2y'+xy''+2(y')^2+2yy''=0" />. Behelyettesítve <M t="x=0, y=1, y'=-1/2" />-et: <M t="-1 + 0 + \dfrac{1}{2} + 2y'' = 0 \Rightarrow y''=\dfrac{1}{4}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'A hatványszabály racionális kitevőkre!',
    body: (
      <>
        <p>
          Eddig a hatványszabályt (<M t="(x^n)'=nx^{n-1}" />) csak <em>egész</em> kitevőkre igazoltuk. Az implicit deriválással most 3 sorban kiterjesztjük <strong>minden racionális (tört) kitevőre</strong> is!
        </p>
        <p>
          Legyen <M t="y=x^{p/q}" /> (ahol <M t="p, q\in\mathbb{Z},\; q>0" />). Emeljük mindkét oldalt <M t="q" />-adik hatványra: <M t="y^q = x^p" />. Most már mindkét kitevő egész — deriváljuk implicit módon:
        </p>
        <M block t="q y^{q-1}\frac{dy}{dx} = p x^{p-1} \;\Longrightarrow\; \frac{dy}{dx} = \frac{p}{q}\frac{x^{p-1}}{\big(x^{p/q}\big)^{q-1}} = \frac{p}{q} x^{(p-1) - (p - p/q)} = \frac{p}{q} x^{\frac{p}{q}-1}." />
        <Def title="Hatványszabály racionális kitevőkre">
          <p>
            Tetszőleges <M t="p/q" /> racionális számra (ahol mindkét oldal értelmezve van):
          </p>
          <M block t="\frac{d}{dx}\left(x^{p/q}\right) = \frac{p}{q} x^{(p/q)-1}, \qquad\text{láncszabállyal:}\qquad \frac{d}{dx}\left(u^{p/q}\right) = \frac{p}{q} u^{(p/q)-1}\frac{du}{dx}." />
        </Def>
        <p>
          <em>Figyelj az értelmezési tartományra!</em> Ha <M t="\frac{p}{q}<1" />, a deriváltban negatív kitevő jelenik meg, ezért ahol <M t="u=0" />, ott a derivált már nincs értelmezve!
        </p>
        <RationalPowerWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Deriváld: (a) <M t="y=x^{9/4}" />, (b) <M t="y=x^{-3/5}" />, (c) <M t="y=\sqrt[3]{2x}" />!
            </>
          }
        >
          <p>
            (a) <M t="\dfrac{9}{4}x^{5/4}" />. (b) <M t="-\dfrac{3}{5}x^{-8/5}" />. (c) <M t="(2x)^{1/3} \Rightarrow \dfrac{1}{3}(2x)^{-2/3}\cdot 2 = \dfrac{2}{3(2x)^{2/3}}" />.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Deriváld: <M t="y=(1-6x)^{2/3}" />! Hol nem értelmezett a derivált?
            </>
          }
        >
          <p>
            <M t="y'=\dfrac{2}{3}(1-6x)^{-1/3}\cdot(-6)=\dfrac{-4}{(1-6x)^{1/3}}" />. Az <M t="x=\dfrac{1}{6}" /> helyen nincs értelmezve (ott hegyes tüske van).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás és a 4 legnagyobb buktató',
    body: (
      <>
        <table className="tbl">
          <thead>
            <tr>
              <th>módszer</th>
              <th>lényeg</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Implicit 1. derivált</td>
              <td>Deriválj <M t="x" /> szerint (<M t="y" />-nál <M t="\cdot y'" />!), gyűjtsd egy oldalra <M t="y'" />-t, oszd le!</td>
            </tr>
            <tr>
              <td>Implicit 2. derivált</td>
              <td>Deriváld újra <M t="x" /> szerint, majd <strong>helyettesítsd vissza</strong> <M t="y'" />-t!</td>
            </tr>
            <tr>
              <td>Racionális hatvány</td>
              <td><M t="(u^{p/q})' = \frac{p}{q}u^{p/q-1}u'" /> (vigyázz <M t="u=0" />-ra, ha <M t="p/q<1" />!)</td>
            </tr>
          </tbody>
        </table>
        <h3>Négy klasszikus hiba</h3>
        <Warn>
          <p>
            <strong>1. Az <M t="y'" /> szorzó elfelejtése:</strong> <M t="\dfrac{d}{dx}(y^3) = 3y^2 y'" />, NEM <M t="3y^2" />!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. A szorzatszabály elfelejtése <M t="xy" />-nál:</strong> <M t="\dfrac{d}{dx}(xy) = y + xy'" />, mert <M t="x" /> és <M t="y" /> két függvény szorzata!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. A jobb oldali konstans ottfelejtése:</strong> <M t="x^2+y^2=25" /> deriváltja <M t="2x+2yy'=0" />, NEM <M t="2x+2yy'=25" />!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. <M t="y'" /> bennehagyása <M t="y''" />-ben:</strong> mindig helyettesítsd vissza az első lépésből kapott <M t="y'" /> kifejezést (vagy számértéket)!
          </p>
        </Warn>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Lépcsőzetes gyakorlófeladatok (könnyűtől a haladóig)',
    body: (
      <>
        <p>
          Oldd meg az alábbi 9 feladatot növekvő nehézségi sorrendben!
        </p>

        <h3>Könnyebb (alapozó) feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Deriváld: <M t="y=(2x+5)^{-1/2}" />!
            </>
          }
        >
          <p>
            <M t="y'=-\dfrac{1}{2}(2x+5)^{-3/2}\cdot 2 = -\dfrac{1}{(2x+5)^{3/2}}" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Deriváld szorzatszabállyal: <M t="y=x(x^2+1)^{1/2}" />!
            </>
          }
        >
          <p>
            <M t="y'=1\cdot(x^2+1)^{1/2} + x\cdot\dfrac{1}{2}(x^2+1)^{-1/2}\cdot 2x = \sqrt{x^2+1}+\dfrac{x^2}{\sqrt{x^2+1}}=\dfrac{2x^2+1}{\sqrt{x^2+1}}" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Határozd meg <M t="y'" />-t implicit deriválással: <M t="x^2y + xy^2 = 6" />!
            </>
          }
        >
          <p>
            <M t="(2xy+x^2y')+(y^2+2xyy')=0 \Rightarrow y'=-\dfrac{2xy+y^2}{x^2+2xy}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Írd fel az <M t="x^2+xy-y^2=1" /> görbe <M t="(2;\,3)" /> pontbeli érintőjének és normálisának egyenletét!
            </>
          }
        >
          <p>
            <M t="2x+y+xy'-2yy'=0 \Rightarrow y'=\dfrac{2x+y}{2y-x}" />. A <M t="(2;\,3)" /> pontban <M t="m=\dfrac{7}{4}" />.
          </p>
          <p>
            Érintő: <M t="y=3+\dfrac{7}{4}(x-2)" />. Normális: <M t="y=3-\dfrac{4}{7}(x-2)" />.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Határozd meg <M t="y'" />-t, ha <M t="x + \sin y = xy" />!
            </>
          }
        >
          <p>
            <M t="1 + (\cos y)y' = y + xy' \Rightarrow (\cos y - x)y' = y - 1 \Rightarrow y'=\dfrac{y-1}{\cos y - x}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Határozd meg <M t="y'" />-t és <M t="y''" />-t implicit deriválással: <M t="y^2 = x^2 + 2x" />!
            </>
          }
        >
          <p>
            <M t="2yy'=2x+2 \Rightarrow y'=\dfrac{x+1}{y}" />.
          </p>
          <p>
            <M t="y''=\dfrac{y\cdot 1 - (x+1)y'}{y^2}=\dfrac{y^2-(x+1)^2}{y^3}=\dfrac{(x^2+2x)-(x^2+2x+1)}{y^3}=-\dfrac{1}{y^3}" />!
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              <em>Dioklész-féle cisszois:</em> írd fel az <M t="y^2(2-x)=x^3" /> görbe <M t="(1;\,1)" /> pontbeli érintőjének és normálisának egyenletét!
            </>
          }
        >
          <p>
            <M t="2yy'(2-x) + y^2(-1) = 3x^2 \Rightarrow 2yy'(2-x)=3x^2+y^2" />.
          </p>
          <p>
            A <M t="(1;\,1)" /> pontban <M t="2(1)y'(1)=3+1=4 \Rightarrow m=2" />. Érintő: <M t="y=2x-1" />, normális: <M t="y=-\dfrac{1}{2}x+\dfrac{3}{2}" />.
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Keresd meg az <M t="x^2+xy+y^2=7" /> elforgatott ellipszis azon pontjait, ahol az érintő <strong>párhuzamos az <M t="x" />-tengellyel</strong>!
            </>
          }
        >
          <p>
            <M t="2x+y+xy'+2yy'=0 \Rightarrow y'=-\dfrac{2x+y}{x+2y}" />. Vízszintes érintő: <M t="2x+y=0 \iff y=-2x" />.
          </p>
          <p>
            Behelyettesítve az egyenletbe: <M t="x^2+x(-2x)+4x^2=7 \iff 3x^2=7 \iff x=\pm\sqrt{\dfrac{7}{3}}" />, a pontok <M t="\left(\sqrt{\frac{7}{3}};\,-2\sqrt{\frac{7}{3}}\right)" /> és <M t="\left(-\sqrt{\frac{7}{3}};\,2\sqrt{\frac{7}{3}}\right)" />.
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              <em>Asztroid:</em> határozd meg az <M t="x^{2/3}+y^{2/3}=1" /> görbe <M t="y'" /> és <M t="y''" /> deriváltját!
            </>
          }
        >
          <p>
            <M t="\dfrac{2}{3}x^{-1/3}+\dfrac{2}{3}y^{-1/3}y'=0 \Rightarrow y'=-\left(\dfrac{y}{x}\right)^{1/3}=-y^{1/3}x^{-1/3}" />.
          </p>
          <p>
            Újra deriválva: <M t="y''=-\left(\dfrac{1}{3}y^{-2/3}y'x^{-1/3}-\dfrac{1}{3}y^{1/3}x^{-4/3}\right)=\dfrac{1}{3}x^{-4/3}y^{-1/3}\left(x^{2/3}+y^{2/3}\right)=\dfrac{1}{3 x^{4/3} y^{1/3}}" />!
          </p>
        </Task>
      </>
    ),
  },
];
