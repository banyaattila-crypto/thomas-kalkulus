import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  CatenaryVsParabolaWidget,
  InvHypDerivWidget,
  InvHypGraphsWidget,
  InvTrigVsInvHypIntegralsDiagram,
  SinhCoshBuildWidget,
  TanhSechGalleryWidget,
  TrigVsHypSignDiagram,
  UnitCircleVsHyperbolaWidget,
} from '../components/Widgets78';
import type { Page } from './s1_1';

export const S7_8: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Az eˣ páros és páratlan része: ch x és sh x',
    body: (
      <>
        <Story>
          <p>
            A 7. fejezet zárószakaszában egy különleges családdal ismerkedünk meg: a <strong>hiperbolikus függvényekkel</strong>! Nem valami elvont találmányról van szó — egyszerűen az <M t="e^x" /> exponenciális függvényt bontjuk fel egy <em>páros</em> és egy <em>páratlan</em> rész összegére, és máris megkapjuk a függőkábelek, a St. Louis-i Gateway Arch és a relativitáselmélet kedvenc függvényeit!
          </p>
        </Story>

        <Def title="A hiperbolikus szinusz (sh x) és hiperbolikus koszinusz (ch x)">
          <p>
            Minden <M t="x \in \mathbb{R}" /> valós számra (nemzetközi jelöléssel <M t="\sinh x,\; \cosh x" />):
          </p>
          <M block t="\operatorname{ch} x \;=\; \frac{e^x + e^{-x}}{2} \quad (\text{páros}), \qquad \operatorname{sh} x \;=\; \frac{e^x - e^{-x}}{2} \quad (\text{páratlan})." />
          <ul>
            <li><strong>Összegük és különbségük:</strong> <M t="\operatorname{ch} x + \operatorname{sh} x = e^x" /> és <M t="\operatorname{ch} x - \operatorname{sh} x = e^{-x}" />.</li>
            <li><strong>Nulla helyen:</strong> <M t="\operatorname{ch} 0 = 1" /> (és <M t="\operatorname{ch} x \ge 1" /> minden <M t="x" />-re!), <M t="\operatorname{sh} 0 = 0" />.</li>
          </ul>
        </Def>

        <SinhCoshBuildWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Számítsd ki pontosan: (a) <M t="\operatorname{sh}(\ln 2)" />, (b) <M t="\operatorname{ch}(\ln 3)" />!
            </>
          }
        >
          <p>
            (a) <M t="\dfrac{e^{\ln 2} - e^{-\ln 2}}{2} = \dfrac{2 - 1/2}{2} = \mathbf{\dfrac{3}{4}}" />.
          </p>
          <p>
            (b) <M t="\dfrac{e^{\ln 3} + e^{-\ln 3}}{2} = \dfrac{3 + 1/3}{2} = \mathbf{\dfrac{5}{3}}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Igazold a definícióból, hogy <M t="\operatorname{ch}(-x) = \operatorname{ch} x" /> és <M t="\operatorname{sh}(-x) = -\operatorname{sh} x" />!
            </>
          }
        >
          <p>
            <M t="\operatorname{ch}(-x) = \frac{e^{-x} + e^x}{2} = \operatorname{ch} x" /> ✓, és <M t="\operatorname{sh}(-x) = \frac{e^{-x} - e^x}{2} = -\frac{e^x - e^{-x}}{2} = -\operatorname{sh} x" /> ✓.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'A 6 hiperbolikus függvény és a ch²x − sh²x = 1 azonosság',
    body: (
      <>
        <Story>
          <p>
            Miért hívják őket <em>hiperbolikusnak</em>? Mert pontosan úgy parametrizálják az <M t="x^2 - y^2 = 1" /> <strong>egységhiperbolát</strong>, ahogy <M t="(\cos t;\,\sin t)" /> parametrizálja az <M t="x^2 + y^2 = 1" /> <strong>egységkört</strong>!
          </p>
        </Story>

        <Def title="A többi hiperbolikus függvény és a legfontosabb azonosságok">
          <ul>
            <li><M t="\operatorname{th} x = \dfrac{\operatorname{sh} x}{\operatorname{ch} x} = \dfrac{e^x - e^{-x}}{e^x + e^{-x}}" />, <M t="\operatorname{cth} x = \dfrac{1}{\operatorname{th} x}" />, <M t="\operatorname{sech} x = \dfrac{1}{\operatorname{ch} x}" />, <M t="\operatorname{csch} x = \dfrac{1}{\operatorname{sh} x}" />.</li>
            <li><strong>Alapazonosság (hiperbola!):</strong> <M t="\mathbf{\operatorname{ch}^2 x - \operatorname{sh}^2 x = 1}" /> (és ebből osztással: <M t="1 - \operatorname{th}^2 x = \operatorname{sech}^2 x" />, <M t="\operatorname{cth}^2 x - 1 = \operatorname{csch}^2 x" />).</li>
            <li><strong>Kétszeres argumentum &amp; félszög:</strong> <M t="\operatorname{sh}(2x) = 2\operatorname{sh} x\operatorname{ch} x" />, <M t="\operatorname{ch}(2x) = \operatorname{ch}^2 x + \operatorname{sh}^2 x" />, <M t="\operatorname{ch}^2 x = \dfrac{\operatorname{ch} 2x + 1}{2}" />, <M t="\operatorname{sh}^2 x = \dfrac{\operatorname{ch} 2x - 1}{2}" />.</li>
          </ul>
        </Def>

        <UnitCircleVsHyperbolaWidget />
        <TanhSechGalleryWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Igazold a definícióból, hogy <M t="\operatorname{ch}^2 x - \operatorname{sh}^2 x = 1" />!
            </>
          }
        >
          <p>
            <M t="\operatorname{ch}^2 x - \operatorname{sh}^2 x = (\operatorname{ch} x + \operatorname{sh} x)(\operatorname{ch} x - \operatorname{sh} x) = e^x \cdot e^{-x} = e^0 = \mathbf{1}" />! <em>(1 soros gyönyörű bizonyítás!)</em>
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Ha <M t="\operatorname{sh} x = -\dfrac{3}{4}" />, mennyi <M t="\operatorname{ch} x" /> és <M t="\operatorname{th} x" />?
            </>
          }
        >
          <p>
            Mivel <M t="\operatorname{ch} x \ge 1" /> mindig pozitív: <M t="\operatorname{ch} x = \sqrt{1 + \operatorname{sh}^2 x} = \sqrt{1 + \frac{9}{16}} = \mathbf{\dfrac{5}{4}}" />. Innen <M t="\operatorname{th} x = \dfrac{-3/4}{5/4} = \mathbf{-\dfrac{3}{5}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Hiperbolikus függvények deriváltjai és integráljai',
    body: (
      <>
        <Story>
          <p>
            A hiperbolikus függvények deriválása még a trigonometrikusaknál is szimmetrikusabb: a <M t="(\operatorname{sh} x)' = \operatorname{ch} x" /> és <M t="(\operatorname{ch} x)' = \operatorname{sh} x" /> párosnál <strong>egyetlen mínuszjel sincs</strong>!
          </p>
        </Story>

        <TrigVsHypSignDiagram />

        <Def title="Alapvető hiperbolikus integrálok (7.8. táblázat)">
          <ul>
            <li><M t="\displaystyle\int \operatorname{sh} u\,du = \operatorname{ch} u + C" /> · <M t="\displaystyle\int \operatorname{ch} u\,du = \operatorname{sh} u + C" /></li>
            <li><M t="\displaystyle\int \operatorname{sech}^2 u\,du = \operatorname{th} u + C" /> · <M t="\displaystyle\int \operatorname{csch}^2 u\,du = -\operatorname{cth} u + C" /></li>
            <li><M t="\displaystyle\int \operatorname{sech} u\operatorname{th} u\,du = -\operatorname{sech} u + C" /> · <M t="\displaystyle\int \operatorname{csch} u\operatorname{cth} u\,du = -\operatorname{csch} u + C" /></li>
          </ul>
        </Def>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Deriváld: <M t="y = \operatorname{th}\!\sqrt{1 + t^2}" /> (Thomas 1a. példa)!
            </>
          }
        >
          <p>
            <M t="y' = \operatorname{sech}^2\!\sqrt{1+t^2}\cdot\dfrac{t}{\sqrt{1+t^2}}" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \operatorname{cth}(5x)\,dx" /> (Thomas 1b. példa)!
            </>
          }
        >
          <p>
            <M t="\operatorname{cth}(5x) = \dfrac{\operatorname{ch}(5x)}{\operatorname{sh}(5x)}" />. Legyen <M t="u = \operatorname{sh}(5x) \implies du = 5\operatorname{ch}(5x)\,dx" />:
            <M block t="\frac{1}{5}\int\frac{du}{u} = \mathbf{\frac{1}{5}\ln|\operatorname{sh}(5x)| + C}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'A láncgörbe (katenária) — miért ch(x/a) a lógó vezeték alakja?',
    body: (
      <>
        <Story>
          <p>
            Ha megfogsz egy nehéz láncot a két végénél, a gravitáció hatására egy gyönyörű ívbe hajlik. Galilei azt hitte, hogy ez parabola — valójában azonban pontosan az <M t="y = a\operatorname{ch}(x/a)" /> <strong>láncgörbe</strong> (katenária)! Ugyanez a görbe fejjel lefelé a világ legerősebb önhordó boltíve (mint a 192 méteres St. Louis-i Gateway Arch)!
          </p>
        </Story>

        <p>
          <strong>Miért csodálatos a láncgörbe ívhossza?</strong> Mivel <M t="y' = \operatorname{sh}(x/a)" />, a 6.3-as ívhossz-képletben a gyök alatti kifejezés <em>tökéletes teljes négyzet</em>:
        </p>
        <M block t="\sqrt{1 + (y')^2} = \sqrt{1 + \operatorname{sh}^2(x/a)} = \operatorname{ch}(x/a) \;\implies\; L = \int_{-b}^{b}\operatorname{ch}(x/a)\,dx = \mathbf{2a\operatorname{sh}(b/a)}!" />

        <CatenaryVsParabolaWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Számítsd ki az <M t="y = \operatorname{ch} x" /> láncgörbe ívhosszát a <M t="[0;\,\ln 2]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="L = \int_0^{\ln 2} \operatorname{ch} x\,dx = \bigl[\operatorname{sh} x\bigr]_0^{\ln 2} = \operatorname{sh}(\ln 2) - 0 = \mathbf{\dfrac{3}{4}}" />!
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Igazold, hogy <M t="y = a\operatorname{ch}(x/a)" /> kielégíti az <M t="y'' = \dfrac{1}{a^2}y" /> differenciálegyenletet!
            </>
          }
        >
          <p>
            <M t="y' = \operatorname{sh}(x/a)" />, még egyszer deriválva <M t="y'' = \frac{1}{a}\operatorname{ch}(x/a) = \frac{1}{a^2}\bigl(a\operatorname{ch}(x/a)\bigr) = \mathbf{\frac{1}{a^2}y}" /> ✓
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Inverz hiperbolikus függvények (arsh, arch, arth) és logaritmusos alakjuk',
    body: (
      <>
        <Story>
          <p>
            Mivel a hiperbolikus függvények <M t="e^x" />-ből készülnek, az inverzeik — a magyarban <strong>area-függvényeknek</strong> nevezett <M t="\operatorname{arsh}, \operatorname{arch}, \operatorname{arth}" /> — pontosan kifejezhetők a <strong>természetes logaritmussal</strong>!
          </p>
        </Story>

        <Def title="Az inverz hiperbolikus (area-) függvények és logaritmusos alakjuk">
          <ul>
            <li><strong><M t="\operatorname{arsh} x = \operatorname{sh}^{-1} x" /></strong> (<M t="x \in \mathbb{R}" />): <M t="\operatorname{arsh} x = \ln\!\bigl(x + \sqrt{x^2 + 1}\bigr)" />.</li>
            <li><strong><M t="\operatorname{arch} x = \operatorname{ch}^{-1} x" /></strong> (<M t="x \ge 1,\; y \ge 0" />): <M t="\operatorname{arch} x = \ln\!\bigl(x + \sqrt{x^2 - 1}\bigr)" />.</li>
            <li><strong><M t="\operatorname{arth} x = \operatorname{th}^{-1} x" /></strong> (<M t="|x| < 1" />): <M t="\operatorname{arth} x = \dfrac{1}{2}\ln\!\left(\dfrac{1 + x}{1 - x}\right)" />.</li>
            <li><strong>További 3 visszavezetése (7.9. táblázat):</strong> <M t="\operatorname{arsech} x = \operatorname{arch}(1/x)" />, <M t="\operatorname{arcsch} x = \operatorname{arsh}(1/x)" />, <M t="\operatorname{arcth} x = \operatorname{arth}(1/x)" />.</li>
          </ul>
        </Def>

        <InvHypGraphsWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Számítsd ki pontosan logaritmussal: (a) <M t="\operatorname{arsh}(1)" />, (b) <M t="\operatorname{arth}\!\left(\frac{1}{2}\right)" />!
            </>
          }
        >
          <p>
            (a) <M t="\operatorname{arsh}(1) = \mathbf{\ln(1 + \sqrt{2})}" />; (b) <M t="\operatorname{arth}\!\left(\frac{1}{2}\right) = \frac{1}{2}\ln\!\left(\frac{3/2}{1/2}\right) = \mathbf{\frac{1}{2}\ln 3 = \ln\sqrt{3}}" />.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Vezesd le az <M t="\operatorname{arsh} x = \ln(x + \sqrt{x^2 + 1})" /> képletet a <M t="\frac{e^y - e^{-y}}{2} = x" /> egyenletből!
            </>
          }
        >
          <p>
            Szorozzuk meg <M t="2e^y" />-nal: <M t="(e^y)^2 - 2xe^y - 1 = 0" />. Másodfokú megoldóképlettel <M t="e^y = x \pm \sqrt{x^2+1}" />. Mivel <M t="e^y > 0" /> és <M t="\sqrt{x^2+1} > |x|" />, csak a pozitív gyök jó: <M t="e^y = x + \sqrt{x^2+1} \implies y = \mathbf{\ln(x + \sqrt{x^2+1})}" /> ✓
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Az inverz hiperbolikus függvények deriváltjai (7.10. táblázat)',
    body: (
      <>
        <Story>
          <p>
            Ahogy az arkuszfüggvényeknél, úgy az area-függvényeknél is <strong>tiszta algebrai kifejezéseket</strong> kapunk deriváláskor — ráadásul pontosan azokat a gyökös és racionális nevezőket fedik le, amelyek a 7.7-ből kimaradtak!
          </p>
        </Story>

        <Def title="A 6 inverz hiperbolikus függvény deriváltja (7.10. táblázat)">
          <ul>
            <li><M t="\dfrac{d}{dx}(\operatorname{arsh} u) = \dfrac{u'}{\sqrt{1 + u^2}}" /> (<M t="\forall u" />) · <M t="\dfrac{d}{dx}(\operatorname{arch} u) = \dfrac{u'}{\sqrt{u^2 - 1}}" /> (<M t="u > 1" />)</li>
            <li><M t="\dfrac{d}{dx}(\operatorname{arth} u) = \dfrac{u'}{1 - u^2}" /> (<M t="|u| < 1" />) · <M t="\dfrac{d}{dx}(\operatorname{arcth} u) = \dfrac{u'}{1 - u^2}" /> (<M t="|u| > 1" />)</li>
            <li><M t="\dfrac{d}{dx}(\operatorname{arsech} u) = -\dfrac{u'}{u\sqrt{1 - u^2}}" /> (<M t="0 < u < 1" />) · <M t="\dfrac{d}{dx}(\operatorname{arcsch} u) = -\dfrac{u'}{|u|\sqrt{1 + u^2}}" /> (<M t="u \ne 0" />)</li>
          </ul>
        </Def>

        <InvHypDerivWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Deriváld: (a) <M t="y = \operatorname{arsh}(3x)" />, (b) <M t="y = \operatorname{arth}(\cos x)" /> (<M t="0 < x < \pi" />)!
            </>
          }
        >
          <p>
            (a) <M t="y' = \mathbf{\dfrac{3}{\sqrt{1 + 9x^2}}}" />.
          </p>
          <p>
            (b) <M t="y' = \dfrac{-\sin x}{1 - \cos^2 x} = \dfrac{-\sin x}{\sin^2 x} = \mathbf{-\csc x}" />!
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Ellenőrizd a <M t="(\operatorname{arsh} x)' = \dfrac{1}{\sqrt{1 + x^2}}" /> képletet a logaritmusos <M t="\ln(x + \sqrt{x^2 + 1})" /> alak közvetlen deriválásával!
            </>
          }
        >
          <p>
            <M t="\dfrac{1 + \frac{x}{\sqrt{x^2+1}}}{x + \sqrt{x^2+1}} = \dfrac{\frac{\sqrt{x^2+1} + x}{\sqrt{x^2+1}}}{x + \sqrt{x^2+1}} = \mathbf{\dfrac{1}{\sqrt{x^2 + 1}}}" /> ✓
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Inverz hiperbolikus integrálok és a 7.7 vs. 7.8 nagy térkép',
    body: (
      <>
        <Story>
          <p>
            Most összeáll a teljes kép! A 7.7-es és a 7.8-as szakasz integrálképletei <strong>tökéletes tükörpárban</strong> lefedik az összes másodfokú és négyzetgyökös alapintegrált!
          </p>
        </Story>

        <InvTrigVsInvHypIntegralsDiagram />

        <p>
          <em>Plusz praktikus tipp:</em> az <M t="\int \frac{du}{a^2 - u^2}" /> integrál logaritmusos alakja <M t="\mathbf{\dfrac{1}{2a}\ln\left|\dfrac{a+u}{a-u}\right| + C}" />, amely egyszerre működik <M t="|u| < a" />-ra (<M t="\operatorname{arth}" />) és <M t="|u| > a" />-ra (<M t="\operatorname{arcth}" />) is!
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{3} \frac{dx}{\sqrt{9 + x^2}}" /> (<M t="\operatorname{arsh}" /> és <M t="\ln" /> alakban is)!
            </>
          }
        >
          <p>
            <M t="a = 3" />: <M t="\left[\operatorname{arsh}\!\left(\frac{x}{3}\right)\right]_{0}^{3} = \operatorname{arsh}(1) - 0 = \mathbf{\ln(1 + \sqrt{2})} \approx 0{,}881" />!
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{1} \frac{dx}{4 - x^2}" />!
            </>
          }
        >
          <p>
            <M t="a = 2" />, és <M t="|x| \le 1 < 2" />:
            <M block t="\left[\frac{1}{2}\operatorname{arth}\!\left(\frac{x}{2}\right)\right]_{0}^{1} = \frac{1}{2}\operatorname{arth}\!\left(\frac{1}{2}\right) = \frac{1}{4}\ln\!\left(\frac{1+1/2}{1-1/2}\right) = \mathbf{\frac{1}{4}\ln 3}." />
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
        <Def title="7.8 Puskakártya">
          <ul>
            <li><strong>Definíciók:</strong> <M t="\operatorname{ch} x = \frac{e^x+e^{-x}}{2}" />, <M t="\operatorname{sh} x = \frac{e^x-e^{-x}}{2}" />, <M t="\operatorname{th} x = \frac{\operatorname{sh} x}{\operatorname{ch} x}" />.</li>
            <li><strong>Alapazonosság:</strong> <M t="\operatorname{ch}^2 x - \operatorname{sh}^2 x = 1" /> · <M t="1 - \operatorname{th}^2 x = \operatorname{sech}^2 x" /> · <M t="\operatorname{sh}^2 x = \frac{\operatorname{ch} 2x - 1}{2}" />.</li>
            <li><strong>Deriváltak:</strong> <M t="(\operatorname{sh} u)' = \operatorname{ch} u\,u'" />, <M t="(\operatorname{ch} u)' = +\operatorname{sh} u\,u'" />, <M t="(\operatorname{th} u)' = \operatorname{sech}^2 u\,u'" /> (a 3 reciprok mínusszal!).</li>
            <li><strong>Area-függvények:</strong> <M t="\operatorname{arsh} x = \ln(x+\sqrt{x^2+1})" />, <M t="\operatorname{arch} x = \ln(x+\sqrt{x^2-1})" />, <M t="\operatorname{arth} x = \frac{1}{2}\ln\frac{1+x}{1-x}" />.</li>
            <li><strong>Integrálok:</strong> <M t="\int\frac{du}{\sqrt{a^2+u^2}} = \operatorname{arsh}\frac{u}{a}" />, <M t="\int\frac{du}{\sqrt{u^2-a^2}} = \operatorname{arch}\frac{u}{a}" />, <M t="\int\frac{du}{a^2-u^2} = \frac{1}{2a}\ln\left|\frac{a+u}{a-u}\right|" />.</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>5 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li><strong><M t="\operatorname{ch}^2 x - \operatorname{sh}^2 x = 1" /></strong> — MÍNUSZ van középen (nem plusz, mint a körnél!).</li>
            <li><strong><M t="(\operatorname{ch} x)' = +\operatorname{sh} x" /></strong> — NINCS mínuszjel, ellentétben <M t="(\cos x)' = -\sin x" />-szel!</li>
            <li><strong><M t="(\operatorname{sech} x)' = -\operatorname{sech} x\operatorname{th} x" /></strong> — itt viszont VAN mínuszjel, ellentétben <M t="(\sec x)' = +\sec x\operatorname{tg} x" />-szel!</li>
            <li><strong><M t="\operatorname{arch} x" /> csak <M t="x \ge 1" />-re értelmezett</strong>, mert <M t="\operatorname{ch} y \ge 1" /> minden valós <M t="y" />-ra!</li>
            <li><strong><M t="\int \frac{du}{a^2 - u^2}" />:</strong> vigyázz, hogy <M t="|u| < a" /> (<M t="\operatorname{arth}" />) vagy <M t="|u| > a" /> (<M t="\operatorname{arcth}" />) — a logaritmusos alak mindkettőre jó!</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={
            <>
              Deriváld: (a) <M t="y = \operatorname{sh}(4x)" />, (b) <M t="y = \ln(\operatorname{ch} x)" />!
            </>
          }
        >
          <p>
            (a) <M t="y' = \mathbf{4\operatorname{ch}(4x)}" />; (b) <M t="y' = \dfrac{\operatorname{sh} x}{\operatorname{ch} x} = \mathbf{\operatorname{th} x}" />!
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\ln 3} \operatorname{ch} x\,dx" />!
            </>
          }
        >
          <p>
            <M t="\bigl[\operatorname{sh} x\bigr]_0^{\ln 3} = \dfrac{3 - 1/3}{2} = \mathbf{\dfrac{4}{3}}" />.
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \operatorname{sech}^2(3x)\,dx" />!
            </>
          }
        >
          <p>
            <M t="\mathbf{\dfrac{1}{3}\operatorname{th}(3x) + C}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{1} \operatorname{sh}^2 x\,dx" /> (Thomas 1c. példa)!
            </>
          }
        >
          <p>
            Félszög-képlettel <M t="\operatorname{sh}^2 x = \frac{\operatorname{ch} 2x - 1}{2}" />:
            <M block t="\frac{1}{2}\int_{0}^{1}(\operatorname{ch} 2x - 1)\,dx = \frac{1}{2}\left[\frac{\operatorname{sh} 2x}{2} - x\right]_{0}^{1} = \mathbf{\frac{\operatorname{sh} 2}{4} - \frac{1}{2}}." />
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{2}^{4} \frac{dx}{\sqrt{x^2 - 4}}" />!
            </>
          }
        >
          <p>
            <M t="a = 2" />: <M t="\left[\operatorname{arch}\!\left(\frac{x}{2}\right)\right]_{2}^{4} = \operatorname{arch}(2) - \operatorname{arch}(1) = \mathbf{\ln(2 + \sqrt{3})}" />!
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Deriváld: <M t="y = x\operatorname{arsh} x - \sqrt{1 + x^2}" />!
            </>
          }
        >
          <p>
            <M t="y' = 1\cdot\operatorname{arsh} x + \dfrac{x}{\sqrt{1+x^2}} - \dfrac{x}{\sqrt{1+x^2}} = \mathbf{\operatorname{arsh} x}" />! <em>(Megkaptuk <M t="\operatorname{arsh} x" /> primitív függvényét!)</em>
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={
            <>
              <em>Teljes négyzetté alakítás <M t="\operatorname{arsh}" />-sel:</em> Számítsd ki <M t="\displaystyle\int \frac{dx}{\sqrt{x^2 + 4x + 8}}" /> értékét!
            </>
          }
        >
          <p>
            <M t="x^2 + 4x + 8 = (x + 2)^2 + 4 = (x+2)^2 + 2^2" /> (<M t="u = x+2,\; a = 2" />):
            <M block t="\int\frac{dx}{\sqrt{(x+2)^2 + 2^2}} = \mathbf{\operatorname{arsh}\!\left(\frac{x + 2}{2}\right) + C = \ln\!\bigl(x + 2 + \sqrt{x^2 + 4x + 8}\bigr) + C_1}." />
          </p>
        </Task>
        <Task
          n={22}
          q={
            <>
              <em>Addíciós tétel:</em> Igazold, hogy <M t="\operatorname{sh}(x + y) = \operatorname{sh} x\operatorname{ch} y + \operatorname{ch} x\operatorname{sh} y" />!
            </>
          }
        >
          <p>
            A jobb oldal a definícióval:
            <M block t="\frac{(e^x-e^{-x})(e^y+e^{-y}) + (e^x+e^{-x})(e^y-e^{-y})}{4} = \frac{2e^{x+y} - 2e^{-(x+y)}}{4} = \frac{e^{x+y} - e^{-(x+y)}}{2} = \mathbf{\operatorname{sh}(x + y)} \;\checkmark" />
          </p>
        </Task>
        <Task
          n={23}
          q={
            <>
              <em>Forgásfelület felszíne láncgörbével (6.5 + 7.8):</em> Forgassuk meg az <M t="y = \operatorname{ch} x" /> (<M t="0 \le x \le 1" />) görbét az <M t="x" />-tengely körül! Mekkora a keletkező <em>katenoid</em> felszíne?
            </>
          }
        >
          <p>
            Mivel <M t="ds = \sqrt{1 + \operatorname{sh}^2 x}\,dx = \operatorname{ch} x\,dx" />:
            <M block t="S = \int_{0}^{1} 2\pi\operatorname{ch} x\cdot\operatorname{ch} x\,dx = \pi\int_{0}^{1}(\operatorname{ch} 2x + 1)\,dx = \pi\left[\frac{\operatorname{sh} 2x}{2} + x\right]_{0}^{1} = \mathbf{\pi\left(\frac{\operatorname{sh} 2}{2} + 1\right)}." />
          </p>
        </Task>
      </>
    ),
  },
];
