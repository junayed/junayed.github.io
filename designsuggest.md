# Design Suggestion Brief

## Review Context

Reviewed the local site as an executive AI leadership platform across:

- `index.html`
- `case1.html`
- `case2.html`
- `cbmdashboard.html`
- `cbmdashboard2.html`
- `posts/*.html`
- Desktop dark mode, desktop light mode, mobile dark mode, and dashboard views

Design review used the existing `web-design-reviewer` and `web-design-guidelines` skills. No new skill installation was needed because the relevant UI/UX review skills are already available.

## North Star

Position the website as:

> A premium executive AI leadership platform for Director / Head of AI opportunities, combining strategic maturity, industrial AI credibility, governance depth, and real product evidence.

The visual language should feel:

- Dark premium by default
- Black, charcoal, and deep red as the brand base
- Calm and executive, not noisy
- Product-grade, not brochure-heavy
- Evidence-led, not keyword-stacked
- Easy to scan in 5 seconds, with depth available on demand

## Current Diagnosis

The latest site direction is much stronger than before, but the site still has a content-density and hierarchy problem. It contains many valuable pieces: leadership positioning, outcomes, case studies, partners, demos, articles, speaking/gallery content, and dashboards. The issue is not lack of content. The issue is that too much content is competing at the same visual level.

The biggest design opportunity is to introduce editorial hierarchy:

- Lead with the strongest executive signal.
- Show only the best proof above the fold.
- Move dense evidence into progressive layers.
- Use fewer but stronger cards.
- Turn long partner lists into a credible ecosystem section instead of a wall of names.

## Global Design System Recommendations

### 1. Brand System

Keep the black/red identity, but make it more disciplined.

Recommended palette:

- Background: near-black `#070707`
- Surface: charcoal `#111113`
- Elevated surface: `#181416`
- Border: muted burgundy-grey `#332126`
- Primary accent: crimson `#b51f2a`
- Hover accent: brighter red `#d12a36`
- Text: warm white `#f7f4f2`
- Secondary text: warm grey `#b9b1ad`
- Light mode background: warm off-white `#fbfaf9`
- Light mode text: deep charcoal `#171214`

Use red for:

- Primary CTAs
- Active filters
- Key metrics
- Small badge accents
- Focus rings
- Dashboard active states

Do not use red for large blocks of body text. Red text should be reserved for labels, metrics, and links only.

### 2. Typography

The current typeface feels bold and distinctive, but the repeated heavy weights make many sections feel loud.

Recommended typography rules:

- H1: strong but restrained, max 2 lines
- H2: section title, smaller and tighter than current
- H3: card title, 1 to 2 lines max
- Body: 16px to 17px, line-height 1.6 to 1.75
- Metrics: large enough to scan, not hero-sized everywhere
- Buttons: 14px to 15px, semibold, centered
- Partner names: 16px to 18px, not oversized

Add:

- `text-wrap: balance` for hero and section headings
- `font-variant-numeric: tabular-nums` for metrics and dashboards
- consistent paragraph max width around 64 to 72 characters

### 3. Spacing

The site sometimes jumps from very spacious to very dense.

Recommended spacing rhythm:

- Hero: strong breathing room, but less empty vertical space above content
- Standard sections: 72px desktop, 48px tablet, 32px mobile
- Card padding: 24px desktop, 18px mobile
- Grid gap: 24px desktop, 16px mobile
- Section header to grid: 32px
- Card title to body: 12px
- Body to CTA: 20px

Use the same spacing scale everywhere: 8, 12, 16, 24, 32, 48, 72.

### 4. Buttons

The button system should become quieter and more intentional.

Recommended hierarchy:

- Primary: filled crimson
- Secondary: dark transparent with burgundy border
- Tertiary: text link with red underline on hover

Button rules:

- Same height across all pages
- Same border radius
- Text centered vertically and horizontally
- No overly wide buttons unless full-width mobile
- Hero may have 3 CTAs on desktop, but mobile should show 1 primary CTA first, then secondary links below

Suggested hero mobile order:

1. Discuss AI Leadership Opportunities
2. Explore Work
3. View Demos

### 5. Cards and Panels

Cards currently work, but too many card types have similar visual weight.

Recommended card system:

