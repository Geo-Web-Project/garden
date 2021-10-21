# Draft Proposal - ETHPurchaser
#proposal

Date :: 2021-10-08
Author :: [[@codynhat]]

## Summary
A smart contract that enables the sale and transfer of always-for-sale licenses in ETH.

## Storage
None.

## Functions
### Purchase
Purchase an existing parcel and set a new contribution rate.

```
function purchase(uint256 id, address to, uint256 maxPurchasePrice, uint256 newContributionRate) public payable
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