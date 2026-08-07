import Script from "next/script";
import { JetBrains_Mono, Work_Sans } from "next/font/google";
import "./globals.css";
import SplashCursor from "../components/SplashCursor";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shani Prajapati — Software Engineer & Competitive Programmer",
  description:
    "Portfolio of Shani Prajapati — software engineer, competitive programmer and product builder.",
  authors: [{ name: "Shani Prajapati" }],
  openGraph: {
    title: "Shani Prajapati — Software Engineer",
    description:
      "Software engineer, competitive programmer and product builder. 500+ problems, 15+ projects.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

const themeInitScript = `
(() => {
  try {
    const stored = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch (error) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SplashCursor />
        {children}
      </body>
    </html>
  );
}
