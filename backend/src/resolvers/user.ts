import { User } from "../entities/user";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "../types";
import argon2 from "argon2";
import { EntityManager } from "@mikro-orm/postgresql";
import { COOKIE_NAME } from "../constants";
import { UsernamePasswordInput } from "../utils/UsernamePasswordInput";
import { validateRegistration } from "../utils/validateRegistration";
import { sendEmail } from "src/utils/sendEmail";

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
  errors?: Error[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  // query para verificar se o usuário está logado
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    // nenhum usuário logado
    if (!req.session.userId) return null;

    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  // mutation que registra um novo usuário na db
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegistration(options);

    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;

    try {
      const result = await (em as EntityManager)
        .createQueryBuilder(User)
        .getKnexQuery()
        .insert({
          username: options.username,
          email: options.email,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning("*");
      user = result[0];
      user.createdAt = result[0].created_at;
      user.updatedAt = result[0].updated_at;
    } catch (error) {
      // caso o usuário já exista na db
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "Username taken",
            },
          ],
        };
      }
      // console.log('Mensagem de erro: ' + error.message);
    }

    // vai logar o usuário automaticamente após finalizar o registro
    req.session.userId = user.id;

    return { user };
  }

  // mutation que realiza login
  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(
      User,
      usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }
    );

    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "This user does not exist",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string, @Ctx() { em }: MyContext) {
    const user = await em.findOne(User, { email });
    if (!user) {
      // o email não está cadastrado
      return false;
    }

    
    const token = "sexolol13123"

    sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">Reset your password</a>`
    );
    return true;
  }
}
