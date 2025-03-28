// import React from "react";
// import {Button, Form, Input} from "antd";
// import {IUserRegisterRequest} from "./types.ts";
// import {useNavigate} from "react-router-dom";
// import {useRegisterUserMutation} from "../../services/authApi.ts";
//
// const {Item} = Form;
//
// const RegisterPage : React.FC = () => {
//
//     const [form] = Form.useForm<IUserRegisterRequest>();
//     const navigate = useNavigate();
//     const [registerUser] = useRegisterUserMutation();
//
//     const onFinish = async (values: IUserRegisterRequest) => {
//         try {
//             console.log("Register user", values);
//             const response = await registerUser(values).unwrap();
//             console.log("Користувача успішно зареєстровано", response);
//             navigate("..");
//         } catch (error) {
//             console.error("Поилка при реєстрації", error);
//         }
//     }
//
//     return (
//         <>
//             <h1 className={"text-center text-4xl font-bold text-blue-500"}>Реєстрація на сайті</h1>
//
//             <div style={ {maxWidth:'400px', margin:'0 auto'}}>
//                 <Form
//                     form={form}
//                     onFinish={onFinish}
//                     layout="vertical">
//
//                     <Item
//                         name="username"
//                         label={"Електронна пошта"}
//                         rules={[
//                             {required:true, message:"Вкажіть свою пошшту"},
//                             { type: "email", message: "Введіть коректний email" }
//                         ]}>
//                         <Input placeholder={"Електронна пошта"}/>
//                     </Item>
//
//                     <Item
//                         name="password"
//                         label="Пароль"
//                         rules={[
//                             { required: true, message: "Введіть пароль" },
//                             { min: 6, message: "Пароль має містити щонайменше 6 символів" }
//                         ]}
//                     >
//                         <Input.Password placeholder="Введіть пароль" />
//                     </Item>
//
//                     <Item
//                         name="confirmPassword"
//                         label="Підтвердження паролю"
//                         dependencies={["password"]}
//                         rules={[
//                             { required: true, message: "Підтвердіть пароль" },
//                             ({ getFieldValue }) => ({
//                                 validator(_, value) {
//                                     if (!value || getFieldValue("password") === value) {
//                                         return Promise.resolve();
//                                     }
//                                     return Promise.reject(new Error("Паролі не співпадають"));
//                                 },
//                             }),
//                         ]}
//                     >
//                         <Input.Password placeholder="Повторіть пароль" />
//                     </Item>
//
//                     <Item>
//                         <Button type="primary" htmlType="submit">
//                             Реєстарція
//                         </Button>
//                     </Item>
//                 </Form>
//             </div>
//         </>
//     )
// }
//
// export default RegisterPage;

