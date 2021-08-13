# @gravenp
#contributor 

Username:: @gravenp

## Statuses
```dataview
LIST FROM #status WHERE contains(join(author), this.username) SORT file.day DESC
```

## Meetings
```dataview
LIST file.day FROM #meeting WHERE contains(join(attendees), this.username) SORT file.day DESC
```