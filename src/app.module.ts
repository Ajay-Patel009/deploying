import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // 1.1 Import the mongoose module
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module'; // 2.1 Import the product module

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ajaypatel:appinventiv@cluster0.1zmesdm.mongodb.net/product'), // 1.2 Setup the database
    ProductModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}