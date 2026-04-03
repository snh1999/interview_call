import { Avatar, Menu } from "@mantine/core";
import { useLogout } from "../auth/auth.helper";
import { useAppSelector } from "../store/store";

export default function UserButton() {
  const { user } = useAppSelector((state) => state.auth);
  const { logout } = useLogout();

  return (
    <Menu width={200}>
      <Menu.Target>
        <Avatar
          key={user.name}
          name={user.name}
          gradient={{ from: "red", to: "palevioletred" }}
          variant="gradient"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={logout}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
