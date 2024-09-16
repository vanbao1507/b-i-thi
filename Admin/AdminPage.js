// Khai báo
listProduct = [];
listManufacturer = [];
listCategory = [];

var idProductUpdate = "";

$(function () {
  loadComponentAdmin();
});

// Load các thành phần của trang Home Page
function loadComponentAdmin(params) {
  $(".MenuSection").load("./MenuAdmin.html");
  $(".SideBarSection").load("./SideBarAdmin.html");
  //   $(".ProductAdminSection").load("./ContentProductAdmin.html");
}

// Xử lý khi click vào menu Product
function handleShowProduct(params) {
  // Load nội dung ContentProductAdmin
  $(".ProductAdminSection").load(
    "./ContentProductAdmin.html",
    "data",
    function (response, status, request) {
      // Sau khi load thành công giao diện mới thực thi các hàm Callback trong này.
      fetchListProductAdmin();

      // Load dữ liệu Manufacturer cho Modal Form Tạo mới Product
      fetchListManufacturerAdmin();

      // Load dữ liệu Category cho Modal Form Tạo mới Product
      fetchListCategoryAdmin();
      //
      // Disable trường Id do không cần dùng nữa
      // $("#Id").attr("disabled", "disabled");
    }
  );
}

function fetchListManufacturerAdmin(params) {
  // Reset lại listProduct về Null
  listManufacturer = [];
  // Thực hiện Call API
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/manufacturers",
    // data: "data",
    dataType: "json",
    success: function (response, status) {
      // console.log("response:", response);
      // console.log("status:", status);
      // Kiểm tra nếu status= success
      if (status === "success") {
        listManufacturer = response;
        //Xóa bảng dữ liệu hiện tại
        // $("#Category").empty();
        // Dùng vòng lặp để tạo Manufacturer trong ô Select
        for (let index = 0; index < listManufacturer.length; index++) {
          // Create
          $("#Manufacturer").append(`
          <option value="${listManufacturer[index].id}">${listManufacturer[index].name}</option>
         `);
          //Update
          $("#ManufacturerUpdate").append(`
         <option value="${listManufacturer[index].id}">${listManufacturer[index].name}</option>
        `);
        }
      } else {
        console.log("Error when loading data!!");
        return;
      }
    },
  });
}

// Hàm đổ dữ liệu vào Select option Catergory Modal
function fetchListCategoryAdmin(params) {
  // Reset lại listProduct về Null
  listCategory = [];
  // Thực hiện Call API
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/categories",
    // data: "data",
    dataType: "json",
    success: function (response, status) {
      // console.log("response:", response);
      // console.log("status:", status);
      // Kiểm tra nếu status= success
      if (status === "success") {
        listCategory = response;
        //Xóa bảng dữ liệu hiện tại
        // $("#Category").empty();
        // Dùng vòng lặp để tạo Manufacturer trong ô Select
        for (let index = 0; index < listCategory.length; index++) {
          //  Create
          $("#Category").append(`
          <option value="${listCategory[index].id}">${listCategory[index].name}</option>
         `);
          // Update
          $("#CategoryUpdate").append(`
         <option value="${listCategory[index].id}">${listCategory[index].name}</option>
        `);
        }
      } else {
        console.log("Error when loading data!!");
        return;
      }
    },
  });
}

// Xử lý khi click vào menu Manufacturer
function handleShowManufacturer(params) {
  // Load nội dung ContentManufacturerAdmin
  $(".ProductAdminSection").load(
    "./ContentManufacturerAdmin.html",
    "data",
    function (response, status, request) {}
  );
}

// Xử lý khi click vào menu Category
function handleShowCategory(params) {
  // Load nội dung ContentCategoryAdmin
  $(".ProductAdminSection").load(
    "./ContentCategoryAdmin.html",
    "data",
    function (response, status, request) {}
  );
}

// Xử lý khi click vào menu Account
function handleShowAccount(params) {
  // Load nội dung ContentAccountAdmin
  $(".ProductAdminSection").load(
    "./ContentAccountAdmin.html",
    "data",
    function (response, status, request) {}
  );
}

// Hàm đổ dữ liệu vào Select option Manufaturer Modal
function fetchListManufacturerAdmin(params) {
  // Reset lại listProduct về Null
  listManufacturer = [];
  // Thực hiện Call API
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/manufacturers",
    // data: "data",
    dataType: "json",
    success: function (response, status) {
      // console.log("response:", response);
      // console.log("status:", status);
      // Kiểm tra nếu status= success
      if (status === "success") {
        listManufacturer = response;
        //Xóa bảng dữ liệu hiện tại
        // $("#Category").empty();
        // Dùng vòng lặp để tạo Manufacturer trong ô Select
        for (let index = 0; index < listManufacturer.length; index++) {
          // Create
          $("#Manufacturer").append(`
          <option value="${listManufacturer[index].id}">${listManufacturer[index].name}</option>
         `);
          //Update
          $("#ManufacturerUpdate").append(`
         <option value="${listManufacturer[index].id}">${listManufacturer[index].name}</option>
        `);
        }
      } else {
        console.log("Error when loading data!!");
        return;
      }
    },
  });
}

