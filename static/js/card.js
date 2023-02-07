
const http = new HttpService("localhost/5000");

function getCards() {
    http.request("/card", "GET")
    .done((res) => {
        return res;
    })
    .fail((err) => {
        return err;
    });
}

function postItem(data) {
    http.request("/card", "POST", data)
    .done((res) => {
        return res;
    })
    .fail((err) => {
        return err;
    });
}

$(document).ready(function() {

    const res = getCards();

    if(res) {
        console.log(res);
    }

    let isVisible = false;

    $("#toggle").click(function() {
        if(!isVisible) {
            $("#inputBox").removeClass("d-none");
            $(this).text("포스팅 박스 닫기"); 
            isVisible = true;
        }else {
            $("#inputBox").addClass("d-none");
            $(this).text("포스팅 박스 열기"); 
            isVisible = false;
        }
    });

    $("#submitBtn").click(function() {
        let article = $("#article").val();
        let comment = $("#comment").val();

        postItem({article: article, comment: comment});
    });
});