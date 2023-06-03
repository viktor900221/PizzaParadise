<template>
  
   
  <div class="stars">

<div class="star" id="star1">
                    <img src="../assets/sterne2.png" alt="">
                </div>
              
                <div class="star" id="star2">
                    <img src="../assets/sterne2.png" alt="">
                </div>
                
                <div class="star" id="star3">
                    <img src="../assets/sterne2.png" alt="">
                </div>
               
                <div class="star" id="star4">
                    <img src="../assets/sterne2.png" alt="">
                </div>
               
                <div class="star" id="star5">
                    <img src="../assets/sterne2.png" alt="">
                </div>
              
                <div class="star" id="star6">
                    <img src="../assets/sterne2.png" alt="">
                </div>
            
                <div class="star" id="star7">
                    <img src="../assets/sterne2.png" alt="">
                </div>
               
                <div class="star" id="star8">
                    <img src="../assets/sterne2.png" alt="">
                </div>
               
                <div class="star" id="star9"><img src="../assets/sterne2.png" alt=""></div>
               
                <div class="star" id="star10"><img src="../assets/sterne2.png" alt=""></div>
                
                <div class="star" id="star11">
                    <img src="../assets/sterne2.png" alt="">
                </div>
                <div class="star" id="star12">
                    <img src="../assets/sterne2.png" alt="">
                </div>
                <div class="star" id="star13">
                    <img src="../assets/sterne2.png" alt="">
                </div>
              
                 
            </div>

</template>

<script>
export default {
name: 'Stars',

mounted(){
    this.toggleHighlight();
},

methods:{
        toggleHighlight() {
      // Zufällig 2-3 Sterne auswählen
        const stars = document.querySelectorAll('.star');
  const randomIndex = Math.floor(Math.random() * stars.length);
  stars.forEach((star, index) => {
    if (index === randomIndex) {
      star.classList.add('highlight');
    } else {
      star.classList.remove('highlight');
    }
  });
   setTimeout(this.toggleHighlight, 1000);
      }
  
        }

}


</script>

<style>
/*stars*/

.stars{
    position:relative;
    z-index:-20;
}
.star {
 opacity: 0.5;
  transition: opacity 1s ease-in-out;
    z-index:0;
}

.star.highlight {
  opacity: 1;
}
#star1 {
    position: absolute;
    top: 100px;
    left: 25%;
}
#star2 {
    position:absolute;
    top: 70px;
    left: 40%;
}
#star3 {
    position:absolute;
    top:150px;
    left: 13%;
}

#star4 {
    position:absolute;
    top:100px;
    right: 10%;
}

#star5 {position:absolute;
    top:130px;
    right:50%;
}

#star6 {
    position:absolute;
    height: 5px;
    width: 5px;
    top:50px;
    left: 45%;
}

#star7 {
    position:absolute;
    top:35px;
    left: 27%;
}

#star8 {
    position:absolute;
    top:35px;
    right: 42%;
}

#star9 {
    position:absolute;
    height: 4px;
    width: 4px;
    top:50px;
    right: 48%;
}

#star10 {
    position:absolute;
    top:100px;
    right: 15%;
}

#star11 {
    position:absolute;
    top:75px;
    right: 30%;
}
#star12 {
    position:absolute;
    top:-25px;
    right: 30%;
}
#star13 {
    position:absolute;
    top:-5px;
    left: 30%;
}




</style>