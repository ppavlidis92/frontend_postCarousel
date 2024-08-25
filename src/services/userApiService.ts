import axios from "axios";
import { extractUser } from "../utils";
import { User } from '../utils/types';


export const fetchUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const userResponse = await axios.get(
      `https://apis.slstice.com/mock/users/${username}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    // Assuming extractUser returns an array of users
    const usersData = extractUser(userResponse.data);
    
    if (usersData) {
      return usersData; // Return the first user in the array
    } else {
      console.warn(`No user found with username ${username}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching user with username ${username}:`, error);
    return null;
  }
};
