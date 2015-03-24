ArcheAge Guild Tools
================


<img src="http://i47.photobucket.com/albums/f154/uninvisible/archeage_zpscf3i0mgx.png">

Since the original conception of this project the overall logical flow (and my advancement in coding ability) has convinced me to extract the User page and Property page from this repo to act as the foundation for a new repo with a similar premise.  I have found the Property page the most useful, complex, interesting, and Angular-rich part of this project, and since the basic functionality of this page requires the User page, I will include it too. Once the Property and User pages have been reassembled into a new project, I plan to redesign the CSS and HTML to incorporate the Bootstrap knowledge I have gained since the inception of this one and clean out all the spaghetti/excess code that I can find.  This will allow for a much simpler code base, and a smarter overarching logic for the project, allowing for a webapp that could be useful to any ArcheAge player that owned property, not just players in guilds.  As such, if I can establish the code for any user, I can link data between users later who confirm that they are in a guild together, so that later code can manipulate this shared data.  

##What?

The goal of this project is to create a webapp with guild-based tools for [ArcheAge](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CC4QFjAA&url=http%3A%2F%2Fwww.archeagegame.com%2F&ei=YGYAVeG3BPeTsQSUoIDwDw&usg=AFQjCNHgURxtVBi1FIL_jHHfsMNRRnfGbQ&sig2=Gny2Vis_vOgGhYs9L9QP_A).  The projected features of the finished include:

1. User Page
	>> This page allows users to create and maintain a set of characters and their professions.  Also integrates with properties pages.
2. Members Page
	>> This page lists all characters in the guild by their onwner user, so any user of the page can easily identify who's alt is who's, and what level each character in the guild has attained in each proficiency.
3. My Properties Page
	>> This page allows you to add and remove properties you own in the game, subsequently adding timers for tax due dates, complete with warnings and "pay taxes" function.
4. Property Info Page
	>> This page is generated via the "info" button on each property on the Properties Page, or by clicking on a property from the All Properties page, and allows any guild member to add packs to any property owned by another guild member.  These changes are then reflected on both Properties pages.
5. All Properties Page
	>> This page lists all properties by character and owner user, which allows users to see and interact with packs that are on guild member properties.
6. Guild Bank
	>> This page indicates how much gold is currently in the guild bank, with likelyhood of adding a log to record bank transactions.  Transaction access limited to special user group.
7. Auction House Listing
	>> This page offers a simple method for tracking the cost of individual items on the auction house.	


##Why?

I created this project primarilly as a way to learn JavaScript, AngularJS, and Bootstrap.

##Technologies

This project uses JavaScript, AngularJS, Bootstrap, Node.js, jQuery, and Moment.js.  It uses [Firebase](https://www.firebase.com/) for the database and backend.
