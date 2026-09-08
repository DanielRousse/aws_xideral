const tareasData = [
  {
    id: "tarea-1",
    modulo: "Módulo 1: Infraestructura & Herramientas",
    titulo: "Aprovisionamiento de Herramientas: AWS EC2 y Entorno Local CachyOS",
    descripcion: "Documentación técnica del aprovisionamiento de una instancia remota en AWS EC2 (Docker, Zsh, análisis de cuota EBS) y la configuración de un entorno interactivo en CachyOS con Fish Shell, venv, Jupyter Notebook y Docker con Docker Compose.",
    fecha: "Septiembre 2026",
    estado: "completed",
    estadoTexto: "Completada",
    tags: ["AWS EC2", "CachyOS", "Docker", "Docker Compose", "Fish Shell", "Zsh", "Jupyter", "Python 3.14", "Troubleshooting"],
    criterios: [
      "Instancia AWS EC2 aprovisionada con actualización integral (apt update & upgrade).",
      "Instalación y verificación de Zsh y Docker Engine en entorno cloud.",
      "Diagnóstico y documentación técnica de límite de almacenamiento EBS durante instalación de Python.",
      "Configuración de entorno virtual (.venv) en CachyOS adaptado a la sintaxis de Fish Shell (activate.fish).",
      "Instalación y registro exitoso del kernel 'Python (curso-aws)' en Jupyter Notebook verificado en http://localhost:8888.",
      "Instalación de Docker & Docker Compose en CachyOS (pacman), configuración de grupo docker sin sudo y validación con hello-world."
    ],
    codigo: `sudo apt update -y && sudo apt upgrade -y
sudo apt install -y zsh
sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "\${UBUNTU_CODENAME:-\$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl status docker
sudo systemctl start docker
sudo docker run hello-world
df -h /
cd /home/rousse/Documents/Curso-Java/curso-aws
python -m venv .venv
source .venv/bin/activate.fish
python -m pip install --upgrade pip
pip install notebook ipykernel
python -m ipykernel install --user --name=curso-aws --display-name="Python (curso-aws)"
jupyter notebook
sudo pacman -Syu docker docker-compose
sudo usermod -aG docker $USER
sudo systemctl start docker
docker run --rm hello-world`,
    pdfUrl: "docs/tareas/tarea-1/tarea-1-entornos.pdf",
    repoUrl: "https://github.com/DanielRousse/aws_xideral/blob/main/docs/tareas/tarea-1/tarea-1-entornos.md"
  }
];
const ejerciciosData = [];
const certificacionesData = [
  {
    id: "cert-well-architected",
    nombre: "AWS Well-Architected Foundations",
    emisor: "AWS Training & Certification",
    fecha: "08 de Septiembre de 2026",
    descripcion: "Acreditación oficial expedida por Amazon Web Services sobre los 6 pilares de excelencia arquitectónica en la nube: Excelencia Operativa, Seguridad, Fiabilidad, Eficacia del Rendimiento, Optimización de Costos y Sostenibilidad.",
    habilidades: ["AWS Cloud", "Well-Architected Framework", "Seguridad Cloud", "Optimización de Costos", "Alta Disponibilidad"],
    pdfUrl: "docs/certificados/certificate_AWSWellArchitectedFoundations.pdf",
    icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
  },
  {
    id: "cert-serverless-mindset",
    nombre: "Getting into the Serverless Mindset",
    emisor: "AWS Training & Certification",
    fecha: "07 de Septiembre de 2026",
    descripcion: "Acreditación oficial de Amazon Web Services en fundamentos y principios de arquitecturas Serverless, diseño desacoplado dirigido por eventos (Event-Driven), microservicios modernos y servicios serverless nativos (AWS Lambda, Amazon API Gateway y Amazon DynamoDB).",
    habilidades: ["AWS Serverless", "Event-Driven", "AWS Lambda", "API Gateway", "Arquitecturas Cloud"],
    pdfUrl: "docs/certificados/certificate_GettingIntoTheServerlessMindset.pdf",
    icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
  }
];
const proyectoIntegradorData = [];

