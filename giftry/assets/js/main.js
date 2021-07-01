// show the popup (dynamic)
function popup(selector) {
    $(".fixed-overlay").fadeIn(500)
    $(selector).delay(250).show(300)
}
// close the popup (dynamic)
function closePopup(selector) {
    $(".fixed-overlay").fadeOut(500)
    $(selector).delay(250).hide(300)
}
// quickview
// add to quickview
$(".quick_view").on("click", function () {
    popup(".quickviewBoxContainer");
    let productImg = $(this).parents(".item").find("img").attr("src")
    let productPrice = $(this).parents(".item").find(".price").text()
    let productAuthor = $(this).parents(".item").find(".author").text()
    let productName = $(this).parents(".item").find(".product-name").text()

    $(".quickviewImg img").attr("src", productImg)
    $(".quickName").text(productName)
    $(".quickPrice").text(productPrice)
    $(".quickAuthor").text(productAuthor)

})

// close quickview popup

$(".fixed-overlay,.quick-close").on("click", function () {
    closePopup(".quickviewBoxContainer")
})
// filter
$(".filter-btn").on("click",function(){
    popup(".filter-menu")
})
$(".fixed-overlay").on("click",function(){
    $(".lightBoxContainer").hide(500)
})

$(".f-col").on("click",function(){
    $(this).next().slideToggle(250)
    $(this).find(".filter-pluse").toggleClass("fa-plus")
    $(this).find(".filter-pluse").toggleClass("fa-minus")
})

// price range


function getVals(){
    // Get slider values
    let parent = this.parentNode;
    let slides = parent.getElementsByTagName("input");
      let slide1 = parseFloat( slides[0].value );
      let slide2 = parseFloat( slides[1].value );
    // Neither slider will clip the other, so make sure we determine which is larger
    if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }
    
    let displayElement = parent.getElementsByClassName("rangeValues")[0];
        displayElement.innerHTML = "$" + slide1 + " - $" + slide2;
  }
  
  window.onload = function(){
    // Initialize Sliders
    let sliderSections = document.getElementsByClassName("range-slider");
        for( let x = 0; x < sliderSections.length; x++ ){
          let sliders = sliderSections[x].getElementsByTagName("input");
          for( let y = 0; y < sliders.length; y++ ){
            if( sliders[y].type ==="range" ){
              sliders[y].oninput = getVals;
              // Manually trigger event first time to display values
              sliders[y].oninput();
            }
          }
        }
  }



// sort list
$(".sort-btn").on("click",function(){
    $(".sort-list").slideToggle(500)
})
$(".sort-list li").on("click",function(){
    let sort=$(this).text()
    $(".sort-btn span").eq(0).text(sort)
})