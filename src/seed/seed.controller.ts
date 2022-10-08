import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators';
import { IValidRoles } from '../auth/interfaces';
import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  // @Auth( IValidRoles.admin )
  executeSeed(){
    return this.seedService.runSeed();
  }
 
}
