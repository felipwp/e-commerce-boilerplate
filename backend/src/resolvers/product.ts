import { Product } from "../entities/product";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";

@Resolver()
export class ProductResolver {

    // lista todos os produtos
    // Ctx é o context, onde é passada a instância da DB
    @Query(() => [Product])
    getAllProducts(@Ctx() { em }: MyContext
        // A query irá retornar uma Promise, que contém um Array de <Product>
    ): Promise<Product[] | null> {
        return em.find(Product, {});
    }

    // lista apenas um produto
    @Query(() => Product, { nullable: true })
    getProduct(
        @Arg('id') id: number,
        @Ctx() { em }: MyContext
    ): Promise<Product | null> {
        return em.findOne(Product, { id });
    }


    // Cria um produto
    @Mutation(() => Product)
    async createProduct(
        // O argumento da tipagem Typescript (name: string)
        @Arg('name') name: string,
        @Ctx() { em }: MyContext
    ): Promise<Product> {
        const product = em.create(Product, { name });
        await em.persistAndFlush(product);
        return product;
    }

    // Atualiza um produto
    @Mutation(() => Product, { nullable: true })
    async updateProduct(
        @Arg('id') id: number,
        // toda vez que um campo possa ser editado ou não, deve-se adicionar
        // { nullable: true } ao argumento
        @Arg('name', { nullable: true }) name: string,
        @Ctx() { em }: MyContext

        // caso a função possa retornar null,
        // ele deve ser adicionado abaixo 
        // Promise<Product | null>, indica que pode voltar uma Promise de <Product> ou null
    ): Promise<Product | null> {
        const product = await em.findOne(Product, { id });

        // caso não exista nenhum produto com aquele id
        if (!product) return null;

        if (typeof name !== 'undefined') {
            product.name = name;
            await em.persistAndFlush(product);
        }
        return product;
    }

    // Deleta um Produto
    @Mutation(() => Boolean)
    async deleteProduct(
        @Arg('id') id: number,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        try {
            em.nativeDelete(Product, { id });
        } catch {
            return false;
        }
        return true;
    }

}