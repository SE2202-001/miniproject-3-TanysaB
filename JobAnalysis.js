// Call the function after parsing job data
document.getElementById("fileInput").addEventListener("change", () => {
  const fileInput = document.getElementById("fileInput");
  let data;

  reader.onload = () => {
    const jobData = JSON.parse(reader.result);
    generateDropdowns(jobData); // Generate dropdowns dynamically
  };

  if (fileInput) {
    reader.readAsText(file);
  }
});


const reader = new FileReader();
let jobarr = [];
let jobarr2 = Array.from(jobarr);
let table = document.querySelector("table"); // Get the table element

var tbody = table.querySelector("tbody");
class Job 
{
    #title
    #type
    #level
    #skill
    #detail
    #posted

    constructor(title,type,level,skill,detail,posted){
        this.#title = title;
        this.#type = type;
        this.#level = level;
        this.#skill = skill;
        this.#detail = detail;
        this.#posted = posted;
    }

 getDetails(){return this.#detail}

 getFormattedPostedTime(){ 
  var numero = this.#posted.split(" ")[0];
  var min = numero * 60;
  let words = this.#posted.split(" ");
  let secondWord = words[1];
  if(secondWord == "hour"||secondWord == "hours")
  return min +" minutes";
  else return this.#posted
  }

 getTitle(){return this.#title}

 getSkill(){return this.#skill}

 getType(){return this.#type}

 getLevel(){return this.#level}
}





//reads file and stores it
function previewFile() {
  
  var levelSel = document.getElementById("level");
  var skillSel = document.getElementById("skill");
  var typeSel = document.getElementById("type");

  
  const content = document.querySelector(".content");
  const [file] = document.querySelector("input[type=file]").files;
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    
    
    
    var tr = false;
    try //Error Handling
    {
      data = JSON.parse(reader.result);
      tr = true;
    }
    catch{}
      
    if (tr == true){


  const levels = new Set(["All"]);
  const types = new Set(["All"]);
  const skills = new Set(["All"]);

  // Populate the Sets with values from the job data
  data.forEach(job => {
    levels.add(job.Level);
    types.add(job.Type);
    skills.add(job.Skill);
  });

  // Helper function to populate a dropdown
  const populateDropdown = (dropdownId, optionsSet) => {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = ""; // Clear existing options
    optionsSet.forEach(option => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      dropdown.appendChild(opt);
    });
  };

  // Populate each dropdown
  populateDropdown("level", levels);
  populateDropdown("type", types);
  populateDropdown("skill", skills);



      //clears previous rows (if any)
      tbody.innerHTML = '';

      
      //loops through each job and create a row in the table
      for (let i = 0; i < data.length; i++) 
      {
          let job = new Job(
              data[i]["Title"],
              data[i]["Type"],
              data[i]["Level"],
              data[i]["Skill"],
              data[i]["Detail"],
              data[i]["Posted"]
          );
          jobarr[i] = job;

          //creates a table row
          let row = tbody.insertRow();
          //inserts text in table
          row.insertCell(0).textContent = job.getTitle();        // Title
          row.insertCell(1).textContent = job.getDetails();      // Detail
          row.insertCell(2).textContent = job.getFormattedPostedTime(); // Posted Time
          row.insertCell(3).textContent = job.getSkill();           // Skill
          row.insertCell(4).textContent = job.getType();            // Type
          row.insertCell(5).textContent = job.getLevel();          // Level
      }
      
    }
    else {alert("JSON File not working")}
  
    }, false);

  if (file) {
      reader.readAsText(file);
  }
 
}
document.getElementById("jobs").addEventListener("click", filterJobs);

// Event listener for "Level" dropdown
levelSel.onchange = function() {
  var lev = levelSel.value;
    
};

// Event listener for "Skill" dropdown
skillSel.onchange = function() {
var skl = skillSel.value;
 
};

// Event listener for "Type" dropdown
typeSel.onchange = function() {
  var typ = typeSel.value;
 
};


function filterJobs() {

  const levelFilter = document.getElementById("level").value.trim(); // Get selected Level
  const typeFilter = document.getElementById("type").value.trim();   // Get selected Type
  const skillFilter = document.getElementById("skill").value.trim(); // Get selected Skill

  console.log("Filters Applied: ", { levelFilter, typeFilter, skillFilter }); // Debug filters
    jobarr2 = [];
  // Update the table
  tbody.innerHTML = ""; // Clear the table

  // Populate the table with filtered jobs
  for (let i = 0; i < data.length; i++) 
    {
        let job = new Job(
            data[i]["Title"],
            data[i]["Type"],
            data[i]["Level"],
            data[i]["Skill"],
            data[i]["Detail"],
            data[i]["Posted"]
        );
        if ((job.getLevel() == levelFilter || levelFilter == "All") &&
        (job.getSkill() == skillFilter || skillFilter == "All") &&
        (job.getType() == typeFilter || typeFilter == "All")) {
                  //creates a table row
                  let row = tbody.insertRow();
                  jobarr2.push(job);
                  //inserts text in table
                  row.insertCell(0).textContent = job.getTitle();        // Title
                  row.insertCell(1).textContent = job.getDetails();      // Detail
                  row.insertCell(2).textContent = job.getFormattedPostedTime(); // Posted Time
                  row.insertCell(3).textContent = job.getSkill();           // Skill
                  row.insertCell(4).textContent = job.getType();            // Type
                  row.insertCell(5).textContent = job.getLevel();          // Level
            }
            
      
    }
  
    
document.getElementById("sortJobs").addEventListener("click", sortingJobs);
}


function sortingJobs() {
  const whichsort = document.getElementById("sortOption").value; //get selected sort option
  
  //update the table with sorted jobs
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = ""; //lear the table

  jobarr2.sort((a, b) => {
    const titleA = a.getTitle().toLowerCase();
    const titleB = b.getTitle().toLowerCase();
    const timeA = parseInt(a.getFormattedPostedTime().split(" ")[0], 10); //extracts number of minutes
    const timeB = parseInt(b.getFormattedPostedTime().split(" ")[0], 10);

    if (whichsort === "Sort by Title (A-Z)") return titleA.localeCompare(titleB); //A-Z
    if (whichsort === "Sort by Title (Z-A)") return titleB.localeCompare(titleA); //Z-A
    if (whichsort === "Sort by Posted Time (Oldest First)") return timeB - timeA; //newest first
    if (whichsort === "Sort by Posted Time (Newest First)") return timeA - timeB; //oldest first;
  });

  
  for (let i = 0; i < jobarr2.length; i++) {
    const job = jobarr2[i]; // Access the Job object directly
    
    // Create a table row
    let row = tbody.insertRow();

    // Insert text into the table
    row.insertCell(0).textContent = job.getTitle();          // Title
    row.insertCell(1).textContent = job.getDetails();        // Detail
    row.insertCell(2).textContent = job.getFormattedPostedTime(); // Posted Time
    row.insertCell(3).textContent = job.getSkill();          // Skill
    row.insertCell(4).textContent = job.getType();           // Type
    row.insertCell(5).textContent = job.getLevel();          // Level
  }
}


 

