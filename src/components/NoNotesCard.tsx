import { Card, Center, Stack, Button, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useAppContext } from '../hooks';

export const NoNotesCard = () => {
  const { setNoteId, setPage, setNoteTitle, setNoteContent } = useAppContext();

  const createNewNote = () => {
    setPage(2);
    setNoteId('');
    setNoteTitle('Untitled Note');
    setNoteContent('');
  };
  return (
    <Card withBorder bg="gray.2" my="lg" py="xl">
      <Center>
        <Stack align="center">
          <Text size="sm" fs="italic">
            No notes to display
          </Text>
          <Button
            variant="light"
            size="xs"
            leftSection={<IconPlus />}
            onClick={createNewNote}
          >
            Add new note
          </Button>
        </Stack>
      </Center>
    </Card>
  );
};
