$(document).ready(()=>{
    AjaxGet();
    getCartItems();
   
})




function AjaxGet() {


    $.ajax({
        type: 'Get',
        url: 'https://localhost:7293/api/movie',
        success: function (data) {
            console.log(data)
           GetMovieData(data)

        },
        error: function (err) {
            console.log(err)

        }
    })

}


function GetMovieData(data) {
   
   
    $.each(data, function (key, value) {
        $("#movieTableBody").append(`
         <tr>
                <td>${value.id}</td>
                <td>${value.movieName}</td>
                <td>${value.description}</td>
               
                <td class="d-flex style="mt-2">
                    <button class="btn btn-warning" name="update" id="${value.id}">Update</button>
                    <button class="btn btn-danger" name="delete" id="${value.id}">Delete</button>
                    <button class="btn btn-info" name="Cart" id="${value.id}">Cart</button>
                </td>
         </tr>    
        `)
    })
    
}

//Film oluşturma
$("#create").click(function () {
    const movieName = $("#movieTitle").val();
    const description = $("#description").val();
    
    $.ajax({
        type: "Post",
        url: "https://localhost:7293/api/movie",
        contentType:'application/json',
        data: JSON.stringify({
            movieName:movieName,
            description:description,
           
        }),
        success: function (data) {
            AjaxGet();
            console.log(data)
        },
        error: function (err) {
            console.log(err)
        }
    })
})

//Film güncelleme ve silme,sepete ekleme
$("#movieTableBody").on('click',"button", function (){
    const currentName = $(this).attr('name');
    const currentId = $(this).attr('id');
   
    const message = confirm(currentName + " işlemini yapmak istiyor musunuz?");

    if (currentName === 'delete') {
        if (message) {
            $.ajax({
                type: 'Delete',
                url: 'https://localhost:7293/api/movie/' + currentId,
                success: function (data) {
                    AjaxGet();
                    console.log(data);
                   
                }
            })
        } else {
            alert("işlem iptal edildi!")
        }
    
    
    
    
    
    } else if (currentName === 'Update'){
        if (message) {
           
            const movieName = $("#movieTitle").val();
             const description = $("#description").val();
            $.ajax({
                type: 'Put',
                url: 'https://localhost:7293/api/movie',
                contentType: 'application/json',
                data: JSON.stringify({
                    Id:currentId,
                    movieName: movieName,
                   description:description,
                
                }),
                success: function (data) {
                    AjaxGet();
                    console.log(data);
                  
                }
            })
    
        } else {
            alert("işlem iptal edildi!")
        }

        
    }else if(currentName === 'Cart'){
        if(message){
            $.ajax({
                type: 'Post',
                url: 'https://localhost:7293/api/movie' + currentId,
                success: function (data) {
                    console.log(data);
                    AjaxGet();
                   
                }
            })
        }else{
            alert("işlem iptal edildi!")
        }
    }
})
















function addToCart(movieId) {
    $.ajax({
        type: 'Post',
        url: 'https://localhost:7293/api/movie' + movieId,
        success: function (result) {
            alert(result.message);
            
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

function getCartItems() {
    $.ajax({
        type: 'Get',
        url: 'https://localhost:7293/api/movie',
        success: function (cartItems) {
            displayCartItems(cartItems);
            addToCart();
            
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

function removeFromCart(movieId) {
    $.ajax({
        type: 'Delete',
        url: 'https://localhost:7293/api/movie' + movieId,
        success: function (result) {
            alert(result.message);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

