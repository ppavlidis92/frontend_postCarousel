
import axios from "axios";
import { extractPosts, extractMedia, extractUser } from "../utils/"; 


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

// In-memory caches for media and user data
const mediaCache = new Map<string, Media>();
const userCache = new Map<string, User>();

export const fetchPostsWithMediaAndUser = async (): Promise<Post[]> => {
  try {
    const postsResponse = await axios.get(
      `https://apis.slstice.com/mock/posts?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const postsData: Post[] = extractPosts(postsResponse.data);

    const postsWithMediaAndUser = await Promise.all(
      postsData.map(async (post) => {
        // Fetch media, using cache if available
        if (post.mediaId && !mediaCache.has(post.mediaId)) {
          const mediaResponse = await axios.get(
            `https://apis.slstice.com/mock/medias/${post.mediaId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          const mediaData = extractMedia(mediaResponse.data);
          mediaCache.set(post.mediaId, mediaData);
        }
        post.media = mediaCache.get(post.mediaId);

        // Fetch user data, using cache if available
        if (post.user?.username && !userCache.has(post.user.username)) {
          const userResponse = await axios.get(
            `https://apis.slstice.com/mock/users/${post.user.username}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          const userData = extractUser(userResponse.data);
          userCache.set(post.user.username, userData);
        }
        post.userData = userCache.get(post.user.username);
        console.log(userCache);

        return post;
      })
    );

    return postsWithMediaAndUser;
  } catch (error) {
    console.error("Error fetching posts with media and user data:", error);
    throw error; 
  }
};
