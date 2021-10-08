# Draft Proposal - ETHExpirationCollector
#proposal

Date :: 2021-10-01
Author :: [[@codynhat]]

## Summary
A smart contract that collects contributions in ETH and stores expiration timestamps to determine balances.

## Parameters
| Name            | Type      | Description                        |
| --------------- | --------- | ---------------------------------- |
| `minValue`      | `uint256` | Minimum value for a license        |
| `minExpiration` | `uint256` | Minimum expiration for a license   |
| `maxExpiration` | `uint256` | Maximum expiration for a license   |
| `license`       | `IERC721` | ERC721 License used to find owners |
| `receiver`      | `address` | Receiver of contributions          |

## Storage
| Name                          | Type                          | Description                                      |
| ----------------------------- | ----------------------------- | ------------------------------------------------ |
| `licenseExpirationTimestamps` | `mapping(uint256 => uint256)` | Stores the expiration timestamp for each license |

## Functions

### Make Payment
Make a contribution payment for a license. Can be done by anyone.

```
function makePayment(uint256 id) public payable
```

### Set Value
Set the value for a license. Can only be done by current licensee or someone with `MODIFY_VALUE_ROLE`

```
function setValue(uint256 id, uint256 newValue) public
```

### isValid
Conforms to [[Draft Proposal - License Validator]]. Checks expiration to determine if the current license is paid.

```
function isValid(uint256 id) public view returns (bool)
```

## Roles
| Name                | Function Access    |
| ------------------- | ------------------ |
| `MODIFY_VALUE_ROLE` | `setValue`      |

## Required Permissions
| Contract                                    | Role                | Reason |
| ------------------------------------------- | ------------------- | ------ |
| [[Draft Proposal - Accountant\|Accountant]] | `MODIFY_VALUE_ROLE` | Will modify license value on behalf of users, only when a change results in a valid expiration       |

## Diagram
```nomnoml
[ETHExpirationCollector | 
	[Storage |
		licenseExpirationTimestamps
	]
	[<table> Functions |
		makePayment() | public ||
		setValue() | MODIFY_VALUE_ROLE or owner
	]
]

[<lollipop>MODIFY_VALUE_ROLE]

[ETHExpirationCollector]-[MODIFY_VALUE_ROLE]

[Accountant | 
	[Storage |
		licenseValues
	]
	[<table> Functions |
		setValue() | MODIFY_VALUE_ROLE
	]
]

[MODIFY_VALUE_ROLE]-+[Accountant]
```