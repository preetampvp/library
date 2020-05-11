export const ApiServerUrl: string = process.env.REACT_APP_API_URL!;
export const ApiCreateBookUrl: string = `${ApiServerUrl}/books`;
export const ApiSearchBooksUrl: string = `${ApiCreateBookUrl}?q=:q&by=:by`;

export enum FormModalMode {
  Hide = "Hide",
  Add = "Add",
  Edit = "Update",
}

export enum SearchByOptions {
  Title = "Title",
  ISBN = "ISBN",
  Description = "Description",
  Category = "Category",
  Author = "Author",
}

export enum HttpMethod {
  Post = "Post",
  Get = "Get",
  Put = "Put",
  Delete = "Delete",
}
