# Draft Proposal - SimpleETHxClaimer
#proposal

Date :: 2021-10-07
Author :: [[@codynhat]]

## Summary
A smart contract that enables simple, first-come-first-serve claims on land parcels using Superfluid flows.

## Parameters
None.

## Storage
None.

## Functions
### Claim
User can claim a new license for a new parcel.
```solidity
function claim(
	address user,
	uint256 initialContributionRate,
	bytes calldata claimData
)
```

```
(uint64 baseCoordinate, uint256[] calldata path) = claimData
```

- Requirements
	- `msg.sender` has `CLAIM_ROLE`
- Actions
	- Build parcel
	- Mint license to user

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
| Name         | Function Access    |
| ------------ | ------------------ |
| `PAUSE_ROLE` | `pause`, `unpause` |
| `CLAIM_ROLE` | `claim`            |

## Required Permissions
| Contract                                                  | Role                       | Reason                                                                                                  |
| --------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------- |
| [[Draft Proposal - Parcel\|Parcel]]                       | `BUILD_ROLE`               | Builds a new parcel with the given base coordinate and path, if the payment and contribution are valid. |
| [[Draft Proposal - ERC721License\|License]]               | `MINT_ROLE`                | Mints a license if parcel is successfully minted                                                        |
| [[Draft Proposal - AuctionSuperApp\|CollectorSuperApp]] | `MODIFY_CONTRIBUTION_ROLE` | Increases contribution rate when mint is successful                                                     |
| [[Draft Proposal - Accountant\|Accountant]]               | `MODIFY_CONTRIBUTION_ROLE` | Will modify license contribution rate on behalf of users                                                |