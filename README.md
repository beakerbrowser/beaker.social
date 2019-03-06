# Beaker.Social

A social networking app built on Beaker's [unwalled.garden open standards](https://github.com/beakerbrowser/unwalled.garden).

![./docs/screen1.png](./docs/screen1.png) ![./docs/screen2.png](./docs/screen2.png)

## How it works

 - Every user has their own Dat website.
 - Users publish posts, comments, and other kinds of content on their sites.
 - Users follow each other to sync their content.
 - Follows are public, creating a social graph.

You can think of it as a souped-up RSS: users publish records as files on their sites, then sync the files regularly to receive updates. This is used to power news feeds, aggregators, comments sections, search engines, and more.

## How does this relate to Fritter?

[Fritter](https://github.com/beakerbrowser/fritter) was a proof-of-concept social network that we built on Beaker. This app uses the same principles but fixes some of the issues that we had with Fritter.

One of the biggest differences is that Beaker now provides high-level Web APIs using the [unwalled.garden open standards](https://github.com/beakerbrowser/unwalled.garden). This improves performance, makes it easier to share data between apps, and makes building new apps easier.
