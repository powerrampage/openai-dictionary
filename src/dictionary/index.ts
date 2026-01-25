import { Elysia, t } from "elysia";
import { DictionaryService } from "./service";

const dictionaryService = new DictionaryService();

export function dictionaryRoutes() {
	return new Elysia({ prefix: "/dictionary" })
		.get("/stream", async function*({ set, query }) {
			set.headers = {
				"Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-Content-Type-Options": "nosniff"
			}

			for await (const chunk of dictionaryService.streamDefinition(query.word)) {
				yield chunk;
			}
		}, {
			query: t.Object({
				word: t.String({
					minLength: 3,
					maxLength: 50
				})
			})
		})
}
