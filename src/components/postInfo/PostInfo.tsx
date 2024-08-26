import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import Image from "next/image";
import styles from "./styles.module.css";
import { PostInfoProps } from "@/utils/types";


const PostInfo: React.FC<PostInfoProps> = ({
  userData,
  title,
  description,
  likes,
  createdAt,
}) => {
  return (
    <Box className={styles.postInfoContainer} flex="1" padding={2}>
      {userData && (
        <Box
          className={styles.profileContainer}
          display="flex"
          alignItems="center"
          marginBottom={2}
          gap={1}
        >
          <Typography
            variant="body2"
            className={styles.profileName}
            marginLeft={2}
          >
            {`${userData.first_name} ${userData.last_name}`}
          </Typography>
          <Avatar
            className={styles.avatar}
            alt={userData?.first_name || "User"}
            src={userData?.profile_images?.medium}
          />
        </Box>
      )}

      <Typography variant="h6" className={styles.postTitle} marginTop={30}>
        {title || "Untitled"}
      </Typography>

      <Typography variant="body2" className={styles.postDescription}>
        {description || "No Description"}
      </Typography>

      <Box className={styles.likesContainer}>
        <Image src="/likebutton.png" alt="Like Button" width={30} height={30} />

        <Typography
          variant="body2"
          className={styles.likes}
        >{`${likes} Personnes`}</Typography>
      </Box>
      <Box className={styles.createdAt}>
        <Typography variant="body2">{`Posted on ${createdAt}`}</Typography>
      </Box>
    </Box>
  );
};

export default PostInfo;
