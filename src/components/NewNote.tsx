import {
  Avatar,
  Button,
  Card,
  Group,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { IconArrowBack, IconCirclePlus, IconFile } from '@tabler/icons-react';
import { useAppContext } from '../hooks';
import supabase from '../utils/supabase';
import { Editor } from './Editor';
import { OpenNote } from './OpenNote';
import { SaveAs } from './SaveAs';

export function NewNote() {
  const {
    noteTitle,
    setNoteTitle,
    editor,
    noteId,
    setNoteId,
    setPage,
    setNoteContent,
  } = useAppContext();

  const saveNote = async () => {
    const content = editor?.getHTML();
    const now = new Date();
    const title = noteTitle;

    if (noteId) {
      await updateNote({ title, content, updated_at: now, user_id: 1 });
    } else {
      await addNewNote({ user_id: 1, title, content, updated_at: now });
    }
  };

  const updateNote = async (details: object) => {
    const { error } = await supabase
      .from('notes')
      .update(details)
      .eq('id', noteId)
      .select();

    if (error) {
      console.log(error);
      return;
    }
  };

  const addNewNote = async (details: object) => {
    const { data, error } = await supabase
      .from('notes')
      .insert([details])
      .select();

    if (error) {
      console.log(error);
    } else {
      setNoteId(data[0].id);
      console.log('Notes saved Successfully');
    }
  };

  const showNoteList = () => {
    setPage(1);
  };

  const startNewNote = () => {
    setNoteId('');
    setNoteTitle('Untitled Note');
    setNoteContent('');
  };

  return (
    <>
      <Card withBorder radius={0} bg="gray.1" pos="relative">
        <Group justify="space-between">
          <Button
            leftSection={<IconArrowBack />}
            variant="light"
            onClick={showNoteList}
          >
            Note list
          </Button>

          <Group>
            <UnstyledButton onClick={startNewNote} className="action-btn">
              <Stack gap={0} align="center" py="5">
                <Avatar size="20" color="green" variant="transparent">
                  <IconCirclePlus />
                </Avatar>
                <Text size="10px">New</Text>
              </Stack>
            </UnstyledButton>
            <OpenNote />
            <UnstyledButton onClick={saveNote} className="action-btn">
              <Stack gap={0} align="center" py="5">
                <Avatar size="20" color="blue" variant="transparent">
                  <IconFile />
                </Avatar>
                <Text size="10px">Save</Text>
              </Stack>
            </UnstyledButton>

            <SaveAs />
          </Group>
        </Group>

        <TextInput
          placeholder="Untitled note"
          mt="md"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.currentTarget.value)}
        />
      </Card>

      <Editor />
    </>
  );
}
