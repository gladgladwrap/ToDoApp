// This to do list was inspired by a tutorial from Watch and Code
// Model Object: toDoList
// View Object: view
// Controller Object: handlers

// For any future work: when multiple edit inputs are opened in order to 
// change many tasks at the same time, it will not work. That is because every time changeToDos()
// from the toDoList object is run, it also runs displayToDos(). At the time of running displayToDos, 
// our toDos array of objects has already already had one of its object's toDoText property updated

//Solution: reverse the changes in the other input when another edit input is opened
// If a submit button class is present, then that could be updated or reversed

// Other things to build: provide a warning next to the input if someone adds an empty task
// Same goes for changing a task to an empty string

var toDoList = {

	// create an array to hold all of our toDo tasks
	toDos: [],

	// function addToDo() appends a toDo list item to the toDo list
	addToDo: function(todoText) {
		
		// add the new task to our toDos array
		this.toDos.push({
			toDoText: todoText,
			completed: false
		});	

		// display the list
		view.displayToDos();
	},

	// function deleteToDo() deletes a toDo element from the toDos array
	deleteToDo: function(position) {
	
		// delete the given position from the toDos array
		this.toDos.splice(position, 1);

		// display the list
		view.displayToDos();
	},

	changeToDo: function(position, todoText) {
	
		this.toDos[position].toDoText = todoText;
		view.displayToDos();
	},

	toggleCompleted: function(position) {
		this.toDos[position].completed = !this.toDos[position].completed;
		view.displayToDos();
	},

	toggleAll: function() {
		var totalToDos = this.toDos.length;
		var completedToDos = 0;
		
		// Get total number of completed toDos
		this.toDos.forEach(function(todo) {
			if (todo.completed === true) 
				completedToDos++;
		})

		this.toDos.forEach(function(todo) {
			if (totalToDos === completedToDos)
				todo.completed = false;
			else
				todo.completed = true;
		})
		 
		view.displayToDos();
	}
};




var handlers = {
	displayToDos: function() {
		view.displayToDos();
	},
	toggleAll: function() {
		toDoList.toggleAll();
	},
	addToDo: function() {
		var toDoTextInput = document.getElementById('toDoInput');
		toDoList.addToDo(toDoTextInput.value);
		toDoTextInput.value = '';
	},
	deleteToDo: function(deletePosition) {	
		toDoList.deleteToDo(deletePosition);
	},

	// Once edit button is clicked, then run handlers.changeToDo
	promptChangeToDo: function(editPosition) {
		
		// save the text that was inside of our toDos.toDoText
		var savedText = toDoList.toDos[editPosition].toDoText;
		
		//Display an edit input inside the td with the todo text
		view.displayEditInput(editPosition, savedText);
	},
	changeToDo: function(editPosition){
		// In the case there is more than one edit input open, there
		// will be 2 or more elements with the id of changeToDoInput.
		// We can use the relation of the input in the td to the id of the submit button
		var changeInputElement = document.getElementById(editPosition).previousSibling.previousSibling.firstChild;

        toDoList.changeToDo(editPosition, changeInputElement.value);
	}
};

var goalsHandler = {
	addGoal: function() {
		var goal = document.getElementById('goalInput').value;
		var replaceContent = document.getElementById('goal');
		replaceContent.innerHTML = '<h3>Goal: ' + goal +'</h3>';
	},
	addCommitment: function() {
		var commitment = document.getElementById('commitmentInput').value;
		var replaceContent = document.getElementById('commitment');
		replaceContent.innerHTML = '<h3>Commitment: ' + commitment +'</h3>';
	},
	addGratitude: function() {
		var gratitude = document.getElementById('gratitudeInput').value;
		var replaceContent = document.getElementById('gratitude');
		replaceContent.innerHTML = '<h3>Gratitude: ' + gratitude +'</h3>';
	}
};



