import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "..";
import appwriteService from "../../app/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
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
    console.log('userData:', userData);
    if (!userData.name) {
      alert('Your profile is missing a username. Please sign up again or contact support.');
      return;
    }
    if (!data.slug || data.slug.length > 36 || !/^[a-zA-Z0-9_-]+$/.test(data.slug)) {
      alert("❗ Invalid slug: Use only letters, numbers, hyphens, and underscores (max 36 chars).");
      return;
    }
    if (!data.content || data.content.length > 255) {
      alert("❗ Content is required and should be 255 characters or less.");
      return;
    }
    setIsSubmitting(true);
    try {
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;
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
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
            username: userData.name,
          });
          if (dbPost) {
            navigate(`/`);
          }
        } else {
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
    if (value && typeof value === "string") {
      let slug = value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      if (slug.match(/^[0-9]/)) {
        slug = "post-" + slug;
      }

      if (slug.length > 36) {
        slug = slug.substring(0, 36).replace(/-$/, "");
      }

      if (!slug) {
        slug = "post-" + Date.now().toString().slice(-8);
      }

      return slug;
    }
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
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col lg:flex-row w-full gap-8"
      noValidate
    >
      <div className="w-full lg:w-2/3 px-2 sm:px-4 lg:px-6 text-white">
        <Input
          label="Title :"
          placeholder="Enter post title"
          className="mb-4"
          {...register("title", {
            required: "Title is required",
          })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", {
            required: "Slug is required",
            maxLength: {
              value: 36,
              message: "Slug must be 36 characters or less",
            },
            pattern: {
              value: /^[a-zA-Z0-9_-]+$/,
              message: "Only letters, numbers, hyphens, and underscores allowed",
            },
            validate: (value) =>
              /^[a-zA-Z]/.test(value) || "Slug must start with a letter",
          })}
          onInput={(e) => {
            const transformedSlug = slugTransform(e.currentTarget.value);
            setValue("slug", transformedSlug, {
              shouldValidate: true,
            });
          }}
        />
        {errors.slug && (
          <p className="text-red-400 text-sm mb-2">{errors.slug.message}</p>
        )}

        <label htmlFor="content" className="inline-block mb-1 pl-1">
          Content :
        </label>
        <textarea
          id="content"
          placeholder="Write your post here..."
          rows={13}
          className="w-full bg-[#18181B] text-white border border-gray-600 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("content", {
            required: "Content is required",
            maxLength: {
              value: 255,
              message: "Content cannot exceed 255 characters",
            },
          })}
        />
        {errors.content && (
          <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      <div className="w-full lg:w-1/3 px-2 sm:px-4 lg:px-6 text-white">
        <div className="top-6 bg-[#18181B] backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-[#2C2C30] flex flex-col gap-4">
          <Input
            label="Featured Image :"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="cursor-pointer"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="text-white py-3 text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : post ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}
