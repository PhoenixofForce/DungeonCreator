import { writable } from 'svelte/store';
export { error, setError, resetError }

const error = writable({ message: "", timeout: {}});

function setError(message) {
  error.update(e => {
    e.message = message;

    if(e.timeout) clearTimeout(e.timeout);
    if(message) e.timeput = setInterval(resetError , 5 * 1000);

    return e;
  });
}

function resetError() {
  setError("");
}
