"use strict";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const sidebar = document.getElementById("sidebar");
const sidebarTitle = document.getElementById("sidebar-title");
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
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
const containeFrorm = document.getElementById("container-form");
const container = document.getElementById("main");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//thêm xóa class avtive ở sidebar

sidebar.addEventListener("mouseover", (e) => {
  sidebarTitle.style.cursor = "pointer";
  sidebar.classList.remove("active");
});

sidebar.addEventListener("mouseout", (e) => {
  sidebar.classList.add("active");
});

//lưu giữ liệu vào strorage

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key, defaultVal) {
  return localStorage.getItem(key) ?? defaultVal;
}

//tạo mảng chứa thông tin thú cưng
const petArr = JSON.parse(getFromStorage("petArr", "[]"));

// tạo mang breed
const breedArr = JSON.parse(getFromStorage("breedArr", "[]"));

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

//đổi giống theo tùy chọn mèo hay chó
const renderBreed = (breed) => {
  const check = breed.value;

  //mỗi lần đổi loại chó hoặc mèo xóa hết nhưng giống cũ
  breedInput.innerHTML = "<option>Select Breed</option>";

  if (check == "Select Type") {
    swal(
      "Vui lòng chọn chó hoặc mèo",
      "Bạn phải chọn chó hoặc mèo để chọn giống thích hợp",
      "error"
    );
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

// tạo id đẹp
const id = (id) => {
  if (id >= 1000) return `P${id}`;
  else if (id < 1000 && id >= 100) return `P0${id}`;
  else if (id < 100 && id >= 10) return `P00${id}`;
  else if (id <= 0 || id == "") return `${id}`;
  else return `P000${id}`;
};
