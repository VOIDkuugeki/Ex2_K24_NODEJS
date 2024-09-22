var tableBody;
var table;
var data = [];

document.addEventListener('DOMContentLoaded', function() {
    table = document.querySelector('.proTable');


    if (table) {
        tableBody = table.querySelector('tbody');
    } else {
        console.error('Table element with class "proTable" not found.');
        return;
    }
});

function displayMessage(message, type = 'info') {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }, 3000);
}

function preventNegativeInput(event) {
    if (event.target.value < 0) {
        event.target.value = '';
        displayMessage('Negative values are not allowed.', 'error');
    }
}

function save() {
    const nameCus = document.getElementById('nameCus').value;
    const idPro = document.getElementById('idPro').value;
    const namePro = document.getElementById('namePro').value;
    const quantPro = document.getElementById('quantPro').value;
    const pricePro = document.getElementById('pricePro').value;

    // Validate empty inputs
    if (!nameCus || !idPro || !namePro || !quantPro || !pricePro) {
        displayMessage('Please fill in all fields.', 'error');
        return;
    }

    // Validate numeric inputs
    if (isNaN(idPro) || isNaN(quantPro) || isNaN(pricePro)) {
        displayMessage('Please enter valid numeric values for Product ID, Quantity, and Price.', 'error');
        return;
    }

        // Validate non-negative inputs
        if (idPro < 0 || quantPro < 0 || pricePro < 0) {
            displayMessage('Negative values are not allowed.', 'error');
            return;
        }

    const discount = calculateDiscount(quantPro, pricePro);
    const amount = quantPro * pricePro;
    const total = amount - discount;

    const entry = {
        nameCus,
        idPro,
        namePro,
        quantPro,
        pricePro,
        discount,
        amount,
        total
    };

    data.push(entry);
    alert('Data saved successfully!');
    addRowsToTable();
}

function show() {
    if (!table) {
        console.error('Table element with class "proTable" not found.');
        return;
    }

    table.hasAttribute('hidden') ? table.removeAttribute('hidden') : table.setAttribute('hidden', '');
}

function reset() {
    document.getElementById('nameCus').value = '';
    document.getElementById('idPro').value = '';
    document.getElementById('namePro').value = '';
    document.getElementById('quantPro').value = '';
    document.getElementById('pricePro').value = '';
}

function calculateDiscount(quantity, price) {
    return quantity > 10 ? price * 0.1 : 0; // 10% discount if quantity > 10
}

function addRowsToTable() {
    tableBody.innerHTML = ''; // Clear existing rows
    data.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.nameCus}</td>
            <td>${entry.idPro}</td>
            <td>${entry.namePro}</td>
            <td>${entry.quantPro}</td>
            <td>${entry.pricePro}</td>
            <td>${entry.discount}</td>
            <td>${entry.amount}</td>
            <td>${entry.total}</td>
        `;
        tableBody.appendChild(row);
    });
}