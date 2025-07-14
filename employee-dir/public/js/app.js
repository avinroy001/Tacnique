// js/app.js — Node.js backend integration (no FreeMarker)

let employees = [];
let filteredEmployees = [];
let showCount = 10;

async function loadEmployees() {
  try {
    const response = await fetch('/api/employees');
    if (!response.ok) throw new Error("Failed to fetch employee data");
    employees = await response.json();
    filteredEmployees = [...employees];
    renderEmployees(filteredEmployees);
  } catch (error) {
    console.error("Error loading employee data:", error);
    document.getElementById('employee-list').innerHTML = `<p style="color:red;">Error loading data.</p>`;
  }
}

function renderEmployees(data) {
  const container = document.getElementById("employee-list");
  container.innerHTML = "";
  const start = 0;
  const end = showCount;
  const paginated = data.slice(start, end);

  if (paginated.length === 0) {
    container.innerHTML = `<p>No employees found.</p>`;
    return;
  }

  paginated.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <strong>${emp.firstName} ${emp.lastName}</strong><br>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee('${emp.id}')">Edit</button>
      <button onclick="deleteEmployee('${emp.id}')">Delete</button>
    `;
    container.appendChild(card);
  });
}

function filterEmployees() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const name = document.getElementById("filterName").value.toLowerCase();
  const dept = document.getElementById("filterDept").value.toLowerCase();
  const role = document.getElementById("filterRole").value.toLowerCase();

  filteredEmployees = employees.filter(emp =>
    (emp.firstName.toLowerCase().includes(term) || emp.email.toLowerCase().includes(term)) &&
    emp.firstName.toLowerCase().includes(name) &&
    (dept === '' || emp.department.toLowerCase() === dept) &&
    (role === '' || emp.role.toLowerCase() === role)
  );

  renderEmployees(filteredEmployees);
}

function sortEmployees() {
  const value = document.getElementById("sortSelect").value;
  if (value) {
    filteredEmployees.sort((a, b) => a[value].localeCompare(b[value]));
    renderEmployees(filteredEmployees);
  }
}

function paginateEmployees() {
  showCount = parseInt(document.getElementById("pageSize").value);
  renderEmployees(filteredEmployees);
}

function resetFilters() {
  document.getElementById("searchInput").value = '';
  document.getElementById("filterName").value = '';
  document.getElementById("filterDept").value = '';
  document.getElementById("filterRole").value = '';
  filteredEmployees = [...employees];
  renderEmployees(filteredEmployees);
}

function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    fetch(`/api/employees/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        loadEmployees(); // Reload list after deletion
      })
      .catch((err) => {
        alert("Failed to delete employee.");
        console.error(err);
      });
  }
}


function openAddEditForm() {
  window.location.href = "addedit.html";
}

function editEmployee(id) {
  window.location.href = `addedit.html?id=${id}`;
}

window.onload = () => {
  loadEmployees();
};

// Save employee handler (used in addedit.html)
function saveEmployee(emp) {
  const isEdit = new URLSearchParams(window.location.search).get("id") !== null;

  const url = isEdit ? `/api/employees/${emp.id}` : "/api/employees";
  const method = isEdit ? "PUT" : "POST";

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emp),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to save employee");
      window.location.href = "index.html";
    })
    .catch((err) => {
      alert("❌ Failed to save employee.");
      console.error(err);
    });
}

