// Array of appreciation messages
const appreciationMessages = [
    "Thank you for all the sacrifices you've made for me.",
    "Your love and support mean everything to me.",
    "You're the strongest person I know, Mom.",
    "You never questioned my goals and were always supportive.",
    "Thank you for believing in me when I doubted myself.",
    "I never had to explain why something mattered to me. You just showed up because it mattered to me.",
    "You've always been there when I needed you most.",
    "I'm grateful for the lessons you've taught me.",
    "Your smile brightens my darkest days.",
    "You're not just my mom, you're my best friend.",
    "Thank you for your endless patience and understanding.",
    "You make the world a better place just by being in it.",
    "I love you more than words can express.",
    "You never made me feel judged. You just made me feel loved.",
    "Thank you for encouraging me to chase my dreams.",
    "You're the most beautiful person inside and out.",
    "I'm so proud to be your child.",
    "Thank you for all the bedtime stories and cuddles.",
    "Your strength inspires me every single day.",
    "You've taught me how to be brave.",
    "Thank you for the unconditional love you give.",
    "You make every day special just by being you.",
    "I'm grateful for every moment with you.",
    "Your laughter is the sweetest sound in the world.",
    "Thank you for raising me with so much love.",
    "You're my hero, Mom.",
    "I appreciate you more than you'll ever know.",
    "Thank you for all the little things you do.",
    "You always had an answer whenever I came to you with a question.",
    "Happy Mother's Day, Mom. You showed up in every way that counted!",
];

// Game state
let clickCount = 0;
let messageCount = 0;
let usedMessages = new Set();

// Get a random message that hasn't been used yet
function getRandomMessage() {
    let availableIndices = appreciationMessages
        .map((_, index) => index)
        .filter(index => !usedMessages.has(index));

    // If all messages have been used, reset and start over
    if (availableIndices.length === 0) {
        usedMessages.clear();
        availableIndices = appreciationMessages.map((_, index) => index);
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    usedMessages.add(randomIndex);
    return appreciationMessages[randomIndex];
}

// Create floating heart animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = '50%';
    heart.style.fontSize = '2em';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = `floatUp 2s ease-in forwards`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 2000);
}

// Add floating hearts animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-500px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const clickButton = document.getElementById('clickButton');
    const resetButton = document.getElementById('resetButton');
    const clickCountDisplay = document.getElementById('clickCount');
    const messageCountDisplay = document.getElementById('messageCount');
    const currentMessageDisplay = document.getElementById('currentMessage');
    const messageList = document.getElementById('messageList');

    // Make sure elements exist
    if (!clickButton || !resetButton) {
        console.error('Button elements not found');
        return;
    }

    // Handle click button
    clickButton.addEventListener('click', function() {
        clickCount++;
        messageCount++;

        // Get and display new message
        const newMessage = getRandomMessage();
        currentMessageDisplay.textContent = newMessage;

        // Update counters
        clickCountDisplay.textContent = clickCount;
        messageCountDisplay.textContent = messageCount;

        // Add message to the log
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        messageItem.innerHTML = `
            <span class="message-item-number">Message #${messageCount}</span>
            <p class="message-item-text">${newMessage}</p>
        `;
        messageList.insertBefore(messageItem, messageList.firstChild);

        // Create floating hearts
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createFloatingHeart(), i * 100);
        }

        // Add animation to button
        clickButton.style.animation = 'none';
        setTimeout(() => {
            clickButton.style.animation = '';
        }, 10);
    });

    // Handle reset button
    resetButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to start over? This will reset all your clicks and messages.')) {
            clickCount = 0;
            messageCount = 0;
            usedMessages.clear();
            clickCountDisplay.textContent = '0';
            messageCountDisplay.textContent = '0';
            currentMessageDisplay.textContent = 'Click the button to see a special message!';
            messageList.innerHTML = '';
        }
    });

    console.log('%cHappy Mother\'s Day! 💝', 'font-size: 20px; color: #764ba2; font-weight: bold;');
});
