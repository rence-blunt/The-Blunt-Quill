// Import Firebase app
import { initializeApp } from 'firebase/app';

// Your Firebase config from the console
const firebaseConfig = {
  apiKey: "AIzaSyD5V9YJaXFD-d24ec2DrsHE1Y9lyG9H7lQ",
  authDomain: "the-blunt-quill.firebaseapp.com",
  projectId: "the-blunt-quill",
  storageBucket: "the-blunt-quill.firebasestorage.app",
  messagingSenderId: "324668891059",
  appId: "1:324668891059:web:ea089f7d8747df130a75c6",
  measurementId: "G-EGH34W6LL6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(app);

// Fetch poems from Firestore
async function fetchRecentPoems() {
  const poemsCol = collection(db, 'poems'); // "poems" is the Firestore collection name
  const snapshot = await getDocs(poemsCol);
  const poems = snapshot.docs.map(doc => doc.data());

  displayPoems(poems);
}

// Display poems in the HTML
function displayPoems(poems) {
  const container = document.getElementById('recent-poems');

  container.innerHTML = ''; // Clear old content

  poems.forEach(poem => {
    const poemDiv = document.createElement('div');
    poemDiv.className = 'poem-card';

    poemDiv.innerHTML = `
      <h3>${poem.title}</h3>
      <p>${poem.content}</p>
      <small>By ${poem.author}</small>
    `;

    container.appendChild(poemDiv);
  });
}

// Call the function
fetchRecentPoems();

