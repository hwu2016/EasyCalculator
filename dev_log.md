## Cyber Calculator
---
### Preface
The purpose of doing this project is to training my coding skills using React.js as well as comprehensive Javascript and CSS3. Actually, this is my first personal project since I learned Web development, so I guess I'll try my best to make it seem like a real project rather than a 'demo' (I've already done a lot of demos lol). And I wish I could keep updating this project as much as possible before I get a job.

As you can see the project name, an online calculator seems not to be complicated, but when I did it, I found it actually requires a deep understanding of Javascript and I need to be familiar with communication of components for React.js. So, well, it's definitely a challenge to me, but I believe the result would turn out to be positive :)

### Nov 4 2021
I really like the theme and concept of the game "Cyberpunk 2077", and that's why I chose this project when I was brainstorming. Okay, so generally, I'd like to have a welcome page, an external link component, a calculator board and a historical record board. I hope I can store my data whenever I completed a calculation, and go back to my previous data when I need it. I hope I can develop two modes of calculator--one standard and one advanced or scientific. Well, making a scientific calculator may take a lot of time, so firstly making the simple one!

Here is my designed list of components: `Welcome`, `Externals`, `Main`.
For Main, --`Advanced`, `Simple`, `History`
For Simple, --`Error`, `Evaluator`
For History, --`Item`

And here is my designed list of modules/packages used: `React`, `react-redux`(abandoned), `pubsub-js`.

Today's accomplishment: `Externals` and `Welcome` pages

### Nov 5 2021
Okay, I found the `input` tag is not suitable for this project. This HTML element seems to have many incompatible issues against the internal logics of calculations, so I changed the tag to `span`. I've looked for other online calculators and Google's calculator. Most of them used `span`.

Today, I almost completed the most important component - `Simple` and its two children components--`Error` & `Evaluator`. Data communication was realized by `pubsub-js`. Calculation logic is mainly done by the mystic `eval()` function, which helped me save a lot of time. So I can focus more on the error reporting, history record and the style at the end of the project.

A good news is that I used the Promise API and RegExp in a project to handle the asynchronous tasks.


### Nov 7 2021
Yesterday I went to watch the League of Legend final and congrats to EDG winning the champion. For today's work, I just realized the fact that in JS the float number calculation had some inaccuracy such as `0.1 + 0.2 !== 0.3`. So to make things more simple, I imported the `math.js` to handle these accuracy issues.

An impressive issue I met is that I misused the loop expression `for ... in ...` to iterate a string. It should be used to iterate an object. And the result to iterate a string (or array) is to show their index value as string. An example is below:
```js
let str = '123'
let arr = [1, 2, 3]
for (let i in str) {
    console.log(typeof i) //string string string
    console.log(i) // 0 1 2
}
for (let i in arr) {
    console.log(typeof i) //string string string
    console.log(i) // 0 1 2
}
```


### Nov 7 2021
Today I almost finished the `History` part, especially the delete function and the flashback function (I call it a flashback). I found that when I iterated the list item, the `key` prop cannot be read. I also fixed the exponential expression issue in the result. Until today, the fundamental functions of the calculator are done.
Goals tomorrow: 
1. setup the maximum of history list and auto-delete the earliest item if the stack is exceeded.
2. fix any other issue found and save a copy file as a demo
3. start to design the UI part (the most exciting thing)