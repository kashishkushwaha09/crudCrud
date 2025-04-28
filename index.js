window.addEventListener("DOMContentLoaded",fetchAllProducts);
function handleSubmit(event){
    event.preventDefault();
    const product={
        price:event.target.price.value,
        name:event.target.name.value,
        category:event.target.category.value
    }
    addProduct(product);
}
async function addProduct(product){
    try {
        const response=await fetch(
      "https://crudcrud.com/api/7c1da1cb561242ea8163781107d1f319/products",
      {
        method:"POST",
        headers:{
         'Content-Type':'application/json',
        },
        body:JSON.stringify(product)
        })
        const data=await response.json();
        displayToUser(data);
        console.log(data)
    } catch (error) {
        console.error('Error creating post:', error);
    }
    document.getElementById("price").value = "";
  document.getElementById("name").value = "";
  document.getElementById("category").value = "";
}
function displayToUser(product){
  
   const list=document.createElement('li');
   list.innerHTML=`${product.price} - ${product.category} - ${product.name}`
   const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  list.appendChild(deleteBtn);
   if(product.category==='electronics'){
    document.getElementById("electronics").appendChild(list)
   }else if(product.category==='food'){
    document.getElementById("food").appendChild(list)
   }else if(product.category==='skincare'){
    document.getElementById("skincare").appendChild(list)
   }
  
   deleteBtn.addEventListener('click',(event) => deleteProduct(product,list,event));
}
async function fetchAllProducts(){
    try {
        const response=await fetch(
      "https://crudcrud.com/api/7c1da1cb561242ea8163781107d1f319/products",
      {
        method:"GET",
        })
        const products=await response.json();
        for(let product of products){
            displayToUser(product);
        }
        
    } catch (error) {
        console.error('Error creating post:', error);
    }
}
async function deleteProduct(product,list,event){
    try {
        await fetch(
            `https://crudcrud.com/api/7c1da1cb561242ea8163781107d1f319/products/${product._id}`,
            {
                method: "DELETE"
              })
        console.log("product deleted Successfully !!")
    } catch (error) {
        console.log(error);
    }
    const parent=list.parentElement;
    parent.removeChild(event.target.parentElement);
}