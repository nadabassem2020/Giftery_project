// define variables
// cart variables
let cartProducts = JSON.parse(localStorage.getItem("cart"));
let product;
let exiest = true;
let cartContent = "";
let wishcontent = "";
let total = 0;
let totalPrice = 0
let id = parseInt(localStorage.getItem("id"));
let wishlistItems = JSON.parse(localStorage.getItem("wish"));
let wishId = parseInt(localStorage.getItem("wishId"))
let totalAfterTax=0
let addons = []

// show the products
function displaytheproducts() {

    if (cartProducts == null || cartProducts.length == 0) {
        $(".cart-lightbox .next").css("display", "none")
        $(".cart-lightbox .empty").css("display", "block")
        cartProducts = []
        id = 1
    } else {
        $(".cart-lightbox .next").css("display", "block")
        $(".cart-lightbox .empty").css("display", "none")
    }

    cartContent = ""
    totalPrice = 0;
    for (var i = 0; i < cartProducts.length; i++) {
        cartContent += `
         <div id="${cartProducts[i].id}" class="cart-container d-flex justify-content-start align-content-start">
         <div class="content-img w-25">
             <img src="${cartProducts[i].productImg}" alt="product">
         </div>
         <div class="items">
             <small>${cartProducts[i].productName}</small>
             <br>
             <small>price:${cartProducts[i].productPrice}</small>
             <br>
             <small>Sold By: ${cartProducts[i].productAuthor}</small>
             <div class="product-quantity d-flex align-item-center justify-content-center mt-3">
                <div class="quantity border">${cartProducts[i].qauntity}</div>
                <div>
                    <div class="increase border">+</div>
                    <div class="decrease border">-</div>
                </div>
             </div>
         </div>
         <p class="close">&times;</p>

     </div>
         `
        total = (parseFloat(cartProducts[i].productPrice) * parseFloat(cartProducts[i].qauntity))
        totalPrice += total
    }
    $(".total-price").text(totalPrice)
    $(".cart-lightbox .next").html(cartContent)
    $(".cart-badge").text(countCartItems(cartProducts))
}
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
$(".plus-cart").on("click", function () {

    let productImg = $(this).parents(".item").find("img").attr("src")
    let productPrice = $(this).parents(".item").find(".price").text()
    let productAuthor = $(this).parents(".item").find(".author").text()
    let productName = $(this).parents(".item").find(".product-name").text()
    // this flag to check if product in the array or no
    exiest = true
    product = {
        productName: productName,
        productAuthor: productAuthor,
        productImg: productImg,
        productPrice: productPrice,
        qauntity: 1,
        id: id
    }

    if (cartProducts == null || cartProducts.length == 0) {
        cartProducts = []
        product.id = 1
        id = 1
        cartProducts.push(product)
        id++
        localStorage.setItem("id", id)
    } else {
        for (var i = 0; i < cartProducts.length; i++) {
            if (product.productPrice == cartProducts[i].productPrice && product.productName == cartProducts[i].productName && product.productImg == cartProducts[i].productImg && product.productAuthor == cartProducts[i].productAuthor) {
                cartProducts[i].qauntity++
                exiest = false
                break;
            }

        }
        if (exiest == true) {
            cartProducts.push(product)
            id++
            localStorage.setItem("id", id)
        }
    }

    localStorage.setItem("cart", JSON.stringify(cartProducts))
    displaytheproducts()
    popup(".cart-lightbox")
})

// remove from cart
function removeFromCart(id) {
    let filteredData = cartProducts.filter(product => product.id != id)
    cartProducts = filteredData
    localStorage.setItem("cart", JSON.stringify(cartProducts))
    displaytheproducts()
}
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
function increase(id) {
    cartProducts.map(product => {
        if (product.id == id) {
            product.qauntity++
        }
    })
    localStorage.setItem("cart", JSON.stringify(cartProducts))
    displaytheproducts()
}

// decrease quantity
function decrease(id) {
    cartProducts.map(product => {
        if (product.id == id) {
            product.qauntity--
        }
        if (product.qauntity == 0) {
            removeFromCart(id)
        }
    })

    localStorage.setItem("cart", JSON.stringify(cartProducts))
    displaytheproducts()
}

