/*
&& และ
||หรือ
! not หรือ ไม่ 
*/
/*
let number1 =5  
let number2 =8
// 
let condition = !(number1 >= 3 || number2 >=10);
console.log("condition :", condition);

let age =30
let gender=" ชาย"

if (age >= 20 && gender == "ชาย "){
    console.log(" ผู้ชายที่มีอายุ 20 ปีขึ้นไป ");
}
*/
/*
let number = 20 
if (number %2 !=0){
    console.log("เป็นเลขคู่")
}
*/

/*
loop 
while
for
*/
/*let counter = 0;
while(counter < 10){
    console.log('Hello World');
    //counter = counter+1;
    counter+= 1;
}
for(let i=0; i<10;i++){
    console.log('Hello World from for loop');
}
*/


/**********array
*************/
/*let a = 10
let b = 20
let c = 30
console.log('a :', a, 'b :', b, 'c :', c);

let ages = [10,20,30,] // array 3 item
console.log('ages :', ages);
console.log('ages[1] :', ages[1]);

//1.แทนที่ ค่าข้อมูลใน array
ages=[15,25]
console.log('ages list:', ages);
//2.ต่อ array
ages.push(35);
console.log('ages after push:', ages);
//3.ลบ item ตัวสุดท้ายใน array
ages.pop();
console.log('ages after pop:', ages);
*/

/*
let ages = [10,20,30,40,50]
if (ages.includes(30)){//true
    console.log('ages 30 is found in the array');
}
let fruits = ['apple', 'banana', 'cherry'];
console.log('fruits:', fruits);
fruits.push('mango')
console.log('fruits after push:', fruits);
console.log('firstfruits:', fruits.length);

for(let i=0; i<fruits.length; i++){
    console.log('fruits at index ${i}:', fruits[i]);
}
*/

/*opject
*/
/*
let student = [{
    age: 30,
    name: "John",
    grade: "A"
},{
    age: 25,
    name: "Jane",
    grade: "B"
}]
for (let i=0; i<student.length; i++){
console.log("student"+(i+1)+":");
console.log('name:',+ student[i].name);
console.log('age:',+ student[i].age);
console.log('grade:',+student[i].grade);
}

student.push({
    age: 28,
    name: "Mike",
    grade: "C"
})
console.log('add new student:', student[student.length -1]);
 
student.pop();
console.log('remove last student. current students:', student);
*/

/*
function 
*/

/*
let score1 = 10;
let score2 = 80;

function calculation_grade(score){

  if (score >=80){
    grade ='A'
 }else if (score1 >=70){
    grade ='B'
 }else if (score1 >=60){
    grade ='C'
 }else if (score1 >=50){
    grade ='D'
 }else{
    grade ='F'
 }
    return grade;
}
let grade1 = calculation_grade (score1);
let grade2 = calculation_grade (score2);
console.log('score1:', +score1, 'grade1:', +grade1);
console.log('score2:', +score2, 'grade2:', +grade2);
*/

/*array 
*/
/*
let scores = [90, 80, 70, 60, 50];

for (let i=0; i<scores.length; i++){
    console.log(`score ${i+1}: ${scores[i]}`);
}
        
scores = scores.map((s) => {
    return s-10;
});
scores.forEach((s)=>{
    console.log('score:', s);
    //console.log(`score: ${s}`);
})
*/
//map , filter
/*
let scores = [90, 80, 70, 60, 50];

for(let i=0; i<scores.length; i++){
    console.log(scores[i]);
    //if (scores[i] >=60){
    //newscores.push(scores[i]);
    //}
}
let newscores=scores.filter(function(score) {
    return score >=70;
});
newscores.forEach((ns)=>{
    console.log('newscores:', ns);
})
/*

/*object function
*/
let student = [
    {name: "John", age: 20, grade: "A"},
    {name: "Jane", age: 22, grade: "B"},
    {name: "Mike", age: 21, grade: "C"}
]
console.log('student',student[0]);

let tudent= student.find((s)=>{
    if (s.name === "Jane"){
        return true;
    }
})
let dublescorestudent = student.map((s)=>{
    s.age = s.age *2;
    return s;
});
let highgradestudent= student.filter((s)=>{
    return s.grade === "A";
});
console.log('student', student)
console.log('find student:', tudent);
console.log('dublescorestudent:', dublescorestudent);
console.log('highgrade student',highgradestudent); 
