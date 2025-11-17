import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://iaromyesegaucguvwohn.supabase.co"; // <-- replace
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhcm9teWVzZWdhdWNndXZ3b2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMjM2MjUsImV4cCI6MjA3ODg5OTYyNX0.tZx5CwngEY2K81ugUQFQ-KqOfiB8f6sFraIUFTQltyQ"; // <-- replace
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const familyEl = document.getElementById('family');
const pinEl = document.getElementById('pin');
const revealBtn = document.getElementById('revealBtn');
const statusEl = document.getElementById('status');
const resultEl = document.getElementById('result');

function showStatus(t){ statusEl.textContent = t; }
function showResult(name, wish){
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `
    <div class="pair-main">You will give a gift to <strong>${name}</strong>.</div>
    <div class="pair-wish"><strong>${name}'s wish list:</strong> ${wish || 'No wish list provided.'}</div>
    <p class="muted small">Tip: Screenshot or write this down, then close this page.</p>
  `;
}

revealBtn.addEventListener('click', async () => {
  showStatus('');
  resultEl.classList.add('hidden');
  resultEl.innerHTML = '';

  const family_code = familyEl.value.trim();
  const user_code = pinEl.value.trim();
  if (!family_code || !user_code) { showStatus('Enter Family Code and PIN.'); return; }

  showStatus('Verifying...');
  const { data, error } = await supabase.rpc('reveal_assignment', { in_family_code: family_code, in_user_code: user_code });

  if (error) {
    console.error(error);
    showStatus('Reveal failed (incorrect code/PIN or assignments not generated).');
    return;
  }

  if (!data || data.length === 0) {
    showStatus('No assignment found. Confirm your Family Code & PIN, and ask host to generate assignments.');
    return;
  }

  const row = Array.isArray(data) ? data[0] : data;
  showResult(row.receiver_name, row.receiver_wish);
  showStatus('Success — assignment revealed.');
});
