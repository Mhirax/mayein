const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "☀" : "☾";
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const whatsappNumber = "2340000000000"; // Replace with your real WhatsApp number.
  const text = `Hello Emmanuel, my name is ${name}. My email is ${email}. ${message}`;

  formNote.textContent = "Your message is ready. Replace the sample WhatsApp number in script.js to send it to yourself or your business number.";

  // Opens WhatsApp after you replace the sample number.
  if (whatsappNumber !== "2340000000000") {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
