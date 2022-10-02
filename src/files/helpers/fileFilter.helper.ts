

export const fileFilter = ( 
    req: Express.Request,
    file: Express.Multer.File,
    callback: Function ) => {

    // console.log({file});
    if (!file) return callback(new Error('File esta vacio'),false);

    const fileExtension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg','jpeg','png','gif']; // extensionas validad del archivo

    if (validExtensions.includes(fileExtension)){ // valida si el archivo cumple con las extensiones validas
        return callback(null,true)
    }
    callback(null,false);

}