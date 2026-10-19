// =====================================================
// LETRALIA: SCRIPT DE INTERACCIÓN
// =====================================================

// Conjunto de vocales para el filtro
const vowels = new Set(["A", "E", "I", "O", "U"]);

// Conjunto para llevar el registro de letras descubiertas (sin duplicados)
const viewed = new Set();

// Elementos del DOM existentes o agregados para contador y filtros
const letterCards = document.querySelectorAll(".letter-card");
const progressCount = document.querySelector("#progress-count") || document.querySelector("#contador-descubiertas");
const vowelsFilter = document.querySelector("#vowels-filter") || document.querySelector("[data-filter='vowels']");
const allFilter = document.querySelector("#all-filter") || document.querySelector("[data-filter='all']");

/**
 * Función principal para voltear una tarjeta (mantiene la lógica previa)
 */
function flipCard(card) {
  const isFlipped = card.classList.toggle("volteada");
  const letter = card.dataset.letter;

  // Actualización de atributos de accesibilidad (ARIA)
  card.setAttribute("aria-pressed", String(isFlipped));
  card.setAttribute(
    "aria-label",
    isFlipped ? `Volver a mostrar la letra ${letter}` : `Descubrir la letra ${letter}`
  );

  const front = card.querySelector(".card-front");
  const back = card.querySelector(".card-back");

  if (front) front.setAttribute("aria-hidden", String(isFlipped));
  if (back) back.setAttribute("aria-hidden", String(!isFlipped));

  // --- LÓGICA DEL CONTADOR ---
  if (isFlipped && letter) {
    viewed.add(letter.toUpperCase());
    if (progressCount) {
      progressCount.textContent = String(viewed.size);
    }
  }
}

/**
 * Escuchadores de eventos para cada tarjeta (click e interacción por teclado)
 */
for (const card of letterCards) {
  card.addEventListener("click", () => flipCard(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      flipCard(card);
    }
  });
}

/**
 * LÓGICA DE FILTRADO (Todas vs Vocales)
 */
function applyFilter(filterType) {
  letterCards.forEach((card) => {
    const letter = card.dataset.letter ? card.dataset.letter.toUpperCase() : "";

    if (filterType === "vowels") {
      // Si el filtro es vocales, muestra solo si la letra está en el Set de vocales
      card.style.display = vowels.has(letter) ? "" : "none";
    } else {
      // Mostrar todas las tarjetas
      card.style.display = "";
    }
  });

  // Actualizar estados visuales y accesibilidad de los botones de filtro
  if (vowelsFilter) {
    const isVowels = filterType === "vowels";
    vowelsFilter.classList.toggle("active", isVowels);
    vowelsFilter.classList.toggle("is-active", isVowels);
    vowelsFilter.setAttribute("aria-pressed", String(isVowels));
  }

  if (allFilter) {
    const isAll = filterType === "all";
    allFilter.classList.toggle("active", isAll);
    allFilter.classList.toggle("is-active", isAll);
    allFilter.setAttribute("aria-pressed", String(isAll));
  }
}

// Eventos para los botones de filtro si existen en el HTML
if (vowelsFilter) {
  vowelsFilter.addEventListener("click", () => applyFilter("vowels"));
}

if (allFilter) {
  allFilter.addEventListener("click", () => applyFilter("all"));
}