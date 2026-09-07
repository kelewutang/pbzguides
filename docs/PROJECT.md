# Project

PBZ Guides is an independent, unofficial English-language Phantom Blade Zero guide and reference site. Its repository is https://github.com/kelewutang/pbzguides.git and production URL is https://pbzguides.com. Local checkout: `/home/mok/projects/pbzguides`.

Phase 2A: establish a maintainable English information architecture, not a populated game database. Success means a reproducible static build, five discoverable category routes, typed empty Content Collections, a shared detail-page foundation, centralized identity, static SEO and resumable documentation.

The Chinese project is architectural reference only. Its knowledge schema, content, branding, assets, analytics, redirects and deployment identity have not been imported. There is no shared runtime or build dependency. Its documentation identifies a Chinese domain, but no language links are enabled because equivalent English pages and reciprocal mappings have not been reviewed.

## Current route contract

```text
/
/guides/                 /guides/{slug}/
/weapons/                /weapons/{slug}/
/bosses/                 /bosses/{slug}/
/combat/                 /combat/{slug}/
/characters/             /characters/{slug}/
```

URLs are lowercase, use kebab-case slugs and retain Astro's trailing-slash convention. There is no `/en/`, `/wiki/`, date route or historical redirect layer. Guides, weapons, bosses and combat are the initial conceptual priority; characters are also established as a category. This priority does not imply content volume or a launch inventory.

## Content direction — requires review

These are hypotheses about English player tasks, not measured keyword-volume findings:

| Candidate | Player intent | Admission condition |
| --- | --- | --- |
| Guides | How to start, understand combat, or complete a specific task | Sourced, version-scoped actionable content |
| Bosses | Identify an encounter; later learn a verified strategy | Verified English names; separate identity from strategy claims |
| Weapons | Find a weapon and understand its use | Source-backed terminology and mechanics; no speculative ranking |
| Systems | Understand progression or combat rules | Enough sourced material to warrant a distinct reference page |
| Locations / walkthroughs | Navigate an area or find an objective | Verified places and navigational evidence |
| Characters | Identify a person or understand story context | Demonstrated reader need; spoiler policy |

Do not mirror Chinese `/world/` or create empty category routes. Items, builds, maps and rankings are deferred until evidence and user need justify them. Search and the full Fact/Entity/Relation contract are also deferred.

The five category collections share publication, SEO and optional evidence metadata, while keeping their own routes and source directories. Future weapon, boss and character taxonomies; relationships; item/location systems; tier lists; best builds; launch content inventory; cross-language mappings; social previews and visual redesign remain intentionally undecided.

Next phase: review English search results and official terminology, approve a small set of sourced article or entity briefs, then implement one real editorial pilot. Category expansion must follow English player/search intent, not automatic parity with the Chinese site. Decide indexing readiness before launch; the current library is transparently empty, and index/follow metadata is preparatory, not launch approval.
