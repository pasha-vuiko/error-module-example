import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErrorModule } from '@shared/modules/error/error.module';
import { LoggerModule } from '@shared/modules/logger/logger.module';
import { LogFormat } from '@shared/modules/logger/interfaces/logger-options.interface';
import { BooksModule } from './domain/books/books.module';
import { AuthorsModule } from './domain/authors/authors.module';

@Module({
  imports: [
    // domain
    BooksModule,
    AuthorsModule,
    // shared
    ErrorModule,
    LoggerModule.forRoot('debug', { logFormat: LogFormat.PRETTY }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
