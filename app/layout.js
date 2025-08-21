"use client";

import "@mantine/core/styles.css";
import "./globals.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  AppShell,
  createTheme,
} from "@mantine/core";
import Navbar from "../components/Navbar";
import { Loading } from "@/components/Loading";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const primary = [
    "#ecf9f2",
    "#dff3e9",
    "#d1ecdf",
    "#c4e6d6",
    "#b7dfcc",
    "#7eca9a",
    "#64b483",
    "#4c8f66",
    "#376b4b",
    "#2b5139",
  ];

  const theme = createTheme({
    colors: { primary: primary },
    primaryColor: "primary",
    primaryShade: 5,
    fontFamily: "Poppins",
    cursorType: "pointer",
    autoContrast: true,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en" {...mantineHtmlProps} suppressHydrationWarning>
      <head title="DTU Times">
        <ColorSchemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          {!isClient ? (
            <Loading />
          ) : (
            <AppShell header={{ height: "13vh" }}>
              <AppShell.Header>
                <Navbar />
              </AppShell.Header>

              <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
          )}
        </MantineProvider>
      </body>
    </html>
  );
}
