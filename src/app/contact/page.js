import { PageHeader, PageShell } from "@/components/page-shell";
import { ContactPage } from "@/components/contact-page";

export const metadata = {
   title: "Contact — Shani Prajapati",
   description:
      "Get in touch with Shani Prajapati — open for internships, collaboration, open source and research.",
   openGraph: {
      title: "Contact — Shani Prajapati",
      description: "Open for internships and collaboration.",
   },
};

export default function ContactRoute() {
   return (
      <PageShell>
         <PageHeader
            eyebrow="/ contact"
            title="Let's build something."
            description="The fastest way to reach me is email. I respond within a day or two and read every message."
         />
         <ContactPage />
      </PageShell>
   );
}