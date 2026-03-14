const BASE_URL = 'http://localhost:8000';

let mode = 'CREAT'
let selectedId=''
window.onload = async () =>{
    const urlParms = new URLSearchParams(window.location.search);
    const id= urlParms.get('id');
    console.log('id',id);
        if (id){
            mode = 'EDIT';
            selectedId = id;

            //1.ดึงข้อมูล user ออกมา
             
            try{
                const response = await axios.get(`${BASE_URL}/users/${id}`);
                    console.log('response,response.data');
                    let firstNameDOM = document.querySelector('input[name=firstname]');
                    let lastNameDOM = document.querySelector('input[name=lastname]');
                    let ageDOM = document.querySelector('input[name=age]');
                    let genderDOM = document.querySelector('input[name=gender]:checked') || {};

                    firstNameDOM.value =user.firstName;
                    lastNameDOM.value = user.lastName;
                    ageDOM.value = userInfo.age;
                    descriptionDOM.value=userInfo.description;


                    //2. นำข้อมูลที่ได้มาเเสดงใน form
                    let interestDOMs = document.querySelectorAll('input[name=gender]') 
                    let descriptionDOM = document.querySelectorAll('input [name=intersts]');
                    for (let i = 0;i< genderDOM.length; i++){
                        if (genderDOM[i].value == userInfo.gender){
                            genderDOM[i].checked = true;
                        }
                    }
            }catch(error){
                console.error('Error fetching user data: ',error);
            }
            

        }
}
const validateData = (userData) => {
    let errors = [];
    if (!userData.firstName) {
        errors.push('กรุณากรอกชื่อ');
    }
    if (!userData.lastName) {
        errors.push('กรุณากรอกนามสกุล');
    }
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    }
    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }
    if (!userData.interests) {
        errors.push('กรุณาเลือกงานอดิเรกไอควาย');
    }
    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบายด้วยไอโง่');
    }
    return errors;
}

const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name=firstname]');
    let lastNameDOM = document.querySelector('input[name=lastname]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked') || {};
    let interestDOMs = document.querySelectorAll('input[name=interests]:checked') || {};
    let descriptionDOM = document.querySelector('textarea[name=description]');

    let messageDOM = document.getElementById('message')
    try {
        let interest = ''
        for (let i = 0; i < interestDOMs.length; i++) {
            interest += interestDOMs[i].value
            if (i != interestDOMs.length - 1) {
                interest += ','
            }
        }

        let userData = {
            firstName: firstNameDOM.value,
            lastName: lastNameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            description: descriptionDOM.value,
            interests: interest
        }
        console.log('submitData', userData);
        
        let message ='บันทึกข้อมูลสำเร็จ';
        if (mode ==='create'){
            const response = await axios.post(`${BASE_URL}/user`,userData)
            console.log('response',response.data);

        }else if (mode === 'edit'){
            const response = await axios.put(`${BASE_URL}/users/${selectedId}`,userData);
            message = 'เเก้ไขข้อมูลสำเร็จ';
            console.log('response',response.data);
        }


        const response = await axios.post(`${BASE_URL}/users`, userData);
        console.log('response', response);
        messageDOM.innerText = 'บันทึกข้อมูลสำเร็จ';
        messageDOM.className = 'message success';
    } catch (error) {
        console.log('error message', error.message);
        console.log('error', error.errors);
        if (error.response) {
            console.log('error rosponse', error.response);
            error.message = error.response.data.message;
            error.errors = error.response.data.errors;   
        }

        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>`;
        htmlData += '<ul>';
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`;
        }
        htmlData += '</ul>';
        htmlData += '</div>';


        messageDOM.innerHTML = htmlData;
        messageDOM.className = 'message danger';
    }
}
