export class AuthorEntity {
  id: number;
  name: string;
  birthDate: Date;
  deathDate?: Date;
  nationality: string;
  biography: string;
  books: AuthorBookEntity[];
}

export class AuthorBookEntity {
  title: string;
  publishedYear: number;
  isbn: string;
}
