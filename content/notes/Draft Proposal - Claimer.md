# Draft Proposal - Claimer
#proposal

Date :: 2022-01-19
Author :: [[@codynhat]]

## Summary
A smart contract interface that defines how a license is claimed.

## Specification
```solidity
interface IClaimer {
	function claim(
		address user,
		uint256 initialContributionRate,
		bytes calldata claimData
	);
}
```