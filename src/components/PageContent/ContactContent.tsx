"use client";

import { Container, Text, Title } from "@mantine/core";

interface ContactContentProps {
  dictionary: {
    navigation: {
      contact: string;
    };
  };
}

export function ContactContent({ dictionary }: ContactContentProps) {
  return (
    <Container size='lg' className='py-16'>
      <Title className='text-3xl font-bold mb-8'>
        {dictionary.navigation.contact}
      </Title>
      <Text className='text-gray-600 dark:text-gray-400'>
        Contact form will go here.
      </Text>
    </Container>
  );
}
