# Draft Proposal - ETHxPurchaser
#proposal

Date :: 2021-10-08
Author :: [[@codynhat]]

## Summary
A smart contract that enables the sale and transfer of always-for-sale licenses in ETHx (Superfluid).

## Parameters
| Name                          | Type                      | Description                                            |
| ----------------------------- | ------------------------- | ------------------------------------------------------ |
| `dutchAuctionLengthInSeconds` | `uint256`                 | Length of Dutch auction upon a parcel becoming invalid |

## Storage
| Name                          | Type                      | Description                                            |
| ----------------------------- | ------------------------- | ------------------------------------------------------ |
| `outstandingBid`              | `mapping(uint256 => Bid)` | Stores the highest outstanding bid for a license       |

## Functions
### Place Bid
User can place a bid for an existing license.
```solidity
function placeBid(
	uint256 licenseId, 
	uint256 contributionRate
)
```

- Requirements
	- `msg.sender` is not license owner
	- No bid is outstanding for license `outstandingBid[licenseId]`
	- Must approve deposit amount of ETHx
- Actions
	- `lockContributionRate` on [[Draft Proposal - CollectorSuperApp|CollectorSuperApp]]
	- Transfer deposit to app

### Accept Bid
Licensee can accept a bid placed on their license.
```solidity
function acceptBid(
	uint256 licenseId 
)
```

- Requirements
	- `msg.sender` is license owner
		- OR `msg.sender` is bidder and outstanding bid for license `outstandingBid[licenseId]` has elapsed
	- Bid is outstanding for license `outstandingBid[licenseId]`
- Actions
	- `decreaseContributionRate(sender, oldContributionRate)
	- `unlockContributionRate(bidder)` on [[Draft Proposal - CollectorSuperApp|CollectorSuperApp]]
	- `increaseContributionRate(bidder, newContributionRate)
	- `setContributionRate` on [[Draft Proposal - Accountant|Accountant]]
	- Transfer deposit to sender
	- Transfer license to bidder

### Reject Bid
Licensee can reject a bid and increase their contribution while paying a penalty.
```solidity
function rejectBid(
	uint256 licenseId 
)
```
- Requirements
	- `msg.sender` is license owner
	- Bid is outstanding for license `outstandingBid[licenseId]`
	- Bid period has not elapsed
	- Penalty amount is approved in ETHx
- Actions
	- `increaseContributionRate(owner, bidContributionRate - existingContributionRate)
	- `setContributionRate` on [[Draft Proposal - Accountant|Accountant]]
	- `unlockContributionRate(bidder)` on [[Draft Proposal - CollectorSuperApp|CollectorSuperApp]]
	- `withdrawableDeposits[bidder] += deposit`
	- `outstandingBid[licenseId]` is deleted
	- Penalty is collected from owner

### Set Contribution Rate
```solidity
function setContributionRate(
	uint256 licenseId, 
	uint256 newContributionRate
)
```

- Requirements
	- `msg.sender` is license owner or approved
	- No bid is outstanding for license `outstandingBid[licenseId]`
- Actions
	- `increaseContributionRate` OR `decreaseContributionRate`
	- `setContributionRate` on [[Draft Proposal - Accountant|Accountant]]

### Calculate For Sale Price
Calculate the for sale price of an existing license. The is the amount needed for deposits on `claim()` and `placeBid()`

```solidity
function calculateForSalePrice(
	uint256 licenseId
) returns (uint256)
```

- License is valid -> Self-assessed value of current owner
- License is expired -> Dutch auction price declining to 0
- License is `0x0` -> Fair launch auction price OR 0

### Pause
Pause and unpause for use in an emergency. Pauses all purchases.

```
function pause() public
```

```
function unpause() public
```

`PAUSE_ROLE` is required.

## Roles
| Name                       | Function Access       |
| -------------------------- | --------------------- |
| `PAUSE_ROLE`               | `pause`, `unpause`    |

## Required Permissions
| Contract                                                  | Role                       | Reason                                                   |
| --------------------------------------------------------- | -------------------------- | -------------------------------------------------------- |
| [[Draft Proposal - ERC721License\|License]]               | `OPERATOR_ROLE`            | Transfers the license to the new owner                   |
| [[Draft Proposal - CollectorSuperApp\|CollectorSuperApp]] | `MODIFY_CONTRIBUTION_ROLE` | Modifies contribution on `modify`                        |
| [[Draft Proposal - Accountant\|Accountant]]               | `MODIFY_CONTRIBUTION_ROLE` | Will modify license contribution rate on behalf of users |

## Diagram
```nomnoml
[ETHPurchaser|
	[<table> Functions |
		purchase() | public ||
		calculatePurchasePrice() | public ||
		pause() 
		unpause() | PAUSE_ROLE
	]
]

[ETHPurchaser]-[<lollipop>OPERATOR_ROLE]
[ETHPurchaser]-[<lollipop>MODIFY_CONTRIBUTION_ROLE]

[ETHExpirationCollector | 
	[Storage |
		licenseExpirationTimestamps
	]
	[<table> Functions |
		makePayment() | public ||
		setContributionRate() | MODIFY_CONTRIBUTION_ROLE OR owner OR isApprovedForAll ||
		moveFunds() | MODIFY_FUNDS_ROLE ||
		migrateFunds() | MODIFY_FUNDS_ROLE ||
		pause() 
		unpause() | PAUSE_ROLE
	]
]
[ERC721License | 
	[<table> Functions |
		safeMint() | MINT_ROLE || 
		burn() | BURN_ROLE ||
		pause() 
		unpause() | PAUSE_ROLE || 
    	isApprovalForAll() == true | OPERATOR_ROLE
	]
]
[MODIFY_CONTRIBUTION_ROLE]-+[ETHExpirationCollector]
[OPERATOR_ROLE]-+[ERC721License]
```