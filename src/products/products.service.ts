import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DataSource, Repository } from 'typeorm';
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
    private readonly productImagenRepository: Repository<ProductImagen>,

    private readonly dataSource: DataSource
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
  async findAll(paginationDto:PaginationDto) {
    const { limit = 10, offset = 5} =paginationDto;
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations:{
        images: true, // permite traer los datos de la imagenes a traves de la relaciones
      }
      // TODO: relaciones

    })

    return products.map ( products => ({
      ...products,
      images:products.images.map(img => img.url) // permite mostrar solo los datos que se requieren
    }) )

    // return products.map ( {imagens, ...rest} => ({
    //   ...rest,
    //   images: images.map(img => img.url) // permite mostrar solo los datos que se requieren
    // }) )

  }

  async findOne(term: string) {
    // const product = await this.productRepository.findOneBy({term});
    let product: Product;

    if ( isUUID(term) )
      product = await this.productRepository.findOneBy({id: term});
    else{
      // product = await this.productRepository.findOneBy({slug: term});
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder
        .where(`UPPER(title) =:title or slug =:slug`,{
          title: term.toUpperCase(),
          slug: term.toLowerCase()
        })
        .leftJoinAndSelect('prod.images','prodImg') // permite mostrar solo los datos que se requieren
        .getOne();
    }
    
    if(!product)
      if (isUUID(term))
        throw new NotFoundException(`El producto con el id: '${term}' no se encuentra`);
      else
        throw new NotFoundException(`El producto con el slug: '${term}' no se encuentra`);

    return product;
  }

  async findOnePlain (term: string){  // funcion para aplanar los datos de las imagenes solo la url
    const {images = [], ...rest} = await this.findOne (term);
    return{
      ...rest,
      images: images.map(images => images.url)
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const {images, ...toUpdate} = updateProductDto;

    const product = await this.productRepository.preload({
      id,
      ...toUpdate,
      // images: []
    });

    if(!product) 
      throw new NotFoundException(`Producto con id: '${id}' no se encuentra`);

      // Crear Query runner
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();



      try {

        if( images ){
          await queryRunner.manager.delete( ProductImagen, {product: {id: id}} );
        
          product.images = images.map(
            image => this.productImagenRepository.create({url: image}))
        }else{

        }

        await queryRunner.manager.save(product);

        await queryRunner.commitTransaction();
        await queryRunner.release();
        // await this.productRepository.save(product);
        // return product;
        return this.findOnePlain(id);
        
      } catch (error) {

        await queryRunner.rollbackTransaction();
        await queryRunner.release();

        this.handleDBExceptions(error);
      }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return product;
  }

  

 async deleteAllProducts() {  // Eliminacion completa de los productos
  const query = this.productRepository.createQueryBuilder('product');
  try {
    return await query
    .delete()
    .where({})
    .execute();
  } catch (error) {
    this.handleDBExceptions(error);
  }
 }


  private handleDBExceptions(error: any):never {
    this.logger.error(error) //uso del logger para mostrar erro por consola
    const msn = `Error: '${error.code}' => ${error.detail}`; // Uso de un mensaje personalizado con los datos del objeto error
    throw new BadRequestException(msn)

    // throw new InternalServerErrorException('Ayuda!')
  }
}



