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


