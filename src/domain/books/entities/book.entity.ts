export class BookEntity {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
  isbn: string;
  genres: string[];
  availableCopies: number;
  ratings: BookRatingsEntity;
  publisher: BooksPublisherEntity;
}

export class BookRatingsEntity {
  average: number;
  reviewsCount: number;
}

export class BooksPublisherEntity {
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
}
