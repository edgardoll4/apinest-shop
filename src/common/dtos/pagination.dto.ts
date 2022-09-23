import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';
// import { PaginationDto } from 'src/common/dtos/pagination.dto';


export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number) //enableImplicitConversions: true
    limit?: number;

    @IsOptional()
    // @IsPositive()
    @Min(0)
    @Type(() => Number) //enableImplicitConversions: true
    offset?: number;
}