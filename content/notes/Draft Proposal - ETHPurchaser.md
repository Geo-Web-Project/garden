# Draft Proposal - ETHPurchaser
#proposal

Date :: 2021-10-08
Author :: [[@codynhat]]

## Summary
A smart contract that enables the sale and transfer of always-for-sale licenses in ETH.

## Parameters
| Name                          | Type      | Description                                            |
| ----------------------------- | --------- | ------------------------------------------------------ |
| `dutchAuctionLengthInSeconds` | `uint256` | Length of Dutch auction upon a parcel becoming invalid | 

## Storage
None.

## Functions
### Purchase
Purchase an existing parcel and set a new contribution rate.

```
function purchase(uint256 id, address to, uint256 maxPurchasePrice, uint256 newContributionRate) public payable
```

### Calculate Purchase Price
Calculate the current purchase price of a parcel. Uses `invalidStartDate` of [[Draft Proposal - License Validator|validator]] as the start of a dutch auction that reaches a price of 0 after `dutchAuctionLengthInSeconds`.

```
function calculatePurchasePrice(uint256 id) public view returns(uint256)
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

## Roles
| Name                       | Function Access       |
| -------------------------- | --------------------- |
| `PAUSE_ROLE`               | `pause`, `unpause`    |

## Required Permissions
| Contract                                                            | Role                       | Reason                                                 |
| ------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------ |
| [[Draft Proposal - ERC721License\|License]]                               | `OPERATOR_ROLE`            | Transfers the license to the new owner                 |
| [[Draft Proposal - ETHExpirationCollector\|ETHExpirationCollector]] | `MODIFY_CONTRIBUTION_ROLE` | Sets new contribution rate when purchase is successful | 

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
[OPERATOR_ROLE]-+[ERC721License]
```