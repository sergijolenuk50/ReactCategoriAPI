// import { Form, Input, Button, notification } from 'antd';
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCreateCategoryMutation } from "../../services/apiCategory.ts";
// import { ICategoryPostRequest } from "../../services/types.ts";

// const { Item } = Form;

// const CreateCategoryPage = () => {
//     const [createCategory] = useCreateCategoryMutation();
//     const [form] = Form.useForm<ICategoryPostRequest>();
//     const navigate = useNavigate();

//     const [imageUrl, setImageUrl] = useState<string | null>(null);

//     const onFinish = async (values: ICategoryPostRequest) => {
//         try {
//             // Перевіряємо, чи є URL для зображення
//             const categoryData: ICategoryPostRequest = {
//                 name: values.name,
//                 description: values.description || '',
//                 image: imageUrl || '', // Якщо URL зображення є, додаємо його
//             };

//             await createCategory(categoryData).unwrap();
//             notification.success({
//                 message: 'Категорію створено',
//                 description: 'Категорія успішно створена!',
//             });

//             navigate("..");
//         } catch  {
//             notification.error({
//                 message: 'Помилка створення категорії',
//                 description: 'Щось пішло не так, спробуйте ще раз.',
//             });
//         }
//     };

//     const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setImageUrl(e.target.value);
//     };

//     return (
//         <div style={{ maxWidth: '400px', margin: '0 auto' }}>
//             <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 my-6">
//                 Створити категорію
//             </h1>
//             <Form form={form} onFinish={onFinish} layout="vertical">
//                 <Item
//                     name="name"
//                     label="Назва категорії"
//                     rules={[
//                         { required: true, message: 'Будь ласка, введіть назву категорії!' },
//                         { min: 1, max: 150, message: 'Назва має бути від 1 до 150 символів' },
//                     ]}
//                 >
//                     <Input placeholder="Назва" />
//                 </Item>

//                 <Item label="Фото категорії">
//                     <Input
//                         placeholder="Введіть URL зображення"
//                         value={imageUrl || ''}
//                         onChange={handleImageUrlChange}
//                     />
//                     {imageUrl && <img src={imageUrl} alt="Фото категорії" className="mt-2 w-full max-h-48 object-cover rounded-lg" />}
//                 </Item>

//                 <Item name="description" label="Опис категорії">
//                     <Input.TextArea rows={4} placeholder="Текст..." />
//                 </Item>

//                 <Item>
//                     <Button type="primary" htmlType="submit" block>
//                         Створити категорію
//                     </Button>
//                 </Item>
//             </Form>
//         </div>
//     );
// };

// export default CreateCategoryPage;

import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { ICategoryPostRequest } from '../../services/types';
import { useCreateCategoryMutation } from '../../services/apiCategory';

const { Item } = Form;

const CreateCategoryPage = () => {
    const [createCategory] = useCreateCategoryMutation();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState<File | null>(null);
    // const [previewImage, setPreviewImage] = useState<string | null>(null);

    const onFinish = async (values: ICategoryPostRequest) => {
        try {
            values.image = imageFile;
            const response = await createCategory(values).unwrap();
            console.log("Response:", response);
            navigate("..");
        } catch (err) {
            console.error("Помилка створення категорії:", err);
        }
    };

    const beforeUpload = (file: File) => {
        // Перевірка формату файлу перед додаванням
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            alert('Будь ласка, завантажте зображення');
        }
        setImageFile(file);
        return false; // Призупиняє автоматичне завантаження
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 my-6">
                Створити групу
            </h1>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Item name="name" label="Назва групи" rules={[{ required: true, message: 'Будь ласка, введіть назву групи!' }]}>
                    <Input placeholder="Назва" />
                </Item>
                <Item name="description" label="Вкажіть опис">
                    <TextArea rows={4} placeholder="Текст..." />
                </Item>
                <Item label="Фото групи">
                    <Upload beforeUpload={beforeUpload} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Завантажити фото</Button>
                    </Upload>
                    {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Групове фото" className="mt-2 w-full max-h-48 object-cover rounded-lg" />}
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit" block>
                        Створити Групу
                    </Button>
                </Item>
            </Form>
        </div>
    );
};

export default CreateCategoryPage;