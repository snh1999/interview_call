import {
	Box,
	Button,
	Container,
	Flex,
	Group,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";

export default function Header() {
	const navigate = useNavigate();
	return (
		<Box pos="sticky" top={0} style={{ zIndex: 50, backgroundColor: "white" }}>
			<Container size="xl" py="md">
				<Flex justify="space-between" align="center">
					<Logo />
					<Button size="md" onClick={() => navigate("/register")}>
						Get Started
					</Button>
				</Flex>
			</Container>
		</Box>
	);
}
