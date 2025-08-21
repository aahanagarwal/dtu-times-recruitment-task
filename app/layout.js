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
      <head>
        <ColorSchemeScript />
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
