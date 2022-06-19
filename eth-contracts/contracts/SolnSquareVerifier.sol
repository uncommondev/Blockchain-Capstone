pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./verifier.sol";
import "./ERC721Mintable.sol";

contract SolnSquareVerifier is CustomERC721Token {
    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address solutionAddress;
    }

    Verifier private _verifier;

    // TODO define an array of the above struct
    Solution[] private _solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private _uniqueSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 index, address solutionAddress);

    constructor(address verifierAddress) public {
        _verifier = Verifier(verifierAddress);
    }

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint256 index, address solutionAddress, bytes32 solutionKey) internal {
        Solution memory solution = Solution(index, solutionAddress);
        _solutions.push(solution);
        _uniqueSolutions[solutionKey] = solution;
        emit SolutionAdded(index, solutionAddress);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintVerifiedToken(address to, uint256 index, uint256[2] calldata a, uint256[2][2] calldata b, uint256[2] calldata c, uint256[2] calldata inputs)
    external
    returns(bool)
    {
        bytes32 solutionKey = keccak256(abi.encodePacked(a, b, c, inputs));
        require(_uniqueSolutions[solutionKey].solutionAddress == address(0), "Solution must be unique");
        require(_verifier.verifyTx(a, b, c, inputs), "Solution couldn't be verified");
        addSolution(index, to, solutionKey);
        return mint(to, index, "VerifiedToken");
    }
}
