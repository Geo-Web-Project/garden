# Streaming Payments

First Published :: 2021-10-12
Last Update :: 2021-10-13
Author:: [[@gravenp]]

Notes on streaming payments. Created after [[@codynhat]] & [[@gravenp]] had a long conversation on 2021-10-11 and explored the implications of implementing them on the Geo Web.

## High Level Notes
- Smart contract-based streaming payments have come a long way since we initially architected the Geo Web
- [[@codynhat]]'s review of our core contracts and push for [[Extending the Geo Web|extensibility]] prompted serious reexamination of the possibility of utilizing streaming payments for partial common ownership fees (instead of our deposit/expiration date model)
- A change pre- or post-launch could have a significant impact on our design, so its worthwhile to evaluate now 
- Potential templates/tools that we could use
	- https://www.superfluid.finance/home
		- Open-source EVM-based
		- Running on Polygon & xDAI currently
		- Plans to port to L2s (would likely lend support us if we took it on)
	- https://sablier.finance/
- Implementing streaming payments of partial common ownership fees can create a better UX for land licensors (no expiration dates, more efficient capital usage, etc)
- Streaming payments are also potentially helpful for the Geo Web team in early phases where the powers that be may try to deem that network fees are "revenue" for an centralized entity/team even though they are public funds
	- Avoid a potential accounting headache (revenue recognition on the deposit - crypto is "property" for US tax purposes)
	- Stream in, stream out is more autonomous and efficient than each payment having some approval process
- The opportunity for outbound streams from the Geo Web treasury [[Geo Web Economy|for those creating value in ecosystem]] might be a more exciting than the inbound flows
	- Reinforce the Geo Web treasury less as a pile of money that accumulates and more as a coordination point to route money to value creators in real time
	- More efficient and elegant 
	- Time value of money for value producers (paid per second is better than per week, month, etc)

## UX & Market Implications
- The current deposit model relies on an expiration date & a global network fee rate
	- If we were to ever change the fee rate, we'd need to do a mass expiration date update, grandfather the rate change into each parcel's next network fee payment (which would result in its own weirdness), or effectively lower each parcel's (calculated/implied) self-assessed value
	- With a stream payment system, a rate change would necessitate a recalculation of the self assessed values (assuming this is still a derived value rather than explicitly stored) or have the licensee update their payment flow rate 
	- Payment streams typically rely on economic incentive (via the remaining deposit) for market participants to liquidate/close out streams that are expiring
- We're believers in the merits of the partial common ownership system, but there are ways that bad actors can potentially game the market especially in short time frames:
	- Having to deposit at least 1 year of network fees for claims and two weeks worth for self-assessed value changes/transfers were attempts to limit the impact of these scenarios in the old system
	- Payment streams typically only require a few hours worth of a deposit to remain valid
		- Need to explore if this is a tune-able variable
	- We could implement required capital deposits outside of the payment stream to effectively replicate these (dis)incentives
	- Capital efficiency isn't a bad thing, so seems like we should explore other mechanisms that advantage long-term productive usage/licensing of land vs spammers, trolling, and high-frequency speculation
		- The self assessed value is supposed to represent the licensor's honest valuation, so that should be the main deterrent
	- Cadastre/user inputs under a streaming payment system
		- Still require the user to set a Self-Assessed Value/Always for Sale Price
		- The Network Fee rate is a global variable
		- Using those two values, an implied payment flow rate could be derived
			- Minimum deposit required
			- Amount above and beyond that which the user deposits wouldn't be locked
			- Would still want to show a user their implied expiration date given the network fee rate, but this wouldn't be a value stored on the Geo Web's contracts
		- It still seems appropriate to utilize a reverse Dutch auction for parcels if their payment flow expires
			- For well-intentioned licensors, it's less penal for an honest mistake
			- As long as the auction duration is fairly short (1-2 weeks), licensors trying a "hit and run" type attack (purchase land, raise the price super high, let their stream go dry) shouldn't be very successful. Their risking the full land purchase price on the previous owner not having the patience to wait a few days to reclaim their land
				- Eventually transitioning to monthly or weekly property transfers could also help limit these type of attacks in event-based scenarios
## Fair Launch
- The initial launch of the land market still deserves extra attention because of the possibility for the heightened potential for volatility and short-term speculators
- We have always wanted to avoid the *perception* that this land market is designed to "make money," so land claims were designed only to require ongoing network fee payments rather than a one-time claim fee
	- Unused deposits weren't refundable by the network, but would be returned via any forced transfer
- In [[Fair Launch Auction]], we explored our thinking for launch under the deposit-based system 
	- The goal has always been to avoid creating a gas price war and/or speculators snatching up high value land without much financial commitment. We want land to go to those that truly value it the most (at this early stage)
- Ideas to explore
	- Still using Dutch auction mechanics, users could deposit the equivalent of 1 year (or 2?) of network fees outside of the actual payment stream. The deposit could be returned via an outbound stream or time-locked lump sum. The outbound stream wouldn't be affected by any transfers or price changes of the land parcel itself. This would prevent a claimant from claiming a bunch of parcels during the auction at high prices, hoping that they can flip them at slightly lower prices with their only cost being a short duration of network fees.
	- We could embrace a one-time claim fee determined via Dutch auction. It's potentially cleaner and could jump start the Geo Web's public goods treasury. Even though we'll be using treasury funds for public goods, initial claimants are putting trust in our multi-sig to actually do that. It seems easier to do that for ongoing "service" payments than upfront payments (trust and fees accrue over time together).