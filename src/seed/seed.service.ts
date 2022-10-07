import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities';
import { initialData } from './data/seed-data';
import { ProductsService } from './../products/products.service';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertUsers();
    await this.insertNewPrductsSeed(adminUser);
    return 'This action seed';
  }

  private async deleteTables(){

    await this.productsService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder(); // Se prepara la variable para que guarde consulta SQL
    await queryBuilder  // Se crea la consulta SQL para la eliminacion de todos los productos
      .delete()
      .where({})
      .execute()
  }


  private async insertUsers(){

    const seedUsers = initialData.users;

    // const insertPromises = [];

    // await Promise.all(insertPromises);

    // return true;

    const users: User[] = [];

    seedUsers.forEach ( user => {
      users.push( this.userRepository.create( user ) )
    } );

    const dbUsers = await this.userRepository.save( seedUsers )

    // return true;
    return dbUsers[0];

  }

  private async insertNewPrductsSeed( user: User){
    await this.productsService.deleteAllProducts();
    
    const products = initialData.products;

    const insertPromises = [];

    products.forEach( product => {
      insertPromises.push( this.productsService.create(product,user));
    });

    await Promise.all(insertPromises);
    return true;
  }
}
