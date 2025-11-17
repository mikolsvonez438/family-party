// register-script.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/* CONFIG — replace these with your project values */
const SUPABASE_URL = "https://iaromyesegaucguvwohn.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhcm9teWVzZWdhdWNndXZ3b2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMjM2MjUsImV4cCI6MjA3ODg5OTYyNX0.tZx5CwngEY2K81ugUQFQ-KqOfiB8f6sFraIUFTQltyQ";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const nameEl = document.getElementById("name");
const wishEl = document.getElementById("wish");
const familyCodeEl = document.getElementById("familyCode");
const userCodeEl = document.getElementById("userCode");
const saveBtn = document.getElementById("saveProfileBtn");
const msg = document.getElementById("profileMsg");

function showMsg(t) {
  msg.textContent = t;
}

// compute SHA-256 hex
async function sha256Hex(text) {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const bytes = Array.from(new Uint8Array(hash));
  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

saveBtn.addEventListener("click", async () => {
  showMsg("");
  const name = nameEl.value.trim();
  const wish = wishEl.value.trim();
  const family_code = familyCodeEl.value.trim();
  const user_code = userCodeEl.value.trim();

  if (!name || !family_code || !user_code) {
    showMsg("Name, Family Code and PIN are required.");
    return;
  }
  if (user_code.length < 4) {
    showMsg("Choose a PIN at least 4 characters (6+ recommended).");
    return;
  }

  showMsg("Hashing PIN and saving...");
  const user_code_hash = await sha256Hex(user_code);

  const { error } = await supabase
    .from("participants")
    .insert({ name, wish, family_code, user_code_hash });

  if (error) {
    console.error(error);
    showMsg("Error saving—see console.");
    return;
  }

  showMsg("Registered. Keep your Family Code and PIN safe.");
});
