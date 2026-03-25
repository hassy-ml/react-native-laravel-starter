import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { type ThemeMode, useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'expo-router';
import { ChevronRight, Moon, Smartphone, Sun } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView } from 'react-native';

type ThemeOption = {
  label: string;
  value: ThemeMode;
  icon: typeof Sun;
  description: string;
};

const THEME_OPTIONS: ThemeOption[] = [
  { label: 'Light', value: 'light', icon: Sun, description: 'Always use light theme' },
  { label: 'Dark', value: 'dark', icon: Moon, description: 'Always use dark theme' },
  { label: 'System', value: 'system', icon: Smartphone, description: 'Follow device setting' },
];

export default function SettingsScreen() {
  const { themeMode, setThemeMode } = useTheme();
  const { user } = useAuth();
  const router = useRouter();

  const initials = (user?.name ?? '')
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
      <VStack space="xl">
        <VStack space="xs">
          <Heading size="xl" className="text-gray-900 dark:text-white">
            Settings
          </Heading>
          <Text className="text-gray-500 dark:text-gray-400">
            Manage your account and preferences.
          </Text>
        </VStack>

        {/* Edit Profile link */}
        <Pressable
          onPress={() => router.push('/(app)/edit-profile')}
          className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-4 py-4 active:bg-gray-50 dark:active:bg-gray-800"
        >
          <HStack className="items-center" space="md">
            <Avatar size="md" className="bg-primary-600">
              <AvatarFallbackText>{initials}</AvatarFallbackText>
            </Avatar>
            <VStack className="flex-1">
              <Text className="text-base font-medium text-gray-900 dark:text-white">
                {user?.name ?? 'User'}
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">
                Edit your profile
              </Text>
            </VStack>
            <Icon as={ChevronRight} size="lg" className="text-gray-400 dark:text-gray-500" />
          </HStack>
        </Pressable>

        {/* Appearance */}
        <Box className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
          <VStack>
            <Box className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
              <Text className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Appearance
              </Text>
            </Box>

            {THEME_OPTIONS.map((option, index) => {
              const isSelected = themeMode === option.value;
              return (
                <React.Fragment key={option.value}>
                  {index > 0 && <Divider className="bg-gray-100 dark:bg-gray-800" />}
                  <Pressable
                    onPress={() => setThemeMode(option.value)}
                    className="px-4 py-4 active:bg-gray-50 dark:active:bg-gray-800"
                  >
                    <HStack className="items-center justify-between">
                      <HStack space="md" className="items-center flex-1">
                        <Box
                          className={`w-10 h-10 rounded-xl items-center justify-center ${
                            isSelected ? 'bg-gray-200 dark:bg-primary-900/30' : 'bg-gray-100 dark:bg-gray-800'
                          }`}
                        >
                          <Icon
                            as={option.icon}
                            size="lg"
                            className={
                              isSelected
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-500 dark:text-gray-400'
                            }
                          />
                        </Box>
                        <VStack>
                          <Text
                            className={`text-base font-medium ${
                              isSelected
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {option.label}
                          </Text>
                          <Text className="text-xs text-gray-500 dark:text-gray-400">
                            {option.description}
                          </Text>
                        </VStack>
                      </HStack>
                      <Switch
                        value={isSelected}
                        onValueChange={() => setThemeMode(option.value)}
                        trackColor={{ false: '#d1d5db', true: '#4f46e5' }}
                        thumbColor="#ffffff"
                      />
                    </HStack>
                  </Pressable>
                </React.Fragment>
              );
            })}
          </VStack>
        </Box>

        {/* About */}
        <Box className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
          <VStack>
            <Box className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
              <Text className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                About
              </Text>
            </Box>
            <Box className="px-4 py-4">
              <HStack className="items-center justify-between">
                <Text className="text-base text-gray-900 dark:text-white">Version</Text>
                <Text className="text-base text-gray-500 dark:text-gray-400">1.0.0</Text>
              </HStack>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </ScrollView>
  );
}
