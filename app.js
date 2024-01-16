// Selecting needed elements from the DOM
const addBox = document.querySelector('.add-box');
const titleTag = document.getElementById('title');
const descriptionTag = document.getElementById('description');
const modalContainer = document.querySelector('.modal-container');
const modal = modalContainer.querySelector('.modal');
const addNoteBtn = document.querySelector('.add-btn button');
const closeIcon = document.getElementById('close-icon');
const notesContainer = document.querySelector('ntoes-container');
const modalCloseIcon = document.getElementById('close-modal');
const elipsisMenu = document.querySelector('.elipsis');
const modalHeader = modal.querySelector('div h1');
const months = ['Janaury', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'];
const notes  = JSON.parse(localStorage.getItem('notes') || '[]');
let isEditMode = false, updateId;

function showNotes() {
    document.querySelectorAll('.notes').forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<div class="notes">
                    <div class="notes-content">
                        <h1 class="title">${note.title}</h1>
                        <p class="description">${note.description}</p>
                    </div>
                    <div class="details">
                        <p class="date">${note.date}</p>
                        <div class="menu-container">
                            <small onclick="showMenu1(this)" class="elipsis"><p onclick="showMenu(this)">...</p></small>
                            <div class="menu">
                                <p onclick="editNote(${index}, '${note.title}', '${note.description}')">edit</p>
                                <p onclick="deleteNote(${index})">delete</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            // Displaying the notes in the browser
            addBox.parentElement.insertAdjacentHTML('afterend', liTag);
        // console.log(note);
    });
};
showNotes();

function showMenu(element) {
    // Displaying the menu when the elipsis icon is clicked
    element.parentElement.parentElement.classList.add('show-menu');
    // remmoving display of the menu if the user clicks outside or another menu
    document.addEventListener('click', (e) => {
        if (e.target !== element) {
            element.parentElement.parentElement.classList.remove('show-menu');
        }
    });
}

function showMenu1(element) {
    // Displaying the menu when the elipsis icon is clicked
    element.parentElement.classList.add('show-menu');
    // remmoving display of the menu if the user clicks outside or another menu
    document.addEventListener('click', (e) => {
        if (e.target !== element) {
            element.parentElement.parentElement.classList.remove('show-menu');
        }
    });
}

function deleteNote(noteId) {
    // Deleting the the selected note
    const confirmation = confirm(`Are you sure you want to delete this note?`);
    // confirming the delete...
    if (confirmation) {
        notes.splice(noteId, 1);
        // Updating the local storage
        localStorage.setItem('notes', JSON.stringify(notes));
        showNotes();
    }
}

function editNote(noteId, title, description) {
    isEditMode = true;
    titleTag.focus();
    addBox.click();
    updateId = noteId;
    titleTag.value = title;
    descriptionTag.value = description;
    addNoteBtn.innerHTML = 'Update Note';
    console.log(noteId, title, description);
}

addBox.addEventListener('click', () => {
    titleTag.focus();
    modalHeader.innerHTML = 'Add a New Note';
    titleTag.value = '';
    descriptionTag.value = '';
    modalContainer.classList.add('show-modal');
});

modalCloseIcon.addEventListener('click', () => {
    modalContainer.classList.remove('show-modal');
});

addNoteBtn.addEventListener('click', () => {
    
    let noteTitle = titleTag.value,
    noteDesc = descriptionTag.value;

    titleTag.value = '';
    descriptionTag.value = '';

    if (noteTitle || noteDesc) {
        const dateObj = new Date();
        const month = months[dateObj.getMonth()];
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        }

        if (!isEditMode) {
            notes.push(noteInfo);
        } else {
            isEditMode = false;
            notes[updateId] = noteInfo;
        }

        localStorage.setItem('notes', JSON.stringify(notes));
        modalCloseIcon.click();
        showNotes();
    }

});

// modal.addEventListener('click', (e) => {
//     if (e.target.className === 'close-modal' || e.target === closeIcon) {
//         modalContainer.classList.remove('show-modal');
//     }
// });