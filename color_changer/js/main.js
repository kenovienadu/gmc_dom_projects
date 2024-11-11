const getRandomColor = () => {
  // Generate random RGB values
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Convert the RGB values to a hexadecimal color string
  const hexR = r.toString(16).padStart(2, '0');
  const hexG = g.toString(16).padStart(2, '0');
  const hexB = b.toString(16).padStart(2, '0');

  return `#${hexR}${hexG}${hexB}`;
}

document.addEventListener('DOMContentLoaded', function() {
  const box = document.getElementById('color-box');
  const button = document.getElementById('change-color-btn');

  if (!box || !button) {
    return;
  }

  // Change background when the button is clicked
  button.addEventListener('click', () => {
    box.style.backgroundColor = getRandomColor();
  })
});