import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  EscapeVelocityDiagram,
  ExpVsLogisticWidget,
  IceGlidingWidget,
  LoanPayoffWidget,
  LogisticSolveDiagram,
  OrthogonalFamilyWidget,
  OrthogonalStepsDiagram,
  Volume2SummaryDiagram,
} from '../components/Widgets95';
import type { Page } from './s1_1';

export const S9_5: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Mozgás ellenálló közegben: siklás a jégen (Thomas 1. példa)',
    body: (
      <>
        <Story>
          <p>
            Elérkeztünk a <strong>9. fejezet</strong> — és egyben az egész <strong>II. kötet</strong> — zárószakaszához!
            Itt minden eddig tanult differenciálegyenlet-módszert (szétválasztás, integráló tényező, fázisegyenes,
            parciális törtek) valódi, látványos fizikai, biológiai, pénzügyi és geometriai modellekre vetünk be!
          </p>
        </Story>

        <p>
          <strong>Thomas 1. példa (Siklás a jégen):</strong> egy <M t="m" /> tömegű korcsolyázó <M t="v_0" />{' '}
          kezdősebességgel siklik a vízszintes jégen, miközben a közegellenállás a sebességével arányosan fékezi:{' '}
          <M t="F = -kv" /> (<M t="k > 0" />). Newton II. törvénye szétválasztható differenciálegyenletet ad:
        </p>
        <M block t="m\frac{dv}{dt} = -kv \;\Longrightarrow\; v(t) = v_0 e^{-(k/m)t}." />
        <p>
          Mekkora utat tesz meg <M t="t" /> idő alatt? Integráljuk a sebességet (<M t="s(0)=0" />):
        </p>
        <M block t="s(t) = \int_0^t v_0 e^{-(k/m)\tau}\,d\tau = \frac{mv_0}{k}\Bigl(1 - e^{-(k/m)t}\Bigr) \;\xrightarrow{t\to\infty}\; \mathbf{s_{\max} = \frac{mv_0}{k}}!" />

        <IceGlidingWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={<>Egy <M t="m=60" /> kg-os korcsolyázó <M t="v_0=6" /> m/s sebességgel indul, és <M t="k=12\;\text{kg/s}" /> fékezőerő hat rá. Mekkora a maximális siklási távolsága?</>}
        >
          <p>
            <M t="s_{\max} = \dfrac{mv_0}{k} = \dfrac{60\cdot 6}{12} = \mathbf{30\text{ m}}" />!
          </p>
        </Task>
        <Task
          n={2}
          q={<>Az 1. feladatban mennyi idő alatt csökken a korcsolyázó sebessége a felére (<M t="3" /> m/s-ra)?</>}
        >
          <p>
            <M t="\frac{k}{m} = \frac{12}{60} = 0{,}2\;\text{s}^{-1}" />, így <M t="e^{-0{,}2t} = \frac{1}{2} \implies t = \dfrac{\ln 2}{0{,}2} = 5\ln 2 \approx \mathbf{3{,}47\text{ s}}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Populációdinamika: miért váltjuk le az exponenciális modellt?',
    body: (
      <>
        <p>
          A 7.5-ben látott exponenciális modell (<M t="P' = kP" />) szerint a <em>relatív növekedési ütem</em>{' '}
          <M t="\frac{1}{P}\frac{dP}{dt} = k" /> állandó — ami korlátlan növekedést jósol. A valóságban azonban
          ahogy nő a népesség, fogynak az erőforrások, így a relatív növekedési ütem lineárisan csökken egy{' '}
          <M t="M" /> <strong>eltartóképesség</strong> felé:
        </p>
        <M block t="\frac{1}{P}\frac{dP}{dt} = r(M - P) \;\Longleftrightarrow\; \frac{dP}{dt} = rP(M - P)." />
        <p>
          <strong>Thomas 2. példa (Medvenépesség egy nemzeti parkban):</strong> egy nemzeti park eltartóképessége{' '}
          <M t="M = 100" /> medve, jelenleg <M t="P(0) = 10" /> medve él ott, és a növekedési paraméter{' '}
          <M t="rM = 0{,}1" /> / év (<M t="r = 0{,}001" />). Ekkor a pontos megoldás:
        </p>
        <M block t="P(t) = \frac{100}{1 + 9e^{-0{,}1t}}." />

        <ExpVsLogisticWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={<>A fenti medvepopuláció (<M t="P(t) = \frac{100}{1+9e^{-0{,}1t}}" />) hány év múlva éri el az <M t="50" /> egyedet (az inflexiós szintet)?</>}
        >
          <p>
            <M t="\dfrac{100}{1+9e^{-0{,}1t}} = 50 \iff 1 + 9e^{-0{,}1t} = 2 \iff e^{-0{,}1t} = \dfrac{1}{9} \implies t = 10\ln 9 \approx \mathbf{22{,}0\text{ év}}" />!
          </p>
        </Task>
        <Task
          n={4}
          q={<>Mennyi lesz a medvék száma 10 év múlva a 3. feladat képletéből?</>}
        >
          <p>
            <M t="P(10) = \dfrac{100}{1 + 9e^{-1}} \approx \dfrac{100}{1 + 3{,}311} \approx \mathbf{23{,}2}" /> (kb. 23 medve).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'A logisztikus egyenlet pontos megoldása (parciális törtekkel!)',
    body: (
      <>
        <p>
          A 9.4-ben már felvázoltuk a logisztikus görbét fázisegyenessel — most a <strong>8.3-as parciális törtekre
          bontással</strong> le is vezetjük az egzakt zárt képletet!
        </p>
        <LogisticSolveDiagram />
        <p>
          Szétválasztva <M t="\dfrac{dP}{P(M-P)} = r\,dt" />. Parciális törtekre bontással{' '}
          <M t="\dfrac{1}{P(M-P)} = \dfrac{1}{M}\left(\dfrac{1}{P} + \dfrac{1}{M-P}\right)" />, ezért integrálva:
        </p>
        <M block t="\frac{1}{M}\ln\left|\frac{P}{M-P}\right| = rt + C_1 \;\Longrightarrow\; \frac{P}{M-P} = B e^{rMt} \;\Longrightarrow\; \mathbf{P(t) = \frac{M}{1 + A e^{-rMt}}}," />
        <p>
          ahol <M t="A = \dfrac{M - P_0}{P_0}" /> a kezdeti <M t="P(0)=P_0" /> értékből adódik!
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={<>Írd fel a pontos <M t="P(t)" /> megoldást a <M t="\dfrac{dP}{dt} = 0{,}01\,P(200 - P),\; P(0) = 40" /> kezdetiérték-problémára!</>}
        >
          <p>
            <M t="M = 200" />, <M t="rM = 0{,}01\cdot 200 = 2" />, <M t="A = \dfrac{200 - 40}{40} = 4" /> →{' '}
            <M t="\mathbf{P(t) = \dfrac{200}{1 + 4e^{-2t}}}" />!
          </p>
        </Task>
        <Task
          n={6}
          q={<>Igazold a zárt képletből, hogy <M t="\lim_{t\to\infty} P(t) = M" /> bármely <M t="P_0 > 0" /> esetén!</>}
        >
          <p>
            Mivel <M t="rM > 0" />, <M t="e^{-rMt} \to 0" /> ha <M t="t\to\infty" />, így{' '}
            <M t="\lim_{t\to\infty}\dfrac{M}{1 + A\cdot 0} = \mathbf{M}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Pénzügyi modellek (hitel) és szökési sebesség',
    body: (
      <>
        <p>
          <strong>1. Folyamatos hiteltörlesztés (elsőrendű lineáris DE):</strong> ha <M t="y(t)" /> a tartozás,{' '}
          <M t="r" /> az éves kamatláb, és <M t="m" /> az éves törlesztőrészlet:
        </p>
        <M block t="\frac{dy}{dt} = ry - m \;\Longrightarrow\; y(t) = \frac{m}{r} + \left(y_0 - \frac{m}{r}\right)e^{rt}." />
        <LoanPayoffWidget />

        <p>
          <strong>2. Szökési sebesség (láncszabályos trükk):</strong> egy bolygótól távolodó rakéta gyorsulása{' '}
          <M t="\frac{dv}{dt} = -\frac{GM}{r^2}" />. Mivel <M t="\frac{dv}{dt} = \frac{dv}{dr}\frac{dr}{dt} = v\frac{dv}{dr}" />,
          szétválasztható egyenletet kapunk: <M t="v\,dv = -\frac{GM}{r^2}\,dr" />!
        </p>
        <EscapeVelocityDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={<>Ha <M t="y_0 = 10" /> M Ft hitelre <M t="r = 5\%" /> a kamat és <M t="m = 1" /> M Ft/év a törlesztés, hány év alatt fogy el a hitel?</>}
        >
          <p>
            <M t="y(T) = 0 \iff 20 - 10e^{0{,}05T} = 0 \iff e^{0{,}05T} = 2 \implies T = \dfrac{\ln 2}{0{,}05} = 20\ln 2 \approx \mathbf{13{,}86\text{ év}}" />!
          </p>
        </Task>
        <Task
          n={8}
          q={<>Mi történik a szökési sebességgel (<M t="v_{\text{sz}} = \sqrt{2GM/R}" />), ha egy bolygó tömege négyszerese a Földének, de a sugara azonos?</>}
        >
          <p>
            Mivel <M t="\sqrt{4} = 2" />, a szökési sebesség pontosan a <strong>kétszeresére</strong> nő (<M t="\approx 22{,}4\;\text{km/s}" />)!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Ortogonális trajektóriák: a 4 lépéses recept',
    body: (
      <>
        <p>
          A fizikában az elektromos erővonalak minden pontban <strong>merőlegesek</strong> az ekvipotenciális
          görbékre; a meteorológiában a szélirány (súrlódás nélkül) merőleges az izobárokra; a hőtanban a hőáram
          merőleges az izotermákra! Az ilyen, egy adott görbesereget mindenütt derékszögben metsző görbéket{' '}
          <strong>ortogonális trajektóriáknak</strong> nevezzük!
        </p>
        <OrthogonalStepsDiagram />
        <p>
          <strong>Thomas 3. példa:</strong> keressük az <M t="xy = a" /> (<M t="a\ne 0" />) hiperbolasereg ortogonális
          trajektóriáit!
        </p>
        <ol>
          <li>Implicit deriválás: <M t="y + xy' = 0 \implies y' = -\dfrac{y}{x}" /> (az <M t="a" /> paraméter kiesett!).</li>
          <li>Negatív reciprok meredekség: <M t="y' = +\dfrac{x}{y}" />.</li>
          <li>Szétválasztás és integrálás: <M t="y\,dy = x\,dx \implies \dfrac{y^2}{2} = \dfrac{x^2}{2} + C \iff \mathbf{x^2 - y^2 = b}" />!</li>
        </ol>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={<>Határozd meg az <M t="y = ax" /> origón átmenő egyenessereg ortogonális trajektóriáit!</>}
        >
          <p>
            1) <M t="a = y/x \implies y' = y/x" />. 2) Merőleges DE: <M t="y' = -x/y" />.
          </p>
          <p>
            3) <M t="y\,dy = -x\,dx \implies \mathbf{x^2 + y^2 = R^2}" /> (origó középpontú körök!).
          </p>
        </Task>
        <Task
          n={10}
          q={<>Határozd meg az <M t="y = ax^2" /> parabolasereg ortogonális trajektóriáit!</>}
        >
          <p>
            1) <M t="y' = 2ax" />, és <M t="a = y/x^2 \implies y' = \dfrac{2y}{x}" />.
          </p>
          <p>
            2) Merőleges DE: <M t="y' = -\dfrac{x}{2y} \implies 2y\,dy = -x\,dx \implies \mathbf{\dfrac{x^2}{2} + y^2 = b}" /> (ellipszisek!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Ortogonális trajektóriák galériája (vizuális felfedező)',
    body: (
      <>
        <p>
          Nézd meg vizuálisan a három leghíresebb ortogonális görbesereg-párt! Figyeld meg, hogy minden egyes kék–narancs
          metszéspontban valóban pontos derékszög (<M t="90^\circ" />) keletkezik!
        </p>
        <OrthogonalFamilyWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={<>Ellenőrizd az <M t="(2;\,1)" /> pontban, hogy az <M t="xy = 2" /> és az <M t="x^2 - y^2 = 3" /> görbék tényleg merőlegesek-e egymásra!</>}
        >
          <p>
            1) <M t="xy = 2 \implies y' = -y/x = -1/2" />.
          </p>
          <p>
            2) <M t="x^2 - y^2 = 3 \implies 2x - 2yy' = 0 \implies y' = x/y = 2/1 = +2" />. Szorzatuk:{' '}
            <M t="(-\frac{1}{2})\cdot 2 = \mathbf{-1}" /> ✓!
          </p>
        </Task>
        <Task
          n={12}
          q={<>Miért <strong>kötelező</strong> kiejteni az <M t="a" /> paramétert az 1. lépésben, mielőtt negatív reciprokot veszünk?</>}
        >
          <p>
            Mert az <M t="a" /> konstans görbéről görbére változik! Az iránymező egyenletének (<M t="y' = f(x, y)" />)
            csak a pont <M t="(x, y)" /> koordinátáitól szabad függnie, hogy minden metszéspontban a helyes
            merőleges irányt adja!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglalás, a teljes II. kötet lezárása és a 4 buktató',
    body: (
      <>
        <Volume2SummaryDiagram />

        <table className="tbl">
          <thead>
            <tr>
              <th>alkalmazás</th>
              <th>differenciálegyenlet</th>
              <th>fő eredmény</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Siklás / közegellenállás</td>
              <td><M t="mv' = -kv" /></td>
              <td><M t="s_{\max} = mv_0 / k" /> (véges út!)</td>
            </tr>
            <tr>
              <td>Logisztikus növekedés</td>
              <td><M t="P' = rP(M-P)" /></td>
              <td><M t="P(t) = \dfrac{M}{1+Ae^{-rMt}}" /></td>
            </tr>
            <tr>
              <td>Hiteltörlesztés</td>
              <td><M t="y' = ry - m" /></td>
              <td>Csak <M t="m > ry_0" /> esetén fogy el!</td>
            </tr>
            <tr>
              <td>Ortogonális trajektória</td>
              <td><M t="y' = -1 / f(x, y)" /></td>
              <td><M t="a" /> kiejtése → negatív reciprok → megoldás</td>
            </tr>
          </tbody>
        </table>

        <Def title="🎉 Gratulálunk — befejezted a teljes II. kötetet! (v2.0.0)">
          <p>
            Ezzel a szakasszal lezárult a <strong>9. fejezet</strong> és a teljes <strong>II. kötet</strong> (5–9.
            fejezet, 34 / 34 szakasz; összesítve <strong>64 / 120 szakasz, 53,3%</strong>)! Végigjártad az
            integrálszámítást, a térfogat- és munkaszámítást, a transzcendens függvényeket, az integrálási
            technikákat és a differenciálegyenleteket. A <strong>III. kötet</strong> a{' '}
            <strong>10. fejezettel (Kúpszeletek és polárkoordináták)</strong> indul!
          </p>
        </Def>

        <h3>Négy klasszikus buktató</h3>
        <Warn>
          <p>
            <strong>1. Az <M t="a" /> paraméter bennhagyása ortogonális trajektóriánál:</strong> ha{' '}
            <M t="y = ax^2" />-ből csak <M t="y' = 2ax" />-et írsz és <M t="y' = -1/(2ax)" />-et oldasz meg, rossz
            görbesereget kapsz — előbb mindig helyettesítsd be <M t="a = y/x^2" />-et!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. Negatív előjel elhagyása merőlegességnél:</strong> a merőleges meredekség{' '}
            <M t="\mathbf{-}\frac{1}{f(x,y)}" />, nem <M t="+\frac{1}{f(x,y)}" />!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. <M t="r" /> és <M t="rM" /> összekeverése a logisztikus képletben:</strong> a kitevőben{' '}
            <M t="e^{-rMt}" /> szerepel, nem <M t="e^{-rt}" />!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Mértékegységek keverése fizikai modellekben:</strong> ellenőrizd mindig, hogy <M t="t" />{' '}
            másodpercben vagy évben, <M t="v" /> m/s-ban vagy km/h-ban szerepel-e!
          </p>
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={<>Ha a logisztikus egyenlet <M t="P' = 0{,}005\,P(400 - P)" />, mekkora az <M t="e^{-rMt}" /> kitevőjében lévő <M t="rM" /> szorzat?</>}
        >
          <p>
            <M t="rM = 0{,}005 \cdot 400 = \mathbf{2}" />, tehát <M t="e^{-2t}" /> szerepel a nevezőben!
          </p>
        </Task>
        <Task
          n={14}
          q={<>Mi az <M t="y = 2x + a" /> párhuzamos egyenessereg ortogonális trajektóriája?</>}
        >
          <p>
            <M t="y' = 2 \implies" /> merőleges DE: <M t="y' = -\dfrac{1}{2} \implies \mathbf{y = -\dfrac{1}{2}x + b}" />!
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
          q={<>Határozd meg az <M t="y = a e^x" /> görbesereg ortogonális trajektóriáit!</>}
        >
          <p>
            1) <M t="y' = a e^x = y" />. 2) Merőleges DE: <M t="y' = -\dfrac{1}{y}" />.
          </p>
          <p>
            3) <M t="y\,dy = -dx \implies \mathbf{\dfrac{y^2}{2} + x = C}" /> (balra nyíló parabolák!).
          </p>
        </Task>
        <Task
          n={16}
          q={<>Egy csónak motorját leállítják <M t="v_0 = 10" /> m/s sebességnél (<M t="k/m = 0{,}5\;\text{s}^{-1}" />). Mekkora utat tesz meg megállásig?</>}
        >
          <p>
            <M t="s_{\max} = \dfrac{v_0}{k/m} = \dfrac{10}{0{,}5} = \mathbf{20\text{ m}}" />!
          </p>
        </Task>
        <Task
          n={17}
          q={<>Írd fel a <M t="P' = 0{,}02\,P(50 - P),\; P(0) = 25" /> logisztikus feladat pontos megoldását!</>}
        >
          <p>
            <M t="M = 50,\; rM = 1,\; A = \dfrac{50-25}{25} = 1 \implies \mathbf{P(t) = \dfrac{50}{1 + e^{-t}}}" />!
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={<>Határozd meg az <M t="x^2 + 3y^2 = a" /> ellipszissereg ortogonális trajektóriáit!</>}
        >
          <p>
            1) <M t="2x + 6yy' = 0 \implies y' = -\dfrac{x}{3y}" />.
          </p>
          <p>
            2) Merőleges DE: <M t="y' = \dfrac{3y}{x} \implies \dfrac{dy}{y} = \dfrac{3\,dx}{x} \implies \ln|y| = 3\ln|x| + C \implies \mathbf{y = b x^3}" />!
          </p>
        </Task>
        <Task
          n={19}
          q={<>Egy bakteriális tenyészet logisztikusan nő (<M t="M = 1000" />, <M t="P(0) = 100" />). Ha <M t="t = 2" /> óra múlva <M t="P(2) = 500" />, mekkora az <M t="rM" /> paraméter?</>}
        >
          <p>
            <M t="A = \dfrac{1000-100}{100} = 9" />. Mivel <M t="P(2) = \dfrac{1000}{1+9e^{-2rM}} = 500 \iff 9e^{-2rM} = 1 \iff rM = \dfrac{\ln 9}{2} = \mathbf{\ln 3 \approx 1{,}099}" /> / óra!
          </p>
        </Task>
        <Task
          n={20}
          q={<><strong>Kémiai reakció (2. rendű):</strong> <M t="\dfrac{dy}{dt} = k(1 - y)^2,\; y(0) = 0" /> (<M t="k > 0" />). Oldd meg szétválasztással!</>}
        >
          <p>
            <M t="\int (1-y)^{-2}\,dy = \int k\,dt \implies \dfrac{1}{1-y} = kt + C" />. Mivel <M t="y(0)=0 \implies C=1" />, így{' '}
            <M t="\mathbf{y(t) = 1 - \dfrac{1}{1+kt} = \dfrac{kt}{1+kt}}" />!
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={<>Határozd meg az <M t="y^2 = a x^3" /> görbesereg ortogonális trajektóriáit!</>}
        >
          <p>
            1) <M t="2yy' = 3ax^2" />, és <M t="a = y^2/x^3 \implies y' = \dfrac{3y}{2x}" />.
          </p>
          <p>
            2) Merőleges DE: <M t="y' = -\dfrac{2x}{3y} \implies 3y\,dy = -2x\,dx \implies \mathbf{2x^2 + 3y^2 = b}" /> (ellipszisek!).
          </p>
        </Task>
        <Task
          n={22}
          q={<><strong>Ön-ortogonális görbesereg:</strong> igazold, hogy az <M t="y^2 = 4a(x + a)" /> (<M t="a \ne 0" />) fókuszos parabolák serege <em>saját magának</em> az ortogonális trajektóriája!</>}
        >
          <p>
            Deriválva: <M t="2yy' = 4a \implies a = \frac{1}{2}yy'" />. Visszaírva:{' '}
            <M t="y^2 = 2yy'\left(x + \frac{1}{2}yy'\right) \iff y(y')^2 + 2xy' - y = 0" />.
          </p>
          <p>
            Ha <M t="y'" /> helyére <M t="-1/y'" />-t írunk: <M t="y/(y')^2 - 2x/y' - y = 0" /> → beszorozva{' '}
            <M t="-(y')^2" />-tel <strong>pontosan ugyanez az egyenlet</strong> adódik vissza!
          </p>
        </Task>
        <Task
          n={23}
          q={<>Egy <M t="1" /> literes lombikban kezdetben tiszta levegő van (<M t="21\%" /> oxigén, azaz <M t="0{,}21" /> liter <M t="\text{O}_2" />). Percenként <M t="0{,}5" /> liter tiszta (<M t="100\%" />) oxigén áramlik be, és ugyanannyi jól elkevert gáz távozik. Hány perc múlva lesz a lombikban <M t="50\%" /> oxigén?</>}
        >
          <p>
            <M t="\dfrac{dy}{dt} = 0{,}5 - 0{,}5y \implies y(t) = 1 - (1 - 0{,}21)e^{-0{,}5t} = 1 - 0{,}79 e^{-0{,}5t}" />.
          </p>
          <p>
            <M t="y(t) = 0{,}5 \iff 0{,}79 e^{-0{,}5t} = 0{,}5 \implies t = 2\ln\left(\dfrac{0{,}79}{0{,}5}\right) = 2\ln(1{,}58) \approx \mathbf{0{,}915\text{ perc}}" /> (kb. 55 másodperc)!
          </p>
        </Task>
      </>
    ),
  },
];
