pragma solidity >=0.4.21 <0.6.0;

contract SocialNetwork{
    string public name;
    struct Post{
        uint id;
        string content;
        uint tipAmount;
        address author;
    }
    constructor() public{
        name = "Dapp University Social Network";
    }

    function createPost(string memory _content) public pure{
        _content;
    }
}


