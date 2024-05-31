import { Box, Button, Divider, Flex, Group, Text, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useQueryClient } from 'react-query';
import { useAppContext, useNotes } from '../hooks';
import { INote } from '../types';
import supabase from '../utils/supabase';
import { NoteItemBar } from './NoteItemBar';
import { NoteItemCard } from './NoteItemCard';

export const NoteList = () => {
  const { setNoteId, setPage, setNoteTitle, setNoteContent, layoutType } =
    useAppContext();
  const { notes, isLoading } = useNotes();
  const queryClient = useQueryClient();

  const createNewNote = () => {
    setPage(2);
    setNoteId('');
    setNoteTitle('Untitled Note');
    setNoteContent('');
  };

  const openNote = (note: INote) => {
    setPage(2);
    setNoteId(note.id.toString());
    setNoteTitle(note.title);
    setNoteContent(note.content);
  };

  const deleteNote = async (id: number) => {
    const { error } = await supabase.from('notes').delete().eq('id', id);

    if (error) {
      console.log(error);
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['notes'], exact: true });
    console.log('Note deleted successfully');
  };

  return (
    <>
      {layoutType === 'list' && (
        <Group my="md" px="lg">
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
        </Group>
      )}

      <Box px="lg" my="md">
        <Divider
          label={<Title order={4}> Notes ({notes.length})</Title>}
          labelPosition="left"
        />

        {isLoading ? (
          <Text c="dimmed" py="lg">
            Loading notes...
          </Text>
        ) : layoutType === 'list' ? (
          notes.map((note) => (
            <NoteItemBar
              key={note.id}
              note={note}
              openNote={openNote}
              deleteNote={deleteNote}
            />
          ))
        ) : (
          <Flex
            my="md"
            gap={32}
            direction={{ base: 'column', xs: 'row' }}
            wrap="wrap"
          >
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

            {notes.map((note) => (
              <NoteItemCard
                key={note.id}
                note={note}
                openNote={openNote}
                deleteNote={deleteNote}
              />
            ))}
          </Flex>
        )}
      </Box>
    </>
  );
};
