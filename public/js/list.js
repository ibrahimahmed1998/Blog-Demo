function list() {
    $.ajax({
        url: "api/auth/list", type: 'get',
        headers: { 'Authorization': `Bearer ${token}` },

        success: function (response) {

            var arr = []; var id;

            if (filter == 1 || filter == 2) {
                arr = response.filter((obj) => { return obj.category == filter; });
            }

            else { for (let i = 0; i < response.length; i++) { arr[i] = response[i]; } }

            for (let i = 0; i < arr.length; i++) {
                var div = document.createElement("div");
                div.setAttribute("class", "card");

                var indiv = document.createElement("div");
                indiv.setAttribute("class", "card-body");
                indiv.setAttribute("id", arr[i].id);    ////////////////////

                div.appendChild(indiv);

                var h5 = document.createElement("h5");
                h5.setAttribute("class", "card-title");
                h5.innerHTML = arr[i].title;   ////////////////////
                indiv.appendChild(h5);

                var h6 = document.createElement("h6");
                h6.setAttribute("class", "card-subtitle mb-2 text-muted");
                h6.innerHTML = "test";     ////////////////////
                indiv.appendChild(h6);

                var p = document.createElement("p");
                p.setAttribute("class", "card-text");
                p.innerHTML = arr[i].body;     ////////////////////
                indiv.appendChild(p);

                var bigdiv = document.createElement("div");
                bigdiv.setAttribute("class", "bg-white overflow-hidden shadow-sm sm:rounded-lg");

                var anc = document.createElement("a");
                anc.setAttribute("id", arr[i].id);
                anc.setAttribute("class", "btn btn-outline-info");
                anc.setAttribute("data-bs-toggle", "collapse");
                anc.setAttribute("href", "#collapseExample" + i);
                anc.setAttribute("role", "button");
                anc.setAttribute("aria-expanded", "false");
                anc.setAttribute("aria-controls", "collapseExample" + i);
                anc.innerHTML = "Comment"        ////////////////////
                bigdiv.appendChild(anc);

                var smalldiv = document.createElement("div");
                smalldiv.setAttribute("class", "collapse");
                smalldiv.setAttribute("id", "collapseExample" + i);
                bigdiv.appendChild(smalldiv);

                var artdiv = document.createElement("div");
                artdiv.setAttribute("class", "bg-white overflow-hidden shadow-sm sm:rounded-lg");
                artdiv.setAttribute("id", "article");
                smalldiv.appendChild(artdiv);

                var br = document.createElement("br");
                artdiv.appendChild(br);

                var txt = document.createElement("textarea");
                txt.setAttribute("type", "text");
                txt.setAttribute("class", "form-control");
                txt.setAttribute("rows", "3");
                txt.setAttribute("id", arr[i].id);
                txt.setAttribute("placeholder", "please write Your Comment Here ");
                artdiv.appendChild(txt);

                var br2 = document.createElement("br");
                artdiv.appendChild(br2);

                var new_btn = document.createElement("button");
                new_btn.setAttribute("class", "btn btn-primary btn-lg");
                new_btn.setAttribute("id", arr[i].id);
                new_btn.innerHTML = "Send";
                artdiv.appendChild(new_btn);

                indiv.appendChild(anc);
                indiv.appendChild(bigdiv);

                var x = document.getElementById("here").appendChild(div);
            }

            $('a').click(function (event) { event.preventDefault(); id = $(this).attr('id'); })

            $('.btn-lg').click(function (event) {
                event.preventDefault();

                myid = $(this).attr('id');

                if (myid != id) { alert("please use send of same comment button :D "); }

                else {
                    let body = $(`textarea[id=${id}]`).val();
                    if (body == '') { alert("No Comment Here ! ") }
                    else { addcomment(body, id); }
                }
            })
        }, // end of success
        error: function (response) { var x = JSON.stringify(response); alert(x); }
    })/* end of ajax */
}