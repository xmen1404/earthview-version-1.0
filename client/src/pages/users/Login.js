import "../../styles/pages/users/login.css";

const Login = () => {
    return (
        <div className = "loginPage-container">
            <div className="loginPage-background"></div>
            <div className="loginPage-body">
                <div className="loginPage-welcome">
                    <div className="loginPage-name">earthview</div>
                    <div className="loginPage-quote">Cùng earthview lan tỏa những câu chuyện!</div>
                </div>
                <div className="loginPage-method">
                    <div className="loginPage-facebook">
                        Đăng nhập bằng Facebook
                    </div>
                    <div className="loginPage-google">
                        Đăng nhập bằng google
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;