import { tntDeployment } from "@/content/tnt";
import { EstimateNote } from "@/components/estimate-note";
import { Section } from "@/components/section";
import { prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "deployment";

/**
 * A8. Deployment.
 *
 * The hardware requirements stay - one 24 GB GPU, 8 vCPU, 32 GB RAM. They are
 * the documented deployment spec, a design property in the same class as "runs
 * entirely inside your network", which Part C marks safe as a design property.
 * They say what the system is built to run on rather than what anyone measured.
 *
 * The monthly cost on each stage does not stay. Those are derived estimates
 * against cloud list prices that move, so they are held like every other figure
 * on the page and the estimate note says why.
 *
 * The regulated-buyer callout keeps the source's "can run entirely inside your
 * network" phrasing exactly. Part C allows it as a design property and bars
 * case-study phrasing, and "can run" is the difference between the two.
 */
export const TntDeployment = () => (
  <Section
    elevation="sunken"
    id={HEADING_ID}
    labelledBy={`${HEADING_ID}-heading`}
    spacing="lg"
  >
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {tntDeployment.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {tntDeployment.body}
    </p>

    <ul className="mt-12 grid gap-6 md:grid-cols-3">
      {tntDeployment.stages.map((stage) => (
        <li
          key={stage.stage}
          className="rounded-md border border-separator bg-surface p-6 text-surface-foreground"
        >
          <h3 className={title({ size: "sm" })}>{stage.stage}</h3>
          <p className={prose({ className: "mt-3 text-muted" })}>
            {stage.body}
          </p>
        </li>
      ))}
    </ul>

    <EstimateNote className="mt-8" note={tntDeployment.estimate} />

    <p
      className={prose({
        className: "mt-12 max-w-measure rounded-md border border-border p-5",
      })}
    >
      {tntDeployment.callout}
    </p>
  </Section>
);
