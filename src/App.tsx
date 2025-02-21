import { ActionIcon, Card, Container, Group, Title } from '@mantine/core';
import '@mantine/core/styles.css';
import { IconLayoutGrid, IconList } from '@tabler/icons-react';
import './App.css';
import { Landing } from './components/Landing';
import { NewNote } from './components/NewNote';
import { NoteList } from './components/NoteList';
import { User } from './components/User';
import { useAppContext } from './hooks';

function App() {
  const { page, setLayoutType } = useAppContext();

  return (
    <>
      <Container size="md" px={0} my="lg" mih={600}>
        {page !== 0 && (
          <Group justify="flex-end">
            <User />
          </Group>
        )}
        <Card p="0" radius="xs" bg="gray.1">
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

          {page === 0 && <Landing />}
          {page === 1 && <NoteList />}
          {page === 2 && <NewNote />}
        </Card>
      </Container>
    </>
  );
}

export default App;
