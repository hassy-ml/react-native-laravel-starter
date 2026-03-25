import { Box } from '@/components/ui/box';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import api from '@/services/api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Pressable, TextInput } from 'react-native';

const CODE_LENGTH = 6;

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { email: paramEmail } = useLocalSearchParams<{ email: string }>();

  const [email, setEmail] = useState(paramEmail ?? '');
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async () => {
    const codeStr = code.join('');
    if (codeStr.length !== CODE_LENGTH) {
      setError('Please enter the full 6-digit code');
      return;
    }
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await api.post('/reset-password', {
        code: codeStr,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setSuccess(true);
    } catch (e: any) {
      setError(e?.response?.data?.message || e.message || 'Password reset failed');
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
              Reset password
            </Heading>
            <Text className="text-gray-500 dark:text-gray-400">
              Enter your new password below.
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
                  Password reset successfully!
                </Text>
              </Box>
              <Button
                size="lg"
                className="bg-primary-600 rounded-xl"
                onPress={() => router.replace('/(auth)/login')}
              >
                <ButtonText className="font-semibold">Go to sign in</ButtonText>
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

              <VStack space="xs">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  6-digit code
                </Text>
                <HStack space="sm" className="justify-between">
                  {code.map((digit, i) => (
                    <TextInput
                      key={i}
                      ref={(ref) => { inputRefs.current[i] = ref; }}
                      value={digit}
                      onChangeText={(text) => handleCodeChange(text, i)}
                      onKeyPress={({ nativeEvent }) => handleCodeKeyPress(nativeEvent.key, i)}
                      keyboardType="number-pad"
                      maxLength={1}
                      className="w-12 h-14 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-center text-xl font-bold text-gray-900 dark:text-white"
                    />
                  ))}
                </HStack>
              </VStack>

              <VStack space="xs">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  New password
                </Text>
                <Input size="lg" className="rounded-xl">
                  <InputField
                    placeholder="Enter new password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </Input>
              </VStack>

              <VStack space="xs">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm password
                </Text>
                <Input size="lg" className="rounded-xl">
                  <InputField
                    placeholder="Confirm new password"
                    value={passwordConfirmation}
                    onChangeText={setPasswordConfirmation}
                    secureTextEntry
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
                  <ButtonText className="font-semibold">Reset password</ButtonText>
                )}
              </Button>
            </VStack>
          )}

          <Pressable onPress={() => router.replace('/(auth)/login')} className="mt-2">
            <Text className="text-center text-primary-600 font-semibold">
              Back to sign in
            </Text>
          </Pressable>
        </VStack>
      </Center>
    </Box>
  );
}
