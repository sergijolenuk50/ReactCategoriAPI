// // import React from "react";
// // import {Button, Form, Input} from "antd";
// // import {IUserRegisterRequest} from "./types.ts";
// // import {useNavigate} from "react-router-dom";
// // import {useRegisterUserMutation} from "../../services/authApi.ts";
// //
// // const {Item} = Form;
// //
// // const LoginPage : React.FC = () => {
// //
// //     const [form] = Form.useForm<IUserRegisterRequest>();
// //     const navigate = useNavigate();
// //     const [registerUser] = useRegisterUserMutation();
// //
// //     const onFinish = async (values: IUserRegisterRequest) => {
// //         try {
// //             console.log("Register user", values);
// //             const response = await registerUser(values).unwrap();
// //             console.log("Користувача успішно зареєстровано", response);
// //             navigate("..");
// //         } catch (error) {
// //             console.error("Поилка при реєстрації", error);
// //         }
// //     }
// //
// //     return (
// //         <>
// //             <h1 className={"text-center text-4xl font-bold text-blue-500"}>Реєстрація на сайті</h1>
// //
// //     <div style={ {maxWidth:'400px', margin:'0 auto'}}>
// //     <Form
// //         form={form}
// //     onFinish={onFinish}
// //     layout="vertical">
// //
// //     <Item
// //         name="username"
// //     label={"Електронна пошта"}
// //     rules={[
// //             {required:true, message:"Вкажіть свою пошшту"},
// //     { type: "email", message: "Введіть коректний email" }
// // ]}>
// //     <Input placeholder={"Електронна пошта"}/>
// //     </Item>
// //
// //     <Item
// //     name="password"
// //     label="Пароль"
// //     rules={[
// //             { required: true, message: "Введіть пароль" },
// //     { min: 6, message: "Пароль має містити щонайменше 6 символів" }
// // ]}
// // >
// //     <Input.Password placeholder="Введіть пароль" />
// //         </Item>
// //
// //         <Item
// //     name="confirmPassword"
// //     label="Підтвердження паролю"
// //     dependencies={["password"]}
// //     rules={[
// //             { required: true, message: "Підтвердіть пароль" },
// //     ({ getFieldValue }) => ({
// //         validator(_, value) {
// //             if (!value || getFieldValue("password") === value) {
// //                 return Promise.resolve();
// //             }
// //             return Promise.reject(new Error("Паролі не співпадають"));
// //         },
// //     }),
// // ]}
// // >
// //     <Input.Password placeholder="Повторіть пароль" />
// //     </Item>
// //
// //     <Item>
// //     <Button type="primary" htmlType="submit">
// //         Реєстарція
// //         </Button>
// //         </Item>
// //         </Form>
// //         </div>
// //         </>
// // )
// // }
// //
// // export default LoginPage;
//
//
// import React from "react";
// import {Button, Form, Input} from "antd";
// import {IUserLoginRequest, IUserRegisterRequest} from "./types.ts";
// import {GoogleOAuthProvider} from "@react-oauth/google";
// import {APP_ENV} from "../../env";
// // import {useNavigate} from "react-router-dom";
// // import {useRegisterUserMutation} from "../../services/authApi.ts";
//
// const {Item} = Form;
//
// const LoginPage: React.FC = () => {
//
//     const [form] = Form.useForm<IUserRegisterRequest>();
//     // const navigate = useNavigate();
//     // const [registerUser] = useRegisterUserMutation();
//
//     const onFinish = async (values: IUserLoginRequest) => {
//
//         console.log("Login user", values);
//         // try {
//         //     console.log("Register user", values);
//         //     const response = await registerUser(values).unwrap();
//         //     console.log("Користувача успішно зареєстровано", response);
//         //     navigate("..");
//         // } catch (error) {
//         //     console.error("Поилка при реєстрації", error);
//         // }
//     }
//
//     return (
//         <>
//             <GoogleOAuthProvider clientId={APP_ENV.CLIENT_ID}>
//                 <h1 className={"text-center text-4xl font-bold text-blue-500"}>Вхід на сайт</h1>
//
//                 <div style={{maxWidth: '400px', margin: '0 auto'}}>
//                     <Form
//                         form={form}
//                         onFinish={onFinish}
//                         layout="vertical">
//
//                         <Item
//                             name="username"
//                             label={"Електронна пошта"}
//                             rules={[
//                                 {required: true, message: "Вкажіть свою пошшту"},
//                                 {type: "email", message: "Введіть коректний email"}
//                             ]}>
//                             <Input placeholder={"Електронна пошта"}/>
//                         </Item>
//
//                         <Item
//                             name="password"
//                             label="Пароль"
//                             rules={[
//                                 {required: true, message: "Введіть пароль"},
//                                 {min: 6, message: "Пароль має містити щонайменше 6 символів"}
//                             ]}
//                         >
//                             <Input.Password placeholder="Введіть пароль"/>
//                         </Item>
//
//
//                         <Item>
//                             <Button type="primary" htmlType="submit">
//                                 Вхід
//                             </Button>
//                         </Item>
//                     </Form>
//                 </div>
//             </GoogleOAuthProvider>
//         </>
//     )
// }
//
// export default LoginPage;

