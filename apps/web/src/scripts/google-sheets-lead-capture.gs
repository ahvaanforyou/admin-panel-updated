/**
 * ==============================================================================
 * AHVAAN FOR YOU — CLIENT LEAD CAPTURE & AUTO-FORMATTING GOOGLE APPS SCRIPT
 * ==============================================================================
 * 
 * HOW TO SET THIS UP IN GOOGLE SHEETS (Takes 2 minutes):
 * 1. Open Google Sheets (https://sheets.new) and name it "Ahvaan Client Leads".
 * 2. In the top menu, click: Extensions > Apps Script.
 * 3. Delete any code in the editor, paste this entire script, and click the Save icon (💾).
 * 4. Run the function "setupSheet" once by selecting it from the dropdown and clicking "Run".
 *    (This will automatically style your table with Ahvaan branding, status dropdowns, and colors!)
 * 5. Click "Deploy" > "New deployment" at the top right.
 *    - Click the gear icon next to "Select type" and choose "Web app".
 *    - Description: "Ahvaan Lead Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (crucial so your website form can post to it)
 *    - Click "Deploy", authorize access, and copy the Web App URL.
 * 6. You can paste this Web App URL in your site config or .env as AHVAAN_GOOGLE_SHEET_WEBHOOK!
 * ==============================================================================
 */

// Configuration
const SHEET_NAME = "Client Enquiries";
const BRAND_PRIMARY = "#4E1D1D"; // Ahvaan Deep Maroon
const BRAND_ACCENT = "#FAF8F5";  // Warm Sand Zebra background

/**
 * Automatically initializes and formats the Google Sheet with professional Ahvaan styling
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  
  // Set Table Headers
  const headers = [
    "Timestamp",
    "Client Name",
    "WhatsApp Number",
    "Occasion / Event",
    "Selected Template",
    "Status",
    "Notes & Follow-up"
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Style Header Row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground(BRAND_PRIMARY);
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 44);
  sheet.setFrozenRows(1);
  
  // Set Column Widths
  sheet.setColumnWidth(1, 170); // Timestamp
  sheet.setColumnWidth(2, 190); // Name
  sheet.setColumnWidth(3, 160); // WhatsApp
  sheet.setColumnWidth(4, 200); // Occasion
  sheet.setColumnWidth(5, 230); // Template
  sheet.setColumnWidth(6, 140); // Status
  sheet.setColumnWidth(7, 280); // Notes
  
  // Apply Status Dropdown & Validation for Column F
  applyStatusValidation(sheet);
  
  // Apply Conditional Formatting for Status
  applyConditionalFormatting(sheet);
  
  Logger.log("✅ Ahvaan Sheet initialized and formatted successfully!");
}

/**
 * Handles incoming web POST requests from the website Create Modal
 */
function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000); // Wait up to 10 seconds to avoid race conditions
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      setupSheet();
      sheet = ss.getSheetByName(SHEET_NAME);
    }
    
    // Parse JSON payload or form post
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      data = {};
    }
    
    const timestamp = new Date();
    const formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "dd MMM yyyy, hh:mm a");
    const name = data.name || "Anonymous";
    const phone = data.phone || "";
    const occasion = data.occasion || "Wedding Celebration";
    const template = data.template || "Custom Request";
    const status = "NEW";
    const notes = data.notes || "Enquiry from Ahvaan Website";
    
    // Append row
    const newRowIndex = sheet.getLastRow() + 1;
    sheet.appendRow([
      formattedDate,
      name,
      phone,
      occasion,
      template,
      status,
      notes
    ]);
    
    // Format the newly appended row
    const rowRange = sheet.getRange(newRowIndex, 1, 1, 7);
    rowRange.setFontSize(10);
    rowRange.setVerticalAlignment("middle");
    sheet.setRowHeight(newRowIndex, 34);
    
    // Alternating zebra row background
    if (newRowIndex % 2 === 0) {
      rowRange.setBackground(BRAND_ACCENT);
    } else {
      rowRange.setBackground("#FFFFFF");
    }
    
    // Center-align Timestamp, WhatsApp & Status
    sheet.getRange(newRowIndex, 1).setHorizontalAlignment("center");
    sheet.getRange(newRowIndex, 3).setHorizontalAlignment("center");
    sheet.getRange(newRowIndex, 6).setHorizontalAlignment("center");
    
    // Ensure dropdown validation applies to new row
    applyStatusValidation(sheet);
    
    lock.releaseLock();
    
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      message: "Lead recorded and formatted successfully",
      row: newRowIndex
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Dropdown validation for client statuses
 */
function applyStatusValidation(sheet) {
  const statuses = ["NEW", "IN PROGRESS", "CONTACTED", "CONFIRMED", "COMPLETED", "CANCELLED"];
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(statuses, true)
    .setAllowInvalid(false)
    .build();
    
  const range = sheet.getRange("F2:F500");
  range.setDataValidation(rule);
}

/**
 * Conditional color-coding for status highlights
 */
function applyConditionalFormatting(sheet) {
  const statusRange = sheet.getRange("F2:F500");
  
  // NEW: Amber highlight
  const ruleNew = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("NEW")
    .setBackground("#FEF3C7")
    .setFontColor("#92400E")
    .setRanges([statusRange])
    .build();
    
  // IN PROGRESS: Blue highlight
  const ruleInProgress = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("IN PROGRESS")
    .setBackground("#E0F2FE")
    .setFontColor("#075985")
    .setRanges([statusRange])
    .build();
    
  // CONFIRMED / COMPLETED: Emerald highlight
  const ruleConfirmed = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("CONFIRMED")
    .setBackground("#D1FAE5")
    .setFontColor("#065F46")
    .setRanges([statusRange])
    .build();
    
  // CONTACTED: Purple highlight
  const ruleContacted = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("CONTACTED")
    .setBackground("#F3E8FF")
    .setFontColor("#6B21A8")
    .setRanges([statusRange])
    .build();
    
  sheet.setConditionalFormatRules([ruleNew, ruleInProgress, ruleConfirmed, ruleContacted]);
}