// import React, { useState, useRef } from "react";
// import { Button, Form, Input } from "antd";
// import { IUserRegisterRequest } from "./types.ts";
// import { useNavigate } from "react-router-dom";
// import { useRegisterUserMutation } from "../../services/authApi.ts";
// import Cropper from 'react-cropper';
// // import 'cropperjs/dist/cropper.css';
//
// const { Item } = Form;
//
// const RegisterPage: React.FC = () => {
//     const [form] = Form.useForm<IUserRegisterRequest>();
//     const navigate = useNavigate();
//     const [registerUser] = useRegisterUserMutation();
//     const [file, setFile] = useState<File | null>(null); // State для збереження файлу
//     const [image, setImage] = useState<string | null>(null); // Для відображення попереднього перегляду фото
//     const [croppedImage, setCroppedImage] = useState<string | null>(null); // Для збереження обрізаного фото
//
//     // Створимо реф для cropper
//     const cropperRef = useRef<any>(null);
//
//     // Функція для обробки вибору файлу
//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedFile = e.target.files ? e.target.files[0] : null;
//         if (selectedFile) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImage(reader.result as string); // Зберігаємо попередній перегляд фото
//             };
//             reader.readAsDataURL(selectedFile);
//             setFile(selectedFile); // Зберігаємо сам файл
//         }
//     };
//
//     // Функція для обрізання фото
//     const handleCrop = () => {
//         if (file && cropperRef.current) {
//             const croppedImageUrl = cropperRef.current.getCroppedCanvas().toDataURL();
//             setCroppedImage(croppedImageUrl); // Зберігаємо обрізане фото
//         }
//     };
//
//     // const onFinish = async (values: IUserRegisterRequest) => {
//     //     try {
//     //         const formData = new FormData();
//     //         formData.append("username", values.username);
//     //         formData.append("password", values.password);
//     //         formData.append("confirmPassword", values.confirmPassword);  // Додаємо confirmPassword
//     //
//     //         // Додаємо фото, якщо воно є
//     //         if (file) {
//     //             formData.append("photo", file);
//     //         }
//     //
//     //         // Якщо зображення обрізане, додаємо обрізане зображення
//     //         if (croppedImage) {
//     //             const croppedBlob = await (await fetch(croppedImage)).blob();
//     //             formData.append("croppedPhoto", croppedBlob, "cropped.jpg");
//     //         }
//     //
//     //         const response = await registerUser(formData).unwrap();
//     //         console.log("Користувача успішно зареєстровано", response);
//     //         navigate("..");
//     //     } catch (error) {
//     //         console.error("Помилка при реєстрації", error);
//     //     }
//     // };
//
//     const onFinish = async (values: IUserRegisterRequest) => {
//         try {
//             // Створіть об'єкт IUserRegisterRequest без FormData
//             const userData: IUserRegisterRequest = {
//                 username: values.username,
//                 password: values.password,
//                 confirmPassword: values.confirmPassword,
//                 // Якщо фото є, додайте його в об'єкт
//                 photo: file ? file : undefined, // file - це вибраний файл
//             };
//
//             // Відправляємо запит
//             const response = await registerUser(userData).unwrap();
//             console.log("Користувача успішно зареєстровано", response);
//             navigate("..");
//         } catch (error) {
//             console.error("Помилка при реєстрації", error);
//         }
//     };
//
//     return (
//         <>
//             <h1 className={"text-center text-4xl font-bold text-blue-500"}>Реєстрація на сайті</h1>
//
//             <div style={{ maxWidth: "400px", margin: "0 auto" }}>
//                 <Form form={form} onFinish={onFinish} layout="vertical">
//                     <Item
//                         name="username"
//                         label={"Електронна пошта"}
//                         rules={[
//                             { required: true, message: "Вкажіть свою пошту" },
//                             { type: "email", message: "Введіть коректний email" },
//                         ]}
//                     >
//                         <Input placeholder={"Електронна пошта"} />
//                     </Item>
//
//                     <Item
//                         name="password"
//                         label="Пароль"
//                         rules={[
//                             { required: true, message: "Введіть пароль" },
//                             { min: 6, message: "Пароль має містити щонайменше 6 символів" },
//                         ]}
//                     >
//                         <Input.Password placeholder="Введіть пароль" />
//                     </Item>
//
//                     <Item
//                         name="confirmPassword"
//                         label="Підтвердження паролю"
//                         dependencies={["password"]}
//                         rules={[
//                             { required: true, message: "Підтвердіть пароль" },
//                             ({ getFieldValue }) => ({
//                                 validator(_, value) {
//                                     if (!value || getFieldValue("password") === value) {
//                                         return Promise.resolve();
//                                     }
//                                     return Promise.reject(new Error("Паролі не співпадають"));
//                                 },
//                             }),
//                         ]}
//                     >
//                         <Input.Password placeholder="Повторіть пароль" />
//                     </Item>
//
//                     {/* Поле для завантаження фото */}
//                     <Item name="photo" label="Фото профілю">
//                         <Input type="file" onChange={handleFileChange} />
//                     </Item>
//
//                     {/* Якщо зображення вибрано, показуємо попередній перегляд та Cropper */}
//                     {image && (
//                         <div style={{ marginBottom: '20px' }}>
//                             <Cropper
//                                 src={image}
//                                 style={{ width: '100%', height: 'auto' }}
//                                 aspectRatio={1}
//                                 guides={false}
//                                 ref={cropperRef}
//                             />
//                             <Button onClick={handleCrop} style={{ marginTop: '10px' }}>
//                                 Обрізати фото
//                             </Button>
//                             {croppedImage && (
//                                 <div>
//                                     <h4>Попередній перегляд обрізаного фото:</h4>
//                                     <img src={croppedImage} alt="Cropped" style={{ width: '100px' }} />
//                                 </div>
//                             )}
//                         </div>
//                     )}
//
//                     <Item>
//                         <Button type="primary" htmlType="submit">
//                             Реєстрація
//                         </Button>
//                     </Item>
//                 </Form>
//             </div>
//         </>
//     );
// };
//
// export default RegisterPage;