import React from "react";
import {Button, Form, Input} from "antd";
import {IUserLoginRequest, IUserRegisterRequest} from "./types.ts";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {APP_ENV} from "../../env";
import GoogleLoginButton from "./GoogleLoginButton.tsx";
import { GoogleOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {useGoogleLoginUserMutation} from "../../services/authApi.ts";

const {Item} = Form;

const LoginPage: React.FC = () => {

    const [form] = Form.useForm<IUserRegisterRequest>();
    const navigate = useNavigate();
    const [googleLoginUser] = useGoogleLoginUserMutation();

    const onFinish = async (values: IUserLoginRequest) => {

        console.log("Login user", values);
        // try {
        //     console.log("Register user", values);
        //     const response = await registerUser(values).unwrap();
        //     console.log("Користувача успішно зареєстровано", response);
        //     navigate("..");
        // } catch (error) {
        //     console.error("Поилка при реєстрації", error);
        // }
    }

    const onLoginGoogleResult = async (tokenGoogle:string) => {
        try {
            console.log("Register user google", tokenGoogle);
            const response = await googleLoginUser({token: tokenGoogle}).unwrap();
            console.log("Користувача успішно зайшов через google", response);
            navigate("..");
        } catch (error) {
            console.error("Поилка при реєстрації", error);
        }
    }

    return (
        <>
            <GoogleOAuthProvider clientId={APP_ENV.CLIENT_ID}>
                <h1 className={"text-center text-4xl font-bold text-blue-500"}>Вхід на сайт</h1>

                <div style={{maxWidth: '400px', margin: '0 auto'}}>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        layout="vertical">

                        <Item
                            name="username"
                            label={"Електронна пошта"}
                            rules={[
                                {required: true, message: "Вкажіть свою пошшту"},
                                {type: "email", message: "Введіть коректний email"}
                            ]}>
                            <Input placeholder={"Електронна пошта"}/>
                        </Item>

                        <Item
                            name="password"
                            label="Пароль"
                            rules={[
                                {required: true, message: "Введіть пароль"},
                                {min: 6, message: "Пароль має містити щонайменше 6 символів"}
                            ]}
                        >
                            <Input.Password placeholder="Введіть пароль"/>
                        </Item>


                        <Item>
                            <Button type="primary" htmlType="submit">
                                Вхід
                            </Button>
                        </Item>

                        <GoogleLoginButton icon={<GoogleOutlined />} title='Увійти з Google' onLogin={onLoginGoogleResult} />

                    </Form>
                </div>
            </GoogleOAuthProvider>
        </>
    )
}

export default LoginPage;