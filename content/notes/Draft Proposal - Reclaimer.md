# Draft Proposal - Reclaimer
#proposal

Date of Last Update :: 2022-03-16
Author :: [[@codynhat]]
Updated By:: [[@gravenp]]

## Summary
A smart contract interface that defines how a license is reclaimed in a Dutch auction once it is no longer valid.

## Parameters
| Name                  | Type      | Description                             |
| --------------------- | --------- | --------------------------------------- |
| `auctionStart` | `uint256` | The datetime the reclaim auction starts. Equal to the datetime that the parcel license is invalidated. |
| `startingBid` | `uint256` | The starting value of the reclaim auction. Equal to the license's most recent self-assessed value. |

## Storage
None.

## Functions
### Check Reclaim Price
Check the current reclaim auction price for an invalid parcel. See [[Reclaimer Requirements]] for required bid auction logic.

```
function checkReclaimPrice() public view
```

### Reclaim
Reclaim a invalid parcel license with an auction bid payment and initialization of a contribution stream.

```
function Reclaim(address user, uint256 initialContributionRate, bytes calldata claimData) public payable
```

-   Requirements
    -   `msg.sender` has `RECLAIM_ROLE`
-   Actions
    -   Transfer license

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
| `RECLAIM_ROLE`               | `reclaim`    |

## Required Permissions
| Contract                                                            | Role                | Reason                                                                                           |
| ------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| [[Draft Proposal - AuctionSuperApp]] | `MODIFY_CONTRIBUTION_ROLE` | Sets initial contribution rate when mint is successful                                                |
| [[Draft Proposal - Accountant]] | `MODIFY_CONTRIBUTION_ROLE` | Will modify license contribution rate on behalf of users                                                |