import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trainual - Home",
  description: "Trainual Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preload" href="/assets/videos/video-step1.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/assets/videos/video-step2.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/assets/videos/video-step3.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/assets/videos/video-step4.mp4" as="video" type="video/mp4" />
      </head>
      <body className="h-full font-sans">{children}</body>
    </html>
  );
}
