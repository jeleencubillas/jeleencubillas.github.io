// Submit Name Button
function showName() {
  let name = document.getElementById("name-field").value;
  document.getElementById("display-text").innerHTML = name;
  }

document.getElementById("enter-name").addEventListener("click", showName);

// Say Hello Button
function sayHello() {
  let name = document.getElementById("name-field").value;
  document.getElementById("display-text").innerHTML = `Hello, ${name}!`;
  }

document.getElementById("say-hello").addEventListener("click", sayHello);

// Say Goodbye Button
function sayBye() {
  let name = document.getElementById("name-field").value;
  document.getElementById("display-text").innerHTML = `Goodbye, ${name}!`;
  }

document.getElementById("say-bye").addEventListener("click", sayBye);

// Clear Button
function clear() {
  document.getElementById("display-text").innerHTML = "0";
  document.getElementById("name-field").value = " ";
  }

document.getElementById("clear").addEventListener("click", clear);

// Name Buttons
// Aida
function name1() {
  const name1 = document.getElementById("name-1").innerHTML;
  document.getElementById("name-field").value = name1;
}

document.getElementById("name-1").addEventListener("click", name1);

// Lorna
function name2() {
  const name2 = document.getElementById("name-2").innerHTML;
  document.getElementById("name-field").value = name2;
}

document.getElementById("name-2").addEventListener("click", name2);

// Fe
function name3() {
  const name3 = document.getElementById("name-3").innerHTML;
  document.getElementById("name-field").value = name3;
}

document.getElementById("name-3").addEventListener("click", name3);
