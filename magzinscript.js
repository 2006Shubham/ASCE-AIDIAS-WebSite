const yearSelect = document.getElementById('yearSelect');
const popup = document.getElementById('popup');
const selectedYearText = document.getElementById('selectedYear');
const pdfViewer = document.querySelector('.pdf-viewer');

yearSelect.addEventListener('change', () => {
  if (yearSelect.value) {
    selectedYearText.textContent = yearSelect.options[yearSelect.selectedIndex].text;
    popup.style.display = 'block';
  }
});

function showPDF() {
  popup.style.display = 'none';
  const selectedYear = yearSelect.value;
  const pdfUrl = `${selectedYear}`;

  pdfViewer.innerHTML = '';

  pdfjsLib.getDocument(pdfUrl).promise.then(pdfDoc => {
    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      pdfDoc.getPage(pageNum).then(page => {
        const viewport = page.getViewport({ scale: 1.2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        pdfViewer.appendChild(canvas);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        page.render(renderContext).catch(error => {
          console.error("Error rendering page:", error);
        });
      }).catch(error => {
        console.error("Error getting page:", error);
      });
    }
  }).catch(error => {
    console.error("Error loading PDF:", error);
    alert("Failed to load PDF. Please check the file path and ensure the PDF exists.");
  });
}

function closePopup() {
  popup.style.display = 'none';
}


// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector('.header');
    const dropdownContainer = document.querySelector('.dropdown-container');

    // Set the sticky top offset dynamically based on navbar height
    if (navbar && dropdownContainer) {
        const navbarHeight = navbar.offsetHeight;
        dropdownContainer.style.top = `${navbarHeight}px`;
    }
});
