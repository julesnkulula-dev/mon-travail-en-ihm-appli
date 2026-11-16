document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LOGIQUE COMMUNE POUR TOUTES LES PAGES (DÉDUCTION PAR PARAMÈTRES) ---
    const params = new URLSearchParams(window.location.search);
    const currentCount = params.get('count') || 0;
    const currentTotal = params.get('total') || 0;

    // Met à jour les liens de la barre de navigation inférieure avec les données actuelles du panier
    document.querySelectorAll(".bottom-nav a").forEach(link => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("catalogue.html")) {
            link.setAttribute("href", `catalogue.html?count=${currentCount}&total=${currentTotal}`);
        }
    });

    // --- 2. LOGIQUE LOGÉXCLUSIVEMENT SUR LA PAGE 1 (CARROUSEL) ---
    const track = document.getElementById('track');
    const dots = document.querySelectorAll('.indicator-dot');
    
    if (track && dots.length > 0) {
        let currentSlide = 0;
        
        window.jumpToSlide = function(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 25}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
        };

        setInterval(() => {
            currentSlide = (currentSlide + 1) % 4;
            window.jumpToSlide(currentSlide);
        }, 4000);
    }

    // --- 3. LOGIQUE LOGÉE EXCLUSIVEMENT SUR LA PAGE 2 (BOUTIQUE) ---
    const totalDisplay = document.getElementById('totalDisplay');
    const nextLink = document.getElementById('nextLink');

    if (totalDisplay && nextLink) {
        let count = parseInt(currentCount);
        let total = parseInt(currentTotal);

        // Applique l'état initial
        totalDisplay.innerText = `${count} article(s) | Total: ${total} Fc`;
        nextLink.href = `page3.html?count=${count}&total=${total}`;

        window.addItem = function(price) {
            count++;
            total += price;
            totalDisplay.innerText = `${count} article(s) | Total: ${total} Fc`;
            nextLink.href = `paiement.html?count=${count}&total=${total}`;
            
            // Synchronise aussi le menu de navigation basse
            document.querySelectorAll(".bottom-nav a").forEach(link => {
                const href = link.getAttribute("href");
                if (href && href.startsWith("catalogue.html")) {
                    link.setAttribute("href", `catalogue.html?count=${count}&total=${total}`);
                }
            });
        };
    }

    // --- 4. LOGIQUE LOGÉE EXCLUSIVEMENT SUR LA PAGE 3 (PAIEMENT) ---
    const summaryText = document.getElementById('summaryText');
    const priceButton = document.getElementById('priceButton');

    if (summaryText && priceButton) {
        summaryText.innerText = `Récapitulatif: ${currentCount} article(s) - Total à Payer: ${currentTotal},00 Fc`;
        priceButton.innerText = `${currentTotal},00 Fc`;
    }
});