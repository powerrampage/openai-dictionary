import { Elysia, t } from "elysia";
import { DictionaryService } from "./service";

const dictionaryService = new DictionaryService();

export const dictionaryRoutes = new Elysia({ prefix: "/dictionary" })
  .get("/", async function({ set, query }) {
      const result = await dictionaryService.getEntries(query.word);
      return result;
    }, 
    { query: t.Object({ word: t.String({ minLength: 3, maxLength: 50 }) }) }
  )
