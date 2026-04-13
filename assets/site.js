const bootSequence = document.getElementById("boot-sequence");

if (bootSequence) {
  window.setTimeout(() => {
    bootSequence.classList.add("hidden");
    window.setTimeout(() => {
      bootSequence.remove();
    }, 320);
  }, 1000);
}

const networkForms = document.querySelectorAll(".network-form");

networkForms.forEach((form) => {
  const statusEl = form.nextElementSibling;
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const originalBtnText = submitBtn ? submitBtn.textContent : "";

    if (statusEl) {
      statusEl.classList.remove("success", "error");
      statusEl.textContent = "[ TRANSMITTING_UPLINK... ]";
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    try {
      await fetch(form.action, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      form.reset();
      if (statusEl) {
        statusEl.classList.add("success");
        statusEl.textContent = "[ SUCCESS: UPLINK ESTABLISHED ]";
      }
    } catch (error) {
      if (statusEl) {
        statusEl.classList.add("error");
        statusEl.textContent = "[ ERROR: LINK INTERRUPTED ]";
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
});

const businessForms = document.querySelectorAll(".business-form");

businessForms.forEach((form) => {
  const statusEl = form.nextElementSibling;
  const submitBtn = form.querySelector('button[type="submit"]');
 
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const originalBtnText = submitBtn ? submitBtn.textContent : "";

    if (statusEl) {
      statusEl.classList.remove("success", "error");
      statusEl.textContent = "[ ROUTING_BRIEF_TO_COMMAND... ]";
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Routing...";
    }

    try {
      await fetch(form.action, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      form.reset();
      if (statusEl) {
        statusEl.classList.add("success");
        statusEl.textContent = "[ SUCCESS: BRIEF ROUTED ]";
      }
    } catch (error) {
      if (statusEl) {
        statusEl.classList.add("error");
        statusEl.textContent = "[ ERROR: LINK INTERRUPTED ]";
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
});
