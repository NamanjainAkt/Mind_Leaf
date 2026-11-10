# Wiki Schema

## Directory Layout
```
wiki/
  index.md           — page catalog (required, must exist)
  log.md             — change log (required, reverse chronological)
  SCHEMA.md          — this file
  overview.md        — project overview
  entities/          — persistent domain entities (Persona, Feature, Module, System)
  concepts/          — design concepts, decisions, patterns
  sources/           — cited source abstracts (one file per source)
  analyses/          — deep-dive analyses
```

## Page Header Convention
```yaml
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: entity | concept | analysis | source
scope: project-wide | module | cross-cutting
```

## Citing Sources
Use `([[sources/source-name]])` to cite a claim within a wiki page.
