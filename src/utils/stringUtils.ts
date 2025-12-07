export function capitaliseFirstLetter(input: string): string {
  return `${input[0].toUpperCase()}${input.slice(1)}`;
}

export function formatOptionKey(key: string): string {
  // Human-presention of camel case keys into readable sentences
  // (e.g., 'rerollWhenAllEqual' -> Reroll When All Equal)
  const formatted = key.replace(/([A-Z])/g, " $1");
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function formatProbability(prob: number): string {
  // % and ratio string for probability (e.g., '0%', '76.89%')

  if (prob === 0) return "0%";

  // percent
  const percent = prob * 100;
  let ratioString = "";

  // ratio
  const ratio = 1 / prob;

  let formattedRatioValue: string;

  // rounding logic
  if (ratio > 10) {
    // If ratio is greater than 10 (long odds), round to nearest whole number
    // Example: 1 in 15 or 1 in 1,234
    formattedRatioValue = Math.round(ratio).toLocaleString();
  } else {
    // If ratio is 10 or less (shorter odds), format to one decimal place
    // Example: 1 in 2.5 or 1 in 9.9
    formattedRatioValue = ratio.toFixed(1);

    // Remove the .0 decimal if it's an exact whole number (e.g., 2.0 -> 2)
    if (formattedRatioValue.endsWith(".0")) {
      formattedRatioValue = formattedRatioValue.substring(
        0,
        formattedRatioValue.length - 2
      );
    }
  }

  // display valid ratio
  if (ratio >= 1) {
    ratioString = ` (approx. 1 in ${formattedRatioValue})`;
  } else if (ratio < 1 && ratio > 0) {
    // yeh wont get here but am paranoid
    ratioString = ` (approx. 1 in 1)`;
  }

  // format to text presentation standards
  if (percent >= 0.1) {
    // P >= 0.1%: show two decimal places
    return `${percent.toFixed(2)}%${ratioString}`;
  }

  // P < 0.1%: keep increasing decimals until significant (non-zero) digit is found
  let decimals = 3;
  let formatted = percent.toFixed(decimals);

  while (parseFloat(formatted) === 0 && decimals < 20) {
    decimals++;
    formatted = percent.toFixed(decimals);
  }

  return `${formatted}%${ratioString}`;
}
