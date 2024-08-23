"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Typography } from "@mui/material";
import styles from "./page.module.css";
import { extractPosts, extractMedia, extractUser } from "./utils"; // Assuming this is the correct path

// Define the Post interface
interface Post {
  title: string;
  description: string;
  mediaId: string;
  user: {
    username: string;
  };
  media?: Media; // Optional property to hold media data
  userData?: User; // Optional property to hold user data
}

interface Media {
  urls: {
    thumb: string;
  };
  type: string;
  statistics: {
    likes: number;
  }
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
  // Add any other user properties you expect to retrieve
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Correctly typed useState

  useEffect(() => {
    console.log("Fetching posts...");
    
    // Fetch posts
    axios
      .get(
        `https://apis.slstice.com/mock/posts?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      )
      .then(async (response) => {
        const postsData: Post[] = extractPosts(response.data); // Use helper function to extract 'posts'

        // Fetch media and user data for each post
        const postsWithMediaAndUser = await Promise.all(
          postsData.map(async (post) => {
            // Fetch media
            if (post.mediaId) {
              const mediaResponse = await axios.get(
                `https://apis.slstice.com/mock/medias/${post.mediaId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
              );
              post.media = extractMedia(mediaResponse.data);
            }

            // Fetch user data
            if (post.user?.username) {
              const userResponse = await axios.get(
                `https://apis.slstice.com/mock/users/${post.user.username}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
              );
              post.userData = extractUser(userResponse.data);
            }

            return post;
          })
        );

        setPosts(postsWithMediaAndUser); // Set the state with posts, media, and user data
      })
      .catch((error) => {
        console.error("There was an error fetching the posts, media, or user data!", error);
      });
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
                    <Typography variant="body2">{`Posted by: ${post.userData.first_name}${post.userData.last_name}`}</Typography>
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
