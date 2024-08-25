  export const convertEpochTime = (epochTime: number) => {
    // Convert the epoch time (which is in seconds) to milliseconds
    const date = new Date(epochTime * 1000);
  
    // Format the date as a human-readable string (date only)
    const dateString = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  
    return dateString;
  };
  