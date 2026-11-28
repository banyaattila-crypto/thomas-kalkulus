import { M } from '../components/M';
import { Def, Quiz, Story, Task, Warn } from '../components/ui';
import {
  EvenPowerAverageWidget,
  LnSecArcLengthWidget,
  ProductToSumCheatDiagram,
  ProductToSumOrthoWidget,
  SecCubedBoomerangDiagram,
  SinCosCasesDiagram,
  SinCosPowerAreaWidget,
  TanSecCasesDiagram,
} from '../components/Widgets84';
import type { Page } from './s1_1';

export const S8_4: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Szinusz- és koszinuszhatványok szorzata: ∫ sinᵐ x cosⁿ x dx',
    body: (
      <>
        <Story>
          <p>
            A rezgések, hullámok, váltakozó áramok és Fourier-sorok világában lépten-nyomon felbukkannak olyan integrálok, mint <M t="\int \sin^3 x\cos^2 x\,dx" /> vagy <M t="\int \sin^4 x\,dx" />. A megoldás titka egyetlen pillantás a <strong>kitevők paritására</strong> (páros vagy páratlan)!
          </p>
        </Story>

        <SinCosCasesDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \sin^3 x\cos^2 x\,dx" />!
            </>
          }
        >
          <p>
            Mivel <M t="m=3" /> páratlan, leválasztunk egy <M t="\sin x" />-et és <M t="u = \cos x,\; du = -\sin x\,dx" />:
            <M block t="\int (1-\cos^2 x)\cos^2 x\sin x\,dx = -\int (u^2 - u^4)\,du = \mathbf{-\frac{1}{3}\cos^3 x + \frac{1}{5}\cos^5 x + C}." />
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/2} \cos^3 x\,dx" /> (Thomas 2. feladat)!
            </>
          }
        >
          <p>
            <M t="\int_0^{\pi/2} (1 - \sin^2 x)\cos x\,dx = \left[\sin x - \frac{\sin^3 x}{3}\right]_{0}^{\pi/2} = 1 - \frac{1}{3} = \mathbf{\dfrac{2}{3}}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Páratlan kitevő = azonnali polinom-integrál!',
    body: (
      <>
        <Story>
          <p>
            Ha akár a szinusz, akár a koszinusz kitevője páratlan, a trükk mindig ugyanaz: <strong>válassz le egyetlen darabot a páratlanból</strong> (ebből lesz a <M t="du" />!), a maradék páros hatványt pedig írd át a Pitagorasz-azonossággal (<M t="\sin^2 x + \cos^2 x = 1" />) a <em>másik</em> függvényre! Ha mindkettő páratlan, válaszd a kisebbik kitevőjűt, hogy kevesebbet kelljen zárójelet bontanod!
          </p>
        </Story>

        <SinCosPowerAreaWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/2} 35\sin^4 x\cos^3 x\,dx" /> (Thomas 10. feladat)!
            </>
          }
        >
          <p>
            <M t="n=3" /> páratlan ⇒ <M t="u = \sin x,\; du = \cos x\,dx" />, határok <M t="0 \to 1" />:
            <M block t="35\int_{0}^{1} u^4(1 - u^2)\,du = 35\left[\frac{u^5}{5} - \frac{u^7}{7}\right]_{0}^{1} = 35\left(\frac{1}{5} - \frac{1}{7}\right) = 7 - 5 = \mathbf{2}!" />
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/2} \sin^5 x\,dx" /> (Thomas 1. feladat)!
            </>
          }
        >
          <p>
            <M t="u = \cos x" /> (határok <M t="1 \to 0" />): <M t="\int_0^1 (1 - u^2)^2\,du = \int_0^1 (1 - 2u^2 + u^4)\,du = 1 - \frac{2}{3} + \frac{1}{5} = \mathbf{\dfrac{8}{15}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Mindkét kitevő páros — a félszög-képletek ereje',
    body: (
      <>
        <Story>
          <p>
            Ha <strong>mind <M t="m" />, mind <M t="n" /> páros</strong> (pl. <M t="\int \sin^2 x\,dx" />, <M t="\int \sin^4 x\,dx" /> vagy <M t="\int \sin^2 x\cos^2 x\,dx" />), akkor nincs mit leválasztani <M t="du" />-nak! Ekkor jönnek a <strong>félszög- (fokszámcsökkentő) képletek</strong>!
          </p>
        </Story>

        <Def title="Fokszámcsökkentő képletek páros kitevőkhöz">
          <M block t="\sin^2 x = \frac{1 - \cos 2x}{2}, \qquad \cos^2 x = \frac{1 + \cos 2x}{2}, \qquad \sin x\cos x = \frac{1}{2}\sin 2x." />
        </Def>

        <EvenPowerAverageWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi} 8\sin^4 x\,dx" /> (Thomas 7. feladat)!
            </>
          }
        >
          <p>
            <M t="8\sin^4 x = 8\left(\frac{1-\cos 2x}{2}\right)^2 = 2(1 - 2\cos 2x + \cos^2 2x) = 2 - 4\cos 2x + (1 + \cos 4x) = 3 - 4\cos 2x + \cos 4x" />. Integrálva <M t="[0;\,\pi]" />-n a koszinuszok eltűnnek: <M t="\mathbf{3\pi}" />!
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/4} 16\sin^2 x\cos^2 x\,dx" /> (Thomas 9. feladat)!
            </>
          }
        >
          <p>
            <M t="16\sin^2 x\cos^2 x = 4(2\sin x\cos x)^2 = 4\sin^2(2x) = 2(1 - \cos 4x)" />. Integrálva <M t="[0;\,\pi/4]" />-en:
            <M block t="\Big[2x - \frac{1}{2}\sin 4x\Big]_{0}^{\pi/4} = \mathbf{\frac{\pi}{2}}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Tangens- és szekánshatványok: ∫ tgᵐ x secⁿ x dx',
    body: (
      <>
        <Story>
          <p>
            A <M t="\operatorname{tg} x" /> és <M t="\sec x" /> páros ugyanolyan csodásan működik együtt, mint <M t="\sin x" /> és <M t="\cos x" /> — csak itt az alapazonosság <M t="1 + \operatorname{tg}^2 x = \sec^2 x" />, a két mágikus derivált pedig <M t="(\operatorname{tg} x)' = \sec^2 x" /> és <M t="(\sec x)' = \sec x\operatorname{tg} x" />!
          </p>
        </Story>

        <TanSecCasesDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/4} \sec^4\theta\,d\theta" /> (Thomas 26. feladat)!
            </>
          }
        >
          <p>
            <M t="n=4" /> páros ⇒ válasszunk le <M t="\sec^2\theta" />-t, <M t="u = \operatorname{tg}\theta" /> (határok <M t="0 \to 1" />):
            <M block t="\int_{0}^{\pi/4}(1 + \operatorname{tg}^2\theta)\sec^2\theta\,d\theta = \int_{0}^{1}(1 + u^2)\,du = 1 + \frac{1}{3} = \mathbf{\frac{4}{3}}." />
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/3} 4\operatorname{tg}^3 x\,dx" /> (Thomas 29. feladat)!
            </>
          }
        >
          <p>
            <M t="\operatorname{tg}^3 x = \operatorname{tg} x(\sec^2 x - 1) = \operatorname{tg} x\sec^2 x - \operatorname{tg} x" />:
            <M block t="4\left[\frac{\operatorname{tg}^2 x}{2} + \ln|\cos x|\right]_{0}^{\pi/3} = 4\left(\frac{3}{2} + \ln\frac{1}{2}\right) = \mathbf{6 - 4\ln 2}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'A legendás ∫ sec³ x dx integrál (és a páratlan szekánshatványok)',
    body: (
      <>
        <Story>
          <p>
            Mi van akkor, ha <M t="\operatorname{tg} x" /> kitevője páros (vagy 0), <M t="\sec x" /> kitevője pedig páratlan — mint a híres <strong><M t="\int \sec^3 x\,dx" /></strong> (amely a parabola ívhosszánál és a 8.5-ös trigonometrikus helyettesítéseknél is állandóan előkerül!)? Itt a 8.2-es <strong>parciális integrálás + bumeráng</strong> segít!
          </p>
        </Story>

        <SecCubedBoomerangDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/3} 2\sec^3 x\,dx" /> (Thomas 23. feladat)!
            </>
          }
        >
          <p>
            <M t="\Big[\sec x\operatorname{tg} x + \ln|\sec x + \operatorname{tg} x|\Big]_{0}^{\pi/3} = \mathbf{2\sqrt{3} + \ln(2 + \sqrt{3})}" />!
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \operatorname{tg}^2 x\sec x\,dx" />!
            </>
          }
        >
          <p>
            Írjuk át <M t="\operatorname{tg}^2 x = \sec^2 x - 1" />-re: <M t="\int (\sec^3 x - \sec x)\,dx" />. Behelyettesítve <M t="\int \sec^3 x\,dx" />-et:
            <M block t="\mathbf{\frac{1}{2}\sec x\operatorname{tg} x - \frac{1}{2}\ln|\sec x + \operatorname{tg} x| + C}!" />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Különböző frekvenciák szorzata és a Fourier-ortogonalitás',
    body: (
      <>
        <Story>
          <p>
            Hogyan integráljuk a <M t="\sin(3x)\cos(2x)" /> vagy <M t="\cos(3x)\cos(4x)" /> szorzatokat, ahol a szinuszok és koszinuszok <em>különböző frekvenciájúak</em>? A <strong>szorzat → összeg</strong> képletekkel! Ez a technika egyben a <strong>Fourier-analízis</strong> (hangtömörítés, MP3, jelfeldolgozás!) matematikai alapja is!
          </p>
        </Story>

        <ProductToSumOrthoWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{-\pi}^{0} \sin(3x)\cos(2x)\,dx" /> (Thomas 33. feladat)!
            </>
          }
        >
          <p>
            <M t="\sin(3x)\cos(2x) = \frac{1}{2}(\sin x + \sin 5x)" />:
            <M block t="\frac{1}{2}\left[-\cos x - \frac{\cos 5x}{5}\right]_{-\pi}^{0} = \frac{1}{2}\left[\left(-1 - \frac{1}{5}\right) - \left(1 + \frac{1}{5}\right)\right] = \mathbf{-\frac{6}{5}}." />
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Igazold, hogy <M t="\displaystyle\int_{-\pi}^{\pi} \cos(3x)\cos(4x)\,dx = 0" /> (Thomas 37. feladat)!
            </>
          }
        >
          <p>
            <M t="\cos(3x)\cos(4x) = \frac{1}{2}(\cos x + \cos 7x)" />. Mindkét koszinusz integrálja <M t="[-\pi;\,\pi]" />-n <M t="0" />, tehát az eredmény <M t="\mathbf{0}" /> ✓
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Szorzat-összeg puskakártya és geometriai alkalmazások',
    body: (
      <>
        <Story>
          <p>
            Foglaljuk össze a 3 szorzat-összeg képletet egyetlen kártyán, és nézzünk meg egy gyönyörű ívhossz-alkalmazást Thomas 41. feladatából!
          </p>
        </Story>

        <ProductToSumCheatDiagram />
        <LnSecArcLengthWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Igazold a 8. ábra eredményét: az <M t="y = \ln(\sec x)" /> görbe ívhossza a <M t="[0;\,\pi/4]" /> intervallumon <M t="\ln(\sqrt{2} + 1)" /> (Thomas 41. feladat)!
            </>
          }
        >
          <p>
            <M t="y' = \frac{\sec x\operatorname{tg} x}{\sec x} = \operatorname{tg} x \implies \sqrt{1 + (y')^2} = \sqrt{1 + \operatorname{tg}^2 x} = \sec x" /> (<M t="[0;\,\pi/4]" />-en pozitív!). Így:
            <M block t="L = \int_{0}^{\pi/4}\sec x\,dx = \Big[\ln(\sec x + \operatorname{tg} x)\Big]_{0}^{\pi/4} = \mathbf{\ln(\sqrt{2} + 1)}." />
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Számítsd ki annak a forgástestnek a térfogatát, amelyet az <M t="y = \sin x" /> (<M t="0 \le x \le \pi" />) görbe <M t="x" />-tengely körüli megforgatásával kapunk (Thomas 43. feladat)!
            </>
          }
        >
          <p>
            Korong-módszerrel: <M t="V = \pi\int_0^\pi \sin^2 x\,dx = \pi\int_0^\pi \frac{1-\cos 2x}{2}\,dx = \mathbf{\dfrac{\pi^2}{2}}" />!
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
        <Def title="8.4 Puskakártya">
          <ul>
            <li><strong><M t="\sin^m x\cos^n x" />:</strong> páratlan <M t="m \to u=\cos x" /> · páratlan <M t="n \to u=\sin x" /> · mindkettő páros <M t="\to" /> félszög-képlet!</li>
            <li><strong><M t="\operatorname{tg}^m x\sec^n x" />:</strong> páros <M t="n \to u=\operatorname{tg} x" /> · páratlan <M t="m \to u=\sec x" /> · páros <M t="m" />, páratlan <M t="n \to" /> parciális (<M t="\int \sec^3 x" />)!</li>
            <li><strong><M t="\int \sec^3 x\,dx = \frac{1}{2}\sec x\operatorname{tg} x + \frac{1}{2}\ln|\sec x + \operatorname{tg} x| + C" />.</strong></li>
            <li><strong>Különböző frekvenciák:</strong> szorzat → összeg képletek!</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>5 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li><strong>Mínuszjel <M t="u = \cos x" />-nél:</strong> <M t="du = \mathbf{-}\sin x\,dx" />!</li>
            <li><strong>Félszög-képlet előjele:</strong> <M t="\sin^2 x" />-ben <strong>mínusz</strong> (<M t="\frac{1-\cos 2x}{2}" />), <M t="\cos^2 x" />-ben <strong>plusz</strong> (<M t="\frac{1+\cos 2x}{2}" />)!</li>
            <li><strong>Szögduplázás integráláskor:</strong> <M t="\int \cos(2x)\,dx = \frac{1}{2}\sin(2x)" /> — ne felejtsd el az <M t="1/2" />-et!</li>
            <li><strong><M t="\operatorname{tg}^2 x = \sec^2 x - 1" /></strong> (NEM <M t="1 - \sec^2 x" />!).</li>
            <li><strong>Gyök alatti négyzeteknél mindig <M t="\sqrt{u^2} = |u|" />!</strong></li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/6} 3\cos^5(3x)\,dx" /> (Thomas 5. feladat)!
            </>
          }
        >
          <p>
            <M t="u = \sin(3x),\; du = 3\cos(3x)\,dx" />, határok <M t="0 \to 1" />: <M t="\int_0^1 (1-u^2)^2\,du = \mathbf{\dfrac{8}{15}}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/4} 8\cos^3(2\theta)\sin(2\theta)\,d\theta" /> (Thomas 11. feladat)!
            </>
          }
        >
          <p>
            <M t="u = \cos(2\theta),\; du = -2\sin(2\theta)\,d\theta" />, határok <M t="1 \to 0" />: <M t="4\int_0^1 u^3\,du = \mathbf{1}" />!
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/4} 6\operatorname{tg}^4 x\,dx" /> (Thomas 30. feladat)!
            </>
          }
        >
          <p>
            <M t="\operatorname{tg}^4 x = \operatorname{tg}^2 x(\sec^2 x - 1) = \operatorname{tg}^2 x\sec^2 x - \sec^2 x + 1" />:
            <M block t="6\left[\frac{\operatorname{tg}^3 x}{3} - \operatorname{tg} x + x\right]_{0}^{\pi/4} = 6\left(\frac{1}{3} - 1 + \frac{\pi}{4}\right) = \mathbf{\frac{3\pi}{2} - 4}." />
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/4} \sin^2(2\theta)\cos^3(2\theta)\,d\theta" /> (Thomas 14. feladat)!
            </>
          }
        >
          <p>
            <M t="u = \sin(2\theta),\; du = 2\cos(2\theta)\,d\theta" />, határok <M t="0 \to 1" />:
            <M block t="\frac{1}{2}\int_{0}^{1} u^2(1-u^2)\,du = \frac{1}{2}\left(\frac{1}{3} - \frac{1}{5}\right) = \mathbf{\frac{1}{15}}." />
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/2} \sin(2x)\cos(3x)\,dx" /> (Thomas 34. feladat)!
            </>
          }
        >
          <p>
            <M t="\sin(2x)\cos(3x) = \frac{1}{2}(\sin 5x - \sin x)" />:
            <M block t="\frac{1}{2}\left[-\frac{\cos 5x}{5} + \cos x\right]_{0}^{\pi/2} = \frac{1}{2}\left(0 - \left(-\frac{1}{5} + 1\right)\right) = \mathbf{-\frac{2}{5}}." />
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{\pi/4}^{\pi/2} 8\operatorname{ctg}^4 t\,dt" /> (Thomas 32. feladat)!
            </>
          }
        >
          <p>
            <M t="\operatorname{ctg}^4 t = \operatorname{ctg}^2 t(\csc^2 t - 1) = \operatorname{ctg}^2 t\csc^2 t - \csc^2 t + 1" />:
            <M block t="8\left[-\frac{\operatorname{ctg}^3 t}{3} + \operatorname{ctg} t + t\right]_{\pi/4}^{\pi/2} = 8\left(\frac{\pi}{2} - \left(-\frac{1}{3} + 1 + \frac{\pi}{4}\right)\right) = \mathbf{2\pi - \frac{16}{3}}." />
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={
            <>
              <em>Fourier-ortogonalitás (Thomas 45a. feladat):</em> Igazold, hogy ha <M t="m \ne n" /> pozitív egészek, akkor <M t="\displaystyle\int_{0}^{2\pi} \sin(mx)\sin(nx)\,dx = 0" />!
            </>
          }
        >
          <p>
            Szorzat-összeg képlettel: <M t="\frac{1}{2}\int_0^{2\pi}\bigl(\cos((m-n)x) - \cos((m+n)x)\bigr)\,dx = \frac{1}{2}\left[\frac{\sin((m-n)x)}{m-n} - \frac{\sin((m+n)x)}{m+n}\right]_{0}^{2\pi} = \mathbf{0}" /> (mivel <M t="m-n \ne 0" /> és <M t="m+n \ne 0" /> egész számok!) ✓
          </p>
        </Task>
        <Task
          n={22}
          q={
            <>
              <em>Gyökjel + parciális (Thomas 22. feladat):</em> Számítsd ki <M t="\displaystyle\int_{0}^{\pi/2} \theta\sqrt{1 - \cos 2\theta}\,d\theta" /> értékét!
            </>
          }
        >
          <p>
            <M t="[0;\,\pi/2]" />-n <M t="\sqrt{1 - \cos 2\theta} = \sqrt{2}\sin\theta" />. Parciális integrálással (<M t="u=\theta,\; dv=\sin\theta\,d\theta" />):
            <M block t="\sqrt{2}\Big[-\theta\cos\theta + \sin\theta\Big]_{0}^{\pi/2} = \sqrt{2}(0 + 1 - 0) = \mathbf{\sqrt{2}}!" />
          </p>
        </Task>
        <Task
          n={23}
          q={
            <>
              <em>Trigonometrikus helyettesítés előzetese:</em> Számítsd ki <M t="\displaystyle\int_{0}^{\pi/4} \sec^6 x\,dx" /> értékét!
            </>
          }
        >
          <p>
            <M t="\sec^6 x = (1 + \operatorname{tg}^2 x)^2\sec^2 x" />, <M t="u = \operatorname{tg} x" /> (határok <M t="0 \to 1" />):
            <M block t="\int_{0}^{1}(1 + 2u^2 + u^4)\,du = 1 + \frac{2}{3} + \frac{1}{5} = \mathbf{\frac{28}{15}}." />
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Melyik azonosságot használjuk az <M t="\displaystyle\int \cos^2 x\,dx" /> kiszámításához?
            </>
          }
          options={[
            { label: <M t="\cos^2 x = \dfrac{1 + \cos 2x}{2}" />, ok: true },
            { label: <M t="\cos^2 x = 1 - \sin^2 x" /> },
            { label: <M t="\cos^2 x = \dfrac{1 - \cos 2x}{2}" /> },
            { label: <M t="\cos^2 x = \sec^2 x - 1" /> },
          ]}
          explain={
            <>
              A félszögképlet eltünteti a négyzetet, így közvetlenül integrálható: <M t="\dfrac{x}{2} + \dfrac{\sin 2x}{4} + C" />.
            </>
          }
        />
      </>
    ),
  },
];
