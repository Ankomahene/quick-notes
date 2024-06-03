import { Box, Divider, Flex, Group, Title } from '@mantine/core';
import { useQueryClient } from 'react-query';
import { useAppContext, useNotes } from '../hooks';
import { INote } from '../types';
import supabase from '../utils/supabase';
import { Loading } from './Loading';
import { NewNoteButton } from './NewNoteButton';
import { NoNotesCard } from './NoNotesCard';
import { NoteItemBar } from './NoteItemBar';
import { NoteItemCard } from './NoteItemCard';

export const NoteList = () => {
  const { setNoteId, setPage, setNoteTitle, setNoteContent, layoutType } =
    useAppContext();
  const { notes, isLoading } = useNotes();
  const queryClient = useQueryClient();

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
          <NewNoteButton type={1} />
        </Group>
      )}

      <Box px="lg" my="md">
        <Divider
          label={<Title order={4}> Notes ({notes.length})</Title>}
          labelPosition="left"
        />

        {isLoading ? (
          <Loading />
        ) : notes.length === 0 ? (
          <NoNotesCard />
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
            <NewNoteButton type={2} />

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
