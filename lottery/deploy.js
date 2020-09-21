const HTWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')


const provider = new HTWalletProvider(
    'fee credit void tomato company engine fat addict toward purchase piece buyer',
    'https://rinkeby.infura.io/v3/3d9b4768b20f425080a966c8c1c71787'
)

const web3 = new Web3(provider)

const deploy = async() => {
    
    const accounts = await web3.eth.getAccounts()
    
    console.log('Attempting to deploy from acount', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode}).send({ gas: '1000000', from: accounts[0]})
    
    console.log(interface)

    console.log('Contract deployed to', result.options.address)
}
deploy()