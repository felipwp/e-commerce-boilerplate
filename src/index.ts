import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Product } from "./entities/product";
import microConfig from './mikro-orm.config';

// função usada para não precisar setar o arquivo todo como assíncrono
const main = async () => {

    // conecta na db
    const orm = await MikroORM.init(microConfig);

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