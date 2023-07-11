// ------------------select Elements
let $ = document;
const input = $.querySelector('.input-field');
const btnSave = $.querySelector('.btn-save');
const btnDelete = $.querySelector('.btn-delete');
const colorsBox = $.querySelectorAll('.color-box');
const notesWrapper = $.querySelector('#note-wrapper');

// --------------------- Change Color of Note
colorsBox.forEach( (colorBox)=> {
    colorBox.addEventListener('click',(event)=> {
        let mainColor = event.target.style.backgroundColor;
        input.style.backgroundColor = mainColor;
        input.focus()
    })
});

// --------------------- Functions
// ----create data
let noteArray=[];
function addNewNote(inputBg){
    let newNoteObj={
        id:noteArray.length+1,
        title:input.value,
        color:inputBg
    };
    input.value = '';
    noteArray.push(newNoteObj);
    setLocalStorage(noteArray);
    generateNewNote(noteArray);
    input.focus();
}

// ----set item in local storage
function setLocalStorage(noteArray){
    localStorage.setItem('note',JSON.stringify(noteArray))
}

// ----insert note in DOM
function generateNewNote(noteArray) {
    notesWrapper.innerHTML=''
    noteArray.forEach(noteobj=>{
        notesWrapper.insertAdjacentHTML('afterbegin',`
        <div class=" col-4 note" style="background-color:${noteobj.color} ;">
            <p onclick="removeNote(${noteobj.id})" class="note-txt">${noteobj.title}</p>
        </div>`)
    })
    input.style.backgroundColor = '#F0F2B6';
};

// ----remove note
function removeNote(noteId){
    let localStorageData=JSON.parse(localStorage.getItem('note'));
    noteArray=localStorageData
    let mainnoteArrayIndex= noteArray.findIndex((data)=>{
        return data.id == noteId; 
    });
    noteArray.splice(mainnoteArrayIndex,1);
    setLocalStorage(noteArray);
    generateNewNote(noteArray);
}

// ----get items from local after load window
function getLocalStorage(){
    let localStorageNote=JSON.parse(localStorage.getItem('note'));
    noteArray=localStorageNote ? localStorageNote : []
    // if (localStorageNote){
    //     noteArray=localStorageNote;
    // }else{
    //     noteArray=[];
    // };
    generateNewNote(noteArray);
}

// ---------------------- press "Enter" to ADD a new Note
input.addEventListener('keydown', (event)=> {
    if (event.keyCode === 13) {
        if (input.value !="" ) {
            let inputBg = input.style.backgroundColor;
            addNewNote(inputBg)
        }
    }
});

// // ------------------- Add New Note with saveBtn
btnSave.addEventListener('click',()=>{
    if(!input.value){
        return false;
    }
    let inputBg = input.style.backgroundColor;
    addNewNote(inputBg)
} );

// --------------------- delete text in Input
btnDelete.addEventListener('click', ()=> {
    input.value = '';
    input.style.backgroundColor = '#F0F2B6';
});

// --------------------- items dont delete after load window
window.addEventListener('load',getLocalStorage)