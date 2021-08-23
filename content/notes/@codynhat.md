# @codynhat
#contributor

Username:: @codynhat
Pronouns:: he/him
Timezones:: UTC-08:00, UTC-07:00
Discord:: codynhat#7156
Twitter:: [@codynhat](https://twitter.com/codynhat)
Github:: [@codynhat](https://github.com/codynhat)
Website:: https://codyhatfield.me/


## Statuses
```dataview
LIST FROM #status WHERE contains(join(author), this.username) SORT file.day DESC
```

## Meetings
```dataview
LIST file.day FROM #meeting WHERE contains(join(attendees), this.username) SORT file.day DESC
```