var siteNameInput = document.getElementById('siteName');
var siteUrlInput= document.getElementById('siteUrl');
var addSiteBtn = document.getElementById('addSiteBtn');
//----------------------------------- regex
var nameBattern = /\w{3,20}/;
var urlBattren =/\w\.+(co|com)$/
sitesArray= [];


// cheack if theres sites and display it 
if(localStorage.getItem("sites") != null){
    sitesArray  = JSON.parse(localStorage.getItem('sites'))
}
displaySites()

//----------------------------- add 
function addSites(){
    var site ={
        name: siteNameInput.value,
        url:siteUrlInput.value
    }
    if( nameBattern.test(siteNameInput.value) == true &&  urlBattren.test(siteUrlInput.value)  )
    {
    sitesArray.push(site);
    localStorage.setItem('sites', JSON.stringify(sitesArray))
displaySites()
clearForm()
addSiteBtn.setAttribute("data-bs-toggle","modal");
addSiteBtn.setAttribute("data-bs-target","#exampleModal");
    }
}


// -------------------------------display 
function displaySites(){
    var container = '';
    for (let i = 0; i < sitesArray.length; i++) {
        container += `<tr>
        <td>${i+1}</td>
        <td>${sitesArray[i].name}</td>
        <td>
       <button class="btn btn-dark" onclick="visitSite(${i})">
       <i class="fa-solid fa-eye pe-2"></i>Visit
       </button>
       </td>
        <td><button class="btn btn-warning" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>`
    };
    document.getElementById('tbody').innerHTML = container
}
// ------------------------------------- clear the form 
function clearForm(){
    siteNameInput.value ="";
    siteUrlInput.value ="";
}
// ------------------------------------- delte 
function deleteSite(index){
    sitesArray.splice(index,1);
    localStorage.setItem('sites', JSON.stringify(sitesArray))
    displaySites();
 
}
// ------------------------------------- visit 
function visitSite(i){
    open(sitesArray[i].url);
}




function typing(){
    if(nameBattern.test(siteNameInput.value ) == true){
        siteNameInput.removeAttribute("data-valid");
    }else{
        siteNameInput.setAttribute("data-valid","valid");
    }
    removingAdd()
    console.log(siteNameInput.hasAttribute('data-valid') == true );

}
function typingUrl(){
    if(urlBattren.test(siteUrlInput.value ) == true){
        siteUrlInput.removeAttribute("data-valid",);
    }else{
        siteUrlInput.setAttribute("data-valid","valid");
    }
    removingAdd()
    console.log(siteUrlInput.hasAttribute('data-valid') == true );
}

function removingAdd() {
    if(siteUrlInput.hasAttribute('data-valid') == false &&
     siteNameInput.hasAttribute('data-valid') == false){
       
        addSiteBtn.removeAttribute("data-bs-target");
        addSiteBtn.removeAttribute("data-bs-toggle");
    }else{
        addSiteBtn.setAttribute("data-bs-toggle","modal");
        addSiteBtn.setAttribute("data-bs-target","#exampleModal");
    }
}