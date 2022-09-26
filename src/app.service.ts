import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  getHello(): string {
    return `
    
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <link rel="shortcut icon" href="https://icon-icons.com/downloadimage.php?id=33936&root=306/ICO/96/&file=Whatsapp-Icon_33936.ico" type="image/x-icon">
        <title>Mi API WhatsApp</title>
      </head>
      <body>
        <div class="logo-wrapper d-inline-block"> <a href="/api"> <img src="https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg" alt="NestJS - A progressive Node.js framework"> </a> </div>
        </body>
    </html>
    
    `;
  }
}
