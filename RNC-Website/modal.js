var modalInfo = {
  
  4: {
    title: "FPG",
    info: "The μ parameter is a basic factor describing vehicle handling dynamics and therefore, road safety. The Friction Profile Generator is a three wheeled bot where the rear two are motor driven. The front wheel has a custom locking mechanism which restricts its rotation in a single direction.  It has an array of sensors on board such as hall effect, ultrasonic and infrared. The bot then wirelessly transmits the data to a laptop where a custom-built dashboard displays a comprehensive friction profile of the surface. The data is then used to generate a safety rating (using a correlation study on friction and accident rates) for road safety assessment."
  },
  3: {
    title: "Jobot",
    info: "...."
  },
  2: {
    title: "Technofarm",
    info: "Technofarm is a project to help the farmers. It helps them get an analysis of their farm field. They get to know what their crop quality is. A camera is placed on the bot which is used to capture the image of leaves which tells the quality of crops using Machine Learning. We make use of CNN to predict the quality of the crops with the test accuracy of 94.20%. The bot is an autonomous obstacle avoiding bot which is made using an arduino uno, motor driver and rest of the components. Two ultrasonic sensors are used for avoiding the obstacle in front of it. A servo motor is attached to the bot for various applications like sowing the seeds etc."
  },
  1: {
    title: "Cerebro",
    info: "We propose a mind controlled wheelchair that can be used to help the paralysed and this would be the most economical and reliable wheelchair for paralysed to help them cope with the unanticipated disability. We are using MPU 6050, a Six-Axis (Gyro + Accelerometer) to determine the direction of movement of the wheelchair. Using a MPU 6050 instead of brainwaves to control the direction of movement reduces the number of sensors required to measure brainwaves considerably, thereby reducing the overall cost of the setup. We used a Biofeedback headset to measure the brainwaves, using Electroencephalography (EEG). These are small bands that easily sit on a person’s head and measures the brain activity through the sensors. Using Pantech Solutions developed EEG headset we measured and monitored the Alpha waves, frequency ranging from 7 Hz to 13 Hz, and mapped them to the speed of the wheelchair"
  }
};

// Get the modal
var modal = document.getElementById('preview');

// button that opens the modal
var btn = document.getElementsByClassName("button");

// <span> that closes the modal
var span = document.getElementsByClassName("close")[0];

// open modal 
for(let i = 0; i < btn.length; i++){
  btn[i].addEventListener("click", function() {
    var project = btn[i].parentElement;
    openModal(project);
  })
};

function openModal(project){
  var id = project.id;
  var img = project.getElementsByTagName("img")[0].src;
  fillOut(id, img);
  modal.style.display = "block";
  document.getElementsByClassName("modal-content")[0].classList.add("scale");
}

function fillOut(id, img){
  document.getElementById("title").innerHTML = modalInfo[id].title;
  document.getElementById("info").innerHTML = modalInfo[id].info;
  document.getElementById("img").src = img;
}

// close the modal
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}