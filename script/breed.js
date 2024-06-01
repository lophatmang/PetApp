"use strict";

// xóa dữ liệu đã nhập vào ô
const clearInputBreed = function () {
  breedInput.value = "";
  typeInput.value = "Select Type";
};
//tạo bảng breed
function renderTableData(breed) {
  tableBodyEl.innerHTML = ""; //xóa hết bảng table

  const check = breed.value;

  if (check == "Select Type") {
    // thêm dữ liệu từ mảng breedArr vô table
    breedArr.forEach((breed, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
    <td>${i + 1}</td>
    <td>${breed.breed}</td>
    <td>${breed.type}</td>
    <td>
    <button type="button" class="btn btn-danger" onclick="deletePet(${i})" >Delete</button>
    </td>`;
      tableBodyEl.appendChild(row);
    });
  } else {
    //lấy 1 mảng giống của chó hoặc mèo
    const breed = breedArr.filter((e) => e.type == `${check}`);
    //tạo các sự lựa chọn giống phù hợp vs chó hoặc mèo
    breed.forEach((breed, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
    <td>${i + 1}</td>
    <td>${breed.breed}</td>
    <td>${breed.type}</td>
    <td>
    <button type="button" class="btn btn-danger" onclick="deletePet(${i})" >Delete</button>
    </td>`;
      tableBodyEl.appendChild(row);
    });
  }
}
renderTableData(typeInput);

//  tạo nút xóa dữ liệu trong bảng
function deletePet(stt) {
  swal({
    title: "",
    text: `Bạn có chắc muốn xóa giống ${
      breedArr[stt].type == "Cat" ? "Mèo" : "Chó"
    } ${breedArr[stt].breed} không?`,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal({
        title: `Đã xóa giống ${breedArr[stt].type == "Cat" ? "Mèo" : "Chó"} ${
          breedArr[stt].breed
        }`,
        text: "",
        icon: "success",
      });
      breedArr.splice(stt, 1);
      renderTableData(typeInput);
      saveToStorage("breedArr", JSON.stringify(breedArr));
    } else {
      swal(
        `Đã hủy xóa giống ${breedArr[stt].type == "Cat" ? "Mèo" : "Chó"} ${
          breedArr[stt].breed
        } `,
        ""
      );
    }
  });
}

// nút submit thêm thú cưng
submitBtn.addEventListener("click", function (e) {
  const data = {
    breed: breedInput.value.charAt(0).toUpperCase() + breedInput.value.slice(1),
    type: typeInput.value,
  };

  function validateData(data) {
    /*
    // kiểm tra tất cả dữ liệu bị trống
    for (const key in data) {
      const check = data[key];
      if (!check) {
        swal("vui lòng ko bỏ trống ", "Vui lòng nhận thông tin vào ", "error");
        return false;
      }
    }
    */
    //kiểm tra giống

    for (let i = 0; i < breedArr.length; i++) {
      if (!data.breed) {
        swal(
          "không thể bỏ trống",
          "Vui lòng nhận giống thú cưng vào",
          "warning"
        ); // có thể dùng "warning", "error", "success" and "info"
        return false;
      } else if (
        breedArr[i].breed == data.breed &&
        breedArr[i].type == data.type
      ) {
        swal(
          "Giống thú cưng đã có ",
          "nhập giống khác hoặc dùng giống đã có sẳn",
          "error"
        ); // có thể dùng "warning", "error", "success" and "info"
        return false;
      }
    }

    // kiểm tra loại
    if (data.type == "Select Type") {
      swal("Vui lòng chọn loại chó hoặc mèo", "", "error"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    }

    // đấp ưng đủ điều kiện trả về true
    return true;
  }
  //  nếu nút show heal pet đang là show all pet thì trả về show heathy pet

  // nếu đưa giạ trị object data vào  hàm validateData kiểm tra điều kiện trả về true sẽ  thực hiện thêm vô mảng pet arr
  const validate = validateData(data);
  if (validate) {
    breedArr.push(data);
    saveToStorage("breedArr", JSON.stringify(breedArr));
    clearInputBreed();
    renderTableData(typeInput);
  }
});
