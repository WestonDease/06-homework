// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const todoItems = require('../data/itemList.js');

// Sample table is a dummy table for validation purposes
const sampleItem = require('../data/sampleItem.json');


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  // API Requests for /api/tables
  // Below code controls what happens when a request is made to /api/tables

  // GET Request
  // Responds with all the currently reserved tables
  app.get('/api/items', function(req, res) {
    res.json(todoItems);
  });

  // POST Request
  // Adds a new table to our data collection
  // Responds with success: true or false if successful
  app.post('/api/items', function(req, res) {
    console.log(req.body);
    // Checks to make sure every property on the req.body is also on sampleTable
    // If it's not, returns with success: false and exits the function
    for(let key in req.body) {
      if(!sampleItem.hasOwnProperty(key)) {
        return res.json({ success: false });
      }
    }

    // Checks to make sure every property on the sampleTable is also on req.body
    // If it's not, returns with success: false and exits the function
    for(let key in sampleItem) {
      if(!req.body.hasOwnProperty(key)) {
        return res.json({ success: false });
      }
    }
    
    const confirmation = { success: true }
    // joins item to list
    todoItems.push(req.body);

    // Send back a confirmation the POST was successfully processed to end the response
    res.json(confirmation);
  });

  // PUT Request
  // Replaces the table at the referenced index with the one provided
  // Responds with success: true or false if successful
  app.put('/api/items/:index', function(req, res) {

    // Using the same validation as our POST route to check if the included data is valid
    // Checks to make sure every property on the req.body is also on sampleTable
    // If it's not, returns with success: false and exits the function
    for(let key in req.body) {
      if(!sampleItem.hasOwnProperty(key)) {
        return res.json({ success: false });
      }
    }
    
    // Checks to make sure every property on the sampleTable is also on req.body
    // If it's not, returns with success: false and exits the function
    for(let key in sampleItem) {
      if(!req.body.hasOwnProperty(key)) {
        return res.json({ success: false });
      }
    }

    // Replace the referenced table with the one provided in the body
    todoItems.splice(req.params.index, 1, req.body);
    res.json({ success: true });
  });

  // DELETE Request
  // Removes the table at the referenced index
  // If there are tables on the waiting list, moves them to the reserved tables list
  // Responds with success: true or false if successful
  app.delete('/api/items/:index', function(req, res) {

    // Remove the referenced table from the tableList
    todoItems.splice(req.params.index, 1);
    
    // Respond that this operation was successfully completed
    res.json({ success: true });
  });
}
