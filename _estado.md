# Estado: ListingRoom (photo-link-room)

## 2026-06-12 17:50: MVP completo construido, testeado y en GitHub; falta deploy

Se construyó ListingRoom entero en una sesión (subagent-driven, olas paralelas):
spec + plan aprobados, scaffold Next.js 14, librerías (kit, claude, rate-limit,
scrape) con TDD (21 tests verdes), API route con modo foto y modo URL, UI completa
con tokens extraídos de photoroom.com, E2E real verificado en ambos modos
(foto ~50s, URL con Brooklinen ~40s, error de Amazon con fallback correcto),
code review final (spec ✅ + calidad) con 4 fixes aplicados (refusal → 422,
SSRF en og:image, alt text, comentario x-forwarded-for), Docker verificado
localmente (clave no horneada en imagen), README y screenshot.

- Commit único de implementación: a05db80
- Repo público: https://github.com/psanchezmolina/listingroom
- Modelo: claude-opus-4-8 con structured outputs

### Pendiente (requiere Pablo)
- [ ] Easypanel: crear app desde el repo GitHub `listingroom`, build Dockerfile,
      env `ANTHROPIC_API_KEY`, puerto 3000, HTTPS Let's Encrypt
- [ ] DNS: `listingroom.pablo.ky` → IP del VPS Contabo
- [ ] Verificación en vivo (generación real en https://listingroom.pablo.ky)
      antes de dar por cerrado, y entonces `git tag v1.0 && git push --tags`

### Fase 2 (solo documentada, para la candidatura)
- Scraping API para Amazon/Etsy, SEO programático por categoría, analytics PostHog

## Pendiente global
- Deploy y verificación en vivo de ListingRoom (ver arriba)
