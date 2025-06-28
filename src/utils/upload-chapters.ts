import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { fundamentalRightsData } from '../data/fundamental-rights-data';

async function uploadChapters() {
  console.log('Uploading fundamental rights chapters...');
  const chaptersCollection = collection(db, 'chapters');
  try {
    for (let i = 0; i < fundamentalRightsData.length; i++) {
      const article = fundamentalRightsData[i];
      const chapterDocRef = doc(chaptersCollection, article.id);
      
      const chapterData = {
        id: article.id,
        title: article.title,
        content: article.fullContent,
        order: i + 1, // Order from 1 to 22
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      
      await setDoc(chapterDocRef, chapterData);
      console.log(`Uploaded chapter: ${article.title}`);
    }
    console.log(`Successfully uploaded ${fundamentalRightsData.length} chapters.`);
  } catch (error) {
    console.error('Error uploading chapters:', error);
  }
}

// Export the function
export { uploadChapters };

// Make it available globally for browser console access
if (typeof window !== 'undefined') {
  (window as any).uploadChapters = uploadChapters;
}

// Run the upload if this file is executed directly
if (require.main === module) {
  uploadChapters().catch(console.error);
} 