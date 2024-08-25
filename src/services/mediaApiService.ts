import axios from "axios";
import { extractMedia } from "../utils";
import { Media } from '../utils/types';

export const fetchMediaById = async (mediaId: string): Promise<Media | null> => {
  try {
    const mediaResponse = await axios.get(
      `https://apis.slstice.com/mock/medias/${mediaId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const mediaData = extractMedia(mediaResponse.data);

    if (mediaData) {
      return mediaData;
    } else {
      console.warn(`No media found for id ${mediaId}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching media with id ${mediaId}:`, error);
    return null;
  }
};
