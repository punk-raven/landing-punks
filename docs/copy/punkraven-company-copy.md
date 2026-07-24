# PunkRaven - Homepage & About Page Copy

> **Status note:** PunkRaven is pre-launch. T&T is at planning stage, Lawman is fully
> specified but not built, LawSafe is in design. All copy below is written for a company
> that has not shipped yet, and is deliberately phrased so that remains true when read.
> **Before publishing, read [Part D - Claim status](#part-d---claim-status).**

**Contents**

- [Part A - Positioning](#part-a---positioning) - the spine everything else derives from
- [Part B - Homepage](#part-b---homepage)
- [Part C - About page](#part-c---about-page)
- [Part D - Claim status](#part-d---claim-status)
- [Part E - Copy notes](#part-e---copy-notes)

Source documents: `lawman-summary.md`, `lawsafe-product-vision.md`, `tnt-website-copy.md`.

---
---

# Part A - Positioning

Not for publication. This is the argument the public copy is compressed from.

## A1. What kind of company this is

**PunkRaven is a technology company.** It builds applied AI infrastructure for Indian
languages and for domains where being confidently wrong is expensive.

**It is not a legal services company.** This distinction governs every line of copy on the
site and is not a matter of taste:

- **Category.** Two of three projects happen to work on law. That makes law the first domain
  the company went deep on - not the company's identity. A site that reads as legal-tech
  prices the company as legal-tech, recruits for legal-tech, and caps it at the size of one
  vertical.
- **Compliance.** The LawSafe vision document is careful about Bar Council of India norms,
  Rule 36, and not operating as a tout. A software company that builds tools used by lawyers
  and citizens sits in a different regulatory position from a firm providing legal services.
  The copy must never blur that line.
- **Accuracy.** The company's actual capability is grounded, verifiable, self-hosted AI in
  Indian languages. Law is the hardest available test of that capability, which is why it
  came first. It is the proving ground, not the product category.

**One-line category:** PunkRaven builds AI infrastructure for Indian languages and
high-stakes domains.

## A2. The shape of the company

**Two layers of infrastructure, and one application built on both to prove they work.**

| | Project | What it is | Sold to |
|---|---|---|---|
| Infrastructure | **T&T** | Speech to text and translation across all 22 scheduled languages, self-hosted | Any team with Indian-language audio: contact centres, consumer apps, government, media, education |
| Infrastructure | **Lawman** | Grounded, citation-verified reasoning over a body of authoritative material - currently Indian law | Firms, in-house teams, institutions |
| Application | **LawSafe** | Chat-first legal understanding for any citizen, then a verified advocate | Citizens, small businesses |

**Why this structure is the pitch.** T&T and Lawman are horizontal capabilities with buyers
who have nothing to do with law. LawSafe is what happens when you point both at one hard
domain and take it all the way to a consumer product. A company that builds the layer *and*
ships on it is making a claim a wrapper company cannot make.

**Why the domain is swappable, structurally.** Lawman's design separates skill from facts -
the model reasons, cites and abstains, while the facts come from live retrieved material.
That separation is stated in the Lawman document as the reason its knowledge does not go
stale. It is also the reason the domain corpus is a parameter rather than a hard-coded
identity. This makes the technology-company claim architectural rather than aspirational,
and the copy should lean on it.

## A3. The three differentiators, in priority order

1. **Calibrated honesty as an engineering property.** Every PunkRaven system returns what it
   does not know. T&T scores recognition and translation confidence separately per segment
   and publishes a quality tier per language. Lawman verifies each citation against source
   text before the answer is shown, and abstains when it cannot. This belief appears
   identically in all three product documents, which makes it the company's thesis rather
   than any one product's feature.
2. **Sovereign by construction.** MIT-licensed weights and single-unit deployment mean the
   systems run inside the customer's boundary. Nothing calls out. Nobody can reprice a
   per-call licence under you.
3. **Built for Indian reality, not adapted to it.** All 22 scheduled languages, not the four
   that are easy. Domain structure learned properly rather than a foreign model asked
   politely about it. Scanned documents at the print quality Indian institutions actually
   produce.

## A4. Audience and constraints

**Who the site is for.** Technical and institutional buyers, prospective engineers, partners,
and funders. Not the citizen - LawSafe's own surface serves the citizen.

**The site's single job.** Make a skeptical technical reader believe this is a serious
infrastructure company, without letting them conclude that anything has shipped or that this
is a law firm.

**What the site must not do.** Read as shipped. Read as legal services. Carry a logo strip.
Publish a benchmark nobody has run.

---
---

# Part B - Homepage

## B0. Page metadata

| Field | Value |
|---|---|
| Page title | PunkRaven - applied AI infrastructure, built in India |
| Meta description | A technology company building India's AI layers: speech across all 22 scheduled languages, and reasoning that grounds every claim in a real source. Self-hosted, and honest about what it does not know. |
| OG title | India should not have to rent its intelligence. |
| OG description | Indigenous AI infrastructure for Indian languages and high-stakes domains. Built in India, deployed inside your boundary. |
| Primary CTA | Request early access |
| Secondary CTA | See what we are building |
| URL slug | `/` |

---

## B1. Hero

**Eyebrow**
Applied AI infrastructure - built in India

**Headline**
India should not have to rent its intelligence.

**Subheadline**
PunkRaven is a technology company building the AI layers Indian software keeps importing -
speech across all 22 scheduled languages, and reasoning that grounds every claim in a real,
retrieved source. We build the infrastructure, and we build on it ourselves to prove it
works. Everything runs on hardware you control, and says plainly when it cannot verify what
it is about to tell you.

**Primary CTA**
Request early access

**Secondary CTA**
See what we are building

**Hero proof strip** (four items, no logos)
- All 22 scheduled Indian languages
- MIT-licensed weights, self-hosted
- Every claim carries its source, or is withheld
- Runs inside your own network

*Source: T&T copy A1 and A4; Lawman "How it works".*

---

## B2. The problem

**Section heading**
Most software built for India was built somewhere else and pointed at India.

**Body**
The models handle a few of our languages well and treat the rest as an edge case. Systems
trained on other countries' material do not know our domains, and cannot tell you which parts
of what they know have gone stale. The infrastructure sits offshore on per-call pricing no
Indian buyer can renegotiate. And when these systems do not know something, they rarely say
so - they produce something fluent and wrong, which in a compliance record, a medical note or
a legal matter is worse than producing nothing at all.

**Three problem cards**

| Card | Heading | Body |
|---|---|---|
| 1 | Our languages are the long tail somewhere else | The largest Indian languages get decent coverage. The other twelve scheduled languages get an apology. If your users speak Santali, Kashmiri, Manipuri or Bodo, you are building for people the market has decided to round down. |
| 2 | Fluent and wrong is the default failure | A misheard word gets translated confidently into something that was never said. A fabricated reference arrives correctly formatted. Neither surfaces as an error, and most systems will not tell you which parts they were unsure about. |
| 3 | Rented intelligence is a permanent tax | Per-call pricing to an offshore vendor scales against every product that grows, the weights are never yours, and your users' most sensitive material leaves the country to be processed. |

*Source: T&T copy A2 and A4; Lawman "Why Lawman is required".*

---

## B3. What we build

**Section heading**
Two layers of infrastructure. One application, to prove they work.

**Body**
PunkRaven builds the parts of the stack that are hard to buy and harder to fake: the layer
that understands Indian speech, and the layer that reasons over authoritative material
without inventing any. Both are products in their own right, with buyers who have nothing in
common. Then we build on them ourselves, because a company that will not ship on its own
infrastructure is asking you to take a risk it will not take.

**Stack display** - two tiers, infrastructure below, application above

> **The infrastructure**
>
> **T&T** - the language layer
> Audio in, transcript and translation out, across all 22 scheduled Indian languages, through
> one self-hosted API. MIT-licensed weights, so nothing leaves your infrastructure.
> *Planning stage*
>
> **Lawman** - the reasoning layer
> Retrieves the governing material first, answers from what it found, verifies every
> reference against the source text, and abstains when the sources do not support an answer.
> Built for Indian law as its first body of authority.
> *Specified, not yet built*
>
> ---
>
> **Built on it**
>
> **LawSafe** - the first application
> A chat-first way for any Indian to describe a legal problem in their own language and
> understand where they stand, then reach a verified advocate when a human is genuinely
> needed.
> *In design*

**Supporting line**
Law came first because it is the hardest available test of a grounded system: the sources are
authoritative, the language is exact, and a fluent invention is not a rough draft but a
liability. Getting it right there is what makes the rest credible. The same two layers serve
any domain where being confidently wrong is expensive.

---

## B4. Product blocks

Three blocks on the homepage, each earning the click through to its own page. Order them
infrastructure-first: T&T, then Lawman, then LawSafe.

**T&T and Lawman already have homepage copy written.** Use it verbatim rather than rewriting:

- **T&T** - use `tnt-website-copy.md`, Part B, **Variant B (Compact section)**. Variant A is
  a full band and will overwhelm a three-product homepage; Variant C is for a nav flyout.
- **Lawman** - use `lawman-summary.md`, Part 2, **Variant A (standard section)**.

**LawSafe has no homepage block written yet.** Use the one below.

### LawSafe homepage block

**Eyebrow**
LawSafe - built on T&T and Lawman

**Heading**
The first thing we built on our own stack.

**Body**
Most Indians who are wronged never reach a courtroom, and often should not have to. They do
not know their rights, do not know free legal aid exists, and cannot tell whether their
problem is even a legal one. LawSafe lets a person describe what happened in plain language -
typed or spoken, in their own language - and get a grounded, cited explanation of where they
stand and what their options are. When the matter genuinely needs a human, it connects them
to a Bar Council-verified advocate who specialises in exactly that issue.

**Inline proof line**
Understanding first, transaction second - free at the first mile, in the language the person
actually speaks.

**CTA**
Explore LawSafe

*Source: LawSafe vision §1, §2, §4.*

---

## B5. How we build

**Section heading**
The same six rules, in every system we ship.

**Body**
These are not values on a wall. Each one is a constraint that shows up in the architecture,
and each one costs us something we have decided to pay.

**Six principle blocks**

**1. Grounded, or silent.**
Our systems answer from retrieved current material and attribute the claim to its source.
When the sources do not support an answer, the system says so instead of inventing one. A
wrong answer is worse than no answer, and we would rather ship a product that sometimes
declines than one that is never uncertain.

**2. Confidence is part of the contract, not a footnote.**
Uncertainty is returned to you, not smoothed over. T&T scores recognition and translation
separately for every segment and states which quality tier the language sits in. Lawman
treats an uncited claim as a defect rather than a stylistic choice. We would rather tell you
a language is harder than quietly pretend all 22 are equivalent.

**3. Runs where your data is allowed to be.**
MIT-licensed weights and single-unit deployment mean our systems can run entirely inside your
network. No audio leaves your infrastructure. No confidential document reaches a third party.
No vendor can change per-call pricing under you.

**4. Built for the language, not translated into it.**
All 22 scheduled languages, not the ten that are comfortable. Domain structure and convention
learned properly rather than a foreign model asked politely about them. Scanned documents at
the print quality Indian institutions actually produce.

**5. Skill in the model, facts in the sources.**
Our systems are built to reason, to use domain language correctly and to cite properly. The
facts always come from live retrieved material. That separation is why the knowledge does not
go stale - and why the domain is a parameter rather than something welded into the model.

**6. We say what we have not built yet.**
Every performance and cost figure we publish is labelled as an estimate or a measurement.
There are no customer logos on this site, because there are no customers yet. A company whose
products are built to admit uncertainty does not get to overclaim on its own homepage.

*Source: Lawman "How it works"; T&T copy A5 and A8.*

---

## B6. Where we are

**Section heading**
Early, and saying so.

**Body**
PunkRaven is pre-launch. T&T has a complete technical specification and is at planning stage.
Lawman is fully specified and not yet built. LawSafe is in design. Nothing on this site is a
description of running production software, and where we have given a number it is an
engineering estimate for planning rather than a benchmarked result.

We are opening early access to teams who have a real workload, an interest in what we are
building, and the patience to build alongside it.

**Status table**

| Project | Stage | What exists today |
|---|---|---|
| T&T | Planning | Full technical specification and costed deployment plan |
| Lawman | Specified | Complete system design, pending build |
| LawSafe | Design | Product vision and scope |

---

## B7. Final call to action

**Heading**
If you are building for people who do not speak English, we would like to hear about the
workload.

**Body**
Tell us the languages, the volume, and whether the work is live or batch. If the work is
research over a body of authoritative material, tell us the corpus and how often it changes.
That is usually enough for us to say whether we are useful to you yet, and to say so plainly
if we are not.

**Primary CTA**
Request early access

**Secondary CTA**
Read about the company

**Micro-copy under the form**
We will tell you honestly where each project stands before you commit anything.

---

## B8. Footer notes

- PunkRaven is a technology company. We build software and AI infrastructure. We do not
  provide legal services, and we are not a law firm.
- PunkRaven is pre-launch. Product descriptions are of systems in specification or
  development, not shipped software.
- Performance and cost figures are engineering estimates for planning, not quotes or
  benchmarked production results.
- Model weights referenced by T&T: `ai4bharat/indic-conformer-600m-multilingual` and
  `ai4bharat/indictrans2`, both MIT-licensed.
- Lawman and LawSafe are research and drafting instruments. Neither is legal advice, and
  neither replaces a qualified advocate.

---
---

# Part C - About page

## C0. Page metadata

| Field | Value |
|---|---|
| Page title | About PunkRaven - why we build our own layers |
| Meta description | PunkRaven is a technology company building indigenous AI infrastructure for India. What indigenous means to us, how we build, and what we will not do. |
| Primary CTA | Request early access |
| URL slug | `/about` |

---

## C1. About hero

**Eyebrow**
About PunkRaven

**Headline**
We build the layers India keeps importing.

**Subheadline**
PunkRaven is an applied AI company. We build speech infrastructure for every scheduled Indian
language, and reasoning systems that ground what they say in real sources - then we build
products on top of both. Owned end to end, because the parts that matter most are the parts
nobody was ever going to build for us.

---

## C2. Why we exist

**Section heading**
Rented intelligence is not the same as having any.

**Body**
India has 886 million internet users, 98 per cent of whom consume content in Indic languages
rather than English. It runs on more languages than almost anywhere on earth, generates
document and audio volume at a scale few countries match, and has a domestic software
industry with the talent to work on any of it.

What it does not have is a stack of its own. Almost every Indian product that needs to hear,
read or reason reaches for a foreign API - and inherits that vendor's language priorities,
that vendor's pricing power, that vendor's idea of which subjects are worth knowing properly,
and that vendor's willingness to sound certain about things it has no basis for. The gap is
not ambition or talent. It is that the layers underneath were built for somewhere else, and
the part in the middle - the part that actually decides whether the thing works in Marathi,
or works on a body of law that changed last year - is nobody's product, so it becomes
everybody's bug.

We build that part. It is slower, it is harder to fund, and it is the only version of this
that ends with India owning something.

*Source: LawSafe vision §2; T&T copy A2 and A3.*

---

## C3. What indigenous means here

**Section heading**
Indigenous is a build decision, not a flag on a foreign API.

**Body**
The word gets used loosely. Here is what we mean by it, concretely, in things you can check.

**Built for the language, not translated into it.**
Our speech layer covers all 22 scheduled languages in single checkpoints, so complete
coverage costs nothing extra in memory or money. We do not filter by language. We tell you
the truth about quality instead, tier by tier, so a user in a smaller language gets a usable
product rather than no product.

**The domain is learned properly, not approximated.**
A model built elsewhere for everyone has a thin, stale and frequently invented picture of any
specific Indian body of knowledge. Our reasoning layer is grounded against the live
authoritative corpus for the domain it serves - starting with Indian law, including the
Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita and Bharatiya Sakshya Adhiniyam
that replaced the colonial-era codes in 2024 - and it is architected so that corpus is a
parameter, not a permanent identity.

**The weights are open and the deployment is yours.**
We build on MIT-licensed model weights and ship as a single deployable unit. That is what
makes genuine self-hosting possible - not a data-residency promise in a contract, but an
architecture in which nothing calls out.

**The economics stay here.**
Per-call pricing to an offshore vendor is a tax on every Indian product that grows, forever,
with no renegotiation. Compute you control on infrastructure you choose is not.

**Sovereign by construction, not by assurance.**
The difference matters. A promise about where your data goes is only as good as the company
making it. A system that has no outbound path is a property you can verify yourself.

---

## C4. How we build

**Section heading**
Systems that know what they do not know.

**Body**
There is one belief underneath everything PunkRaven builds, and it is unfashionable: a system
that admits uncertainty is more valuable than one that never appears uncertain.

The industry has already demonstrated the alternative, and the clearest published evidence
happens to come from the domain we chose first. Stanford RegLab's *Large Legal Fictions*
study found general-purpose models hallucinating on legal queries between 58 and 88 per cent
of the time, and its follow-up found that even purpose-built retrieval-augmented tools still
fabricated - roughly 17 per cent for one major product and 34 per cent for another. The
failure mode is not domain-specific. It is that these systems are wrong *fluently*, with no
signal to the reader that anything has gone missing, and that is true of a transcript as much
as a citation.

So we design in the opposite direction. Every claim traces to retrieved material or is
withheld. Every transcript segment carries a confidence score you can act on. Every language
carries an honest quality tier. Abstention is a designed behaviour, deliberately trained, not
a failure mode we apologise for. Verification runs in layers and fails closed: if any layer
cannot confirm a claim, the system withholds it rather than shipping it unverified.

This costs us things. Our demos are less impressive. Our systems sometimes say they cannot
help. We think that is the correct trade in every domain where a wrong answer is expensive,
and those are the only domains we intend to work in.

*Source: LawSafe vision §6; Lawman "How it works"; T&T copy A5.*

---

## C5. What we are building

**Section heading**
Two layers, and the first thing we built on them.

**Body**
PunkRaven is a product company, and the product is a stack. The two infrastructure layers are
the company. The application on top is how we prove them.

**T&T - the language layer.**
A self-hosted speech pipeline that turns Indian-language audio into a clean transcript and a
translation through one API call. Two engines, one queue, one deployment unit. The part in
the middle - voice activity detection, punctuation, sentence splitting, number formatting,
protected-term handling - is the part everyone else leaves to you, and it is where most
avoidable quality loss happens. Shipping it as product rather than as a tutorial is the
reason T&T exists. Its buyers are contact centres, consumer apps, government services, media
and education - anyone whose users do not speak English.

**Lawman - the reasoning layer.**
A system that does not answer from memory. It retrieves the governing material first, answers
from what it found, attributes the claim to its source, and verifies each reference against
the actual source text before you see it. Skill lives in the model; facts live in the sources.
Its first body of authority is Indian law, chosen because it is the least forgiving test
available: the sources are authoritative, the language is exact, and a confident invention is
not a rough draft but a liability.

**LawSafe - the first application.**
Not the company's purpose - its proof. A chat-first way for any Indian citizen to describe a
legal problem in their own language and understand where they stand, then reach a Bar
Council-verified advocate who genuinely specialises in that issue. Understanding first,
transaction second. It exists because a company that will not ship a product on its own
infrastructure is asking customers to take a risk it will not take itself.

---

## C6. What we will not do

**Section heading**
The constraints define us as much as the features.

- **We will not ship a system that sounds certain when it is not.** Abstention is the
  product working, not the product failing.
- **We will not publish a benchmark we have not run.** Estimates are labelled as estimates,
  every time, including when it would be more persuasive not to.
- **We will not put a customer logo on this site before there is a customer.** A trust row of
  placeholder logos is the fastest way to lose a technical reader.
- **We will not make your data the business model.** Self-hosting is not an enterprise tier
  we upsell. It is how the systems are built.
- **We will not represent ourselves as a law firm or a legal services provider.** PunkRaven
  builds software. Lawman and LawSafe are research and drafting instruments; advice comes
  from a qualified advocate, and every surface we build makes that boundary explicit.
- **We will not let commercial pressure override the grounded-or-silent rule.** If that rule
  ever becomes negotiable, the rest of this page is marketing.

*Source: LawSafe vision §6.7; T&T copy, section design notes; Lawman copy notes.*

---

## C7. Where we are

**Section heading**
Pre-launch, and specific about it.

**Body**
T&T has a complete technical specification, a costed deployment plan and a documented API
contract, and is at planning stage. Lawman is fully specified and not yet built. LawSafe is
in design. We are a young company doing the unglamorous half of the work first, on the theory
that the layers underneath are the only part that is hard to copy.

If you have Indian-language audio, a body of authoritative material that has to be reasoned
over without leaving your infrastructure, or a reason to care whether this country builds its
own stack, we would like to talk - including if the honest answer is that we are not ready
for you yet.

**CTA**
Request early access

---

## C8. The name

**Section heading**
Why PunkRaven

**Body**
**Punk** is the refusal - that the default stack is the only stack, that Indian languages are
someone else's long tail, that a confident answer is the same thing as a correct one.

**Raven** is the disposition - watchful, unusually clever, and remembered for its memory.

We build our own layers, and we are honest about what we can actually see.

*Optional section. Cut it if the page runs long - it is the first thing that should go.*

---
---

# Part D - Claim status

Everything above is marketing prose. This table says what each claim rests on and what has to
be true before it goes live. Mirrors the convention already used in `tnt-website-copy.md`
Part C.

| Claim | Status | Action before publishing |
|---|---|---|
| PunkRaven is a technology company, not a legal services provider | True and load-bearing | Safe - and enforce it in review, see Part E |
| Two infrastructure layers plus one application, each independently deployable | Architecturally true per source docs | Safe |
| "The domain corpus is a parameter, not welded in" | Follows from Lawman's stated skill/facts separation | Safe as a design property; **do not name a second domain the company has not committed to** |
| 22 scheduled languages, tiered quality | Sourced from model cards via T&T doc | Safe |
| MIT licensing of T&T model weights | Sourced | Safe |
| Lawman citation verification, abstention, fail-closed | Designed, not implemented | Safe framed as design; never phrase as observed behaviour |
| LawSafe advocate verification and BCI compliance | Designed | Safe as intent; do not imply a live verified panel exists |
| 886M internet users, 98% Indic-language consumption | IAMAI-Kantar 2024, via LawSafe doc | **Re-verify date and figure before publishing** |
| Stanford RegLab hallucination rates (58-88%, 17%, 34%) | Published study, via LawSafe doc | **Verify the study and figures directly before publishing** |
| "T&T powers LawSafe's voice and language support" | **Inference, not stated in any source doc** | **Confirm with the team. If false, cut the dependency claim and present the three as a family rather than a stack** |
| Any customer, logo, testimonial or case study | Does not exist | **Do not add** |
| Any latency, cost or accuracy figure on the company site | Engineering estimates only | Keep off the company page entirely; they belong on `/tnt` with their footnotes |

**Two risks in this copy, both about what a reader concludes.**

The first is that PunkRaven has shipped something. Mitigations already built in: a persistent
status label on every product block, the "Where we are" section on both pages, and "Request
early access" as the only primary CTA on the site.

The second is that PunkRaven is a legal-tech company. Mitigations already built in:
infrastructure-first ordering everywhere, LawSafe framed as the first application rather than
the destination, T&T's non-legal buyers named explicitly in B5 and C5, the disclaimer in the
footer, and the commitment in C6.

---
---

# Part E - Copy notes

- **PunkRaven is a technology company. This is the rule that overrides the others.** The
  parent site describes infrastructure and engineering. It never describes itself as a legal
  service, a law firm, a legal marketplace, or a legal-tech company. Reviewers should read
  `/` and `/about` cold and ask what industry the company is in; if the answer comes back
  "legal," the copy has failed.
- **Order is argument.** Infrastructure before application, everywhere: T&T, then Lawman,
  then LawSafe. In the nav, the homepage blocks, the footer product list, and the stack
  display. Leading with LawSafe re-categorises the company in the reader's head.
- **Law is the proving ground, not the identity.** When law comes up on the company pages,
  it should be explained as a choice of hard test - authoritative sources, exact language,
  expensive failure - rather than as what the company is for.
- **PunkRaven is the company. LawSafe, Lawman and T&T are the projects.** Never let the
  company page describe itself as a legal product or a speech product. It is the parent.
- **LawSafe is the product name; NyayaSetu is an internal codename only.** Per the vision
  doc, NyayaSetu must not appear on any public surface.
- **Lawman, not LawSafe, is the reasoning system.** These two are easy to confuse. Lawman
  reasons; LawSafe is what a citizen opens.
- **Never soften abstention.** In all three product docs it is the core differentiator.
  Framing it as a limitation rather than a designed behaviour inverts the entire positioning.
- **Never frame anything as legal advice.** "Research and drafting," never "advice."
- **Do not name domains the company has not committed to.** The architecture supports other
  corpora and the copy says so structurally. It must not promise healthcare, finance or
  government verticals that do not exist on a roadmap.
- **No numbers on the company page.** Latency, cost and accuracy figures live on the product
  pages where their footnotes and derivations live with them. The company page makes
  structural claims, not measured ones.
- **No logo strip. No testimonials. No fake social proof.** Stated explicitly in the T&T
  design notes and it applies site-wide.
- **House voice:** short declaratives, bold lead-in phrase then explanation, the failure mode
  named before the fix, no hype, limits stated plainly. Spaced hyphens ` - ` rather than em
  dashes, matching `lawman-summary.md` and `tnt-website-copy.md`.
- **Say "22 scheduled languages", not "22+ languages".** The number is exact and verifiable.
  Inflating it invites a challenge you cannot win.
