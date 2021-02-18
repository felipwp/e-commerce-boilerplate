import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Product } from "../entities/Product";
import { ProductImage } from "../entities/ProductImage";
import { isAdmin } from "../middleware/isAdmin";
import { Error } from "../types";

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

@ObjectType()
class ProductResponse {
  @Field(() => [Error], { nullable: true })
  errors?: Error[];

  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => [ProductImage], { nullable: true })
  images?: ProductImage[];
}

@Resolver()
export class ProductResolver {
  // lista todos os produtos
  // Ctx é o context, onde é passada a instância da DB
  // A query irá retornar uma Promise, que contém um Array de <Product> ou null
  @Query(() => [Product])
  getAllProducts(): Promise<Product[] | null> {
    return Product.find();
  }

  @Query(() => ProductResponse)
  async getProduct(@Arg("id") id: number): Promise<ProductResponse> {
    const product = await Product.findOne(id);
    console.log("product", product);

    if (!product) {
      return {
        errors: [
          {
            field: "id",
            message: "Invalid product ID",
          },
        ],
      };
    }

    const images = await ProductImage.find({ where: { productId: id } });

    console.log("images", images);

    if (!images) {
      return { product };
    }

    return {
      product: product,
      images: images,
    };
  }

  // Cria um produto
  @Mutation(() => Product)
  @UseMiddleware(isAdmin)
  createProduct(@Arg("input") input: ProductInput): Promise<Product> {
    return Product.create({
      ...input,
    }).save();
  }

  @Mutation(() => Product)
  createProductImage(
    @Arg("productId", () => Int) productId: number,
    @Arg("url") url: string
  ): Promise<ProductImage> {
    return ProductImage.create({
      productId,
      url,
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
