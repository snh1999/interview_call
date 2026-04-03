import ProblemForm from "../problems/form/ProblemForm";
import { useProblemForm } from "../problems/form/problem.helper";

export default function CreateProblemPage() {
	const { form, onSubmit, isLoading } = useProblemForm();

	return (
		<ProblemForm
			title="Create new problem"
			form={form}
			onSubmit={onSubmit}
			isLoading={isLoading}
		/>
	);
}
