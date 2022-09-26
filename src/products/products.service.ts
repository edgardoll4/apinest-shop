import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';
import { NotFoundException } from '@nestjs/common';
import { validate as isUUID} from 'uuid';
import { ProductImagen, Product} from './entities';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService'); // Variable para que se guarde el error 

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImagen)
    private readonly productImagenRepository: Repository<ProductImagen>
  ){}

  async create(createProductDto: CreateProductDto) {

    try{

      // if (!createProductDto.slug){
      //   createProductDto.slug = createProductDto.title
      //   .toLowerCase()
      //   .replaceAll(' ','_')
      //   .replaceAll("'",'')
      // }else{
      //   createProductDto.slug = createProductDto.slug
      //   .toLowerCase()
      //   .replaceAll(' ','_')
      //   .replaceAll("'",'')
      // }
      const {images =[], ...prodctDetails}=createProductDto;
      const product = this.productRepository.create({
        ...prodctDetails,
        images: images.map(image => this.productImagenRepository.create({url: image})) // permite guardar el arreglo de imagenes en la product-imagen con id del producto
      });
      await this.productRepository.save(product);
      return {...product, images};
    } catch(error){
      
      this.handleDBExceptions (error);

    }
    
  }
  // TODO: paginar
  findAll(paginationDto:PaginationDto) {
    const { limit = 10, offset = 5} =paginationDto;
    return this.productRepository.find({
      take: limit,
      skip: offset,
      // TODO: relaciones

    });
  }

  async findOne(term: string) {
    // const product = await this.productRepository.findOneBy({term});
    let product: Product;

    if ( isUUID(term) )
      product = await this.productRepository.findOneBy({id: term});
    else{
      // product = await this.productRepository.findOneBy({slug: term});
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
        .where(`UPPER(title) =:title or slug =:slug`,{
          title: term.toUpperCase(),
          slug: term.toLowerCase()
        }).getOne();
    }
    
    if(!product)
      if (isUUID(term))
        throw new NotFoundException(`El producto con el id: '${term}' no se encuentra`);
      else
        throw new NotFoundException(`El producto con el slug: '${term}' no se encuentra`);

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
      images: []
    });

    if(!product) 
      throw new NotFoundException(`Producto con id: '${id}' no se encuentra`);
      try {
        await this.productRepository.save(product);
        return product;
        
      } catch (error) {
        this.handleDBExceptions(error);
      }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return product;
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error) //uso del logger para mostrar erro por consola
    const msn = `Error: '${error.code}' => ${error.detail}`; // Uso de un mensaje personalizado con los datos del objeto error
    throw new BadRequestException(msn)

    // throw new InternalServerErrorException('Ayuda!')
  }
}



