import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useAppContext } from '../hooks';

export const NewNoteButton = ({ type }: { type: 1 | 2 }) => {
  const { setNoteId, setPage, setNoteTitle, setNoteContent } = useAppContext();

  const createNewNote = () => {
    setPage(2);
    setNoteId('');
    setNoteTitle('Untitled Note');
    setNoteContent('');
  };

  return type === 1 ? (
    <Button
      fullWidth
      h={80}
      color="indigo"
      bg="indigo.1"
      variant="light"
      style={{ border: '1px dashed var(--mantine-color-indigo-4)' }}
      leftSection={<IconPlus />}
      onClick={createNewNote}
      radius="xs"
    >
      New Note
    </Button>
  ) : (
    <Button
      w={{ base: '100%', xs: 200 }}
      h={150}
      color="indigo"
      bg="indigo.1"
      variant="light"
      style={{ border: '1px dashed var(--mantine-color-indigo-4)' }}
      leftSection={<IconPlus />}
      onClick={createNewNote}
      radius="xs"
    >
      New Note
    </Button>
  );
};
