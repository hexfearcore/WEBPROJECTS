// Simple XOR encryption for now (simulate PQC)
function xorEncrypt(text, key) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(result); // Encode to base64
}

function xorDecrypt(encoded, key) {
  let decoded = atob(encoded);
  let result = "";
  for (let i = 0; i < decoded.length; i++) {
    result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

function encryptMessage() {
  const input = document.getElementById("inputMessage").value;
  const key = prompt("Enter encryption key:");
  if (!key) return alert("Key is required!");
  const encrypted = xorEncrypt(input, key);
  document.getElementById("outputMessage").value = encrypted;
}

function decryptMessage() {
  const input = document.getElementById("inputMessage").value;
  const key = prompt("Enter decryption key:");
  if (!key) return alert("Key is required!");
  const decrypted = xorDecrypt(input, key);
  document.getElementById("outputMessage").value = decrypted;
}

function copyToClipboard() {
  const output = document.getElementById("outputMessage");
  output.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
}