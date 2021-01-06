// Global Variables
var incTotal, expTotal, budget, expPerc;

// Arrays and IDs
let INC = [];
let EXP = [];
let incId = 0;
let expId = 0;

// HTML Elements
const currentMonth = document.querySelector(".budget__title--month"); // Current Month
const budgetLabel = document.querySelector(".budget__value"); // Remaining Budget
const incomeLabel = document.querySelector(".budget__income--value"); // Income Total
const expensesLabel = document.querySelector(".budget__expenses--value"); // Expenses Total
const expensesPercLabel = document.querySelector(".budget__expenses--percentage"); // Expenses Percentage
const inputType = document.querySelector(".add__type"); // +/- Dropdown
const inputDescription = document.querySelector(".add__description"); // Description Input Area
const inputValue = document.querySelector(".add__value"); // Value Input Area
const inputBtn = document.querySelector(".add__btn"); // Add Button
const container = document.querySelector(".container"); // Income and Expense Container
const incomeContainer = document.querySelector(".income__list"); // Income List
const expensesContainer = document.querySelector(".expenses__list"); // Expenses List

// Show Current Month
const options = { month:'long', year:'numeric' };
const today = new Date();

currentMonth.innerHTML = today.toLocaleDateString( "en-US", options );

// USD Currency Format
function usd(num) {
    return num.toLocaleString("en-US", { style: 'currency', currency: 'USD' });
}

// Update Summary Area
function updateDisplay() {
    // Get Sum of Values in Income Array
    incTotal = INC.reduce(function(a, b) {
        return a + b.value;
      }, 0);
    incomeLabel.innerHTML = usd(incTotal);

    // Get Sum of Values in Expense Array
    expTotal = EXP.reduce(function(a, b) {
        return a + b.value;
      }, 0);
    expensesLabel.innerHTML = "- " + usd(expTotal);

    // Net = Income - Expenses
    budget = incTotal - expTotal;
    budgetLabel.innerHTML = usd(budget);

    // Calculate Expense Percentage if Income > 0
    if (incTotal) {
        expPerc = Math.round( ( expTotal / incTotal ) * 100 )
    } else expPerc = 0;
    expensesPercLabel.innerHTML = `${expPerc}%`;
}

updateDisplay();

// When Clicking the Input Type Dropdown 
inputType.addEventListener( "change", function(event) {
    const isExp = inputType.value === 'exp'; // Type should be exp to trigger toggle
    inputType.classList.toggle("red-focus", isExp);
    inputDescription.classList.toggle("red-focus", isExp);
    inputValue.classList.toggle("red-focus", isExp);
    inputBtn.classList.toggle("red", isExp);
});

// Adding Income and Expense Items
function addItem(type, id, text, value) {

    // Value with Curency Format
    let amount = usd(value);

    // Assign to different containers based on type
    if (type === 'inc') {
        element = ".income__list";
        html =  `<div class="item clearfix" id="income-${id}"> 
                    <div class="item__description">${text}</div>
                    <div class="right clearfix"><div class="item__value">+ ${amount}</div>
                    <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>
                </div>`;
    } else if (type === 'exp') {
        // Calculate value percentage
        let perc = Math.round( ( value / budget ) * 100 );
        element = ".expenses__list";
        html =  `<div class="item clearfix" id="expense-${id}">
                    <div class="item__description">${text}</div>
                    <div class="right clearfix"><div class="item__value">- ${amount}</div>
                    <div class="item__percentage">${perc}%</div>
                    <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>
                </div>`;
    }
    document.querySelector(element).insertAdjacentHTML('beforeend', html);

}

// When Clicking the Input Button
function addObj() {

        // Input Area Values
        const type = inputType.value; // inc or exp
        const text = inputDescription.value; // description
        const value = parseInt(inputValue.value); // value

        // Check if input is empty
        if( text && value ) {
            if (type === 'inc') {
                let id = incId;
                addItem(type, id, text, value);
                // Add to INC Array
                INC.push({
                    type: type,
                    id: id,
                    description: text,
                    value: value
                });
                // Increment List Item Id
                incId++;
                // Update Local Storage
                localStorage.setItem("INCOME", JSON.stringify(INC));
            } else if (type === 'exp') {
                // Check if expense value is less than budget
                if (value <= budget) {
                    let id = expId;
                    addItem(type, id, text, value);
                    // Add to EXP Array
                    EXP.push({
                        type: type,
                        id: id,
                        description: text,
                        value: value,
                    });
                    // Increment List Item Id
                    expId++;
                    // Update Local Storage
                    localStorage.setItem("EXPENSE", JSON.stringify(EXP));
                } else alert("This expense exceeds your available budget.");
            }

        // Clear the input area
        inputDescription.value = "";
        inputValue.value = "";
    } else alert("Please enter a valid value and description.");

    // Update Summary Area
    updateDisplay();

}

inputBtn.addEventListener( "click", addObj );

// Function for Delete Button
function deleteItem(element) {
    if ( element.classList.contains("ion-ios-close-outline") ) {
        let e = element.parentNode.parentNode.parentNode.parentNode;
        e.parentNode.removeChild(e);
    }
}

// // Update Object Id's after Deleting
// function updateId(ARR, key) {
//     ARR.forEach(function(obj) {
//         for (key in obj) {
//             let id = indexOf(obj);
//             obj.key = id;
//         }
//     })
// }

// Remove an Income Item
incomeContainer.addEventListener("click", function (event) {

    // Call Delete Function
    let element = event.target;
    deleteItem(element);

    // Update INC Array
    let parentId = event.target.parentNode.parentNode.parentNode.parentNode.id; // Returns id of parent div
    let id = parseInt(parentId.match(/\d+/)); // Extract number from string id
    INC.splice(id, 1); // Remove object with index = id from array
    // updateId(INC, id);
    // parentId = "income-" + id; // Update id in HTML

    // Update Local Storage
    localStorage.setItem("INCOME", JSON.stringify(INC));

    // Update Summary Area
    updateDisplay();

});

// Remove an Expense Item
expensesContainer.addEventListener("click", function (event) {

    // Call Delete Function
    let element = event.target;
    deleteItem(element);

    // Update EXP Array
    let parentId = event.target.parentNode.parentNode.parentNode.parentNode.id; // Returns id of parent div
    let id = parseInt(parentId.match(/\d+/)); // Extract number from string id
    EXP.splice(id, 1); // Remove object with index = id from array
    // updateId(EXP, id);
    // parentId = "expense-" + id; // Update id in HTML

    // Update Local Storage
    localStorage.setItem("EXPENSE", JSON.stringify(EXP));

    // Update Summary Area
    updateDisplay();

});

// Get INC data from Local Storage
let incData = localStorage.getItem("INCOME");
if(incData) {
    INC = JSON.parse(incData);
    incId = INC.length;
    loadArr(INC); // Load items from storage to interface
    updateDisplay(); // Update summary
} else {
    INC = [];
    incId = 0;
}

// Get EXP data from Local Storage
let expData = localStorage.getItem("EXPENSE");
if(expData) {
    EXP = JSON.parse(expData);
    expId = EXP.length;
    loadArr(EXP); // Load items from storage to interface
    updateDisplay(); // Update summary
} else {
    EXP = [];
    expId = 0;
}

// Show Items from from Local Storage
function loadArr(ARR) {
    ARR.forEach(function(obj) {
        addItem(obj.type, obj.id, obj.description, obj.value);
    });
}