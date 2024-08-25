import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";

interface PostImageProps {
  imageUrl: string;
  width: number;
  height: number;
  bgWidth: string;
  bgHeight: string;
  title: string;
}

const PostImage: React.FC<PostImageProps> = ({ imageUrl, width, height, bgWidth, bgHeight, title }) => {
  return (
    <Box
      position="relative"
      height="800px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          width: bgWidth,
          height: bgHeight,
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
