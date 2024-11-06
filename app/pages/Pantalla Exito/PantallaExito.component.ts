function openPopup() {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.style.display = "block";
  }
  const popupOverlay = document.getElementById("popup-overlay");
  if (popupOverlay) {
    popupOverlay.style.display = "block";
  }
}

function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.style.display = "none";
  }
  const popupOverlay = document.getElementById("popup-overlay");
  if (popupOverlay) {
    popupOverlay.style.display = "none";
  }
}
