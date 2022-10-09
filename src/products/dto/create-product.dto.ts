import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsIn, IsNumber, IsOptional, IsPositive, IsArray} from "class-validator";
import { ProductImagen } from "../entities";

export class CreateProductDto {
    @ApiProperty({
        example: 'Title of Product',
        description: 'Product Title',
        type:'text',
        nullable: false,
        uniqueItems: true,
    })
    @IsString()
    @MinLength(1)
    title: string;
    
    @ApiProperty({
        example: 369,
        description: 'Product Price',
        type:'number',
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;
    
    @ApiProperty({
        example: 'Description of Product',
        description: 'Product Description',
        default: 0,
        type:'text'
    })
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiProperty({
        example: 'Slug of Product',
        description: 'product_slug',
        type:'text',
        nullable: false,
        uniqueItems: true,
    })
    @IsString()
    @IsOptional()
    slug?: string;
    
    @ApiProperty({
        example: 369,
        description: 'Product Stock',
        default: 0,
        type:'number',
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    stock?: number;
    
    @ApiProperty({
        enum: ['men','women','kid','unisex'],
        example: 'unisex',
        description: 'Gender of Product',
    })
    @IsIn(['men','women','kid','unisex'])
    gender: string; // 'men'|'women'|'kid'|'unisex'
    
    @ApiProperty({
        enum: ['S','M','L','XL','XXL'],
        example: ['S','M','L','XL','XXL'],
        description: 'Size of Product',
        type:[String],
        // isArray: true,
    })
    @IsString({each: true})
    @IsArray()
    sizes: string[]; // ValidSizes[];

    @ApiProperty({
        example: ['Tecno','Moda','Global'],
        description: 'Tags of Product',
        type:[String],
        // isArray: true,
    })
    @IsString({each: true})
    @IsArray()
    @IsOptional()
    tags: string[];
    // type: ValidTypes;

    @ApiProperty({
        type: ProductImagen,
    })
    @IsString({each: true})
    @IsArray()
    @IsOptional()
    images: string[];
}
