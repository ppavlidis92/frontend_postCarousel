import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import styles from "./styles.module.css";

interface PostImageProps {
  imageUrl: string;
  width: number;
  height: number;
  title: string;
}

const PostImage: React.FC<PostImageProps> = ({ imageUrl, width, height, title }) => {
  return (
    <Box className={styles.outerPhotoContainer} 
      position="relative"
      height="800px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box className={styles.photoContainer} 
        sx={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          width: "1200px",
          height: "1400px",
          filter: "blur(8px)",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          zIndex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={imageUrl}
          alt={`Media for ${title}`}
          width={width}
          height={height}
        />
      </Box>
    </Box>
  );
};

export default PostImage;
