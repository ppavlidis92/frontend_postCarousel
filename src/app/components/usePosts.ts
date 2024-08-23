import { useEffect, useState } from "react";
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

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [offset, setOffset] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch posts on offset change
  useEffect(() => {
    const loadPosts = async () => {
      try {
        console.log(`Fetching posts with offset ${offset}...`);
        const postsData = await fetchPosts(offset);

        if (postsData.length === 0) {
          // If no more posts are available, reset offset to 1
          setOffset(1);
          setLoading(false);
        } else {
          setPosts(postsData);
          setLoading(true); // Start processing the fetched posts
        }
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadPosts();
  }, [offset]);

  // Handle immediate fetching for the first post
  useEffect(() => {
    const fetchFirstPostData = async () => {
      if (posts.length > 0 && currentIndex === 0) {
        const post = posts[0];

        // Fetch media data immediately for the first post
        if (post.mediaId) {
          const mediaData = await fetchMediaById(post.mediaId);
          if (mediaData) {
            setPosts((prevPosts) =>
              prevPosts.map((p, i) => (i === 0 ? { ...p, media: mediaData } : p))
            );
          }
        }

        // Fetch user data immediately for the first post
        if (post.user?.username) {
          const userData = await fetchUserByUsername(post.user.username);
          if (userData) {
            setPosts((prevPosts) =>
              prevPosts.map((p, i) => (i === 0 ? { ...p, userData: userData } : p))
            );
          }
        }

        setCurrentIndex(1); // Move to the next post for the delayed processing
      }
    };

    fetchFirstPostData();
  }, [posts]);

  // Handle delayed fetching for remaining posts
  useEffect(() => {
    if (currentIndex > 0 && loading) {
      const fetchRemainingPostData = async () => {
        if (currentIndex < posts.length) {
          const post = posts[currentIndex];

          // Fetch media data
          if (post.mediaId) {
            const mediaData = await fetchMediaById(post.mediaId);
            if (mediaData) {
              setPosts((prevPosts) =>
                prevPosts.map((p, i) =>
                  i === currentIndex ? { ...p, media: mediaData } : p
                )
              );
            }
          }

          // Fetch user data
          if (post.user?.username) {
            const userData = await fetchUserByUsername(post.user.username);
            if (userData) {
              setPosts((prevPosts) =>
                prevPosts.map((p, i) =>
                  i === currentIndex ? { ...p, userData: userData } : p
                )
              );
            }
          }

          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          setLoading(false); // Stop the current loading process
          setCurrentIndex(0); // Reset the index for the next set
          setOffset((prevOffset) => prevOffset + 1); // Increment the offset
        }
      };

      const intervalId = setInterval(fetchRemainingPostData, 4000);

      return () => clearInterval(intervalId);
    }
  }, [currentIndex, loading, posts.length]);

  return { posts };
};

export default usePosts;
