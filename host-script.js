const HOST_ENDPOINT = "http://localhost/randomizer/generate"; // <-- replace
const HOST_SECRET = "host123"; // choose a strong secret and set same in serverless env

const hostCodeInput = document.getElementById('hostCode');
const familyInput = document.getElementById('familyCode');
const generateBtn = document.getElementById('generateBtn');
const statusEl = document.getElementById('hostStatus');

function showStatus(t){ statusEl.textContent = t; }

generateBtn.addEventListener('click', async () => {
  showStatus('');
  const hostCode = hostCodeInput.value.trim();
  const family = familyInput.value.trim();
  if (!hostCode || !family) { showStatus('Enter host code and family code.'); return; }
  showStatus('Requesting server to generate assignments...');

  try {
    const res = await fetch(HOST_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ host_secret: hostCode, family_code: family })
    });
    const json = await res.json();
    if (!res.ok) {
      showStatus('Error: ' + (json?.error || res.statusText));
      return;
    }
    showStatus('Success: ' + (json?.message || 'Assignments generated.'));
    alert('Assignments generated for family: ' + family);
  } catch (err) {
    console.error(err);
    showStatus('Network/server error. Check serverless function.');
  }
});
