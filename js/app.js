// Your code should go here
// Author: Le Van Cong

/**
 * Function for sort button event click
 */
function sortTable() {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById('table_empployee');
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;

      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[5];
      y = rows[i + 1].getElementsByTagName("TD")[5];

      //Get the two elements ID incase 2 element balance same
      x_id = rows[i].getElementsByTagName("TD")[0];
      y_id = rows[i + 1].getElementsByTagName("TD")[0];

      //rows will be sorted by balance in descending order.
      if (Number(x.innerHTML) < Number(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
      // If two or more balances are the same, rows will be sorted in ascending id order.
      if (Number(x.innerHTML) === Number(y.innerHTML) && (Number(x_id.innerHTML) > Number(y_id.innerHTML))) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

/**
 * Start randomly rearrange every second by event click button.
 */
function startRandom() {
  // get the parent table for convenience
  let table = document.getElementById("table_empployee");

  document.getElementById("sort").disabled = true;


  // get all rows
  let rowsCollection = table.querySelectorAll("tr");

  // convert to array
  let rows = Array.from(rowsCollection)
    .slice(1); //skip the header row

  // shuffle
  shuffleArray(rows);

  // add back to the DOM
  for (const row of rows) {
    table.appendChild(row);
  }
  // set timeout to start random every second
  timeOut = setTimeout(startRandom, 1000)
}


/**
 * Randomize array element order in-place.
 * shuffleArray 
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

/**
 * Stop random by event click button.
 */
function stopRandom() {
  clearTimeout(timeOut);
  document.getElementById("sort").disabled = false;
}