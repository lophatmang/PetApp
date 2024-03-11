"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const bmiBtn = document.getElementById("bmi-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
// tableBodyEl.innerHTML = "";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
healthyBtn.textContent = "Show All Pet";
const petArr = [
  {
    age: 4,
    breed: "Tabby",
    color: "#000000",
    date: new Date(),
    dewormed: true,
    id: "1",
    length: 6,
    name: "3",
    sterilized: false,
    type: "Dog",
    vaccinated: true,
    weight: 5,
    bmi: "?",
  },
  {
    age: 4,
    breed: "Tabby",
    color: "#000000",
    date: new Date(),
    dewormed: true,
    id: "2",
    length: 6,
    name: "3",
    sterilized: true,
    type: "Dog",
    vaccinated: true,
    weight: 5,
    bmi: "?",
  },
  {
    age: 4,
    breed: "Tabby",
    color: "#000000",
    date: new Date(),
    dewormed: true,
    id: "3",
    length: 6,
    name: "3",
    sterilized: false,
    type: "Dog",
    vaccinated: true,
    weight: 5,
    bmi: "?",
  },
  {
    age: 4,
    breed: "Tabby",
    color: "#000000",
    date: new Date(),
    dewormed: true,
    id: "4",
    length: 6,
    name: "3",
    sterilized: true,
    type: "Dog",
    vaccinated: true,
    weight: 5,
    bmi: "?",
  },
]; //tạo mảng chứa thông tin thú cưng

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// hàm xóa mọi dữ liệu đã nhập vào input
const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = "";
  dewormedInput.checked = "";
  sterilizedInput.checked = "";
};
//  tạo nút xóa dữ liệu trong bảng
function deletePet(petid) {
  swal({
    title: "",
    text: `Bạn có chắc muốn xóa pet có Id: ${petid} không?`,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal({
        title: `Đã xóa pet Id: ${petid}`,
        text: "",
        icon: "success",
      });
      for (let x = 0; x < petArr.length; x++) {
        if (petArr[x].id == petid) {
          petArr.splice(x, 1);
          renderTableData(petArr);
        }
      }
      if (healthyBtn.textContent == "Show All Pet") {
        healthyBtn.textContent = "Show Healthy Pet";
      }
    } else {
      swal(`Đã hủy xóa pet Id: ${petid} `, "");
    }
  });
}
// làm mới dữ liệu của bảng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = ""; //xóa hết bảng table
  // thêm dữ liệu từ mảng petarry vô table
  for (let count = 0; count < petArr.length; count++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${petArr[count].id}</th>
    <td>${petArr[count].name}</td>
    <td>${petArr[count].age}</td>
    <td>${petArr[count].type}</td>
    <td>${petArr[count].weight} kg</td>
    <td>${petArr[count].length} cm</td>
    <td>${petArr[count].breed}</td>
    <td>
    <i class="bi bi-square-fill" style="color: ${petArr[count].color}"></i>
    </td>
    <td><i class="bi bi-${
      petArr[count].vaccinated == true ? "check" : "x"
    }-circle-fill"></i></td>
    <td><i class="bi bi-${
      petArr[count].dewormed == true ? "check" : "x"
    }-circle-fill"></i></td>
    <td><i class="bi bi-${
      petArr[count].sterilized == true ? "check" : "x"
    }-circle-fill"></i></td>
    <td>${petArr[count].bmi}</td>
    <td>${petArr[count].date.getDate()}/${
      petArr[count].date.getMonth() + 1
    }/${petArr[count].date.getFullYear()}</td>
    <td>
    <button type="button" class="btn btn-danger" onclick="deletePet(${
      petArr[count].id
    })" >Delete</button>
    </td>`;
    tableBodyEl.appendChild(row);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
submitBtn.addEventListener("click", function (e) {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: "?",
    date: new Date(),
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
    // kiem tra id
    for (let i = 0; i < petArr.length; i++) {
      if (!data.id) {
        swal("Id không thể bỏ trống", "Vui lòng nhận id vào", "warning"); // có thể dùng "warning", "error", "success" and "info"
        return false;
      } else if (petArr[i].id == data.id) {
        swal("Id đã bị trùng ", "Vui lòng nhận id khác ", "error"); // có thể dùng "warning", "error", "success" and "info"
        return false;
      }
    }
    // kiểm tra name
    if (!data.name) {
      swal("Tên không thể bỏ trống", "Vui lòng nhận Tên vào", "warning"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    }
    // // kiêm tra tuổi
    if (!data.age) {
      swal("Tuổi không thể bỏ trống", "Vui lòng nhận Tuổi vào", "warning"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    } else if (data.age < 1 || data.age > 15) {
      swal("Không đúng độ tuổi", "Độ tuổi phải từ 1 đến 15 ", "error"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    }
    // kiểm tra loại
    if (data.type == "Select Type") {
      swal("Vui lòng chọn loại chó hoặc mèo", "", "error"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    }
    // kiểm tra cân nặng
    if (!data.weight) {
      swal("Chưa nhập cân nặng", "vui lòng nhập cân nặng", "warning"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    } else if (data.weight < 1 || data.weight > 15) {
      swal("", "vui lòng nhập cân nặng từ 1 đến 15 ", "error"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    }
    // kiểm tra chiều dài
    if (!data.length) {
      swal("Chưa nhập chiều dài", "vui lòng nhập chiều dài vào", "warning"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    } else if (data.length < 1 || data.length > 15) {
      swal("", "vui lòng nhập chiều dài từ 1 đến 100 ", "error"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    }
    //kiểm tra giống
    if (data.breed == "Select Breed") {
      swal("Vui lòng chọn giống của thú cưng", "", "error"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    }
    // đấp ưng đủ điều kiện trả về true
    return true;
  }
  //  nếu nút show heal pet đang là show all pet thì trả về show heathy pet

  // nếu đưa giạ trị object data vào  hàm validateData kiểm tra điều kiện trả về true sẽ  thực hiện thêm vô mảng pet arr
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
    if (healthyBtn.textContent == "Show All Pet") {
      healthyBtn.textContent = "Show Healthy Pet";
    }
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//nút Show Healthy Pet

healthyBtn.addEventListener("click", function (e) {
  const healthyPetArr = petArr.filter(
    (e) => e.vaccinated == true && e.dewormed == true && e.sterilized == true
  );
  if (healthyBtn.textContent == "Show Healthy Pet") {
    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show All Pet";
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// tính BMI của pet
bmiBtn.addEventListener("click", function (e) {
  for (let c = 0; c < petArr.length; c++) {
    if (petArr[c].type == "Dog") {
      petArr[c].bmi = (
        (petArr[c].weight * 703) /
        petArr[c].length ** 2
      ).toFixed(2);
    } else {
      petArr[c].bmi = (
        (petArr[c].weight * 886) /
        petArr[c].length ** 2
      ).toFixed(2);
    }
  }
  renderTableData(petArr);
  healthyBtn.textContent = "Show Healthy Pet";
});
