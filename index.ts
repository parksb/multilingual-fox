import Tooltip from './src/Tooltip';
import Dictionary from './src/Dictionary';
import { Languages } from './src/models';

document.addEventListener('mouseup', (e) => {
  if (Tooltip.getIsOpen() && (e.target !== Tooltip.getDOM())) {
    Tooltip.hide();
  }

  if (!Tooltip.getIsOpen() && e.altKey)  {
    const word = document.getSelection().toString().trim();
    if (word.length > 0 && word.length < 40) {
      if (Dictionary.load(word) !== Languages.Undefined) {
        Tooltip.show();
      }
    }
  }
});
