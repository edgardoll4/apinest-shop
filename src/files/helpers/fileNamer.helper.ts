import { v4 as uuid } from 'uuid';


export const fileNamer = ( 
    req: Express.Request,
    file: Express.Multer.File,
    callback: Function ) => {

    // console.log({file});
    if (!file) return callback(new Error('File esta vacio'),false);

    const fileExtension = file.mimetype.split('/')[1];
    // const validExtensions = ['jpg','jpeg','png','gif'];
    const fileName = `${ uuid() }.${ fileExtension }`; // Se le da un nuevo nombre al archivo para ser guardado en el directorio

    
    callback(null,fileName); 

}