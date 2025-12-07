export function capitaliseFirstLetter(input: string): string {
  return `${input[0].toUpperCase()}${input.slice(1)}`;
}

export function formatOptionKey(key: string): string {
  // Human-presention of camel case keys into readable sentences
  // (e.g., 'rerollWhenAllEqual' -> Reroll When All Equal)
  const formatted = key.replace(/([A-Z])/g, " $1");
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
