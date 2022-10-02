import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

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
    console.log({fileInController: file});

    return {
      fileName: file.originalname 
    };
  }
}
