import { Band } from "@/components/band";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <Band spacing="lg" tone="paper" width="prose">
        <h1 className={title()}>About</h1>
      </Band>
    </DefaultLayout>
  );
}
