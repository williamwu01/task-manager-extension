// popup.js this is the main js page that controls everything 
import { createBoardSection } from './components/board.js';
import { createChecklistSection } from './components/checklist.js';
import { createNoteSection } from './components/note.js';
import { loginWithGoogle } from './auth/login.js'; // only login helper
import { supabase } from './auth/supabaseClient.js';

let tasks = [];
let view = 'board';

// UI buttons
const boardBtn = document.getElementById('board');
const checklistBtn = document.getElementById('checklist');
const noteBtn = document.getElementById('notes');

// container
const container = document.createElement('div');
document.body.appendChild(container);

// --- LOGIN CHECK & INIT ---
async function initPopup() {
  chrome.storage.local.get('session', ({ session }) => {
    if (!session) {
      showLoginButton();
    } else {
      console.log('User logged in:', session.user.email);
      showLogoutButton(session.user.email);
      loadUserTasks(session.user.id);
      renderSections();
    }
  });
}

// Show login button if not logged in
function showLoginButton() {
  const loginBtn = document.createElement('button');
  loginBtn.textContent = 'Login with Google';
  loginBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'login-google' });
  });
  container.appendChild(loginBtn);
}

// Show logout button when logged in
function showLogoutButton(email) {
  const logoutContainer = document.createElement('div');
  logoutContainer.style.cssText = 'padding: 10px; border-bottom: 1px solid #ccc; margin-bottom: 10px;';
  
  const emailText = document.createElement('p');
  emailText.textContent = `Logged in as: ${email}`;
  emailText.style.margin = '0 0 5px 0';
  
  const logoutBtn = document.createElement('button');
  logoutBtn.textContent = 'Logout';
  logoutBtn.addEventListener('click', async () => {
    // Sign out from Supabase
    await supabase.auth.signOut();
    
    // Clear local session
    await chrome.storage.local.remove('session');
    
    // Reload the popup
    window.location.reload();
  });
  
  logoutContainer.appendChild(emailText);
  logoutContainer.appendChild(logoutBtn);
  container.appendChild(logoutContainer);
}

// --- LOAD TASKS ---
async function loadUserTasks(userId) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId);

  if (error) console.error(error);
  else tasks = data || [];
}

// --- UI SECTIONS ---
let boardSection, checklistSection, noteSection;
function renderSections() {
  boardSection = createBoardSection(tasks);
  checklistSection = createChecklistSection(tasks);
  noteSection = createNoteSection(tasks);

  container.appendChild(boardSection);
  container.appendChild(checklistSection);
  container.appendChild(noteSection);

  setView(view);
}

// --- TOGGLE LOGIC ---
function setView(mode) {
  view = mode;

  boardSection?.classList.toggle('hidden', mode !== 'board');
  checklistSection?.classList.toggle('hidden', mode !== 'checklist');
  noteSection?.classList.toggle('hidden', mode !== 'notes');

  boardBtn.setAttribute('aria-pressed', mode === 'board');
  checklistBtn.setAttribute('aria-pressed', mode === 'checklist');
  noteBtn.setAttribute('aria-pressed', mode === 'notes');
}

// Event listeners for buttons
boardBtn.addEventListener('click', () => setView('board'));
checklistBtn.addEventListener('click', () => setView('checklist'));
noteBtn.addEventListener('click', () => setView('notes'));

// --- SESSION CHECK ---
async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    console.log('User is logged in:', session.user.email);
    // Update UI to show logged-in state
  } else {
    console.log('User is not logged in');
    // Show login button
  }
}

// Check session when popup opens
checkSession();

// --- START POPUP ---
initPopup();