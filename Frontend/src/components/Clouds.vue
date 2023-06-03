<template>
  <div class="cloudPane">
          
            <div class="bigCloud" id="cloud2">
                <div class="largeCircle" id="circ1">
                    <div class="largeCircle" id="circ1shadow"></div>
                </div>
                <div class="middleCircle" id="circ2">
                    <div class="middleCircle" id="circ2shadow"></div>
                </div>
                <div class="middleCircle" id="circ3">
                    <div class="middleCircle" id="circ3shadow"></div>
                </div>
                <div class="smallCircle" id="circ4"></div>
                <div class="smallCircle" id="circ5">
                    <div class="smallCircle" id="circ5shadow"></div>
                </div>
                <div class="smallCircle" id="circ6">
                    <div class="smallCircle" id="circ6shadow"></div>
                </div>
            </div>
  
            <div class="bigCloud" id="cloud3">
                <div class="largeCircle" id="circ1">
                    <div class="largeCircle" id="circ1shadow"></div>
                </div>
                <div class="middleCircle" id="circ2">
                    <div class="middleCircle" id="circ2shadow"></div>
                </div>
                <div class="middleCircle" id="circ3">
                    <div class="middleCircle" id="circ3shadow"></div>
                </div>
                <div class="smallCircle" id="circ4"></div>
                <div class="smallCircle" id="circ5">
                    <div class="smallCircle" id="circ5shadow"></div>
                </div>
                <div class="smallCircle" id="circ6">
                    <div class="smallCircle" id="circ6shadow"></div>
                </div>
            </div>
  
           
  
            <div class="bigCloud" id="cloud5">
                <div class="largeCircle" id="circ1">
                    <div class="largeCircle" id="circ1shadow"></div>
                </div>
                <div class="middleCircle" id="circ2">
                    <div class="middleCircle" id="circ2shadow"></div>
                </div>
                <div class="middleCircle" id="circ3">
                    <div class="middleCircle" id="circ3shadow"></div>
                </div>
                <div class="smallCircle" id="circ4"></div>
                <div class="smallCircle" id="circ5">
                    <div class="smallCircle" id="circ5shadow"></div>
                </div>
                <div class="smallCircle" id="circ6">
                    <div class="smallCircle" id="circ6shadow"></div>
                </div>
            </div>
  
            <div class="bigCloud" id="cloud6">
                <div class="largeCircle" id="circ1">
                    <div class="largeCircle" id="circ1shadow"></div>
                </div>
                <div class="middleCircle" id="circ2">
                    <div class="middleCircle" id="circ2shadow"></div>
                </div>
                <div class="middleCircle" id="circ3">
                    <div class="middleCircle" id="circ3shadow"></div>
                </div>
                <div class="smallCircle" id="circ4"></div>
                <div class="smallCircle" id="circ5">
                    <div class="smallCircle" id="circ5shadow"></div>
                </div>
                <div class="smallCircle" id="circ6">
                    <div class="smallCircle" id="circ6shadow"></div>
                </div>
            </div>
  
            <div class="bigCloud" id="cloud7">
                <div class="largeCircle" id="circ1">
                    <div class="largeCircle" id="circ1shadow"></div>
                </div>
                <div class="middleCircle" id="circ2">
                    <div class="middleCircle" id="circ2shadow"></div>
                </div>
                <div class="middleCircle" id="circ3">
                    <div class="middleCircle" id="circ3shadow"></div>
                </div>
                <div class="smallCircle" id="circ4"></div>
                <div class="smallCircle" id="circ5">
                    <div class="smallCircle" id="circ5shadow"></div>
                </div>
                <div class="smallCircle" id="circ6">
                    <div class="smallCircle" id="circ6shadow"></div>
                </div>
            </div>
</div>
</template>

<script>
export default {
name:'Clouds'
}
</script>

<style scoped>
html, body {
    min-height: 100%;

}
body {
    width: 100%;
    height:100%;
    padding: 0;
    margin: 0;
}
.cloudPane {
  margin: 0 auto;
}
/*main divs*/

.cloudPane {
    width:100%;
    z-index: -4;
}

/*cloud position*/
 #cloud1 {
    opacity: .9;
    top:50px;
    left: 30%;
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    transform: scale(1.2);
   
    z-index:2;
}
#circ1 p {
    color: #B3DAE6;
    font-size: 40px;
    font-family: helvetica;
    position: absolute;
    top: 5px;
    left: -10px;
   
}
#cloud2 {
    opacity: .8;
    top:40px;
    left: 65%;
    -webkit-transform: scale(.7);
    -moz-transform: scale(.7);
    transform: scale(.7);
    z-index: 1;
    animation: cloud-animation 20s infinite;
}
#cloud3 {
    opacity: .5;
    top:40px;
    left: 20%;
    -webkit-transform: scale(.35);
    -moz-transform: scale(.35);
    transform: scale(.35);
  animation: cloud-animation2 20s infinite;
    z-index: 0;
}
#cloud4 {
    opacity: 0;
    top:50px;
    left: 20%;
    -webkit-transform: scale(.40, .45);
    -moz-transform: scale(.40, .45);
    transform: scale(.40, .45);
   animation: cloud-animation3 20s infinite;
    z-index: 0;
}
#cloud5 {
    opacity: .9;
    top:220px;
    left: 45%;
    -webkit-transform: scale(.40);
    -moz-transform: scale(.40);
    transform: scale(.40);
  animation: cloud-animation3 20s infinite;
    z-index: 0;
}
#cloud6 {
    opacity: .7;
    top:60px;
    left: 50%;
    -webkit-transform: scale(.40);
    -moz-transform: scale(.40);
    transform: scale(.40);
    z-index: 0;
    animation: cloud-animation3 20s infinite;
}
#cloud7 {
    opacity: .8;
    top:95px;
    left: 80%;
    -webkit-transform: scale(.7);
    -moz-transform: scale(.7);
    transform: scale(.7);
   animation: cloud-animation3 20s infinite;
    z-index: 1;
}
/*individual circle position*/
 #circ1 {
    z-index: 1;
}
#circ2 {
    top: 50px;
    left: -40px;
}
#circ3 {
    top: 50px;
    left: -120px;
}
#circ4 {
    top: 30px;
    left: -60px;
}
#circ5 {
    top: 100px;
    left: -150px;
}
#circ6 {
    top: 100px;
    left: 130px;
}

/*style the clouds*/
 .bigCloud {
    box-shadow: 10px 10px 5px 20px black inset;
    position: absolute;
}
/*style circles that make up clouds*/
 .smallCircle {
    height: 100px;
    width: 100px;
    background: white;
    border-radius: 100%;
    position: absolute;
}
.middleCircle {
    height: 150px;
    width: 150px;
    background: white;
    border-radius: 100%;
    position: absolute;
}
.largeCircle {
    height: 200px;
    width: 200px;
    background: white;
    border-radius: 100%;
    position: absolute;
}



@keyframes cloud-animation {
  0% {
    transform: scale(.7);
  }
  50% {
    transform: scale(.9);
  }
  100% {
    transform: scale(.7);
  }
}
@keyframes cloud-animation2 {
  0% {
    transform: scale(.35);
  }
  50% {
    transform: scale(.50);
  }
  100% {
    transform: scale(.35);
  }
}

@keyframes cloud-animation3 {
  0% {
    transform: scale(.40, .45);
  }
  50% {
    transform: scale(.50, .55);
  }
  100% {
    transform: scale(.40, .45);
  }
}

/*put animated cloud shadows at the bottom of the page*/
</style>