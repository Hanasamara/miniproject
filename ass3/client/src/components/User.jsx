function User()
{
    return (
        <div className="usercomp">
            <div className="userinput">
                <label>User Name</label>
                <input placeholder="Enter your user name"/>
            </div>  
            <div className="userinput">
                <label>Password</label>
                <input placeholder="Enter your password"/>
            </div>  
            
            <div className="bton"> 
                <button className="login">Sign In</button>
                <button className="signup">Sign up</button>
            </div>

        </div>
    );
}

export default User