# Draft Proposal - SimpleClaimer
#proposal

Date :: 2021-10-07
Author :: [[@codynhat]]

## Summary
A smart contract that enables simple, first-come-first-serve claims on land parcels.

## Storage
None.

## Functions
### Claim
Claim a new parcel with an initial contribution payment.

```
function claim(address to, uint64 baseCoordinate, uint256[] calldata path, uint256 initialValue) public payable
```

## Required Permissions
| Contract                                                            | Role                | Reason                                                                                           |
| ------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| [[Draft Proposal - Parcel\|Parcel]]                                 | `BUILD_ROLE`        | Builds a new parcel with the given base coordinate and path, if the payment and value are valid. |
| [[Draft Proposal - License\|License]]                               | `MINT_ROLE`         | Mints a license if parcel is successfully minted                                                 |
| [[Draft Proposal - ETHExpirationCollector\|ETHExpirationCollector]] | `MODIFY_VALUE_ROLE` | Sets initial parcel value when mint is successful                                                |
