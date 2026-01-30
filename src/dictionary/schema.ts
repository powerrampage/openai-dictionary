import { z } from "zod";

export const DefinitionSchema = z.object({
  definition: z.string(),
  translations: z.object({ uz: z.string(), ru: z.string() }),
  synonyms: z.array(z.string()),
  collocations: z.array(z.string()),
  examples: z.array(z.string())
})

export const MeaningSchema = z.object({
  partOfSpeech: z.enum(["noun", "verb", "adjective", "adverb"]),
  definitions: z.array(DefinitionSchema)
})

export const OutputSchema = z.object({
  word: z.string(),
  pronunciation: z.object({ ipa: z.string() }),
  meanings: z.array(MeaningSchema)
}) 