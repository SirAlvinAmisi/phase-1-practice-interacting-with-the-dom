document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const counter = document.getElementById("counter"); // The counter display
    const plusButton = document.getElementById("plus"); // Plus button for manual increment
    const minusButton = document.getElementById("minus"); // Minus button for manual decrement
    const likeButton = document.getElementById("heart"); // Like button
    const pauseButton = document.getElementById("pause"); // Pause/Resume button
    const likesList = document.querySelector(".likes"); // List to display likes
    const commentForm = document.getElementById("comment-form"); // Comment form
    const commentList = document.getElementById("list"); // List to display comments
  
    // Timer functionality
    let timerRunning = true; // Flag to track whether the timer is running
    let timer = setInterval(() => {
      // Increment the counter every second
      counter.innerText = parseInt(counter.innerText) + 1;
    }, 1000); // Timer runs every 1000 milliseconds (1 second)
  
    // Increment the counter manually when the plus button is clicked
    plusButton.addEventListener("click", () => {
      counter.innerText = parseInt(counter.innerText) + 1;
    });
  
    // Decrement the counter manually when the minus button is clicked
    minusButton.addEventListener("click", () => {
      counter.innerText = parseInt(counter.innerText) - 1;
    });
  
    // Likes functionality
    let likes = {}; // Object to track how many times each number has been liked
  
    likeButton.addEventListener("click", () => {
      const currentNumber = counter.innerText; // Get the current number from the counter
      if (!likes[currentNumber]) {
        // If the number hasn't been liked yet:
        likes[currentNumber] = 1; // Initialize its like count to 1
        const li = document.createElement("li"); // Create a new list item
        li.dataset.number = currentNumber; // Add a data attribute to track the number
        li.innerText = `${currentNumber} has been liked 1 time`; // Display the like message
        likesList.appendChild(li); // Add the list item to the likes list
      } else {
        // If the number has already been liked:
        likes[currentNumber]++; // Increment the like count
        const li = likesList.querySelector(`[data-number="${currentNumber}"]`); // Find the existing list item
        li.innerText = `${currentNumber} has been liked ${likes[currentNumber]} times`; // Update the like message
      }
    });
  
    // Pause/Resume functionality
    pauseButton.addEventListener("click", () => {
      if (timerRunning) {
        // If the timer is currently running:
        clearInterval(timer); // Stop the timer
        pauseButton.innerText = "resume"; // Change the button text to "resume"
        document.querySelectorAll("button").forEach((btn) => {
          if (btn.id !== "pause") btn.disabled = true; // Disable all buttons except the pause button
        });
      } else {
        // If the timer is currently paused:
        timer = setInterval(() => {
          // Restart the timer
          counter.innerText = parseInt(counter.innerText) + 1;
        }, 1000);
        pauseButton.innerText = "pause"; // Change the button text back to "pause"
        document.querySelectorAll("button").forEach((btn) => {
          btn.disabled = false; // Re-enable all buttons
        });
      }
      timerRunning = !timerRunning; // Toggle the timerRunning flag
    });
  
    // Comment functionality
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the form from submitting normally (i.e., reloading the page)
      const commentInput = document.getElementById("comment-input"); // Get the comment input field
      const commentText = commentInput.value; // Get the text from the input field
  
      if (commentText.trim() !== "") {
        // If the input is not empty:
        const p = document.createElement("p"); // Create a new paragraph element
        p.innerText = commentText; // Set its text to the user's input
        commentList.appendChild(p); // Add the paragraph to the comments list
        commentInput.value = ""; // Clear the input field
      }
    });
  });
  