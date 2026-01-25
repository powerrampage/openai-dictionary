import OpenAI from "openai";

export class DictionaryService {
	#client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

	async *streamDefinition(word: string): AsyncGenerator<string> {
		const stream = await this.#client.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [{ role: "user", content: this.#createPrompt(word) }],
			temperature: 0.15,
			stream: true,
			response_format: { type: "json_object" }
		});

		for await(const chunk of stream) {
			const token = chunk.choices[0]?.delta?.content;
			if (token) yield token;
		}
	}

	#createPrompt(word: string): string {
		return `
			Oxford/Cambridge-style English learner dictionary.

			Rules:
			- Neutral academic tone
			- Few definitions

			Return JSON only:
			{
				"word": "${word}",
				"pos": "",
				"ipa": "",
				"senses": [
					{
						"def": "",
						"ex": [],
						"syn": []
					}
				],
				"coll": [],
				"translations": {
					"ru": [],
					"uz": []
				}
			}
		`
	}
}
