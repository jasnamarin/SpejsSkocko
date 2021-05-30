$(document).ready(function name() {
    
    let handler1, handler2;
    let clk1 = 0, clk2 = 0;
    let turn = 1; // player 1 or 2
    let canPlay = false; // for instructions and settings
    let canChoose1 = true; // for settings page
    let canChoose2 = false;
    let inputAllowed1 = true; // for the game
    let inputAllowed2 = false;
    targetX = 0; // table coordinates
    targetY = 0;
    let start = false;
    let k = 0;
    let arr = [];
    let j = 0;
    let currentTry = [];

    // instructions page
    function instructionsRead() {
        let $boxes = $('input[type=checkbox]:checked');
        if($boxes.length == 2) canPlay = true;
        else canPlay = false;
    }

    $("#start-game").click(function name() {
        instructionsRead();
        if(canPlay == true)
            window.location.replace("skocko-podesavanja.html");
    })

    // choosing sign combinations - events
    $(".skochko").click(function name() {
        let pageId = document.getElementsByClassName("container-fluid")[0].id;
        if(pageId == "settings")
            targetTable = 0;
        else {
            if(turn == 1) targetTable = 1;
            else targetTable = 2;
        }

        if(targetTable == 0){
            fillInField('<i class="em em-smiley choice-sign" aria-role="presentation" aria-label="SMILING FACE WITH OPEN MOUTH"></i>', "skochko");
        }
        else
            fillInField('<i class="em em-smiley sign" aria-role="presentation" aria-label="SMILING FACE WITH OPEN MOUTH"></i>', "skochko");
    })

    $(".spades").click(function name() {
        let pageId = document.getElementsByClassName("container-fluid")[0].id;
        if(pageId == "settings")
            targetTable = 0;
        else {
            if(turn == 1) targetTable = 1;
            else targetTable = 2;
        }

        if(targetTable == 0) {
            fillInField('<i class="em em-spades choice-sign" aria-role="presentation" aria-label="BLACK SPADE SUIT"></i>', "spades");
        }
        else
            fillInField('<i class="em em-spades sign" aria-role="presentation" aria-label="BLACK SPADE SUIT"></i>', "spades");
    })

    $(".star").click(function name() {
        let pageId = document.getElementsByClassName("container-fluid")[0].id;
        if(pageId == "settings")
            targetTable = 0;
        else {
            if(turn == 1) targetTable = 1;
            else targetTable = 2;
        }
        
        if(targetTable == 0) {
            fillInField('<i class="em em-star choice-sign" aria-role="presentation" aria-label="WHITE MEDIUM STAR"></i>', "star");
        }
        else 
            fillInField('<i class="em em-star sign" aria-role="presentation" aria-label="WHITE MEDIUM STAR"></i>', "star");
    })

    $(".clubs").click(function name() {
        let pageId = document.getElementsByClassName("container-fluid")[0].id;
        if(pageId == "settings")
            targetTable = 0;
        else {
            if(turn == 1) targetTable = 1;
            else targetTable = 2;
        }
        
        if(targetTable == 0) {
            fillInField('<i class="em em-clubs choice-sign" aria-role="presentation" aria-label="BLACK CLUB SUIT"></i>', "clubs");
        }
        else
            fillInField('<i class="em em-clubs sign" aria-role="presentation" aria-label="BLACK CLUB SUIT"></i>', "clubs");
    })

    $(".diamonds").click(function name() {
        let pageId = document.getElementsByClassName("container-fluid")[0].id;
        if(pageId == "settings")
            targetTable = 0;
        else {
            if(turn == 1) targetTable = 1;
            else targetTable = 2;
        }
        
        if(targetTable == 0) {
            fillInField('<i class="em em-diamonds choice-sign" aria-role="presentation" aria-label="BLACK DIAMOND SUIT"></i>', "diamonds");
        }
        else
            fillInField('<i class="em em-diamonds sign" aria-role="presentation" aria-label="BLACK DIAMOND SUIT"></i>', "diamonds");
    })

    $(".hearts").click(function name() {
        let pageId = document.getElementsByClassName("container-fluid")[0].id;
        if(pageId == "settings")
            targetTable = 0;
        else {
            if(turn == 1) targetTable = 1;
            else targetTable = 2;
        }
        
        if(targetTable == 0) {
            fillInField('<i class="em em-hearts choice-sign" aria-role="presentation" aria-label="BLACK HEART SUIT"></i>', "hearts");
        }
        else
            fillInField('<i class="em em-hearts sign" aria-role="presentation" aria-label="BLACK HEART SUIT"></i>', "hearts");
    })

    function fillInField(value, sign) {
        if(start || targetTable == 0) {
            let table = document.getElementById("table" + targetTable);
            if(targetTable == 0)
                y = targetY + 1;
            else y = targetY;
            
            if(((turn == 2 && canChoose2 == false) || (turn == 1 && canChoose1 == false))
                && targetTable == 0) return; 
            
            if(((turn == 1 && inputAllowed1 == false) || (turn == 2 && inputAllowed2 == false)) && targetTable != 0) return;

            table.rows.item(targetX).cells.item(y).innerHTML += value;
            if(targetTable == 0) {
                arr[k] = sign;
                k++;
            }
            else {
                currentTry[j] = sign;
                j = (j + 1) % 4;
            }

            targetY += 1;
            if(targetY == 4) {
                targetY = 0;
                targetX += 1;

                // in settings
                if(targetX == 1 && targetTable == 0) {
                    targetX = 0;
                    if(turn == 2) canPlay = true;
                    canChoose2 = false;
                    canChoose1 = false;
                }

                // in game - player1 made a move
                else if(targetTable == 1) {
                    targetTable = 2;
                    targetX -= 1;
                    inputAllowed1 = false;
                }
                // in game - player2 made a move
                else if(targetTable == 2) {
                    targetTable = 1;
                    inputAllowed2 = false;
                }
                
                turn = turn % 2 + 1;
            }
        }
    }

    function fillInResult(redCnt, yellowCnt) {
        if(redCnt == 4 && turn == 2)
            flag = 1;
            
        else if(redCnt == 4 && turn == 1)
            flag = 2;
            
        // fill in result for player2 - calculate position
        let resultTable = null;
        if(turn == 1) {
            resultTable = document.getElementById("p2r");
            x = targetX - 1;
        }
        // player1 - calculate position
        else {
            resultTable = document.getElementById("p1r");
            x = targetX;
        }
        y = 0;

        while(redCnt > 0) {
            resultTable.rows.item(x).cells.item(y).innerHTML += '<img src="skocko-dodatno/right.png" class="hit" alt="">';
            y++;
            redCnt--;
        }
        while(yellowCnt > 0) {
            resultTable.rows.item(x).cells.item(y).innerHTML += '<img src="skocko-dodatno/wrong.png" class="hit" alt="">'
            y++;
            yellowCnt--;
        }

        if(flag == 1) {
            alert("Prvi igrač je pobedio!");
            window.location.assign("skocko-podesavanja.html");
        }

        if(flag == 2) {
            alert("Drugi igrač je pobedio!");
            window.location.assign("skocko-podesavanja.html");
        }
    }

    // settings page
    $("#submit0").click(function name() {
        if(turn == 2) {
            let table = document.getElementById("table0");
            document.getElementById("text0").innerHTML = "Drugi igrač zadaje kombinaciju:";
            for(let i = 1; i < 5; i++) {
                table.rows.item(0).cells.item(i).innerHTML = '<img src="skocko-dodatno/square.png" alt="">';
            }
            canChoose2 = true;
        }
        else if(canPlay == true) {
            localStorage.setItem("arr", arr);
            window.location.assign("skocko-igra.html");
        }
    })

    // in game
    $("#submit1").click(function name() {
        if(targetY == 0 && targetX < 7) {
            let reds = 0, yellows = 0;

            if(turn == 2) {
                if(arr[4] == currentTry[0]) reds += 1;
                if(arr[5] == currentTry[1]) reds += 1;
                if(arr[6] == currentTry[2]) reds += 1;
                if(arr[7] == currentTry[3]) reds += 1;

                let dont_count = [0, 0, 0, 0];
                for(let m = 0; m < 4; m++) {
                    for(let n = 0; n < 4; n++) {
                        if(arr[m+4] == currentTry[n] && dont_count[n] == 0){
                            yellows += 1;
                            dont_count[n] = 1;
                            break;
                        }
                    }
                }
                fillInResult(reds, yellows - reds);
                inputAllowed2 = true;
                handler2 = setInterval(stopwatch2, 100);
                clearInterval(handler1);
            }

            else {
                if(arr[0] == currentTry[0]) reds += 1;
                if(arr[1] == currentTry[1]) reds += 1;
                if(arr[2] == currentTry[2]) reds += 1;
                if(arr[3] == currentTry[3]) reds += 1;

                let dont_count = [0, 0, 0, 0];
                for(let m = 0; m < 4; m++) {
                    for(let n = 0; n < 4; n++) {
                        if(arr[m] == currentTry[n] && dont_count[n] == 0){
                            yellows += 1;
                            dont_count[n] = 1;
                            break;
                        }
                    }
                }   
                fillInResult(reds, yellows - reds);
                inputAllowed1 = true;
                clearInterval(handler2);
                handler1 = setInterval(stopwatch1, 100);
            }
        } 
    })

    $("#new-game").click(function name() {
        window.location.assign("skocko-podesavanja.html");
    })

    function stopwatch1() {
        //currTime = $("#time1").height();
        clk1 += 0.1;
        $("#time1").height($("#bar1").height() * clk1 / 60);
        if($("#time1").height() >= $("#bar1").height()) {
            clearInterval(handler1);
            alert("Drugi igrač je pobedio!");
            window.location.assign("skocko-podesavanja.html");
        }
    }

    function stopwatch2() {
        //currTime = $("#time2").height();
        clk2 += 0.1;
        $("#time2").height($("#bar2").height() * clk2 / 60);
        if($("#time2").height() >= $("#bar2").height()) {
            clearInterval(handler2);
            alert("Prvi igrač je pobedio!");
            window.location.assign("skocko-podesavanja.html");
        }
    }

    $("#start").click(function name() {
        start = true;
        arr = localStorage.getItem("arr").split(",");
        handler1 = setInterval(stopwatch1, 100);
    })

})