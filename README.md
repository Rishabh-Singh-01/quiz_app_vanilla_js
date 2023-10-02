This mini projects follow the creation of a quiz app (it contains trivial questions tho).

It is created using technologies like HTML, CSS and vanilla JS (no library or npm).

Its main features are: - MCQ's which are randomly choosen and dynamically hydrated using js - Minimitistic yet applealing UI with (imo >\_<) - Score card displaying real time validation of the questions submitted - Timer that limits time and perform automatic submission when over - Restart Button that allows retake of quiz

Further improvements:-
There are many things that could be improved here.
Some of them are listed here as I will be trying to fix them in the future (atleast i hope so).

Technical/Dev issues: - Code Architecture & refactor betterment: Since I started with OOP design, there are things that could be improved in terms of architecture by using some sort of design pattern etc. - No type safety: Since pure JS is being used no type safety is enforced making things like Questions strictly dependent on user inputs with on warnings what so ever.

Functionality issues: - Responsive Design: Not responsive as of now - Multiple clicks of btns simultaneously leads to fast timer: Since async setInterval is used for timers, very fast/simultaneous clicking of btns (submit or restart) leads to timer being fast.
Explanantion: This happens due to the fact that on click event, timer get restarted which first clearout previous setInterval then create new setInterva making it workable in normal conditions but when we click super fast (like couple of clicks in 1s) this leads to invocation of another setInterval which wasnt registered for clear out. The reason is simple, when we first click it takes sometime to clearout the interval and register the new interval, in that meantime if we click again the previous clicked method which was invoked during the first click wont be getting cleared as it is still not registered (think like previous click spawned a new method call which is taking sometime and will registed the interval then but another method call is spawned (new click)), this means due to clearInterval taking its time we both time are clearing the interval which was set even before both the clicks. Could be solved by using some workaround like making clearInterval somehow async etc. This i suspect is also happening for animation transition as well.
