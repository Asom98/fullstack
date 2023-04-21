import { useEffect, useState } from "react"

export default function MyComponent(props) {
    const [data, setData] = useState({});
    const [token, setToken] = useState(localStorage.getItem('TOKEN'));

    function handleToken() {
        setToken(localStorage.getItem('TOKEN'))
    }
    
    useEffect(() => {
        fetch(`http://localhost:5000/`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(result => {
            setData(result)
        })
        .catch(error => {
            console.error(error)
        })
    }, [token]);

    return (
        <>
        <ul>
            {Object.values(data).map(item => (
                <h1 key={item}>{item}</h1>
            ))}
        </ul>
        <button onClick={handleToken}>asdasd</button>
        </>
    )
}