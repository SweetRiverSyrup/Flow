# FlowRiverProject

This is the digital adaption of the "A Day In The Life Of A River" project lab packet

This is all the server code, written in Node.JS . This code is meant to be used in conjunction with our custom Raspberry Pi3 model B devices called FlowPi s that give off their own ad hoc Wi-Fi network. This feature will allow students in the field to access the FlowPi's local web server which would host the digital version of the "A Day In The Life Of A River" lab packet.

<h2> There are a few ways to set up the server code</h2>

<h3>Install with Git and NPM</h3>

You can download the contents of this repo and cd into the directory from the console

and then use <code>npm install</code> to add the the necessary packages and modules

Or

<h3>Just NPM</h3>

WARNING! This doesn't always work

Open a Command prompt or Terminal to the location of the server directory

Type <code>npm i flowriverproject</code> or <code>npm install flowriverproject</code> and hit enter

<blockquote>Note: This will take a bit, for right now our app is pretty resource dependant</blockquote>
Once that is complete, open the folder you installed it in

Go to the folder <i><strong>node_modules</strong></i>

Look for the folder <i><strong>flowriverproject</strong></i> and open it

Copy all the contents from this folder and paste them into the project/server directory

<h3>A Viola! It <i>should</i> work!</h3>
