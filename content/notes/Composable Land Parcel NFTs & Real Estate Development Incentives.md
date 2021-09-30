# Composable Land Parcel NFTs & Real Estate Development Incentives
Date (Last Update) :: 2021-09-30
Author :: [[@gravenp]]

---
## Proposal
Implement mechanisms to incentivize private digital real estate development subject to partial common ownership on the Geo Web.

## Motivation
The Geo Web is an experiment in mechanism design and property rights as much as it is an augmented reality platform. With partial common ownership as the foundational design for the digital land market, we have the opportunity—the responsibility—to explore uses of the resulting network fees in ways that benefit the public. At a high level, this can mean funding public goods (non-rivalrous and non-excludable) or private goods with positive externalities. This proposal explores an idea for the latter.

## Introduction
In the physical world, governments, corporations, NGOs, etc. often attempt to encourage private actions with positive externalities though economic incentives. An example is a tax rebate for individuals and corporations to invest in green energy infrastructure or entrepreneurship in an under served area. With the right incentive structure, groups of people can harness the power of distributed decision making (i.e., markets) to achieve societal goals and overcome coordination failures. 

The Geo Web can utilize its network fee treasury to fund conceptually similar incentives for digital land licensors to invest in their parcels. The incentives should directly benefit licensors through increased utility of their land and indirectly benefit the public through increased aggregate network utility and network fees via land appreciation. 

## Implementation Overview
 This proposal relies on two foundational concepts:
 - NFT composability (i.e., land parcel NFTs owning other tokens and NFTs)
 - Investment incentives delivered via smart contracts

### NFT composability
Content on the Geo Web can be thought of as straddling two separate planes—the content layer and the property rights layer.

The content layer consists of the protocols and networks (currently Ceramic, IPFS, & Filecoin) that enable the information sharing required to publish and resolve content. This layer creates utility by organizing linked digital content for consumption on the Geo Web. 

Content linking does not, however, create or necessitate explicit property rights (i.e. anyone can link to any digital content, tokenized or not). There are "Layer 0" social norms which limit the utility of linking someone else's tokenized content, and Geo Web spatial browsers can help reinforce these norms through differential display of NFTs. But, true digital real estate development requires an enforceable property rights mechanism on the Geo Web that complements the content layer.

As of writing, Geo Web land parcels are ERC-721 non-fungible tokens. We need to implement an extension of the ERC-721 standard that **allows the land parcels themselves to own other tokenized assets on-chain**. 

