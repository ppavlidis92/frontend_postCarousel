"use client";

import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import Image from "next/image";
import styles from "./page.module.css";
import useFetchPostsData from "./components/useFetchPostsData";

const Home = () => {
  const { posts, currentIndex, setCurrentIndex, setOffset } = useFetchPostsData();

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
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          {posts && posts.length > 0 && posts[currentIndex] ? (
            <div>
              {posts[currentIndex].title ? (
                <Typography variant="h6">{posts[currentIndex].title}</Typography>
              ) : (
                <Typography variant="h6">Untitled</Typography>
              )}
              {posts[currentIndex].description ? (
                <Typography variant="body2">{posts[currentIndex].description}</Typography>
              ) : (
                <Typography variant="body2">No Description</Typography>
              )}
              {posts[currentIndex].media && (
                <div>
                  <Image
                    src={posts[currentIndex].media.urls.thumb}
                    alt={`Media for ${posts[currentIndex].title}`}
                    width={100}
                    height={100}
                  />
                  <Typography>{`Likes: ${posts[currentIndex].media.statistics.likes}`}</Typography>
                </div>
              )}
              {posts[currentIndex].userData && (
                <div>
                  <Typography variant="body2">{`Posted by: ${posts[currentIndex].userData.first_name} ${posts[currentIndex].userData.last_name}`}</Typography>
                </div>
              )}
            </div>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
