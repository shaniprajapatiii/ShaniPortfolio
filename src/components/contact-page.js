"use client";

import { useState } from "react";
import { Check, Copy, Mail, MapPin } from "lucide-react";
import { SITE } from "@/lib/site-data";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";

export function ContactPage() {
   const [copied, setCopied] = useState(false);
   const [status, setStatus] = useState("idle");
   const [feedback, setFeedback] = useState("");
   const [formState, setFormState] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
   });

   const copyEmail = async () => {
      try {
         await navigator.clipboard.writeText(SITE.email);
         setCopied(true);
         window.setTimeout(() => setCopied(false), 1500);
      } catch {
         // noop
      }
   };

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState((current) => ({ ...current, [name]: value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      setStatus("sending");
      setFeedback("");

      try {
         const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formState),
         });

         if (!response.ok) {
            throw new Error("Unable to send message");
         }

         setStatus("sent");
         setFeedback("Message sent! I’ll reply soon.");
         setFormState({ name: "", email: "", subject: "", message: "" });
      } catch (error) {
         setStatus("error");
         setFeedback(
            "Something went wrong while sending your message. Please try again later."
         );
      }
   };

   return (
      <div className="mx-auto grid max-w-7xl gap-3 px-4 pb-24 sm:px-6 lg:grid-cols-5 lg:px-8">
         <div className="space-y-3 lg:col-span-2">
            <div className="bento-card p-6">
               <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Email
               </div>
               <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="truncate font-mono text-base">{SITE.email}</span>
                  <button
                     onClick={copyEmail}
                     className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:border-ember/60 hover:text-ember"
                     aria-label="Copy email"
                  >
                     {copied ? (
                        <Check className="h-4 w-4" />
                     ) : (
                        <Copy className="h-3.5 w-3.5" />
                     )}
                  </button>
               </div>
            </div>

            <div className="bento-card grid grid-cols-2 gap-3 p-6">
               <a
                  href={SITE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border bg-background p-3 hover:border-ember/60"
               >
                  <GithubIcon className="h-4 w-4 text-ember" />
                  <span className="font-mono text-xs uppercase tracking-wider">
                     GitHub
                  </span>
               </a>
               <a
                  href={SITE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border bg-background p-3 hover:border-ember/60"
               >
                  <LinkedinIcon className="h-4 w-4 text-ember" />
                  <span className="font-mono text-xs uppercase tracking-wider">
                     LinkedIn
                  </span>
               </a>
               <a
                  href={SITE.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border bg-background p-3 hover:border-ember/60"
               >
                  <span className="font-mono text-xs text-ember">LC</span>
                  <span className="font-mono text-xs uppercase tracking-wider">
                     LeetCode
                  </span>
               </a>
               <a
                  href={SITE.socials.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border bg-background p-3 hover:border-ember/60"
               >
                  <span className="font-mono text-xs text-ember">CF</span>
                  <span className="font-mono text-xs uppercase tracking-wider">
                     Codeforces
                  </span>
               </a>
               <a
                  href={SITE.socials.codechef}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border bg-background p-3 hover:border-ember/60"
               >
                  <span className="font-mono text-xs text-ember">CC</span>
                  <span className="font-mono text-xs uppercase tracking-wider">
                     CodeChef
                  </span>
               </a>
            </div>

            <div className="bento-card p-6">
               <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-ember" /> Based in
               </div>
               <div className="mt-2 text-lg font-semibold">{SITE.location}</div>
            </div>

            <div className="bento-card p-6">
               <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Open for
               </div>
               <ul className="mt-3 space-y-1.5 text-sm">
                  {[
                     "Internships",
                     "Collaboration",
                     "Open Source",
                     "Research projects",
                  ].map((item) => (
                     <li key={item} className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" />
                        {item}
                     </li>
                  ))}
               </ul>
            </div>
         </div>

         <form
            onSubmit={handleSubmit}
            className="bento-card flex flex-col gap-4 p-6 lg:col-span-3 lg:p-8"
         >
            <div className="flex items-center gap-2">
               <Mail className="h-4 w-4 text-ember" />
               <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Send a message
               </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
               <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                     Name
                  </span>
                  <input
                     name="name"
                     value={formState.name}
                     onChange={handleChange}
                     required
                     className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-ember"
                     placeholder="Your name"
                  />
               </label>
               <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                     Email
                  </span>
                  <input
                     name="email"
                     value={formState.email}
                     onChange={handleChange}
                     type="email"
                     required
                     className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-ember"
                     placeholder="you@domain.com"
                  />
               </label>
            </div>

            <label className="block">
               <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Subject
               </span>
               <input
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-ember"
                  placeholder="What's this about?"
               />
            </label>

            <label className="block">
               <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Message
               </span>
               <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="mt-1.5 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-ember"
                  placeholder="Tell me about your idea, role or project."
               />
            </label>

            <div className="flex items-center justify-between">
               <span className="font-mono text-[11px] text-muted-foreground" aria-live="polite">
                  {status === "sent"
                     ? "Thanks — I'll reply within a day or two."
                     : status === "error"
                     ? feedback
                     : "I read every message."}
               </span>
               <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-md bg-ember px-4 py-2 font-mono text-sm font-medium text-ember-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
               >
                  {status === "sent" ? <Check className="h-4 w-4" /> : null}
                  {status === "sent" ? "Sent" : status === "sending" ? "Sending…" : "Send message"}
               </button>
            </div>
         </form>
      </div>
   );
}
