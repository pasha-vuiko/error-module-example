import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreatedEntityIdEntity } from '../../../dist/shared/entities/created-entity-id.entity';
import { AuthorEntity } from './entities/author.entity';
import { ApiAppExceptionsRes } from '@shared/modules/error/open-api/api-app-exceptions-response.decorator';
import { AuthorNotFoundException } from './exceptions/exception-classes';

@ApiTags('Book Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<CreatedEntityIdEntity> {
    return await this.authorsService.create(createAuthorDto);
  }

  @Get()
  async findAll(): Promise<AuthorEntity[]> {
    return await this.authorsService.findAll();
  }

  @ApiAppExceptionsRes(AuthorNotFoundException)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AuthorEntity> {
    return await this.authorsService.findOne(+id);
  }

  @ApiAppExceptionsRes(AuthorNotFoundException)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<boolean> {
    return await this.authorsService.update(+id, updateAuthorDto);
  }

  @ApiAppExceptionsRes(AuthorNotFoundException)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.authorsService.remove(+id);
  }
}
