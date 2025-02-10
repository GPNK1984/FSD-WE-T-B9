let transactions,editId; //variables declaration

//Init method of the expense calculator
const initExpenseCalculator=()=>{
    document.addEventListener("DOMContentLoaded", function () {
        transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        editId = null;
        renderTransactions();
        addTransactionEvent();
        filterRadioBtnEvent();
        resetBtnEvents();
    });
}

//Add Transction button event
const addTransactionEvent=()=>{

    const transctionBtn=document.getElementById("addTransaction");

    transctionBtn.addEventListener("click", function () {
        const description = document.getElementById("description").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const type = document.getElementById("type").value;

        if (!description || isNaN(amount)) return;

        if (editId !== null) {
            transactions = transactions.map(t => t.id === editId ? { id: editId, description, amount, type } : t);
            editId = null;
        } else {
            transactions.push({ id: Date.now(), description, amount, type });
        }

        localStorage.setItem("transactions", JSON.stringify(transactions));
        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
        
        renderTransactions();
    });
}

//Main method to filter all the line items and do the core logic of expense calculator
const renderTransactions=()=> {
    
    const filter = document.querySelector('input[name="filter"]:checked').value;
    const list = document.getElementById("transactionList");
    list.innerHTML = "";
    let income = 0, expense = 0;

    //Filter logic
    transactions.filter(t => filter === "all" || t.type === filter)
        .forEach(t => {
            const item = document.createElement("li");
            item.classList.add("flex", "justify-between", "p-2", "border", "rounded",);
            item.innerHTML = `<span>${t.description} - ${t.type === "income" ? "+" : "-"}$${t.amount}</span>
                <div class='flex space-x-2'>
                    <button onclick="editTransaction(${t.id})" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                    <button onclick="deleteTransaction(${t.id})" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Delete</button>
                </div>`;
            list.appendChild(item);
            t.type === "income" ? (income += t.amount) : (expense += t.amount);
        });
    //
    
    //Setting up the total income, expense and balace data
    document.getElementById("totalIncome").textContent = `$${income}`;
    document.getElementById("totalExpense").textContent = `$${expense}`;
    document.getElementById("balance").textContent = `$${income - expense}`;
    //
}

//All, Income and Expense Radio button event
const filterRadioBtnEvent=()=>{
    document.querySelectorAll('input[name="filter"]').forEach(radio => {
        radio.addEventListener("change", renderTransactions);
    });
}

//Reset btn event
const resetBtnEvents=()=>{
    document.getElementById("reset").addEventListener("click", function () {
        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
    });
}

//Delete the expense or income line item
const deleteTransaction =  (id) => {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
};

//Edit the expense or income line item
const editTransaction =  (id) => {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;
    document.getElementById("description").value = transaction.description;
    document.getElementById("amount").value = transaction.amount;
    document.getElementById("type").value = transaction.type;
    editId = id;
};

//Method call to invoke the expense calculator
initExpenseCalculator();