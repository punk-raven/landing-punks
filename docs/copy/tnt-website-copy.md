# T&T Website Copy

Website content for the T&T module: a full landing page, plus a homepage section
in three lengths for a parent site where T&T is one of several products.

Every claim traces to a planning document; the source is named under each block
so copy can be re-verified before it goes live.

**Before publishing, read [Part C - Claim status](#part-c---claim-status).** The
module is at planning stage, so some copy below is written in the present tense
for a product that does not have running code yet. That section says which lines
are safe today and which need a shipped build first.

**Contents**

- [Part A - Landing page](#part-a---landing-page)
- [Part B - Homepage section](#part-b---homepage-section)
- [Part C - Claim status](#part-c---claim-status)

Source documents referenced throughout live in the T&T repository:
`README.md`, `docs/transcribe-translate-core-module.md`, and the eleven
documents in `docs/plan/`.

---
---

# Part A - Landing page

## A0. Page metadata

| Field | Value |
|---|---|
| Page title | T&T - Speech to text and translation for all 22 Indian languages |
| Meta description | Self-hosted transcription and translation for all 22 scheduled Indian languages. One API, MIT-licensed models, 2-5x cheaper than stitching two managed cloud APIs together. |
| OG title | Audio in. Transcript and translation out. 22 Indian languages. |
| OG description | One self-hosted service. MIT-licensed weights. No per-call vendor fee. |
| Primary CTA | Request early access |
| Secondary CTA | Read the technical plan |
| URL slug | `/` or `/tnt` |

---

## A1. Hero

**Eyebrow**
Speech infrastructure for India

**Headline**
Audio in. Transcript and translation out.
All 22 scheduled Indian languages.

**Subheadline**
T&T is a self-hosted speech pipeline that turns Indian-language audio into a
clean transcript and a translation through a single API call. Two engines, one
queue, one deployment unit. MIT-licensed weights, so there is no per-call
vendor fee and no data leaving your infrastructure.

**Primary CTA**
Request early access

**Secondary CTA**
Read the technical plan

**Hero proof strip** (four short items, no logos)
- 22 scheduled languages, always on
- ~1 second for a 30 second clip
- MIT-licensed models, self-hosted
- One API: `POST /v1/transcribe-translate`

*Source: README, core module doc §0 and §5.*

---

## A2. The problem

**Section heading**
Indian-language speech is still the hard part

**Body**
Most teams building for India end up bolting a managed speech-to-text API onto a
managed translation API and hoping the seam holds. It rarely does. The
transcript arrives with no punctuation and no sentence boundaries, the
translator expects clean sentences, and the quality loss happens invisibly in
between. You pay two vendors per call, your audio leaves the country, and the
languages you actually need are the ones with the worst coverage.

**Three problem cards**

| Card | Heading | Body |
|---|---|---|
| 1 | Two vendors, two bills, one broken seam | Speech-to-text and machine translation are sold separately. The layer that joins them - punctuation, sentence splitting, number formatting, protected terms - is nobody's product, so it becomes your bug. |
| 2 | Errors compound silently | A transcription mistake does not surface as an error. It is passed downstream and translated fluently into something confidently wrong. Most APIs will not tell you which parts they were unsure about. |
| 3 | Per-call pricing that scales against you | Managed transcription plus managed translation runs roughly Rs 90-180 per audio-hour. Every minute of growth is a bigger bill, and the model weights are never yours. |

*Source: core module §3 and §4; doc 05 §3.3; doc 03 E-SYS-01.*

---

## A3. What T&T is

**Section heading**
One service. Two engines. One queue.

**Body**
T&T packages an Indian-language speech recogniser and an Indian-language
translator into a single deployable unit behind one API. The part in the middle
- the part everyone else leaves to you - is built in.

**Card 1: Recognition**
`ai4bharat/indic-conformer-600m-multilingual`
A single 600M-parameter checkpoint covering all 22 scheduled languages, with
two decoding heads. The fast head serves live traffic; the accurate head
re-decodes stored audio in the background so the answer you keep is better than
the answer you saw.

**Card 2: Translation**
`ai4bharat/indictrans2`
A 1B model plus distilled 200M and 320M variants, covering English to Indic,
Indic to English, and Indic to Indic. The small models run the live lane, the
large model runs the quality lane.

**Card 3: The seam**
Voice activity detection, chunking with overlap stitching, punctuation
restoration, inverse text normalisation, sentence splitting and do-not-translate
glossary markup. This is not off-the-shelf. It is where most avoidable quality
loss happens, and it is the reason T&T exists as a product rather than a
tutorial.

**Callout**
No text-to-speech. The module is deliberately scoped as a foundation, with a
documented output contract so speech synthesis, summarisation or an answering
model can attach to it later without a rewrite.

*Source: README; core module §0 and §3; doc 08 L0 and L2.4.*

---

## A4. Language coverage

**Section heading**
All 22 scheduled languages. No add-on pricing.

**Body**
Both models cover the full scheduled list in single checkpoints, so complete
coverage costs nothing extra in memory or money. T&T never filters by language.

What it does instead is tell you the truth about quality.

**Tier A - production grade**
Hindi, Bengali, Marathi, Tamil, Telugu, Kannada, Malayalam, Gujarati, Punjabi,
Odia, plus the English pivot.

**Tier B - supported, higher error rate**
The remaining 12, including Kashmiri, Santali, Manipuri and Bodo. Word error
rates are higher and translations are rougher. Gate these by confidence
threshold rather than removing them, and your users in those languages get a
usable product instead of no product.

**Pull quote**
Every response carries a `quality_tier` field. We would rather tell you a
language is Tier B than quietly pretend all 22 are equivalent.

*Source: README; core module §0; doc 08 §5.1.*

---

## A5. Honest confidence

**Section heading**
Confidence is part of the contract, not a footnote

**Body**
A fluent wrong answer is worse than a flagged uncertain one. T&T returns a
confidence score for every segment, separately for recognition and for
translation, and flags low-confidence spans instead of hiding them. Per-stage
timings come back with every response too, so a performance regression is
visible to you on the day it happens rather than in a support ticket three weeks
later.

**Feature bullets**
- Per-segment `asr_confidence` and `mt_confidence` on every response
- Low-confidence spans flagged, never silently smoothed over
- `quality_tier` states whether the language is Tier A or Tier B
- `timings_ms` breaks down ingest, VAD, recognition, seam and translation
- `version` lets you refetch the improved result after background re-decoding

*Source: doc 03 E-SYS-01; doc 08 §5.1.*

---

## A6. Speed

**Section heading**
About a second, for a thirty second clip

**Body**
On a single warm 24 GB GPU, a 30 second clip goes from audio to translated text
in roughly one to two seconds. A five second utterance lands in half that. In
streaming mode, text appears about a second behind the speaker.

Those are not the interesting numbers. The interesting number is what happens
under load, which is why we publish target service levels rather than
best-case demos.

**SLA table**

| Lane | p50 | p95 | p99 |
|---|---|---|---|
| Live, 30 seconds or less | 1.2 s | 2.5 s | 4.0 s |
| Streaming, behind speech | 1.0 s | 1.5 s | 2.5 s |
| Async batch, per audio-hour | 4 min | 8 min | 15 min |
| Cold start, serverless | 20 s | 35 s | 45 s |

**Supporting line**
An SLA you measure is an SLA you can defend. An SLA you guess at is a
liability.

*Source: doc 04 §1, §3, §4.*

---

## A7. Cost

**Section heading**
2-5x cheaper than stitching two managed APIs together

**Body**
The weights are MIT-licensed. That is the whole economic premise: you pay for
compute you control, not for a per-call licence you can never renegotiate.

**Comparison table**

| Approach | Cost per audio-hour |
|---|---|
| Managed speech-to-text plus managed translation | Rs 90-180 |
| T&T, self-hosted | Rs 22-55 |
| T&T, pure batch at high utilisation | Rs 9-18 |

**Scale table**

| Active users | Audio per month | Infrastructure | Estimated monthly cost |
|---|---|---|---|
| 10 | 5 h | Serverless, scale to zero | Rs 850-2,600 |
| 100 | 50 h | Serverless | Rs 2.2k-5.2k |
| 1,000 | 500 h | Serverless or part-time dedicated GPU | Rs 7.5k-21.5k |
| 10,000 | 5,000 h | One dedicated GPU plus peak capacity | Rs 56k-1.3 L |

At an assumed 30 minutes of audio per active user per month.

**Footnote line**
All figures in INR at $1 = Rs 86. Engineering estimates for planning, not
quotes. GPU pricing moved 10-22 % in both directions over the past year, so
re-verify before committing spend.

*Source: core module §6; doc 05 §2 and §3; plan README caveat on figures.*

---

## A8. Deployment

**Section heading**
Runs where your data is allowed to be

**Body**
One container, one queue, one GPU to start. No Kubernetes until you have more
than one node, and a single Docker Compose box with a queue gets you further
than most teams expect.

**Three deployment cards**

| Stage | Setup | Cost |
|---|---|---|
| Pilot | Serverless GPU with scale to zero. Idle cost is near zero; cold starts sit behind an async job API. | Rs 1.3k-7k / month |
| Growth | One reserved 24 GB GPU on an Indian cloud or a Mumbai region. Data residency friendly. | Rs 26k-56k / month |
| On-premise | Your own hardware. One 24 GB GPU, 8 vCPU, 32 GB RAM. Nothing calls out. | Hardware only |

**Callout for regulated buyers**
Because the weights are MIT-licensed and the whole pipeline is one deployment
unit, T&T can run entirely inside your network. No audio leaves your
infrastructure, no third party sees a transcript, and there is no vendor who can
change per-call pricing under you.

*Source: core module §2, §7, §8; doc 06; doc 08 L4.1.*

---

## A9. The API

**Section heading**
One call. One contract.

**Request**

```http
POST /v1/transcribe-translate
Authorization: Bearer <api_key>

{
  "audio": "<file | audio_url>",
  "src_lang": "hin_Deva",
  "tgt_lang": "eng_Latn",
  "mode": "batch",
  "quality": "balanced"
}
```

**Response**

```json
{
  "status": "done",
  "transcript": "...",
  "translation": "...",
  "confidence": 0.87,
  "quality_tier": "A",
  "segments": [
    {
      "start_ms": 0,
      "end_ms": 3200,
      "text": "...",
      "translation": "...",
      "asr_confidence": 0.93,
      "mt_confidence": 0.88
    }
  ],
  "timings_ms": { "asr": 780, "seam": 92, "mt": 540, "total": 1517 }
}
```

**Supporting bullets**
- REST for batch, WebSocket for streaming partials, webhook for bulk jobs
- `quality` selects the lane: `fast`, `balanced` or `best`
- Glossary IDs let you protect product names and domain terms from translation
- Speaker gender is optional and improves English to Indic agreement when known

*Source: doc 08 §5.1 and §5.3.*

---

## A10. Who it is for

**Section heading**
Built for teams whose users do not speak English

| Audience | Line |
|---|---|
| Contact centres | Every call transcribed in the language it was spoken and translated for QA, compliance and coaching. Batch pricing, not live pricing. |
| Consumer and social apps | Voice notes, comments and user video captioned and translated across the 22 languages your users actually type in. |
| Government and public services | Records, grievances and field recordings, processed on infrastructure inside your own boundary. |
| Media and education | Lecture and interview archives turned into searchable, translated text with word-level timestamps. |

*Source: doc 08 L0.*

---

## A11. Objections and answers

**Section heading**
Questions people actually ask

**Q: How is this different from just calling Whisper and a translation API?**
Two things. Whisper-class models are strong on the largest Indian languages and
weak on the rest; IndicConformer covers all 22 in one checkpoint. And the layer
between recognition and translation still has to be built by someone. With two
managed APIs, that someone is you, and you find out how much it mattered only
after quality complaints start arriving.

**Q: Do you support code-mixed speech, like Hinglish?**
Partly, and we say so plainly. Both underlying models are biased toward single
languages, so embedded English words can be transcribed phonetically and then
mistranslated. T&T ships an English passthrough list and post-edit rules that
handle common cases. Fully solving it needs fine-tuning on your own audio,
which is a documented upgrade path rather than a surprise.

**Q: What about telephony audio?**
8 kHz narrowband audio is harder and accuracy drops. If call audio is your main
workload, plan on fine-tuning against your own recordings. The plan documents
what that costs and when it is worth doing.

**Q: Can we run it entirely on our own hardware?**
Yes. One 24 GB GPU class card, 8 vCPU, 32 GB RAM. A CPU-only variant exists for
batch workloads, though it is too slow for live traffic.

**Q: What is the licence situation?**
Both models are MIT-licensed. That is what makes commercial self-hosting
possible without a per-call vendor fee, and it is the foundation the whole cost
model rests on.

**Q: Is 22-language coverage real, or a marketing number?**
Real, and tiered. Ten languages plus English are production grade. The other
twelve work with higher error rates. Every response tells you which tier it
just gave you.

*Source: core module §0, §3, §4, §7; doc 02; doc 11.*

---

## A12. Final call to action

**Heading**
Bring speech to the languages your product already has users in

**Body**
T&T is being built as one deployable unit with a documented contract, an
honest confidence signal and a cost model that survives contact with growth.
If you have Indian-language audio and a reason to keep it on your own
infrastructure, we would like to hear about the workload.

**Primary CTA**
Request early access

**Secondary CTA**
Read the technical plan

**Micro-copy under the form**
Tell us the languages, the audio volume, and whether you need live or batch.
That is enough for us to tell you what it would cost.

---

## A13. Footer notes

- All costs in INR, converted at $1 = Rs 86. L = lakh = Rs 1,00,000.
- Performance and cost figures are engineering estimates for planning, not
  quotes or benchmarked production results.
- Model weights: `ai4bharat/indic-conformer-600m-multilingual` and
  `ai4bharat/indictrans2`, both MIT-licensed.
- The complete planning document set is public.

---
---

# Part B - Homepage section

Copy for the T&T block on a parent company homepage, where T&T is one of
several things the site talks about. This is not a second landing page - it is
the section that earns the click through to Part A.

Three length variants. Pick one by how much room the homepage has, and do not
mix them.

---

## Variant A - Full section (recommended)

Use when T&T gets its own band on the homepage, roughly one screen tall.

**Eyebrow**
T&T

**Heading**
Indian-language speech, end to end

**Subheading**
Audio goes in. A clean transcript and a translation come out. All 22 scheduled
Indian languages, through one self-hosted API, on infrastructure you control.

**Body**
Most teams reach for a managed speech-to-text API, bolt a managed translation
API onto it, and inherit the broken seam in between. T&T ships that seam as
part of the product: voice activity detection, punctuation, sentence splitting,
number formatting and protected-term handling, all between two MIT-licensed
models that cover every scheduled language in a single checkpoint.

**Stat row** (four tiles)

| Value | Label |
|---|---|
| 22 | scheduled languages, no add-on pricing |
| ~1 s | for a 30 second clip on a warm GPU |
| 2-5x | cheaper than two managed APIs stitched together |
| MIT | licensed weights, self-hosted, no per-call fee |

**Three feature cards**

| Heading | Body |
|---|---|
| One API, one deployment unit | Two engines and a queue behind a single endpoint. REST for batch, WebSocket for streaming, webhook for bulk. |
| Confidence you can act on | Every segment carries a recognition and a translation confidence score, plus a quality tier for the language. Uncertain output is flagged, not smoothed over. |
| Runs inside your boundary | One 24 GB GPU is enough to start. Serverless for pilots, dedicated for scale, on-premise when audio is not allowed to leave. |

**Primary CTA**
See how T&T works

**Secondary CTA**
Read the technical plan

---

## Variant B - Compact section

Use when T&T shares a homepage band with two or three other products.

**Eyebrow**
T&T

**Heading**
Audio in. Transcript and translation out.

**Body**
A self-hosted speech pipeline for all 22 scheduled Indian languages. One API
call returns a punctuated transcript, a translation, and an honest confidence
score for both. MIT-licensed models, so nothing leaves your infrastructure and
there is no per-call vendor fee.

**Inline proof line**
22 languages - about a second for a 30 second clip - 2-5x cheaper than two
managed APIs

**CTA**
Explore T&T

---

## Variant C - One-liner

Use in a product grid tile, a navigation flyout, or a footer product list.

**Heading**
T&T

**Line**
Self-hosted transcription and translation for all 22 Indian languages, behind
one API.

**CTA**
Learn more

---

## Section design notes

- **No logo strip.** There are no customers yet. A trust row of placeholder
  logos is the fastest way to lose a technical reader.
- **The stat row does the persuading.** If only one element survives a design
  pass, keep the four tiles in Variant A. `22`, `~1 s`, `2-5x` and `MIT` are the
  entire pitch, and each maps to a section of the landing page.
- **Say "22 scheduled languages", not "22+ languages".** The number is exact and
  verifiable. Inflating it invites a challenge you cannot win.
- **Mark estimated figures.** The latency and cost numbers are engineering
  estimates, not benchmarked production results. A small footnote under the stat
  row is enough: *Engineering estimates at planning stage. See the technical
  plan for derivations.*
- **Keep the CTA honest.** "See how T&T works" or "Request early access", not
  "Get your API key", until there is an endpoint to hand out.

---

## Copy blocks, ready to paste

Plain text without markdown structure, for pasting straight into a CMS.

**Variant A hero text**

> Indian-language speech, end to end
>
> Audio goes in. A clean transcript and a translation come out. All 22
> scheduled Indian languages, through one self-hosted API, on infrastructure you
> control.
>
> Most teams reach for a managed speech-to-text API, bolt a managed translation
> API onto it, and inherit the broken seam in between. T&T ships that seam as
> part of the product: voice activity detection, punctuation, sentence
> splitting, number formatting and protected-term handling, all between two
> MIT-licensed models that cover every scheduled language in a single
> checkpoint.

**Variant B hero text**

> Audio in. Transcript and translation out.
>
> A self-hosted speech pipeline for all 22 scheduled Indian languages. One API
> call returns a punctuated transcript, a translation, and an honest confidence
> score for both. MIT-licensed models, so nothing leaves your infrastructure and
> there is no per-call vendor fee.

**Variant C tile text**

> T&T - Self-hosted transcription and translation for all 22 Indian languages,
> behind one API.

---
---

# Part C - Claim status

Everything above is written as marketing prose. This table says what each claim
is grounded in and what has to be true before it is published as-is.

| Claim | Status | Action before publishing |
|---|---|---|
| 22-language coverage, Tier A / Tier B split | Sourced from model cards | Safe |
| MIT licensing of both models | Sourced | Safe |
| API request and response shape | Designed, not implemented | Safe if framed as the contract; do not imply a live sandbox |
| ~1-2 s for a 30 s clip; SLA table | Engineering estimate, unmeasured | **Either mark as "target" on the page, or benchmark first** |
| Rs 22-55 vs Rs 90-180 per audio-hour | Derived estimate, list prices move | **Re-verify competitor pricing on the day you publish** |
| Monthly cost by user tier | Derived from a stated usage model | **Keep the "30 min per user per month" assumption visible** |
| "Runs entirely inside your network" | Architecturally true, not yet demonstrated | Safe as a design property; avoid case-study phrasing |
| Any customer, logo or testimonial | Does not exist | **Do not add a social proof strip with logos** |

The single largest risk in this copy is present-tense phrasing about a module
that is still at planning stage. Two safe fixes: label the page "in development,
early access opening" near the hero, and change the CTA from "Start building" to
"Request early access", which the copy above already does.
