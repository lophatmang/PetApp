"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// tableBodyEl.innerHTML = "";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
healthyBtn.textContent = "Show Healthy Pet";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        // petArr.forEach((key, x, arr) => {
        if (petArr[x].id == petid) {
          petArr.splice(x, 1);
          renderTableData(petArr);
          saveToStorage("petArr", JSON.stringify(petArr));
          break;
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// làm mới dữ liệu của bảng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = ""; //xóa hết bảng table
  // thêm dữ liệu từ mảng petarr vô table
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
    <button type="button" class="btn btn-danger" onclick="deletePet('${
      pet.id
    }')" >Delete</button>
    </td>`;
    tableBodyEl.appendChild(row);
  });
}
renderTableData(petArr);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// nút submit thêm thú cưng
submitBtn.addEventListener("click", function (e) {
  const day = new Date();
  const data = {
    id: id(parseInt(idInput.value)),
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
    date: `${day.getFullYear()}-${
      day.getMonth() < 10 ? `0${day.getMonth() + 1}` : day.getMonth()
    }-${day.getDate() < 10 ? `0${day.getDate()}` : day.getDate()}`,
  };

  // check dữ liệu nhập vào
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
    if (isNaN(parseInt(data.id.replace(/[^0-9]/g, "")))) {
      swal("Id không thể bỏ trống", "", "warning"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    } else if (data.id <= 0) {
      swal("Id phải lơn hơn 0", "", "warning"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    } else {
      for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].id == data.id) {
          swal("Id đã bị trùng ", "Vui lòng nhận id khác ", "error"); // có thể dùng "warning", "error", "success" and "info"
          return false;
        }
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
    petArr.push(data);
    saveToStorage("petArr", JSON.stringify(petArr));
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
