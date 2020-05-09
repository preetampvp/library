import Book, { IBook } from "@models/book";
import { SearchType } from "@shared/constants";

class BooksRepository {
  async addBook(book: IBook): Promise<IBook> {
    return new Book(book).save();
  }

  async deleteBook(bookId: string): Promise<void> {
    await Book.findByIdAndDelete({ _id: bookId });
  }

  async updateBook(bookId: string, book: IBook): Promise<IBook | null> {
    return await Book.findByIdAndUpdate(bookId, book);
  }

  async findBooks(keyword: string, type: SearchType): Promise<IBook[]> {
    const pattern = new RegExp(keyword, "i");

    let query = {};
    switch (type) {
      case SearchType.title:
        query = {
          title: { $regex: pattern },
        };
        break;
      case SearchType.description:
        query = {
          description: { $regex: pattern },
        };
        break;
      case SearchType.isbn:
        query = {
          isbn: { $regex: pattern },
        };
        break;
      case SearchType.category:
        query = {
          categories: {
            $elemMatch: {
              $regex: pattern,
            },
          },
        };
        break;
      case SearchType.author:
        query = {
          authors: {
            $elemMatch: {
              $regex: pattern,
            },
          },
        };
        break;
    }

    return await Book.find(query);
  }
}

export default BooksRepository;
