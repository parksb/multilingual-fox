function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    triggerKey: document.querySelector('input[name="trigger-key"]:checked').value,
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector(`#${result.triggerKey}`).checked = true;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  const getting = browser.storage.sync.get('triggerKey');
  getting.then(setCurrentChoice, onError);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
