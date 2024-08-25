"use client";

import React, { useEffect } from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";
import styles from "./page.module.css";
import useFetchPostsData from "./utils/useFetchPostsData";
import { convertEpochTime } from "./utils";
import PostImage from "./components/postImage/PostImage";
import PostInfo from "./components/postInfo/PostInfo";

const getImageDimensions = (isLargeScreen: boolean, isMediumScreen: boolean, isSmallScreen: boolean) => {
  if (isLargeScreen) {
    return { width: 1100, height: 800, bgHeight: "1800px", bgWidth: "1200px" };
  } else if (isMediumScreen) {
    return { width: 700, height: 500, bgHeight: "1800px", bgWidth: "1200px" };
  } else if (isSmallScreen) {
    return { width: 400, height: 300, bgHeight: "1800px", bgWidth: "1200px" };
  }
  return { width: 1200, height: 800, bgHeight: "1800px", bgWidth: "1200px" }; // Default to large dimensions
};

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
      }, 6000); // Display each post for 6 seconds

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
    return "/default-image.png"; // Ensure this returns a valid string
  };

  const { width, height, bgHeight, bgWidth } = getImageDimensions(isLargeScreen, isMediumScreen, isSmallScreen);

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
          bgWidth={bgWidth}
          bgHeight={bgHeight}
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
