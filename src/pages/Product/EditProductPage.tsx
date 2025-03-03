// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Button, Input, notification, Upload, Select } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { useGetProductQuery, useUpdateProductMutation } from "../../services/apiProduct";
// import { useGetCategoriesQuery } from "../../services/apiCategory";
// import { UploadFile } from "antd/es/upload/interface";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { DropResult } from "@hello-pangea/dnd";
// import { APP_ENV } from "../../env";
// import { IProductPutRequest } from "../../services/types";
// import { Form } from "../../../node_modules/antd/es/index";



// const EditProductPage = () => {
//     const { id } = useParams<{ id: string }>();
//     const navigate = useNavigate();
//     const { data: productData, isLoading: isProductLoading } = useGetProductQuery(Number(id));
//     const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
//     const [updateProduct] = useUpdateProductMutation();

//     const [form] = Form.useForm<IProductPutRequest>();

//     const [product, setProduct] = useState<IProductPutRequest>({
//         id:0,
//         name: "",
//         price: 0,
//         categoryId: "",
//         images: [] });

//     const [fileList, setFileList] = useState<UploadFile[]>([]);

//     useEffect(() => {
//         if (productData) {
//             setProduct({
//                 id: productData.id,
//                 name: productData.name,
//                 price: productData.price,
//                 categoryId: productData.categoryId,
//                 images: [],
//             });

//             const updatedFileList: UploadFile[] = productData.images?.map((image, index) => ({
//                 uid: image.id.toString(),
//                 name: image.name,
//                 url: `${APP_ENV.REMOTE_LARGE_IMAGES_URL}${image.name}`,
//                 order: index,
//             })) || [];

//             setFileList(updatedFileList);
//         }
//     }, [productData]);


//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setProduct((prev) => ({
//             ...prev,
//             [name]: name === "price" ? parseFloat(value) || 0 : value,
//         }));
//     };

//     const handleCategoryChange = (value: string) => {
//         setProduct((prev) => ({ ...prev, categoryId: value }));
//     };

//     const handleImageChange = (info: { fileList: UploadFile[] }) => {
//         const newFileList = info.fileList.map((file, index) => ({
//             ...file,
//             uid: file.uid || Date.now().toString(),
//             order: index,
//         }));

//         setFileList(newFileList);
//         setProduct((prev) => ({
//             ...prev,
//             images: newFileList.map((file) => file.originFileObj as File).filter(Boolean),
//         }));
//     };

//     const onDragEnd = (result: DropResult) => {
//         if (!result.destination) return;
//         const reorderedFiles = Array.from(fileList);
//         const [movedFile] = reorderedFiles.splice(result.source.index, 1);
//         reorderedFiles.splice(result.destination.index, 0, movedFile);
//         setFileList(reorderedFiles);
//     };

//     const handleSubmit = async () => {
//         if (!product.name || !product.price || !product.categoryId) {
//             notification.error({ message: "Будь ласка, заповніть всі поля!" });
//             return;
//         }
//         const formData = new FormData();
//         formData.append("name", product.name);
//         formData.append("price", product.price.toString());
//         formData.append("categoryId", product.categoryId);

//         if (product.images && product.images.length > 0) {
//             product.images.forEach((image) => {
//                 formData.append("images", image);
//             });
//         }

//         try {
//             await updateProduct({...product}).unwrap();
//             notification.success({ message: "Продукт оновлено" });
//             navigate("/products");
//         } catch {
//             notification.error({ message: "Помилка оновлення продукту" });
//         }
//     };

//     const onFinish = async (values: IProductPutRequest) => {
//         try {
//             console.log("Submit Form", values);
//             // values.images = selectedFiles;
//             // //console.log("Server send data: ", values);
//             // const response = await createProduct(values).unwrap();
//             // console.log("Категорія успішно створена:", response);
//             // navigate("..");
//         } catch (error) {
//             console.error("Помилка під час створення категорії:", error);
//         }
//     }


