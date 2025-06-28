import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

async function deleteAllLearnArticles() {
  const articlesCollection = collection(db, 'learn_articles');
  const snapshot = await getDocs(articlesCollection);

  let deletedCount = 0;
  for (const articleDoc of snapshot.docs) {
    await deleteDoc(doc(db, 'learn_articles', articleDoc.id));
    deletedCount++;
    console.log(`Deleted article: ${articleDoc.id}`);
  }
  console.log(`Deleted ${deletedCount} articles from learn_articles.`);
}

deleteAllLearnArticles(); 