"use client";

import { Container, Text, Title } from "@mantine/core";

interface ProjectsContentProps {
  dictionary: {
    navigation: {
      projects: string;
    };
  };
}

export function ProjectsContent({ dictionary }: ProjectsContentProps) {
  return (
    <Container size='lg' className='py-16'>
      <Title className='text-3xl font-bold mb-8'>
        {dictionary.navigation.projects}
      </Title>
      <Text className='text-gray-600 dark:text-gray-400'>
        Projects content will go here.
      </Text>
    </Container>
  );
}
