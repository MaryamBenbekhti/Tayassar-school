import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, onValue, onChildAdded, push, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM Elements
const chatList = document.getElementById('chat-list');
const mainChat = document.getElementById('main-chat');
const emptyState = document.getElementById('empty-state');
const currentChatTitle = document.getElementById('current-chat-title');
const messagesContainer = document.getElementById('admin-messages-container');
const messageInput = document.getElementById('admin-message-input');
const sendBtn = document.getElementById('admin-send-btn');

let activeChatId = null;
let activeChatListener = null;

// Initialize on auth
window.addEventListener('adminAuthenticated', () => {
    loadChats();
});

// Load all chats into sidebar
function loadChats() {
    const chatsRef = ref(db, 'chats');
    
    // Listen for value changes to keep list updated
    onValue(chatsRef, (snapshot) => {
        chatList.innerHTML = '';
        const chats = [];
        
        snapshot.forEach(child => {
            chats.push({
                id: child.key,
                ...child.val()
            });
        });
        
        // Sort by last active (descending)
        chats.sort((a, b) => {
            const timeA = a.info?.lastActive || 0;
            const timeB = b.info?.lastActive || 0;
            return timeB - timeA;
        });
        
        chats.forEach(chat => {
            if (!chat.info) return;
            
            const div = document.createElement('div');
            div.classList.add('chat-item');
            if (activeChatId === chat.id) div.classList.add('active');
            
            const date = new Date(chat.info.lastActive || Date.now());
            const timeStr = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            div.innerHTML = `
                <h4>${chat.info.name}</h4>
                <p>${chat.info.contact} &bull; ${timeStr}</p>
            `;
            
            div.addEventListener('click', () => {
                document.querySelectorAll('.chat-item').forEach(el => el.classList.remove('active'));
                div.classList.add('active');
                openChat(chat.id, chat.info);
            });
            
            chatList.appendChild(div);
        });
    });
}

// Open specific chat
function openChat(chatId, info) {
    activeChatId = chatId;
    emptyState.style.display = 'none';
    mainChat.style.display = 'flex';
    
    currentChatTitle.textContent = `${info.name} (${info.contact})`;
    messagesContainer.innerHTML = ''; // Clear current view
    
    // If there was an old listener (using a simple flag mechanism or ref tracking)
    // We will just read the node. For a production app, we'd use off() to detach the old listener.
    // In SDK modular format, we attach new listeners to specific refs.
    
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    onChildAdded(messagesRef, (snapshot) => {
        const msg = snapshot.val();
        displayMessage(msg.text, msg.sender);
    });
}

function displayMessage(text, sender) {
    const div = document.createElement('div');
    div.classList.add('message');
    
    if (sender === 'admin') {
        div.classList.add('admin');
    } else {
        div.classList.add('student');
    }
    
    div.textContent = text;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Send Message
async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !activeChatId) return;
    
    messageInput.value = '';
    
    const messagesRef = ref(db, `chats/${activeChatId}/messages`);
    const newMessageRef = push(messagesRef);
    
    await set(newMessageRef, {
        sender: 'admin',
        text: text,
        timestamp: serverTimestamp()
    });
    
    // Update lastActive
    set(ref(db, `chats/${activeChatId}/info/lastActive`), serverTimestamp());
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
