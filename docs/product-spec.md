# Wingman Trips — Product Spec

## Problem

Partners (usually male, in the target audience for this product) get told, repeatedly,
that they don't plan trips or getaways. The gap isn't ability — it's that the inputs
needed to plan a trip someone else will love (her preferences, throwaway comments about
places she wants to go, what actually works with the kids) live in her head, not his.
Generic AI trip planners solve "help me plan my own trip." Nobody solves "plan a trip
for someone else, without asking them, and get it right."

## Target user

The partner (boyfriend/husband) who wants to stop being the reason trips don't happen,
and would rather hand a few inputs to a tool than do the research himself. Buys this
as much for the credit/relief as the itinerary.

Secondary beneficiary: the partner/family on the receiving end, who gets a trip that
actually fits them without having to plan it or nag for it.

## Core concept

A trip co-pilot that takes what he knows (or barely knows) about his partner and family,
fills in the rest with research, and outputs a short list of trip options and a
ready-to-book itinerary — for road trips, train trips, and flights alike, not just
flights.

## Key features

### 1. Partner & family profile
One-time, ~5 minute setup:
- Vibe preferences (relaxing / adventurous / foodie / culture / nightlife / nature)
- Deal-breakers (won't fly, hates heat, no hiking, motion sickness on winding roads)
- Past trips: loved / hated, and why
- Budget comfort zone
- Kids: ages, nap schedule, attention span, stroller vs. walker, food pickiness
- Dietary/accessibility notes

### 2. Idea Inbox
A low-friction capture point (SMS/WhatsApp number, or a browser extension/share-sheet
target) for the offhand comments partners actually make — "omg look at this Kyoto
cherry blossom pic," "we should road trip the coast someday." Forwarded items get
filed by destination/theme automatically, so nothing said in passing gets lost. This
is the feature that directly answers the nagging complaint: proof he was listening.

### 3. Trip Finder (multi-mode)
Input: home location, date window (fixed or flexible ± range), budget, who's coming,
and a **max travel time / preferred mode** (e.g., "she doesn't want more than a
4-hour drive," or "we want a train trip this time").

Search is mode-aware rather than flight-first:

| Mode | What's computed |
|---|---|
| **Road trip** | Driving time/distance, gas cost estimate (car mpg or average), scenic vs. fastest route options, rest-stop cadence for kids, EV charging stops if relevant, one-tank-trip vs. overnight-stop flag |
| **Train** | Route/transfer count, ticket cost range, scenic-route call-outs (the train itself can be the vibe), station-to-destination logistics |
| **Flight** | Flight time, rough cost, airport-to-destination logistics |

Output: a shortlist of 3 destinations, each with a card:
- Distance/time by chosen mode, with a plain-language "how you'd get there" blurb
  (e.g., "3.5 hr drive, one stop for lunch in [town], scenic route through the
  mountains")
- Cost estimate (travel + lodging + daily spend, by tier)
- Weather forecast/climate average for the actual dates
- Vibe tags
- Family-friendliness score (1–5) with the reasoning behind it
- A one-line "why this fits her" note, pulling from the profile and Idea Inbox

### 4. Itinerary Builder
Once a destination is picked: day-by-day plan with paced activity blocks (not
overpacked), restaurant picks matching dietary notes, built-in downtime for kids,
road-trip stop planner (roadside attractions, lunch spots, scenic overlooks timed to
arrival), and a packing list. Booking links go out as affiliate links (lodging,
activities, rail tickets) — a secondary revenue stream alongside subscription.

### 5. Surprise Mode
A shareable reveal page or PDF he sends her once it's decided — destination hidden
behind a countdown, or revealed immediately with a nicer presentation than "hey I
booked a thing." This is the payoff moment that makes the product screenshot-worthy
and gives him a tangible "I did this for you" artifact.

## Differentiation

- Built for planning *for* someone else, not for the planner's own trip — the
  Idea Inbox and Partner Profile are the wedge no generic AI trip planner has.
- Road trip and train modes are first-class, not an afterthought bolted onto a
  flight-first tool — this fits the higher-frequency, lower-stakes "let's get out
  of town this weekend" use case, which is a bigger and more naggable gap than
  once-a-year international trips.
- Family-friendliness scoring reflects real constraints (nap schedules, attention
  span, stroller terrain) rather than a generic "kid-friendly" label.

## Monetization

- Impulse-buy pricing: $12–15/mo subscription, or a one-time $19 "trip pass."
  Only needs ~7–15 payers to clear $100 MRR.
- Affiliate revenue from lodging/activity/rail booking links in the itinerary.
- Positioned as a gift-season and emotional-trigger purchase (anniversaries,
  Valentine's Day, Father's Day, "he got roasted for never planning anything").

## Distribution angle

Self-deprecating, screenshot-shareable framing: "I used AI to plan the trip so I
didn't get yelled at again." Natural fit for r/AskMen, r/travel, and TikTok/Reels
around relationship-humor and gift-season content.

## Open questions (for later)

- MVP scope and tech stack — to be discussed separately.
- Data sources for weather, driving/rail routing, and cost estimates.
- How much of the Idea Inbox capture flow needs to work day one vs. can be a manual
  note field initially.
