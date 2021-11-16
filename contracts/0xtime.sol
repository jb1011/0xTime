// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Time is ERC721, ERC721Enumerable, Ownable {
    
    address public owners;
    
    //MINTING PARAMETERS
    //Variables for token enumeration
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    //Minting variables
    uint256 public currentId = 0; // WTF ???
    bool private minted = false;
    
    //AUCTION PARAMETERS
    uint public auctionEndTime;
    uint public STARTING_PRICE = 1000000000000000;

    uint public community_percent = 70;
    uint public dev_percent = 100 - community_percent;
    address public highestBidder;
    uint public highestBid;
    address public pastWinner;
    bool public started = false;
    
    mapping(address => uint) public pendingReturns; //Withdrawable amounts of outbided address
    mapping(address => uint) public comunityBalance; //Recording comunity balance for rewards

    uint public comunityReward;
    uint public devRewards;

    constructor() ERC721("Time", "0xTime") {
        owners = msg.sender;
        //Il faut démarrer le premier encheres au lancement du contract
        auctionEndTime = block.timestamp + (86400 - (block.timestamp % 86400));
    }
    
    function getMyBank() public view returns(uint){
        return (pendingReturns[msg.sender]);
    }

    //AUCTION SYSTEM
    //bidAmount permet de mélanger msg.value et ce que la personne a déja sur le contract
    function bid(uint bidAmount) public payable {
        require(bidAmount <= msg.value + pendingReturns[msg.sender], "Insufficient fund");
        if (block.timestamp > auctionEndTime) {
            comunityReward = highestBid * community_percent / 100 / totalSupply();
            for (uint i = 0; i < totalSupply(); i++)
                    comunityBalance[ownerOf(i)] += comunityReward;
            devRewards += highestBid / dev_percent;
            if (!minted)
                currentId++;
            else
                minted = false;
            started = false;
        }
        if (started == false) {
            auctionEndTime = block.timestamp + (86400 - (block.timestamp % 86400));
            highestBid = STARTING_PRICE;
            pastWinner = highestBidder;
            started = true;
        }
        require(highestBidder != msg.sender, "You are the last bidder");
        require(block.timestamp < auctionEndTime, "The auction has already ended");
        require(bidAmount > highestBid + (highestBid / 100 * 10), "There is already an higher or equal bid");
        pendingReturns[highestBidder] += highestBid;
        highestBidder = msg.sender;
        highestBid = bidAmount;
        if (bidAmount - msg.value > 0) {
            pendingReturns[msg.sender] -= (bidAmount - msg.value);
        }
    }
    /*
    function withdraw() public returns(bool) {
        uint amount = pendingReturns[msg.sender];
        require(amount > 0, "You have no bids avaiable to withdraw");
        pendingReturns[msg.sender] = 0;
        if (!payable(msg.sender).send(amount)) {
            pendingReturns[msg.sender] = amount;
            return false;
        }
        return true;
    }*/

    // Ce withdraw permet de retirer une somme choisie
    function withdraw(uint amount) public returns(bool) {
        require(pendingReturns[msg.sender] > 0, "You have no bids avaiable to withdraw");
        require(amount <= pendingReturns[msg.sender], "Not enought ether");

        if (!payable(msg.sender).send(amount)) {
            return false;
        }
        pendingReturns[msg.sender] -= amount;
        return true;
    }

    function withdrawRewards(uint amount) public { // Pas compris pourquoi on utilise keccack256 ?
        require(amount <= comunityBalance[msg.sender], "Not enought ether");
        require(comunityBalance[msg.sender] > 0, "You have no bids avaiable to withdraw");
        payable(msg.sender).transfer(amount);
        comunityBalance[msg.sender] -= amount;
    }

    function devWithdrawal() public {
        require(msg.sender == owners);
        payable(msg.sender).transfer(devRewards);
        devRewards = 0;
    }

    //MINTING SYSTEM
    //function to mint the day NFT, should be onlyWinner
    function safeMint(address to) public  {
        if (block.timestamp > auctionEndTime) {
            require(to == highestBidder, "You are not the winner of the auction.");
            _safeMint(to, currentId);
            currentId++;
            minted = true;
        }
        else if (pastWinner != address(0)) {
            require(to == pastWinner, "You are not the winner of the auction.");
            _safeMint(to, currentId);
            currentId++;
            minted = true;
        }
    }
    
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}