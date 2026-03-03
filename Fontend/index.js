const submitData = async () => {

    let firstnameDOM = document.querySelector('input[name="firstname"]');
    let lastnameDOM = document.querySelector('input[name="lastname"]');
    let ageDOM = document.querySelector('input[name="age"]');
    let genderDOM = document.querySelector('input[name="gender"]:checked');
    let interestDoms = document.querySelectorAll('input[name="interests"]:checked');
    let descriptionDOM = document.querySelector('textarea[name="description"]');
    let messageDOM = document.getElementById('message');

    let interest = '';
    for (let i = 0; i < interestDoms.length; i++) {
        interest += interestDoms[i].value;
        if (i !== interestDoms.length - 1) {
            interest += ', ';
        }
    }

    let userData = {
        firstname: firstnameDOM.value,
        lastname: lastnameDOM.value,
        age: ageDOM.value,
        gender: genderDOM ? genderDOM.value : '',
        description: descriptionDOM.value,
        interests: interest
    };

    try {
        const response = await axios.post('http://localhost:8000/users', userData);
        console.log('Response :', response.data);

        messageDOM.innerText = "บันทึกข้อมูลสำเร็จ";
        messageDOM.className = "message success";

    } catch (error) {

        if (error.response) {
            console.log('Error response :', error.response.data.message);
        }

        messageDOM.innerText = "เกิดข้อผิดพลาดในการบันทึกข้อมูล";
        messageDOM.className = "message danger";
    }

    console.log('submitData :', userData);
}
