import { Box, Button, Container, Flex, Group } from "@mantine/core";
import { IconBook, IconDashboard } from "@tabler/icons-react";
import { Link, useLocation } from "react-router";
import Logo from "./Logo";
import UserButton from "./UserButton";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      component="nav"
      pos="sticky"
      top={0}
      bg="rgba(255, 255, 255, 0.8)"
      style={{
        zIndex: 50,
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--mantine-color-blue-2)",
      }}
    >
      <Container size="xl" py="md">
        <Flex justify="space-between" align="center">
          <Logo />

          <Group gap={4} align="center">
            <Button
              component={Link}
              to="/problems"
              variant={isActive("/problems") ? "filled" : "subtle"}
              color="pink"
              leftSection={<IconBook size={16} />}
            >
              Problems
            </Button>

            <Button
              component={Link}
              to="/dashboard"
              variant={
                isActive("/dashboard") || isActive("/") ? "filled" : "subtle"
              }
              leftSection={<IconDashboard size={16} />}
            >
              Dashboard
            </Button>

            <UserButton />
          </Group>
        </Flex>
      </Container>
    </Box>
  );
}
