document.querySelector("#signup-form").addEventListener("submit", function(event) {
            event.preventDefault();

            // Reset error messages
            document.getElementById("signup-email-error").textContent = "";
            document.getElementById("signup-password-error").textContent = "";
            document.getElementById("signup-confirm-error").textContent = "";
            document.getElementById("signup-general-error").textContent = "";

            const emailInput = document.querySelector("#signup-email");
            const emailValue = emailInput.value.trim();

            const passwordInput = document.querySelector("#signup-password");
            const passwordValue = passwordInput.value.trim();

            const confirmInput = document.querySelector("#pass");
            const confirmValue = confirmInput.value.trim();

            if (!isValidEmail(emailValue)) {
                document.getElementById("signup-email-error").textContent = "Enter a valid email";
                return;
            }

            if (passwordValue.length < 7) {
                document.getElementById("signup-password-error").textContent = "Password must have at least 7 characters";
                return;
            }

            if (passwordValue !== confirmValue) {
                document.getElementById("signup-confirm-error").textContent = "Passwords do not match";
                return;
            }

            // If all validations pass, redirect to home.html
            window.location.href = "home.html";
        });

        function isValidEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }
        