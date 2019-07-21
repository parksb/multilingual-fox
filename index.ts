import Tooltip from './src/Tooltip';
import Dictionary from './src/Dictionary';

document.addEventListener('mouseup', (e) => {
  if (Tooltip.getIsOpen() && e.target !== Tooltip.getDOM()) {
    Tooltip.hide();
  }

  const word = document.getSelection().toString().trim();
  if (word.length > 0 && word.length < 40) {
    Dictionary.load(word);
    Tooltip.show();
  }
});