import React, { useState} from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import {IUserRegisterRequest} from "./types.ts";
import { useRegisterUserMutation } from "../../services/authApi.ts";
import ImageCropper from "../../components/ImageCropper";
// import Cropper from "react-cropper";
// import "cropperjs/dist/cropper.css";

const { Item } = Form;

const RegisterPage: React.FC = () => {
    const [form] = Form.useForm<IUserRegisterRequest>();
    const navigate = useNavigate();
    const [registerUser] = useRegisterUserMutation();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const selectedFile = e.target.files ? e.target.files[0] : null;
    //     if (selectedFile) {
    //         setImage(URL.createObjectURL(selectedFile)); // Для попереднього перегляду
    //         setFile(selectedFile);  // Зберігаємо сам файл
    //     }
    // };
    //
    // const handleCrop = () => {
    //     if (cropperRef?.current) {
    //         const croppedImageUrl = cropperRef.current.getCroppedCanvas().toDataURL();
    //         setCroppedImage(croppedImageUrl); // Обрізане фото
    //     }
    // };

    const onFinish = async (values: IUserRegisterRequest) => {
        try {
            const dataToSend = { ...values, avatar: croppedImage };
            console.log("Register user", dataToSend);
            const response = await registerUser(dataToSend).unwrap();
            console.log("Користувача успішно зареєстровано", response);
            navigate("..");
        } catch (error) {
            // console.error("Поилка при реєстрації", error);
            console.error("Помилка при реєстрації", error);
        }
    // }
    };

    // // Функція для перетворення DataURL в Blob
    // const dataURLtoBlob = (dataurl: string) => {
    //     const arr = dataurl.split(","),
    //         mime = arr[0].match(/:(.*?);/)[1],
    //         bstr = atob(arr[1]),
    //         n = bstr.length,
    //         u8arr = new Uint8Array(n);
    //     while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     return new Blob([u8arr], { type: mime });
    // };

    return (
        <>
            {/*<h1 className={"text-center text-4xl font-bold text-blue-500"}>Реєстрація на сайті</h1>*/}

            {/*<div style={ {maxWidth:'400px', margin:'0 auto'}}>*/}
            {/*    <Form*/}
            {/*        form={form}*/}
            {/*        onFinish={onFinish}*/}
            {/*        layout="vertical">*/}
                    <h1 className="text-center text-4xl font-bold text-blue-500">Реєстрація на сайті</h1>

                    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
                        <Form form={form} onFinish={onFinish} layout="vertical">
                            <Item
                                name="username"
                                // label={"Електронна пошта"}
                                label="Електронна пошта"
                                rules={[
                                    {required:true, message:"Вкажіть свою пошшту"},
                                    { type: "email", message: "Введіть коректний email" }
                                ]}>
                                <Input placeholder={"Електронна пошта"}/>
                                {/*{ required: true, message: "Вкажіть свою пошту" },*/}
                                {/*{ type: "email", message: "Введіть коректний email" },*/}
                                {/*]}*/}
                                {/*>*/}
                                {/*<Input placeholder="Електронна пошта" />*/}
                            </Item>

                            <Item
                                name="password"
                                label="Пароль"
                                rules={[
                                    { required: true, message: "Введіть пароль" },
                                    // { min: 6, message: "Пароль має містити щонайменше 6 символів" }
                                    { min: 6, message: "Пароль має містити щонайменше 6 символів" },
                                ]}
                            >
                                <Input.Password placeholder="Введіть пароль" />
                            </Item>
                            <label htmlFor="fileSelect" className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800">
                                Обрати фото
                            </label>
                            <input
                                id="fileSelect"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        setSelectedImage(URL.createObjectURL(e.target.files[0]));
                                    }
                                }}
                            />

                            {selectedImage && <ImageCropper image={selectedImage} onCrop={setCroppedImage} />}

                            <Item>
                                <Button type="primary" htmlType="submit">
                                    Реєстрація
                                </Button>
                            </Item>
                        </Form>
                    </div>
                </>

                );
                };

export default RegisterPage;
