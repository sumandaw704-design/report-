import { db } from "./firebase.js";
import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Toggle buttons
document.querySelectorAll(".toggle").forEach(btn => {

    btn.onclick = () => {

        btn.textContent =
            btn.textContent === "❌" ? "✅" : "❌";

    };

});

// Save Attendance
document.getElementById("save").onclick = async () => {

    const rows = document.querySelectorAll("table tr");

    const today = new Date().toISOString().split("T")[0];

    let data = {};

    rows.forEach((row,index)=>{

        if(index===0) return;

        const tds = row.querySelectorAll("td");

        const name = tds[0].textContent;

        const day = tds[1].textContent.includes("✅");

        const night = tds[2].textContent.includes("✅");

        data[name]={
            day,
            night
        };

    });

    await setDoc(doc(db,"Attendance",today),data);

    alert("Attendance Saved Successfully ✅");

};