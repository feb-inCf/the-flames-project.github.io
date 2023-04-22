let flameArray = ["Friend", "Love", "Attraction", "Marriage", "Enemy", "sister"];
const flamesDescription = [
    "is your friend, so better treat him/her like one",
    "is your love, take care of him/her.",
    "is just an attraction, get over it already.",
    "and you are gonna get married...",
    "is your Enemy, show him/her no mercy"
];
const firstPerson = document.getElementById("fname");
const secondPerson = document.getElementById("sname");
const flamesForm = document.querySelector(".flames-form");


const resultImage = document.querySelector(".flame-image");
const resultContent = document.querySelector(".flames-result");



function findFlameNumber(fname, sname) {

    let flameCount = fname.length + sname.length;

    for (let i=0; i<fname.length; i++) {
        for (let j=0; j<sname.length; j++) {

            if (fname.charAt(i) == sname.charAt(j)) {
                flameCount -= 2;
                sname = skipWord(sname, j);
                break;
            }
        }
    }

    return flameCount;
}


function skipWord(word, position) {

    let name = "";
    for (let i=0; i<word.length; i++) {
        if (i == position) {
            continue
        }

        name += word.charAt(i);
    }

    return name;
}



function checkName(name) {
    newName = ""
    for (let i=0; i<name.length; i++) {

        if (name.charAt(i) == " ")
        {
            continue;
        }
        newName += name.charAt(i);
    }

    return newName;
}


function restart() {
    resultImage.src = "./assets/donothing.jpg";
    resultContent.textContent = "Play and find out what awaits for you";
}

function getFlameResult(number) {
    let index = 0;
    while (flameArray.length > 1) {
        index = (index + ( number - 1 )) % flameArray.length;
        flameArray.splice(index, 1);
    }

    return flameArray[0];
}


function flameSubmit(e) {
    e.preventDefault();

    const firstName = checkName(firstPerson.value).toLowerCase();
    const secondName = checkName(secondPerson.value).toLowerCase();
    const sn = secondPerson.value;
    const flameNumber = findFlameNumber(firstName, secondName);

    const result = getFlameResult(flameNumber);
    flameArray = ["Friend", "Love", "Attraction", "Marriage", "Enemy", "sister"];
    const resultIndex = flameArray.indexOf(result);


    if (result == "Love" || result == "Sister" || result == "Marriage")
    {
        resultContent.classList.add("light");
    }else
    {
        try{
            resultContent.classList.remove("light");
        }catch(e) {}
    }

    resultImage.src = `./assets/${result}.jpg`;
    resultContent.textContent = `${sn} ${flamesDescription[resultIndex]}`;

    firstPerson.value = "";
    secondPerson.value = "";

}

restart();
flamesForm.addEventListener("submit", (e) => flameSubmit(e));