import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { fundamentalRightsData } from '../data/fundamental-rights-data';

async function uploadLearnArticles() {
  console.log('Uploading learn articles...');
  const articlesCollection = collection(db, 'learn_articles');
  try {
    for (const article of fundamentalRightsData) {
      const articleDocRef = doc(articlesCollection, article.id);
      await setDoc(articleDocRef, article);
      console.log(`Uploaded article: ${article.title}`);
    }
    console.log(`Successfully uploaded ${fundamentalRightsData.length} articles.`);
  } catch (error) {
    console.error('Error uploading learn articles:', error);
  }
}

uploadLearnArticles(); 