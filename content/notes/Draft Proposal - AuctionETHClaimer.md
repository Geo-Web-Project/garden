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
| `auctionEnd` | `uint256` | Datetime that the auction concludes |
| `startingBid` | `uint256` | The starting bid of the auction | 

## Storage
None.

## Functions
### Check Auction Price
Check the current global auction price to make a land parcel claim. (Placeholder Logic: The auction price should be equal to the `startingBid` minus the square root of the time passed since the start of the auction. After `auctionEnd` return 0.)

```
function checkAuctionPrice() public view
```

### Auction Claim
Claim a new parcel with auction and initial contribution payments.

```
function auctionClaim(address to, uint64 baseCoordinate, uint256[] calldata path, uint256 initialContributionRate) public payable
```

## Required Permissions
| Contract                                                            | Role                | Reason                                                                                           |
| ------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| [[Draft Proposal - Parcel\|Parcel]]                                 | `BUILD_ROLE`        | Builds a new parcel with the given base coordinate and path, if the auction bid, payment, and value are valid. |
| [[Draft Proposal - License\|License]]                               | `MINT_ROLE`         | Mints a license if parcel is successfully minted                                                 |
| [[Draft Proposal - ETHExpirationCollector\|ETHExpirationCollector]] | `MODIFY_CONTRIBUTION_ROLE` | Sets initial contribution rate when mint is successful                                                |

## Diagram
```nomnoml
[AuctionETHClaimer|
	[<table> Functions |
		auctionClaim() | public ||
		checkAuctionPrice() | public
	]
]

[AuctionETHClaimer]-[<lollipop>BUILD_ROLE]
[AuctionETHClaimer]-[<lollipop>MINT_ROLE]
[AuctionETHClaimer]-[<lollipop>MODIFY_VALUE_ROLE]

[<table>Parcel | 
	build() | BUILD_ROLE || 
	destroy() | DESTROY_ROLE || 
    append()
	prepend()
	trimStart()
	trimEnd() | MODIFY_ROLE]
[<table>ETHExpirationCollector | 
	setValue() | MODIFY_CONTRIBUTION_ROLE]
[<table>License | 
	safeMint() | MINT_ROLE || 
	pause() 
	unpause() | PAUSE_ROLE || 
    isApprovalForAll() == true | OPERATOR_ROLE]
	
[MODIFY_CONTRIBUTION_ROLE]-+[ETHExpirationCollector]
[BUILD_ROLE]-+[Parcel]
[MINT_ROLE]-+[License]
```