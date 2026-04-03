import { Button, Loader, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useRedirectToHome, useRegisterForm } from "./auth.helper";

export function RegisterForm() {
  useRedirectToHome();
  const { form, handleSubmit, isLoading } = useRegisterForm();
  return (
    <Paper withBorder shadow="sm" p={22} mt={30}>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...form.getInputProps("email")}
          />

          <TextInput
            label="Name"
            placeholder="Enter your name"
            required
            mt="md"
            {...form.getInputProps("name")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Button type="submit" fullWidth mt="xl" radius="md">
            Register
          </Button>
        </form>
      )}
    </Paper>
  );
}
