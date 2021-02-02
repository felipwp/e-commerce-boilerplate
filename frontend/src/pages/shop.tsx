import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { useGetAllProductsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Shop = () => {
  const [{ data }] = useGetAllProductsQuery();

  return (
    <Layout style="indexWrapper" css="flex-cc direction-column">
      {!data ? (
        <div>Loading...</div>
      ) : (
        data.getAllProducts.map((p) => <div key={p.id}>{p.name}</div>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Shop);