# Draft Proposal - AuctionETHClaimer
#proposal

Date :: 2021-10-15
Author :: [[@gravenp]]

## Summary
A smart contract that enables land parcel claims during a reverse Dutch auction starting at the launch of the network.

## Parameters
| Name                  | Type      | Description                             |
| --------------------- | --------- | --------------------------------------- |
| `auctionStart` | `uint256` | Datetime to initialize the auction |
| `auctionSlow` | `uint256` | Datetime to slow the bid reduction rate |
| `auctionEnd` | `uint256` | Datetime that the auction concludes |
| `startingBid` | `uint256` | The starting bid of the auction |
| `endingBid` | `uint256` | The ongoing claim fee after the auction has concluded |

## Storage
None.

## Functions
### Check Auction Price
Check the current global auction price to make a land parcel claim. See [[Fair Launch Auction Requirements]] for required bid auction logic.

```
function checkAuctionPrice() public view
```

### Auction Claim
Claim a new parcel with auction and initial contribution payments.

```
function auctionClaim(address to, uint64 baseCoordinate, uint256[] calldata path, uint256 initialContributionRate) public payable
```

### Pause
Pause and unpause for use in an emergency. Pauses all claims.

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
| Contract                                                            | Role                | Reason                                                                                           |
| ------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| [[Draft Proposal - Parcel\|Parcel]]                                 | `BUILD_ROLE`        | Builds a new parcel with the given base coordinate and path, if the auction bid, payment, and value are valid. |
| [[Draft Proposal - ERC721License\|License]]                               | `MINT_ROLE`         | Mints a license if parcel is successfully minted                                                 |
| [[Draft Proposal - ETHExpirationCollector\|ETHExpirationCollector]] | `MODIFY_CONTRIBUTION_ROLE` | Sets initial contribution rate when mint is successful                                                |

## Diagram
```nomnoml
[AuctionETHClaimer|
	[<table> Functions |
		auctionClaim() | public ||
		checkAuctionPrice() | public ||
		pause() 
		unpause() | PAUSE_ROLE
	]
]

[AuctionETHClaimer]-[<lollipop>BUILD_ROLE]
[AuctionETHClaimer]-[<lollipop>MINT_ROLE]
[AuctionETHClaimer]-[<lollipop>MODIFY_CONTRIBUTION_ROLE]

[Parcel |
	[Storage |
		availabilityIndex |
		landParcels
	]
	[<table> Functions |
		build() | BUILD_ROLE || 
		destroy() | DESTROY_ROLE || 
    	append()
		prepend()
		trimStart()
		trimEnd() | MODIFY_ROLE]
]
[ETHExpirationCollector | 
	[Storage |
		licenseExpirationTimestamps
	]
	[<table> Functions |
		makePayment() | public ||
		setContributionRate() | MODIFY_CONTRIBUTION_ROLE or owner ||
		pause() 
		unpause() | PAUSE_ROLE
	]
]
[ERC721License | 
	[<table> Functions |
		safeMint() | MINT_ROLE || 
		pause() 
		unpause() | PAUSE_ROLE || 
    	isApprovalForAll() == true | OPERATOR_ROLE
	]
]

[MODIFY_CONTRIBUTION_ROLE]-+[ETHExpirationCollector]
[BUILD_ROLE]-+[Parcel]
[MINT_ROLE]-+[ERC721License]
```