import { Select } from "@mantine/core";
import { useGetAllProblemsQuery } from "../store/api/problems";

interface Props {
  value?: string;
  onChange: (val: string | null) => void;
}

export default function ProblemSelect({ onChange, value }: Props) {
  const { data } = useGetAllProblemsQuery();
  const problems = data?.problems ?? [];

  return (
    <Select
      mt="md"
      size="sm"
      data={problems.map((p) => ({
        value: p._id,
        label: `${p.title} - ${p.difficulty}`,
      }))}
      value={value}
      onChange={onChange}
    />
  );
}
