const quoteForm = document.querySelector('#quoteForm');
const modal = document.querySelector('#estimateModal');
const estimateText = document.querySelector('#estimateText');
const closeModal = document.querySelector('#closeModal');
const imagesInput = document.querySelector('#images');
const preview = document.querySelector('#preview');
const messageForm = document.querySelector('#messageForm');

function formatMoney(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function launchConfetti() {
  for (let i = 0; i < 28; i++) {
    const piece = document.createElement('span');
    piece.textContent = ['🎉', '✨', '🟡', '⚫'][Math.floor(Math.random() * 4)];
    piece.style.position = 'fixed';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = '-20px';
    piece.style.fontSize = Math.random() * 18 + 16 + 'px';
    piece.style.zIndex = 100;
    piece.style.transition = 'transform 1.9s ease, opacity 1.9s ease';
    document.body.appendChild(piece);
    requestAnimationFrame(() => {
      piece.style.transform = `translateY(${85 + Math.random() * 20}vh) rotate(${Math.random() * 360}deg)`;
      piece.style.opacity = '0';
    });
    setTimeout(() => piece.remove(), 2000);
  }
}

if (quoteForm) {
  quoteForm.addEventListener('submit', () => {
    const sqft = Number(document.querySelector('#sqft').value);
    const estimate = sqft * 1.75;
    localStorage.setItem('paintingEstimate', `${formatMoney(estimate)} starting estimate`);
  });
}

if (closeModal) {
  closeModal.addEventListener('click', () => modal.classList.add('hidden'));
}

if (imagesInput) {
  imagesInput.addEventListener('change', () => {
    preview.innerHTML = '';
    [...imagesInput.files].forEach((file) => {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.alt = file.name;
      preview.appendChild(img);
    });
  });
}

if (messageForm) {
  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('#contactName').value;
    const email = document.querySelector('#contactEmail').value;
    const message = document.querySelector('#contactMessage').value;
    const subject = encodeURIComponent('New website message for Arizona Deluxe Painting LLC');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });
}
