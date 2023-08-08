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

async function fetchDelete(username, command) {
  return fetch(`/deleteCommand?username=${username}&command=${command}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

async function fetchEnabled(username, command, enabled) {
  return fetch(
    `/updateEnabled?username=${username}&command=${command}&enabled=${enabled}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to update enabled status');
      }
    })
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

    addListeners(row, command, username);
  });
}

function addListeners(row, command, username) {
  const toggleSwitch = row.querySelector('.toggle input[type="checkbox"]');

  toggleSwitch.checked = command.enabled;
  toggleSwitch.addEventListener('change', async (event) => {
    const newEnabledState = event.target.checked;
    await fetchEnabled(username, command.command, newEnabledState);
  });

  const deleteIcon = row.querySelector('.delete-icon');

  // Add an event listener to the delete icon
  deleteIcon.addEventListener('click', async () => {
    const confirmed = confirm(
      `Are you sure you want to delete ${command.command}?`
    );
    if (confirmed) {
      await fetchDelete(username, command.command);
      row.remove();
    }
  });
}

function createTableRow(command) {
  const row = document.createElement('tr');

  const enabledCell = populateEnabledCell(command.enabled);
  row.appendChild(enabledCell);

  row.innerHTML += `
    <td>${command.command}</td>
    <td>${command.description}</td>
    <td>${populateAccessLevelCell(command.access_level)}</td>
  `;

  const deleteCell = populateDeleteIcon(command.command);
  row.appendChild(deleteCell);

  const editCell = populateEditIcon();
  row.appendChild(editCell);

  return row;
}

function populateEnabledCell(enabled) {
  const enabledCell = document.createElement('td');
  const toggleLabel = document.createElement('label');
  toggleLabel.classList.add('toggle');

  const toggleSwitch = document.createElement('input');
  toggleSwitch.type = 'checkbox';
  toggleSwitch.id = 'toggleCheckbox'; // Set the initial state of the checkbox

  const slider = document.createElement('span');
  slider.classList.add('slider');

  toggleLabel.appendChild(toggleSwitch);
  toggleLabel.appendChild(slider); // Append the slider inside the label

  enabledCell.appendChild(toggleLabel); // Append the label with checkbox and slider to the cell

  return enabledCell;
}

function populateDeleteIcon(command) {
  const deleteCell = document.createElement('td');
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fa', 'fa-trash', 'delete-icon');

  deleteCell.appendChild(deleteIcon);
  return deleteCell;
}

