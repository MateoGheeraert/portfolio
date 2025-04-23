"use client";

import { Container, Text, Title } from "@mantine/core";

interface AboutContentProps {
  dictionary: {
    navigation: {
      about: string;
    };
  };
}

export function AboutContent({ dictionary }: AboutContentProps) {
  return (
    <Container size='lg' className='py-16'>
      <Title className='text-3xl font-bold mb-8'>
        {dictionary.navigation.about}
      </Title>
      <Text className='text-gray-600 dark:text-gray-400'>
        About content will go here.
      </Text>
    </Container>
  );
}
