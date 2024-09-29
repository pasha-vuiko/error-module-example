import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreatedEntityNumIdEntity } from '@shared/entities/created-entity-num-id.entity';
import { BookEntity } from './entities/book.entity';
import { ApiAppExceptionsRes } from '@shared/modules/error/open-api/api-app-exceptions-response.decorator';
import {
  BookNotFoundException,
  BookWithTheNameIsAlreadyExistsException,
  ForbiddenToViewBookException,
} from './exceptions/exception-classes';
import { ApiTags } from '@nestjs/swagger';
import { AuthorNotFoundException } from '../authors/exceptions/exception-classes';
import { BookFilterDto } from './dto/book-filter.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiAppExceptionsRes(BookWithTheNameIsAlreadyExistsException)
  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<CreatedEntityNumIdEntity> {
    return this.booksService.create(createBookDto);
  }

  @ApiAppExceptionsRes(AuthorNotFoundException)
  @Get()
  async findAll(@Query() filter: BookFilterDto): Promise<BookEntity[]> {
    return await this.booksService.findAll();
  }

  @ApiAppExceptionsRes(
    BookNotFoundException,
    AuthorNotFoundException,
    ForbiddenToViewBookException,
  )
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BookEntity> {
    return await this.booksService.findOne(+id);
  }

  @ApiAppExceptionsRes(
    BookNotFoundException,
    AuthorNotFoundException,
    BookWithTheNameIsAlreadyExistsException,
  )
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<boolean> {
    return await this.booksService.update(+id, updateBookDto);
  }

  @ApiAppExceptionsRes(BookNotFoundException)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.booksService.remove(+id);
  }
}
