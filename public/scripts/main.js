jQuery(function () {

    $(window).scroll(function () {

        let scroll = $(window).scrollTop() + $(window).height(),
            dop_scroll = $(window).scrollTop();

        offset_block_1 = $('.block_1').offset().top;
        offset_name_block_1 = $('.name_block_1').offset().top;

        if (dop_scroll >= offset_block_1 / 1.2) {
            $('.header_menu_2').css({
                'filter': 'brightness(100%)',
                'pointer-events': 'all'
            })
            $('.pop_up_buc').css('opacity', 1);
        } else {
            $('.header_menu_2').css({
                'filter': 'brightness(0%)',
                'pointer-events': 'none'
            })
            $('.pop_up_buc').css('opacity', 0);
        }


        if (dop_scroll> offset_block_1/1.5){
            $('.name_block_1').css({
                'opacity':'1',
                'transform':'translateX(0)'
            });
        }
    });

    let price = null;
    $(window).on("load", function () {
        $('.click_box').click((e) => {
            let src = null,
                name_p = null,
                parent = null,
                opis = null,
                up_text;
            src = $(e.currentTarget).find('img').attr('src');
            parent = $(e.currentTarget).parent();
            name_p = parent.find('h2').text();
            opis = parent.find('.opis').text();
            price = parent.find('.price_p').text();
            up_text = `
        <p><span class="name_p">`+ name_p + `</span><p class="mon"><span class="price">` + price + `</span>руб.</p></p>
        <p><span class="size">32</span> см</p>
        <p class="sostav">`+ opis + `</p>
        `
            $('.modal_general_info').html(up_text);
            if (src) {
                $('.pizza_img').css({
                    'background-image': 'url("' + src + '")',
                })
                $('.modal_pizza').css({
                    'visibility': 'visible',
                    'opacity': '1',
                    'transition': '0.2s'
                });
            } else {
                $('.pizza_img').css({
                    'background-image': 'url("/svg/pizza.svg")',
                })
                $('.modal_pizza').css({
                    'visibility': 'visible',
                    'opacity': '1',
                    'transition': '0.2s'
                });
            }
        });
    });
    
    let testo;
    $(document).mouseup((e) => {
        let modal_pizza = $('.wrapper_modal_pizza');
        let pop_up_buk = $('.pop_up_buc');
        if (!modal_pizza.is(e.target) && modal_pizza.has(e.target).length === 0) {
            $('.modal_pizza').css({
                'visibility': 'hidden',
                'opacity': '0',
                'transition': '0.2s'
            });
            $('.size_pizza li').css('background', '0');
            $('#medium_p').css('background', '#5252522b');
            $('.pizza_img').css('background-size', '90%');
            $('.testo li').css('background', '0');
            testo = null;
        }

    });



    $('.size_pizza li').click((e) => {
        let index = $(".size_pizza li").index(e.target);
        index++;
        $('.size_pizza li').css({
            'background': '0',
        })
        $('.size_pizza li:nth-child(' + index + ')').css({
            'background': '#5252522b',
        });

        return false;
    });

    $('.testo li').click((e) => {
        let index = $(".testo li").index(e.target);
        index++;
        $('.testo li').css({
            'background': '0',
        })
        $('.testo li:nth-child(' + index + ')').css({
            'background': '#5252522b',
        });

        testo = $(e.target).attr("id");

        if (testo === 'low_t') testo = 'Тонкое тесто'
        else if (testo === 'fat_t') testo = 'Пышное тесто';

        return false;
    });


    $(window).on("load", function () {

        let pizza_img = $('.pizza_img');

        $('.size_pizza li').click((e) => {
            price = Number(price);
            let price_higth = 0;
            let price_low = 0;
            price_higth = price + 80;
            price_low = price - 80;

            let size = $(e.target).attr("id");

            if (size === 'higth_p') {
                $(pizza_img).css('background-size', '98%');
                $('.size').text('38');
                $('.price').text(price_higth);
            }
            else if (size === 'medium_p') {
                $(pizza_img).css('background-size', '90%');
                $('.size').text('32');
                $('.price').text(price);
            }
            else if (size === 'small_p') {
                $(pizza_img).css('background-size', '80%');
                $('.size').text('28');
                $('.price').text(price_low);
            }
        });


    });

    $('.pop_up_buc').fadeOut(0);
    $('.buck').click(() => {

        $('.pop_up_buc').fadeToggle('fast');
    });


    $(document).on('click', '.plus', (e) => {
        parent = $(e.currentTarget).parent();
        parent_4 = $(e.currentTarget).parent().parent().parent().parent();
        parent_5 = $(e.currentTarget).parent().parent().parent().parent().parent();

        let colvo = parent.find('.colvo').text(),
            colvo_text = parent.find('.colvo'),
            price = parent_4.find('.mon_p').text(),
            price_text = parent_4.find('.mon_p');
        colvo = Number(colvo);
        price = Number(price);
        let price_inc = price;
        price = price / colvo;


        colvo++;
        price_inc = price_inc + price;
        $(colvo_text).text(colvo);
        $(price_text).text(price_inc);

        let id = $(parent_4).attr('id');
        let inf =$('.line_pop_up:nth-child('+id+')').html();
        $.cookie('P'+id+'', inf);

        let summ = 0;
        let c = $('.mon_p');
        for (let i = 0; i <= $('.mon_p').length-1; i++) {
            a = $(c[i]).text();
            a = Number(a);
            summ=summ+a;
            
        }
        $('.money').text(summ+' руб.');
    });


    $(document).on('click', '.minus', (e) => {
        parent = $(e.currentTarget).parent();
        parent_4 = $(e.currentTarget).parent().parent().parent().parent();
        parent_5 = $(e.currentTarget).parent().parent().parent().parent().parent();

        let colvo = parent.find('.colvo').text(),
            colvo_text = parent.find('.colvo');
        price = parent_4.find('.mon_p').text(),
            price_text = parent_4.find('.mon_p');
        colvo = Number(colvo);
        price = Number(price);
        let price_inc = price;
        price = price / colvo;

        if (colvo > 1) {
            colvo--;
            $(colvo_text).text(colvo);

            price_inc = price_inc - price;
            $(price_text).text(price_inc);

            let id = $(parent_4).attr('id');
        let inf = $(parent_5).find('.line_pop_up:nth-child('+id+')').html();
        $.cookie('P'+id+'', inf);

            let summ = 0;
            let c = $('.mon_p');
            for (let i = 0; i <= $('.mon_p').length-1; i++) {
                a = $(c[i]).text();
                a = Number(a);
                summ=summ+a;
                
            }
            $('.money').text(summ+' руб.');            
        }
    });

    $(document).on('click', '.del', (e) => {
        let parent = $(e.currentTarget).parent().parent().parent();
        let id = $(parent).attr('id');

        $.cookie('P'+id+'', null);
           
        parent.detach();
        let summ = 0;
            let c = $('.mon_p');
            for (let i = 0; i <= $('.mon_p').length-1; i++) {
                a = $(c[i]).text();
                a = Number(a);
                summ=summ+a;
                
            }
            $('.money').text(summ+' руб.');   
    });


    $(document).on('click', '.in_bucket', (e) => {

        let parent = $(e.currentTarget).parent();

        if (testo) {

            $('.modal_pizza').css({
                'visibility': 'hidden',
                'opacity': '0',
                'transition': '0.2s'
            });
            $('.size_pizza li').css('background', '0');
            $('#medium_p').css('background', '#5252522b');
            $('.pizza_img').css('background-size', '90%');
            $('.testo li').css('background', '0');

            let db_parent = $(e.currentTarget).parent().parent(),
                name_p = parent.find($('.name_p')).text(),
                price_p = parent.find($('.price')).text(),
                size_p = parent.find($('.size')).text(),
                src = db_parent.find('.pizza_img').css('background-image');

            src = src.replace('url(', '').replace(')', '').replace(/\"/gi, "");
            let col = $('.enter_pop_buc .line_pop_up').length;
            col++;
            if (col <= 7){
            $(`<div class="line_pop_up" id="`+ col +`">
            <div class="img_pizza_pop">
                <img src="`+ src + `"/>
            </div>
            <div class="info_pizza">
                <div>
                    <p class="name_p_pop">`+ name_p + `</p>
                    <p><span class="size_pop">`+ size_p + `</span>/<span class="testo_pop">` + testo + `</span></p>
                </div>
                <div class="schet">
                    <p>
                        <span class="minus">&ndash;</span>
                            <span class="colvo">1</span>
                        <span class="plus">+</span>
                    </p>
                </div>
            </div>
            <div class="delete_p">
                <span>
                    <input type="submit" class="del" value=""></input>
                </span>
                <p class="mon_p">`+ price_p + `</p>
            </div>
        </div>`).appendTo($('.enter_pop_buc'));

            //COOKIES
            
            let length = 1;
                length = $('.enter_pop_buc .line_pop_up').length;
            for (let i = 1; i <= length; i++) {
                let inf = $('.enter_pop_buc .line_pop_up:nth-child('+i+')').html();
                $.cookie('P'+i+'', inf, {expires: 15});
                
            }

            let summ = 0;
            let c = $('.mon_p');
            for (let i = 0; i <= $('.mon_p').length-1; i++) {
                a = $(c[i]).text();
                a = Number(a);
                summ=summ+a;
                
            }
            $('.money').text(summ+' руб.');  
            }else{
                alert('Вы выбрали слишком много товара');
            }    

        } else {
            alert('Выберите тесто!');
        }
        testo = null;
    });


    




    //COOKIES

    for (let i = 1; i < 27; i++) {
        let inf = $.cookie('P'+i+'');
        if (inf !== null){
            //console.log(inf);
         $(`<div class="line_pop_up" id="`+i+`">`+inf+`</div>`).appendTo($('.enter_pop_buc'));
        }
    }

    function cena(){
        let summ = 0;
        let c = $('.mon_p');
        for (let i = 0; i <= $('.mon_p').length-1; i++) {
            a = $(c[i]).text();
            a = Number(a);
            summ=summ+a;
            
        }
        $('.money').text(summ+' руб.');
    }
    cena();
})