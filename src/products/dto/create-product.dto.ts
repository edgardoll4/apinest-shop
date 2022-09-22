import { IsString, MinLength, IsIn, IsNumber, IsOptional, IsPositive, IsArray} from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;
    
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsString()
    @IsOptional()
    slug?: string;
    
    @IsNumber()
    @IsPositive()
    @IsOptional()
    stock?: number;
    
    @IsIn(['men','women','kid','unisex'])
    gender: string; // 'men'|'women'|'kid'|'unisex'
    
    @IsString({each: true})
    @IsArray()
    sizes: string[]; // ValidSizes[];
    // images: string[];
    // tags: string[];
    // type: ValidTypes;

}
