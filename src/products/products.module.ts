import { Product, ProductImagen } from './entities';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImagen]) // toma los entity 
  ],
  exports: [
    ProductsService,
    TypeOrmModule
  ]
})
export class ProductsModule {}
