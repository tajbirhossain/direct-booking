
import { helveticaNow } from "@/fonts/helvetica-now";
import "./globals.css";
import LenisProvider from "@/components/lenis/LenisProvider";



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${helveticaNow.variable} antialiased`}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
