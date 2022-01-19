# Draft Proposal - Reclaimer
#proposal

Date :: 2022-01-19
Author :: [[@codynhat]]

## Summary
A smart contract interface that defines how a license is reclaimed once it is no longer valid.

## Specification
```solidity
interface IReclaimer {
	function reclaim(
		address user,
		uint256 contributionRate,
		uint256 licenseId,
		bytes calldata reclaimData
	);
}
```