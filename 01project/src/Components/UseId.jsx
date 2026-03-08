import { useId } from "react";

function User () {
    const Users = useId();
    return(
        <>
            <form>
                <input type="text" id={Users + "name"} placeholder="Enter Your Name" />
                <label htmlFor={Users + "name"}>Enter Your Name</label><br /><br />
                <input type="text" id={Users + "skils"} placeholder="Enter Your skils" />
                <label htmlFor={Users + "skils"}>Enter Your skils</label><br /><br />
                <input type="checkbox" id={Users + "pen"} />
                <label htmlFor={Users + "pen"}>I have a Pen</label>
                <input type="checkbox" id={Users + "book"} />
                <label htmlFor={Users + "book"}>I have a Book</label>

                <h1>{Users}</h1>
            </form>
        </>
    )
}
export default User;