import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/hooks/use-auth';
import { Redirect, useRouter } from 'expo-router';
import React from 'react';

export default function Welcome() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Show loader while restoring session from AsyncStorage
  if (loading) {
    return (
      <Box className="flex-1 bg-white dark:bg-gray-950">
        <Center className="flex-1">
          <VStack space="md" className="items-center">
            <Box className="w-20 h-20 rounded-2xl bg-primary-600 items-center justify-center mb-1">
              <Text className="text-white dark:text-gray-900 text-3xl font-bold">RNL</Text>
            </Box>
            
            <Text className="text-gray-500 dark:text-gray-400">React Native & Laravel Starter Kit</Text>
            <Spinner size="large" className="text-primary-600 mt-5" />
          </VStack>
        </Center>
      </Box>
    );
  }

  // Already signed in — skip straight to the app
  if (user) {
    return <Redirect href="/(app)" />;
  }

  return (
    <Box className="flex-1 bg-white dark:bg-gray-950">
      <Center className="flex-1 px-6">
        <VStack space="lg" className="w-full items-center">
          <Box className="w-20 h-20 rounded-2xl bg-primary-600 items-center justify-center mb-2">
            <Text className="text-white dark:text-gray-900 text-3xl font-bold">RNL</Text>
          </Box>

          <Heading size="2xl" className="text-gray-900 dark:text-white text-center">
            React Native & Laravel Starter Kit
          </Heading>

          <Text className="text-gray-500 dark:text-gray-400 text-center text-base">
            A boilerplate for building React Native apps with a Laravel backend
          </Text>

          <VStack space="md" className="w-full mt-8">
            <Button
              size="lg"
              className="bg-primary-600 rounded-xl"
              onPress={() => router.push('/(auth)/login')}
            >
              <ButtonText className="font-semibold">Sign in</ButtonText>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-xl border-primary-600"
              onPress={() => router.push('/(auth)/signup')}
            >
              <ButtonText className="text-primary-600 font-semibold">Create account</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
}
