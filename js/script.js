function cari_movie() {
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
                            <img src="${data.Poster}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">` + data.Title + `</h5>
                                <p class="card-text">Tahun: ` + data.Type + `</p>
                                <p class="card-text">Tahun: ` + data.Year + `</p>
                               <button type="button" class="see-detail btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">See detail</button>
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
}

$('#search-button').on('click', function () {
    cari_movie();
});

$(document).ready(function () {
    $('#search-input').on('keyup', function (e) {
        if (e.keyCode === 13) { // 13 is the code for the Enter key
            cari_movie();
        }
    });
});

$('#movie-list').on('click', '.see-detail', function () {
    var movieId = $(this).data('id');
    
    // Cek imdb id sudah ada belum menggunakan console
    // console.log(movieId);

    // Mengosongkan konten modal sebelum menambahkan yang baru
    $('#modal-body').empty();

    // Menggunakan setTimeout untuk menambahkan konten setelah 1 detik (1000 milidetik)
    setTimeout(function() {
        $.ajax({
            url: 'https://www.omdbapi.com',
            type: 'get',
            dataType: 'json',
            data: {
                'apikey': '98946428',
                'i': movieId // Menggunakan variabel movieId yang sudah didefinisikan
            },
            success: function (response) {
                if (response.Response === "True") {
                    // Menambahkan konten ke dalam modal-body
                    $('#modal-body').html(`
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-4">
                                    <!-- Menampilkan poster film -->
                                    <img src="${response.Poster}" class="img-fluid" alt="Poster">
                                </div>
                                <div class="col-md-8">
                                    <!-- Menampilkan detail film -->
                                    <h5>${response.Title}</h5>
                                    <p>${response.Plot}</p>
                                    <p><strong>Released:</strong> ${response.Released}</p>
                                    <p><strong>Genre:</strong> ${response.Genre}</p>
                                    <p><strong>Director:</strong> ${response.Director}</p>
                                    <p><strong>Actors:</strong> ${response.Actors}</p>
                                </div>
                            </div>
                        </div>
                    `);

                    // Menambahkan informasi tambahan ke elemen dengan kelas 'bahrul'
                    $('.bahrul').html(`
                        <p><strong>${response.Title}</strong></p>
                    `);
                } else {
                    // Menampilkan pesan jika film tidak ditemukan
                    $('#modal-body').html('<p>Movie not found.</p>');
                }
            },
            error: function () {
                // Menampilkan pesan jika terjadi kesalahan saat melakukan permintaan AJAX
                $('#modal-body').html('<p>There was an error retrieving the movie details.</p>');
            }
        });
    }, 200); // Delay
});
