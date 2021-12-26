# Draft Proposal - ParcelModifier
#proposal

Date :: 2021-11-24
Author :: [[@codynhat]]

## Summary
A smart contract that enables various modifications to existing parcels.

Here is an attempt to summarize the possible operations we discussed.
- Each operation may have one or two parcels (FROM and TO)
- The "coords" columns specify which sources the FROM and TO parcels may contain coordinates from
- `CREATED` results in new token ID and license
- `DESTROYED` burns a token ID and license
- `MODIFIED` keeps token ID and base coordinate

| Operation         | Unclaimed Coords | FROM Coords | TO Coords | FROM result | TO result |
| ----------------- | ---------------- | ----------- | --------- | ----------- | --------- |
| Claim             | YES              | N/A         | N/A       | N/A         | CREATED   |
| Modify            | YES              | N/A         | YES       | N/A         | MODIFIED  |
| Merge             | YES              | YES         | YES       | DESTROYED   | MODIFIED  |
| Split             | YES              | YES         | N/A       | MODIFIED    | CREATED   |
| Split and Destroy | YES              | YES         | N/A       | DESTROYED   | CREATED   |

## Parameters
None.

## Storage
None.

## Functions
### Modify
Modify an existing parcel. 

- Base coordinate stays the same
- Can redraw a path that includes any unclaimed coordinates or coordinates currently part of this parcel
- Must be the current parcel owner or approved by owner

```
function modify(
	address msgSender,
	uint256 toParcelId, 
	uint256[] calldata newPath
) public
```

`toParcelId` is `MODIFIED`.

`MODIFY_ROLE` is required.

### Merge
Merge a parcel into another. 

- The `TO` parcel base coordinate stays the same
- The new `TO` path can include any unclaimed coordinates or coordinates currently part of either parcel
- Must be the current owner of both parcels or approved by owner

```
function merge(
	address msgSender,
	uint256 fromParcelId, 
	uint256 toParcelId, 
	uint256[] calldata toPath 
) public
```

`fromParcelId` is `DESTROYED`.
`toParcelId` is `MODIFIED`.

`MODIFY_ROLE` is required.

### Split
Split a parcel by creating a new parcel from coordinates of an existing parcel. 
- The `FROM` base coordinate stays the same
- The new `FROM` and `TO` paths can include any unclaimed coordinates or coordinates currently part of `FROM`
- Must be the current owner of the parcel or approved by owner
- Contribution rate of `TO` parcel must be given

```
function split(
	address msgSender,
	uint256 fromParcelId, 
	uint256[] calldata fromPath, 
	uint256 toBaseCoordinate,
	uint256[] calldata toPath,
	uint256 toContributionRate
) public
```

`fromParcelId` is `MODIFIED`.
`TO` parcel is `CREATED`.

`MODIFY_ROLE` is required.

### Split and Destroy
Split a parcel by creating a new parcel from coordinates of an existing parcel, but destroy the `FROM` parcel afterwards.
- The new `TO` path can include any unclaimed coordinates or coordinates currently part of `FROM`
- Must be the current owner of the parcel or approved by owner
- Contribution rate of `TO` parcel must be given

```
function splitAndDestroy(
	address msgSender,
	uint256 fromParcelId, 
	uint256 toBaseCoordinate,
	uint256[] calldata toPath,
	uint256 toContributionRate
) public
```

`MODIFY_ROLE` is required.

### Pause
Pause and unpause for use in an emergency. Pauses all modifications.

```
function pause() public
```

```
function unpause() public
```

`PAUSE_ROLE` is required.

## Roles
| Name          | Function Access                               |
| ------------- | --------------------------------------------- |
| `PAUSE_ROLE`  | `pause`, `unpause`                            |
| `MODIFY_ROLE` | `modify`, `merge`, `split`, `splitAndDestroy` |

## Required Permissions
| Contract                                                  | Role                       | Reason                                          |
| --------------------------------------------------------- | -------------------------- | ----------------------------------------------- |
| [[Draft Proposal - ERC721License\|License]]               | `BURN_ROLE`                | Burns a license when parcel is `DESTROYED`      |
| [[Draft Proposal - ERC721License\|License]]               | `MINT_ROLE`                | Mints a license when parcel is `CREATED`        |
| [[Draft Proposal - CollectorSuperApp\|CollectorSuperApp]] | `MODIFY_CONTRIBUTION_ROLE` | Modifies contribution on `modify`               |
| [[Draft Proposal - Parcel\|Parcel]]                       | `BUILD_ROLE`               | Builds a new parcel on `CREATED` and `MODIFIED` |
| [[Draft Proposal - Parcel\|Parcel]]                       | `DESTROY_ROLE`             | Destroys a parcel on `DESTROYED` and `MODIFIED` |

## Diagram
```nomnoml
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

[ParcelModifier]-[<lollipop>BURN_ROLE]
[ParcelModifier]-[<lollipop>MINT_ROLE]
[ParcelModifier]-[<lollipop>MODIFY_FUNDS_ROLE]
[ParcelModifier]-[<lollipop>MODIFY_CONTRIBUTION_ROLE]
[ParcelModifier]-[<lollipop>BUILD_ROLE]
[ParcelModifier]-[<lollipop>DESTROY_ROLE]

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
[Parcel |
	[Storage |
		availabilityIndex |
		landParcels
	]
	[<table> Functions |
		build() | BUILD_ROLE || 
		destroy() | DESTROY_ROLE]
]
	
[MODIFY_CONTRIBUTION_ROLE]-+[ETHExpirationCollector]
[MODIFY_FUNDS_ROLE]-+[ETHExpirationCollector]
[MINT_ROLE]-+[ERC721License]
[BURN_ROLE]-+[ERC721License]
[BUILD_ROLE]-+[Parcel]
[DESTROY_ROLE]-+[Parcel]
```