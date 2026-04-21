export interface TProblem {
  id: string;
  slug: string;
  title: string;
  difficulty: string;
  category: string;
  description: { text: string; notes: string[] };
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: Record<string, string>;
  expectedOutput: Record<string, string>;
}
