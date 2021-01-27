import { Product } from "./entities/product";
import { __prod__ } from "./constants";
import { MikroORM } from '@mikro-orm/core';
import { User } from "./entities/User";

export default {
    migrations: {
        path: "./src/migrations", // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Product, User],
    dbName: "ecommerce",
    user: 'postgres',
    password: 'admin',
    type: 'postgresql',
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];

