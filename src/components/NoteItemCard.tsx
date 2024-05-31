import { Card, Stack, Avatar, Text, ActionIcon } from '@mantine/core';
import { IconBook2, IconTrash } from '@tabler/icons-react';
import { getRandomColor, formatDate } from '../functions';
import { INote } from '../types';

interface Props {
  note: INote;
  openNote: (note: INote) => void;
  deleteNote: (id: number) => Promise<void>;
}

export const NoteItemCard = ({ note, openNote, deleteNote }: Props) => {
  return (
    <Card
      withBorder
      shadow="md"
      className="note-item note-item-card"
      pos="relative"
      miw={200}
    >
      <ActionIcon
        onClick={() => deleteNote(note.id)}
        w="20px"
        size="xs"
        variant="light"
        color="red"
        pos="absolute"
        top={5}
        right={5}
        className="card-delete-btn"
      >
        <IconTrash />
      </ActionIcon>

      <Stack mr="sm" onClick={() => openNote(note)}>
        <Avatar
          src="/note.png"
          size="md"
          radius="sm"
          bg={`${getRandomColor()}.1`}
        >
          <IconBook2 />
        </Avatar>

        <Text fw="bold" c="gray.7" lineClamp={2} title={note.title}>
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
    </Card>
  );
};
