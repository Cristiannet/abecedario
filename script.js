const letterCards = document.querySelectorAll(".letter-card[data-tipo]");

function flipCard(card) {
  const isFlipped = card.classList.toggle("volteada");
  const letter = card.dataset.letter;

  card.setAttribute("aria-pressed", String(isFlipped));
  card.setAttribute(
    "aria-label",
    isFlipped
      ? `Volver a mostrar la letra ${letter}`
      : `Descubrir la letra ${letter}`
  );

  card.querySelector(".card-front").setAttribute(
    "aria-hidden",
    String(isFlipped)
  );

  card.querySelector(".card-back").setAttribute(
    "aria-hidden",
    String(!isFlipped)
  );
}

for (const card of letterCards) {
  card.addEventListener("click", () => flipCard(card));

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      flipCard(card);
    }
  });
}