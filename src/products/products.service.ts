import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService'); // Variable para que se guarde el error 

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>

  ){}

  async create(createProductDto: CreateProductDto) {

    try{
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch(error){
      
      this.handleDBExceptions (error);

    }
    
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error) //uso del logger para mostrar erro por consola
    const msn = `Error '${error.code}' => ${error.detail}`; // Uso de un mensaje personalizado con los datos del objeto error
    throw new BadRequestException(msn)

    // throw new InternalServerErrorException('Ayuda!')
  }
}



