import "reflect-metadata"
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Product } from "./entities/product";
import express from "express";
import { ApolloServer } from 'apollo-server-express';
import microConfig from './mikro-orm.config';
import { buildSchema } from "type-graphql";
import { ProductResolver } from "./resolvers/product";

// função usada para não precisar setar o arquivo todo como assíncrono
const main = async () => {
    // conecta na db
    const orm = await MikroORM.init(microConfig);

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ProductResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    });

    apolloServer.applyMiddleware({app});

    app.listen(8888, () => {
        console.log("Server listening port 8888")
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


    // retorna todos os produtos cadastrados na db
    // const products = await orm.em.find(Product, {});
    // console.log(products);
};

main().catch((err) => {
    console.error(err);
});