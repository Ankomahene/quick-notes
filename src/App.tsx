import { ActionIcon, Card, Container, Group, Title } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.css';
import { NoteList } from './components/NoteList';
import { NewNote } from './components/NewNote';
import { useAppContext } from './hooks';
import { IconLayoutGrid, IconList } from '@tabler/icons-react';

// TODO:
// Landing Screen
// Persist state

function App() {
  const { page, setLayoutType } = useAppContext();

  return (
    <>
      <Container size="md" bg="gray.1" px={0} my="lg" mih={600}>
        <Card p="0" radius="xs" bg="transparent">
          <Group bg="indigo.1" justify="space-between">
            <Title py="sm" px="md" c="indigo" order={3}>
              Quick Notes
            </Title>

            {page === 1 && (
              <Group px="sm" py="xs" bg="white" mx="md">
                <ActionIcon
                  size="sm"
                  variant="light"
                  title="List Layout"
                  onClick={() => setLayoutType('list')}
                >
                  <IconList />
                </ActionIcon>
                <ActionIcon
                  size="sm"
                  variant="light"
                  title="Grid Layout"
                  onClick={() => setLayoutType('grid')}
                >
                  <IconLayoutGrid />
                </ActionIcon>
              </Group>
            )}
          </Group>

          {page === 1 ? <NoteList /> : <NewNote />}
        </Card>
      </Container>
    </>
  );
}

export default App;
