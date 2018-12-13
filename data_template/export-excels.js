const xlsx = require("node-xlsx");
const path = require("path");
const fs = require('fs');
const rimraf = require('rimraf');

const excelPath = path.join(__dirname, "./sheet");
const jsonPath = path.join(__dirname, "./../laya/assets/sheets");
const tsPath = path.join(__dirname, "./../src/game/sheet");

console.log("Deleting json files in '" + jsonPath + "' ...");

rimraf(jsonPath, function (err) {
  if(err){
    console.log(err);
  } else {

    console.log("Reading sheet files in '" + excelPath + "' ...");

    fs.readdir(excelPath, (err, fileNames) => {
      if(err)throw err;

      if(!fs.existsSync(jsonPath)){
        fs.mkdir(jsonPath, (err) => {
          if(err){
            console.log(err);
          }
        });
      }

      console.log("Start exporting files!");
      for (let i = 0; i < fileNames.length; i++) {
        if (fileNames[i].substring(0, 2) === "~$" || fileNames[i].substring(0, 1) === ".") {
          fileNames.splice(fileNames[i], 1);
          i--;
        }
      }
      let jsonArray = [];

      let tsData = "";
      let classNames = [];
      for (let i = 0; i < fileNames.length; i++) {
        const src = path.join(excelPath, fileNames[i]);
        const list = xlsx.parse(src);

        const fieldDescs = list[0].data.shift();
        const fieldNames = list[0].data.shift();
        const fieldTypes = list[0].data.shift();

        const contents = list[0].data;
        const data = [];
        const jsonObj = {};
        for (let i = 0; i < contents.length; i++) {
          const arr = contents[i];
          const obj = {};
          for (let j = 0; j < fieldNames.length; j++) {
            // obj[fieldNames[j]] = arr[j];
            obj[String.fromCharCode(97 + j)] = arr[j];
          }
          data.push(obj)
        }

        const className = fileNames[i].replace(".xlsx", "");
        classNames.push(className);
        jsonObj.sheetName = className;
        jsonObj.data = data;
        jsonArray.push(jsonObj);


        tsData += "class " + className + "{";
        tsData += "public static dataArr: " + className + "[] = [];";
        tsData += "public static dataObj = {};";

        tsData += "public static getSheetByIndex(index: number):" + className + "{return " + className + ".dataArr[index];}";

        tsData += "public static getSheetById(id: number):" + className + "{return " + className + ".dataObj[id];}";

        tsData += "public static getSheetByFieldValue(fieldName: string, value: number | string): " + className + " | " + className + "[] {";
        tsData += "const result: " + className + "[] = [];for (const sheet of " + className + ".dataArr) {";
        tsData += "if(typeof value === 'string'){";
        tsData += "if(sheet[this._keys[fieldName]].trim()===value){result.push(sheet);}} else {";
        tsData += "if (sheet[this._keys[fieldName]] === value) {result.push(sheet);}}}";
        tsData += "if (result.length === 1) {return result.pop();";
        tsData += "} else {return result;}}";

        tsData += "public static initData(data:any[]):void{";
        tsData += "const sheetLen:number = data.length;" ;
        tsData += "for (let i = 0; i < sheetLen; i++) {" ;

        tsData += className + ".dataArr[i] = new " + className + "();" ;
        tsData += "for(const key of Object.keys(this._keys)){" + className + ".dataArr[i][key] = data[i][this._keys[key]];}";

        tsData += className + ".dataObj[data[i][this._keys.id]] = " + className + ".dataArr[i];";
        tsData += "}}";

        tsData += "KEYS_PLACEHOLDER";

        let keys = "private static _keys = {";
        for (let k = 0; k < fieldNames.length; k++) {
          if(fieldNames[k] === undefined){
            continue;
          }
          // tsData+="/**" + fieldDescs[k] + "*/";
          const m = String.fromCharCode(97 + k);
          tsData+="private " + m + ": " + fieldTypes[k] + ";";
          tsData+="public get " + fieldNames[k] + "(): " + fieldTypes[k] + "{return this." + m + ";}";
          tsData+="public set " + fieldNames[k] + "(value:" + fieldTypes[k] + "){this." + m + " = value;}";

          keys += fieldNames[k] + ":\"" + m +"\",";
        }
        keys = keys.substring(0, keys.length - 1) + "};";
        tsData = tsData.replace("KEYS_PLACEHOLDER", keys);

        tsData += "}";
        tsData += "// prettier-ignore\n";
      }

      tsData += "class Sheet {" +
        "public static initSheets(data): void {" +
        "const classInstance = {";
      tsData += classNames.join(",");
      tsData += "};";
      tsData += "for (const sheet of data) {";
      tsData += "const sheetClass = classInstance[sheet.sheetName];";
      tsData += "if (!sheetClass) {console.error('找不到表{', sheet.sheetName + '}');continue}";
      tsData += "sheetClass.initData(sheet.data);";
      tsData += "}}}";
      tsData += "// prettier-ignore\n";


      const dist = path.join(jsonPath, "sheet.json");
      writeJsonFile(dist, JSON.stringify(jsonArray));

      const tsDist = path.join(tsPath, "Sheet.ts");
      writeTsFile(tsDist, tsData);

    })
  }
})

function writeJsonFile(fileName, data)
{
  fs.writeFile(fileName, data, 'utf-8', (err)=>{
    if(err){
      console.log(err);
    }
    console.log("Export json files completed!");
  });
}

function writeTsFile(fileName, data){
  fs.writeFile(fileName, data, 'utf-8', (err)=>{
    if(err){
      console.log(err);
    }
    console.log("Export ts file completed!");
  });
}

