import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {

    @Field()
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property({ type: 'date' })
    createdAt = new Date();

    @Field(() => String)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field(() => String)
    @Property({ type: 'text', unique: true })
    username!: string;

    @Field()
    @Property({ type: 'text', unique: true })
    email!: string;

    @Field(() => Boolean)
    @Property({ default: false })
    isAdmin!: boolean;

    // removido o @Field, para que não seja possível pegar este campo
    // em uma query GraphQL
    // ainda continua sendo uma coluna da tabela
    @Property({ type: 'text' })
    password!: string;



}