import {
	Anchor,
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
import { useRedirectToHome, useRegisterForm } from "./auth.helper";
import classes from "./auth.module.css";

export function RegisterPage() {
	useRedirectToHome();
	const { form, handleSubmit, isLoading } = useRegisterForm();
	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Welcome!
			</Title>

			<Text className={classes.subtitle}>
				Already Have an Account?
				<NavLink
					style={{
						textDecoration: "none",
						paddingLeft: "5px",
						color: "palevioletred",
					}}
					to="/login"
				>
					Login here.
				</NavLink>
			</Text>

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
		</Container>
	);
}
