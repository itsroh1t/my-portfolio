// import type { Metadata } from "next";
// import { Inter, Poppins } from "next/font/google";
// import "./globals.css";
// import Providers from "./providers";
// import ThemeToggle from "@/components/ThemeToggle";

// const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// const poppins = Poppins({
//   weight: ['400', '500', '600', '700'],
//   subsets: ["latin"],
//   variable: "--font-poppins"
// });

// // export const metadata: Metadata = {
// //   title: "Rohit Sharma | Full Stack Developer",
// //   description: "Full Stack Developer specializing in modern scalable web applications. Experienced in React, Node.js, and MongoDB.",
// //   keywords: ["Full Stack Developer", "React", "Node.js", "MongoDB", "Web Developer", "Rohit Sharma"],
// // };

// export const metadata: Metadata = {
//   metadataBase: new URL("https://myportfolio-drab-sigma.vercel.app/"),

//   title: {
//     default: "Rohit Sharma | Full Stack Developer",
//     template: "%s | Rohit Sharma",
//   },

//   description:
//     "Rohit Sharma is a Full Stack Developer specializing in modern, scalable web applications using React, Node.js, and MongoDB.",

//   keywords: [
//     "Rohit Sharma",
//     "Full Stack Developer",
//     "React Developer",
//     "Node.js Developer",
//     "MongoDB",
//     "Next.js Developer",
//     "Web Developer India",
//   ],

//   authors: [{ name: "Rohit Sharma" }],
//   creator: "Rohit Sharma",
//   publisher: "Rohit Sharma",

//   alternates: {
//     canonical: "/",
//   },

//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },

//   openGraph: {
//     type: "website",
//     url: "https://myportfolio-drab-sigma.vercel.app",
//     title: "Rohit Sharma | Full Stack Developer",
//     description:
//       "Full Stack Developer specializing in React, Node.js, MongoDB, and scalable web solutions.",
//     siteName: "Rohit Sharma Portfolio",
//     images: [
//       {
//         url: "/og-image.png", // public folder me image daal
//         width: 1200,
//         height: 630,
//         alt: "Rohit Sharma - Full Stack Developer",
//       },
//     ],
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: "Rohit Sharma | Full Stack Developer",
//     description:
//       "Full Stack Developer building scalable modern web applications.",
//     images: ["/og-image.png"],
//   },

//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon.ico",
//     apple: "/apple-touch-icon.png",
//   },

//   themeColor: "#000000",
// };
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     // suppressHydrationWarning — server/client className mismatch ignore karo
//     // Yeh SAFE hai kyunki sirf theme class change ho rahi hai (dark/light)
//     <html lang="en" className="scroll-smooth" suppressHydrationWarning>

//       {/* 🔥 Theme load BEFORE React — no white flash */}
//       <head>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
// (function () {
//   try {
//     var theme = localStorage.getItem("theme");
//     if (theme === "light") {
//       document.documentElement.classList.add("light");
//     } else {
//       document.documentElement.classList.remove("light");
//     }
//   } catch (e) {}
// })();
//             `,
//           }}
//         />
//       </head>

//       <body className={`${inter.variable} ${poppins.variable} antialiased`}>
//         <Providers>
//           {children}
//         </Providers>
//       </body>

//     </html>
//   );
// }






import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://myportfolio-drab-sigma.vercel.app/"),

  title: {
    default: "Rohit Sharma | Full Stack Developer",
    template: "%s | Rohit Sharma",
  },

  description:
    "Rohit Sharma is a Full Stack Developer specializing in modern, scalable web applications using React, Node.js, and MongoDB.",

  keywords: [
    "Rohit Sharma",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "MongoDB",
    "Next.js Developer",
    "Web Developer India",
  ],

  authors: [{ name: "Rohit Sharma" }],
  creator: "Rohit Sharma",
  publisher: "Rohit Sharma",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://myportfolio-drab-sigma.vercel.app",
    title: "Rohit Sharma | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Node.js, MongoDB, and scalable web solutions.",
    siteName: "Rohit Sharma Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rohit Sharma - Full Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rohit Sharma | Full Stack Developer",
    description:
      "Full Stack Developer building scalable modern web applications.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>

        {/* Theme load BEFORE React (no flash) */}
        <Script id="theme-script" strategy="beforeInteractive">
          {`
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
          `}
        </Script>

        <Providers>{children}</Providers>

      </body>
    </html>
  );
}