- Evidence cards: stronger metric, shorter text
- Content cards: subdued border, no heavy hover
- Product dashboard panels: darker, denser, more technical
- Partner cards: compact, logo/name first, short relationship type
- Article cards: editorial, text-first, minimal decoration

Hover states should be subtle:

- Slight lift
- Red border glow
- Background darkens by one step
- Text remains stable and readable

Avoid changing all text color on hover. It creates contrast risk and visual noise.

## Homepage Recommendations

### Hero Section

Current state:

- Stronger than before.
- Clear executive positioning.
- Good portrait balance.
- Still has too much vertical empty space at the top on desktop.
- Mobile hero pushes CTAs below the first screen, making the proof and action feel delayed.

Recommended improvements:

- Reduce top empty space so the hero content starts slightly higher.
- Add a tiny eyebrow above the name: `Director / Head of AI Candidate`.
- Keep the value statement short.
- Convert social icons into a smaller "Proof links" row with labels hidden visually but available to screen readers.
- On mobile, reduce portrait priority or move portrait below first CTA only.
- Add a small proof strip under CTAs: `Industrial AI | Agentic Systems | Governance | GBP 15M+ Programs`.

### AI Leadership Focus Areas

Current state:

- Useful content but too text-heavy.
- Cards are tall and dense.
- Every bullet competes equally.

Recommended layout:

- Keep 3 cards.
- Reduce each card to:
  - Short title
  - 1 sentence
  - 2 bullets max
  - Small "Relevant to" label
- Move longer details into a "View capability map" modal or deeper services page.

Suggested card structure:

- AI Strategy & Governance
- Industrial AI Platforms
- Agentic Systems & Automation

### Results / Achievements

Current state:

- Strong claims, but copy feels like three mini essays.

Recommended layout:

- Convert to a horizontal KPI band first:
  - 95%+ reliability
  - 20x workflow efficiency
  - GBP 15M+ AI/R&D programs
- Under that, use 3 compact explanation cards.
- Keep each card under 45 words.
- Add "Evidence type" chips: `Production`, `Research`, `Executive Delivery`.

### Success Stories / Case Study Cards

Current state:

- Only two cards, leaving empty space.
- Cards feel visually under-leveraged given their importance.

Recommended layout:

- Make this a featured editorial section, not a normal card grid.
- Use two large cinematic cards side by side on desktop.
- Each card should include:
  - Image
  - Case title
  - 1-line outcome
  - 3 metric chips
  - Role label: `AI Strategy`, `Platform Leadership`, `Governance`
- Add a third placeholder card only if there is a real case. Do not add filler.

Suggested section title:

`Enterprise AI Transformations`

Suggested subtitle:

`Selected examples of production-grade AI delivery across industrial and critical infrastructure contexts.`

### Collaborators / Partners

Current state:

- The list is credible but too large to show as equal cards.
- Logos are commented out, so the section becomes a wall of text cards.
- The filter system helps, but the default "All" view is overwhelming.

Recommended information architecture:

1. Show a "Featured Ecosystem" row with 6 to 8 most recognizable partners.
2. Then show filters/tabs for:
   - Universities
   - Industry
   - Public R&D
   - Technology Platforms
3. Use compact logo tiles, not large text cards.
4. Add relationship labels:
   - Research collaboration
   - Industrial deployment
   - Public R&D program
   - Platform ecosystem
5. Add a "Show more" pattern after 9 to 12 items.

Best layout:

- Desktop: logo cloud with compact metadata on hover or click
- Mobile: accordion grouped by category

Do not make every partner card the same size as a case study. Partners are credibility proof, not the main story.

### Memory Lane / Gallery

Current state:

- Valuable personal proof, but it can dilute the executive positioning if too prominent.

Recommended repositioning:

- Rename to `Field Notes & Speaking`.
- Show 3 featured moments first.
- Put the rest behind "View More".
- Use a horizontal editorial carousel or compact masonry grid.
- Keep captions shorter and more formal.

### Contact Section

Recommended:

- Make contact a clean executive CTA.
- One primary action: `Discuss AI Leadership Opportunities`.
- Secondary links: LinkedIn, Email.
- Avoid too many methods competing equally.

## Case Study Page Recommendations

Applies to `case1.html` and `case2.html`.

