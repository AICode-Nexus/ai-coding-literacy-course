# 0001 - Shared navigation and custom course layouts

**Status:** proposed

**Date:** 2026-07-21

**Spec:** none - derived from the current implementation

**Deciders:** project maintainers

## Context

The site has three presentation surfaces: the VitePress documentation layout, a branded course homepage, and an immersive presentation deck. The new instructor profile adds a fourth surface. Header links and display controls must remain consistent across the documentation, homepage, and instructor profile without forcing the presentation deck to adopt a conventional site header.

## Decision

- Keep the primary navigation definition in one data module and use it from both VitePress configuration and custom Vue layouts.
- Keep the homepage and instructor profile as explicit custom layouts selected through page frontmatter.
- Reuse small header components for primary navigation, fullscreen control, and theme switching across custom layouts.
- Keep the presentation deck headerless and expose its own keyboard-aware fullscreen control.
- Store public instructor content and asset metadata in a dedicated data module so the page component remains declarative.

## Consequences

- Navigation labels, links, query parameters, and active-match rules have one source of truth.
- Custom surfaces can preserve their visual identity while sharing behavior and accessibility contracts.
- The custom layouts must maintain their own responsive header styling and regression tests.
- Personal profile assets become part of the public static-site artifact and therefore require an explicit publication review.

## Alternatives considered

- Use only VitePress's default layout for every page. This would reduce custom code but would not preserve the established homepage, presentation, and profile compositions.
- Duplicate navigation markup in each layout. This is simpler locally but allows labels and destinations to drift.
- Add the standard site header to the presentation deck. This was not chosen because it reduces the usable 16:9 teaching surface and conflicts with the deck's focused controls.
