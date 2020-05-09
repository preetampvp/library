import { Request, Response, Router } from "express";
import { BAD_REQUEST, CREATED, OK, NO_CONTENT } from "http-status-codes";
import BooksRepository from "@repository/books";
import BooksService from "@services/books";
import { SearchType } from "@shared/constants";

const router = Router();
const booksRepository = new BooksRepository();
const booksService = new BooksService(booksRepository);

// Add Book
router.post("/", async (req: Request, res: Response) => {
  const book = await booksService.addBook(req.body);
  return res.status(CREATED).json(book);
});

// Search
router.get("/", async (req: Request, res: Response) => {
  const keyword = req.param("q") || "";
  const searchType = SearchType[(req.param("by") || "title").toLowerCase() as keyof typeof SearchType];
  const books = await booksService.findBooks(keyword, searchType);
  return res.status(OK).json(books);
});

// Update Book
router.put("/:id", async (req: Request, res: Response) => {
  const book = await booksService.updateBook(req.params.id, req.body);
  return res.status(OK).json(book);
});

// Delete Book
router.delete("/:id", async (req: Request, res: Response) => {
  await booksService.deleteBook(req.params.id);
  return res.sendStatus(NO_CONTENT);
});

export default router;
