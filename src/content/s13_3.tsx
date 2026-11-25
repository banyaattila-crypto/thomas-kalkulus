import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  ArcLengthParamWidget,
  ArcLengthPoly3DWidget,
  ArcLengthTangentMapDiagram,
  OrientationReversalWidget,
  PerfectSquareCurve3DWidget,
  TangentNormalPlane3DWidget,
  UnifiedArcLengthWidget,
  UnitTangent3DWidget,
} from '../components/Widgets133';
import type { Page } from './s1_1';

export const S13_3: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Térgörbék ívhossza',
    body: (
      <>
        <Story>
          <p>
            Ha egy hullámvasút sínje mentén végigsétálsz egy mérőszalaggal, pontosan mekkora utat teszel meg? A
            háromdimenziós térgörbe hosszát ugyanazzal az ötlettel kapjuk meg, mint síkban: a görbét apró egyenes
            szakaszokkal (töröttvonallal) közelítjük, összegezzük a hosszukat, majd határátmenetet veszünk!
          </p>
        </Story>

        <Def title="Sima térgörbe ívhossza">
          <p>
            Egy sima <M t="\mathbf{r}(t) = \langle f(t), g(t), h(t) \rangle" /> görbe hossza az <M t="[a, b]" />{' '}
            intervallumon (feltéve, hogy a görbét pontosan egyszer járja be):
          </p>
          <M block t="L = \int_a^b |\mathbf{v}(t)|\,dt = \int_a^b \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2 + \left(\frac{dz}{dt}\right)^2}\,dt." />
          <p>
            <strong>Fizikai jelentés:</strong> az ívhossz pontosan a <em>sebességnagyság</em> idő szerinti integrálja
            — vagyis a jármű kilométerórájának állása!
          </p>
        </Def>

        <ArcLengthPoly3DWidget />

        <Task n={1} q={<>Számítsd ki az <M t="\mathbf{r}(t) = \langle 3\cos t,\; 3\sin t,\; 4t \rangle" /> csavarvonal egy teljes menetének (<M t="0 \le t \le 2\pi" />) hosszát!</>}>
          <p>
            <M t="\mathbf{v}(t) = \langle -3\sin t,\; 3\cos t,\; 4 \rangle" />, tehát{' '}
            <M t="|\mathbf{v}(t)| = \sqrt{9\sin^2 t + 9\cos^2 t + 16} = \sqrt{25} = 5" />. Így{' '}
            <M t="L = \int_0^{2\pi} 5\,dt = 10\pi" />.
          </p>
        </Task>

        <Task n={2} q={<>Milyen hosszú az <M t="\mathbf{r}(t) = \langle 1 + 2t,\; 3 - t,\; 2t \rangle" /> egyenes szakasz <M t="0 \le t \le 4" /> között?</>}>
          <p>
            <M t="\mathbf{v}(t) = \langle 2, -1, 2 \rangle" />, hossza <M t="\sqrt{4 + 1 + 4} = 3" />. Tehát{' '}
            <M t="L = \int_0^4 3\,dt = 12" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Az ívhosszparaméter és a természetes paraméterezés',
    body: (
      <>
        <p>
          Egy útvonalat megadhatunk az eltelt <em>idő</em> (<M t="t" />) szerint, de megadhatjuk az út menti{' '}
          <strong>kilométerkövek</strong> (<M t="s" />) szerint is! Ha a görbét az <M t="s" /> megtett ívhosszal
          paraméterezzük, megkapjuk a görbe <strong>természetes (ívhossz-) paraméterezését</strong>.
        </p>

        <Def title="Az ívhosszfüggvény s(t)">
          <M block t="s(t) = \int_{t_0}^t |\mathbf{v}(\tau)|\,d\tau \qquad \Longrightarrow \qquad \frac{ds}{dt} = |\mathbf{v}(t)|." />
          <p>
            Mivel sima görbén <M t="|\mathbf{v}(t)| > 0" />, az <M t="s(t)" /> szigorúan monoton növekszik, így
            megfordítható (<M t="t = t(s)" />). Ezt visszahelyettesítve <M t="\mathbf{r}(t(s))" /> mindig{' '}
            <strong>egységnyi sebességgel</strong> (<M t="|\frac{d\mathbf{r}}{ds}| = 1" />) halad!
          </p>
        </Def>

        <ArcLengthParamWidget />

        <Quiz
          q={<>Ha egy térgörbe a természetes <M t="s" /> ívhosszparaméterrel van megadva (<M t="\mathbf{r}(s)" />), mennyi <M t="\big|\frac{d\mathbf{r}}{ds}\big|" /> minden pontban?</>}
          options={[
            { label: <M t="0" /> },
            { label: <M t="1" />, ok: true },
            { label: <M t="s" /> },
            { label: <>A görbe teljes <M t="L" /> hossza</> },
          ]}
          explain={
            <>
              A láncszabállyal <M t="\frac{d\mathbf{r}}{ds} = \frac{d\mathbf{r}/dt}{ds/dt} = \frac{\mathbf{v}(t)}{|\mathbf{v}(t)|}" />,
              amelynek hossza mindig pontosan <M t="1" />!
            </>
          }
        />

        <Task n={3} q={<>Paraméterezd ívhosszal az <M t="\mathbf{r}(t) = \langle 3\cos t,\; 3\sin t,\; 4t \rangle" /> csavarvonalat a <M t="t_0 = 0" /> ponttól mérve!</>}>
          <p>
            Az 1. feladatból <M t="|\mathbf{v}(t)| = 5" />, tehát <M t="s(t) = \int_0^t 5\,d\tau = 5t \Rightarrow t = \frac{s}{5}" />.
            Visszahelyettesítve: <M t="\mathbf{r}(s) = \big\langle 3\cos\frac{s}{5},\; 3\sin\frac{s}{5},\; \frac{4}{5}s \big\rangle" />.
          </p>
        </Task>

        <Task n={4} q={<>Ívhosszal van-e paraméterezve az <M t="\mathbf{r}(s) = \langle \cos(2s),\; \sin(2s),\; 0 \rangle" /> görbe?</>}>
          <p>
            <M t="\mathbf{r}'(s) = \langle -2\sin(2s),\; 2\cos(2s),\; 0 \rangle" />, hossza <M t="2 \neq 1" />. Tehát{' '}
            <strong>nem</strong>! (A helyes ívhosszparaméterezés <M t="\langle \cos s, \sin s, 0 \rangle" /> lenne.)
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Pontos ívhossz a teljes négyzet trükkjével',
    body: (
      <>
        <p>
          Az ívhossz-integrálban négyzetgyök szerepel, ezért általában nehéz (vagy nem elemi) a primitív függvénye.
          Vizsgákon és tankönyvi feladatokban azonban gyakran egy gyönyörű algebrai szerkezet segít: a gyök alatti
          összeg <strong>teljes négyzetté</strong> alakul!
        </p>

        <PerfectSquareCurve3DWidget />

        <Steps
          title="Pontos ívhossz teljes négyzetté alakítással"
          problem={
            <>
              Számítsd ki az <M t="\mathbf{r}(t) = \big\langle 2t,\; t^2,\; \frac{1}{3}t^3 \big\rangle" /> görbe
              ívhosszát a <M t="0 \le t \le 3" /> intervallumon!
            </>
          }
          steps={[
            {
              title: 'Számítsuk ki a sebességvektort',
              body: <M t="\mathbf{v}(t) = \mathbf{r}'(t) = \langle 2,\; 2t,\; t^2 \rangle." />,
            },
            {
              title: 'Írjuk fel |v(t)|²-et és ismerjük fel a teljes négyzetet',
              body: (
                <>
                  <M t="|\mathbf{v}(t)|^2 = 4 + 4t^2 + t^4 = (2 + t^2)^2" />. Mivel <M t="2 + t^2 > 0" />, a gyök
                  egyszerűen <M t="|\mathbf{v}(t)| = 2 + t^2" />!
                </>
              ),
            },
            {
              title: 'Integráljunk [0, 3]-on',
              body: (
                <>
                  <M t="L = \int_0^3 (2 + t^2)\,dt = \Big[2t + \frac{t^3}{3}\Big]_0^3 = 6 + 9 = 15." />
                </>
              ),
            },
          ]}
        />

        <Task n={5} q={<>Számítsd ki az <M t="\mathbf{r}(t) = \big\langle t,\; \frac{2\sqrt{2}}{3}t^{3/2},\; \frac{1}{2}t^2 \big\rangle" /> görbe hosszát a <M t="0 \le t \le 2" /> szakaszon!</>}>
          <p>
            <M t="\mathbf{v}(t) = \langle 1,\; \sqrt{2}\,t^{1/2},\; t \rangle" />, így{' '}
            <M t="|\mathbf{v}(t)|^2 = 1 + 2t + t^2 = (1 + t)^2 \Rightarrow |\mathbf{v}(t)| = 1 + t" />. Integrálva:{' '}
            <M t="L = \int_0^2 (1 + t)\,dt = \big[t + \frac{t^2}{2}\big]_0^2 = 4" />.
          </p>
        </Task>

        <Task n={6} q={<>Mekkora az <M t="\mathbf{r}(t) = \langle e^t\cos t,\; e^t\sin t,\; e^t \rangle" /> exponenciális spirál hossza <M t="0 \le t \le \ln 2" /> között?</>}>
          <p>
            <M t="\mathbf{v}(t) = e^t\langle \cos t - \sin t,\; \sin t + \cos t,\; 1 \rangle" />, amiből{' '}
            <M t="|\mathbf{v}(t)| = e^t\sqrt{2 + 1} = \sqrt{3}\,e^t" />. Így{' '}
            <M t="L = \int_0^{\ln 2} \sqrt{3}\,e^t\,dt = \sqrt{3}(2 - 1) = \sqrt{3}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A normált érintővektor T(t)',
    body: (
      <>
        <p>
          A <M t="\mathbf{v}(t)" /> sebességvektor egyszerre hordoz két információt: a mozgás <em>irányát</em> és a{' '}
          <em>gyorsaságát</em>. Ha csak a görbe tiszta, geometriai irányára vagyunk kíváncsiak, leosztjuk a saját
          hosszával — így kapjuk a <strong>normált érintővektort</strong>!
        </p>

        <Def title="Normált érintővektor (egység-érintővektor)">
          <p>
            Egy sima <M t="\mathbf{r}(t)" /> görbe (<M t="\mathbf{v}(t) \neq \mathbf{0}" />) <strong>normált érintővektora</strong>:
          </p>
          <M block t="\mathbf{T}(t) = \frac{\mathbf{v}(t)}{|\mathbf{v}(t)|} = \frac{d\mathbf{r}/dt}{ds/dt} = \frac{d\mathbf{r}}{ds}." />
          <p>
            Mindig <strong>egységnyi hosszúságú</strong> (<M t="|\mathbf{T}(t)| = 1" />), és pontosan a növekvő{' '}
            <M t="t" /> (mozgás) irányába mutat.
          </p>
        </Def>

        <UnitTangent3DWidget />

        <Task n={7} q={<>Határozd meg a <M t="\mathbf{T}(t)" /> normált érintővektort az <M t="\mathbf{r}(t) = \langle 3\cos t,\; 3\sin t,\; 4t \rangle" /> csavarvonalon!</>}>
          <p>
            <M t="\mathbf{v}(t) = \langle -3\sin t,\; 3\cos t,\; 4 \rangle" />, <M t="|\mathbf{v}(t)| = 5" />. Tehát{' '}
            <M t="\mathbf{T}(t) = \big\langle -\frac{3}{5}\sin t,\; \frac{3}{5}\cos t,\; \frac{4}{5} \big\rangle" />.
          </p>
        </Task>

        <Task n={8} q={<>Add meg <M t="\mathbf{T}(1)" /> értékét az <M t="\mathbf{r}(t) = \langle t,\; t^2,\; t^3 \rangle" /> térugörbén!</>}>
          <p>
            <M t="\mathbf{v}(t) = \langle 1, 2t, 3t^2 \rangle \Rightarrow \mathbf{v}(1) = \langle 1, 2, 3 \rangle" />,
            hossza <M t="\sqrt{1+4+9} = \sqrt{14}" />. Így{' '}
            <M t="\mathbf{T}(1) = \frac{1}{\sqrt{14}}\langle 1,\; 2,\; 3 \rangle" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Orientáció, paraméterfüggetlenség és T ⊥ T′',
    body: (
      <>
        <p>
          Ha kétszer olyan gyorsan futsz végig ugyanazon a pályán, a <M t="\mathbf{v}" /> sebességvektorod kétszer
          akkora lesz — de a <M t="\mathbf{T}" /> normált érintővektor <strong>egy millimétert sem változik</strong>!
          Csak akkor fordul ellentétesére (<M t="-\mathbf{T}" />), ha megfordítod a bejárás irányát (az{' '}
          <em>orientációt</em>).
        </p>

        <OrientationReversalWidget />

        <Warn>
          Ne feledd a 13.1 fejezet állandó hosszúság tételét! Mivel <M t="|\mathbf{T}(t)| = 1" /> minden <M t="t" />-re
          állandó, automatikusan igaz, hogy <M t="\mathbf{T}(t) \cdot \mathbf{T}'(t) = 0" /> — vagyis{' '}
          <strong><M t="\mathbf{T}'(t)" /> mindig merőleges <M t="\mathbf{T}(t)" />-re</strong>! Ez lesz a 13.4 fejezet
          főnormális vektorának kulcsa.
        </Warn>

        <Quiz
          q={<>Ha ugyanazt a görbét <M t="u = -t" /> helyettesítéssel fordított irányban járjuk be, hogyan változik az <M t="L" /> ívhossz és a <M t="\mathbf{T}" /> normált érintővektor?</>}
          options={[
            { label: <>Mindkettő előjelet vált</> },
            { label: <><M t="L" /> változatlan marad, <M t="\mathbf{T}" /> ellentétes irányú lesz (<M t="-\mathbf{T}" />)</>, ok: true },
            { label: <>Mindkettő változatlan marad</> },
            { label: <><M t="L" /> negatív lesz, <M t="\mathbf{T}" /> változatlan</> },
          ]}
          explain={
            <>
              Az ívhossz geometriai távolság (<M t="L \ge 0" />), nem függ az iránytól; a normált érintővektor viszont
              a mozgás irányába mutat, ezért <M t="-\mathbf{T}" />-re vált!
            </>
          }
        />

        <Task n={9} q={<>Ellenőrizd a 7. feladat <M t="\mathbf{T}(t) = \frac{1}{5}\langle -3\sin t, 3\cos t, 4 \rangle" /> vektorán, hogy valóban <M t="\mathbf{T}(t)\cdot\mathbf{T}'(t) = 0" />!</>}>
          <p>
            <M t="\mathbf{T}'(t) = \frac{1}{5}\langle -3\cos t, -3\sin t, 0 \rangle" />. Skalárszorzatuk:{' '}
            <M t="\frac{1}{25}(9\sin t\cos t - 9\cos t\sin t + 0) = 0" />!
          </p>
        </Task>

        <Task n={10} q={<>Mutasd meg, hogy <M t="\mathbf{r}_1(t) = \langle t, t^2 \rangle" /> (<M t="0\le t\le 2" />) és <M t="\mathbf{r}_2(u) = \langle 2u, 4u^2 \rangle" /> (<M t="0\le u\le 1" />) ugyanazt az ívhossz-integrált adja!</>}>
          <p>
            <M t="\int_0^1 \sqrt{4 + 64u^2}\,du = \int_0^1 2\sqrt{1 + 4(2u)^2}\,du" />. A <M t="t = 2u,\; dt = 2\,du" />{' '}
            helyettesítéssel pontosan <M t="\int_0^2 \sqrt{1 + 4t^2}\,dt" /> adódik!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Minden ívhossz-képlet egyesítése',
    body: (
      <>
        <p>
          A II. kötetben (6.3 fejezet) és a 10. fejezetben (10.7) külön képleteket tanultunk a Descartes-görbék és a
          polárgörbék ívhosszára. A vektorfüggvények segítségével végre látjuk, hogy mindhárom{' '}
          <strong>egyetlen közös képlet</strong> (<M t="ds = |\mathbf{r}'(t)|\,dt" />) különleges esete!
        </p>

        <UnifiedArcLengthWidget />

        <Task n={11} q={<>Számítsd ki az <M t="r = e^\theta" /> logaritmikus spirál hosszát <M t="0 \le \theta \le \pi" /> között a <M t="\sqrt{r^2 + (r')^2}" /> képlettel!</>}>
          <p>
            <M t="r'(\theta) = e^\theta" />, így <M t="\sqrt{e^{2\theta} + e^{2\theta}} = \sqrt{2}\,e^\theta" />.
            Integrálva: <M t="L = \int_0^\pi \sqrt{2}\,e^\theta\,d\theta = \sqrt{2}(e^\pi - 1)" />.
          </p>
        </Task>

        <Task n={12} q={<>Számítsd ki a ciklois egy ívének (<M t="\mathbf{r}(t) = \langle t - \sin t,\; 1 - \cos t \rangle,\; 0 \le t \le 2\pi" />) hosszát!</>}>
          <p>
            <M t="|\mathbf{v}(t)|^2 = (1-\cos t)^2 + \sin^2 t = 2(1-\cos t) = 4\sin^2\!\frac{t}{2}" />. Mivel{' '}
            <M t="\sin\frac{t}{2} \ge 0" /> a <M t="[0, 2\pi]" /> szakaszon,{' '}
            <M t="L = \int_0^{2\pi} 2\sin\frac{t}{2}\,dt = \big[-4\cos\frac{t}{2}\big]_0^{2\pi} = 4 - (-4) = 8" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Normálsík és ívhosszal mért pontok a térben',
    body: (
      <>
        <p>
          A 12.5 fejezetben megtanultuk, hogyan adunk meg egy síkot egy pontjával és a normálvektorával. Egy térgörbe{' '}
          <M t="P_0 = \mathbf{r}(t_0)" /> pontjában a <strong>normálsík</strong> az a sík, amely átmegy{' '}
          <M t="P_0" />-n és merőleges a görbére — vagyis normálvektora maga a <M t="\mathbf{T}(t_0)" /> (vagy{' '}
          <M t="\mathbf{v}(t_0)" />) érintővektor!
        </p>

        <TangentNormalPlane3DWidget />

        <Quiz
          q={<>Mi a <M t="\mathbf{r}(t) = \langle t,\; t^2,\; t^3 \rangle" /> görbe normálsíkjának egyenlete a <M t="t_0 = 1" /> (azaz <M t="(1; 1; 1)" />) pontban?</>}
          options={[
            { label: <M t="x + y + z = 3" /> },
            { label: <M t="x + 2y + 3z = 6" />, ok: true },
            { label: <M t="2x + 3y + z = 6" /> },
            { label: <M t="x - 2y + 3z = 2" /> },
          ]}
          explain={
            <>
              <M t="\mathbf{v}(1) = \langle 1, 2, 3 \rangle" /> a normálvektor, így{' '}
              <M t="1(x-1) + 2(y-1) + 3(z-1) = 0 \Rightarrow x + 2y + 3z = 6" />.
            </>
          }
        />

        <Task n={13} q={<>Írd fel az <M t="\mathbf{r}(t) = \langle \cos t,\; \sin t,\; t \rangle" /> csavarvonal normálsíkját a <M t="t_0 = \pi" /> pontban!</>}>
          <p>
            Pont: <M t="(-1;\; 0;\; \pi)" />. Normálvektor: <M t="\mathbf{v}(\pi) = \langle 0, -1, 1 \rangle" />. A
            sík: <M t="0(x+1) - 1(y-0) + 1(z-\pi) = 0 \Rightarrow z - y = \pi" />.
          </p>
        </Task>

        <Task n={14} q={<>Az <M t="\mathbf{r}(t) = \langle 3\cos t,\; 3\sin t,\; 4t \rangle" /> csavarvonalon <M t="t = 0" />-tól indulva pontosan <M t="s = 5\pi" /> ívhosszt teszünk meg. Melyik pontba jutunk?</>}>
          <p>
            A 3. feladatból <M t="s = 5t \Rightarrow t = \frac{5\pi}{5} = \pi" />. A pont:{' '}
            <M t="\mathbf{r}(\pi) = \langle -3,\; 0,\; 4\pi \rangle" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Összefoglaló térkép és gyakorlófeladatok',
    body: (
      <>
        <ArcLengthTangentMapDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Számítsd ki az <M t="\mathbf{r}(t) = \langle 4\cos t,\; 4\sin t,\; 3t \rangle" /> görbe ívhosszát <M t="0 \le t \le \pi" /> között!</>}>
          <p>
            <M t="|\mathbf{v}(t)| = \sqrt{16 + 9} = 5 \Rightarrow L = \int_0^\pi 5\,dt = 5\pi" />.
          </p>
        </Task>

        <Task n={16} q={<>Add meg a <M t="\mathbf{T}(t)" /> normált érintővektort az <M t="\mathbf{r}(t) = \langle 2t,\; 1 - 2t,\; t + 5 \rangle" /> egyeneshez!</>}>
          <p>
            <M t="\mathbf{v}(t) = \langle 2, -2, 1 \rangle" />, hossza <M t="3" />, tehát{' '}
            <M t="\mathbf{T}(t) = \big\langle \frac{2}{3},\; -\frac{2}{3},\; \frac{1}{3} \big\rangle" /> (állandó).
          </p>
        </Task>

        <Task n={17} q={<>Add meg a <M t="\mathbf{T}(0)" /> vektort az <M t="\mathbf{r}(t) = \langle e^t,\; \sin(2t),\; 2t \rangle" /> görbén!</>}>
          <p>
            <M t="\mathbf{v}(0) = \langle 1, 2, 2 \rangle" />, hossza <M t="3" />, tehát{' '}
            <M t="\mathbf{T}(0) = \big\langle \frac{1}{3},\; \frac{2}{3},\; \frac{2}{3} \big\rangle" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Számítsd ki az <M t="\mathbf{r}(t) = \langle t^2,\; 2t,\; \ln t \rangle" /> görbe hosszát az <M t="1 \le t \le e" /> intervallumon!</>}>
          <p>
            <M t="\mathbf{v}(t) = \langle 2t, 2, \frac{1}{t} \rangle" />, így{' '}
            <M t="|\mathbf{v}(t)|^2 = 4t^2 + 4 + \frac{1}{t^2} = \big(2t + \frac{1}{t}\big)^2" />. Integrálva:{' '}
            <M t="L = \int_1^e \big(2t + \frac{1}{t}\big)\,dt = [t^2 + \ln t]_1^e = (e^2 + 1) - (1 + 0) = e^2" />!
          </p>
        </Task>

        <Task n={19} q={<>Paraméterezd ívhosszal az <M t="\mathbf{r}(t) = \langle 1 + 2t,\; 4 - 2t,\; t \rangle" /> egyenest a <M t="t_0 = 0" /> ponttól!</>}>
          <p>
            <M t="|\mathbf{v}| = \sqrt{4+4+1} = 3 \Rightarrow s = 3t \Rightarrow t = \frac{s}{3}" />. Így{' '}
            <M t="\mathbf{r}(s) = \big\langle 1 + \frac{2}{3}s,\; 4 - \frac{2}{3}s,\; \frac{1}{3}s \big\rangle" />.
          </p>
        </Task>

        <Task n={20} q={<>Írd fel a <M t="\mathbf{r}(t) = \langle \cosh t,\; \sinh t,\; t \rangle" /> görbe ívhosszát <M t="0 \le t \le \ln 3" /> között!</>}>
          <p>
            <M t="|\mathbf{v}(t)|^2 = \sinh^2 t + \cosh^2 t + 1 = 2\cosh^2 t \Rightarrow |\mathbf{v}(t)| = \sqrt{2}\cosh t" />.
            Így <M t="L = \sqrt{2}[\sinh t]_0^{\ln 3} = \sqrt{2}\cdot\frac{3 - 1/3}{2} = \frac{4\sqrt{2}}{3}" />.
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Paraméterezd ívhosszal az <M t="\mathbf{r}(t) = \langle e^t\cos t,\; e^t\sin t,\; e^t \rangle" /> görbét <M t="t_0 = 0" />-tól!</>}>
          <p>
            A 6. feladatból <M t="s(t) = \sqrt{3}(e^t - 1) \Rightarrow e^t = 1 + \frac{s}{\sqrt{3}}" />, tehát{' '}
            <M t="t = \ln\!\big(1 + \frac{s}{\sqrt{3}}\big)" />. Behelyettesítve:{' '}
            <M t="\mathbf{r}(s) = \big(1 + \frac{s}{\sqrt{3}}\big)\Big\langle \cos\!\ln\!\big(1+\frac{s}{\sqrt{3}}\big),\; \sin\!\ln\!\big(1+\frac{s}{\sqrt{3}}\big),\; 1 \Big\rangle" />.
          </p>
        </Task>

        <Task n={22} q={<>Bizonyítsd be, hogy ha egy görbe <M t="\mathbf{T}(t)" /> normált érintővektora állandó (<M t="\mathbf{T}(t) = \mathbf{T}_0" />), akkor a görbe egy egyenes szakasza!</>}>
          <p>
            Mivel <M t="\frac{d\mathbf{r}}{ds} = \mathbf{T}_0" /> állandó, <M t="s" /> szerint integrálva{' '}
            <M t="\mathbf{r}(s) = \mathbf{r}(0) + s\,\mathbf{T}_0" />, ami pontosan egy <M t="\mathbf{T}_0" />{' '}
            irányvektorú egyenes paraméteres egyenlete!
          </p>
        </Task>

        <Task n={23} q={<>Mutasd meg, hogy egy állandó szögű csavarvonalon (<M t="\mathbf{r}(t) = \langle a\cos t, a\sin t, bt \rangle" />) a <M t="\mathbf{T}(t)" /> érintővektor minden pontban pontosan ugyanakkora <M t="\varphi" /> szöget zár be a <M t="z" />-tengellyel!</>}>
          <p>
            <M t="\mathbf{T}(t)\cdot\mathbf{k} = \frac{b}{\sqrt{a^2+b^2}}" />, ami független <M t="t" />-től! Tehát{' '}
            <M t="\cos\varphi = \frac{b}{\sqrt{a^2+b^2}}" /> állandó — a csavarvonal minden pontban azonos meredekséggel
            emelkedik.
          </p>
        </Task>
      </>
    ),
  },
];
