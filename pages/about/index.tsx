import { Section } from "@/components/section";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <Section spacing="lg" width="prose">
        <h1 className={title()}>About</h1>
      </Section>
    </DefaultLayout>
  );
}
