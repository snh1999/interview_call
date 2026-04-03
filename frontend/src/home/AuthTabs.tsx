import { Tabs } from "@mantine/core";
import { LoginForm } from "../auth/LoginForm";
import { RegisterForm } from "../auth/RegisterForm";

export default function AuthTab() {
  return (
    <Tabs color="pink" variant="pills" radius="xs" defaultValue="register">
      <Tabs.List>
        <Tabs.Tab value="register">Register</Tabs.Tab>
        <Tabs.Tab value="login">Login</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="register">
        <RegisterForm />
      </Tabs.Panel>
      <Tabs.Panel value="login">
        <LoginForm />
      </Tabs.Panel>
    </Tabs>
  );
}
