"use strict";

const inputFile = document.getElementById("input-file");
const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");

// export File : lưu file chứa dữ liệu các thú cưng về máy
function exportfile() {
  // var userInput = JSON.stringify(petArr);
  var userInput = getFromStorage("petArr", "[]");

  var blob = new Blob([userInput], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "exportFile.json");
}

exportBtn.addEventListener("click", exportfile);

//Import file lấy dữ liệu nhập lên từ file

function importFile() {
  //kiểm tra đã thêm file chưua
  if (!inputFile.value.length) {
    swal("Bạn chưa chọn file để import", "Vui lòng thêm tệp vào ", "error");
  } else {
    //đọc file
    const readFile = new FileReader();

    readFile.readAsText(inputFile.files[0], "UTF-8");

    readFile.onload = function (e) {
      const file = JSON.parse(e.target.result);
      file.forEach((pet) => {
        petArr.forEach((petArr) => {
          if (pet.id !== petArr.id) {
            petArr.push(pet);
            saveToStorage("petArr", JSON.stringify(petArr));
          }
        });
      });
    };

    inputFile.value = "";
    swal("Import file thành công", " ", "success");
  }
}

importBtn.addEventListener("click", importFile);
