Install the [Kroki](https://github.com/gregzuro/obsidian-kroki) plugin

```nomnoml
[Parcel |
	[Storage |
		availabilityIndex |
		landParcels
	]
	[<table> Functions |
		build() | BUILD_ROLE || 
		destroy() | DESTROY_ROLE]
]
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
[Accountant | 
	[Storage |
		contributionRates
	]
	[<table> Functions |
		setContributionRate() | MODIFY_CONTRIBUTION_ROLE
	]
]
[SimpleETHClaimer|
	[<table> Functions |
		claim() | public ||
		pause() 
		unpause() | PAUSE_ROLE
	]
]
[ETHPurchaser|
	[<table> Functions |
		purchase() | public ||
		calculatePurchasePrice() | public ||
		pause() 
		unpause() | PAUSE_ROLE
	]
]
[ParcelModifier|
	[<table> Functions |
		modify() | owner OR isApprovedForAll ||
		merge() | owner OR isApprovedForAll ||
		split() | owner OR isApprovedForAll ||
		splitAndDestroy() | owner OR isApprovedForAll ||
		pause() 
		unpause() | PAUSE_ROLE
	]
]

[ETHPurchaser]-[<lollipop>OPERATOR_ROLE]
[ETHPurchaser]-[<lollipop>MODIFY_CONTRIBUTION_ROLE (ETHExpirationCollector)]
[SimpleETHClaimer]-[<lollipop>BUILD_ROLE]
[SimpleETHClaimer]-[<lollipop>MINT_ROLE]
[SimpleETHClaimer]-[<lollipop>MODIFY_CONTRIBUTION_ROLE (ETHExpirationCollector)]

[ParcelModifier]-[<lollipop> BURN_ROLE]
[ParcelModifier]-[<lollipop> DESTROY_ROLE]
[ParcelModifier]-[<lollipop> MODIFY_FUNDS_ROLE]
[ParcelModifier]-[BUILD_ROLE]
[ParcelModifier]-[MINT_ROLE]
[ParcelModifier]-[MODIFY_CONTRIBUTION_ROLE (ETHExpirationCollector)]

[<lollipop>MODIFY_CONTRIBUTION_ROLE (Accountant)]-+[Accountant]
[ETHExpirationCollector]-[MODIFY_CONTRIBUTION_ROLE (Accountant)]
[MODIFY_CONTRIBUTION_ROLE (ETHExpirationCollector)]-+[ETHExpirationCollector]
[MODIFY_FUNDS_ROLE]-+[ETHExpirationCollector]
[BUILD_ROLE]-+[Parcel]
[DESTROY_ROLE]-+[Parcel]
[MINT_ROLE]-+[ERC721License]
[BURN_ROLE]-+[ERC721License]
[OPERATOR_ROLE]-+[ERC721License]
```