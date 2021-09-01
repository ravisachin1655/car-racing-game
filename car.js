const score = document.querySelector('.score');
const startscreen = document.querySelector('.startscreen');
const gamearea = document.querySelector('.gamearea');

 // console.log(score);

      startscreen.addEventListener('click', start);

      let player =  {speed : 5, score : 0};
       
      let keys = {arrowup : false, arrowdown :false, arrowright:false ,arrowleft: false}

       document.addEventListener('keydown',keyDown);
       document.addEventListener('keyup',keyUp);

       function keyDown(e){
           e.preventDefault();
           keys[e.key] = true;
           //console.log(keys);
          // console.log(e.key);
       }
       function keyUp(e){
           e.preventDefault();
           keys[e.key] = false;
           //console.log(keys);
           //console.log(e.key);
       }

       function collide(a, b){
           aRect = a.getBoundingClientRect();
           bRect = b.getBoundingClientRect();
           return !((aRect.bottom < bRect.top)  || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
       }

       function moveLine(){
           let Lines = document.querySelectorAll('.lines');

           Lines.forEach(function(item){

              if(item.y >= 700){
                  item.y -= 750;
              };
               item.y += player.speed;
               item.style.top = item.y + "px";            
           });
       }
       function endGame(){
           player.start = false;
           startscreen.classList.remove('hide');

           startscreen.innerHTML = "Game over <br> final Score :" + player.score+ "<br>  Click Here to Start <br> <br> devloped by <b>Sachin Ravi<b>"
       }

       function moveEnemy(car){
        let enemy = document.querySelectorAll('.enemy');

        enemy.forEach(function(item){

            if(collide(car, item)){
               // console.log("BOOM collision");
               endGame();
            }

           if(item.y >= 750){
               item.y = -250;
           item.style.left = Math.floor(Math.random() * 350 )+ "px";
        };
            item.y += player.speed;
            item.style.top = item.y + "px";            
        });
    }

function gamePlay(){
            // console.log("car is racing");  
             let car = document.querySelector('.car');

             let road = gamearea.getBoundingClientRect();
            // console.log(road);

            let roadline = document.createElement('div');
            roadline.setAttribute('class', 'lines');
            gamearea.appendChild(roadline);

           if(player.start){

            moveLine();
            moveEnemy(car);


               if(keys.ArrowUp && player.y > (road.top + 100)) {player.y -= player.speed};
               if(keys.ArrowDown && player.y < (road.bottom - 100)) {player.y += player.speed};
               if(keys.ArrowLeft && player.x > 0) {player.x -= player.speed};
               if(keys.ArrowRight && player.x < (road.width - 65)) {player.x += player.speed};

                   car.style.top = player.y + "px";           
                   car.style.left = player.x + "px"; 

               window.requestAnimationFrame(gamePlay);
               //console.log(player.score++);

               player.score++;
               score.innerText ="score :" + player.score;           }

       }

 function start(){
               //gamearea.classList.remove('hide');
               startscreen.classList.add('hide');
               gamearea.innerHTML = "";

           player.start = true;
           player.score =  0;
           window.requestAnimationFrame(gamePlay);
       
            for(x=0; x<5; x++){
                let roadline = document.createElement('div');
                roadline.setAttribute('class', 'lines');
                roadline.y = (x*150);
                roadline.style.top= roadline.y + "px";
                gamearea.appendChild(roadline);
            }
           let car = document.createElement('div');
           car.setAttribute('class','car');
           // car.innerText = "hey im ur car";
           gamearea.appendChild(car);

              player.x = car.offsetLeft;
              player.y = car.offsetTop;

           //console.log('top positon'  + car.offsetTop);
          // console.log("left postion"  + car.offsetLeft); 
           for(x=0; x<4; x++){
            let enemycar = document.createElement('div');
            enemycar.setAttribute('class', 'enemy');
            enemycar.y = ((x+1)* 350) * -1;
            enemycar.style.top= enemycar.y + "px";
            enemycar.style.backgroundColor  = randomColor();
            enemycar.style.left = Math.floor(Math.random() * 350 )+ "px";
            gamearea.appendChild(enemycar);
        }
     
}

function randomColor(){
    function c(){
        let hex = Math.floor(Math.random() * 256 ).toString(16);
        return("0" + String(hex)).substr(-2);
    }
    return "#" + c() +c() +c();
}