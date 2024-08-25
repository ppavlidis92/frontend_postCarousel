import axios from "axios";
import { extractPosts } from "../utils";
import { Post } from '../utils/types';

export const fetchPosts = async (setOffSet: number): Promise<Post[]> => {
  try {
    // Fetch all posts
    console.log(setOffSet);
    const postsResponse = await axios.get(
      `https://apis.slstice.com/mock/posts?offset=${setOffSet}&limit=20&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    console.log(setOffSet);
    const postsData: Post[] = extractPosts(postsResponse.data);

    return postsData;
  } catch (error) {
    console.error("Error fetching posts with media and user data:", error);
    throw error;
  }
};
