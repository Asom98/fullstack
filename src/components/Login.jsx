import DisplayUsers from "./DisplayUsers"

export default function Login() {
    const handleToken = (token) => {
        localStorage.setItem('TOKEN', token)
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        
        await fetch(`http://localhost:5000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json()
        })
        .then(result => {
            console.log(result);
            handleToken(result[0].accessToken)
        })
    }

    return ( 
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">username:</label>
                <input type="text" id="username" name="username" />
                </div>
                <div>
                <label htmlFor="password">password:</label>
                <input type="text" id="password" name="password" />
            </div>
            <button type="submit" >Submit</button>
        </form>
        <DisplayUsers/>
      </>
    )
}