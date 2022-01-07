# Draft Proposal - License Validator
#proposal

Date :: 2021-10-01
Author :: [[@codynhat]]

## Summary
A smart contract interface that defines how a license is considered valid.

## Specification
```solidity
interface ILicenseValidator {
	function isValid(uint256 id) public view returns (bool);
}
```