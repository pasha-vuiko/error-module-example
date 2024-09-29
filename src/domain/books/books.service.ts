import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreatedEntityNumIdEntity } from '@shared/entities/created-entity-num-id.entity';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BooksService {
  async create(createBookDto: CreateBookDto): Promise<CreatedEntityNumIdEntity> {
    return { id: 1 };
  }

  async findAll(): Promise<BookEntity[]> {
    return [
      {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        publishedYear: 1925,
        isbn: '9780743273565',
        genres: ['Classic', 'Fiction'],
        availableCopies: 12,
        ratings: {
          average: 4.4,
          reviewsCount: 3498,
        },
        publisher: {
          name: 'Scribner',
          address: {
            street: '1234 Book St',
            city: 'New York',
            country: 'USA',
          },
        },
      },
    ];
  }

  async findOne(id: number): Promise<BookEntity> {
    return {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedYear: 1925,
      isbn: '9780743273565',
      genres: ['Classic', 'Fiction'],
      availableCopies: 12,
      ratings: {
        average: 4.4,
        reviewsCount: 3498,
      },
      publisher: {
        name: 'Scribner',
        address: {
          street: '1234 Book St',
          city: 'New York',
          country: 'USA',
        },
      },
    };
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<boolean> {
    return true;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}
