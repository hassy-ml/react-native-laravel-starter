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

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await api.post('/forgot-password', { email });
      setSuccess(true);
    } catch (e: any) {
      setError(e?.response?.data?.message || e.message || 'Request failed');
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
              Forgot password?
            </Heading>
            <Text className="text-gray-500 dark:text-gray-400">
              Enter your email and we'll send you a 6-digit reset code.
            </Text>
          </VStack>

          {error ? (
            <Box className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <Text className="text-red-600 dark:text-red-400 text-sm">{error}</Text>
            </Box>
          ) : null}

          {success ? (
            <VStack space="md">
              <Box className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <Text className="text-green-700 dark:text-green-400 text-sm">
                  A 6-digit code has been sent to your email.
                </Text>
              </Box>
              <Button
                size="lg"
                className="bg-primary-600 rounded-xl"
                onPress={() => router.push({ pathname: '/(auth)/reset-password', params: { email } })}
              >
                <ButtonText className="font-semibold">Enter reset code</ButtonText>
              </Button>
            </VStack>
          ) : (
            <VStack space="md">
              <VStack space="xs">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </Text>
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

              <Button
                size="lg"
                className="bg-primary-600 rounded-xl mt-2"
                onPress={onSubmit}
                isDisabled={submitting}
              >
                {submitting ? (
                  <ButtonSpinner color="white" />
                ) : (
                  <ButtonText className="font-semibold">Send reset code</ButtonText>
                )}
              </Button>
            </VStack>
          )}

          <Pressable onPress={() => router.back()} className="mt-2">
            <Text className="text-center text-primary-600 font-semibold">
              Back to sign in
            </Text>
          </Pressable>
        </VStack>
      </Center>
    </Box>
  );
}
