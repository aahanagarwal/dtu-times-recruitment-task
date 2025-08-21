"use client";

import { Container, Flex, Text, Title } from "@mantine/core";

export default function Welcome() {
  return (
    <Container mt="15vh">
      <Flex align="center" direction="column" ta="center">
        <Title c="gray.4" size="9vw">
          Welcome to <br />
          <Text
            span
            inherit
            variant="gradient"
            gradient={{ from: "primary.4", to: "primary.7", deg: 45 }}>
            DTU Times
          </Text>
          !
        </Title>
      </Flex>
    </Container>
  );
}
