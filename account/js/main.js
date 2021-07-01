$(".lists li").on("click", function(){
    var dataShow=$(this).data("show")
    $(".accountPage").css("display", "none")
    $(`.${dataShow  }`).css("display","block")
})