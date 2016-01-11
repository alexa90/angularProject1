
var myApp = angular.module( 'firetube', ['firebase'] );

myApp.constant("FIREBASE_URL", "https://angular-projectapp.firebaseio.com/" )


function mainController( $scope, $firebase, FIREBASE_URL ) {

	// Get Stored TODOs
	var todosRef = new Firebase( FIREBASE_URL + "todo/" );
	$scope.todos = $firebase( todosRef );

	// Function to add new todo
	$scope.addTodo = function() {

		// Create a unique ID
		var timestamp = new Date().valueOf();

		var addTodoRef = new Firebase( FIREBASE_URL + "todo/"  + timestamp );

		var newTodo = ( { 
			deadline:  	$scope.todoDeadline,
			done: 		false,
			estimate: 	$scope.todoTime,
			id: 		timestamp,
			name: 		$scope.todoMember.fname,
			text: 		$scope.todoText,
			timestamp: 	new Date( $scope.todoDeadline ).getTime() / 1000
		} );

		$firebase(addTodoRef).$set( newTodo );

		// Clear input fields after submitting the todo
		$scope.todoDeadline = "";
		$scope.todoText 	= "";
		$scope.todoTime 	= "";
		$scope.todoMember 	= "";
	};




	// Function to update todo
	$scope.updateTodo = function( todo ) {

		var updateTodoData = new Firebase( FIREBASE_URL + "todo/" + todo.id );

		$firebase( updateTodoData ).$set( {
			deadline:  	todo.deadline,
			done: 		todo.done,
			estimate: 	todo.estimate,
			id: 		todo.id,
			name: 		todo.name,
			text: 		todo.text,
			timestamp: 	todo.timestamp
		});

	};	

	// Remove a Todo
	$scope.removeTodo	= function ( todo ) {

		// Avoid wrong removing
		if (todo.id == undefined)return;

		// Firebase: Remove todo from the list
		$scope.todos.$remove(todo.id);

	}


	var messagesData = new Firebase( FIREBASE_URL + "message/" );
	// TODO: Change the database and get a directory for messages
	$scope.messages = $firebase(messagesData);


	$scope.addMessage = function() {

		// Create a unique ID
		var timestamp = new Date().valueOf();

		var addMessageRef = new Firebase( FIREBASE_URL + "message/"  + timestamp );

		var today 	= new Date();
		var yyyy 	= today.getFullYear();
		var mm 		= today.getMonth() +1;
		var dd 		= today.getDate();
		var hh 		= today.getHours();
		var min 	= today.getMinutes();
		var sec 	= today.getSeconds();
		

		// Add 0 before the numbers if they are less than 9. example 09

		// Month
		if( mm < 10 ) {
			mm = "0" + mm;
		}

		// Day
		if( dd < 10 ) {
			dd = "0" + dd;
		}	

		// Hours
		if( hh < 10 ) {
			hh = "0" + hh;
		}

		// Minutes
		if( min < 10 ) {
			min = "0" + min;
		}

		// Seconds
		if( sec < 10 ) {
			sec = "0" + sec;
		}			

		var datePosted =  yyyy + "-" + mm + "-" + dd + "  " + hh + ":" + min + ":" + sec;

		// Check if input fields aren't empty
		if ($scope.newMessage != "" && $scope.member != "") {

			// Add message to database
			$firebase(addMessageRef).$set({
				id: 	timestamp,
				body: 	$scope.newMessage,
				date: 	datePosted,
				from: 	$scope.MemberDiscussion.fname	
			});

			// Clear the input fields after submitting the message
			$scope.newMessage 	= "";
			$scope.MemberDiscussion = "";
			
		}
	};

	// Remove a Message
	$scope.removeMessage = function ( message ) {

		// Avoid wrong removing
		if (message.id == undefined)return;

		// Firebase: Remove message from the list
		$scope.messages.$remove(message.id);

	}




	// Get Stored Members
	var membersRef = new Firebase( FIREBASE_URL + "member/" );

	$scope.members = $firebase( membersRef );

	// Function to add new member
	$scope.addMember = function() {

		// Create a unique ID
		var timestamp = new Date().valueOf()

		var addMemberRef = new Firebase( FIREBASE_URL + "member/"  + timestamp )

		var newMember = ( { 
			id: 		timestamp,
			fname:  	$scope.fname,
			lname: 		$scope.lname,
			username:	$scope.username,
			password: 	$scope.password
		} );

		$scope.fname	= "";
		$scope.lname	= "";
		$scope.username	= "";
		$scope.password	= "";

		$firebase(addMemberRef).$set( newMember );
	};

	// Remove a Todo
	$scope.removeMember	= function ( member ) {

		// Avoid wrong removing
		if (member.id == undefined)return;

		// Firebase: Remove member from the list
		$scope.members.$remove(member.id);

	}
}	



