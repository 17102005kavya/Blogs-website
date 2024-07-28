import React, { useEffect } from 'react'
import Button from './Button'
import Input from './Input'
import service from '../appwrite/config'
import Select from './Select'
import Logo from './Logo'
import {useSelector} from 'react-redux'
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import RTE from './RTE'
function PostForm({post}) {
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm(
       { defaultValues:{
            title:post?.title || '',
            slug:post?.slug||'',
            content:post?.content||'',
           
            status:post?.status||'active'
        }}
    );
    const navigate=useNavigate();
    const userData=useSelector(state=>state.userData)//check if auth or user
    const submiti=async(data)=>{
      console.log("submitted")
      if(post){
        console.log("submitted22")
        const file=data.Featuredimage[0]?await service.uploadFile(data.Featuredimage[0]):null
        if(file){
          await service.deleteFile(post.image)
        }
        else{
          console.log("Problem with image");
        }
        const dbPost=await service.updatePost(post.$id,{...data,image:file?file.$id :undefined})
        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }}
        else{
          console.log("Entered into else case")
          const file=data.Featuredimage[0]?await service.uploadFile(data.Featuredimage[0]):null
          console.log(file)
          if(file){
            console.log("Entered into file")
            console.log(file.$id);
            data.image= file.$id;//check if $id or id
          }


          console.log(userData.$id)
           const dbPost=await service.createPost({...data,image:file.$id, useri4lkjd: userData.$id})
           if (dbPost) {
            console.log("Entered into dbPost")
            navigate(`/post/${dbPost.$id}`);
        }
        else{
          console.log("Post problem")
        }
          
        }
      }
    
    const slugTransform = useCallback((value) => {
      if (value && typeof value === "string")
          return value
              .trim()
              .toLowerCase()
              .replace(/[^a-zA-Z\d\s]+/g, "-")
              .replace(/\s/g, "-");

      return "";//if above all are not present
  }, []);
  useEffect(()=>{
const subscription=watch((value,{name})=>{
  if(name=='title'){
    setValue('slug',slugTransform(value.title,{shouldValidate:true}))
  }
},[watch,slugTransform,setValue]);
return ()=>{
  subscription.unsubscribe();
}
  },[watch,slugTransform,setValue])
  return (
    <div>
        <form onSubmit={handleSubmit(submiti)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
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
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("Featuredimage", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.image)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default PostForm
