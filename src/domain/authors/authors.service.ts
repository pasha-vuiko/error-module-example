import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { CreatedEntityIdEntity } from '../../../dist/shared/entities/created-entity-id.entity';
import { AuthorEntity } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  async create(createAuthorDto: CreateAuthorDto): Promise<CreatedEntityIdEntity> {
    return { id: 1 };
  }

  async findAll(): Promise<AuthorEntity[]> {
    return [
      {
        id: 1,
        name: 'F. Scott Fitzgerald',
        birthDate: new Date('1896-09-24'),
        deathDate: new Date('1940-12-21'),
        nationality: 'American',
        biography:
          'Francis Scott Key Fitzgerald was an American novelist, essayist, screenwriter, and short-story writer.',
        books: [
          {
            title: 'The Great Gatsby',
            publishedYear: 1925,
            isbn: '9780743273565',
          },
          {
            title: 'Tender Is the Night',
            publishedYear: 1934,
            isbn: '9780684801544',
          },
        ],
      },
    ];
  }

  async findOne(id: number): Promise<AuthorEntity> {
    return {
      id: 1,
      name: 'F. Scott Fitzgerald',
      birthDate: new Date('1896-09-24'),
      deathDate: new Date('1940-12-21'),
      nationality: 'American',
      biography:
        'Francis Scott Key Fitzgerald was an American novelist, essayist, screenwriter, and short-story writer.',
      books: [
        {
          title: 'The Great Gatsby',
          publishedYear: 1925,
          isbn: '9780743273565',
        },
        {
          title: 'Tender Is the Night',
          publishedYear: 1934,
          isbn: '9780684801544',
        },
      ],
    };
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<boolean> {
    return true;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}
