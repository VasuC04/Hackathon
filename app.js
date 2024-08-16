// Mobile menu toggle
let users = JSON.parse(localStorage.getItem('users')) || [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mobile-menu').addEventListener('click', function() {
        this.classList.toggle('is-active');
        document.querySelector('.navbar__menu').classList.toggle('active');
    });
});

// Function to register a new user
function registerUser(name, email, password) {
    // Check if the email already exists
    if (users.some(user => user.email === email)) {
        alert('User already exists!');
        return false;
    }

    // Add the new user
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify({ name, email }));
    return true;
}

// Function to log in a user
function loginUser(email, password) {
    let user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        return true;
    } else {
        alert('Invalid email or password!');
        return false;
    }
}

// Function to check if a user is logged in
function checkLoggedInUser() {
    let user = JSON.parse(localStorage.getItem('loggedInUser'));
    return user ? user : null;
}

// Function to log out a user
function logoutUser() {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
}

// Function to connect to MetaMask and send a transaction
async function connectMetaMaskAndSendTransaction() {
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

                        const contractABI = [ [
                {
                    "inputs": [],
                    "name": "pay",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "PaymentReceived",
                    "type": "event"
                },
                {
                    "inputs": [],
                    "name": "withdraw",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "contractBalance",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ] ];
            const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; 

            // Log contract ABI and address for debugging
            console.log("Contract ABI:", contractABI);
            console.log("Contract Address:", contractAddress);

            const contract = new web3.eth.Contract(contractABI, contractAddress);

            if (accounts.length === 0) {
                alert('No accounts found. Please make sure MetaMask is unlocked.');
                return;
            }

            const account = accounts[0];
            console.log("Connected account:", account);

            // Set up the transaction parameters
            const transactionParameters = {
                to: '0x7fEca70204922A6F5eB74E5496eA06099ab9379b', // Replace with the recipient's Ethereum address
                from: account, // The user's active MetaMask account
                value: '0x29a2241af62c0000', // Replace with the value to send (in wei, 1 ether = 10^18 wei)
                gasPrice: '0x09184e72a000', // Optional: customize the gas price
                gas: '0x5208', // Optional: customize the gas limit
            };

            // Send the transaction
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });

            console.log("Transaction sent! TxHash:", txHash);
            alert('Transaction sent successfully! Transaction Hash: ' + txHash);
        } catch (error) {
            console.error(error);
            alert('An error occurred: ' + error.message);
        }
    } else {
        alert('MetaMask is not installed. Please install MetaMask and try again.');
    }
}

// Event listener for the form submission
document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    connectMetaMaskAndSendTransaction();
});


// async function connectMetaMaskAndSendTransaction() {
//     if (window.ethereum) {
//         window.web3 = new Web3(window.ethereum);
//         try {
//             await ethereum.request({ method: 'eth_requestAccounts' });
//             const accounts = await ethereum.request({ method: 'eth_accounts' });
//             const account = accounts[0];
//             console.log("Connected account:", account);

//             const contractABI = [ [
//                 {
//                     "inputs": [],
//                     "name": "pay",
//                     "outputs": [],
//                     "stateMutability": "payable",
//                     "type": "function"
//                 },
//                 {
//                     "inputs": [],
//                     "stateMutability": "nonpayable",
//                     "type": "constructor"
//                 },
//                 {
//                     "anonymous": false,
//                     "inputs": [
//                         {
//                             "indexed": false,
//                             "internalType": "address",
//                             "name": "from",
//                             "type": "address"
//                         },
//                         {
//                             "indexed": false,
//                             "internalType": "uint256",
//                             "name": "amount",
//                             "type": "uint256"
//                         }
//                     ],
//                     "name": "PaymentReceived",
//                     "type": "event"
//                 },
//                 {
//                     "inputs": [],
//                     "name": "withdraw",
//                     "outputs": [],
//                     "stateMutability": "nonpayable",
//                     "type": "function"
//                 },
//                 {
//                     "inputs": [],
//                     "name": "contractBalance",
//                     "outputs": [
//                         {
//                             "internalType": "uint256",
//                             "name": "",
//                             "type": "uint256"
//                         }
//                     ],
//                     "stateMutability": "view",
//                     "type": "function"
//                 },
//                 {
//                     "inputs": [],
//                     "name": "owner",
//                     "outputs": [
//                         {
//                             "internalType": "address",
//                             "name": "",
//                             "type": "address"
//                         }
//                     ],
//                     "stateMutability": "view",
//                     "type": "function"
//                 }
//             ] ];
//             const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; 

