import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/hooks/use-auth';
import api from '@/services/api';
import { Camera } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView } from 'react-native';

export default function EditProfileScreen() {
  const { user, setUser } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name ?? '');
      setPhone(user.phone ?? '');
      setBio(user.bio ?? '');
    }
  }, [user]);

  const initials = (user?.name ?? '')
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  const onSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const resp = await api.post('/profile', { name, phone, bio });
      setUser(resp.data.user ?? resp.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: any) {
      setError(e?.response?.data?.message || e.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
    >
      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
        <VStack space="xl">
          <VStack space="xs">
            <Heading size="xl" className="text-gray-900 dark:text-white">
              Edit Profile
            </Heading>
            <Text className="text-gray-500 dark:text-gray-400">
              Update your personal information.
            </Text>
          </VStack>

          {/* Status messages */}
          {error ? (
            <Box className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <Text className="text-red-600 dark:text-red-400 text-sm">{error}</Text>
            </Box>
          ) : null}
          {success ? (
            <Box className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <Text className="text-green-700 dark:text-green-400 text-sm">
                Profile updated successfully!
              </Text>
            </Box>
          ) : null}

          {/* Form */}
          <Box className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
            <VStack space="lg" className="p-4">
              {/* Avatar */}
              <Center>
                <Pressable className="relative">
                  <Avatar size="xl" className="bg-primary-600">
                    <AvatarFallbackText>{initials}</AvatarFallbackText>
                  </Avatar>
                  <Box className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary-600 items-center justify-center border-2 border-white dark:border-gray-900">
                    <Icon as={Camera} size="xs" className="text-white dark:text-gray-800" />
                  </Box>
                </Pressable>
                <Text className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Tap to change photo
                </Text>
              </Center>

              <VStack space="xs">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</Text>
                <Input size="lg" className="rounded-xl">
                  <InputField
                    placeholder="John Doe"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </Input>
              </VStack>

              <VStack space="xs">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</Text>
                <Input size="lg" className="rounded-xl" isReadOnly>
                  <InputField
                    value={user?.email ?? ''}
                    editable={false}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </Input>
                <Text className="text-xs text-gray-400 dark:text-gray-500">
                  Email cannot be changed.
                </Text>
              </VStack>

              <VStack space="xs">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</Text>
                <Input size="lg" className="rounded-xl">
                  <InputField
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                </Input>
              </VStack>

              <VStack space="xs">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</Text>
                <Input size="lg" className="rounded-xl h-24">
                  <InputField
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChangeText={setBio}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    className="py-2"
                  />
                </Input>
              </VStack>

              <Button
                size="lg"
                className="bg-primary-600 rounded-xl"
                onPress={onSave}
                isDisabled={saving}
              >
                {saving ? (
                  <ButtonSpinner color="white" />
                ) : (
                  <ButtonText className="font-semibold">Save changes</ButtonText>
                )}
              </Button>
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
