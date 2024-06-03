import {
  Popover,
  TextInput,
  Avatar,
  Stack,
  UnstyledButton,
  Text,
  Button,
  Group,
  Divider,
} from '@mantine/core';
import { IconFolderOpen } from '@tabler/icons-react';
import supabase from '../utils/supabase';
import { useAppContext } from '../hooks';
import { useEffect, useState } from 'react';
import { INote } from '../types';
import { useDisclosure } from '@mantine/hooks';

export function SaveAs() {
  const [opened, { close, open }] = useDisclosure(false);
  const [title, setTitle] = useState('');
  const { noteTitle, setNoteTitle, editor, setNoteId, user } = useAppContext();

  const addNewNote = async () => {
    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          user_id: user?.id,
          title,
          content: editor?.getHTML(),
          updated_at: new Date(),
        },
      ])
      .select()
      .returns<INote[]>();

    if (error) {
      console.log(error);
    } else {
      close();
      setNoteId(data[0].id.toString());
      setNoteTitle(data[0].title);
    }
  };

  useEffect(() => {
    setTitle(noteTitle + ' (copy)');
  }, [noteTitle]);

  return (
    <Popover
      width={300}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
    >
      <Popover.Target>
        <UnstyledButton onClick={open} className="action-btn">
          <Stack gap={0} align="center" py="5">
            <Avatar size="20" color="blue" variant="transparent">
              <IconFolderOpen />
            </Avatar>
            <Text size="10px">Save As</Text>
          </Stack>
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <Divider label="Save As" labelPosition="left" />
        <TextInput
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          label="Note title"
          placeholder="Note title"
          size="xs"
        />
        <Group justify="flex-end" mt="sm" gap={8}>
          <Button size="xs" onClick={close} color="gray" variant="outline">
            Cancel
          </Button>
          <Button size="xs" onClick={addNewNote}>
            Save
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
