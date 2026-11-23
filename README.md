# Kalkulus – látványos tananyag

Interaktív, vizuális kalkulus-tananyag, amely a *Thomas-féle Kalkulus* (I–III. kötet, Typotex, 2006) fejezet- és szakaszsorrendjét követi.

A szövegek, a példák, a feladatok és az ábrák **saját készítésűek**; az oldal a könyv tematikáját követi, de nem a szövegét. Nem hivatalos kiegészítő, nem üzleti célú.

## Állapot

| Szakasz | Állapot |
|---|---|
| 1.1–1.7 (1. fejezet: Bevezetés) | kész |
| 2.1–2.7 (2. fejezet: Határérték és folytonosság) | kész |
| 3.1–3.8 (3. fejezet: Differenciálás) | kész |
| 4.1–4.8 (4. fejezet: A derivált alkalmazásai) | kész *(I. kötet teljes!)* |
| 5.1–5.6 (5. fejezet: Integrálszámítás) | kész *(5. fejezet teljes!)* |
| 6.1–6.7 (6. fejezet: A határozott integrál alkalmazásai) | kész *(6. fejezet teljes!)* |
| 7.1–7.8 (7. fejezet: Transzcendens függvények) | kész *(7. fejezet teljes!)* |
| 8.1–8.2 (8. fejezet: Integrálási technikák) | folyamatban (8.1–8.2 kész) |

## Fejlesztés

```bash
npm install
npm run dev          # fejlesztői szerver
npm run build        # webes, code-split build (kimenet: dist/)
npm run build:single # opcionális egyfájlos offline HTML (kimenet: dist/index.html)
```

A publikálás automatikusan történik a `.github/workflows/deploy.yml` munkafolyamattal (GitHub Settings → Pages → Source: **GitHub Actions**). Minden szakasz külön JS-chunkba fordul és csak megnyitáskor töltődik be.

## Szerkezet

- `src/data/toc.ts`: a három kötet fejezet- és szakaszsorrendje
- `src/content/`: szakaszonkénti tartalom (oldalak, dinamikus importtal)
- `src/components/`: képletek (KaTeX), számegyenes és interaktív eszközök
