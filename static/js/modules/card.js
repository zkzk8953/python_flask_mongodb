const http = new HttpService("localhost/5000");

let isVisible = false;
let editTargetId = "";

/**
 * 기본 템플릿 render
 */
const render = () => {
    let template = `
    <div class="jumbotron">
        <h1 class="display-4">나홀로 링크 메모장!</h1>
        <p class="lead">중요한 링크를 저장해두고, 나중에 볼 수 있는 공간입니다.</p>
        <hr class="my-4">
        <button id="toggle" onclick="toggleBox()" class="btn btn-primary btn-sm" type="button">포스팅 박스 열기</button>
    </div>
    <div id="box" class="justify-content-center align-items-center d-flex"></div>
    <div id="cards-box" class="card-columns mt-4"></div>
    `;

    $(".wrap").append(template);
}

/**
 * 카드 목록 불러오기
 */
const getCards = async () => {
    const res = await http.request("/card", "GET");

    if(res.status == 200) {
        res.data.forEach((card, index) => {
            let template = `
            <div id="${card._id}" class="card">
                <img src="${card.image}" class="card-img-top" alt="${card.title}">
                <div class="card-body">
                    <h5 class="card-title"><a class="text-warning" href="${card.url}">{{${card.title}}}</a></h5>
                    <p class="card-text">${card.desc}</p>
                    <div class=" text-right">
                        <button type="button" onclick="toggleBox('true', '${card._id}', '${card.url}', '${card.comment}')" class="btn btn-primary">수정</button>
                        <button type="button" onclick="deleteCards('${card._id}')" class="btn btn-primary">삭제</button>
                    </div>
                </div>
            </div>
            `;

            $("#cards-box").append(template);
        });
    }else {
        alert("[error occured!!]", res)
    }
}

/**
 * 새카드 추가
 * @param {*} url 
 * @param {*} comment 
 */
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

/**
 * 카드 수정
 * @param {*} id 
 */
const editCards = async (id, url, comment) => {
    const res = await http.request("/card", "PUT", { id: id, url: url, comment: comment });

    if(res.status == 200) {
        alert(res.message);
        location.reload();
    }else {
        alert("에러 발생");
        console.log(res);
    }
}

/**
 * 카드 삭제
 */
const deleteCards = async (id) => {
    const res = await http.request("/card", "DELETE", { id: id });

    if(res.status == 200) {
        alert(res.message);
        location.reload();
    }else {
        alert("에러 발생");
        console.log(res);
    }
}

/**
 * 포스팅박스 토글 
 * @param {*} isEdit 
 * @param {*} id 
 */
const toggleBox = (isEdit = false, id, url, comment) => {
    let template = `
    <div id="inputBox" class="w-50 p-3 border rounded">
        <div class="form-group">
            <label for="exampleInputEmail1">아티클 URL</label>
            <input id="article" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">간단 코멘트</label>
            <textarea id="comment" class="form-control"></textarea>
        </div>
        <button id="submitBtn" onclick="submit('${isEdit ? 'edit' : 'create'}')" type="button" class="btn btn-primary">${isEdit ? "수정" : "등록"}</button>
    </div>
    `;

    if(isVisible) {
        $("#box").empty();
        $("#toggle").text("포스팅 박스 열기");
    }else {
        $("#box").append(template);
        $("#toggle").text("포스팅 박스 닫기");

        $("html, body").animate({ scrollTop: $("#box").offset().top }, 500);

        if(isEdit) {
            $("#article").val(url);
            $("#comment").val(comment);
            editTargetId = id;
        }else {
            $("#article").val("");
            $("#comment").val("");
        }
    }

    isVisible = !isVisible;
}

/**
 * submit
 * @param {*} type 
 * @param {*} url 
 * @param {*} comment 
 */
const submit = (type) => {
    let url = $("#article").val();
    let comment = $("#comment").val();

    if(type === "create") {
        postCards(url, comment);
    }else if(type === "edit") {
        editCards(editTargetId, url, comment);
    }

}