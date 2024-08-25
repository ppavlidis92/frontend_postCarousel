import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import Image from "next/image";

interface UserData {
  first_name: string;
  last_name: string;
  profile_images: {
    medium: string;
  };
}

interface PostInfoProps {
  userData?: UserData;
  title: string;
  description: string;
  likes: number;
  createdAt: string;
}


const PostInfo: React.FC<PostInfoProps> = ({ userData, title, description, likes, createdAt }) => {
  return (
    <Box flex="1" padding={2}>
      {userData && (
        <Box display="flex" alignItems="center" marginBottom={2} gap={1}>
          <Typography variant="body2" marginLeft={2}>
            {`${userData.first_name} ${userData.last_name}`}
          </Typography>
          <Avatar alt={userData.first_name || "User"} src={userData.profile_images.medium} />
        </Box>
      )}

      <Typography variant="h6" marginTop={30}>
        {title || "Untitled"}
      </Typography>

      <Typography variant="body2">
        {description || "No Description"}
      </Typography>

      <Box display="flex" alignItems="center" marginTop={2}>
        <Image src="/likebutton.png" alt="Like Button" width={30} height={30} />
        <Typography variant="body2" marginLeft={1}>
          {`${likes} Likes`}
        </Typography>
      </Box>

      <Typography variant="body2" marginTop={2}>
        {`Posted on ${createdAt}`}
      </Typography>
    </Box>
  );
};

export default PostInfo;
