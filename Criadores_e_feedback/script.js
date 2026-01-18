(function() {
    emailjs.init("m48MnZAHk7p5qxseM");
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const btn = event.target.querySelector('button');
    btn.innerText = 'Enviando...';
    btn.disabled = true;

    const serviceID = 'service_pkpqmtm'; 
    const templateID = 'template_ik8fbfk';

    emailjs.sendForm(serviceID, templateID, this)
        .then(function() {
            alert('Sucesso! Seu feedback foi enviado para o meu e-mail.');
            btn.innerText = 'Enviar Comentário';
            btn.disabled = false;
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.error('Erro detalhado:', error);
            alert('Falha ao enviar. Erro: ' + JSON.stringify(error));
            btn.innerText = 'Tentar Novamente';
            btn.disabled = false;
        });
});