"use client";

import React from "react";
import { Typography } from "@mui/material";
import Image from "next/image";
import styles from "./page.module.css";
import usePosts from "./components/usePosts";

const Home = () => {
  const { posts } = usePosts();

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index}>
                {post.title ? (
                  <Typography variant="h6">{post.title}</Typography>
                ) : (
                  <Typography variant="h6">Untitled</Typography>
                )}
                {post.description ? (
                  <Typography variant="body2">{post.description}</Typography>
                ) : (
                  <Typography variant="body2">No Description</Typography>
                )}
                {post.media && (
                  <div>
                    <Image
                      src={post.media.urls.thumb}
                      alt={`Media for ${post.title}`}
                      width={100}
                      height={100}
                    />
                    <Typography>{`Likes: ${post.media.statistics.likes}`}</Typography>
                  </div>
                )}
                {post.userData && (
                  <div>
                    <Typography variant="body2">{`Posted by: ${post.userData.first_name} ${post.userData.last_name}`}</Typography>
                  </div>
                )}
              </div>
            ))
          ) : (
            <Typography>No posts available</Typography>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
