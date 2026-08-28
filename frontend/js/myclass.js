const students = [
  {id:1,name:"Rahul Kumar",roll:"01",email:"rahul.kumar@student.edu",status:"present",checkin:"09:42 AM",confidence:98},
  {id:2,name:"Aman Singh",roll:"02",email:"aman.singh@student.edu",status:"absent",checkin:"—",confidence:null},
  {id:3,name:"Priya Sharma",roll:"03",email:"priya.sharma@student.edu",status:"present",checkin:"09:45 AM",confidence:96},
  {id:4,name:"Arjun Verma",roll:"04",email:"arjun.verma@student.edu",status:"present",checkin:"09:41 AM",confidence:97},
  {id:5,name:"Neha Gupta",roll:"05",email:"neha.gupta@student.edu",status:"absent",checkin:"—",confidence:null},
  {id:6,name:"Rohit Das",roll:"06",email:"rohit.das@student.edu",status:"present",checkin:"09:44 AM",confidence:99}
];

let sortKey = "roll", sortDir = 1;
const $ = s => document.querySelector(s);
const initials = name => name.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase();

function render() {
  const q = $("#search").value.trim().toLowerCase();
  const f = $("#filter").value;
  let rows = students.filter(s => (!q || s.name.toLowerCase().includes(q) || s.roll.includes(q)) && (f==="all" || s.status===f));
  rows.sort((a,b)=>{
    const av = a[sortKey], bv = b[sortKey];
    return String(av).localeCompare(String(bv), undefined, {numeric:true}) * sortDir;
  });
  $("#studentRows").innerHTML = rows.map(s=>`
    <tr>
      <td><div class="student"><div class="student-avatar">${initials(s.name)}</div><div><div class="student-name">${s.name}</div><div class="student-email">${s.email}</div></div></div></td>
      <td class="roll">#${s.roll}</td>
      <td><span class="badge ${s.status}"><span>${s.status==="present"?"●":"●"}</span>${s.status.toUpperCase()}</span></td>
      <td>${s.checkin}</td>
      <td class="action-col"><div class="actions">
        <button class="mark-btn ${s.status==="present"?"on-present":""}" onclick="setStatus(${s.id},'present')">✓ Present</button>
        <button class="mark-btn ${s.status==="absent"?"on-absent":""}" onclick="setStatus(${s.id},'absent')">✕ Absent</button>
        <button class="details-btn" title="View details" onclick="openStudent(${s.id})"><i data-lucide="more-horizontal"></i></button>
      </div></td>
    </tr>`).join("");
  const shown = rows.length;
  $("#showing").textContent = `Showing ${shown} of ${students.length} students`;
  updateStats();
  lucide.createIcons();
}

function updateStats(){
  const total=students.length, present=students.filter(s=>s.status==="present").length, absent=total-present, pct=total?Math.round(present/total*100):0;
  $("#total").textContent=total;
  $("#present").textContent=present;
  $("#absent").textContent=absent;
  $("#percentage").textContent=pct+"%";
  $("#presentSub").textContent=pct+"% of class";
  $("#absentSub").textContent=(100-pct)+"% of class";
}

function setStatus(id,status){
  const s=students.find(x=>x.id===id); if(!s || s.status===status) return;
  s.status=status;
  if(status==="present"){
    const now=new Date();
    s.checkin=now.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
    s.confidence=s.confidence || 97;
  } else {s.checkin="—";s.confidence=null}
  render();
  addActivity(s,status);
  toast(`${s.name} marked ${status==="present"?"Present":"Absent"}`);
}

function addActivity(s,status){
  const list=$("#activityList");
  const item=document.createElement("div");
  item.className="activity-item";
  item.innerHTML=`<div class="activity-icon ${status==="absent"?"abs":""}"><i data-lucide="${status==="present"?"user-check":"user-x"}"></i></div><div class="activity-copy"><strong>${s.name} marked ${status==="present"?"Present":"Absent"}</strong><span>${status==="present"&&s.confidence?`Confidence ${s.confidence}%`:"Manual attendance update"}</span></div><span class="activity-time">Just now</span>`;
  list.prepend(item);
  while(list.children.length>4) list.lastElementChild.remove();
  lucide.createIcons();
}

function openStudent(id){
  const s=students.find(x=>x.id===id), pct=s.status==="present"?80:78;
  $("#modalAvatar").textContent=initials(s.name);$("#modalName").textContent=s.name;$("#modalRoll").textContent=`Roll number #${s.roll}`;
  const badge=$("#modalStatus"); badge.textContent=s.status.toUpperCase(); badge.className=`badge ${s.status}`;
  $("#modalEmail").textContent=s.email;$("#modalAttendance").textContent=pct+"%";$("#modalPresent").textContent=s.status==="present"?"48":"47";$("#modalAbsent").textContent=s.status==="present"?"12":"13";$("#modalCheckin").textContent=s.checkin;$("#modalConfidence").textContent=s.confidence?s.confidence+"%":"Manual";
  $("#modal").classList.add("open");
}
function toast(msg){const t=$("#toast");t.querySelector("span").textContent=msg;t.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("show"),2200)}
function updateClock(){
  const d=new Date();
  $("#liveClock").textContent=d.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"});
  $("#todayDate").textContent=d.toLocaleDateString([], {weekday:"long",year:"numeric",month:"long",day:"numeric"});
}
$("#search").addEventListener("input",render);$("#filter").addEventListener("change",render);
document.querySelectorAll("th[data-sort]").forEach(th=>th.addEventListener("click",()=>{const k=th.dataset.sort;if(sortKey===k)sortDir*=-1;else{sortKey=k;sortDir=1}render()}));
$("#copyBtn").addEventListener("click",async()=>{await navigator.clipboard?.writeText($("#joinCode").textContent);toast("Join code copied")});
$("#closeModal").addEventListener("click",()=>$("#modal").classList.remove("open"));
$("#modal").addEventListener("click",e=>{if(e.target===$("#modal"))$("#modal").classList.remove("open")});
$("#menuBtn").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
$("#backBtn").addEventListener("click",()=>toast("Back to Classrooms"));
$("#manageBtn").addEventListener("click",()=>toast("Student management opened"));
function startSession(){toast("Opening live attendance session…")}
$("#sessionBtn").addEventListener("click",startSession);$("#sessionBtn2").addEventListener("click",startSession);
$("#activityList").innerHTML=`
<div class="activity-item"><div class="activity-icon"><i data-lucide="user-check"></i></div><div class="activity-copy"><strong>Rahul Kumar marked Present</strong><span>Confidence 98%</span></div><span class="activity-time">2m ago</span></div>
<div class="activity-item"><div class="activity-icon"><i data-lucide="user-check"></i></div><div class="activity-copy"><strong>Priya Sharma marked Present</strong><span>Confidence 96%</span></div><span class="activity-time">4m ago</span></div>
<div class="activity-item"><div class="activity-icon abs"><i data-lucide="user-x"></i></div><div class="activity-copy"><strong>Aman Singh marked Absent</strong><span>Manual attendance update</span></div><span class="activity-time">6m ago</span></div>`;
updateClock();setInterval(updateClock,1000);render();lucide.createIcons();
