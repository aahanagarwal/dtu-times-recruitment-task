"use client";

import { Container, Flex, Text, Title } from "@mantine/core";

export default function Welcome() {
  return (
    <Container mt="15vh">
      <Flex align="center" direction="column" ta="center">
        <Title c="gray.4" size="9vw">
          Welcome to <br></br>
          <Text span inherit c="primary.5">
            DTU Times
          </Text>
          !
        </Title>
      </Flex>
    </Container>
  );
}
