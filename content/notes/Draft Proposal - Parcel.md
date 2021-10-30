# Draft Proposal - Parcel
#proposal

Date :: 2021-10-01
Author :: [[@codynhat]]

## Summary
A smart contract that stores what area makes up a parcel and defines the rules for mutating a parcel.

## Storage (What)
| Name                | Type                                              | Description                            |
| ------------------- | ------------------------------------------------- | -------------------------------------- |
| `availabilityIndex` | `mapping(uint256 => mapping(uint256 => uint256))` | Stores which coordinates are available |
| `landParcels`       | `mapping(uint256 => LandParcel)`                  | Stores which coordinates belong to a parcel                                       |

## Functions (How)
### Build
Build a new parcel. All coordinates along the path must be available. All coordinates are marked unavailable after creation.

```
function build(uint64 baseCoordinate, uint256[] calldata path) returns (uint256 newParcelId) public
```

`BUILD_ROLE` is required.

### Destroy
Destroy an existing parcel. All coordinates along the path are marked as available.
```
function destroy(uint256 id) public
```

`DESTROY_ROLE` is required.

## Roles (Who)
| Name           | Function Access                             |
| -------------- | ------------------------------------------- |
| `BUILD_ROLE`   | `build`                                     |
| `DESTROY_ROLE` | `destroy`                                   |

## Diagram
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
```