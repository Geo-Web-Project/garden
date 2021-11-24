# Draft Proposal - SimpleETHClaimer
#proposal

Date :: 2021-10-07
Author :: [[@codynhat]]

## Summary
A smart contract that enables simple, first-come-first-serve claims on land parcels.

## Parameters
| Name                  | Type      | Description                             |
| --------------------- | --------- | --------------------------------------- |
| `minClaimExpiration`       | `uint256` | Minimum initial expiration for a license        |

## Storage
None.

## Functions
### Claim
Claim a new parcel with an initial contribution payment.

```
function claim(address to, uint64 baseCoordinate, uint256[] calldata path, uint256 initialContributionRate) public payable
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
| Contract                                                            | Role                       | Reason                                                                                           |
| ------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------ |
| [[Draft Proposal - Parcel\|Parcel]]                                 | `BUILD_ROLE`               | Builds a new parcel with the given base coordinate and path, if the payment and contribution are valid. |
| [[Draft Proposal - ERC721License\|License]]                               | `MINT_ROLE`                | Mints a license if parcel is successfully minted                                                 |
| [[Draft Proposal - ETHExpirationCollector\|ETHExpirationCollector]] | `MODIFY_CONTRIBUTION_ROLE` | Sets initial contribution rate when mint is successful                                           | 

## Diagram
```nomnoml
[SimpleETHClaimer|
	[<table> Functions |
		claim() | public ||
		pause() 
		unpause() | PAUSE_ROLE
	]
]

[SimpleETHClaimer]-[<lollipop>BUILD_ROLE]
[SimpleETHClaimer]-[<lollipop>MINT_ROLE]
[SimpleETHClaimer]-[<lollipop>MODIFY_CONTRIBUTION_ROLE]

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
		pause() 
		unpause() | PAUSE_ROLE || 
    	isApprovalForAll() == true | OPERATOR_ROLE
	]
]
	
[MODIFY_CONTRIBUTION_ROLE]-+[ETHExpirationCollector]
[BUILD_ROLE]-+[Parcel]
[MINT_ROLE]-+[ERC721License]
```