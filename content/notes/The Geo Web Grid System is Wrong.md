# The Geo Web Grid System is Wrong
Date:: 2021-09-30
Author:: [[@codynhat]]

Some of the earliest conversations about the Geo Web have been about the _grid system_ or how to properly store what physical land belongs to which on-chain land parcels. We have gone through several iterations, weighing trade-offs, and coming up with requirements (no overlapping, only contiguous parcels, etc).

While we have _a_ [solution](https://github.com/Geo-Web-Project/specs/blob/main/contracts/GeoWebParcel.md) today, it is not _the_ solution. Like all rules that are defined in the Geo Web, it is naive to think the current rules at any point in time will be perfect and never need to change. Early stages of the project should focus on [[Extending the Geo Web|extensibility]] rather than coming up with the perfect rules.

The grid system is a set of rules that is most certainly wrong and will need to change. We should be operating with the assumption that it _will_ change. We may not know what the change will be, but we can put our efforts into making sure change can happen as smoothly as possible.

Potential changes to the grid system include adjust the **grid size**, which will most likely need to be done even before a mainnet launch. Another, very different, change would be to adopt a protocol like [Astral Verifiable Spatial Data Registries](https://docs.astral.global/workplan/verifiable-spatial-data-registries).