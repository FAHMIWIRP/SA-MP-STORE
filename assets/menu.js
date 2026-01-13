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


(function(){
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("q");

  if(!keyword || keyword.length < 2) return;

  const regex = new RegExp(keyword, "gi");

  const walk = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node){
        // skip empty, script, style, noscript
        if(!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if(["SCRIPT","STYLE","NOSCRIPT"].includes(node.parentNode.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    },
    false
  );

  let node;
  let firstMatch = null;

  while(node = walk.nextNode()){
    const matches = [...node.nodeValue.matchAll(regex)];
    if(matches.length > 0){
      const frag = document.createDocumentFragment();
      let lastIndex = 0;

      matches.forEach(m=>{
        const start = m.index;
        const end = start + m[0].length;

        // teks sebelum match
        if(start > lastIndex){
          frag.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex,start)));
        }

        // buat span highlight
        const mark = document.createElement("span");
        mark.className = "highlight-scroll";
        mark.textContent = node.nodeValue.slice(start,end);
        frag.appendChild(mark);

        if(!firstMatch) firstMatch = mark;

        lastIndex = end;
      });

      // sisa teks setelah match
      if(lastIndex < node.nodeValue.length){
        frag.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex)));
      }

      node.parentNode.replaceChild(frag,node);
    }
  }

  // scroll ke match pertama
  if(firstMatch){
    setTimeout(()=>{
      firstMatch.scrollIntoView({behavior:"smooth", block:"center"});
    },300);
  }

})();