import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date;

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isAdmin!: boolean;

  // removido o @Field, para que não seja possível pegar este campo
  // em uma query GraphQL
  // ainda continua sendo uma coluna da tabela
  @Column({ type: "text" })
  password!: string;
}
