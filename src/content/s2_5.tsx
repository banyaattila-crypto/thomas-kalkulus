import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  BDeltaWidget,
  DominantTermWidget,
  InfNearPointWidget,
  VerticalAsymWidget,
  ZeroDenomWidget,
} from '../components/Widgets25';
import type { Page } from './s1_1';

export const S2_5: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Végtelen határértékek',
    body: (
      <>
        <Story>
          <p>
            Az Ohm-törvény szerint egy 12 V-os feszültségforrásra kötött ellenálláson <M t="I = 12/R" /> amper áram folyik át. Ha az ellenállást csökkentjük (<M t="R\to 0^+" />), az áramerősség minden határon túl nő — a fizikában ez a rövidzárlat, a matematikában pedig a <em>végtelen határérték</em> mintapéldája.
          </p>
        </Story>
        <p>
          A 2.4-es szakaszban az <M t="x\to\pm\infty" /> esetet néztük meg (mit csinál a függvény messze az origótól). Most a tükörképét vizsgáljuk: mi történik, ha <M t="x" /> egy <strong>véges</strong> <M t="c" /> számhoz közelít, de a függvényértékek minden határon túl nőnek vagy csökkennek?
        </p>
        <p>
          Vegyük az <M t="f(x)=1/x" /> függvényt! Ahogy <M t="x\to 0^+" />, a függvényértékek bármely előre megadott pozitív <M t="B" /> korlátot túllépnek; ahogy <M t="x\to 0^-" />, bármely negatív korlát alá süllyednek. Ezt így rövidítjük:
        </p>
        <M block t="\lim_{x\to 0^+}\frac{1}{x}=+\infty \qquad\text{és}\qquad \lim_{x\to 0^-}\frac{1}{x}=-\infty." />
        <Warn>
          <p>
            Ez a jelölés <strong>nem</strong> azt jelenti, hogy létezik a hagyományos (véges) határérték, és nem is azt, hogy a <M t="\infty" /> valós szám lenne! Csupán pontosan leírja, <em>miért</em> nem létezik a határérték: mert a függvényértékek korlátlanul nőnek (vagy csökkennek).
          </p>
        </Warn>
        <p>
          Ha mindkét oldalról ugyanabba az irányba szalad el a függvény — például <M t="1/x^2" /> esetén —, akkor „kétoldali” végtelen határértékről beszélünk: <M t="\lim_{x\to 0}\frac{1}{x^2}=+\infty" />.
        </p>
        <InfNearPointWidget />
        <Steps
          source="Analízis-labor"
          title="Kétoldali előjelvizsgálat pólusnál"
          problem={
            <>
              Határozzuk meg a <M t="\lim_{x\to 3^+}\dfrac{x+2}{x-3}" /> és <M t="\lim_{x\to 3^-}\dfrac{x+2}{x-3}" /> határértékeket!
            </>
          }
          steps={[
            {
              title: 'A számláló határértéke',
              body: (
                <p>
                  Mindkét oldalról a számláló <M t="3 + 2 = 5 > 0" />-hoz tart (nem nulla!).
                </p>
              ),
            },
            {
              title: 'Jobb oldali közelítés (x → 3⁺)',
              body: (
                <p>
                  Ha <M t="x \to 3^+" />, akkor <M t="x - 3 \to 0^+" /> (pozitív), tehát a hányados <M t="+\infty" />-be tart.
                </p>
              ),
            },
            {
              title: 'Bal oldali közelítés (x → 3⁻)',
              body: (
                <p>
                  Ha <M t="x \to 3^-" />, akkor <M t="x - 3 \to 0^-" /> (negatív), tehát a hányados <M t="-\infty" />-be tart. Az <M t="x = 3" /> egyenes kétoldali függőleges aszimptota.
                </p>
              ),
            },
          ]}
        />
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Mennyi a <M t="\lim_{x\to 2}\dfrac{-5}{(x-2)^2}" /> határérték?
            </>
          }
          options={[
            { label: <M t="-\infty" />, ok: true },
            { label: <M t="+\infty" /> },
            { label: <M t="0" /> },
            { label: <>Jobbról <M t="+\infty" />, balról <M t="-\infty" /></> },
          ]}
          explain={
            <>
              Mivel <M t="(x-2)^2 \to 0^+" /> mindkét oldalról, a negatív számláló miatt a hányados mindkét oldalról <M t="-\infty" />-be tart.
            </>
          }
        />
        <h3>Feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Határozd meg a határértékeket: (a) <M t="\lim_{x\to 3^+}\dfrac{2}{x-3}" />, (b) <M t="\lim_{x\to 3^-}\dfrac{2}{x-3}" />, (c) <M t="\lim_{x\to -4}\dfrac{-5}{(x+4)^2}" />!
            </>
          }
        >
          <p>
            (a) Ha <M t="x\to 3^+" />, akkor <M t="x-3\to 0^+" />, így <M t="\dfrac{2}{x-3}\to +\infty" />.
          </p>
          <p>
            (b) Ha <M t="x\to 3^-" />, akkor <M t="x-3\to 0^-" />, így <M t="\dfrac{2}{x-3}\to -\infty" />.
          </p>
          <p>
            (c) Mivel <M t="(x+4)^2>0" /> mindkét oldalon, a negatív számláló miatt <M t="\lim_{x\to -4}\dfrac{-5}{(x+4)^2}=-\infty" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Számítsd ki: (a) <M t="\lim_{x\to 0^+}\dfrac{1}{x^{1/3}}" />, (b) <M t="\lim_{x\to 0^-}\dfrac{1}{x^{1/3}}" />, (c) <M t="\lim_{x\to 0}\dfrac{3}{x^{2/3}}" />!
            </>
          }
        >
          <p>
            (a) A köbgyök pozitív számra pozitív: <M t="+\infty" />. (b) Negatív számra negatív: <M t="-\infty" />.
          </p>
          <p>
            (c) Mivel <M t="x^{2/3}=(\sqrt[3]{x})^2>0" /> minden <M t="x\ne 0" />-ra, mindkét oldalról <M t="+\infty" />.
          </p>
        </Task>
        <Task
          n={3}
          q={
            <>
              Mennyi <M t="\lim_{x\to -5^+}\dfrac{2x}{x+5}" /> és <M t="\lim_{x\to -5^-}\dfrac{2x}{x+5}" />?
            </>
          }
        >
          <p>
            A számláló <M t="2\cdot(-5)=-10<0" /> közelében van. Ha <M t="x\to -5^+" />, a nevező <M t="x+5\to 0^+" /> (pozitív), tehát a hányados <M t="-\infty" />.
          </p>
          <p>
            Ha <M t="x\to -5^-" />, a nevező <M t="x+5\to 0^-" /> (negatív), így negatív/negatív = pozitív, a hányados <M t="+\infty" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Racionális függvények a nevező zérushelyei közelében',
    body: (
      <>
        <p>
          Ha egy racionális törtfüggvény nevezője valamely <M t="c" /> pontban 0, <strong>ne vágd rá rögtön</strong>, hogy a határérték végtelen! Mindig nézd meg a számlálót is:
        </p>
        <ul>
          <li>
            <strong>A számláló is 0 (<M t="0/0" /> alak):</strong> bontsd szorzattá és egyszerűsíts! Ha a nevezőből eltűnik a nullává váló tényező, <em>véges határértéket</em> kapsz (a grafikonon csak egy „lyuk” van).
          </li>
          <li>
            <strong>A számláló nem 0 (vagy egyszerűsítés után is marad 0 a nevezőben):</strong> a tört abszolút értéke minden határon túl nő — ilyenkor az <em>előjelvizsgálat</em> dönti el, hogy <M t="+\infty" /> vagy <M t="-\infty" />.
          </li>
        </ul>
        <p>
          Hasonlítsd össze az alábbi négy, szinte egyforma tört viselkedését az <M t="x=2" /> pontban!
        </p>
        <ZeroDenomWidget />
        <p>
          Az előjelvizsgálatnál elég egy nagyon közeli próbaszámra gondolni: például <M t="\frac{x-4}{(x-2)(x+2)}" /> esetén <M t="x=2{,}01" />-nél a számláló negatív (<M t="\approx -2" />), a nevező két tényezője pedig pozitív (<M t="0{,}01\cdot 4{,}01>0" />), tehát a jobb oldali határérték <M t="-\infty" />.
        </p>
        <h3>Feladatok</h3>
        <Task
          n={4}
          q={
            <>
              Határozd meg az <M t="f(x)=\dfrac{x-1}{x^2-1}" /> és a <M t="g(x)=\dfrac{x+2}{x^2-1}" /> függvények határértékeit <M t="x\to 1^+" />, <M t="x\to 1^-" /> és <M t="x\to 1" /> esetén!
            </>
          }
        >
          <p>
            Az <M t="f(x)=\dfrac{x-1}{(x-1)(x+1)}=\dfrac{1}{x+1}" /> (<M t="x\ne 1" />) egyszerűsödik, így mindkét féloldali és a kétoldali határértéke is <M t="\dfrac{1}{2}" /> (lyuk).
          </p>
          <p>
            A <M t="g(x)=\dfrac{x+2}{(x-1)(x+1)}" /> számlálója 1-ben <M t="3>0" />. Jobbról a nevező <M t="0^+" />, így <M t="\lim_{x\to 1^+}g(x)=+\infty" />; balról <M t="0^-" />, így <M t="\lim_{x\to 1^-}g(x)=-\infty" />. Kétoldali határérték nincs.
          </p>
        </Task>
        <Task
          n={5}
          q={
            <>
              Számítsd ki: <M t="\lim_{x\to 3}\dfrac{x^2-6x+9}{(x-3)^4}" /> és <M t="\lim_{x\to 3}\dfrac{x^2-6x+9}{x^2-9}" />!
            </>
          }
        >
          <p>
            Az első: <M t="\dfrac{(x-3)^2}{(x-3)^4}=\dfrac{1}{(x-3)^2}\to +\infty" /> (egyszerűsítés után is 0 a nevező, és páros hatványú).
          </p>
          <p>
            A második: <M t="\dfrac{(x-3)^2}{(x-3)(x+3)}=\dfrac{x-3}{x+3}\to \dfrac{0}{6}=0" /> (véges határérték).
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Határozd meg az <M t="\lim_{x\to 0}\dfrac{1}{x^2(x-2)}" /> határértéket!
            </>
          }
        >
          <p>
            Ha <M t="x\to 0" />, akkor <M t="x^2\to 0^+" /> (mindkét oldalról pozitív), míg <M t="x-2\to -2<0" />. A nevező tehát mindkét oldalról <M t="0^-" />, így a határérték <M t="-\infty" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A végtelen határérték precíz definíciója',
    body: (
      <>
        <p>
          Ahogy a véges határértéknek megvolt az <M t="\varepsilon" />–<M t="\delta" /> definíciója, a végtelen határérték is megfogalmazható pontos, kvantoros játék formájában. Itt a szkeptikus nem egy szűk <M t="\varepsilon" />-sávot szab meg, hanem egy tetszőlegesen magas <M t="B" /> korlátot: azt kéri, hogy <M t="x_0" /> elég kicsi <M t="\delta" />-környezetében a függvény értékei <em>mindenhol</em> lépjék túl <M t="B" />-t.
        </p>
        <Def title="Végtelen határértékek (B–δ definíció)">
          <p>
            <strong>Pozitív végtelen:</strong> <M t="\lim_{x\to x_0}f(x)=+\infty" />, ha bármely <M t="B>0" /> számhoz létezik <M t="\delta>0" />, hogy minden <M t="x" />-re:
          </p>
          <M block t="0 < |x-x_0| < \delta \;\Longrightarrow\; f(x) > B." />
          <p>
            <strong>Negatív végtelen:</strong> <M t="\lim_{x\to x_0}f(x)=-\infty" />, ha bármely <M t="B<0" /> számhoz létezik <M t="\delta>0" />, hogy minden <M t="x" />-re:
          </p>
          <M block t="0 < |x-x_0| < \delta \;\Longrightarrow\; f(x) < B." />
        </Def>
        <p>
          (Féloldali végtelen határértéknél ugyanígy <M t="x_0<x<x_0+\delta" />, illetve <M t="x_0-\delta<x<x_0" /> áll a bal oldalon.)
        </p>
        <h3>Mintabizonyítás</h3>
        <p>
          Igazoljuk, hogy <M t="\lim_{x\to 1}\dfrac{1}{(x-1)^2}=+\infty" />! Legyen adott <M t="B>0" />. Azt szeretnénk, hogy <M t="\dfrac{1}{(x-1)^2}>B" /> teljesüljön. Reciprokot véve (mindkét oldal pozitív):
        </p>
        <M block t="(x-1)^2 < \frac{1}{B} \iff |x-1| < \frac{1}{\sqrt{B}}." />
        <p>
          Ha tehát <M t="\delta = \dfrac{1}{\sqrt{B}}" /> (vagy annál kisebb pozitív szám), akkor <M t="0<|x-1|<\delta" /> esetén biztosan <M t="\dfrac{1}{(x-1)^2}>B" />.
        </p>
        <BDeltaWidget />
        <h3>Feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Adott <M t="B=100" /> esetén mekkora <M t="\delta>0" /> biztosítja, hogy <M t="0<|x+2|<\delta" /> mellett <M t="\dfrac{4}{(x+2)^2}>100" />?
            </>
          }
        >
          <p>
            <M t="\dfrac{4}{(x+2)^2}>100 \iff (x+2)^2<\dfrac{4}{100}=\dfrac{1}{25} \iff |x+2|<\dfrac{1}{5}=0{,}2" />.
          </p>
          <p>
            Tehát <M t="\delta=0{,}2" /> (vagy bármely kisebb pozitív szám) megfelel.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Bizonyítsd be a precíz definícióval, hogy <M t="\lim_{x\to 2^-}\dfrac{1}{x-2}=-\infty" />!
            </>
          }
        >
          <p>
            Legyen <M t="B<0" /> tetszőleges negatív szám. A <M t="2-\delta<x<2" /> sávban <M t="x-2<0" />, tehát <M t="\dfrac{1}{x-2}<B \iff x-2>\dfrac{1}{B} \iff 2-x<\dfrac{1}{-B}=\dfrac{1}{|B|}" />.
          </p>
          <p>
            Így <M t="\delta=\dfrac{1}{|B|}=-\dfrac{1}{B}>0" /> választással minden <M t="2-\delta<x<2" /> pontban <M t="\dfrac{1}{x-2}<B" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Függőleges aszimptoták',
    body: (
      <>
        <p>
          Amikor egy görbe valamely <M t="x=a" /> függőleges egyeneshez simulva felfelé vagy lefelé a végtelenbe nyúlik, ezt az egyenest <strong>függőleges aszimptotának</strong> nevezzük.
        </p>
        <Def title="Függőleges aszimptota">
          <p>
            Az <M t="x=a" /> függőleges egyenes az <M t="y=f(x)" /> függvény grafikonjának <strong>függőleges aszimptotája</strong>, ha az alábbi féloldali határértékek közül <em>legalább az egyik</em> fennáll:
          </p>
          <M block t="\lim_{x\to a^+}f(x)=\pm\infty \qquad\text{vagy}\qquad \lim_{x\to a^-}f(x)=\pm\infty." />
        </Def>
        <h3>Tipikus függvénycsaládok</h3>
        <ul>
          <li>
            <strong>Eltolt hiperbola:</strong> <M t="y=\dfrac{x+5}{x+2}=1+\dfrac{3}{x+2}" /> — egy függőleges (<M t="x=-2" />) és egy vízszintes (<M t="y=1" />) aszimptota.
          </li>
          <li>
            <strong>Páros racionális függvény:</strong> <M t="y=\dfrac{-6}{x^2-9}" /> — a szimmetria miatt <M t="x=-3" /> és <M t="x=3" /> is függőleges aszimptota, <M t="y=0" /> pedig kétoldali vízszintes aszimptota.
          </li>
          <li>
            <strong>Trigonometrikus függvények (végtelen sok aszimptota!):</strong> a <M t="\operatorname{tg} x=\frac{\sin x}{\cos x}" /> és <M t="\sec x=\frac{1}{\cos x}" /> függvényeknek a <M t="\frac{\pi}{2}" /> minden páratlan többszörösénél (<M t="\cos x=0" />), míg a <M t="\operatorname{ctg} x" /> és <M t="\csc x" /> függvényeknek a <M t="\pi" /> minden egész többszörösénél (<M t="\sin x=0" />) van függőleges aszimptotája.
          </li>
        </ul>
        <VerticalAsymWidget />
        <h3>Feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Add meg az <M t="f(x)=\dfrac{2x-1}{x-3}" /> függvény vízszintes és függőleges aszimptotáját!
            </>
          }
        >
          <p>
            Átalakítva: <M t="f(x)=\dfrac{2(x-3)+5}{x-3}=2+\dfrac{5}{x-3}" />.
          </p>
          <p>
            Függőleges aszimptota: <M t="x=3" /> (balról <M t="-\infty" />, jobbról <M t="+\infty" />). Vízszintes aszimptota: <M t="y=2" />.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Keresd meg az <M t="f(x)=\dfrac{x+1}{x^2-x-2}" /> függvény összes aszimptotáját! Vigyázz a közös tényezőre!
            </>
          }
        >
          <p>
            A nevező <M t="x^2-x-2=(x-2)(x+1)" />. Így <M t="x=-1" />-ben <M t="0/0" /> alak van: egyszerűsítve <M t="f(x)=\dfrac{1}{x-2}" /> (<M t="x\ne -1" />).
          </p>
          <p>
            Tehát <M t="x=-1" /> <em>nem</em> aszimptota (csak lyuk)! Az egyetlen függőleges aszimptota <M t="x=2" />, a vízszintes pedig <M t="y=0" />.
          </p>
        </Task>
        <Task
          n={11}
          q={
            <>
              Hol vannak az <M t="y=\operatorname{tg}(2x)" /> függvény függőleges aszimptotái a <M t="[0;\,\pi]" /> intervallumon?
            </>
          }
        >
          <p>
            Akkor van aszimptota, ha <M t="\cos(2x)=0 \iff 2x=\dfrac{\pi}{2}+k\pi \iff x=\dfrac{\pi}{4}+\dfrac{k\pi}{2}" />.
          </p>
          <p>
            A <M t="[0;\,\pi]" /> intervallumon ez két egyenes: <M t="x=\dfrac{\pi}{4}" /> és <M t="x=\dfrac{3\pi}{4}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Domináns tagok',
    body: (
      <>
        <p>
          Egy összetettebb függvényben gyakran <strong>különböző tagok uralják a képet</strong> attól függően, hogy messziről (nagy <M t="|x|" />) vagy egy pólus közvetlen közeléből nézzük. Nézzük meg az alábbi, ferde és függőleges aszimptotával is rendelkező törtet!
        </p>
        <M block t="f(x)=\frac{x^2-5}{2x-2} = \frac{x}{2}+\frac{1}{2} - \frac{2}{x-1}." />
        <ul>
          <li>
            Ha <M t="|x|" /> nagy, a <M t="-\frac{2}{x-1}" /> maradék elenyésző, így <M t="f(x)\approx \frac{1}{2}x+\frac{1}{2}" /> — a <strong>lineáris tag a domináns</strong> (ez a ferde aszimptota, és <M t="x\to\pm\infty" /> esetén <M t="f(x)\to\pm\infty" />).
          </li>
          <li>
            Ha <M t="x" /> közel van <M t="1" />-hez, a lineáris rész alig változik (<M t="\approx 1" />), míg <M t="-\frac{2}{x-1}" /> elszabadul — itt a <strong>pólustag a domináns</strong> (<M t="x=1" /> függőleges aszimptota).
          </li>
        </ul>
        <h3>Polinomok nagy léptékben</h3>
        <p>
          Ugyanez az elv működik polinomoknál is: az <M t="f(x)=2x^3-5x^2+4x-7" /> függvényt nagy <M t="|x|" />-eknél a <M t="g(x)=2x^3" /> <strong>főtag</strong> határozza meg, mert a hányadosuk 1-hez tart:
        </p>
        <M block t="\lim_{x\to\pm\infty}\frac{2x^3-5x^2+4x-7}{2x^3} = \lim_{x\to\pm\infty}\left(1-\frac{5}{2x}+\frac{2}{x^2}-\frac{7}{2x^3}\right) = 1." />
        <DominantTermWidget />
        <h3>Feladatok</h3>
        <Task
          n={12}
          q={
            <>
              Írd fel polinomosztással az <M t="f(x)=\dfrac{x^2+3x+1}{x+1}" /> függvényt lineáris rész + maradék alakban, és add meg minden aszimptotáját!
            </>
          }
        >
          <p>
            <M t="x^2+3x+1 = (x+2)(x+1)-1" />, tehát <M t="f(x)=x+2-\dfrac{1}{x+1}" />.
          </p>
          <p>
            Függőleges aszimptota: <M t="x=-1" /> (balról <M t="+\infty" />, jobbról <M t="-\infty" />). Ferde aszimptota: <M t="y=x+2" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Mi az <M t="f(x)=\dfrac{-4x^3+7x-1}{2x^2+5}" /> függvény viselkedése, ha <M t="x\to+\infty" />, illetve ha <M t="x\to-\infty" />? Mi a domináns tagja nagy <M t="|x|" />-eknél?
            </>
          }
        >
          <p>
            A főtagok hányadosa <M t="\dfrac{-4x^3}{2x^2}=-2x" />: nagy <M t="|x|" />-eknél <M t="f(x)\approx -2x" /> (és pontosan <M t="y=-2x" /> a ferde aszimptotája is).
          </p>
          <p>
            Ezért <M t="\lim_{x\to+\infty}f(x)=-\infty" /> és <M t="\lim_{x\to-\infty}f(x)=+\infty" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás, buktatók és vegyes gyakorlás',
    body: (
      <>
        <p>
          A 2.4 és 2.5 szakasz együtt leírja a függvények összes „szélsőséges” viselkedését. Az alábbi táblázat segít tisztán különválasztani a négy esetet:
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>jelölés</th>
              <th>mit jelent?</th>
              <th>geometriai kép</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><M t="\lim_{x\to c}f(x)=L" /></td>
              <td>véges pontban véges érték</td>
              <td>a görbe a <M t="(c;\,L)" /> pont felé tart (akár lyukkal)</td>
            </tr>
            <tr>
              <td><M t="\lim_{x\to\pm\infty}f(x)=b" /></td>
              <td>végtelenben véges érték</td>
              <td><strong>vízszintes aszimptota:</strong> <M t="y=b" /></td>
            </tr>
            <tr>
              <td><M t="\lim_{x\to a^\pm}f(x)=\pm\infty" /></td>
              <td>véges pontban végtelen érték</td>
              <td><strong>függőleges aszimptota:</strong> <M t="x=a" /></td>
            </tr>
            <tr>
              <td><M t="f(x)=mx+b+r(x),\ r\to 0" /></td>
              <td>végtelenben egyeneshez simul</td>
              <td><strong>ferde aszimptota:</strong> <M t="y=mx+b" /></td>
            </tr>
          </tbody>
        </table>
        <h3>Négy gyakori hiba</h3>
        <Warn>
          <p>
            <strong>1. „Ahol a nevező 0, ott biztosan függőleges aszimptota van”:</strong> hamis! Ha a számláló is 0, a közös tényező kieshet, és csak lyuk marad (pl. <M t="\frac{x^2-4}{x-2}" />).
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. A két végtelen összekeverése:</strong> <M t="\lim_{x\to\infty}f(x)=2" /> vízszintes aszimptotát ad (<M t="y=2" />), míg <M t="\lim_{x\to 2}f(x)=\infty" /> függőlegeset (<M t="x=2" />).
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Számolás a <M t="\infty" />-nel:</strong> a <M t="\infty-\infty" /> nem 0, és a <M t="\infty/\infty" /> nem 1! Ezek határozatlan alakok, mindig algebrai átalakítás kell (közös nevező, konjugált, főhatvánnyal osztás).
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Előjel elnézése a pólusnál:</strong> páratlan hatványnál (<M t="\frac{1}{x-a}" />) a két oldal előjele <em>ellentétes</em>, páros hatványnál (<M t="\frac{1}{(x-a)^2}" />) <em>azonos</em>.
          </p>
        </Warn>
        <h3>Vegyes feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Határozd meg az <M t="f(x)=\dfrac{x^2-1}{x^3-x^2-2x}" /> függvény összes függőleges és vízszintes aszimptotáját, valamint az esetleges lyukak helyét!
            </>
          }
        >
          <p>
            Szorzattá bontva: <M t="f(x)=\dfrac{(x-1)(x+1)}{x(x-2)(x+1)}=\dfrac{x-1}{x(x-2)}" /> (<M t="x\ne -1" />).
          </p>
          <p>
            <strong>Lyuk:</strong> <M t="x=-1" /> (határérték: <M t="\frac{-2}{(-1)(-3)}=-\frac{2}{3}" />). <strong>Függőleges aszimptoták:</strong> <M t="x=0" /> és <M t="x=2" />. <strong>Vízszintes aszimptota:</strong> <M t="y=0" /> (a nevező foka magasabb).
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Számítsd ki: (a) <M t="\lim_{x\to (\pi/2)^-}(1+\operatorname{tg} x)" />, (b) <M t="\lim_{\theta\to 0^-}(2-\operatorname{ctg}\theta)" />!
            </>
          }
        >
          <p>
            (a) Ha <M t="x\to (\pi/2)^-" />, akkor <M t="\sin x\to 1" /> és <M t="\cos x\to 0^+" />, így <M t="\operatorname{tg} x\to +\infty" />, tehát <M t="1+\operatorname{tg} x\to +\infty" />.
          </p>
          <p>
            (b) Ha <M t="\theta\to 0^-" />, akkor <M t="\cos\theta\to 1" /> és <M t="\sin\theta\to 0^-" />, így <M t="\operatorname{ctg}\theta\to -\infty" />, ezért <M t="2-\operatorname{ctg}\theta\to +\infty" />.
          </p>
        </Task>
      </>
    ),
  },
];
