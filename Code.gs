const SS = SpreadsheetApp.getActiveSpreadsheet();
const SH = SS.getSheetByName('Base');
const VLS = SH.getDataRange().getValues();
VLS.shift();

function makeGeneticsJson() {
  var objArrayGenetics = [];
  // var objArrayGenetics = [];
  VLS.forEach(function(vl, index) {
    // objArrayGenetics.push({"id": vl[0],"jp_name":`${vl[1]}`,"en_name":`${vl[2]}`,"order":`${vl[3]}`},);
    
    if (vl[3] == "Recessive") {
      objArrayGenetics.push({"id": vl[0],"jp_name":`${vl[1]}`,"en_name":`${vl[2]}`,"order":`${vl[3]}`, "pairIds": {"first": vl[0], "second": vl[0]}});
      objArrayGenetics.push({"id": vl[0],"jp_name":`ヘテロ ${vl[1]}`,"en_name": `het ${vl[2]}`,"order":`${vl[3]}`, "info":"Het", "pairIds": {"first": vl[0], "second": 0}});
      return;
    }
    if (vl[3] == "IncompleteDominant") {
      objArrayGenetics.push({"id": vl[0],"jp_name":`${vl[1]}`,"en_name":`${vl[2]}`,"order":`${vl[3]}`, "pairIds": {"first": vl[0], "second": 0}});
      objArrayGenetics.push({"id": vl[0],"jp_name":`スーパー ${vl[1]}`,"en_name": `super ${vl[2]}`,"order":`${vl[3]}`, "info":"Super", "pairIds": {"first": vl[0], "second": vl[0]}});
      return;
    }
      objArrayGenetics.push({"id": vl[0],"jp_name":`${vl[1]}`,"en_name":`${vl[2]}`, "order":`${vl[3]}`, "pairIds": {"first": vl[0], "second": 0}});
  });

  const fileNameGenetics = "Genetics.json";
  const jsonGenetics = JSON.stringify(objArrayGenetics);
  createJsonFile(jsonGenetics, fileNameGenetics);

  const fileNameGeneticsSelect = "GeneticsSelect.json";
  const jsonGeneticsSelect = JSON.stringify(objArrayGenetics);
  createJsonFile(jsonGeneticsSelect, fileNameGeneticsSelect);
}

function createJsonFile(jsonData, fileName) {
  const driveFolderId = "1O9qmHLZn3Qg38pi_KbNf5tZ7IsbdSIeM"  
  let contentType = "application/json"
  let charSet = "UTF-8"
  let blob = Utilities.newBlob("", contentType, fileName).setDataFromString(jsonData, charSet)
  DriveApp.getFolderById(driveFolderId).createFile(blob)
}