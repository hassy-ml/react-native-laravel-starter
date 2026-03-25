import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'expo-router';
import { ChevronRight, FileText, Mail, Pencil, Phone, Settings } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView } from 'react-native';

export default function ProfileScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const infoRows = [
    { icon: Mail, label: 'Email', value: user?.email ?? '—' },
    { icon: Phone, label: 'Phone', value: user?.phone ?? '—' },
    { icon: FileText, label: 'Bio', value: user?.bio ?? '—' },
  ];

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 16 }}>
      <VStack space="xl">
        {/* Header card */}
        <Box className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
          <Box className="h-24 bg-primary-600" />
          <Center className="-mt-12 pb-4">
            <Avatar size="2xl" className="bg-primary-700 border-4 border-white dark:border-gray-900">
              <AvatarFallbackText>{initials}</AvatarFallbackText>
            </Avatar>
            <Heading size="lg" className="text-gray-900 dark:text-white mt-3">
              {user?.name ?? 'User'}
            </Heading>
            {user?.email ? (
              <Text className="text-sm text-gray-500 dark:text-gray-400">{user.email}</Text>
            ) : null}
          </Center>
        </Box>

        {/* Info rows */}
        <Box className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
          <VStack>
            <Box className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
              <Text className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Personal Info
              </Text>
            </Box>
            {infoRows.map((row, index) => (
              <React.Fragment key={row.label}>
                {index > 0 && <Divider className="bg-gray-100 dark:bg-gray-800" />}
                <HStack className="px-4 py-4 items-center" space="md">
                  <Box className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 items-center justify-center">
                    <Icon as={row.icon} size="lg" className="text-gray-500 dark:text-gray-400" />
                  </Box>
                  <VStack className="flex-1">
                    <Text className="text-xs text-gray-500 dark:text-gray-400">{row.label}</Text>
                    <Text className="text-base text-gray-900 dark:text-white">{row.value}</Text>
                  </VStack>
                </HStack>
              </React.Fragment>
            ))}
          </VStack>
        </Box>

        {/* Actions */}
        <Box className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
          <Pressable
            onPress={() => router.push('/(app)/edit-profile')}
            className="px-4 py-4 active:bg-gray-50 dark:active:bg-gray-800"
          >
            <HStack className="items-center" space="md">
              <Box className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 items-center justify-center">
                <Icon as={Pencil} size="lg" className="text-primary-600 dark:text-primary-400" />
              </Box>
              <VStack className="flex-1">
                <Text className="text-base font-medium text-gray-900 dark:text-white">
                  Edit Profile
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                  Update your name, phone, bio
                </Text>
              </VStack>
              <Icon as={ChevronRight} size="lg" className="text-gray-400 dark:text-gray-500" />
            </HStack>
          </Pressable>
          <Divider className="bg-gray-100 dark:bg-gray-800" />
          <Pressable
            onPress={() => router.push('/(app)/settings')}
            className="px-4 py-4 active:bg-gray-50 dark:active:bg-gray-800"
          >
            <HStack className="items-center" space="md">
              <Box className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 items-center justify-center">
                <Icon as={Settings} size="lg" className="text-gray-500 dark:text-gray-400" />
              </Box>
              <VStack className="flex-1">
                <Text className="text-base font-medium text-gray-900 dark:text-white">
                  Settings
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                  Theme, preferences
                </Text>
              </VStack>
              <Icon as={ChevronRight} size="lg" className="text-gray-400 dark:text-gray-500" />
            </HStack>
          </Pressable>
        </Box>
      </VStack>
    </ScrollView>
  );
}
