import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
