export default function extractHost(urlString,obj) {
    try {
      const url = new URL(urlString);
      return url.hostname;
    } catch (error) {
        debugger
      // Handle invalid URL cases
      console.error("Invalid URL:", error);
      return null;
    }
  }