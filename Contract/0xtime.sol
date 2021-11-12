// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Time is ERC721, Ownable {
    
    address private owners;
    
    //MINTING PARAMETERS
    uint256 public currentId = 0;
    bool public minted = false;
    
    //AUCTION PARAMETERS
    uint public auctionEndTime;
    uint public STARTING_PRICE = 1000000000000000;
    uint public bank = 0;
    address public highestBidder;
    uint public highestBid;
    address public pastWinner;
    bool started = false;
    
    mapping(address => uint) public pendingReturns; //Withdrawable amounts of outbided address
    mapping(address => uint) public comunityBalance; //Recording comunity balance for rewards

    uint public comunityReward;
    uint private devRewards;
    
    constructor() ERC721("Time", "0xTime") {
        owners = msg.sender;
    }
    
    //AUCTION SYSTEM
    function bid() public payable {
        if (block.timestamp > auctionEndTime) {
            comunityReward = highestBid / 2 / currentId;
            for (uint i = 0; i < currentId; i++)
                    comunityBalance[ownerOf(i)] += comunityReward;
            devRewards += highestBid / 2;
            if (!minted)
                currentId++;
            else
                minted = false;
            started == false;
        }
        if (started == false) {
            auctionEndTime = block.timestamp + (86400 - (block.timestamp % 86400));
            highestBid = STARTING_PRICE;
            pastWinner = highestBidder;
            started == true;
        }
        require(block.timestamp < auctionEndTime, "The auction has already ended");
        require(msg.value > highestBid, "There is already an higher or equal bid");
        if (highestBid != 1000000000000000) {
            pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
    }
    
    function withdraw() public returns(bool) {
        uint amount = pendingReturns[msg.sender];
        require(amount > 0, "You have no bids avaiable to withdraw");
        pendingReturns[msg.sender] = 0;
        if (!payable(msg.sender).send(amount)) {
            pendingReturns[msg.sender] = amount;
            return false;
        }
        return true;
    }

    function withdrawRewards() public { //
        if (keccak256(abi.encodePacked(msg.sender)) == keccak256(abi.encodePacked(owners)))
            payable(msg.sender).transfer(devRewards);
        else
            payable(msg.sender).transfer(comunityBalance[msg.sender]);
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
}