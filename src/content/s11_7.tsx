import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  CauchyProductDiagram,
  EndpointTesterWidget,
  GeometricPowerSeriesWidget,
  PowerSeriesToolkitDiagram,
  RadiusOfConvergenceWidget,
  SeriesSubstitutionDiagram,
  TermByTermDiffWidget,
  TermByTermIntWidget,
} from '../components/Widgets117';
import type { Page } from './s1_1';

export const S11_7: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Hatványsorok és a mértani alapsor',
    body: (
      <>
        <Story>
          <p>
            Eddig (11.2–11.6) állandó számokból álló végtelen sorokat adtunk össze. Most szintet lépünk: minden tagban
            megjelenik az <M t="x" /> változó egy hatványa! A <strong>hatványsorok</strong> olyan „végtelen fokszámú
            polinomok”, amelyekkel bonyolult függvényeket (<M t="e^x" />, <M t="\ln(1+x)" />,{' '}
            <M t="\operatorname{arctg} x" />) tudunk kiszámítani, deriválni és integrálni.
          </p>
        </Story>

        <Def title="Hatványsor fogalma">
          <p>
            Az <M t="x = 0" /> körüli (origó középpontú) hatványsor alakja:
            <M block t="\sum_{n=0}^{\infty} c_n x^n = c_0 + c_1 x + c_2 x^2 + c_3 x^3 + \cdots" />
            Az <M t="x = a" /> <strong>középpontú</strong> hatványsor alakja:
            <M block t="\sum_{n=0}^{\infty} c_n (x - a)^n = c_0 + c_1(x - a) + c_2(x - a)^2 + \cdots" />
            ahol a <M t="c_0, c_1, c_2, \ldots" /> valós számok a sor <strong>együtthatói</strong>, és megállapodás
            szerint <M t="(x-a)^0 = 1" /> (még <M t="x=a" /> esetén is).
          </p>
        </Def>

        <p>
          Az összes hatványsor „ősanyja” a mértani sorból adódik (<M t="r = x" />):
          <M block t="\frac{1}{1 - x} = 1 + x + x^2 + x^3 + \cdots = \sum_{n=0}^{\infty} x^n \qquad (|x| < 1)." />
          Az <M t="N" />-edik részletösszeg <M t="P_N(x) = 1 + x + \cdots + x^N" /> egy <M t="N" />-edfokú polinom. A
          lenti ábrán mozgasd <M t="N" />-et, és nézd meg, hogyan simul rá <M t="P_N(x)" /> a függvényre a{' '}
          <M t="(-1, 1)" /> sávban!
        </p>

        <GeometricPowerSeriesWidget />

        <Task n={1} q={<>Írd fel a <M t="\frac{1}{1+x}" /> függvény hatványsorát az <M t="x=0" /> körül, és add meg a konvergenciatartományát!</>}>
          <p>
            Írjuk át <M t="\frac{1}{1 - (-x)}" /> alakra, és helyettesítsünk <M t="-x" />-et a mértani sorba:
            <M block t="\frac{1}{1+x} = \sum_{n=0}^{\infty} (-x)^n = \sum_{n=0}^{\infty} (-1)^n x^n = 1 - x + x^2 - x^3 + \cdots" />
            Akkor konvergens, ha <M t="|-x| < 1 \iff |x| < 1" />, azaz <M t="x \in (-1, 1)" />.
          </p>
        </Task>

        <Task n={2} q={<>Mely <M t="x" /> értékekre konvergens a <M t="\sum_{n=0}^\infty \left(\frac{x-1}{2}\right)^n" /> hatványsor, és mi az összege?</>}>
          <p>
            Ez mértani sor <M t="r = \frac{x-1}{2}" /> hányadossal. Konvergens, ha{' '}
            <M t="\left|\frac{x-1}{2}\right| < 1 \iff |x-1| < 2 \iff x \in (-1, 3)" />. Az összege ezen az intervallumon:
            <M block t="S(x) = \frac{1}{1 - \frac{x-1}{2}} = \frac{2}{3 - x}." />
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Konvergenciasugár és konvergenciaintervallum (18. tétel)',
    body: (
      <>
        <p>
          Egy hatványsor nem konvergálhat „összevissza” halmazon — a konvergencia halmaza mindig egy az <M t="a" />{' '}
          középpontra <strong>szimmetrikus intervallum</strong>! Ezt mondja ki a hatványsorok alaptétele.
        </p>

        <Def title="Hatványsorok konvergenciatétele (18. tétel)">
          <p>
            Minden <M t="\sum_{n=0}^{\infty} c_n (x - a)^n" /> hatványsorra pontosan az alábbi három eset egyike áll fenn:
          </p>
          <ol>
            <li>
              <strong><M t="R = 0" />:</strong> a sor csak a középpontban (<M t="x = a" />) konvergens.
            </li>
            <li>
              <strong><M t="0 < R < \infty" />:</strong> létezik egy egyértelmű <M t="R > 0" />{' '}
              <strong>konvergenciasugár</strong>, amelyre a sor <em>abszolút konvergens</em> minden{' '}
              <M t="|x - a| < R" /> esetén, és <em>divergens</em> minden <M t="|x - a| > R" /> esetén. A két végpontban
              (<M t="x = a - R" /> és <M t="x = a + R" />) a sor lehet konvergens is, divergens is.
            </li>
            <li>
              <strong><M t="R = \infty" />:</strong> a sor minden valós <M t="x \in (-\infty, \infty)" /> értékre
              abszolút konvergens.
            </li>
          </ol>
        </Def>

        <RadiusOfConvergenceWidget />

        <Quiz
          q={<>Tudjuk, hogy egy <M t="x = 3" /> középpontú hatványsor konvergens <M t="x = 7" />-ben és divergens <M t="x = -2" />-ben. Mit állíthatunk biztosan a konvergenciasugárról (<M t="R" />)?</>}
          options={[
            { label: <><M t="R = 4" /> pontosan</> },
            { label: <M t="4 \le R \le 5" />, ok: true },
            { label: <M t="R > 5" /> },
            { label: <M t="0 < R < 4" /> },
          ]}
          explain={
            <>
              A középponttól való távolságok: <M t="|7 - 3| = 4" /> (itt konvergens <M t="\Rightarrow R \ge 4" />) és{' '}
              <M t="|-2 - 3| = 5" /> (itt divergens <M t="\Rightarrow R \le 5" />). Tehát <M t="4 \le R \le 5" />.
            </>
          }
        />

        <Task n={3} q={<>Ha a <M t="\sum c_n (x+1)^n" /> sor konvergens <M t="x = 2" />-ben, konvergens-e biztosan <M t="x = -3" />-ban?</>}>
          <p>
            A középpont <M t="a = -1" />. Az <M t="x = 2" /> pont távolsága <M t="|2 - (-1)| = 3" />, tehát{' '}
            <M t="R \ge 3" />. Mivel <M t="|-3 - (-1)| = 2 < 3 \le R" />, az <M t="x = -3" /> pont szigorúan a
            konvergenciaintervallum belsejében van, így a sor itt <strong>biztosan abszolút konvergens</strong>.
          </p>
        </Task>

        <Task n={4} q={<>Mi a konvergenciasugara a <M t="\sum_{n=0}^\infty \frac{x^n}{n!}" /> és a <M t="\sum_{n=0}^\infty n! x^n" /> soroknak?</>}>
          <p>
            Az elsőnél hányadoskritériummal:{' '}
            <M t="\lim_{n\to\infty} \left|\frac{x^{n+1}/(n+1)!}{x^n/n!}\right| = \lim \frac{|x|}{n+1} = 0 < 1" />{' '}
            minden <M t="x" />-re, így <M t="R = \infty" />. A másodiknál <M t="\lim (n+1)|x| = \infty" /> minden{' '}
            <M t="x \ne 0" />-ra, tehát <M t="R = 0" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Konvergenciaintervallum meghatározása és végpontvizsgálat',
    body: (
      <>
        <p>
          A gyakorlatban a <strong>kiterjesztett hányados- vagy gyökkritérium</strong> (11.6) megadja a nyílt{' '}
          <M t="(a-R, a+R)" /> belsejét, de a két végpontban mindig <M t="\rho = 1" /> adódik — ott már az előző
          szakaszok tesztjeire (<M t="n" />-edik tag teszt, <M t="p" />-sor, Leibniz-tétel) van szükség!
        </p>

        <EndpointTesterWidget />

        <Steps
          title="Konvergenciaintervallum és végpontok meghatározása"
          problem={<>Határozd meg a <M t="\sum_{n=1}^{\infty} \frac{(x - 2)^n}{n \cdot 3^n}" /> hatványsor konvergenciasugarát és teljes konvergenciaintervallumát!</>}
          steps={[
            {
              title: 'Hányadoskritérium felírása',
              body: (
                <p>
                  Legyen <M t="a_n = \frac{(x-2)^n}{n\cdot 3^n}" />. Ekkor:
                  <M block t="\rho = \lim_{n\to\infty}\left|\frac{a_{n+1}}{a_n}\right| = \lim_{n\to\infty} \frac{|x-2|}{3}\cdot\frac{n}{n+1} = \frac{|x-2|}{3}." />
                </p>
              ),
            },
            {
              title: 'Sugár és nyílt intervallum',
              body: (
                <p>
                  Abszolút konvergens, ha <M t="\rho < 1 \iff |x-2| < 3 \iff -1 < x < 5" />. Tehát{' '}
                  <M t="R = 3" />, a középpont <M t="a = 2" />.
                </p>
              ),
            },
            {
              title: 'Bal végpont: x = −1',
              body: (
                <p>
                  Behelyettesítve:{' '}
                  <M t="\sum_{n=1}^\infty \frac{(-3)^n}{n\cdot 3^n} = \sum_{n=1}^\infty \frac{(-1)^n}{n}" />. Ez az
                  alternáló harmonikus sor, amely a Leibniz-tétel szerint <strong>konvergens</strong> (tehát{' '}
                  <M t="x = -1" /> benne van!).
                </p>
              ),
            },
            {
              title: 'Jobb végpont: x = 5 és végeredmény',
              body: (
                <p>
                  Behelyettesítve: <M t="\sum_{n=1}^\infty \frac{3^n}{n\cdot 3^n} = \sum_{n=1}^\infty \frac{1}{n}" />.
                  Ez a harmonikus sor, amely <strong>divergens</strong>. A teljes konvergenciaintervallum:{' '}
                  <strong><M t="I = [-1, 5)" /></strong>.
                </p>
              ),
            },
          ]}
        />

        <Task n={5} q={<>Határozd meg a <M t="\sum_{n=1}^\infty \frac{(2x - 1)^n}{n^2}" /> hatványsor konvergenciasugarát és -intervallumát!</>}>
          <p>
            Hányadoskritériummal <M t="\rho = |2x - 1| < 1 \iff |x - \tfrac{1}{2}| < \tfrac{1}{2} \iff 0 < x < 1" />.
            Tehát <M t="R = \frac{1}{2}" />. Végpontok: <M t="x=0" /> esetén <M t="\sum \frac{(-1)^n}{n^2}" />{' '}
            (abszolút konvergens), <M t="x=1" /> esetén <M t="\sum \frac{1}{n^2}" /> (<M t="p=2>1" />, konvergens).
            Így <M t="I = [0, 1]" />.
          </p>
        </Task>

        <Task n={6} q={<>Add meg a <M t="\sum_{n=1}^\infty \frac{x^n}{\sqrt{n}}" /> sor konvergenciaintervallumát!</>}>
          <p>
            <M t="\rho = \lim |x|\sqrt{\frac{n}{n+1}} = |x| < 1" />, tehát <M t="R = 1" />. Végpontok: <M t="x = 1" />-nél{' '}
            <M t="\sum 1/\sqrt{n}" /> (<M t="p = 1/2 \le 1" />, divergens); <M t="x = -1" />-nél{' '}
            <M t="\sum (-1)^n/\sqrt{n}" /> (Leibniz-tétel alapján konvergens). Végeredmény: <M t="I = [-1, 1)" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Tagonkénti differenciálás (19. tétel)',
    body: (
      <>
        <p>
          A hatványsorok legnagyobb varázsereje, hogy konvergenciaintervallumuk <strong>belsejében</strong> pontosan úgy
          viselkednek, mint a polinomok: végtelen sokszor differenciálhatók, és egyszerűen <em>tagonként</em>{' '}
          deriválhatjuk őket!
        </p>

        <Def title="Hatványsor tagonkénti differenciálása (19. tétel)">
          <p>
            Ha az <M t="f(x) = \sum_{n=0}^{\infty} c_n (x - a)^n" /> hatványsor konvergenciasugara <M t="R > 0" />,
            akkor <M t="f" /> minden rendben differenciálható az <M t="(a - R, a + R)" /> nyílt intervallumon, és
            deriváltja:
            <M block t="f'(x) = \sum_{n=1}^{\infty} n\,c_n (x - a)^{n-1} = c_1 + 2c_2(x-a) + 3c_3(x-a)^2 + \cdots" />
            amelynek konvergenciasugara <strong>ugyanaz az <M t="R" /></strong>!
          </p>
        </Def>

        <Warn>
          A tagonkénti deriválás <strong>nem változtatja meg <M t="R" />-et</strong>, de a végpontokban a konvergencia{' '}
          <strong>elveszhet</strong>! Például <M t="\sum \frac{x^n}{n}" /> konvergens <M t="x=-1" />-ben, a deriváltja{' '}
          <M t="\sum x^{n-1}" /> viszont már divergens <M t="x=-1" />-ben.
        </Warn>

        <TermByTermDiffWidget />

        <Task n={7} q={<>Deriváld tagonként a <M t="\frac{1}{1-x} = \sum_{n=0}^\infty x^n" /> sort kétszer, és add meg a <M t="\frac{1}{(1-x)^3}" /> hatványsorát!</>}>
          <p>
            Első deriválás: <M t="\frac{1}{(1-x)^2} = \sum_{n=1}^\infty n x^{n-1}" />. Második deriválás:
            <M block t="\frac{2}{(1-x)^3} = \sum_{n=2}^\infty n(n-1) x^{n-2} \implies \frac{1}{(1-x)^3} = \sum_{n=2}^\infty \frac{n(n-1)}{2} x^{n-2} = \sum_{k=0}^\infty \binom{k+2}{2} x^k" />
            minden <M t="|x| < 1" /> esetén.
          </p>
        </Task>

        <Task n={8} q={<>Számítsd ki a <M t="\sum_{n=1}^\infty \frac{n}{2^n}" /> numerikus sor pontos összegét tagonkénti deriválással!</>}>
          <p>
            Tudjuk, hogy <M t="\frac{1}{(1-x)^2} = \sum_{n=1}^\infty n x^{n-1}" /> (<M t="|x|<1" />). Szorozzuk meg
            mindkét oldalt <M t="x" />-szel: <M t="\frac{x}{(1-x)^2} = \sum_{n=1}^\infty n x^n" />. Helyettesítsük be{' '}
            <M t="x = \frac{1}{2}" />-t:
            <M block t="\sum_{n=1}^\infty \frac{n}{2^n} = \frac{1/2}{(1 - 1/2)^2} = \frac{1/2}{1/4} = 2." />
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Tagonkénti integrálás: ln(1 + x) és arctg x (20. tétel)',
    body: (
      <>
        <p>
          A deriválás ikertestvére a <strong>tagonkénti integrálás</strong>: ezzel olyan híres transzcendens függvények
          hatványsorát kapjuk meg egyetlen lépésben, mint a természetes logaritmus és az arkusz tangens!
        </p>

        <Def title="Hatványsor tagonkénti integrálása (20. tétel)">
          <p>
            Ha <M t="f(x) = \sum_{n=0}^{\infty} c_n (x - a)^n" /> konvergenciasugara <M t="R > 0" />, akkor{' '}
            <M t="(a - R, a + R)" />-en:
            <M block t="\int f(x)\,dx = C + \sum_{n=0}^{\infty} c_n \frac{(x - a)^{n+1}}{n + 1}" />
            ugyanazzal az <M t="R" /> konvergenciasugárral. A végpontokban a konvergencia akár{' '}
            <strong>meg is javulhat</strong>!
          </p>
        </Def>

        <p>
          Két klasszikus ékszerdoboz:
          <M block t="\ln(1 + x) = \int_0^x \frac{dt}{1 + t} = \sum_{n=0}^{\infty} (-1)^n \frac{x^{n+1}}{n+1} = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \cdots \quad (-1 < x \le 1)" />
          <M block t="\operatorname{arctg} x = \int_0^x \frac{dt}{1 + t^2} = \sum_{n=0}^{\infty} (-1)^n \frac{x^{2n+1}}{2n+1} = x - \frac{x^3}{3} + \frac{x^5}{5} - \frac{x^7}{7} + \cdots \quad (-1 \le x \le 1)" />
          Az utóbbiba <M t="x = 1" />-et írva (Abel-tétel alapján) megkapjuk Leibniz híres formuláját:{' '}
          <M t="\frac{\pi}{4} = 1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \cdots" />.
        </p>

        <TermByTermIntWidget />

        <Quiz
          q={<>Az <M t="f(x) = \sum c_n x^n" /> hatványsor konvergenciaintervalluma <M t="(-2, 2)" />. Mit tudunk biztosan az <M t="\int f(x)\,dx" /> hatványsor konvergenciaintervallumáról?</>}
          options={[
            { label: <>Pontosan <M t="(-2, 2)" />, a végpontok biztosan nyitottak maradnak</> },
            { label: <>Konvergenciasugara <M t="R = 2" />, és a végpontokban (<M t="-2" /> és <M t="2" />) akár konvergálhat is</>, ok: true },
            { label: <>Konvergenciasugara megduplázódik (<M t="R = 4" />)</> },
            { label: <>Konvergenciasugara feleződik (<M t="R = 1" />)</> },
          ]}
          explain={
            <>
              A 20. tétel szerint az <M t="R" /> konvergenciasugár változatlan (<M t="R = 2" />), de az{' '}
              <M t="n+1" />-gyel való osztás miatt a végpontokban a sor konvergenssé válhat.
            </>
          }
        />

        <Task n={9} q={<>Határozd meg a <M t="\ln(1 - x)" /> hatványsorát és konvergenciaintervallumát!</>}>
          <p>
            Integráljuk a <M t="-\frac{1}{1-t} = -\sum_{n=0}^\infty t^n" /> sort <M t="0" />-tól <M t="x" />-ig:
            <M block t="\ln(1 - x) = -\sum_{n=0}^{\infty} \frac{x^{n+1}}{n+1} = -x - \frac{x^2}{2} - \frac{x^3}{3} - \cdots" />
            <M t="R = 1" />. <M t="x = 1" />-nél divergens (<M t="-\sum 1/n" />), <M t="x = -1" />-nél alternáló
            harmonikus, így konvergens. Intervallum: <M t="[-1, 1)" />.
          </p>
        </Task>

        <Task n={10} q={<>Add meg a <M t="\int_0^{1/2} \frac{dx}{1 + x^3}" /> integrál értékét végtelen sorként!</>}>
          <p>
            <M t="\frac{1}{1+x^3} = \sum_{n=0}^\infty (-1)^n x^{3n}" /> (<M t="|x|<1" />). Tagonként integrálva:
            <M block t="\int_0^{1/2} \frac{dx}{1 + x^3} = \sum_{n=0}^\infty \frac{(-1)^n}{(3n+1)\cdot 2^{3n+1}} = \frac{1}{2} - \frac{1}{64} + \frac{1}{896} - \cdots \approx 0{,}4855." />
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Algebrai műveletek, helyettesítés és Cauchy-szorzat (21. tétel)',
    body: (
      <>
        <p>
          Nem kell minden függvényhez elölről kezdeni a munkát! Az ismert alapsorokból{' '}
          <strong>helyettesítéssel</strong>, <strong>lineáris kombinációval</strong> és{' '}
          <strong>hatványsorok szorzásával</strong> pillanatok alatt új sorokat gyárthatunk.
        </p>

        <SeriesSubstitutionDiagram />

        <Def title="Hatványsorok szorzása (21. tétel — Cauchy-szorzat)">
          <p>
            Ha <M t="A(x) = \sum_{n=0}^\infty a_n x^n" /> és <M t="B(x) = \sum_{n=0}^\infty b_n x^n" /> mindkettő
            abszolút konvergens <M t="|x| < R" /> esetén, és definiáljuk a
            <M block t="c_n = a_0 b_n + a_1 b_{n-1} + \cdots + a_n b_0 = \sum_{k=0}^n a_k b_{n-k}" />
            együtthatókat, akkor a <M t="\sum_{n=0}^\infty c_n x^n" /> sor is abszolút konvergens <M t="|x| < R" />-re,
            és összege pontosan <M t="A(x)\cdot B(x)" />!
          </p>
        </Def>

        <CauchyProductDiagram />

        <Task n={11} q={<>Írd fel a <M t="\frac{1}{(1-x)(1-2x)}" /> függvény hatványsorát (a) parciális törtekkel, (b) ellenőrizd az első három tagot Cauchy-szorzattal!</>}>
          <p>
            (a) Parciális törtekre bontva: <M t="\frac{1}{(1-x)(1-2x)} = \frac{2}{1-2x} - \frac{1}{1-x}" />. Így{' '}
            <M t="|x| < \frac{1}{2}" /> esetén:
            <M block t="\sum_{n=0}^\infty \left(2\cdot 2^n - 1\right) x^n = \sum_{n=0}^\infty (2^{n+1} - 1) x^n = 1 + 3x + 7x^2 + 15x^3 + \cdots" />
            (b) Cauchy-szorzattal (<M t="a_k = 1" />, <M t="b_k = 2^k" />): <M t="c_0 = 1" />,{' '}
            <M t="c_1 = 1\cdot 2 + 1\cdot 1 = 3" />, <M t="c_2 = 4 + 2 + 1 = 7" /> — pontosan egyezik!
          </p>
        </Task>

        <Task n={12} q={<>Add meg az <M t="f(x) = \frac{x^2}{2 + x}" /> függvény origó körüli hatványsorát és konvergenciasugarát!</>}>
          <p>
            Kiemeljük a <M t="2" />-t a nevezőből:
            <M block t="\frac{x^2}{2 + x} = \frac{x^2}{2}\cdot\frac{1}{1 - (-x/2)} = \frac{x^2}{2}\sum_{n=0}^\infty \left(-\frac{x}{2}\right)^n = \sum_{n=0}^\infty \frac{(-1)^n}{2^{n+1}} x^{n+2}." />
            Konvergens, ha <M t="|-x/2| < 1 \iff |x| < 2" />, tehát <M t="R = 2" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló: hatványsor-kalauz és 4 tipikus hiba',
    body: (
      <>
        <PowerSeriesToolkitDiagram />

        <Def title="Öt alapsor, amit érdemes fejből tudni (11.7)">
          <ul>
            <li><M t="\dfrac{1}{1-x} = \sum_{n=0}^\infty x^n" /> &nbsp; (<M t="I = (-1, 1)" />)</li>
            <li><M t="\dfrac{1}{1+x} = \sum_{n=0}^\infty (-1)^n x^n" /> &nbsp; (<M t="I = (-1, 1)" />)</li>
            <li><M t="\dfrac{1}{(1-x)^2} = \sum_{n=1}^\infty n x^{n-1}" /> &nbsp; (<M t="I = (-1, 1)" />)</li>
            <li><M t="\ln(1+x) = \sum_{n=1}^\infty (-1)^{n-1}\dfrac{x^n}{n}" /> &nbsp; (<M t="I = (-1, 1]" />)</li>
            <li><M t="\operatorname{arctg} x = \sum_{n=0}^\infty (-1)^n \dfrac{x^{2n+1}}{2n+1}" /> &nbsp; (<M t="I = [-1, 1]" />)</li>
          </ul>
        </Def>

        <Warn>
          Négy tipikus hiba hatványsoroknál:
          <ol>
            <li>
              <strong>Elfelejtett végpontvizsgálat:</strong> a hányadoskritérium csak a nyílt <M t="(a-R, a+R)" />{' '}
              intervallumot adja meg — a két végpontot mindig külön teszteld!
            </li>
            <li>
              <strong>Téves konvergenciasugár együttható miatt:</strong> a <M t="\sum (2x-1)^n" /> sorban{' '}
              <M t="|2x-1| < 1 \implies |x - \tfrac{1}{2}| < \tfrac{1}{2}" />, tehát <M t="R = \tfrac{1}{2}" />, nem{' '}
              <M t="R = 1" />!
            </li>
            <li>
              <strong>Indexeltolás elrontása deriválásnál:</strong> a konstans <M t="c_0" /> tag deriváltja{' '}
              <M t="0" />, ezért <M t="n=0" />-ról <M t="n=1" />-re ugrik a szumma alsó határa!
            </li>
            <li>
              <strong>Integrálási állandó (<M t="C" />) elfelejtése:</strong> ha <M t="x=a" />-ban a függvény nem{' '}
              <M t="0" /> (pl. <M t="\ln(2+x)" />), akkor <M t="C = f(a)" />-t mindig külön meg kell határozni!
            </li>
          </ol>
        </Warn>

        <Quiz
          q={<>Mi a <M t="\sum_{n=0}^\infty \frac{(3x - 6)^n}{2^n}" /> hatványsor konvergenciasugara (<M t="R" />) és középpontja (<M t="a" />)?</>}
          options={[
            { label: <M t="a = 6,\; R = 2" /> },
            { label: <M t="a = 2,\; R = \tfrac{2}{3}" />, ok: true },
            { label: <M t="a = 2,\; R = 2" /> },
            { label: <M t="a = 6,\; R = \tfrac{2}{3}" /> },
          ]}
          explain={
            <>
              <M t="|3x - 6|/2 < 1 \iff 3|x - 2| < 2 \iff |x - 2| < \tfrac{2}{3}" />. Tehát a középpont <M t="a = 2" />,
              a sugár <M t="R = \tfrac{2}{3}" />.
            </>
          }
        />

        <Task n={13} q={<>Miért nem írható fel a <M t="\ln(2 + x)" /> függvény egyszerűen <M t="C = 0" />-val a <M t="\frac{1}{2+x}" /> integráljaként?</>}>
          <p>
            Mert <M t="x = 0" />-ban <M t="\ln(2 + 0) = \ln 2 \ne 0" />! Ezért{' '}
            <M t="\ln(2+x) = \ln 2 + \int_0^x \frac{dt}{2+t} = \ln 2 + \sum_{n=0}^\infty \frac{(-1)^n}{(n+1)2^{n+1}} x^{n+1}" />{' '}
            (<M t="-2 < x \le 2" />).
          </p>
        </Task>

        <Task n={14} q={<>Add meg a <M t="\sum_{n=1}^\infty \frac{(-1)^{n-1}}{n\cdot 3^n}" /> sor pontos összegét a <M t="\ln(1+x)" /> sora segítségével!</>}>
          <p>
            Mivel <M t="x = \frac{1}{3} \in (-1, 1]" />, közvetlenül behelyettesíthetünk:{' '}
            <M t="\sum_{n=1}^\infty \frac{(-1)^{n-1}}{n\cdot 3^n} = \ln\!\left(1 + \frac{1}{3}\right) = \ln\frac{4}{3}" />.
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

        <Task n={15} q={<>Határozd meg a <M t="\sum_{n=0}^\infty \frac{x^n}{5^n}" /> hatványsor konvergenciasugarát, -intervallumát és összegét!</>}>
          <p>
            Mértani sor <M t="r = x/5" /> hányadossal: <M t="|x/5| < 1 \iff |x| < 5" />. Tehát <M t="R = 5" />,{' '}
            <M t="I = (-5, 5)" />, és összege <M t="\frac{1}{1 - x/5} = \frac{5}{5 - x}" />.
          </p>
        </Task>

        <Task n={16} q={<>Add meg a <M t="\sum_{n=1}^\infty \frac{(x+3)^n}{n}" /> sor konvergenciaintervallumát!</>}>
          <p>
            Hányadoskritériummal <M t="|x+3| < 1 \iff -4 < x < -2" />, <M t="R = 1" />. Végpontok: <M t="x=-4" />-nél{' '}
            <M t="\sum (-1)^n/n" /> (konvergens), <M t="x=-2" />-nél <M t="\sum 1/n" /> (divergens). Így{' '}
            <M t="I = [-4, -2)" />.
          </p>
        </Task>

        <Task n={17} q={<>Írd fel a <M t="\frac{1}{1 + 4x^2}" /> függvény hatványsorát az <M t="x = 0" /> körül, és add meg <M t="R" />-et!</>}>
          <p>
            <M t="u = -4x^2" /> helyettesítéssel: <M t="\sum_{n=0}^\infty (-1)^n 4^n x^{2n}" />. Konvergens, ha{' '}
            <M t="4x^2 < 1 \iff |x| < \frac{1}{2}" />, tehát <M t="R = \frac{1}{2}" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Határozd meg a <M t="\sum_{n=1}^\infty \frac{n(x - 1)^n}{4^n}" /> sor konvergenciaintervallumát!</>}>
          <p>
            Hányadoskritériummal{' '}
            <M t="\rho = \lim \frac{n+1}{n}\cdot\frac{|x-1|}{4} = \frac{|x-1|}{4} < 1 \iff -3 < x < 5" /> (<M t="R = 4" />).
            A két végpontban (<M t="x=-3" /> és <M t="x=5" />) a tagok <M t="\pm n" />, nem tartanak <M t="0" />-hoz,
            tehát mindkettő divergens. Így <M t="I = (-3, 5)" />.
          </p>
        </Task>

        <Task n={19} q={<>Határozd meg a <M t="\sum_{n=0}^\infty \frac{(-1)^n x^{2n+1}}{(2n+1)!}" /> sor konvergenciasugarát!</>}>
          <p>
            Hányadoskritériummal:
            <M block t="\rho = \lim_{n\to\infty} \frac{|x|^{2n+3}/(2n+3)!}{|x|^{2n+1}/(2n+1)!} = \lim_{n\to\infty} \frac{x^2}{(2n+3)(2n+2)} = 0 < 1" />
            minden <M t="x \in \mathbb{R}" />-re. Tehát <M t="R = \infty" />, <M t="I = (-\infty, \infty)" /> (ez lesz
            majd a <M t="\sin x" /> sora a 11.8-ban!).
          </p>
        </Task>

        <Task n={20} q={<>Írd fel az <M t="f(x) = \operatorname{arctg}(2x)" /> függvény hatványsorát és konvergenciasugarát!</>}>
          <p>
            Helyettesítsük <M t="2x" />-et az <M t="\operatorname{arctg} u" /> sorába:
            <M block t="\operatorname{arctg}(2x) = \sum_{n=0}^\infty (-1)^n \frac{(2x)^{2n+1}}{2n+1} = \sum_{n=0}^\infty (-1)^n \frac{2^{2n+1}}{2n+1} x^{2n+1}." />
            Konvergens, ha <M t="|2x| \le 1 \iff |x| \le \frac{1}{2}" />, tehát <M t="R = \frac{1}{2}" />,{' '}
            <M t="I = [-\frac{1}{2}, \frac{1}{2}]" />.
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Határozd meg a <M t="\sum_{n=1}^\infty \frac{(n!)^2}{(2n)!} x^n" /> hatványsor konvergenciasugarát!</>}>
          <p>
            Hányadoskritériummal:
            <M block t="\left|\frac{a_{n+1}}{a_n}\right| = \frac{((n+1)!)^2}{(2n+2)!}\cdot\frac{(2n)!}{(n!)^2}|x| = \frac{(n+1)^2}{(2n+2)(2n+1)}|x| = \frac{n+1}{2(2n+1)}|x| \to \frac{|x|}{4}." />
            Így <M t="\frac{|x|}{4} < 1 \iff |x| < 4" />, tehát a konvergenciasugár <strong><M t="R = 4" /></strong>.
          </p>
        </Task>

        <Task n={22} q={<>Számítsd ki a <M t="\sum_{n=1}^\infty \frac{n^2}{3^n}" /> sor pontos összegét hatványsorok deriválásával!</>}>
          <p>
            Kiindulunk <M t="\sum_{n=1}^\infty n x^n = \frac{x}{(1-x)^2}" />-ből (<M t="|x|<1" />). Deriváljuk még
            egyszer, majd szorozzuk <M t="x" />-szel:
            <M block t="\sum_{n=1}^\infty n^2 x^n = x\cdot\frac{d}{dx}\!\left(\frac{x}{(1-x)^2}\right) = x\cdot\frac{(1-x)^2 + 2x(1-x)}{(1-x)^4} = \frac{x(1+x)}{(1-x)^3}." />
            Behelyettesítve <M t="x = \frac{1}{3}" />-ot:{' '}
            <M t="\frac{\frac{1}{3}\cdot\frac{4}{3}}{(2/3)^3} = \frac{4/9}{8/27} = \frac{3}{2}" />.
          </p>
        </Task>

        <Task n={23} q={<>Határozd meg az <M t="f(x) = \ln\!\left(\frac{1+x}{1-x}\right)" /> függvény hatványsorát, és számítsd ki belőle <M t="\ln 2" /> értékét 3 taggal (<M t="x = \frac{1}{3}" /> segítségével)!</>}>
          <p>
            <M t="\ln\!\left(\frac{1+x}{1-x}\right) = \ln(1+x) - \ln(1-x)" />. Kivonva a két sort, a páros hatványok
            kiesnek:
            <M block t="\ln\!\left(\frac{1+x}{1-x}\right) = 2\sum_{k=0}^\infty \frac{x^{2k+1}}{2k+1} = 2\left(x + \frac{x^3}{3} + \frac{x^5}{5} + \cdots\right) \qquad (|x| < 1)." />
            Mivel <M t="\frac{1 + 1/3}{1 - 1/3} = 2" />, az <M t="x = \frac{1}{3}" /> választással nagyon gyorsan
            konvergáló közelítést kapunk:
            <M block t="\ln 2 \approx 2\left(\frac{1}{3} + \frac{1}{81} + \frac{1}{1215}\right) \approx 0{,}69300" />
            (a pontos érték <M t="\ln 2 \approx 0{,}69315" /> — mindössze 3 taggal 4 tizedesjegy pontosság!).
          </p>
        </Task>
      </>
    ),
  },
];