This concept has been explored by numerous projects in the Ethereum ecosystem and is commonly referred to as [composable NFTs](https://medium.com/coinmonks/introducing-crypto-composables-ee5701fde217).

[ERC-998](https://github.com/mattlockyer/composables-998/) is a [draft EIP](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-998.md), which includes different approaches to attach ERC-721 and ERC-20 tokens to ERC-721 tokens, that may serve as the basis for a Geo Web implementation.

The implementation of composable NFTs will also need to work in conjunction with the logic of the partial common ownership land market including license expiration, forced transfers, and parcel merges/splits.

Once there is an enforceable property right link between land parcels and downstream assets, the design space for digital real estate development will be wide open.

When a plot of physical land is purchased, the ownership of the house and its foundation are usually transferred with the land. The paintings and the furniture in the house aren't, unless the sale is specifically structured to include them.

With composable land parcel NFTs, we can mimic this dynamic. Some content linked to a parcel will only be tied via the content layer. Its ownership isn't included in a parcel transfer. Other content can be anchored with automatically transferable property rights and may be the *main reason* for a parcel purchase.

Entrepreneurial Geo Web land licensors may choose to anchor ownership of tokenized apps, art, architecture, games, etc. to their parcels to help grow their land value. They may also choose to keep content ownership separate and limit the value subject to the private common ownership market. 

This is where investment incentives may play an important role in growing the value of the Geo Web land market.

### Investment incentives
The Geo Web's partial common ownership market requires land licensors to contribute network fees proportional to the self-assessed value of their parcels to the network treasury on an ongoing basis. 

On the surface, this appears to be "worse" for the rational, self-interested market participant compared to a traditional private property rights system. 

Why would one want to incur ongoing carrying costs versus buying property free and clear?

The answer is the second order effects. The allocative efficiency and increased public goods funding of partial common ownership will end up producing more individual and network value than a private property system would, but the Geo Web still needs to overcome that first order economic intuition

This is why the idea of funding private goods with positive externalities should be an important part of the Geo Web's treasury strategy. Instead of relying on enlightened self-interest and/or low time preference, we can structure incentives that align individual participants' immediate, basic economic interests with the public's. 

One way that we can do this by returning funds from the network treasury back to the market in the form of a rebate (with certain conditions).

These rebates can be distributed to land parcels rather than the licensor (via NFT composability). The licensor controls the parcel, so the immediate effect is "free money to spend" from the individual's perspective. The important difference arises from the fact that land parcels and, by proxy, their downstream assets are subject to partial common ownership.

Additional value can accrue to the parcel in the form of an ERC-20 token (or ETH) even if the licensor decides not to spend the rebate.[^1] However it's much more interesting, and the goal of this initiative, for licensors to invest their rebates.

The linchpin to successfully incentivize digital real estate investment is a smart contract-enforced requirement that rebates only be used in exchange for tokenized assets that are owned by the originating land parcel.

Land licensors can invest rebates in the NFT art, architecture, and applications that they deem valuable for their parcel. The next licensor will automatically assume control of those assets upon parcel transfer. The net result can be compounding parcel utility and in turn higher land parcel valuations. Both are net positives for the individual participant and the public.

At least some of the value of art, architecture, and applications will be in "the eye of the beholder.'' That's part of the beauty of enabling market participants to invest the rebates as they see fit. It also introduces several challenges that must be addressed.

What if a new licensor doesn't want to own the parcel's downstream content or wants to move it to another parcel? There must be a mechanism by which to separate assets from the parcel. 

For this, we propose allowing licensors to split NFTs from a parent parcel by setting a separate self-assessed value for the asset. All of the requirements of partial common ownership can be applied to the newly independent NFT.

This allows for freer movement of NFT assets while helping ensure that the value of the treasury-funded investment is still shared with the public (continued public goods funding via network fees). 

The incentive for land licensors to utilize "free money" creates an on ramp to growing and diversifying the Geo Web's partial common ownership economy.

The downside of an "eye of the beholder" market is that it opens the opportunity for bad faith participants to purchase "intentionally valueless" NFTs from themselves (just a different address) or another party who just refunds some or all of the rebate. There aren't silver bullet solutions to this, but with mitigation tactics the benefits of the system can still far outweigh the cost of fraud.[^2] 

Proof of unique identity tools like [BrightID](https://www.brightid.org/) and [Proof of Humanity](https://www.proofofhumanity.id/) are starting points to combat Sybil attacks.[^3] Instead of a binary evaluation of uniqueness required for payment, a score can be used to scale the maximum payment an NFT seller can be "trusted" to receive.

NFT marketplaces could also be incentivized to integrate, promote, and steward the Geo Web's rebate-for-NFT market by earning a protocol-funded commission on each sale. Each marketplace could curate their own list of "valid" content and creators as they see fit. 

Marketplace versus marketplace competition would be open. Geo Web stakeholders could withhold payment to or slash a marketplace's stake that disregards their duty to limit fraud with a protocol like [Kleros](https://kleros.io/) or a voting mechanism. 

Larger markets for creators, artists, and developers to earn a living via the Geo Web is another positive knock-on effect of these incentives. Instead of the marketplace/app store model of taking a (significant) cut of every sale, the Geo Web can subsidize additional sales and revenue.

There are numerous ways to structure the disbursement of rebates. A fixed percentage of a parcel's network fees is simple and eliminates some potential attack vectors for bad actors. Quadratic, tiered, capped, and fixed rebate amounts could help promote egalitarian values, but will require more complex supporting infrastructure to limit perverse incentives. 

If the rebates are paid out in a custom ERC-20 token (i.e., GEO), there's room for additional experimentation with tokenomics and redemption rates (assume that GEO can be redeemed for ETH from the treasury). 

## Conclusion
The Geo Web has a tremendous opportunity to utilize its network funds to promote positive sum coordination. Funding digital public goods is one obvious way that we'll lean into. But, there are many others including private good-focused initiatives like this one. 

Physical world governance provides centuries of learning and inspiration on which to build on. With blockchain based infrastructure, we can pursue our shared goals and values more efficiently, effectively, and transparently with the right designs.

This proposal is not yet implemented nor complete. The Geo Web's work to find new and better ways to utilize its treasury will never be "complete." So if you're interested in contributing to the design, development, and/or governance of the Geo Web, join us on [Discord](https://discord.com/invite/reXgPru7ck) and [Github](https://github.com/Geo-Web-Project). We'd welcome your feedback, support, and help building out this initiative and/or the next 100.

[^1]: Expiration dates or caps on unspent funds may also be appropriate.
[^2]: Fraud here effectively results in a marginally lower tax rate for the parcel for the bad actor. Rebates are funded by network fees paid in and will be less than the total amount paid.
[^3]: The rebate should also include a condition that a licensor cannot purchase content from themselves.
