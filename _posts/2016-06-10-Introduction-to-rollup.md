---
  layout: post
  title: Introduction To Rollup.js
  tags: javascript module bundler es6 rollup.js
  categories: JavaScript
---

* content
{:toc}

[Rollup.js](http://) 
is the next generation module bundler as we can read from 
their official website.
which means we can write next generation modules(es6 modules) and then use rollup to bundle(concatenate) them in a single file.    





First of all, we must install rollup globally to make the ``rollup`` command availabe in the command line, here is the snippet to install it : 
```
npm install -g rollup
```
**Note :** in some computers we need to be an administrator
in order to install node global modules in this case just 
proceed the previous command with a leading ``sudo``.


After installing rollup, we can try to use it for the following simple example : 

```javascript
/* src/UsersCollection.js  */

class UsersCollection{
	constructor(users = []){
		this.users = users
	}
	
	log(){
		console.log(this.users);
	}
}
export default UsersCollection;

/* src/main.js will import UsersCollection and use it for its need. */
/* src/main.js */

import UsersCollection from './UsersCollection';

const usersCollection = new UsersCollection(['user1','user2']);
usersCollection.log();
```

If we run : 
```
rollup src/main.js 
```
the needed parts of code from ``UsersCollection.js`` will be added to ``main.js`` and the bundle file will be printed out
to the terminal, without being stored persistently in an output file.   
If we want to store the output content to a file we can use this command :
```
rollup src/main.js > bundle.js
```

That is nice,                                                                                                   
but what if  we want some sort of configuration file like ``webpack.config.js`` for webpack if we are familiar with it, so we don't have to type everytime the destination file.   
Well, rollup has an answer for that, just create ``rollup.config.js`` file in the root of our project and when calling the rollup command add ``-c`` flag which means hi rollup i have a configuration file please consider it.   
Here is the command that we will use : 

```
rollup src/main.js -c  
```

At this moment ``rollup.config.js`` file is empty and does nothing, so we need to add some configuration, here is a snippet of minimal configuration : 

```javascript
// rollup.config.js
export default {
  entry: 'src/main.js',  
  dest: 'dist/bundle.js' // equivalent to --output or > bundle.js
};
```

* **entry :** a property to specify the source files.
* **dest :** a property to specify the destination file. 

Now everything is good,
but we still have one issue, the generated output is es6 code and till this moment, not all browsers fully support es6(although [Firefox Developer](https://www.mozilla.org/en-US/firefox/developer/) and [Chrome Canary](https://www.google.fr/chrome/browser/canary.html) do to some extent), therefore for prodcution code we need somekind of midlle man to convert the code to es5 that all browsers understand.

For this job i can mention two tools that can be used with rollup, [buble](https://www.npmjs.com/package/rollup-plugin-buble) and [babel plugin](https://www.npmjs.com/package/rollup-plugin-babel), may be there are others but i think these two options are fine, just pick one of them.

In this article i picked [buble](https://www.npmjs.com/package/rollup-plugin-buble), it is simple to use and we don't need to install [babel-preset-es2015-rollup](https://www.npmjs.com/package/babel-preset-es2015-rollup).
Use this command to save buble to our dev dependencies :  

```
npm install rollup-plugin-buble --save-dev
```

Now, import buble in ``rollup.config.js`` file and add ``plugins`` property, so we end up with this : 

```javascript
// import buble
import buble from 'rollup-plugin-buble';
export default {
  entry: 'src/main.js',  
  dest: 'dist/bundle.js', // equivalent to --output or > bundle.js
  plugins:[buble()]  // plugins property to specify plugins to use,
};
```

**Finally** rerun ``buble src/main.js -c`` command, and we should get a bundle file ``dist/bundle.js`` containing es5 code that all browsers understand.
