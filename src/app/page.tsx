"use client";

import React, { useEffect } from "react";
import { Typography, Box, Avatar } from "@mui/material";
import Image from "next/image";
import styles from "./page.module.css";
import useFetchPostsData from "./components/useFetchPostsData";
import { convertEpochToDate } from "./utils";

const Home = () => {
  const { posts, currentIndex, setCurrentIndex, setOffset } =
    useFetchPostsData();

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

  return (
    <Box className={styles.pageContainer}>
      {posts && posts.length > 0 && posts[currentIndex] ? (
        <Box
          className={styles.container}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
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
                  backgroundImage: `url(${posts[currentIndex].media.urls.full})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "absolute",
                  width: "101%",
                  height: "1300px",
                  filter: "blur(8px)", // Apply the blur effect here
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
                <img
                  src={posts[currentIndex].media.urls.full}
                  alt={`Media for ${posts[currentIndex].title}`}
                  width={1100}
                  height={800}
                />
              </Box>
            </Box>
          )}

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
                > Posted on {convertEpochToDate(posts[currentIndex].media.statistics.created)}</Typography>
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
