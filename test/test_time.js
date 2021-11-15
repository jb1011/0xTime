const { expect } = require('chai');

describe('Time contract', () => {
	let Time, time, owner, addr1, addr2;

	beforeEach(async () => {
		Time = await ethers.getContractFactory('Time');
		time = await Time.deploy();
		[owner, addr1, addr2, _] = await ethers.getSigners();
	});
	describe('Deployment', () => {
		it('Sould set the right owner', async () => {
			expect(await time.getOwnerAddress()).to.equal(owner.address);
		});
	});

});
