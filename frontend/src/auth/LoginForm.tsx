import { Button, Loader, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useLoginForm, useRedirectToHome } from "./auth.helper";

export function LoginForm() {
	useRedirectToHome();
	const { form, handleSubmit, isLoading } = useLoginForm();

	return (
		<Paper withBorder shadow="sm" p={22} mt={30}>
			{isLoading ? (
				<Loader />
			) : (
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						label="Email"
						placeholder="you@example.com"
						{...form.getInputProps("email")}
					/>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						mt="md"
						{...form.getInputProps("password")}
					/>
					<Button type="submit" fullWidth mt="xl" radius="md">
						Login
					</Button>
				</form>
			)}
		</Paper>
	);
}
