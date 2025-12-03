// script.js
// This file adds functionality for:
// 1. Clickable skill images that let you upload a new image.
// 2. Saving the chosen image to localStorage so it stays after reload.
// 3. Making each "SEE MORE" button redirect to a URL you can configure.

document.addEventListener('DOMContentLoaded', function () {
  // ============================
  // 1. CONFIGURABLE "SEE MORE" LINKS
  // ============================
  // Set the destination URL for each skill card here.
  // Order: [Skill 1, Skill 2, Skill 3]
  // You can replace each URL string with any link you like.
  const skillLinks = [
    'https://siap-1.netlify.app/?fbclid=IwY2xjawOdDMZleHRuA2FlbQIxMABicmlkETE4bDBSRXhidFhJcXY3MFlNc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHq2Kmpf-62PogV59SfSRz1LQJ9W9OVO3X11W3EpgTUlQRSbWt4lSVnbJK4cl_aem_vfYGuo6YtLG5ZIOactxpIg',      // Skill 1 - Problem Solving
    'https://jamesinoc.github.io/FINAL-WEBPAGE/',     // Skill 2 - Customer Service
    'https://example.com/financial-literacy'    // Skill 3 - Financial Literacy
  ];

  const seeMoreButtons = document.querySelectorAll('.skills-container .btn');

  seeMoreButtons.forEach((button, index) => {
    button.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent the default "#project" navigation

      const targetUrl = skillLinks[index];
      if (targetUrl) {
        // Redirect to the configured URL
        window.location.href = targetUrl;
      }
    });
  });

  // ============================
  // 2. CLICKABLE IMAGES + FILE UPLOAD
  // ============================
  const cards = document.querySelectorAll('.skills-container .card');

  cards.forEach((card, index) => {
    const img = card.querySelector('img');
    const fileInput = card.querySelector('.skill-image-input');

    if (!img || !fileInput) return;

    // Use a unique key per card so each card remembers its own image.
    const storageKey = 'skillImage_' + index;

    // On page load, try to restore any saved image for this card.
    const savedImage = localStorage.getItem(storageKey);
    if (savedImage) {
      img.src = savedImage;
    }

    // Make it clear the image is clickable (no layout change, just cursor style).
    img.style.cursor = 'pointer';

    // When the image is clicked, open the file picker.
    img.addEventListener('click', function () {
      fileInput.click();
    });

    // When a file is selected, read it and apply it to the image.
    fileInput.addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = function (loadEvent) {
        const dataUrl = loadEvent.target.result;

        // Immediately update the card image.
        img.src = dataUrl;

        // Save in localStorage so it persists after reload.
        try {
          localStorage.setItem(storageKey, dataUrl);
        } catch (e) {
          // In case localStorage is full or disabled.
          console.error('Could not save image to localStorage:', e);
        }
      };

      // Convert image file to a Base64 data URL.
      reader.readAsDataURL(file);
    });
  });
});