//             // Log contract ABI and address for debugging
//             console.log("Contract ABI:", contractABI);
//             console.log("Contract Address:", contractAddress);

//             const contract = new web3.eth.Contract(contractABI, contractAddress);

//             const valueInWei = web3.utils.toWei('0.01', 'ether'); 
//             console.log("Sending value:", valueInWei);

//             const transaction = contract.methods.pay();
            
//             // Log the transaction parameters
//             console.log("Transaction Parameters:", {
//                 from: account,
//                 value: valueInWei,
//                 gas: 3000000
//             });

//             transaction.send({
//                 from: account,
//                 value: valueInWei,
//                 gas: 3000000 
//             })
//             .on('transactionHash', function(hash) {
//                 console.log("Transaction sent! TxHash:", hash);
//                 alert('Transaction sent successfully! Transaction Hash: ' + hash);
//             })
//             .on('error', function(error) {
//                 console.error("Error:", error);
//                 alert('An error occurred: ' + error.message);
//             });
//         } catch (error) {
//             console.error("Error:", error);
//             alert('An error occurred: ' + error.message);
//         }
//     } else {
//         alert('MetaMask is not installed. Please install MetaMask and try again.');
//     }
// }

// import MetaMaskOnboarding from '@metamask/onboarding';


// const player = document.querySelector(".success-anim");


// const onboarding = new MetaMaskOnboarding();
// const btn = document.querySelector('.onboard');
// const statusText = document.querySelector('h1');
// const statusDesc = document.querySelector('.desc');
// const loader = document.querySelector('.loader');
// const upArrow = document.querySelector('.up');
// const confetti = document.querySelector('.confetti');


// const isMetaMaskInstalled = () => {
//     const { ethereum } = window;
//     return Boolean(ethereum && ethereum.isMetaMask);
// }

// let connected = (accounts) => {
//     statusText.innerHTML = 'Connected!'
//     statusDesc.classList.add('account');
//     statusDesc.innerHTML = accounts[0]
//     btn.style.display = 'none';
//     loader.style.display = 'none';
//     upArrow.style.display = 'none';
//     confetti.style.display = 'block';
//     player.play();
//     statusDesc.classList.add('account');
// }

// async function connectWallet() {
//     return await ethereum.request({ method: 'eth_accounts' });
// }

// const onClickInstallMetaMask = () => {
//     onboarding.startOnboarding();
//     loader.style.display = 'block';
// }

// btn.addEventListener('click', async () => {
//     btn.style.backgroundColor = '#cccccc';
//     loader.style.display = 'block';

//     try {
//         const accounts = await ethereum.request({method: 'eth_requestAccounts'})
//         connected(accounts)
//     } catch (error) {
//         console.error(error);
//     }
// })

// const MetaMaskClientCheck = () => {
//     if (!isMetaMaskInstalled()) {
//         statusText.innerText = 'You need to Install a Wallet';
//         statusDesc.innerText = 'We recommend the MetaMask wallet.';
//         btn.innerText = 'Install MetaMask'
//         btn.onclick = onClickInstallMetaMask;
//     } else {
 
//         connectWallet().then((accounts) => {
//             if (accounts && accounts[0] > 0) {
//                 connected(accounts)
//             } else {
//                 statusText.innerHTML = 'Connect your wallet'
//                 statusDesc.innerHTML = `To begin, please connect your MetaMask wallet.`
//                 btn.innerText = 'Connect MetaMask'
//                 upArrow.style.display = 'block';
//             }
//         })
//     }
// }

// MetaMaskClientCheck()