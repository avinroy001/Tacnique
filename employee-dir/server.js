const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, "data", "employees.json");

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serve static HTML/JS/CSS

// GET: Fetch all employees
app.get("/api/employees", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Failed to read data." });
    }
    res.json(JSON.parse(data));
  });
});

// POST: Add new employee
app.post("/api/employees", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read data." });

    let employees = JSON.parse(data);
    const newEmployee = { id: Date.now().toString(), ...req.body };
    employees.push(newEmployee);

    fs.writeFile(DATA_FILE, JSON.stringify(employees, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to save employee." });
      res.status(201).json(newEmployee);
    });
  });
});

// Fallback: Serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.delete("/api/employees/:id", (req, res) => {
  const idToDelete = req.params.id;

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Read failed" });

    let employees = JSON.parse(data);
    const updatedEmployees = employees.filter(emp => emp.id !== idToDelete);

    fs.writeFile(DATA_FILE, JSON.stringify(updatedEmployees, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Write failed" });
      res.status(200).json({ message: "Deleted successfully" });
    });
  });
});

app.put("/api/employees/:id", (req, res) => {
  const empId = req.params.id;
  const updatedData = req.body;

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Read failed" });

    let employees = JSON.parse(data);
    const index = employees.findIndex(emp => emp.id === empId);

    if (index === -1) return res.status(404).json({ error: "Not found" });

    employees[index] = { ...employees[index], ...updatedData };

    fs.writeFile(DATA_FILE, JSON.stringify(employees, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Write failed" });
      res.status(200).json(employees[index]);
    });
  });
});



// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
