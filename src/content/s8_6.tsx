import { M } from '../components/M';
import { Def, Quiz, Story, Task, Warn } from '../components/ui';
import {
  CasComparisonDiagram,
  CasVerificationChecklistDiagram,
  EquivalentPrimitivesWidget,
  IntegrationWorkflowMasterDiagram,
  NonElementaryGalleryWidget,
  ReductionStepSimulatorWidget,
  TableBranchSelectorWidget,
  TablePatternMatchDiagram,
} from '../components/Widgets86';
import type { Page } from './s1_1';

export const S8_6: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Az integráltáblázat mint „szerszámosláda”',
    body: (
      <>
        <Story>
          <p>
            A mérnöki és fizikai gyakorlatban gyakran kerülnek elő olyan alakok, mint{' '}
            <M t="\int \frac{dx}{x\sqrt{ax+b}}" /> vagy <M t="\int x^2\sqrt{a^2+x^2}\,dx" />. Mindegyik
            kiszámolható a 8.1–8.5 módszereivel, de a 20 perces algebrai munka helyett egy megbízható
            integráltáblázat 30 másodperc alatt megadja a szerkezetet — feltéve, hogy felismered a mintát és
            betartod a korlátozó feltételeket.
          </p>
        </Story>

        <Def title="Hogyan épül fel egy integráltáblázat?">
          <p>
            A képleteket az integrandus <strong>domináns szerkezete</strong> szerint csoportosítják (pl.{' '}
            <M t="ax+b" />, <M t="\sqrt{ax+b}" />, <M t="a^2\pm x^2" />, trigonometrikus, inverz,
            exponenciális). Az <M t="a, b, c, m, n" /> paraméterek tetszőleges valós számok lehetnek, kivéve,
            ahol külön <strong>feltétel</strong> tiltja (pl. <M t="n \neq -1" />, <M t="a \neq 0" />,{' '}
            <M t="b > 0" />).
          </p>
        </Def>

        <p>
          <strong>1. példa (paraméter-behelyettesítés és feltétel-ellenőrzés):</strong> Számítsuk ki az{' '}
          <M t="\int x(2x+5)^{-1}\,dx" /> integrált! Mivel a kitevő <M t="n = -1" />, az általános{' '}
          <M t="x(ax+b)^n" /> képlet (amely <M t="n\neq -1" />-et kér) nem használható — helyette a
          speciális <M t="n=-1" /> képletet választjuk:
        </p>
        <M block t="\int x(ax+b)^{-1}\,dx = \frac{x}{a} - \frac{b}{a^2}\ln|ax+b| + C \quad (a\neq 0)." />
        <p>
          Az <M t="a=2,\; b=5" /> behelyettesítéssel azonnal:
        </p>
        <M block t="\int x(2x+5)^{-1}\,dx = \frac{x}{2} - \frac{5}{4}\ln|2x+5| + C." />

        <p>
          <strong>2. és 3. példa (egyetlen előjel, két teljesen más világ):</strong> Hasonlítsuk össze az{' '}
          <M t="\int \frac{dx}{x\sqrt{2x+4}}" /> és az <M t="\int \frac{dx}{x\sqrt{2x-4}}" /> integrálokat!
        </p>
        <M block t="\text{13(b) }(b>0):\quad \int \frac{dx}{x\sqrt{ax+b}} = \frac{1}{\sqrt{b}}\ln\left|\frac{\sqrt{ax+b}-\sqrt{b}}{\sqrt{ax+b}+\sqrt{b}}\right| + C" />
        <M block t="\text{13(a) }(b>0):\quad \int \frac{dx}{x\sqrt{ax-b}} = \frac{2}{\sqrt{b}}\operatorname{arctg}\sqrt{\frac{ax-b}{b}} + C" />
        <p>
          Az elsőnél <M t="a=2,\; b=4" /> adja a <M t="\frac{1}{2}\ln\left|\frac{\sqrt{2x+4}-2}{\sqrt{2x+4}+2}\right|+C" />{' '}
          eredményt, a másodiknál <M t="a=2,\; b=4" /> a 13(a) képletben{' '}
          <M t="\operatorname{arctg}\sqrt{\frac{x-2}{2}}+C" />-t!
        </p>

        <TableBranchSelectorWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={<>A 13(a) vagy a 13(b) képlettel számítsd ki az <M t="\int \frac{dx}{x\sqrt{3x+9}}" /> integrált!</>}
        >
          <p>
            Mivel a gyök alatt <M t="+9" /> áll (<M t="b=9>0" />), a <strong>13(b)</strong> képlet kell{' '}
            <M t="a=3,\; b=9,\; \sqrt{b}=3" /> mellett:{' '}
            <M t="\frac{1}{3}\ln\left|\frac{\sqrt{3x+9}-3}{\sqrt{3x+9}+3}\right|+C" />.
          </p>
        </Task>
        <Task
          n={2}
          q={<>Számítsd ki az <M t="\int \frac{dx}{x\sqrt{5x-16}}" /> integrált táblázattal!</>}
        >
          <p>
            A <M t="-16" /> miatt a <strong>13(a)</strong> képlet kell <M t="a=5,\; b=16,\; \sqrt{b}=4" />{' '}
            mellett: <M t="\frac{2}{4}\operatorname{arctg}\sqrt{\frac{5x-16}{16}}+C = \frac{1}{2}\operatorname{arctg}\frac{\sqrt{5x-16}}{4}+C" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Alakillesztés és rejtett helyettesítések',
    body: (
      <>
        <p>
          Az integráltáblázat használata <em>nem</em> mechanikus másolás: a kulcslépés az{' '}
          <strong>alakillesztés</strong>. Ha az integrandusban <M t="4x^2" />, <M t="e^{2x}" /> vagy{' '}
          <M t="x^2 - 4x + 13" /> szerepel, először átírjuk egy tiszta <M t="u" /> változóra, és közben
          soha nem felejtjük el a <M t="dx \leftrightarrow du" /> szorzótényezőt!
        </p>

        <TablePatternMatchDiagram />

        <p>
          <strong>1. példa (skálázó helyettesítés):</strong> Számítsuk ki az{' '}
          <M t="\int \frac{dx}{\sqrt{9+4x^2}}" /> integrált a <M t="\int \frac{du}{\sqrt{a^2+u^2}} = \ln|u+\sqrt{a^2+u^2}|+C" />{' '}
          táblázati képlettel! Legyen <M t="u = 2x" />, innen <M t="dx = \frac{1}{2}\,du" /> és <M t="a=3" />:
        </p>
        <M block t="\int \frac{dx}{\sqrt{9+4x^2}} = \frac{1}{2}\int \frac{du}{\sqrt{3^2+u^2}} = \frac{1}{2}\ln\left|2x+\sqrt{9+4x^2}\right| + C." />

        <p>
          <strong>2. példa (nemlineáris helyettesítés):</strong> Számítsuk ki az{' '}
          <M t="\int \frac{e^x\,dx}{9 - e^{2x}}" /> integrált! Az <M t="u = e^x,\; du = e^x\,dx" />{' '}
          választással a <M t="\int \frac{du}{a^2-u^2} = \frac{1}{2a}\ln\left|\frac{a+u}{a-u}\right|+C" />{' '}
          képletre jutunk (<M t="a=3" />):
        </p>
        <M block t="\int \frac{e^x\,dx}{9-e^{2x}} = \int \frac{du}{3^2-u^2} = \frac{1}{6}\ln\left|\frac{3+e^x}{3-e^x}\right| + C." />

        <p>
          <strong>3. példa (teljes négyzet + táblázat):</strong> Az <M t="\int \sqrt{x^2+6x+13}\,dx" />{' '}
          integrálban <M t="x^2+6x+13 = (x+3)^2 + 4" />. Az <M t="u=x+3,\; du=dx,\; a=2" /> helyettesítéssel
          a <M t="\int \sqrt{u^2+a^2}\,du = \frac{u}{2}\sqrt{u^2+a^2} + \frac{a^2}{2}\ln|u+\sqrt{u^2+a^2}|+C" />{' '}
          képlet azonnal megadja:
        </p>
        <M block t="\frac{x+3}{2}\sqrt{x^2+6x+13} + 2\ln\left|x+3+\sqrt{x^2+6x+13}\right| + C." />

        <Warn>
          A leggyakoribb hiba az alakillesztésnél, hogy <M t="u = kx" /> helyettesítésnél a táblázatba
          beírjuk <M t="u" />-t, de lemarad az <M t="\frac{1}{k}" /> tényező a <M t="dx = \frac{1}{k}\,du" />-ból!
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={<>Alakillesztéssel számítsd ki az <M t="\int \frac{\cos x\,dx}{4-\sin^2 x}" /> integrált a <M t="\int \frac{du}{a^2-u^2}" /> képlettel!</>}
        >
          <p>
            <M t="u=\sin x,\; du=\cos x\,dx,\; a=2" />:{' '}
            <M t="\int \frac{du}{2^2-u^2} = \frac{1}{4}\ln\left|\frac{2+\sin x}{2-\sin x}\right|+C" />{' '}
            (az abszolút érték elhagyható, mert <M t="2\pm\sin x > 0" />).
          </p>
        </Task>
        <Task
          n={4}
          q={<>Számítsd ki az <M t="\int \frac{dx}{\sqrt{x^2-4x+8}}" /> integrált teljes négyzetté alakítással!</>}
        >
          <p>
            <M t="x^2-4x+8=(x-2)^2+4" />, <M t="u=x-2,\; a=2" />:{' '}
            <M t="\ln\left|x-2+\sqrt{x^2-4x+8}\right|+C" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Láncolt képletek és redukciós formulák',
    body: (
      <>
        <p>
          <strong>4. példa (két táblázati képlet egymás után):</strong> Számítsuk ki az{' '}
          <M t="\int \frac{dx}{x^2\sqrt{2x-4}}" /> integrált! A táblázat 15. képlete csökkenti az <M t="x" />{' '}
          hatványát a nevezőben:
        </p>
        <M block t="\int \frac{dx}{x^2\sqrt{ax+b}} = -\frac{\sqrt{ax+b}}{bx} - \frac{a}{2b}\int \frac{dx}{x\sqrt{ax+b}}." />
        <p>
          Az <M t="a=2,\; b=-4" /> behelyettesítéssel a maradék integrál éppen a 3. példa integrálja:
        </p>
        <M block t="\int \frac{dx}{x^2\sqrt{2x-4}} = \frac{\sqrt{2x-4}}{4x} + \frac{1}{4}\int \frac{dx}{x\sqrt{2x-4}} = \frac{\sqrt{2x-4}}{4x} + \frac{1}{4}\operatorname{arctg}\sqrt{\frac{x-2}{2}} + C." />

        <p>
          <strong>5. példa (inverz trigonometrikus lánc):</strong> Az <M t="\int x\arcsin x\,dx" /> integrálhoz
          a 99. képlet (<M t="n=1,\; a=1" />) adja:
        </p>
        <M block t="\int x\arcsin x\,dx = \frac{x^2}{2}\arcsin x - \frac{1}{2}\int \frac{x^2\,dx}{\sqrt{1-x^2}} = \left(\frac{x^2}{2}-\frac{1}{4}\right)\arcsin x + \frac{1}{4}x\sqrt{1-x^2} + C." />

        <Def title="Három klasszikus redukciós formula (Thomas 8.19–8.21)">
          <M block t="\int \operatorname{tg}^n x\,dx = \frac{1}{n-1}\operatorname{tg}^{n-1} x - \int \operatorname{tg}^{n-2} x\,dx \quad (n\neq 1)" />
          <M block t="\int (\ln x)^n\,dx = x(\ln x)^n - n\int (\ln x)^{n-1}\,dx" />
          <M block t="\int \sin^n x\cos^m x\,dx = -\frac{\sin^{n-1}x\cos^{m+1}x}{m+n} + \frac{n-1}{m+n}\int \sin^{n-2}x\cos^m x\,dx \quad (n\neq -m)" />
        </Def>

        <p>
          Próbáld ki a léptetőn Thomas 6. példáját (<M t="\int \operatorname{tg}^5 x\,dx" />) és magasabb
          kitevőket is — látható, ahogy a redukció lépésről lépésre „lebontja” a hatványt!
        </p>

        <ReductionStepSimulatorWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={<>A redukciós formulával számítsd ki az <M t="\int \operatorname{tg}^4 x\,dx" /> integrált!</>}
        >
          <p>
            <M t="\int \operatorname{tg}^4 x\,dx = \frac{1}{3}\operatorname{tg}^3 x - \int \operatorname{tg}^2 x\,dx = \frac{1}{3}\operatorname{tg}^3 x - \left(\operatorname{tg} x - \int 1\,dx\right) = \frac{1}{3}\operatorname{tg}^3 x - \operatorname{tg} x + x + C" />.
          </p>
        </Task>
        <Task
          n={6}
          q={<>A redukciós formulával számítsd ki az <M t="\int (\ln x)^3\,dx" /> integrált!</>}
        >
          <p>
            <M t="x(\ln x)^3 - 3\big(x(\ln x)^2 - 2(x\ln x - x)\big) + C = x(\ln x)^3 - 3x(\ln x)^2 + 6x\ln x - 6x + C" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Redukciók levezetése és az ekvivalens primitívek rejtélye',
    body: (
      <>
        <p>
          <strong>7. példa (a logaritmus-redukció bizonyítása):</strong> Igazoljuk tetszőleges pozitív egész{' '}
          <M t="n" />-re, hogy <M t="\int (\ln x)^n\,dx = x(\ln x)^n - n\int (\ln x)^{n-1}\,dx" />!
          Parciális integrálással választjuk a „láthatatlan 1” trükköt:
        </p>
        <M block t="u = (\ln x)^n \;\Rightarrow\; du = n(\ln x)^{n-1}\frac{dx}{x}, \qquad dv = dx \;\Rightarrow\; v = x." />
        <p>
          Behelyettesítve a <M t="\int u\,dv = uv - \int v\,du" /> képletbe az <M t="x" /> és az{' '}
          <M t="1/x" /> kiejti egymást, és pontosan a keresett formulát kapjuk. Hasonlóan születik a{' '}
          <M t="\operatorname{tg}^n x" /> redukció is, csak ott parciális integrálás helyett a{' '}
          <M t="\operatorname{tg}^2 x = \sec^2 x - 1" /> azonosságot használjuk!
        </p>

        <p>
          <strong>8. példa (két eltérő út az <M t="\int \sin^2 x\cos^3 x\,dx" /> integrálra):</strong>
        </p>
        <ul>
          <li>
            <strong>1. út (szinusz csökkentése, majd <M t="\cos^3" /> redukciója):</strong>{' '}
            <M t="-\frac{1}{5}\sin x\cos^4 x + \frac{2}{15}\cos^2 x\sin x + \frac{1}{15}\sin x + C" />.
          </li>
          <li>
            <strong>2. út (koszinusz csökkentése):</strong>{' '}
            <M t="\frac{1}{5}\sin^3 x\cos^2 x + \frac{2}{15}\sin^3 x + C" /> (rövidebb!).
          </li>
          <li>
            <strong>3. út (8.4-es kézi trükk, <M t="u=\sin x" />):</strong>{' '}
            <M t="\frac{1}{3}\sin^3 x - \frac{1}{5}\sin^5 x + C" />.
          </li>
        </ul>

        <Def title="Miért lehet különböző alakú két helyes primitív függvény?">
          <p>
            Ha <M t="F_1'(x) = F_2'(x) = f(x)" /> egy intervallumon, akkor a Lagrange-középértéktétel miatt{' '}
            <M t="F_1(x) - F_2(x) = \text{konstans}" />. Trigonometrikus azonosságokkal (pl.{' '}
            <M t="\cos^2 x = 1-\sin^2 x" />) a látszólag idegen képletek átírhatók egymásba — vagy pontosan
            egyenlők, vagy csak egy konstansban térnek el!
          </p>
        </Def>

        <EquivalentPrimitivesWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={<>Vezesd le parciális integrálással az <M t="\int x^n e^x\,dx = x^n e^x - n\int x^{n-1}e^x\,dx" /> redukciós formulát!</>}
        >
          <p>
            Legyen <M t="u = x^n \Rightarrow du = nx^{n-1}\,dx" />, <M t="dv = e^x\,dx \Rightarrow v = e^x" />.
            Ekkor <M t="\int x^n e^x\,dx = x^n e^x - n\int x^{n-1}e^x\,dx" />.
          </p>
        </Task>
        <Task
          n={8}
          q={<>Igazold algebrailag, hogy <M t="\frac{1}{5}\sin^3 x\cos^2 x + \frac{2}{15}\sin^3 x" /> pontosan egyenlő <M t="\frac{1}{3}\sin^3 x - \frac{1}{5}\sin^5 x" />-szel!</>}
        >
          <p>
            Írjuk át <M t="\cos^2 x = 1-\sin^2 x" />-re:{' '}
            <M t="\frac{1}{5}\sin^3 x(1-\sin^2 x) + \frac{2}{15}\sin^3 x = \left(\frac{3}{15}+\frac{2}{15}\right)\sin^3 x - \frac{1}{5}\sin^5 x = \frac{1}{3}\sin^3 x - \frac{1}{5}\sin^5 x" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Nem elemi integrálok: a zárt képletek határa',
    body: (
      <>
        <Story>
          <p>
            Bármely <strong>elemi függvény</strong> (polinom, tört, gyök, hatvány, exponenciális, logaritmus,
            trigonometrikus, inverz trigonometrikus és ezek véges összetételei) deriváltja mindig újra elemi
            függvény. Visszafelé ez <em>nem igaz</em>: Joseph Liouville (1835) bizonyította be, hogy számos egyszerű
            függvénynek nincs elemi primitív függvénye.
          </p>
        </Story>

        <Def title="Nem elemi integrálok — a leghíresebb példák">
          <M block t="\int e^{-x^2}\,dx, \qquad \int \sin(x^2)\,dx, \qquad \int \frac{\sin x}{x}\,dx, \qquad \int \frac{dx}{\ln x}, \qquad \int \sqrt{1+x^3}\,dx" />
          <p>
            Ezek az integrálok <strong>léteznek</strong> (mint területfüggvények: <M t="F(x)=\int_a^x f(t)\,dt" />),
            ezért a tudomány saját nevet adott a legfontosabbaknak — például a <strong>Gauss-féle hibafüggvény</strong>:
          </p>
          <M block t="\operatorname{erf}(x) = \frac{2}{\sqrt{\pi}}\int_0^x e^{-t^2}\,dt." />
        </Def>

        <p>
          Hogyan számolunk ki mégis egy határozott nem elemi integrált? Két fő fegyverünk van: a{' '}
          <strong>numerikus integrálás</strong> (8.7. szakasz: trapéz- és Simpson-szabály) és a{' '}
          <strong>hatványsorba fejtés</strong> (11. fejezet). Az alábbi galériában élőben láthatod, hogy a
          zárt képlet hiánya ellenére a primitív függvény tökéletesen sima, jól definiált görbe!
        </p>

        <NonElementaryGalleryWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={<>Mennyi az <M t="\operatorname{erf}(x) = \frac{2}{\sqrt{\pi}}\int_0^x e^{-t^2}\,dt" /> függvény deriváltja? Van-e lokális szélsőértéke?</>}
        >
          <p>
            Az analízis alaptétele miatt <M t="\operatorname{erf}'(x) = \frac{2}{\sqrt{\pi}}e^{-x^2} > 0" />{' '}
            minden <M t="x\in\mathbb{R}" />-re, tehát szigorúan növekvő, nincs lokális szélsőértéke.
          </p>
        </Task>
        <Task
          n={10}
          q={<>A <M t="\int x e^{-x^2}\,dx" /> elemi integrál-e, vagy nem elemi? Mi a különbség az <M t="\int e^{-x^2}\,dx" />-hez képest?</>}
        >
          <p>
            <strong>Elemi!</strong> A plusz <M t="x" /> tényező pontosan a belső függvény deriváltját adja:{' '}
            <M t="u=-x^2,\; du=-2x\,dx \Rightarrow \int x e^{-x^2}\,dx = -\frac{1}{2}e^{-x^2}+C" />.
            Egyetlen <M t="x" /> szorzó választhatja el az elemi integrált a nem elemitől!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Matematikai programcsomagok (CAS)',
    body: (
      <>
        <p>
          Egy <strong>CAS (Computer Algebra System)</strong> nem csupán számokat közelít, hanem <em>szimbolikus
          képleteket</em> manipulál. Háttérmotorja a klasszikus technikák (helyettesítés, parciális törtek,
          redukciók) mellett a <strong>Risch-algoritmust</strong> használja, amely elvben el is tudja dönteni,
          hogy egy függvénynek létezik-e elemi primitív függvénye.
        </p>

        <Def title="Thomas 9–11. példa: mit tanulunk a Maple és a Mathematica összehasonlításából?">
          <ul>
            <li>
              <strong>9. példa (<M t="\int x^2\sqrt{a^2+x^2}\,dx" />):</strong> a CAS paraméteresen is
              integrál, majd <M t="a=1" /> és <M t="[0,1]" /> behelyettesítéssel pontos zárt értéket ad:{' '}
              <M t="\frac{3}{8}\sqrt{2} + \frac{1}{8}\ln(\sqrt{2}-1)" /> — figyeljük meg, hogy{' '}
              <M t="\ln(\sqrt{2}-1) = -\ln(\sqrt{2}+1)" />, tehát az előjel is stimmel!
            </li>
            <li>
              <strong>10. példa (<M t="\int \sin^2 x\cos^3 x\,dx" />):</strong> a Maple koszinusz-hatványokban,
              a Mathematica többszörös szögekben válaszol — mindkettő helyes.
            </li>
            <li>
              <strong>11. példa (<M t="\int (\arccos ax)^2\,dx" />):</strong> a régebbi Maple visszaadta
              változtatlanul az integrált, míg a Mathematica kiadta a zárt megoldást!
            </li>
          </ul>
        </Def>

        <CasComparisonDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={<>A 9. példában a Maple <M t="\frac{3}{8}\sqrt{2} + \frac{1}{8}\ln(\sqrt{2}-1)" /> eredményt adott az <M t="\int_0^1 x^2\sqrt{1+x^2}\,dx" /> integrálra. Becsüld meg, pozitív-e ez a szám, és miért!</>}
        >
          <p>
            <M t="\frac{3}{8}\sqrt{2} \approx 0{,}530" />, míg <M t="\frac{1}{8}\ln(\sqrt{2}-1) \approx -0{,}110" />,
            az összeg kb. <M t="0{,}420 > 0" />. Mivel <M t="x^2\sqrt{1+x^2}\ge 0" /> a <M t="[0,1]" />-en,
            kötelezően pozitív (sőt <M t="\frac{1}{3} \le I \le \frac{\sqrt{2}}{3}\approx 0{,}471" />)!
          </p>
        </Task>
        <Task
          n={12}
          q={<>Milyen <M t="u" /> és <M t="dv" /> választással oldható meg kézzel is a 11. példa (<M t="\int (\arccos x)^2\,dx" />)?</>}
        >
          <p>
            Parciális integrálással: <M t="u=(\arccos x)^2,\; dv=dx" /> adja{' '}
            <M t="x(\arccos x)^2 + 2\int \frac{x\arccos x}{\sqrt{1-x^2}}\,dx" />. A második integrálban újabb
            parciális integrálás (<M t="u=\arccos x,\; dv=\frac{x}{\sqrt{1-x^2}}\,dx \Rightarrow v=-\sqrt{1-x^2}" />)
            azonnal kiadja a <M t="-2\sqrt{1-x^2}\arccos x - 2x + C" /> tagokat!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'A CAS buktatói és a 3 aranypróba',
    body: (
      <>
        <Warn>
          <strong>Négy klasszikus CAS-csapda, amire mindig figyelj:</strong>
          <ol style={{ margin: '6px 0 0 18px' }}>
            <li>
              <strong>Elmaradó <M t="+C" />:</strong> sem a Maple, sem a Mathematica, sem a SymPy nem írja ki
              a határozatlan integrál végére a <M t="+C" /> konstanst!
            </li>
            <li>
              <strong>Elmaradó abszolút érték:</strong> a legtöbb CAS <M t="\ln(x)" />-et ír{' '}
              <M t="\ln|x|" /> helyett (komplex függvénytan miatt). Valós számokon negatív <M t="x" />-re
              pótolnod kell az abszolút értéket!
            </li>
            <li>
              <strong>Paraméter-feltételek:</strong> a CAS gyakran feltételezi, hogy <M t="a>0" /> vagy{' '}
              <M t="n\neq -1" /> anélkül, hogy hangosan figyelmeztetne.
            </li>
            <li>
              <strong>Szakadásos (ugró) primitív függvény:</strong> a Weierstrass-féle{' '}
              <M t="t = \operatorname{tg}(x/2)" /> helyettesítésből kapott primitív <M t="x=\pi" />-nél ugrik!
            </li>
          </ol>
        </Warn>

        <p>
          Nézd meg a lenti grafikonon, mi történik, ha vakon alkalmazzuk a Newton–Leibniz-tételt a CAS által
          visszaadott <M t="F(x) = \frac{2}{\sqrt{3}}\operatorname{arctg}\!\left(\frac{1}{\sqrt{3}}\operatorname{tg}\frac{x}{2}\right)" />{' '}
          primitívre a <M t="[0, 2\pi]" /> intervallumon: a képlet mindkét végpontban <M t="0" />-t ad, holott
          a <M t="\frac{1}{2+\cos x}" /> függvény mindenhol pozitív!
        </p>

        <CasVerificationChecklistDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={<>Miért kaptunk <M t="0" />-t a naiv <M t="F(2\pi)-F(0)" /> képlettel, és hogyan számoljuk ki helyesen az <M t="\int_0^{2\pi} \frac{dx}{2+\cos x}" /> integrált?</>}
        >
          <p>
            Mert <M t="F(x)" /> nem folytonos <M t="x=\pi" />-nél (<M t="\operatorname{tg}(x/2)" /> ott
            szakad), így a Newton–Leibniz-tétel feltétele sérül! Szimmetriával:{' '}
            <M t="2\int_0^\pi \frac{dx}{2+\cos x} = 2\lim_{b\to\pi^-} [F(b)-F(0)] = 2\cdot\frac{2}{\sqrt{3}}\cdot\frac{\pi}{2} = \frac{2\pi}{\sqrt{3}}" />.
          </p>
        </Task>
        <Task
          n={14}
          q={<>Egy CAS az <M t="\int \frac{dx}{x-5}" /> integrálra <M t="\ln(x-5)" />-öt adott. Mi történik, ha az <M t="\int_1^3 \frac{dx}{x-5}" /> határozott integrált akarod ebből kiszámolni?</>}
        >
          <p>
            A <M t="[1,3]" /> intervallumon <M t="x-5 < 0" />, így valós számokon <M t="\ln(x-5)" /> nem
            értelmezett. Az abszolút értéket pótolva:{' '}
            <M t="\big[\ln|x-5|\big]_1^3 = \ln 2 - \ln 4 = -\ln 2" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok',
    body: (
      <>
        <IntegrationWorkflowMasterDiagram />

        <Def title="8.6 Puskakártya — Kulcselvek egy pillantásra">
          <ul>
            <li>
              <strong>Táblázat:</strong> először alakillesztés (<M t="u" />-helyettesítés, teljes négyzet), majd
              feltétel-ellenőrzés (<M t="b>0" /> vs. <M t="b<0" />, <M t="n\neq -1" />).
            </li>
            <li>
              <strong>Redukciós formulák:</strong> magas hatványt csökkentenek egyesével (<M t="(\ln x)^n" />)
              vagy kettesével (<M t="\operatorname{tg}^n x,\; \sin^n x\cos^m x" />), amíg alapintegrált nem kapsz.
            </li>
            <li>
              <strong>Nem elemi integrálok:</strong> <M t="\int e^{-x^2}\,dx" />, <M t="\int \sin(x^2)\,dx" />,{' '}
              <M t="\int \frac{\sin x}{x}\,dx" />, <M t="\int \frac{dx}{\ln x}" /> — léteznek, de nincs zárt
              elemi képletük (numerikus módszer vagy sorbafejtés kell).
            </li>
            <li>
              <strong>CAS 3 aranypróba:</strong> (1) deriválás <M t="F'=f" />, (2) előjel és folytonosság az
              intervallumon, (3) gyors numerikus becslés + <M t="+C" /> és <M t="|x|" /> pótlása.
            </li>
          </ul>
        </Def>

        <Warn>
          <strong>5 tipikus buktató a 8.6-ban:</strong>
          <ol style={{ margin: '6px 0 0 18px' }}>
            <li>Rossz előjelű táblázati ág választása (pl. 13(b) használata <M t="2x-4" />-re).</li>
            <li>A <M t="dx = \frac{1}{k}\,du" /> szorzó elfelejtése lineáris alakillesztésnél.</li>
            <li>Előjel-tévesztés láncolt redukciónál (zárójelek elhagyása a mínuszjel után!).</li>
            <li>A CAS által elhagyott <M t="+C" /> és <M t="\ln|\cdot|" /> vakon átmásolása.</li>
            <li>Szakadásos CAS-primitív behelyettesítése a Newton–Leibniz-tételbe belső ugráspont felett.</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={<>Táblázattal számítsd ki az <M t="\int \frac{dx}{x\sqrt{x+4}}" /> integrált!</>}
        >
          <p>
            13(b) képlet (<M t="a=1,\; b=4,\; \sqrt{b}=2" />):{' '}
            <M t="\frac{1}{2}\ln\left|\frac{\sqrt{x+4}-2}{\sqrt{x+4}+2}\right| + C" />.
          </p>
        </Task>
        <Task
          n={16}
          q={<>Táblázattal számítsd ki az <M t="\int \frac{dx}{x\sqrt{x-3}}" /> integrált!</>}
        >
          <p>
            13(a) képlet (<M t="a=1,\; b=3" />):{' '}
            <M t="\frac{2}{\sqrt{3}}\operatorname{arctg}\sqrt{\frac{x-3}{3}} + C" />.
          </p>
        </Task>
        <Task
          n={17}
          q={<>Használd az <M t="\int (\ln x)^n\,dx" /> redukciós formulát az <M t="\int (\ln x)^2\,dx" /> integrálra!</>}
        >
          <p>
            <M t="x(\ln x)^2 - 2\int \ln x\,dx = x(\ln x)^2 - 2(x\ln x - x) + C = x(\ln x)^2 - 2x\ln x + 2x + C" />.
          </p>
        </Task>

        <h3>Közepes gyakorlófeladatok</h3>
        <Task
          n={18}
          q={<>Alakillesztéssel számítsd ki az <M t="\int \frac{dx}{\sqrt{16+9x^2}}" /> integrált!</>}
        >
          <p>
            <M t="u=3x,\; dx=\frac{1}{3}\,du,\; a=4" />:{' '}
            <M t="\frac{1}{3}\int \frac{du}{\sqrt{4^2+u^2}} = \frac{1}{3}\ln\left|3x+\sqrt{16+9x^2}\right|+C" />.
          </p>
        </Task>
        <Task
          n={19}
          q={<>A redukciós formulával számítsd ki az <M t="\int \operatorname{tg}^6 x\,dx" /> integrált!</>}
        >
          <p>
            <M t="\frac{1}{5}\operatorname{tg}^5 x - \frac{1}{3}\operatorname{tg}^3 x + \operatorname{tg} x - x + C" />.
          </p>
        </Task>
        <Task
          n={20}
          q={<>Döntsd el mindkettőről, hogy elemi-e, és amelyik igen, számítsd ki: (a) <M t="\int x\sin(x^2)\,dx" />, (b) <M t="\int \sin(x^2)\,dx" />.</>}
        >
          <p>
            (a) <strong>Elemi</strong> (<M t="u=x^2" />): <M t="-\frac{1}{2}\cos(x^2)+C" />. (b){' '}
            <strong>Nem elemi</strong> (Fresnel-integrál, nincs zárt elemi primitív függvénye).
          </p>
        </Task>

        <h3>Haladó gyakorlófeladatok</h3>
        <Task
          n={21}
          q={<>Láncolt táblázati formulával számítsd ki az <M t="\int \frac{dx}{x^2\sqrt{4x-9}}" /> integrált!</>}
        >
          <p>
            15. képlet (<M t="a=4,\; b=-9" />):{' '}
            <M t="\frac{\sqrt{4x-9}}{9x} + \frac{2}{9}\int \frac{dx}{x\sqrt{4x-9}}" />. A maradékra a 13(a)
            képlet (<M t="\sqrt{9}=3" />) adja:{' '}
            <M t="\frac{\sqrt{4x-9}}{9x} + \frac{4}{27}\operatorname{arctg}\frac{\sqrt{4x-9}}{3} + C" />.
          </p>
        </Task>
        <Task
          n={22}
          q={<>Igazold parciális integrálással a szekáns redukciós formuláját: <M t="\int \sec^n x\,dx = \frac{\sec^{n-2}x\operatorname{tg} x}{n-1} + \frac{n-2}{n-1}\int \sec^{n-2}x\,dx" /> (<M t="n\ge 2" />)!</>}
        >
          <p>
            Bontsuk fel: <M t="u=\sec^{n-2}x \Rightarrow du=(n-2)\sec^{n-2}x\operatorname{tg} x\,dx" />,{' '}
            <M t="dv=\sec^2 x\,dx \Rightarrow v=\operatorname{tg} x" />. Ekkor{' '}
            <M t="I_n = \sec^{n-2}x\operatorname{tg} x - (n-2)\int \sec^{n-2}x(\sec^2 x - 1)\,dx" />. Az{' '}
            <M t="I_n" /> tagot balra rendezve <M t="(n-1)I_n = \sec^{n-2}x\operatorname{tg} x + (n-2)I_{n-2}" />,
            ahonnan osztva kész!
          </p>
        </Task>
        <Task
          n={23}
          q={<>A <M t="\operatorname{erf}(x)" /> segítségével fejezd ki az <M t="\int_0^3 e^{-4x^2}\,dx" /> határozott integrált, és add meg a <M t="\lim_{b\to\infty}\int_0^b e^{-4x^2}\,dx" /> határértéket (tudva, hogy <M t="\lim_{u\to\infty}\operatorname{erf}(u)=1" />)!</>}
        >
          <p>
            Legyen <M t="t=2x,\; dx=\frac{1}{2}\,dt" />, határok <M t="0 \to 6" />:{' '}
            <M t="\frac{1}{2}\int_0^6 e^{-t^2}\,dt = \frac{\sqrt{\pi}}{4}\operatorname{erf}(6)" />. A határérték{' '}
            <M t="b\to\infty" />-re pontosan <M t="\frac{\sqrt{\pi}}{4}" />.
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Melyik integrál <strong>NEM</strong> fejezhető ki elemi függvények zárt kombinációjaként?
            </>
          }
          options={[
            { label: <M t="\displaystyle\int e^{-x^2}\,dx" />, ok: true },
            { label: <M t="\displaystyle\int x e^{-x^2}\,dx" /> },
            { label: <M t="\displaystyle\int x^2 e^x\,dx" /> },
            { label: <M t="\displaystyle\int \frac{1}{1 + x^2}\,dx" /> },
          ]}
          explain={
            <>
              Az <M t="e^{-x^2}" /> (Gauss-haranggörbe) primitív függvénye nem elemi; az <M t="x" /> szorzóval viszont egyszerű <M t="u = -x^2" /> helyettesítés.
            </>
          }
        />
      </>
    ),
  },
];
