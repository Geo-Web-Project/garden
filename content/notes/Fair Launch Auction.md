# Draft Spec - Fair Launch Auction

[![hackmd-github-sync-badge](https://hackmd.io/X7t_RoXxRMGfKJwYjE2TyQ/badge)](https://hackmd.io/X7t_RoXxRMGfKJwYjE2TyQ)


Implement an auction claim mechanism for a mainnet fair launch

**Issue Background**

The Geo Web project is a public good which attempts to establish legitimacy through fairness. Its partial common ownership system promotes ongoing healthy market dynamics (i.e. fairness), but as currently implemented it does not account for certain incentives created at market genesis. There are some famous/highly trafficked places which will draw immediate speculation. &quot;Fastest to claim&quot; is not the optimal allocation mechanism for this scenario. While &quot;revenue&quot; maximization is not the goal of our fair launch, we believe that initial parcel claims going to those that currently value them the highest (and are willing to pay network fees accordingly) is consistent with the long-term incentives/goals of the partial common ownership system.

**Overview**

Implement a Dutch auction for genesis land parcel claims in the [Geo Web Admin contract](https://github.com/Geo-Web-Project/core-contracts/blob/main/contracts/GeoWebAdminNative_v0.sol)

**Details**

- At a specified datetime (TBD value), start a _genesis auction_ for parcel claims globally
  - The digital land registry will be empty at genesis
  - No claims are allowed before this datetime
  - All initial parcel claims are subject to the auction mechanics
  - Once a parcel/coordinate has been claimed once, the genesis auction mechanics no longer apply (i.e. these rules don&#39;t apply to transfers, additional fee payments, or changes in value)
- Genesis auction attributes
  - Implemented as a Dutch auction which utilizes the partial common ownership concepts of _For Sale Price_ and _Network Fees_ to determine the auction price/payment
    - Note: _Network Fee_ balances aren&#39;t stored in the license contracts, but are derived from/transformed to the _expirationTimestamp_ value based on the current rate of 10%\*_For Sale Price_ per year
  - The auction commences with a high minimum_For Sale Price_ value (use 10 ETH as a placeholder)
  - This minimum license value exponentially decays every second from the initial value to a final minimum value (use .1 ETH as a placeholder) over a specified time period (use 4 weeks as a placeholder)
    - Note: The final minimum value is greater than 0 to stay consistent with existing ongoing claim requirements
- Auction claim details
  - A prospective claimant can submit a land claim at any time after genesis
    - Parcel coordinates must be contiguous (existing claim functionality)
    - Parcel coordinates must not overlap with existing parcels (existing claim functionality)
    - Parcel must contain less than or equal to ### (TBD value) coordinates
  - The _For Sale Price_ set in the claim must be greater than or equal to the current minimum _For Sale Price_ value as determined by the genesis auction mechanism
  - The claimant must pay exactly 2 years worth of _Network Fees (expirationTimestamp = Current datetime + 2 years) based on their _For Sale Price_ (i.e. 20% \* _For Sale Price_)
      - Having the claimaint pay two years (max expriation date) eliminates some auction abuses (eg claim a parcel, pay less than max network fees, & lower the price immediately)
    - Note of emphasis for the UI and marketing in the lead up: the claimant does not pay the full _For Sale Price_ to make the claim
  - At the end of the genesis auction period (placeholder = 4 weeks), the existing minimum (2 weeks) and maximum (2 years) _Network Fee_ payment limits should apply
* Need to consider MEV and frontrunning scenarios
    * Commit-reveal schemes?
    * Silent auction like mechanism
    * Multipart claim like ENS
     