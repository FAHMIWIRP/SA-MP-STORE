const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");

document.querySelectorAll(".product-card img").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImage.src = img.src;
    });
});

function closeModal() {
    modal.style.display = "none";
}
const params = new URLSearchParams(window.location.search);
const keyword = params.get("q");

if(keyword){
 const bodyText = document.body.innerHTML;
 const reg = new RegExp(`(${keyword})`, "gi");

 document.body.innerHTML = bodyText.replace(reg,
   `<span class="text-highlight">$1</span>`
 );
}
