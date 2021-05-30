$(document).ready(function name() {
    
    let turn = 1; // player 1 or 2
    let canPlay = false;
    targetX = 0;
    targetY = 0;

    let targetTable = 0;
    let $buttons = $(document).find(".btn");
    if($buttons.length > 1) {
        if(turn = 1) targetTable = 1;
        else targetTable = 2;
    }

    function instructionsRead() {
        let $boxes = $('input[type=checkbox]:checked');
        if($boxes.length == 2) canPlay = true;
        else canPlay = false;
    }

    $("#start-game").click(function name() {
        instructionsRead();
        if(canPlay == true) {
            canPlay = false;
            window.location.replace("skocko-podesavanja.html");
        }
    })

    $(".skochko").click(function name() {
        let currentSign = $(this).attr("class");
        if(targetTable == 0)
            fillInField('<i class="em em-smiley choice-sign" aria-role="presentation" aria-label="SMILING FACE WITH OPEN MOUTH"></i>');
        else
            fillInField('<i class="em em-smiley sign" aria-role="presentation" aria-label="SMILING FACE WITH OPEN MOUTH"></i>');
    })

    $(".spades").click(function name() {
        let currentSign = $(this).attr("class");
        if(targetTable == 0)
            fillInField('<i class="em em-spades choice-sign" aria-role="presentation" aria-label="BLACK SPADE SUIT"></i>');
        else
            fillInField('<i class="em em-spades sign" aria-role="presentation" aria-label="BLACK SPADE SUIT"></i>');
    })

    $(".star").click(function name() {
        let currentSign = $(this).attr("class");
        if(targetTable == 0)
            fillInField('<i class="em em-star choice-sign" aria-role="presentation" aria-label="WHITE MEDIUM STAR"></i>');
        else 
            fillInField('<i class="em em-star sign" aria-role="presentation" aria-label="WHITE MEDIUM STAR"></i>');
    })

    $(".clubs").click(function name() {
        let currentSign = $(this).attr("class");
        if(targetTable == 0)
            fillInField('<i class="em em-clubs choice-sign" aria-role="presentation" aria-label="BLACK CLUB SUIT"></i>');
        else
            fillInField('<i class="em em-clubs sign" aria-role="presentation" aria-label="BLACK CLUB SUIT"></i>');
    })

    $(".diamonds").click(function name() {
        let currentSign = $(this).attr("class");
        if(targetTable == 0)
            fillInField('<i class="em em-diamonds choice-sign" aria-role="presentation" aria-label="BLACK DIAMOND SUIT"></i>');
        else
            fillInField('<i class="em em-diamonds sign" aria-role="presentation" aria-label="BLACK DIAMOND SUIT"></i>');
    })

    $(".hearts").click(function name() {
        let currentSign = $(this).attr("class");
        if(targetTable == 0)
            fillInField('<i class="em em-hearts choice-sign" aria-role="presentation" aria-label="BLACK HEART SUIT"></i>');
        else
            fillInField('<i class="em em-hearts sign" aria-role="presentation" aria-label="BLACK HEART SUIT"></i>');
    })

    function fillInField(value) {
        let table = document.getElementById("table" + targetTable);
        if(targetTable == 0)
            y = targetY + 1;
        else y = targetY;
        
        if(turn == 2 && canPlay == false)
            return;

        table.rows.item(targetX).cells.item(y).innerHTML += value;
        targetY += 1;
        if(targetY == 4) {
            targetY = 0;
            targetX += 1;
            if(targetX == 1 && targetTable == 0) {
                targetX = 0;
                if(turn == 2) targetTable = 1;
            }
            else if(targetTable == 1) {
                targetTable = 2;
                targetX -= 1;
                if(targetX < 7) canPlay = true;
                else {
                    canPlay = false;
                }
            }
            else if(targetTable == 2) {
                targetTable = 1;
                if(targetX < 7) canPlay = true;
                else {
                    canPlay = false;
                }
            }
            
            turn = turn % 2 + 1;
        }
    }

    $("#submit0").click(function name() {
        if(turn == 2) {
            let table = document.getElementById("table0");
            document.getElementById("text0").innerHTML = "Drugi igrač zadaje kombinaciju:";
            for(let i = 1; i < 5; i++) {
                table.rows.item(0).cells.item(i).innerHTML = '<img src="skocko-dodatno/square.png" alt="">';
        
            }
            canPlay = true;
        }
        else if(targetTable == 1) {
            targetTable = 1;
            window.location.assign("skocko-igra.html");
        }
    })


    // napravi funkcije za vreme i povezi sa progress barovima






})