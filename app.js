const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Student storage (temporary database)
let students = [];

// Function to simulate async database delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Home Route (Fix for Cannot GET /)
app.get("/", (req, res) => {
  res.send("Student Management API Running Successfully");
});

// Add Student
app.post("/students", async (req, res) => {

  await delay(1000);

  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res.status(400).json({
      message: "Name, age and course are required"
    });
  }

  const newStudent = {
    id: students.length + 1,
    name: name,
    age: age,
    course: course
  };

  students.push(newStudent);

  res.json({
    message: "Student added successfully",
    student: newStudent
  });
});

// Get All Students
app.get("/students", async (req, res) => {

  await delay(1000);

  res.json({
    totalStudents: students.length,
    students: students
  });

});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});