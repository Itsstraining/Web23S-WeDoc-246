import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/v1/user/user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { FileService } from './services/file/file.service';
import { File, FileSchema } from './schemas/file.schema';
import { FileController } from './controllers/v1/file/file.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.bkge3gt.mongodb.net/WeDoc',
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: File.name, schema: FileSchema },
    ]),
  ],
  controllers: [AppController, UserController, FileController],
  providers: [AppService, UserService, FileService],
})
export class AppModule {}
