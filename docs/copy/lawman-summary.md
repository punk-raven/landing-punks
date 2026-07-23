# Lawman - Landing Page & Homepage Copy

> **Status note:** Lawman is fully specified but not yet built. All copy below describes the
> intended product. Do not publish it as shipped capability until the corresponding
> acceptance gates pass.

---

## Part 1 - Landing Page

### Hero

**Headline:** Indian law, answered with the source attached.

**Subheadline:** Lawman is an AI system built for one thing - Indian law. It grounds every
legal claim in a real, retrieved source. When it cannot verify a claim, it says so instead
of inventing one.

**Primary CTA:** Request early access

---

### What is Lawman

Lawman is an AI legal intelligence system specialised in Indian law - statutes, case law,
court procedure, and the rules and circulars that change week to week.

It is not a general-purpose chatbot pointed at legal questions. It is a system designed
around a single constraint: **a legal answer is only worth having if you can trace it back
to the authority it came from.** Everything in Lawman follows from that - how it is
trained, how it retrieves, how it checks itself, and what it does when it is unsure.

Lawman researches, explains, and drafts. It works in Indian languages, by voice or text. It
reads the documents legal work actually arrives in. And it is built to run on infrastructure
you control, so confidential material never has to leave your hands.

---

### Why Lawman is required

General-purpose AI fails at Indian legal work in ways that are not cosmetic.

**It invents authority.** Fabricated sections and judgments arrive confident and correctly
formatted. In law, that is not a rough draft - it is exposure.

**It does not know current law.** Legal facts move constantly. A general model's knowledge
is frozen at the moment it was trained, and it cannot tell you which parts have gone stale.

**It does not know Indian law specifically.** Indian statutory structure, court hierarchy,
procedure, and drafting convention are not well represented in models built elsewhere for
everyone.

**It cannot be trusted with your files.** Confidential material cannot be handed to an
external service by anyone carrying a duty of confidence.

**It does not know when to stop.** A general model would rather produce a plausible answer
than admit it has none. That instinct is exactly backwards for legal work.

Lawman exists because each of these has to be solved deliberately, at the level of how the
system is built - not patched over with a disclaimer.

---

### How it works

**Grounded, never freehand.** Lawman does not answer from memory. It retrieves the
governing material first, then answers from what it found, and attributes the claim to its
source. An uncited legal claim is treated as a defect, not a stylistic choice.

**Every reference is checked before you see it.** Citations are verified against the actual
source text automatically. A reference that does not hold up does not reach the answer.

**Skill in the model, facts in the sources.** Lawman is trained to reason, to use legal
language correctly, and to cite properly. The facts themselves always come from live
retrieved material. That separation is why its knowledge does not go stale as the law moves.

**It works step by step, and checks its own work.** Complex questions get broken down.
Lawman plans an approach, gathers what each step needs, and verifies before moving on -
rather than producing one confident block of text in a single pass.

**Trained to abstain.** Lawman is deliberately taught to say "I could not verify this" when
its sources do not support an answer. Abstention is a designed behaviour, not a failure
mode. A wrong legal answer is worse than none.

**Fails closed.** Verification runs in layers. If any layer cannot confirm a claim, the
system withholds it rather than shipping it unverified.

**Built in Indian languages.** Questions asked in an Indian language are researched against
the same material and answered in that language, by voice or in writing.

**Reads real legal documents.** Scanned judgments, filings, and the print quality that
Indian court output actually arrives in - not just clean digital text.

**Runs where you decide.** Lawman is built to be deployed on your own infrastructure.
Public law can live on shared systems; confidential material never has to.

**A human still signs.** Lawman researches and drafts; a qualified person reviews and takes
responsibility. That review step is part of how the system is designed to be used.

---

### When to use Lawman

**Use Lawman when:**

- You need to find the governing provision or authority on a point and see where it comes
  from.
- You need to know the current position on something that has been amended, notified, or
  recently decided.
- You need to understand what the position was at a particular point in time, not only what
  it is today.
- You are working through material in an Indian language, or across several of them.
- You need to work with documents that cannot be sent to an outside service.
- You are drafting and want a first pass that already carries its references.
- You want an answer with the underlying material laid out so you can check it yourself.

**Do not use Lawman when:**

- You need legal advice. Lawman is a research and drafting instrument. It is not counsel and
  does not replace professional judgement.
- The output will go out unreviewed. Consequential work needs a qualified human sign-off.
- The question is outside Indian law. Lawman is specialised, and specialisation is the point.
- You want a confident answer more than a correct one. Lawman will tell you when it cannot
  verify something, and that is the behaviour it was built for.

---

**Closing CTA:** Get early access - built in India, for Indian law.

---

## Part 2 - Homepage Section

Short block for an existing homepage. Pick the variant that fits the slot.

### Variant A - standard section

> ## Lawman
>
> **AI built for Indian law - that shows its source, or admits it has none.**
>
> Lawman researches statutes, case law, and current rules and procedure, and grounds every
> legal claim in real retrieved material. References are checked before you see them. When
> the sources do not support an answer, Lawman says so instead of inventing one.
>
> Works in Indian languages, by voice or text. Reads real legal documents. Runs on
> infrastructure you control.
>
> [Learn more →]

### Variant B - condensed

> **Lawman** is an AI system built specifically for Indian law. It grounds every legal claim
> in a real source, verifies the reference before showing it, and abstains when it cannot -
> in Indian languages, on infrastructure you control.

### Variant C - three-point strip

> ### Lawman - Indian law, verified
>
> | Grounded | Current | Yours |
> |---|---|---|
> | Every claim traces to real retrieved material, checked before you see it. | Facts come from live sources, not frozen memory - so answers do not go stale as the law moves. | Runs on infrastructure you control. Confidential material stays with you. |
>
> [Request early access →]

---

## Copy notes

- **Lawman is the name to use.** Verified against the repo: Lawman is the LLM system;
  Lawsafe is the separate product built on top of it. This document is about Lawman only.
- **No numbers, no named components.** Accuracy figures, benchmark scores, model names, and
  stack details are deliberately absent - the numbers do not exist yet, and the components
  are not the pitch.
- **Never soften abstention.** It is the core differentiator. Framing it as a limitation
  rather than a feature inverts the positioning.
- **Never frame it as legal advice.** "Research and drafting," never "advice."
