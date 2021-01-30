import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import microConfig from "./mikro-orm.config";
import { buildSchema } from "type-graphql";
import { ProductResolver } from "./resolvers/product";
import { UserResolver } from "./resolvers/user";
import connectRedis from "connect-redis";
import redis from "redis";
import session from "express-session";
import cors from "cors";

// função usada para não precisar setar o arquivo todo como assíncrono
const main = async () => {
  // conecta na db
  const orm = await MikroORM.init(microConfig);
  // verifica se existe alguma migração para ser feita
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  // pra aplicar o CORS em todas as rotas
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
        disableTTL: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365.25 * 10, // máximo 10 anos de duração
        httpOnly: true, // para que não seja possível acessar o cookie no front-end, evita scripts invasores
        secure: false, // para que só funcione em https (localhost não usa https)
        sameSite: "lax", // CSRF
      },
      saveUninitialized: false, // não inicia uma session por default, apenas quando for necessário salvar dados
      secret: "saodfhaodskfpoasdoikasjfoiasdjoifuasiuyewqlknkmnvzxiuyqwe",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    // desativando o CORS no apollo, usando o módulo do express, para usá-lo em todas as rotas
    cors: false,
  });

  app.listen(8888, () => {
    console.log("Server listening port 8888");
  });

  // migrations
  //
  // também é possível rodar o comando npx mikro-orm migration:up
  // para criar as migrations basta rodar npx mikro-orm migration:create
  //
  // await orm.getMigrator().up();

  // roda query sql
  // const product = orm.em.create(Product, {name: 'Produto de teste 3'});
  // await orm.em.persistAndFlush(product);

  // retornar todos os produtos cadastrados na db
  // const products = await orm.em.find(Product, {});
  // console.log(products);

  // porta do Redis:
  // 6379
};

main().catch((err) => {
  console.error(err);
});
