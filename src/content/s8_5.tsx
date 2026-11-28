import { M } from '../components/M';
import { Def, Quiz, Story, Task, Warn } from '../components/ui';
import {
  DefiniteThetaBoundsDiagram,
  EllipseAndParabolaWidget,
  SecSubTriangleWidget,
  SinSubTriangleWidget,
  SquareThenTrigSubDiagram,
  TanSubTriangleWidget,
  TrigSubDecisionDiagram,
  TrigSubThreeTrianglesDiagram,
} from '../components/Widgets85';
import type { Page } from './s1_1';

export const S8_5: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'A 3 mágikus négyzetgyök és a 3 segédháromszög',
    body: (
      <>
        <Story>
          <p>
            A <M t="\sqrt{a^2 - x^2}" />, <M t="\sqrt{a^2 + x^2}" /> és <M t="\sqrt{x^2 - a^2}" /> gyökök gyakran megállítják a sima helyettesítést. A <strong>trigonometrikus helyettesítés</strong> zseniális ötlete: <strong>cseréljük le <M t="x" />-et egy trigonometrikus függvényre</strong> úgy, hogy a Pitagorasz-tétel miatt a gyök alatti kifejezés <em>tökéletes teljes négyzet</em> legyen, és a gyökjel egyszerűen eltűnjön!
          </p>
        </Story>

        <TrigSubThreeTrianglesDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Melyik helyettesítést válaszd, és mivé egyszerűsödik a gyök: (a) <M t="\sqrt{16 - x^2}" />, (b) <M t="\sqrt{9 + x^2}" />, (c) <M t="\sqrt{x^2 - 25}" /> (<M t="x > 5" />)?
            </>
          }
        >
          <p>
            (a) <M t="x = 4\sin\theta \implies 4\cos\theta" />; (b) <M t="x = 3\operatorname{tg}\theta \implies 3\sec\theta" />; (c) <M t="x = 5\sec\theta \implies 5\operatorname{tg}\theta" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Miért korlátozzuk <M t="\theta" />-t a <M t="[-\pi/2;\,\pi/2]" /> intervallumra az <M t="x = a\sin\theta" /> helyettesítésnél?
            </>
          }
        >
          <p>
            Két okból: (1) ezen az intervallumon <M t="\sin\theta" /> <strong>injektív</strong> (visszafordítható: <M t="\theta = \arcsin(x/a)" />), (2) itt <M t="\cos\theta \ge 0" />, így <M t="\sqrt{\cos^2\theta} = |\cos\theta| = \mathbf{\cos\theta}" /> (nincs előjelgond!).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: '1. eset: x = a sin θ (√(a² − x²)) — körök és körszeletek!',
    body: (
      <>
        <Story>
          <p>
            Az <M t="x = a\sin\theta" /> helyettesítés természetes otthona a kör és az ellipszis: végre <strong>integrálással is be tudjuk bizonyítani</strong>, hogy az <M t="R" /> sugarú kör területe <M t="R^2\pi" />!
          </p>
        </Story>

        <SinSubTriangleWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{x^2\,dx}{\sqrt{9 - x^2}}" /> (Thomas 2. példa)!
            </>
          }
        >
          <p>
            <M t="x = 3\sin\theta,\; dx = 3\cos\theta\,d\theta,\; \sqrt{9-x^2} = 3\cos\theta" />:
            <M block t="9\int\sin^2\theta\,d\theta = \frac{9}{2}(\theta - \sin\theta\cos\theta) + C = \mathbf{\frac{9}{2}\arcsin\!\left(\frac{x}{3}\right) - \frac{x\sqrt{9 - x^2}}{2} + C}." />
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Igazold <M t="x = R\sin\theta" /> helyettesítéssel, hogy az <M t="R" /> sugarú félkör területe <M t="\displaystyle\int_{-R}^{R}\sqrt{R^2 - x^2}\,dx = \frac{R^2\pi}{2}" />!
            </>
          }
        >
          <p>
            Határok <M t="-\pi/2 \to \pi/2" />:
            <M block t="R^2\int_{-\pi/2}^{\pi/2}\cos^2\theta\,d\theta = R^2\int_{-\pi/2}^{\pi/2}\frac{1+\cos 2\theta}{2}\,d\theta = R^2\cdot\frac{\pi}{2} = \mathbf{\frac{R^2\pi}{2}} \;\checkmark" />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: '2. eset: x = a tg θ (√(a² + x²) és (a² + x²)ⁿ)',
    body: (
      <>
        <Story>
          <p>
            Ha a kifejezésben <M t="a^2 + x^2" /> szerepel (gyök alatt vagy magasabb hatványon, pl. <M t="(4 + x^2)^{3/2}" />), az <M t="x = a\operatorname{tg}\theta" /> helyettesítés <M t="a^2\sec^2\theta" />-vá varázsolja — és a segédháromszögből pillanatok alatt visszaolvasható <M t="\sec\theta" /> és <M t="\sin\theta" />!
          </p>
        </Story>

        <TanSubTriangleWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Számítsd ki <M t="x = 2\operatorname{tg}\theta" /> helyettesítéssel: <M t="\displaystyle\int \frac{dx}{\sqrt{4 + x^2}}" /> (Thomas 1. példa)!
            </>
          }
        >
          <p>
            <M t="dx = 2\sec^2\theta\,d\theta,\; \sqrt{4+x^2} = 2\sec\theta \implies \int \sec\theta\,d\theta = \ln|\sec\theta + \operatorname{tg}\theta| + C = \mathbf{\ln\bigl(\sqrt{4 + x^2} + x\bigr) + C'}" />!
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{dx}{(1 + x^2)^{3/2}}" />!
            </>
          }
        >
          <p>
            <M t="x = \operatorname{tg}\theta,\; dx = \sec^2\theta\,d\theta,\; (1+x^2)^{3/2} = \sec^3\theta" />:
            <M block t="\int\frac{\sec^2\theta}{\sec^3\theta}\,d\theta = \int\cos\theta\,d\theta = \sin\theta + C = \mathbf{\frac{x}{\sqrt{1 + x^2}} + C}!" />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: '3. eset: x = a sec θ (√(x² − a²))',
    body: (
      <>
        <Story>
          <p>
            Amikor <M t="x^2" /> áll elöl mínusszal (<M t="\sqrt{x^2 - a^2}" />, <M t="x > a" />), a <M t="\sec^2\theta - 1 = \operatorname{tg}^2\theta" /> azonosság tünteti el a gyökjelet! Ha <M t="x^2" /> előtt együttható áll (mint <M t="\sqrt{25x^2 - 4}" />), egyszerűen írd <M t="5x = 2\sec\theta" /> (azaz <M t="x = \frac{2}{5}\sec\theta" />) alakban!
          </p>
        </Story>

        <SecSubTriangleWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{dx}{\sqrt{25x^2 - 4}}" /> (<M t="x > \frac{2}{5}" />, Thomas 3. példa)!
            </>
          }
        >
          <p>
            <M t="5x = 2\sec\theta \implies dx = \frac{2}{5}\sec\theta\operatorname{tg}\theta\,d\theta,\; \sqrt{25x^2-4} = 2\operatorname{tg}\theta" />:
            <M block t="\frac{1}{5}\int\sec\theta\,d\theta = \frac{1}{5}\ln|\sec\theta + \operatorname{tg}\theta| + C = \mathbf{\frac{1}{5}\ln\bigl(5x + \sqrt{25x^2 - 4}\bigr) + C'}." />
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{\sqrt{x^2 - 9}}{x}\,dx" /> (<M t="x > 3" />)!
            </>
          }
        >
          <p>
            <M t="x = 3\sec\theta,\; dx = 3\sec\theta\operatorname{tg}\theta\,d\theta,\; \sqrt{x^2-9} = 3\operatorname{tg}\theta" />:
            <M block t="3\int\operatorname{tg}^2\theta\,d\theta = 3\int(\sec^2\theta - 1)\,d\theta = 3(\operatorname{tg}\theta - \theta) + C = \mathbf{\sqrt{x^2 - 9} - 3\operatorname{arcsec}\!\left(\frac{x}{3}\right) + C}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Határozott integrálok — határok átszámítása θ-ra!',
    body: (
      <>
        <Story>
          <p>
            Határozott integrálnál van egy óriási könnyítés: <strong>egyáltalán nem kell segédháromszöget rajzolnod és visszahelyettesítened <M t="x" />-re!</strong> Egyszerűen számold át az alsó és felső határt <M t="\theta" />-ra, és értékeld ki a <M t="\theta" />-beli primitív függvényt!
          </p>
        </Story>

        <DefiniteThetaBoundsDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Számítsd ki határok átszámításával: <M t="\displaystyle\int_{0}^{2} \frac{dx}{(4 + x^2)^{3/2}}" />!
            </>
          }
        >
          <p>
            <M t="x = 2\operatorname{tg}\theta" />, határok <M t="0 \to \pi/4" />:
            <M block t="\int_{0}^{\pi/4}\frac{2\sec^2\theta}{8\sec^3\theta}\,d\theta = \frac{1}{4}\int_{0}^{\pi/4}\cos\theta\,d\theta = \frac{1}{4}\sin\frac{\pi}{4} = \mathbf{\frac{\sqrt{2}}{8}}." />
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{2}^{4} \frac{dx}{x^2\sqrt{x^2 - 4}}" />!
            </>
          }
        >
          <p>
            <M t="x = 2\sec\theta" />, határok <M t="0 \to \pi/3" /> (mert <M t="\sec(\pi/3) = 2" />):
            <M block t="\int_{0}^{\pi/3}\frac{2\sec\theta\operatorname{tg}\theta}{4\sec^2\theta\cdot 2\operatorname{tg}\theta}\,d\theta = \frac{1}{4}\int_{0}^{\pi/3}\cos\theta\,d\theta = \frac{1}{4}\sin\frac{\pi}{3} = \mathbf{\frac{\sqrt{3}}{8}}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Teljes négyzetté alakítás + trigonometrikus helyettesítés',
    body: (
      <>
        <Story>
          <p>
            Ha a gyök alatt teljes másodfokú polinom van (<M t="x^2 + 2x + 5" /> vagy <M t="4x - x^2" />), először <strong>egészítsd ki teljes négyzetté</strong> (8.1), majd az <M t="u = x + k" /> kifejezésre alkalmazd a 3 trigonometrikus helyettesítés egyikét!
          </p>
        </Story>

        <SquareThenTrigSubDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{dx}{(x^2 + 2x + 5)^{3/2}}" />!
            </>
          }
        >
          <p>
            <M t="(x+1)^2 + 2^2" /> ⇒ <M t="x + 1 = 2\operatorname{tg}\theta" />: <M t="\frac{1}{4}\int\cos\theta\,d\theta = \frac{1}{4}\sin\theta + C = \mathbf{\dfrac{x + 1}{4\sqrt{x^2 + 2x + 5}} + C}" />!
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{4} \sqrt{4x - x^2}\,dx" />!
            </>
          }
        >
          <p>
            <M t="4x - x^2 = 4 - (x-2)^2" /> — ez egy <M t="R = 2" /> sugarú felső félkör (<M t="(2;\,0)" /> középponttal)! Területe <M t="\frac{R^2\pi}{2} = \mathbf{2\pi}" />! (Helyettesítéssel: <M t="x-2 = 2\sin\theta,\; \theta\in[-\pi/2;\,\pi/2] \implies 4\int_{-\pi/2}^{\pi/2}\cos^2\theta\,d\theta = 2\pi" /> ✓)
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Az ellipszis területe (A = πab) és mikor NE használj trig. helyettesítést!',
    body: (
      <>
        <Story>
          <p>
            Zárásként két dolog: egy gyönyörű geometriai eredmény (az ellipszis pontos területe) és egy aranyat érő vizsgatipp arról, mikor spórolhatsz 5 percet egy sima <M t="u" />-helyettesítéssel!
          </p>
        </Story>

        <EllipseAndParabolaWidget />
        <TrigSubDecisionDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Igazold <M t="x = a\sin\theta" /> helyettesítéssel, hogy az <M t="\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1" /> ellipszis területe <M t="A = \pi ab" />!
            </>
          }
        >
          <p>
            Az első síknegyedben <M t="y = \frac{b}{a}\sqrt{a^2 - x^2}" />, így:
            <M block t="A = 4\cdot\frac{b}{a}\int_{0}^{a}\sqrt{a^2 - x^2}\,dx = 4\frac{b}{a}\cdot a^2\int_{0}^{\pi/2}\cos^2\theta\,d\theta = 4ab\cdot\frac{\pi}{4} = \mathbf{\pi ab} \;\checkmark" />
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Számítsd ki az <M t="y = \frac{1}{2}x^2" /> parabola ívhosszát a <M t="[0;\,1]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="y' = x \implies L = \int_0^1 \sqrt{1 + x^2}\,dx" />. Az <M t="x = \operatorname{tg}\theta" /> (<M t="0 \to \pi/4" />) helyettesítéssel <M t="\int_0^{\pi/4}\sec^3\theta\,d\theta = \mathbf{\frac{\sqrt{2}}{2} + \frac{1}{2}\ln(\sqrt{2} + 1)} \approx 1{,}148" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 8
  {
    title: 'Összefoglalás, buktatók és lépcsőzetes gyakorlófeladatok',
    body: (
      <>
        <Def title="8.5 Puskakártya">
          <ul>
            <li><strong><M t="\sqrt{a^2 - x^2}" />:</strong> <M t="x = a\sin\theta,\; dx = a\cos\theta\,d\theta" />, gyök <M t="= a\cos\theta" />.</li>
            <li><strong><M t="\sqrt{a^2 + x^2}" />:</strong> <M t="x = a\operatorname{tg}\theta,\; dx = a\sec^2\theta\,d\theta" />, gyök <M t="= a\sec\theta" />.</li>
            <li><strong><M t="\sqrt{x^2 - a^2}" />:</strong> <M t="x = a\sec\theta,\; dx = a\sec\theta\operatorname{tg}\theta\,d\theta" />, gyök <M t="= a\operatorname{tg}\theta" /> (<M t="x > a" />).</li>
            <li><strong>Visszaírás:</strong> határozatlan integrálnál <em>segédháromszögből</em>; határozottnál <em>határok átszámításával</em>!</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>5 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li><strong><M t="dx" /> elfelejtése!</strong> Ne csak a gyököt írd át <M t="\theta" />-ra — a <M t="dx" /> is hoz magával <M t="a\cos\theta" />, <M t="a\sec^2\theta" /> vagy <M t="a\sec\theta\operatorname{tg}\theta" /> szorzót!</li>
            <li><strong><M t="\sin(2\theta)" /> visszaírása:</strong> előbb bontsd szét <M t="2\sin\theta\cos\theta" />-ra, mert a segédháromszögben <M t="\theta" /> van, nem <M t="2\theta" />!</li>
            <li><strong>Felesleges trig. helyettesítés:</strong> ha <M t="x" /> áll a számlálóban (pl. <M t="\frac{x}{\sqrt{9-x^2}}" />), használj sima <M t="u = 9-x^2" /> helyettesítést!</li>
            <li><strong><M t="\theta" /> határok elfelejtése:</strong> ha áttérsz <M t="\theta" />-ra, ne hagyd ott az eredeti <M t="x" /> határokat!</li>
            <li><strong>Előjel <M t="\sqrt{x^2-a^2}" />-nél:</strong> <M t="x > a" />-ra <M t="\operatorname{tg}\theta \ge 0" />, negatív <M t="x < -a" /> ágon mínusz előjel jelenik meg!</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{3} \sqrt{9 - x^2}\,dx" />!
            </>
          }
        >
          <p>
            Negyedkör (<M t="R=3" />): <M t="\mathbf{\dfrac{9\pi}{4}}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{dx}{x^2\sqrt{4 - x^2}}" />!
            </>
          }
        >
          <p>
            <M t="x = 2\sin\theta \implies \frac{1}{4}\int\csc^2\theta\,d\theta = -\frac{1}{4}\operatorname{ctg}\theta + C = \mathbf{-\dfrac{\sqrt{4 - x^2}}{4x} + C}" />!
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{1} \frac{dx}{(1 + x^2)^2}" />!
            </>
          }
        >
          <p>
            <M t="x = \operatorname{tg}\theta" /> (<M t="0 \to \pi/4" />): <M t="\int_0^{\pi/4}\cos^2\theta\,d\theta = \left[\frac{\theta}{2} + \frac{\sin 2\theta}{4}\right]_0^{\pi/4} = \mathbf{\dfrac{\pi}{8} + \dfrac{1}{4}}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{dx}{x^2\sqrt{x^2 + 9}}" />!
            </>
          }
        >
          <p>
            <M t="x = 3\operatorname{tg}\theta \implies \frac{1}{9}\int\frac{\cos\theta}{\sin^2\theta}\,d\theta = -\frac{1}{9\sin\theta} + C = \mathbf{-\dfrac{\sqrt{x^2 + 9}}{9x} + C}" />.
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{x^3}{\sqrt{x^2 + 4}}\,dx" /> (akár trig., akár sima <M t="u = x^2+4" /> helyettesítéssel)!
            </>
          }
        >
          <p>
            Sima <M t="u = x^2 + 4,\; x^2 = u - 4,\; x\,dx = \frac{du}{2}" /> villámgyors:
            <M block t="\frac{1}{2}\int\frac{u - 4}{\sqrt{u}}\,du = \frac{1}{3}u^{3/2} - 4u^{1/2} + C = \mathbf{\frac{1}{3}(x^2 + 4)^{3/2} - 4\sqrt{x^2 + 4} + C}." />
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{\sqrt{2}}^{2} \frac{\sqrt{x^2 - 1}}{x^3}\,dx" />!
            </>
          }
        >
          <p>
            <M t="x = \sec\theta" /> (<M t="\pi/4 \to \pi/3" />): <M t="\int_{\pi/4}^{\pi/3}\sin^2\theta\,d\theta = \left[\frac{\theta}{2} - \frac{\sin 2\theta}{4}\right]_{\pi/4}^{\pi/3} = \mathbf{\dfrac{\pi}{24} + \dfrac{2 - \sqrt{3}}{8}}" />.
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={
            <>
              <em>Teljes négyzet + <M t="\sin" />-helyettesítés:</em> Számítsd ki <M t="\displaystyle\int \frac{x\,dx}{\sqrt{2x - x^2}}" /> értékét!
            </>
          }
        >
          <p>
            <M t="2x - x^2 = 1 - (x-1)^2" />. Legyen <M t="x - 1 = \sin\theta \implies x = 1 + \sin\theta,\; dx = \cos\theta\,d\theta" />:
            <M block t="\int(1 + \sin\theta)\,d\theta = \theta - \cos\theta + C = \mathbf{\arcsin(x - 1) - \sqrt{2x - x^2} + C}." />
          </p>
        </Task>
        <Task
          n={22}
          q={
            <>
              <em>Hiperbola-szelet területe:</em> Számítsd ki <M t="\displaystyle\int_{1}^{2} \sqrt{x^2 - 1}\,dx" /> pontos értékét!
            </>
          }
        >
          <p>
            <M t="x = \sec\theta" /> (<M t="0 \to \pi/3" />): <M t="\int_0^{\pi/3}\operatorname{tg}^2\theta\sec\theta\,d\theta = \int_0^{\pi/3}(\sec^3\theta - \sec\theta)\,d\theta = \left[\frac{1}{2}\sec\theta\operatorname{tg}\theta - \frac{1}{2}\ln|\sec\theta+\operatorname{tg}\theta|\right]_0^{\pi/3} = \mathbf{\sqrt{3} - \dfrac{1}{2}\ln(2 + \sqrt{3})}" />!
          </p>
        </Task>
        <Task
          n={23}
          q={
            <>
              <em>Tórusz térfogata hengerhéj-módszerrel (6.2 + 8.5):</em> Egy <M t="r" /> sugarú kör középpontja <M t="R > r" /> távolságra van az <M t="y" />-tengelytől (<M t="(x-R)^2 + y^2 = r^2" />). Igazold az <M t="x = R + r\sin\theta" /> helyettesítéssel, hogy a tórusz térfogata <M t="V = 2\pi^2 R r^2" />!
            </>
          }
        >
          <p>
            Hengerhéj-módszerrel <M t="V = 2\pi\int_{R-r}^{R+r} x\cdot 2\sqrt{r^2 - (x-R)^2}\,dx" />. Az <M t="x - R = r\sin\theta" /> (<M t="-\pi/2 \to \pi/2" />) helyettesítéssel:
            <M block t="4\pi r^2\int_{-\pi/2}^{\pi/2}(R + r\sin\theta)\cos^2\theta\,d\theta = 4\pi r^2\left(R\cdot\frac{\pi}{2} + 0\right) = \mathbf{2\pi^2 R r^2} \;\checkmark" />
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Melyik helyettesítés tünteti el a gyököt az <M t="\displaystyle\int \frac{\sqrt{x^2 - 9}}{x}\,dx" /> (<M t="x > 3" />) integrálban?
            </>
          }
          options={[
            { label: <M t="x = 3\sec\theta" />, ok: true },
            { label: <M t="x = 3\sin\theta" /> },
            { label: <M t="x = 3\operatorname{tg}\theta" /> },
            { label: <M t="x = 9\sec\theta" /> },
          ]}
          explain={
            <>
              <M t="x = 3\sec\theta \implies \sqrt{9\sec^2\theta - 9} = 3\operatorname{tg}\theta" /> (<M t="x > 3" /> esetén).
            </>
          }
        />
      </>
    ),
  },
];
