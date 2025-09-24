
export function loadCart(){
    let cartString = localStorage.getItem("cart") // "[item1, item2]"

    if(cartString == null){
        localStorage.setItem("cart", "[]")
        cartString = "[]"
    }

    const cart = JSON.parse(cartString)

    return cart

}

export function addToCart(product,quantity){
    const cart = loadCart();

    const exsistingitemIndex = cart.findIndex(
        (item) => item.productID === product.productID
    )

    if(exsistingitemIndex == -1){
        if(quantity < 1){
            console.log("quantity must be atleast 1");
            return;
        }
        const cartitem = {
            
            productID:product.productID,
            productName:product.productName,
            productPrice:product.productPrice,
            LabledPrice:product.LabledPrice,
            quantity:quantity,
            image: product.productImage[0]
        }
        cart.push(cartitem);
        
    } //add new product to cart
    else{
        
        const existingItem = cart[exsistingitemIndex];

        const newQuantity = existingItem.quantity + quantity

        if(newQuantity<1){
            cart = cart.filter(
                (item)=>{
                    return item.productID != product.productID
                }
            )
        }else{
            cart[exsistingitemIndex].quantity = newQuantity
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
}

export function getTotal(){

    const cart = loadCart() 
    let total = 0

    cart.forEach(
        (item)=>{
            total += item.productPrice * item.quantity
        }
    )
    return total;
}