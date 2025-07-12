import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../app/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async (data) => {
        setIsSubmitting(true);
        try {            
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                
                if (!data.image[0]) {
                    alert("Please select an image file. This is required for new posts.");
                    return;
                }

                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                    if (dbPost) {
                        alert("Post created successfully!");
                        navigate(`/post/${dbPost.$id}`);
                    }
                } else {
                    console.error("PostForm: File upload failed");
                    alert("Failed to upload image. Please check your internet connection and try again.");
                }
            }
        } catch (error) {
            console.error("PostForm: Error during submission:", error);
            alert(`Error: ${error.message || "Failed to create/update post"}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row flex-wrap w-full gap-6 lg:gap-8" noValidate>
            <div className="w-full lg:w-2/3 px-2 sm:px-4 lg:px-6 text-white">
                <Input
                    label="Title :"
                    placeholder="Enter post title"
                    className="mb-4"
                    {...register("title", { required: "Title is required" })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full lg:w-1/3 px-2 sm:px-4 lg:px-6 mt-6 lg:mt-0">
                <div className="bg-[#1e1e2f]/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-[#2C2C30]">
                                    <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    capture="environment"
                    {...register("image", { required: !post })}
                />
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-6 cursor-pointer"
                        {...register("status", { required: true })}
                    />
                    <Button 
                        type="submit" 
                        bgColor={post ? "bg-green-500" : undefined} 
                        className="w-full text-white py-3 text-base"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : (post ? "Update" : "Submit")}
                    </Button>
                </div>
            </div>
        </form>
    );
}