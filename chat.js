import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// Firebase configuration from user
const firebaseConfig = {
  apiKey: "AIzaSyDbYdXf25bnKBjR_ENedr0LcSESgJdkhaE",
  authDomain: "tayassar-school.firebaseapp.com",
  databaseURL: "https://tayassar-school-default-rtdb.firebaseio.com",
  projectId: "tayassar-school",
  storageBucket: "tayassar-school.firebasestorage.app",
  messagingSenderId: "919350939801",
  appId: "1:919350939801:web:435ced107179a760c6e808",
  measurementId: "G-CN9KCLRP5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM Elements
const chatWidget = document.getElementById('tayassar-chat-widget');
const toggleBtn = document.getElementById('chat-toggle-btn');
const closeBtn = document.getElementById('chat-close-btn');
const chatWindow = document.getElementById('chat-window');
const formScreen = document.getElementById('chat-form-screen');
const messagingScreen = document.getElementById('chat-messaging-screen');
const regForm = document.getElementById('chat-registration-form');
const nameInput = document.getElementById('chat-name');
const contactInput = document.getElementById('chat-contact');
const messagesContainer = document.getElementById('chat-messages');
const messageInput = document.getElementById('chat-message-input');
const sendBtn = document.getElementById('chat-send-btn');

let chatId = localStorage.getItem('tayassar_chat_id');

// Toggle Chat Window
toggleBtn.addEventListener('click', () => {
    chatWindow.classList.add('active');
    toggleBtn.style.transform = 'scale(0)';
    checkSession();
});

closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('active');
    toggleBtn.style.transform = 'scale(1)';
});

// Check if user already has an active session
function checkSession() {
    if (chatId) {
        showMessagingScreen();
        listenForMessages();
    } else {
        formScreen.style.display = 'flex';
        messagingScreen.style.display = 'none';
    }
}

// Show Messaging Screen
function showMessagingScreen() {
    formScreen.style.display = 'none';
    messagingScreen.style.display = 'flex';
    // Scroll to bottom just in case
    setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
}

// Register new chat session
regForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const contact = contactInput.value.trim();
    
    if (!name || !contact) return;
    
    // Generate unique ID
    chatId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('tayassar_chat_id', chatId);
    
    // Create node in Firebase
    const chatRef = ref(db, 'chats/' + chatId);
    await set(chatRef, {
        info: {
            name: name,
            contact: contact,
            createdAt: serverTimestamp(),
            lastActive: serverTimestamp()
        }
    });
    
    showMessagingScreen();
    listenForMessages();
});

// Send Message
async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !chatId) return;
    
    messageInput.value = '';
    
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    const newMessageRef = push(messagesRef);
    
    await set(newMessageRef, {
        sender: 'student',
        text: text,
        timestamp: serverTimestamp()
    });
    
    // Update lastActive status
    set(ref(db, `chats/${chatId}/info/lastActive`), serverTimestamp());
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Listen for incoming messages
let listening = false;
function listenForMessages() {
    if (listening || !chatId) return;
    listening = true;
    
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    onChildAdded(messagesRef, (snapshot) => {
        const msg = snapshot.val();
        displayMessage(msg.text, msg.sender);
    });
}

// Display message in UI
function displayMessage(text, sender) {
    const div = document.createElement('div');
    div.classList.add('chat-message');
    
    if (sender === 'student') {
        div.classList.add('sent');
    } else {
        div.classList.add('received');
    }
    
    div.textContent = text;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
