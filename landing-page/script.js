// ========================
// SHOP NOW BUTTON
// ========================
function handleShopNow() {
  alert("Welcome to GreenLeaf! Start shopping for fresh organic products.");
}

// ========================
// LEARN MORE BUTTON
// ========================
function handleLearnMore() {
  alert("GreenLeaf was founded in 2020. We work with 80+ organic farms to bring you the best products!");
}

// ========================
// CONTACT FORM SUBMIT
// ========================
function handleFormSubmit() {
  var name = document.getElementById("nameInput").value;
  var email = document.getElementById("emailInput").value;
  var message = document.getElementById("messageInput").value;

  // Check if fields are empty
  if (name == "" || email == "" || message == "") {
    alert("Please fill in all fields before sending.");
    return;
  }

  // Show success message
  var successMsg = document.getElementById("successMsg");
  successMsg.textContent = "✅ Thank you, " + name + "! Your message has been sent.";

  // Clear the form
  document.getElementById("nameInput").value = "";
  document.getElementById("emailInput").value = "";
  document.getElementById("messageInput").value = "";
}
