var toDoList = {
	// create array to hold all of our tasks
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
		this.toDos.splice(position - 1, 1);

		// display the list
		view.displayToDos();
	},
	changeToDo: function(position, todoText) {
	
		this.toDos[position - 1].toDoText = todoText;
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
		for (var i = 0; i < totalToDos; i++) {
			if (this.toDos[i].completed === true)
				completedToDos++;
		}

		if (totalToDos === completedToDos) {
			for (var i = 0; i < totalToDos; i++)
				this.toDos[i].completed = false;
		} else {
		for (var i = 0; i < totalToDos; i++)
			this.toDos[i].completed = true;
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
	deleteToDo: function() {		
		// Assign the position input to deletePositionInput		
		var deletePosition = document.getElementById('deletePositionInput');
		toDoList.deleteToDo(deletePosition.value);
		deletePosition.value = '';
	},
	changeToDo: function() {
		var changePosition = document.getElementById('changeToDoPosition');
		var changeText = document.getElementById('changeToDoInput');
                toDoList.changeToDo(changePosition.value, changeText.value);
		changePosition.value = '';
		changeText.value = '';
	}
};

var view = {
	// function displayToDos will display all of our to do tasks from our array
	displayToDos: function() {
		
		// Create variable to reference our table
		// var toDoUl =  document.querySelector('ul');
		var toDoTable = document.getElementById('toDoTable');

		// Clear the previous items from the list
		toDoTable.innerHTML='';
			
		if (toDoList.toDos.length === 0) {
					toDoTable.innerHTML='Your to-do list is empty.';
		} else {
			
			// Create table rows
			var tableRow = document.createElement('tr');

			// Insert table rows into table
			toDoTable.appendChild(tableRow);

			// Create table headers
			var th1 = document.createElement('th');
			var th2 = document.createElement('th');
			th1.innerHTML = "Task:";
			th2.innerHTML = "Status:";

			

			// Append table headers to table row
			tableRow.appendChild(th1);
			tableRow.appendChild(th2);

			// Add each element of the toDoList object to its own table data element and append that to its own row	
			for (var i = 0; i < toDoList.toDos.length; i++) {
					
				// Create toDo table data element to hold the toDo text
				var toDoTd = document.createElement('td');
				toDoTd.innerHTML = toDoList.toDos[i].toDoText;
				// Create table data element to hold completed status
				var completeTd = document.createElement('td');
				if (toDoList.toDos[i].completed)
					completeTd.innerHTML = 'Complete';
				else
					completeTd.innerHTML = 'Incomplete';

				// Create new variable to hold a new table row
				var newRow = document.createElement('tr');
				// Append a new row at the end of the table
				toDoTable.appendChild(newRow);

				// Insert the todo text and completion status into the table row
				newRow.appendChild(toDoTd);
				newRow.appendChild(completeTd);
			}
		}	
	}
};
