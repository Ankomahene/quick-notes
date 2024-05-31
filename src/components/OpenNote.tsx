import {
  Avatar,
  Divider,
  Menu,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconFolder } from '@tabler/icons-react';
import { useAppContext, useNotes } from '../hooks';
import { INote } from '../types';

export function OpenNote() {
  const { setNoteId, setPage, setNoteTitle, setNoteContent } = useAppContext();
  const { notes, isLoading } = useNotes();

  const openNote = (note: INote) => {
    setPage(2);
    setNoteId(note.id.toString());
    setNoteTitle(note.title);
    setNoteContent(note.content);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton className="action-btn">
          <Stack gap={0} align="center" py="">
            <Avatar size="20" color="blue" variant="transparent">
              <IconFolder />
            </Avatar>
            <Text size="10px">Open</Text>
          </Stack>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {isLoading ? (
          <Text c="dimmed" py="lg">
            Loading notes...
          </Text>
        ) : (
          notes.map((note, i) => (
            <div key={note.id}>
              <Menu.Item onClick={() => openNote(note)}>{note.title}</Menu.Item>
              {i !== notes.length - 1 && <Divider />}
            </div>
          ))
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
