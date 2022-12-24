let newsSliderSlide = 2;
let newsSliderLinePos = innerWidth / 2 - 1162.5;
let slider2MaximunWidth;
let slider2StartPos = innerWidth * 0.07;
$("#avatar").click(function () {
    document.getElementById("loginDropDown").classList.toggle("loginDropDownActive");
});

function sliderEffect() {
    console.log(newsSliderLinePos)
    if (newsSliderSlide == 1) {
        $(".imgText").css("opacity", "0");
        $("#imgTextSlide1").css("opacity", "1");
        $(".slider__iteam").css("opacity", "0.5");
        $("#slider__iteam1").css("opacity", "1");
        $(".circle__border").css("border", "none");
        $("#slide1Circle").css("border", "1px solid #fff");
        $(".circle").css("backgroundColor", "#7b797c");
        $("#circle1").css("backgroundColor", "#fff");
    } else if (newsSliderSlide == 2) {
        $(".imgText").css("opacity", "0");
        $("#imgTextSlide2").css("opacity", "1");
        $(".slider__iteam").css("opacity", "0.5");
        $("#slider__iteam2").css("opacity", "1");
        $(".circle__border").css("border", "none");
        $("#slide2Circle").css("border", "1px solid #fff");
        $(".circle").css("backgroundColor", "#7b797c");
        $("#circle2").css("backgroundColor", "#fff");
    } else if (newsSliderSlide == 3) {
        $(".imgText").css("opacity", "0");
        $("#imgTextSlide3").css("opacity", "1");
        $(".slider__iteam").css("opacity", "0.5");
        $("#slider__iteam3").css("opacity", "1");
        $(".circle__border").css("border", "none");
        $("#slide3Circle").css("border", "1px solid #fff");
        $(".circle").css("backgroundColor", "#7b797c");
        $("#circle3").css("backgroundColor", "#fff");
    }
}
$("#slide1Circle").click(function () {
    document.querySelector(".slider__line").style.left = "297px";
    newsSliderSlide = 1;
    sliderEffect();
});
$("#slide2Circle").click(function () {
    document.querySelector(".slider__line").style.left = "-478px";
    newsSliderSlide = 2;
    sliderEffect();
});
$("#slide3Circle").click(function () {
    document.querySelector(".slider__line").style.left = "-1253px";
    newsSliderSlide = 3;
    sliderEffect();
});
$("#newsSliderArrowLeft").click(function () {
    newsSliderSlide--;
    if (newsSliderSlide < 1) {
        newsSliderSlide = 1
        newsSliderLinePos = newsSliderLinePos - document.querySelector(".slider__iteam").clientWidth - 25;
    };
    newsSliderLinePos += document.querySelector(".slider__iteam").clientWidth + 25;
    console.log(newsSliderSlide);
    document.querySelector(".slider__line").style.left = newsSliderLinePos + "px";
    sliderEffect();
    console.log(newsSliderLinePos)
})
$("#newsSliderArrowRight").click(function () {
    newsSliderSlide++;
    if (newsSliderSlide > 3) {
        newsSliderSlide = 3;
        newsSliderLinePos = newsSliderLinePos + document.querySelector(".slider__iteam").clientWidth + 25;
    };
    newsSliderLinePos -= document.querySelector(".slider__iteam").clientWidth + 25;
    console.log(newsSliderSlide)
    document.querySelector(".slider__line").style.left = newsSliderLinePos + "px";
    sliderEffect();
    console.log(newsSliderLinePos)
});

function gamesWidthCount() {
    let count = -1;
    let iteamsOfSlider = document.querySelectorAll(".gameCardsSliderLine__iteam");
    for (iteams of iteamsOfSlider) {
        count++;
    }
    return count * 239 - innerWidth * 0.07;
}
console.log(gamesWidthCount())
$("#slider2ArrowLeft").click(function () {
    if (slider2StartPos + 1 <= innerWidth * 0.07) {
        slider2StartPos += document.querySelector(".gameCardsSliderLine__iteam").clientWidth + 20;
        console.log(slider2StartPos)
        document.querySelector(".gameCardsSliderLine").style.left = slider2StartPos + "px";
    }
});
$("#slider2ArrowRight").click(function () {
    if (slider2StartPos + gamesWidthCount() - 1 >= 0) {
        slider2StartPos -= document.querySelector(".gameCardsSliderLine__iteam").clientWidth + 20;
        console.log(slider2StartPos)
        document.querySelector(".gameCardsSliderLine").style.left = slider2StartPos + "px";
    }
});
$(".backgroundMask").hide(0);
$("#logIn").click(function () {
    document.getElementById("loginDropDown").classList.remove("loginDropDownActive");
    $(".backgroundMask").show(300);
});
$("#close").click(function () {
    $(".backgroundMask").hide(300);
});
let users = JSON.parse(localStorage.getItem('USERS')) || [];
document.getElementById("SignUp").onclick = function () {
    users.push({
        login: loginInp.value,
        password: passwordInp.value
    });
    localStorage.USERS = JSON.stringify(users);
    $(".backgroundMask").hide(0)
    $(".inp").val("")
}
let entry = false;
$('#SignIn').click(function () {
    let candidate = {
        login: loginInp.value,
        password: passwordInp.value
    };
    for (let el of users) {
        if (el.login == candidate.login && el.password == candidate.password) {
            entry = true;
        }
    }
    if (entry == true) {
        $(".backgroundMask").hide(0);
        alert("Hello" + " " + candidate.login);
        if (candidate.login == "admin" && candidate.password == "1234") {
            $(".addGame").css("display", "flex");
        } else {
            $(".addGame").css("display", "none");
        }
    }
    $(".inp").val("")
})
$(".addGame").click(function () {
    $(".addGameBackground").show(300);
});

