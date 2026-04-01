import { Container, Text, Title } from "@mantine/core";
import { NavLink } from "react-router";
import { useRedirectToHome } from "../auth/auth.helper";
import classes from "../auth/auth.module.css";
import { RegisterForm } from "../auth/RegisterForm";

export function RegisterPage() {
	useRedirectToHome();
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

			<RegisterForm />
		</Container>
	);
}
