export type CreateBookRequest = {
  code: string;
  title: string;
  author: string;
  description: string;
};

export type UpdateBookRequest = {
  code?: string;
  title?: string;
  author?: string;
  description?: string;
};
