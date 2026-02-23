import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "Rohit Sharma | Full Stack Developer",
  description: "Full Stack Developer specializing in modern scalable web applications. Experienced in React, Node.js, and MongoDB.",
  keywords: ["Full Stack Developer", "React", "Node.js", "MongoDB", "Web Developer", "Rohit Sharma"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning — server/client className mismatch ignore karo
    // Yeh SAFE hai kyunki sirf theme class change ho rahi hai (dark/light)
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>

      {/* 🔥 Theme load BEFORE React — no white flash */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var theme = localStorage.getItem("theme");
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  } catch (e) {}
})();
            `,
          }}
        />
      </head>

      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>

    </html>
  );
}