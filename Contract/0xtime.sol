// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Time is ERC721, Ownable {
    
    //AUCTION PARAMETERS
    uint public auctionEndTime;
    uint public STARTING_PRICE = 1000000000000000;
    uint public bank = 0;
    
    //current state of the auction
    address public highestBidder;
    uint public highestBid;
    
    mapping(address => uint) public pendingReturns; //Withdrawable amouts of outbided address
    
    bool ended = false;
    
    event HighestBidIncrease(address bidder, uint amout);
    event AuctionEnded(address winner, uint amout);
    
    //AUCTION SYSTEM
    function startAuction() public onlyOwner {
        require(ended == false, "There is already an auction going on");
        auctionEndTime = block.timestamp + (86400 - (block.timestamp % 86400));
        highestBid = STARTING_PRICE;
    }
    
    function bid() public payable {
        require(block.timestamp < auctionEndTime, "The auction has already ended");
        require(msg.value > highestBid, "There is already an higher or equal bid");
        if (highestBid != 1000000000000000) {
            pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncrease(msg.sender, msg.value);
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
    
    function stopAuction() public {
        auctionEndTime = block.timestamp - 20; //a retirer permet de stop l'auction instant pour les tests
        require(block.timestamp > auctionEndTime, "The auction has not ended yet");
        require(ended == false, "The auction has already ended");
        ended = true;
        bank += highestBid;
    }
    
    
    function withdrawSuccessedBid() public onlyOwner { //
        payable(msg.sender).transfer(bank);
    }
    

    //MINTING PARAMETERS
    //Variables for token enumeration
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;


    //MINTING SYSTEM
    constructor() ERC721("Time", "0xTime") {}
    
    //function to mint the day NFT, should be onlyWinner
    function safeMint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}
