import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface Prop {
	onConfirm: () => void;
	titleText: string;
	buttonText: string;
}

export default function ConfirmationModal({
	onConfirm,
	titleText,
	buttonText,
}: Prop) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal.Root opened={opened} onClose={close}>
				<Modal.Overlay />
				<Modal.Content>
					<Modal.Header>
						<Modal.Title>{titleText}</Modal.Title>
						<Modal.CloseButton />
					</Modal.Header>
					<Modal.Body>
						<Group mt="lg" justify="flex-end">
							<Button onClick={close} variant="default">
								Cancel
							</Button>
							<Button onClick={onConfirm} color="red">
								Delete
							</Button>
						</Group>
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>

			<Button size="xs" variant="light" onClick={open}>
				{buttonText}
			</Button>
		</>
	);
}
