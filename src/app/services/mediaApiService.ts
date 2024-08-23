import axios from "axios";
import { extractMedia } from "../utils";

interface Media {
  urls: {
    thumb: string;
  };
  type: string;
  statistics: {
    likes: number;
  };
}

export const fetchMediaById = async (mediaId: string): Promise<Media | null> => {
  try {
    const mediaResponse = await axios.get(
      `https://apis.slstice.com/mock/medias/${mediaId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const mediaData: Media = extractMedia(mediaResponse.data);
    return mediaData;
  } catch (error) {
    console.error(`Error fetching media with id ${mediaId}:`, error);
    return null;
  }
};
