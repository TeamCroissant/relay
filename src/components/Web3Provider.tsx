"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
    getDefaultConfig({
        // Your dApps chains
        chains: [mainnet],
        transports: {
            // RPC URL for each chain
            [mainnet.id]: http(
                `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
            ),
        },

        // Required API Keys
        walletConnectProjectId:
            process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

        // Required App Info
        appName: "Relay",

        // Optional App Info
        appDescription: "Your App Description",
        appUrl: "https://relay.vercel.app", // your app's url
        appIcon: "https://relay.vercel.app/favicon.ico", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider>{children}</ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
