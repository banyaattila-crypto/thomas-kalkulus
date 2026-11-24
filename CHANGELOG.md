# Változásnapló

A verziószámozás a [Szemantikus Verziózás 2.0.0](https://semver.org/lang/hu/) szerint történik (MAJOR.MINOR.PATCH).
Amíg a három kötet nincs végigvíve, a MAJOR 0. A tartalmi modulok és új funkciók MINOR, a hibajavítások PATCH emelést adnak.
Az 1.0.0 az I. kötet teljes anyagával jelenik meg.

## [2.22.0] - 2026-11-24

### Hozzáadva
- 12.2 Vektorok (8 oldal, 8 interaktív 2D/3D SVG ábra `Widgets122.tsx`, 3 `Quiz` gyorsteszt, `Steps` egységvektor-normálás és skálázás, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): irányított szakasz és komponensalak, 3D vektorösszeadás (paralelogramma-szabály) és kivonás, standard $\mathbf{i},\mathbf{j},\mathbf{k}$ bázis és egységvektor, felező- és osztópont, fizikai alkalmazások (repülőgép szélben, statikai kötélerők egyensúlya) és iránykoszinuszok.

## [2.21.0] - 2026-11-24

### Hozzáadva
- 12.1 Háromdimenziós koordináta-rendszerek — **12. fejezet nyitószakasza és 70,0%-os mérföldkő (84 / 120)!** (8 oldal, 8 interaktív forgatható 3D/szemléltető SVG ábra `Widgets121.tsx`, 3 `Quiz` gyorsteszt, `Steps` teljes négyzetté alakítás gömbre, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): jobbsodrású 3D koordináta-rendszer és oktánsok, koordinátasíkok és metszésegyenesek, kétszeres Pitagorasz-tétel és felezőpont, gömb egyenlete, körhenger vs. kör 3D-ben ($x^2+y^2=4$), gömb síkmetszetei, 2D vs. 3D térkép és Apollóniosz-gömb.

## [2.20.4] - 2026-11-24

### Fejlesztve
- **1. fejezet (`1.5`–`1.7`) teljes modernizálása** az `analizis-labor.banyaattila.hu` nem-duplikált elemeivel (ezzel a teljes 1. fejezet `1.1`–`1.7` tartalmaz `<Quiz />` és `<Steps />` komponenseket):
  - `1.5` (`s1_5.tsx`): `<Steps />` kompozíció-tartomány példa ($f=\sqrt{x+4},\; g=x^2-5$), 2 `<Quiz />` (eltolás $f(x-3)+2$, kiemeléses sorrend $f(2x-6)$).
  - `1.6` (`s1_6.tsx`): radián-indoklás ($\lim \frac{\sin\theta}{\theta}=1$), `<Steps />` szinuszos hőmérséklet-modell ($T(t)=8\sin(\frac{\pi}{12}(t-8))+14$), 3 `<Quiz />` (radián átváltás, $3\cos(4x-\pi)$ periódusa, félszögképlet).
  - `1.7` (`s1_7.tsx`): `<Steps />` extrapolációs esettanulmány ($y=2{,}4x+1{,}5$), 3 `<Quiz />` (négyzetes ablak torzítása, aliasing $\sin(80x)$, legkisebb négyzetek célfüggvénye).

## [2.20.3] - 2026-11-24

### Fejlesztve
- 1.4 Függvényosztályok és modellezés (`s1_4.tsx`) frissítése az `analizis-labor.banyaattila.hu` 1.4 szakaszának nem-duplikált elemeivel: 1 lépésenkénti `<Steps />` paritásvizsgálat ($h(x)=\frac{x^3-4x}{x^2+1}$), 3 interaktív `<Quiz />` önellenőrző (algebrai vs. transzcendens, $1/x$ monotonitási csapda, páros×páratlan szorzat kvíz) és 9. kihívásfeladat (tetszőleges függvény páros + páratlan felbontása).

## [2.20.2] - 2026-11-24

### Fejlesztve
- 1.3 Függvények és grafikonjaik (`s1_3.tsx`) frissítése az `analizis-labor.banyaattila.hu` 1.3 szakaszának nem-duplikált pedagógiai elemeivel: 1 lépésenkénti `<Steps />` természetes értelmezési tartomány levezetés ($g(x)=\frac{\sqrt{6-2x}}{x-1}$), 3 interaktív `<Quiz />` önellenőrző (gyök a nevezőben, vertikális teszt, $\lfloor -2{,}4\rfloor + \lceil 1{,}2\rceil$ egészrész-kvíz), 4 tipikus hiba blokk és 9. kihívásfeladat ($\lfloor x\rfloor + \lfloor -x\rfloor$ értékkészlete).

## [2.20.1] - 2026-11-24

### Fejlesztve
- 1.2 Koordinátageometria (`s1_2.tsx`) frissítése az `analizis-labor.banyaattila.hu` 1.2 szakaszának nem-duplikált pedagógiai elemeivel: 3 új interaktív `<Quiz />` önellenőrző (meredekség/irányszög, merőleges egyenes, $y=2x^2-8x+5$ parabola csúcspontja), 1 lépésenkénti `<Steps />` kombinált mintapélda (teljes négyzetté alakítás + merőleges egyenes), előretekintés a differenciálszámításra, 4 tipikus hiba blokk, 9. kombinált gyakorlófeladat (kör érintője) és színleírás-javítás (rózsaszín → narancssárga).

## [2.20.0] - 2026-11-24

### Hozzáadva
- 11.11 Fourier-sorok — **a 11. fejezet TELJES (11/11)!** (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets1111.tsx`, 3 `Quiz` gyorsteszt, `Steps` négyszögjel Fourier-fejtése, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): Euler–Fourier-formulák, trigonometrikus ortogonalitás, négyszögjel és Gibbs-jelenség (~8,95%-os túllendülés), Dirichlet konvergenciatétele (felezőpont ugrásoknál), páros/páratlan szimmetria és a Bázel-probléma ($\sum 1/n^2 = \pi^2/6$), frekvenciaspektrum, általános $2L$ periódus, Taylor vs. Fourier összehasonlítás és Parseval-azonosság ($\sum 1/n^4 = \pi^4/90$).

## [2.19.0] - 2026-11-24

### Hozzáadva
- 11.10 Hatványsorok alkalmazása (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets1110.tsx`, 3 `Quiz` gyorsteszt, `Steps` Airy-egyenlet hatványsoros megoldása, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): a binomiális sor ($(1+x)^m$), Einstein vs. Newton relativisztikus mozgási energia, $\arcsin x$ levezetése, differenciálegyenletek hatványsoros megoldása ($y''=xy$), nem-elemi integrálok ($\int e^{-x^2}$, $\int \frac{\sin x}{x}$, Fresnel-integrál), villám-határértékek L’Hôpital nélkül és a $\pi$ számítási versenye (Leibniz vs. Sharp vs. Machin).

## [2.18.0] - 2026-11-24

### Hozzáadva
- 11.9 A Taylor-sorok konvergenciája, Taylor tétele (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets119.tsx`, 3 `Quiz` gyorsteszt, `Steps` $e$ szám $10^{-5}$ pontosságú fokszám-kalibrálása, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): Taylor tétele (22. tétel) és a Lagrange-féle maradéktag, maradéktag-becslési tétel (23. tétel), $e^x$/$\sin x$/$\cos x$ konvergencia-bizonyítása, kis szögek csonkolási hibája és „bónusz fokszám”, Lagrange vs. Leibniz hibabecslés, parciális integrálásos bizonyítás integrális maradéktaggal, és $e$ irracionalitásának bizonyítása.

## [2.17.0] - 2026-11-24

### Hozzáadva
- 11.8 Taylor- és Maclaurin-sorok — **kétharmados mérföldkő (80 / 120 = 66,7%)!** (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets118.tsx`, 3 `Quiz` gyorsteszt, `Steps` $1/x$ ($a=2$) Taylor-fejtés, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): együtthatók egyértelműsége ($c_n = f^{(n)}(a)/n!$), Taylor-polinomok és kvadratikus közelítés, $e^x$, $\sin x$, $\cos x$, $\operatorname{ch} x$, $\operatorname{sh} x$ Maclaurin-sora, nem-nulla középpont ($\ln x$ az $a=1$ körül, polinomok átírása), 6 kanonikus Maclaurin-sor zsebkalauza, Cauchy-ellenpélda ($e^{-1/x^2}$) és Euler-formula ($e^{ix}=\cos x + i\sin x$).

## [2.16.0] - 2026-11-24

### Hozzáadva
- 11.7 Hatványsorok (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets117.tsx`, 3 `Quiz` gyorsteszt, `Steps` végpontvizsgálati levezetés, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): hatványsor fogalma és mértani alapsor ($\frac{1}{1-x}=\sum x^n$), konvergenciasugár és -intervallum (18. tétel: $R=0$, $0<R<\infty$, $R=\infty$), végpontvizsgálat (4 intervallumtípus), tagonkénti differenciálás (19. tétel, $\frac{1}{(1-x)^2}$), tagonkénti integrálás (20. tétel, $\ln(1+x)$, $\operatorname{arctg} x$, Leibniz-formula), helyettesítés és Cauchy-szorzat (21. tétel).

### Módosítva
- Tartalomjegyzék hero animáció (`TocPage.tsx`): a korábbi statikus SVG görbét egérkövető, többrétegű Canvas 2D kalkulus-panoráma váltotta fel (lokális simulókör és normálvektor, $f'(x)$ deriváltgörbe, dinamikus Riemann-téglalapok, áramló vektormező-részecskék és forgó 3D Lissajous-szalag).

## [2.15.0] - 2026-11-24

### Hozzáadva
- 11.6 Alternáló sorok, abszolút és feltételes konvergencia (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets116.tsx`, 3 `Quiz` gyorsteszt, `Steps` osztályozó kártya, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): Leibniz-tétel (14. tétel), Leibniz-féle hibabecslés ($|R_n| \le u_{n+1}$), alternáló $p$-sorok, abszolút és feltételes konvergencia (16. tétel), átrendezési tétel és Riemann-paradoxon ($\ln 2$, $\frac{1}{2}\ln 2$, $\frac{3}{2}\ln 2$), kiterjesztett abszolút hányados-/gyökkritérium és a 11.2–11.6 nagy konvergencia-térképe.

## [2.14.0] - 2026-11-24

### Hozzáadva
- 11.5 A hányados- és a gyökkritérium (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets115.tsx`, 3 `Quiz` gyorsteszt, `Steps` $\sum n!/n^n$ levezetés, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): D'Alembert-féle hányadoskritérium (12. tétel), faktoriális-egyszerűsítő zsebkalauz, Cauchy-féle gyökkritérium (13. tétel), a $\rho=1$ határeset csapdája, hányados vs. gyök stratégia és paraméteres sorok ($\sum x^n/n!$, $\sum nx^n/3^n$).

## [2.13.0] - 2026-11-24

### Hozzáadva
- 11.4 Összehasonlító kritériumok (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets114.tsx`, 3 `Quiz` gyorsteszt, `Steps` gyökös sor-vizsgálat, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): majoráns- és minoránskritérium (10. tétel), $\sum 1/n! \le 3$ klasszikus majorálása, a „rossz irány” csapdája, limeszes összehasonlító kritérium ($c>0$, $c=0$, $c=\infty$), főtag-vadász módszer és aszimptotikus ekvivalenciák ($\sin(1/n)$, $1-\cos(1/n)$, $\ln(1+1/n)$, $e^{1/n}-1$).

## [2.12.0] - 2026-11-24

### Hozzáadva
- 11.3 Az integrálkritérium (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets113.tsx`, 3 `Quiz` gyorsteszt, `Steps` logaritmikus sor-vizsgálat, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): nemnegatív tagú sorok monotonitása, az integrálkritérium téglalap-bizonyítása, $p$-sorok ($p > 1$), a harmonikus sor lassú növekedése és Euler–Mascheroni-állandó ($\gamma$), logaritmikus sorok ($\sum \frac{1}{n(\ln n)^p}$), maradéktag-becslés ($\int_{n+1}^\infty f \le R_n \le \int_n^\infty f$) és az „összeg ≠ integrál” csapda.

## [2.11.0] - 2026-11-24

### Hozzáadva
- 11.2 Végtelen sorok (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets112.tsx`, 3 `Quiz` gyorsteszt, `Steps` teleszkopikus levezetés, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): részletösszegek sorozata, egységnégyzetes felezés ($\sum 2^{-n}=1$), mértani sorok ($\frac{a}{1-r}$), pattogó labda és szakaszos tizedes törtek, teleszkopikus sorok, az $n$-edik tag divergenciatesztje, a harmonikus sor (Oresme-bizonyítás), linearitás és átindexelés.

## [2.10.0] - 2026-11-24

### Hozzáadva
- 11.1 Sorozatok — **11. fejezet nyitószakasza!** (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets111.tsx`, 3 `Quiz` gyorsteszt, `Steps` Weierstrass+fixpont levezetés, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): sorozat fogalma, $\varepsilon$–$N$ definíció, határérték-szabályok, szendvicstétel, folytonos függvények és L'Hôpital-szabály, 6 nevezetes határérték, növekedési hierarchia, rekurzív sorozatok és Weierstrass tétele.

## [2.9.0] - 2026-11-24

### Hozzáadva
- 10.8 Kúpszeletek polárkoordinátákban — **10. fejezet teljes!** (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets108.tsx`, 3 `Quiz` gyorsteszt, `Steps` elemző kártya, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): egyenesek ($r\cos(\theta-\theta_0)=r_0$) és körök ($r=2a\cos(\theta-\theta_0)$) poláregyenlete, egységes poláris kúpszelet-képlet ($r=\frac{ke}{1\pm e\cos\theta}$ és $\sin\theta$), normalizálás és elforgatás ($\theta\to\theta-\alpha$), Kepler-pályák ($r=\frac{a(1-e^2)}{1+e\cos\theta}$) és konfokális parabolák merőleges metszése.

## [2.8.0] - 2026-11-24

### Hozzáadva
- 10.7 Terület és hosszúság polárkoordinátákban (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets107.tsx`, 3 `Quiz` gyorsteszt, `Steps` ívhossz-levezetés, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): körszektoros Riemann-összeg ($dA = \frac{1}{2}r^2\,d\theta$), kardioid, rózsaszirom és csigavonal-hurok területe, két polárgörbe közötti terület ($\frac{1}{2}(r_2^2-r_1^2)$), poláris ívhossz ($ds=\sqrt{r^2+(r')^2}\,d\theta$, kardioid $L=8a$) és forgástestek felszíne polárkoordinátákban.

## [2.7.0] - 2026-11-24

### Hozzáadva
- 10.6 Ábrázolás polárkoordinátákban (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets106.tsx`, 3 `Quiz` gyorsteszt, `Steps` metszéspont-kereső kártya, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): három poláris szimmetriateszt, érintő és meredekség ($\frac{dy}{dx}$ vs $\frac{dr}{d\theta}$, pólusbeli érintők $\tan\theta_0$), Descartes-féle $(\theta, r)$ hullámból polárgörbe szerkesztése, csigavonalak (limaçonok) 4 típusa és a kardioid, rózsagörbék (páratlan/páros $n$), lemniszkáták, spirálok és a rejtett metszéspontok csapdája.

## [2.6.0] - 2026-11-24

### Hozzáadva
- 10.5 Polárkoordináták (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets105.tsx`, 3 `Quiz` gyorsteszt, `Steps` átalakító kártya, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): pólus, polártengely, negatív sugár értelmezése, egy pont végtelen sok polárneve, alapegyenletek ($r=a$, $\theta=\theta_0$) és tartományok, polár ↔ Descartes átváltás és az $\arctan(y/x)$ síknegyed-csapdája, origón átmenő körök ($r=2a\cos\theta+2b\sin\theta$) és egyenesek ($r\cos(\theta-\alpha)=d$).

## [2.5.0] - 2026-11-24

### Hozzáadva
- 10.4 Kúpszeletek és paraméteres egyenletek, a ciklois (8 oldal, 8 interaktív/szemléltető SVG ábra `Widgets104.tsx`, 3 `Quiz` gyorsteszt, `Steps` ívhossz-levezetés, 23 megoldott feladat — a záró oldalon 3 könnyű + 3 közepes + 3 nehéz feladat): ellipszis és kör irányított paraméterezése, parabola és ferde hajítás, hiperbola trigonometrikus és hiperbolikus paraméterezése, a guruló kerék cikloisa, érintő ($\cot(t/2)$), ívhossz ($8a$), terület ($3\pi a^2$), brachisztochron-verseny és tautochron tulajdonság.

## [2.4.0] - 2026-11-24

### Hozzáadva
- 10.3 Másodfokú egyenletek és forgatások (8 oldal, 8 magyarázó/interaktív ábra és grafikon, `Quiz` és `Steps` kártyák, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a vegyes $Bxy$ tag hatása ($x^2+Bxy+y^2=4$ élő laborral), koordinátatengelyek elforgatása $\alpha$ szöggel és az inverz képletek, a $2xy=8$ hiperbola $45^\circ$-os forgatása, a vegyes tag általános eltüntetése ($\operatorname{ctg} 2\alpha = \frac{A-C}{B}$, félszög-képletek 3 előre beállított elforgatott kúpszeleten), a diszkrimináns-kritérium ($\Delta = B^2-4AC$) és forgatási invariánsok ($A+C$, $B^2-4AC$), elfajult másodfokú esetek + forgatás és teljes négyzet együttese, a CORDIC mikrolépéses forgatási algoritmus (hogyan számol $\sin\theta$-t és $\cos\theta$-t egy kalkulátor), 3 lépéses összefoglaló folyamatábra és 5 tipikus buktató.

## [2.3.0] - 2026-11-24

### Hozzáadva
- 10.2 Kúpszeletek osztályozása excentricitásuk alapján (8 oldal, 8 ábra/grafikon `Widgets102.tsx`, `Quiz` és `Steps` kártyák, 23 megoldott feladat).

## [2.2.0] - 2026-11-24

### Hozzáadva
- Interaktív `Quiz` (azonnali visszajelzéses gyorsteszt) és `Steps` (lépésről lépésre kibontható példa) komponensek, haladáskövetés és `1.1` próbafrissítés.

## [2.1.0] - 2026-11-24

### Hozzáadva
- 10.1 Kúpszeletek és másodfokú egyenletek (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a III. kötet (10. fejezet: Kúpszeletek és polárkoordináták) nyitószakasza — a négy kúpszelet geometriája, parabola ($x^2=4py$, fókusz és direktrix, Thomas 1. példa), ellipszis ($PF_1+PF_2=2a$, $c^2=a^2-b^2$, Thomas 2–3. példa), hiperbola ($|PF_1-PF_2|=2a$, $c^2=a^2+b^2$, központi téglalap és aszimptoták), eltolt kúpszeletek és teljes négyzetté kiegészítés, optikai/akusztikai visszaverési tulajdonságok (parabolaantenna, suttogó galéria, Cassegrain-távcső), gyors típusfelismerő, összefoglalás és 4 buktató.

## [2.0.1] - 2026-11-24

### Módosítva
- Újratervezett, kombinált főoldali Canvas-animáció (`Cover.tsx`): összefűzi az eredeti borító lebegő szimbólumait, ragyogó hátterét és paraboláját az *Analízis Labor* 3-kötetes élő animációjával (I. kötet: hullámzó görbe, lélegző $\varepsilon$-sáv, mozgó érintő és élő $f'(x_0)$ meredekség; II. kötet: 28 arany-borostyán Riemann-téglalap és árnyékolt integrálterület; III. kötet: forgó 3D $\sin(r)/r$ hullámfelület és keringő $\nabla f$ gradiensvektor), `visibilitychange` és `prefers-reduced-motion` támogatással, valamint élő szakaszkészültségi kijelzővel.

## [2.0.0] - 2026-11-24

### Hozzáadva
- 9.5 Elsőrendű differenciálegyenletek alkalmazásai (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): siklás a jégen és véges megállási távolság (Thomas 1. példa, interaktív szimulátorral), exponenciális vs. logisztikus populációmodell (Thomas 2. példa: medvenépesség) és a logisztikus DE egzakt megoldása parciális törtekkel, folyamatos hiteltörlesztés szimulátorral, szökési sebesség levezetése, ortogonális trajektóriák 4 lépéses receptje (Thomas 3. példa: $xy=a \perp x^2-y^2=b$) és interaktív galéria (körök/egyenesek, hiperbolák, parabolák/ellipszisek), a teljes II. kötet térképe, összefoglalás és 4 buktató.
- **Mérföldkő:** a 9. fejezet és ezzel a teljes **II. kötet** (5–9. fejezet, 34 / 34 szakasz; összesítve **64 / 120 szakasz, 53,3%**) elkészült!

## [1.33.0] - 2026-11-24

### Hozzáadva
- 9.4 Autonóm differenciálegyenletek grafikus megoldása (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): autonóm egyenletek ($y'=g(y)$) és egyensúlyi pontok ($g(y)=0$), fázisegyenes és stabilitás (stabil, instabil, félig stabil), konvexitás és inflexiós szintek integrálás nélkül ($y'' = g'(y)g(y)$), Newton-féle hűlési törvény (Thomas 3. példa, interaktív szimulátorral), szabadesés közegellenállással és végsebesség (Thomas 4. példa), logisztikus növekedés és $M/2$ inflexiós szint (Thomas 5. példa + $g(P)$ parabola), 5 lépéses mesterrecept, összefoglalás és 4 buktató (a haladó feladatokban Allee-effektus és bifurkáció!).

## [1.32.0] - 2026-11-24

### Hozzáadva
- 9.3 Euler-módszer (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): az Euler-módszer geometriája és iterációs képlete ($y_n = y_{n-1} + f(x_{n-1}, y_{n-1})h$), lépésenkénti táblázat (Thomas 2. példa: $y'=1+y,\; y(0)=1$, interaktív szimulátorral), lokális $O(h^2)$ vs. globális $O(h)$ hiba és lépésköz-felezés, konvexitási torzítás (konvex $\Rightarrow$ alulbecslés, konkáv $\Rightarrow$ felülbecslés), javított Euler / Heun / RK2 prediktor–korrektor módszer ($O(h^2)$) és élő Euler vs. RK2 verseny, véges idejű felrobbanás ($y'=y^2$) és numerikus instabilitás ($y'=-\lambda y$, $h < 2/\lambda$ szimulátorral), visszafelé léptetés ($h<0$) és kitekintés az RK4-re, összefoglalás és 4 buktató.

## [1.31.0] - 2026-11-23

### Hozzáadva
- 9.2 Elsőrendű lineáris differenciálegyenletek (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): standard alak $y'+P(x)y=Q(x)$ és lineáris vs. nemlineáris felismerő (Thomas 1. példa), az integráló tényező $v(x)=e^{\int P(x)\,dx}$ levezetése és 4 lépéses folyamatábrája (Thomas 2–3. példa), parciális integrálás + állandósult vs. tranziens megoldás (Thomas 4. példa, interaktív grafikonnal), RL-áramkör és az időállandó $\tau=L/R$ (interaktív $V, R, L$ szimulátorral és $1\tau, 2\tau, 3\tau$ jelölésekkel), keverési feladatok (interaktív sóoldat-tartály szimulátorral), homogén + inhomogén szuperpozíciós szerkezet ($y=y_p+y_h$), a Bernoulli-egyenlet linearizálása ($u=y^{1-n}$ folyamatábrával), 9.1–9.3 stratégiai térkép, összefoglalás és 5 tipikus buktató.

## [1.30.0] - 2026-11-23

### Hozzáadva
- 9.1 Iránymező és szétválasztható változójú differenciálegyenletek (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): elsőrendű differenciálegyenletek, általános vs. partikuláris megoldás és kezdetiérték-probléma (Thomas 1–2. példa, interaktív megoldássereg-grafikonnal), interaktív iránymező-felfedező valós idejű RK4 megoldásgörbével (4 egyenlet: $y'=y-x$, $y'=-x/y$, logisztikus $y'=y(2-y)$, $y'=\cos x$), iránymező-olvasás és izoklinák, szétválasztható változójú egyenletek 4 lépéses receptje (Thomas 3–4. példa), elveszett egyensúlyi megoldások és véges idejű robbanás ($y'=y^2$ interaktív grafikonnal), implicit megoldások és ortogonális trajektóriák (sugarak $\perp$ körök, parabolák $\perp$ ellipszisek), Torricelli törvénye — tartály kiürítése (Thomas 5. példa, interaktív víztartály + $h(t)$ szimulátorral), szeparábilis-felismerő kártya, összefoglalás és 5 tipikus buktató.
- **Mérföldkő:** elértük a teljes háromkötetes *Thomas-féle Kalkulus* tananyag **felét (60 / 120 szakasz, 50,0%)**!

## [1.29.0] - 2026-11-23

### Hozzáadva
- 8.8 Improprius integrálok (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): I. típusú improprius integrálok (végtelen intervallum, Thomas 2. példa, interaktív $b\to\infty$ terület-szimulátor), a végtelenbeli $p$-skála ($\int_1^\infty x^{-p}\,dx$ konvergens $\iff p>1$, interaktív $p$-csúszkával) és Gábriel kürtje (véges térfogat, végtelen felszín), II. típusú improprius integrálok és a fordított nullabeli $p$-skála ($\int_0^1 x^{-p}\,dx$ konvergens $\iff p<1$, interaktív csúszkával), a belső aszimptota csapdája (Thomas 5. példa vs. a vak Newton–Leibniz $\int_{-1}^1 x^{-2}\,dx$ hiba), direkt összehasonlító kritérium ($e^{-x^2}$, $\sin^2 x/x^2$, $1/\sqrt{x^2-0{,}1}$ interaktív grafikonnal), hányadosteszt ($f(x)/g(x)\to L$ grafikonnal), mind a 6 improprius típus térképe + vegyes esetek és Gamma-függvény, döntési fa, összefoglalás és 5 tipikus buktató.
- **Mérföldkő:** a **8. fejezet (Integrálási technikák, 8 / 8 szakasz)** teljes egészében elkészült! (59 / 120 szakasz, 49,2%.)

## [1.28.0] - 2026-11-23

### Hozzáadva
- 8.7 Numerikus integrálás (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a trapézformula ($1,2,\dots,2,1$ súlyok, interaktív szimulátorral és Thomas 1. példával), konvexitás-előjel ($f''>0$ felül-, $f''<0$ alulbecslés interaktív ábrával) és mért adatok átlagolása (Thomas 2. példa: 12 órás átlaghőmérséklet), a trapézformula hibakorlátja ($|E_T| \le \frac{M(b-a)^3}{12n^2}$) és interaktív $n_{\min}$-kalkulátor, a Simpson-formula levezetése és interaktív Lagrange-parabola szimulátora (Thomas 5. példa, páros $n$, $1,4,2,4,\dots,4,1$ súlyok), a harmadfokú pontossági bónusz és $|E_S| \le \frac{M(b-a)^5}{180n^4}$ hibabecslés (Trapéz vs. Simpson élő konvergencia-versenytáblázattal $\ln 2$-re és $\pi$-re), a középpont-szabály ($M_n$) érintő-magyarázata és az $S_{2n} = \frac{2M_n+T_n}{3}$ arany összefüggés, valós mérnöki adatintegrátor (folyómeder-keresztmetszet) + numerikai csapdák, összefoglalás és 5 tipikus buktató.

## [1.27.0] - 2026-11-23

### Hozzáadva
- 8.6 Integráltáblázatok és matematikai programcsomagok (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): integráltáblázat használata és feltétel-ellenőrzés (interaktív $b>0$ logaritmikus vs. $b<0$ $\operatorname{arctg}$ ág-választó grafikonnal), alakillesztés ($u$-helyettesítés, teljes négyzet, tört szétbontása 4 lépéses diagrammal), láncolt táblázati képletek és redukciós formulák (interaktív $\int \operatorname{tg}^n x\,dx$ és $\int (\ln x)^n\,dx$ redukciós léptetővel), redukciók levezetése és az ekvivalens primitív függvények összehasonlítása (kézi vs. Maple vs. Mathematica grafikonon), nem elemi integrálok galériája ($\operatorname{erf}(x)$, Fresnel $S(x)$, $\operatorname{Si}(x)$ valós idejű numerikus területtel), CAS-parancsok összehasonlítása (Maple, Mathematica, SymPy), CAS-buktatók és a 3 aranypróba (az ugró primitív függvény csapdájával $\int_0^{2\pi} \frac{dx}{2+\cos x}$-re), a 8.1–8.7 nagy integrálási mestertérképe, összefoglalás és 5 tipikus buktató.

## [1.26.0] - 2026-11-23

### Hozzáadva
- 8.5 Trigonometrikus helyettesítések (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a három alaphelyettesítés ($\sqrt{a^2-x^2} \to a\sin\theta$, $\sqrt{a^2+x^2} \to a\operatorname{tg}\theta$, $\sqrt{x^2-a^2} \to a\sec\theta$) Püthagorasz-azonosságai és referencia-háromszögei, 3 külön interaktív derékszögű háromszög- és visszafejtő szimulátor ($\sin$, $\operatorname{tg}$, $\sec$ — előjel-tartományokkal és az $x < -a$ szekáns-csapdával), határozott integrálok határátírása $\theta$-ra (háromszög nélkül, folyamatábrával), teljes négyzetté alakítás + trigonometrikus helyettesítés kettős lépése, geometriai alkalmazások (ellipszis területe $T = \pi ab$ és parabola ívhossza interaktív grafikonnal), stratégiai döntési fa (mikor NEM kell trigonometrikus helyettesítés!), összefoglalás és 5 tipikus buktató.

## [1.25.0] - 2026-11-23

### Hozzáadva
- 8.4 Trigonometrikus integrálok (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): sinᵐ x cosⁿ x integrálok 3 esete paritás szerint (interaktív (m, n) stratégia- és terület-szimulátorral), páros kitevők félszög-képletei és periódus-átlaguk (sin²x és sin⁴x grafikonnal), tgᵐ x secⁿ x integrálok 3 esete, a legendás ∫ sec³ x dx bumeráng-folyamatábrája, különböző frekvenciák szorzatai (szorzat → összeg képletek) és a Fourier-ortogonalitás interaktív grafikonja (∫₋π^π sin(mx)sin(nx) dx), geometriai alkalmazások (y = ln(sec x) ívhossza és forgástest térfogata), összefoglalás és 5 tipikus buktató.

## [1.24.0] - 2026-11-23

### Hozzáadva
- 8.3 Racionális törtfüggvények integrálása parciális törtekre bontással (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a parciális törtekre bontás mint a közös nevező megfordítása (interaktív résztört-összeg grafikonnal), a 4 alapeset teljes térképe, a Heaviside-féle „letakarásos” módszer interaktív letakaró szimulátorral (Thomas 6. példa), többszörös lineáris tényezők (egyszerű vs. dupla pólus grafikonja), irreducibilis másodfokú tényezők (Thomas 4. példa 4 elemi ágra bontva), többszörös másodfokú tényezők (Thomas 5. példa) és az 5 lépéses mester-algoritmus, álcázott parciális törtek (helyettesítés után) és a logisztikus növekedési S-görbe interaktív szimulátora, összefoglalás és 5 tipikus buktató.

## [1.23.0] - 2026-11-23

### Hozzáadva
- 8.2 Parciális integrálás (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a szorzatszabály megfordítása (∫ u dv = uv − ∫ v du) és geometriai terület-bizonyítása, a LIATE-prioritási sorrend interaktív „Jó vs. Rossz választás” összehasonlítóval, a „láthatatlan 1” trükk (∫ ln x, ∫ arctg x, ∫ arcsin x interaktív terület-grafikonnal), táblázatos parciális integrálás (Thomas 7–8. példa színkódolt átlós nyilakkal), a „bumeráng-trükk” ciklikus integrálokra (∫ eˣ cos x dx folyamatábrával), hatványredukciós formulák és a Wallis-integrál (∫₀^(π/2) cosⁿ x dx interaktív léptetővel), helyettesítés + parciális integrálás kettős kombó és az 5 archetípus kártyája, összefoglalás és 5 tipikus buktató.

## [1.22.0] - 2026-11-23

### Hozzáadva
- 8.1 Egyszerű integrációs formulák (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a 8. fejezet (Integrálási technikák) nyitószakasza — a 22 alapintegrál + 2 új (∫ sec x dx és ∫ csc x dx) és a 7 algebrai átalakítás térképe, okos u-helyettesítés és kiegészítés teljes négyzetté (1/√(bx−x²) interaktív grafikonnal), trigonometrikus azonosságok és a gyökjel eltüntetése (√(1+cos 2x) = √2|cos x| előjel-szimulátorral), maradékos polinomosztás vizuálisan (ferde aszimptota + maradék), tört szétbontása a számláló összege mentén (diagrammal), szorzás ügyes 1-gyel (sec x terület-grafikonnal és 3 mestertrükkel), stratégiai integrál-felismerő edzőterem, összefoglalás és 5 tipikus buktató.

## [1.21.0] - 2026-11-23

### Hozzáadva
- 7.8 Hiperbolikus függvények (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): az eˣ páros (ch x) és páratlan (sh x) része interaktív építő-grafikonnal, a 6 hiperbolikus függvény és a ch²x − sh²x = 1 azonosság (egységkör vs. egységhiperbola összehasonlító ábra + th, sech, cth grafikon-galéria), deriváltak és integrálok az előjel-memóriatrükkel, a láncgörbe (katenária: y = a·ch(x/a) vs. parabola + pontos kábelhossz szimulátor), az inverz hiperbolikus (area-) függvények (arsh, arch, arth) és logaritmusos alakjuk interaktív grafikonnal, deriváltjaik (arsh x + 1/√(1+x²) érintővel), az inverz hiperbolikus integrálok és a 7.7 vs. 7.8 nagy integrál-térkép, összefoglalás és 5 tipikus buktató.
- **Mérföldkő:** a **7. fejezet (Transzcendens függvények, 8 / 8 szakasz)** teljes egészében elkészült! (51 / 120 szakasz, 42,5%.)

## [1.20.0] - 2026-11-23

### Hozzáadva
- 7.7 Inverz trigonometrikus függvények (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): tartományszűkítés, arcsin x és arccos x (pótszög-azonosság interaktív kettős grafikonnal), arctg x, arcctg x, arcsec x és arccsc x (interaktív grafikon-váltóval és vízszintes aszimptotákkal), a derékszögű háromszög-trükk dinamikus háromszög-generátorral, mind a 6 inverz trigonometrikus függvény deriváltja (interaktív függvény + derivált grafikonnal), a 3 arany integrálképlet a paraméterrel (miért nincs 1/a az arcsin-nál, és van az arctg/arcsec-nél + ∫ 1/(1+x²) = arctg b terület-grafikon), teljes négyzetté alakítás és számláló szétbontása folyamatábrával, a legnagyobb látószög (mozivászon-optimalizáció: x = √(ab) interaktív grafikonnal), összefoglalás és 5 tipikus buktató.
- **Mérföldkő:** elértük az **50 elkészült szakaszt** (50 / 120, 41,7%)!

## [1.19.0] - 2026-11-23

### Hozzáadva
- 7.6 Relatív növekedési ütem (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a Proxima Centauri-paradoxon és a növekedési ütem definíciója interaktív verseny-grafikonnal, a nagy növekedési ranglétra (logaritmus ≪ hatvány ≪ exponenciális ≪ szuperexponenciális) és L’Hospital-bizonyítások, azonos növekedési ütem és tranzitivitás interaktív hányados-grafikonnal, „kis ordó” (o) és „nagy ordó” (O) interaktív burokgörbével (M és x₀ vizualizációval), számítógéptudományi alkalmazás — szekvenciális O(n) vs. bináris O(log₂ n) keresés élő szimulátorral, algoritmus-bonyolultságok (n log₂ n vs. n² vs. 2ⁿ), L = lim f/g döntési fa és a „lassú előzés” csapdája (ln x vs. x¹/ᵏ grafikonnal), összefoglalás és 5 tipikus buktató.

## [1.18.0] - 2026-11-23

### Hozzáadva
- 7.5 Exponenciális növekedés és csökkenés (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): az exponenciális változás törvénye (y′ = ky ⇒ y = y₀eᵏᵗ, egyértelműség-bizonyítással és interaktív rátaszimulátorral), populációnövekedés, duplázódási idő és járvány-csökkenés (Thomas 1. példa szimulátorral és 3 lépéses recepttel), folytonosan jóváírt kamat (A = A₀eʳᵗ és a 70-es szabály összehasonlító grafikonnal), radioaktív bomlás és felezési idő (interaktív grafikon + 40 atomos bomlásrács), radiokarbonos (¹⁴C) kormeghatározó labor (T₁/₂ = 5700 év, híres leletekkel), Newton-féle hűlési és melegedési törvény (H(t) = Hₛ + (H₀ − Hₛ)e⁻ᵏᵗ interaktív szimulátorral), az 5 exponenciális modell összehasonlító térképe és féllogaritmikus (semi-log) egyenesítési teszt, összefoglalás és 5 tipikus buktató.

## [1.17.0] - 2026-11-23

### Hozzáadva
- 7.4 Az aˣ és logₐx függvények (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): az aᵘ deriváltja ((aᵘ)′ = aᵘ·ln a·u′) és a (0; 1) pontbeli ln a meredekség interaktív érintő-grafikonja, az ∫ aᵘ du = aᵘ/ln a + C integrál interaktív terület-grafikonnal, a logₐ x definíciója és alapváltási képlete (logₐ x = ln x / ln a) interaktív y = x tükör-grafikonnal (0 < a < 1 esetre is!), a logₐ u deriválása és logaritmusos integrálok a logₐ x görbecsaláddal, kettős változós hatványok (u(x)ᵛ⁽ˣ⁾) két biztos módszerrel és interaktív laborral, a 10-es alapú logaritmus valós alkalmazásai (Richter-skála, decibel, pH interaktív szimulátorral), a teljes e-alapú vs. a-alapú szimmetria-mátrix és az x² = 2ˣ egyenlet 3 megoldásának interaktív grafikonja, összefoglalás és 5 tipikus buktató.

## [1.16.0] - 2026-11-23

### Hozzáadva
- 7.3 Az exponenciális függvény (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): az eˣ = ln⁻¹ x definíciója és inverz azonosságai interaktív tükör-grafikonnal, az általános aˣ = eˣ·ˡⁿ ᵃ definíció és a kitevőszabályok (3. Tétel) interaktív görbecsaláddal, az (eˣ)′ = eˣ derivált levezetése az 1. Tételből (az 1 egységű szubtangens interaktív grafikonjával), összetett exponenciális görbék elemzése (xe⁻ˣ és a Gauss-haranggörbe e⁻ˣ² interaktív érintővel), az ∫ eᵘ du = eᵘ + C integrál és kezdetiérték-problémák (interaktív terület-grafikonnal), az e szám mint határérték (4. Tétel: lim (1+x)^(1/x) és kamatos kamat konvergencia-grafikon), az általános hatványszabály tetszőleges valós kitevőre és a 3 eset (xⁿ vs. eˣ vs. xˣ) összehasonlító grafikonja + puskadiagramja, összefoglalás és 5 tipikus buktató.

## [1.15.0] - 2026-11-23

### Hozzáadva
- 7.2 A természetes logaritmusfüggvény (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a természetes logaritmus integrálos definíciója (ln x = ∫₁ˣ 1/t dt) és az e szám interaktív előjeles terület-szimulátorral, az ln x és ln|u| deriváltja valamint az ln(ax) párhuzamos érintői (interaktív grafikonnal), a 4 logaritmusszabály (2. Tétel) analízis- és területi bizonyítása (interaktív hiperbola-skálázással), teljes függvényelemzés (konkávitás, érintők, ln x ≤ x − 1, téglalap-becslés ln 2 > ½ ⇒ lim ln x = ∞), az ∫ (1/u) du = ln|u| + C integrál és az f′/f minta kétágú grafikonnal, a tangens és kotangens integrálja (interaktív terület-grafikonnal), logaritmusos deriválás 4 lépéses élő folyamatábrával és az ln(1+x) ≈ x linearizáció grafikonja, összefoglalás és 5 tipikus buktató.

## [1.14.0] - 2026-11-23

### Hozzáadva
- 7.1 Inverz függvény deriváltja (8 oldal, 8 magyarázó/interaktív ábra és grafikon, 23 megoldott feladat — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a 7. fejezet (Transzcendens függvények) nyitószakasza bővebb elméleti magyarázattal és több interaktív ábrával — injektivitás, nyíldiagram és interaktív horizontális teszt (tartományszűkítéssel), az inverz függvény definíciója és kétoldali semlegesítése interaktív függvénygéppel, 2 lépéses inverzkeresés és interaktív y = x tükrözési grafikon, a reciprok meredekség 3-féle magyarázata (Δx ↔ Δy háromszög, differenciálok, láncszabály) interaktív érintő-szimulátorral, az 1. Tétel és az f′(a) = 0 csapda (vízszintes → függőleges érintő x³ ↔ ∛x szimulátorral), deriválás az inverz képlete nélkül 4 lépéses élő kalkulátorral, paraméteres inverzrajzolás és Young-féle terület-tétel (∫ f + ∫ f⁻¹ = b·f(b) − a·f(a)) interaktív diagrammal, összefoglalás és 5 tipikus buktató.

## [1.13.0] - 2026-11-23

### Hozzáadva
- 6.7 A folyadék nyomása és a folyadékra ható erők (6 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): hidrosztatikai nyomás (p = ρgh) és a hidrosztatikai paradoxon interaktív edény-szimulátorral, függőleges gátak nyomásprofilja és integrálképlete (F = ∫ ρg·h(y)·L(y) dy), háromszög és trapéz alakú gátak (csúccsal lefelé vs. felfelé megduplázódó erő!), a súlypont-csoda (F = ρg·h̄·A, tengeralattjáró körablak szimulátorral integrálás nélkül!), parabola és félkör zsilipkapuk kétféle kiszámítása, összefoglalás és 4 buktató.
- **Mérföldkő:** a **6. fejezet (A határozott integrál alkalmazásai, 7 / 7 szakasz)** teljes egészében elkészült!

## [1.12.0] - 2026-11-23

### Hozzáadva
- 6.6 Munka (6 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): változó erő munkája (W = ∫ F(x) dx, interaktív erő–elmozdulás görbével), Hooke-törvény és rugók nyújtása (interaktív rugó-szimulátorral), lógó láncok és csöpögő vödör (interaktív csörlő-ábrával), folyadék kiszivattyúzása hengeres, kúpos és félgömb tartályokból (interaktív vízréteg-szimulátorral), munka–kinetikus energia tétel és gravitációs szökési munka (F = GMm/r² diagrammal), összefoglalás és 4 buktató.

## [1.11.0] - 2026-11-23

### Hozzáadva
- 6.5 Forgásfelületek és Papposz tételei (6 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): csonkakúp-övek és a forgásfelület felszínképlete (miért kell Δs a Δx helyett!), a gömb „kenyérszeletelés-csodája” (2πRh gömböv interaktív szimulátorral) és forgatás az y-tengely körül, az univerzális S = ∫ 2πρ ds képlet 3 alakja (y=f(x), x=g(y), paraméteres), Papposz I. és II. tétele (tórusz térfogata és felszíne interaktív szimulátorral integrálás nélkül!), Papposz „visszafelé” (súlypont 1 sorban!), összefoglalás és 4 buktató.

## [1.10.0] - 2026-11-23

### Hozzáadva
- 6.4 Tehetetlenségi nyomaték és tömegközéppont (6 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): libikóka-szimulátor és diszkrét pontrendszer nyomatéka (M₀, Mₓ, Mᵧ), változó sűrűségű vékony rudak (δ(x) szimulátorral), 2D vékony lemezek (függőleges csík súlypontja és dMₓ = ½δ(f²−g²) dx levezetése), szimmetria és híres homogén síkidomok súlypontja (félkör 4r/(3π), parabola, háromszög h/3), görbe huzalok tömegközéppontja (félkörlemez vs. félkörhuzal 2r/π) és változó sűrűségű 2D lemezek, összefoglalás és 4 buktató.

## [1.9.0] - 2026-11-23

### Hozzáadva
- 6.3 Síkgörbék hossza (6 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): töröttvonalas közelítés (interaktív n-szakaszos közelítővel) és a paraméteres ívhossz-képlet, híres paraméteres görbék (csillaggörbe L = 6 és ciklois L = 8a interaktív bejárással), függvénygrafikon (y = f(x)) ívhossza, a ds = √(dx²+dy²) Pitagorasz-diagram és a teljes négyzet algebrai trükk, függőleges érintő és x = g(y) változócsere, húrhossz vs. valódi ívhossz numerikus összehasonlítása, összefoglalás és 4 buktató.

## [1.8.0] - 2026-11-23

### Hozzáadva
- 6.2 Térfogatszámítás hengerhéj-módszerrel (6 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a hengerhéj kiterítése (2π·r·h·dx) diagrammal, függőleges tengelyek (y-tengely és eltolt x = L egyenesek interaktív szimulátorral), vízszintes tengelyek (x-tengely és y = L, dy héjak), Gyűrű (6.1) vs. Hengerhéj (6.2) összehasonlító mátrix, különleges alkalmazások (x-kioltás és a szalvétagyűrű-paradoxon interaktív ábrával), összefoglalás és 4 buktató.

## [1.7.0] - 2026-11-23

### Hozzáadva
- 6.1 Szeletelés és tengely körüli forgatás (6 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a 6. fejezet (A határozott integrál alkalmazásai) nyitószakasza — térfogat keresztmetszeti területtel (V = ∫ A(x) dx) és a Cavalieri-elv interaktív nyírás-szimulátorral, forgástestek korong-módszerrel (x-tengely körül: paraboloid, kúp, gömb 3D koronggal), forgatás y-tengely (dy) és eltolt tengelyek (y = c) körül, gyűrű-módszer (washer method, 2D alátét-keresztmetszettel), tengelyválasztás hatása R-re és r-re (y = 0, y = −1, y = 2 összehasonlítása), henger-ék, gömbszelet és csonkakúp térfogatának levezetése, összefoglalás és 4 buktató.

## [1.6.0] - 2026-11-23

### Hozzáadva
- 5.6 Helyettesítés és görbék által közbezárt terület (7 oldal, 5 magyarázó/interaktív ábra, 21 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): helyettesítés határozott integrálban (határok átszámítása vs. visszahelyettesítés diagrammal), szimmetria-trükk páros és páratlan függvényekre [−a; a]-n (interaktív szimmetria-ábrával), két görbe által közbezárt terület függőleges (dx: felső − alsó) és vízszintes (dy: jobb − bal) szeleteléssel, egymást metsző görbék szerepcseréje, eltolási invariancia és a „Király-tulajdonság” (u = a − x), összefoglalás és 4 buktató.
- **Mérföldkő:** az **5. fejezet (Integrálszámítás, 6 / 6 szakasz)** teljes egészében elkészült!

## [1.5.0] - 2026-11-23

### Hozzáadva
- 5.5 A határozatlan integrál és a helyettesítési szabály (7 oldal, 5 magyarázó/interaktív ábra, 21 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): határozott vs. határozatlan integrál, az u-helyettesítés (láncszabály megfordítása) és 4 lépéses munkamenete, a 4 leggyakoribb u-választási minta és konstans-igazítás, algebrai visszahelyettesítés („marad egy x”), trigonometrikus integrálok (ekvivalens primitív függvények +C-eltolás vizuálisan, sin² x és cos² x félszög-képletekkel), háztartási váltakozó áram effektív (RMS) és csúcsfeszültsége (230 V → 325 V szimulátorral), kezdetiérték-feladatok (IVP) helyettesítéssel, összefoglalás és 4 buktató.

## [1.4.0] - 2026-11-23

### Hozzáadva
- 5.4 Newton–Leibniz-tétel (az analízis alaptétele) (8 oldal, 6 magyarázó/interaktív ábra, 23 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): az integrálszámítás középértéktétele bizonyítással és szakadásos ellenpéldával, a területfüggvény és a Newton–Leibniz-tétel 1. része (bizonyítással és interaktív sáv-szimulátorral), változó határok deriválása 4 alapesetben (láncszabály, határcsere, kezdetiérték-konstrukció), a Newton–Leibniz-tétel 2. része (kiértékelési tétel bizonyítással és „az analízis nagy hídja” diagrammal), teljes geometriai terület zérushelyeknél felbontva + Arkhimédész parabolaszelet-tétele, a nettó változás elve (elmozdulás vs. megtett út szimulátorral, határköltség), integrálfüggvények elemzése (szélsőértékek, inflexió, L’Hospital-szabály, linearizáció), összefoglalás és 4 buktató.

## [1.3.0] - 2026-11-23

### Hozzáadva
- 5.3 A határozott integrál (7 oldal, 5 magyarázó/interaktív ábra, 21 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a Riemann-integrál ε–δ definíciója és az integráljel anatómiája („néma változó”), folytonos és szakaszonként folytonos függvények integrálhatósága vs. Dirichlet-függvény, a határozott integrál 7 alaptulajdonsága vizuálisan (additivitás, konstansszorzó, max–min egyenlőtlenség bizonyítással, domináció), előjeles (nettó) terület vs. teljes geometriai terület interaktív felfedezővel, a 3 alapképlet (∫c, ∫x, ∫x²) és másodfokú polinomok integrálása, folytonos függvény átlagértéke („szintkiegyenlítés” szimulátorral), összefoglalás és 4 buktató.

## [1.2.0] - 2026-11-23

### Hozzáadva
- 5.2 A véges összegek határértéke és a szumma jel (7 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a szumma jel (Σ) anatómiája és indexeltolás, véges összegek algebrai szabályai és a 3 nagy hatványösszeg-képlet (Gauss-féle lépcsőbizonyítással), pontos terület véges összegek határértékével (1−x² → 2/3, x² → 8/3, x³ → 1/4), általános felosztás, norma (‖P‖) és előjeles Riemann-összeg, miért ‖P‖ → 0 kell n → ∞ helyett, összefoglalás és 4 buktató.

## [1.1.0] - 2026-11-23

### Hozzáadva
- 5.1 Közelítés véges összegekkel (7 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a II. kötet (5. fejezet: Integrálszámítás) nyitószakasza — görbe alatti terület téglalapokkal (Lₙ, Rₙ, Mₙ), alsó/felső összeg és garantált hibakorlát (|Rₙ−Lₙ| = |f(b)−f(a)|·Δx), megtett út sebesség-idő görbéből, térfogat közelítése hengerkorongokkal, folytonos függvény átlagértéke, összefoglalás és 4 buktató.

## [1.0.0] - 2026-11-23

### Hozzáadva
- 4.8 Primitív függvények (8 oldal, 5 magyarázó/interaktív ábra, 21 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): primitív függvény és a +C görbecsalád, hatványszabály visszafelé (és az n = −1 tiltott eset) + alap-táblázat, a határozatlan integrál anatómiája és lineáris belső függvény, első- és másodrendű kezdetiérték-feladatok (IVP), mozgásegyenletek levezetése (a → v → s) függőleges hajítás szimulátorral, algebrai/trigonometrikus átírások, összefoglalás és 4 buktató.
- **Mérföldkő:** a 4. fejezet (A derivált alkalmazásai) és ezzel a teljes **I. kötet** (1–4. fejezet, 30 / 30 szakasz) elkészült!

## [0.33.0] - 2026-11-23

### Hozzáadva
- 4.7 A Newton-módszer (7 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a Newton–Raphson-képlet levezetése linearizációból, babiloni gyökvonás és kvadratikus konvergencia (felező vs. Newton sebességverseny), transzcendens egyenletek (cos x = x, Dottie-szám), a 4 kudarc-eset (vízszintes érintő, elrohanó ∛x, 0↔1 ciklus, lassú többszörös gyök), biztonságos kezdőtipp és leállási feltétel, összefoglalás és 4 buktató.

## [0.32.0] - 2026-11-22

### Hozzáadva
- 4.6 Határozatlan alakok és a L’Hospital-szabály (7 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): lokális linearitás és nagyító-bizonyítás, Cauchy-féle középértéktétel és az erős L’Hospital-szabály (0/0 és ∞/∞, ismételt alkalmazás), a 3 legnagyobb csapda (túl-deriválás, végtelen ciklus, oszcilláló f′/g′), határozatlan szorzatok (0·∞) és különbségek (∞−∞), előretekintés a hatványalakokra (1^∞, 0^0, ∞^0) és az (1+a/x)^x → e^a szimulátor, összefoglalás és 4 buktató.

## [0.31.0] - 2026-11-22

### Hozzáadva
- 4.5 Alkalmazott optimalizációs problémák (8 oldal, 6 magyarázó/interaktív ábra, 21 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): 6 lépéses optimalizálási stratégia, nyitott doboz és folyóparti kerítés, nyílt intervallumos optimum (egyetlen kritikus pont tesztje + legolcsóbb 1 literes konzervdoboz h = 2r), beírt alakzatok és a négyzet-trükk, kábelhúzás / vízimentő és a Snellius–Descartes-törvény, közgazdasági optimalizálás (MR = MC és MC = AC), összefoglalás és 4 buktató.

## [0.30.0] - 2026-11-22

### Hozzáadva
- 4.4 Konvexitás és a függvénygörbe felrajzolása (10 oldal, 6 magyarázó/interaktív ábra, 25 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): elmélyített elméleti feldolgozás — konvexitás/konkavitás és érintők viszonya, a 4 görbe-alapforma (f′ és f″ kombinációi), inflexiós pontok (sima, függőleges érintős és hamis x⁴ csapda), második derivált teszt és korlátai, 7 lépéses teljes függvényvizsgálat, két részletesen kidolgozott nagypélda (negyedfokú polinom + aszimptotás törtfüggvény), f–f′–f″ fordítókulcs, összefoglalás és 4 buktató.

## [0.29.0] - 2026-11-22

### Hozzáadva
- 4.3 Monoton függvények és az első derivált teszt (7 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): monotonitási kritérium a Lagrange-tételből, az első derivált teszt 4 esete (+→−, −→+, +→+, −→−), előjeltáblázat polinomokra és törtkitevőkre, szakadási helyek és aszimptoták kezelése, görbe leolvasása f′ grafikonjából, összefoglalás és 4 buktató.

## [0.28.0] - 2026-11-22

### Hozzáadva
- 4.2 A Lagrange-féle középértéktétel (7 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): Rolle tétele és feltételeinek ellenpéldái, gyökök számának meghatározása (Bolzano + Rolle), a Lagrange-féle középértéktétel (interaktív párhuzamos érintőkeresővel), fizikai jelentés (szekciókontroll / átlagsebesség-mérés), a 3 fő következmény (konstans függvény, +C eltolás, kezdetiérték-feladatok és egyenlőtlenségek), összefoglalás és 4 buktató.

## [0.27.0] - 2026-11-22

### Hozzáadva
- 4.1 Függvény szélsőértékei (7 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): abszolút szélsőértékek és a tartomány szerepe, a Weierstrass-féle Szélsőérték-tétel és ellenpéldák, lokális szélsőértékek és Fermat tétele, kritikus pontok 4 típusa (sima csúcs, töréspont, tüske, teraszpont), a zárt intervallumos módszer 3 lépéses receptje, összefoglalás és 4 buktató.

## [0.26.0] - 2026-11-22

### Módosítva
- Átállás webes, szakaszonkénti code-splitting (dinamikus `import()`) architektúrára: a nyitóoldal és a tartalomjegyzék azonnal betölt, minden szakasz külön JS-chunkként csak megnyitáskor töltődik le.
- A build kimenete a `.gitignore`-ban lévő `dist/` mappa (a duplikált `docs/index.html` és a buildelt `index.html` kikerült a Git verziókezelésből; a gyökér `index.html` a tiszta Vite sablon).
- Automatikus GitHub Pages deploy munkafolyamat (`.github/workflows/deploy.yml`). Az opcionális egyfájlos offline export továbbra is elérhető `npm run build:single` paranccsal.

## [0.25.0] - 2026-11-22

### Hozzáadva
- 3.8 Linearizáció és differenciálok (7 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): lokális linearitás és érintővonalas közelítés (interaktív nagyítóval), nevezetes lineáris és binomiális közelítések ((1+x)^k ≈ 1+kx), a dy és Δy geometriája, differenciálási szabályok differenciál-alakban, hibaterjedés / érzékenység / százalékos hiba, a 3. fejezet összefoglalása és 4 buktató.
- A 3. fejezet (Differenciálás) ezzel teljes.

## [0.24.0] - 2026-11-22

### Hozzáadva
- 3.7 Kapcsolt deriváltak (7 oldal, 4 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): 6 lépéses megoldási stratégia, Pitagorasz-tételes modellek (csúszó létra, autós üldözés), hasonló háromszögek és kúpos tartály, szögek változási sebessége (hőlégballon/kamera), olvadó jégréteg, árnyék és koszinusztétel, összefoglalás és 4 buktató.

## [0.23.0] - 2026-11-22

### Hozzáadva
- 3.6 Implicit függvény deriváltja (7 oldal, 5 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): implicit függvények és körvonal deriváltja, a 3 lépéses implicit deriválási recept, érintő és normális a Descartes-féle levélen, implicit második derivált visszahelyettesítéssel, a hatványszabály kiterjesztése racionális kitevőkre, összefoglalás és 4 buktató.

## [0.22.0] - 2026-11-22

### Hozzáadva
- 3.5 A láncszabály. Paraméteres egyenletek (8 oldal, 5 magyarázó/interaktív ábra, 21 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a láncszabály fogaskerekes szemléltetéssel, „kívülről befelé” hagyma-modell és többszemű láncok, hatványláncszabály és radián/fok magyarázat, paraméteres görbék és paraméter-kiküszöbölés, paraméteres 1. és 2. derivált, táblázatos láncszabály, összefoglalás és 4 buktató.

## [0.21.0] - 2026-11-22

### Hozzáadva
- 3.4 A trigonometrikus függvények deriváltja (7 oldal, 4 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): a sin x és cos x deriváltjának levezetése, 4-es deriválási kör, harmonikus rezgőmozgás (rugós szimulátorral), a tg, ctg, sec és csc deriváltja, trigonometrikus egyszerűsítés, ciklikus magasabbrendű deriváltak, összefoglaló képlettár és 4 buktató.

## [0.20.0] - 2026-11-22

### Hozzáadva
- 3.3 A derivált mint változási sebesség (7 oldal, 6 magyarázó/interaktív ábra, 19 feladat megoldással — a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): geometriai változási sebesség, egyenes vonalú mozgás (helyzet, sebesség, gyorsaság, gyorsulás, lökés), szabadesés és függőleges hajítás, közgazdasági határköltség/határbevétel/marginális adó, genetikai érzékenység (Mendel-modell), összefoglalás és 4 klasszikus buktató.

## [0.19.0] - 2026-11-22

### Hozzáadva
- 3.2 Deriválási szabályok (8 oldal, 6 magyarázó/interaktív ábra, 21 feladat megoldással — köztük a záró oldalon 3 könnyebb + 3 közepes + 3 haladó feladat): konstans-, hatvány-, konstansszoros- és összegszabály, vízszintes érintők, szorzatszabály (interaktív növekvő téglalap-bizonyítással), hányadosszabály (színkódolt vizuális sémával), negatív egész kitevők és okos szabályválasztás, másod- és magasabbrendű deriváltak, összefoglaló szabálytábla és 4 klasszikus buktató.

## [0.18.0] - 2026-11-22

### Hozzáadva
- 3.1 A deriváltfüggvény (6 oldal, 4 interaktív ábra, 15 feladat megoldással): a deriváltfüggvény fogalma és két ekvivalens alakja (h → 0 és z → x), Newton- és Leibniz-jelölések, deriválás definícióból lépésről lépésre (polinom, tört, négyzetgyök), a derivált grafikonjának leolvasása (szinkronizált kettős grafikon és töröttvonal), féloldali deriváltak és a nem differenciálhatóság 4 oka, differenciálhatóság ⇒ folytonosság bizonyítással, Darboux tétele, összefoglalás és gyakori hibák.

## [0.17.0] - 2026-11-22

### Hozzáadva
- 2.7 Érintő és derivált (6 oldal, 4 interaktív ábra, 15 feladat megoldással): dinamikus érintőfogalom és tévhitek cáfolata, görbe meredeksége és érintő egyenlete, differenciahányados, pillanatnyi változási sebesség és pontbeli derivált, függőleges érintők és nem létező érintők (tüske, töréspont, oszcilláció), az érem öt oldala, valamint a 2. fejezet összefoglalása.
- A 2. fejezet (Határérték és folytonosság) ezzel teljes.

## [0.16.0] - 2026-11-22

### Hozzáadva
- 2.6 Folytonosság (6 oldal, 5 interaktív ábra, 15 feladat megoldással): pontbeli folytonosság és a hármas feltétel (belső pont és végpontok), a szakadási helyek katalógusa (megszüntethető, ugrás, végtelen, oszcilláló), folytonos függvények algebrai műveletei és kompozíciója, folytonos kiterjesztés, a Bolzano-tétel és a felező zérushelykeresés, összefoglalás és gyakori hibák.

## [0.15.0] - 2026-11-22

### Hozzáadva
- 2.5 Végtelen határértékek és függőleges aszimptoták (6 oldal, 5 interaktív ábra, 15 feladat megoldással): féloldali és kétoldali végtelen határértékek, racionális függvények a nevező zérushelyei közelében (lyuk vs. pólus), a végtelen határérték precíz (B–δ) definíciója, függőleges aszimptoták (racionális és trigonometrikus görbék), domináns tagok (közeli és távoli viselkedés, polinomok nagy léptékben), összefoglalás és gyakori hibák.

## [0.14.0] - 2026-11-22

### Hozzáadva
- 2.4 Jobb és bal oldali határérték. Határérték a végtelenben (6 oldal, 5 interaktív ábra, 15 feladat megoldással): jobb és bal oldali határértékek és a kétoldali határértékkel való kapcsolat, féloldali ε–δ definíció, a (sin θ)/θ nevezetes határérték geometriai szendvicsbizonyítása és alkalmazásai, véges határérték a végtelenben (ε–M és ε–N definíció), racionális függvények, vízszintes és ferde aszimptoták, összefoglalás és gyakori hibák.

## [0.13.0] - 2026-11-21

### Hozzáadva
- 2.3 A határérték precíz definíciója (6 oldal, 4 interaktív ábra, 15 feladat megoldással): hibahatár-játék (ε–δ), a definíció és a 0 < |x − x₀| szerepe, a δ megkeresése két lépésben, pontos és biztonságos δ nem lineáris függvényeknél, az összegszabály és az egyenlőtlenség-megőrzés bizonyítása a definícióból, összefoglalás és gyakori hibák.
- Kötetközi számoló segédfüggvények (firstBad, maxDelta) az ε–δ ábrákhoz.

## [0.12.0] - 2026-11-21

### Módosítva
- A bal oldali tartalomjegyzék (oldalsáv) újratervezése: haladáskártya a tetején (kattintásra a teljes tartalomjegyzék), kötetfejlécek római számmal és haladásszámlálóval, fejezetek színes jelvénnyel, szakaszszámlálóval és nyíllal.
- A szakaszlista időtengelyes: a kész szakaszok színes ponttal, az aktuális kiemelt, pulzáló ponttal; a készülők halványak.
- A jelenlegi fejezet automatikusan nyitva, színes bal szegéllyel.

## [0.11.1] - 2026-11-21

### Javítva
- A gradiens címekben (tartalomjegyzék, szakaszcímek) a betűk lelógó részei (j, gy, p) levágódtak; a sormagasság és a belső alsó térköz növelve.

## [0.11.0] - 2026-11-21

### Módosítva
- A tartalomjegyzék teljes újratervezése: animált nyitóblokk (önmagát megrajzoló görbe, rajta futó érintő), haladásgyűrű és statisztika, „Folytatás" gomb.
- Kötetfejlécek nagy számmal és haladássávval; fejezetkártyák saját színnel, fejezetenkénti animált emblémával (hoverre újrarajzolódik), szakaszonkénti haladásjelzővel.
- Szakaszlista időtengelyként: a kész szakaszok pulzáló ponttal és oldalszámmal, a készülők üres ponttal.
- „Csak a kész szakaszok" szűrő; lépcsőzetes belépő animáció; a mozgáscsökkentés beállítás figyelembevétele.

## [0.10.0] – 2026-11-21
### Új
- 2.2 Határértékek kiszámítása (6 oldal, 14 feladat): határérték és alapműveletek, polinomok és racionális törtfüggvények, a nullává váló nevező kiküszöbölése (szorzattá bontás, konjugált, közös nevező), szendvicstétel, egyenlőtlenségek és a szabályok határai, módszerválasztás. Hat új interaktív ábra.

## [0.9.0] – 2026-11-21
### Új
- 2.1 Változási sebesség, a határérték szemléletes fogalma (6 oldal, 11 feladat): átlagos változási sebesség és szelő, pillanatnyi sebesség és érintő, a határérték szemléletes fogalma, határérték és függvényérték, nem létező határérték, géppel való becslés csapdái. Hat új interaktív ábra.

## [0.8.0] – 2026-11-21
### Új
- 1.7 Grafikus módszerek (6 oldal, 9 feladat): ablak és mintavétel, négyzetes ablak, hamis függőleges vonalak a pólusoknál, gyors oszcilláció, hiányzó ág törtkitevős hatványnál, regresszió és az extrapoláció veszélye. Hat új interaktív ábra.
- Az 1. fejezet ezzel teljes.

## [0.7.0] – 2026-11-21
- Új: 1.6. Trigonometrikus függvények (6 oldal, 6 interaktív eszköz, 9 feladat megoldással): radián, egységkör és a hat szögfüggvény, periodicitás és grafikonok, általános szinuszgörbe, azonosságok (levezetéssel), koszinusztétel.

## [0.6.0] – 2026-11-21
- Új: 1.5. Műveletek függvényekkel és függvénytranszformációk (6 oldal, 5 interaktív eszköz, 8 feladat megoldással): függvények számtana, összetett függvények, eltolás, méretezés és tükrözés, a transzformációk sorrendje, ellipszis.

## [0.5.1] – 2026-11-21
- Javítás: a verziószám a tartalomjegyzék nézetben, keskeny képernyőn (telefon) is látszik a fejlécben.
- Módosítás: az Előző/Következő gombok új, konzervatív acélkék 3D kivitelt kaptak vékony arany szegéllyel, lenyomódó állapottal.

## [0.5.0] – 2026-11-21
- Új: 1.4. Alapvető függvénytípusok és matematikai modellek (6 oldal, 7 interaktív eszköz, 8 feladat megoldással).
- Javítás: az előző/következő gomb lila színátmenete kékre cserélve.

## [0.4.0] – 2026-11-21
- Új: 1.3. Függvények és grafikonok (6 oldal, 5 interaktív eszköz, 8 feladat megoldással).

## [0.3.0] – 2026-11-21
- Új: animált nyitóoldal (borító) és egységes, tervezett tartalomjegyzék-oldal kötetenkénti haladásjelzéssel.
- Új: verziószám a nyitóoldalon és a láblécben.
- Változás: új, visszafogottabb színvilág (grafitkék háttér, ciánkék és borostyán kiemelések).

## [0.2.0] – 2026-11-21
- Új: 1.2. Egyenesek, körök és parabolák (8 oldal, 6 interaktív ábra, 8 feladat).

## [0.1.0] – 2026-11-20
- Első kiadás: 1.1. A valós számok és a valós számegyenes (7 oldal, 4 interaktív eszköz, 6 feladat).
