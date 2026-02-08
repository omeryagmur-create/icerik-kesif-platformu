function doGet(e) {
    return handleRequest(e);
}

function doPost(e) {
    return handleRequest(e);
}

function handleRequest(e) {
    // Preflight request handling (OPTIONS)
    if (e.parameter && e.parameter.method === "OPTIONS") {
        return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // GET request: Return subscriber count
    if (!e.postData) {
        var count = Math.max(0, sheet.getLastRow() - 1); // Subtract 1 for header row
        var result = {
            count: count
        };
        return ContentService.createTextOutput(JSON.stringify(result))
            .setMimeType(ContentService.MimeType.JSON);
    }

    // POST request: Add new subscriber
    try {
        var data = JSON.parse(e.postData.contents);
        var email = data.email;

        // Simple validation
        if (!email || !email.includes('@')) {
            return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid email' }))
                .setMimeType(ContentService.MimeType.JSON);
        }

        // Check for duplicates (optional, basic check)
        // var textFinder = sheet.createTextFinder(email);
        // if (textFinder.findNext()) {
        //   return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Already subscribed' }))
        //     .setMimeType(ContentService.MimeType.JSON);
        // }

        sheet.appendRow([new Date(), email]);

        return ContentService.createTextOutput(JSON.stringify({ status: 'success', row: sheet.getLastRow() }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
