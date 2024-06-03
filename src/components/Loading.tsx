import { Loader, Stack, Text } from '@mantine/core';

export const Loading = () => {
  return (
    <Stack>
      <Loader size="sm" />
      <Text c="dimmed" py="lg">
        Loading notes...
      </Text>
    </Stack>
  );
};
