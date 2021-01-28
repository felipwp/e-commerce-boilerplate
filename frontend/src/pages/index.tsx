import { Layout } from "../components/Layout";
import { Media } from "../components/Media";
import styles from "./index.module.css";

const Index = () => {
  return (
    <>
      <Layout style={styles.indexWrapper}>
        <div className={styles.hero}>
          <p>MIA STUDIOS</p>
          <p>BUILDING</p>
          <p>TEAM.</p>
          <a className={styles.mainButton}>CONTACT US</a>
        </div>
        <img src="assets/img/builds/hero-section-build.png" className={styles.heroBuild}/>

      </Layout>
      <Media />
    </>
  );
};

export default Index;