//     return (
//         <div className="max-w-lg mx-auto my-6">
//             <h1 className="text-3xl font-bold mb-4">Додати продукт</h1>
//             <Input name="name" placeholder="Назва" onChange={handleChange} value={product.name} disabled={isProductLoading} className="mb-2" />
//             <Input name="price" placeholder="Ціна" type="number" onChange={handleChange} value={product.price} disabled={isProductLoading} className="mb-2" />
//             <Select
//                 placeholder="Оберіть категорію"
//                 onChange={handleCategoryChange}
//                 loading={isCategoriesLoading}
//                 className="mb-2 w-full"
//                 options={categories?.map((category) => ({
//                     value: category.id,
//                     label: category.name,
//                 }))}
//                 value={product.categoryId || undefined}
//             />

//             <DragDropContext onDragEnd={onDragEnd}>
//                 <Droppable droppableId="upload-list" direction="horizontal">
//                     {(provided) => (
//                         <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-wrap gap-2">
//                             {fileList.map((file, index) => (
//                                 <Draggable key={file.uid} draggableId={file.uid} index={index}>
//                                     {(provided) => (
//                                         <div
//                                             ref={provided.innerRef}
//                                             {...provided.draggableProps}
//                                             {...provided.dragHandleProps}
//                                         >
//                                             <Upload
//                                                 listType="picture-card"
//                                                 fileList={[file]}
//                                                 onRemove={() => {
//                                                     const newFileList = fileList.filter(f => f.uid !== file.uid);
//                                                     setFileList(newFileList);
//                                                     setProduct({
//                                                         ...product,
//                                                         images: newFileList.map(f => f.originFileObj as File),
//                                                     });
//                                                 }}
//                                             />
//                                         </div>
//                                     )}
//                                 </Draggable>
//                             ))}
//                             {provided.placeholder}
//                         </div>
//                     )}
//                 </Droppable>
//             </DragDropContext>

//             <Upload
//                 multiple
//                 listType="picture-card"
//                 beforeUpload={() => false}
//                 onChange={handleImageChange}
//                 fileList={[]}
//                 accept="image/*"
//             >
//                 <div>
//                     <PlusOutlined />
//                     <div style={{ marginTop: 8 }}>Додати</div>
//                 </div>
//             </Upload>

//             <Button type="primary" onClick={handleSubmit} className="mt-4 w-full">
//                 Зберегти
//             </Button>
//         </div>
//     );
// };

// export default EditProductPage;


// import {useState, useEffect} from "react";
// import {useNavigate, useParams} from "react-router-dom";
// import {Button, Input, notification, Upload, Select, Form} from "antd";
// import {PlusOutlined} from "@ant-design/icons";
// import {useGetProductQuery, useUpdateProductMutation} from "../../services/apiProduct";
// import {useGetCategoriesQuery} from "../../services/apiCategory";
// import {UploadFile} from "antd/es/upload/interface";
// import {DragDropContext, Droppable, Draggable} from "@hello-pangea/dnd";
// import {DropResult} from "@hello-pangea/dnd";
// import {APP_ENV} from "../../env";
// import {IProductPutRequest} from "../../services/types";


// const EditProductPage = () => {
//     const {id} = useParams<{ id: string }>();
//     const navigate = useNavigate();
//     const {data: productData, isLoading: isProductLoading} = useGetProductQuery(Number(id));
//     const {data: categories, isLoading: isCategoriesLoading, error: categoriesError} = useGetCategoriesQuery();
//     const [updateProduct] = useUpdateProductMutation();

//     const [form] = Form.useForm<IProductPutRequest>();

//     const [product, setProduct] = useState<IProductPutRequest>({
//         id: 0,
//         name: "",
//         price: 0,
//         categoryId: "",
//         images: []
//     });

//     const [fileList, setFileList] = useState<UploadFile[]>([]);

