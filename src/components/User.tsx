import { Button, Menu, rem } from '@mantine/core';
import { IconChevronDown, IconLogout } from '@tabler/icons-react';
import { useAppContext } from '../hooks';

export function User() {
  const { user, setUser, setPage } = useAppContext();

  const logout = () => {
    setUser(null);
    setPage(0);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant="transparent"
          rightSection={<IconChevronDown size={'1rem'} />}
        >
          {user?.name}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          color="red"
          onClick={logout}
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