// display the cart when site load
displaytheproducts()
// open the cart popup
$("#cart").on("click", function () {
    popup(".cart-lightbox")
})
// close the cart popup
$(".fixed-overlay,.cart-close").on("click", function () {
    closePopup(".overlay-inner .cart-lightbox")
})
// open the wishlist popup
$("#fav").on("click", function () {
    popup(".wishlist-lightbox")
})
// close the wish list popup
// $(".fixed-overlay,.fav-close").on("click", function () {
//     closePopup(".wishlist-lightbox")
// })
// remove from cart
$(document).on("click", ".close", function () {
    let id = $(this).parent().attr("id")
    removeFromCart(id)
});
// clear cart
$(".clear-cart").on("click", function () {
    clear(cartProducts)
})
// increase the quantity
$(document).on("click", ".increase", function () {
    id = $(this).parents(".cart-container").attr("id")
    increase(id)
})
// decrease the quantity
$(document).on("click", ".decrease", function () {
    id = $(this).parents(".cart-container").attr("id")
    decrease(id)
})

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
        wishlistItems.map((item, i) => {
            if (product.productName == item.productName) {
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

// navbar

// collapse the blue navbar
$(".collapse-btn").on("click", function () {
    $(this).hide(0)
    $(".blue-navbar").slideUp(500)
})

// the responsive menu
function openRes(selector) {
    $(selector).addClass("out")
    $(".fixed-overlay").fadeIn(500)
}

function closeRes(selector) {
    $(selector).removeClass("out")
    $(".fixed-overlay").fadeOut(500)
}
// open
$(".menu-btn").on("click", function () {
    openRes(".cats-navbar")
})
// close
$(".fixed-overlay").on("click", function () {
    closeRes(".cats-navbar")
})

$(".dropDown").on("click", function () {
    let that = $(this)
    $(this).next().slideToggle(250, function () {
        if (that.next().css("display") != "none") {
            that.children(".list-collapse").text("-")
            console.log("none")
        } else {
            that.children(".list-collapse").text("+")
        }
    })


})


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


// mob search bar

$(".search-btn").on("click", function () {
    $(".mob-searchbar").slideDown(500, function () {
        $(".mob-searchbar").addClass("p-4")
    })
    $(".fixed-overlay").fadeIn(500)


})
$(".fixed-overlay").on("click", function () {
    if ($(".mob-searchbar").css("display") == "block") {
        $(".mob-searchbar").slideUp(500)
        $(".fixed-overlay").fadeOut(500)
        $(".mob-searchbar").removeClass("p-4")
    }
})

// banner swiper
var bannerSwiper = new Swiper(".banner-swiper.mySwiper", {
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
    }
});

bannerSwiper.on('slideChange', function () {
    new WOW().init();
});




// products taps
$(".trends .nav-item").on("click", function () {

    $(".trends .nav-item").removeClass("nav-active")
    $(this).addClass("nav-active")
    let id = $(".nav-active").attr("id")
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
$(".filter-btn").on("click", function () {
    popup(".filter-menu")
})
$(".fixed-overlay").on("click", function () {
    $(".lightBoxContainer").hide(500)
})

$(".f-col").on("click", function () {
    $(this).next().slideToggle(250)
    $(this).find(".filter-pluse").toggleClass("fa-plus")
    $(this).find(".filter-pluse").toggleClass("fa-minus")
})

// price range


function getVals() {
    // Get slider values
    let parent = this.parentNode;
    let slides = parent.getElementsByTagName("input");
    let slide1 = parseFloat(slides[0].value);
    let slide2 = parseFloat(slides[1].value);
    // Neither slider will clip the other, so make sure we determine which is larger
    if (slide1 > slide2) {
        let tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;
    }

    let displayElement = parent.getElementsByClassName("rangeValues")[0];
    displayElement.innerHTML = "$" + slide1 + " - $" + slide2;
}

window.onload = function () {
    // Initialize Sliders
    let sliderSections = document.getElementsByClassName("range-slider");
    for (let x = 0; x < sliderSections.length; x++) {
        let sliders = sliderSections[x].getElementsByTagName("input");
        for (let y = 0; y < sliders.length; y++) {
            if (sliders[y].type === "range") {
                sliders[y].oninput = getVals;
                // Manually trigger event first time to display values
                sliders[y].oninput();
            }
        }
    }
}



// sort list
$(".sort-btn").on("click", function () {
    $(".sort-list").slideToggle(500)
})
$(".sort-list li").on("click", function () {
    let sort = $(this).text()
    $(".sort-btn span").eq(0).text(sort)
})

// cartpage
let cartPageProducts = ''
cartProducts.map((pro, i) => {
    cartPageProducts += `<div class="d-flex justify-content-between align-items-start py-3 border-bottom proItem">
<h4 class="proAuthorName">
    ${pro.productAuthor}
</h4>
<div class="proInfo text-right">
    <p>
        <span class="proAuthorName">
        ${pro.productAuthor}
        </span>
        <span class="shippingMoney">
            55
        </span>
    </p>
    <p>
        shipping to assiut, 43511
    </p>
    <span class="proName">${pro.productName}</span>
</div>
</div>`
    let totalAfterTax = totalPrice + ((i + 1) * 55)
    $(".totals").html(cartPageProducts)
    $(".totalAfterTax").text(totalAfterTax)
})

$(".checker").on("change", function () {
    let addon = {}
    let addonPrice = 0
    let totalAfterAddon = 0
    let cartPageProducts = ''
    $(".checker:checked").map((i,checker) => {
            addon = {
                "price": $(this).val(),
                "name": $(this).next().find(".addon-name").text()
            }

            
            
        
    })
    addons.push(addon)
    for(var i=0;i<addons.length;i++){
        cartPageProducts += `<div class="d-flex justify-content-between align-items-start py-3 border-bottom proItem">
        <h4 class="proAuthorName">
            ${addons[i].name}
        </h4>
        <div class="proInfo text-right">
            <p>
                ${addons[i].price}
                
            </p>
        </div>
        </div>`
                    addonPrice += parseInt(addons[i].price)
                    totalAfterAddon = totalPrice + totalAfterTax + addonPrice
    }
    // let totalAfterTax = totalPrice + ((i + 1) * 55)+addonPrice
    $(".addons").html(cartPageProducts)
    $(".totalAfterTax").text(totalAfterAddon)
    
})

$(".shippingAddress").on("change",function(){
    $(".shipping-form").slideToggle(250)
})

// account
$(".lists li").on("click", function(){
    var dataShow=$(this).data("show")
    $(".accountPage").css("display", "none")
    $(`.${dataShow  }`).css("display","block")
})