import { db } from '../firebase/config'; // Ensure this is the correct path to your Firebase setup
import { collection, getDocs, query, where, doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export const getUserProfile = async (userId) => {
    const userDoc = await db.collection('users').doc(userId).get();
    return userDoc.exists ? userDoc.data() : null;
};

export const updateUserProfile = async (userId, profileData) => {
    await db.collection('users').doc(userId).set(profileData, { merge: true });
};

export const addFavoriteStore = async (userId, storeId) => {
    const userRef = db.collection('users').doc(userId);
    await userRef.update({
        favorites: db.FieldValue.arrayUnion(storeId)
    });
};

export const getVisitedStores = async (userId) => {
    const storeRef = doc(db, 'visitedStores', userId);
    const docSnap = await getDoc(storeRef);
    if (docSnap.exists()) {
        return docSnap.data().stores || [];
    }
    return [];
};

export const saveVisitedStore = async (currentUser, store) => {
    const userId = currentUser.uid; // Use the actual user ID
    const storeRef = doc(db, 'visitedStores', userId);

    const storeData = {
        id: store.id,
        name: store.name,
        location: store.location,
        visitedAt: new Date().toISOString()
    };

    const docSnap = await getDoc(storeRef);
    if (docSnap.exists()) {
        const existingData = docSnap.data();
        await setDoc(storeRef, { stores: [...existingData.stores, storeData] }, { merge: true });
    } else {
        await setDoc(storeRef, { stores: [storeData] });
    }
}; 