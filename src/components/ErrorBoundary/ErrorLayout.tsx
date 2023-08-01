import type { ReactNode } from 'react';

import { Center } from '../common/Layout/Center';
import { Heading } from '../common/Layout/Heading';
import { Text } from '../common/Layout/Text';
import { VStack } from '../common/Layout/VStack';

interface ErrorLayoutProps {
  image?: ReactNode;
  heading: string;
  subheading: string;
  children: ReactNode;
}

export const ErrorLayout = ({ children, heading, image, subheading }: ErrorLayoutProps) => {
  return (
    <Center className="min-h-[75vh] flex-col gap-6 text-center text-red-500">
      {image}
      <VStack className="max-w-2xl">
        <Heading as="h2" className="text-lg md:text-xl">
          {heading}
        </Heading>
        <Text className="text-base md:text-lg">{subheading}</Text>
      </VStack>
      {children}
    </Center>
  );
};
