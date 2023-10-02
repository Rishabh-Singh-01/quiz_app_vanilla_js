This mini projects follow the creation of a quiz app (it contains trivial questions tho).

It is created using technologies like HTML, CSS and vanilla JS (no library or npm).

Its main features are:

- MCQ's which are randomly choosen and dynamically hydrated using js
- Minimitistic yet applealing UI with (imo >\_<)
- Score card displaying real time validation of the questions submitted
- Timer that limits time and perform automatic submission when over
- Restart Button that allows retake of quiz
- Toast/popup message display correctness of submitted ans.

Further improvements:-
There are many things that could be improved here.
Some of them are listed here as I will be trying to fix them in the future (atleast i hope so).

Technical/Dev issues:

- Code Architecture: Since I started with OOP design, there are things that could be improved in terms of architecture
  - Explanation: The code is becoming more and more tightly coupled ie components are very corelated to each other and single reponsibility principle is not being followed much.
  - Possible Fixes: By using some sort of design pattern etc.
- Refactor: Need refactor due to above reason.
- No type safety: Since pure JS is being used no type safety is enforced making things like Questions strictly dependent on user inputs with on warnings what so ever.

Functionality issues:

- Responsive Design: Not responsive as of now
- Multiple clicks of btns simultaneously leads to fast timer: Since async setInterval is used for timers, very fast/simultaneous clicking of btns (submit or restart) leads to timer being fast.
  - Explanantion: This happens due to the fact that on click event, timer get restarted which first clearout previous setInterval then create new setInterval making it workable in normal conditions but when we click super fast (like couple of clicks in 1s), this leads to invocation of another setInterval which wasn't registered for clear out. The reason is simple, when we first click it takes sometime to clearout the interval and register the new interval, in that meantime if we click again the previous clicked method which was invoked during the first click, the previous setInterval won't be getting cleared as it is still not registered (think like previous click spawned a new method call which is taking sometime and will register the interval then but another method call is spawned (new click)), this means due to clearInterval taking its time js is not able to clear both the interval, meaning the interval which is gettting cleared is the one previous to the first click.
  - Possible Fixes: Could be solved by using some workaround like making clearInterval somehow async etc. This i suspect this probably is also happening for animation transition and toast popup as well.
- UI changes: Need to do some minor ui changes to make it much better.

** HOW TO RUN **

There are different methods to properly run this. I would be using vscode live server to run it since its the easiest way.
1 First download/clone the code using zip or git clone.
1 Open vs code for the downloaded code with index.html in root folder.
1 Install _Live Server_ extension by _Ritwick Dey_.
1 It should work out of the box for this project but if its not working please configure it as per official instruction.
1 Go to the bottom right corner and click on _Go Live_ button to start live serving.
1 The webpage will be displayed in the browser.