var view = {
	// function displayToDos will display all of our to do tasks from our array
	displayToDos: function() {
		
		// Create variable to reference our table
		var toDoTable = document.getElementById('toDoTable');

		// Clear the previous items from the list
		toDoTable.innerHTML='';
			
		if (toDoList.toDos.length === 0) {
					toDoTable.innerHTML = 'You have no more tasks to do.';
		} else {
			
			// Create table rows
			var tableRow = document.createElement('tr');

			// Insert table rows into table
			toDoTable.appendChild(tableRow);

			// Create table headers
			var th1 = document.createElement('th');
			var th2 = document.createElement('th');
			var th3 = document.createElement('th');

			th1.innerHTML = "Task:";
			th2.innerHTML = "Status:";
			th3.innerHTML = "";

			// Append table headers to table row
			tableRow.appendChild(th1);
			tableRow.appendChild(th2);
			tableRow.appendChild(th3);

			// Add each element of the toDoList object to its own table data element and append that to its own row	

			// Note: when forEach runs our callback function, it passes in an additional argument equivalent to i
			toDoList.toDos.forEach(function(todo, position) {

				// Component: toDo table data column 1 to hold the toDo text
				var toDoTd = document.createElement('td');
				toDoTd.innerHTML = todo.toDoText;

				// Component: table data column 3 to hold todo 'completed' status
				var completeTd = document.createElement('td');
				
				if (todo.completed)
					completeTd.innerHTML = 'Complete';
				else
					completeTd.innerHTML = 'Incomplete';
				
				// component: table data column 3 for delete button 
				var buttonsTd = document.createElement('td'); 

				// Set the id of the element
				buttonsTd.id = position;

				// Insert the delete, edit, and toggle buttons into 3rd td column
				buttonsTd.appendChild(this.createDeleteButton());
				buttonsTd.appendChild(this.createEditButton());
				buttonsTd.appendChild(this.createToggleCompleteButton(position));

				// Create new variable to hold a new table row
				var newRow = document.createElement('tr');
				// Append a new row at the end of the table
				toDoTable.appendChild(newRow);

				// Insert the 3 td columns into their table row
				newRow.appendChild(toDoTd);
				newRow.appendChild(completeTd);
				newRow.appendChild(buttonsTd);
			}, this)    // Add a second argument into our foreach, otherwise this will refer to our callback function
		}
	},

	displayEditInput: function(position, savedText) {

		// Create an input for editing the contents of our todo text
		var editInput = document.createElement('input');

		// Add an id and type = 'text' to the input
		editInput.id = 'changeToDoInput';
		editInput.type = 'text';

		// insert the original text inside of #changeToDoInput
		editInput.value = savedText;

		// Insert the input element into the first td in the row identified by position value
		var firstTd = document.getElementById(position).previousSibling.previousSibling;

		//clear the text data
		firstTd.innerHTML = '';
		firstTd.appendChild(editInput);
		
		// Change the Edit button to a Confirm Changes Button
		// 1. get the editButton. Problem is that it's a class, but thankfully we can enter
		// the td by its id and then grab the editButton inside.
		var editButton = document.getElementById(position).getElementsByClassName('editButton').item(0);
		
		// Change the button's text to a Submit button
		editButton.innerText = 'Submit';
		// Change the edit button's class to a submit button
		editButton.className = 'submitButton';
	},	
	
	createDeleteButton: function() {

		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	},

	createEditButton: function() {
		var editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.className = 'editButton';
		return editButton;
	},

	createToggleCompleteButton: function(position) {
		var toggleCompleteButton = document.createElement('button');
		if (toDoList.toDos[position].completed === true)
			toggleCompleteButton.textContent = 'Incomplete';
		else
			toggleCompleteButton.textContent = 'Complete';
		toggleCompleteButton.className = 'toggleCompleteButton';
		return toggleCompleteButton;
	},

	setUpEventListeners: function() {

		var toDoTable = document.querySelector('table');

		toDoTable.addEventListener('click', function(event) {
		    // retrieve the element that was clicked on
			var elementClicked = event.target;

			if (elementClicked.className === 'deleteButton') {
			    handlers.deleteToDo(event.target.parentNode.id);
		    } else if (elementClicked.className === 'editButton') {
		    	handlers.promptChangeToDo(event.target.parentNode.id);
		    } else if (elementClicked.className === 'toggleCompleteButton') {
		    	toDoList.toggleCompleted(event.target.parentNode.id);
		    } else if (elementClicked.className === 'submitButton') {
		    	handlers.changeToDo(event.target.parentNode.id);
		    }

		});
	},
	addToDoEventListener: function() {
		var input = document.getElementById("toDoInput");
		input.addEventListener("keyup", function(event) {
		  // Number 13 is the "Enter" key on the keyboard
		  if (event.keyCode === 13) {
		    handlers.addToDo();
		  }
		});
	}
};

view.setUpEventListeners();

view.addToDoEventListener();




