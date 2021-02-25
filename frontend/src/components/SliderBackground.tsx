import React, { useState } from "react";
import styles from "../../public/css/components/SliderBackground.module.css";

interface SliderBackground {
  images: string[];
}

export const SliderBackground: React.FC<SliderBackground> = ({
  images,
  children,
}) => {
  const [index, setIndex] = useState(0);
  const slideRight = () => {
    setIndex((index + 1) % images.length); // increases index by 1
  };

  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(images.length - 1); // returns last index of images array if index is less than 0
    } else {
      setIndex(nextIndex);
    }
  };
  return (
    <>
      <button className={styles.sliderButton} onClick={slideLeft}>
        {"<"}
      </button>
      <button className={styles.sliderButton} onClick={slideRight}>
        {">"}
      </button>
      {images.length > 0 && (
        <>
          <div className={styles.sliderOverlay}></div>
          <div
            className={styles.sliderContainer}
            style={{
              backgroundImage: `url(${images[index]})`,
            }}
          ></div>
          <div className={styles.sliderContent}>{children}</div>
        </>
      )}
    </>
  );
};
