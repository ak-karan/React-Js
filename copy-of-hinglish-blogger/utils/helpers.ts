export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const generateSrcSet = (imageUrl: string): string => {
  // Return original URL if it's not a picsum.photos URL (e.g., base64 data URI)
  if (!imageUrl || !imageUrl.includes('picsum.photos')) {
    return imageUrl;
  }
  
  try {
    const urlParts = imageUrl.split('/');
    // Example URL: https://picsum.photos/seed/react/1200/600
    // Parts: ["https:", "", "picsum.photos", "seed", "react", "1200", "600"]
    const widthIndex = urlParts.length - 2;
    const heightIndex = urlParts.length - 1;

    const baseWidth = parseInt(urlParts[widthIndex], 10);
    const baseHeight = parseInt(urlParts[heightIndex], 10);

    // If parsing fails, it's not a URL structure we can work with
    if (isNaN(baseWidth) || isNaN(baseHeight) || baseWidth === 0) {
      return imageUrl;
    }

    const aspectRatio = baseHeight / baseWidth;

    // Define a set of widths for different screen sizes
    const widths = [400, 800, 1200, 1600];
    
    return widths
      .map(w => {
        const h = Math.round(w * aspectRatio);
        const newUrlParts = [...urlParts];
        newUrlParts[widthIndex] = String(w);
        newUrlParts[heightIndex] = String(h);
        const newUrl = newUrlParts.join('/');
        return `${newUrl} ${w}w`;
      })
      .join(', ');
  } catch (error) {
    console.error("Could not generate srcset for image, returning original URL.", { imageUrl, error });
    return imageUrl;
  }
};