function populateEditIcon() {
  const editCell = document.createElement('td');
  const editIcon = document.createElement('i');
  editIcon.classList.add('fa', 'fa-pencil', 'edit-icon');

  editCell.appendChild(editIcon);
  return editCell;
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

/*


.toggle-switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  transition: 0.4s;
}

.slider.on {
  background-color: #f39f21;
}

.slider.off {
  background-color: #20c436;  
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}


input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]:checked + .slider {
  background-color: #2196F3;
}

input[type="checkbox"]:checked + .slider.on {
  transform: translateX(16px);
}
input[type="checkbox"]:checked + .slider.off {
  transform: translateX(0px);
}




// Style for the "Access Level" dropdown 
select {
  width: 100%;
  padding: 5px;
  border: none;
  border-radius: 4px;
  background-color: #f1f1f1;
}

// Style for the "Delete" icon 
.delete-icon {
  color: red;
  cursor: pointer;
}

// Style for the "Edit" icon 
.edit-icon {
  color: blue;
  cursor: pointer;
}

.edit-icon:hover {
  transform: scale(1.5);
}









window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM content loaded.');
  const username = 'miacroft_';

  fetch(`/getCommands?username=${username}`)
    .then((response) => response.json())
    .then((commands) => {
      console.log(commands); // Log the commands data

      populateTable(commands);
    })
    .catch((error) => console.error(error));
});




function populateTable(commands) {
  const tableBody = document.getElementById('tableBody');

  commands.forEach((command) => {
    const row = document.createElement('tr');

    const enabledCell = document.createElement('td');
    populateEnabledCell(enabledCell, command.enabled);

    // Command Name
    const commandCell = document.createElement('td');
    commandCell.textContent = command.command;

    // Command Description
    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = command.description;

    // Access Level cell
    const accessLevelCell = document.createElement('td');
    accessLevelCell.textContent = populateAccessLevelCell(command.access_level);

    //const accessLevelSelect = populateAccessLevelCell(command.access_level);
    //accessLevelCell.appendChild(accessLevelSelect);

    //const editCell = document.createElement('td');
    //editCell = populateEditCell();
    //populateEditCell(editCell);

    row.appendChild(enabledCell);
    row.appendChild(commandCell);
    row.appendChild(descriptionCell);
    row.appendChild(accessLevelCell);
    //row.appendChild(deleteCell);
    //row.appendChild(editCell);

    // Add the row to the table body
    tableBody.appendChild(row);
  });
}

function populateEnabledCell(row, enabled, command) {
  const cell = row.insertCell();
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = enabled;
  input.addEventListener('change', async () => {
    try {
      const response = await fetch(
        `/updateEnabled?username=${username}&command=${command}&enabled=${!enabled}`
      );
      if (response.ok) {
        input.checked = !enabled;
      } else {
        console.error('Error updating enabled status');
      }
    } catch (error) {
      console.error(error);
    }
  });
  cell.appendChild(input);
  return cell;
}

// Function to create and populate the Access Level select element
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

function populateEditCell(cell) {
  // Edit icon
  const editIcon = document.createElement('i');
  editIcon.className = 'fas fa-pencil-alt edit-icon';
  editIcon.addEventListener('click', () => {
    // Add your edit functionality here
  });

  return editIcon;
}*/

/*
function createAccessLevelSelect(selectedLevel) {
  const accessLevelSelect = document.createElement('select');

  const accessLevels = {
    level1: 'Everyone',
    level2: 'Subscriber',
    level3: 'VIP',
    level4: 'Moderator',
  };

  for (const level in accessLevels) {
    const option = document.createElement('option');
    option.value = level;
    option.textContent = accessLevels[level];

    if (parseInt(level.charAt(level.length - 1)) === selectedLevel) {
      option.selected = true;
    }

    accessLevelSelect.appendChild(option);
  }

  return accessLevelSelect;
}





window.addEventListener('DOMContentLoaded', (event) => {
  const username = 'miacroft_';

  fetch(`/getCommands?username=${username}`)
    .then((response) => response.json())
    .then((commands) => {
      populateTable(commands);
    })
    .catch((error) => console.error(error));
});

function populateTable(commands) {
  const tableBody = document.getElementById('tableBody'); // Replace with your table's tbody id or selector

  commands.forEach((command) => {
    console.log(command);

    const newRow = document.createElement('tr');

    const enabledCell = document.createElement('td');
    // Create your toggle switch or content for the enabled cell

    const commandCell = document.createElement('td');
    commandCell.textContent = command.command;

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = command.description;

    const accessCell = document.createElement('td');
    accessCell.textContent = command.access_level;

    const editCell = document.createElement('td');
    // Create your edit dropdown arrow or content for the edit cell

    const deleteCell = document.createElement('td');
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'delete-icon';
    deleteIcon.addEventListener('click', () => {
      // Add your delete functionality here
      // For example, remove the row from the table
      const row = deleteIcon.closest('tr');
      row.remove();
    });
    deleteCell.appendChild(deleteIcon);

    newRow.appendChild(enabledCell);
    newRow.appendChild(commandCell);
    newRow.appendChild(descriptionCell);
    newRow.appendChild(editCell);
    newRow.appendChild(deleteCell);

    tableBody.appendChild(newRow);
  });
}
*/
/*
  fetch(`/getCommands?username=${username}`)
    .then((response) => response.json())
    .then((commands) => {
      commands.forEach((command) => {
        console.log(command);
        const row = document.createElement('tr');

        const enabledCell = document.createElement('td');
        // Create a toggle switch for the enabled column
        // Set the enabled state based on command.enabled
        // Append the toggle switch to the enabledCell

        const commandCell = document.createElement('td');
        commandCell.textContent = command.command;

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = command.description;

        const editCell = document.createElement('td');
        // Create an edit button or dropdown arrow for the edit column
        // Append the button or arrow to the editCell

        const deleteCell = document.createElement('td');
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'delete-icon fa fa-trash';
        deleteCell.appendChild(deleteIcon);

        row.appendChild(enabledCell);
        row.appendChild(commandCell);
        row.appendChild(descriptionCell);
        row.appendChild(editCell);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error(error));
    */

/*
  // Add event listeners to delete icons
  const deleteIcons = document.querySelectorAll('.delete-icon');
  deleteIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      // Add your delete functionality here
      // For example, remove the row from the table
      const row = icon.closest('tr');
      row.remove();
    });
  });



*/
/*
window.addEventListener('DOMContentLoaded', async (event) => {
  console.log('Users:');
  try {
    //console.log('Users: ', userIds);
  } catch (err) {
    console.log(err);
  }

  document.querySelectorAll('.delete-icon').forEach((icon) => {
    icon.addEventListener('click', () => {
      // Add your delete functionality here
      // For example, remove the row from the table
      const row = icon.closest('tr');
      row.remove();
    });
  });
  
  var data = [
    { name: 'John Doe', age: 25, country: 'USA', enabled: true },
    { name: 'Jane Smith', age: 30, country: 'Canada', enabled: false },
    { name: 'Mark Johnson', age: 35, country: 'Australia', enabled: true },
    { name: 'Sarah Williams', age: 28, country: 'UK', enabled: false },
  ];

  function populateTable() {
    var tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    for (var i = 0; i < data.length; i++) {
      var row = tableBody.insertRow();
      var nameCell = row.insertCell();
      var ageCell = row.insertCell();
      var countryCell = row.insertCell();
      var enabledCell = row.insertCell();

      nameCell.innerHTML = data[i].name;
      ageCell.innerHTML = data[i].age;
      countryCell.innerHTML = data[i].country;

      var switchInput = document.createElement('input');
      switchInput.type = 'checkbox';
      switchInput.checked = data[i].enabled;
      switchInput.addEventListener('change', toggleSwitch.bind(null, i));

      enabledCell.appendChild(switchInput);
    }
  }

  function toggleSwitch(index) {
    data[index].enabled = !data[index].enabled;
  }

  function filterTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');

    for (i = 0; i < tr.length; i++) {
      var nameColumn = tr[i].getElementsByTagName('td')[0];
      var countryColumn = tr[i].getElementsByTagName('td')[2];

      if (nameColumn || countryColumn) {
        var nameText = nameColumn.textContent || nameColumn.innerText;
        var countryText = countryColumn.textContent || countryColumn.innerText;

        if (
          nameText.toUpperCase().indexOf(filter) > -1 ||
          countryText.toUpperCase().indexOf(filter) > -1
        ) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  }

  populateTable();

  var searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keyup', filterTable);
});*/
