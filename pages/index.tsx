import { siteConfig } from "@/config/site";
import { Band } from "@/components/band";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <Band spacing="lg" tone="ink" width="prose">
        <h1 className={title({ size: "xl" })}>{siteConfig.name}</h1>
      </Band>
    </DefaultLayout>
  );
}
