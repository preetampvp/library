import BookRepository from "@repository/books";
import { SearchType } from "@shared/constants";
import { IBook } from "@models/book";

class BooksService {
  constructor(private bookRepository: BookRepository) {}

  async findBooks(keyword: string, type: SearchType): Promise<IBook[]> {
    return await this.bookRepository.findBooks(keyword, type);
  }

  async addBook(book: IBook): Promise<IBook> {
    return await this.bookRepository.addBook(book);
  }

  async deleteBook(bookId: string): Promise<void> {
    return await this.bookRepository.deleteBook(bookId);
  }

  async updateBook(bookId: string, book: IBook): Promise<IBook | null> {
    return await this.bookRepository.updateBook(bookId, book);
  }
}

export default BooksService;
