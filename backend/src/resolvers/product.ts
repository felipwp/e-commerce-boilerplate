import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Product } from "../entities/product";

@Resolver()
export class ProductResolver {
  // lista todos os produtos
  // Ctx é o context, onde é passada a instância da DB
  // A query irá retornar uma Promise, que contém um Array de <Product> ou null
  @Query(() => [Product])
  getAllProducts(): Promise<Product[] | null> {
    return Product.find();
  }

  // lista apenas um produto
  @Query(() => Product, { nullable: true })
  getProduct(@Arg("id") id: number): Promise<Product | undefined> {
    return Product.findOne(id);
  }

  // Cria um produto
  @Mutation(() => Product)
  async createProduct(@Arg("name") name: string): Promise<Product> {
    return Product.create({ name }).save();
  }

  // Atualiza um produto
  @Mutation(() => Product, { nullable: true })
  async updateProduct(
    @Arg("id") id: number,
    // toda vez que um campo possa ser editado ou não, deve-se adicionar
    // { nullable: true } ao argumento
    @Arg("name", { nullable: true }) name: string
  ): Promise<Product | null> {
    const product = await Product.findOne(id);
    // alternativamente, pode-se usar {where: {campo}}, caso for diferente do ID
    // const product = await Product.findOne({where: { id }});

    // caso não exista nenhum produto com aquele id
    if (!product) return null;

    if (typeof name !== "undefined") {
      Product.update({ id }, { name });
    }
    return product;
  }

  // Deleta um Produto
  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id") id: number): Promise<boolean> {
    await Product.delete(id);
    return true;
  }
}
