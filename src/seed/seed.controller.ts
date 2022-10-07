import { Controller, Get } from '@nestjs/common';
import { Auth } from '../auth/decorators';
import { IValidRoles } from '../auth/interfaces';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  // @Auth( IValidRoles.admin )
  executeSeed(){
    return this.seedService.runSeed();
  }
 
}
