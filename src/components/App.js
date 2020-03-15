import React, { Component } from 'react';
import Web3 from 'web3';
import Navbar from './Navbar'
import SocialNetwork from '../abis/SocialNetwork.json'



import './App.css';

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockchainData();

  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3
    //Load Account
    const accounts = await web3.eth.getAccounts();

    this.setState({account:accounts[0]})
    const networkId = await web3.eth.net.getId();
    const networkData=SocialNetwork.networks[networkId];
    if(networkData) {
      const socialNetwork = new web3.eth.Contract(SocialNetwork.abi,networkData.address)
      this.setState({socialNetwork});
      const postCount = await socialNetwork.methods.postCount().call();
      this.setState({postCount});
      for(var i=1;i<=postCount;i++){
        const post = await socialNetwork.methods.posts(i).call()
        this.setState({
          posts : [...this.state.posts,post]
        })
      }
      console.log({posts:this.state.posts});
    }else{
      window.alert('Contract not deployed to blockchain');
    }

  }

  constructor(props){
    super(props)
    this.state={
      account:'',
      socialNetwork:null,
      postCount:0,
      posts:[]
    }

  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth:'500px'}}>
              <div className="content mr-auto ml-auto">
                {
                  this.state.posts.map((post,key)=>{
                    return(
                      <div className="card mb-4" key={key}>
                        <div className="card-header">
                          <p className="card-text">Some quick text</p>

                        </div>
                      </div>
                    )
                  })
                }


  
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


