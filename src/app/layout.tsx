import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Web3Provider } from "@/components/Web3Provider";

export const metadata: Metadata = {
    title: "Relay | Your chain in blockchain",
    description:
        "Relay is a web3 platform that allows you to create your own supply chain control.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased dark">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Web3Provider>
                        {children}
                    </Web3Provider>
                </ThemeProvider>
            </body>
        </html>
    );
}
