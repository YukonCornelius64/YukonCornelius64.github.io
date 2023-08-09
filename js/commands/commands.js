 // Event listener for DOMContentLoaded
window.addEventListener('DOMContentLoaded', async () => {
  const username = 'miacroft_'; // Change this to the actual username
  const commands = await fetchCommands(username);
  populateTable(commands, username);
});

async function fetchCommands(username) {
  return fetch(`/getCommands?username=${username}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// Function to populate the table with commands data
function populateTable(commands, username) {
  commands.sort((a, b) => a.command.localeCompare(b.command));

  // Sort the commands alphabetically based on command names
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  commands.forEach((command) => {
    const row = createTableRow(command);
    tableBody.appendChild(row);
  });
}

function createTableRow(command) {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${command.command}</td>
    <td>${command.description}</td>
    <td>${populateAccessLevelCell(command.access_level)}</td>
  `;

  return row;
}

// Function to populate the access level cell
function populateAccessLevelCell(level) {
  if (level === 1) {
    return 'Everyone';
  } else if (level === 2) {
    return 'Subscriber';
  } else if (level === 3) {
    return 'VIP';
  } else if (level === 4) {
    return 'Moderator';
  } else {
    return 'Unknown';
  }
}
