import { withUrqlClient } from "next-urql";
import styles from "../../public/css/pages/index.module.css";
import { Layout } from "../components/Layout";
import { Media } from "../components/Media";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  return (
    <>
      <Layout style="indexWrapper" css="flex-cs">
        <div className={styles.hero}>
          <p>MIA STUDIOS</p>
          <p>BUILDING</p>
          <p>TEAM.</p>
          <a href="/contact" className={styles.mainButton}>
            CONTACT US
          </a>
        </div>
        <img
          src="assets/img/builds/hero-section-build.png"
          className={styles.heroBuild}
        />
      </Layout>
      <Media />
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
