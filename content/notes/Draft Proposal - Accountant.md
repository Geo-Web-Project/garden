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
| Name            | Type                          | Description                                 |
| --------------- | ----------------------------- | ------------------------------------------- |
| `licenseValues` | `mapping(uint256 => uint256)` | Stores the self-assessed value for each license |

## Functions

### Set Value
Set the value for a license.

```
function setValue(uint256 id, uint256 newValue) public
```

`MODIFY_VALUE_ROLE` is required.

### isValid
Checks `validator` to determine if a license's account is valid and paid.

```
function isValid(uint256 id) public view returns (bool)
```

## Roles
| Name                | Function Access    |
| ------------------- | ------------------ |
| `MODIFY_VALUE_ROLE` | `setValue`      |
