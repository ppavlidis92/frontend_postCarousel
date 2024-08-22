'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import styles from './page.module.css';
import { extractPosts, extractMedia } from "./utils"; // Assuming this is the correct path

// Define the Post interface
interface Post {
  title: string;
  description: string;
  mediaId: string;
  media?: Media;   // Optional property to hold media data
}

interface Media {
  url: string;
  type: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Correctly typed useState

  useEffect(() => {
    // This will run only once due to the empty dependency array
    console.log('Fetching posts...');
        // Fetch posts
    axios
      .get(`https://apis.slstice.com/mock/posts?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
      .then(async (response) => {
        const postsData: Post[] = extractPosts(response.data); // Use helper function to extract 'posts'

        // Fetch media for each post
        const postsWithMedia = await Promise.all(
          postsData.map(async (post) => {
            if (post.mediaId) {
              const mediaResponse = await axios.get(
                `https://apis.slstice.com/mock/medias/${post.mediaId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
              );
              post.media = extractMedia(mediaResponse.data);
            }
            return post;
          })
        );

        setPosts(postsWithMedia); // Set the state with posts and their associated media
      })
      .catch((error) => {
        console.error('There was an error fetching the posts or media!', error);
      });
  }, []); // Empty array ensures this runs only once

  console.log(posts)

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
                {post.media && (
                  <div>
                    <Typography variant="body2">Media Type: {post.media.type}</Typography>
                    <img src={post.media.url} alt={`Media for ${post.title}`} />
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
