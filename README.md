# SPA-Todo-App
## Single Page Application Todo written in Vanilla JS without frameworks or libraries

---

Run the project using `npm run dev`.

---

This SPA Todo was made for a weekend test during my studies at &lt;/salt>

The requirements were to build a simple todo app using no frameworks or libraries (SASS was OK), as well as a few technical specifications to adhere to. These were:

* Keeping the todo-list in a state object, not in the DOM (I used an Array in my case)
* Implement a persisting localstorage that loads the last state on refresh.
* Certain interaction should mimic a real todo app, such as:
		
		Initial load presents an empty todo list
		
		There should be a form to add new todos, submitting a form should make an new item appear in the list

		Each todo should be toggleable between 'done' and 'not done' and should be visually separable.

		Cards toggled to 'done' should have a remove button added. When clicked, the item is removed from the view.

		Todos set to done should appear at the bottom of the list. (Solved using css style.order)

On top of these requirements, the app had to be built in a modular way (small functions with their own responsibility), had to mostly use modern Javascript (ES6+), and had to use semantic HTML. CSS was not a focus of this project.
		
With my implementation, I managed to pass the test with a green score and received very positive feedback.

