"use client";
import { Anchor, Avatar, Flex } from "@mantine/core";
import classes from "./Header.module.css";

export default function Navbar() {
  const links = [{ href: "/editions", label: "Editions" }];

  return (
    <Flex align="center" justify="space-between" h="100%" pl="3vw" pr="3vw">
      <Avatar src="/favicon.ico" size="lg" />

      <Flex>
        {links.map((link, index) => (
          <Anchor
            key={index}
            href={link.href}
            fw={
              location
                ? location.pathname == links[index].href
                  ? "700"
                  : "400"
                : "400"
            }
            c="gray.4"
            underline="never"
            ml="1.7vw"
            mr="1.7vw"
            className={classes.customAnchor}>
            {link.label}
          </Anchor>
        ))}
      </Flex>
    </Flex>
  );
}
