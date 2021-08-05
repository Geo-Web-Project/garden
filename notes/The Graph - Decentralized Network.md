# The Graph & Geo Web (Long Term)  
#meeting

**Date**:: 2021-08-05  
**Attendees**:: Cody & Graven  

---

* We use [The Graph][1] for indexing Geo Web digital land parcels and the linked Ceramic Stream
* Currently using the hosted version of the service
    * Free
    * Not decentralized
* The Graph recently lauched the GRT token and began to execute their plan to implement the decentralized version of their indexing protocol/service (Graph Network)
* The decentralize service isn't free and relies on economic incentives to function
* We want to transition the Geo Web to use the decentralized Graph Network eventually
    * Not necessarily before mainnet launch
* [[Geo Web Roles in The Graph]] Graph Network participants
    * Curators 
    * Indexers
    * Delagators
    * Consumers
* The basic idea is for the Geo Web treasury funds to be used to curate the Geo Web subgraph
    * Create a proposal (through governance process at the time) to use treasry funds to purchase GRT and signal support for the Geo Web subgraph
        * Curation could earn profits for the Treasury (bonding curve based mechanism)
    * Curation creates incentive for more indexers and higher quality indexing
    * As the Geo Web scales, we'd potentially scale our curation allocation to ensure desired performance
    * There is economic cost to curation signals that don't correlate with future query traffic
* An open question is how will the query fees (consumer) be paid for
    * Consumers on the Geo Web
        * Cadastres
        * Browsers
        * End-user
    * Is there a way to use treasury funds on a per user or per land owner basis?
    * Use profits from curation be returned to cover query fees?
        * Effectively this would mean that Geo Web queries would be cheaper than market prices (other queries include profit for both the indexer and curator)
    * [The Graph Studio Billing][2]
        * Geo Web community creates a similar gateway service?
            * Instead of an API key based solution, use Ceramic, signed messages, or some other solution that allows us to count the validated number of queries a cadastre/browser has performed on behalf of users and reimburse them through treasury funds
    * We've previously talked about rewarding Cadastre/Browser developers with treasury rewards based on users (credibly netural mechanism)
        * Graph query fees could be bundled or unbundled within a incentive framework
* Is the hosted Graph service being depracated at some point or will it essetnially transition to becoming a "free indexing peer" on the decentralized network?
    * [It appears][3] that The Graph wants the hosted service to be fully, gradually replaced by the network
* Examples of other projects signaling GRT
    * Curve
    * Sushiswap
    * Uniswap
    * Decentraland
        * 36k GRT signaled
        * 30 curators
        * 7 indexers
    * We should explore how these projects are using The Graph and how query fees are being paid
* Mainnet launch--do we need to be on the network or can we stat with the hosted service?
    * Being on the network potentially means the pace of query costs grows faster than our access to treasury funds to cover these costs
        * Explore The Graph's grant program
        * Start with small curation and hope that we can bridge the gap and keep up with scale
    * Hosted service is an option to start, but we should be primed to move quickly to decentralize if we have traction

[1]: https://thegraph.com
[2]: https://thegraph.com/docs/studio/billing
[3]: https://thegraph.com/blog/curation-live