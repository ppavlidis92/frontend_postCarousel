"use client";

import React, { useEffect } from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";
import styles from "./page.module.css";
import { convertEpochTime, getImageDimensions, useFetchPostsData } from "../utils";
import PostImage from "../components/postImage/PostImage";
import PostInfo from "../components/postInfo/PostInfo";


const Home = () => {
  const { posts, currentIndex, setCurrentIndex, setOffset } = useFetchPostsData();

  // Media queries for different screen sizes
  const isLargeScreen = useMediaQuery("(min-width:1200px)");
  const isMediumScreen = useMediaQuery("(min-width:768px) and (max-width:1199px)");
  const isSmallScreen = useMediaQuery("(max-width:767px)");

  useEffect(() => {
    if (posts.length > 0) {
      const intervalId = setInterval(() => {
        if (currentIndex < posts.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          setOffset((prevOffset) => prevOffset + 1);
        }
      }, 16000); // Display each post for 6 seconds

      return () => clearInterval(intervalId);
    }
  }, [currentIndex, posts.length, setCurrentIndex, setOffset]);

  const getImageUrl = (): string => {
    if (posts[currentIndex]?.media) {
      if (isLargeScreen) {
        return posts[currentIndex].media.urls.full;
      } else if (isMediumScreen) {
        return posts[currentIndex].media.urls.regular;
      } else if (isSmallScreen) {
        return posts[currentIndex].media.urls.small;
      }
      return posts[currentIndex].media.urls.full; // Fallback to full if no match
    }
    return "/default-image.png"; // Default image returned in case we have no post image // currently not working
  };

  const { width, height } = getImageDimensions(isLargeScreen, isMediumScreen, isSmallScreen);

  if (!posts[currentIndex]) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.container} display="flex" alignItems="center" justifyContent="center">
        <PostImage
          imageUrl={getImageUrl()}
          width={width}
          height={height}
          title={posts[currentIndex].title || "Untitled"}
        />
        <PostInfo
          userData={posts[currentIndex].userData}
          title={posts[currentIndex].title || "Untitled"}
          description={posts[currentIndex].description || "No Description"}
          likes={posts[currentIndex].media?.statistics.likes || 0}
          createdAt={convertEpochTime(posts[currentIndex].media?.statistics.created || 0)}
        />
      </Box>
    </Box>
  );
};

export default Home;
