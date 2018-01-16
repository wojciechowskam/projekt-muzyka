document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#mainForm');

    form.setAttribute('novalidate', 'novalidate');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const inputs = form.querySelectorAll('input, textarea');

        let formError = false;

        for (let i=0; i<inputs.length; i++) {
            const inp = inputs[i];
            if (inp.checkValidity()) {
                inp.classList.remove('error');
            } else {
                inp.classList.add('error');
                formError = true;
            }
        }

        if (!formError) {
            const btn = form.querySelector('button[type=submit]');
            btn.classList.add('loading');
            btn.setAttribute('disabled', 'disabled');

            $.ajax({
                url : form.getAttribute('action'),
                method : form.getAttribute('method'),
                dataType : 'json',
                data : {
                    formName : $('#formName').val(),
                    formEmail : $('#formEmail').val(),
                    formMessage : $('#formMessage').val(),
                }
            }).done(function(ret) {
                alert('Wiadomość została wysłana');
                for (let i=0; i<inputs.length; i++) {
                    inputs[i].value = "";
                }
            }).always(function() {
                btn.classList.remove('loading');
                btn.removeAttribute('disabled');
            });
        }

    });
});ss
