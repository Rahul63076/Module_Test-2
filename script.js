// JavaScript code for the web page
const students = [
    { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
    { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
    { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree: 'Arts', email: 'charlie@example.com' }
  ];
  
  const studentTableBody = document.getElementById('studentTableBody');
  const studentForm = document.getElementById('studentForm');
  const nameInput = document.getElementById('nameInput');
  const ageInput = document.getElementById('ageInput');
  const gradeInput = document.getElementById('gradeInput');
  const degreeInput = document.getElementById('degreeInput');
  const emailInput = document.getElementById('emailInput');
  const submitButton = document.getElementById('submitButton');
  const cancelButton = document.getElementById('cancelButton');
  const searchInput = document.getElementById('searchInput');
  
  let editMode = false;
  let editStudentId = null;
  
  // Function to render the table rows with student data
  function renderStudentTable() {
    studentTableBody.innerHTML = '';
  
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
  
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <button class="editButton" data-id="${student.ID}">Edit</button>
          <button class="deleteButton" data-id="${student.ID}">Delete</button>
        </td>
      `;
  
      studentTableBody.appendChild(row);
    }
  }
  
  // Function to clear the form inputs
  function clearFormInputs() {
    nameInput.value = '';
    ageInput.value = '';
    gradeInput.value = '';
    degreeInput.value = '';
    emailInput.value = '';
  }
  
  // Function to add a new student
  function addStudent(event) {
    event.preventDefault();
  
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value);
    const grade = gradeInput.value.trim();
    const degree = degreeInput.value.trim();
    const email = emailInput.value.trim();
  
    if (editMode) {
      // Edit mode: Update existing student
      const student = students.find(s => s.ID === editStudentId);
      if (student) {
        student.name = name;
        student.age = age;
        student.grade = grade;
        student.degree = degree;
        student.email = email;
      }
  
      editMode = false;
      editStudentId = null;
      submitButton.textContent = 'Add Student';
    } else {
      // Add mode: Add new student
      const newStudent = {
        ID: students.length + 1,
        name,
        age,
        grade,
        degree,
        email
      };
      students.push(newStudent);
    }
  
    renderStudentTable();
    clearFormInputs();
  }
  
  // Function to edit a student
  function editStudent(event) {
    const button = event.target;
    const studentId = parseInt(button.getAttribute('data-id'));
  
    const student = students.find(s => s.ID === studentId);
    if (student) {
      editMode = true;
      editStudentId = student.ID;
  
      nameInput.value = student.name;
      ageInput.value = student.age;
      gradeInput.value = student.grade;
      degreeInput.value = student.degree;
      emailInput.value = student.email;
  
      submitButton.textContent = 'Update Student';
    }
  }
  
  // Function to delete a student
  function deleteStudent(event) {
    const button = event.target;
    const studentId = parseInt(button.getAttribute('data-id'));
  
    const studentIndex = students.findIndex(s => s.ID === studentId);
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1);
    }
  
    renderStudentTable();
  }
  
  // Function to handle form cancel button click
  function cancelForm() {
    editMode = false;
    editStudentId = null;
    submitButton.textContent = 'Add Student';
    clearFormInputs();
  }
  
  // Function to handle search input change
  function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
  
    for (let i = 0; i < studentTableBody.rows.length; i++) {
      const row = studentTableBody.rows[i];
      const name = row.cells[1].textContent.toLowerCase();
      const email = row.cells[5].textContent.toLowerCase();
      const degree = row.cells[4].textContent.toLowerCase();
  
      if (
        name.includes(searchTerm) ||
        email.includes(searchTerm) ||
        degree.includes(searchTerm)
      ) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }
  }
  
  // Add event listeners
  studentForm.addEventListener('submit', addStudent);
  studentTableBody.addEventListener('click', function(event) {
    if (event.target.classList.contains('editButton')) {
      editStudent(event);
    } else if (event.target.classList.contains('deleteButton')) {
      deleteStudent(event);
    }
  });
  cancelButton.addEventListener('click', cancelForm);
  searchInput.addEventListener('input', handleSearch);
  
  // Render the initial student table
  renderStudentTable();
  