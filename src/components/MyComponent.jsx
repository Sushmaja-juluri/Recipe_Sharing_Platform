import {useNavigate} from "react-router-dom"
export function MyComponent(){
    const navigate=useNavigate();
    return(
        <>
        hello
        <button onClick={()=>{navigate('/dashboard')}}>navigate</button>
        </>

    )

}
