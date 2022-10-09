import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';
// import { PaginationDto } from 'src/common/dtos/pagination.dto';


export class PaginationDto {
    @ApiProperty({
        default: 10,
        description: 'Cantidad de registro a mostrar'
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number) //enableImplicitConversions: true
    limit?: number;

    @ApiProperty({
        default: 0,
        description: 'Desde donde se comienza a mostrar los registros'
    })
    @IsOptional()
    // @IsPositive()
    @Min(0)
    @Type(() => Number) //enableImplicitConversions: true
    offset?: number;
}