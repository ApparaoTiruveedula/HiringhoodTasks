
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

const DB_NAME = 'authApp';
const USER_STORE = 'users';
const DB_VERSION = 1;

// Initialize the database
async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (event) => {
      console.error('IndexedDB error:', request.error);
      reject(request.error);
    };
    
    request.onsuccess = (event) => {
      resolve(request.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = request.result;
      
      // Create users object store if it doesn't exist
      if (!db.objectStoreNames.contains(USER_STORE)) {
        const store = db.createObjectStore(USER_STORE, { keyPath: 'email' });
        store.createIndex('id', 'id', { unique: true });
        store.createIndex('email', 'email', { unique: true });
      }
    };
  });
}

// Create a new user
export async function createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([USER_STORE], 'readwrite');
    const store = transaction.objectStore(USER_STORE);
    
    // Generate new user with ID and timestamp
    const newUser: User = {
      ...userData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    const request = store.add(newUser);
    
    request.onsuccess = () => {
      resolve(newUser);
    };
    
    request.onerror = () => {
      console.error('Error adding user:', request.error);
      reject(request.error);
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
}

// Find a user by email
export async function findUserByEmail(email: string): Promise<User | null> {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([USER_STORE], 'readonly');
    const store = transaction.objectStore(USER_STORE);
    
    const request = store.get(email);
    
    request.onsuccess = () => {
      resolve(request.result || null);
    };
    
    request.onerror = () => {
      console.error('Error finding user:', request.error);
      reject(request.error);
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
}

// Get all users (for admin purposes)
export async function getAllUsers(): Promise<User[]> {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([USER_STORE], 'readonly');
    const store = transaction.objectStore(USER_STORE);
    
    const request = store.getAll();
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onerror = () => {
      console.error('Error getting all users:', request.error);
      reject(request.error);
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
}
