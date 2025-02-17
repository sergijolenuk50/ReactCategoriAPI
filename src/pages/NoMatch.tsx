import { Link } from "react-router-dom";

export default function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <Link to="/">Go to the home page</Link>
        </div>
    );
}