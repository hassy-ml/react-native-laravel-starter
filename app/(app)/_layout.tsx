import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@/components/ui/drawer';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import '@/global.css';
import { useAuth } from '@/hooks/use-auth';
import { Slot, useRouter } from 'expo-router';
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/(app)' },
  { label: 'Profile', icon: User, href: '/(app)/profile' },
  { label: 'Settings', icon: Settings, href: '/(app)/settings' },
];

export default function AppLayout() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const navigateTo = (href: string) => {
    setDrawerOpen(false);
    router.push(href as any);
  };

  return (
    <Box className="flex-1 bg-gray-50 dark:bg-gray-950">
      {/* Top bar */}
      <SafeAreaView>
        <HStack className="px-4 py-3 items-center justify-between bg-white dark:bg-[#00000000] border-b border-gray-200 dark:border-gray-800">
          <Pressable onPress={() => setDrawerOpen(true)} className="p-2 -ml-2">
            <Icon as={Menu} size="xl" className="text-gray-700 dark:text-gray-200" />
          </Pressable>
          <Heading size="md" className="text-gray-900 dark:text-white">
            Starter Kit
          </Heading>
          <Pressable onPress={() => navigateTo('/(app)/settings')} className="p-2 -mr-2">
            <Avatar size="sm" className="bg-primary-600">
              <AvatarFallbackText>{initials}</AvatarFallbackText>
            </Avatar>
          </Pressable>
        </HStack>
      </SafeAreaView>

      {/* Main content */}
      <Slot />

      {/* Drawer sidebar */}
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} size="lg" anchor="left">
        <DrawerBackdrop />
        <DrawerContent className="bg-white dark:bg-gray-900">
          <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
          
          <DrawerHeader className="border-b border-gray-200 pb-3 dark:border-gray-800">
            <HStack className="items-center justify-between w-full">
              <HStack space="md" className="items-center">
                <Avatar size="md" className="bg-primary-600">
                  <AvatarFallbackText>{initials}</AvatarFallbackText>
                </Avatar>
                <VStack>
                  <Text className="font-semibold text-gray-900 dark:text-white">
                    {user?.name ?? 'User'}
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email ?? ''}
                  </Text>
                </VStack>
              </HStack>
              <DrawerCloseButton>
                <Icon as={X} size="xl" className="text-gray-500 dark:text-gray-400" />
              </DrawerCloseButton>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <ScrollView showsVerticalScrollIndicator={false}>
              <VStack space="xs" className="py-2">
                {NAV_ITEMS.map((item) => (
                  <Pressable
                    key={item.href}
                    onPress={() => navigateTo(item.href)}
                    className="flex-row items-center px-3 py-3 rounded-xl active:bg-gray-100 dark:active:bg-gray-800"
                  >
                    <Icon as={item.icon} size="lg" className="text-gray-600 dark:text-gray-300 mr-3" />
                    <Text className="text-base text-gray-800 dark:text-gray-200">
                      {item.label}
                    </Text>
                  </Pressable>
                ))}
              </VStack>
            </ScrollView>
          </DrawerBody>

          <DrawerFooter className="border-t border-gray-200 dark:border-gray-800">
            <Pressable
              onPress={() => {
                setDrawerOpen(false);
                signOut();
              }}
              className="flex-row items-center px-3 py-3 w-full"
            >
              <Icon as={LogOut} size="lg" className="text-red-500 mr-3" />
              <Text className="text-base text-red-500 font-medium">Sign out</Text>
            </Pressable>
          </DrawerFooter>
          </SafeAreaView>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
