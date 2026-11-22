import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  SecantToTangentWidget,
  TangentExplorerWidget,
  VelocityWidget,
  VerticalTangentWidget,
} from '../components/Widgets27';
import type { Page } from './s1_1';

export const S2_7: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Mit nevezünk egy görbe érintőjének?',
    body: (
      <>
        <Story>
          <p>
            A 17. században a tudomány három nagy kérdése ugyanabba a geometriai problémába torkollott: merre verődik vissza egy fénysugár egy görbe tükörről, milyen irányba repül el egy körpályáról elszabaduló test, és mekkora szöget zár be két egymást metsző görbe? Mindháromra a görbe adott pontbeli <em>érintője</em> adja meg a választ.
          </p>
        </Story>
        <p>
          A kör érintőjét már az általános iskolából ismerjük: merőleges a sugárra, csak egy közös pontja van a körrel, és végig a kör egyik oldalán marad. Általános görbéknél azonban <strong>mindhárom szabály csődöt mond</strong>:
        </p>
        <ul>
          <li>A legtöbb görbének nincs is középpontja vagy sugara.</li>
          <li>Egy görbe érintője máshol nyugodtan <em>újra metszheti</em> a görbét (pl. <M t="y=x^3-3x" /> érintője <M t="x=-1" />-ben).</li>
          <li>Az érintő magában az érintési pontban <em>át is vághatja</em> a görbét (pl. <M t="y=x^3" /> érintője az origóban az <M t="x" />-tengely).</li>
        </ul>
        <p>
          A megoldás a <strong>dinamikus érintőfogalom</strong>: veszünk a görbén egy közeli <M t="Q(x_0+h;\,f(x_0+h))" /> pontot, kiszámoljuk a <M t="PQ" /> szelő meredekségét, majd <M t="Q" />-t a görbe mentén <M t="P" />-hez közelítjük (<M t="h\to 0" />). A szelők határhelyzete lesz az érintő!
        </p>
        <SecantToTangentWidget />
        <h3>Feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Számítsd ki az <M t="y=x^2" /> parabola <M t="P(3;\,9)" /> pontbeli szelőjének meredekségét <M t="Q(3+h;\,(3+h)^2)" /> ponttal, majd <M t="h\to 0" />-val határozd meg a érintő meredekségét és egyenletét!
            </>
          }
        >
          <p>
            A szelő meredeksége: <M t="\dfrac{(3+h)^2-9}{h}=\dfrac{9+6h+h^2-9}{h}=6+h" />.
          </p>
          <p>
            Ha <M t="h\to 0" />, akkor <M t="m=6" />. Az érintő egyenlete: <M t="y=9+6(x-3)=6x-9" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Igaz-e, hogy egy görbe érintőjének mindig pontosan egy közös pontja van a görbével? Mondj ellenpéldát!
            </>
          }
        >
          <p>
            <strong>Hamis.</strong> Például az <M t="f(x)=x^3-3x" /> görbe <M t="P(-1;\,2)" /> pontbeli érintője az <M t="y=2" /> egyenes, amely az <M t="x=2" /> helyen újra metszi a görbét (<M t="2^3-3\cdot 2=2" />).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'A görbe meredeksége és az érintő egyenlete',
    body: (
      <>
        <p>
          A dinamikus eljárást egyetlen tömör definícióba foglalhatjuk össze:
        </p>
        <Def title="Görbe meredeksége és érintője">
          <p>
            Az <M t="y=f(x)" /> görbe <strong>meredeksége</strong> a <M t="P(x_0;\,f(x_0))" /> pontban:
          </p>
          <M block t="m = \lim_{h\to 0}\frac{f(x_0+h)-f(x_0)}{h}" />
          <p>
            (amennyiben ez a határérték létezik). A görbe <M t="P" />-beli <strong>érintője</strong> a <M t="P" /> ponton átmenő, <M t="m" /> meredekségű egyenes:
          </p>
          <M block t="y = f(x_0) + m(x-x_0)." />
        </Def>
        <h3>A háromlépéses recept</h3>
        <ol>
          <li>Írd fel <M t="f(x_0)" />-t és <M t="f(x_0+h)" />-t.</li>
          <li>Egyszerűsítsd a <M t="\dfrac{f(x_0+h)-f(x_0)}{h}" /> törtet, majd vedd a <M t="h\to 0" /> határértéket — ez adja meg <M t="m" />-et.</li>
          <li>Helyettesíts az <M t="y=f(x_0)+m(x-x_0)" /> egyenletbe.</li>
        </ol>
        <p>
          <strong>A definíció próbája:</strong> egy <M t="f(x)=kx+b" /> egyenesre <M t="\dfrac{k(x_0+h)+b-(kx_0+b)}{h}=\dfrac{kh}{h}=k" />, tehát egy egyenes érintője minden pontjában önmaga. Az <M t="f(x)=1/x" /> hiperbolára pedig tetszőleges <M t="a\ne 0" /> helyen:
        </p>
        <M block t="m=\lim_{h\to 0}\frac{\frac{1}{a+h}-\frac{1}{a}}{h}=\lim_{h\to 0}\frac{a-(a+h)}{ha(a+h)}=\lim_{h\to 0}\frac{-1}{a(a+h)}=-\frac{1}{a^2}." />
        <TangentExplorerWidget />
        <h3>Feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Határozd meg az <M t="f(x)=x^2+4x" /> parabola <M t="P(1;\,5)" /> pontbeli érintőjének egyenletét!
            </>
          }
        >
          <p>
            <M t="\dfrac{(1+h)^2+4(1+h)-5}{h}=\dfrac{1+2h+h^2+4+4h-5}{h}=6+h \to 6" />.
          </p>
          <p>
            Az érintő egyenlete: <M t="y=5+6(x-1)=6x-1" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Az <M t="y=1/x" /> görbének mely pontjaiban lesz az érintő meredeksége <M t="-1/9" />?
            </>
          }
        >
          <p>
            Mivel <M t="m(a)=-\dfrac{1}{a^2}" />, az egyenlet <M t="-\dfrac{1}{a^2}=-\dfrac{1}{9} \iff a^2=9 \iff a=3" /> vagy <M t="a=-3" />.
          </p>
          <p>
            A két keresett pont: <M t="\left(3;\,\frac{1}{3}\right)" /> és <M t="\left(-3;\,-\frac{1}{3}\right)" />.
          </p>
        </Task>
        <Task
          n={5}
          q={
            <>
              Határozd meg a <M t="g(x)=\sqrt{x+3}" /> görbe <M t="P(1;\,2)" /> pontbeli érintőjének meredekségét és egyenletét!
            </>
          }
        >
          <p>
            Konjugálttal bővítve:
          </p>
          <M block t="\frac{\sqrt{4+h}-2}{h}=\frac{(4+h)-4}{h(\sqrt{4+h}+2)}=\frac{1}{\sqrt{4+h}+2}\xrightarrow{h\to 0}\frac{1}{4}." />
          <p>
            Az érintő egyenlete: <M t="y=2+\dfrac{1}{4}(x-1)=\dfrac{1}{4}x+\dfrac{7}{4}" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Számítsd ki az <M t="f(x)=\dfrac{x}{x-1}" /> görbe meredekségét az <M t="x_0=3" /> helyen!
            </>
          }
        >
          <p>
            <M t="f(3)=\dfrac{3}{2}" />, <M t="f(3+h)=\dfrac{3+h}{2+h}" />. Különbségük: <M t="\dfrac{2(3+h)-3(2+h)}{2(2+h)}=\dfrac{-h}{2(2+h)}" />.
          </p>
          <p>
            Osztva <M t="h" />-val és <M t="h\to 0" />-t véve: <M t="m=\lim_{h\to 0}\dfrac{-1}{2(2+h)}=-\dfrac{1}{4}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Differenciahányados, változási sebesség és pontbeli derivált',
    body: (
      <>
        <p>
          Az érintő meredekségéhez felírt tört olyan központi szerepű a matematikában, hogy önálló nevet kapott — akárcsak a határértéke, amely az analízis két alappillérének egyike (a másik az integrál, az 5. fejezetben).
        </p>
        <Def title="Differenciahányados és pontbeli derivált">
          <p>
            Az
          </p>
          <M block t="\frac{f(x_0+h)-f(x_0)}{h}" />
          <p>
            kifejezést az <M t="f" /> függvény <M t="x_0" /> pontbeli, <M t="h" /> növekményhez tartozó <strong>differenciahányadosának</strong> nevezzük. Ha létezik a
          </p>
          <M block t="f'(x_0) = \lim_{h\to 0}\frac{f(x_0+h)-f(x_0)}{h}" />
          <p>
            határérték, azt az <M t="f" /> függvény <M t="x_0" /> pontbeli <strong>deriváltjának</strong> (vagy <em>differenciálhányadosának</em>) nevezzük.
          </p>
        </Def>
        <p>
          A 2.1-es szakaszban még csak táblázattal becsültük a szabadesés pillanatnyi sebességét. Most már <strong>pontosan</strong> ki tudjuk számítani! Ha egy függőlegesen feldobott labda magassága <M t="s(t)=20t-5t^2" /> méter, akkor a <M t="t_0" /> pillanatban mért pillanatnyi sebessége:
        </p>
        <M block t="v(t_0)=\lim_{h\to 0}\frac{20(t_0+h)-5(t_0+h)^2-(20t_0-5t_0^2)}{h}=\lim_{h\to 0}(20-10t_0-5h)=20-10t_0\;\text{m/s}." />
        <p>
          Így <M t="t_0=2" /> másodpercnél <M t="v(2)=0" /> m/s: ekkor éri el a labda a legmagasabb pontot, és itt fordul vissza.
        </p>
        <VelocityWidget />
        <h3>Feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Egy szabadon eső kő által megtett út <M t="s(t)=4{,}9t^2" /> méter. Számítsd ki a pontos pillanatnyi sebességet <M t="t=3" /> s-kor!
            </>
          }
        >
          <p>
            <M t="\dfrac{4{,}9(3+h)^2-4{,}9\cdot 9}{h}=\dfrac{4{,}9(6h+h^2)}{h}=4{,}9(6+h) \xrightarrow{h\to 0} 29{,}4\;\text{m/s}" />.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Egy kör területe a sugár függvényében <M t="A(r)=\pi r^2" />. Mekkora a terület pillanatnyi változási sebessége a sugárra nézve <M t="r=r_0" /> esetén? Mit ismersz fel a képletben?
            </>
          }
        >
          <p>
            <M t="\lim_{h\to 0}\dfrac{\pi(r_0+h)^2-\pi r_0^2}{h}=\lim_{h\to 0}\pi(2r_0+h)=2\pi r_0" /> — éppen a kör <strong>kerülete</strong>!
          </p>
        </Task>
        <Task
          n={9}
          q={
            <>
              Számítsd ki az <M t="f(x)=x^3+2x" /> függvény <M t="x_0=1" /> pontbeli deriváltját a definícióból!
            </>
          }
        >
          <p>
            <M t="f(1)=3" />, <M t="f(1+h)=(1+3h+3h^2+h^3)+(2+2h)=3+5h+3h^2+h^3" />.
          </p>
          <p>
            A differenciahányados <M t="5+3h+h^2 \xrightarrow{h\to 0} 5" />, tehát <M t="f'(1)=5" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Függőleges érintők és mikor nincs érintő?',
    body: (
      <>
        <p>
          A differenciahányados határértéke nem mindig véges szám. Van egy különleges eset, amikor mégis beszélünk érintőről: amikor a szelők mindkét oldalról függőleges egyenesbe fordulnak.
        </p>
        <Def title="Függőleges érintő">
          <p>
            Az <M t="y=f(x)" /> folytonos görbének az <M t="x=x_0" /> helyen <strong>függőleges érintője</strong> van, ha a differenciahányados mindkét oldalról ugyanabba a végtelenbe tart:
          </p>
          <M block t="\lim_{h\to 0}\frac{f(x_0+h)-f(x_0)}{h}=+\infty \qquad\text{vagy}\qquad \lim_{h\to 0}\frac{f(x_0+h)-f(x_0)}{h}=-\infty." />
        </Def>
        <p>
          Klasszikus példa az <M t="f(x)=x^{1/3}" /> köbgyökfüggvény az origóban: <M t="\dfrac{h^{1/3}-0}{h}=\dfrac{1}{h^{2/3}}\to +\infty" />, tehát az <M t="y" />-tengely (<M t="x=0" />) valódi függőleges érintő.
        </p>
        <p>
          Ezzel szemben a <M t="g(x)=x^{2/3}" /> görbének <em>nincs</em> függőleges érintője <M t="0" />-ban, mert <M t="\dfrac{h^{2/3}}{h}=\dfrac{1}{h^{1/3}}" /> jobbról <M t="+\infty" />-hez, balról viszont <M t="-\infty" />-hez tart (éles <strong>tüske</strong>)! Hasonlóan nincs érintő <strong>töréspontban</strong> (<M t="|x|" />), <strong>szakadási helyen</strong> vagy <strong>oszcillációnál</strong> (<M t="x\sin(1/x)" />).
        </p>
        <VerticalTangentWidget />
        <h3>Feladatok</h3>
        <Task
          n={10}
          q={
            <>
              Van-e függőleges érintője az <M t="y=x^{1/5}" /> és az <M t="y=x^{2/5}" /> görbének az origóban?
            </>
          }
        >
          <p>
            Az <M t="x^{1/5}" /> esetén <M t="\dfrac{h^{1/5}}{h}=\dfrac{1}{h^{4/5}}\to +\infty" /> (páros a számláló a kitevőben: mindkét oldalról pozitív) → <strong>van</strong> függőleges érintő (<M t="x=0" />).
          </p>
          <p>
            Az <M t="x^{2/5}" /> esetén <M t="\dfrac{h^{2/5}}{h}=\dfrac{1}{h^{3/5}}" /> jobbról <M t="+\infty" />, balról <M t="-\infty" /> → tüske, <strong>nincs</strong> érintő.
          </p>
        </Task>
        <Task
          n={11}
          q={
            <>
              Igazold a differenciahányadossal, hogy az <M t="f(x)=|x-2|" /> függvénynek nincs érintője az <M t="x_0=2" /> pontban!
            </>
          }
        >
          <p>
            <M t="\dfrac{f(2+h)-f(2)}{h}=\dfrac{|h|}{h}" />. Ha <M t="h\to 0^+" />, ez <M t="+1" />; ha <M t="h\to 0^-" />, akkor <M t="-1" />. A két féloldali határérték eltér, így a derivált nem létezik.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Egy fogalom öt arca',
    body: (
      <>
        <p>
          Álljunk meg egy pillanatra, mert egy nagyon szép pontra érkeztünk: a görbék érintője, a fizikai pillanatnyi sebesség és a differenciahányados határértéke valójában <strong>ugyanannak a matematikai fogalomnak az öt különböző arca</strong>:
        </p>
        <Def title="Az érem öt oldala (ugyanaz a szám!)">
          <ol>
            <li>Az <M t="y=f(x)" /> görbe <strong>meredeksége</strong> az <M t="x=x_0" /> helyen.</li>
            <li>Az <M t="y=f(x)" /> görbe <M t="(x_0;\,f(x_0))" /> pontbeli <strong>érintőjének meredeksége</strong>.</li>
            <li>Az <M t="f" /> függvény <strong>pillanatnyi változási sebessége</strong> az <M t="x=x_0" /> helyen.</li>
            <li>Az <M t="f" /> függvény <M t="x=x_0" /> pontbeli <strong>deriváltja</strong> (<M t="f'(x_0)" />).</li>
            <li>A <M t="\lim_{h\to 0}\dfrac{f(x_0+h)-f(x_0)}{h}" /> <strong>differenciahányados határértéke</strong>.</li>
          </ol>
        </Def>
        <h3>Két hasznos fogalom: normális és vízszintes érintő</h3>
        <p>
          A görbe <M t="P(x_0;\,f(x_0))" /> pontbeli <strong>normálisa</strong> az érintőre merőleges, <M t="P" />-n átmenő egyenes: ha <M t="m\ne 0" />, akkor a normális meredeksége <M t="-1/m" /> (ez az optikában a beesési merőleges!). Ahol pedig <M t="m=0" />, ott a görbének <strong>vízszintes érintője</strong> van — a 4. fejezetben látni fogjuk, hogy itt rejtőznek a lokális szélsőértékek.
        </p>
        <Warn>
          <p>
            Két fontos számolási szabály a differenciahányadosnál: (1) A <M t="\lim_{h\to 0}" /> jelet minden sorban írd ki egészen addig, amíg ténylegesen be nem helyettesíted a <M t="h=0" />-t! (2) Polinomoknál a számlálóban <strong>minden <M t="h" />-mentes tagnak ki kell esnie</strong> — ha marad egy konstans tag, biztosan elszámoltál valamit!
          </p>
        </Warn>
        <h3>Feladatok</h3>
        <Task
          n={12}
          q={
            <>
              Írd fel az <M t="y=x^2-3x+2" /> parabola <M t="P(2;\,0)" /> pontbeli érintőjének <em>és</em> normálisának egyenletét!
            </>
          }
        >
          <p>
            <M t="m=\lim_{h\to 0}\dfrac{(2+h)^2-3(2+h)+2-0}{h}=\lim_{h\to 0}\dfrac{h^2+h}{h}=1" />.
          </p>
          <p>
            Érintő: <M t="y=0+1(x-2)=x-2" />. Normális (<M t="m_\perp=-1" />): <M t="y=0-1(x-2)=-x+2" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Hol van vízszintes érintője az <M t="f(x)=x^2-6x+5" /> parabolának?
            </>
          }
        >
          <p>
            Tetszőleges <M t="x_0" /> helyen <M t="m=\lim_{h\to 0}\dfrac{(x_0+h)^2-6(x_0+h)+5-(x_0^2-6x_0+5)}{h}=2x_0-6" />.
          </p>
          <p>
            Akkor vízszintes, ha <M t="2x_0-6=0 \iff x_0=3" /> (ez épp a parabola csúcspontja, <M t="(3;\,-4)" />).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'A 2. fejezet összefoglalása és záró gyakorlás',
    body: (
      <>
        <p>
          Ezzel a <strong>2. fejezet (Határérték és folytonosság) végére értél!</strong> Nézzük át egyetlen táblázatban az utat, amely a szemléletes sebességtől a derivált pontos definíciójáig vezetett:
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>szakasz</th>
              <th>fő fogalom</th>
              <th>kulcsképlet / gondolat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2.1</td>
              <td>Változási sebesség, szemléletes határérték</td>
              <td>átlagsebesség → pillanatnyi sebesség; szelő → érintő</td>
            </tr>
            <tr>
              <td>2.2</td>
              <td>Határértékek kiszámítása</td>
              <td>műveleti szabályok, <M t="0/0" /> egyszerűsítés, szendvicstétel</td>
            </tr>
            <tr>
              <td>2.3</td>
              <td>Precíz definíció</td>
              <td><M t="0<|x-x_0|<\delta \Rightarrow |f(x)-L|<\varepsilon" /></td>
            </tr>
            <tr>
              <td>2.4</td>
              <td>Féloldali és végtelenbeli határérték</td>
              <td><M t="\lim_{\theta\to 0}\frac{\sin\theta}{\theta}=1" />, vízszintes és ferde aszimptota</td>
            </tr>
            <tr>
              <td>2.5</td>
              <td>Végtelen határértékek</td>
              <td><M t="B" />–<M t="\delta" />, függőleges aszimptota, domináns tagok</td>
            </tr>
            <tr>
              <td>2.6</td>
              <td>Folytonosság</td>
              <td><M t="\lim_{x\to c}f(x)=f(c)" />, szakadások, Bolzano-tétel</td>
            </tr>
            <tr>
              <td>2.7</td>
              <td>Érintő és derivált</td>
              <td><M t="f'(x_0)=\lim_{h\to 0}\dfrac{f(x_0+h)-f(x_0)}{h}" /></td>
            </tr>
          </tbody>
        </table>
        <p>
          A következő, <strong>3. fejezetben (Differenciálás)</strong> már nem egyetlen pontra számoljuk ki a határértéket, hanem megalkotjuk a deriváltfüggvényt és megtanuljuk azokat a gyors szabályokat, amelyekkel bonyolult függvények meredeksége is pillanatok alatt meghatározható.
        </p>
        <h3>Záró vegyes feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Határozd meg az <M t="f(x)=\dfrac{1}{x^2}" /> görbe meredekségét az <M t="x_0=-1" /> helyen a definícióból, és írd fel az érintő egyenletét!
            </>
          }
        >
          <p>
            <M t="f(-1)=1" />. A differenciahányados:
          </p>
          <M block t="\frac{\frac{1}{(-1+h)^2}-1}{h}=\frac{1-(1-2h+h^2)}{h(h-1)^2}=\frac{2h-h^2}{h(h-1)^2}=\frac{2-h}{(h-1)^2}\xrightarrow{h\to 0} 2." />
          <p>
            Az érintő egyenlete a <M t="(-1;\,1)" /> pontban: <M t="y=1+2(x+1)=2x+3" />.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Milyen <M t="c" /> konstans esetén érinti az <M t="y=4x+c" /> egyenes az <M t="y=x^2+3" /> parabolát? Add meg az érintési pontot is!
            </>
          }
        >
          <p>
            Az <M t="y=x^2+3" /> parabola <M t="x_0" /> helybeli meredeksége <M t="2x_0" />. Az érintő meredeksége <M t="4" />, tehát <M t="2x_0=4 \iff x_0=2" />.
          </p>
          <p>
            Az érintési pont <M t="P(2;\,2^2+3)=(2;\,7)" />. Mivel az <M t="y=4x+c" /> egyenes áthalad <M t="P" />-n: <M t="7=4\cdot 2+c \iff c=-1" />.
          </p>
        </Task>
      </>
    ),
  },
];
