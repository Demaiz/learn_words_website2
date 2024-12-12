let words;
let word_index;
let word_count = 0;
let number_of_right_answers = 0;
let number_of_wrong_answers = 0;

$("#select_level").click(if_difficulty_selected);

function if_difficulty_selected(){
    if($("input[name='level']:checked").val()){
        choose_difficulty();
    }
    else{
        $("#error").text("Оберіть рівень складності!");
    }
}

function choose_difficulty(){
    $("#modal").hide();
    
    let beginner_words = {
        "Apfel": "Яблуко",
        "Haus": "Будинок",
        "Klein": "Маленький",
        "Hund": "Собака",
        "Baum": "Дерево",
        "Tisch": "Стіл",
        "Blume": "Квітка",
        "Buch": "Книга",
        "Berg": "Гора",
        "Fisch": "Риба"
    };

    let intermediate_words = {
        "Schmetterling": "Метелик",
        "Flughafen": "Аеропорт",
        "Fahrrad": "Велосипед",
        "Geschenk": "Подарунок",
        "Einkaufen": "Покупки",
        "Fernseher": "Телевізор",
        "Spiegel": "Дзеркало",
        "Zug": "Поїзд",
        "Nachricht": "Повідомлення",
        "Kühlschrank": "Холодильник"
    };

    let advanced_words = {
        "Bezirksschornsteinfegermeister": "Майстер з ремонту димоходів на рівні округу",
        "Rechtsschutzversicherungsgesellschaften": "Компанії зі страхування правового захисту",
        "Restmülltütenverschlusssicherundsdraht": "Запобіжний дріт для закриття мішка для залишків відходів",
        "Telekommunikationsdienstleistungsunternehmen": "Компанія телекомунікаційних послуг",
        "Weihnachtsmannschokoladeeinpackpapier": "Обгортковий папір для шоколаду Санта Клаус",
        "Sozialversicherungsfachangestelltenausbildung": "Навчання фахівця з соціального страхування",
        "Freundschaftsbezeigungsbezeugungsversuch": "Спроба виразити дружелюбність",
        "Straßenbahnhaltestellenfrequenzbenutzungsgebühr": "Збір за користування частотою зупинок трамвая",
        "Eierschalensollbruchstellenverursacher": "Пристрій для утворення акуратної тріщини на шкаралупі яйця",
        "Hochgeschwindigkeitszügenentwicklungsprojektleiter": "Керівник проєкту з розробки швидкісних поїздів"
    };


    if($("input[name='level']:checked").val() == "beginner"){
        words = beginner_words;
    }
    if($("input[name='level']:checked").val() == "intermediate"){
        words = intermediate_words;
    }
    if($("input[name='level']:checked").val() == "advanced"){
        words = advanced_words;
    }

    start();
}

function start(){
    generate_number();
    $("#check").click(check_if_right_answer);
    $("#skip").click(skip);
}

function check_if_right_answer(){
    $("#check").prop('disabled', true);

    if($("#user_input").val().toLowerCase() == words[Object.keys(words)[word_index]].toLowerCase()){
        delete words[Object.keys(words)[word_index]];
        number_of_right_answers++;
        $("#right_value").text(number_of_right_answers);
        $("#word").css("color", "green");
        $("#word").text("Правильно!");
    }
    else{
        delete words[Object.keys(words)[word_index]];
        number_of_wrong_answers++;
        $("#wrong_value").text(number_of_wrong_answers);
        $("#word").css("color", "red");
        $("#word").text("Неправильно!");
    }

    if(word_count == 10){
        setTimeout( () => {
            alert(`Кількість правильних відповідей: ${number_of_right_answers} з 10`);
            $("#word").text("");
            $("#skip").prop('disabled', true);
        }, 1350);
        
    }
    else{
        setTimeout(generate_number, 1350);
    }
}


function generate_number(){
	word_index = Math.floor(Math.random() * (Object.keys(words).length));
	show_word();
}

function show_word(){
	$("#word").css("color", "black");
	$("#word").text(Object.keys(words)[word_index]);

    $("#check").prop('disabled', false);

    // update words counter
    word_count++;
    $("#count").text(`${word_count}/10`);

    // clear input
    $("#user_input").val("");
}

function skip(){
    delete words[Object.keys(words)[word_index]];
    number_of_wrong_answers++;
    $("#wrong_value").text(number_of_wrong_answers);

    if(word_count == 10){
        alert(`Кількість правильних відповідей: ${number_of_right_answers} з 10`);
        $("#skip").prop('disabled', true);
        $("#check").prop('disabled', true);
    }
    else{
    generate_number();
    }
}