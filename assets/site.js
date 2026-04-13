const bootSequence = document.getElementById("boot-sequence");

if (bootSequence) {
  window.setTimeout(() => {
    bootSequence.classList.add("hidden");
    window.setTimeout(() => {
      bootSequence.remove();
    }, 320);
  }, 1000);
}
