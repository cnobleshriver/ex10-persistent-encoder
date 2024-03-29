import { Decoder } from "./decoder.js";

// Create a decoder object.
const decoder = new Decoder("");

// Assign event handlers to events.
const keyTextInput = document.getElementById("key");
keyTextInput.style.backgroundColor = "yellow";
keyTextInput.addEventListener("keyup", validateKeyTextInput);

const encodeTextBox = document.getElementById("encode");
encodeTextBox.addEventListener("keyup", encodeText);
encodeTextBox.addEventListener("keyup", colorEncodedTextBox);

const decodeTextBox = document.getElementById("decode");
decodeTextBox.addEventListener("keyup", decodeText);
decodeTextBox.addEventListener("keyup", colorDecodedTextBox);

// TASK #3: Add event handlers for cypher key, encode, and decode text boxes.
//   Every time the user types in a character, the cypher key and the
//   encoded/decoded text boxes should have their state saved.
keyTextInput.addEventListener("keyup", saveState);
encodeTextBox.addEventListener("keyup", saveState);
decodeTextBox.addEventListener("keyup", saveState);

// TASK #3: Add an event handler for the clear button.
//   When the user clicks the clear button, the state should be cleared.
const clearButton = document.getElementById("clear-state");
clearButton.addEventListener("click", clearState);

// TASK #3: Call restoreState() to restore the state of the text boxes.
//   This will restore the state of the app when loaded/reloaded.
restoreState();

function saveState() {
  // TASK #3: Save the state of the cypher key, encode, and decode text boxes.
  //   Use the localStorage object to store the state. Make sure you use
  //   JSON.stringify() to convert the state to a string.
  let state = {
    key: keyTextInput.value,
    encode: encodeTextBox.value,
    decode: decodeTextBox.value
  };
  localStorage.setItem("state", JSON.stringify(state));
}

function restoreState() {
  // TASK #3: Restore the state of cypher key, encode, and decode text boxes.
  //   Use the localStorage object to restore the state. Make sure you use the
  //   JSON.parse() method to convert the state string to an object.
  let state = JSON.parse(localStorage.getItem("state"));
  if (state !== null) {
    keyTextInput.value = state.key;
    encodeTextBox.value = state.encode;
    decodeTextBox.value = state.decode;
    validateKeyTextInput();
    colorEncodedTextBox();
    colorDecodedTextBox();
  }
}

function clearState() {
  // TASK #3: Clear the state of the cypher key, encode, and decode text boxes.
  //   Use the localStorage object to clear the state. You can use the
  //   remoteItem() method to clear the state.
  keyTextInput.value = "";
  encodeTextBox.value = "";
  decodeTextBox.value = "";
  localStorage.removeItem("state")
}

/**
 * Validate the cipher key text input.
 */
function validateKeyTextInput() {
  if (
    keyTextInput.value !== keyTextInput.value.toLowerCase() ||
    keyTextInput.value.length !== 26
  ) {
    keyTextInput.style.backgroundColor = "yellow";
  } else {
    keyTextInput.style.backgroundColor = "white";
    decoder.cipher = keyTextInput.value;
    encodeText();
    decodeText();
  }
}

/**
 * Color the encoded text box.
 */
function colorEncodedTextBox() {
  const encodedTextBox = document.getElementById("encoded");
  if (encodedTextBox.value.length === 0) {
    encodedTextBox.style.color = "black";
    encodedTextBox.style.backgroundColor = "white";
  } else {
    encodedTextBox.style.color = "white";
    encodedTextBox.style.backgroundColor = "red";
  }
}

/**
 * Encode the text in the encode text box.
 */
function encodeText() {
  const encodeTextBox = document.getElementById("encode");
  const encodedTextBox = document.getElementById("encoded");
  encodedTextBox.value = decoder.encode(encodeTextBox.value);
}

/**
 * Color the decoded text box.
 */
function colorDecodedTextBox() {
  const decodedTextBox = document.getElementById("decoded");
  if (decodedTextBox.value.length === 0) {
    decodedTextBox.style.color = "black";
    decodedTextBox.style.backgroundColor = "white";
  } else {
    decodedTextBox.style.color = "white";
    decodedTextBox.style.backgroundColor = "green";
  }
}

/**
 * Decode the text in the decode text box.
 */
function decodeText() {
  const decodeTextBox = document.getElementById("decode");
  const decodedTextBox = document.getElementById("decoded");
  decodedTextBox.value = decoder.decode(decodeTextBox.value);
}
