<!DOCTYPE html>
<html>
<head>
  <title>Employee Dashboard</title>
</head>
<body>
  <h1>Employee Directory</h1>

  <#assign employees = [
    {"id": "1", "firstName": "John", "lastName": "Doe", "email": "john@example.com", "department": "IT", "role": "Developer"},
    {"id": "2", "firstName": "Jane", "lastName": "Smith", "email": "jane@example.com", "department": "HR", "role": "Manager"}
  ] />

  <#list employees as emp>
    <div class="employee-card">
      <p>${emp.firstName} ${emp.lastName}</p>
      <p>${emp.email}</p>
      <p>${emp.department}</p>
      <p>${emp.role}</p>
      <a href="addedit.html?id=${emp.id}">Edit</a>
      <button onclick="deleteEmployee('${emp.id}')">Delete</button>
    </div>
  </#list>
</body>
</html>