let publicRecords = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarDesdeArchivoJSON();
});

function cargarDesdeArchivoJSON() {
    fetch("BaseDatos_Andriux.json")
    .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
    })
    .then(data => {
        publicRecords = Array.isArray(data) ? data : [];
        renderRecords(publicRecords);
    })
    .catch(() => {
        const container = document.getElementById("records-container");
        container.innerHTML = `<div style="color:var(--text-muted);font-size:13px;">[ ADVERTENCIA: Archivo 'BaseDatos_Andriux.json' no detectado o vacío. ]</div>`;
    });
}

function renderRecords(data) {
    const container = document.getElementById("records-container");
    container.innerHTML = "";
    if (!data || data.length === 0) {
        container.innerHTML = `<div style="color:var(--text-muted);font-size:13px;">[ NO SE DETECTAN EXPENDIENTES REGISTRADOS ]</div>`;
        return;
    }
    data.forEach(sujeto => {
        const card = document.createElement("div");
        card.className = "record-card";
        const thumbHTML = sujeto.foto ? `<img src="${sujeto.foto}" class="record-thumb">` : `<div class="thumb-placeholder">SIN<br>FOTO</div>`;
        card.innerHTML = `
            <div class="record-thumb-box">${thumbHTML}</div>
            <div class="record-info">
                <div style="font-weight:bold;color:var(--neon-green);">${sujeto.nombres.toUpperCase()}</div>
                <div>ID: ${sujeto.identificacion} | CELULAR: ${sujeto.modelocelular}</div>
                <div>CIUDAD: ${sujeto.ciudad}</div>
            </div>
            <div class="record-actions">
                <button class="btn-action" onclick="viewRecord(${sujeto.id})">VISUALIZAR</button>
                <button class="btn-action btn-print" onclick="printPoster(${sujeto.id})">IMPRIMIR</button>
            </div>`;
        container.appendChild(card);
    });
}

function viewRecord(id) {
    const sujeto = publicRecords.find(s => s.id === id);
    if (!sujeto) return;
    const modalContainer = document.getElementById("modal-data-container");
    const photoHTML = sujeto.foto ? `<img src="${sujeto.foto}" style="max-width:100%; height:auto;">` : `<div style="padding:10px;">SIN FOTO</div>`;
    modalContainer.innerHTML = `
        <div class="modal-layout">
            <div class="modal-photo-box">${photoHTML}</div>
            <div class="modal-fields">
                <div><strong>Nombres:</strong> ${sujeto.nombres}</div>
                <div><strong>Identificación:</strong> ${sujeto.identificacion}</div>
                <div><strong>Edad:</strong> ${sujeto.edad} años</div>
                <div><strong>EPS/Salud:</strong> ${sujeto.eps}</div>
                <div><strong>Ciudad:</strong> ${sujeto.ciudad}</div>
                <div><strong>Móvil:</strong> ${sujeto.movil}</div>
                <div><strong>Modelo Celular:</strong> ${sujeto.modelocelular}</div>
                <div><strong>Dirección de Residencia:</strong> ${sujeto.direccion}</div>
                <div><strong>Correo:</strong> ${sujeto.correo}</div>
                <div style="border:none;margin-top:15px;"><strong>Antecedentes:</strong><br><span style="color:var(--neon-green);">${sujeto.antecedentes}</span></div>
            </div>
        </div>`;
    document.getElementById("view-modal").style.display = "flex";
}
function closeModal() { document.getElementById("view-modal").style.display = "none"; }

function printPoster(id) {
    const sujeto = publicRecords.find(s => s.id === id);
    if (!sujeto) return;
    const target = document.getElementById("print-poster-target");
    const posterPhotoHTML = sujeto.foto ? `<img src="${sujeto.foto}">` : `<div class="poster-photo-placeholder">[ ${sujeto.nombres} ]<br><br>SIN FOTO</div>`;
    target.innerHTML = `
        <div class="poster-title-red">CARTEL DE LOS MAS BUSCADOS ANDRIUX</div>
        <div class="poster-subheader">Sujeto bajo investigación</div>
        <div class="poster-photo-container">${posterPhotoHTML}</div>
        <div class="poster-grid">
            <div><strong>Nombres:</strong> ${sujeto.nombres}</div>
            <div><strong>Identificación:</strong> ${sujeto.identificacion}</div>
            <div><strong>Edad:</strong> ${sujeto.edad} años</div>
            <div><strong>EPS/Salud:</strong> ${sujeto.eps}</div>
            <div><strong>Ciudad:</strong> ${sujeto.ciudad}</div>
            <div><strong>Móvil/Teléfono:</strong> ${sujeto.movil}</div>
            <div><strong>Modelo Celular:</strong> ${sujeto.modelocelular}</div>
            <div><strong>Dirección:</strong> ${sujeto.direccion}</div>
            <div><strong>Correo Elec.:</strong> ${sujeto.correo}</div>
            <div class="poster-antecedentes"><strong>Notas:</strong><br>${sujeto.antecedentes}</div>
        </div>`;
    window.print();
}
