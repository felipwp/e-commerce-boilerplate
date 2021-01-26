import { User } from "../entities/user";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import { MyContext } from "../types";
import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class Error {
    @Field()
    field: string;

    @Field()
    message: string;
}

// Object types podem ser retornados nas mutações
@ObjectType()
class UserResponse {
    @Field(() => [Error], { nullable: true })
    errors?: Error[]

    @Field(() => User, { nullable: true })
    user?: User
}

@Resolver()
export class UserResolver {

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> { 
        if (options.username.length <= 2) {
            return {
                errors: [{
                    field: 'username',
                    message: 'O usuário deve ter pelo menos 3 caractéres'
                }]
            }
        }

        if (options.password.length <= 3) {
            return {
                errors: [{
                    field: 'username',
                    message: 'A senha deve ter pelo menos 4 dígitos'
                }]
            }

        }
        const hashedPassword = await argon2.hash(options.password);
        const user = em.create(User, {
            username: options.username,
            password: hashedPassword
        });
        try {
            await em.persistAndFlush(user);
        } catch (error) {
            // caso o usuário já exista na db
            if (error.code === '23505') {
                return {
                    errors: [{
                        field: 'username',
                        message: "Este usuário já está sendo utilizado"
                    }]
                }
            } 
            // console.log('Mensagem de erro: ' + error.message);
        }
        return { user };
    }


    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(User, { username: options.username.toLowerCase() });

        if (!user) {
            return {
                errors: [{ 
                    field: 'username',
                    message: 'Este usuário não existe'
                }],
            }
        };

        const valid = await argon2.verify(user.password, options.password);
        if (!valid) {
            return {
                errors: [{ 
                    field: 'password',
                    message: 'Senha incorreta'
                }],
            }
        };

        return {
            user,
        };
    }


}