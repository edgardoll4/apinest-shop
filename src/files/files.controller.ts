import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';


@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}

  
  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response, // @Res() res: Express.Response,
    @Param('imageName') imageName: string
  ){

    const path = this.filesService.getStaticProductImage(imageName);

    // res.status(403).json({
    //   ok: false,
    //   path: path
    // })

    // return path;

    res.sendFile(path);

  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file',{
    fileFilter: fileFilter,
    limits: {fileSize: 5242880}, // limite del tañamo del archivo en bytes
    storage: diskStorage({
      destination:'./static/products', // disrectorio locoal del sistema de archivos del proyecto donde se guarda
      filename: fileNamer // le da el nuevo nombre al archivo donde se va a guardar
    })
  }))
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File
  ){
    
    if (!file){ // se determina si sube un archivo 
      throw new BadRequestException('Asegurese de subir una archivo de imagen valido');
    }
    console.log({ fileInController: file });

    const secureUrl = `${this.configService.get( 'SERV_HOST' )}:${this.configService.get( 'SERV_PORT' )}/api/files/product/${file.filename}`; //url de la imagen en carpeta public 

    return {
      secureUrl
    };
  }
}
