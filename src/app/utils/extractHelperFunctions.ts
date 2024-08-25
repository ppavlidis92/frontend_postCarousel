import { ApiResponse, Post, Media, User } from './types';

// Helper function to extract the 'posts' array from the API response
export const extractPosts = (data: ApiResponse): Post[] => {
  return data?.response?.posts || [];
};

// Helper function to extract the 'media' array from the API response
export const extractMedia = (data: ApiResponse): Media | null => {
  return data?.response?.media || null;
};
// Helper function to extract the 'user' array from the API response
export const extractUser = (data: ApiResponse): User[] => {
  return data?.response?.user || [];
};
