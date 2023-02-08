const http = new HttpService("localhost/5000");

let isVisible = false

function init() {
    initEvents();
    getCards();
}

const getCards = async () => {
    const res = await http.request("/card", "GET");

    if(res.status == 200) {
        res.data.forEach(card => {
            $("#cards-box").append(`
            <div class="card">
                <img src="${card.image}" class="card-img-top" alt="${card.title}">
                <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text">${card.desc}</p>
                </div>
            </div>
            `);
        });
    }else {
        alert("[error occured!!]", res)
    }
}

const postCards = async (url, comment) => {
    const res = await http.request("/card", "POST", { url: url, comment: comment });

    if(res.status == 200) {
        alert(res.message);
        location.reload();
    }else {
        alert("에러 발생");
        console.log(res);
    }
}

const editCards = async (id, card) => {
    const res = http.request("/card", "PUT");

    console.log(res);
}

const deleteCards = async () => {
    const res = http.request("/card", "DELETE");

    console.log(res);
}

function toggleBox() {
    if(isVisible) {
        $("#box").removeClass("d-flex").addClass("d-none");
        $("#toggle").text("포스팅 박스 열기");
    }else {
        $("#box").removeClass("d-none").addClass("d-flex");
        $("#toggle").text("포스팅 박스 닫기");
    }

    $("#article").val("");
    $("#comment").val("")
    isVisible = !isVisible;
}

function initEvents() {
    $("#toggle").click(function() {
        toggleBox();
    });

    $("#submitBtn").click(function() {
        let url = $("#article").val();
        let comment = $("#comment").val();

        postCards(url, comment)
        toggleBox();
    });
}
