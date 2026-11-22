import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  ChainStepperWidget,
  GearChainWidget,
  OutsideInsideDiagram,
  ParamCurveWidget,
  ParamSlopeWidget,
} from '../components/Widgets35';
import type { Page } from './s1_1';

export const S3_5: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'A láncszabály: egymásba ágyazott függvények deriváltja',
    body: (
      <>
        <Story>
          <p>
            Képzelj el három összekapcsolt fogaskereket! Az <M t="A" /> kerék egy fordulata a <M t="B" /> kereket 3-szor forgatja meg, a <M t="B" /> egy fordulata pedig a <M t="C" />-t félszer. Hányszor fordul meg <M t="C" />, ha <M t="A" /> egyet fordul? Természetesen <M t="\frac{1}{2}\cdot 3 = \frac{3}{2}" />-szer! A láncszabály pontosan ugyanezt mondja ki összetett függvényekre: <strong>a változási sebességek összeszorzódnak.</strong>
          </p>
        </Story>
        <p>
          Az eddigi szabályainkkal tudjuk deriválni a <M t="\sin u" /> és az <M t="u=x^2-4" /> függvényt külön-külön — de mi a helyzet a kettő kompozíciójával, a <M t="\sin(x^2-4)" /> függvénnyel? Erre ad választ a differenciálszámítás talán leggyakrabban használt tétele, a <strong>láncszabály</strong>.
        </p>
        <Def title="3. Tétel — A láncszabály">
          <p>
            Ha <M t="g" /> differenciálható <M t="x" />-ben, és <M t="f" /> differenciálható <M t="u=g(x)" />-ben, akkor az <M t="(f\circ g)(x)=f(g(x))" /> összetett függvény is differenciálható <M t="x" />-ben, és:
          </p>
          <M block t="(f\circ g)'(x) = f'\big(g(x)\big)\cdot g'(x)." />
          <p>
            Leibniz-féle jelölésben (<M t="y=f(u)" />, <M t="u=g(x)" />):
          </p>
          <M block t="\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}." />
        </Def>
        <GearChainWidget />
        <p>
          <em>Miért könnyű megjegyezni a Leibniz-alakot?</em> Úgy néz ki, mintha a két <M t="du" /> „kiesne” a szorzatból — bár valójában határértékek szorzatáról van szó, emlékeztetőnek tökéletes!
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Az <M t="y=(3x^2+1)^2" /> függvényt deriváld láncszabállyal (<M t="y=u^2,\; u=3x^2+1" />), majd ellenőrizd a zárójel felbontásával!
            </>
          }
        >
          <p>
            Láncszabállyal: <M t="\dfrac{dy}{du}\cdot\dfrac{du}{dx}=2u\cdot 6x = 2(3x^2+1)\cdot 6x = 36x^3+12x" />.
          </p>
          <p>
            Kibontva: <M t="y=9x^4+6x^2+1 \Rightarrow y'=36x^3+12x" /> — pontosan ugyanaz!
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Egy részecske helyzete <M t="x(t)=\cos(t^2+1)" />. Add meg a sebességét (<M t="dx/dt" />)!
            </>
          }
        >
          <p>
            <M t="u=t^2+1 \Rightarrow \dfrac{du}{dt}=2t" />, <M t="\dfrac{dx}{du}=-\sin u" />, tehát <M t="\dfrac{dx}{dt}=-\sin(t^2+1)\cdot 2t = -2t\sin(t^2+1)" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'A „kívülről befelé” módszer és többszemű láncok',
    body: (
      <>
        <p>
          A gyakorlatban ritkán írunk fel külön <M t="u" /> betűt — sokkal gyorsabb és átláthatóbb a <strong>„kívülről befelé”</strong> (hagyma-hámozás) gondolkodás:
        </p>
        <ol>
          <li>Deriváld a <strong>külső</strong> függvényt úgy, hogy a <strong>belső részt érintetlenül hagyod</strong>!</li>
          <li>Szorozd meg az egészet a <strong>belső rész deriváltjával</strong>!</li>
        </ol>
        <OutsideInsideDiagram />
        <h3>Háromszemű (és hosszabb) láncok</h3>
        <p>
          Ha a belső függvény maga is összetett, egyszerűen folytatod a hámozást egészen a legbelső <M t="x" />-ig! Nézzük a <M t="g(t)=\operatorname{tg}\big(5-\sin(2t)\big)" /> függvényt:
        </p>
        <M block t="g'(t) = \underbrace{\sec^2\big(5-\sin(2t)\big)}_{\text{1. külső: tg}} \cdot \underbrace{\big(-\cos(2t)\big)}_{\text{2. középső: }5-\sin} \cdot \underbrace{2}_{\text{3. legbelső: }2t} = -2\cos(2t)\sec^2\big(5-\sin(2t)\big)." />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Deriváld kívülről befelé: (a) <M t="y=\sin(4x-3)" />, (b) <M t="y=\cos(x^3)" />!
            </>
          }
        >
          <p>
            (a) <M t="y'=\cos(4x-3)\cdot 4 = 4\cos(4x-3)" />. (b) <M t="y'=-\sin(x^3)\cdot 3x^2 = -3x^2\sin(x^3)" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Háromszemű lánc: deriváld a <M t="y=\sin\big(\cos(3x)\big)" /> függvényt!
            </>
          }
        >
          <p>
            <M t="y'=\cos\big(\cos(3x)\big)\cdot\big(-\sin(3x)\big)\cdot 3 = -3\sin(3x)\cos\big(\cos(3x)\big)" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Hatványláncszabály és a radián-rejtély megoldása',
    body: (
      <>
        <p>
          A láncszabály messze leggyakoribb esete, amikor a külső függvény egy egész kitevőjű hatványozás (<M t="u^n" />):
        </p>
        <Def title="Hatványláncszabály">
          <p>
            Ha <M t="u(x)" /> differenciálható és <M t="n\in\mathbb{Z}" />:
          </p>
          <M block t="\frac{d}{dx}\big(u(x)^n\big) = n\cdot u(x)^{n-1}\cdot u'(x)." />
        </Def>
        <p>
          Ezzel olyan törteket is villámgyorsan deriválhatsz hányadosszabály nélkül, mint <M t="\dfrac{1}{3x-2}=(3x-2)^{-1}" />:
        </p>
        <M block t="\frac{d}{dx}(3x-2)^{-1} = -1\cdot(3x-2)^{-2}\cdot 3 = -\frac{3}{(3x-2)^2}." />
        <ChainStepperWidget />
        <h3>Miért jelent meg a π/180 fokmértéknél?</h3>
        <p>
          A láncszabály egyetlen sorban megmagyarázza a 3.4-es szakasz rejtélyét! Mivel <M t="x^\circ = \dfrac{\pi}{180}x" /> radián:
        </p>
        <M block t="\frac{d}{dx}\sin(x^\circ) = \frac{d}{dx}\sin\!\left(\frac{\pi}{180}x\right) = \cos\!\left(\frac{\pi}{180}x\right)\cdot\frac{\pi}{180} = \frac{\pi}{180}\cos(x^\circ)." />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Határozd meg az <M t="y=\sin^5 x" /> görbe meredekségét az <M t="x=\dfrac{\pi}{3}" /> helyen!
            </>
          }
        >
          <p>
            <M t="y'=5\sin^4 x\cos x" />. Behelyettesítve (<M t="\sin\frac{\pi}{3}=\frac{\sqrt{3}}{2}" />, <M t="\cos\frac{\pi}{3}=\frac{1}{2}" />):
          </p>
          <p>
            <M t="y'\left(\frac{\pi}{3}\right)=5\cdot\frac{9}{16}\cdot\frac{1}{2}=\dfrac{45}{32}" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Igazold, hogy az <M t="y=\dfrac{1}{(1-2x)^3}" /> görbe minden érintőjének meredeksége pozitív (<M t="x\ne \frac{1}{2}" />)!
            </>
          }
        >
          <p>
            <M t="y=(1-2x)^{-3} \Rightarrow y'=-3(1-2x)^{-4}\cdot(-2)=\dfrac{6}{(1-2x)^4}>0" /> minden <M t="x\ne\frac{1}{2}" />-re!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Paraméteres egyenletek és paraméteres görbék',
    body: (
      <>
        <Story>
          <p>
            Egy síkban mozgó drón vagy bolygó szabadon tehet hurkokat, köröket, nyolcasokat. Egy ilyen görbe nem felel meg a függőleges egyenes próbának, tehát <em>nem</em> írható fel egyetlen <M t="y=f(x)" /> függvénnyel — viszont ha külön megadjuk az <M t="x(t)" /> és <M t="y(t)" /> koordinátáját a <M t="t" /> idő függvényében, a mozgás minden pillanata tökéletesen leírható!
          </p>
        </Story>
        <Def title="Paraméteresen megadott görbe">
          <p>
            Ha az <M t="x=f(t)" /> és <M t="y=g(t)" /> függvények ugyanazon a <M t="t\in I" /> intervallumon vannak értelmezve, akkor az <M t="\big(f(t);\,g(t)\big)" /> pontok halmaza <strong>paraméteres görbe</strong>, <M t="t" /> a <strong>paraméter</strong>. Ha <M t="I=[a;\,b]" />, akkor <M t="(f(a);\,g(a))" /> a <em>kezdőpont</em>, <M t="(f(b);\,g(b))" /> a <em>végpont</em>.
          </p>
        </Def>
        <p>
          Ha kíváncsiak vagyunk a pálya geometriai alakjára, megpróbálhatjuk <strong>kiküszöbölni <M t="t" />-t</strong>:
        </p>
        <ul>
          <li><M t="x=a\cos t,\; y=b\sin t \;\Rightarrow\; \dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1" /> (ellipszis; ha <M t="a=b" />, akkor kör).</li>
          <li><M t="x=\sqrt{t},\; y=t\;(t\ge 0) \;\Rightarrow\; y=x^2" /> (a parabola jobb ága, mert <M t="x\ge 0" />).</li>
          <li><M t="(x_0;\,y_0)" /> és <M t="(x_1;\,y_1)" /> közötti szakasz: <M t="x=x_0+(x_1-x_0)t,\; y=y_0+(y_1-y_0)t,\; t\in[0;\,1]" />.</li>
        </ul>
        <ParamCurveWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Küszöböld ki a <M t="t" /> paramétert: <M t="x=2t-1,\; y=4t^2+3" /> (<M t="t\in\mathbb{R}" />)! Milyen görbe ez?
            </>
          }
        >
          <p>
            Az elsőből <M t="2t=x+1" />, így <M t="4t^2=(2t)^2=(x+1)^2" />. Tehát <M t="y=(x+1)^2+3" /> — egy felfelé nyíló parabola!
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Paraméterezd a <M t="(-2;\,1)" /> és <M t="(3;\,5)" /> pontokat összekötő szakaszt <M t="t\in[0;\,1]" />-en!
            </>
          }
        >
          <p>
            <M t="x=-2+5t,\; y=1+4t,\; 0\le t\le 1" /> (ellenőrzés: <M t="t=0\Rightarrow (-2;\,1)" />, <M t="t=1\Rightarrow (3;\,5)" />).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Paraméteres görbék meredeksége és második deriváltja',
    body: (
      <>
        <p>
          Hogyan számoljuk ki egy paraméteres görbe érintőjének <M t="dy/dx" /> meredekségét <strong>anélkül</strong>, hogy ki kellene küszöbölnünk <M t="t" />-t? A láncszabály megadja! Mivel <M t="\dfrac{dy}{dt}=\dfrac{dy}{dx}\cdot\dfrac{dx}{dt}" />, elosztva <M t="dx/dt" />-vel:
        </p>
        <Def title="Paraméteres deriválás (1. és 2. derivált)">
          <p>
            Ha <M t="dx/dt\ne 0" />, akkor a görbe meredeksége:
          </p>
          <M block t="y' = \frac{dy}{dx} = \frac{dy/dt}{dx/dt}." />
          <p>
            A második deriválthoz ugyanezt a képletet alkalmazzuk az <M t="y'" /> függvényre:
          </p>
          <M block t="\frac{d^2 y}{dx^2} = \frac{d}{dx}(y') = \frac{dy'/dt}{dx/dt}." />
        </Def>
        <ParamSlopeWidget />
        <h3>Mintapélda a második deriváltra</h3>
        <p>
          Legyen <M t="x=t-t^2" /> és <M t="y=t-t^3" />!
        </p>
        <ol>
          <li><M t="y'=\dfrac{dy/dt}{dx/dt}=\dfrac{1-3t^2}{1-2t}" />.</li>
          <li>Deriváljuk <M t="y'" />-t <M t="t" /> szerint (hányadosszabállyal): <M t="\dfrac{dy'}{dt}=\dfrac{(1-2t)(-6t)-(1-3t^2)(-2)}{(1-2t)^2}=\dfrac{6t^2-6t+2}{(1-2t)^2}" />.</li>
          <li>Osszuk el <M t="dx/dt=1-2t" />-vel: <M t="\dfrac{d^2y}{dx^2}=\dfrac{6t^2-6t+2}{(1-2t)^3}" />.</li>
        </ol>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Add meg az <M t="x=2t+3,\; y=t^2-1" /> görbe meredekségét <M t="t=6" /> esetén!
            </>
          }
        >
          <p>
            <M t="\dfrac{dy}{dx}=\dfrac{2t}{2}=t" />, tehát <M t="t=6" />-nál a meredekség <M t="6" />.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Írd fel az <M t="x=3\cos t,\; y=2\sin t" /> ellipszis <M t="t=\dfrac{\pi}{4}" /> pontbeli érintőjének egyenletét!
            </>
          }
        >
          <p>
            Pont: <M t="\left(\frac{3}{\sqrt{2}};\,\frac{2}{\sqrt{2}}\right)" />. Meredekség: <M t="\dfrac{2\cos(\pi/4)}{-3\sin(\pi/4)}=-\dfrac{2}{3}" />.
          </p>
          <p>
            Érintő: <M t="y-\dfrac{2}{\sqrt{2}}=-\dfrac{2}{3}\left(x-\dfrac{3}{\sqrt{2}}\right) \iff y=-\dfrac{2}{3}x+2\sqrt{2}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Táblázatos láncszabály és kompozíciók',
    body: (
      <>
        <p>
          A láncszabály igazi megértését legjobban a <strong>táblázatos feladatok</strong> teszik próbára: itt nem ismerjük <M t="f" /> és <M t="g" /> képletét, csak az értékeiket és deriváltjaikat néhány pontban.
        </p>
        <p>
          A kulcs: az <M t="(f\circ g)'(x_0) = f'\big(g(x_0)\big)\cdot g'(x_0)" /> képletben a külső <M t="f'" /> deriváltat <strong>NEM <M t="x_0" />-ban</strong>, hanem a <strong><M t="g(x_0)" /> helyen</strong> kell kiolvasni a táblázatból!
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th><M t="x" /></th>
              <th><M t="f(x)" /></th>
              <th><M t="g(x)" /></th>
              <th><M t="f'(x)" /></th>
              <th><M t="g'(x)" /></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><M t="2" /></td>
              <td><M t="8" /></td>
              <td><M t="3" /></td>
              <td><M t="1/3" /></td>
              <td><M t="5" /></td>
            </tr>
            <tr>
              <td><M t="3" /></td>
              <td><M t="4" /></td>
              <td><M t="2" /></td>
              <td><M t="2\pi" /></td>
              <td><M t="-3" /></td>
            </tr>
          </tbody>
        </table>
        <p>
          Például <M t="(f\circ g)'(2) = f'\big(g(2)\big)\cdot g'(2) = f'(3)\cdot 5 = 2\pi\cdot 5 = 10\pi" />! Figyeld meg, hogyan ugrottunk át az <M t="x=2" /> sorból az <M t="x=3" /> sorba, mert <M t="g(2)=3" />!
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              A fenti táblázat alapján számítsd ki: (a) <M t="(g\circ f)'(3)" /> (ha <M t="g'(4)" /> kellene, miért nem elég?), (b) <M t="\dfrac{d}{dx}\big(g(g(x))\big)" /> az <M t="x=2" /> helyen!
            </>
          }
        >
          <p>
            (a) <M t="f(3)=4" />, így <M t="g'(4)" /> kellene — ez nincs a táblázatban, tehát nem számítható ki.
          </p>
          <p>
            (b) <M t="g'\big(g(2)\big)\cdot g'(2) = g'(3)\cdot 5 = (-3)\cdot 5 = -15" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Ha <M t="s=\cos\theta" /> és <M t="\dfrac{d\theta}{dt}=5" />, mennyi <M t="\dfrac{ds}{dt}" /> a <M t="\theta=\dfrac{3\pi}{2}" /> helyen?
            </>
          }
        >
          <p>
            <M t="\dfrac{ds}{dt}=\dfrac{ds}{d\theta}\cdot\dfrac{d\theta}{dt}=(-\sin\theta)\cdot 5" />. Mivel <M t="\sin(3\pi/2)=-1" />, <M t="\dfrac{ds}{dt}=-(-1)\cdot 5 = 5" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Összefoglalás és a 4 legnagyobb buktató',
    body: (
      <>
        <table className="tbl">
          <thead>
            <tr>
              <th>szabály</th>
              <th>képlet</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Láncszabály</td>
              <td><M t="(f(g(x)))' = f'(g(x))\cdot g'(x)" /> vagy <M t="\dfrac{dy}{dx}=\dfrac{dy}{du}\cdot\dfrac{du}{dx}" /></td>
            </tr>
            <tr>
              <td>Hatványláncszabály</td>
              <td><M t="(u^n)' = n u^{n-1} u'" /></td>
            </tr>
            <tr>
              <td>Paraméteres 1. derivált</td>
              <td><M t="\dfrac{dy}{dx}=\dfrac{dy/dt}{dx/dt}" /> (<M t="dx/dt\ne 0" />)</td>
            </tr>
            <tr>
              <td>Paraméteres 2. derivált</td>
              <td><M t="\dfrac{d^2 y}{dx^2}=\dfrac{dy'/dt}{dx/dt}" /></td>
            </tr>
          </tbody>
        </table>
        <h3>Négy klasszikus hiba</h3>
        <Warn>
          <p>
            <strong>1. A belső derivált elfelejtése:</strong> <M t="(\sin(3x))' = 3\cos(3x)" />, NEM <M t="\cos(3x)" />! Mindig kérdezd meg: „van-e még valami a zárójel belsejében?”
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. A belső rész deriválása a külsőn belül:</strong> <M t="(\sin(x^2))'" /> NEM <M t="\cos(2x)" />, hanem <M t="\cos(x^2)\cdot 2x" />! A belső függvény a külsőn belül változatlan marad!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. <M t="\sin^3 x" /> vs. <M t="\sin(x^3)" />:</strong> az elsőnél a köb a külső (<M t="3\sin^2 x\cos x" />), a másodiknál a szinusz a külső (<M t="3x^2\cos(x^3)" />)!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Rossz paraméteres második derivált:</strong> <M t="\dfrac{d^2y}{dx^2}" /> NEM <M t="\dfrac{d^2y/dt^2}{d^2x/dt^2}" />! Mindig <M t="y'" />-t deriváld <M t="t" /> szerint, és oszd el <M t="dx/dt" />-vel!
          </p>
        </Warn>
      </>
    ),
  },

  // ---------------------------------------------------------------- 8
  {
    title: 'Lépcsőzetes gyakorlófeladatok (könnyűtől a haladóig)',
    body: (
      <>
        <p>
          Oldd meg az alábbi 9 feladatot növekvő nehézségi sorrendben!
        </p>

        <h3>Könnyebb (alapozó) feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Deriváld: <M t="y=(4-3x)^9" />!
            </>
          }
        >
          <p>
            <M t="y'=9(4-3x)^8\cdot(-3)=-27(4-3x)^8" />.
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Deriváld: <M t="f(x)=\cos(5x-1)+4\sin(2x)" />!
            </>
          }
        >
          <p>
            <M t="f'(x)=-5\sin(5x-1)+8\cos(2x)" />.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Deriváld: <M t="y=5\cos^4 x" />!
            </>
          }
        >
          <p>
            <M t="y'=5\cdot 4\cos^3 x\cdot(-\sin x)=-20\cos^3 x\sin x" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={16}
          q={
            <>
              Deriváld: <M t="y=\sec(\operatorname{tg} x)" />!
            </>
          }
        >
          <p>
            Külső <M t="\sec u \to \sec u\operatorname{tg} u" />, belső <M t="\operatorname{tg} x \to \sec^2 x" />:
          </p>
          <M block t="y'=\sec(\operatorname{tg} x)\,\operatorname{tg}(\operatorname{tg} x)\,\sec^2 x." />
        </Task>
        <Task
          n={17}
          q={
            <>
              Deriváld: <M t="y=\sin^2(\pi t - 2)" />!
            </>
          }
        >
          <p>
            Háromszemű lánc: <M t="y'=2\sin(\pi t-2)\cdot\cos(\pi t-2)\cdot\pi = 2\pi\sin(\pi t-2)\cos(\pi t-2)" /> (vagy <M t="\pi\sin(2\pi t-4)" />).
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Írd fel az <M t="y=2\operatorname{tg}\!\left(\dfrac{\pi x}{4}\right)" /> görbe <M t="x=1" /> abszcisszájú pontbeli érintőjének egyenletét!
            </>
          }
        >
          <p>
            Pont: <M t="y(1)=2\operatorname{tg}(\pi/4)=2" />, tehát <M t="(1;\,2)" />.
          </p>
          <p>
            Derivált: <M t="y'=2\sec^2\!\left(\dfrac{\pi x}{4}\right)\cdot\dfrac{\pi}{4}=\dfrac{\pi}{2}\sec^2\!\left(\dfrac{\pi x}{4}\right)" />. Az <M t="x=1" /> helyen <M t="\sec^2(\pi/4)=2" />, tehát <M t="m=\pi" />. Érintő: <M t="y=2+\pi(x-1)" />.
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={19}
          q={
            <>
              Szorzat- és láncszabály együtt: deriváld és hozd közös tényezős alakra az <M t="y=(4x+3)^4(x+1)^{-3}" /> függvényt!
            </>
          }
        >
          <p>
            <M t="y'=(4x+3)^4\cdot(-3)(x+1)^{-4} + (x+1)^{-3}\cdot 4(4x+3)^3\cdot 4" />.
          </p>
          <p>
            Kiemelve <M t="(4x+3)^3(x+1)^{-4}" />-et: <M t="y'=(4x+3)^3(x+1)^{-4}\big[-3(4x+3)+16(x+1)\big]=\dfrac{(4x+3)^3(4x+7)}{(x+1)^4}" />.
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Az <M t="x=t^2+1,\; y=t^3-3t" /> paraméteres görbéhez számítsd ki <M t="\dfrac{dy}{dx}" /> és <M t="\dfrac{d^2y}{dx^2}" /> értékét <M t="t=2" />-ben!
            </>
          }
        >
          <p>
            <M t="y'=\dfrac{3t^2-3}{2t}=\dfrac{3}{2}t-\dfrac{3}{2}t^{-1}" />, így <M t="t=2" />-ben <M t="y'=\dfrac{9}{4}" />.
          </p>
          <p>
            <M t="\dfrac{dy'}{dt}=\dfrac{3}{2}+\dfrac{3}{2t^2}" />, elosztva <M t="dx/dt=2t" />-vel: <M t="\dfrac{d^2y}{dx^2}=\dfrac{3t^2+3}{4t^3}" />. Behelyettesítve <M t="t=2" />-t: <M t="\dfrac{15}{32}" />.
          </p>
        </Task>
        <Task
          n={21}
          q={
            <>
              Hol vannak az előző feladat görbéjének (<M t="x=t^2+1,\; y=t^3-3t" />) <strong>vízszintes</strong>, és hol <strong>függőleges</strong> érintői?
            </>
          }
        >
          <p>
            <strong>Vízszintes érintő</strong> (<M t="dy/dt=0" /> és <M t="dx/dt\ne 0" />): <M t="3t^2-3=0 \iff t=\pm 1" />, a pontok <M t="(2;\,-2)" /> és <M t="(2;\,2)" />.
          </p>
          <p>
            <strong>Függőleges érintő</strong> (<M t="dx/dt=0" /> és <M t="dy/dt\ne 0" />): <M t="2t=0 \iff t=0" />, a pont <M t="(1;\,0)" />.
          </p>
        </Task>
      </>
    ),
  },
];
