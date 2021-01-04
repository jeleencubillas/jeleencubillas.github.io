// Variables
let LIST = [];
let id = 0;

// HTML Elements
const clear = document.querySelector(".clear"); // Clear or Refresh Button
const dateElement = document.getElementById("date"); // Date Today
const list = document.getElementById("list"); // List Area
const input = document.getElementById("input"); // Input Area

// Classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Show Today's date
const options = { weekday:'long', month:'short', day:'numeric' }
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString( "en-US", options );

// Add a To-Do List Item
function addToDo(toDo, id, done, trash) {
    // Check if item is on trash
    if (trash) {
        return;
    }
    // Check if item is completed
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const text =    `<li class="item">
                        <i class="co fa ${DONE}" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="de fa fa-trash-alt" job="delete" id="${id}"></i>    
                    </li>`

    const position = "beforeend";

    list.insertAdjacentHTML(position, text);
}

// Enable Add Item When Pressing Enter
document.addEventListener( "keyup", function(event) {
    if(event.keyCode == 13) {
        const toDo = input.value;
        // Check if input is empty
        if(toDo) {
            addToDo(toDo, id, false, false);
            // Add To Do to List Array
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            // Update Array in Local Storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            // Increment List Item Id
            id++;
        }
        // Clear the input area
        input.value = "";
    }
});

// Complete To Do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    // Update List Item in Array
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove To Do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    // Update List Item in Array
    LIST[element.id].trash = true;
}

// Event Listener for Each List Item
list.addEventListener("click", function (event) {
    const element = event.target; // return the clicked element in list area
    const elementJOB = event.target.attributes.job.value; // return complete or delete
    if(elementJOB == "complete") {
        completeToDo(element); // run Complete To Do
    } else if(elementJOB == "delete") {
        removeToDo(element); // run Remove To Do
    }
    // Update Array in Local Storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

// Get data from Local Storage
let data = localStorage.getItem("TODO");
if(data) {
    LIST = JSON.parse(data);
    id = LIST.length; // So Id won't go back to 0
    loadList(LIST); // Load items from storage to interface
} else {
    LIST = [];
    id = 0;
}

// Load To Do Items from Local Storage
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Clear Local Storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})

/**  // List Array
let LIST = [];
let id = 0;

LIST = [{}, {}, ... ];

LIST [0] => 

{
    name : "Drink Coffee",
    id : 0,
    done : false,
    trash : false
}

LIST [1] => 

{
    name : "Workout",
    id : 1,
    done : true,
    trash : false
}

// Clear Local Storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})

const element = document.getElementById("element");





// Input Area


// Save to Local Storage
localStorage.setItem("TODO", JSON.stringify(LIST));
let data = localStorage.getItem("TODO");
if(data) {
    LIST = JSON.parse(data);
    loadToDolist(LIST);
    id = LIST.length; 
} else {
    LIST = [];
    id = 0;
}

 */ 