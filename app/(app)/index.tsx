import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/hooks/use-auth';
import React from 'react';
import { ScrollView } from 'react-native';

type StatCardProps = {
  label: string;
  value: string;
  color: string;
};

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <Box className={`flex-1 p-4 rounded-2xl ${color}`}>
      <Text className="text-sm text-white/80">{label}</Text>
      <Heading size="xl" className="text-white mt-1">
        {value}
      </Heading>
    </Box>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 16 }}>
      <VStack space="lg">
        <VStack space="xs">
          <Heading size="xl" className="text-gray-900 dark:text-white">
            Hello, {user?.name?.split(' ')[0] ?? 'there'}!
          </Heading>
          <Text className="text-gray-500 dark:text-gray-400">
            Welcome to your dashboard.
          </Text>
        </VStack>

        {/* Sample stat cards — replace with your own data */}
        <HStack space="md">
          <StatCard label="Users" value="128" color="bg-gray-900" />
          <StatCard label="Active" value="96" color="bg-emerald-600" />
        </HStack>

        <HStack space="md">
          <StatCard label="Pending" value="12" color="bg-amber-500" />
          <StatCard label="Issues" value="3" color="bg-rose-500" />
        </HStack>

        <Box className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <Heading size="md" className="text-gray-900 dark:text-white mb-2">
            Sample Dashboard
          </Heading>
          <Text className="text-gray-500 dark:text-gray-400 text-sm">
            This is a placeholder dashboard. Replace these cards and navigation items with your own
            content to match your application's requirements.
          </Text>
        </Box>
      </VStack>
    </ScrollView>
  );
}
