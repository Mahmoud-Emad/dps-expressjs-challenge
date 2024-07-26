/**
 * Checks if any word in the given text appears three or more times.
 *
 * @param text - The input text to analyze.
 * @returns True if any word appears three or more times, false otherwise.
 */
export const wordCountThreeTimes = (text: string): boolean => {
	const words = text.toLowerCase().split(' ');
	if (!words) return false;

	const wordCount: { [key: string]: number } = {};

	for (const word of words) {
		wordCount[word] = (wordCount[word] || 0) + 1;
		if (wordCount[word] >= 3) {
			return true;
		}
	}

	return false;
};
