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
Purchase an existing parcel and set a new value.

```
function purchase(uint256 id, address to, uint256 maxPurchasePrice, uint256 newValue) public payable
```

## Required Permissions
| Contract                                                            | Role                | Reason                                            |
| ------------------------------------------------------------------- | ------------------- | ------------------------------------------------- |
| [[Draft Proposal - License\|License]]                               | `OPERATOR_ROLE`     | Transfers the license to the new owner            | 
| [[Draft Proposal - ETHExpirationCollector\|ETHExpirationCollector]] | `MODIFY_VALUE_ROLE` | Sets initial parcel value when mint is successful |

## Diagram
```nomnoml
[ETHPurchaser|
	[<table> Functions |
		purchase() | public
	]
]

[ETHPurchaser]-[<lollipop>OPERATOR_ROLE]
[ETHPurchaser]-[<lollipop>MODIFY_VALUE_ROLE]

[ETHExpirationCollector | 
	[Storage |
		licenseExpirationTimestamps
	]
	[<table> Functions |
		makePayment() | public ||
		setValue() | MODIFY_VALUE_ROLE or owner
	]
]
[License | 
	[<table> Functions |
		safeMint() | MINT_ROLE || 
		pause() 
		unpause() | PAUSE_ROLE || 
    	isApprovalForAll() == true | OPERATOR_ROLE
	]
]
[MODIFY_VALUE_ROLE]-+[ETHExpirationCollector]
[OPERATOR_ROLE]-+[License]
```