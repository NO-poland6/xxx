# Agra PSK — Generator etykiet roślin (paczka na Vercel)

Gotowy projekt: aplikacja + pośrednik do Anthropic API. Po wgraniu opisy generują się same,
a klucz Anthropic jest bezpieczny po stronie serwera.

## ⚠️ NAJWAŻNIEJSZE (przez to wyskakuje NOT_FOUND)
Pliki `index.html`, folder `api`, `package.json` MUSZĄ leżeć w KORZENIU repo —
NIE w podfolderze. Na głównej stronie repozytorium na GitHub masz widzieć od razu:

    index.html
    api/
    package.json
    README.md

Jeśli widzisz tam jeden folder (np. `agra-psk-vercel`), a pliki są w środku —
to właśnie powód błędu. Patrz „Naprawa NOT_FOUND” niżej.

---

## Co potrzebne
1. Konto Vercel (masz).
2. Klucz Anthropic z aktywnym billingiem: https://console.anthropic.com → API Keys.

## Wariant A — Vercel CLI (najpewniejszy, omija problem z podfolderem)
W terminalu, w rozpakowanym folderze:

    npm i -g vercel
    cd agra-psk-vercel
    vercel                              # zaloguj się; Framework: Other; resztę zatwierdź Enterem
    vercel env add ANTHROPIC_API_KEY    # wklej klucz sk-ant-...  (wybierz: Production)
    vercel --prod                       # wdrożenie produkcyjne

Gotowe — dostaniesz adres https://twoja-apka.vercel.app

## Wariant B — GitHub + Vercel
1. Wrzuć ZAWARTOŚĆ tego folderu do KORZENIA repo (nie cały folder!). Na górze repo mają
   leżeć bezpośrednio: index.html, api/, package.json, README.md.
2. Vercel: Add New… → Project → Import to repo. Framework Preset: Other. Deploy.
3. Project → Settings → Environment Variables → dodaj:
   - Name:  ANTHROPIC_API_KEY
   - Value: sk-ant-...
   - zaznacz Production, Preview, Development
4. Deployments → (ostatni) → Redeploy. (zmienna działa dopiero po ponownym wdrożeniu)

## Sprawdzenie po wdrożeniu
- Wejdź na adres aplikacji — ma się pokazać strona z logo Agra PSK.
- Wejdź na https://twoja-apka.vercel.app/api/generate — w przeglądarce ma pokazać
  „Method not allowed” (to dobrze: funkcja żyje). Jeśli „NOT_FOUND” — patrz niżej.

## Naprawa NOT_FOUND
Strona i/lub /api/generate daje NOT_FOUND = Vercel patrzy w zły folder:
- Settings → Build and Deployment → Root Directory → ustaw na folder, w którym leży
  index.html (jeśli pliki są w podfolderze repo, wpisz jego nazwę), Save → Redeploy.
- Sprawdź też: Framework Preset = Other, Build Command puste, Output Directory puste.

## Osadzenie w Shoperze (opcjonalnie)
Wygląd i treści → Strony informacyjne → edycja w trybie HTML, wklej:

    <iframe src="https://twoja-apka.vercel.app" style="width:100%;height:90vh;border:0" title="Etykiety Agra PSK"></iframe>

Jeśli kod się nie zapisuje: Ustawienia → Zaawansowane → Bezpieczeństwo → wyłącz czyszczenie HTML.

## Koszty
Vercel — darmowy plan wystarcza. Płatne tylko Anthropic API (za zużycie); jeden opis to ułamek grosza.
