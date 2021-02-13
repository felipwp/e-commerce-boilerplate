import { MiddlewareFn } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";

// função para checar se o usuário é administrador
export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("User is not authenticated");
  }

  const user = await User.findOne(context.req.session.userId);
  console.log("user", user);
  if (user && !user.isAdmin) {
    throw new Error("Reserved to admins only");
  }

  return next();
};
