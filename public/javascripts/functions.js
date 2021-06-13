/* File name: functions.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/05/28
 */

// Example starter JavaScript for disabling form submissions if there are invalid fields
window.addEventListener(
  "load",
  function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.getElementsByClassName("needs-validation");
    // Loop over them and prevent submission
    const validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            const submitButton = document.querySelector(
              "button[type='submit']"
            );
            submitButton.disabled = true;
            submitButton.classList.add("disabled");
            submitButton.innerHTML = `<div class="spinner-border spinner-border-sm" role="status">
            <span class="sr-only">Loading...</span>
          </div>`;
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  },
  false
);
