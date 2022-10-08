import { User } from "../../auth/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImagen } from "./";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'products' }) // Se determina el nombre que tendra la tabla
export class Product {
    @ApiProperty({
        example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'Product Demo',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty({
        example: 369,
        default:0,
        description: 'Product Price',
        type: Number,
    })
    @Column('float',{
        default: 0
    })
    price: number;

    @ApiProperty({
        example: 'Description of Product',
        description: 'Product Description',
        type:'text'
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: 'product_demo',
        description: 'Product Slug',
        uniqueItems: true
    })
    @Column('text',{
        unique: true
    })
    slug: string;

    @ApiProperty({
        example: 10,
        default:0,
        description: 'Product Stock',
        type: Number,
    })
    @Column('int',{
        default: 0
    })
    stock: number;

    @ApiProperty({
        enum: ['S','M','L','XL','XXL'],
        example: ['S','M','L','XL','XXL'],
        description: 'Size of Product',
        type:[String],
        // isArray: true,
    })
    @Column('text',{
        array: true
    })
    sizes: string[];

    @ApiProperty({
        enum: ['men','women','kid','unisex'],
        example: 'unisex',
        description: 'Gender of Product',
    })
    @Column('text')
    gender: string;

    @ApiProperty({
        example: ['Tecno','Moda','Global'],
        description: 'Tags of Product',
        type:[String],
        // isArray: true,
    })
    @Column('text',{
        array: true,
        default:[]
    })
    tags:string[];
    
    @OneToMany(
        () => ProductImagen,
        (productImagen) => productImagen.product,
        {cascade:true,
        eager: true}
    )
    images?: ProductImagen[];


    // ###################RELACIONES#####################

    @ManyToOne(
        () => User,
        (user) => user.product,
        {eager: true} // Carga automaticamente los datos desde la relación
    )
    user:User;

   @BeforeInsert()
   checkSlugInsert(){
    if (!this.slug){
        this.slug = this.title;
    }
    this.slug=this.slug
        .toLowerCase()
        .replaceAll(' ','_')
        .replaceAll("'",'');
   }

   @BeforeUpdate()
   checkSlugUpdate(){
    if (!this.slug){
        this.slug = this.title;
    }
    this.slug=this.slug
        .toLowerCase()
        .replaceAll(' ','_')
        .replaceAll("'",'');
   }

}
