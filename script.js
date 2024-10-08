const toggleMode = document.getElementById("toggleMode");
const toggleText = document.getElementById("toggleText");
const imageToBase64Section = document.getElementById("imageToBase64Section");
const base64ToImageSection = document.getElementById("base64ToImageSection");
const base64Output = document.getElementById("base64Output");
const convertedBase64 = document.getElementById("convertedBase64");
const output = document.getElementById("output");
const convertedImage = document.getElementById("convertedImage");

// Toggle Button Logic
toggleMode.addEventListener("click", () => {
  if (imageToBase64Section.classList.contains("hidden")) {
    imageToBase64Section.classList.remove("hidden");
    base64ToImageSection.classList.add("hidden");
    toggleText.textContent = "Convert Image to Base64";
  } else {
    imageToBase64Section.classList.add("hidden");
    base64ToImageSection.classList.remove("hidden");
    toggleText.textContent = "Convert Base64 to Image";
  }
});

// Convert Image to Base64
document.getElementById("convertToBase64").addEventListener("click", () => {
  const fileInput = document.getElementById("imageInput").files[0];
  if (fileInput) {
    const reader = new FileReader();
    reader.onload = function () {
      convertedBase64.value = reader.result;
      base64Output.classList.remove("hidden");
    };
    reader.readAsDataURL(fileInput);
  } else {
    alert("Please select an image file.");
  }
});

// Convert Base64 to Image
document.getElementById("convertToImage").addEventListener("click", () => {
  const base64Input = document.getElementById("base64Input").value;
  if (base64Input.startsWith("data:image") && base64Input.includes("base64,")) {
    convertedImage.src = base64Input;
    output.classList.remove("hidden");
  } else {
    alert("Please enter a valid Base64 image string.");
  }
});

// Download Converted Image
document.getElementById("downloadImage").addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = convertedImage.src;
  link.download = "converted_image.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Copy Base64 to Clipboard
document.getElementById("copyBase64").addEventListener("click", () => {
  if (convertedBase64.value) {
    navigator.clipboard.writeText(convertedBase64.value);
    displayNotification("Base64 string copied to clipboard.");
  }
});

// Download Base64 as Text File
document.getElementById("downloadBase64").addEventListener("click", () => {
  if (convertedBase64.value) {
    const base64Content = convertedBase64.value;
    const blob = new Blob([base64Content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'base64_output.txt';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});

// Upload Text File and Convert Base64 to Image
document.getElementById("uploadTxtFile").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Content = e.target.result;
      convertedBase64.value = base64Content;
      if (base64Content.startsWith("data:image") && base64Content.includes("base64,")) {
        convertedImage.src = base64Content;
        output.classList.remove("hidden");
      } else {
        alert("The uploaded text file does not contain a valid Base64 image string.");
      }
    };
    reader.readAsText(file);
  } else {
    alert("Please select a .txt file containing Base64 data.");
  }
});

// Function for custom notifications
function displayNotification(message) {
  const notification = document.createElement("div");
  notification.className = "fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-md";
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
