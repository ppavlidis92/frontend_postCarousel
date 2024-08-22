"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import styles from "./page.module.css";

// Define the Post interface
interface Post {
  title: string;
  description: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Array of Post objects

  useEffect(() => {
    // This will run only once due to the empty dependency array
    console.log("Fetching posts...");
    axios
      .get(
        `https://apis.slstice.com/mock/posts?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      )
      .then((response) => {
        const postsData = response.data; // Use helper function to extract 'posts'
        setPosts(postsData); // Set the state with the extracted 'posts' object
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []); // Empty array ensures this runs only once

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Typography>Hello World!</Typography>
      </div>
    </main>
  );
};

export default Home;
