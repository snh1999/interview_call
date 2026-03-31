import {
	Button,
	Container,
	Loader,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { NavLink } from "react-router";
import { useLoginForm, useRedirectToHome } from "./auth.helper";
import classes from "./auth.module.css";

export function LoginPage() {
	useRedirectToHome();
	const { form, handleSubmit, isLoading } = useLoginForm();

	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Welcome back!
			</Title>

			<Text className={classes.subtitle}>
				Do not have an account yet?
				<NavLink
					style={{
						textDecoration: "none",
						paddingLeft: "5px",
						color: "palevioletred",
					}}
					to="/register"
				>
					Register now.
				</NavLink>
			</Text>

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
						{/*<Group justify="space-between" mt="lg">
					<Checkbox label="Remember me" />
					<Anchor component="button" size="sm">
						Forgot password?
					</Anchor>
				</Group>*/}
						<Button type="submit" fullWidth mt="xl" radius="md">
							Login
						</Button>
					</form>
				)}
			</Paper>
		</Container>
	);
}
