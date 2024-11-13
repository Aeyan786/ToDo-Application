
const firebaseConfig = {
  apiKey: "AIzaSyDJLpSmHzeJk2yy_7XICRqzY6qleJ5RSGI",
  authDomain: "todoapplication-d45e0.firebaseapp.com",
  databaseURL: "https://todoapplication-d45e0-default-rtdb.firebaseio.com",
  projectId: "todoapplication-d45e0",
  storageBucket: "todoapplication-d45e0.firebasestorage.app",
  messagingSenderId: "759282909373",
  appId: "1:759282909373:web:14e5ef999698a15611f7d4"
};


const app = firebase.initializeApp(firebaseConfig);





var input = document.getElementById("todoInput");








firebase.database().ref('todo').on('child_added',function(data){
  

   

    var flag =true

    var liElement = document.createElement("li");

    var liText = document.createTextNode(data.val().value);

    liElement.appendChild(liText);

    ulElement.appendChild(liElement);

    // create delete button liElement

    var delBtnElement = document.createElement("button");

    var delBtnText = document.createTextNode("Delete");

    delBtnElement.appendChild(delBtnText);

    liElement.appendChild(delBtnElement);

    delBtnElement.setAttribute("id" , data.val().key)

    delBtnElement.setAttribute("onclick", "deleteSingleItem(this)");

    delBtnElement.setAttribute("class","delbtnlist")

    // create edit button liElement

    var editBtnELement = document.createElement("button");

    var editBtnText = document.createTextNode("Edit");

    editBtnELement.appendChild(editBtnText);

    editBtnELement.setAttribute("id" , data.val().key)

    editBtnELement.setAttribute("onclick", "editItem(this)");

    editBtnELement.setAttribute("class","editbtnlist")


    liElement.appendChild(editBtnELement);

  
  
})



var ulElement = document.getElementById("list");

function addTodo() {
  
  if(input.value){

  
  var key = firebase.database().ref('todo').push().key
  
  var todos = {
    key: key,
    value: input.value
  }
 firebase.database().ref('todo').child(key).set(todos)

 input.value = "";


}   else {
  alert("fill the field..");
}
}  


function deleteAllItems() {
 firebase.database().ref('todo').remove()
  ulElement.innerHTML = "";
}


function deleteSingleItem(e) {
 firebase.database().ref('todo').child(e.id).remove()
  e.parentNode.remove();
}

function editItem(e) {
  var updatedVal = prompt("Enter updated value..");

  var editTodo = {
    key : e.id,
    value : updatedVal
  }
  firebase.database().ref('todo').child(e.id).set(editTodo)
  e.parentNode.firstChild.nodeValue = updatedVal;
  

}

// Login and sign up



function signup(){

  var emailsignup = document.getElementById('emailsignup')
  var passsignup = document.getElementById('passsignup')
  console.log(emailsignup.value);
  console.log(passsignup.value)
  

  firebase.auth().createUserWithEmailAndPassword(emailsignup.value, passsignup.value)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user);
    window.location.href = './signup.html'

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });

}

function login(){
  var emaillogin = document.getElementById('emaillogin')
  var passlogin = document.getElementById('passlogin')

  firebase.auth().signInWithEmailAndPassword(emaillogin.value, passlogin.value)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
     console.log(user);
     window.location.href = './signup.html'
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);

  });
  

}