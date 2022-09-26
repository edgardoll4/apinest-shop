import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./";

@Entity( { name: 'product_images' } ) // Se determina el nombre que tendra la tabla
export class ProductImagen {
    @PrimaryGeneratedColumn()
    id: number;

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