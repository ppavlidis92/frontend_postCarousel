"use client";

import React, { useEffect } from "react";
import { Typography, Box, Avatar, useMediaQuery } from "@mui/material";
import Image from "next/image";
import styles from "./page.module.css";
import useFetchPostsData from "./utils/useFetchPostsData";
import { convertEpochTime } from "./utils";

const Home = () => {
  const { posts, currentIndex, setCurrentIndex, setOffset } =
    useFetchPostsData();

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
          // When the last post is displayed, load the next set of posts
          setOffset((prevOffset) => prevOffset + 1);
        }
      }, 6000); // Display each post for 6 seconds

      return () => clearInterval(intervalId);
    }
  }, [currentIndex, posts.length, setCurrentIndex, setOffset]);

  // Determine which image URL to use based on the screen size
  const getImageUrl = (): string => {
    if (posts[currentIndex] && posts[currentIndex].media) {
      if (isLargeScreen) {
        return posts[currentIndex].media.urls.full;
      } else if (isMediumScreen) {
        return posts[currentIndex].media.urls.regular;
      } else if (isSmallScreen) {
        return posts[currentIndex].media.urls.small;
      }
      return posts[currentIndex].media.urls.full; // Fallback to full if no match
    }
    return 'Image Not found'; // Ensure this returns a valid string
  };

  // Determine the width and height of the image based on screen size
  const getImageDimensions = () => {
    if (isLargeScreen) {
      return { width: 1100, height: 800, bgHeight: "1800px", bgWidth: "1200px" };
    } else if (isMediumScreen) {
      return { width: 700, height: 500, bgHeight: "1800px", bgWidth: "1200px" };
    } else if (isSmallScreen) {
      return { width: 400, height: 300, bgHeight: "1800px", bgWidth: "1200px" };
    }
    return { width: 1200, height: 800 }; // Default to large dimensions
  };

  const { width, height, bgHeight, bgWidth } = getImageDimensions();

  return (
    <Box className={styles.pageContainer}>
      {posts && posts.length > 0 && posts[currentIndex] ? (
        <Box
          className={styles.container}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box className={styles.photoContainer}>
          {posts[currentIndex].media && (
            <Box
              className={styles.photoContainer}
              position="relative"
              width="100%"
              height="800px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                sx={{
                  backgroundImage: `url(${getImageUrl()})`,  // 
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
                  src={getImageUrl()}
                  alt={`Media for ${posts[currentIndex].title}`}
                  width={width}
                  height={height}
                />
              </Box>
            </Box>
          )}
</Box>
          <Box className={styles.postInfoContainer} flex="1" padding={2}>
            {posts[currentIndex].userData && (
              <Box
                className={styles.profileContainer}
                display="flex"
                alignItems="center"
                marginBottom={2}
                gap={1}
              >
                <Typography
                  variant="body2"
                  className={styles.profileName}
                  marginLeft={2}
                >
                  {`${posts[currentIndex].userData.first_name} ${posts[currentIndex].userData.last_name}`}
                </Typography>
                <Avatar
                  className={styles.avatar}
                  alt={posts[currentIndex].userData?.first_name || "User"}
                  src={posts[currentIndex].userData?.profile_images?.medium}
                />
              </Box>
            )}

            <Typography
              variant="h6"
              className={styles.postTitle}
              marginTop={30}
            >
              {posts[currentIndex].title || "Untitled"}
            </Typography>

            <Typography variant="body2" className={styles.postDescription}>
              {posts[currentIndex].description || "No Description"}
            </Typography>

            {posts[currentIndex].media && (
              <Box className={styles.likesContainer}>
                <Image
                  src="/likebutton.png"
                  alt="Like Button"
                  width={30}
                  height={30}
                />

                <Typography
                  variant="body2"
                  className={styles.likes}
                >{`${posts[currentIndex].media.statistics.likes} Personnes`}</Typography>
              </Box>
            )}

            {posts[currentIndex].media && (
              <Box className={styles.createdAt}>
                <Typography
                  variant="body2"
                >{`Posted on ${convertEpochTime(posts[currentIndex].media.statistics.created)}`}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default Home;