function getPrice(a) {
    if (a <= 0) return "Free";
    else return "$" + a;
}

function gameInfoChange(e) {
    let background = $(`.gameCardsSliderLine__iteam:nth-child(${GetTargetNunber(e)})`).css("backgroundImage");
    $(".gameMomentsSlider").css("backgroundImage", background)
    $("#gameNameTitle").text($(`.gameCardsSliderLine__iteam:nth-child(${GetTargetNunber(e)}) .gameName`).text());
    $("#aboutGame").text("About " + $(`.gameCardsSliderLine__iteam:nth-child(${GetTargetNunber(e)}) .gameName`).text() + ":");
    $(".download").text("Download for " + $(`.gameCardsSliderLine__iteam:nth-child(${GetTargetNunber(e)}) .gamePrice`).text());
    $(".gameInfoBackground").show(300);
}
$(".save").click(function () {
    if ($("#imageUrl").val() != "" || $("#imageFile").val() != "" && $(".gamePrice").val() != "" && $(".gameName").val() != "") {
        let gameImgFile = "";
        if ($("#imageUrl").val() == "" && $("#imageFile").val() != "") {
            let file = document.getElementById("imageFile").files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let readerResult;
            reader.onload = function () {
                readerResult = reader.result;
                gameImgFile = readerResult;
            }
        } else if ($("#imageUrl").val() != "" && $("#imageFile").val() == "") {
            gameImgFile = $("#imageUrl").val();
        } else if ($("#imageUrl").val() != "" && $("#imageFile").val() != "") {
            gameImgFile = $("#imageUrl").val();
        }
        setTimeout(function () {
            $(".gameCardsSliderLine").prepend(`<div style="background-image: url('${gameImgFile}')" class="gameCardsSliderLine__iteam">
            <div class="gameInfo">
                <span class="gameName">${$(".gameName").val()}</span>
                <span class="gamePrice">${getPrice($(".gamePrice").val())}</span>
            </div>
        </div>`);
            $(".addGameBackground").hide(300);
            $(".gameCardsSliderLine .gameCardsSliderLine__iteam").css("margin", "0 10px");
            $(".gameCardsSliderLine .gameCardsSliderLine__iteam:first-child").css("margin-left", "0");
            $("#imageUrl").val("");
            $(".gamePrice").val("");
            $(".gameName").val("");
            $("#imageFile").val("");
            $(".gameCardsSliderLine__iteam").mouseenter(function (e) {
                $(`.gameCardsSliderLine__iteam:nth-child(${GetTargetNunber(e)}) .gameInfo`).css("opacity", "1");
            });
            $(".gameCardsSliderLine__iteam").mouseleave(function (e) {
                $(`.gameCardsSliderLine__iteam:nth-child(${GetTargetNunber(e)}) .gameInfo`).css("opacity", "0");
            });
            $(".gameCardsSliderLine__iteam").click(function (e) {
                gameInfoChange(e);
            });
        }, 300);
    }
});
$("#AddGameClose").click(function () {
    $(".addGameBackground").hide(300);
});
$(".addGameBackground").hide(0);
$(".gamePrice").on("change", function () {
    if ($(".gamePrice").val() <= 0) {
        $(".gamePrice").val(0);
    }
});

function GetTargetNunber(a) {
    let all = document.querySelectorAll(".gameCardsSliderLine__iteam");
    let target = a.target;
    let countAll = 0;
    let targetCount = 0;
    for (one of all) {
        countAll++;
        if (one == target) {
            targetCount = countAll;
        }
    }
    return targetCount;
}
$(".gameCardsSliderLine__iteam").mouseenter(function (e) {
    $(`.gameCardsSliderLine__iteam:nth-child(${GetTargetNunber(e)}) .gameInfo`).css("opacity", "1");
});
$(".gameCardsSliderLine__iteam").mouseleave(function (e) {
    $(`.gameCardsSliderLine__iteam:nth-child(${GetTargetNunber(e)}) .gameInfo`).css("opacity", "0");
});
$(".gameInfoBackground").hide(0);
$(".gameCardsSliderLine__iteam").click(function (e) {
    gameInfoChange(e);
});
$(".closeGameInfo").click(function () {
    $(".gameInfoBackground").hide(300);
});