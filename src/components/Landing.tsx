import {
  Alert,
  Avatar,
  Button,
  Center,
  Group,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useState } from 'react';
import supabase from '../utils/supabase';
import { useAppContext } from '../hooks';
import { IUser } from '../types';

type Screen = 'login' | 'register';

export const Landing = () => {
  const { setUser, setPage } = useAppContext();
  const [screen, setScreen] = useState<Screen>('login');
  const [pin, setPin] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (pin.trim() && username.trim()) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('pin', pin)
        .returns<IUser[]>();

      if (error) {
        setError('Unable to login. Check Credentials');
        return;
      }

      const user = data?.[0];

      if (user) {
        setUser({
          name: user.name,
          username: user.username,
          id: user.id,
        });
        setPage(1);
      } else {
        setError('Unable to login. Check Credentials');
      }
    } else {
      setError('Enter username and pin');
    }
  };

  const handleRegister = async () => {
    if (name.trim() && username.trim() && pin.trim()) {
      const { data: foundUser } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .returns<IUser[]>();

      if (foundUser && foundUser.length > 0) {
        setError('Username not available');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .insert([{ username, name, pin }])
        .select()
        .returns<IUser[]>();
      if (error) {
        setError('Unable to register. Check Credentials');
        return;
      }

      const user = data?.[0];
      if (user) {
        setUser({
          name: user.name,
          username: user.username,
          id: user.id,
        });
        setPage(1);
      }
    } else {
      setError('Enter name, username and pin');
    }
  };

  const loginScreen = (
    <>
      <Avatar src="/notes.png" size="200px" radius="xl" bg="white"></Avatar>
      <TextInput
        w={200}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <PasswordInput
        w={200}
        placeholder="Enter Pin"
        value={pin}
        onChange={(e) => setPin(e.currentTarget.value)}
      />
      <Button w="200px" onClick={handleLogin}>
        Login
      </Button>
      <Group justify="flex-end" w="200px">
        <Button variant="transparent" onClick={() => setScreen('register')}>
          Register
        </Button>
      </Group>
    </>
  );

  const registerScreen = (
    <>
      <Avatar src="/notes.png" size="100px" radius="xl" bg="white"></Avatar>
      <TextInput
        w={200}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <TextInput
        w={200}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <PasswordInput
        w={200}
        placeholder="Pin"
        value={pin}
        onChange={(e) => setPin(e.currentTarget.value)}
      />
      <Button w={200} onClick={handleRegister}>
        Register
      </Button>
      <Group justify="flex-end" w={200}>
        <Button variant="transparent" onClick={() => setScreen('login')}>
          Login
        </Button>
      </Group>
    </>
  );

  return (
    <>
      <Center mih="550">
        <Stack align="center">
          {screen === 'login' ? loginScreen : registerScreen}

          {error && (
            <Alert variant="light" color="red">
              {error}
            </Alert>
          )}
        </Stack>
      </Center>
    </>
  );
};
