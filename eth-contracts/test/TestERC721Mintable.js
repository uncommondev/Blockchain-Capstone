var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            try {
                this.contract = await ERC721MintableComplete.new({from: account_one});

                // TODO: mint multiple tokens
                this.contract.mint(account_one, 1, {from: account_one});
                this.contract.mint(account_one, 2, {from: account_one});
                this.contract.mint(account_one, 3, {from: account_one});
            } catch (err) {
                console.log(`There was an error testing totalSupply: ${err}`);
            }

        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            console.log(totalSupply)
            assert.equal(totalSupply, 3);
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_one);
            assert.equal(balance, 1);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(1);
            assert.equal(tokenURI, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1');
        })

        it('should transfer token from one owner to another', async function () { 
            let success = await this.contract.transferFrom(account_one, account_two, 1, {from: account_one});
            assert.equal(success, true);
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let success = await this.contract.mint(account_two, 1, {from: account_two});
            assert.equal(success, false);       
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.owner();
            assert.equal(owner, account_one);
        })

    });
});