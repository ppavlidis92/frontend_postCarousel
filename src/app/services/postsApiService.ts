import axios from "axios";
import { extractPosts } from "../utils";

interface Post {
  title: string;
  description: string;
  mediaId: string;
  user: {
    username: string;
  };
}

export const fetchPosts = async (setOffSet: number): Promise<Post[]> => {
  try {
    // Fetch all posts
    const postsResponse = await axios.get(
      `https://apis.slstice.com/mock/posts?offset=${setOffSet}&limit=2&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const postsData: Post[] = extractPosts(postsResponse.data);

    return postsData;
  } catch (error) {
    console.error("Error fetching posts with media and user data:", error);
    throw error;
  }
};