document.addEventListener("DOMContentLoaded", () => {
  renderTareas();
  renderEjercicios();
  renderCertificaciones();
  renderProyectoIntegrador();
  initModal();
  initNavigation();
});

function renderTareas() {
  const container = document.getElementById("tareas-grid");
  if (!container) return;

  if (tareasData.length === 0) {
    container.innerHTML = `<div class="empty-state">No hay tareas</div>`;
    return;
  }

  container.innerHTML = tareasData.map(tarea => {
    let statusClass = "status-pending";
    if (tarea.estado === "completed") statusClass = "status-completed";
    if (tarea.estado === "in-progress") statusClass = "status-in-progress";

    const tagsHtml = (tarea.tags || []).map(tag => `<span class="tag-pill">${tag}</span>`).join("");

    return `
      <article class="card">
        <div>
          <div class="card-top">
            <span class="module-badge">${tarea.modulo || "Módulo"}</span>
            <span class="status-badge ${statusClass}">
              <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:currentColor;"></span>
              ${tarea.estadoTexto || "Registrada"}
            </span>
          </div>
          <h3 class="card-title">${tarea.titulo}</h3>
          <p class="card-desc">${tarea.descripcion || ""}</p>
          <div class="card-tags">${tagsHtml}</div>
        </div>
        <div class="card-footer">
          <span class="card-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${tarea.fecha || "2026"}
          </span>
          <button class="btn-card-action" onclick="abrirModalTarea('${tarea.id}')">
            Ver Detalles
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function renderEjercicios() {
  const container = document.getElementById("ejercicios-grid");
  if (!container) return;

  if (ejerciciosData.length === 0) {
    container.innerHTML = `<div class="empty-state">No hay ejercicios</div>`;
    return;
  }

  container.innerHTML = ejerciciosData.map(ej => {
    return `
      <article class="exercise-card">
        <div class="exercise-header">
          <span class="difficulty-badge ${ej.dificultadClase || 'diff-intermediate'}">${ej.dificultad || 'Práctica'}</span>
          <span class="tech-badge" style="font-size:0.75rem; padding:0.2rem 0.5rem;">${ej.lenguaje || 'Código'}</span>
        </div>
        <h3 class="card-title" style="font-size:1.1rem;">${ej.titulo}</h3>
        <p class="card-desc" style="font-size:0.88rem;">${ej.descripcion || ''}</p>
        ${ej.codigo ? `<pre class="code-snippet-preview"><code>${escapeHTML(ej.codigo.split("\n").slice(0, 3).join("\n"))}...</code></pre>` : ''}
        <div class="card-footer" style="margin-top:auto;">
          <span style="font-size:0.8rem; color:var(--text-dim); font-family:var(--font-mono);">&lt;/&gt; Solución</span>
          <button class="btn-card-action" onclick="abrirModalEjercicio('${ej.id}')">
            Inspeccionar
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function renderCertificaciones() {
  const container = document.getElementById("certificaciones-grid");
  if (!container) return;

  if (certificacionesData.length === 0) {
    container.innerHTML = `<div class="empty-state">No hay certificaciones</div>`;
    return;
  }

  container.innerHTML = certificacionesData.map(cert => {
    const skillsHtml = (cert.habilidades || []).map(h => `<span class="tag-pill">${h}</span>`).join("");
    return `
      <div class="cert-card">
        <div class="cert-icon-wrap">
          ${cert.icono || `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`}
        </div>
        <div style="flex-grow:1;">
          <div class="cert-issuer">${cert.emisor || "Emisor"}</div>
          <h3 class="cert-name">${cert.nombre}</h3>
          <div class="cert-date">${cert.fecha || "2026"}</div>
          <p class="card-desc" style="font-size:0.88rem; margin-bottom:0.75rem;">${cert.descripcion || ""}</p>
          <div class="card-tags">${skillsHtml}</div>
          <div style="margin-top:1rem; display:flex; gap:0.75rem; align-items:center; justify-content:space-between; flex-wrap:wrap;">
            <div class="cert-badge-verify">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Acreditado
            </div>
            ${cert.pdfUrl ? `
              <button class="btn-pdf" onclick="abrirModalCertificacion('${cert.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Ver Certificado
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function renderProyectoIntegrador() {
  const container = document.getElementById("proyecto-integrador-grid");
  if (!container) return;

  if (proyectoIntegradorData.length === 0) {
    container.innerHTML = `<div class="empty-state">No hay proyecto integrador</div>`;
    return;
  }

  container.innerHTML = proyectoIntegradorData.map(p => {
    const tagsHtml = (p.tags || []).map(t => `<span class="tag-pill">${t}</span>`).join("");
    return `
      <article class="card">
        <div class="card-top">
          <span class="module-badge">Proyecto Integrador</span>
          <span class="status-badge status-in-progress">En Desarrollo</span>
        </div>
        <h3 class="card-title">${p.titulo}</h3>
        <p class="card-desc">${p.descripcion || ""}</p>
        <div class="card-tags">${tagsHtml}</div>
        <div class="card-footer">
          <span class="card-date">2026</span>
          <button class="btn-card-action" onclick="abrirModalProyecto('${p.id}')">
            Ver Proyecto
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function initModal() {
  const overlay = document.getElementById("modal-overlay");
  const closeBtn = document.getElementById("modal-close-btn");

  if (closeBtn && overlay) {
    closeBtn.addEventListener("click", cerrarModal);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) cerrarModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal();
  });

  const copyBtn = document.getElementById("btn-copy-code");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const codeElem = document.getElementById("modal-code-content");
      if (codeElem && codeElem.textContent) {
        navigator.clipboard.writeText(codeElem.textContent).then(() => {
          mostrarToast("Código copiado al portapapeles con éxito");
        });
      }
    });
  }
}

function abrirModalTarea(id) {
  const tarea = tareasData.find(t => t.id === id);
  if (!tarea) return;

  const overlay = document.getElementById("modal-overlay");
  const modalContent = document.getElementById("modal-content");
  const modalTabs = document.getElementById("modal-tabs");
  document.getElementById("modal-title").textContent = tarea.titulo;
  
  let statusBadge = `<span class="status-badge status-${tarea.estado}">${tarea.estadoTexto || tarea.estado}</span>`;
  let moduleBadge = `<span class="module-badge">${tarea.modulo || "Módulo"}</span>`;
  document.getElementById("modal-badges").innerHTML = moduleBadge + statusBadge;

  const criteriosList = (tarea.criterios && tarea.criterios.length > 0)
    ? `<div style="margin:1rem 0;">
        <h4 style="color:var(--text-main); font-size:0.95rem; margin-bottom:0.5rem;">Criterios Cumplidos:</h4>
        <ul style="padding-left:1.25rem; font-size:0.9rem; color:var(--text-muted);">
          ${tarea.criterios.map(c => `<li style="margin-bottom:0.3rem;">${c}</li>`).join("")}
        </ul>
      </div>`
    : "";

  document.getElementById("modal-body").innerHTML = `
    <p>${tarea.descripcion || ""}</p>
    ${criteriosList}
  `;

  if (tarea.pdfUrl) {
    if (modalContent) modalContent.classList.add("has-pdf");
  } else {
    if (modalContent) modalContent.classList.remove("has-pdf");
  }

  if (tarea.pdfUrl && tarea.codigo) {
    if (modalTabs) modalTabs.style.display = "flex";
  } else {
    if (modalTabs) modalTabs.style.display = "none";
  }

  configurarVisorCodigo(tarea.codigo, "Código");
  configurarEnlacesYPdf(tarea.repoUrl, tarea.pdfUrl);

  if (tarea.pdfUrl) {
    cambiarPestanaModal("pdf");
  } else {
    cambiarPestanaModal("code");
  }

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function abrirModalEjercicio(id) {
  const ej = ejerciciosData.find(e => e.id === id);
  if (!ej) return;

  const overlay = document.getElementById("modal-overlay");
  const modalContent = document.getElementById("modal-content");
  const modalTabs = document.getElementById("modal-tabs");
  if (modalContent) modalContent.classList.remove("has-pdf");
  if (modalTabs) modalTabs.style.display = "none";

  document.getElementById("modal-title").textContent = ej.titulo;

  let diffBadge = `<span class="difficulty-badge ${ej.dificultadClase || 'diff-intermediate'}">${ej.dificultad || 'Práctica'}</span>`;
  let langBadge = `<span class="module-badge">${ej.lenguaje || 'Código'}</span>`;
  document.getElementById("modal-badges").innerHTML = langBadge + diffBadge;

  document.getElementById("modal-body").innerHTML = `<p>${ej.descripcion || ""}</p>`;

  configurarVisorCodigo(ej.codigo, ej.lenguaje);
  configurarEnlacesYPdf(ej.repoUrl, null);
  cambiarPestanaModal("code");

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function abrirModalCertificacion(id) {
  const cert = certificacionesData.find(c => c.id === id);
  if (!cert) return;

  const overlay = document.getElementById("modal-overlay");
  const modalContent = document.getElementById("modal-content");
  const modalTabs = document.getElementById("modal-tabs");
  if (cert.pdfUrl && modalContent) modalContent.classList.add("has-pdf");
  if (modalTabs) modalTabs.style.display = "none";

  document.getElementById("modal-title").textContent = cert.nombre;
  document.getElementById("modal-badges").innerHTML = `<span class="module-badge">${cert.emisor}</span><span class="status-badge status-completed">Acreditado</span>`;
  document.getElementById("modal-body").innerHTML = `<p>${cert.descripcion || ""}</p>`;

  configurarVisorCodigo(null, null);
  configurarEnlacesYPdf(null, cert.pdfUrl);
  cambiarPestanaModal("pdf");

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function abrirModalProyecto(id) {
  const p = proyectoIntegradorData.find(item => item.id === id);
  if (!p) return;

  const overlay = document.getElementById("modal-overlay");
  const modalContent = document.getElementById("modal-content");
  const modalTabs = document.getElementById("modal-tabs");
  if (p.pdfUrl && modalContent) modalContent.classList.add("has-pdf");

  if (p.pdfUrl && p.codigo) {
    if (modalTabs) modalTabs.style.display = "flex";
  } else {
    if (modalTabs) modalTabs.style.display = "none";
  }

  document.getElementById("modal-title").textContent = p.titulo;
  document.getElementById("modal-badges").innerHTML = `<span class="module-badge">Proyecto Integrador</span>`;
  document.getElementById("modal-body").innerHTML = `<p>${p.descripcion || ""}</p>`;

  configurarVisorCodigo(p.codigo, null);
  configurarEnlacesYPdf(p.repoUrl, p.pdfUrl);

  if (p.pdfUrl) {
    cambiarPestanaModal("pdf");
  } else {
    cambiarPestanaModal("code");
  }

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function cambiarPestanaModal(tab) {
  const pdfWrap = document.getElementById("modal-pdf-wrap");
  const codeWrap = document.getElementById("modal-code-wrap");
  const btnPdf = document.getElementById("tab-btn-pdf");
  const btnCode = document.getElementById("tab-btn-code");

  if (tab === "pdf") {
    if (pdfWrap) pdfWrap.style.display = "block";
    if (codeWrap) codeWrap.style.display = "none";
    if (btnPdf) btnPdf.classList.add("active");
    if (btnCode) btnCode.classList.remove("active");
  } else {
    if (pdfWrap) pdfWrap.style.display = "none";
    if (codeWrap) codeWrap.style.display = "block";
    if (btnPdf) btnPdf.classList.remove("active");
    if (btnCode) btnCode.classList.add("active");
  }
}

function configurarVisorCodigo(codigo, lenguaje) {
  const codeWrap = document.getElementById("modal-code-wrap");
  const codeElem = document.getElementById("modal-code-content");
  const langElem = document.getElementById("modal-code-lang");

  if (codigo) {
    codeWrap.style.display = "block";
    codeElem.textContent = codigo;
    langElem.textContent = lenguaje ? `< /> ${lenguaje}` : "< /> Código";
  } else {
    codeWrap.style.display = "none";
    codeElem.textContent = "";
  }
}

function configurarEnlacesYPdf(repoUrl, pdfUrl) {
  const pdfWrap = document.getElementById("modal-pdf-wrap");
  const pdfObj = document.getElementById("modal-pdf-object");
  const pdfEmbed = document.getElementById("modal-pdf-embed");
  const pdfFilename = document.getElementById("modal-pdf-filename");
  const btnPdfOpen = document.getElementById("btn-pdf-open");
  const btnPdfDownload = document.getElementById("btn-pdf-download");
  const btnFallbackOpen = document.getElementById("btn-pdf-fallback-open");
  const btnFallbackDownload = document.getElementById("btn-pdf-fallback-download");
  const actionsBar = document.getElementById("modal-actions-bar");

  if (pdfUrl) {
    pdfWrap.style.display = "block";
    if (pdfObj) pdfObj.data = pdfUrl;
    if (pdfEmbed) pdfEmbed.src = pdfUrl;
    const fname = pdfUrl.split("/").pop();
    if (pdfFilename) pdfFilename.textContent = fname;
    if (btnPdfOpen) btnPdfOpen.href = pdfUrl;
    if (btnPdfDownload) {
      btnPdfDownload.href = pdfUrl;
      btnPdfDownload.setAttribute("download", fname);
    }
    if (btnFallbackOpen) btnFallbackOpen.href = pdfUrl;
    if (btnFallbackDownload) {
      btnFallbackDownload.href = pdfUrl;
      btnFallbackDownload.setAttribute("download", fname);
    }
  } else {
    pdfWrap.style.display = "none";
    if (pdfObj) pdfObj.data = "";
    if (pdfEmbed) pdfEmbed.src = "";
  }

  let botonesHtml = "";
  if (repoUrl) {
    botonesHtml += `
      <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-repo">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        Ver en GitHub
      </a>
    `;
  }

  if (pdfUrl) {
    botonesHtml += `
      <a href="${pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn-pdf">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Abrir PDF
      </a>
    `;
  }

  if (botonesHtml) {
    actionsBar.innerHTML = botonesHtml;
    actionsBar.style.display = "flex";
  } else {
    actionsBar.innerHTML = "";
    actionsBar.style.display = "none";
  }
}

function cerrarModal() {
  const overlay = document.getElementById("modal-overlay");
  const pdfObj = document.getElementById("modal-pdf-object");
  const pdfEmbed = document.getElementById("modal-pdf-embed");
  const modalContent = document.getElementById("modal-content");
  if (overlay) {
    overlay.classList.remove("active");
    if (pdfObj) pdfObj.data = "";
    if (pdfEmbed) pdfEmbed.src = "";
    if (modalContent) modalContent.classList.remove("has-pdf");
    document.body.style.overflow = "";
  }
}

function initNavigation() {
  const mobileBtn = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }

  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 120;
      const sectionId = sec.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add("active");
      } else {
        if (navLink) navLink.classList.remove("active");
      }
    });
  });
}

function mostrarToast(mensaje) {
  let toast = document.getElementById("toast-notif");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notif";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f5a0" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${mensaje}</span>
  `;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

window.abrirModalTarea = abrirModalTarea;
window.abrirModalEjercicio = abrirModalEjercicio;
window.abrirModalCertificacion = abrirModalCertificacion;
window.abrirModalProyecto = abrirModalProyecto;
window.cerrarModal = cerrarModal;
window.mostrarToast = mostrarToast;
window.cambiarPestanaModal = cambiarPestanaModal;
