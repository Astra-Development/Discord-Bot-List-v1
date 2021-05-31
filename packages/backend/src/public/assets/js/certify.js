var recaptcha_token = null;

function update_token(token) {
    recaptcha_token = token;
}

function flash(element_id) {
    let element = document.getElementById(element_id);

    const yOffset = -100;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });

    element.style.border = "2px solid #ff0000";
    element.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    setTimeout(() => {
        element.style.backgroundColor = "rgba(0, 0, 0, 0)";
        element.style.border = "1px solid #888";
    }, 600)
}

function submit(edit = false) {
    var $select = $('#api').selectize({
        delimiter: ',',
        persist: false,
    });
    var $select2 = $('#tos').selectize({
        delimiter: ',',
        persist: false,
    });
    var $select3 = $('#bot').selectize({
        delimiter: ',',
        persist: false,
    });
    var selectizeControl = $select[0].selectize
    var selectizeControl2 = $select2[0].selectize
    var selectizeControl3 = $select3[0].selectize
    let form_items = ["bot", "longdesc"]
    let data = {}
    for (let form_item of form_items) {
        data[form_item] = $(`#${form_item}`).val()
    }
    if (selectizeControl.getValue().includes('No') || selectizeControl.getValue().includes('certify')) return new Noty({
        type: "error",
        text: 'You aren\'t using our API',
        theme: "sunset",
        timeout: 3500
    }).show()
    if (selectizeControl2.getValue().includes('No') || selectizeControl2.getValue().includes('certify')) return new Noty({
        type: "error",
        text: 'You bot isn\'t following Discord ToS or Discord Bot Directory Rules',
        theme: "sunset",
        timeout: 3500
    }).show()
    data["id"] = selectizeControl3.getValue()[0];
    data["long"] = data["longdesc"];
    data["prefix"] = "certify"
    data["certlong"] = data["longdesc"];
    data["recaptcha_token"] = recaptcha_token;
    data["description"] = "certify";
    let method = "PATCH";
    console.log(data.id)
    fetch(`/api/cert/${data.id}`, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(body => body.json()).then(body => {
        if (!body.success) {
            recaptcha_token = null;
            grecaptcha.reset();
            let opts = {
                type: "error",
                text: body.message,
                theme: "sunset",
                timeout: 3500
            }
            if (body.button) {
                opts.buttons = [
                    Noty.button(body.button.text, 'btn btn-success', function () {
                        location.href = body.button.url
                    }),
                ]
            }
            new Noty(opts).show();
        } else {
            location.href = "/success"
        }
    })
}
$(document).ready(async function () {
    var $select = $('#api').selectize({
        persist: false,
        maxItems: 1,
        placeholder: 'Select your option'
    });
    var $select2 = $('#tos').selectize({
        persist: false,
        maxItems: 1,
        placeholder: 'Select your option'
    });
    var $select2 = $('#bot').selectize({
        persist: false,
        maxItems: 1,
        placeholder: 'Select your option'
    });
})