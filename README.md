# Kalkulus – látványos tananyag

Interaktív, vizuális kalkulus-tananyag, amely a *Thomas-féle Kalkulus* (I–III. kötet, Typotex, 2006) fejezet- és szakaszsorrendjét követi.

A szövegek, a példák, a feladatok és az ábrák **saját készítésűek**; az oldal a könyv tematikáját követi, de nem a szövegét. Nem hivatalos kiegészítő, nem üzleti célú.

## Állapot

| Szakasz | Állapot |
|---|---|
| 1.1–1.7 (1. fejezet: Bevezetés) | kész |
| 2.1–2.7 (2. fejezet: Határérték és folytonosság) | kész |
| 3.1–3.4 (3. fejezet: Differenciálás) | kész |
| 3.5-től a többi szakasz | folyamatban |

## Fejlesztés

```bash
npm install
npm run dev      # fejlesztői szerver (sablon: app.html)
npm run build    # kimenet: index.html és docs/index.html
```

A GitHub Pages bármelyik beállítással működik: Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, mappa: `/ (root)` vagy `/docs`. A build mindkét helyre a kész oldalt írja (`index.html` és `docs/index.html`).

## Szerkezet

- `src/data/toc.ts`: a három kötet fejezet- és szakaszsorrendje
- `src/content/`: szakaszonkénti tartalom (oldalak)
- `src/components/`: képletek (KaTeX), számegyenes és interaktív eszközök
