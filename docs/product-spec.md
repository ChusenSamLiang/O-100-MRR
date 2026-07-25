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

## Competitive landscape

Three clusters exist today; none fully occupy this niche, but one overlaps enough to
require deliberate differentiation.

**1. General AI trip planners** — Layla, Mindtrip, Wanderlog, Vacay, FlowTrip, Trip
Planner AI, Stippl. All generate itineraries from prompts, several market a "couples"
mode, Wanderlog is strong on road-trip routing. All assume the traveler is planning
for themselves (solo or jointly with the partner inside the app). None capture a
partner's offhand comments as structured input, and none are built around planning
covertly.

**2. Couples wishlist / relationship apps** — Lovewick, Twogether, Cupla, Pilot.
Closest conceptually — Lovewick/Cupla explicitly pitch "save what she mentioned in
passing." **Pilot** is the nearest direct competitor: free, has a Wishlist that
converts into an itinerary, shared surprise notes, partner invites. What none of
these have: an actual trip-finder engine — weather, cost, family-friendliness
scoring, mode-aware road/train/flight comparison. They're note-taking and light
itinerary tools, not reasoned recommendation engines.

**3. Human-curated surprise vacation services** — Pack Up + Go, Whym, Surprisit,
Journee, SkipTown, Magical Mystery Tours, Blind Experiences, Black Tomato's "Get
Lost." These nail the emotional wedge (someone else does the work, destination
secret until reveal) via $300–$3,000+ boutique concierge, not software — a real
price/access gap below which nothing self-serve exists.

**Implication for this spec:** the product must differentiate on substance, not just
positioning — the marketing angle ("for the guy who gets nagged") is easy to copy.
The defensible parts are: Idea Inbox depth, mode-aware road/train logic as a
first-class feature (not bolted onto a flight-first tool), family-friendliness
scoring with real reasoning, and a **one-sided, secret-by-default workflow** — Pilot
and similar apps assume both partners have access; this product assumes only he does,
because a shared editable trip document breaks the surprise.

## Core concept

A trip co-pilot that takes what he knows (or barely knows) about his partner and
family, fills in the rest with research, and outputs a short list of trip options and
a ready-to-book itinerary — for road trips, train trips, and flights alike, kept
one-sided until he chooses to reveal it.

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
A low-friction capture point for the offhand comments partners actually make — "omg
look at this Kyoto cherry blossom pic," "we should road trip the coast someday."
Captured items get filed by destination/theme and feed directly into the Trip
Finder's reasoning, so nothing said in passing gets lost. This is the feature that
directly answers the nagging complaint: proof he was listening. It's also the
sharpest point of differentiation from Pilot/Lovewick/Cupla, which stop at storing
the note — here the note becomes an input to an actual recommendation, not just a
list he has to act on manually.

*MVP note:* v0 ships as a manual free-text field ("anything she's mentioned
wanting?"); an SMS/WhatsApp/share-sheet capture bot is a post-MVP addition once
retention justifies the integration work.

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
A shareable reveal page he sends her once it's decided — destination hidden behind a
countdown, or revealed immediately with a nicer presentation than "hey I booked a
thing." This is the payoff moment that makes the product screenshot-worthy and gives
him a tangible "I did this for you" artifact. Unlike Pilot/Wanderlog (shared,
editable trip docs), the underlying plan stays under his account only — she only ever
sees the reveal page, never the working document, so the surprise can't be
accidentally spoiled by shared access.

## Data sources

Split deliberately between grounded facts and generated reasoning, and labeled as
such in the product rather than presented as uniformly authoritative:

**Grounded via external APIs:**
- **Geocoding** — OpenStreetMap Nominatim (free, no key): resolves home
  location/destinations to coordinates.
- **Weather** — Open-Meteo (free, no key): real forecast for trips within ~16 days;
  historical climate averages by location/month for anything further out (the
  realistic case for most planned trips).
- **Driving distance/time** — OpenRouteService or Mapbox Directions (free tier, API
  key): real routing for gas cost and drive-time estimates, not a straight-line guess.

**LLM-generated (Claude), shown as estimates, not live data:**
- Destination ideas, "why this fits her" reasoning, vibe tags, family-friendliness
  score and its reasoning, itinerary activities and restaurant picks.
- Flight/train pricing and lodging/daily-spend ranges — no free API exists for these;
  shown as ballpark ranges with a visible "estimate — check current prices"
  disclaimer, with itinerary links pointing to Google Flights / Amtrak / Booking.com
  search results (constructed URLs) rather than live quotes. Live pricing APIs
  (Amadeus, Skyscanner affiliate, Amtrak) are a deliberate post-MVP addition, not a
  launch blocker.

## MVP scope

**Goal:** validate willingness to pay before investing in live pricing integrations
or deeper automation.

**User flow:**
1. Sign up (email via Supabase Auth) → one partner/family profile per account.
2. Idea Inbox as a free-text field.
3. Trip Finder form (home location, dates, budget, mode preference, max travel time)
   → 3 destination cards, generated free.
4. **Paywall here:** shortlist is free; a $19 one-time unlock generates the full
   itinerary + reveal page. This is the point of peak investment/interest, and avoids
   asking for a subscription commitment before the product has proven itself.
5. Itinerary Builder output, with affiliate search links.
6. Surprise Mode reveal page (static, shareable URL; countdown optional).

**Stack:** Next.js + Supabase (auth + Postgres) + Claude API for generation +
Open-Meteo for weather + Stripe Checkout + Vercel deploy.

**Explicitly out of scope for v0:** live flight/train pricing APIs, SMS/WhatsApp
capture bot, multi-kid granular profiles, route optimization beyond basic
distance/time, PDF/video reveal export, collaborative/shared editing (deliberately —
see Surprise Mode above).

## Monetization

- $19 one-time itinerary unlock at MVP; revisit subscription ($12–15/mo for unlimited
  trips) once repeat-trip demand is evidenced. Only needs ~7–15 payers to clear $100
  MRR at either price point.
- Affiliate revenue from lodging/activity/rail booking links in the itinerary.
- Positioned as a gift-season and emotional-trigger purchase (anniversaries,
  Valentine's Day, Father's Day, "he got roasted for never planning anything").

## Distribution angle

Self-deprecating, screenshot-shareable framing: "I used AI to plan the trip so I
didn't get yelled at again." Natural fit for r/AskMen, r/travel, and TikTok/Reels
around relationship-humor and gift-season content. Given how easily this angle could
be copied, distribution should lean on it early while the product differentiation
(Idea Inbox → reasoned shortlist, mode-aware road/train logic, one-sided secrecy)
catches up as the durable moat.

## Risks

- **Pilot** is free and already does wishlist→itinerary conversion with surprise
  notes; charging $19 only works if the AI-generated shortlist and reasoning are
  clearly worth more than a free wishlist tool — this should be tested directly in
  early user feedback, not assumed.
- LLM-estimated costs (flights, lodging) risk eroding trust if presented without
  clear "estimate" labeling — the disclaimer is a product requirement, not a nice-to-have.
- The "for men who get nagged" positioning is a marketing wrapper, not a moat; if it
  works, expect fast copycats, so feature depth (Idea Inbox, mode-aware logic, family
  scoring) needs to ship early rather than be an afterthought to the marketing.
