// types.ts

export interface Post {
    title: string;
    description: string;
    mediaId: string;
    user: {
      username: string;
    };
  }
  
  export interface Media {
    urls: {
      thumb: string;
      full: string;
      regular: string;
      small: string;
    };
    type: string;
    statistics: {
      likes: number;
      created: number;
    };
  }
  
  export interface User {
    first_name: string;
    last_name: string;
    profile_images: {
      medium: string;
      small: string; 
      full: string;
    };
  }
  
  export interface ApiResponse {
    response?: {
      posts?: Post[];
      media?: Media;
      user?: User[];
    };
  }
  