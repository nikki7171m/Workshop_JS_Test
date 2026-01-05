// ทำให้สามารถลากและวางการ์ดได้ (Drag & Drop)
const cards = document.querySelectorAll('.card');
const swimlanes = document.querySelectorAll('.swimlane');

cards.forEach(card => {
  card.addEventListener('dragstart', () => {
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });
});

swimlanes.forEach(lane => {
  lane.addEventListener('dragover', e => {
    e.preventDefault();
    const draggingCard = document.querySelector('.dragging');
    lane.appendChild(draggingCard);
  });
});
