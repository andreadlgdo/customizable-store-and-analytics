export type UserRegisterCustom = {
    texts: {
        toggle: {
            logIn: string
            signUp: string
        },
        logIn: {
            email: {
                label: string
                placeholder: string
            },
            password: {
                label: string
                placeholder: string
            },
            action: string
        },
        signUp: {
            name: {
                label: string
                placeholder: string
            },
            surname: {
                label: string
                placeholder: string
            },
            email: {
                label: string
                placeholder: string
            },
            password: {
                label: string
                placeholder: string
            },
            repeatPassword: {
                label: string
                placeholder: string
            },
            acceptTerms: string,
            action: string
        }
    },
    visuals: {
        colors: {
            toggle: {
                background: string
                selected: string
            },
            button: string
        }
    }
};