export const getImageDimensions = (isLargeScreen: boolean, isMediumScreen: boolean, isSmallScreen: boolean) => {
    if (isLargeScreen) {
      return { width: 1100, height: 800, bgHeight: "1800px", bgWidth: "1200px" };
    } else if (isMediumScreen) {
      return { width: 700, height: 500, bgHeight: "1800px", bgWidth: "1200px" };
    } else if (isSmallScreen) {
      return { width: 400, height: 300, bgHeight: "1800px", bgWidth: "1200px" };
    }
    return { width: 1200, height: 800, bgHeight: "1800px", bgWidth: "1200px" }; // Default to large dimensions
  };

