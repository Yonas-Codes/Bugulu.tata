import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// REPLACE THESE VALUES WITH YOUR REAL FIREBASE KEYS FROM THE FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "YOUR_REAL_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.placeBid = async function() {
    const bidAmount = document.getElementById('bidInput').value;
    const statusMsg = document.getElementById('statusMsg');

    if (!bidAmount || bidAmount <= 0) {
        statusMsg.innerText = "Please enter a valid bid amount.";
        return;
    }

    statusMsg.innerText = "Submitting bid securely...";

    try {
        await addDoc(collection(db, "bids"), {
            auctionId: "iphone18",
            userId: "mobile_user_demo",
            amount: parseFloat(bidAmount),
            createdAt: serverTimestamp()
        });
        statusMsg.innerText = "Bid placed successfully!";
        document.getElementById('bidInput').value = "";
    } catch (error) {
        statusMsg.innerText = "Error: " + error.message;
    }
}
