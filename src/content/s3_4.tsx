import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  SinCosDerivWidget,
  SpringOscWidget,
  TrigCycleDiagram,
  TrigSixTableWidget,
} from '../components/Widgets34';
import type { Page } from './s1_1';

export const S3_4: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'A szinusz- és koszinuszfüggvény deriváltja',
    body: (
      <>
        <Story>
          <p>
            A természet tele van ismétlődő, hullámzó jelenségekkel: az inga lengése, a hanghullámok, a váltakozó áram vagy az árapály. Ezeket a szinusz- és koszinuszfüggvények írják le — de milyen gyorsan változnak egy adott pillanatban? A válasz meglepően elegáns!
          </p>
        </Story>
        <h3>Honnan jön a szinusz deriváltja?</h3>
        <p>
          Használjuk a definíciót, a <M t="\sin(x+h)=\sin x\cos h + \cos x\sin h" /> addíciós képletet és a 2.4-es szakasz két nevezetes határértékét (<M t="\frac{\sin h}{h}\to 1" /> és <M t="\frac{\cos h - 1}{h}\to 0" />):
        </p>
        <M block t="\frac{d}{dx}(\sin x)=\lim_{h\to 0}\frac{\sin x(\cos h-1)+\cos x\sin h}{h} = \sin x\cdot\underbrace{\lim_{h\to 0}\frac{\cos h-1}{h}}_{0} + \cos x\cdot\underbrace{\lim_{h\to 0}\frac{\sin h}{h}}_{1} = \cos x." />
        <p>
          Ugyanezzel a gondolatmenettel (a <M t="\cos(x+h)=\cos x\cos h - \sin x\sin h" /> képlettel) kapjuk a koszinusz deriváltját — itt azonban az addíciós képlet mínuszjele megmarad:
        </p>
        <Def title="A szinusz és a koszinusz deriváltja (radiánban!)">
          <M block t="\frac{d}{dx}(\sin x) = \cos x, \qquad\qquad \frac{d}{dx}(\cos x) = -\sin x." />
        </Def>
        <SinCosDerivWidget />
        <p>
          Nézd meg a felső grafikonon: a koszinusz <M t="x=0" />-nál a csúcson van, és utána azonnal <em>lefelé</em> indul — ezért negatív a meredeksége <M t="(0;\,\pi)" />-n, ami pontosan <M t="-\sin x" />!
        </p>
        <TrigCycleDiagram />
        <Warn>
          <p>
            Ezek a gyönyörű képletek <strong>kizárólag radiánban</strong> érvényesek! Ha fokban mérnéd <M t="x" />-et, minden egyes deriváláskor előkerülne egy <M t="\frac{\pi}{180}" /> szorzó (<M t="\frac{d}{dx}\sin(x^\circ)=\frac{\pi}{180}\cos(x^\circ)" />).
          </p>
        </Warn>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Deriváld: (a) <M t="y=x^2-\sin x" />, (b) <M t="y=5x+3\cos x" />!
            </>
          }
        >
          <p>
            (a) <M t="y'=2x-\cos x" />. (b) <M t="y'=5-3\sin x" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Deriváld szorzatszabállyal: <M t="y=x^2\sin x" />!
            </>
          }
        >
          <p>
            <M t="y'=x^2\cos x + 2x\sin x" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Harmonikus rezgőmozgás',
    body: (
      <>
        <p>
          A szinusz és koszinusz deriváltja azonnal feltárja a fizika egyik legfontosabb mozgását: a <strong>harmonikus rezgőmozgást</strong>! Tegyük fel, hogy egy rugón függő testet <M t="5" /> egységgel lehúzunk, majd elengedünk; helyzetét az <M t="s(t)=5\cos t" /> függvény adja meg.
        </p>
        <M block t="s(t)=5\cos t \;\Longrightarrow\; v(t)=-5\sin t \;\Longrightarrow\; a(t)=-5\cos t = -s(t) \;\Longrightarrow\; j(t)=5\sin t." />
        <p>
          Olvassuk ki a fizikát ebből a négy sorból!
        </p>
        <ul>
          <li>
            <strong>Hol a leggyorsabb?</strong> Ahol <M t="|\sin t|=1" />, vagyis éppen a <M t="s=0" /> <em>nyugalmi helyzeten áthaladva</em>! A végpontokban (<M t="s=\pm 5" />) egy pillanatra megáll (<M t="v=0" />).
          </li>
          <li>
            <strong>Merre hat a gyorsulás?</strong> Mivel <M t="a(t)=-s(t)" />, a gyorsulás mindig az elmozdulással <em>ellentétes irányú</em>: fent lefelé húzza a testet, lent felfelé tolja vissza a rugó!
          </li>
          <li>
            <strong>Hol a legnagyobb a lökés (<M t="j" />)?</strong> A nyugalmi helyzetben (<M t="s=0" />), ahol a gyorsulás előjelet vált!
          </li>
        </ul>
        <SpringOscWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Az <M t="s(t)=5\cos t" /> rezgőmozgásnál mennyi a sebesség és a gyorsulás <M t="t=\dfrac{\pi}{2}" /> és <M t="t=\pi" /> pillanatban?
            </>
          }
        >
          <p>
            <M t="t=\pi/2" />-nél: <M t="v=-5\sin(\pi/2)=-5" />, <M t="a=-5\cos(\pi/2)=0" /> (nyugalmi pont, maximális gyorsaság).
          </p>
          <p>
            <M t="t=\pi" />-nél: <M t="v=0" />, <M t="a=-5\cos\pi=+5" /> (alsó végpont, maximális felfelé irányuló gyorsulás).
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Igazold, hogy <M t="s(t)=4\sin t" /> esetén is teljesül az <M t="a(t)=-s(t)" /> összefüggés!
            </>
          }
        >
          <p>
            <M t="v(t)=4\cos t" />, <M t="a(t)=-4\sin t = -s(t)" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A többi négy trigonometrikus függvény deriváltja',
    body: (
      <>
        <p>
          A <M t="\operatorname{tg} x" />, <M t="\operatorname{ctg} x" />, <M t="\sec x" /> és <M t="\csc x" /> függvények mindegyike felírható <M t="\sin x" /> és <M t="\cos x" /> hányadosaként, így a <strong>hányadosszabállyal</strong> azonnal megkapjuk a deriváltjukat! Nézzük meg a tangenst:
        </p>
        <M block t="\frac{d}{dx}(\operatorname{tg} x) = \frac{d}{dx}\left(\frac{\sin x}{\cos x}\right) = \frac{\cos x\cdot\cos x - \sin x(-\sin x)}{\cos^2 x} = \frac{\cos^2 x + \sin^2 x}{\cos^2 x} = \frac{1}{\cos^2 x} = \sec^2 x." />
        <p>
          Hasonlóan a szekánsra (<M t="\sec x = 1/\cos x" />):
        </p>
        <M block t="\frac{d}{dx}(\sec x) = \frac{\cos x\cdot 0 - 1\cdot(-\sin x)}{\cos^2 x} = \frac{\sin x}{\cos x}\cdot\frac{1}{\cos x} = \sec x\operatorname{tg} x." />
        <Def title="Mind a hat trigonometrikus függvény deriváltja">
          <M block t="\begin{aligned} (\sin x)' &= \cos x, & (\cos x)' &= -\sin x, \\ (\operatorname{tg} x)' &= \sec^2 x = \tfrac{1}{\cos^2 x}, & (\operatorname{ctg} x)' &= -\csc^2 x = -\tfrac{1}{\sin^2 x}, \\ (\sec x)' &= \sec x\operatorname{tg} x, & (\csc x)' &= -\csc x\operatorname{ctg} x. \end{aligned}" />
        </Def>
        <p>
          <strong>Egyszerű memóriaszabály:</strong> a jobb oldali oszlopban csupa <em>„co-”</em> kezdetű függvény áll (<strong>co</strong>s, <strong>c</strong>tg/<strong>co</strong>t, <strong>c</strong>sc/<strong>co</strong>sec) — és pontosan ezeknek a deriváltja kezdődik <strong>mínuszjellel!</strong>
        </p>
        <TrigSixTableWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Deriváld: (a) <M t="y=3\operatorname{tg} x - 2\sec x" />, (b) <M t="y=x\operatorname{ctg} x" />!
            </>
          }
        >
          <p>
            (a) <M t="y'=3\sec^2 x - 2\sec x\operatorname{tg} x" />.
          </p>
          <p>
            (b) Szorzatszabállyal: <M t="y'=x(-\csc^2 x)+\operatorname{ctg} x = \operatorname{ctg} x - x\csc^2 x" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Levezetés gyakorlása: igazold hányadosszabállyal, hogy <M t="(\csc x)'=-\csc x\operatorname{ctg} x" />!
            </>
          }
        >
          <p>
            <M t="\left(\dfrac{1}{\sin x}\right)'=\dfrac{\sin x\cdot 0 - 1\cdot\cos x}{\sin^2 x}=-\dfrac{1}{\sin x}\cdot\dfrac{\cos x}{\sin x}=-\csc x\operatorname{ctg} x" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Szorzatok, hányadosok és trigonometrikus egyszerűsítés',
    body: (
      <>
        <p>
          Trigonometrikus függvények deriválásakor gyakran előbukkan a <M t="\sin^2 x + \cos^2 x = 1" /> Pitagorasz-azonosság, amellyel egy elsőre bonyolultnak tűnő tört drámaian leegyszerűsödik!
        </p>
        <h3>Mintapélda 1 (hányadosszabály + egyszerűsítés)</h3>
        <p>
          Deriváljuk az <M t="y=\dfrac{\cos x}{1-\sin x}" /> függvényt!
        </p>
        <M block t="y'=\frac{(1-\sin x)(-\sin x)-\cos x(-\cos x)}{(1-\sin x)^2} = \frac{-\sin x + \sin^2 x + \cos^2 x}{(1-\sin x)^2} = \frac{1-\sin x}{(1-\sin x)^2} = \frac{1}{1-\sin x}." />
        <h3>Mintapélda 2 (második derivált)</h3>
        <p>
          Mennyi az <M t="y=\sec x" /> második deriváltja? Először <M t="y'=\sec x\operatorname{tg} x" />, majd szorzatszabállyal:
        </p>
        <M block t="y'' = \sec x(\sec^2 x) + \operatorname{tg} x(\sec x\operatorname{tg} x) = \sec^3 x + \sec x\operatorname{tg}^2 x." />
        <h3>Folytonossági következmény</h3>
        <p>
          Mivel mind a hat alapvető trigonometrikus függvény differenciálható értelmezési tartománya minden pontjában, a 3.1-es 1. Tétel szerint <strong>mindegyik folytonos is</strong> ott — ezért határértékeiket a belső pontokban egyszerű behelyettesítéssel számolhatjuk ki! Például:
        </p>
        <M block t="\lim_{x\to 0}\frac{\sqrt{2+\sec x}}{\cos(\pi\operatorname{tg} x)} = \frac{\sqrt{2+1}}{\cos(0)} = \sqrt{3}." />
        <Steps
          source="Analízis-labor"
          title="Szorzatszabály + meglepő egyszerűsödés"
          problem={
            <>
              Határozzuk meg az <M t="y = x\sin x + \cos x" /> függvény deriváltját!
            </>
          }
          steps={[
            {
              title: 'Szorzatszabály az első tagra',
              body: (
                <p>
                  <M t="(x\sin x)' = 1\cdot\sin x + x\cos x = \sin x + x\cos x" />.
                </p>
              ),
            },
            {
              title: 'A második tag deriváltja',
              body: (
                <p>
                  <M t="(\cos x)' = -\sin x" />.
                </p>
              ),
            },
            {
              title: 'Összevonás',
              body: (
                <M block t="y' = \sin x + x\cos x - \sin x = x\cos x." />
              ),
            },
          ]}
        />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Deriváld: <M t="y=\dfrac{\sin x}{x}" /> (<M t="x\ne 0" />)!
            </>
          }
        >
          <p>
            Hányadosszabállyal: <M t="y'=\dfrac{x\cos x - \sin x}{x^2}" />.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Deriváld: <M t="y=\sin x\cos x" />! Milyen ismert képletet ismersz fel az eredményben?
            </>
          }
        >
          <p>
            Szorzatszabállyal: <M t="y'=\sin x(-\sin x)+\cos x(\cos x)=\cos^2 x - \sin^2 x = \cos(2x)" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Ciklikus magasabbrendű deriváltak',
    body: (
      <>
        <p>
          Az 1. oldalon látott 4-es körforgás miatt a szinusz és a koszinusz <strong>tetszőlegesen magas rendű deriváltja</strong> pillanatok alatt meghatározható — nincs szükség 50-szeri deriválásra!
        </p>
        <p>
          A módszer egyszerű: <strong>oszd el a derivált <M t="n" /> rendjét 4-gyel, és csak a maradékot nézd!</strong>
        </p>
        <ul>
          <li>Maradék 0: visszaértél az eredeti függvényhez (<M t="\sin x" /> vagy <M t="\cos x" />).</li>
          <li>Maradék 1: első derivált (<M t="\cos x" />, illetve <M t="-\sin x" />).</li>
          <li>Maradék 2: második derivált (<M t="-\sin x" />, illetve <M t="-\cos x" />).</li>
          <li>Maradék 3: harmadik derivált (<M t="-\cos x" />, illetve <M t="\sin x" />).</li>
        </ul>
        <p>
          Például <M t="\dfrac{d^{50}}{dx^{50}}(\cos x)" /> esetén <M t="50 = 4\cdot 12 + 2" /> (maradék 2), tehát az eredmény megegyezik a 2. deriválttal: <M t="-\cos x" />!
        </p>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Mennyi a <M t="\dfrac{d^4}{dx^4}(\cos x)" /> negyedik derivált?
            </>
          }
          options={[
            { label: <M t="\cos x" />, ok: true },
            { label: <M t="-\cos x" /> },
            { label: <M t="\sin x" /> },
            { label: <M t="-\sin x" /> },
          ]}
          explain={
            <>
              <M t="\cos x \to -\sin x \to -\cos x \to \sin x \to \cos x" />; a deriválás 4-es periódusú.
            </>
          }
        />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Számítsd ki: (a) <M t="\dfrac{d^{25}}{dx^{25}}(\sin x)" />, (b) <M t="\dfrac{d^{40}}{dx^{40}}(\cos x)" />!
            </>
          }
        >
          <p>
            (a) <M t="25=4\cdot 6+1" /> (maradék 1) <M t="\Rightarrow \cos x" />. (b) <M t="40=4\cdot 10+0" /> (maradék 0) <M t="\Rightarrow \cos x" />.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Igazold, hogy bármely <M t="A, B" /> valós konstansra az <M t="y=A\sin x+B\cos x" /> függvény kielégíti az <M t="y''+y=0" /> egyenletet!
            </>
          }
        >
          <p>
            <M t="y'=A\cos x-B\sin x" />, <M t="y''=-A\sin x-B\cos x=-y" />, tehát <M t="y''+y=0" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglaló képlettár és a 4 legnagyobb buktató',
    body: (
      <>
        <table className="tbl">
          <thead>
            <tr>
              <th>függvény</th>
              <th>derivált</th>
              <th>megjegyzés</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><M t="\sin x" /></td>
              <td><M t="\cos x" /></td>
              <td>mindenütt differenciálható</td>
            </tr>
            <tr>
              <td><M t="\cos x" /></td>
              <td><M t="-\sin x" /></td>
              <td>„co-” → mínuszjel!</td>
            </tr>
            <tr>
              <td><M t="\operatorname{tg} x" /></td>
              <td><M t="\sec^2 x = \dfrac{1}{\cos^2 x}" /></td>
              <td>mindig <M t="\ge 1" /> (szigorúan növekvő ágak)</td>
            </tr>
            <tr>
              <td><M t="\operatorname{ctg} x" /></td>
              <td><M t="-\csc^2 x = -\dfrac{1}{\sin^2 x}" /></td>
              <td>„co-” → mínuszjel, mindig <M t="\le -1" /></td>
            </tr>
            <tr>
              <td><M t="\sec x" /></td>
              <td><M t="\sec x\operatorname{tg} x" /></td>
              <td><M t="\cos x\ne 0" /> esetén</td>
            </tr>
            <tr>
              <td><M t="\csc x" /></td>
              <td><M t="-\csc x\operatorname{ctg} x" /></td>
              <td>„co-” → mínuszjel, <M t="\sin x\ne 0" /> esetén</td>
            </tr>
          </tbody>
        </table>
        <h3>Négy gyakori hiba</h3>
        <Warn>
          <p>
            <strong>1. Előjel elrontása:</strong> <M t="(\sin x)' = +\cos x" />, de <M t="(\cos x)' = -\sin x" />! (A <em>co-</em> függvények kapnak mínuszjelet.)
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. A négyzet lemaradása a tangensnél:</strong> <M t="(\operatorname{tg} x)' = \sec^2 x" />, <em>nem</em> <M t="\sec x" />!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Szorzatszabály elfelejtése:</strong> <M t="(x\cos x)'" /> nem <M t="-\sin x" />, hanem <M t="\cos x - x\sin x" />!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Számológép DEG módban:</strong> a kalkulusban a szög mindig <em>radián</em> (RAD mód)!
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
          Gyakorold a trigonometrikus deriválást növekvő nehézségi sorrendben!
        </p>

        <h3>Könnyebb (alapozó) feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Deriváld: <M t="y=4\sin x - 7\cos x + 2\operatorname{tg} x" />!
            </>
          }
        >
          <p>
            <M t="y'=4\cos x + 7\sin x + 2\sec^2 x" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Deriváld: <M t="f(x)=x^3\cos x" />!
            </>
          }
        >
          <p>
            Szorzatszabállyal: <M t="f'(x)=x^3(-\sin x)+3x^2\cos x = 3x^2\cos x - x^3\sin x" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Írd fel az <M t="y=\sin x" /> görbe <M t="(0;\,0)" /> pontbeli érintőjének egyenletét!
            </>
          }
        >
          <p>
            <M t="y'(0)=\cos 0 = 1" />, tehát az érintő egyszerűen <M t="y=x" />! (Ezért közelíti kis szögekre <M t="\sin x\approx x" />.)
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Deriváld és egyszerűsítsd: <M t="g(x)=\dfrac{\sin x}{1+\cos x}" />!
            </>
          }
        >
          <p>
            <M t="g'(x)=\dfrac{(1+\cos x)\cos x - \sin x(-\sin x)}{(1+\cos x)^2}=\dfrac{\cos x + \cos^2 x + \sin^2 x}{(1+\cos x)^2}=\dfrac{1+\cos x}{(1+\cos x)^2}=\dfrac{1}{1+\cos x}" />.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Írd fel az <M t="y=\operatorname{tg} x" /> görbe <M t="\left(\frac{\pi}{4};\,1\right)" /> pontbeli érintőjének egyenletét!
            </>
          }
        >
          <p>
            <M t="y'=\sec^2 x = \dfrac{1}{\cos^2 x}" />. Mivel <M t="\cos(\pi/4)=\dfrac{\sqrt{2}}{2}" />, <M t="\cos^2(\pi/4)=\dfrac{1}{2}" />, tehát <M t="m=2" />.
          </p>
          <p>
            Az érintő: <M t="y=1+2\left(x-\dfrac{\pi}{4}\right)=2x+1-\dfrac{\pi}{2}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Egy rezgő test helyzete <M t="s(t)=3\sin t - 4\cos t" />. Határozd meg a sebességét (<M t="v" />) és a gyorsulását (<M t="a" />)! Igaz-e itt is, hogy <M t="a(t)=-s(t)" />?
            </>
          }
        >
          <p>
            <M t="v(t)=3\cos t+4\sin t" />, <M t="a(t)=-3\sin t+4\cos t = -(3\sin t-4\cos t) = -s(t)" /> — igen!
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              Határozd meg az <M t="y=x+2\cos x" /> görbe összes <strong>vízszintes érintőjének</strong> <M t="x" />-koordinátáját a <M t="[0;\,2\pi]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="y'=1-2\sin x = 0 \iff \sin x = \dfrac{1}{2}" />.
          </p>
          <p>
            A <M t="[0;\,2\pi]" /> intervallumon két megoldás van: <M t="x=\dfrac{\pi}{6}" /> és <M t="x=\dfrac{5\pi}{6}" />.
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Számítsd ki a <M t="\dfrac{d^{99}}{dx^{99}}(\sin x)" /> és a <M t="\dfrac{d^{102}}{dx^{102}}(\cos x)" /> deriváltakat!
            </>
          }
        >
          <p>
            <M t="99 = 4\cdot 24 + 3" /> (maradék 3) <M t="\Rightarrow (\sin x)^{(99)} = -\cos x" />.
          </p>
          <p>
            <M t="102 = 4\cdot 25 + 2" /> (maradék 2) <M t="\Rightarrow (\cos x)^{(102)} = -\cos x" />.
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Számítsd ki az <M t="y=\sec x\operatorname{tg} x" /> függvény első deriváltját, és írd fel csak <M t="\sec x" /> segítségével (a <M t="\operatorname{tg}^2 x = \sec^2 x - 1" /> azonossággal)!
            </>
          }
        >
          <p>
            Szorzatszabállyal: <M t="y'=\sec x(\sec^2 x)+\operatorname{tg} x(\sec x\operatorname{tg} x)=\sec^3 x + \sec x\operatorname{tg}^2 x" />.
          </p>
          <p>
            Behelyettesítve <M t="\operatorname{tg}^2 x = \sec^2 x - 1" />-et: <M t="y'=\sec^3 x + \sec x(\sec^2 x - 1) = 2\sec^3 x - \sec x" />.
          </p>
        </Task>
      </>
    ),
  },
];
