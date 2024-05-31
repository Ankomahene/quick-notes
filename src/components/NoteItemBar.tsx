import { ActionIcon, Avatar, Box, Group, Stack, Text } from '@mantine/core';
import { IconBook2, IconTrash } from '@tabler/icons-react';
import { formatDate, getRandomColor } from '../functions';
import { INote } from '../types';

interface Props {
  note: INote;
  openNote: (note: INote) => void;
  deleteNote: (id: number) => Promise<void>;
}
export const NoteItemBar = ({ note, openNote, deleteNote }: Props) => {
  return (
    <Group my="md">
      <Box
        onClick={() => openNote(note)}
        className="note-item"
        style={{ flex: 1 }}
      >
        <Group m="sm" wrap="nowrap">
          <Avatar
            src="/note.png"
            size="md"
            radius="sm"
            bg={`${getRandomColor()}.1`}
          >
            <IconBook2 />
          </Avatar>
          <Stack gap="0">
            <Text fw="bold" c="gray.7" lineClamp={1} title={note.title}>
              {note.title}
            </Text>
            <Text
              c="dimmed"
              size="xs"
              lineClamp={1}
              title={formatDate(note.updated_at)}
            >
              Last Updated: {formatDate(note.updated_at)}
            </Text>
          </Stack>
        </Group>
      </Box>
      <ActionIcon
        onClick={() => deleteNote(note.id)}
        w="20px"
        size="sm"
        variant="light"
        color="red"
      >
        <IconTrash />
      </ActionIcon>
    </Group>
  );
};
