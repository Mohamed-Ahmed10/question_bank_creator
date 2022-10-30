// edit to get from local storage ? : of empty CREATE EVERY ARRAY ONLY  

var questionsArr = [],
    answersArr = [],
    statusArr = [],
    data = (localStorage.getItem("data")) ? localStorage.getItem("data") : [questionsArr, answersArr, statusArr];


//variables get elements from HTML
var tableContainer = document.querySelector("#table_container"),
    questionInputForm = document.querySelector("form"),
    questionInput = document.getElementById("question"),
    answerOneInput = document.getElementById("answer_one_input"),
    answerOneState = document.getElementById("answer_one_state"),
    answerTwoInput = document.getElementById("answer_two_input"),
    answerTwoState = document.getElementById("answer_two_state"),
    answerThreeInput = document.getElementById("answer_three_input"),
    answerThreeState = document.getElementById("answer_three_state"),
    answerFourInput = document.getElementById("answer_four_input"),
    answerFourState = document.getElementById("answer_four_state");


//delete all button creation
var deleteAllBtn = document.createElement("button");

    deleteAllBtn.className = "btn";
    deleteAllBtn.classList.add("btn-danger");
    deleteAllBtn.classList.add("btn-lg");
    deleteAllBtn.classList.add("btn-block");
    deleteAllBtn.append("Delete All");

    //delete all questions 

    deleteAllBtn.onclick = function()
    {   tableContainer.innerHTML ="" ;
        this.remove();
    }


function createTable() {
    let table = document.createElement("table"),
        deleteBtn = document.createElement("button"),

        tHead = document.createElement("thead"),
        trQuestion = document.createElement("tr"),
        thQuestion = document.createElement("th"),

        tBody = document.createElement("tbody"),

        trAnswerOne = document.createElement("tr"),
        thAnswerOne = document.createElement("th"),

        trAnswerTwo = document.createElement("tr"),
        thAnswerTwo = document.createElement("th"),

        trAnswerThree = document.createElement("tr"),
        thAnswerThree = document.createElement("th"),

        trAnswerFour = document.createElement("tr"),
        thAnswerFour = document.createElement("th");


    // add classes to the table
    table.classList.add("table");
    table.classList.add("table-striped");
    table.classList.add("table-dark");

    //appending orderd as HTML tags
    tableContainer.appendChild(table);
    tableContainer.appendChild(deleteAllBtn);

    

    table.appendChild(tHead);
    tHead.appendChild(trQuestion);
    trQuestion.appendChild(thQuestion);
    thQuestion.innerHTML = questionInput.value;

    table.appendChild(tBody);

    tBody.appendChild(trAnswerOne);
    trAnswerOne.appendChild(thAnswerOne);
    thAnswerOne.innerHTML = answerOneInput.value;

    tBody.appendChild(trAnswerTwo);
    trAnswerTwo.appendChild(thAnswerTwo);
    thAnswerTwo.innerHTML = answerTwoInput.value;

    tBody.appendChild(trAnswerThree);
    trAnswerThree.appendChild(thAnswerThree);
    thAnswerThree.innerHTML = answerThreeInput.value;

    tBody.appendChild(trAnswerFour);
    trAnswerFour.appendChild(thAnswerFour);
    thAnswerFour.innerHTML = answerFourInput.value;

    table.appendChild(deleteBtn);
    deleteBtn.className = "btn";
    deleteBtn.classList.add("btn-danger");
    deleteBtn.classList.add("btn-lg");
    deleteBtn.classList.add("btn-block");
    deleteBtn.append("Delete")


    deleteBtn.onclick = function()
    {
        this.parentElement.remove();
    };

    

}

questionInputForm.onsubmit = function (event) {
    "use stricted";
    event.preventDefault();

    // check data
    if(questionInput.value == "" ||answerOneInput.value == "" ||answerTwoInput.value  == "" ||answerThreeInput.value  == "" ||answerFourInput.value == "")
    {
        alert("Sorry you must fill al fields ");
    }

    else if(answerOneState.value != "true" && answerTwoState.value != "true" && answerThreeState.value != "true" && answerFourState.value != "true")
    {
        alert("Sorry one of the answers must be true")
    }
    else
    {
        setData();
        createTable();
        addQuestion();
        chooseRightAnswer();
        emptyFields();        
    }
}


/////////////////////////////////////////////////*edit */////////////////////////////////// */
setData = function () {

    //this function get data in local storage

    questionsArr.push(questionInput.value);
    answersArr.push(answerOneInput.value, answerTwoInput.value, answerTwoInput.value, answerFourInput.value);
    statusArr.push(answerOneState.value, answerTwoState.value, answerThreeState.value, answerFourState.value)

    localStorage.setItem("data", data);

}
/////////////////////////////////////////////////*edit */////////////////////////////////// */


emptyFields = function()
{
    let myInputs = document.getElementsByTagName("input"),
        myStatus = document.getElementsByTagName("select");

        for (let index = 0; index < myInputs.length; index++)
        {
            const element = myInputs[index];
            element.value = "";
        }
        for (let index = 0; index < myStatus.length; index++) {
            const element = myStatus[index];

            element.value = "false"
            
        }

}


/********************************* UPDATE 20/5/2021 **********************************/

const renderQuestions = async () =>
{
    let uri = "http://localhost:3000/questions";

    const res = await fetch(uri);
    var questions = await res.json();

    // localStorage.setItem("data2" , );

    // console.log(JSON.stringify(questions))
    
    let template = "" ;

    questions.forEach(question =>{
        template +=`
        <table class="table table-striped table-dark">
            <thead>
                <tr>
                    <th>${question.title}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>${question.answer_one}</th>
                </tr>
                <tr>
                    <th>${question.answer_two}</th>
                </tr>
                <tr>
                    <th>${question.answer_three}</th>
                </tr>
                <tr>
                    <th>${question.answer_four}</th>
                </tr>
            </tbody>
        </table>
        `
    });

    tableContainer.innerHTML = template ;
    deleteAllBtn.onclick = function()
    {
        this.parentElement.remove();
    };
}

window.addEventListener('DOMContentLoaded' , () => renderQuestions())

//add new question to json file

const addQuestion = async(e) => 
{

    const doc = {
        title : questionInputForm.question.value,
        answer_one : questionInputForm.answer_one.value,
        answer_one_state : questionInputForm.answer_one_state.value,
        answer_two : questionInputForm.answer_two.value,
        answer_two_state : questionInputForm.answer_two_state.value,
        answer_three : questionInputForm.answer_three.value,
        answer_three_state : questionInputForm.answer_three_state.value,
        answer_four : questionInputForm.answer_four.value,
        answer_four_state : questionInputForm.answer_four_state.value,
    };

    
    await fetch("http://localhost:3000/questions",
    {
        method : 'POST',
        body : JSON.stringify(doc),
        headers : {'Content-Type' : ' application/json'}
    });
}



// correct answer
//delete all shown when db has value only 
// delete all to empty the db json file
// delete the question from db as deleteds