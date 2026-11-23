import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  BoomerangLoopDiagram,
  InvisibleOneAntiderivWidget,
  LiatePriorityWidget,
  PartsAreaGeometryWidget,
  PartsChoiceCheatDiagram,
  ReductionStepperWidget,
  SubThenPartsPipelineDiagram,
  TabularIntegrationWidget,
} from '../components/Widgets82';
import type { Page } from './s1_1';

export const S8_2: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'A szorzatszabály megfordítása — a parciális integrálás',
    body: (
      <>
        <Story>
          <p>
            Az <M t="u" />-helyettesítés a <strong>láncszabály</strong> megfordítása volt; a <strong>parciális integrálás</strong> pedig a <strong>szorzatszabály</strong> megfordítása! Ha egy szorzat (<M t="x\cos x" />, <M t="xe^x" />, <M t="x\ln x" />) nem oldható meg sima helyettesítéssel, szinte biztosan a parciális integrálás lesz a kulcs!
          </p>
        </Story>

        <Def title="A parciális integrálás képlete">
          <p>A szorzatszabályból (<M t="(uv)' = u'v + uv'" />) mindkét oldalt integrálva és átrendezve:</p>
          <M block t="\int u\,dv \;=\; uv - \int v\,du \qquad\text{(határozott integrálra: }\int_{a}^{b} u\,dv = \Big[uv\Big]_{a}^{b} - \int_{a}^{b} v\,du\text{)}." />
          <p>
            A cél az, hogy az eredeti <M t="\int u\,dv" /> helyett egy <strong>sokkal egyszerűbb</strong> <M t="\int v\,du" /> integrált kapjunk!
          </p>
        </Def>

        <PartsAreaGeometryWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Számítsd ki parciális integrálással: <M t="\displaystyle\int x\cos x\,dx" /> (Thomas 1. példa)!
            </>
          }
        >
          <p>
            Legyen <M t="u = x,\; dv = \cos x\,dx \implies du = dx,\; v = \sin x" />:
            <M block t="\int x\cos x\,dx = x\sin x - \int \sin x\,dx = \mathbf{x\sin x + \cos x + C}." />
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int xe^x\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = x,\; dv = e^x\,dx \implies du = dx,\; v = e^x" />:
            <M block t="\int xe^x\,dx = xe^x - \int e^x\,dx = \mathbf{(x - 1)e^x + C}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Hogyan válasszuk meg u-t és dv-t? — A LIATE-sorrend!',
    body: (
      <>
        <Story>
          <p>
            A parciális integrálásnál az egyetlen igazi döntés az, hogy a szorzat két tényezője közül <strong>melyik legyen <M t="u" /></strong> (amit deriválunk) és <strong>melyik legyen <M t="dv" /></strong> (amit integrálunk)! Szerencsére van egy majdnem mindig működő sorrend: a <strong>LIATE-szabály</strong>!
          </p>
        </Story>

        <Def title="A LIATE-prioritási sorrend (u megválasztásához)">
          <p>Amelyik függvénytípus <strong>előrébb</strong> áll a listában, az legyen <M t="\mathbf{u}" />, a másik pedig <M t="\mathbf{dv}" />:</p>
          <ol className="steps">
            <li><strong>L</strong> — Logaritmusfüggvény (<M t="\ln x,\; \log_a x" />)</li>
            <li><strong>I</strong> — Inverz trigonometrikus / hiperbolikus (<M t="\arcsin x,\; \operatorname{arctg} x" />)</li>
            <li><strong>A</strong> — Algebrai / polinom (<M t="x,\; x^2,\; x^3" />)</li>
            <li><strong>T</strong> — Trigonometrikus (<M t="\sin x,\; \cos x,\; \sec^2 x" />)</li>
            <li><strong>E</strong> — Exponenciális (<M t="e^x,\; a^x" />)</li>
          </ol>
        </Def>

        <LiatePriorityWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int x\ln x\,dx" />!
            </>
          }
        >
          <p>
            LIATE szerint <strong>L</strong> megelőzi <strong>A</strong>-t: <M t="u = \ln x,\; dv = x\,dx \implies du = \frac{dx}{x},\; v = \frac{x^2}{2}" />:
            <M block t="\frac{x^2}{2}\ln x - \int \frac{x^2}{2}\cdot\frac{1}{x}\,dx = \frac{x^2}{2}\ln x - \frac{1}{2}\int x\,dx = \mathbf{\frac{x^2}{2}\ln x - \frac{x^2}{4} + C}." />
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \theta\cos(\pi\theta)\,d\theta" /> (Thomas 2. feladat)!
            </>
          }
        >
          <p>
            <M t="u = \theta,\; dv = \cos(\pi\theta)\,d\theta \implies v = \frac{1}{\pi}\sin(\pi\theta)" />:
            <M block t="\frac{\theta}{\pi}\sin(\pi\theta) - \frac{1}{\pi}\int\sin(\pi\theta)\,d\theta = \mathbf{\frac{\theta}{\pi}\sin(\pi\theta) + \frac{1}{\pi^2}\cos(\pi\theta) + C}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A „láthatatlan 1” trükk: ∫ ln x, ∫ arctg x, ∫ arcsin x',
    body: (
      <>
        <Story>
          <p>
            Mi van akkor, ha csak <em>egyetlen</em> függvény áll az integráljel alatt — például <M t="\int \ln x\,dx" /> vagy <M t="\int \operatorname{arctg} x\,dx" />? A trükk zseniális: <strong>képzelj mellé egy <M t="1" />-es szorzót</strong> (<M t="dv = 1\cdot dx \implies v = x" />)!
          </p>
        </Story>

        <Def title="Három klasszikus primitív függvény a „láthatatlan 1” trükkel">
          <ul>
            <li><M t="\displaystyle\int \ln x\,dx = x\ln x - x + C" /> (<M t="u = \ln x,\; dv = dx" />)</li>
            <li><M t="\displaystyle\int \operatorname{arctg} x\,dx = x\operatorname{arctg} x - \frac{1}{2}\ln(1 + x^2) + C" /> (<M t="u = \operatorname{arctg} x,\; dv = dx" />)</li>
            <li><M t="\displaystyle\int \arcsin x\,dx = x\arcsin x + \sqrt{1 - x^2} + C" /> (<M t="u = \arcsin x,\; dv = dx" />)</li>
          </ul>
        </Def>

        <InvisibleOneAntiderivWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Vezesd le parciális integrálással az <M t="\displaystyle\int \operatorname{arctg} y\,dy" /> képletet (Thomas 7. feladat)!
            </>
          }
        >
          <p>
            <M t="u = \operatorname{arctg} y,\; dv = dy \implies du = \frac{dy}{1+y^2},\; v = y" />:
            <M block t="y\operatorname{arctg} y - \int\frac{y}{1+y^2}\,dy = \mathbf{y\operatorname{arctg} y - \frac{1}{2}\ln(1 + y^2) + C}." />
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{1}^{e} \ln x\,dx" />!
            </>
          }
        >
          <p>
            <M t="\Big[x\ln x - x\Big]_{1}^{e} = (e\cdot 1 - e) - (1\cdot 0 - 1) = 0 - (-1) = \mathbf{1}" />! <em>(Gyönyörű eredmény: pont 1!)</em>
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Táblázatos parciális integrálás — villámgyors módszer polinomokra!',
    body: (
      <>
        <Story>
          <p>
            Ha az integrandus <M t="(\text{polinom})\times e^{kx}" />, <M t="(\text{polinom})\times\sin(kx)" /> vagy <M t="(\text{polinom})\times\cos(kx)" /> alakú, a többszöri parciális integrálás helyett használd a <strong>táblázatos módszert</strong> (Thomas 7–8. példa): 30 másodperc alatt, hibamentesen adja a teljes eredményt!
          </p>
        </Story>

        <TabularIntegrationWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Számítsd ki táblázatosan: <M t="\displaystyle\int (x^2 - 5x)e^x\,dx" /> (Thomas 13. feladat)!
            </>
          }
        >
          <p>
            Deriváltak: <M t="x^2 - 5x \to 2x - 5 \to 2 \to 0" />; integrálok: végig <M t="e^x" />. Váltakozó előjelekkel:
            <M block t="\bigl[(x^2 - 5x) - (2x - 5) + 2\bigr]e^x + C = \mathbf{(x^2 - 7x + 7)e^x + C}." />
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Számítsd ki táblázatosan: <M t="\displaystyle\int t^2\cos t\,dt" /> (Thomas 3. feladat)!
            </>
          }
        >
          <p>
            Deriváltak: <M t="t^2 \to 2t \to 2 \to 0" />; integrálok: <M t="\cos t \to \sin t \to -\cos t \to -\sin t" />. Váltakozó <M t="+,-,+" /> előjellel:
            <M block t="\mathbf{t^2\sin t + 2t\cos t - 2\sin t + C}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'A „bumeráng-trükk” — ciklikus integrálok (∫ eˣ cos x dx)',
    body: (
      <>
        <Story>
          <p>
            Az <M t="I = \int e^x\cos x\,dx" /> integrálnál egyik tényező sem fogy el deriváláskor: <M t="e^x" /> örökké <M t="e^x" /> marad, <M t="\cos x" /> pedig körbe-körbe jár (<M t="\cos \to \sin \to -\cos" />)! De pontosan ez a körforgás a megoldás: <strong>két lépés után visszatér maga <M t="I" /> a jobb oldalon, és egyetlen egyenlettel kifejezzük!</strong>
          </p>
        </Story>

        <BoomerangLoopDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Számítsd ki bumeráng-trükkel: <M t="\displaystyle\int e^x\sin x\,dx" />!
            </>
          }
        >
          <p>
            1. lépés (<M t="u=e^x,\; dv=\sin x\,dx" />): <M t="I = -e^x\cos x + \int e^x\cos x\,dx" />. 2. lépés (<M t="u=e^x,\; dv=\cos x\,dx" />): <M t="I = -e^x\cos x + e^x\sin x - I \implies 2I = e^x(\sin x - \cos x)" />. Tehát:
            <M block t="I = \mathbf{\frac{1}{2}e^x(\sin x - \cos x) + C}." />
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int e^{2x}\cos x\,dx" />!
            </>
          }
        >
          <p>
            Kétszeri parciális integrálás (<M t="u=e^{2x}" />): <M t="I = e^{2x}\sin x - 2\int e^{2x}\sin x\,dx = e^{2x}\sin x + 2e^{2x}\cos x - 4I" />. Ebből <M t="5I = e^{2x}(\sin x + 2\cos x)" />, tehát:
            <M block t="I = \mathbf{\frac{1}{5}e^{2x}(\sin x + 2\cos x) + C}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Hatványredukciós formulák (∫ cosⁿ x dx és a Wallis-integrál)',
    body: (
      <>
        <Story>
          <p>
            Hogyan integráljunk magas hatványokat (<M t="\cos^4 x" />, <M t="\cos^6 x" />, <M t="\sin^5 x" />)? Parciális integrálással felírhatunk egy <strong>redukciós formulát</strong> (Thomas 9. példa), amely minden lépésben <strong>2-vel csökkenti</strong> a kitevőt!
          </p>
        </Story>

        <Def title="Hatványredukciós formulák (n ≥ 2)">
          <M block t="\int \cos^n x\,dx \;=\; \frac{\cos^{n-1} x\sin x}{n} + \frac{n-1}{n}\int \cos^{n-2} x\,dx," />
          <M block t="\int \sin^n x\,dx \;=\; -\frac{\sin^{n-1} x\cos x}{n} + \frac{n-1}{n}\int \sin^{n-2} x\,dx." />
          <p>
            A <M t="[0;\,\pi/2]" /> intervallumon az első tag mindkét végpontban <M t="0" />, ezért a <strong>Wallis-integrálra</strong>: <M t="I_n = \dfrac{n-1}{n}I_{n-2}" />!
          </p>
        </Def>

        <ReductionStepperWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Számítsd ki a redukciós formulával: <M t="\displaystyle\int \cos^3 x\,dx" /> (Thomas 10. példa)!
            </>
          }
        >
          <p>
            <M t="n = 3" />: <M t="\dfrac{\cos^2 x\sin x}{3} + \dfrac{2}{3}\int \cos x\,dx = \mathbf{\dfrac{1}{3}\cos^2 x\sin x + \dfrac{2}{3}\sin x + C}" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Számítsd ki a Wallis-redukcióval: <M t="\displaystyle\int_{0}^{\pi/2} \cos^4 x\,dx" />!
            </>
          }
        >
          <p>
            <M t="I_4 = \dfrac{3}{4}I_2 = \dfrac{3}{4}\cdot\dfrac{1}{2}I_0 = \dfrac{3}{8}\cdot\dfrac{\pi}{2} = \mathbf{\dfrac{3\pi}{16}}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Kettős kombó (helyettesítés + parciális) és az 5 archetípus',
    body: (
      <>
        <Story>
          <p>
            Sok „ijesztő” integrál (pl. <M t="\int e^{\sqrt{x}}\,dx" /> vagy <M t="\int \cos\sqrt{x}\,dx" />) egyetlen helyettesítéssel átalakul tankönyvi parciális integrállá! Nézd meg a kettős kombót és az 5 archetípus teljes térképét:
          </p>
        </Story>

        <SubThenPartsPipelineDiagram />
        <PartsChoiceCheatDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{1}^{e} x^3\ln x\,dx" /> (Thomas 6. feladat)!
            </>
          }
        >
          <p>
            <M t="u = \ln x,\; dv = x^3\,dx \implies v = \frac{x^4}{4}" />:
            <M block t="\left[\frac{x^4}{4}\ln x\right]_{1}^{e} - \frac{1}{4}\int_{1}^{e} x^3\,dx = \frac{e^4}{4} - \frac{e^4 - 1}{16} = \mathbf{\frac{3e^4 + 1}{16}}." />
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \sin(\ln x)\,dx" />! <em>(Útmutatás: <M t="t = \ln x \implies x = e^t,\; dx = e^t\,dt" />!)</em>
            </>
          }
        >
          <p>
            A helyettesítéssel <M t="\int e^t\sin t\,dt = \frac{1}{2}e^t(\sin t - \cos t) + C" /> (9. feladat!). Visszaírva <M t="t = \ln x" />-et (<M t="e^t = x" />):
            <M block t="\mathbf{\frac{x}{2}\bigl(\sin(\ln x) - \cos(\ln x)\bigr) + C}!" />
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
        <Def title="8.2 Puskakártya">
          <ul>
            <li><strong>Alapképlet:</strong> <M t="\int u\,dv = uv - \int v\,du" /> · határozottan: <M t="\int_a^b u\,dv = [uv]_a^b - \int_a^b v\,du" />.</li>
            <li><strong>LIATE-sorrend (<M t="u" />-hoz):</strong> Logaritmus → Inverz trig. → Algebrai → Trig. → Exponenciális.</li>
            <li><strong>Mestertrükkök:</strong> láthatatlan 1 (<M t="\ln x, \operatorname{arctg} x, \arcsin x" />), táblázatos módszer (<M t="x^n e^x, x^n\sin x" />), bumeráng (<M t="e^{ax}\cos bx" />), redukció (<M t="\cos^n x" />).</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>5 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li><strong>Rossz <M t="u" />-választás:</strong> ha <M t="\int v\,du" /> bonyolultabb lett, cseréld meg <M t="u" />-t és <M t="dv" />-t (LIATE!).</li>
            <li><strong>Mínusz-előjel a képletben:</strong> <M t="uv \mathbf{-} \int v\,du" /> — különösen <M t="\sin x" /> / <M t="e^{-x}" /> integrálásánál vigyázz a dupla mínuszokra!</li>
            <li><strong>Bumerángnál TILOS szerepet cserélni a 2. lépésben:</strong> ha 1.-ben <M t="u = e^x" /> volt, 2.-ban is <M t="u = e^x" /> legyen (különben <M t="I = I" />-t kapsz)!</li>
            <li><strong>Határozott integrálnál az <M t="[uv]_a^b" /> kiértékelését se felejtsd el!</strong></li>
            <li><strong>Előbb mindig nézd meg, nem sima <M t="u" />-helyettesítés-e!</strong> (Pl. <M t="\int xe^{x^2}\,dx = \frac{1}{2}e^{x^2} + C" />!)</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int x\sin\!\left(\frac{x}{2}\right)dx" /> (Thomas 1. feladat)!
            </>
          }
        >
          <p>
            <M t="u = x,\; dv = \sin(x/2)\,dx \implies v = -2\cos(x/2)" />:
            <M block t="-2x\cos\!\left(\frac{x}{2}\right) + 2\int\cos\!\left(\frac{x}{2}\right)dx = \mathbf{-2x\cos\!\left(\frac{x}{2}\right) + 4\sin\!\left(\frac{x}{2}\right) + C}." />
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int x\sec^2 x\,dx" /> (Thomas 9. feladat)!
            </>
          }
        >
          <p>
            <M t="u = x,\; dv = \sec^2 x\,dx \implies v = \operatorname{tg} x" />:
            <M block t="x\operatorname{tg} x - \int\operatorname{tg} x\,dx = \mathbf{x\operatorname{tg} x + \ln|\cos x| + C}." />
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{1}^{2} x\ln x\,dx" /> (Thomas 5. feladat)!
            </>
          }
        >
          <p>
            A 3. feladat primitív függvényével: <M t="\left[\frac{x^2}{2}\ln x - \frac{x^2}{4}\right]_{1}^{2} = (2\ln 2 - 1) - (0 - \frac{1}{4}) = \mathbf{2\ln 2 - \frac{3}{4}}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={
            <>
              Számítsd ki táblázatosan: <M t="\displaystyle\int x^3 e^x\,dx" /> (Thomas 11. feladat)!
            </>
          }
        >
          <p>
            Deriváltak: <M t="x^3 \to 3x^2 \to 6x \to 6 \to 0" />, integrálok: végig <M t="e^x" />:
            <M block t="\mathbf{(x^3 - 3x^2 + 6x - 6)e^x + C}." />
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Számítsd ki a „láthatatlan 1” trükkel: <M t="\displaystyle\int \arcsin y\,dy" /> (Thomas 8. feladat)!
            </>
          }
        >
          <p>
            <M t="u = \arcsin y,\; dv = dy \implies y\arcsin y - \int\frac{y}{\sqrt{1-y^2}}\,dy = \mathbf{y\arcsin y + \sqrt{1 - y^2} + C}" />.
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Számítsd ki bumeráng-trükkel: <M t="\displaystyle\int e^{2x}\sin x\,dx" />!
            </>
          }
        >
          <p>
            Kétszeri parciális (<M t="u = e^{2x}" />): <M t="I = -e^{2x}\cos x + 2e^{2x}\sin x - 4I \implies 5I = e^{2x}(2\sin x - \cos x)" />, tehát <M t="\mathbf{\frac{1}{5}e^{2x}(2\sin x - \cos x) + C}" />.
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={
            <>
              <em>Redukció + teljes kifejtés:</em> Számítsd ki <M t="\displaystyle\int \cos^4 x\,dx" /> értékét a redukciós formulával!
            </>
          }
        >
          <p>
            <M t="n=4" />: <M t="\frac{1}{4}\cos^3 x\sin x + \frac{3}{4}\int\cos^2 x\,dx" />. Mivel <M t="\int\cos^2 x\,dx = \frac{1}{2}\cos x\sin x + \frac{1}{2}x" />, az eredmény:
            <M block t="\mathbf{\frac{1}{4}\cos^3 x\sin x + \frac{3}{8}\cos x\sin x + \frac{3}{8}x + C}." />
          </p>
        </Task>
        <Task
          n={22}
          q={
            <>
              <em>Helyettesítés + parciális:</em> Számítsd ki <M t="\displaystyle\int \cos\sqrt{x}\,dx" /> értékét!
            </>
          }
        >
          <p>
            <M t="t = \sqrt{x} \implies x = t^2,\; dx = 2t\,dt" />: <M t="2\int t\cos t\,dt = 2(t\sin t + \cos t) + C = \mathbf{2\sqrt{x}\sin\sqrt{x} + 2\cos\sqrt{x} + C}" />!
          </p>
        </Task>
        <Task
          n={23}
          q={
            <>
              <em>Hengerhéj-térfogat parciális integrálással (6.2 + 8.2):</em> Forgassuk meg az <M t="y = \ln x" /> görbe, az <M t="x" />-tengely és az <M t="x = e" /> egyenes által határolt tartományt az <M t="y" />-tengely körül! Mekkora a térfogat?
            </>
          }
        >
          <p>
            Hengerhéj-módszerrel <M t="V = 2\pi\int_1^e x\ln x\,dx" />. A 3. feladat primitív függvényével:
            <M block t="V = 2\pi\left[\frac{x^2}{2}\ln x - \frac{x^2}{4}\right]_{1}^{e} = 2\pi\left[\left(\frac{e^2}{2} - \frac{e^2}{4}\right) - \left(0 - \frac{1}{4}\right)\right] = \mathbf{\frac{\pi(e^2 + 1)}{2}}." />
          </p>
        </Task>
      </>
    ),
  },
];
