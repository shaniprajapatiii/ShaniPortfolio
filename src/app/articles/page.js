import { PageHeader, PageShell } from "@/components/page-shell";
import { ArticlesPage } from "@/components/articles-page";

export const metadata = {
   title: "Articles — Shani Prajapati",
   description:
      "Essays on algorithms, system design, AI, web development and career growth by Shani Prajapati.",
   openGraph: {
      title: "Articles — Shani Prajapati",
      description: "Writing on algorithms, systems, AI and the web.",
   },
};

export default function ArticlesRoute() {
   return (
      <PageShell>
         <PageHeader
            eyebrow="/ articles"
            title="Notes from the workbench."
            description="Short essays and longer write-ups about the things I'm learning, shipping and arguing with."
         />
         <ArticlesPage />
      </PageShell>
   );
}
