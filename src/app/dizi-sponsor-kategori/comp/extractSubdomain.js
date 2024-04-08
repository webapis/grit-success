export default function extractDomain(url) {
  // Regular expression to match the domain name
  const regex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?/;
  
  // Use the regex to extract the domain name
  const match = url.match(regex);
  
  // Check if a match is found and return the domain name
  if (match && match[1]) {
    return match[1];
  } else {
    // Return null if no match is found
    return null;
  }
}
