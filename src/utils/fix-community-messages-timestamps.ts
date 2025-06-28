import { getFirestore, collection, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import app, { db } from '../firebase/config';

async function fixTimestamps() {
  const messagesRef = collection(db, 'community_messages');
  const snapshot = await getDocs(messagesRef);

  let updatedCount = 0;

  for (const messageDoc of snapshot.docs) {
    const data = messageDoc.data();
    const timestamp = data.timestamp;

    // Check if timestamp is missing or not a Firestore Timestamp
    if (!timestamp || typeof timestamp.toDate !== 'function') {
      await updateDoc(doc(db, 'community_messages', messageDoc.id), {
        timestamp: serverTimestamp(),
      });
      updatedCount++;
      console.log(`Updated message ${messageDoc.id}`);
    }
  }

  console.log(`Done! Updated ${updatedCount} messages.`);
}

fixTimestamps().catch(console.error); 