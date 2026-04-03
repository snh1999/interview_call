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

interface FormatOptions {
  addSuffix?: boolean;
}

const UNITS = [
  { max: 60, label: "second", divisor: 1 },
  { max: 3600, label: "minute", divisor: 60 },
  { max: 86400, label: "hour", divisor: 3600 },
  { max: 604800, label: "day", divisor: 86400 },
  { max: 2592000, label: "week", divisor: 604800 },
  { max: 31536000, label: "month", divisor: 2592000 },
  { max: Infinity, label: "year", divisor: 31536000 },
];

export function formatDistanceToNow(
  date: Date | string | number,
  options?: FormatOptions
): string {
  const targetDate = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - targetDate.getTime();
  const diffSeconds = Math.abs(Math.floor(diffMs / 1000));
  const isPast = diffMs >= 0;

  const unit =
    UNITS.find((u) => diffSeconds < u.max) || UNITS[UNITS.length - 1];
  const value = Math.floor(diffSeconds / unit.divisor);

  const pluralized = value === 1 ? unit.label : `${unit.label}s`;
  const result = `${value} ${pluralized}`;

  if (options?.addSuffix) {
    return isPast ? `${result} ago` : `in ${result}`;
  }

  return result;
}

// Usage examples:
// formatDistanceToNow(new Date()) // "0 seconds"
// formatDistanceToNow(Date.now() - 60000) // "1 minute"
// formatDistanceToNow(Date.now() - 3600000, { addSuffix: true }) // "1 hour ago"
// formatDistanceToNow(Date.now() + 86400000, { addSuffix: true }) // "in 1 day"
