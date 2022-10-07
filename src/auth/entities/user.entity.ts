import { Product } from "../../products/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
        nullable: false
    })
    username: string;

    @Column('text', {
        unique: true,
        nullable: false
    })
    email: string;

    @Column('text', {
        unique: false,
        nullable: false,
        select: false // impide que al hacer una colsulta el campo sea seleccionado para ser mostrdo en la consulta, salvo que haga manual
    })
    password: string;

    @Column('text', {
        unique: false,
        nullable: false
    })
    fullname: string;

    @Column('bool', {
        unique: false,
        nullable: false,
        default:true
    })
    isActive: boolean;

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