//     useEffect(() => {
//         if (productData) {
//             setProduct({
//                 id: productData.id,
//                 name: productData.name,
//                 price: productData.price,
//                 categoryId: productData.categoryId,
//                 images: [],
//             });


//             console.log("Category id", productData.categoryId);
//             form.setFieldsValue({
//                 ...form.getFieldsValue(),
//                 categoryId: productData.categoryId,
//             });

//             const updatedFileList: UploadFile[] = productData.images?.map((image, index) => ({
//                 uid: image.id.toString(),
//                 name: image.name,
//                 url: `${APP_ENV.REMOTE_LARGE_IMAGES_URL}${image.name}`,
//                 order: index,
//             })) || [];

//             setFileList(updatedFileList);
//         }
//     }, [productData]);


//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const {name, value} = e.target;
//         setProduct((prev) => ({
//             ...prev,
//             [name]: name === "price" ? parseFloat(value) || 0 : value,
//         }));
//     };

//     const handleCategoryChange = (value: string) => {
//         setProduct((prev) => ({...prev, categoryId: value}));
//     };

//     const handleImageChange = (info: { fileList: UploadFile[] }) => {
//         const newFileList = info.fileList.map((file, index) => ({
//             ...file,
//             uid: file.uid || Date.now().toString(),
//             order: index,
//         }));

//         setFileList(newFileList);
//         setProduct((prev) => ({
//             ...prev,
//             images: newFileList.map((file) => file.originFileObj as File).filter(Boolean),
//         }));
//     };

//     const onDragEnd = (result: DropResult) => {
//         if (!result.destination) return;
//         const reorderedFiles = Array.from(fileList);
//         const [movedFile] = reorderedFiles.splice(result.source.index, 1);
//         reorderedFiles.splice(result.destination.index, 0, movedFile);
//         setFileList(reorderedFiles);
//     };

//     const handleSubmit = async () => {
//         if (!product.name || !product.price || !product.categoryId) {
//             notification.error({message: "Будь ласка, заповніть всі поля!"});
//             return;
//         }
//         const formData = new FormData();
//         formData.append("name", product.name);
//         formData.append("price", product.price.toString());
//         formData.append("categoryId", product.categoryId);

//         if (product.images && product.images.length > 0) {
//             product.images.forEach((image) => {
//                 formData.append("images", image);
//             });
//         }

//         try {
//             await updateProduct({...product}).unwrap();
//             notification.success({message: "Продукт оновлено"});
//             navigate("/products");
//         } catch {
//             notification.error({message: "Помилка оновлення продукту"});
//         }
//     };

//     const onFinish = async (values: IProductPutRequest) => {
//         try {
//             console.log("Submit Form", values);
//             // values.images = selectedFiles;
//             // //console.log("Server send data: ", values);
//             // const response = await createProduct(values).unwrap();
//             // console.log("Категорія успішно створена:", response);
//             // navigate("..");
//         } catch (error) {
//             console.error("Помилка під час створення категорії:", error);
//         }
//     }

//     return (
//         <div className="max-w-lg mx-auto my-6">
//             <h1 className="text-3xl font-bold mb-4">Додати продукт</h1>
//             <Form
//                 form={form}
//                 onFinish={onFinish}
//                 layout="vertical">

//                 <Input name="name" placeholder="Назва" onChange={handleChange} value={product.name}
//                        disabled={isProductLoading} className="mb-2"/>
//                 <Input name="price" placeholder="Ціна" type="number" onChange={handleChange} value={product.price}
//                        disabled={isProductLoading} className="mb-2"/>


//                 {isCategoriesLoading ? (
//                     <p>Loading categories...</p>
//                 ) : categoriesError ? (
//                     <p className="text-red-500">Failed to load categories</p>
//                 ) : (
//                     <Form.Item
//                         label="Категорія"
//                         name="categoryId"
//                         htmlFor="categoryId"
//                         rules={[{required: true, message: "Це поле є обов'язковим!"}]}
//                     >
//                         <Select placeholder="Оберіть категорію: " options={categories?.map(category =>
//                         {
//                             return {
//                                 value: category.id,
//                                 label: category.name,
//                             };