### Case Hero

Current state:

- Strong visual imagery.
- Good top impact metrics.
- Slightly generic landing-page feel.

Recommended:

- Add a case-study metadata row:
  - Industry
  - Role
  - AI domain
  - Business outcome
- Keep hero title shorter.
- Move "Industry Focus" into metadata, not a second subtitle.
- Use metric chips below title with stronger spacing.

### Executive Summary

Current state:

- Challenge, Solution, Impact is good.
- Cards are readable but long.

Recommended:

- Use a 3-column executive brief with stronger labels.
- Reduce body text by about 25%.
- Add a small "Why it mattered" line below the cards.

### Metrics

Recommended:

- Metrics should be a compact dashboard strip, not full-sized cards everywhere.
- Use numeric emphasis and short labels.
- Put descriptions below only if needed.
- Use tabular numbers.

### Technical Architecture

Recommended:

- Add a diagram-like visual hierarchy:
  - Data layer
  - Model layer
  - Governance layer
  - Deployment layer
- Current card format is acceptable, but it can become more differentiated from summary cards.

### Implementation Journey

Recommended:

- Keep timeline.
- Make milestones more compact.
- Use duration and proof chips consistently.
- Add "decision points" or "leadership actions" to make it executive, not only technical.

### Business Impact

Recommended:

- Use outcome cards with financial, operational, governance, and adoption categories.
- Keep icons smaller.
- Make metric value the hero within each card.

### Critical Success Factors

Recommended:

- This should feel like lessons for executives.
- Use two columns:
  - What worked
  - What to watch
- Keep each bullet shorter.

## Dashboard Page Recommendations

Applies to `cbmdashboard.html` and `cbmdashboard2.html`.

### Overall Direction

The dashboards should feel like product demos inside the same executive brand ecosystem.

Recommended product framing:

- Add a small top demo bar:
  - Demo mode
  - Last updated
  - System status
  - View: Executive / Engineer
- Reduce explanatory text above the dashboard.
- Keep technical depth in the interface itself.

### Predictive Maintenance Dashboard

Current state:

- Impressive functionality.
- Many sensor cards create visual density.
- Dropdown and active states have improved but still need a clearer product hierarchy.

Recommended:

- Add an executive summary row before sensor cards:
  - Health
  - Risk
  - Alerts
  - Model confidence
- Group sensors by equipment type.
- Allow "compact" and "detail" card views.
- Keep dropdowns dark in active cards and accessible in light mode.
- Use red only for high-risk/critical, not every decorative accent.

### Agentic AI Dashboard

Current state:

- Strong concept.
- More playful than executive due to emoji-heavy labels and large agent visuals.

Recommended:

- Reduce emoji dependency.
- Add professional icons or small status glyphs.
- Reframe as `Agentic Operations Hub`.
- Use clear agent roles:
  - Monitor
  - Predict
  - Optimize
  - Alert
  - Learn
  - Coordinate
- Add a "Governance & Human-in-the-loop" panel to connect to executive AI leadership.

### Dashboard Mobile

Recommended:

- Prioritize global status first.
- Collapse sensor lists by group.
- Keep charts below the fold.
- Make controls sticky or grouped in a single filter panel.

## Article / Blog Page Recommendations

Current state:

- Now visually connected with header/footer.
- Still too bare editorially.

Recommended:

- Add article metadata:
  - Date
  - Category
  - Reading time
  - Original source
- Add a "Back to insights" link above the title.
- Use a narrower text column, around 680 to 720px.
- Add a related articles section at the bottom.
- Add a small author block.

Suggested article page structure:

1. Header
2. Article metadata
3. Title
4. Short deck paragraph
5. Body
6. Source link
7. Related insights
8. Footer

## Navigation Recommendations

Current navigation:

- Services
- Success Stories
- Achievements
- Collaborators
- Contact

Recommended navigation:

- Leadership
- Work
- Demos
- Ecosystem
- Insights
- Contact

Why:

- "Leadership" is more executive than Services.
- "Work" covers case studies and results.
- "Demos" makes the dashboards discoverable.
- "Ecosystem" handles partners/collaborators.
- "Insights" gives article pages a real place in the platform.

Mobile nav should include only:

- Work
- Demos
- Ecosystem
- Contact

