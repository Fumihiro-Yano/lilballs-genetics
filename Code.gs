const SS = SpreadsheetApp.getActiveSpreadsheet();
const SH = SS.getSheetByName('Base');
const VLS = SH.getDataRange().getValues();
VLS.shift();

function makeGeneticsJson() {
  var objArrayGenetics = [];
  VLS.forEach(function(vl, index) {
    const id = vl[0];
    const jpName = vl[1];
    const enName = vl[2];
    const order = vl[3];
    const complex = vl[4];    

    if (order == "Recessive") {
      objArrayGenetics.push({"id": id,"jp_name":`${jpName}`,"en_name":`${enName}`,"order":`${order}`, "pairIds": {"first": id, "second": id}, "complex": complex,"complexCount": complex == '' ? 0 : 1});
      objArrayGenetics.push({"id": id,"jp_name":`ヘテロ ${jpName}`,"en_name": `het ${enName}`,"order":`${order}`, "info":"Het", "pairIds": {"first": id, "second": 0}, "complex": complex,"complexCount": complex == '' ? 0 : 2});
      return;
    }
    if (order == "IncompleteDominant") {
      objArrayGenetics.push({"id": id,"jp_name":`${jpName}`,"en_name":`${enName}`,"order":`${order}`, "pairIds": {"first": id, "second": 0}, "complex": complex,"complexCount": complex == '' ? 0 : 1});
      objArrayGenetics.push({"id": id,"jp_name":`スーパー ${jpName}`,"en_name": `super ${enName}`,"order":`${order}`, "info":"Super", "pairIds": {"first": id, "second": id}, "complex": complex,"complexCount": complex == '' ? 0 : 2});
      return;
    }
      objArrayGenetics.push({"id": id,"jp_name":`${jpName}`,"en_name":`${enName}`, "order":`${order}`, "pairIds": {"first": id, "second": 0},  "complex": complex,"complexCount": 0});
  });

  const fileNameGenetics = "Genetics.json";
  const jsonGenetics = JSON.stringify(objArrayGenetics);
  createJsonFile(jsonGenetics, fileNameGenetics);  
}

function createJsonFile(jsonData, fileName) {
  const driveFolderId = "1O9qmHLZn3Qg38pi_KbNf5tZ7IsbdSIeM"  
  let contentType = "application/json"
  let charSet = "UTF-8"
  let blob = Utilities.newBlob("", contentType, fileName).setDataFromString(jsonData, charSet)
  DriveApp.getFolderById(driveFolderId).createFile(blob)
}