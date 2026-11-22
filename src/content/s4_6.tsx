import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  EulerLimitWidget,
  IndeterminateMapDiagram,
  LHospitalZoomWidget,
  StepByStepLHospitalWidget,
  TrapDetectorWidget,
} from '../components/Widgets46';
import type { Page } from './s1_1';

export const S4_6: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Miért működik a L’Hospital-szabály? (A nagyító-bizonyítás)',
    body: (
      <>
        <Story>
          <p>
            1696-ban jelent meg a világ első nyomtatott kalkulus-tankönyve, Guillaume de L’Hospital márki tollából — benne egy zseniális szabály, amelyet valójában a svájci matematikus, <strong>Johann Bernoulli</strong> fedezett fel (és fizetségért cserébe átengedett a márkinak!). A <strong>L’Hospital-szabály</strong> a határérték-számítás svájci bicskája: a makacs <M t="\frac{0}{0}" /> és <M t="\frac{\infty}{\infty}" /> alakokat pillanatok alatt elintézi deriválással!
          </p>
        </Story>
        <p>
          <strong>De MIÉRT működik?</strong> Emlékezz a 3.8-ból a <em>linearizációra</em>! Ha <M t="f(a)=0" /> és <M t="g(a)=0" />, akkor <M t="x=a" /> közvetlen közelében mindkét görbe szinte azonos az érintőegyenesével:
        </p>
        <M block t="f(x) \approx f'(a)(x-a), \qquad g(x) \approx g'(a)(x-a) \;\Longrightarrow\; \frac{f(x)}{g(x)} \approx \frac{f'(a)(x-a)}{g'(a)(x-a)} = \frac{f'(a)}{g'(a)}!" />
        <Def title="L’Hospital-szabály (első, egyszerű alak)">
          <p>
            Ha <M t="f(a) = g(a) = 0" />, <M t="f" /> és <M t="g" /> differenciálható <M t="x=a" />-ban, és <M t="g'(a) \ne 0" />, akkor:
          </p>
          <M block t="\lim_{x\to a}\frac{f(x)}{g(x)} = \frac{f'(a)}{g'(a)}." />
        </Def>
        <LHospitalZoomWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Számítsd ki L’Hospital-szabállyal: <M t="\lim_{x\to 0}\dfrac{\sin(5x)}{3x}" />!
            </>
          }
        >
          <p>
            <M t="0/0" /> alak! Külön deriválva a számlálót és a nevezőt: <M t="\lim_{x\to 0}\dfrac{5\cos(5x)}{3} = \dfrac{5\cdot 1}{3} = \dfrac{5}{3}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Számítsd ki L’Hospital-szabállyal: <M t="\lim_{x\to 2}\dfrac{x^2 - 4}{x^3 - 8}" />!
            </>
          }
        >
          <p>
            <M t="0/0" /> alak! Deriválva: <M t="\lim_{x\to 2}\dfrac{2x}{3x^2} = \dfrac{4}{12} = \dfrac{1}{3}" />. (Mennyivel gyorsabb, mint a szorzattá bontás!)
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Az erős L’Hospital-szabály és a Cauchy-középértéktétel',
    body: (
      <>
        <p>
          Mi történik, ha <M t="f'(a)=g'(a)=0" /> is, vagy ha <M t="x\to\pm\infty" />, vagy ha a hányados <M t="\frac{\infty}{\infty}" /> alakú? A szabály ekkor is működik! A szigorú bizonyítás kulcsa a Lagrange-tétel általánosítása:
        </p>
        <Def title="Cauchy-féle középértéktétel">
          <p>
            Ha <M t="f" /> és <M t="g" /> folytonos <M t="[a;\,b]" />-n, differenciálható <M t="(a;\,b)" />-n és <M t="g'(x)\ne 0" /> az <M t="(a;\,b)" /> intervallumon, akkor létezik <M t="c \in (a;\,b)" />, amelyre:
          </p>
          <M block t="\frac{f'(c)}{g'(c)} = \frac{f(b)-f(a)}{g(b)-g(a)}." />
        </Def>
        <p>
          Ha <M t="f(a)=g(a)=0" /> és <M t="b=x" />, akkor ebből azonnal adódik <M t="\dfrac{f(x)}{g(x)} = \dfrac{f'(c)}{g'(c)}" /> (ahol <M t="c" /> az <M t="a" /> és <M t="x" /> között van, tehát ha <M t="x\to a" />, akkor <M t="c\to a" /> is!). Ebből kapjuk a teljes, általános szabályt:
        </p>
        <Def title="Erős L’Hospital-szabály (0/0 és ∞/∞ alakokra)">
          <p>
            Ha <M t="\lim_{x\to a}\dfrac{f(x)}{g(x)}" /> (ahol <M t="a" /> lehet valós szám, <M t="a^+" />, <M t="a^-" />, <M t="+\infty" /> vagy <M t="-\infty" />) határozatlan <strong><M t="\frac{0}{0}" /></strong> vagy <strong><M t="\frac{\infty}{\infty}" /></strong> alakú, és létezik <M t="\lim_{x\to a}\dfrac{f'(x)}{g'(x)}" /> (véges szám vagy <M t="\pm\infty" />), akkor:
          </p>
          <M block t="\lim_{x\to a}\frac{f(x)}{g(x)} = \lim_{x\to a}\frac{f'(x)}{g'(x)}." />
        </Def>
        <p>
          Ha az első deriválás után <em>még mindig</em> <M t="\frac{0}{0}" /> vagy <M t="\frac{\infty}{\infty}" /> alakot kapsz, nyugodtan <strong>alkalmazhatod újra</strong> — de minden egyes lépés előtt ellenőrizd a feltételt, és amint megszűnik a határozatlan alak, <strong>azonnal állj meg</strong>!
        </p>
        <StepByStepLHospitalWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to 0}\dfrac{\operatorname{tg} x - x}{x^3}" />!
            </>
          }
        >
          <p>
            <M t="0/0 \xrightarrow{\text{L’H}} \lim\dfrac{\sec^2 x - 1}{3x^2} = \lim\dfrac{\operatorname{tg}^2 x}{3x^2} = \dfrac{1}{3}\cdot 1^2 = \dfrac{1}{3}" />! (Vagy még két L’Hospital-lépéssel is <M t="\frac{1}{3}" />.)
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to\infty}\dfrac{4x^2 - 7x + 1}{2x^2 + 3x - 5}" /> L’Hospital-szabállyal!
            </>
          }
        >
          <p>
            <M t="\frac{\infty}{\infty} \xrightarrow{\text{L’H}} \lim\dfrac{8x-7}{4x+3} \xrightarrow{\frac{\infty}{\infty}} \lim\dfrac{8}{4} = 2" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Mikor TILOS L’Hospital-szabályt használni? A 3 csapda',
    body: (
      <>
        <p>
          A L’Hospital-szabály olyan kényelmes, hogy sokan reflexből minden törtre ráeresztik — és belesétálnak a három klasszikus csapda egyikébe! Nézd meg mindhármat, hogy te soha ne hibázz:
        </p>
        <TrapDetectorWidget />
        <p>
          <strong>Aranyszabály:</strong> minden egyes L’Hospital-lépés előtt <em>hangosan</em> (vagy a papírra zárójelben) ellenőrizd: „Valóban <M t="\frac{0}{0}" /> vagy <M t="\frac{\infty}{\infty}" />?” És ha egy egyszerűsítés (pl. <M t="\cos x" /> behelyettesítése, <M t="x" />-szel osztás) könnyebb, mindig az algebrai egyszerűsítés az első!
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Mi a hiba az alábbi „megoldásban”: <M t="\lim_{x\to 1}\dfrac{x^2+1}{x+1} = \lim_{x\to 1}\dfrac{2x}{1} = 2" />? Mennyi a helyes határérték?
            </>
          }
        >
          <p>
            A tört <M t="x=1" />-nél <strong>nem <M t="0/0" /> alakú</strong>, hanem <M t="\dfrac{2}{2} = 1" />! Közvetlen behelyettesítéssel a helyes válasz <M t="1" />!
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Számítsd ki ügyesen (L’Hospital nélkül!): <M t="\lim_{x\to\infty}\dfrac{2x - \cos x}{5x + 3}" />!
            </>
          }
        >
          <p>
            Ha L’Hospitalt használnál, <M t="\lim\dfrac{2+\sin x}{5}" /> oszcillálna! Viszont <M t="x" />-szel elosztva: <M t="\lim_{x\to\infty}\dfrac{2 - (\cos x)/x}{5 + 3/x} = \dfrac{2 - 0}{5 + 0} = \dfrac{2}{5}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Határozatlan szorzatok (0 · ∞) és különbségek (∞ − ∞)',
    body: (
      <>
        <p>
          A L’Hospital-szabály <em>közvetlenül</em> csak a <M t="\frac{0}{0}" /> és a <M t="\frac{\infty}{\infty}" /> hányadosokra működik. Mi a teendő, ha szorzat (<M t="0\cdot\infty" />) vagy különbség (<M t="\infty-\infty" />) jelenik meg? <strong>Alakítsd át törtté!</strong>
        </p>
        <IndeterminateMapDiagram />
        <ul>
          <li>
            <strong>1. Szorzat (<M t="0\cdot\infty" />):</strong> írd át <M t="f\cdot g = \dfrac{f}{1/g}" /> vagy <M t="\dfrac{g}{1/f}" /> alakra (azt tedd a nevezőbe, amelyiknek egyszerűbb a deriváltja!).
            <br />
            <em>Példa:</em> <M t="\lim_{x\to\infty} x\sin\left(\dfrac{1}{x}\right)" /> (<M t="\infty\cdot 0" />). Írjuk át:
            <M block t="\lim_{x\to\infty}\frac{\sin(1/x)}{1/x} \;\xrightarrow{\;0/0\;}\; \lim_{x\to\infty}\frac{\cos(1/x)\cdot(-1/x^2)}{-1/x^2} = \lim_{x\to\infty}\cos(1/x) = 1!" />
          </li>
          <li>
            <strong>2. Különbség (<M t="\infty - \infty" />):</strong> hozz közös nevezőre, emelj ki, vagy szorozz konjugálttal!
            <br />
            <em>Példa:</em> <M t="\lim_{x\to 0^+}\left(\dfrac{1}{\sin x}-\dfrac{1}{x}\right)" /> (<M t="\infty-\infty" />). Közös nevezővel:
            <M block t="\lim_{x\to 0^+}\frac{x-\sin x}{x\sin x} \;\xrightarrow{\;0/0\;}\; \lim_{x\to 0^+}\frac{1-\cos x}{\sin x + x\cos x} \;\xrightarrow{\;0/0\;}\; \lim_{x\to 0^+}\frac{\sin x}{2\cos x - x\sin x} = \frac{0}{2} = 0!" />
          </li>
        </ul>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to 0^+} x\operatorname{ctg}(2x)" />!
            </>
          }
        >
          <p>
            <M t="0\cdot\infty" /> alak. Írjuk törtbe: <M t="\lim_{x\to 0^+}\dfrac{x}{\operatorname{tg}(2x)} \xrightarrow{0/0} \lim_{x\to 0^+}\dfrac{1}{2\sec^2(2x)} = \dfrac{1}{2}" />!
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to 1}\left(\dfrac{1}{x-1} - \dfrac{2}{x^2-1}\right)" />!
            </>
          }
        >
          <p>
            <M t="\infty-\infty" /> alak. Közös nevező (<M t="x^2-1=(x-1)(x+1)" />): <M t="\lim_{x\to 1}\dfrac{(x+1)-2}{x^2-1} = \lim_{x\to 1}\dfrac{x-1}{x^2-1} = \lim_{x\to 1}\dfrac{1}{x+1} = \dfrac{1}{2}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Előretekintés: határozatlan hatványok (1^∞, 0^0, ∞^0)',
    body: (
      <>
        <p>
          A 7 határozatlan alak utolsó három tagja a <strong>hatványalak</strong>: <M t="1^\infty" />, <M t="0^0" /> és <M t="\infty^0" />. Sokan meglepődnek: „Miért nem 1 az <M t="1^\infty" />?” Mert itt az alap <em>nem pontosan</em> 1, csak 1-hez tart, miközben a kitevő a végtelenbe szalad — a kettő versenyétől függ az eredmény!
        </p>
        <EulerLimitWidget />
        <Def title="A 3 lépéses logaritmus-trükk (teljes kidolgozás a 7. fejezetben!)">
          <p>
            Ha <M t="\lim f(x)^{g(x)}" /> alakja <M t="1^\infty" />, <M t="0^0" /> vagy <M t="\infty^0" />:
          </p>
          <ol>
            <li>Vegyük a természetes logaritmust: <M t="\ln y = \ln\bigl(f(x)^{g(x)}\bigr) = g(x)\cdot\ln f(x)" /> (ez már <M t="0\cdot\infty" /> alak!).</li>
            <li>Számítsuk ki <M t="L = \lim \ln y" /> értékét L’Hospital-szabállyal (miután a 7. fejezetben megtanultuk <M t="(\ln x)' = 1/x" />-et).</li>
            <li>Ne felejts el <strong>visszaalakítani</strong>: ha <M t="\ln y \to L" />, akkor <M t="y = e^{\ln y} \to \mathbf{e^L}" />!</li>
          </ol>
        </Def>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Döntsd el az alábbiakról, melyik határozatlan alak és melyik NEM az: (a) <M t="0^\infty" />, (b) <M t="0^0" />, (c) <M t="1^\infty" />, (d) <M t="\infty^\infty" />!
            </>
          }
        >
          <p>
            (a) <strong>NEM határozatlan</strong> (<M t="0" />-hoz tartó szám nagy hatványa még gyorsabban <M t="0" />!). (b) <strong>Határozatlan!</strong> (c) <strong>Határozatlan!</strong> (d) <strong>NEM határozatlan</strong> (nagy szám nagy hatványa biztosan <M t="+\infty" />!).
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Ha a logaritmus-trükk végén azt kapod, hogy <M t="\lim \ln y = 0" />, akkor mennyi az eredeti <M t="\lim y" /> határérték?
            </>
          }
        >
          <p>
            <M t="\lim y = e^0 = \mathbf{1}" /> (és NEM 0 — ez a leggyakoribb elrontás a hatványalakoknál!).
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
              <th>alak</th>
              <th>eljárás</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><M t="\frac{0}{0}" /> vagy <M t="\frac{\infty}{\infty}" /></td>
              <td>L’Hospital: <M t="\lim \frac{f}{g} = \lim \frac{f'}{g'}" /> (külön deriválva!)</td>
            </tr>
            <tr>
              <td><M t="0\cdot\infty" /></td>
              <td>Törtbe írás: <M t="\frac{f}{1/g}" /> vagy <M t="\frac{g}{1/f}" /></td>
            </tr>
            <tr>
              <td><M t="\infty - \infty" /></td>
              <td>Közös nevező, kiemelés vagy konjugált szorzás</td>
            </tr>
            <tr>
              <td><M t="1^\infty,\; 0^0,\; \infty^0" /></td>
              <td><M t="\ln y = g\ln f \to L \;\Longrightarrow\; y \to e^L" /></td>
            </tr>
          </tbody>
        </table>
        <h3>Négy klasszikus hiba</h3>
        <Warn>
          <p>
            <strong>1. Hányadosszabály alkalmazása L’Hospital helyett!</strong> A L’Hospital-szabályban <strong>KÜLÖN</strong> deriválod a számlálót és <strong>KÜLÖN</strong> a nevezőt: <M t="\dfrac{f'(x)}{g'(x)}" />, és NEM a tört deriváltját (<M t="\frac{f'g-fg'}{g^2}" />) veszed!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. Túl-deriválás:</strong> amint a tört már nem <M t="0/0" /> vagy <M t="\infty/\infty" />, TILOS tovább deriválni! Minden lépés után ellenőrizz behelyettesítéssel!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Nem határozatlan alakok deriválása:</strong> <M t="\frac{0}{\infty}=0" />, <M t="\frac{5}{0^+}=+\infty" />, <M t="\infty+\infty=\infty" /> — ezekre tilos L’Hospitalt alkalmazni!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Körbejárás elfelejtése:</strong> ha a deriválás nem egyszerűsít, hanem bonyolít vagy ismétlődik (pl. <M t="x/\sqrt{x^2+1}" />), válts algebrai módszerre!
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
              Számítsd ki: <M t="\lim_{x\to 3}\dfrac{x^2 - 9}{x^2 - x - 6}" />!
            </>
          }
        >
          <p>
            <M t="0/0 \xrightarrow{\text{L’H}} \lim_{x\to 3}\dfrac{2x}{2x-1} = \dfrac{6}{5}" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to 0}\dfrac{\sin(4x)}{\sin(7x)}" />!
            </>
          }
        >
          <p>
            <M t="0/0 \xrightarrow{\text{L’H}} \lim_{x\to 0}\dfrac{4\cos(4x)}{7\cos(7x)} = \dfrac{4}{7}" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to 0}\dfrac{\sqrt{1+x}-1}{x}" />!
            </>
          }
        >
          <p>
            <M t="0/0 \xrightarrow{\text{L’H}} \lim_{x\to 0}\dfrac{\frac{1}{2\sqrt{1+x}}}{1} = \dfrac{1}{2}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to 0}\dfrac{1-\cos(2x)}{x^2}" />!
            </>
          }
        >
          <p>
            <M t="0/0 \xrightarrow{\text{L’H}} \lim_{x\to 0}\dfrac{2\sin(2x)}{2x} \xrightarrow{0/0} \lim_{x\to 0}\dfrac{4\cos(2x)}{2} = 2" />.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to \pi/2}\dfrac{\cos x}{x - \pi/2}" />!
            </>
          }
        >
          <p>
            <M t="0/0 \xrightarrow{\text{L’H}} \lim_{x\to \pi/2}\dfrac{-\sin x}{1} = -1" />.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to 0^+}\dfrac{\sin x}{\sqrt{x}}" />!
            </>
          }
        >
          <p>
            <M t="0/0 \xrightarrow{\text{L’H}} \lim_{x\to 0^+}\dfrac{\cos x}{\frac{1}{2\sqrt{x}}} = \lim_{x\to 0^+} 2\sqrt{x}\cos x = 0" />.
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to 0}\dfrac{x - \sin x}{x - \operatorname{tg} x}" />!
            </>
          }
        >
          <p>
            1) <M t="0/0 \xrightarrow{\text{L’H}} \lim\dfrac{1-\cos x}{1-\sec^2 x} = \lim\dfrac{1-\cos x}{-\operatorname{tg}^2 x}" />.
          </p>
          <p>
            Mivel <M t="\operatorname{tg}^2 x = \dfrac{\sin^2 x}{\cos^2 x} = \dfrac{1-\cos^2 x}{\cos^2 x} = \dfrac{(1-\cos x)(1+\cos x)}{\cos^2 x}" />, egyszerűsítve: <M t="\lim_{x\to 0}\dfrac{-\cos^2 x}{1+\cos x} = -\dfrac{1}{2}" />!
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to \pi/2^-}(\sec x - \operatorname{tg} x)" />!
            </>
          }
        >
          <p>
            <M t="\infty-\infty" /> alak. Közös nevezővel: <M t="\lim_{x\to \pi/2^-}\dfrac{1-\sin x}{\cos x} \xrightarrow{0/0} \lim_{x\to \pi/2^-}\dfrac{-\cos x}{-\sin x} = \dfrac{0}{1} = 0" />!
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Számítsd ki a <M t="k" /> valós paraméter értékét úgy, hogy <M t="\lim_{x\to 0}\dfrac{\sin(2x) + kx}{x^3}" /> véges legyen, és add meg ezt a határértéket!
            </>
          }
        >
          <p>
            1. L’Hospital (<M t="0/0" />): <M t="\lim_{x\to 0}\dfrac{2\cos(2x)+k}{3x^2}" />. Ahhoz, hogy ez véges lehessen (ne <M t="\pm\infty" />), a számlálónak is <M t="0" />-hoz kell tartania: <M t="2(1)+k=0 \Rightarrow \mathbf{k=-2}" />!
          </p>
          <p>
            Ekkor még kétszer L’Hospital: <M t="\lim\dfrac{-4\sin(2x)}{6x} \xrightarrow{0/0} \lim\dfrac{-8\cos(2x)}{6} = -\dfrac{4}{3}" />!
          </p>
        </Task>
      </>
    ),
  },
];
