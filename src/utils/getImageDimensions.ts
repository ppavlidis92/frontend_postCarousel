export const getImageDimensions = (isLargeScreen: boolean, isMediumScreen: boolean, isSmallScreen: boolean) => {
    if (isLargeScreen) {
      return { width: 1100, height: 700};
    } else if (isMediumScreen) {
      return { width: 700, height: 500 };
    } else if (isSmallScreen) {
      return { width: 400, height: 300 };
    }
    return { width: 1400, height: 1000 }; // Default to large dimensions
  };

