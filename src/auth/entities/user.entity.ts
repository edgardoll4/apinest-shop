import { Product } from "../../products/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('users')
export class User {

    @ApiProperty({
        example: 'faf9c815-0d9c-4f4c-8700-c68929cbaacb',
        description: 'Id User',
        type:String,
        // isArray: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'Name user login',
        description: 'Name of user for login',
        type:String,
        uniqueItems: true,
        nullable: false
        // isArray: true,
    })
    @Column('text', {
        unique: true,
        nullable: false
    })
    username: string;

    @ApiProperty({
        example: 'Email@user.com',
        description: 'Email of user',
        type:String,
        uniqueItems: true,
        nullable: false
        // isArray: true,
    })
    @Column('text', {
        unique: true,
        nullable: false
    })
    email: string;

    @ApiProperty({
        example: 'password',
        description: 'Password of user encritp',
        type:String,
        uniqueItems: true,
        nullable: false
        // isArray: true,
    })
    @Column('text', {
        unique: false,
        nullable: false,
        select: false // impide que al hacer una colsulta el campo sea seleccionado para ser mostrdo en la consulta, salvo que haga manual
    })
    password: string;

    @ApiProperty({
        example: 'Full name user',
        description: 'Name of user',
        type:String,
        uniqueItems: false,
        nullable: false
        // isArray: true,
    })
    @Column('text', {
        unique: false,
        nullable: false
    })
    fullname: string;

    @ApiProperty({
        example: true,
        description: 'Status of user',
        type:Boolean,
        default: true,
        nullable: false
        // isArray: true,
    })
    @Column('bool', {
        unique: false,
        nullable: false,
        default:true
    })
    isActive: boolean;

    @ApiProperty({
        example: ['user','client'],
        description: 'Roles of user',
        type:[String],
        // isArray: true,
    })
    @Column('text', {
        unique: false,
        nullable: false,
        array: true,
        default:['user']
    })
    roles: string[];


    @BeforeInsert()
    checkFilesBeforeInsert(){
        this.email=this.email
            .toLowerCase()  // Pasa todas las letras a minuscula
            .trim(); // Limpia los espacios al principio y al final
    }

    // ###################RELACIONES#####################

    @OneToMany(
        () => Product,
        (product) => product.user
    )
    product: Product

   @BeforeUpdate()
   checkFilesBeforeUpdate(){
       this.checkFilesBeforeInsert()

   }
    // checkFilesBeforeUpdate(){        
    //     this.email=this.email
    //         .toLowerCase()
    //         .trim();
    
}
