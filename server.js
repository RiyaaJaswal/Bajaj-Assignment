const axios = require('axios');

// API endpoints
const createAccountUrl = "https://customer-analytics-34146.my.salesforce-sites.com/services/apexrest/createAccount";
const buyStocksUrl = "https://customer-analytics-34146.my.salesforce-sites.com/services/apexrest/buyStocks";

// Your information
const name = "Riya Jaswal";
const email = "riya5040.be21@chitkarauniversity.edu.in";
const rollNumber = 2111985040; // Your roll number
const phoneNumber = "7876356735"; // Your phone number
const companyName = "Bajaj Finserv";

// Step 1: Create Investment Account
const createAccountData = {
    name: name,
    email: email,
    rollNumber: rollNumber,
    phone: phoneNumber
};

axios.post(createAccountUrl, createAccountData, {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (response.status === 200) {
        const accountInfo = response.data;
        const accountNumber = accountInfo.accountNumber;
        console.log("Investment account created successfully. Account Number:", accountNumber);

        // Step 2: Research Bajaj Finserv (Assuming current stock price is 5000)
        const currentStockPrice = 5000;

        // Step 3: Invest in Bajaj Finserv
        const buyStocksData = {
            company: companyName,
            currentPrice: currentStockPrice,
            accountNumber: accountNumber,
            githubRepoLink: "https://github.com/RiyaaJaswal/Bajaj-Stock-api.git"
        };

        const buyStocksHeaders = {
            'Content-Type': 'application/json',
            'bfhl-auth': rollNumber
        };

        axios.post(buyStocksUrl, buyStocksData, {
            headers: buyStocksHeaders
        })
        .then(response => {
            if (response.status === 200) {
                console.log("Successfully invested in", companyName);
            } else {
                console.log("Failed to invest in", companyName, ". Status code:", response.status);
            }
        })
        .catch(error => {
            console.error("Error investing in", companyName, ":", error);
        });
    } else {
        console.log("Failed to create investment account. Status code:", response.status);
    }
})
.catch(error => {
    console.error("Error creating investment account:", error);
});
