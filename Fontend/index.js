const submitData = async () => { 
    
    let messageDom = document.getElementById('message');

    try {
        let fname = document.querySelector('input[name="firstname"]').value;
        let lname = document.querySelector('input[name="lastname"]').value;
        let age = document.querySelector('input[name="age"]').value;
        let desc = document.querySelector('textarea[name="description"]').value;

        let genderElement = document.querySelector('input[name="gender"]:checked');
        let gender = genderElement ? genderElement.value : "ไม่ได้ระบุ";

        let interests = [];
        // แก้เป็น "interests" ให้ตรงกับ HTML
        let hobbyElements = document.querySelectorAll('input[name="interests"]:checked'); 
        hobbyElements.forEach((item) => {
            interests.push(item.value);
        });

        let userData = {
            firstname: fname,
            lastname: lname,
            age: age,
            gender: gender,
            interests: interests.join(", "), 
            description: desc
        };

        console.log("กำลังส่งข้อมูล:", userData);

        const response = await axios.post('http://localhost:8000/users', userData);

        console.log("Response จาก Server:", response.data);
        
       
        messageDom.innerText = 'บันทึกข้อมูลสำเร็จ';
        messageDom.className = 'message success'; 

    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        
       
        messageDom.innerText = 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
        messageDom.className = 'message danger'; 
    }
}
