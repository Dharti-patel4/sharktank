// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");   

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");
let filterFashion = document.getElementById("filter-Fashion");
//Search by title/founder
                    
let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}


let mainSection = document.getElementById("data-list-wrapper");
let productData = [];
function fetchData()
{
    fetch("http://localhost:3000/pitches")
    .then((res)=>res.json())
    .then((data)=>{
        showData(data)
        productData = data;

})
.catch((err)=>{
    showData(err);
})
}
fetchData();

function showData(data){
    let show = data.map((el)=>
       storeData(el.id,el.image,el.title,el.founder,el.category,el.price))
        mainSection.innerHTML= show.join(" ")

}


function storeData(id,image,title,founder,category,price)
{
    let store =
    ` <div class="card" data-id="${id}">
 
     <div class="card-img">  
        <img src="${image}" alt="${title}">
      </div>
      <div class="card-body">
        <h4 class="card-title">${title}</h4>
        <p class="card-founder">${founder}</p>
        <p class="card-category">${category}</p>
        <p class="card-price">${price}</p>
        <a href="#" data-id="${id}" class="card-link">Edit</a>
        <button data-id="${id}" class="card-button">Delete</button>
      </div>
    </div>`

    return store;
}

pitchCreateBtn.addEventListener('click' ,()=>
{
    let product ={
        
        title: pitchTitleInput.value,
        image: pitchImageInput.value,
        category:pitchCategoryInput.value,
        founder:pitchfounderInput.value,
        price:pitchPriceInput.value
    }

    fetch("http://localhost:3000/pitches",
        {
           method : 'POST',
           headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(product)
})
.then(res => res.json())
.then(data => fetchData())
.catch(err => console.log(err))

})


document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('card-button'))
    {
        deletProduct(e.target.dataset.id);
    }
})


function deletProduct(id)
{
    fetch(`http://localhost:3000/pitches/${id}`,{
        method : 'DELETE'

    })
    .then((res)=>res.json())
    .then((data)=>console.log(data),

    alert("delete success.."))
    .catch((err)=>console.log(err))
}

filterFood.addEventListener('click',()=>{
    let ProductData = productData.filter((el)=>el.category === 'Food')
    console.log(ProductData);
    showData(ProductData);
})

 filterElectronics.addEventListener('click',()=>{
    let elecData = productData.filter((el)=>el.category === 'Electronics')
    console.log(elecData);
    showData(elecData);
})
 filterPersonalCare.addEventListener('click',()=>{
    let PersonalData = productData.filter((el)=>el.category === 'Personal Care')
    console.log( PersonalData );
    showData( PersonalData );
})
filterFashion.addEventListener('click',()=>{
    let fashionData = productData.filter((el)=>el.category === 'Fashion')
    console.log( fashionData );
    showData( fashionData );
})

sortAtoZBtn.addEventListener('click',()=>{
    let filterPrice = productData.filter((el)=>{
        return el.price;
    })

    let sortPrice = filterPrice .sort((a,b)=>{
        return a.price - b.price;
    })
    showData(sortPrice)
})

sortZtoABtn.addEventListener('click',()=>{
    let filterhigh = productData.filter((el)=>{
        return el.price;
    })

    let sorthigh = filterhigh .sort((a,b)=>{
        return b.price - a.price;
    })
    showData(sorthigh)
})


document.addEventListener('click',(e)=>{
    if(e.target.classList.contains("card-link")){
        console.log(e.target.dataset.id);
        updateData(e.target.dataset.id);
    }

});

function updateData(id){
    fetch(`http://localhost:3000/pitches/${id}`)
    .then((res)=> res.json())
    .then((data)=>{
        (updatePitchIdInput.value =data.id),
        (updatePitchTitleInput.value = data.title),
        ( updatePitchImageInput.value = data.image),
        (updatePitchCategoryInput.value = data.category),
        (updatePitchfounderInput.value= data.founder),    
        (updatePitchPriceInput.value = data.price);
    })
    .catch((err)=> console.log(err));
}

updatePitchBtn.addEventListener("click",()=>{
    let updateObj={
        id:updatePitchIdInput.value,
        title:updatePitchTitleInput.value,
        image:updatePitchImageInput.value,
        category:updatePitchCategoryInput.value,
        founder:updatePitchfounderInput.value,
        price:updatePitchPriceInput.value
    };
    console.log(updateObj);

    fetch(`http://localhost:3000/pitches/${updateObj.id}`,{
        method:"PUT",
        headers:{"Content-Type": "application/json"

        },
        body:JSON.stringify(updateObj),
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
    })
    .catch((err)=>console.log(err));

});

document.addEventListener('click', (e)=>

    {
        if(e.target.classList.contains("card-link"))
        {
           
            console.log(e.target.dataset.id);
            updateOnlyData(e.target.dataset.id);
        }
    });
    
    function updateOnlyData(id)
  {
        fetch(`http://localhost:3000/pitches/${id}`)
        .then((res)=> res.json())
        .then((data)=>{
            
            (updatePricePitchId.value = data.id),
            (updatePricePitchPrice.value = data.price) 
        })
  
        .catch((err)=> console.log(err));
    }
    updatePricePitchPriceButton.addEventListener('click',()=>{
        let updatePriceobj = {
          id : updatePricePitchId.value,
          price : updatePricePitchPrice.value
      };
      console.log(updatePriceobj)    
    
      fetch(`http://localhost:3000/pitches/${updatePriceobj.id}`,{
        method : 'PATCH',
        headers : { 
    
          'Content-Type' : 'application/json'
    
          },
          body: JSON.stringify(updatePriceobj)
        })
        .then((res)=>res.json())
        .then((data)=>console.log(data))
        .catch((err)=>console.log(err));
      })
    
    
    
    