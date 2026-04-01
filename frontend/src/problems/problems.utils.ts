export const getDifficultyColor = (difficulty: string) => {
	switch (difficulty) {
		case "Easy":
		case "easy":
			return "green";
		case "Medium":
		case "medium":
			return "yellow";
		case "Hard":
		case "hard":
			return "red";
		default:
			return "gray";
	}
};
