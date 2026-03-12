import { books } from "../data/mockData";
import type { Book } from "../data/mockData";

let nextId = 4;
const booksCopy = [...books];

export const resolvers = {
  Query: {
    books: (): Book[] => booksCopy,
    book: (_: unknown, { id }: { id: string }): Book | undefined =>
      booksCopy.find((b) => b.id === id),
  },
  Mutation: {
    addBook: (
      _: unknown,
      { title, author, year }: { title: string; author: string; year?: number }
    ): Book => {
      const newBook: Book = {
        id: String(nextId++),
        title,
        author,
        year,
      };
      booksCopy.push(newBook);
      return newBook;
    },
    deleteBook: (_: unknown, { id }: { id: string }): boolean => {
      const index = booksCopy.findIndex((b) => b.id === id);
      if (index === -1) return false;
      booksCopy.splice(index, 1);
      return true;
    },
  },
};
