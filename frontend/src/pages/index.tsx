import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import styles from "../../public/css/pages/index.module.css";
import { Card } from "../components/Card";
import { Icon } from "../components/Icon";
import { Layout } from "../components/Layout";
import { SliderBackground } from "../components/SliderBackground";
import { createUrqlClient } from "../utils/createUrqlClient";

// "https://i.imgur.com/kkRdvXU.png",
// "https://i.imgur.com/IoHC8hg.png",
const Index = () => {
  return (
    <>
      <Layout header={false}>
        <SliderBackground
          // fetch image names from db using graphql
          images={["10.png", "11.png"]}
        >
          <section className={styles.heroSection}>
            <h2>MIASTUDIOS</h2>
            <h1>CREATIVITY</h1>
            <h1>TAKES COURAGE</h1>
            <NextLink href="/portfolio">PORTFOLIO</NextLink>
            <div>
              <Icon name="discord" />
              <Icon name="twitter" />
              <Icon name="youtube" />
              <Icon name="instagram" />
            </div>
          </section>
        </SliderBackground>
        {/* services */}
        <section className={styles.servicesSection}>
          <h1>OUR SERVICES</h1>
          <div>
            <Card
              name="commissions"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu, facilisis ut id lorem non. In amet tempus ac sit mi, feugiat. Consectetur in eu, mi in nulla eros, orci. Ut vivamus feugiat donec lacus in. Dignissim nibh odio."
            />
            <Card
              name="education"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu, facilisis ut id lorem non. In amet tempus ac sit mi, feugiat. Consectetur in eu, mi in nulla eros, orci. Ut vivamus feugiat donec lacus in. Dignissim nibh odio."
            />
            <Card
              name="marketplace"
              text="Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu, facilisis ut id lorem non. In amet tempus ac sit mi, feugiat. Consectetur in eu, mi in nulla eros, orci. Ut vivamus feugiat donec lacus in. Dignissim nibh odio."
            />
          </div>
        </section>
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
