document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Logic
    const toggleBtn = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // Função global para ser usada no HTML
    window.toggleMenu = function () {
        mobileMenu.classList.toggle('active');
        // Animar ícone hamburguer (opcional, pode ser feito via CSS class)
        const spans = toggleBtn.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            // Desabilita scroll do body
            document.body.style.overflow = 'hidden';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    toggleBtn.addEventListener('click', window.toggleMenu);

    // 3. Modal Logic
    const modal = document.getElementById('contactModal');

    window.openModal = function () {
        modal.style.display = 'flex';
        // Fechar menu mobile se estiver aberto
        if (mobileMenu.classList.contains('active')) {
            window.toggleMenu();
        }
    }

    window.closeModal = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    // 4. Form Submission & WhatsApp Integration
window.submitForm = function (e) {
    e.preventDefault();
    
    const form = e.target;
    const btn = form.querySelector('button');
    const originalText = btn.innerText;
    const nome = form.querySelector('input[type="text"]').value;
    const telefone = form.querySelector('input[type="tel"]').value;
    const mensagem = form.querySelector('textarea').value;

    
    const numeroWhatsApp = "5511992125734";
    const textoMensagem = 
        `*Novo Contato - Ministério Peniel* ⛪\n\n` +
        `*Nome:* ${nome}\n` +
        `*WhatsApp:* ${telefone}\n\n` +
        `*Mensagem:* \n_${mensagem}_`;

    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensagem)}`;

    
    btn.innerText = "Enviando oração...";
    btn.style.opacity = "0.8";
    btn.disabled = true; 
    setTimeout(() => {
        
        window.open(urlWhatsApp, '_blank');

        btn.innerText = "Recebemos seu pedido!";
        btn.style.background = "linear-gradient(135deg, #2ecc71, #27ae60)";
        btn.style.color = "#fff";

        setTimeout(() => {
            closeModal();
            form.reset(); 
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "";
                btn.style.opacity = "1";
                btn.disabled = false;
            }, 500);
        }, 2000);
    }, 1500);
}

    // 5. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Animar apenas uma vez
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animatedElements = document.querySelectorAll('.card, .leader-content, .address-card');

    animatedElements.forEach((el) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(el);
    });
});