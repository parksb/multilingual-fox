import Tooltip from './src/Tooltip';
import Dictionary from './src/Dictionary';
import { Languages } from './src/models';

document.addEventListener('mouseup', (e) => {
  if (Tooltip.getIsOpen() && (e.target !== Tooltip.getDOM())) {
    Tooltip.hide();
  }

  const showTooltip = (withAlt: boolean) => {
    const keyHolded = withAlt ? e.altKey : true;
    if (!Tooltip.getIsOpen() && keyHolded) {
      const word = document.getSelection()?.toString().trim();
      if (word != null && word.length > 0 && word.length < 40) {
        if (Dictionary.load(word) !== Languages.Undefined) {
          Tooltip.show();
        }
      }
    }
  };

  const onError = () => {
    showTooltip(true);
  };

  const onTriggerKeyGot = (item: { triggerKey: 'with-alt' | 'without-any-key' }) => {
    showTooltip(item.triggerKey === 'with-alt');
  };

  const triggerKey = browser.storage.sync.get('triggerKey');
  triggerKey.then(onTriggerKeyGot, onError);
});
