import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    deleteDoc, 
    updateDoc,
    query,
    where
} from 'firebase/firestore';
import { db } from '../firebase/config';

const STORES_COLLECTION = 'stores';

export const addStore = async (storeData) => {
    try {
        const docRef = await addDoc(collection(db, STORES_COLLECTION), {
            ...storeData,
            createdAt: new Date().toISOString()
        });
        return { id: docRef.id, ...storeData };
    } catch (error) {
        console.error('Error adding store:', error);
        throw error;
    }
};

export const getStores = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, STORES_COLLECTION));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting stores:', error);
        throw error;
    }
};

export const getStoresByVehicleType = async (vehicleType) => {
    try {
        const q = query(
            collection(db, STORES_COLLECTION),
            where('vehicleTypes', 'array-contains', vehicleType)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting stores by vehicle type:', error);
        throw error;
    }
};

export const updateStore = async (storeId, storeData) => {
    try {
        const storeRef = doc(db, STORES_COLLECTION, storeId);
        await updateDoc(storeRef, storeData);
        return { id: storeId, ...storeData };
    } catch (error) {
        console.error('Error updating store:', error);
        throw error;
    }
};

export const deleteStore = async (storeId) => {
    try {
        await deleteDoc(doc(db, STORES_COLLECTION, storeId));
        return storeId;
    } catch (error) {
        console.error('Error deleting store:', error);
        throw error;
    }
}; 