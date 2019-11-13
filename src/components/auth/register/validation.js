export const validationRules = new Map([
    ["name", [
        {
            rule: value => {
                return value.length > 0
            },
            msg: "Username can not be empty"
        }
    ]],
    ["email", [
        {
            rule: value => {
                return value.length > 0
            },
            msg: "Email can not be empty"
        },
        {
            rule: value => {
                return /\S+@\S+\.\S+/.test(value)
            },
            msg: "Email format incorrect"
        }
    ]],
    ["password", [
        {
            rule: value => {
                return value.length > 0
            },
            msg: "Password can not be empty"
        },
        {
            rule: value => {
                // min 8 chars, one upper and lowercase, number and special char
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
            },
            msg: "Password must contain of at least 8 characters, one uppercase, number and special character"
        }
    ]]
])

export const validateAttribute = (attribute, inputRules) => {
    const feedback = attribute.parentNode.parentNode.getElementsByClassName("invalid-feedback")[0]
    let success = true

    inputRules.forEach(validation => {
        if (!validation.rule(attribute.value || "")) {
            attribute.classList.remove('is-valid')
            attribute.classList.add('is-invalid')

            feedback.innerHTML = validation.msg
            feedback.style.display = "block"

            success = false
        } else {
            attribute.classList.remove('is-invalid')
            attribute.classList.add('is-valid')
            feedback.style.display = "none"
        }
    })

    return success
}