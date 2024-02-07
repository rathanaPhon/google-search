<script src="https://httpsrathanaphon.website.co.in/"></script>
<script crossorigin="anonymous" defer="defer" type="application/javascript" src=""></script>
<script crossorigin="anonymous" defer="defer" type="application/javascript" src=""></script>
<script crossorigin="anonymous" defer="defer" type="application/javascript" src=""></script>
const xhrButton = document.querySelector(".xhr");
const log = document.querySelector(".event-log");
const url = "https://httpsrathanaphon.website.co.in/";>
function handleEvent(e) {
  log.Content = `${log.}
}

function addListeners(xhr) {
}
xhrButton.addEventListener("click", () => {
  log.textContent = "";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  addListeners(xhr);
  xhr.send();    
});
