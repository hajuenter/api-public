// $('#search-button').on('click', function () {
//     $.ajax({
//         url: 'https://www.omdbapi.com',
//         type: 'get',
//         dataType: 'json', //bisa text bisa xml
//         data: {
//             'apikey': '98946428',
//             's': $('#search-input').val()
//         },
//         success: function (bebas) {
//             if (bebas.Response == "True") {
//                 let movie = bebas.Search;//agar isinya langsung array dengan mengeluarkan objek Search
//                 $.each(movie, function (i, data) {
//                     $('#movie-list').append(`
                        
//     <div class="card">
//             <img src="`+ bebas.Poster +`" class="card-img-top" alt="...">
//         <div class="card-body">
//             <h5 class="card-title">`+ bebas.Title +`</h5>
//             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//             <a href="#" class="btn btn-primary">Go somewhere</a>
//         </div>
//     </div>

//                         `);
//                 });
//             } else {
//                 // $('#movie-list').html(`<h1>Movie tidak ditemukan</h1>`)

//                 $('#movie-list').html(`
//                     <div class="col">
//                     <h1 class="text-center">`+ bebas.Error + `</h1>
//                     </div>
//                     `)
//             }
//         }

//     });
// });

$('#search-button').on('click', function () {
    $.ajax({
        url: 'https://www.omdbapi.com', // Pastikan menggunakan https
        type: 'get',
        dataType: 'json', //bisa text bisa xml
        data: {
            'apikey': '98946428',
            's': $('#search-input').val()
        },
        success: function (bebas) {
            if (bebas.Response == "True") {
                let movie = bebas.Search; //agar isinya langsung array dengan mengeluarkan objek Search
                $('#movie-list').empty(); // Membersihkan daftar film sebelum menambahkan hasil baru
                $.each(movie, function (i, data) {
                    $('#movie-list').append(`
                        <div class="card m-2" style="width: 18rem;">
                            <img src="` + data.Poster + `" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">` + data.Title + `</h5>
                                <p class="card-text">Tahun: ` + data.Type + `</p>
                                <p class="card-text">Tahun: ` + data.Year + `</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    `);
                });
            } else {
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">` + bebas.Error + `</h1>
                    </div>
                `);
            }
        }
    });
});
