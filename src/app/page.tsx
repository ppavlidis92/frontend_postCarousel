'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import styles from './page.module.css';
import extractPosts from './utils/extractPosts'; // Assuming this is the correct path

// Define the Post interface
interface Post {
  title: string;
  description: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Correctly typed useState

  useEffect(() => {
    // This will run only once due to the empty dependency array
    console.log('Fetching posts...');

    axios
      .get(`https://apis.slstice.com/mock/posts?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
      .then((response) => {
        const postsData = extractPosts(response.data); // Use helper function to extract 'posts'
        setPosts(postsData); // Set the state with the extracted 'posts' object
      })
      .catch((error) => {
        console.error('There was an error fetching the posts!', error);
      });
  }, []); // Empty array ensures this runs only once

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Typography>Hello World!!</Typography>
        <div>
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index}>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2">{post.description}</Typography>
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
