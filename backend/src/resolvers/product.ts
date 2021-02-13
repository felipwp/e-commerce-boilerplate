import { createWriteStream } from "fs";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Product } from "../entities/Product";
import { ProductImage } from "../entities/ProductImage";
import { isAdmin } from "../middleware/isAdmin";
import { cleanDate } from "../utils/cleanDate";

@InputType()
class ProductInput {
  @Field()
  name!: string;

  @Field()
  description: string;

  @Field()
  url: string;

  @Field()
  price: number;

  @Field()
  size: string;
}

@Resolver()
export class ProductResolver {
  @Mutation(() => Boolean)
  async uploadPhoto(
    @Arg("productId")
    productId: number,
    @Arg("file", () => GraphQLUpload) { createReadStream, filename }: FileUpload
  ): Promise<boolean> {
    const fullFileName = `upload_${cleanDate()}.${filename.split(".")[1]}`;
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(
          createWriteStream(
            __dirname + `/../../storage/uploads/${fullFileName}`
          )
        )
        .on("finish", async () => {
          const product = await Product.findOne(productId);

          // caso não exista nenhum produto com aquele id
          if (!product) reject(false);

          ProductImage.create({
            url: fullFileName,
            productId,
          }).save();

          resolve(true);
        })
        .on("error", () => reject(false))
    );
  }

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
  @UseMiddleware(isAdmin)
  async createProduct(@Arg("input") input: ProductInput): Promise<Product> {
    return Product.create({
      ...input,
    }).save();
  }

  // Atualiza um produto
  @Mutation(() => Product, { nullable: true })
  @UseMiddleware(isAdmin)
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
  @UseMiddleware(isAdmin)
  async deleteProduct(@Arg("id") id: number): Promise<boolean> {
    await Product.delete(id);
    return true;
  }
}
