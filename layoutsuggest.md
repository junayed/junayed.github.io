# Layout Suggestion Brief

## Purpose

This document focuses on practical layout, spacing, typography, visual storytelling, and language improvements for the website. It complements `designsuggest.md`, but goes deeper into how each page or section can become more visually stunning, clearer, and more executive-grade.

Review basis:

- Existing website structure
- Current local visual review
- `web-design-reviewer` workflow
- `web-design-guidelines` accessibility and UX rules

## Overall Layout Principle

The site should not feel like a long collection of sections. It should feel like a curated executive product experience.

Recommended layout philosophy:

- Lead with outcomes.
- Show fewer items at once.
- Use progressive disclosure for depth.
- Let visual hierarchy decide what matters.
- Use dashboards as proof of applied capability, not standalone toys.
- Make case studies feel like board-level transformation stories.

## Ideal Visual System

### Layout Grid

Use a consistent 12-column desktop grid:

- Main content max width: `1180px` to `1240px`
- Article width: `680px` to `760px`
- Case study content width: `1040px` to `1180px`
- Dashboard width: `1280px` max
- Gutters: `24px` desktop, `16px` mobile

### Section Spacing

Recommended spacing:

- Hero vertical padding: `96px` desktop, `56px` mobile
- Standard section padding: `72px` desktop, `48px` tablet, `32px` mobile
- Dense dashboard sections: `40px` to `56px`
- Section heading to content grid: `28px` to `36px`
- Card internal padding: `24px` desktop, `18px` mobile
- Card grid gap: `24px` desktop, `16px` mobile

### Typography Scale

Recommended scale:

- Hero H1: `52px` desktop, `38px` tablet, `32px` mobile
- Page H1: `44px` desktop, `34px` tablet, `30px` mobile
- Section H2: `32px` to `38px`
- Card H3: `18px` to `22px`
- Body: `16px` to `17px`
- Small labels: `12px` to `13px`
- Buttons: `14px` to `15px`
- Metrics: `28px` to `36px`, depending on context

Use:

- `line-height: 1.1` for large headings
- `line-height: 1.35` for card titles
- `line-height: 1.65` for body text
- `text-wrap: balance` for headings
- `font-variant-numeric: tabular-nums` for dashboards and metrics

## Homepage Layout Suggestions

### Hero

Current goal is strong, but it can feel even more refined.

Suggested updates:

- Add a small eyebrow above name:
  - `Director / Head of AI | Enterprise AI Transformation`
- Keep name as the only hero-sized text.
- Move role line into a smaller, high-contrast subtitle.
- Place metrics in a compact proof strip rather than three mini cards.
- On mobile, show one primary CTA first, then secondary CTAs below.

Ideal hero order:

1. Eyebrow
2. Name
3. Role line
4. Value statement
5. Proof strip
6. CTA row
7. Portrait

Language refinement:

Current hero value statement is good. A slightly sharper option:

> Building governed AI platforms and industrial intelligence systems that improve reliability, decision-making, and operational performance at enterprise scale.

### AI Leadership Focus Areas

Current section has strong content but too much copy inside each card.

Recommended layout:

- 3 cards only.
- Each card should have:
  - 1 short title
  - 1 sentence
  - 2 bullets
  - 1 proof tag

Suggested titles:

- AI Strategy & Governance
- Industrial AI Platforms
- Agentic Systems & Automation

Suggested language:

Instead of:

> Turning frontier research into deployable, business-critical AI-production-grade explainable AI...

Use:

> Translating research-grade AI into governed systems that survive production, audits, and enterprise adoption.

Spacing:

- Cards should be slightly shorter.
- Reduce bullet spacing.
- Keep CTA aligned at the bottom.
- Avoid long text columns inside cards.

### Achievements / Outcomes

Current layout reads as large cards with dense paragraphs.

Better structure:

- First show a compact KPI band:
  - `95%+ Reliability`
  - `20x Efficiency`
  - `GBP 15M+ Programs`
- Then 3 short evidence cards below.

Language improvements:

- Use outcome-first phrases.
- Avoid repeating "AI" too often.
- Use fewer adjectives.

Example:

> Scaled predictive maintenance programs across safety-critical assets, combining model accuracy, adoption, and operational governance.

### Success Stories

This section should feel cinematic and premium.

Recommended layout:

- Two large feature cards.
- Image on top, content below.
- Add metric chips over the image or immediately below title.
- Add short role label:
  - `Role: AI platform strategy, governance, production delivery`

Case card language:

Case 1:

> Predictive uptime for safety-critical assets through explainable AI, sensor fusion, and production governance.

Case 2:

> Agentic infrastructure protection using autonomous monitoring, escalation workflows, and governed human oversight.

Spacing:

- Use a two-card layout with generous image height.
- Cards should not feel like basic thumbnails.
- Give each card enough width to breathe.

