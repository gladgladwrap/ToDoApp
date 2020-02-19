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
			
		// create variable to reference our list
		var toDoUl =  document.querySelector('ul');

		// clear the previous items from the list
		toDoUl.innerHTML='';
			
		if (toDoList.toDos.length === 0) 
			toDoUl.innerHTML='Your to-do list is empty.';
		else {
			// add each element of toDos to its own list item	
			for (var i = 0; i < toDoList.toDos.length; i++) {
					
				// toDoLi will contain the toDo text
				var toDoLi = document.createElement('li');

				// completeLi will hold the completion status of the task
				var completeLi = document.createElement('li');

				toDoLi.innerHTML = toDoList.toDos[i].toDoText;
				completeLi.innerHTML = toDoList.toDos[i].completed;
				toDoUl.appendChild(toDoLi);
				toDoUl.appendChild(completeLi);
			}
		}	
	}
};
