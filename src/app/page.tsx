"use client";

import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Image from "next/image";
import styles from "./page.module.css";
import { fetchPostsWithMediaAndUser } from "./services/apiService"; // Adjust the path as necessary

interface Media {
  urls: {
    thumb: string;
  };
  type: string;
  statistics: {
    likes: number;
  };
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface Post {
  title: string;
  description: string;
  mediaId: string;
  user: {
    username: string;
  };
  media?: Media;
  userData?: User;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        console.log("Fetching posts...");
        const postsWithMediaAndUser = await fetchPostsWithMediaAndUser();
        setPosts(postsWithMediaAndUser);
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadPosts();
  }, []); // Empty array ensures this runs only once

  console.log(posts);

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
                    <Typography>{`Likes: ${post.media.statistics.likes}`} </Typography>
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
