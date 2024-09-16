function createNewUser(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Lấy giá trị từ các trường nhập liệu
    var v_Email = document.getElementById('Email_ID').value;
    var v_Password = document.getElementById('Password_ID').value;
    var v_Re_Password = document.getElementById('Re_Password_ID').value;
    
    
    
    // Kiểm tra mật khẩu
    if (v_Password !== v_Re_Password) {
        alert("Mật khẩu không khớp");
        return;
    }
    
    // Tạo đối tượng người dùng
    var user = {
        Email: v_Email,
        Password: v_Password
    };
    
    // Chuyển đổi đối tượng người dùng thành JSON và lưu vào localStorage
    var json = JSON.stringify(user);
    localStorage.setItem('user', json);
    
    // Chuyển hướng đến trang đăng nhập
    window.location.href = 'login.html';
}

// Gán sự kiện submit cho form
document.getElementById('form-2').addEventListener('submit', createNewUser);



function loginSuccess() {
    
    var v_Email_Login_id = document.getElementById('Email_Login_id').value;
    var v_Password_Login_id = document.getElementById('Password_Login_id').value;
    var user = JSON.parse(localStorage.getItem('user')) ;// Get the value of the specified local storage item:


    if ((user.Email == v_Email_Login_id) && (user.Password == v_Password_Login_id)) {
        alert('Đăng nhập thành công')
        window.open('/Admin/AdminPage.html',  '_blank')
    }
    else {
        alert('Kiểm tra lại thông tin!!!')
    }
}


// function returnPageRegister() {
//     window.open('Admin/AdminPage.html',  '_blank')
// }
