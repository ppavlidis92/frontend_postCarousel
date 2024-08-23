// Helper function to extract the 'posts' object from the API response
export const extractPosts = (data) => {
    return data?.response?.posts || [];
  };

  export const extractMedia = (data) => {
    return data?.response?.media || [];
  };

  export const extractUser = (data) => {
    return data?.response?.user || [];
  };
