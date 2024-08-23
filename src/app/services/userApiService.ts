import axios from "axios";
import { extractUser } from "../utils";

interface User {
  first_name: string;
  last_name: string;
  profile_images: {
    medium: string;
    small: string; 
    full: string;
  };
}

export const fetchUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const userResponse = await axios.get(
      `https://apis.slstice.com/mock/users/${username}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const userData: User = extractUser(userResponse.data);
    return userData;
  } catch (error) {
    console.error(`Error fetching user with username ${username}:`, error);
    return null;
  }
};
