import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  getHello(): string {

    return `
    
    
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <link rel="shortcut icon"
        href="https://icon-icons.com/downloadimage.php?id=33936&root=306/ICO/96/&file=Whatsapp-Icon_33936.ico"
        type="image/x-icon">
    <title>Mi API WhatsApp</title>
</head>

<body>
    <div class="logo-wrapper d-inline-block dir="auto">

        <article class="markdown-body entry-content container-lg" itemprop="text">
            <p align="center" dir="auto">
                <a href="/api/doc" rel="nofollow"><img
                        src="https://camo.githubusercontent.com/5f54c0817521724a2deae8dedf0c280a589fd0aa9bffd7f19fa6254bb52e996a/68747470733a2f2f6e6573746a732e636f6d2f696d672f6c6f676f2d736d616c6c2e737667"
                        width="200" alt="Nest Logo" data-canonical-src="https://nestjs.com/img/logo-small.svg"
                        style="max-width: 100%;"></a>
            </p>
            <p align="center" dir="auto">A progressive <a href="http://nodejs.org" rel="nofollow">Node.js</a> framework
                for building efficient and scalable server-side applications.</p>
            <p align="center" dir="auto">

            </p>
            <h2 dir="auto">Description</h2>
            <p dir="auto"><a href="https://github.com/nestjs/nest">Nest</a> framework TypeScript starter repository.</p>
            <h2>Documentacion</h2>
            <p dir="auto"><a href="/api/doc">Doumentación de la API</a></p>
        

    <h2>Clonar repositorio</h2>
        $ git clone https://github.com/edgardoll4/apinest-shop.git

    <h2>Ir al directorio donde se clono el repositorio</h2> 
        $ cd apinest-shop

    <h2>Installacion de dependencias</h2>        
        $ npm install

    <h2>Configurar variables de entorno</h2>
        # Dupilcar el archivo</br>
                    .env.templete</br>
                    
        # Dupilcar el archivo</br>
        # Renombrar el archivo y configurar losvalores</br>
                    .env</br>
    
    <h2>Levantar la base de datos en Docker</h2>
        $ docker-compose up -d

    <h2>Running the app</h2>
        # development</br>
                $ npm run start</br></br>

        # watch mode</br>
                $ npm run start:dev</br></br>

        # production mode</br>
                $ npm run start:prod</br></br>
        # development</br> 
                $ npm run start</br> </br>
        # watch mode</br> 
                $ npm run start:dev</br></br>

    <h2>Cargar datos de prueba a la DataBase</h2>
        $ http://localhost:300/api/seed</br></br></br>
        
        Nest is MIT licensed.
        </article>


    </div>
</body>

</html>
    
    `;
  }
}
