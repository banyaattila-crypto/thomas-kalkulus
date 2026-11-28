import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  ErrorStrategyDiagram,
  EvenOddZeroTermDiagram,
  LagrangeVsLeibnizWidget,
  PrecisionCalibratorWidget,
  RemainderDecayWidget,
  SmallAngleErrorWidget,
  TaylorProofDiagram,
  TaylorRemainderVisualWidget,
} from '../components/Widgets119';
import type { Page } from './s1_1';

export const S11_9: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Taylor tétele és a Lagrange-féle maradéktag (22. tétel)',
    body: (
      <>
        <Story>
          <p>
            A 11.8 végén láttuk a nyugtalanító ellenpéldát (<M t="e^{-1/x^2}" />): egy függvény Taylor-sora lehet
            konvergens úgy is, hogy <em>nem</em> magához a függvényhez konvergál! Hogyan tudjuk biztosan igazolni, hogy{' '}
            <M t="e^x" />, <M t="\sin x" /> és <M t="\cos x" /> valóban egyenlő a saját Maclaurin-sorával — és hogyan
            mérjük meg pontosan egy véges <M t="P_n(x)" /> polinom közelítési hibáját? Mindkettőre választ ad{' '}
            <strong>Taylor tétele</strong>!
          </p>
        </Story>

        <Def title="Taylor tétele (22. tétel — Lagrange-féle maradéktaggal)">
          <p>
            Ha az <M t="f" /> függvény <M t="(n+1)" />-szer differenciálható egy olyan <M t="I" /> nyílt intervallumon,
            amely tartalmazza az <M t="a" /> pontot, akkor minden <M t="x \in I" /> esetén létezik egy <M t="c" /> szám{' '}
            <M t="a" /> és <M t="x" /> között úgy, hogy:
            <M block t="f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots + \frac{f^{(n)}(a)}{n!}(x-a)^n + R_n(x)," />
            ahol a <strong>Lagrange-féle maradéktag</strong>:
            <M block t="R_n(x) = \frac{f^{(n+1)}(c)}{(n+1)!}(x - a)^{n+1}." />
          </p>
        </Def>

        <p>
          Nézd meg az <M t="n = 0" /> esetet: <M t="f(x) = f(a) + f'(c)(x-a)" /> — ez pontosan a 4.2. szakaszból
          ismert <strong>Lagrange-féle középértéktétel</strong>! Taylor tétele tehát a középértéktétel magasabb rendű
          általánosítása.
        </p>

        <TaylorRemainderVisualWidget />

        <Task n={1} q={<>Írd fel az <M t="f(x) = e^x" /> függvény <M t="a = 0" /> körüli Taylor-formuláját <M t="n = 3" /> rendig a Lagrange-féle maradéktaggal!</>}>
          <p>
            Mivel <M t="f^{(k)}(x) = e^x" /> minden <M t="k" />-ra:
            <M block t="e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{e^c}{4!}x^4," />
            ahol <M t="c" /> a <M t="0" /> és <M t="x" /> közötti valamilyen szám.
          </p>
        </Task>

        <Task n={2} q={<>Írd fel az <M t="f(x) = \ln x" /> függvény <M t="a = 1" /> körüli Taylor-formuláját <M t="n = 2" /> rendig a maradéktaggal együtt!</>}>
          <p>
            <M t="f(1)=0" />, <M t="f'(1)=1" />, <M t="f''(1)=-1" />, és <M t="f'''(t) = 2/t^3" />. Tehát:
            <M block t="\ln x = (x-1) - \frac{(x-1)^2}{2} + \frac{2/c^3}{3!}(x-1)^3 = (x-1) - \frac{(x-1)^2}{2} + \frac{(x-1)^3}{3c^3}," />
            ahol <M t="c" /> az <M t="1" /> és <M t="x" /> között fekszik.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Mikor konvergál a Taylor-sor f(x)-hez? (23. tétel)',
    body: (
      <>
        <p>
          Mivel <M t="f(x) - P_n(x) = R_n(x)" />, a Taylor-sor pontosan akkor és csak akkor konvergál <M t="f(x)" />-hez
          egy adott <M t="x" /> pontban, ha a maradéktag nullához tart:
          <M block t="\lim_{n\to\infty} R_n(x) = 0 \iff f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n." />
          A közbülső <M t="c" /> pontot sosem ismerjük pontosan, de nincs is rá szükség: elég felülről{' '}
          <strong>korlátozni</strong> <M t="|f^{(n+1)}(t)|" />-t az <M t="a" /> és <M t="x" /> közötti szakaszon!
        </p>

        <Def title="Maradéktag-becslési tétel (23. tétel)">
          <p>
            Ha létezik olyan <M t="M > 0" /> és <M t="r > 0" /> konstans, amelyre az <M t="a" /> és <M t="x" /> közötti
            minden <M t="t" /> pontban <M t="|f^{(n+1)}(t)| \le M\,r^{n+1}" />, akkor:
            <M block t="|R_n(x)| \le M \frac{r^{n+1} |x - a|^{n+1}}{(n+1)!}." />
            Mivel minden valós <M t="u" />-ra <M t="\lim_{n\to\infty} \frac{|u|^{n+1}}{(n+1)!} = 0" />, ebből azonnal
            következik, hogy <M t="\lim_{n\to\infty} R_n(x) = 0" />!
          </p>
        </Def>

        <RemainderDecayWidget />

        <Quiz
          q={<>Ha egy <M t="f" /> függvény minden deriváltjára teljesül, hogy <M t="|f^{(n)}(t)| \le 5" /> minden <M t="t \in \mathbb{R}" /> és minden <M t="n \ge 1" /> esetén, mit mondhatunk a Maclaurin-soráról?</>}
          options={[
            { label: <>Csak <M t="|x| < 1" /> esetén konvergál <M t="f(x)" />-hez</> },
            { label: <>Csak <M t="|x| < 5" /> esetén konvergál <M t="f(x)" />-hez</> },
            { label: <>Minden <M t="x \in \mathbb{R}" /> esetén <M t="f(x)" />-hez konvergál</>, ok: true },
            { label: <>Nem dönthető el, mert <M t="5 > 1" /></> },
          ]}
          explain={
            <>
              <M t="|R_n(x)| \le 5 \cdot \frac{|x|^{n+1}}{(n+1)!} \to 0" /> minden rögzített <M t="x \in \mathbb{R}" />{' '}
              esetén, mert a faktoriális minden hatványfüggvényt legyőz!
            </>
          }
        />

        <Task n={3} q={<>Bizonyítsd be a 23. tétellel, hogy a <M t="\sin x" /> Maclaurin-sora minden <M t="x \in \mathbb{R}" /> esetén <M t="\sin x" />-hez konvergál!</>}>
          <p>
            Minden <M t="n" />-re <M t="f^{(n+1)}(t)" /> vagy <M t="\pm\sin t" />, vagy <M t="\pm\cos t" />, ezért{' '}
            <M t="|f^{(n+1)}(t)| \le 1" /> minden <M t="t \in \mathbb{R}" />-re. Így{' '}
            <M t="|R_n(x)| \le \frac{|x|^{n+1}}{(n+1)!} \to 0" /> minden <M t="x \in \mathbb{R}" /> esetén.
          </p>
        </Task>

        <Task n={4} q={<>Igazold, hogy az <M t="e^x" /> Maclaurin-sora minden valós <M t="x" />-re <M t="e^x" />-hez konvergál!</>}>
          <p>
            Rögzítsünk egy tetszőleges <M t="x \in \mathbb{R}" />-t. Ha <M t="x > 0" />, akkor <M t="t \in [0, x]" />{' '}
            esetén <M t="e^t \le e^x" />; ha <M t="x \le 0" />, akkor <M t="t \in [x, 0]" /> esetén <M t="e^t \le 1" />.
            Tehát <M t="M = \max(1, e^x)" /> független <M t="n" />-től, így{' '}
            <M t="|R_n(x)| \le M \frac{|x|^{n+1}}{(n+1)!} \to 0" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Szükséges fokszám meghatározása adott pontossághoz',
    body: (
      <>
        <p>
          A numerikus analízis egyik alapkérdése: <em>hányadik fokú Taylor-polinomot kell vennem, hogy a számológépem
          legalább 4, 6 vagy 10 tizedesjegy pontossággal adja meg <M t="e" />, <M t="\sin(1)" /> vagy{' '}
          <M t="\cos(1)" /> értékét?</em> A 23. tétel pontos garanciát ad!
        </p>

        <PrecisionCalibratorWidget />

        <Steps
          title="Hány tag kell az e szám 10⁻⁵ pontosságú kiszámításához?"
          problem={<>Határozd meg a legkisebb <M t="n" /> fokszámot, amelyre <M t="\left|e - P_n(1)\right| < 10^{-5}" /> biztosan teljesül!</>}
          steps={[
            {
              title: 'Derivált korlátozása [0, 1]-en',
              body: (
                <p>
                  <M t="f^{(n+1)}(t) = e^t" />. A <M t="[0, 1]" /> intervallumon <M t="e^t \le e^1 = e < 3" />, így
                  biztonságos felső korlát az <M t="M = 3" /> (nem használunk körkörösen pontos <M t="e" />-t!).
                </p>
              ),
            },
            {
              title: 'Lagrange-hibakorlát felírása',
              body: (
                <p>
                  <M t="a = 0, x = 1" /> mellett: <M t="|R_n(1)| \le \frac{3\cdot 1^{n+1}}{(n+1)!} = \frac{3}{(n+1)!}" />.
                </p>
              ),
            },
            {
              title: 'Egyenlőtlenség megoldása n-re',
              body: (
                <p>
                  Azt kérjük, hogy <M t="\frac{3}{(n+1)!} < 10^{-5} \iff (n+1)! > 300\,000" />. Próbáljuk ki:{' '}
                  <M t="8! = 40\,320" /> (még kevés), <M t="9! = 362\,880 > 300\,000" /> (elég!).
                </p>
              ),
            },
            {
              title: 'Következtetés',
              body: (
                <p>
                  Mivel <M t="n + 1 = 9" />, már <strong><M t="n = 8" /></strong> (azaz 9 tag: <M t="1 + 1 + \frac{1}{2!} + \dots + \frac{1}{8!}" />)
                  garantálja a <M t="10^{-5}" /> pontosságot! Valóban: <M t="P_8(1) = 2{,}718278\ldots" /> vs.{' '}
                  <M t="e = 2{,}718281\ldots" /> (valódi hiba <M t="\approx 3\cdot 10^{-6}" />).
                </p>
              ),
            },
          ]}
        />

        <Task n={5} q={<>Legalább mekkora <M t="n" /> kell, hogy <M t="\cos(0{,}5)" /> értékét <M t="10^{-4}" /> pontossággal közelítsük Maclaurin-polinommal?</>}>
          <p>
            <M t="|R_n(0{,}5)| \le \frac{(0{,}5)^{n+1}}{(n+1)!}" />. Próbálgatva: <M t="n=3" /> esetén{' '}
            <M t="\frac{0{,}5^4}{24} \approx 0{,}0026" /> (sok), <M t="n=4" /> esetén{' '}
            <M t="\frac{0{,}5^5}{120} \approx 0{,}00026" /> (még sok), <M t="n=5" /> esetén{' '}
            <M t="\frac{0{,}5^6}{720} \approx 2{,}17\cdot 10^{-5} < 10^{-4}" />! Mivel <M t="P_4(x) \equiv P_5(x)" />,
            elég a 4. fokú <M t="1 - \frac{x^2}{2} + \frac{x^4}{24}" /> polinom!
          </p>
        </Task>

        <Task n={6} q={<>Becsüld meg a <M t="\sin(0{,}2) \approx 0{,}2" /> közelítés hibáját!</>}>
          <p>
            Mivel <M t="P_1(x) = P_2(x) = x" />, alkalmazhatjuk az <M t="n = 2" /> korlátot:{' '}
            <M t="|R_2(0{,}2)| \le \frac{0{,}2^3}{3!} = \frac{0{,}008}{6} \approx 0{,}00133" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Csonkolási hiba és mérnöki közelítések (kis szögek)',
    body: (
      <>
        <p>
          A fizikában és mérnöki gyakorlatban lépten-nyomon használják a kis <M t="x" />-ekre szóló egyszerűsítéseket:
          inga mozgásánál <M t="\sin x \approx x" />, optikában <M t="\cos x \approx 1 - \frac{x^2}{2}" />,
          relativitáselméletben <M t="\sqrt{1+x} \approx 1 + \frac{x}{2}" />. Taylor maradéktagja megmondja,{' '}
          <strong>meddig biztonságosak</strong> ezek!
        </p>

        <SmallAngleErrorWidget />

        <EvenOddZeroTermDiagram />

        <Task n={7} q={<>Mekkora a legnagyobb <M t="|x|" /> (radiánban), amelyre a <M t="\sin x \approx x" /> közelítés hibája biztosan kisebb, mint <M t="0{,}001" />?</>}>
          <p>
            Azt kérjük, hogy <M t="\frac{|x|^3}{6} < 0{,}001 \iff |x|^3 < 0{,}006 \iff |x| < \sqrt[3]{0{,}006} \approx 0{,}1817" />{' '}
            radián (kb. <M t="10{,}4^\circ" />).
          </p>
        </Task>

        <Task n={8} q={<>Kicsiny <M t="x" />-ekre használjuk a <M t="\sqrt{1+x} \approx 1 + \frac{x}{2}" /> közelítést. Becsüld meg a hibát <M t="|x| \le 0{,}01" /> esetén!</>}>
          <p>
            <M t="f''(t) = -\frac{1}{4}(1+t)^{-3/2}" />. Ha <M t="|t| \le 0{,}01" />, akkor <M t="1+t \ge 0{,}99" />,
            így <M t="|f''(t)| \le \frac{1}{4\cdot 0{,}99^{3/2}} < 0{,}254" />. Tehát:
            <M block t="|R_1(x)| \le \frac{0{,}254}{2!}(0{,}01)^2 \approx 1{,}27\cdot 10^{-5}." />
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Lagrange-maradéktag vs. Leibniz-hibabecslés',
    body: (
      <>
        <p>
          Most már <strong>két</strong> hibabecslési módszerünk van: a 11.6-os <strong>Leibniz-korlát</strong>{' '}
          (<M t="|R_n| \le u_{n+1}" />, az első elhagyott tag) és a 11.9-es <strong>Lagrange-maradéktag</strong>{' '}
          (<M t="|R_n| \le M \frac{|x-a|^{n+1}}{(n+1)!}" />). Mikor melyiket válasszuk?
        </p>

        <LagrangeVsLeibnizWidget />

        <Quiz
          q={<>Az <M t="e^{0{,}5} \approx 1 + 0{,}5 + \frac{0{,}5^2}{2}" /> közelítés hibáját szeretnéd felülről becsülni. Melyik módszert használhatod?</>}
          options={[
            { label: <>A Leibniz-féle alternáló soros hibabecslést</> },
            { label: <>A Lagrange-féle maradéktag-becslést</>, ok: true },
            { label: <>Mindkettőt, mert az <M t="e^x" /> sora mindig alternáló</> },
            { label: <>Egyiket sem, mert <M t="0{,}5 > 0" /></> },
          ]}
          explain={
            <>
              Pozitív <M t="x = 0{,}5" /> esetén az <M t="e^{0{,}5}" /> sorának minden tagja pozitív — tehát{' '}
              <em>nem</em> alternáló! A Leibniz-korlát itt nem alkalmazható, a Lagrange-maradéktag viszont tökéletesen
              működik (<M t="e^{-0{,}5}" />-nél viszont már mindkettő működne!).
            </>
          }
        />

        <Task n={9} q={<>Becsüld meg az <M t="e^{-0{,}2} \approx 1 - 0{,}2 + \frac{0{,}2^2}{2}" /> közelítés hibáját (a) Leibniz-korláttal, (b) Lagrange-maradéktaggal!</>}>
          <p>
            (a) Mivel <M t="e^{-0{,}2} = 1 - 0{,}2 + \frac{0{,}2^2}{2!} - \frac{0{,}2^3}{3!} + \cdots" /> alternáló és
            tagjai csökkennek, a Leibniz-korlát az első elhagyott tag: <M t="\frac{0{,}2^3}{6} \approx 0{,}001333" />.
            <br />
            (b) Lagrange-maradéktaggal <M t="t \in [-0{,}2, 0]" />-n <M t="|f'''(t)| = e^t \le e^0 = 1" />, így{' '}
            <M t="|R_2(-0{,}2)| \le \frac{1\cdot 0{,}2^3}{3!} \approx 0{,}001333" /> — itt a két korlát pontosan
            megegyezik!
          </p>
        </Task>

        <Task n={10} q={<>Miért ad a Leibniz-korlát sokkal kényelmesebb becslést <M t="\operatorname{arctg}(0{,}5)" /> közelítéséhez, mint a Lagrange-maradéktag?</>}>
          <p>
            Mert az <M t="\operatorname{arctg} x" /> magasabb rendű deriváltjai (<M t="f^{(5)}, f^{(7)}" />) rendkívül
            bonyolult racionális törtek, így <M t="M" /> meghatározása nehézkes; a Maclaurin-sora viszont alternáló,
            így a Leibniz-korlát azonnal megadja: <M t="|R_{2n+1}(0{,}5)| \le \frac{0{,}5^{2n+3}}{2n+3}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Honnan ered Taylor tétele? — A bizonyítás szép ötlete',
    body: (
      <>
        <p>
          Taylor tétele nem „az égből pottyant” — egyszerűen az analízis alaptételére alkalmazott{' '}
          <strong>ismételt parciális integrálás</strong> eredménye! Nézd meg, milyen elegáns a trükk:
        </p>

        <TaylorProofDiagram />

        <Def title="Az integrális maradéktag (bonus)">
          <p>
            Ha <M t="f^{(n+1)}" /> folytonos <M t="a" /> és <M t="x" /> között, akkor az <M t="f(x) - f(a) = \int_a^x f'(t)\,dt" />{' '}
            egyenletet parciálisan integrálva <M t="u = f'(t)" />, <M t="v = -(x - t)" /> választással (<M t="v(x) = 0" />!):
            <M block t="f(x) = f(a) + f'(a)(x-a) + \int_a^x (x - t)f''(t)\,dt." />
            Ezt <M t="n" />-szer megismételve kapjuk az <strong>integrális maradéktagot</strong>:
            <M block t="R_n(x) = \frac{1}{n!}\int_a^x (x - t)^n f^{(n+1)}(t)\,dt." />
            Mivel <M t="(x-t)^n" /> nem vált előjelet <M t="[a, x]" />-en, a súlyozott középértéktétel szerint kihozható{' '}
            <M t="f^{(n+1)}(c)" />, és <M t="\frac{1}{n!}\int_a^x (x-t)^n\,dt = \frac{(x-a)^{n+1}}{(n+1)!}" />!
          </p>
        </Def>

        <Task n={11} q={<>Miért választottuk a parciális integrálásnál <M t="v = t - x" />-et a szokásos <M t="v = t" /> helyett?</>}>
          <p>
            Mert <M t="v'(t) = 1" /> mindkét esetben igaz (egy konstanssal eltolhatjuk a primitív függvényt!), viszont{' '}
            <M t="v = t - x" /> a felső <M t="t = x" /> határnál <strong>nullát ad</strong>, az alsó <M t="t = a" />{' '}
            határnál pedig pont a kívánt <M t="(x - a)" /> tényezőt hozza ki!
          </p>
        </Task>

        <Task n={12} q={<>Ellenőrizd az integrális maradéktagot <M t="n = 0" /> esetén: mit ad vissza?</>}>
          <p>
            <M t="R_0(x) = \frac{1}{0!}\int_a^x (x-t)^0 f'(t)\,dt = \int_a^x f'(t)\,dt = f(x) - f(a)" />, ami pontosan
            a Newton–Leibniz-tétel!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló: hibabecslési iránytű és 4 tipikus hiba',
    body: (
      <>
        <ErrorStrategyDiagram />

        <Warn>
          Négy tipikus hiba Taylor-maradéktag és hibabecslés közben:
          <ol>
            <li>
              <strong>Rossz fokszám a maradéktagban:</strong> <M t="P_n(x)" /> hibája <M t="(n+1)" />-edik deriváltat
              és <M t="(n+1)!" />-t tartalmaz, nem <M t="n" />-ediket!
            </li>
            <li>
              <strong><M t="M" /> csak az <M t="a" /> pontban értékelve:</strong> nem <M t="|f^{(n+1)}(a)|" /> kell,
              hanem a <strong>maximum</strong> az egész <M t="[a, x]" /> (vagy <M t="[x, a]" />) szakaszon!
            </li>
            <li>
              <strong>Leibniz-korlát nem alternáló sorra:</strong> pl. <M t="e^x" /> pozitív <M t="x" />-re nem
              alternál, ott tilos az első elhagyott tagot hibakorlátnak venni!
            </li>
            <li>
              <strong>Fok vs. radián tévesztése:</strong> a <M t="\sin x" /> és <M t="\cos x" /> Taylor-sorai csak{' '}
              <strong>radiánban</strong> igazak! (Pl. <M t="30^\circ" /> helyett <M t="\pi/6 \approx 0{,}5236" />-ot
              kell beírni!)
            </li>
          </ol>
        </Warn>

        <Quiz
          q={<>Az <M t="f(x) = \ln(1+x)" /> függvény <M t="a = 0" /> körüli <M t="P_2(x)" /> polinomjának hibáját becsüljük <M t="x \in [-0{,}2, 0{,}2]" />-n. Melyik pontban veszi fel a maximumát <M t="|f'''(t)| = \frac{2}{(1+t)^3}" />?</>}
          options={[
            { label: <M t="t = 0" /> },
            { label: <M t="t = 0{,}2" /> },
            { label: <M t="t = -0{,}2" />, ok: true },
            { label: <>Konstans az egész intervallumon</> },
          ]}
          explain={
            <>
              A <M t="\frac{2}{(1+t)^3}" /> tört akkor a legnagyobb, amikor a nevezője a legkisebb — vagyis a bal
              végpontban, <M t="t = -0{,}2" />-nél (<M t="M = 2 / 0{,}8^3 \approx 3{,}91" />)!
            </>
          }
        />

        <Task n={13} q={<>Becsüld meg a <M t="\cos(10^\circ) \approx 1 - \frac{x^2}{2}" /> közelítés hibáját!</>}>
          <p>
            Először átváltjuk radiánba: <M t="x = 10^\circ = \frac{\pi}{18} \approx 0{,}1745" />. Mivel a koszinusz
            sorában <M t="P_2 \equiv P_3" />, az <M t="n=3" /> korlátot használjuk:{' '}
            <M t="|R_3(x)| \le \frac{x^4}{4!} \approx \frac{0{,}1745^4}{24} \approx 3{,}9\cdot 10^{-5}" />.
          </p>
        </Task>

        <Task n={14} q={<>Igaz-e, hogy <M t="e^x > 1 + x + \frac{x^2}{2}" /> minden <M t="x > 0" /> esetén? Igazold Taylor tételével!</>}>
          <p>
            Taylor tételével <M t="e^x = 1 + x + \frac{x^2}{2} + \frac{e^c}{6}x^3" />, ahol <M t="0 < c < x" />. Mivel{' '}
            <M t="x > 0" /> és <M t="e^c > 0" />, a maradéktag szigorúan pozitív: <M t="R_2(x) > 0" />, tehát az
            egyenlőtlenség minden <M t="x > 0" />-ra igaz!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Gyakorlófeladatok (könnyű · közepes · nehéz)',
    body: (
      <>
        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Írd fel az <M t="f(x) = \cos x" /> függvény <M t="a = 0" /> körüli <M t="n = 3" /> rendű Taylor-formuláját a Lagrange-maradéktaggal!</>}>
          <p>
            <M t="\cos x = 1 - \frac{x^2}{2!} + \frac{\cos c}{4!}x^4" />, ahol <M t="c" /> a <M t="0" /> és{' '}
            <M t="x" /> között van.
          </p>
        </Task>

        <Task n={16} q={<>Becsüld meg a <M t="\sin x \approx x - \frac{x^3}{6}" /> közelítés hibáját a <M t="[-0{,}5,\; 0{,}5]" /> intervallumon!</>}>
          <p>
            Mivel <M t="P_3 \equiv P_4" />, <M t="|R_4(x)| \le \frac{|x|^5}{5!} \le \frac{0{,}5^5}{120} \approx 0{,}00026" />.
          </p>
        </Task>

        <Task n={17} q={<>Becsüld meg az <M t="e^x \approx 1 + x + \frac{x^2}{2}" /> közelítés hibáját <M t="|x| \le 0{,}1" /> esetén!</>}>
          <p>
            <M t="t \in [-0{,}1, 0{,}1]" />-en <M t="e^t \le e^{0{,}1} < 1{,}2" /> (vagy egyszerűen <M t="< 2" />).
            Így <M t="|R_2(x)| \le \frac{1{,}2 \cdot 0{,}1^3}{6} = 0{,}0002" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Mekkora <M t="n" /> fokszám kell, hogy <M t="\sin(1)" /> értékét <M t="10^{-6}" /> pontossággal számítsuk ki Maclaurin-polinommal?</>}>
          <p>
            <M t="|R_n(1)| \le \frac{1}{(n+1)!} < 10^{-6} \iff (n+1)! > 1\,000\,000" />. Mivel <M t="9! = 362\,880" /> és{' '}
            <M t="10! = 3\,628\,800 > 10^6" />, kell <M t="n + 1 = 10 \implies n = 9" /> (azaz <M t="P_9(1) = 1 - \frac{1}{3!} + \frac{1}{5!} - \frac{1}{7!} + \frac{1}{9!}" />).
          </p>
        </Task>

        <Task n={19} q={<>Becsüld meg a <M t="\ln(1+x) \approx x - \frac{x^2}{2}" /> közelítés hibáját a <M t="[0,\; 0{,}2]" /> intervallumon!</>}>
          <p>
            Mindkét módszerrel: <M t="f'''(t) = \frac{2}{(1+t)^3} \le 2" /> a <M t="[0, 0{,}2]" />-n, így{' '}
            <M t="|R_2(x)| \le \frac{2\cdot 0{,}2^3}{3!} = \frac{0{,}008}{3} \approx 0{,}00267" /> (a Leibniz-korlát is
            pontosan <M t="0{,}2^3/3" />!).
          </p>
        </Task>

        <Task n={20} q={<>Bizonyítsd be Taylor tételével, hogy a <M t="\operatorname{ch} x" /> Maclaurin-sora minden <M t="x \in \mathbb{R}" />-re <M t="\operatorname{ch} x" />-hez konvergál!</>}>
          <p>
            Rögzített <M t="x" />-re a <M t="[-|x|, |x|]" /> intervallumon minden derivált (<M t="\operatorname{ch} t" />{' '}
            vagy <M t="\operatorname{sh} t" />) abszolút értéke legfeljebb <M t="M = \operatorname{ch}|x|" />. Így{' '}
            <M t="|R_n(x)| \le \operatorname{ch}|x| \cdot \frac{|x|^{n+1}}{(n+1)!} \to 0" />.
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Igazold Taylor tételével, hogy <M t="e" /> irracionális szám! (Útmutatás: tételezd fel, hogy <M t="e = p/q" />, és szorozd meg <M t="q!" />-sal az <M t="e = P_q(1) + R_q(1)" /> egyenletet!)</>}>
          <p>
            Ha <M t="e = \frac{p}{q}" /> (<M t="q \ge 2" />), akkor <M t="e = \sum_{k=0}^q \frac{1}{k!} + \frac{e^c}{(q+1)!}" />{' '}
            (<M t="0 < c < 1" />). Szorozzuk meg mindkét oldalt <M t="q!" />-sal: a bal oldal (<M t="p(q-1)!" />) és a
            szumma minden tagja egész szám, tehát a maradék <M t="q! R_q(1) = \frac{e^c}{q+1}" /> is egész kellene hogy
            legyen! Viszont <M t="0 < \frac{e^c}{q+1} < \frac{3}{3} = 1" /> — 0 és 1 között nincs egész szám, ellentmondás!
          </p>
        </Task>

        <Task n={22} q={<>Mutasd meg, hogy minden <M t="x > 0" /> esetén <M t="x - \frac{x^3}{6} < \sin x < x" />!</>}>
          <p>
            Taylor tételével: <M t="\sin x = x - \frac{\cos c_1}{6}x^3" /> (<M t="0 < c_1 < x" />). Ha <M t="x \in (0, \pi/2)" />,
            <M t="\cos c_1 > 0 \implies \sin x < x" /> (ha <M t="x \ge \pi/2 > 1" />, nyilván <M t="\sin x \le 1 < x" />).
            Másrészt <M t="\sin x = x - \frac{x^3}{6} + \frac{\cos c_2}{120}x^5" />, ami <M t="x \in (0, \pi/2)" />-n
            szigorúan nagyobb <M t="x - x^3/6" />-nál (nagyobb <M t="x" />-re pedig <M t="x - x^3/6 < -1 \le \sin x" /> ellenőrizhető, vagy integrálással <M t="\cos t > 1 - t^2/2" />-ből is azonnal adódik!).
          </p>
        </Task>

        <Task n={23} q={<>Határozd meg a <M t="\sqrt[3]{1 + x}" /> függvény <M t="a = 0" /> körüli <M t="P_2(x)" /> polinomját, és adj felső korlátot a hibára <M t="x \in [0,\; 0{,}1]" /> esetén!</>}>
          <p>
            <M t="f(0) = 1" />, <M t="f'(0) = \frac{1}{3}" />, <M t="f''(0) = -\frac{2}{9}" />, így{' '}
            <M t="P_2(x) = 1 + \frac{1}{3}x - \frac{1}{9}x^2" />. A 3. derivált{' '}
            <M t="f'''(t) = \frac{10}{27}(1+t)^{-8/3}" />, amely <M t="[0, 0{,}1]" />-en legfeljebb{' '}
            <M t="M = \frac{10}{27}" /> (a <M t="t=0" /> helyen!). Így:
            <M block t="|R_2(x)| \le \frac{10/27}{6}(0{,}1)^3 = \frac{5}{81}\cdot 10^{-3} \approx 6{,}17\cdot 10^{-5}." />
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Mi az <M t="e^{i\pi/2}" /> kifejezés értéke az Euler-képlet szerint?
            </>
          }
          options={[
            { label: <M t="i" />, ok: true },
            { label: <M t="-1" /> },
            { label: <M t="1" /> },
            { label: <M t="-i" /> },
          ]}
          explain={
            <>
              <M t="e^{i\pi/2} = \cos(\pi/2) + i\sin(\pi/2) = 0 + i\cdot 1 = i" />.
            </>
          }
        />
      </>
    ),
  },
];
