// Function for conditional rendering of registration button based on passed error props
export default function RegisterButton({emailError, passError, dataBaseError, handleSubmit}) {

    if (emailError || passError || dataBaseError) {
        return <button className="button-disabled" disabled>Register</button>
    } else {
        return <button className="button" onClick={handleSubmit}>Register</button>
    }
}