### Collaborators / Partners

This is one of the biggest layout opportunities.

Problem:

- The partner list is too long for equal-weight cards.
- Text-only cards make the section feel repetitive.
- The section asks the visitor to work too hard.

Recommended layout:

#### Featured Partner Strip

Show 6 to 8 key organizations only:

- University of Oxford
- Subsea7
- Microsoft
- Google
- Net Zero Technology Centre
- Scottish Government
- KAIST / POSTECH
- Hyundai / KEPCO

Use compact logo tiles.

#### Category Navigation

Tabs:

- Featured
- Universities
- Industry
- Public R&D
- Technology

#### Expandable List

After 9 to 12 items:

- Add `Show More Collaborators`
- Or use a drawer/accordion.

Ideal card:

- Logo or monogram
- Organization name
- Relationship type
- One short phrase

Example:

```text
University of Oxford
Research Collaboration
AI for energy and social impact
```

Spacing:

- Partner cards should be compact.
- Use 4 columns on desktop.
- Use 2 columns on tablet.
- Use grouped accordions on mobile.

### Memory Lane / Gallery

Current section is useful but should not compete with executive case studies.

Recommended:

- Rename to `Field Notes & Speaking`
- Show 3 featured moments.
- Add `View More Moments`.
- Use shorter captions.
- Make images editorial, not equal-size proof blocks.

Language style:

- More formal, less diary-like.
- Example:
  - `Representing the National Subsea Centre at BINDT 2024`
  - `Invited talk on graph neural networks for pipeline inspection`

## AI/ML Demo Dashboard Suggestions

Applies to `cbmdashboard.html`.

### Positioning

The demo should be framed as:

> A product-style AI operations dashboard demonstrating predictive maintenance, model selection, and sensor intelligence for industrial assets.

Avoid making it feel like a random technical prototype.

### Page Structure

Recommended layout:

1. Demo hero
2. Executive system summary
3. Control bar
4. Health / risk KPI strip
5. Sensor monitoring grid
6. Global analytics sidebar
7. Frequency analysis
8. Notifications

### Hero Language

Current:

> Advanced Predictive Maintenance Dashboard

Better:

> Industrial AI Predictive Maintenance Demo

Subtitle:

> Real-time sensor intelligence, model selection, and explainable risk monitoring for critical assets.

### System Description

Current description cards are text-heavy.

Recommended:

- Convert to 4 compact cards:
  - Problem
  - AI Approach
  - Operational Value
  - Target Users

Example language:

Problem:

> Detect early equipment degradation before downtime, failure, or safety risk.

AI Approach:

> Multi-model anomaly detection across vibration, pressure, temperature, and frequency signals.

Operational Value:

> Turns reactive maintenance into governed, evidence-led intervention planning.

Target Users:

> Reliability teams, asset managers, plant engineers, and AI product leaders.

### Control Panel

Current controls feel card-like and occupy too much visual space.

Recommended:

- Make it a horizontal toolbar.
- Use compact controls.
- Use one red primary action only.
- Human-in-loop alert should be visually distinct but not oversized.

Suggested order:

1. Time range
2. Refresh
3. View mode
4. Agentic system link
5. Human-in-loop alert

### Sensor Cards

Current sensor cards are useful but dense.

Recommended:

- Add card hierarchy:
  - Sensor name
  - Status badge
  - Current value
  - Trend
  - Model dropdown
  - Mini chart
- Move detailed legends into tooltip or collapsible area.
- Use compact typography.
- Keep active card red/dark with strong dropdown contrast.

Card states:

- Normal: subtle charcoal card
- Warning: amber accent
- Critical: red accent
- Selected: premium crimson/dark active state

### Charts

Recommended:

- Reduce legend text inside each card.
- Add consistent chart axis label style.
- Use red only for critical lines.
- Keep green/amber/red status colors for operational clarity.

### Dashboard Language

Replace beginner/explanatory text with product-grade language.

Instead of:

> Chart will be inserted here

Use hidden implementation comments only, or no visible fallback.

Instead of:

> Signal Range

Use:

> Operating Range

Instead of:

> Model Strength

Use:

> Model Bias

or:

> Detection Strength

## Agentic AI Demo Suggestions

Applies to `cbmdashboard2.html`.

### Positioning

Current agentic demo feels interesting but slightly playful.

Recommended positioning:

> Agentic AI Operations Hub

Subtitle:

> Multi-agent monitoring, prediction, optimization, and escalation workflows for industrial operations.

### Layout

Recommended:

1. Executive status strip
2. Agent coordination view
3. Active sensors
4. Governance / human oversight panel
5. Chat assistant
6. Analytics

### Visual Tone

Reduce emoji dependency.

Use:

- Small professional status icons
- Minimal labels
- Role-based agent cards
- Red/dark status accents
- Subtle glow only around active system elements

