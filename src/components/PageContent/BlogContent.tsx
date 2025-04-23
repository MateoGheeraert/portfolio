"use client";

import { Container, Text, Title } from "@mantine/core";

interface BlogContentProps {
  dictionary: {
    navigation: {
      blog: string;
    };
  };
}

export function BlogContent({ dictionary }: BlogContentProps) {
  return (
    <Container size='lg' className='py-16'>
      <Title className='text-3xl font-bold mb-8'>
        {dictionary.navigation.blog}
      </Title>
      <Text className='text-gray-600 dark:text-gray-400'>
        Blog content will go here.
      </Text>
    </Container>
  );
}
