import { Avatar } from "@mantine/core";
import { useAppSelector } from "../store/store";

export default function UserButton() {
	const { user } = useAppSelector((state) => state.auth);

	return (
		<Avatar
			key={user.name}
			name={user.name}
			gradient={{ from: "red", to: "palevioletred" }}
			variant="gradient"
		/>
	);
}
