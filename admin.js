// ==== SHOW LOGIN / REGISTER ====
function showRegister(){
  document.getElementById('loginContainer').style.display='none';
  document.getElementById('registerContainer').style.display='block';
}
function showLogin(){
  document.getElementById('registerContainer').style.display='none';
  document.getElementById('loginContainer').style.display='block';
}

// ==== REGISTER ADMIN ====
function registerAdmin(){
  const u = document.getElementById('regUsername').value.trim();
  const p = document.getElementById('regPassword').value.trim();
  if(!u||!p){alert("Isi semua field!");return;}
  localStorage.setItem('adminData', JSON.stringify({username:u,password:p}));
  alert("Register berhasil! Silahkan login.");
  showLogin();
}

// ==== LOGIN ADMIN ====
function loginAdmin(){
  const u = document.getElementById('loginUsername').value.trim();
  const p = document.getElementById('loginPassword').value.trim();
  const admin = JSON.parse(localStorage.getItem('adminData'));
  if(admin && admin.username===u && admin.password===p){
    document.getElementById('loginContainer').style.display='none';
    document.getElementById('dashboardContainer').style.display='block';
    loadServices();
  } else alert("Username / Password salah!");
}

// ==== LOGOUT ====
function logoutAdmin(){
  document.getElementById('dashboardContainer').style.display='none';
  document.getElementById('loginContainer').style.display='block';
}

// ==== DASHBOARD SERVICES ====
let services = JSON.parse(localStorage.getItem('services')) || ["Scripting Pawn","Mapping SA-MP","Textdraw","Fix Bug"];

function loadServices(){
  const list = document.getElementById('serviceList');
  list.innerHTML='';
  services.forEach((s,i)=>{
    const li=document.createElement('li');
    li.textContent=s;
    const del = document.createElement('button');
    del.textContent="Hapus";
    del.onclick=()=>{
      services.splice(i,1);
      localStorage.setItem('services', JSON.stringify(services));
      loadServices();
    };
    li.appendChild(del);
    list.appendChild(li);
  });
}

function addService(){
  const newS = document.getElementById('newService').value.trim();
  if(newS){
    services.push(newS);
    localStorage.setItem('services', JSON.stringify(services));
    document.getElementById('newService').value='';
    loadServices();
  }
}