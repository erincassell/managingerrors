function getErrors() {
  var errorData = getDataValues("Errors");
  var errorThrds = GmailApp.search('label:.Failed Actions is:starred');
  var errors = [];
  for(var i = 0; i < errorThrds.length; i++) {
    var message = [];
    var messages = errorThrds[i].getMessages();
    message.push(messages[0].getDate());
    message.push(messages[0].getSubject());
    message.push(messages[0].getPlainBody());
    
    var subj = messages[0].getSubject();
    message.push(subj.substring(subj.search(": ")+1, subj.search(" >")).trim());
    message.push(subj.substring(subj.lastIndexOf(": ")+1, subj.lastIndexOf(" >")).trim());
    errors[i] = message;
    messages[0].unstar();
  }
  
  var error = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Errors");
  error.getRange(errorData.length+1, 1, errors.length, errors[0].length).setValues(errors);
  var helper = 1;
}