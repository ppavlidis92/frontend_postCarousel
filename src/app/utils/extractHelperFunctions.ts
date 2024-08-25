interface Post {
  id: string;
  title: string;
}

interface Media {
  id: string;
  url: string;
}

interface User {
  id: string;
  name: string;
}

interface ApiResponse {
  response?: {
    posts?: Post[];
    media?: Media[];
    user?: User[];
  };
}

// Helper function to extract the 'posts' array from the API response
export const extractPosts = (data: ApiResponse): Post[] => {
  return data?.response?.posts || [];
};

// Helper function to extract the 'media' array from the API response
export const extractMedia = (data: ApiResponse): Media[] => {
  return data?.response?.media || [];
};

// Helper function to extract the 'user' array from the API response
export const extractUser = (data: ApiResponse): User[] => {
  return data?.response?.user || [];
};
