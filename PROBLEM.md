Programming Problem

 

You are to write a Node JS program called "Monsters Are Scary". Monsters Are Scary is a text adventure game requiring the player to crawl through a dungeon fighting monsters and collecting gold. Your program should not feature any kind of GUI and should be 100% text based. The program should execute via the console.

 

Monsters Are Scary places the player in a grid of rooms. Each room has 4 doors. The player can move either North, South, East or West by typing a command at the console. The game should then react by moving the player into the next room of the direction they have entered.

 

Some rooms have monsters in them. Other rooms have gold in them. To find out what a room contains, a call to a server is required. The call should be made in the following format

 

> GET http://yourstubserver:8080/room/x/y  

 

Where x and y are the grid coordinates of the room the player is in. Note the player starts at 0,0. "x" increments as the player moves north, and "y" increments as the player moves east.

 

The response the sever will send is 'text/plain' and will be either GOLD or MONSTER. If the player has encountered gold the player score must increment by 1. If the player encounters a monster they lose 1 health. The player starts with 5 health. A player dies when their health reaches 0. When a player dies their score should be printed out to the console.