function getImageName(pathImage) {
  // Chuyển đường dẫn thành mảng các phần tử
  var itemArray = pathImage.split("\\");
  // Lấy phần tử cuối cùng
  var imageName = itemArray[itemArray.length - 1];

  return imageName;
}

// hàm xử lý thêm mới Product
function handleCreateNewProduct(params) {
  alert("Create New!!");
  // Lấy dữ liệu từ các ô Input
  var v_Id = $("#Id").val();
  var v_Name = $("#Name").val();
  var v_Price = $("#Price").val();
  var v_Info = $("#Info").val();
  var v_Detail = $("#Detail").val();
  var v_Star = $("#Star").val();
  // Gọi hàm để lấy tên Ảnh
  var v_Image = getImageName($("#Image").val());
  var v_Manufacturer = $("#Manufacturer").val();
  var v_Category = $("#Category").val();

  // Tạo đối tượng ProductNew để lưu trữ
  var ProductNew = {
    id: v_Id,
    name: v_Name,
    price: v_Price,
    info: v_Info,
    detail: v_Detail,
    ratingStar: v_Star,
    imageName: v_Image,
    manufacturerName: v_Manufacturer,
    categoryName: v_Category,
  };
  // console.log("ProductNew: ", ProductNew);
  // Add thêm sản phẩm vào listProduct
  // listProduct.push(ProductNew);
  // Lưu dữ liệu localStorage
  // localStorage.setItem("listProduct", JSON.stringify(listProduct));

  // Thực hiện Call API tạo mới Product
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/products",
    data: JSON.stringify(ProductNew),
    contentType: "application/json; charset=UTF-8",
    success: function (response, status) {
      if (status === "success") {
        fetchListProductAdmin();
      } else {
        console.log("Error when loading data!!");
        return;
      }
    },
  });

  // Thực hiện Reset Form

  handleResetForm();
  // Gọi hàm hiển thị lại danh sách sản phẩm
}

// Hàm Load dữ liệu Product, sau đó đổ dữ liệu vào Table
function fetchListProductAdmin(params) {
  // Reset lại listProduct về Null
  listProduct = [];
  // Thực hiện Call API
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/products",
    dataType: "json",
    success: function (response, status) {
      //  console.log(status);
      // Kiểm tra nếu status= success
      if (status === "success") {
        listProduct = response;
        //Xóa bảng dữ liệu hiện tại
        var tableContent = "";
        for (var index = 0; index < listProduct.length; index++) {
          tableContent += `
            <tr>
              <td>${listProduct[index].id}</td>
              <td>${listProduct[index].name}</td>
              <td>${listProduct[index].price}</td>
              <td>${listProduct[index].info}</td>
              <td>${listProduct[index].detail}</td>
              <td>${listProduct[index].ratingStar}</td>
              <td>${listProduct[index].imageName}</td>
              <td>${listProduct[index].manufacturerName}</td>
              <td>${listProduct[index].categoryName}</td>
              <td>
                <button type="button" class="btn btn-warning" onclick="handleProductEdits(${listProduct[index].id})">Edit</button>
              </td>
              <td>
                <button type="button" class="btn btn-danger" onclick="handleProductDelete(${listProduct[index].id})">Delete</button>
              </td>
            </tr>
          `;
          document.getElementById("tbProductAdmin").innerHTML = tableContent;
        }
      }
    },
  });
}

function handleProductEdits(idEditProduct) {
  // Lưu lại id của sản phẩm cần Update để sử dụng cho chức năng Update
  idProductUpdate = idEditProduct;
  // Tìm index của sản phẩm cần Update trong mảng listProduct
  var index = listProduct.findIndex((product) => product.id == idProductUpdate);

  // Điền thông tin của sản phẩm cần Update vào các ô Input
  // Không điền tên ảnh vào Input File
  $("#IdUpdate").val(listProduct[index].id);
  $("#NameUpdate").val(listProduct[index].name);
  $("#PriceUpdate").val(listProduct[index].price);
  $("#InfoUpdate").val(listProduct[index].info);
  $("#DetailUpdate").val(listProduct[index].detail);
  $("#StarUpdate").val(listProduct[index].ratingStar);
  $("#ManufacturerUpdate").val(listProduct[index].manufacturerId);
  $("#CategoryUpdate").val(listProduct[index].categoryId);

  // Hiển thị Modal Update Product
  $("#ModalUpdateProduct").modal("show");
}
// //  Hàm handleResetForm, xóa dữ liệu trong các ô Input
function handleResetForm() {
  // Gọi lại các Form nhập liệu và reset giá trị
  $("#Id").val("");
  $("#Name").val("");
  $("#Price").val("");
  $("#Info").val("");
  $("#Detail").val("");
  $("#Star").val("");
  $("#Image").val("");
  $("#Manufacturer").val("");
  $("#Category").val("");
}

// Hàm lấy tên ảnh

