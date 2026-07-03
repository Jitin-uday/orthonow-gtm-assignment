window.dataLayer = window.dataLayer || [];

function step1(){

dataLayer.push({

event:"booking_step_complete",

step_number:1,

step_name:"location_specialty_selected",

clinic_location:document.getElementById("clinic").value,

specialty:document.getElementById("specialty").value

});

console.log(dataLayer);

document.getElementById("step1").classList.add("hidden");

document.getElementById("step2").classList.remove("hidden");

}

function step2(){

dataLayer.push({

event:"booking_step_complete",

step_number:2,

step_name:"patient_details_entered",

clinic_location:document.getElementById("clinic").value,

specialty:document.getElementById("specialty").value,

preferred_date:document.getElementById("date").value

});

console.log(dataLayer);

document.getElementById("step2").classList.add("hidden");

document.getElementById("step3").classList.remove("hidden");

}

function confirmBooking(){

dataLayer.push({

event:"booking_completed",

booking_id:"BK-"+Date.now(),

clinic_location:document.getElementById("clinic").value,

specialty:document.getElementById("specialty").value,

appointment_date:document.getElementById("date").value

});

console.log(dataLayer);

alert("Booking Confirmed");

}

function callNow(){

dataLayer.push({

event:"call_now_click",

button_location:"homepage",

phone_number:"+911234567890"

});

}

function whatsapp(){

dataLayer.push({

event:"whatsapp_click",

button_position:"floating",

destination_number:"+911234567890"

});

}

function downloadGuide(e){

e.preventDefault();

dataLayer.push({

event:"patient_guide_form_submit",

guide_name:"Patient Guide",

lead_source:"Website"

});

alert("Guide Download Triggered");

}