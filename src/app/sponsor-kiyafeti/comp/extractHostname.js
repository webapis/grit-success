export default function extractHostname(urlString) {
    try {
        const url = new URL(urlString);
        return url.hostname;
    } catch (error) {
        console.error("Invalid URL format:", urlString);
        return null; // Or handle the error as needed
    }
  }