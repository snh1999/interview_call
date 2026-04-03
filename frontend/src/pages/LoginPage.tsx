import { Container, Text, Title } from "@mantine/core";
import { NavLink } from "react-router";
import { useRedirectToHome } from "../auth/auth.helper";
import classes from "../auth/auth.module.css";
import { LoginForm } from "../auth/LoginForm";

export function LoginPage() {
  useRedirectToHome();

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

      <LoginForm />
    </Container>
  );
}
