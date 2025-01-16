import axios from "axios";

const translateText = async (text, targetLanguage) => {
  const apiKey = "AIzaSyDKgpMPha0gqod4YLiIvxsxvaYd1Qpaah0"; // Replace with your API key
  const url = `https://translation.googleapis.com/language/translate/v2`;

  try {
    const response = await axios.post(url, {
      q: text,
      target: targetLanguage,
      key: apiKey,
    });

    // Return the translated text
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    // Fallback: Return the original text if the API call fails
    return text;
  }
};

export default translateText;
