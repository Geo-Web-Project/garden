# Draft Proposal - Accountant
#proposal

Date :: 2021-10-01
Author :: [[@codynhat]]

## Summary
A smart contract that stores accounting information for an always-for-sale license.

## Parameters
| Name                      | Type                | Description                                                                                |
| ------------------------- | ------------------- | ------------------------------------------------------------------------------------------ |
| `perSecondFeeNumerator`   | `uint256`           | Numerator of contribution fee                                                              |
| `perSecondFeeDenominator` | `uint256`           | Denominator of contribution fee                                                            |
| `validator`               | `ILicenseValidator` | Where to find if a license's account is still valid [[Draft Proposal - License Validator]] | 

## Storage
| Name                | Type                          | Description                                   |
| ------------------- | ----------------------------- | --------------------------------------------- |
| `contributionRates` | `mapping(uint256 => uint256)` | Stores the contribution rate for each license | 

## Functions

### Set Contribution Rate
Set the contribution rate for a license.

```
function setContributionRate(uint256 id, uint256 newRate) public
```

`MODIFY_CONTRIBUTION_ROLE` is required.


### isValid
Checks `validator` to determine if a license's account is valid and paid.

```
function isValid(uint256 id) public view returns (bool)
```

### Invalid Start Date
Checks `validator` to determine when a parcel will begin to be invalid.

```solidity
function invalidStartDate(uint256 id) public view returns (uint256)
```

## Roles
| Name                       | Function Access       |
| -------------------------- | --------------------- |
| `MODIFY_CONTRIBUTION_ROLE` | `setContributionRate` |

## Diagram
```nomnoml
[Accountant | 
	[Storage |
		contributionRates
	]
	[<table> Functions |
		setContributionRate() | MODIFY_CONTRIBUTION_ROLE
	]
]
```