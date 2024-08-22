// Helper function to extract the 'posts' object from the API response
const extractPosts = (data) => {
    return data?.response?.posts || [];
  };

  export default extractPosts;