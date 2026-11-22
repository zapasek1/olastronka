# Meat the vet

Strona lek. wet. Aleksandry Marcinkowskiej, dietetyka psów i kotów (Instagram [@meat.thevet](https://www.instagram.com/meat.thevet/)).

Statyczna strona w [Astro](https://astro.build), hostowana za darmo na GitHub Pages. Ten sam układ co gadam.edu.pl.

## Struktura

| Strona | Plik | Treść |
| --- | --- | --- |
| Start | `src/pages/index.astro` | `src/content/glowna.json` |
| Oferta i cennik | `src/pages/oferta.astro` | `src/content/oferta.json` |
| Opinie | `src/pages/opinie.astro` | `src/content/opinie.json` |
| Kontakt + formularz | `src/pages/kontakt.astro` | `src/content/kontakt.json` |
| Polityka prywatności | `src/pages/polityka-prywatnosci.astro` | `src/content/polityka.json` |

Dane wspólne (e-mail, telefon, Instagram, opis dla Google) są w `src/content/ustawienia.json`.
Ustawienia techniczne (klucz formularza, przełącznik wariantów) są w `src/site.config.ts`.

## Praca lokalnie

```bash
npm install
npm run dev      # podgląd na http://localhost:4321/olastronka/
npm run build    # gotowa strona w dist/
```

## Publikacja

Każdy push do `main` buduje i publikuje stronę (GitHub Actions, `.github/workflows/deploy.yml`).
Zmiany do akceptacji idą najpierw na osobną gałąź.

Jednorazowo: Settings > Pages > Source: **GitHub Actions**.

## Własna domena

1. W `astro.config.mjs` ustaw `SITE = 'https://domena.pl'` i `BASE = '/'`.
2. Dodaj plik `public/CNAME` z domeną.
3. DNS u rejestratora: rekordy A na adresy GitHub Pages (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) oraz CNAME `www` na `zapasek1.github.io`.
4. Settings > Pages > Custom domain: wpisz domenę, potem zaznacz Enforce HTTPS.

Uwaga na pocztę w domenie: jeśli skrzynka działa na starym hostingu, przenieś ją przed wyłączeniem hostingu.

## Formularz

Wysyłka przez [Web3Forms](https://web3forms.com) (250 zgłoszeń miesięcznie za darmo, bez załączników).
Klucz zakłada się na e-mail właścicielki i wpisuje w `src/site.config.ts` (`web3formsKey`).
Bez klucza formularz otwiera program pocztowy z gotową wiadomością.
Ochrona przed spamem: ukryte pole i minimalny czas wypełniania.

## Panel edycji (CMS)

Pod adresem `/admin/` działa [Sveltia CMS](https://github.com/sveltia/sveltia-cms).
Logowanie: „Sign In with Token” + fine-grained token GitHub z dostępem tylko do tego repozytorium (Contents: Read and write).

## Propozycje wyglądu

Na etapie wyboru projektu w prawym dolnym rogu jest przełącznik A / B / C
(A: szałwia, B: pudrowy róż, C: jasny i minimalny). Można też dodać do adresu `?wariant=b`.
Po wyborze: w `src/site.config.ts` ustaw `domyslnyWariant` i `pokazWarianty: false`.

## Zasady tekstów

- pierwsza osoba liczby pojedynczej („pomagam”, „układam”)
- prosty język, bez żargonu
- bez długich myślników
