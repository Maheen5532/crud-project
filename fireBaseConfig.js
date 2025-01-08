
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { getDatabase, ref, set,get, remove } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// initialize firebase
const firebaseConfig = {
    apiKey: "AIzaSyAQu6ObzBE0YSGVRrRcKsDp9K39MiG17kM",
    authDomain: "crud-project-2a8eb.firebaseapp.com",
    databaseURL: "https://crud-project-2a8eb-default-rtdb.firebaseio.com",
    projectId: "crud-project-2a8eb",
    storageBucket: "crud-project-2a8eb.firebasestorage.app",
    messagingSenderId: "867031343023",
    appId: "1:867031343023:web:13a56416ed5d67d884995a"
};
//firebaseConfiguration
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); 

//work started from here

var rollv, namev, addressv;
//function
function readForm() {
    rollv = document.getElementById('rollno').value;
    namev = document.getElementById('name').value;
    addressv = document.getElementById('address').value;
}

//for create button click
document.getElementById('create').onclick = function() {
    readForm(); 

    if (!rollv || !namev || !addressv) {
        alert("Please fill in all fields!");
        return; 
    }
    const studentRef = ref(database, 'student/' + rollv); 
    set(studentRef, {
        rollno: rollv,
        name: namev,
        address: addressv
    })
    .then(() => {
        alert("Data Created successfully!");
        
        document.getElementById('rollno').value = '';
        document.getElementById('name').value = '';
        document.getElementById('address').value = '';
    })
    .catch((error) => {
        console.error("Error writing to Firebase: ", error);
        alert("Error: " + error.message);  
    });
};

//for update button

document.getElementById('update').onclick = function() {
    readForm(); 
    if (!rollv || !namev || !addressv) {
        alert("Please fill in all fields!");
        return; 
    }

    const studentRef = ref(database, 'student/' + rollv); 

    update(studentRef, {
        name: namev,        
        address: addressv   
    })
    .then(() => {
        alert("Data updated successfully!");

        document.getElementById('rollno').value = '';
        document.getElementById('name').value = '';
        document.getElementById('address').value = '';
    })
    .catch((error) => {
        console.error("Error updating data in Firebase: ", error);
        alert("Error: " + error.message);
    });
};


//to read data from Firebase
document.getElementById('read').onclick = function () {
    readForm(); 

    if (!rollv) {
        alert("Please provide the Roll No. to read!");
        return; 
    }

    const studentRef = ref(database, 'student/' + rollv);

    get(studentRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val(); 
                document.getElementById('rollno').value = data.rollno; 
                document.getElementById('name').value = data.name; 
                document.getElementById('address').value = data.address; 
                alert("Data retrieved successfully!");
            } else {
                alert("No data found for the given Roll No.");
            }
        })
        .catch((error) => {
            console.error("Error reading data from Firebase: ", error);
            alert("Error: " + error.message); 
        });
};


//to delete the data from Firebase

document.getElementById('delete').onclick = function() {
    readForm(); 
    if (!rollv) {
        alert("Please provide the Roll No. to delete!");
        return; 
    }
    const studentRef = ref(database, 'student/' + rollv);
    remove(studentRef)
    .then(() => {
        alert("Data deleted successfully!");
   
        document.getElementById('rollno').value = '';
        document.getElementById('name').value = '';
        document.getElementById('address').value = '';
    })
    .catch((error) => {
        console.error("Error deleting data from Firebase: ", error);
        alert("Error: " + error.message);  
    });
};


