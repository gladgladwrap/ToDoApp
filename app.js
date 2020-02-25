// This to do list was built following a tutorial by Watch and Code
// Model Object: toDoList
// View Object: view
// Controller Object: handlers

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
		
		this.todos[position].completed = !this.todos[position].completed;
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

		if (totalToDos === completedToDos) {
					this.toDos.forEach(function(todo) {
						todo.completed = false;
					})
		} else {
			this.toDos.forEach(function(todo) {
				todo.completed = true;
			}) 
		}
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
	changeToDo: function(editPosition) {
		var changeText = document.getElementById('changeToDoInput');
        toDoList.changeToDo(editPosition, changeText.value);
		changeText.value = '';
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
			for (var i = 0; i < toDoList.toDos.length; i++) {
					
				// Component: toDo table data column 1 to hold the toDo text
				var toDoTd = document.createElement('td');
				toDoTd.innerHTML = toDoList.toDos[i].toDoText;

				// Component: table data column 3 to hold todo 'completed' status
				var completeTd = document.createElement('td');
				
				if (toDoList.toDos[i].completed)
					completeTd.innerHTML = 'Complete';
				else
					completeTd.innerHTML = 'Incomplete';
				
				// component: table data column 3 for delete button 
				var buttonsTd = document.createElement('td'); 

				// Set the id of the element
				buttonsTd.id = i;

				// Insert the delete, edit, and toggle buttons into 3rd td column
				buttonsTd.appendChild(this.createDeleteButton());
				buttonsTd.appendChild(this.createEditButton());
				buttonsTd.appendChild(this.createToggleCompleteButton());

				// Create new variable to hold a new table row
				var newRow = document.createElement('tr');
				// Append a new row at the end of the table
				toDoTable.appendChild(newRow);

				// Insert the 3 td columns into their table row
				newRow.appendChild(toDoTd);
				newRow.appendChild(completeTd);
				newRow.appendChild(buttonsTd);
			}
		}	
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

	createToggleCompleteButton: function() {
		var toggleCompleteButton = document.createElement('button');
		toggleCompleteButton.textContent = 'Toggle Complete';
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
		    	handlers.changeToDo(event.target.parentNode.id);
		    } else if (elementClicked.className === 'toggleCompleteButton') {
		    	toDoList.toggleCompleted(event.target.parentNode.id);
		    }

		});
	}
};

view.setUpEventListeners();
