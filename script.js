document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const toatalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let toatalAmount = calculateTotal();

    renderExpenses();

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if(name !== "" && !isNaN(amount) && amount > 0){
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount,
            } ;
            expenses.push(newExpense);
            saveExpensesToLocal();  
            renderExpenses();
            updateTotal();

            expenseNameInput.value ="";//clear input
            expenseAmountInput.value="";
        }
    });

    function renderExpenses(){
        expenseList.innerHTML ="";
        expenses.forEach(expense =>{
            const li = document.createElement('li');
            li.innerHTML= `
            ${expense.name} - ${expense.amount}
            <button data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);
        })
    }
    function calculateTotal(){
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    function saveExpensesToLocal(){
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function updateTotal(){
        toatalAmount = calculateTotal();
        toatalAmountDisplay.textContent = toatalAmount.toFixed(2);
    }

    expenseList.addEventListener('click',(e) =>{
        if(e.target.tagname === "BUTTON"){
            const expenseId = e.target.getAttribute('data-id');
            expenses = expenses.filter(expense =>expense.id !== expenseId);

            saveExpensesToLocal();
            renderExpenses();
            updateTotal();
        }
    })
});



// document.addEventListener('DOMContentLoaded', () => {
//     const expenseForm = document.getElementById("expense-form");
//     const expenseNameInput = document.getElementById("expense-name");
//     const expenseAmountInput = document.getElementById("expense-amount");
//     const expenseList = document.getElementById("expense-list");
//     const totalAmountDisplay = document.getElementById("total-amount"); // Fixed typo in 'totalAmountDisplay'

//     let expenses = [];
//     let totalAmount = calculateTotal();

//     expenseForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         const name = expenseNameInput.value.trim();
//         const amount = parseFloat(expenseAmountInput.value.trim());

//         if (name !== "" && !isNaN(amount) && amount > 0) { // Fixed logic: isNaN should be negated
//             const newExpense = {
//                 id: Date.now(),
//                 name: name,
//                 amount: amount,
//             };
//             expenses.push(newExpense);
//             saveExpensesToLocal();  
//         }
//     });

//     function calculateTotal() {
//         return expenses.reduce((total, expense) => total + expense.amount, 0); // Added total calculation
//     }

//     function saveExpensesToLocal() {
//         localStorage.setItem('expenses', JSON.stringify(expenses));
//     }
// });
