import { User } from "../../auth/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImagen } from "./";

@Entity({ name: 'products' }) // Se determina el nombre que tendra la tabla
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string;

    @Column('float',{
        default: 0
    })
    price: number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column('text',{
        unique: true
    })
    slug: string;

    @Column('int',{
        default: 0
    })
    stock: number;

    @Column('text',{
        array: true
    })
    sizes: string[];

    @Column('text')
    gender: string;

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
