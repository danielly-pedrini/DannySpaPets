const phone = "5515991345227";

const services = [
  "Banho",
  "Banho e tosa higiênica",
  "Banho medicamentoso",
  "Hidratação de pelos",
  "Tosa completa na máquina",
  "Tosa bebê",
  "Remoção de subpelo",
  "Corte de unhas"
];

const petsContainer = document.getElementById("petsContainer");
const addPetBtn = document.getElementById("addPet");
let petCount = 0;

function serviceOptions() {
  return services.map(s => `<option value="${s}">${s}</option>`).join("");
}

function addPet() {
  petCount++;
  const block = document.createElement("div");
  block.className = "pet-block";
  block.dataset.pet = petCount;
  block.innerHTML = `
    <div class="pet-head">
      <span class="pet-title">🐾 Pet ${petCount}</span>
      ${petCount > 1 ? '<button type="button" class="remove-pet">Remover</button>' : ''}
    </div>
    <div class="field">
      <label>Nome do pet *</label>
      <input class="pet-name" required placeholder="Nome do pet">
    </div>
    <div class="field">
      <label>Serviço *</label>
      <select class="pet-service" required>
        <option value="">Selecione um serviço</option>
        ${serviceOptions()}
      </select>
    </div>
  `;
  petsContainer.appendChild(block);
  block.querySelector(".remove-pet")?.addEventListener("click", () => {
    block.remove();
    renumberPets();
  });
}

function renumberPets() {
  [...petsContainer.querySelectorAll(".pet-block")].forEach((el, i) => {
    el.querySelector(".pet-title").textContent = `🐾 Pet ${i + 1}`;
  });
}
addPetBtn.addEventListener("click", addPet);
addPet();

document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const tutor = document.getElementById("tutor").value.trim();
  const street = document.getElementById("street").value.trim();
  const number = document.getElementById("number").value.trim();
  const neighborhood = document.getElementById("neighborhood").value.trim();

  const pets = [...petsContainer.querySelectorAll(".pet-block")].map((block, i) => ({
    name: block.querySelector(".pet-name").value.trim(),
    service: block.querySelector(".pet-service").value
  }));

  let message = `Olá! Quero agendar um atendimento na Spa Pet's.%0A%0A`;
  message += `*Tutor:* ${encodeURIComponent(tutor)}%0A`;
  pets.forEach((pet, i) => {
    message += `%0A*Pet ${i + 1}:* ${encodeURIComponent(pet.name)}%0A`;
    message += `*Serviço:* ${encodeURIComponent(pet.service)}%0A`;
  });
  message += `%0A*Endereço:* ${encodeURIComponent(street)}, ${encodeURIComponent(number)} - ${encodeURIComponent(neighborhood)}%0A`;
  message += `%0APoderia me informar a disponibilidade?`;

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
});

/* Galeria sincronizada: antes e depois sempre avançam juntos. */
const gallery = [
  { before: "gallery/antes-1.jpg", after: "gallery/depois-1.jpg", alt: "Transformação 1" },
  { before: "gallery/antes-2.jpg", after: "gallery/depois-2.jpg", alt: "Transformação 2" },
  { before: "gallery/antes-3.jpg", after: "gallery/depois-3.jpg", alt: "Transformação 3" }
];
let current = 0;
const beforeImg = document.getElementById("beforeImg");
const afterImg = document.getElementById("afterImg");
const dots = document.querySelector(".gallery-dots");

function renderGallery() {
  const item = gallery[current];
  beforeImg.src = item.before;
  afterImg.src = item.after;
  beforeImg.alt = `${item.alt} — antes`;
  afterImg.alt = `${item.alt} — depois`;
  [...dots.children].forEach((dot, i) => dot.classList.toggle("active", i === current));
}
gallery.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", `Ir para transformação ${i + 1}`);
  dot.addEventListener("click", () => { current = i; renderGallery(); });
  dots.appendChild(dot);
});
document.querySelector(".gallery-arrow.prev").addEventListener("click", () => {
  current = (current - 1 + gallery.length) % gallery.length;
  renderGallery();
});
document.querySelector(".gallery-arrow.next").addEventListener("click", () => {
  current = (current + 1) % gallery.length;
  renderGallery();
});
renderGallery();
setInterval(() => {
  current = (current + 1) % gallery.length;
  renderGallery();
}, 5000);

/* Menu mobile */
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

document.getElementById("year").textContent = new Date().getFullYear();
