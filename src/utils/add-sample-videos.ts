import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Sample video data for testing
const sampleVideos = [
  {
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    videoTitle: 'Introduction to Fundamental Rights',
    videoDescription: 'Learn about the basic concepts and importance of fundamental rights in the Indian Constitution.',
    videoDuration: 180, // 3 minutes
    hasVideo: true
  },
  {
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    videoTitle: 'Right to Equality Explained',
    videoDescription: 'Understanding Article 14 and the principle of equality before law.',
    videoDuration: 240, // 4 minutes
    hasVideo: true
  },
  {
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
    videoTitle: 'Freedom of Speech and Expression',
    videoDescription: 'Deep dive into Article 19 and the right to freedom of speech.',
    videoDuration: 300, // 5 minutes
    hasVideo: true
  },
  {
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    videoTitle: 'Right to Life and Personal Liberty',
    videoDescription: 'Understanding Article 21 and its broad interpretation by the judiciary.',
    videoDuration: 360, // 6 minutes
    hasVideo: true
  },
  {
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    videoTitle: 'Right to Education',
    videoDescription: 'Learn about the fundamental right to education and its implementation.',
    videoDuration: 270, // 4.5 minutes
    hasVideo: true
  }
];

async function addSampleVideos() {
  console.log('Adding sample videos to chapters...');
  const chaptersCollection = collection(db, 'chapters');
  
  try {
    // Get the first 5 chapters and add sample videos
    for (let i = 0; i < Math.min(5, sampleVideos.length); i++) {
      const chapterId = `article-${i + 1}`; // Assuming chapters are named article-1, article-2, etc.
      const chapterDocRef = doc(chaptersCollection, chapterId);
      
      // Check if chapter exists
      const chapterDoc = await getDoc(chapterDocRef);
      if (chapterDoc.exists()) {
        const videoData = sampleVideos[i];
        
        await updateDoc(chapterDocRef, {
          ...videoData,
          updatedAt: Date.now()
        });
        
        console.log(`Added video to chapter: ${chapterDoc.data().title}`);
      } else {
        console.log(`Chapter ${chapterId} not found, skipping...`);
      }
    }
    
    console.log('Successfully added sample videos to chapters.');
    console.log('You can now test the video functionality in the learn section!');
  } catch (error) {
    console.error('Error adding sample videos:', error);
  }
}

// Export the function
export { addSampleVideos };

// Make it available globally for browser console access
if (typeof window !== 'undefined') {
  (window as any).addSampleVideos = addSampleVideos;
}

// Run the function if this file is executed directly
if (require.main === module) {
  addSampleVideos().catch(console.error);
} 