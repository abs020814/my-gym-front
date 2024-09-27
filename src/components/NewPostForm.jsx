import { useNavigate } from "react-router-dom";

const NewPostForm = () => {
    
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)

        // convert to an object
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        //send request post
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formJson)
            })

            if (!response.ok) {
                console.error('Response was not OK')
            }

            const responseData = await response.json()
            console.log(responseData)

            navigate("/");

        }catch (error) { console.error(error.message)}
    }
    return (
        <div className="form-container">            
            <form method="post" onSubmit={handleSubmit}>
                <div className="form-item">
                    <label> 
                        Title: <input type="text" name="title" required={true} />
                    </label>
                </div>
                <div className="form-item">
                    <label>
                        Extract: <textarea rows={4} name="extract" required={true} />
                    </label>
                </div>
                <div className="form-item">
                    <label>
                        Content: <textarea rows={4} name="content" required={true} />
                    </label>
                </div>
                <div className="form-item">
                    <label>
                        Author Name: <input type="text" name="authorName" required={true} />
                    </label>
                </div>
                <div className="form-item">
                    <label>
                        Author eMail: <input type="email" name="authorEmail" required={true} />
                    </label>
                </div>
                <button type="submit">Add post</button>
            </form>
        
        </div>
    )

}
export default NewPostForm