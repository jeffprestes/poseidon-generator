require('dotenv').config();
const poseidonLib = require("circomlibjs").poseidonContract;
const ethers = require("ethers");

async function main() {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    const Poseidon = new ethers.ContractFactory(poseidonLib.generateABI(2), poseidonLib.createCode(2), signer);
    const poseidonContract = await Poseidon.deploy();    
    const poseidonAddress = await poseidonContract.getAddress();
    console.log("Poseidon deployed at", poseidonAddress);

  } catch (err) {
    console.error("error:", err)
  }
}

main().then( () => process.exit(0) )