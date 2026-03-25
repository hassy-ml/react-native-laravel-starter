import { Box } from '@/components/ui/box';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import api from '@/services/api';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable } from 'react-native';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await api.post('/register', { name, email, password });
      router.replace('/(auth)/login');
    } catch (e: any) {
      setError(e?.response?.data?.message || e.message || 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="flex-1 bg-white dark:bg-gray-950">
      <Center className="flex-1 px-6">
        <VStack space="lg" className="w-full max-w-sm">
          <VStack space="xs" className="mb-4">
            <Heading size="2xl" className="text-gray-900 dark:text-white">
              Create account
            </Heading>
            <Text className="text-gray-500 dark:text-gray-400">
              Join us to get started
            </Text>
          </VStack>

          {error ? (
            <Box className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <Text className="text-red-600 dark:text-red-400 text-sm">{error}</Text>
            </Box>
          ) : null}

          <VStack space="md">
            <VStack space="xs">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Full name</Text>
              <Input size="lg" className="rounded-xl">
                <InputField
                  placeholder="John Doe"
                  value={name}
                  onChangeText={setName}
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</Text>
              <Input size="lg" className="rounded-xl">
                <InputField
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</Text>
              <Input size="lg" className="rounded-xl">
                <InputField
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  type="password"
                />
              </Input>
            </VStack>
          </VStack>

          <Button
            size="lg"
            className="bg-primary-600 rounded-xl mt-2"
            onPress={onSubmit}
            isDisabled={submitting}
          >
            {submitting ? <ButtonSpinner color="white" /> : <ButtonText className="font-semibold">Sign up</ButtonText>}
          </Button>

          <Pressable onPress={() => router.push('/(auth)/login')} className="mt-2">
            <Text className="text-center text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Text className="text-primary-600 font-semibold">Sign in</Text>
            </Text>
          </Pressable>
        </VStack>
      </Center>
    </Box>
  );
}
