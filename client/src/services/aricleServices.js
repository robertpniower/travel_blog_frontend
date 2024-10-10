import axios from 'axios';

export const fetchArticles = async () => {
  try {
    const articleResponse = await axios.get('http://localhost:8000/articles/articles');
    const articlesData = articleResponse.data;

    const articlesWithIcons = await Promise.all(
      articlesData.map(async (article) => {
        try {
          const iconResponse = await axios.get(`http://localhost:8000/articles/articles/icon/${article.id}`);
          return {
            ...article,
            image: iconResponse.data[0].file_path,
          };
        } catch (iconError) {
          console.error(`Error fetching icon for article ${article.id}:`, iconError);
          return {
            ...article,
            image: '/icons/007-backpack.png',
          };
        }
      })
    );

    return articlesWithIcons;
  } catch (error) {
    throw new Error(error.message);
  }
};


