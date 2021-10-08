Install the [Kroki](https://github.com/gregzuro/obsidian-kroki) plugin

```nomnoml
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
[Accountant | 
	[Storage |
		licenseValues
	]
	[<table> Functions |
		setValue() | MODIFY_VALUE_ROLE
	]
]
[SimpleETHClaimer|
	[<table> Functions |
		claim() | public
	]
]
[ETHPurchaser|
	[<table> Functions |
		purchase() | public
	]
]

[ETHPurchaser]-[<lollipop>OPERATOR_ROLE]
[ETHPurchaser]-[<lollipop>MODIFY_VALUE_ROLE (ETHExpirationCollector)]
[SimpleETHClaimer]-[<lollipop>BUILD_ROLE]
[SimpleETHClaimer]-[<lollipop>MINT_ROLE]
[SimpleETHClaimer]-[<lollipop>MODIFY_VALUE_ROLE (ETHExpirationCollector)]

[<lollipop>MODIFY_VALUE_ROLE (Accountant)]-+[Accountant]
[ETHExpirationCollector]-[MODIFY_VALUE_ROLE (Accountant)]
[MODIFY_VALUE_ROLE (ETHExpirationCollector)]-+[ETHExpirationCollector]
[BUILD_ROLE]-+[Parcel]
[MINT_ROLE]-+[License]
[OPERATOR_ROLE]-+[License]
```