//                         })}/>
//                     </Form.Item>
//                 )}



//                 <DragDropContext onDragEnd={onDragEnd}>
//                     <Droppable droppableId="upload-list" direction="horizontal">
//                         {(provided) => (
//                             <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-wrap gap-2">
//                                 {fileList.map((file, index) => (
//                                     <Draggable key={file.uid} draggableId={file.uid} index={index}>
//                                         {(provided) => (
//                                             <div
//                                                 ref={provided.innerRef}
//                                                 {...provided.draggableProps}
//                                                 {...provided.dragHandleProps}
//                                             >
//                                                 <Upload
//                                                     listType="picture-card"
//                                                     fileList={[file]}
//                                                     onRemove={() => {
//                                                         const newFileList = fileList.filter(f => f.uid !== file.uid);
//                                                         setFileList(newFileList);
//                                                         setProduct({
//                                                             ...product,
//                                                             images: newFileList.map(f => f.originFileObj as File),
//                                                         });
//                                                     }}
//                                                 />
//                                             </div>
//                                         )}
//                                     </Draggable>
//                                 ))}
//                                 {provided.placeholder}
//                             </div>
//                         )}
//                     </Droppable>
//                 </DragDropContext>

//                 <Upload
//                     multiple
//                     listType="picture-card"
//                     beforeUpload={() => false}
//                     onChange={handleImageChange}
//                     fileList={[]}
//                     accept="image/*"
//                 >
//                     <div>
//                         <PlusOutlined/>
//                         <div style={{marginTop: 8}}>Додати</div>
//                     </div>
//                 </Upload>

//                 <Button type="primary" onClick={handleSubmit} className="mt-4 w-full">
//                     Зберегти
//                 </Button>
//             </Form>
//         </div>
//     );
// };

// export default EditProductPage;



import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Input, notification, Upload, Select, Form} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useGetProductQuery, useUpdateProductMutation} from "../../services/apiProduct";
import {useGetCategoriesQuery} from "../../services/apiCategory";
import {UploadFile} from "antd/es/upload/interface";
import {DragDropContext, Droppable, Draggable} from "@hello-pangea/dnd";
import {DropResult} from "@hello-pangea/dnd";
import {APP_ENV} from "../../env";
import {IProductPutRequest} from "../../services/types";
import Item from "antd/es/list/Item";


