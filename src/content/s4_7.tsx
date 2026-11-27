import { M } from '../components/M';
import { Def, Quiz, Story, Task, Warn } from '../components/ui';
import {
  ConvergenceRaceWidget,
  CosEqualsXWidget,
  NewtonChecklistDiagram,
  NewtonFailWidget,
  NewtonStepWidget,
} from '../components/Widgets47';
import type { Page } from './s1_1';

export const S4_7: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Gyökkeresés érintőkkel: a Newton–Raphson-módszer',
    body: (
      <>
        <Story>
          <p>
            A másodfokú egyenletet mindenki megoldja a megoldóképlettel. De mi a helyzet az <M t="x^5 - x - 1 = 0" /> vagy a <M t="\cos x = x" /> egyenlettel? Az algebra egyik leghíresebb tétele (Abel–Ruffini) szerint ötödfoktól felfelé <strong>nincs általános gyökképlet</strong>! A számológépek és mérnöki szoftverek mégis ezredmásodperc alatt megadják a gyököt 15 tizedesjegy pontossággal — mégpedig a <strong>Newton-módszerrel</strong>!
          </p>
        </Story>
        <p>
          <strong>Az ötlet zseniálisan egyszerű (és a 3.8-as linearizációból jön!):</strong> válassz egy kezdeti <M t="x_0" /> tippet a gyök közelében. A görbe helyett húzd meg az <M t="(x_0;\,f(x_0))" /> pontbeli <strong>érintőegyenest</strong>:
        </p>
        <M block t="y = f(x_0) + f'(x_0)(x - x_0)." />
        <p>
          Hol metszi ez az egyenes az <M t="x" />-tengelyt (<M t="y=0" />)? Oldjuk meg <M t="x" />-re (<M t="f'(x_0)\ne 0" />):
        </p>
        <M block t="0 = f(x_0) + f'(x_0)(x_1 - x_0) \;\Longrightarrow\; x_1 = x_0 - \frac{f(x_0)}{f'(x_0)}." />
        <p>
          Ezt az új, sokkal jobb <M t="x_1" /> közelítést újra bedobjuk a képletbe, és megismételjük!
        </p>
        <Def title="A Newton-módszer iterációs képlete">
          <p>
            Az <M t="f(x)=0" /> egyenlet közelítő gyökéhez egy <M t="x_0" /> kezdőtippből kiindulva a sorozat:
          </p>
          <M block t="x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} \qquad \bigl(f'(x_n) \ne 0\bigr)." />
        </Def>
        <NewtonStepWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Írd fel a Newton-módszer iterációs képletét az <M t="f(x)=x^3 - 2" /> egyenletre, és számítsd ki <M t="x_1" /> és <M t="x_2" /> értékét <M t="x_0=1" /> kezdőtippel!
            </>
          }
        >
          <p>
            <M t="f'(x)=3x^2 \Rightarrow x_{n+1} = x_n - \dfrac{x_n^3-2}{3x_n^2} = \dfrac{2x_n^3+2}{3x_n^2}" />.
          </p>
          <p>
            <M t="x_1 = 1 - \dfrac{-1}{3} = \dfrac{4}{3} \approx 1{,}3333" />; <M t="x_2 = \dfrac{2(64/27)+2}{3(16/9)} = \dfrac{91}{72} \approx 1{,}2639" /> (a pontos <M t="\sqrt[3]{2}\approx 1{,}2599" />!).
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Mi történik, ha <M t="x_0" /> történetesen <em>már pontosan</em> a gyök (<M t="f(x_0)=0" />, <M t="f'(x_0)\ne 0" />)?
            </>
          }
        >
          <p>
            Ekkor <M t="x_1 = x_0 - \dfrac{0}{f'(x_0)} = x_0" />, tehát a sorozat <strong>helyben marad</strong> (fixpont)!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Babiloni gyökvonás és a másodfokú konvergencia csodája',
    body: (
      <>
        <p>
          Alkalmazzuk a Newton-módszert az <M t="f(x) = x^2 - a = 0" /> (<M t="a > 0" />) egyenletre, vagyis <M t="\sqrt{a}" /> kiszámítására! Mivel <M t="f'(x)=2x" />:
        </p>
        <M block t="x_{n+1} = x_n - \frac{x_n^2 - a}{2x_n} = \frac{x_n^2 + a}{2x_n} = \frac{1}{2}\left(x_n + \frac{a}{x_n}\right)!" />
        <p>
          Ez a képlet 4000 éves: már az ókori babilóniaiak is így vontak négyzetgyököt (egyszerűen vették <M t="x_n" /> és <M t="a/x_n" /> számtani közepét!).
        </p>
        <Def title="Miért ennyire őrülten gyors? (Kvadratikus konvergencia)">
          <p>
            Egyszeres gyök (<M t="f'(r)\ne 0" />) közelében a Newton-módszer hibája (<M t="e_n = |x_n - r|" />) minden lépésben körülbelül a <strong>négyzetére</strong> csökken:
          </p>
          <M block t="e_{n+1} \approx \left|\frac{f''(r)}{2f'(r)}\right| e_n^2." />
          <p>
            Ha tehát <M t="e_n \approx 10^{-2}" /> (2 pontos jegy), akkor a következő lépésben <M t="e_{n+1} \approx 10^{-4}" /> (4 jegy), majd <M t="10^{-8}" /> (8 jegy), majd <M t="10^{-16}" /> (16 jegy)! Minden lépés <strong>megduplázza</strong> a pontos tizedesjegyek számát!
          </p>
        </Def>
        <ConvergenceRaceWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Számítsd ki <M t="\sqrt{5}" /> értékét 2 Newton-lépéssel <M t="x_0 = 2" /> kezdőtippel! Hány tizedesjegyre pontos már <M t="x_2" />?
            </>
          }
        >
          <p>
            <M t="x_1 = \dfrac{1}{2}\left(2 + \dfrac{5}{2}\right) = 2{,}25" />.
          </p>
          <p>
            <M t="x_2 = \dfrac{1}{2}\left(2{,}25 + \dfrac{5}{2{,}25}\right) = \dfrac{161}{72} \approx 2{,}23611" /> (a pontos <M t="\sqrt{5}\approx 2{,}23607" /> → már 4 jegyre pontos!).
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Írd fel a reciprok-számító Newton-képletet (osztás nélkül!): oldd meg az <M t="f(x) = \dfrac{1}{x} - a = 0" /> egyenletet (<M t="a>0" />)!
            </>
          }
        >
          <p>
            <M t="f'(x) = -\dfrac{1}{x^2}" />, így <M t="x_{n+1} = x_n - \dfrac{1/x_n - a}{-1/x_n^2} = x_n + x_n - a x_n^2 = \mathbf{x_n(2 - a x_n)}" />! (Így számoltak osztást a korai szuperszámítógépek — kizárólag szorzással és kivonással!)
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Transzcendens egyenletek és görbék metszéspontja',
    body: (
      <>
        <p>
          Ha két görbe metszéspontját keressük (<M t="g(x) = h(x)" />), például <M t="\cos x = x" />, először mindig <strong>0-ra rendezzük</strong> az egyenletet:
        </p>
        <M block t="f(x) = \cos x - x = 0 \;\Longrightarrow\; f'(x) = -\sin x - 1." />
        <p>
          Ekkor a Newton-formula (szigorúan <strong>radiánban</strong>!):
        </p>
        <M block t="x_{n+1} = x_n - \frac{\cos x_n - x_n}{-\sin x_n - 1} = x_n + \frac{\cos x_n - x_n}{\sin x_n + 1}." />
        <CosEqualsXWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Írd fel a Newton-formulát a <M t="\sin x = \dfrac{x}{2}" /> egyenlet pozitív gyökének megkereséséhez!
            </>
          }
        >
          <p>
            Rendezzük 0-ra: <M t="f(x) = \sin x - \dfrac{x}{2}" />, <M t="f'(x) = \cos x - \dfrac{1}{2}" />.
          </p>
          <p>
            A képlet: <M t="x_{n+1} = x_n - \dfrac{\sin x_n - x_n/2}{\cos x_n - 1/2}" /> (pl. <M t="x_0=2" /> kezdőtippből gyorsan <M t="1{,}89549" />-hez tart!).
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Miért hibás az <M t="x_0 = \dfrac{\pi}{3}" /> kezdőtipp az 5. feladatban (<M t="f(x)=\sin x - x/2" />)?
            </>
          }
        >
          <p>
            Mert <M t="f'(\pi/3) = \cos(\pi/3) - \dfrac{1}{2} = \dfrac{1}{2} - \dfrac{1}{2} = \mathbf{0}" />! Az érintő ott vízszintes, így nullával osztanánk!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Mikor vall kudarcot a Newton-módszer? A 4 csapda',
    body: (
      <>
        <p>
          A Newton-módszer hihetetlenül gyors, <strong>de nem tévedhetetlen!</strong> Négy jellegzetes módon tud kudarcot vallani vagy lelassulni:
        </p>
        <ol>
          <li><strong>Vízszintes érintő (<M t="f'(x_n)=0" />):</strong> nullával osztanánk, az érintő párhuzamos az <M t="x" />-tengellyel.</li>
          <li><strong>Elrohanás (divergencia):</strong> ha a görbe túl meredek a gyöknél (pl. <M t="f(x)=\sqrt[3]{x}" />), minden lépés távolabb dob a gyöktől!</li>
          <li><strong>Végtelen ciklus:</strong> szerencsétlen kezdőtippel két (vagy több) pont között örökre pingpongozhat (<M t="x^3-2x+2" />, <M t="x_0=0 \leftrightarrow 1" />).</li>
          <li><strong>Lassulás többszörös gyöknél:</strong> ha <M t="f(r)=0" /> ÉS <M t="f'(r)=0" /> (pl. <M t="x^2=0" />), elveszik a kvadratikus sebesség, és csak lassan, lineárisan közelít!</li>
        </ol>
        <NewtonFailWidget />
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Mikor akad el azonnal a Newton-módszer egy <M t="x_n" /> lépésnél?
            </>
          }
          options={[
            { label: <>Ha <M t="f'(x_n) = 0" /> (vízszintes az érintő)</>, ok: true },
            { label: <>Ha <M t="f(x_n) > 0" /></> },
            { label: <>Ha <M t="x_n < 0" /></> },
            { label: <>Ha <M t="f''(x_n) > 0" /></> },
          ]}
          explain={
            <>
              Vízszintes érintő nem metszi az <M t="x" />-tengelyt, és a Newton-képletben nullával való osztás lépne fel.
            </>
          }
        />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Igazold számolással, hogy az <M t="f(x)=x^3 - 2x + 2" /> egyenletnél <M t="x_0 = 0" /> esetén tényleg <M t="x_1 = 1" /> és <M t="x_2 = 0" />!
            </>
          }
        >
          <p>
            <M t="f'(x)=3x^2-2" />. <M t="x_0=0" />: <M t="x_1 = 0 - \dfrac{2}{-2} = 1" />.
          </p>
          <p>
            <M t="x_1=1" />: <M t="x_2 = 1 - \dfrac{1-2+2}{3-2} = 1 - \dfrac{1}{1} = 0" /> → végtelen <M t="0 \leftrightarrow 1" /> ciklus!
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Igazold, hogy <M t="f(x)=x^2" /> esetén a Newton-módszer mindig pontosan felezi az <M t="x_n" /> értéket!
            </>
          }
        >
          <p>
            <M t="x_{n+1} = x_n - \dfrac{x_n^2}{2x_n} = x_n - \dfrac{x_n}{2} = \dfrac{x_n}{2}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Kezdőtipp választása és biztonságos alkalmazás',
    body: (
      <>
        <p>
          Hogyan kerülheted el a 4 csapdát a gyakorlatban? Kövesd ezt az 5 lépéses ellenőrzőlistát:
        </p>
        <NewtonChecklistDiagram />
        <ul>
          <li><strong>Jó kezdőtipp (<M t="x_0" />):</strong> keress két közeli egész számot (<M t="a, b" />), ahol <M t="f(a)" /> és <M t="f(b)" /> ellentétes előjelű (Bolzano-tétel!), és győződj meg róla, hogy <M t="f'(x_0)" /> nem közel nulla!</li>
          <li><strong>Leállási feltétel:</strong> ha 5 tizedesjegy pontosság kell, folytasd addig, amíg <M t="x_n" /> és <M t="x_{n+1}" /> első 6 tizedesjegye megegyezik (és ellenőrizd, hogy <M t="|f(x_{n+1})| \approx 0" />)!</li>
          <li><strong>Szélsőérték keresése Newton-módszerrel:</strong> egy bonyolult <M t="g(x)" /> függvény lokális szélsőértéke ott van, ahol <M t="g'(x)=0" /> — erre is alkalmazhatod a Newton-módszert <M t="f = g'" /> választással (<M t="x_{n+1} = x_n - g'(x_n)/g''(x_n)" />)!</li>
        </ul>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Keress két szomszédos egész számot, amely közé esik az <M t="x^3 + x - 1 = 0" /> egyenlet valós gyöke, és válassz jó <M t="x_0" /> kezdőtippet!
            </>
          }
        >
          <p>
            <M t="f(0)=-1 < 0" /> és <M t="f(1)=1 > 0" /> → a gyök <M t="(0;\,1)" />-ben van! Mivel <M t="f'(x)=3x^2+1 \ge 1" /> sehol nem nulla, pl. <M t="x_0=0{,}5" /> vagy <M t="x_0=1" /> is kiváló!
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Számítsd ki a 9. feladatban (<M t="x^3+x-1=0" />) <M t="x_1" />-et <M t="x_0=1" /> kezdőtippből!
            </>
          }
        >
          <p>
            <M t="x_1 = 1 - \dfrac{1+1-1}{3+1} = 1 - \dfrac{1}{4} = 0{,}75" /> (a pontos gyök <M t="\approx 0{,}6823" />).
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
              <th>elem</th>
              <th>képlet / szabály</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Newton-formula</td>
              <td><M t="x_{n+1} = x_n - \dfrac{f(x_n)}{f'(x_n)}" /></td>
            </tr>
            <tr>
              <td>Babiloni gyökvonás (<M t="\sqrt{a}" />)</td>
              <td><M t="x_{n+1} = \dfrac{1}{2}\left(x_n + \dfrac{a}{x_n}\right)" /></td>
            </tr>
            <tr>
              <td>Konvergencia sebessége</td>
              <td>Egyszeres gyöknél <strong>kvadratikus</strong> (jegyek száma duplázódik!)</td>
            </tr>
            <tr>
              <td>Metszéspont (<M t="g=h" />)</td>
              <td>Rendezd <M t="f(x)=g(x)-h(x)=0" /> alakra!</td>
            </tr>
          </tbody>
        </table>
        <h3>Négy klasszikus hiba</h3>
        <Warn>
          <p>
            <strong>1. A mínuszjel vagy a hányados felcserélése:</strong> a képlet <M t="x_n \mathbf{-} \dfrac{f(x_n)}{f'(x_n)}" /> (NEM <M t="+" />, és a számlálóban van <M t="f" />, a nevezőben <M t="f'" />!).
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. Számológép FOK (DEG) módban:</strong> trigonometrikus egyenleteknél (<M t="\cos x = x" />) <strong>kizárólag radián (RAD)</strong> módban szabad számolni!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Rossz kezdőtipp (<M t="f'(x_0)\approx 0" />):</strong> lokális szélsőérték közeléből indulva a tangens majdnem vízszintes, ezért a következő pont nagyon messzire repülhet!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Korai kerekítés közben:</strong> az iteráció közbeni <M t="x_n" /> értékeket mindig legalább 2–3 jeggyel pontosabban tárold, mint a végső elvárt pontosság!
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
              Számítsd ki <M t="x_1" /> és <M t="x_2" /> értékét az <M t="f(x)=x^2 - 3 = 0" /> egyenletre <M t="x_0 = 2" /> kezdőtippből!
            </>
          }
        >
          <p>
            <M t="x_1 = \dfrac{1}{2}\left(2 + \dfrac{3}{2}\right) = 1{,}75" />; <M t="x_2 = \dfrac{1}{2}\left(1{,}75 + \dfrac{3}{1{,}75}\right) = \dfrac{97}{56} \approx 1{,}73214" /> (pontos <M t="\sqrt{3}\approx 1{,}73205" />!).
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Írd fel a Newton-képletet az <M t="f(x)=x^3 - 3x - 1 = 0" /> egyenletre, és számítsd ki <M t="x_1" />-et <M t="x_0 = 2" /> kezdőtippel!
            </>
          }
        >
          <p>
            <M t="f'(x)=3x^2-3" />. <M t="x_1 = 2 - \dfrac{8-6-1}{12-3} = 2 - \dfrac{1}{9} = \dfrac{17}{9} \approx 1{,}8889" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Mi történik az <M t="f(x)=x^2 - 4x + 3 = 0" /> egyenletnél, ha <M t="x_0 = 2" /> kezdőtippet választasz?
            </>
          }
        >
          <p>
            <M t="f'(x)=2x-4 \Rightarrow f'(2)=0" />! A módszer <strong>azonnal elakad</strong> (vízszintes érintő, nullával osztás).
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Írd fel a Newton-formulát <M t="\sqrt[k]{a}" /> (<M t="a>0" />, <M t="k \ge 2" /> egész) kiszámítására az <M t="f(x)=x^k - a = 0" /> egyenletből!
            </>
          }
        >
          <p>
            <M t="x_{n+1} = x_n - \dfrac{x_n^k - a}{k x_n^{k-1}} = \dfrac{1}{k}\left((k-1)x_n + \dfrac{a}{x_n^{k-1}}\right)" />!
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Az <M t="x^3 - x - 1 = 0" /> egyenlet gyöke <M t="[1;\,2]" />-be esik. Számítsd ki <M t="x_1" /> és <M t="x_2" /> értékét <M t="x_0 = 1" /> kezdőtippel!
            </>
          }
        >
          <p>
            <M t="f'(x)=3x^2-1" />. <M t="x_1 = 1 - \dfrac{-1}{2} = 1{,}5" />.
          </p>
          <p>
            <M t="x_2 = 1{,}5 - \dfrac{3{,}375 - 1{,}5 - 1}{6{,}75 - 1} = 1{,}5 - \dfrac{0{,}875}{5{,}75} \approx 1{,}3478" /> (pontos gyök: <M t="\approx 1{,}3247" />).
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              A <M t="\operatorname{tg} x = x" /> egyenlet legkisebb pozitív gyöke <M t="4{,}5" /> körül van. Írd fel a Newton-formulát erre az egyenletre!
            </>
          }
        >
          <p>
            <M t="f(x)=\operatorname{tg} x - x" />, <M t="f'(x)=\sec^2 x - 1 = \operatorname{tg}^2 x" />!
          </p>
          <p>
            Így különösen szép: <M t="x_{n+1} = x_n - \dfrac{\operatorname{tg} x_n - x_n}{\operatorname{tg}^2 x_n}" />!
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              Mutasd meg, hogy ha <M t="f(x)=x^{1/3}" />, akkor bármely <M t="x_0 \ne 0" /> kezdőtippből <M t="x_n = (-2)^n x_0" />, tehát a Newton-módszer <em>soha</em> nem konvergál!
            </>
          }
        >
          <p>
            <M t="f'(x)=\dfrac{1}{3}x^{-2/3} \Rightarrow x_{n+1} = x_n - \dfrac{x_n^{1/3}}{\frac{1}{3}x_n^{-2/3}} = x_n - 3x_n = -2x_n" />. Teljes indukcióval <M t="x_n = (-2)^n x_0" />, amelynek abszolút értéke <M t="\infty" />-be tart!
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Becsüld meg <M t="1" /> Newton-lépéssel a <M t="g(x)=x^4 + x^2 - 4x" /> függvény minimumhelyét <M t="x_0 = 1" /> kezdőtippből!
            </>
          }
        >
          <p>
            A minimumhelyen <M t="f(x)=g'(x)=4x^3+2x-4=0" />, ennek deriváltja <M t="f'(x)=g''(x)=12x^2+2" />.
          </p>
          <p>
            <M t="x_1 = 1 - \dfrac{4+2-4}{12+2} = 1 - \dfrac{2}{14} = \dfrac{6}{7} \approx 0{,}8571" /> (a pontos minimumhely <M t="\approx 0{,}8477" />!).
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Ha egy egyszeres gyök közelében a Newton-módszer hibája az 1. lépésben <M t="e_1 = 0{,}01" /> (és <M t="C \approx 1" />), körülbelül hány lépés kell még ahhoz, hogy a hiba <M t="10^{-12}" /> alá csökkenjen?
            </>
          }
        >
          <p>
            Kvadratikus konvergenciával (<M t="e_{n+1}\approx e_n^2" />): <M t="e_1 = 10^{-2} \to e_2 \approx 10^{-4} \to e_3 \approx 10^{-8} \to e_4 \approx 10^{-16} < 10^{-12}" />! Mindössze <strong>3 további lépés</strong>!
          </p>
        </Task>
      </>
    ),
  },
];
