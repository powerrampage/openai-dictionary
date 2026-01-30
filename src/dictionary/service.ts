import { generateText, Output } from "ai";
import { OutputSchema } from "./schema";

export class DictionaryService {

	async getEntries(word: string) {
		const result = await generateText({
			model: "google/gemini-2.0-flash",
      prompt: this.#createPrompt(word),
      output: Output.object({
        schema: OutputSchema 
      })
		});
    return result.text;
	}

	#createPrompt(word: string): string {
		return `
      Create a full dictionary entry for the word: "${word}"
      Include:
      - IPA pronunciation
      - Part of speech breakdown
      - Clear definitions
      - Real-world usage examples
      - Synonyms and common collocations
      - Uzbek (uz) and Russian (ru) translations for each meaning
		`
	}
}
