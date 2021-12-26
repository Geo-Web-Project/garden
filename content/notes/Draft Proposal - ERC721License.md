# Draft Proposal - ERC721License
#proposal

Date :: 2021-10-01
Author :: [[@codynhat]]

## Summary
A smart contract that stores the owner of a parcel license as an [ERC-721][1] token.

## Storage
No additional storage beyond what is needed for [ERC-721][1]

## Functions
All functions needed for [ERC-721][1], along with the ones defined below.

### Mint
Mint a new license.
```
function safeMint(address to, uint256 tokenId) public
```

`MINT_ROLE` is required.

### Burn
Burn a license.
```
function burn(uint256 tokenId) public
```

`BURN_ROLE` is required.

### Pause
Pause and unpause for use in an emergency. Pauses transfers.

```
function pause() public
```

```
function unpause() public
```

`PAUSE_ROLE` is required.

## Roles
| Name            | Function Access                          |
| --------------- | ---------------------------------------- |
| `BURN_ROLE`     | `burn`                                   |
| `MINT_ROLE`     | `safeMint`                               |
| `PAUSE_ROLE`    | `pause`, `unpause`                       |
| `OPERATOR_ROLE` | `isApprovalForAll` always returns `true` |

### Operator
The [ERC-721][1] function `isApprovedForAll` is overridden to always return `true` for an operator with the `OPERATOR_ROLE`. This allows for partial common ownership of licenses. 

```
function isApprovedForAll(address owner, address operator) public view
```

## Diagram
```nomnoml
[ERC721License | 
	[<table> Functions |
		safeMint() | MINT_ROLE || 
		burn() | BURN_ROLE ||
		pause() 
		unpause() | PAUSE_ROLE || 
    	isApprovalForAll() == true | OPERATOR_ROLE
	]
]
```

[1]: https://eips.ethereum.org/EIPS/eip-721