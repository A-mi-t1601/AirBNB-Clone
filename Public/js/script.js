(() => {
  "use strict";

  // Fetch All The Forms We Want To Apply Custom Bootstrap Validation Styles To
  const forms = document.querySelectorAll(".needs-validation");

  // Loop Over Them And Prevent Submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
