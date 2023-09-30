 var selectedDate = null; // Store the selected date globally

        function showEditDialog(cell) {
            var currentDate = new Date(currentYear, currentMonth, parseInt(cell.textContent));
            var notes = getNotes(currentDate);
            var noteText = notes || "";

            if (selectedDate && currentDate.getTime() === selectedDate.getTime()) {
                // If the clicked date matches the selected date, show the note
                var popupContainer = document.getElementById("popup-container");
                var popup = document.getElementById("popup");
                var noteTextArea = document.getElementById("noteText");

                noteTextArea.value = noteText;
                popupContainer.style.display = "block";

                var saveButton = document.querySelector("#popup button");
                saveButton.onclick = function () {
                    saveNote();
                    popupContainer.style.display = "none";
                };
            } else {
                // If the clicked date is different, just select it for future editing
                selectedDate = currentDate;
            }
        }

        function saveNote() {
            var noteTextArea = document.getElementById("noteText");
            var userInput = noteTextArea.value;
            saveNotes(selectedDate, userInput);
            noteTextArea.value = ""; // Clear the input after saving
            selectedDate = null; // Reset selectedDate
            document.getElementById("popup-container").style.display = "none"; // Close the dialog
        }

        // Rest of your calendar code here

        var currentYear, currentMonth;
        var tableBody = document.getElementById("calendar-body");

        function initializeCalendar() {
            var today = new Date();
            currentYear = today.getFullYear();
            currentMonth = today.getMonth();
            renderCalendar();
        }

        function incrementMonth() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        }

        function decrementMonth() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        }

        function renderCalendar() {
            var firstDayOfMonth = new Date(currentYear, currentMonth, 1);
            var lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
            var daysInMonth = lastDayOfMonth.getDate();
            var startingDay = firstDayOfMonth.getDay();

            var monthYearHeader = document.getElementById("month-year");
            monthYearHeader.textContent = new Date(currentYear, currentMonth, 1)
                .toLocaleDateString("en-US", { month: "long", year: "numeric" });

            tableBody.innerHTML = "";

            var date = 1;
            for (var i = 0; i < 6; i++) {
                var row = document.createElement("tr");
                for (var j = 0; j < 7; j++) {
                    if ((i === 0 && j < startingDay) || date > daysInMonth) {
                        row.innerHTML += "<td></td>";
                    } else {
                        var cell = document.createElement("td");
                        cell.textContent = date;
                        cell.addEventListener("click", function () {
                            showEditDialog(this);
                        });
                        row.appendChild(cell);
                        date++;
                    }
                }
                tableBody.appendChild(row);
            }
        }

        function saveNotes(date, note) {
            var dateString = date.toISOString().split("T")[0];
            localStorage.setItem(dateString, note);
        }

        function getNotes(date) {
            var dateString = date.toISOString().split("T")[0];
            return localStorage.getItem(dateString);
        }

        // Initialize the calendar
        initializeCalendar();