Keep the schedule CTA visible, but shorten it on mobile to `Discuss`.

## Partner List Strategy

Because the partner/collaborator list is large, do not show everything as equal cards.

Recommended model:

### Tier 1: Featured Strategic Ecosystem

Show 6 to 8 logos/names:

- University of Oxford
- Subsea7
- Microsoft
- Google
- Net Zero Technology Centre
- Scottish Government
- KAIST or POSTECH
- Hyundai or KEPCO

### Tier 2: Category Tabs

Tabs:

- Academic
- Industry
- Public R&D
- Technology

### Tier 3: Expandable Full List

Use:

- "Show all collaborators"
- Accordion or drawer
- Search/filter if list grows above 30

This keeps credibility high without overwhelming the visitor.

## Accessibility and UX Fixes to Prioritize

Based on current source and guideline review:

1. Add a skip link to main content.
2. Add `scroll-margin-top` to anchored sections.
3. Replace broad `transition: all` with named properties over time.
4. Add explicit image `width` and `height` to reduce layout shift.
5. Add `fetchpriority="high"` to the hero portrait.
6. Add `aria-hidden="true"` to decorative icons.
7. Ensure all filter buttons expose active state via `aria-pressed`.
8. Add `color-scheme: dark light` on `html`, with dark mode using `color-scheme: dark`.
9. Add `prefers-reduced-motion` support.
10. Ensure dashboard-generated controls have accessible names.

## Suggested Page-by-Page Direction

### `index.html`

Make the homepage an executive story:

1. Hero: identity, value, proof, primary CTA
2. Outcomes: compact KPI strip
3. Selected work: 2 featured case studies
4. Leadership focus: 3 concise capability cards
5. Demos: product cards for both dashboards
6. Ecosystem: featured partners plus expandable list
7. Insights: latest 3 articles
8. Field notes: compressed gallery
9. Contact CTA

### `case1.html`

Make it an executive case study:

- Shorten hero copy.
- Add role/context metadata.
- Make metrics a compact evidence strip.
- Add architecture diagram.
- Keep the implementation timeline.
- End with a stronger "what this proves" section.

### `case2.html`

Make it feel distinct from case1 but same system:

- Emphasize agentic infrastructure protection.
- Add governance/human-in-the-loop framing.
- Show asset protection and response improvement as top KPIs.
- Include "autonomy with controls" as a visual panel.

### `cbmdashboard.html`

Make it a demo product:

- Add product-shell framing.
- Add executive summary strip.
- Group sensor cards.
- Make active state more purposeful.
- Add view mode toggle: Executive / Technical.

### `cbmdashboard2.html`

Make it a strategic agentic AI demo:

- Reduce playful styling.
- Improve agent role clarity.
- Add governance panel.
- Add workflow timeline: detect, reason, coordinate, escalate, learn.

### `posts/*.html`

Make posts feel like a real insights section:

- Add metadata.
- Add related posts.
- Add author block.
- Add back link.
- Improve article rhythm.

## Implementation Roadmap

### Phase 1: High-impact cleanup

- Fix homepage section order.
- Reduce card copy length.
- Add featured partner tier.
- Add article metadata.
- Add skip link and section scroll margins.

### Phase 2: Design system consolidation

- Create documented tokens for color, type, spacing, card, button, form, panel.
- Remove duplicate/contradictory CSS.
- Replace repeated one-off styles with reusable classes.
- Normalize card and section spacing.

### Phase 3: Premium interaction polish

- Add reduced-motion-safe animations.
- Improve focus states.
- Add better filter transitions.
- Add dashboard view toggles.
- Add partner drawer or accordion.

### Phase 4: Content architecture

- Create an Insights index page.
- Create a Demos index page.
- Create a Work index page if case studies grow beyond 2.
- Turn collaborators into an Ecosystem page if the list continues growing.

## Best Next Design Move

The single best improvement would be to restructure the homepage into a clearer executive funnel:

1. Who you are
2. What outcomes you create
3. Proof through selected work
4. How you lead AI transformation
5. Product demos
6. Ecosystem credibility
7. Insights and contact

Right now, the site has strong pieces. The next level is orchestration: make every section answer a clear visitor question, in the right order, with the right amount of detail.

