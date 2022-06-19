var VerifierContract = artifacts.require('Verifier');
var SolnVerifierContract = artifacts.require('SolnSquareVerifier');

contract('Verifier', accounts => {
    const account_one = accounts[0];
    const account1 = accounts[1];
    const proof = {
        "proof": {
            "a": [
                "0x0273fd19d9f082dd9f5d7182316fd296a670c61c5cf3c419399daa3c3e098cf8",
                "0x2ec86d0fdf114c616fcb1b42de10d142f125b69d0f36b2ff1cf7ae1fc670235b"
            ],
            "b": [
                [
                    "0x29f0349a64940aa97e1f88c79eff8e9c1a3c25cdc9f15f04e3d8ea4f57152b45",
                    "0x264f23753253868fe5253baeda30ee4464fb9632055cf9568e5e0f94c56c76c3"
                ], 
                [
                    "0x272702081e2c6fc620f7fad453cd1a0ffd711ee58c888865b6c61bbd74828fe4", 
                    "0x2a84cef3544ceda7934a1203a9ecb6cd5f81c41115a019d4abb77f20679cbbda"
                ]
            ],
            "c": [
                    "0x1260b8328c10d5e81a0a1da1d38b85a32681203097621c203ff2f071c478e8be", 
                    "0x1e9109d96575acb36925efa6713073b5d81c5fccfa648d0cdd4f9cdd7ba87423"
                ]
        },
        "inputs": [
                    "0x0000000000000000000000000000000000000000000000000000000000000009", 
                    "0x0000000000000000000000000000000000000000000000000000000000000001"
                ]
    };

    describe('Test SolnSquareVerifier', function () {
        beforeEach(async function () {
            let verifierContract = await VerifierContract.new({from: account_one});
            this.contract = await SolnVerifierContract.new(verifierContract.address, {from: account_one});
        });

        it('Should mint with valid proof', async function () {
            var result = await this.contract.mintVerifiedToken.call(
                account1,
                2,
                proof.proof.a,
                proof.proof.b,
                proof.proof.c,
                proof.inputs,
                {from: account_one}
            );
            assert.equal(result, true, "Proof is valid");
        });

        it('Should not mint with invalid proof', async function () {
            const proof = {
                "proof": {
                        "a": [
                            "0x0273fd19d9f082dd9f5d7182316fd296a670c61c5cf3c419399daa3c3e098cf8",
                            "0x2ec86d0fdf114c616fcb1b42de10d142f125b69d0f36b2ff1cf7ae1fc670235b"
                        ],
                        "b": [
                            [
                                "0x29f0349a64940aa97e1f88c79eff8e9c1a3c25cdc9f15f04e3d8ea4f57152b45",
                                "0x264f23753253868fe5253baeda30ee4464fb9632055cf9568e5e0f94c56c76c3"
                            ], 
                            [
                                "0x272702081e2c6fc620f7fad453cd1a0ffd711ee58c888865b6c61bbd74828fe4", 
                                "0x2a84cef3544ceda7934a1203a9ecb6cd5f81c41115a019d4abb77f20679cbbda"
                            ]
                        ],
                        "c": [
                                "0x1260b8328c10d5e81a0a1da1d38b85a32681203097621c203ff2f071c478e8be", 
                                "0x1e9109d96575acb36925efa6713073b5d81c5fccfa648d0cdd4f9cdd7ba87423"
                            ]
                    },
                    "inputs": [
                                "0x0000000000000000000000000000000000000000000000000000000000000008", 
                                "0x0000000000000000000000000000000000000000000000000000000000000001"
                            ]
        };

            var result = true;
            try{
                result = await this.contract.mintVerifiedToken.call(
                    account1,
                    2,
                    proof.proof.a,
                    proof.proof.b,
                    proof.proof.c,
                    proof.inputs,
                    {from: account_one}
                );
            } catch (e) {
                result = false;
            }
            assert.equal(result, false, "Proof is invalid");
        });

    });
});