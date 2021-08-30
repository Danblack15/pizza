jQuery(function () {
    //COOKIES

    for (let i = 1; i < 27; i++) {
        let inf = $.cookie('P'+i+'');
        if (inf !== null){
            //console.log(inf);
         $(`<div class="line_pop_up" id="`+i+`">`+inf+`</div>`).appendTo($('.enter_pop_buc'));
        }
    }

    function c_b(){
        let summ = 0;
        let c = $('.mon_p');
        for (let i = 0; i <= $('.mon_p').length-1; i++) {
            a = $(c[i]).text();
            a = Number(a);
            summ=summ+a;
            
        }
        if (summ===0){
            $('.block_1').html('<div class="pusto"><p>Тут пусто</p></div>');
            
        }
    }
    c_b();
    
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
            c_b();
    });

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


    $('.pay_open').click( ()=>{
        $('.modal_zakaz').css({
            'visibility': 'visible',
            'opacity': '1',
            'transition': '0.2s'
        });
    });

    $(document).mouseup((e) => {
        let modal_pizza = $('.enter_modal_zakaz');
        if (!modal_pizza.is(e.target) && modal_pizza.has(e.target).length === 0) {
            $('.modal_zakaz').css({
                'visibility': 'hidden',
                'opacity': '0',
                'transition': '0.2s'
            });
        }

    });

    

    $('.submit_zakaz').click( ()=>{
        let bol = new Boolean;
        function chet(){
            let k=0;
            bol = false;
            for (let i = 1; i < $('.formis input').length; i++) {
                if ($('.inp'+i+'').val() ==''){
                    k--;
                }
                else{
                    k++
                }
                
            }
            console.log(k);
            if (k >= ($('.enter_modal_zakaz input').length-3)){
                bol = true
            }
            else bol = false;
        }
        chet();
        if (bol){
            for (let i = 1; i < 27; i++) {
                $.cookie('P'+i+'', null)
            }

            let price = $('.money').text();
            let name = $('input[name=Name]').val();
            let email = $('input[name=Email]').val();
            let s='';
            let s2='';
            async function sbor(){ 

                for (let i = 1; i <= Math.floor(($('.line_pop_up').length)/2); i++) {
                let name_p = $('.line_pop_up:nth-child('+i+') .name_p_pop').text();
                let colvo = $('.line_pop_up:nth-child('+i+') .colvo').text();
                let size_p = $('.line_pop_up:nth-child('+i+') .size_pop').text();
                let testo = $('.line_pop_up:nth-child('+i+') .testo_pop').text();
                let money = $('.line_pop_up:nth-child('+i+') .mon_p').text();

                s = s+`
                    <div style="border:1px solid orangered">
                        <h3>Пицца: `+name_p+`</h3>
                        <h3>Кол-во: `+colvo+`</h3>
                        <h3>Размер: `+size_p+`</h3>
                        <h3>Тесто: `+testo+`</h3>
                        <h3>Цена: `+money+` руб.</h3>
                    </div>
                `
                }
                for (let i = Math.floor(($('.line_pop_up').length)/2)+1; i <=$('.line_pop_up').length; i++) {
                    let name_p = $('.line_pop_up:nth-child('+i+') .name_p_pop').text();
                    let colvo = $('.line_pop_up:nth-child('+i+') .colvo').text();
                    let size_p = $('.line_pop_up:nth-child('+i+') .size_pop').text();
                    let testo = $('.line_pop_up:nth-child('+i+') .testo_pop').text();
                    let money = $('.line_pop_up:nth-child('+i+') .mon_p').text();
        
                    s2 = s2+`
                        <div style="border:1px solid orangered">
                            <h3>Пицца: `+name_p+`</h3>
                            <h3>Кол-во: `+colvo+`</h3>
                            <h3>Размер: `+size_p+`</h3>
                            <h3>Тесто: `+testo+`</h3>
                            <h3>Цена: `+money+` руб.</h3>
                        </div>
                    `
                    }
                
            }
            async function cb(){
                await sbor();
                $.cookie('S1', s);
                $.cookie('S2', s2);
                $.cookie('Price', price);
                $.cookie('Dop', 'dopc');
                $.cookie('Name', name);
                if (email != ''){
                 $.cookie('Email', email);
                }
            }
            cb();
        }else{

        }


    });

    if ($.cookie('Name')){
        $('input[name=Name]').val($.cookie('Name'));
    }
    if ($.cookie('Email')){
        $('input[name=Email]').val($.cookie('Email'));
    }
})