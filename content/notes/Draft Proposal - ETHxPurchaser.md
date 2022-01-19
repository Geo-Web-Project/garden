# Draft Proposal - ETHxPurchaser
#proposal

Date :: 2021-10-08
Author :: [[@codynhat]]

## Summary
A smart contract that enables the sale and transfer of always-for-sale licenses in ETHx (Superfluid).

## Parameters
| Name                          | Type      | Description                                            |
| ----------------------------- | --------- | ------------------------------------------------------ |
| `dutchAuctionLengthInSeconds` | `uint256` | Length of Dutch auction upon a parcel becoming invalid |
| `penaltyNumerator`            | `uint256` | Numerator of penalty needed on difference of self-assessed values                                                       |
| `penaltyDenominator`          | `uint256` | Denominator of penalty needed on difference of self-assessed values                                                      |

## Storage
| Name              | Type                      | Description                                       |
| ----------------- | ------------------------- | ------------------------------------------------- |
| `outstandingBid`  | `mapping(uint256 => Bid)` | Stores the highest outstanding bid for a license  |
| `currentOwnerBid` | `mapping(uint256 => Bid)` | Stores the bid for the current owner of a license |

## Models
```solidity
struct Bid {
	uint256 timestamp;
	address bidder;
	uint256 contributionRate;
	uint256 perSecondFeeNumerator;
	uint256 perSecondFeeDenominator;
	uint256 depositAmount;
}
```

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
	- `totalContributionRate > 0` (not in Dutch auction)
	- No bid is outstanding for license `outstandingBid[licenseId]`
	- Must approve deposit amount of ETHx
- Actions
	- `lockContributionRate` on [[Draft Proposal - AuctionSuperApp|CollectorSuperApp]]
	- Transfer deposit to ETHxPurchaser

### Place Dutch Auction Bid
User can place and immediately claim a bid for a license that is in Dutch auction.
```solidity
function placeDutchAuctionBid(
	uint256 licenseId, 
	uint256 contributionRate
)
```

- Requirements
	- `msg.sender` is not license owner
	- `totalContributionRate == 0` (in Dutch auction)
	- Must approve deposit amount of ETHx
- Actions
	- `increaseContributionRate(bidder, newContributionRate)
	- `setContributionRate` on [[Draft Proposal - Accountant|Accountant]]
	- `withdrawableDeposits[sender] += deposit`
	- Transfer license to bidder

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
	- `unlockContributionRate(bidder)` on [[Draft Proposal - AuctionSuperApp|CollectorSuperApp]]
	- `increaseContributionRate(bidder, newContributionRate)
	- `setContributionRate` on [[Draft Proposal - Accountant|Accountant]]
	- `withdrawableDeposits[sender] += deposit`
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
	- `unlockContributionRate(bidder)` on [[Draft Proposal - AuctionSuperApp|CollectorSuperApp]]
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

- `totalContributionRate > 0`-> Self-assessed value of current owner
- `totalContributionRate == 0` -> Dutch auction price declining to 0
- License is `0x0` -> Fair launch auction price OR 0

### Calculate Penalty
Calculate the penalty needed for the current bid to be rejected.

```solidity
function calculatePenalty(
	uint256 licenseId
) returns (uint256)
```

### Pause
Pause and unpause for use in an emergency. Pauses all purchases.

```
function pause() public
```

```
function unpause() public
```

`PAUSE_ROLE` is required.

### isValid
Conforms to [[Draft Proposal - License Validator]]. Checks if current license owner is `0x0` or not.

```solidity
function isValid(uint256 id) public view returns (bool)
```

## Roles
| Name                       | Function Access       |
| -------------------------- | --------------------- |
| `PAUSE_ROLE`               | `pause`, `unpause`    |

## Required Permissions
| Contract                                                  | Role                       | Reason                                                   |
| --------------------------------------------------------- | -------------------------- | -------------------------------------------------------- |
| [[Draft Proposal - ERC721License\|License]]               | `OPERATOR_ROLE`            | Transfers the license to the new owner                   |
| [[Draft Proposal - AuctionSuperApp\|CollectorSuperApp]] | `MODIFY_CONTRIBUTION_ROLE` | Modifies contribution on `modify`                        |
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