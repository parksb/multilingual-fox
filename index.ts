import Tooltip from './src/Tooltip';
import Dictionary from './src/Dictionary';
import { Languages } from './src/models';
import { TriggerKey, keyHolded, toTriggerKey } from './src/models/TriggerKey';

document.addEventListener('mouseup', (e: MouseEvent) => {
  if (Tooltip.getIsOpen() && (e.target !== Tooltip.getDOM())) {
    Tooltip.hide();
  }

  const showTooltip = (key: TriggerKey) => {
    if (!Tooltip.getIsOpen() && keyHolded(key, e)) {
      const word = document.getSelection()?.toString().trim();
      if (word != null && word.length > 0 && word.length < 40) {
        if (Dictionary.load(word) !== Languages.Undefined) {
          Tooltip.show();
        }
      }
    }
  };

  const onError = () => {
    showTooltip(TriggerKey.Unkown);
  };

  const onTriggerKeyGot = (item: any) => {
    showTooltip(toTriggerKey(item.triggerKey));
  };

  const triggerKey = browser.storage.sync.get('triggerKey');
  triggerKey.then(onTriggerKeyGot, onError);
});
