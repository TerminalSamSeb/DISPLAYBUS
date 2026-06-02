function updateClock() {

    const now = new Date();

    const hari = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
    ];

    const bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    const namaHari = hari[now.getDay()];

    const tanggal =
        now.getDate();

    const namaBulan =
        bulan[now.getMonth()];

    const tahun =
        now.getFullYear();

    document.getElementById("date").innerHTML =
        `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString("id-ID");

}

setInterval(updateClock, 1000);
updateClock();

const SHEET_URL =
"https://opensheet.elk.sh/1pa-yjnRWAgdpZvwo9ix6dH6TAusZaGFFifaxvfRQC1A/JADWAL";

async function loadSchedule(){

    try{

        const response = await fetch(SHEET_URL);
        const data = await response.json();

        let html = "";

        data.forEach((item,index)=>{

            let statusClass = "";

if(item.Status.toLowerCase() === "boarding"){
    statusClass = "status-boarding";
}
else if(item.Status.toLowerCase() === "siap"){
    statusClass = "status-siap";
}
            html += `
            <tr>
                <td>${item["No"] || index+1}</td>
                <td>${item["Kendaraan"] || ""}</td>
                <td>${item["PO Bus"] || ""}</td>
                <td>${item["Tujuan"] || ""}</td>
                <td>${item["Jam"] || ""}</td>
                <td class="${statusClass}">
    ${item.Status}
</td>
            </tr>
            `;
        });

        document.getElementById("scheduleBody").innerHTML = html;
        document.getElementById("lastUpdate").innerHTML =
"Update terakhir: " +
new Date().toLocaleTimeString("id-ID");

    }catch(error){
        console.error(error);
    }

}

loadSchedule();

setInterval(loadSchedule,15000);