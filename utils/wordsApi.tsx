import { gameSettings } from "@/utils/type-invader-game";
import { DatamuseWord } from "@/constants/definitions"
import { INAPPROPRIATE_WORDS } from "@/constants/inappropriateWords";


const BASE_URL = "https://api.datamuse.com/words";

/**
 * Fetch words from the Datamuse API, ensuring at least 5 unique starting letters.
 * - If a letter is provided, fetch words that contain that letter and ensure diversity.
 * - If no letter is provided, fetch general words related to the theme.
 * @param {string} [letter] - (Optional) Letter that must appear in the words.
 * @returns {Promise<string[]>} - A shuffled array of words with >=5 unique starting letters.
 */
async function fetchWords(letter?: string): Promise<string[]> {
  try {
    let words: string[] = [];
    
    // Primary API call
    const query = letter
      ? `${BASE_URL}?sp=*${letter}*&max=500`  // Words containing a specific letter
      : `${BASE_URL}?rel_trg=${gameSettings.theme}&max=1000`;  // General word list

    words = await extractValidWords(query);

    // Check unique starting letters
    const uniqueLetters = new Set(words.map(word => word.charAt(0).toLowerCase()));
    
    // If fewer than 5 unique starting letters, fetch more words
    if (letter && uniqueLetters.size < 5) {
      console.log(`Only ${uniqueLetters.size} unique starting letters found, fetching more words...`);
      
      const additionalQueries = [
        `${BASE_URL}?sp=*${letter}&max=500`,  // Words ending in the letter
        `${BASE_URL}?sp=?${letter}*&max=500`  // Words starting with any character + letter
      ];
      
      for (const q of additionalQueries) {
        const extraWords = await extractValidWords(q);
        words = words.concat(extraWords);
        
        // Update unique letter count
        extraWords.forEach(word => uniqueLetters.add(word.charAt(0).toLowerCase()));
        
        // Stop if we reach 5 unique letters
        if (uniqueLetters.size >= 5) break;
      }
    }

    return shuffleArray(words);
  } catch (error) {
    console.error(`Error in fetchWordsFromApi:`, error);
    return [];
  }
}

/**
 * Fetch words from the Datamuse API and filter out invalid words.
 * Ensures words:
 * - Do not start with "-"
 * - Are less than 10 letters long
 * - Are not inappropriate
 * @param {string} query - The Datamuse API query URL.
 * @returns {Promise<string[]>} - A filtered array of words.
 */
async function extractValidWords(query: string): Promise<string[]> {
  try {
    const response = await fetch(query);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const json: DatamuseWord[] = await response.json();

    // Extract words as strings
    let words = json.map((item) => item.word);

    // Filter out invalid words
    words = words
      .filter(word => !word.startsWith("-"))  // Remove invalid API results
      .filter(word => word.length > 2)        // Ensure words are at least 3 letters
      .filter(word => word.length < 10);     // Ensure words are 9 letters max

    // Apply inappropriate word filtering
    return filterInappropriateWords(words);
  } catch (error) {
    console.error(`Error fetching word list:`, error);
    return [];
  }
}

/**
 * Filters out inappropriate words from a given word list.
 * @param {string[]} words - The list of words to filter.
 * @returns {string[]} - The cleaned list with inappropriate words removed.
 */
function filterInappropriateWords(words: string[]): string[] {
  return words.filter(word => !INAPPROPRIATE_WORDS.has(word.toLowerCase()));
}

/**
 * Shuffle an array to randomize the order of elements.
 * @param {string[]} array - The array to shuffle.
 * @returns {string[]} - The shuffled array.
 */
function shuffleArray(array: string[]): string[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export { fetchWords };