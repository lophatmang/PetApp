"use strict";

const findBtn = document.getElementById("find-btn");

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
    <td>`;
    tableBodyEl.appendChild(row);
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//đổi giống theo cho chức năng tìm kiếm
const renderBreedFind = (breed) => {
  const check = breed.value;

  //mỗi lần đổi loại chó hoặc mèo xóa hết nhưng giống cũ
  breedInput.innerHTML = "<option>Select Breed</option>";

  if (check == "Select Type") {
    //tạo mảng chưa chỉ chứa breed ko trùng
    const breedAll = [];
    breedArr.forEach((breedArr) => breedAll.push(breedArr.breed));

    const breed = breedAll.reduce((breed, pet) => {
      if (breed.indexOf(pet) === -1) {
        breed.push(pet);
      }
      return breed;
    }, []);
    breed.forEach((breed) => {
      const option = document.createElement("option");
      option.innerHTML = `${breed}`;
      breedInput.appendChild(option);
    });
  } else {
    //lấy 1 mảng giống của chó hoặc mèo
    const breed = breedArr.filter((e) => e.type == `${check}`);
    //tạo các sự lựa chọn giống phù hợp vs chó hoặc mèo
    breed.forEach((breed) => {
      const option = document.createElement("option");
      option.innerHTML = `${breed.breed}`;
      breedInput.appendChild(option);
    });
  }
};
renderBreedFind(typeInput);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// nút tìm thú cưng
findBtn.addEventListener("click", function (e) {
  const data = {
    id: idInput.value.charAt(0).toUpperCase() + idInput.value.slice(1),
    name: nameInput.value.charAt(0).toUpperCase() + nameInput.value.slice(1),
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };

  function findPet(e) {
    const findPetArr = petArr.filter(
      (e) =>
        e.vaccinated == (data.vaccinated == false ? e.vaccinated : true) &&
        e.dewormed == (data.dewormed == false ? e.dewormed : true) &&
        e.sterilized == (data.sterilized == false ? e.sterilized : true) &&
        e.id == checkId(e.id, data.id) &&
        e.name == checkName(e.name, data.name) &&
        e.type == (data.type == "Select Type" ? e.type : data.type) &&
        e.breed == (data.breed == "Select Breed" ? e.breed : data.breed)
    );
    renderTableData(findPetArr);
  }
  findPet();
});

// hàm kiểm tra tên pet
const checkName = (name, input) => {
  if (name.includes(input)) {
    return name;
  } else {
    return input;
  }
};

const checkId = (id, input) => {
  if (id.includes(input)) {
    return id;
  } else {
    return input;
  }
};
