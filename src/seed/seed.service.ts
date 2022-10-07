import { initialData } from './data/seed-data';
import { ProductsService } from './../products/products.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService
  ) {}

  async runSeed() {
    await this.insertNewPrductsSeed();
    return 'This action seed';
  }

  private async insertNewPrductsSeed(){
    await this.productsService.deleteAllProducts();
    
    const products = initialData.products;

    const insertPromises = [];

    // products.forEach( product => {
    //   insertPromises.push( this.productsService.create(product));
    // });

    await Promise.all(insertPromises);
    return true;
  }
}