### Agent Circle

The circle is a good concept, but should look more enterprise.

Improvements:

- Make central brain smaller and more refined.
- Add thin orbital rings.
- Use role initials or icons instead of large emoji.
- Show selected agent details in a side panel.

### Chatbot

Recommended:

- Rename to `Operations Copilot`.
- Use a professional assistant panel.
- Add prompt chips:
  - `Summarize Risk`
  - `Explain Alert`
  - `Recommend Action`
  - `Show Agent Status`

### Governance

Add a panel called:

> Human Oversight & Governance

Include:

- Escalation policy
- Audit trail
- Confidence thresholds
- Human approval status

This makes the demo relevant to Director / Head of AI audiences.

## Case Study Design and Language Suggestions

### Case Study Hero

Better structure:

```text
Case Study
Explainable AI Transformation
Predictive uptime for safety-critical industrial assets.

Industry: Energy & Heavy Manufacturing
Role: AI Strategy, Model Governance, Production Delivery
Impact: 95%+ Accuracy | $50M+ Prevented Losses | 100% Compliance
```

### Executive Summary

Current Challenge/Solution/Impact structure is good.

Refinement:

- Keep each card under 55 words.
- Add a one-line takeaway below the three cards.

Example takeaway:

> The program shifted maintenance from reactive response to governed, explainable, data-led intervention planning.

### Metrics Section

Use a KPI strip instead of large repeated cards where possible.

Ideal metric language:

- `95%+ Prediction Accuracy`
- `$50M+ Losses Prevented`
- `100% Compliance`
- `3x Faster Training`
- `28 Telemetry Streams`
- `200+ Workforce Trained`

Avoid overly long labels like:

> Engineers & Other Workforce Trained

Better:

> Workforce Trained

### Technical Architecture

Make the architecture visual.

Recommended blocks:

- Data Sources
- Model Layer
- Explainability
- Deployment
- Governance

Even a simple horizontal flow diagram would make this section feel more premium.

### Implementation Journey

Timeline should be scannable.

Recommended:

- Phase name
- Duration
- Key decision
- Outcome

Example:

```text
Phase 1: Data Foundation
8 months
Unified telemetry streams and quality controls.
Outcome: 99.7% sensor availability.
```

### Final CTA

Make it less sales-like.

Recommended:

> Discuss Governed AI Transformation

Secondary:

> Connect on LinkedIn

## Blog / Article Layout Suggestions

The posts should feel like thought leadership.

Recommended layout:

- Add article category above title:
  - `AI Strategy`
  - `RAG`
  - `Industrial AI`
- Add metadata:
  - Date
  - Reading time
  - Original source
- Add intro deck paragraph.
- Add related posts.
- Add author card.

Typography:

- Title max width: `760px`
- Body max width: `680px`
- Body font: `17px`
- Line-height: `1.75`

Suggested article header:

```text
Insight / AI Strategy
Retrieval-Augmented Generation: A Story of Two Humans
Why retrieval quality, data clarity, and governance matter more than hype.
```

## Mobile Layout Suggestions

### Homepage Mobile

Current mobile hero stacks well but is long.

Recommended:

- Hide or move portrait lower on very small screens.
- Make hero proof metrics a compact vertical strip.
- Keep only primary CTA visible first.
- Secondary actions can be outline buttons below.

### Partner Mobile

Use accordions:

- Universities
- Industry
- Public R&D
- Technology

Avoid showing 15+ partner cards in a long scroll by default.

### Dashboard Mobile

Use collapse groups:

- Summary
- Controls
- Sensors
- Analytics
- Notifications

Make sensor cards compact by default.

## Accessibility and Polish Checklist

Recommended improvements:

- Add a skip link.
- Add `aria-pressed` to active filter buttons.
- Add `width` and `height` attributes to images.
- Add `fetchpriority="high"` to the hero portrait.
- Add `aria-hidden="true"` to decorative icons.
- Replace broad `transition: all` over time.
- Add `prefers-reduced-motion` support.
- Add `scroll-margin-top` for anchored sections.
- Ensure every dashboard control has a visible label or `aria-label`.
- Add focus-visible styles for filter buttons and social links.

## Most Important Design Decision

The site should move from:

> Everything displayed equally

to:

> A curated executive story with optional depth.

That means:

- Fewer visible cards at first.
- More "featured" treatments.
- Partner content grouped and compressed.
- Demos framed as products.
- Case studies framed as transformation evidence.
- Articles framed as thought leadership.

## Suggested Implementation Order

1. Reorder homepage into a clearer executive funnel.
2. Redesign collaborator section into featured ecosystem + expandable categories.
3. Convert success stories into cinematic case cards.
4. Add demo/product cards on homepage linking to dashboards.
5. Refine dashboard pages into product shells.
6. Add article metadata and related posts.
7. Add accessibility polish and reduced-motion support.

