import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  KeplerPolarOrbitWidget,
  PolarCircleCosineLawWidget,
  PolarConicDerivationDiagram,
  PolarConicFourOrientationsWidget,
  PolarConicNormalizedLabWidget,
  PolarConicsSummaryDiagram,
  PolarLineNormalWidget,
  RotatedPolarConicWidget,
} from '../components/Widgets108';
import type { Page } from './s1_1';

export const S10_8: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Egyenesek polárkoordinátákban',
    body: (
      <>
        <Story>
          <p>
            A 10. fejezet záró szakaszában összeér minden, amit eddig tanultunk: a kúpszeletek, az excentricitás, a
            vezéregyenes és a polárkoordináták! A csillagászatban és az űrhajózásban a bolygók, műholdak és üstökösök
            pályáját egyetlen elegáns poláregyenlettel írják le, amelyben a Nap pontosan a <strong>pólusban</strong>{' '}
            ül. Előtte azonban röviden összefoglaljuk az egyenesek és körök általános poláregyenletét is.
          </p>
        </Story>

        <Def title="Egyenes poláris normálegyenlete">
          <p>
            Ha egy egyenes nem megy át a póluson, és a pólusból rá bocsátott merőleges talppontja{' '}
            <M t="P_0(r_0;\,\theta_0)" /> (<M t="r_0 > 0" />), akkor az egyenes poláregyenlete:
          </p>
          <M block t="r\cos(\theta - \theta_0) = r_0." />
          <p>
            Speciálisan: <M t="\theta_0 = 0 \Rightarrow r\cos\theta = r_0" /> (függőleges <M t="x = r_0" /> egyenes),{' '}
            <M t="\theta_0 = \tfrac{\pi}{2} \Rightarrow r\sin\theta = r_0" /> (vízszintes <M t="y = r_0" /> egyenes).
          </p>
        </Def>

        <PolarLineNormalWidget />

        <Quiz
          q={<>Melyik egyenest írja le az <M t="r\cos\left(\theta - \tfrac{\pi}{4}\right) = \sqrt{2}" /> poláregyenlet?</>}
          options={[
            { label: <M t="x + y = 2" />, ok: true },
            { label: <M t="x - y = 2" /> },
            { label: <M t="x + y = \sqrt{2}" /> },
            { label: <M t="x = \sqrt{2}" /> },
          ]}
          explain={
            <>
              A <M t="\cos(\theta - \tfrac{\pi}{4}) = \tfrac{\sqrt{2}}{2}(\cos\theta + \sin\theta)" /> addíciós
              képlettel: <M t="\tfrac{\sqrt{2}}{2}(r\cos\theta + r\sin\theta) = \sqrt{2} \Longrightarrow x + y = 2" />!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={1} q={<>Írd fel annak az egyenesnek a poláregyenletét, amelynek az origótól mért távolsága 3, és normálvektora <M t="\theta_0 = \tfrac{2\pi}{3}" /> irányú!</>}>
          <p>
            <M t="r\cos\left(\theta - \tfrac{2\pi}{3}\right) = 3" />. Descartes-alakban:{' '}
            <M t="-\tfrac{1}{2}x + \tfrac{\sqrt{3}}{2}y = 3 \Longrightarrow -x + \sqrt{3}\,y = 6" />.
          </p>
        </Task>
        <Task n={2} q={<>Mennyi az <M t="r\cos\left(\theta - \tfrac{\pi}{6}\right) = 5" /> egyenes távolsága az origótól?</>}>
          <p>
            A normálalakból azonnal leolvasható: <M t="r_0 = 5" /> egység!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Körök polárkoordinátákban',
    body: (
      <>
        <p>
          Egy tetszőleges <M t="P_0(r_0;\,\theta_0)" /> középpontú, <M t="a" /> sugarú kör poláregyenletét az{' '}
          <M t="OP_0P" /> háromszögre felírt <strong>koszinusztétel</strong> adja meg:
        </p>

        <Def title="Kör poláregyenlete (általános és origón átmenő)">
          <M block t="a^2 = r_0^2 + r^2 - 2r_0 r\cos(\theta - \theta_0)." />
          <p>
            Ha a kör <strong>átmegy a póluson</strong>, akkor <M t="r_0 = a" />, az <M t="a^2" /> tagok kiesnek, és
            egyetlen sorra egyszerűsödik:
          </p>
          <M block t="r = 2a\cos(\theta - \theta_0)." />
          <ul>
            <li>Középpont a pozitív/negatív <M t="x" />-tengelyen: <M t="r = \pm 2a\cos\theta" />.</li>
            <li>Középpont a pozitív/negatív <M t="y" />-tengelyen: <M t="r = \pm 2a\sin\theta" />.</li>
          </ul>
        </Def>

        <PolarCircleCosineLawWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={3} q={<>Add meg az <M t="r = 8\cos\left(\theta - \tfrac{\pi}{3}\right)" /> kör sugarát és középpontjának polárkoordinátáit!</>}>
          <p>
            <M t="2a = 8 \Rightarrow a = 4" />, a középpont <M t="P_0\left(4;\,\tfrac{\pi}{3}\right)" /> (és a kör
            átmegy az origón).
          </p>
        </Task>
        <Task n={4} q={<>Írd fel polárkoordinátákban az <M t="a = 2" /> sugarú, <M t="P_0(3;\,0)" /> középpontú kör egyenletét!</>}>
          <p>
            <M t="4 = 9 + r^2 - 6r\cos\theta \Longrightarrow r^2 - 6r\cos\theta + 5 = 0" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Minden kúpszelet egyetlen polárképletben',
    body: (
      <>
        <p>
          Helyezzük egy <M t="e > 0" /> excentricitású kúpszelet egyik <strong>fókuszpontját a pólusba</strong> (
          <M t="F = O" />), a hozzá tartozó vezéregyenest pedig a pólustól jobbra, az <M t="x = k" /> (<M t="k > 0" />)
          egyenesre! Ekkor bármely <M t="P(r;\,\theta)" /> pontra <M t="PF = r" /> és <M t="PD = k - r\cos\theta" />.
          A 10.2-ben megismert <M t="PF = e\cdot PD" /> fókusz–vezéregyenes egyenlőségből:
        </p>
        <M block t="r = e(k - r\cos\theta) \ \Longrightarrow\ r(1 + e\cos\theta) = ke \ \Longrightarrow\ r = \frac{ke}{1 + e\cos\theta}!" />

        <Def title="Kúpszeletek poláregyenlete (fókusz a pólusban, vezéregyenes x = k > 0)">
          <M block t="r = \frac{ke}{1 + e\cos\theta}." />
          <ul>
            <li><M t="0 < e < 1" />: <strong>ellipszis</strong>;</li>
            <li><M t="e = 1" />: <strong>parabola</strong>;</li>
            <li><M t="e > 1" />: <strong>hiperbola</strong>.</li>
          </ul>
        </Def>

        <PolarConicDerivationDiagram />

        <Quiz
          q={<>Milyen kúpszeletet ír le az <M t="r = \dfrac{6}{1 + 1{,}5\cos\theta}" /> egyenlet, és hol van a vezéregyenese?</>}
          options={[
            { label: <>Ellipszis, <M t="x = 4" /></> },
            { label: <>Hiperbola, <M t="x = 4" /></>, ok: true },
            { label: <>Hiperbola, <M t="x = 6" /></> },
            { label: <>Parabola, <M t="x = 4" /></> },
          ]}
          explain={
            <>
              A nevezőben már 1 áll, így azonnal leolvasható <M t="e = 1{,}5 > 1" /> (<strong>hiperbola</strong>), és{' '}
              <M t="ke = 6 \Rightarrow k = \dfrac{6}{1{,}5} = 4" />, tehát a vezéregyenes <M t="x = 4" />!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={5} q={<>Írd fel annak a parabolának a poláregyenletét, amelynek fókusza a pólus, vezéregyenese pedig <M t="x = 5" />!</>}>
          <p>
            Parabola esetén <M t="e = 1" />, itt <M t="k = 5" />, tehát <M t="r = \dfrac{5}{1 + \cos\theta}" />.
          </p>
        </Task>
        <Task n={6} q={<>Hol van az <M t="r = \dfrac{5}{1 + \cos\theta}" /> parabola csúcsa?</>}>
          <p>
            A legkisebb <M t="r" /> ott adódik, ahol a nevező maximális (<M t="\cos\theta = 1 \Rightarrow \theta = 0" />):{' '}
            <M t="r = \dfrac{5}{2}" />, tehát a csúcs <M t="\left(\tfrac{5}{2};\,0\right)" /> — pontosan félúton a pólus
            és az <M t="x = 5" /> vezéregyenes között!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A vezéregyenes négy helyzete és a csúcsok megtalálása',
    body: (
      <>
        <p>
          Attól függően, hogy a vezéregyenes a pólustól jobbra (<M t="x = k" />), balra (<M t="x = -k" />), fölötte (
          <M t="y = k" />) vagy alatta (<M t="y = -k" />) helyezkedik el, csak a nevező előjele és trigonometrikus
          függvénye változik:
        </p>

        <Def title="A négy szabványos poláris kúpszelet-egyenlet (k > 0, e > 0)">
          <table className="tbl">
            <thead>
              <tr><th>Vezéregyenes</th><th>Poláregyenlet</th><th>Főtengely</th></tr>
            </thead>
            <tbody>
              <tr><td><M t="x = +k" /> (jobb)</td><td><M t="r = \dfrac{ke}{1 + e\cos\theta}" /></td><td>vízszintes (<M t="\theta = 0,\,\pi" />)</td></tr>
              <tr><td><M t="x = -k" /> (bal)</td><td><M t="r = \dfrac{ke}{1 - e\cos\theta}" /></td><td>vízszintes (<M t="\theta = 0,\,\pi" />)</td></tr>
              <tr><td><M t="y = +k" /> (fent)</td><td><M t="r = \dfrac{ke}{1 + e\sin\theta}" /></td><td>függőleges (<M t="\theta = \tfrac{\pi}{2},\,\tfrac{3\pi}{2}" />)</td></tr>
              <tr><td><M t="y = -k" /> (lent)</td><td><M t="r = \dfrac{ke}{1 - e\sin\theta}" /></td><td>függőleges (<M t="\theta = \tfrac{\pi}{2},\,\tfrac{3\pi}{2}" />)</td></tr>
            </tbody>
          </table>
        </Def>

        <PolarConicFourOrientationsWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={7} q={<>Merre nyílik az <M t="r = \dfrac{4}{1 - \sin\theta}" /> parabola, és hol van a csúcsa?</>}>
          <p>
            <M t="e = 1" />, <M t="1 - \sin\theta" /> miatt a vezéregyenes <M t="y = -4" /> (alul van), így a parabola{' '}
            <strong>felfelé</strong> nyílik! Csúcsa <M t="\theta = \tfrac{3\pi}{2}" />-nél (<M t="\sin\theta = -1" />):{' '}
            <M t="r = \dfrac{4}{2} = 2" />, vagyis a Descartes-féle <M t="(0;\,-2)" /> pont.
          </p>
        </Task>
        <Task n={8} q={<>Milyen <M t="\theta" /> szögeknél vannak az <M t="r = \dfrac{8}{1 + 2\cos\theta}" /> hiperbola aszimptotái?</>}>
          <p>
            Ahol <M t="r \to \infty" />, vagyis a nevező nulla: <M t="1 + 2\cos\theta = 0 \Rightarrow \cos\theta = -\tfrac{1}{2}" />,
            tehát <M t="\theta = \tfrac{2\pi}{3}" /> (<M t="120^\circ" />) és <M t="\theta = \tfrac{4\pi}{3}" /> (<M t="240^\circ" />)!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Normalizálás és könnyed elforgatás polárkoordinátákban',
    body: (
      <>
        <p>
          Gyakran a nevezőben nem <M t="1" /> áll, hanem például <M t="3 + 2\cos\theta" />. Az első és legfontosabb
          lépés <strong>mindig a normalizálás</strong>: elosztjuk a számlálót és a nevezőt a nevező konstans tagjával,
          hogy <M t="1 \pm e\cos\theta" /> (vagy <M t="\sin\theta" />) alakot kapjunk!
        </p>

        <PolarConicNormalizedLabWidget />

        <Steps
          title="Kúpszelet teljes elemzése poláregyenletből"
          problem={
            <>
              Azonosítsuk az <M t="r = \dfrac{12}{3 + 2\cos\theta}" /> kúpszeletet, és határozzuk meg az{' '}
              <M t="e,\,k,\,a,\,b,\,c" /> paramétereit, csúcsait és középpontját!
            </>
          }
          steps={[
            {
              title: '1. Normalizálás (osztás 3-mal)',
              body: (
                <>
                  <M block t="r = \frac{12/3}{3/3 + (2/3)\cos\theta} = \frac{4}{1 + \tfrac{2}{3}\cos\theta}." />
                  Leolvasható: <M t="e = \dfrac{2}{3} < 1" /> (<strong>ellipszis</strong>), és{' '}
                  <M t="ke = 4 \Rightarrow k = 6" /> (vezéregyenes: <M t="x = 6" />).
                </>
              ),
            },
            {
              title: '2. A két főtengely-csúcs (θ = 0 és θ = π)',
              body: (
                <>
                  <M t="\theta = 0" />-nál: <M t="r_1 = \dfrac{12}{3+2} = \dfrac{12}{5} = 2{,}4" /> (Descartes:{' '}
                  <M t="(2{,}4;\,0)" />).
                  <br />
                  <M t="\theta = \pi" />-nél: <M t="r_2 = \dfrac{12}{3-2} = 12" /> (Descartes: <M t="(-12;\,0)" />).
                </>
              ),
            },
            {
              title: '3. Féltengelyek (a, c, b) és középpont',
              body: (
                <>
                  A nagytengely hossza <M t="2a = r_1 + r_2 = 14{,}4 \Rightarrow a = 7{,}2" />. A fókusztávolság{' '}
                  <M t="c = ae = 7{,}2 \cdot \tfrac{2}{3} = 4{,}8" />. A középpont a két csúcs felezőpontja:{' '}
                  <M t="O_{\text{ell}}(-4{,}8;\,0)" />. A félkistengely:{' '}
                  <M t="b = \sqrt{a^2 - c^2} = \sqrt{7{,}2^2 - 4{,}8^2} = 2{,}4\sqrt{5} \approx 5{,}37" />!
                </>
              ),
            },
          ]}
        />

        <RotatedPolarConicWidget />

        <Quiz
          q={<>Mennyi az <M t="r = \dfrac{8}{4 - 5\sin\theta}" /> kúpszelet excentricitása, és milyen típusú?</>}
          options={[
            { label: <>Ellipszis, <M t="e = 0{,}8" /></> },
            { label: <>Hiperbola, <M t="e = 1{,}25" /></>, ok: true },
            { label: <>Hiperbola, <M t="e = 5" /></> },
            { label: <>Parabola, <M t="e = 1" /></> },
          ]}
          explain={
            <>
              A nevezőt 4-gyel osztva: <M t="r = \dfrac{2}{1 - \tfrac{5}{4}\sin\theta}" />, tehát{' '}
              <M t="e = \dfrac{5}{4} = 1{,}25 > 1" /> — <strong>hiperbola</strong>!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={9} q={<>Azonosítsd az <M t="r = \dfrac{15}{5 - 3\cos\theta}" /> görbét, és add meg a két csúcsát!</>}>
          <p>
            5-tel osztva <M t="r = \dfrac{3}{1 - 0{,}6\cos\theta}" />, tehát <M t="e = 0{,}6" /> (ellipszis),{' '}
            <M t="k = 5" />. Csúcsok: <M t="\theta = 0 \Rightarrow r = \tfrac{15}{2} = 7{,}5" />,{' '}
            <M t="\theta = \pi \Rightarrow r = \tfrac{15}{8} = 1{,}875" />.
          </p>
        </Task>
        <Task n={10} q={<>Hogyan néz ki az <M t="r = \dfrac{4}{1 + \cos\theta}" /> parabola, ha az origó körül <M t="60^\circ" />-kal elforgatjuk pozitív irányban?</>}>
          <p>
            Egyszerűen <M t="\theta" /> helyére <M t="\theta - \tfrac{\pi}{3}" />-at írunk:{' '}
            <M t="r = \dfrac{4}{1 + \cos(\theta - \pi/3)}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Csillagászati pályák: a Kepler-egyenlet polárkoordinátákban',
    body: (
      <>
        <p>
          Egy ellipszispályán a csillag az egyik fókuszban (<M t="F = O" />) van. A 10.2-es szakaszból tudjuk, hogy a
          fókusz és a hozzá tartozó vezéregyenes távolsága:
        </p>
        <M block t="k = \frac{a}{e} - c = \frac{a}{e} - ae = \frac{a(1 - e^2)}{e} \ \Longrightarrow\ ke = a(1 - e^2)!" />
        <p>
          Így a vezéregyenes eltűnik a képletből, és közvetlenül a csillagászat két alapadatával (<M t="a" /> és{' '}
          <M t="e" />) írhatjuk fel a pálya poláregyenletét!
        </p>

        <Def title="Ellipszispálya poláregyenlete (fókusz a pólusban)">
          <M block t="r = \frac{a(1 - e^2)}{1 + e\cos\theta}." />
          <ul>
            <li>Napközel (perihélium, <M t="\theta = 0" />): <M t="r_{\min} = \dfrac{a(1 - e^2)}{1 + e} = a(1 - e)" />.</li>
            <li>Naptávol (aphélium, <M t="\theta = \pi" />): <M t="r_{\max} = \dfrac{a(1 - e^2)}{1 - e} = a(1 + e)" />.</li>
            <li>A fókuszban mért fél-paraméter (<M t="\theta = \tfrac{\pi}{2}" />): <M t="p = a(1 - e^2) = \dfrac{b^2}{a}" />.</li>
          </ul>
        </Def>

        <KeplerPolarOrbitWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={11} q={<>Egy műhold pályája <M t="r = \dfrac{9\,600}{1 + 0{,}2\cos\theta}" /> (km-ben). Számítsd ki a Föld középpontjától mért legkisebb és legnagyobb távolságát, valamint a félnagytengelyt!</>}>
          <p>
            <M t="r_{\min} = \dfrac{9\,600}{1{,}2} = 8\,000\text{ km}" />,{' '}
            <M t="r_{\max} = \dfrac{9\,600}{0{,}8} = 12\,000\text{ km}" />. Félnagytengely:{' '}
            <M t="a = \dfrac{8\,000 + 12\,000}{2} = 10\,000\text{ km}" />!
          </p>
        </Task>
        <Task n={12} q={<>Írd fel a Mars pályájának poláregyenletét, ha <M t="a = 1{,}524\text{ CSE}" /> és <M t="e = 0{,}093" />!</>}>
          <p>
            <M t="a(1 - e^2) = 1{,}524(1 - 0{,}00865) \approx 1{,}511" />, tehát{' '}
            <M t="r = \dfrac{1{,}511}{1 + 0{,}093\cos\theta}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló és tipikus hibák — a 10. fejezet zárása',
    body: (
      <>
        <PolarConicsSummaryDiagram />

        <h3>A 10.8 szakasz kulcsformulái</h3>
        <table className="tbl">
          <thead>
            <tr><th>Alakzat</th><th>Poláregyenlet</th><th>Paraméterek</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Egyenes</strong></td>
              <td><M t="r\cos(\theta - \theta_0) = r_0" /></td>
              <td><M t="(r_0;\,\theta_0)" /> a pólusból bocsátott merőleges talppontja</td>
            </tr>
            <tr>
              <td><strong>Origón átmenő kör</strong></td>
              <td><M t="r = 2a\cos(\theta - \theta_0)" /></td>
              <td>sugár <M t="a" />, középpont <M t="(a;\,\theta_0)" /></td>
            </tr>
            <tr>
              <td><strong>Általános kúpszelet</strong></td>
              <td><M t="r = \dfrac{ke}{1 \pm e\cos\theta}" /> vagy <M t="\sin\theta" /></td>
              <td><M t="e < 1" /> ellipszis, <M t="e = 1" /> parabola, <M t="e > 1" /> hiperbola</td>
            </tr>
            <tr>
              <td><strong>Kepler-ellipszis</strong></td>
              <td><M t="r = \dfrac{a(1-e^2)}{1 + e\cos\theta}" /></td>
              <td><M t="r_{\min} = a(1-e)" />, <M t="r_{\max} = a(1+e)" /></td>
            </tr>
          </tbody>
        </table>

        <h3>Négy tipikus hiba, amit érdemes elkerülni</h3>
        <Warn>
          <strong>1. Normalizálás elmulasztása:</strong> az <M t="r = \dfrac{10}{2 + \cos\theta}" /> egyenletben{' '}
          <em>nem</em> <M t="e = 1" /> (parabola)! Előbb osztani kell 2-vel: <M t="r = \dfrac{5}{1 + 0{,}5\cos\theta}" />,
          tehát <M t="e = 0{,}5" /> (<strong>ellipszis</strong>)!
        </Warn>
        <Warn>
          <strong>2. A számláló és <M t="k" /> összekeverése:</strong> normalizálás után a számláló{' '}
          <M t="ke" />, nem <M t="k" />! A vezéregyenes távolságához el kell osztani <M t="e" />-vel.
        </Warn>
        <Warn>
          <strong>3. Negatív <M t="r" /> hiperbola-csúcsnál:</strong> az <M t="r = \dfrac{6}{1 + 2\cos\theta}" />{' '}
          hiperbolánál <M t="\theta = \pi" />-re <M t="r = -6" /> adódik! Ez a <M t="(-6;\,\pi) = (6;\,0)" /> pont,
          vagyis a második csúcs az <M t="x = +6" /> helyen van (míg az első <M t="\theta = 0" />-nál <M t="x = +2" />),
          így a tengely hossza <M t="2a = 6 - 2 = 4" />, nem <M t="6 + 2 = 8" />!
        </Warn>
        <Warn>
          <strong>4. A vezéregyenes oldalának felcserélése:</strong> a <M t="1 + e\cos\theta" /> nevezőhöz a{' '}
          <em>pozitív</em> <M t="x = +k" /> direktrix tartozik (és a görbe „hasasabb” része balra nyúlik); a{' '}
          <M t="1 - e\cos\theta" /> nevezőhöz a negatív <M t="x = -k" />!
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={13} q={<>Határozd meg az <M t="r = \dfrac{6}{1 + 2\cos\theta}" /> hiperbola két csúcsának Descartes-koordinátáit és a <M t="2a" /> valós tengelyhosszt!</>}>
          <p>
            <M t="\theta = 0 \Rightarrow r = 2" />, azaz <M t="(2;\,0)" />. <M t="\theta = \pi \Rightarrow r = \dfrac{6}{1-2} = -6" />,
            ami a <M t="(-6;\,\pi) = (+6;\,0)" /> pont! Így a két csúcs <M t="(2;\,0)" /> és <M t="(6;\,0)" />, a
            középpont <M t="(4;\,0)" />, és <M t="2a = 6 - 2 = 4 \Rightarrow a = 2" />!
          </p>
        </Task>
        <Task n={14} q={<>Igaz-e, hogy az <M t="r = \dfrac{p}{1 + e\cos\theta}" /> ellipszis két csúcsa távolságának harmonikus közepe pontosan <M t="p = ke" />?</>}>
          <p>
            <strong>Igen!</strong> Mivel <M t="\dfrac{1}{r_1} + \dfrac{1}{r_2} = \dfrac{1+e}{p} + \dfrac{1-e}{p} = \dfrac{2}{p}" />,
            a harmonikus közép <M t="\dfrac{2}{\tfrac{1}{r_1} + \tfrac{1}{r_2}} = p = a(1-e^2)" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Gyakorló feladatok',
    body: (
      <>
        <p>Próbáld meg előbb önállóan megoldani, a megoldást csak utána nyisd ki.</p>

        <h3>Könnyű</h3>

        <Task n={15} q={<>Határozd meg az excentricitást, a típust és a vezéregyenes egyenletét: (a) <M t="r = \dfrac{8}{2 + 2\cos\theta}" />, (b) <M t="r = \dfrac{10}{5 - 2\sin\theta}" />!</>}>
          <ul>
            <li>(a) <M t="r = \dfrac{4}{1 + \cos\theta}" />: <M t="e = 1" /> (<strong>parabola</strong>), vezéregyenes <M t="x = 4" />.</li>
            <li>(b) <M t="r = \dfrac{2}{1 - 0{,}4\sin\theta}" />: <M t="e = 0{,}4" /> (<strong>ellipszis</strong>), <M t="k = \dfrac{2}{0{,}4} = 5" />, vezéregyenes <M t="y = -5" />.</li>
          </ul>
        </Task>

        <Task n={16} q={<>Írd fel annak az origó fókuszú ellipszisnek a poláregyenletét, amelynek excentricitása <M t="e = \tfrac{1}{3}" />, vezéregyenese pedig <M t="y = 6" />!</>}>
          <p>
            <M t="ke = 6 \cdot \tfrac{1}{3} = 2" />, és <M t="y = +6" /> miatt <M t="1 + e\sin\theta" /> van alul:{' '}
            <M t="r = \dfrac{2}{1 + \tfrac{1}{3}\sin\theta} = \dfrac{6}{3 + \sin\theta}" />.
          </p>
        </Task>

        <Task n={17} q={<>Add meg az <M t="r = -10\sin\theta" /> kör sugarát és középpontját!</>}>
          <p>
            <M t="2a = 10 \Rightarrow a = 5" />, középpontja a negatív <M t="y" />-tengelyen: Descartes-alakban{' '}
            <M t="(0;\,-5)" />, poláralakban <M t="\left(5;\,\tfrac{3\pi}{2}\right)" />.
          </p>
        </Task>

        <h3>Közepes</h3>

        <Task n={18} q={<>Alakítsd át Descartes-normálalakra az <M t="r = \dfrac{6}{2 - \cos\theta}" /> ellipszist!</>}>
          <p>
            Normalizálva <M t="r = \dfrac{3}{1 - 0{,}5\cos\theta}" />, <M t="e = 0{,}5" />. Csúcsok:{' '}
            <M t="\theta = 0 \Rightarrow r_1 = 6" /> (<M t="(6;\,0)" />), <M t="\theta = \pi \Rightarrow r_2 = 2" /> (
            <M t="(-2;\,0)" />).
          </p>
          <p>
            Középpont: <M t="(2;\,0)" />, <M t="a = 4" />, <M t="c = ae = 2" />, <M t="b^2 = 16 - 4 = 12" />.
            Descartes-egyenlet: <M t="\dfrac{(x - 2)^2}{16} + \dfrac{y^2}{12} = 1" />!
          </p>
        </Task>

        <Task n={19} q={<>Írd fel annak a hiperbolának a poláregyenletét, amelynek egyik fókusza a pólus, <M t="e = 2" />, és a hozzá tartozó vezéregyenes <M t="x = -3" />! Hol vannak a csúcsai?</>}>
          <p>
            <M t="ke = 6" />, <M t="x = -3" /> miatt <M t="r = \dfrac{6}{1 - 2\cos\theta}" />. Csúcsok:{' '}
            <M t="\theta = 0 \Rightarrow r = -6" /> (Descartes <M t="(-6;\,0)" />),{' '}
            <M t="\theta = \pi \Rightarrow r = 2" /> (Descartes <M t="(-2;\,0)" />). Középpont <M t="(-4;\,0)" />,{' '}
            <M t="a = 2" />.
          </p>
        </Task>

        <Task n={20} q={<>Egy műhold Föld körüli pályáján a legkisebb magasság a Föld felszíne felett <M t="600\text{ km}" />, a legnagyobb <M t="2\,600\text{ km}" /> (a Föld sugara <M t="R_F = 6\,400\text{ km}" />). Írd fel a pálya poláregyenletét!</>}>
          <p>
            A Föld középpontjától mérve: <M t="r_{\min} = 7\,000\text{ km}" />, <M t="r_{\max} = 9\,000\text{ km}" />.
            Innen <M t="a = 8\,000\text{ km}" />, <M t="e = \dfrac{9\,000 - 7\,000}{9\,000 + 7\,000} = \dfrac{1}{8} = 0{,}125" />.
            A számláló <M t="a(1 - e^2) = 8\,000 \cdot \dfrac{63}{64} = 7\,875" />, így{' '}
            <M t="r = \dfrac{7\,875}{1 + 0{,}125\cos\theta}" />!
          </p>
        </Task>

        <h3>Nehéz</h3>

        <Task
          n={21}
          q={
            <>
              Mutasd meg, hogy az <M t="r = \dfrac{p}{1 + e\cos\theta}" /> kúpszelet tetszőleges, a fókuszon átmenő
              húrjának két szeletére (<M t="r_1 = r(\theta)" /> és <M t="r_2 = r(\theta + \pi)" />) a reciprokok összege
              mindig állandó: <M t="\dfrac{1}{r_1} + \dfrac{1}{r_2} = \dfrac{2}{p}" />!
            </>
          }
        >
          <p>
            Mivel <M t="\cos(\theta + \pi) = -\cos\theta" />:
            <M block t="\frac{1}{r_1} + \frac{1}{r_2} = \frac{1 + e\cos\theta}{p} + \frac{1 - e\cos\theta}{p} = \frac{2}{p}!" />
            A szögtől teljesen független állandó — minden kúpszelet egyik legszebb fókusz-invariánsa!
          </p>
        </Task>

        <Task
          n={22}
          q={
            <>
              Számítsd ki az <M t="r = \dfrac{2}{1 + \cos\theta}" /> parabola <M t="-\tfrac{\pi}{2} \le \theta \le \tfrac{\pi}{2}" />{' '}
              ívének pontos ívhosszát polárkoordinátákban!
            </>
          }
        >
          <p>
            Mivel <M t="1 + \cos\theta = 2\cos^2(\theta/2)" />, az egyenlet <M t="r = \sec^2(\theta/2)" />. Deriválva:{' '}
            <M t="r' = \sec^2(\theta/2)\tan(\theta/2)" />. Így:
            <M block t="\sqrt{r^2 + (r')^2} = \sec^2(\theta/2)\sqrt{1 + \tan^2(\theta/2)} = \sec^3\left(\frac{\theta}{2}\right)." />
            Szimmetriával és <M t="u = \theta/2" /> (<M t="d\theta = 2\,du" />) helyettesítéssel:
            <M block t="L = 2\int_0^{\pi/2} \sec^3\left(\frac{\theta}{2}\right)d\theta = 4\int_0^{\pi/4} \sec^3 u\,du = 2\Big[\sec u\tan u + \ln|\sec u + \tan u|\Big]_0^{\pi/4} = 2\sqrt{2} + 2\ln(\sqrt{2} + 1)." />
          </p>
        </Task>

        <Task
          n={23}
          q={
            <>
              Keresd meg az <M t="r = \dfrac{4}{1 + \cos\theta}" /> és az <M t="r = \dfrac{4}{1 - \cos\theta}" /> két
              konfokális parabola metszéspontjait, és igazold, hogy <strong>merőlegesen</strong> metszik egymást!
            </>
          }
        >
          <p>
            Metszéspontok: <M t="1 + \cos\theta = 1 - \cos\theta \Rightarrow \cos\theta = 0 \Rightarrow \theta = \pm\tfrac{\pi}{2}" />,
            mindkettőnél <M t="r = 4" /> (Descartes: <M t="(0;\,\pm 4)" />).
          </p>
          <p>
            A <M t="\theta = \tfrac{\pi}{2}" /> pontban az elsőre <M t="r' = \dfrac{4\sin\theta}{(1+\cos\theta)^2} = 4" />,
            így <M t="m_1 = \dfrac{r'\sin\theta + r\cos\theta}{r'\cos\theta - r\sin\theta} = \dfrac{4}{-4} = -1" />. A
            másodikra <M t="r' = -4" />, így <M t="m_2 = \dfrac{-4}{-4} = +1" />. Mivel <M t="m_1 m_2 = -1" />, a két
            konfokális parabola pontosan <strong>derékszögben</strong> metszi egymást!
          </p>
        </Task>
      </>
    ),
  },
];