const EditProductPage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {data: productData, isLoading: isProductLoading} = useGetProductQuery(Number(id));
    const {data: categories, isLoading: isCategoriesLoading, error: categoriesError} = useGetCategoriesQuery();
    const [updateProduct] = useUpdateProductMutation();

    const [form] = Form.useForm<IProductPutRequest>();

    // const [product, setProduct] = useState<IProductPutRequest>({
    //     id: 0,
    //     name: "",
    //     price: 0,
    //     categoryId: "",
    //     images: []
    // });

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (productData) {

            console.log("Category id", productData.categoryId);
            form.setFieldsValue({
                ...form.getFieldsValue(),
                ...productData
            });

            // const updatedFileList: UploadFile[] = productData.images?.map((image, index) => ({
            //     uid: image.id.toString(),
            //     name: image.name,
            //     url: `${APP_ENV.REMOTE_LARGE_IMAGES_URL}${image.name}`,
            //     order: index,
            // })) || [];

            const updatedFileList: UploadFile[] = productData.images?.map((image, index) => ({
                uid: image.id.toString(),
                name: image.name,
                url: `${APP_ENV.REMOTE_LARGE_IMAGES_URL}${image.name}`,
                originFileObj: new File([new Blob([''])],image.name,{type: 'old-image'})
            } as UploadFile)) || [];

            setFileList(updatedFileList);
        }
    }, [productData]);


    const handleImageChange = (info: { fileList: UploadFile[] }) => {
        const newFileList = info.fileList.map((file, index) => ({
            ...file,
            uid: file.uid || Date.now().toString(),
            order: index,
        }));

        setFileList(newFileList);
        // setProduct((prev) => ({
        //     ...prev,
        //     images: newFileList.map((file) => file.originFileObj as File).filter(Boolean),
        // }));
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const reorderedFiles = Array.from(fileList);
        const [movedFile] = reorderedFiles.splice(result.source.index, 1);
        reorderedFiles.splice(result.destination.index, 0, movedFile);
        setFileList(reorderedFiles);
    };

    // const handleSubmit = async () => {
    //     if (!product.name || !product.price || !product.categoryId) {
    //         notification.error({message: "Будь ласка, заповніть всі поля!"});
    //         return;
    //     }
    //     const formData = new FormData();
    //     formData.append("name", product.name);
    //     formData.append("price", product.price.toString());
    //     formData.append("categoryId", product.categoryId);
    //
    //     if (product.images && product.images.length > 0) {
    //         product.images.forEach((image) => {
    //             formData.append("images", image);
    //         });
    //     }
    //
    //     try {
    //         await updateProduct({...product}).unwrap();
    //         notification.success({message: "Продукт оновлено"});
    //         navigate("/products");
    //     } catch {
    //         notification.error({message: "Помилка оновлення продукту"});
    //     }
    // };

    const onFinish = async (values: IProductPutRequest) => {
        try {
            console.log("Submit Form", values);
            console.log("files", fileList);
            // values.images = selectedFiles;
            // //console.log("Server send data: ", values);
            // const response = await createProduct(values).unwrap();
            // console.log("Категорія успішно створена:", response);
            // navigate("..");
        } catch (error) {
            console.error("Помилка під час створення категорії:", error);
        }
    }

    return (
        <div className="max-w-lg mx-auto my-6">
            <h1 className="text-3xl font-bold mb-4">Редагувати продукт</h1>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical">

                <Form.Item name="name" label="Назва" rules={[{ required: true, message: 'Будь ласка, введіть назву групи!' }]}>
                    <Input placeholder="Назва" />
                </Form.Item>

                <Form.Item name="price" label="Ціна" rules={[{ required: true, message: 'Будь ласка, введіть назву групи!' }]}>
                    <Input placeholder="Ціна" />
                </Form.Item>

                {isCategoriesLoading ? (
                    <p>Loading categories...</p>
                ) : categoriesError ? (
                    <p className="text-red-500">Failed to load categories</p>
                ) : (
                    <Form.Item
                        label="Категорія"
                        name="categoryId"
                        htmlFor="categoryId"
                        rules={[{required: true, message: "Це поле є обов'язковим!"}]}
                    >
                        <Select placeholder="Оберіть категорію: " options={categories?.map(category =>
                        {
                            return {
                                value: category.id,
                                label: category.name,
                            };

                        })}/>
                    </Form.Item>
                )}



                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="upload-list" direction="horizontal">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-wrap gap-2">
                                {fileList.map((file, index) => (
                                    <Draggable key={file.uid} draggableId={file.uid} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Upload
                                                    listType="picture-card"
                                                    fileList={[file]}
                                                    onRemove={() => {
                                                        const newFileList = fileList.filter(f => f.uid !== file.uid);
                                                        setFileList(newFileList);
                                                        // setProduct({
                                                        //     ...product,
                                                        //     images: newFileList.map(f => f.originFileObj as File),
                                                        // });
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <Upload
                    multiple
                    listType="picture-card"
                    beforeUpload={() => false}
                    onChange={handleImageChange}
                    fileList={[]}
                    accept="image/*"
                >
                    <div>
                        <PlusOutlined/>
                        <div style={{marginTop: 8}}>Додати</div>
                    </div>
                </Upload>

                <Item>
                    <Button type="primary" htmlType="submit" block>
                        Зберегти
                    </Button>
                </Item>
            </Form>
        </div>
    );
};

export default EditProductPage;