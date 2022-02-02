# Draft Proposal - FairLaunchClaimer
#proposal

Date :: 2021-01-30
Author :: [[@gravenp]]

## Summary
A smart contract that enables land parcel claims during a reverse Dutch auction starting at the launch of the network.

## Parameters
| Name                  | Type      | Description                             |
| --------------------- | --------- | --------------------------------------- |
| `auctionStart` | `uint256` | Datetime to initialize the auction |
| `auctionEnd` | `uint256` | Datetime that the auction concludes |
| `startingBid` | `uint256` | The starting bid of the auction |
| `endingBid` | `uint256` | The ongoing claim fee after the auction has concluded |

## Storage
None.

## Functions
### Check Auction Price
Check the current global auction price to make a land parcel claim. See [[Fair Launch Auction Requirements]] for required bid auction logic.

```
function checkAuctionPrice() public view
```

### Claim
Claim a new parcel with payment of an auction bid payment and initialization of a contribution stream.

```
function Claim(address user, uint256 initialContributionRate, bytes calldata claimData) public payable
```

```
(uint64 baseCoordinate, uint256[] calldata path) = claimData
```

-   Requirements
    -   `msg.sender` has `CLAIM_ROLE`
-   Actions
    -   Build parcel
    -   Mint license to user

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
| `CLAIM_ROLE`               | `claim`    |

## Required Permissions
| Contract                                                            | Role                | Reason                                                                                           |
| ------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| [[Draft Proposal - Parcel\|Parcel]]                                 | `BUILD_ROLE`        | Builds a new parcel with the given base coordinate and path, if the auction bid, payment, and value are valid. |
| [[Draft Proposal - ERC721License\|License]]                               | `MINT_ROLE`         | Mints a license if parcel is successfully minted                                                 |
| [[Draft Proposal - AuctionSuperApp]] | `MODIFY_CONTRIBUTION_ROLE` | Sets initial contribution rate when mint is successful                                                |
| [[Draft Proposal - Accountant]] | `MODIFY_CONTRIBUTION_ROLE` | Will modify license contribution rate on behalf of users                                                |