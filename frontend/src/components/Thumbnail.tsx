import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../public/css/components/Thumbnail.module.css";

interface ThumbnailProps {
  file: any;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ file }) => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<any | null>(null);

  useEffect(() => {
    if (!file) return;

    setLoading(true);
    let fileReader = new FileReader();
    fileReader.onloadend = () => {
      setLoading(false);
      setThumbnail(fileReader.result);
      console.log(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, []);

  if (!file) return null;
  if (loading) return <p>loading...</p>;

  return (
    <Image
      src={thumbnail}
      alt={file.name}
      className={styles.thumbnail}
      height={500}
      width={500}
    />
  );
};

export default Thumbnail;
