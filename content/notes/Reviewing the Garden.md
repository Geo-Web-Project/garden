# Reviewing the Garden
Date:: 2021-10-21
Author:: [[@codynhat]]  

I have been thinking more about the Garden and how to improve it. Taking some notes here of learnings:

- Obsidian + Git-based Garden is not the best for collaboration
	- I use this style for my personal notes, but IMO it doesn't work well with multiple people
	- There is no way to leave comments
	- While being based on Git is open, it is a barrier to those who do not know Git
	- Any change must be submitted as a PR, which is slow and cumbersome
- Notion has similar issues
	- If we wanted a "public" Notion, how would we handle user accounts?
- Using Discourse
	- I have been looking into Discourse more
	- Pros
		- Great for discussion
		- Can also be used as a wiki for notes
		- Has concept of trust levels
		- Much more approachable to newcomers (this seems very high priority)
		- Integration with SourceCred
	- Cons
		- Needs to be self-hosted
			- As opposed to git-based, a server and database is required to run a forum
			- What happens if the server goes down?
			- How can we backup the data?
		- Forced to use Discourse UI and tools
			- Does not have the concept of using any editor

Ultimately, it would be great to have a open forum software based on Ceramic and IPFS. Nobody owns the data, users can choose from all sorts of editors, and it is easier and more approachable than using Git. [Boardroom](https://blog.ceramic.network/boardroom-is-bringing-context-to-web3-governance/) is working on _Ideation_ built on Ceramic, which is the first candidate I've come across that could fit this vision. Time will tell how this does, but today it is unclear how to begin using it.