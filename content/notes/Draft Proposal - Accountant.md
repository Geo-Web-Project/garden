# Draft Proposal - Accountant
#proposal

Date :: 2021-10-01
Author :: [[@codynhat]]

## Summary
A smart contract that stores accounting information for an always-for-sale license.

## Parameters
| Name                      | Type      | Description                                     |
| ------------------------- | --------- | ----------------------------------------------- |
| `minValue`                | `uint256` | Minimum value a license can have                |
| `minExpiration`           | `uint256` | Minimum expiration a license can have (seconds) |
| `maxExpiration`           | `uint256` | Maximum expiration a license can have (seconds) |

## Storage
| Name          | Type                              | Description                                 |
| ------------- | --------------------------------- | ------------------------------------------- |
| `licenseInfo` | `mapping(uint256 => LicenseInfo)` | Stores the accounting info for each license |

```solidity
struct LicenseInfo {
	uint256 value;	
	uint256 expirationTimestamp;
}
```

## Functions

### Update Value
Update the value for a license. Must be greater than `minValue`.

```
function updateValue(uint256 id, uint256 newValue) public
```

`MODIFY_VALUE_ROLE` is required.

### Update Expiration
Update the expiration for a license. New expiration minus `now` must be greater than `minExpiration` and less than `maxExpiration`.

```
function updateExpiration(uint256 id, uint256 newExpirationTimestamp) public
```

`MODIFY_EXP_ROLE` is required.

## Roles
| Name                | Function Access    |
| ------------------- | ------------------ |
| `MODIFY_VALUE_ROLE` | `updateValue`      |
| `MODIFY_EXP_ROLE`   | `updateExpiration` |
