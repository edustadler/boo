import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Form, Input, Upload, message } from "antd";
import { LockOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import variables from '@/src/styles/variable.module.scss'
import { setLogin } from "@/src/redux/reducer";



export const FormLogin = () => {
    const [formType, setFormType] = useState('login');
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [occupation, setOccupation] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [imageFile, setImageFile] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const API_URL = 'http://localhost:3001'

    const [messageApi, contextHolder] = message.useMessage();



    const dispatch = useDispatch();
    const router = useRouter();

    const toggleForm = () => {
        setFormType(formType === 'login' ? 'register' : 'login');
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }

        const fileList = e && e.fileList;

        // Update the imageFile state
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;

            // Convert the image file to a base64 string
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageFile(file);
                setImageBase64(reader.result);
            };
        } else {
            setImageFile(null);
            setImageBase64(null);
        }

        return fileList;
    };


    const onRegister = async (values) => {

        setRegisterLoading(true);

        try {
            const formData = new FormData();
            formData.append("picturePath", imageBase64);
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("location", values.location);
            formData.append("occupation", values.occupation);
            formData.append("email", values.email);
            formData.append("password", values.password);

            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Registration successful:", data);
                toggleForm()
            } else {
                console.error("Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setRegisterLoading(false);
        }
    };


    const onFinish = async (values) => {

        setLoginLoading(true);

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();

                dispatch(
                    setLogin({
                        user: data.user,
                        token: data.token,
                    })
                );
                console.log("Token in Redux stateeee:", data.token);

                router.push("/homePage");
            } else {
                console.error("Authentication failed");
                message.error("Authentication failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoginLoading(false);
        }
    };

    return (
        <>
            {formType === 'register'
                ? (
                    <>
                        <h2 className="mb-4" style={{ fontSize: '2rem', color: variables.mainColor }}>Signup</h2>
                        <Form
                            name="normal_signup"
                            className="w-100"
                            onFinish={onRegister}
                        >
                            <Form.Item
                                name="picturePath"
                                valuePropName="imageFile"
                                getValueFromEvent={normFile}
                                className="d-flex justify-content-center"
                            >
                                <Upload accept=".jpg, .jpeg, .png" listType="picture-card" multiple={false} name="picturePath" maxCount={1}>
                                    <div style={{ color: variables.secondColor }}>
                                        <PlusOutlined />
                                        <div
                                            style={{
                                                marginTop: 8,
                                                color: variables.secondColor
                                            }}
                                        >
                                            Upload Photo
                                        </div>
                                    </div>
                                </Upload>
                            </Form.Item>

                            <div className="d-flex" style={{ gap: '.62rem' }}>
                                <Form.Item
                                    name="firstName"
                                    rules={[{ required: true, message: 'Please insert your Name!' }]}
                                    style={{ width: '50%' }}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                                </Form.Item>
                                <Form.Item
                                    name="lastName"
                                    rules={[{ required: true, message: 'Please insert your Name!' }]}
                                    style={{ width: '50%' }}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                                </Form.Item>
                            </div>
                            <Form.Item
                                name="location"
                                style={{ width: '100%' }}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Location" />
                            </Form.Item>
                            <Form.Item
                                name="occupation"
                                style={{ width: '100%' }}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Occupation" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Email!", // Update the error message
                                    },
                                    {
                                        type: "email",
                                        message: "Invalid email format", // Add an email format validation
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Password!",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" noStyle className="w-100 primary-hover" loading={registerLoading}>
                                    <span style={{ color: variables.primaryColor }}>Register</span>
                                </Button>
                                <span style={{ color: variables.secondColor }}>Already have an account? <a href="javascript:void(0)" onClick={toggleForm} loading={loginLoading}>Login here!</a></span>
                            </Form.Item>
                        </Form>
                    </>
                )
                :
                (
                    <>
                        <h2 className="mb-4" style={{ fontSize: '2rem', color: variables.mainColor }}>Login</h2>
                        <Form
                            name="normal_login"
                            className="w-100"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email" // Change the field name to "email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your E-mail!", // Update the error message
                                    }
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Password!",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox style={{ color: variables.secondColor }}>
                                        <span style={{ color: variables.secondColor }}>Remember me!</span>
                                    </Checkbox>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" noStyle className="w-100 primary-hover">
                                    <span style={{ color: variables.primaryColor }}>Log in</span>
                                </Button>
                                <span style={{ color: variables.secondColor }}>Or <a href="javascript:void(0)" onClick={toggleForm}>register now!</a></span>
                            </Form.Item>
                        </Form>
                    </>
                )
            }
        </>
    );
};