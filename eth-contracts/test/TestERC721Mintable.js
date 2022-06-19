var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('Match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(accounts[0], 1, "PropertyToken");
            await this.contract.mint(accounts[0], 2, "PropertyToken");
            await this.contract.mint(accounts[0], 3, "PropertyToken");
            await this.contract.mint(accounts[0], 4, "PropertyToken");
            await this.contract.mint(accounts[0], 5, "PropertyToken");

        })

        it('Should return total supply', async function () { 
            var tokensCount = await this.contract.totalSupply();
            assert.equal(tokensCount, 5, "Number of tokens not valid");
        })

        it('Should get token balance', async function () { 
            var balance = await this.contract.balanceOf(accounts[0]);
            assert.equal(balance, 5, "Account 0 should have 1 token");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('Should return token uri', async function () { 
            var tokenURI = await this.contract.tokenURI(3);
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/3");
        })

        it('Should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(accounts[0], accounts[1], 1, {from: accounts[0]});
            await this.contract.transferFrom(accounts[0], accounts[1], 2, {from: accounts[0]});
            var balance = await this.contract.balanceOf(accounts[1]);
            assert.equal(balance, 2, "Account 1 should have 2 Tokens");

            var ownerOfToken = await this.contract.ownerOf(1);
            assert.equal(ownerOfToken, accounts[1], "Account 1 should own token 1");
        })
    });


})