// Hàm xóa sản phẩm
function handleProductDelete(idDelete) {
  
  // Hiện hộp thoại confirm
  var confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
  if (confirmDelete) {
    // Tìm index của Product cần xóa theo id
    var indexPrductDelete = listProduct.findIndex((product) => product.id == idDelete);
    // Nếu không tìm thấy sản phẩm indexPrductDelete=-1

    if (indexPrductDelete !== -1) {
      // Xóa Product trong listProduct đang lưu ở JS
      // listProduct.splice(indexPrductDelete, 1);
      // Lưu lại listProduct vào LocalStorage
      // localStorage.setItem("listProduct", JSON.stringify(listProduct));
      // Call API Xóa Product
      var urlDelete = "http://localhost:3000/products/" + idDelete;
      $.ajax({
        type: "DELETE",
        url: urlDelete,
        // data: "data",
        // dataType: "dataType",
        success: function (response) {
          // Hiển thị lại dữ liệu
          fetchListProductAdmin();
          handleShowProduct()
        },
      });
      // Hiển thị lại dữ liệu
      // fetchListProductAdmin();
    } else {
      alert("Không thể xóa sản phẩm");
    }
  }
}
// // Hàm xử lý khi click vào nút Edit

// Hàm xử lý Reset trên Form Update
function handleResetUpdate() {
  $("#NameUpdate").val("");
  $("#PriceUpdate").val("");
  $("#InfoUpdate").val("");
  $("#DetailUpdate").val("");
  $("#StarUpdate").val("");
  $("#ImageUpdate").val("");
  $("#ManufacturerUpdate").val(0);
  $("#CategoryUpdate").val(0);
}

function handleUpdateProduct() {
  // idProductUpdate
  // Tìm index của sản phẩm cần Update trong mảng listProduct
  var index = listProduct.findIndex((product) => product.id == idProductUpdate);

  // Lấy dữ liệu từ các ô Input
  var v_Name = $("#NameUpdate").val();
  var v_Price = $("#PriceUpdate").val();
  var v_Info = $("#InfoUpdate").val();
  var v_Detail = $("#DetailUpdate").val();
  var v_Star = $("#StarUpdate").val();
  // Gọi hàm để lấy tên Ảnh
  var v_Image = getImageName($("#ImageUpdate").val());
  var v_Manufacturer = $("#ManufacturerUpdate").val();
  var v_Category = $("#CategoryUpdate").val();

  // console.log("v_Name", v_Name);
  // console.log("v_Price", v_Price);
  // console.log("v_Info", v_Info);
  // console.log("v_Detail", v_Detail);
  // console.log("v_Star", v_Star);
  // console.log("v_Image:", v_Image);
  // console.log("v_Manufacturer", v_Manufacturer);
  // console.log("v_Category", v_Category);

  // Thực hiện Update thông tin Sản phẩm
  listProduct[index].name = v_Name;
  listProduct[index].price = v_Price;
  listProduct[index].info = v_Info;
  listProduct[index].detail = v_Detail;
  listProduct[index].ratingStar = v_Star;
  // Kiểm tra nếu người dùng chọn lại ảnh thì mới Set dữ liệu mới
  // TH Người dùng không chọn lại ảnh sẽ lấy ảnh hiện tại của sản phẩm
  if (v_Image !== null && v_Image !== "") {
    listProduct[index].imageName = v_Image;
  }

  listProduct[index].manufacturerName = v_Manufacturer;
  listProduct[index].categoryName = v_Category;

  // Lưu lại dữ liệu vào LocalStorage
  // localStorage.setItem("listProduct", JSON.stringify(listProduct));

  // Call API
  // Kiểm tra xem người dùng có chọn lại ảnh hay không
  // Nếu không chọn lại thì lấy tên ảnh hiện tại
  if (v_Image == null || v_Image == "") {
    v_Image = listProduct[index].imageName;
  }
  // Thực hiện tạo productUpdate
  let productUpdate = {
    name: v_Name,
    price: v_Price,
    info: v_Info,
    detail: v_Detail,
    ratingStar: v_Star,
    imageName: v_Image,
    manufacturerName: v_Manufacturer,
    categoryName: v_Category,
  };
  // console.log("productUpdate: ", productUpdate);
  //
  let urlUpdate = "http://localhost:3000/products/" + idProductUpdate;
  $.ajax({
    type: "PUT",
    url: urlUpdate,
    data: JSON.stringify(productUpdate),
    // dataType: "dataType",
    contentType: "application/json; charset=UTF-8",
    success: function (response, status) {
      //  console.log("response:", response);
      //  console.log("status:", status);
      // Kiểm tra nếu status= success
      if (status === "success") {
        // Hiển thị lại dữ liệu sau Update
        fetchListProductAdmin();
      } else {
        console.log("Update Not Success!!");
      }
    },
  });
  // Reset Form Update
  handleResetUpdate();

  // Đóng Modal Update
  $("#ModalUpdateProduct").modal("hide");

  // Hiển thị lại dữ liệu sau Update
  fetchListProductAdmin();
}
