import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/Footer";
import AppContext from "@/context/AppContext";
import Header from "@/components/ui/Header";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Cloud storage app",
  description: "Upload, share and download files from the cloud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${roboto.variable} bg-background antialiased min-h-[100vh] p-0 m-0 pt-[120px]`}
                >
                <AppContext>
                    <Header/>

                    {children}
                </AppContext>
            </body>
        </html>
    );
}
