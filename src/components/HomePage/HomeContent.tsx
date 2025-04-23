"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { Button, Container, Grid, Group, Text, Title } from "@mantine/core";
import Link from "next/link";
import { Locale } from "@/i18n/config";

interface HomeContentProps {
  locale: Locale;
  dictionary: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
    };
    cta: {
      view_projects: string;
      contact_me: string;
    };
    navigation: {
      projects: string;
    };
  };
}

export function HomeContent({ locale, dictionary }: HomeContentProps) {
  return (
    <div className='py-16'>
      {/* Hero Section */}
      <Container size='lg' className='mb-20'>
        <Grid gutter='xl'>
          <Grid.Col span={{ base: 12, md: 7 }} className='order-2 md:order-1'>
            <div className='space-y-6 py-10'>
              <Title className='text-4xl md:text-5xl lg:text-6xl font-bold'>
                {dictionary.hero.title}
              </Title>
              <Title className='text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium'>
                {dictionary.hero.subtitle}
              </Title>
              <Text
                size='lg'
                className='max-w-xl leading-relaxed text-gray-700 dark:text-gray-300'
              >
                {dictionary.hero.description}
              </Text>
              <Group>
                <Button
                  component={Link}
                  href={`/${locale}/projects`}
                  size='lg'
                  rightSection={<ArrowRight size={20} />}
                  className='bg-blue-600 hover:bg-blue-700 text-white'
                >
                  {dictionary.cta.view_projects}
                </Button>
                <Button
                  component={Link}
                  href={`/${locale}/contact`}
                  size='lg'
                  variant='outline'
                  className='border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800'
                >
                  {dictionary.cta.contact_me}
                </Button>
              </Group>
            </div>
          </Grid.Col>
          <Grid.Col
            span={{ base: 12, md: 5 }}
            className='order-1 md:order-2 flex items-center justify-center'
          >
            <div className='relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-600 bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>
              <Text className='text-gray-500 dark:text-gray-400 text-lg font-medium'>
                Profile Photo
              </Text>
            </div>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Featured Projects Section */}
      <Container size='lg' className='py-16 bg-gray-50 dark:bg-gray-900'>
        <div className='text-center mb-12'>
          <Title className='text-3xl font-bold mb-4'>Featured Projects</Title>
          <Text className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Here are some of my recent projects. Check out my projects page for
            more.
          </Text>
        </div>

        <Grid gutter='xl'>
          {[1, 2, 3].map((item) => (
            <Grid.Col key={item} span={{ base: 12, sm: 6, md: 4 }}>
              <div className='bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow'>
                <div className='aspect-video relative'>
                  <div className='bg-gray-200 dark:bg-gray-700 w-full h-full'></div>
                </div>
                <div className='p-6'>
                  <Title order={3} className='mb-2'>
                    Project {item}
                  </Title>
                  <Text className='text-gray-600 dark:text-gray-400 mb-4'>
                    A short description of project {item} and the technologies
                    used.
                  </Text>
                  <Button
                    component={Link}
                    href={`/${locale}/projects/${item}`}
                    variant='light'
                    rightSection={<ArrowRight size={16} />}
                  >
                    View Project
                  </Button>
                </div>
              </div>
            </Grid.Col>
          ))}
        </Grid>

        <div className='text-center mt-12'>
          <Button
            component={Link}
            href={`/${locale}/projects`}
            size='lg'
            rightSection={<ArrowRight size={20} />}
            variant='outline'
            className='border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800'
          >
            View All Projects
          </Button>
        </div>
      </Container>

      {/* Skills Section */}
      <Container size='lg' className='py-16'>
        <div className='text-center mb-12'>
          <Title className='text-3xl font-bold mb-4'>
            Skills & Technologies
          </Title>
          <Text className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            These are the technologies and tools I work with regularly.
          </Text>
        </div>

        <Grid>
          {[
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "Tailwind CSS",
            "PostgreSQL",
          ].map((skill) => (
            <Grid.Col key={skill} span={{ base: 6, sm: 4, md: 3, lg: 2 }}>
              <div className='flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
                <div className='w-16 h-16 mb-4 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full'>
                  {/* Placeholder for skill icon */}
                </div>
                <Text fw={500}>{skill}</Text>
              </div>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
