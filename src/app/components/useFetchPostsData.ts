import { useEffect, useState, useCallback } from "react";
import { fetchPosts } from "../services/postsApiService";
import { fetchMediaById } from "../services/mediaApiService";
import { fetchUserByUsername } from "../services/userApiService";

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

const useFetchPostsData = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [offset, setOffset] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const loadPosts = useCallback(async () => {
    try {
      console.log(`Fetching posts with offset ${offset}...`);
      const postsData = await fetchPosts(offset);

      if (postsData.length === 0) {
        // If no more posts are available, reset offset to 1
        setOffset(1);
        setLoading(false);
      } else {
        setPosts(postsData);
        setCurrentIndex(0); // Reset to first post
        setLoading(true); // Start processing the fetched posts
      }
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  }, [offset]);

  // Fetch posts on offset change
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Fetch media and user data for the current post
  useEffect(() => {
    const fetchPostData = async () => {
      if (posts.length > 0) {
        const post = posts[currentIndex];

        // Fetch media data
        if (post.mediaId && !post.media) {
          const mediaData = await fetchMediaById(post.mediaId);
          if (mediaData) {
            setPosts((prevPosts) =>
              prevPosts.map((p, i) => (i === currentIndex ? { ...p, media: mediaData } : p))
            );
          }
        }

        // Fetch user data
        if (post.user?.username && !post.userData) {
          const userData = await fetchUserByUsername(post.user.username);
          if (userData) {
            setPosts((prevPosts) =>
              prevPosts.map((p, i) => (i === currentIndex ? { ...p, userData: userData } : p))
            );
          }
        }
      }
    };

    fetchPostData();
  }, [currentIndex, posts]);

  return { posts, currentIndex, setCurrentIndex, loading, setOffset };
};

export default useFetchPostsData;
