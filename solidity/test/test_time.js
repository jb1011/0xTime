const { expect } = require('chai');
const { ethers } = require("hardhat");

describe('Time contract', () => {
	let Time, time, timeStamp, signers;
	let wei;

	beforeEach(async () => {
		Time = await ethers.getContractFactory('Time');
		time = await Time.deploy();
		timeStamp = await Date.now();
		timeStamp /= 1000;
		timeStamp = timeStamp + (86400 - timeStamp % 86400);
		wei = 1000000000000000000;
		signers = await ethers.getSigners();
		
	});
	describe('Deployment', () => {
		it('Good assign value', async () => {
			expect(await time.owners()).to.equal(signers[0].address);
			expect(await time.STARTING_PRICE()).to.equal(1000000000000000);
			expect(await time.currentId()).to.equal(0);
			expect(await time.auctionEndTime()).to.equal(timeStamp);
			expect(await time.community_percent()).to.equal(70);
			expect(await time.dev_percent()).to.equal(30);
			expect(await time.highestBidder()).to.equal('0x0000000000000000000000000000000000000000');
			expect(await time.highestBid()).to.equal(0);
			expect(await time.pastWinner()).to.equal('0x0000000000000000000000000000000000000000');
			expect(await time.started()).to.equal(false);
			expect(await time.comunityReward()).to.equal(0);
			expect(await time.devRewards()).to.equal(0);
		});
		it('Auction test', async () => {
			await expect(time.bid(0.001 * wei)
			).to.be.revertedWith('Insufficient fund');
			expect(await time.highestBidder()).to.equal('0x0000000000000000000000000000000000000000');
			expect(await time.highestBid()).to.equal(0);
			expect(await time.started()).to.equal(false);

			await expect(time.connect(signers[1]).bid(0.001 * wei, { from: signers[1].address, value: 0.001 * wei})
			).to.be.revertedWith('There is already an higher or equal bid');
			expect(await time.connect(signers[1]).highestBidder()).to.equal('0x0000000000000000000000000000000000000000');
			expect(await time.highestBid()).to.equal(0);
			expect(await time.started()).to.equal(false);
			
			await expect(time.connect(signers[1]).bid(0.002 * wei, { from: signers[1].address, value: 0.002 * wei})
			).to.be.ok;
			await expect(time.connect(signers[1]).bid(0.003 * wei, { from: signers[1].address, value: 0.003 * wei})
			).to.be.revertedWith('You are the last bidder');
			expect(await time.connect(signers[1]).highestBidder()).to.equal(signers[1].address);
			expect(await time.highestBid()).to.equal(0.002 * wei);
			expect(await time.started()).to.equal(true);

			await expect(time.connect(signers[2]).bid(0.002 * wei, { from: signers[2].address, value: 0.002 * wei})
			).to.be.revertedWith('There is already an higher or equal bid');
			await expect(time.connect(signers[2]).bid(0.003 * wei, { from: signers[2].address, value: 0.003 * wei})
			).to.be.ok;
			expect(await time.connect(signers[1]).highestBidder()).to.equal(signers[2].address);
			expect(await time.highestBid()).to.equal(0.003 * wei);
			expect(await time.started()).to.equal(true);

			expect(await time.connect(signers[1]).getMyBank({from: signers[1].address})).to.equal(0.002 * wei);
			expect(await time.connect(signers[2]).getMyBank({from: signers[2].address})).to.equal(0);

			await expect(time.connect(signers[1]).bid(0.004 * wei, { from: signers[1].address, value: 0.002 * wei})
			).to.be.ok;
			expect(await time.connect(signers[1]).getMyBank({from: signers[1].address})).to.equal(0);
			expect(await time.connect(signers[2]).getMyBank({from: signers[2].address})).to.equal(0.003 * wei);

			await expect(time.connect(signers[2]).bid(0.005 * wei, { from: signers[2].address, value: 0.003 * wei})
			).to.be.ok;
			expect(await time.connect(signers[1]).getMyBank({from: signers[1].address})).to.equal(0.004 * wei);
			expect(await time.connect(signers[2]).getMyBank({from: signers[2].address})).to.equal(0.001 * wei);
			
			expect(await time.connect(signers[1]).highestBidder()).to.equal(signers[2].address);
			expect(await time.highestBid()).to.equal(0.005 * wei);
		});
		it('Withdraw test', async () => {
			await expect(time.connect(signers[1]).bid(0.002 * wei, { from: signers[1].address, value: 0.002 * wei})
			).to.be.ok;
			expect(await time.connect(signers[1]).highestBidder()).to.equal(signers[1].address);
			expect(await time.highestBid()).to.equal(0.002 * wei);
			expect(await time.started()).to.equal(true);

			await expect(time.connect(signers[2]).bid(0.005 * wei, { from: signers[2].address, value: 0.005 * wei})
			).to.be.ok;
			expect(await time.connect(signers[1]).highestBidder()).to.equal(signers[2].address);
			expect(await time.highestBid()).to.equal(0.005 * wei);
			expect(await time.connect(signers[1]).getMyBank({from: signers[1].address})).to.equal(0.002 * wei);

			await expect(time.connect(signers[1]).bid(0.006 * wei, { from: signers[1].address, value: 0.005 * wei})
			).to.be.ok;
			expect(await time.connect(signers[1]).highestBidder()).to.equal(signers[1].address);
			expect(await time.highestBid()).to.equal(0.006 * wei);
			expect(await time.connect(signers[1]).getMyBank({from: signers[1].address})).to.equal(0.001 * wei);
			expect(await time.connect(signers[2]).getMyBank({from: signers[2].address})).to.equal(0.005 * wei);
			expect(await time.connect(signers[3]).getMyBank({from: signers[3].address})).to.equal(0);

			await expect(time.connect(signers[3]).withdraw(0.008 * wei, { from: signers[3].address})
			).to.be.revertedWith("You have no bids avaiable to withdraw");
			await expect(time.connect(signers[1]).withdraw(0.008 * wei, { from: signers[1].address})
			).to.be.revertedWith("Not enought ether");
			await expect(time.connect(signers[1]).withdraw(0.001 * wei, { from: signers[1].address})
			).to.be.ok;

			expect(await time.connect(signers[1]).getMyBank({from: signers[1].address})).to.equal(0);
			await expect(time.connect(signers[1]).withdraw(0.008 * wei, { from: signers[1].address})
			).to.be.revertedWith("You have no bids avaiable to withdraw");

			await expect(time.connect(signers[2]).withdraw(0.003 * wei, { from: signers[2].address})
			).to.be.ok;
			expect(await time.connect(signers[2]).getMyBank({from: signers[2].address})).to.equal(0.002 * wei);
			await expect(time.connect(signers[2]).withdraw(0.003 * wei, { from: signers[2].address})
			).to.be.revertedWith("Not enought ether");
			await expect(time.connect(signers[2]).withdraw(0.002 * wei, { from: signers[2].address})
			).to.be.ok;
			expect(await time.connect(signers[2]).getMyBank({from: signers[2].address})).to.equal(0);
			await expect(time.connect(signers[2]).withdraw(0.008 * wei, { from: signers[2].address})
			).to.be.revertedWith("You have no bids avaiable to withdraw");
		});
		it('Mint test', async () => {
			//tests incoming
			await expect(time.connect(signers[1]).bid(0.002 * wei, { from: signers[1].address, value: 0.002 * wei})
			).to.be.ok;
			expect(await time.connect(signers[1]).highestBidder()).to.equal(signers[1].address);
			expect(await time.highestBid()).to.equal(0.002 * wei);
			expect(await time.started()).to.equal(true);
		});
		it('Reward Withdraw test', async () => {
			//tests incoming
		});
	});

});
// { from: address, value: value}