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
  const contactEmail = form.getAttribute("data-contact-email") || "";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const originalBtnText = submitBtn ? submitBtn.textContent : "";
    const fullName = formData.get("full_name") || "";
    const workEmail = formData.get("work_email") || "";
    const company = formData.get("company") || "";
    const enquiryType = formData.get("enquiry_type") || "";
    const projectOverview = formData.get("project_overview") || "";
    const timeline = formData.get("timeline") || "Not provided";

    if (!contactEmail) {
      if (statusEl) {
        statusEl.classList.add("error");
        statusEl.textContent = "[ ERROR: CONTACT ROUTE NOT CONFIGURED ]";
      }
      return;
    }

    if (statusEl) {
      statusEl.classList.remove("success", "error");
      statusEl.textContent = "[ ROUTING_BRIEF_TO_COMMAND... ]";
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Routing...";
    }

    const subject = encodeURIComponent(`[Business Enquiry] ${enquiryType}`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${workEmail}\nCompany: ${company}\nEnquiry Type: ${enquiryType}\nTimeline: ${timeline}\n\nProject Overview:\n${projectOverview}`
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

    if (statusEl) {
      statusEl.classList.add("success");
      statusEl.textContent = "[ SUCCESS: BRIEF ROUTED ]";
    }

    form.reset();
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
});
