import { generateText, Output } from "ai";
import { z } from "zod";

export class DictionaryService {
	async getEntries(word: string) {
		const result = await generateText({
			model: "google/gemini-2.0-flash",
      prompt: this.#createPrompt(word),
      output: Output.object({
        schema: this.#outputSchema()
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
        - Synonyms and antonyms
        - Common collocations
        - Derived forms (noun / verb / adjective / adverb if applicable)
        - Uzbek (uz) and Russian (ru) translations for each meaning
        - Usage notes if relevant (formal, informal, technical, regional) 
		`
	}

  #outputSchema() {
    return z.object({
      word: z.string(),
      pronunciation: z.object({ ipa: z.string() }),
      meanings: z.array(
        z.object({
          partOfSpeech: z.enum(["noun", "verb", "adjective", "adverb"]),
          definitions: z.array(
            z.object({
              definition: z.string(),
              translations: z.object({ uz: z.string(), ru: z.string() }),
              examples: z.array(
                z.object({
                  sentence: z.string(),
                  context: z.enum(["news", "conversation", "work", "academic", "technology"])
                })
              ),
              synonyms: z.array(z.string()),
              antonyms: z.array(z.string()),
              collocations: z.array(z.string())
            })
          )
        })
      ),
      derivedForms: z.object({
        noun: z.array(z.string()).optional(),
        verb: z.array(z.string()).optional(),
        adjective: z.array(z.string()).optional(),
        adverb: z.array(z.string()).optional()
      }),
      usageNotes: z.array(
        z.object({
          note: z.string(),
          type: z.enum(["formal", "informal", "regional", "technical"])
        })
      ).optional()
    })
  }
}
