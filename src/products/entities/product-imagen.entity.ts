import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./";


@Entity( { name: 'product_images' } ) // Se determina el nombre que tendra la tabla
export class ProductImagen {
    
        
    @ApiProperty({
        example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
        description: 'ProductImage ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: ['http://url','http://url','http://url'],
        description: 'Url of ProductImagen',
        type:[String],
        // isArray: true,
    })
    @Column('text')
    url: string;

    @ManyToOne(
        ()=> Product,
        (product)=> product.images,
        {
        onDelete: 'CASCADE'
        }
    )
    product: Product;
}