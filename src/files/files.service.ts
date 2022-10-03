import { existsSync } from 'fs';
import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';


@Injectable()
export class FilesService {
 
  getStaticProductImage(imageName:string){

    const path = join(__dirname,'../../static/products',imageName); // reconstruye la ruta de la iamgen

    if (!existsSync(path))
      throw new BadRequestException(`No se encontro imagen con ese nombre: ${imageName}`);

    return path;

  }
}
