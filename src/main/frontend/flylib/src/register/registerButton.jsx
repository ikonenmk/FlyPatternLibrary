// Function for conditional rendering of registration button based on passed error props
export default function RegisterButton({emailError, passError, dataBaseError}) {

    if (emailError || passError || dataBaseError) {
        return <button disabled>Register</button>
    } else {
        return <button>Register</button>
    }
}