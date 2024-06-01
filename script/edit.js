"use strict";

// làm mới dữ liệu của bảng edit
function renderTableData(petArr) {
  tableBodyEl.innerHTML = ""; //xóa hết bảng table
  // thêm dữ liệu từ mảng petArr vô table
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${pet.id}</th>
    <td>${pet.name}</td>
    <td>${pet.age}</td>
    <td>${pet.type}</td>
    <td>${pet.weight} kg</td>
    <td>${pet.length} cm</td>
    <td>${pet.type == "Cat" ? "Mèo" : "Chó"} ${pet.breed}</td>
    <td>
    <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
    </td>
    <td><i class="bi bi-${
      pet.vaccinated == true ? "check" : "x"
    }-circle-fill"></i></td>
    <td><i class="bi bi-${
      pet.dewormed == true ? "check" : "x"
    }-circle-fill"></i></td>
    <td><i class="bi bi-${
      pet.sterilized == true ? "check" : "x"
    }-circle-fill"></i></td>
    <td>${pet.date.slice(0, 10)}</td>
    <td>
    <button type="button" class="btn btn-warning" onclick="startEditPet('${
      pet.id
    }')" >Edit</button>
    </td>`;
    tableBodyEl.appendChild(row);
  });
}
renderTableData(petArr);

//tạo hàm sửa thông tin pet
const startEditPet = (petid) => {
  clearInput();
  //cho hiệm from chỉnh sửa
  containeFrorm.classList.add("active1");
  setTimeout(() => containeFrorm.classList.add("active2"), 1000);

  //hiển thị thông tin của pet muốn sửa
  petArr.forEach((pet) => {
    if (petid == pet.id) {
      idInput.value = pet.id;
      nameInput.value = pet.name;
      ageInput.value = pet.age;
      typeInput.value = pet.type;
      weightInput.value = pet.weight;
      lengthInput.value = pet.length;
      colorInput.value = pet.color;
      vaccinatedInput.checked = pet.vaccinated;
      dewormedInput.checked = pet.dewormed;
      sterilizedInput.checked = pet.sterilized;
      renderBreed(typeInput);
      breedInput.value = pet.breed;
    }
  });
};

//nút submit edit pet
submitBtn.addEventListener("click", function (e) {
  const day = new Date();
  const data = {
    id: idInput.value,
    name: nameInput.value.charAt(0).toUpperCase() + nameInput.value.slice(1),
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    // date: `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`,
    // date: `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}T${
    //   day.getHours() + 1
    // }:${day.getMinutes() + 1}:${day.getSeconds()}`,
    date: `${day.getFullYear()}-${
      day.getMonth() < 10 ? `0${day.getMonth() + 1}` : day.getMonth()
    }-${day.getDate() < 10 ? `0${day.getDate()}` : day.getDate()}`,
  };

  // check dữ liệu nhập vào
  function validateData(data) {
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
      swal("Vui lòng chọn chó hoặc mèo", "", "error"); // có thể dùng "warning", "error", "success" and "info"
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
    } else if (data.length < 1 || data.length > 100) {
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

  // nếu đưa giạ trị object data vào  hàm validateData kiểm tra điều kiện trả về true sẽ  thực hiện thêm vô mảng pet arr
  const validate = validateData(data);

  if (validate) {
    petArr.forEach((pet, i) => {
      if (data.id == pet.id) {
        petArr[i] = data;
        saveToStorage("petArr", JSON.stringify(petArr));
        renderTableData(petArr);
        containeFrorm.classList.remove("active2");
        setTimeout(() => containeFrorm.classList.remove("active1"), 1000);
      }
    });
  }
});
