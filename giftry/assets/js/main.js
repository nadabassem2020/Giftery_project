// define variables

let wishcontent = "";
let wishlistItems = JSON.parse(localStorage.getItem("wish"));
let wishId = parseInt(localStorage.getItem("wishId"))



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
// add to cart function



// clear cart (dynamic)
function clear(arr) {
    arr.length = 0
    displaytheproducts()
    localStorage.setItem("cart", JSON.stringify(arr))
}
// count items in cart (dynamic)
function countCartItems(arr) {
    let count = 0;
    arr.map(item => {
        count += item.qauntity
    })
    return count;
}
// increase quantity



// open the wishlist popup
$("#fav").on("click", function () {
    popup(".wishlist-lightbox")
})






// wishlist
// open wishlist popup 
$("#wishlist").on("click", function () {
    popup(".wishlist-lightbox");
})
// add to wishlist
$(".fav").on("click", function () {
    // open wishlist popup 
    if (wishlistItems == null || wishlistItems.length == 0) {
        wishlistItems = []
        wishId = 1
    }

    $(this).toggleClass("checked")
    popup(".wishlist-lightbox");
    let productImg = $(this).parents(".item").find("img").attr("src")
    let productPrice = $(this).parents(".item").find(".price").text()
    let productAuthor = $(this).parents(".item").find(".author").text()
    let productName = $(this).parents(".item").find(".product-name").text()
    product = {
        productName: productName,
        productAuthor: productAuthor,
        productImg: productImg,
        productPrice: productPrice,
        qauntity: 1,
        id: wishId
    }

    if ($(this).hasClass("checked") == true) {
        wishlistItems.push(product)
        wishId++

    } else {
        wishlistItems.map((item,i)=>{
            if(product.productName==item.productName){
                wishlistItems.splice(i, 1)
        console.log(wishlistItems.indexOf(product))
            }
        })
    }
    localStorage.setItem("wish", JSON.stringify(wishlistItems))
    localStorage.setItem("wishId", JSON.stringify(wishId))
    displayWishList()
})

// display the added items

function displayWishList() {
    if (wishlistItems == null || wishlistItems.length == 0) {
        wishlistItems = []
        wishId = 1
        $(".wishlist-lightbox .next").css("display", "none")
        $(".wishlist-lightbox .empty").css("display", "block")
    } else {
        $(".wishlist-lightbox .next").css("display", "block")
        $(".wishlist-lightbox .empty").css("display", "none")
    }
    wishcontent = ''
    // added checked class
    wishlistItems.map(function (wishItem) {
        let checkedName = wishItem.productName
        let checkedPrice = wishItem.productPrice

        $(".item").each(function () {
            if ($(this).find(".product-name").text() == checkedName && $(this).find(".price").text() == checkedPrice) {
                $(this).find(".fav").addClass("checked")
            }
            // else{
            //     $(this).find(".fav").removeClass("checked")
                
            // }
        })
        wishcontent += `
        <div id="${wishItem.id}" class="cart-container d-flex justify-content-start align-content-start">
        <div class="content-img w-25">
            <img src="${wishItem.productImg}" alt="product">
        </div>
        <div class="items">
            <small>${wishItem.productName}</small>
            <br>
            <small>price:${wishItem.productPrice}</small>
            <br>
            <small>Sold By: ${wishItem.productAuthor}</small>
        </div>
        <p class="closewish">&times;</p>
 
    </div>
        `
    })
    $(".wishlist-lightbox .next").html(wishcontent)
    $(".wish-badge").text(countCartItems(wishlistItems))


}
displayWishList()

function addwish(arr) {
    
}
// close wishlist popup

// close quickview popup

$(".fixed-overlay,.fav-close").on("click", function () {
    closePopup(".wishlist-lightbox")
})
// remove from wish list
function removeFromWish(id) {
    let filteredData = wishlistItems.filter(product => product.id != id)
    wishlistItems = filteredData
    // $(".item").filter(item => {
    //     let productPrice = $(item).find(".price").text()
    //     let productName = $(item).find(".product-name").text()
    //     product = {
    //         productName: productName,


    //         productPrice: productPrice,
    //     }

    // })
    displayWishList()
    localStorage.setItem("wish", JSON.stringify(wishlistItems))
}
$(document).on("click", ".closewish", function (e) {
    console.log($(e.target).parents(".cart-container"))
    let id = $(this).parent().attr("id")
    removeFromWish(id)
});




// brands swiper js 
var brandSwiper = new Swiper(".swiper-container.brand-swipper", {
    slidesPerView: 6,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
        500: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        850: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 50,
        },
      },
    });
  



// banner swiper
var bannerSwiper = new Swiper(".banner-swiper.mySwiper", {
    loop:true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable:true,
      }
  });
  
  bannerSwiper.on('slideChange', function () {
    new WOW().init();
  });




// products taps
$(".trends .nav-item").on("click",function(){
    
    $(".trends .nav-item").removeClass("nav-active")
    $(this).addClass("nav-active")
    let id=$(".nav-active").attr("id")
    // if($(".product").data("show")==id){
    //     $(th
    // }
    // else{
    //     $(this).hide(0)
    // }
    $(".product").hide(0)
    $(`.product[data-show=${id}]`).show(0)
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