# Draft Proposal - ETHExpirationCollector
#proposal

Date :: 2021-10-01
Author :: [[@codynhat]]

## Summary
A smart contract that collects contributions in ETH and stores expiration timestamps to determine balances.

## Parameters
| Name                  | Type      | Description                             |
| --------------------- | --------- | --------------------------------------- |
| `minContributionRate` | `uint256` | Minimum contribution rate for a license |
| `minExpiration`       | `uint256` | Minimum expiration for a license        |
| `maxExpiration`       | `uint256` | Maximum expiration for a license        |
| `license`             | `IERC721` | ERC721 License used to find owners      |
| `receiver`            | `address` | Receiver of contributions               |

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

### Set Contribution Rate
Set the contribution rate for a license. Can only be done by current licensee or someone with `MODIFY_CONTRIBUTION_ROLE`

```
function setContributionRate(uint256 id, uint256 newValue) public payable
```

### isValid
Conforms to [[Draft Proposal - License Validator]]. Checks expiration to determine if the current license is paid.

```
function isValid(uint256 id) public view returns (bool)
```

## Roles
| Name                       | Function Access       |
| -------------------------- | --------------------- |
| `MODIFY_CONTRIBUTION_ROLE` | `setContributionRate` |

## Required Permissions
| Contract                                    | Role                       | Reason                                                                                                     |
| ------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [[Draft Proposal - Accountant\|Accountant]] | `MODIFY_CONTRIBUTION_ROLE` | Will modify license contribution rate on behalf of users, only when a change results in a valid expiration |

## Diagram
```nomnoml
[ETHExpirationCollector | 
	[Storage |
		licenseExpirationTimestamps
	]
	[<table> Functions |
		makePayment() | public ||
		setContributionRate() | MODIFY_CONTRIBUTION_ROLE or owner
	]
]

[<lollipop>MODIFY_CONTRIBUTION_ROLE]

[ETHExpirationCollector]-[MODIFY_CONTRIBUTION_ROLE]

[Accountant | 
	[Storage |
		contributionRates
	]
	[<table> Functions |
		setContributionRate() | MODIFY_CONTRIBUTION_ROLE
	]
]

[MODIFY_CONTRIBUTION_ROLE]-+[Accountant]
```