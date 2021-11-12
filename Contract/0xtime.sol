// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Time is ERC721, Ownable, ERC721Enumerable {
    
    address private owners;
    
    //MINTING PARAMETERS
    //Variables for token enumeration
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    //Minting variables
    uint256 public currentId = 0;
    bool public minted = false;
    
    //AUCTION PARAMETERS
    uint public auctionEndTime;
    uint public STARTING_PRICE = 1000000000000000;
    uint public bank = 0;
    
    //current state of the auction
    address public highestBidder;
    uint public highestBid;
    bool started = false;
    
    mapping(address => uint) public pendingReturns; //Withdrawable amouts of outbided address
    mapping(address => uint) public comunityBalance; //Recording comunity balance for rewards

    uint public comunityReward;
    uint private devRewards;
    
    event HighestBidIncrease(address bidder, uint amout);
    
    constructor() ERC721("Time", "0xTime") {
        owners = msg.sender;
    }
    
    //AUCTION SYSTEM
    function bid() public payable {
        if (block.timestamp > auctionEndTime) {
            comunityReward = highestBid / 2 / totalSupply();
            for (uint i = 0; i < totalSupply(); i++)
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
            started == true;
        }
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

    function withdrawRewards() public { //
        if (keccak256(abi.encodePacked(msg.sender)) == keccak256(abi.encodePacked(owners)))
            payable(msg.sender).transfer(devRewards);
        else
            payable(msg.sender).transfer(comunityBalance[msg.sender]);
    }


    //MINTING SYSTEM
    // The 2 following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    
    //function to mint the day NFT, should be onlyWinner
    function safeMint(address to) public  {
        _safeMint(to, currentId);
        currentId++;
        minted = true;
    }
}
