const popup = document.getElementById("popup");
let editIndex = null;

function showPopup() {
  popup.style.display = "flex";
}

function hidePopup() {
  popup.style.display = "none";
  clearForm();
  editIndex = null;
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("description").value = "";
  document.getElementById("cover").value = "";
  document.getElementById("category").value = "";
}

function deleteImage() {
  document.getElementById("currentCover").value = "";
  const imagePreview = document.getElementById("imagePreview");
  imagePreview.src = "";
  imagePreview.style.display = "none";
}