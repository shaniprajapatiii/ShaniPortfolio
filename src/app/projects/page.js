import { PageHeader, PageShell } from "@/components/page-shell";
import { ProjectsPage } from "@/components/projects-page";

export const metadata = {
   title: "Projects — Shani Prajapati",
   description:
      "Selected projects by Shani Prajapati — full-stack apps, developer tools, AI products and research prototypes.",
   openGraph: {
      title: "Projects — Shani Prajapati",
      description: "Full-stack apps, tools and AI products.",
   },
};

export default function ProjectsRoute() {
   return (
      <PageShell>
         <PageHeader
            eyebrow="/ projects"
            title="Things I've built."
            description="A mix of shipped products, tools I use daily and experiments that taught me something. Each one solved a specific problem worth solving."
         />
         <ProjectsPage />
      </PageShell>
   );
}