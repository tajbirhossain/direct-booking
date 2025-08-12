import { helveticaNow } from "@/fonts/helvetica-now";
import "./globals.css";
import LenisProvider from "@/components/lenis/LenisProvider";
import nextI18nextConfig from "../../../next-i18next.config";
import ClientLocaleProvider from "./client-provider";

export function generateStaticParams() {
  return nextI18nextConfig.i18n.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Direct Bookingz — Your Ultimate Booking Platform",
  description:
    "Direct Bookingz provides seamless direct booking solutions for your travel, accommodation, and more. Book directly with trusted providers and save money.",
  keywords: "booking, direct booking, travel, accommodation, reservations, best deals",
  authors: [{ name: "Direct Bookingz Team" }],
  openGraph: {
    title: "Direct Bookingz — Your Ultimate Booking Platform",
    description:
      "Direct Bookingz provides seamless direct booking solutions for your travel, accommodation, and more. Book directly with trusted providers and save money.",
    url: "https://directbookingz.com",
    siteName: "Direct Bookingz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Direct Bookingz — Your Ultimate Booking Platform",
    description:
      "Direct Bookingz provides seamless direct booking solutions for your travel, accommodation, and more. Book directly with trusted providers and save money.",
  },
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={`${helveticaNow.variable} antialiased`}>
        <ClientLocaleProvider locale={locale}>
          <LenisProvider>{children}</LenisProvider>
        </ClientLocaleProvider>
      </body>
    </html>
  );
}
